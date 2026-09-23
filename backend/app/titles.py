"""Short conversation titles generated from the first user message by a lightweight model.

The investigation is created right away with a temporary title (the first message); the title is then
generated in the background and written to the investigation (``title_status``: pending -> ready / failed).
Runs through the Claude Code CLI like the agent itself, so it uses the same login (API key or subscription).
"""

import logging
import re

from claude_agent_sdk import AssistantMessage, ClaudeAgentOptions, TextBlock, query

from app import db
from app.config import get_settings

log = logging.getLogger(__name__)

TITLE_MODEL = "claude-haiku-4-5"
MAX_WORDS = 6
MAX_CHARS = 60
SOURCE_CHARS = 2000  # the start of a long message says enough about its intent

SYSTEM = """You name conversations in a financial-investigation app, like chat titles in ChatGPT or Claude.
Given the user's first message, reply with a title of 3 to 6 words that captures its intent.
- Same language as the message.
- A noun phrase, not a sentence: no trailing period, no quotes, no emoji, no "Title:" prefix.
- Do not copy the message's opening words verbatim; summarise what the user wants.
- Neutral and factual: do not add accusations or labels (e.g. "criminal") the message does not make.
Reply with the title only."""


def clean_title(raw: str) -> str | None:
    """First line of the reply without quotes / prefixes / trailing punctuation, capped at MAX_WORDS."""
    line = next((ln.strip() for ln in raw.splitlines() if ln.strip()), "")
    line = re.sub(r"^(title|заголовок|название)\s*[:：-]\s*", "", line, flags=re.I)
    line = line.strip(" \"'«»“”„`*#").rstrip(".!?…;:,")
    words = line.split()
    if not words:
        return None
    title = " ".join(words[:MAX_WORDS])
    if len(title) > MAX_CHARS:
        title = title[:MAX_CHARS].rsplit(" ", 1)[0]
    return title[:1].upper() + title[1:]


async def generate_title(message: str) -> str | None:
    settings = get_settings()
    cwd = settings.data_dir / "titles"
    cwd.mkdir(parents=True, exist_ok=True)
    options = ClaudeAgentOptions(
        system_prompt=SYSTEM,
        model=TITLE_MODEL,
        cli_path=settings.claude_cli_path,
        cwd=str(cwd),
        tools=[],
        max_turns=1,
        setting_sources=[],
        permission_mode="dontAsk",
        # One-off call: no MCP servers from the user's setup, no session transcript left behind.
        extra_args={"strict-mcp-config": None, "no-session-persistence": None},
    )
    reply = []
    async for msg in query(prompt=message[:SOURCE_CHARS], options=options):
        if isinstance(msg, AssistantMessage):
            reply += [b.text for b in msg.content if isinstance(b, TextBlock)]
    return clean_title("".join(reply))


async def title_investigation(investigation_id: str, message: str) -> None:
    """Background task: generate and store the title; on failure the temporary title stays."""
    try:
        title = await generate_title(message)
    except Exception:
        log.exception("title generation failed for %s", investigation_id)
        title = None
    values = {"title_status": "ready" if title else "failed", "updated_at": db.now()}
    if title:
        values["title"] = title
    # Only if the title was not renamed by hand meanwhile.
    row = db.fetch_one("SELECT title_status FROM investigations WHERE id = ?", (investigation_id,))
    if row and row["title_status"] == "pending":
        db.update("investigations", {"id": investigation_id}, values)
