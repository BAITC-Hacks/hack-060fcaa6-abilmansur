"""Read models for the UI: board, Graphology-compatible graph, time replay, account card."""

from collections import defaultdict
from typing import Any

from app import db, duck

TX_COLS = "tx_id, ts, sender_id, receiver_id, amount, currency, sender_type, receiver_type, purpose, channel"


def dataset_con(investigation_id: str):
    row = db.fetch_one(
        "SELECT d.path FROM investigations i JOIN datasets d ON d.id = i.dataset_id WHERE i.id = ?",
        (investigation_id,))
    if not row:
        raise KeyError(investigation_id)
    return duck.connect(row["path"])


def _rows(con, sql: str, params: list) -> list[dict[str, Any]]:
    rel = con.execute(sql, params)
    cols = [d[0] for d in rel.description]
    return [dict(zip(cols, r)) for r in rel.fetchall()]


def version_full(version_id: str) -> dict[str, Any] | None:
    v = db.fetch_one("SELECT * FROM versions WHERE id = ?", (version_id,))
    if not v:
        return None
    v["members"] = db.fetch_all("SELECT * FROM members WHERE version_id = ? ORDER BY confidence DESC", (version_id,))
    v["links"] = db.fetch_all("SELECT * FROM links WHERE version_id = ? ORDER BY created_at", (version_id,))
    v["trails"] = db.fetch_all("SELECT * FROM trails WHERE version_id = ? ORDER BY created_at", (version_id,))
    v["objections"] = db.fetch_all("SELECT * FROM objections WHERE version_id = ? ORDER BY created_at", (version_id,))
    v["open_questions"] = db.fetch_all("SELECT * FROM open_questions WHERE version_id = ? ORDER BY created_at",
                                       (version_id,))
    v["evidence"] = db.fetch_all(
        "SELECT id, title, claim, pattern, accounts, period_start, period_end, verification FROM evidence "
        "WHERE version_id = ? ORDER BY created_at", (version_id,))
    return v


def board(investigation_id: str) -> dict[str, Any]:
    inv = db.fetch_one("SELECT * FROM investigations WHERE id = ?", (investigation_id,))
    versions = db.fetch_all("SELECT id FROM versions WHERE investigation_id = ? ORDER BY created_at", (investigation_id,))
    return {
        "investigation": inv,
        "candidates": db.fetch_all("SELECT * FROM candidates WHERE investigation_id = ? ORDER BY priority DESC",
                                   (investigation_id,)),
        "coverage": db.fetch_all("SELECT * FROM coverage WHERE investigation_id = ? ORDER BY created_at",
                                 (investigation_id,)),
        "versions": [version_full(v["id"]) for v in versions],
    }


def _member_tx(con, accounts: list[str], extra_tx: list[str]) -> list[dict[str, Any]]:
    """All individual transfers between members, plus transfers the agent cited on links."""
    return _rows(con, f"""
        SELECT {TX_COLS} FROM tx
        WHERE (sender_id IN (SELECT unnest(?::VARCHAR[])) AND receiver_id IN (SELECT unnest(?::VARCHAR[])))
           OR tx_id IN (SELECT unnest(?::VARCHAR[]))
        ORDER BY ts, tx_id""", [accounts, accounts, extra_tx])


