"""App-side checks run before anything the agent claims is published.

The agent is free to explore however it wants; these checks only confirm that published
statements are reproducible from the source records: referenced transactions exist, claimed
counts/sums match, periods and time order hold, and money-trail attribution ambiguity is
made explicit instead of implied away.
"""

from collections import defaultdict
from datetime import datetime
from typing import Any

import duckdb

from app.duck import fetch_transactions

AMOUNT_REL_TOLERANCE = 0.005  # 0.5 %


def _parse_ts(value: str | None, *, end: bool = False) -> datetime | None:
    if not value:
        return None
    ts = datetime.fromisoformat(value.replace("Z", "+00:00")).replace(tzinfo=None)
    # A date-only end ("2025-03-24") means the whole day, not its first second: otherwise every
    # transfer made on the last day is reported as outside the declared period.
    if end and len(value.strip()) == 10:
        ts = ts.replace(hour=23, minute=59, second=59, microsecond=999_999)
    return ts


def _totals_by_currency(rows: list[dict[str, Any]]) -> dict[str, float]:
    out: dict[str, float] = defaultdict(float)
    for r in rows:
        out[r["currency"]] += r["amount"] or 0.0
    return {k: round(v, 2) for k, v in out.items()}


def _close(a: float, b: float) -> bool:
    return abs(a - b) <= max(abs(b) * AMOUNT_REL_TOLERANCE, 0.01)


def _load(con: duckdb.DuckDBPyConnection, tx_ids: list[str], checks: list[dict]) -> list[dict[str, Any]]:
    unique_ids = list(dict.fromkeys(tx_ids))
    if len(unique_ids) != len(tx_ids):
        checks.append({"check": "duplicate_references", "ok": False, "severity": "warning",
                       "detail": f"{len(tx_ids) - len(unique_ids)} tx_ids referenced more than once"})
    rows = fetch_transactions(con, unique_ids)
    found = {r["tx_id"] for r in rows}
    missing = [t for t in unique_ids if t not in found]
    checks.append({
        "check": "tx_ids_exist", "ok": not missing, "severity": "error",
        "detail": f"missing {len(missing)} of {len(unique_ids)}: {missing[:20]}" if missing
        else f"all {len(unique_ids)} found",
    })
    if len(rows) > len(found):
        checks.append({"check": "tx_id_unique_in_source", "ok": False, "severity": "warning",
                       "detail": "some tx_ids map to several source rows; sums use every row"})
    return rows


def _status(checks: list[dict]) -> str:
    if any(not c["ok"] and c["severity"] == "error" for c in checks):
        return "failed"
    if any(not c["ok"] for c in checks):
        return "warning"
    return "verified"


def _period(rows: list[dict[str, Any]]) -> dict[str, str | None]:
    ts = [r["ts"] for r in rows if r["ts"] is not None]
    return {"start": str(min(ts)) if ts else None, "end": str(max(ts)) if ts else None}


