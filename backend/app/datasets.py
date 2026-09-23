"""Dataset ingestion: normalize any CSV/Parquet to a canonical Parquet file without losing data.

Canonical columns are added next to *all* original columns (kept as ``raw_<name>``), so the
agent can always go back to the source values. Individual transfers are never aggregated here.

A crawl-graph dataset (three files: nodes / edges / transactions parquet) is kept as is under
``graph/``, gets the same canonical ``transactions.parquet`` for the agent, and is scored by
``app.pipeline`` right away (``output/`` holds the three result CSV files).
"""

import shutil
from pathlib import Path
from typing import Any

import duckdb

from app import db, pipeline
from app.config import get_settings

CANONICAL_ALIASES: dict[str, list[str]] = {
    "tx_id": ["tx_id", "transaction_id", "txn_id", "id", "operation_id", "doc_id"],
    "ts": ["ts", "timestamp", "datetime", "date_time", "created_at", "operation_date", "date", "time"],
    "sender_id": ["sender_id", "from_id", "from_account", "payer_id", "source", "src", "debit_account", "sender"],
    "receiver_id": ["receiver_id", "to_id", "to_account", "payee_id", "beneficiary_id", "target", "dst", "credit_account", "receiver"],
    "amount": ["amount", "sum", "value", "amt", "amount_kzt", "amount_local"],
    "currency": ["currency", "ccy", "cur", "currency_code"],
    "sender_type": ["sender_type", "from_type", "payer_type", "sender_kind"],
    "receiver_type": ["receiver_type", "to_type", "payee_type", "receiver_kind"],
    "purpose": ["purpose", "description", "narrative", "comment", "payment_purpose", "details"],
    "channel": ["channel", "method", "tx_type", "type", "operation_type"],
}
REQUIRED = ("ts", "sender_id", "receiver_id", "amount")


def _detect_mapping(columns: list[str], overrides: dict[str, str] | None) -> dict[str, str | None]:
    lower = {c.lower(): c for c in columns}
    mapping: dict[str, str | None] = {}
    for canon, aliases in CANONICAL_ALIASES.items():
        if overrides and canon in overrides:
            if overrides[canon] not in columns:
                raise ValueError(f"Column override {canon}={overrides[canon]!r} not found in file")
            mapping[canon] = overrides[canon]
            continue
        mapping[canon] = next((lower[a] for a in aliases if a in lower), None)
    missing = [c for c in REQUIRED if mapping[c] is None]
    if missing:
        raise ValueError(f"Cannot find required columns {missing}. Available: {columns}. Pass a column mapping.")
    return mapping