def version_graph(investigation_id: str, version_id: str, context_per_node: int = 0) -> dict[str, Any]:
    """Graphology ``import()`` format. Edges aggregate real transfers but keep every tx_id."""
    v = version_full(version_id)
    members = {m["account_id"]: m for m in v["members"] if m["status"] != "excluded"}
    active_links = [l for l in v["links"] if l["status"] != "removed"]
    link_tx = [t for l in active_links for t in l["tx_ids"]]
    con = dataset_con(investigation_id)
    txs = _member_tx(con, list(members), link_tx)

    nodes: dict[str, dict[str, Any]] = {}
    for acc, m in members.items():
        nodes[acc] = {"key": acc, "attributes": {
            "label": acc, "role": m["role"], "confidence": m["confidence"], "status": m["status"],
            "member": True, "inclusion_basis": m["inclusion_basis"],
            "alternative_explanation": m["alternative_explanation"],
            "missing_information": m["missing_information"], "evidence_ids": m["evidence_ids"],
        }}

    def ensure(acc: str, kind: str = "context") -> None:
        if acc not in nodes:
            nodes[acc] = {"key": acc, "attributes": {"label": acc, "role": kind, "member": False}}

    asserted = {(l["source"], l["target"]): l for l in active_links if l["kind"] == "transfer"}
    agg: dict[tuple[str, str], dict[str, Any]] = {}
    for t in txs:
        k = (t["sender_id"], t["receiver_id"])
        e = agg.setdefault(k, {"tx_ids": [], "totals": defaultdict(float), "first_ts": t["ts"], "last_ts": t["ts"]})
        e["tx_ids"].append(t["tx_id"])
        e["totals"][t["currency"]] += t["amount"] or 0
        e["last_ts"] = t["ts"]
        ensure(t["sender_id"])
        ensure(t["receiver_id"])

    edges = []
    for (s, d), e in agg.items():
        link = asserted.get((s, d))
        edges.append({"key": f"tx:{s}->{d}", "source": s, "target": d, "attributes": {
            "type": "transfer", "tx_count": len(e["tx_ids"]), "tx_ids": e["tx_ids"],
            "totals_by_currency": {c: round(a, 2) for c, a in e["totals"].items()},
            "first_ts": str(e["first_ts"]), "last_ts": str(e["last_ts"]),
            "asserted": link is not None, "link_id": link["id"] if link else None,
            "link_status": link["status"] if link else None, "rationale": link["rationale"] if link else None,
        }})
    for l in active_links:
        if l["kind"] == "transfer":
            continue
        ensure(l["source"])
        ensure(l["target"])
        edges.append({"key": f"link:{l['id']}", "source": l["source"], "target": l["target"], "attributes": {
            "type": l["kind"], "tx_ids": l["tx_ids"], "asserted": True, "link_id": l["id"],
            "link_status": l["status"], "rationale": l["rationale"], "stats": l["stats"],
        }})

    if context_per_node > 0 and members:
        ctx = _rows(con, """
            WITH m AS (SELECT unnest(?::VARCHAR[]) AS acc),
            flows AS (
                SELECT sender_id AS member, receiver_id AS other, 'out' AS dir, amount, currency, tx_id FROM tx
                WHERE sender_id IN (SELECT acc FROM m) AND receiver_id NOT IN (SELECT acc FROM m)
                UNION ALL
                SELECT receiver_id, sender_id, 'in', amount, currency, tx_id FROM tx
                WHERE receiver_id IN (SELECT acc FROM m) AND sender_id NOT IN (SELECT acc FROM m)),
            g AS (SELECT member, other, dir, currency, sum(amount) AS amount, count(*) AS n, list(tx_id) AS tx_ids
                  FROM flows GROUP BY ALL)
            SELECT * FROM g QUALIFY row_number() OVER (PARTITION BY member ORDER BY amount DESC) <= ?""",
            [list(members), context_per_node])
        for c in ctx:
            ensure(c["other"])
            s, d = (c["member"], c["other"]) if c["dir"] == "out" else (c["other"], c["member"])
            edges.append({"key": f"ctx:{s}->{d}:{c['currency']}", "source": s, "target": d, "attributes": {
                "type": "context", "tx_count": c["n"], "tx_ids": c["tx_ids"][:200],
                "totals_by_currency": {c["currency"]: round(c["amount"], 2)}, "asserted": False,
            }})

    return {
        "attributes": {"version_id": version_id, "title": v["title"], "status": v["status"]},
        "options": {"type": "directed", "multi": True, "allowSelfLoops": True},
        "nodes": list(nodes.values()),
        "edges": edges,
        "trails": [{"id": t["id"], "title": t["title"], "steps": t["steps"],
                    "certainty": t["verification"]["certainty"], "hops": t["verification"]["hops"],
                    "note": t["verification"]["note"]} for t in v["trails"]],
    }