def verify_evidence(
    con: duckdb.DuckDBPyConnection,
    tx_ids: list[str],
    accounts: list[str],
    period_start: str | None,
    period_end: str | None,
    claimed: dict[str, Any] | None,
) -> dict[str, Any]:
    checks: list[dict] = []
    if not tx_ids:
        checks.append({"check": "has_transactions", "ok": False, "severity": "error",
                       "detail": "evidence must reference at least one transaction"})
        return {"status": "failed", "checks": checks, "recomputed": {}}

    rows = _load(con, tx_ids, checks)
    by_ccy = _totals_by_currency(rows)
    recomputed = {
        "tx_count": len(rows),
        "totals_by_currency": by_ccy,
        "period": _period(rows),
        "accounts_involved": sorted({r["sender_id"] for r in rows} | {r["receiver_id"] for r in rows}),
    }

    start, end = _parse_ts(period_start), _parse_ts(period_end, end=True)
    if start or end:
        outside = [r["tx_id"] for r in rows
                   if (start and r["ts"] < start) or (end and r["ts"] > end)]
        checks.append({"check": "within_declared_period", "ok": not outside, "severity": "error",
                       "detail": f"{len(outside)} tx outside declared period: {outside[:10]}" if outside
                       else "all tx within declared period"})
    else:
        checks.append({"check": "declared_period", "ok": False, "severity": "warning",
                       "detail": "no analysis period declared; recomputed period is used"})

    if accounts:
        involved = set(recomputed["accounts_involved"])
        absent = [a for a in accounts if a not in involved]
        unrelated = [r["tx_id"] for r in rows if r["sender_id"] not in accounts and r["receiver_id"] not in accounts]
        checks.append({"check": "accounts_appear_in_tx", "ok": not absent, "severity": "warning",
                       "detail": f"accounts not present in referenced tx: {absent}" if absent else "ok"})
        checks.append({"check": "tx_touch_accounts", "ok": not unrelated, "severity": "warning",
                       "detail": f"{len(unrelated)} tx involve none of the listed accounts" if unrelated else "ok"})

    claimed = claimed or {}
    if "tx_count" in claimed and claimed["tx_count"] is not None:
        ok = int(claimed["tx_count"]) == len(rows)
        checks.append({"check": "claimed_tx_count", "ok": ok, "severity": "error",
                       "detail": f"claimed {claimed['tx_count']}, recomputed {len(rows)}"})
    if claimed.get("total_amount") is not None:
        ccy = claimed.get("currency")
        if ccy is None and len(by_ccy) > 1:
            checks.append({"check": "claimed_total_currency", "ok": False, "severity": "error",
                           "detail": f"total claimed without currency but tx span {sorted(by_ccy)}; never sum across currencies"})
        else:
            actual = by_ccy.get(ccy, 0.0) if ccy else next(iter(by_ccy.values()), 0.0)
            ok = _close(actual, float(claimed["total_amount"]))
            checks.append({"check": "claimed_total_amount", "ok": ok, "severity": "error",
                           "detail": f"claimed {claimed['total_amount']} {ccy or ''}, recomputed {actual}"})
    for ccy, total in (claimed.get("totals_by_currency") or {}).items():
        actual = by_ccy.get(ccy, 0.0)
        checks.append({"check": f"claimed_total_{ccy}", "ok": _close(actual, float(total)), "severity": "error",
                       "detail": f"claimed {total}, recomputed {actual}"})

    return {"status": _status(checks), "checks": checks, "recomputed": recomputed}


def link_stats(con: duckdb.DuckDBPyConnection, source: str, target: str, kind: str,
               tx_ids: list[str]) -> dict[str, Any]:
    checks: list[dict] = []
    rows = _load(con, tx_ids, checks) if tx_ids else []
    if kind == "transfer":
        if not tx_ids:
            checks.append({"check": "has_transactions", "ok": False, "severity": "error",
                           "detail": "transfer links must reference transactions"})
        wrong = [r["tx_id"] for r in rows if not (r["sender_id"] == source and r["receiver_id"] == target)]
        checks.append({"check": "direction", "ok": not wrong, "severity": "error",
                       "detail": f"{len(wrong)} tx are not {source} -> {target}: {wrong[:10]}" if wrong
                       else f"all tx are {source} -> {target}"})
        # How much of the direct relationship the link covers.
        total_direct, = con.execute(
            "SELECT count(*) FROM tx WHERE sender_id = ? AND receiver_id = ?", [source, target]
        ).fetchone()
        coverage = {"direct_tx_total": total_direct, "referenced": len(rows)}
    else:
        unrelated = [r["tx_id"] for r in rows if not ({r["sender_id"], r["receiver_id"]} & {source, target})]
        checks.append({"check": "tx_touch_endpoints", "ok": not unrelated, "severity": "error",
                       "detail": f"{len(unrelated)} tx involve neither endpoint" if unrelated else "ok"})
        coverage = {}
    days = {r["ts"].date() for r in rows if r["ts"] is not None}
    return {
        "status": _status(checks),
        "checks": checks,
        "tx_count": len(rows),
        "totals_by_currency": _totals_by_currency(rows),
        "period": _period(rows),
        "active_days": len(days),
        **coverage,
    }