def _q(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def _reader(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".parquet":
        return f"read_parquet('{path}')"
    if suffix in (".csv", ".tsv", ".txt"):
        return f"read_csv('{path}', auto_detect=true, sample_size=-1)"
    raise ValueError(f"Unsupported file type: {suffix}")


def ingest(source: Path, name: str, column_map: dict[str, str] | None = None) -> dict[str, Any]:
    settings = get_settings()
    dataset_id = db.new_id("ds")
    out_dir = settings.datasets_dir / dataset_id
    out_dir.mkdir(parents=True)
    out_path = out_dir / "transactions.parquet"
    try:
        con = duckdb.connect()
        con.execute(f"CREATE TEMP VIEW src AS SELECT * FROM {_reader(source)}")
        columns = [r[0] for r in con.execute("DESCRIBE src").fetchall()]
        m = _detect_mapping(columns, column_map)

        def col(canon: str, cast: str, default: str = "NULL") -> str:
            src = m[canon]
            return f"TRY_CAST({_q(src)} AS {cast})" if src else f"CAST({default} AS {cast})"

        tx_id = (
            f"COALESCE(CAST({_q(m['tx_id'])} AS VARCHAR), 'row_' || CAST(_row AS VARCHAR))"
            if m["tx_id"] else "'row_' || CAST(_row AS VARCHAR)"
        )
        raw_cols = ", ".join(f"{_q(c)} AS {_q('raw_' + c)}" for c in columns)
        con.execute(f"""
            COPY (
                WITH numbered AS (SELECT row_number() OVER () - 1 AS _row, * FROM src)
                SELECT
                    {tx_id} AS tx_id,
                    {col('ts', 'TIMESTAMP')} AS ts,
                    CAST({_q(m['sender_id'])} AS VARCHAR) AS sender_id,
                    CAST({_q(m['receiver_id'])} AS VARCHAR) AS receiver_id,
                    {col('amount', 'DOUBLE')} AS amount,
                    COALESCE({col('currency', 'VARCHAR')}, 'UNKNOWN') AS currency,
                    {col('sender_type', 'VARCHAR')} AS sender_type,
                    {col('receiver_type', 'VARCHAR')} AS receiver_type,
                    {col('purpose', 'VARCHAR')} AS purpose,
                    {col('channel', 'VARCHAR')} AS channel,
                    _row AS source_row,
                    {raw_cols}
                FROM numbered
                ORDER BY ts, source_row
            ) TO '{out_path}' (FORMAT parquet, COMPRESSION zstd)
        """)
        profile = profile_dataset(out_path)
        profile["column_mapping"] = m
        profile["source_columns"] = columns
        con.close()
        out_path.chmod(0o444)  # source of truth for verification; never modified after ingest
    except Exception:
        shutil.rmtree(out_dir, ignore_errors=True)
        raise

    record = {
        "id": dataset_id,
        "name": name,
        "path": str(out_path),
        "row_count": profile["row_count"],
        "profile": profile,
        "created_at": db.now(),
    }
    db.insert("datasets", record)
    return record


def profile_dataset(path: Path) -> dict[str, Any]:
    """Technical profile computed by the app (the agent writes the analytical passport)."""
    con = duckdb.connect()
    con.execute(f"CREATE VIEW tx AS SELECT * FROM read_parquet('{path}')")

    def one(sql: str) -> tuple:
        return con.execute(sql).fetchone()

    row_count, min_ts, max_ts, n_senders, n_receivers = one(
        "SELECT count(*), min(ts), max(ts), count(DISTINCT sender_id), count(DISTINCT receiver_id) FROM tx"
    )
    (n_accounts,) = one(
        "SELECT count(*) FROM (SELECT sender_id AS a FROM tx UNION SELECT receiver_id FROM tx)"
    )
    currencies = [
        {"currency": c, "tx_count": n, "total": t, "median": med}
        for c, n, t, med in con.execute(
            "SELECT currency, count(*), sum(amount), median(amount) FROM tx GROUP BY 1 ORDER BY 2 DESC"
        ).fetchall()
    ]
    nulls = dict(zip(
        ["ts", "amount", "sender_id", "receiver_id", "sender_type", "receiver_type", "purpose", "channel"],
        one("""SELECT count(*) FILTER (ts IS NULL), count(*) FILTER (amount IS NULL),
                      count(*) FILTER (sender_id IS NULL), count(*) FILTER (receiver_id IS NULL),
                      count(*) FILTER (sender_type IS NULL), count(*) FILTER (receiver_type IS NULL),
                      count(*) FILTER (purpose IS NULL), count(*) FILTER (channel IS NULL) FROM tx"""),
    ))
    (dup_ids,) = one("SELECT count(*) FROM (SELECT tx_id FROM tx GROUP BY 1 HAVING count(*) > 1)")
    (self_tx,) = one("SELECT count(*) FROM tx WHERE sender_id = receiver_id")
    (non_positive,) = one("SELECT count(*) FROM tx WHERE amount <= 0")
    con.close()
    return {
        "row_count": row_count,
        "period": {"min_ts": str(min_ts), "max_ts": str(max_ts)},
        "accounts": {"total": n_accounts, "senders": n_senders, "receivers": n_receivers},
        "currencies": currencies,
        "null_counts": nulls,
        "quality": {
            "duplicate_tx_ids": dup_ids,
            "self_transfers": self_tx,
            "non_positive_amounts": non_positive,
        },
    }


def get_dataset(dataset_id: str) -> dict[str, Any] | None:
    return db.fetch_one("SELECT * FROM datasets WHERE id = ?", (dataset_id,))


# --------------------------------------------------------------------------- crawl-graph datasets

GRAPH_DIR = "graph"
OUTPUT_DIR = "output"


def graph_dir(dataset: dict[str, Any]) -> Path:
    return Path(dataset["path"]).parent / GRAPH_DIR


def output_dir(dataset: dict[str, Any]) -> Path:
    return Path(dataset["path"]).parent / OUTPUT_DIR


def is_graph(dataset: dict[str, Any]) -> bool:
    return dataset.get("profile", {}).get("kind") == "graph"


def ingest_graph(files: dict[str, Path], name: str) -> dict[str, Any]:
    """Register a crawl graph from ``{"nodes": path, "edges": path, "transactions": path}``."""
    if set(files) != set(pipeline.FILES):
        raise ValueError(f"A graph dataset needs exactly these files: {', '.join(f + '.parquet' for f in pipeline.FILES)}")
    settings = get_settings()
    dataset_id = db.new_id("ds")
    out_dir = settings.datasets_dir / dataset_id
    gdir = out_dir / GRAPH_DIR
    gdir.mkdir(parents=True)
    out_path = out_dir / "transactions.parquet"
    try:
        for key, src in files.items():
            shutil.copyfile(src, gdir / f"{key}.parquet")
        pipeline.load(gdir)  # validates columns and gid consistency before anything else is built
        con = duckdb.connect()
        # Canonical view of the individual transfers for the agent and the verifier. tx_id is stable:
        # rows are numbered in (date, src, dst, amount) order. edge_depth = crawl hop of the edge.
        con.execute(f"""
            COPY (
                WITH t AS (
                    SELECT row_number() OVER (ORDER BY date, src, dst, sum_kzt) - 1 AS _row, *
                    FROM read_parquet('{gdir / "transactions.parquet"}')
                )
                SELECT 't' || lpad(CAST(t._row AS VARCHAR), 6, '0') AS tx_id,
                       CAST(t.date AS TIMESTAMP) AS ts,
                       CAST(t.src AS VARCHAR) AS sender_id,
                       CAST(t.dst AS VARCHAR) AS receiver_id,
                       CAST(t.sum_kzt AS DOUBLE) AS amount,
                       'KZT' AS currency,
                       CAST(NULL AS VARCHAR) AS sender_type,
                       CAST(NULL AS VARCHAR) AS receiver_type,
                       CAST(NULL AS VARCHAR) AS purpose,
                       CAST(NULL AS VARCHAR) AS channel,
                       t._row AS source_row,
                       CAST(e.depth AS INTEGER) AS edge_depth,
                       t.src AS raw_src, t.dst AS raw_dst, t.date AS raw_date, t.sum_kzt AS raw_sum_kzt
                FROM t LEFT JOIN read_parquet('{gdir / "edges.parquet"}') e ON e.src = t.src AND e.dst = t.dst
                ORDER BY ts, source_row
            ) TO '{out_path}' (FORMAT parquet, COMPRESSION zstd)
        """)
        con.close()
        result = pipeline.run(gdir, out_dir / OUTPUT_DIR)
        profile = profile_dataset(out_path)
        profile["kind"] = "graph"
        profile["graph"] = graph_profile(gdir, result)
        for f in [out_path, *gdir.iterdir()]:
            f.chmod(0o444)
    except Exception:
        shutil.rmtree(out_dir, ignore_errors=True)
        raise

    record = {"id": dataset_id, "name": name, "path": str(out_path), "row_count": profile["row_count"],
              "profile": profile, "created_at": db.now()}
    db.insert("datasets", record)
    return record


def graph_profile(gdir: Path, result: pipeline.Result) -> dict[str, Any]:
    con = duckdb.connect()
    nodes = f"read_parquet('{gdir / 'nodes.parquet'}')"
    by_depth = dict(con.execute(f"SELECT depth, count(*) FROM {nodes} GROUP BY 1 ORDER BY 1").fetchall())
    n_nodes, n_seed, max_depth = con.execute(f"SELECT count(*), count(*) FILTER (is_seed), max(depth) FROM {nodes}").fetchone()
    (n_edges,) = con.execute(f"SELECT count(*) FROM read_parquet('{gdir / 'edges.parquet'}')").fetchone()
    con.close()
    n = result.nodes
    return {
        "nodes": n_nodes, "seeds": n_seed, "edges": n_edges, "max_depth": max_depth,
        "nodes_by_depth": {str(k): v for k, v in by_depth.items()},
        "censored_nodes": int(n["censored"].sum()),
        "roles": {k: int(v) for k, v in n["role"].value_counts().items()},
        "clusters": len(result.clusters),
        "outputs": list(pipeline.OUTPUTS),
    }


def rerun_pipeline(dataset: dict[str, Any]) -> dict[str, Any]:
    """Recompute the result CSV files (e.g. after the thresholds changed)."""
    if not is_graph(dataset):
        raise ValueError("the scoring pipeline needs a graph dataset (nodes / edges / transactions parquet)")
    result = pipeline.run(graph_dir(dataset), output_dir(dataset))
    profile = {**dataset["profile"], "graph": graph_profile(graph_dir(dataset), result)}
    db.update("datasets", {"id": dataset["id"]}, {"profile": profile})
    return {**dataset, "profile": profile}
