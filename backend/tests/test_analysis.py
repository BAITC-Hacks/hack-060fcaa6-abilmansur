from test_data import DATA

from money_graph.analysis import analyze, classify
from money_graph.data import Dataset


def metrics(**overrides):
    return dict(
        in_degree=1,
        out_degree=0,
        in_kzt=10000,
        out_kzt=0,
        depth=2,
        is_seed=False,
        seed_reach=0,
        betweenness=0,
        betweenness_rank=0,
        **overrides,
    )


def test_boundary_and_seeds_are_not_terminal():
    for key, value in [("depth", 4), ("is_seed", True)]:
        m = metrics()
        m[key] = value
        assert classify(m)[0] == "peripheral"
    assert classify(metrics())[0] == "terminal"


def test_incomplete_income_does_not_imply_transit():
    m = metrics()
    m.update(out_degree=2, out_kzt=25000)
    assert classify(m)[0] != "transit"


def test_full_analysis_is_reproducible_and_preserves_isolates():
    data = Dataset.load(DATA)
    a, b = analyze(data), analyze(data)
    assert a.nodes == b.nodes
    assert len(a.nodes) == 2248
    assert len(a.top(20)) == 20
    assert sum(c["n_nodes"] for c in a.clusters) == 2248
    assert sum(c["n_seed"] for c in a.clusters) == 81
    for node in a.nodes:
        assert 0 <= node["role_score"] <= 1
        assert 0 <= node["priority_score"] <= 1
        assert 0 < len(node["evidence"]) <= 200
        if node["depth"] == 4:
            assert node["role"] != "terminal"


def test_roles_have_distinct_explainable_signals():
    cases = [
        ({"in_degree": 5, "out_degree": 1, "out_kzt": 1000}, "consolidator"),
        ({"in_degree": 1, "out_degree": 5, "out_kzt": 20000}, "distributor"),
        ({"in_degree": 1, "out_degree": 1, "out_kzt": 9000}, "transit"),
        (
            {
                "in_degree": 3,
                "out_degree": 3,
                "seed_reach": 4,
                "betweenness": 0.1,
                "betweenness_rank": 0.95,
            },
            "coordinator",
        ),
        ({"in_degree": 0, "out_degree": 0, "in_kzt": 0}, "peripheral"),
    ]
    for patch, expected in cases:
        node = metrics()
        node.update(patch)
        assert classify(node)[0] == expected


def test_boundary_consolidation_has_lower_confidence():
    node = metrics()
    node.update(in_degree=5)
    observed = classify(node)
    node["depth"] = 4
    boundary = classify(node)
    assert boundary[0] == observed[0] == "consolidator"
    assert boundary[1] < observed[1]
