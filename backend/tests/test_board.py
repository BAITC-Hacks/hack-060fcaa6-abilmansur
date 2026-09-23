"""Exercises the agent's tools, verification and API views without calling the model."""

import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app import db, duck, verification
from app.agent.tools import RunContext, build_tools


def call(tools, name, **args):
    t = next(t for t in tools if t.name == name)
    import asyncio
    res = asyncio.run(t.handler(args))
    return json.loads(res["content"][0]["text"]), res.get("is_error", False)


@pytest.fixture(scope="module")
def setup(env):
    from app.api.main import app
    client = TestClient(app)
    inv = client.post("/investigations", json={"dataset_id": env["dataset"]["id"], "title": "test", "start": False}).json()
    inv_id = inv["investigation"]["id"]
    run_id = db.new_id("run")
    db.insert("runs", {"id": run_id, "investigation_id": inv_id, "kind": "investigate", "prompt": "t",
                       "status": "running", "created_at": db.now()})
    ctx = RunContext(inv_id, run_id, "investigate", env["dataset"]["path"], Path(inv["investigation"]["workspace"]))
    return {"client": client, "inv_id": inv_id, "tools": build_tools(ctx), "ctx": ctx, **env}


def group_tx(setup, sender, receiver):
    con = duck.connect(setup["dataset"]["path"])
    return con.execute("SELECT tx_id, amount FROM tx WHERE sender_id = ? AND receiver_id = ? ORDER BY ts",
                       [sender, receiver]).fetchall()


def roles(setup, role):
    return [a for a, r in setup["truth"]["members"].items() if r == role]


def test_sql_is_readonly(setup):
    out, err = call(setup["tools"], "sql", query="SELECT count(*) AS n FROM tx", purpose="count")
    assert not err and out["rows"][0][0] == setup["dataset"]["row_count"] and out["query_id"]
    _, err = call(setup["tools"], "sql", query="COPY (SELECT 1) TO '/tmp/x.csv'", purpose="x")
    assert err
    _, err = call(setup["tools"], "sql", query="SELECT * FROM read_csv('/etc/hosts')", purpose="x")
    assert err


def test_stage_prerequisites_are_advisory(setup):
    t = setup["tools"]
    out, err = call(t, "set_stage", stage="candidate_review", note="skip ahead")
    assert not err and out["stage"] == "candidate_review" and out["warnings"]
    call(t, "save_dataset_passport", fields=[{"name": "amount", "meaning": "sum"}], period="2025H1",
         currencies=["KZT", "USD"], quality_issues=[], limitations=["no balances"])
    call(t, "record_coverage", scope_kind="network", scope="all", method="features", result="ok")
    call(t, "record_coverage", scope_kind="pattern_scan", scope="all", method="repeated_routes", result="ok")
    for label in ("a", "b"):
        call(t, "add_candidate", label=label, accounts=["X"], patterns=["transit"], discovered_by="t", priority=0.9)
    out, err = call(t, "set_stage", stage="candidate_review", note="ready")
    assert not err and out["warnings"] == []


def test_evidence_verification(setup):
    t = setup["tools"]
    collector, transit = roles(setup, "collector")[0], roles(setup, "transit")
    rows = [r for tr in transit for r in group_tx(setup, collector, tr)]
    ids = [r[0] for r in rows]
    total = sum(r[1] for r in rows)
    q, _ = call(t, "sql", query="SELECT 1", purpose="p")
    base = dict(title="t", claim="c", observed_features=["f"], tx_ids=ids, accounts=[collector],
                period_start="2025-01-01", period_end="2025-12-31", query_id=q["query_id"],
                limitations="l", alternatives="a")
    out, err = call(t, "add_evidence", **base, claimed={"tx_count": len(ids) + 1})
    assert err and out["failed_checks"][0]["check"] == "claimed_tx_count"
    out, err = call(t, "add_evidence", **base, claimed={"tx_count": len(ids), "total_amount": total, "currency": "KZT"})
    assert not err, out
    setup["ev"] = out["evidence_id"]
    _, err = call(t, "add_evidence", **{**base, "tx_ids": ["nope"]}, claimed={})
    assert err


