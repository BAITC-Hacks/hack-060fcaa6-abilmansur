"""Runs one investigation run with the Claude Agent SDK and streams progress into the event log."""

import asyncio
import logging
import os
import re
import sys
from pathlib import Path
from typing import Any

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    ResultMessage,
    SystemMessage,
    TextBlock,
    ToolResultBlock,
    ToolUseBlock,
    UserMessage,
)

from app import db
from app.agent.prompts import SYSTEM_PROMPT, dataset_instruction, language_instruction, run_prompt
from app.agent.state import state_brief
from app.agent.tools import RunContext, build_server
from app.config import get_settings

log = logging.getLogger(__name__)

BACKEND_ROOT = Path(__file__).resolve().parents[2]
BUILTIN_TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep", "TodoWrite"]
PREVIEW_CHARS = 1500


def _preview(value: Any, limit: int = PREVIEW_CHARS) -> str:
    text = value if isinstance(value, str) else db.dumps(value)
    return text if len(text) <= limit else text[:limit] + f"… [+{len(text) - limit} chars]"


def _clip_input(value: Any, limit: int = PREVIEW_CHARS) -> Any:
    """Tool input for the activity timeline: keeps the structure (the UI labels steps from its fields),
    only long strings are clipped."""
    if isinstance(value, str):
        return value if len(value) <= limit else value[:limit] + f"… [+{len(value) - limit} chars]"
    if isinstance(value, dict):
        return {k: _clip_input(v, limit) for k, v in value.items()}
    if isinstance(value, list):
        clipped = [_clip_input(v, limit) for v in value[:50]]
        return clipped + [f"… [+{len(value) - 50} items]"] if len(value) > 50 else clipped
    return value


def _tool_result_text(block: ToolResultBlock) -> str:
    if isinstance(block.content, list):
        return "\n".join(part.get("text", "") for part in block.content if isinstance(part, dict))
    return block.content or ""


def _session_exists(workspace: Path, session_id: str) -> bool:
    """The CLI stores a session transcript per working directory; resume only what is actually on disk."""
    config_dir = Path(os.environ.get("CLAUDE_CONFIG_DIR", Path.home() / ".claude")).expanduser()
    project = re.sub(r"[^A-Za-z0-9]", "-", str(workspace.resolve()))
    return (config_dir / "projects" / project / f"{session_id}.jsonl").is_file()


def previous_run(run: dict[str, Any], workspace: Path) -> dict[str, Any] | None:
    """The investigation's latest earlier run whose agent session can be resumed: every message in a thread
    continues one conversation, so the agent remembers what was said and done (including an interrupted run)."""
    prev = db.fetch_one(
        "SELECT id, kind, prompt, status, session_id FROM runs WHERE investigation_id = ? AND id != ? "
        "AND session_id IS NOT NULL AND created_at <= ? ORDER BY created_at DESC LIMIT 1",
        (run["investigation_id"], run["id"], run["created_at"]))
    return prev if prev and _session_exists(workspace, prev["session_id"]) else None


def build_options(ctx: RunContext, resume: str | None = None, dataset_notes: str = "") -> ClaudeAgentOptions:
    settings = get_settings()
    server, mcp_tool_names = build_server(ctx)
    python_bin = str(Path(sys.executable).parent)
    env = {
        "DATASET_PATH": ctx.dataset_path,
        "PYTHONPATH": str(BACKEND_ROOT),
        "PATH": f"{python_bin}:{os.environ.get('PATH', '')}",
        "INVESTIGATION_ID": ctx.investigation_id,
    }
    return ClaudeAgentOptions(
        system_prompt={"type": "preset", "preset": "claude_code",
                       "append": SYSTEM_PROMPT + dataset_notes + language_instruction(settings.report_language)},
        model=settings.agent_model,
        effort=settings.agent_effort,
        cwd=str(ctx.workspace),
        cli_path=settings.claude_cli_path,
        mcp_servers={"inv": server},
        # Only the investigation server: no MCP servers / claude.ai connectors from the user's own Claude setup.
        extra_args={"strict-mcp-config": None},
        allowed_tools=BUILTIN_TOOLS + mcp_tool_names,
        disallowed_tools=["WebFetch", "WebSearch"],
        # Anything not pre-approved above is denied; the agent runs inside its container.
        permission_mode="dontAsk",
        setting_sources=[],
        max_turns=settings.agent_max_turns,
        max_budget_usd=settings.agent_max_budget_usd,
        resume=resume,
        env=env,
        stderr=lambda line: log.debug("claude-cli: %s", line),
    )


async def _watch_cancel(run_id: str, client: ClaudeSDKClient, cancelled: asyncio.Event) -> None:
    while not cancelled.is_set():
        await asyncio.sleep(2)
        row = db.fetch_one("SELECT status FROM runs WHERE id = ?", (run_id,))
        if row and row["status"] == "cancelling":
            cancelled.set()
            await client.interrupt()


