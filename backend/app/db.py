"""SQLite persistence for datasets, investigations, runs, and the evidence board.

The investigation state (stage, candidate queue, coverage, versions, evidence) lives here,
not in the agent's chat history, so it survives across runs and can be audited.
"""

import json
import sqlite3
import uuid
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import UTC, datetime
from typing import Any

from app.config import get_settings

SCHEMA = """
CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    row_count INTEGER NOT NULL,
    profile TEXT NOT NULL,             -- JSON: automatic technical profile
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS investigations (
    id TEXT PRIMARY KEY,
    dataset_id TEXT NOT NULL REFERENCES datasets(id),
    title TEXT NOT NULL,
    title_status TEXT NOT NULL DEFAULT 'final',  -- pending (AI title being generated) | ready | failed | final
    brief TEXT,                        -- user's task statement
    stage TEXT NOT NULL DEFAULT 'data_study',
    passport TEXT,                     -- JSON: dataset passport written by the agent
    workspace TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL REFERENCES investigations(id),
    kind TEXT NOT NULL,                -- investigate | message | question | challenge
    prompt TEXT NOT NULL,
    context TEXT,                      -- JSON: focus accounts / version for question runs
    status TEXT NOT NULL,              -- queued | running | cancelling | cancelled | completed | stopped | failed
    session_id TEXT,
    summary TEXT,
    error TEXT,
    cost_usd REAL,                     -- this run only
    session_cost_usd REAL,             -- CLI's running total for the agent session (runs resume one session)
    num_turns INTEGER,
    created_at TEXT NOT NULL,
    started_at TEXT,
    finished_at TEXT
);
CREATE INDEX IF NOT EXISTS runs_status ON runs(status, created_at);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id TEXT NOT NULL,
    investigation_id TEXT NOT NULL,
    ts TEXT NOT NULL,
    type TEXT NOT NULL,
    payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS events_run ON events(run_id, id);
CREATE INDEX IF NOT EXISTS events_inv ON events(investigation_id, id);

CREATE TABLE IF NOT EXISTS queries (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL,
    run_id TEXT NOT NULL,
    purpose TEXT,
    sql TEXT NOT NULL,
    row_count INTEGER,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL,
    label TEXT NOT NULL,
    accounts TEXT NOT NULL,            -- JSON list of seed accounts
    patterns TEXT NOT NULL,            -- JSON list of pattern keys
    discovered_by TEXT,                -- how it was found (method / query)
    priority REAL NOT NULL DEFAULT 0.5,
    status TEXT NOT NULL DEFAULT 'queued',  -- queued | in_progress | confirmed | dismissed | merged | deferred
    notes TEXT,
    created_run TEXT,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS coverage (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL,
    scope_kind TEXT NOT NULL,          -- network | component | community | account_set | pattern_scan | period
    scope TEXT NOT NULL,               -- human/machine readable scope description
    accounts TEXT,                     -- JSON list (optional)
    method TEXT NOT NULL,
    result TEXT NOT NULL,
    run_id TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS versions (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL,
    parent_id TEXT,                    -- previous version this one revises
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',   -- draft | challenged | revised | rejected | final
    confidence REAL,
    candidate_ids TEXT,                -- JSON list
    created_run TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
    version_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    role TEXT NOT NULL,
    confidence REAL NOT NULL,
    inclusion_basis TEXT NOT NULL,
    alternative_explanation TEXT,
    missing_information TEXT,
    evidence_ids TEXT NOT NULL,        -- JSON list
    status TEXT NOT NULL DEFAULT 'included',  -- included | excluded | uncertain
    updated_at TEXT NOT NULL,
    PRIMARY KEY (version_id, account_id)
);

CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    kind TEXT NOT NULL,                -- transfer | coordination | shared_counterparty
    tx_ids TEXT NOT NULL,              -- JSON list
    stats TEXT NOT NULL,               -- JSON computed by the app from source data
    rationale TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',  -- active | weak | removed
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trails (
    id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL,
    title TEXT NOT NULL,
    steps TEXT NOT NULL,               -- JSON list of {from, to, tx_ids}
    description TEXT,
    verification TEXT NOT NULL,        -- JSON: order checks + attribution ambiguity
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS objections (
    id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL,
    target_kind TEXT NOT NULL,         -- version | member | link | trail
    target_ref TEXT,
    text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',    -- open | refuted | accepted
    resolution TEXT,
    evidence_ids TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS open_questions (
    id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL,
    text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',    -- open | answered | unanswerable
    answer TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS evidence (
    id TEXT PRIMARY KEY,
    investigation_id TEXT NOT NULL,
    version_id TEXT,
    run_id TEXT NOT NULL,
    title TEXT NOT NULL,
    claim TEXT NOT NULL,
    pattern TEXT,
    observed_features TEXT NOT NULL,   -- JSON list
    tx_ids TEXT NOT NULL,              -- JSON list
    accounts TEXT NOT NULL,            -- JSON list
    period_start TEXT,
    period_end TEXT,
    query_id TEXT,
    query_sql TEXT,
    script_path TEXT,
    script_content TEXT,
    script_sha256 TEXT,
    claimed TEXT,                      -- JSON: numeric claims made by the agent
    verification TEXT NOT NULL,        -- JSON: app-side recomputation
    limitations TEXT,
    alternatives TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    investigation_id TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    accounts TEXT NOT NULL,
    tx_ids TEXT NOT NULL,
    evidence_ids TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""

JSON_COLUMNS = {
    "profile", "passport", "context", "payload", "accounts", "patterns", "candidate_ids",
    "evidence_ids", "tx_ids", "stats", "steps", "verification", "observed_features", "claimed",
}


def now() -> str:
    return datetime.now(UTC).isoformat(timespec="milliseconds")


def new_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(get_settings().db_path, timeout=30, isolation_level=None)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA busy_timeout=30000")
    return conn


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    conn = _connect()
    try:
        yield conn
    finally:
        conn.close()


@contextmanager
def transaction() -> Iterator[sqlite3.Connection]:
    conn = _connect()
    try:
        conn.execute("BEGIN IMMEDIATE")
        yield conn
        conn.execute("COMMIT")
    except BaseException:
        conn.execute("ROLLBACK")
        raise
    finally:
        conn.close()


# Columns added after the first release: (table, column, definition) for databases created before them.
MIGRATIONS = [
    ("investigations", "title_status", "TEXT NOT NULL DEFAULT 'final'"),
    ("runs", "session_cost_usd", "REAL"),
]


def init_db() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)
        for table, column, definition in MIGRATIONS:
            existing = {r["name"] for r in conn.execute(f"PRAGMA table_info({table})")}
            if column not in existing:
                conn.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")


def dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, default=str)


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    out = dict(row)
    for key, value in out.items():
        if key in JSON_COLUMNS and isinstance(value, str):
            try:
                out[key] = json.loads(value)
            except json.JSONDecodeError:
                pass
    return out


def fetch_all(sql: str, params: tuple | list = ()) -> list[dict[str, Any]]:
    with connect() as conn:
        return [row_to_dict(r) for r in conn.execute(sql, params).fetchall()]


def fetch_one(sql: str, params: tuple | list = ()) -> dict[str, Any] | None:
    with connect() as conn:
        return row_to_dict(conn.execute(sql, params).fetchone())


def execute(sql: str, params: tuple | list = ()) -> None:
    with connect() as conn:
        conn.execute(sql, params)


def insert(table: str, values: dict[str, Any]) -> None:
    cols = list(values)
    params = [dumps(v) if isinstance(v, (dict, list)) else v for v in values.values()]
    sql = f"INSERT INTO {table} ({', '.join(cols)}) VALUES ({', '.join('?' * len(cols))})"
    execute(sql, params)


def update(table: str, key: dict[str, Any], values: dict[str, Any]) -> None:
    sets = ", ".join(f"{c} = ?" for c in values)
    where = " AND ".join(f"{c} = ?" for c in key)
    params = [dumps(v) if isinstance(v, (dict, list)) else v for v in values.values()]
    execute(f"UPDATE {table} SET {sets} WHERE {where}", params + list(key.values()))


def add_event(run_id: str, investigation_id: str, type_: str, payload: dict[str, Any]) -> int:
    with connect() as conn:
        cur = conn.execute(
            "INSERT INTO events (run_id, investigation_id, ts, type, payload) VALUES (?, ?, ?, ?, ?)",
            (run_id, investigation_id, now(), type_, dumps(payload)),
        )
        return cur.lastrowid


def claim_next_run() -> dict[str, Any] | None:
    """Atomically move the oldest queued run to running (safe across worker processes)."""
    with transaction() as conn:
        row = conn.execute(
            "SELECT id FROM runs WHERE status = 'queued' ORDER BY created_at LIMIT 1"
        ).fetchone()
        if row is None:
            return None
        conn.execute(
            "UPDATE runs SET status = 'running', started_at = ? WHERE id = ? AND status = 'queued'",
            (now(), row["id"]),
        )
        return row_to_dict(conn.execute("SELECT * FROM runs WHERE id = ?", (row["id"],)).fetchone())