def test_version_members_links_trails(setup):
    t = setup["tools"]
    v, _ = call(t, "create_version", title="v1", summary="s", confidence=0.6)
    vid = v["version_id"]
    collector = roles(setup, "collector")[0]
    out, err = call(t, "set_member", version_id=vid, account_id=collector, role="organizer", confidence=0.9,
                    inclusion_basis="b", alternative_explanation="a", missing_information="m",
                    evidence_ids=[setup["ev"]], status="included")
    assert err and "organizer" in out["error"]
    _, err = call(t, "set_member", version_id=vid, account_id=collector, role="collector", confidence=0.8,
                  inclusion_basis="b", alternative_explanation="a", missing_information="m",
                  evidence_ids=[setup["ev"]], status="included")
    assert not err
    # a transit account that actually received from this collector
    tr = next(x for x in roles(setup, "transit") if x.startswith("P") and group_tx(setup, collector, x))
    shell = next(s for s in roles(setup, "transit") if s.startswith("C") and group_tx(setup, tr, s))
    step1 = [r[0] for r in group_tx(setup, collector, tr)]
    step2 = [r[0] for r in group_tx(setup, tr, shell)]
    out, err = call(t, "add_link", version_id=vid, source=collector, target=tr, kind="transfer", tx_ids=step2,
                    rationale="wrong direction")
    assert err
    out, err = call(t, "add_link", version_id=vid, source=collector, target=tr, kind="transfer", tx_ids=step1,
                    rationale="r")
    assert not err and out["stats"]["tx_count"] == len(step1)
    out, err = call(t, "add_trail", version_id=vid, title="route",
                    steps=[{"from": collector, "to": tr, "tx_ids": step1}, {"from": tr, "to": shell, "tx_ids": step2}])
    assert not err, out
    assert out["certainty"] in ("possible_route_ambiguous", "consistent_sequence")
    # transit gets money from several collectors -> attribution must be ambiguous
    assert out["certainty"] == "possible_route_ambiguous"
    out, err = call(t, "update_version", version_id=vid, status="final", reason="r")
    assert err  # no objections considered yet
    o, _ = call(t, "add_objection", version_id=vid, target_kind="member", target_ref=collector, text="payroll?")
    _, err = call(t, "resolve_objection", objection_id=o["objection_id"], status="refuted", resolution="no")
    assert err  # needs evidence
    _, err = call(t, "resolve_objection", objection_id=o["objection_id"], status="refuted", resolution="no",
                  evidence_ids=[setup["ev"]])
    assert not err
    _, err = call(t, "update_version", version_id=vid, status="final", reason="r")
    assert not err
    setup["vid"] = vid


def test_finish_requires_ack(setup):
    out, err = call(setup["tools"], "finish_run", summary="s")
    assert err and out["gaps"]
    _, err = call(setup["tools"], "finish_run", summary="s", acknowledge_gaps="test")
    assert not err


def test_api_views(setup):
    c, inv, vid = setup["client"], setup["inv_id"], setup["vid"]
    board = c.get(f"/investigations/{inv}/board").json()
    assert board["versions"][0]["members"] and board["candidates"]
    g = c.get(f"/investigations/{inv}/versions/{vid}/graph", params={"context": 3}).json()
    assert g["nodes"] and g["edges"] and g["trails"]
    assert any(e["attributes"].get("asserted") for e in g["edges"])
    tl = c.get(f"/investigations/{inv}/versions/{vid}/timeline").json()
    assert tl["frames"] and [f["frame"] for f in tl["frames"]] == sorted(f["frame"] for f in tl["frames"])
    acct = g["nodes"][0]["key"]
    card = c.get(f"/investigations/{inv}/accounts/{acct}").json()
    assert card["memberships"]
    ev = c.get(f"/investigations/{inv}/evidence/{setup['ev']}").json()
    assert ev["transactions"] and ev["query_sql"]
    assert c.post(f"/investigations/{inv}/evidence/{setup['ev']}/reverify").json()["status"] == "verified"
    db.update("runs", {"id": setup["ctx"].run_id}, {"status": "completed"})
    run = c.post(f"/investigations/{inv}/ask", json={"mode": "why", "account_id": acct, "version_id": vid}).json()
    assert run["kind"] == "question" and acct in run["prompt"]
    assert c.post(f"/investigations/{inv}/ask", json={"mode": "why"}).status_code == 422
    assert c.post(f"/investigations/{inv}/runs", json={"prompt": "x"}).status_code == 409  # one active run
    assert c.post(f"/runs/{run['id']}/cancel").json()["status"] == "cancelled"
    events = c.get(f"/runs/{run['id']}/events/history").json()
    assert [e["type"] for e in events] == ["run_queued", "run_finished"]
    with c.stream("GET", f"/runs/{run['id']}/events") as r:
        body = "".join(r.iter_text())
    assert "event: run_finished" in body


