"""Graph scoring pipeline: role rules, censoring, outputs, CLI, and import of a three-file dataset."""

import time
from pathlib import Path

import pandas as pd
import pytest
from fastapi.testclient import TestClient

from app import pipeline

REAL_DATA = Path(__file__).resolve().parents[2] / "data"
TASK_ROLES = {"consolidator", "transit", "distributor", "terminal", "coordinator", "peripheral"}


def _crawl(tmp: Path) -> Path:
    """Six seeds pay a collector C; C -> T -> D forward within a day, three days running; D fans out to six
    last-hop nodes (depth 4, never expanded). Seed s1 also pays x, which sends nothing (depth 1)."""
    ids = {name: 1000 + i for i, name in enumerate(
        ["s1", "s2", "s3", "s4", "s5", "s6", "C", "x", "T", "D", "r1", "r2", "r3", "r4", "r5", "r6"])}
    depth = {**{f"s{i}": 0 for i in range(1, 7)}, "C": 1, "x": 1, "T": 2, "D": 3,
             **{f"r{i}": 4 for i in range(1, 7)}}
    tx = []
    for day in (1, 2, 3):
        d = pd.Timestamp(f"2026-07-0{day}")
        tx += [(f"s{i}", "C", d, 10_000.0) for i in range(1, 7)]
        tx += [("C", "T", d, 55_000.0), ("T", "D", d, 50_000.0)]
        tx += [("D", f"r{i}", d + pd.Timedelta(days=1), 8_000.0) for i in range(1, 7)]
    tx.append(("s1", "x", pd.Timestamp("2026-07-05"), 7_000.0))
    t = pd.DataFrame(tx, columns=["src", "dst", "date", "sum_kzt"])
    t["src"], t["dst"] = t["src"].map(ids), t["dst"].map(ids)
    t["date"] = t["date"].dt.date
    e = t.groupby(["src", "dst"]).agg(sum_kzt=("sum_kzt", "sum"), n_tx=("sum_kzt", "size")).reset_index()
    by_id = {v: k for k, v in ids.items()}
    e["depth"] = e["src"].map(lambda g: depth[by_id[g]] + 1).astype("int8")
    n = pd.DataFrame({"gid": list(ids.values()), "depth": [depth[k] for k in ids],
                      "is_seed": [depth[k] == 0 for k in ids]})
    tmp.mkdir(parents=True, exist_ok=True)
    n.to_parquet(tmp / "nodes.parquet")
    e.to_parquet(tmp / "edges.parquet")
    t.to_parquet(tmp / "transactions.parquet")
    return tmp


@pytest.fixture
def crawl(tmp_path):
    return _crawl(tmp_path / "crawl")


def test_roles_follow_rules(crawl):
    res = pipeline.analyze(crawl)
    role = dict(zip(res.nodes["gid"], res.nodes["role"]))
    assert role[1006] == "consolidator"      # C: six senders, one receiver
    assert role[1008] == "transit"           # T: forwards within the window, three times
    assert role[1009] == "distributor"       # D: six receivers
    assert role[1007] == "terminal"          # x: depth 1, outgoing observed and empty
    assert set(res.nodes["role"]) <= TASK_ROLES
    idx = res.nodes.set_index("gid")
    assert idx.loc[1006, "seeds_upstream"] == 6 and idx.loc[1006, "seeds_direct"] == 6
    assert idx.loc[1009, "seeds_upstream"] == 6   # D: three transfers below the seeds
    assert pd.isna(idx.loc[1000, "retention"])     # a seed: inflow from outside the crawl is invisible
    r = idx.loc[1010]
    assert r["censored"] and r["role"] != "terminal"  # depth 4: outgoing unknown