def version_timeline(investigation_id: str, version_id: str, bucket: str = "day") -> dict[str, Any]:
    """Every transfer inside the group in time order, grouped into replay frames."""
    v = version_full(version_id)
    members = {m["account_id"]: m["role"] for m in v["members"] if m["status"] != "excluded"}
    link_tx = [t for l in v["links"] if l["status"] != "removed" for t in l["tx_ids"]]
    txs = _member_tx(dataset_con(investigation_id), list(members), link_tx)
    fmt = {"hour": "%Y-%m-%d %H:00", "day": "%Y-%m-%d", "week": "%G-W%V"}.get(bucket, "%Y-%m-%d")
    frames: dict[str, dict[str, Any]] = {}
    for t in txs:
        key = t["ts"].strftime(fmt)
        f = frames.setdefault(key, {"frame": key, "tx": [], "totals_by_currency": defaultdict(float),
                                    "role_flows": defaultdict(int)})
        f["tx"].append({**t, "ts": str(t["ts"]), "sender_role": members.get(t["sender_id"], "context"),
                        "receiver_role": members.get(t["receiver_id"], "context")})
        f["totals_by_currency"][t["currency"]] += t["amount"] or 0
        f["role_flows"][f"{members.get(t['sender_id'], 'context')}->{members.get(t['receiver_id'], 'context')}"] += 1
    out = []
    for i, f in enumerate(frames.values()):
        out.append({**f, "index": i, "totals_by_currency": {k: round(a, 2) for k, a in f["totals_by_currency"].items()},
                    "role_flows": dict(f["role_flows"])})
    return {"version_id": version_id, "bucket": bucket, "frames": out, "tx_count": len(txs)}


def account_card(investigation_id: str, account_id: str, limit: int = 100) -> dict[str, Any]:
    con = dataset_con(investigation_id)
    summary = _rows(con, """
        SELECT count(*) FILTER (sender_id = ?) AS out_count, count(*) FILTER (receiver_id = ?) AS in_count,
               min(ts) AS first_ts, max(ts) AS last_ts,
               any_value(CASE WHEN sender_id = ? THEN sender_type ELSE receiver_type END) AS account_type
        FROM tx WHERE sender_id = ? OR receiver_id = ?""", [account_id] * 5)[0]
    totals = _rows(con, """
        SELECT currency, sum(amount) FILTER (sender_id = ?) AS out_amount, sum(amount) FILTER (receiver_id = ?) AS in_amount
        FROM tx WHERE sender_id = ? OR receiver_id = ? GROUP BY 1""", [account_id] * 4)
    counterparties = _rows(con, """
        SELECT CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS counterparty,
               CASE WHEN sender_id = ? THEN 'out' ELSE 'in' END AS direction,
               currency, count(*) AS n, sum(amount) AS amount
        FROM tx WHERE sender_id = ? OR receiver_id = ? GROUP BY ALL ORDER BY amount DESC LIMIT 25""", [account_id] * 4)
    recent = _rows(con, f"SELECT {TX_COLS} FROM tx WHERE sender_id = ? OR receiver_id = ? ORDER BY ts DESC LIMIT ?",
                   [account_id, account_id, limit])
    memberships = db.fetch_all(
        "SELECT m.*, v.title AS version_title, v.status AS version_status FROM members m "
        "JOIN versions v ON v.id = m.version_id WHERE v.investigation_id = ? AND m.account_id = ?",
        (investigation_id, account_id))
    evidence = [e for e in db.fetch_all(
        "SELECT id, title, claim, accounts, verification FROM evidence WHERE investigation_id = ?", (investigation_id,))
        if account_id in e["accounts"]]
    answers = [a for a in db.fetch_all("SELECT * FROM answers WHERE investigation_id = ? ORDER BY created_at DESC",
                                       (investigation_id,)) if account_id in a["accounts"]]
    return {"account_id": account_id, "summary": summary, "totals_by_currency": totals,
            "top_counterparties": counterparties, "recent_transactions": recent,
            "memberships": memberships, "evidence": evidence, "answers": answers}