def test_period_end_date_is_inclusive():
    from datetime import datetime

    from app.verification import _parse_ts

    # A transfer made during the last declared day is inside the period.
    assert _parse_ts("2025-03-24", end=True) >= datetime(2025, 3, 24, 18, 30)
    assert _parse_ts("2025-03-24") == datetime(2025, 3, 24)
    assert _parse_ts("2025-03-24T12:00:00", end=True) == datetime(2025, 3, 24, 12)


def test_evidence_from_tx_query(setup):
    """Transactions can be referenced by the query that selects them, without copying ids."""
    t = setup["tools"]
    collector = roles(setup, "collector")[0]
    rows = [r for tr in roles(setup, "transit") for r in group_tx(setup, collector, tr)]
    total = round(sum(r[1] for r in rows), 2)
    where = f"sender_id = '{collector}' AND receiver_id IN ({', '.join(repr(x) for x in roles(setup, 'transit'))})"
    q, err = call(t, "sql", query=f"SELECT tx_id, ts, amount FROM tx WHERE {where}", purpose="collector -> transit")
    assert not err
    base = dict(title="t", claim="c", observed_features=["f"], accounts=[collector], tx_query_id=q["query_id"],
                period_start="2025-01-01", period_end="2025-12-31", limitations="l", alternatives="a")
    out, err = call(t, "add_evidence", **base, claimed={"tx_count": len(rows), "total_amount": total, "currency": "KZT"})
    assert not err, out  # query_id defaults to tx_query_id
    ev = db.fetch_one("SELECT tx_ids, query_id FROM evidence WHERE id = ?", (out["evidence_id"],))
    assert sorted(ev["tx_ids"]) == sorted(r[0] for r in rows) and ev["query_id"] == q["query_id"]

    out, err = call(t, "add_evidence", **base, claimed={"tx_count": len(rows) + 5})
    assert err and out["recomputed_from_referenced_tx"]["tx_count"] == len(rows)

    bad, _ = call(t, "sql", query="SELECT count(*) AS n FROM tx", purpose="no tx_id column")
    out, err = call(t, "add_evidence", **{**base, "tx_query_id": bad["query_id"]})
    assert err and "tx_id" in out["error"]


def test_link_from_tx_query_and_sql_budget(setup):
    t = setup["tools"]
    collector, transit = roles(setup, "collector")[0], roles(setup, "transit")[0]
    ver, _ = call(t, "create_version", title="v", summary="s", confidence=0.5)
    q, _ = call(t, "sql", query=f"SELECT tx_id FROM tx WHERE sender_id = '{collector}' AND receiver_id = '{transit}'",
                purpose="link")
    out, err = call(t, "add_link", version_id=ver["version_id"], source=collector, target=transit, kind="transfer",
                    tx_query_id=q["query_id"], rationale="r")
    assert not err and out["stats"]["tx_count"] == len(group_tx(setup, collector, transit))

    # Raw listings are cut to a character budget, with a pointer to tx_query_id.
    big, err = call(t, "sql", query="SELECT * FROM tx", purpose="raw dump")
    assert not err and big["truncated"] and "tx_query_id" in big["note"]
    assert len(json.dumps(big["rows"], ensure_ascii=False)) <= 20_000

    # Informational fields are optional.
    _, err = call(t, "update_version", version_id=ver["version_id"], confidence=0.6)
    assert not err