def test_outputs_and_cli(crawl, tmp_path):
    out = tmp_path / "out"
    assert pipeline.main(["--data", str(crawl), "--out", str(out)]) == 0
    assert sorted(p.name for p in out.iterdir()) == sorted(pipeline.OUTPUTS)
    nodes = pd.read_csv(out / "nodes_roles.csv")
    for col in ("gid", "role", "role_score", "cluster_id", "priority_score", "rank", "evidence"):
        assert col in nodes
    assert nodes["priority_score"].between(0, 1).all() and nodes["role_score"].between(0, 1).all()
    assert sorted(nodes["rank"]) == list(range(1, len(nodes) + 1))
    assert nodes["evidence"].str.len().between(1, 200).all()
    top = pd.read_csv(out / "top_nodes.csv")
    assert list(top.columns[:5]) == ["rank", "gid", "role", "priority_score", "why"]
    clusters = pd.read_csv(out / "clusters.csv")
    assert {"n_nodes", "n_seed", "sum_kzt_internal", "top_gids", "hypothesis"} <= set(clusters.columns)
    assert clusters["n_nodes"].sum() == len(nodes)


def test_missing_file_is_reported(crawl, tmp_path):
    (crawl / "edges.parquet").unlink()
    assert pipeline.main(["--data", str(crawl), "--out", str(tmp_path / "o")]) == 2


@pytest.mark.skipif(not (REAL_DATA / "nodes.parquet").is_file(), reason="task dataset not present")
def test_task_dataset(tmp_path):
    started = time.perf_counter()
    res = pipeline.run(REAL_DATA, tmp_path)
    assert time.perf_counter() - started < 300
    n = res.nodes
    assert len(n) == 2248 and n["gid"].is_unique
    assert len(res.top) >= 20 and list(res.top["rank"]) == list(range(1, len(res.top) + 1))
    assert int(n["censored"].sum()) == 444
    assert not ((n["role"] == "terminal") & n["censored"]).any()
    assert set(n["role"]) == TASK_ROLES
    assert n["evidence"].str.len().max() <= 200
    assert not n.head(20)["is_seed"].any()  # the ranking leads above the known seeds
    assert res.top["why"].str.len().gt(0).all()


def test_graph_dataset_import(env, crawl):
    from app.api.main import app
    client = TestClient(app)
    files = {k: (f"{k}.parquet", (crawl / f"{k}.parquet").read_bytes()) for k in pipeline.FILES}
    ds = client.post("/datasets/graph", files=files, data={"name": "crawl"}).json()
    assert ds["profile"]["kind"] == "graph" and ds["row_count"] == 43
    assert ds["profile"]["graph"]["censored_nodes"] == 6
    listed = client.get(f"/datasets/{ds['id']}/outputs").json()
    assert [o["name"] for o in listed] == list(pipeline.OUTPUTS)
    csv = client.get(f"/datasets/{ds['id']}/outputs/top_nodes.csv")
    assert csv.status_code == 200 and csv.text.startswith("rank,gid")
    assert client.post(f"/datasets/{ds['id']}/pipeline").status_code == 200

    from app import duck
    con = duck.connect(ds["path"])
    (n,) = con.execute("SELECT count(*) FROM tx JOIN node_roles r ON r.gid = CAST(tx.receiver_id AS BIGINT) "
                       "WHERE r.role = 'consolidator'").fetchone()
    assert n == 18

    bad = dict(files)
    bad.pop("edges")
    assert client.post("/datasets/graph", files=bad, data={"name": "x"}).status_code == 422


# --------------------------------------------------------------------------- regressions from the first graph run

@pytest.fixture
def graph_tools(env, tmp_path):
    """Agent tools over the crawl fixture imported as a graph dataset."""
    import asyncio
    import json

    from app import datasets, db
    from app.agent.tools import RunContext, build_tools
    crawl = _crawl(tmp_path / "g")
    ds = datasets.ingest_graph({k: crawl / f"{k}.parquet" for k in pipeline.FILES}, "crawl")
    inv = db.new_id("inv")
    db.insert("investigations", {"id": inv, "dataset_id": ds["id"], "title": "t", "workspace": str(tmp_path),
                                 "created_at": db.now(), "updated_at": db.now()})
    run = db.new_id("run")
    db.insert("runs", {"id": run, "investigation_id": inv, "kind": "investigate", "prompt": "t",
                       "status": "running", "created_at": db.now()})
    tools = build_tools(RunContext(inv, run, "investigate", ds["path"], tmp_path))

    def call(name, **args):
        res = asyncio.run(next(t for t in tools if t.name == name).handler(args))
        return json.loads(res["content"][0]["text"]), res.get("is_error", False)
    return call, ds


