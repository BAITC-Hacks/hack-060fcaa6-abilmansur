import asyncio

import pytest
from test_data import DATA

from money_graph.analysis import analyze
from money_graph.assistant import AssistantUnavailable, CodexAssistant, context_for
from money_graph.data import Dataset
from money_graph.schemas import Question


def test_context_keeps_selected_nodes_and_limits_payload():
    result = analyze(Dataset.load(DATA))
    gids = [str(n["gid"]) for n in result.nodes if n["is_seed"]][:5]
    context = context_for(result, Question(question="Кто собирает деньги?", gids=gids, hops=4))
    assert set(gids).issubset({n["gid"] for n in context["nodes"]})
    assert len(context["nodes"]) <= 80
    assert len(context["edges"]) <= 200
    with pytest.raises(KeyError):
        context_for(result, Question(question="Кто это?", gids=["42"]))


def test_timeout_is_a_controlled_error(monkeypatch):
    async def slow(*args):
        await asyncio.sleep(1)

    assistant = CodexAssistant(enabled=True, timeout=0.01)
    monkeypatch.setattr(assistant, "_run", slow)
    with pytest.raises(AssistantUnavailable, match="отведённое время"):
        asyncio.run(assistant.answer(Question(question="Тест"), {}))


def test_provider_error_is_not_exposed(monkeypatch):
    async def failure(*args):
        raise RuntimeError("secret-provider-token")

    assistant = CodexAssistant(enabled=True)
    monkeypatch.setattr(assistant, "_run", failure)
    with pytest.raises(AssistantUnavailable) as error:
        asyncio.run(assistant.answer(Question(question="Тест"), {}))
    assert "secret-provider-token" not in str(error.value)


@pytest.mark.parametrize("gids", [["-1"], ["1.5"], [str(2**63)], [123]])
def test_question_rejects_unsafe_identifiers(gids):
    with pytest.raises(ValueError):
        Question(question="Тест", gids=gids)


def test_personal_tools_are_disabled_without_modifying_config(tmp_path, monkeypatch):
    from money_graph.assistant import restricted_config

    config = tmp_path / "config.toml"
    original = (
        '[mcp_servers.personal]\ncommand="example"\n'
        '[profiles.work.mcp_servers.bank]\ncommand="example"\n'
    )
    config.write_text(original)
    monkeypatch.setenv("CODEX_HOME", str(tmp_path))
    restrictions = restricted_config()
    assert restrictions["mcp_servers"] == {
        "personal": {"enabled": False},
        "bank": {"enabled": False},
    }
    assert not any(restrictions["features"].values())
    assert config.read_text() == original