def verify_trail(con: duckdb.DuckDBPyConnection, steps: list[dict[str, Any]]) -> dict[str, Any]:
    """Check a money route A->B->C... and quantify how ambiguous the attribution is.

    A route is only ever presented as *possible*: intermediate nodes may hold balances or receive
    money from others, so "the same money" cannot be proven from transfers alone. We measure
    how exclusive the trail inflow is at every hop to make this visible.
    """
    checks: list[dict] = []
    if len(steps) < 2:
        checks.append({"check": "min_steps", "ok": False, "severity": "error",
                       "detail": "a trail needs at least two steps"})
    step_rows: list[list[dict[str, Any]]] = []
    for i, step in enumerate(steps):
        rows = _load(con, step.get("tx_ids", []), checks)
        if not rows:
            checks.append({"check": f"step_{i}_nonempty", "ok": False, "severity": "error",
                           "detail": f"step {i} references no existing transactions"})
        wrong = [r["tx_id"] for r in rows if not (r["sender_id"] == step["from"] and r["receiver_id"] == step["to"])]
        if wrong:
            checks.append({"check": f"step_{i}_direction", "ok": False, "severity": "error",
                           "detail": f"tx not {step['from']} -> {step['to']}: {wrong[:10]}"})
        step_rows.append(rows)

    for i in range(len(steps) - 1):
        if steps[i]["to"] != steps[i + 1]["from"]:
            checks.append({"check": f"step_{i}_{i + 1}_continuity", "ok": False, "severity": "error",
                           "detail": f"step {i} ends at {steps[i]['to']} but step {i + 1} starts at {steps[i + 1]['from']}"})

    hops = []
    for i in range(len(steps) - 1):
        inflow, outflow = step_rows[i], step_rows[i + 1]
        if not inflow or not outflow:
            continue
        node = steps[i]["to"]
        first_in = min(r["ts"] for r in inflow)
        last_in = max(r["ts"] for r in inflow)
        preceded = [r for r in outflow if r["ts"] >= first_in]
        order_ok = bool(preceded)
        checks.append({
            "check": f"hop_{i}_time_order", "ok": order_ok, "severity": "error",
            "detail": f"{len(preceded)}/{len(outflow)} outgoing tx from {node} occur after first incoming trail tx"
            if order_ok else f"all outgoing tx from {node} precede the incoming trail tx",
        })
        if order_ok and len(preceded) < len(outflow):
            checks.append({"check": f"hop_{i}_partial_order", "ok": False, "severity": "warning",
                           "detail": f"{len(outflow) - len(preceded)} outgoing tx from {node} precede the trail inflow"})
        window_end = max(r["ts"] for r in outflow)
        trail_in = sum(r["amount"] for r in inflow)
        out_amt = sum(r["amount"] for r in outflow)
        total_in, other_senders = con.execute(
            """SELECT coalesce(sum(amount), 0), count(DISTINCT sender_id) FILTER (sender_id <> ?)
               FROM tx WHERE receiver_id = ? AND ts BETWEEN ? AND ?""",
            [steps[i]["from"], node, first_in, window_end],
        ).fetchone()
        exclusive_share = round(trail_in / total_in, 4) if total_in else None
        currencies = {r["currency"] for r in inflow} | {r["currency"] for r in outflow}
        hops.append({
            "node": node,
            "inflow_window": {"start": str(first_in), "end": str(window_end)},
            "strict_sequence": min(r["ts"] for r in outflow) >= last_in,
            "trail_inflow": round(trail_in, 2),
            "trail_outflow": round(out_amt, 2),
            "outflow_to_inflow_ratio": round(out_amt / trail_in, 4) if trail_in else None,
            "node_total_inflow_in_window": round(total_in, 2),
            "exclusive_inflow_share": exclusive_share,
            "other_senders_in_window": other_senders,
            "mixed_currencies": len(currencies) > 1,
        })

    status = _status(checks)
    ambiguous = any((h["exclusive_inflow_share"] or 0) < 0.999 or not h["strict_sequence"] for h in hops)
    if status == "failed":
        certainty = "invalid"
    elif ambiguous:
        certainty = "possible_route_ambiguous"
    else:
        certainty = "consistent_sequence"
    return {
        "status": status,
        "checks": checks,
        "hops": hops,
        "certainty": certainty,
        "note": (
            "Transfers show a time-ordered sequence, not that the same funds moved. "
            "Intermediate balances before the period are unobserved."
            + (" Other inflows at intermediate nodes make attribution ambiguous." if ambiguous else "")
        ),
    }