def test_node_card_facts(graph_tools):
    call, _ = graph_tools
    card, err = call("node_card", account_id="1008")          # T: receives from C, forwards to D
    assert not err and card["card"]["out_tx"] == 3 and not card["can_be_final_recipient"]
    assert any("Отдал дальше" in f for f in card["facts"])
    edge, _ = call("node_card", account_id="1010")            # depth 4
    assert edge["card"]["censored"] and any("не наблюдались" in f for f in edge["facts"])
    leaf, _ = call("node_card", account_id="1007")            # depth 1, no outgoing
    assert leaf["can_be_final_recipient"]
    _, err = call("node_card", account_id="10")               # shortened id
    assert err


def test_final_recipient_needs_observed_empty_outflow(graph_tools):
    call, _ = graph_tools
    v, _ = call("create_version", title="v", summary="s", confidence=0.5)
    member = dict(version_id=v["version_id"], confidence=0.5, inclusion_basis="b", alternative_explanation="a",
                  missing_information="m", evidence_ids=[], status="uncertain", role="final_recipient")
    out, err = call("set_member", account_id="1008", **member)   # sends money on
    assert err and "sends money on" in out["error"]
    out, err = call("set_member", account_id="1010", **member)   # last crawl hop
    assert err and "last crawl hop" in out["error"]
    _, err = call("set_member", account_id="1007", **member)     # observed, nothing sent on
    assert not err


def test_finish_reports_unreviewed_top_nodes(graph_tools):
    call, _ = graph_tools
    out, err = call("finish_run", summary="done")
    assert err and any("top-20" in g for g in out["gaps"])
    _, err = call("finish_run", summary="done", acknowledge_gaps="checked only C and D")
    assert not err


def test_cluster_flows_split_seeds(crawl):
    res = pipeline.analyze(crawl)
    c, n = res.clusters, res.nodes
    assert c["in_kzt_nonseed"].sum() + c["in_kzt_seeds"].sum() == pytest.approx(n["in_sum_kzt"].sum())
    assert c["out_kzt_seeds"].sum() == pytest.approx(n.loc[n["is_seed"], "out_sum_kzt"].sum())


def test_depth_peer_percentiles(crawl):
    n = pipeline.analyze(crawl).nodes.set_index("gid")
    # Seeds are compared with seeds: s1 pays two receivers, the other five one each.
    assert n.loc[1000, "peer_out_degree"] == 1.0 and n.loc[1001, "peer_out_degree"] == 0.0
    # A value every peer shares scores 0, not "top percentile"; the last hop has no out-degree comparison.
    assert (n.loc[n["depth"] == 4, "peer_in_degree"] == 0).all()
    assert n.loc[n["censored"], "peer_out_degree"].isna().all()
    assert "out_degree" in n.loc[1000, "depth_outliers"]


def test_report_text_checks(graph_tools):
    call, _ = graph_tools
    # The fixture's gids are 4-digit; a report on them passes, board role names do not.
    out, err = call("finish_run", summary="1006 — collector, 1007 — final_recipient", acknowledge_gaps="x")
    assert err and out["board_roles"] == {"collector": "consolidator", "final_recipient": "terminal"}
    _, err = call("finish_run", summary="1006 — consolidator, 1007 — terminal", acknowledge_gaps="x")
    assert not err


def test_shortened_gid_is_refused():
    from app.agent import tools
    gids = {"100000003115284100"}
    text = "узел 003115284100 и 100000003115284100"
    short = [m for m in tools.SHORT_ID.findall(text) if any(g.endswith(m) for g in gids)]
    assert short == ["003115284100"]


def test_resilience_top_removal_hurts_more(crawl):
    res = pipeline.analyze(crawl)
    r = pipeline.resilience(crawl, res.nodes)
    first = r["steps"][0]
    # The fixture's chain C -> T -> D carries everything: removing the top nodes cuts the seeds off.
    assert first["top"]["reachable_from_seeds"] < r["baseline"]["reachable_from_seeds"]
    assert first["top"]["reachable_from_seeds"] <= first["random"]["reachable_from_seeds"]
