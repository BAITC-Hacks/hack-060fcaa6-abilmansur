"""Sandboxed read-only DuckDB access to a dataset."""

from pathlib import Path
from typing import Any

import duckdb

# Statements the agent-facing SQL tool may run.
_ALLOWED = {
    duckdb.StatementType.SELECT,
    duckdb.StatementType.EXPLAIN,
    duckdb.StatementType.PRAGMA,
}


def extra_views(dataset_dir: Path) -> dict[str, str]:
    """Views a crawl-graph dataset adds next to ``tx``: the source graph and the scoring pipeline's results."""
    sources = {
        "nodes": ("graph/nodes.parquet", "read_parquet"),
        "edges": ("graph/edges.parquet", "read_parquet"),
        "node_roles": ("output/nodes_roles.csv", "read_csv_auto"),
        "clusters": ("output/clusters.csv", "read_csv_auto"),
    }
    return {name: f"{reader}('{dataset_dir / rel}')" for name, (rel, reader) in sources.items()
            if (dataset_dir / rel).is_file()}


def create_views(con: duckdb.DuckDBPyConnection, path: Path) -> None:
    con.execute(f"CREATE VIEW tx AS SELECT * FROM read_parquet('{path}')")
    for name, source in extra_views(path.parent).items():
        con.execute(f"CREATE VIEW {name} AS SELECT * FROM {source}")


def connect(parquet_path: str | Path) -> duckdb.DuckDBPyConnection:
    """In-memory connection exposing the dataset as view ``tx`` (plus ``nodes`` / ``edges`` / ``node_roles`` /
    ``clusters`` for a graph dataset); file access limited to its folder."""
    path = Path(parquet_path).resolve()
    con = duckdb.connect()
    con.execute(f"SET allowed_directories = ['{path.parent}']")
    con.execute("SET enable_external_access = false")
    create_views(con, path)
    con.execute("SET lock_configuration = true")
    return con


def run_readonly(con: duckdb.DuckDBPyConnection, sql: str, max_rows: int) -> dict[str, Any]:
    statements = con.extract_statements(sql)
    if len(statements) != 1:
        raise ValueError("Exactly one SQL statement is allowed")
    if statements[0].type not in _ALLOWED:
        raise ValueError(f"Only SELECT/EXPLAIN queries are allowed (got {statements[0].type.name})")
    rel = con.sql(sql)
    columns = rel.columns
    rows = rel.limit(max_rows + 1).fetchall()
    truncated = len(rows) > max_rows
    return {
        "columns": columns,
        "rows": [[_jsonable(v) for v in r] for r in rows[:max_rows]],
        "truncated": truncated,
    }


def _jsonable(v: Any) -> Any:
    if v is None or isinstance(v, (int, float, str, bool)):
        return v
    return str(v)


def fetch_transactions(con: duckdb.DuckDBPyConnection, tx_ids: list[str]) -> list[dict[str, Any]]:
    if not tx_ids:
        return []
    rel = con.execute(
        """SELECT tx_id, ts, sender_id, receiver_id, amount, currency, sender_type, receiver_type,
                  purpose, channel
           FROM tx WHERE tx_id IN (SELECT unnest(?::VARCHAR[])) ORDER BY ts, tx_id""",
        [tx_ids],
    )
    cols = [d[0] for d in rel.description]
    return [dict(zip(cols, r)) for r in rel.fetchall()]
