import pytest
from fastapi.testclient import TestClient
from test_data import DATA

from money_graph.api import create_app


@pytest.fixture(scope="module")
def client():
    with TestClient(create_app(DATA, ai_enabled=False)) as client:
        yield client


def test_top_and_node_preserve_identifiers(client):
    top = client.get("/api/v1/top?limit=20").json()
    assert len(top["items"]) == 20
    gid = top["items"][0]["gid"]
    assert isinstance(gid, str)
    node = client.get(f"/api/v1/nodes/{gid}")
    assert node.status_code == 200
    assert node.json()["gid"] == gid
    assert "priority_components" in node.json()


def test_pagination_filters_and_errors(client):
    data = client.get("/api/v1/nodes?role=terminal&limit=3").json()
    assert len(data["items"]) == 3
    assert all(n["role"] == "terminal" for n in data["items"])
    assert client.get("/api/v1/nodes?limit=0").status_code == 422
    assert client.get("/api/v1/nodes?role=unknown").status_code == 422
    assert client.get("/api/v1/nodes/42").status_code == 404


def test_graph_edges_have_endpoints(client):
    graph = client.get("/api/v1/graph?limit=30").json()
    ids = {n["gid"] for n in graph["nodes"]}
    assert all(e["src"] in ids and e["dst"] in ids for e in graph["edges"])
    assert graph["truncated"]


def test_exports_and_disabled_assistant(client):
    response = client.get("/api/v1/exports/nodes_roles.csv")
    assert response.status_code == 200
    assert len(response.text.splitlines()) == 2249
    assert client.get("/api/v1/exports/arbitrary.csv").status_code == 404
    response = client.post("/api/v1/assistant/query", json={"question": "Кто собирает деньги?"})
    assert response.status_code == 503


def test_directed_path_and_transaction_identifiers(client):
    graph = client.get("/api/v1/graph?limit=5000").json()
    assert len(graph["nodes"]) == 2248
    assert not graph["truncated"]
    edge = graph["edges"][0]
    path = client.get("/api/v1/paths", params={"src": edge["src"], "dst": edge["dst"]})
    assert path.json()["path"] == [edge["src"], edge["dst"]]
    tx = client.get(f"/api/v1/nodes/{edge['src']}/transactions").json()
    assert tx["items"]
    assert isinstance(tx["items"][0]["src"], str)


def test_rebuild_preserves_last_snapshot_on_bad_data(tmp_path):
    import shutil

    for source in DATA.glob("*.parquet"):
        shutil.copy(source, tmp_path / source.name)
    with TestClient(create_app(tmp_path, ai_enabled=False)) as client:
        before = client.get("/api/v1/summary").json()
        (tmp_path / "edges.parquet").write_bytes(b"invalid")
        assert client.post("/api/v1/analysis/rebuild").status_code == 422
        assert client.get("/api/v1/summary").json() == before


def test_assistant_success_returns_validated_response(client):
    from money_graph.schemas import AssistantAnswer

    class FakeAssistant:
        async def answer(self, question, context):
            assert context["nodes"]
            return AssistantAnswer(
                answer="Гипотеза требует проверки.",
                cited_gids=[context["nodes"][0]["gid"]],
                limitations=["Неполный граф"],
                suggested_checks=[],
            )

    original = client.app.state.assistant
    try:
        client.app.state.assistant = FakeAssistant()
        response = client.post("/api/v1/assistant/query", json={"question": "Кто собирает деньги?"})
        assert response.status_code == 200
        assert response.json()["cited_gids"]
    finally:
        client.app.state.assistant = original
