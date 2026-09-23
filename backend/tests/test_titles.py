"""Generated conversation titles: cleanup of the model's reply, background update, manual rename wins."""

from fastapi.testclient import TestClient

from app import titles


def test_clean_title():
    assert titles.clean_title('Title: "Поиск транзитных счетов."\n') == "Поиск транзитных счетов"
    assert titles.clean_title("«сбор средств через коллекторов»") == "Сбор средств через коллекторов"
    assert titles.clean_title("one two three four five six seven eight") == "One two three four five six"
    assert titles.clean_title("   \n  ") is None


def test_title_generated_in_background(env, monkeypatch):
    async def fake(message):
        return "Поиск организованной группы"
    monkeypatch.setattr(titles, "generate_title", fake)
    from app.api.main import app
    client = TestClient(app)
    brief = "Найти организованную группу среди обычных операций"
    inv = client.post("/investigations", json={"dataset_id": env["dataset"]["id"], "title": brief, "brief": brief,
                                               "start": False, "generate_title": True}).json()["investigation"]
    # The background task runs after the response; TestClient waits for it.
    got = client.get(f"/investigations/{inv['id']}").json()
    assert got["title"] == "Поиск организованной группы" and got["title_status"] == "ready"


def test_manual_rename_is_final(env, monkeypatch):
    async def failing(message):
        raise RuntimeError("model unavailable")
    monkeypatch.setattr(titles, "generate_title", failing)
    from app.api.main import app
    client = TestClient(app)
    inv = client.post("/investigations", json={"dataset_id": env["dataset"]["id"], "title": "temp", "brief": "x",
                                               "start": False, "generate_title": True}).json()["investigation"]
    assert client.get(f"/investigations/{inv['id']}").json()["title_status"] == "failed"  # temporary title stays
    renamed = client.patch(f"/investigations/{inv['id']}", json={"title": "Моё название"}).json()
    assert renamed["title"] == "Моё название" and renamed["title_status"] == "final"