async def execute_run(run: dict[str, Any]) -> None:
    run_id = run["id"]
    inv = db.fetch_one("SELECT * FROM investigations WHERE id = ?", (run["investigation_id"],))
    dataset = db.fetch_one("SELECT * FROM datasets WHERE id = ?", (inv["dataset_id"],))
    workspace = Path(inv["workspace"])
    (workspace / "scripts").mkdir(parents=True, exist_ok=True)
    ctx = RunContext(investigation_id=inv["id"], run_id=run_id, run_kind=run["kind"],
                     dataset_path=dataset["path"], workspace=workspace)

    def emit(type_: str, payload: dict[str, Any]) -> None:
        db.add_event(run_id, inv["id"], type_, payload)

    prev = previous_run(run, workspace)
    emit("run_started", {"kind": run["kind"], "prompt": run["prompt"], "stage": inv["stage"],
                         "resumed_from": prev["id"] if prev else None})
    prompt = run_prompt(run["kind"], run["prompt"], run["context"], state_brief(inv["id"]), previous=prev)
    cancelled = asyncio.Event()
    result: ResultMessage | None = None
    try:
        options = build_options(ctx, resume=prev["session_id"] if prev else None,
                                dataset_notes=dataset_instruction(dataset))
        async with ClaudeSDKClient(options=options) as client:
            watcher = asyncio.create_task(_watch_cancel(run_id, client, cancelled))
            try:
                await client.query(prompt)
                async for message in client.receive_response():
                    if isinstance(message, SystemMessage) and message.subtype == "init":
                        session_id = message.data.get("session_id")
                        db.update("runs", {"id": run_id}, {"session_id": session_id})
                        emit("session", {"session_id": session_id, "model": message.data.get("model"),
                                         "cli_version": message.data.get("claude_code_version")})
                    elif isinstance(message, AssistantMessage):
                        for block in message.content:
                            if isinstance(block, TextBlock) and block.text.strip():
                                emit("agent_text", {"text": block.text})
                            elif isinstance(block, ToolUseBlock):
                                emit("tool_call", {"id": block.id, "name": block.name,
                                                   "input": _clip_input(block.input)})
                    elif isinstance(message, UserMessage) and isinstance(message.content, list):
                        for block in message.content:
                            if isinstance(block, ToolResultBlock):
                                emit("tool_result", {"tool_use_id": block.tool_use_id,
                                                     "is_error": bool(block.is_error),
                                                     "preview": _preview(_tool_result_text(block))})
                    elif isinstance(message, ResultMessage):
                        result = message
                        # The session's final answer; the UI shows it outside the tool timeline.
                        if message.result and not message.is_error:
                            emit("result", {"text": message.result})
            finally:
                cancelled.set()
                watcher.cancel()
    except Exception as exc:
        log.exception("run %s failed", run_id)
        db.update("runs", {"id": run_id}, {"status": "failed", "error": f"{type(exc).__name__}: {exc}",
                                           "finished_at": db.now()})
        emit("run_finished", {"status": "failed", "error": str(exc)})
        return

    current = db.fetch_one("SELECT status, summary FROM runs WHERE id = ?", (run_id,))
    limit_hit = result is not None and result.subtype in ("error_max_turns", "error_max_budget_usd")
    if current["status"] == "cancelling":
        status = "cancelled"
    elif current["summary"] is not None:
        status = "completed"  # finish_run was called; a limit hit afterwards doesn't matter
    elif limit_hit:
        status = "stopped"  # board state is persisted; a new run continues from it
    elif result is None or result.is_error:
        status = "failed"
    else:
        status = "completed"
    values: dict[str, Any] = {"status": status, "finished_at": db.now()}
    if result is not None:
        # A resumed session reports the whole session's total; this run's cost is the growth since the last run.
        before = 0.0
        if prev is not None:
            p = db.fetch_one("SELECT cost_usd, session_cost_usd FROM runs WHERE id = ?", (prev["id"],))
            before = (p["session_cost_usd"] if p["session_cost_usd"] is not None else p["cost_usd"]) or 0.0
        total = result.total_cost_usd
        own = None if total is None else max(0.0, total - before)
        values |= {"cost_usd": own, "session_cost_usd": total, "num_turns": result.num_turns}
        if result.is_error:
            values["error"] = f"{result.subtype}: {result.result or ''}"[:2000]
    db.update("runs", {"id": run_id}, values)
    emit("run_finished", {"status": status, "cost_usd": values.get("cost_usd"), "num_turns": values.get("num_turns"),
                          "result_subtype": result.subtype if result else None})
