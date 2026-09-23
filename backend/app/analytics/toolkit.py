"""Investigation toolkit the agent imports from its own scripts (``from app.analytics import toolkit as tk``).

It offers building blocks, not verdicts: the agent decides which to use, combines them and
compares results with the rest of the network. Individual transfers are always preserved
(``tx_graph``); aggregated edges (``agg_graph``) are an additional view.

Dataset location comes from the ``DATASET_PATH`` environment variable.
"""

import os
from collections import defaultdict, deque
from functools import lru_cache
from pathlib import Path

import duckdb
import networkx as nx
import pandas as pd

from app.duck import create_views

TX_COLUMNS = "tx_id, ts, sender_id, receiver_id, amount, currency, sender_type, receiver_type, purpose, channel"


@lru_cache
def con() -> duckdb.DuckDBPyConnection:
    c = duckdb.connect()
    create_views(c, Path(os.environ["DATASET_PATH"]).resolve())
    return c


def q(sql: str, params: list | None = None) -> pd.DataFrame:
    """Run SQL against view ``tx`` (and ``nodes`` / ``edges`` / ``node_roles`` / ``clusters`` for a crawl-graph
    dataset) and return a DataFrame."""
    return con().execute(sql, params or []).df()


def node_roles() -> pd.DataFrame:
    """Scoring pipeline result for every node (graph datasets): role, role_score, cluster_id, priority_score,
    rank, evidence and the features behind them. gid is compared with tx.sender_id / receiver_id as text."""
    return q("SELECT * FROM node_roles ORDER BY rank")


def clusters() -> pd.DataFrame:
    """Scoring pipeline clusters (graph datasets): n_nodes, n_seed, sum_kzt_internal, top_gids, hypothesis."""
    return q("SELECT * FROM clusters ORDER BY cluster_id")


def _acct_filter(accounts: list[str] | None, both: bool = False) -> tuple[str, list]:
    if not accounts:
        return "TRUE", []
    op = "AND" if both else "OR"
    return (
        f"(sender_id IN (SELECT unnest(?::VARCHAR[])) {op} receiver_id IN (SELECT unnest(?::VARCHAR[])))",
        [accounts, accounts],
    )


# --------------------------------------------------------------------------- features / screening

def account_features(threshold: float = 1_000_000.0, fast_hours: float = 48.0,
                     currency: str | None = None) -> pd.DataFrame:
    """Per-account behavioural features over the whole network (the baseline for comparison).

    fast_forward_share: share of outgoing amount sent within ``fast_hours`` after an incoming transfer.
    near_threshold_share: share of outgoing tx with amount in [0.9*threshold, threshold).
    """
    ccy = "WHERE currency = ?" if currency else ""
    params = [currency] if currency else []
    return q(f"""
        WITH t AS (SELECT * FROM tx {ccy}),
        inflow AS (SELECT receiver_id AS acct, ts, amount FROM t),
        outflow AS (SELECT sender_id AS acct, ts, amount, receiver_id FROM t),
        out_prev AS (
            SELECT o.acct, o.amount, o.ts, i.ts AS prev_in_ts
            FROM outflow o ASOF LEFT JOIN inflow i ON o.acct = i.acct AND o.ts >= i.ts
        ),
        o AS (
            SELECT acct,
                   count(*) AS out_count, sum(amount) AS out_amount,
                   sum(amount) FILTER (prev_in_ts IS NOT NULL
                        AND ts - prev_in_ts <= INTERVAL (CAST({fast_hours} AS INTEGER)) HOUR) AS fast_out_amount,
                   count(*) FILTER (amount >= {threshold} * 0.9 AND amount < {threshold}) AS near_threshold_out,
                   count(*) FILTER (amount = round(amount, -3)) AS round_out,
                   min(ts) AS first_out, max(ts) AS last_out
            FROM out_prev GROUP BY acct
        ),
        o2 AS (SELECT sender_id AS acct, count(DISTINCT receiver_id) AS n_receivers FROM t GROUP BY 1),
        i AS (
            SELECT receiver_id AS acct, count(*) AS in_count, sum(amount) AS in_amount,
                   count(DISTINCT sender_id) AS n_senders, min(ts) AS first_in, max(ts) AS last_in
            FROM t GROUP BY 1
        ),
        types AS (
            SELECT acct, any_value(typ) AS acct_type FROM (
                SELECT sender_id AS acct, sender_type AS typ FROM t
                UNION ALL SELECT receiver_id, receiver_type FROM t) GROUP BY acct
        )
        SELECT a.acct AS account_id, types.acct_type,
               coalesce(i.in_count, 0) AS in_count, coalesce(i.in_amount, 0) AS in_amount,
               coalesce(i.n_senders, 0) AS n_senders,
               coalesce(o.out_count, 0) AS out_count, coalesce(o.out_amount, 0) AS out_amount,
               coalesce(o2.n_receivers, 0) AS n_receivers,
               CASE WHEN greatest(coalesce(i.in_amount, 0), coalesce(o.out_amount, 0)) > 0
                    THEN least(coalesce(i.in_amount, 0), coalesce(o.out_amount, 0))
                         / greatest(coalesce(i.in_amount, 0), coalesce(o.out_amount, 0)) END AS pass_through_ratio,
               coalesce(o.fast_out_amount, 0) / nullif(o.out_amount, 0) AS fast_forward_share,
               coalesce(o.near_threshold_out, 0) / nullif(o.out_count, 0) AS near_threshold_share,
               coalesce(o.round_out, 0) / nullif(o.out_count, 0) AS round_amount_share,
               date_diff('day', least(i.first_in, o.first_out), greatest(i.last_in, o.last_out)) AS active_span_days
        FROM (SELECT sender_id AS acct FROM t UNION SELECT receiver_id FROM t) a
        LEFT JOIN i USING (acct) LEFT JOIN o USING (acct) LEFT JOIN o2 USING (acct) LEFT JOIN types USING (acct)
    """, params)


def with_percentiles(features: pd.DataFrame, cols: list[str] | None = None) -> pd.DataFrame:
    """Add ``<col>_pct`` network percentile columns so each account is judged against the baseline."""
    cols = cols or ["in_count", "n_senders", "out_count", "n_receivers", "in_amount", "out_amount",
                    "pass_through_ratio", "fast_forward_share", "near_threshold_share"]
    out = features.copy()
    for c in cols:
        out[f"{c}_pct"] = out[c].rank(pct=True)
    return out


def pattern_flags(features: pd.DataFrame, min_degree: int = 5) -> pd.DataFrame:
    """Heuristic, explainable flags (each has ordinary explanations - use as leads, not verdicts)."""
    f = with_percentiles(features)
    flags = pd.DataFrame({"account_id": f["account_id"]})
    flags["collection"] = (f["n_senders"] >= min_degree) & (f["n_senders_pct"] > 0.99) & (f["n_receivers"] <= 3)
    flags["distribution"] = (f["n_receivers"] >= min_degree) & (f["n_receivers_pct"] > 0.99) & (f["n_senders"] <= 3)
    flags["transit"] = (f["pass_through_ratio"] > 0.8) & (f["fast_forward_share"] > 0.7) & (f["in_count"] >= 3)
    flags["structuring"] = (f["near_threshold_share"] > 0.3) & (f["out_count"] >= 3)
    flags["n_flags"] = flags[["collection", "distribution", "transit", "structuring"]].sum(axis=1)
    return f.merge(flags, on="account_id")


# --------------------------------------------------------------------------- graphs

def transactions(accounts: list[str] | None = None, both_ends: bool = False,
                 start: str | None = None, end: str | None = None) -> pd.DataFrame:
    """Individual transfers touching ``accounts`` (both endpoints inside if ``both_ends``)."""
    where, params = _acct_filter(accounts, both_ends)
    if start:
        where += " AND ts >= ?"
        params.append(start)
    if end:
        where += " AND ts <= ?"
        params.append(end)
    return q(f"SELECT {TX_COLUMNS} FROM tx WHERE {where} ORDER BY ts", params)


def tx_graph(df: pd.DataFrame) -> nx.MultiDiGraph:
    """Lossless graph: one edge per transfer (key = tx_id) with time, amount, currency."""
    G = nx.MultiDiGraph()
    for r in df.itertuples(index=False):
        G.add_edge(r.sender_id, r.receiver_id, key=r.tx_id, ts=r.ts, amount=r.amount, currency=r.currency)
    return G


def agg_graph(df: pd.DataFrame) -> nx.DiGraph:
    """Aggregated view (per direction and currency collapsed to totals); keeps tx_ids on each edge."""
    G = nx.DiGraph()
    grouped = df.groupby(["sender_id", "receiver_id"]).agg(
        amount=("amount", "sum"), count=("tx_id", "count"), first_ts=("ts", "min"),
        last_ts=("ts", "max"), tx_ids=("tx_id", list), currencies=("currency", lambda s: sorted(set(s))),
    ).reset_index()
    for r in grouped.itertuples(index=False):
        G.add_edge(r.sender_id, r.receiver_id, amount=r.amount, count=r.count, first_ts=r.first_ts,
                   last_ts=r.last_ts, tx_ids=r.tx_ids, currencies=r.currencies)
    return G


def full_agg_graph(min_amount: float = 0.0) -> nx.DiGraph:
    """Whole-network aggregated graph built in SQL (for global structure: components, communities)."""
    df = q("""SELECT sender_id, receiver_id, sum(amount) AS amount, count(*) AS count,
                     min(ts) AS first_ts, max(ts) AS last_ts
              FROM tx GROUP BY 1, 2 HAVING sum(amount) >= ?""", [min_amount])
    G = nx.DiGraph()
    for r in df.itertuples(index=False):
        G.add_edge(r.sender_id, r.receiver_id, amount=r.amount, count=r.count, first_ts=r.first_ts, last_ts=r.last_ts)
    return G


def components_summary(G: nx.DiGraph) -> pd.DataFrame:
    rows = [{"component": i, "size": len(c), "sample": sorted(c)[:10]}
            for i, c in enumerate(sorted(nx.weakly_connected_components(G), key=len, reverse=True))]
    return pd.DataFrame(rows)


def communities(G: nx.DiGraph, weight: str = "amount", resolution: float = 1.0, seed: int = 7) -> list[set[str]]:
    return nx.community.louvain_communities(G.to_undirected(), weight=weight, resolution=resolution, seed=seed)


def community_profile(G: nx.DiGraph, comms: list[set[str]]) -> pd.DataFrame:
    """Internal density / flow share per community - tightly closed flows stand out against the baseline."""
    rows = []
    for i, c in enumerate(comms):
        if len(c) < 3:
            continue
        sub = G.subgraph(c)
        internal = sum(d["amount"] for _, _, d in sub.edges(data=True))
        external = sum(d["amount"] for u, v, d in G.edges(data=True) if (u in c) != (v in c))
        rows.append({"community": i, "size": len(c), "density": nx.density(sub),
                     "internal_amount": internal, "external_amount": external,
                     "internal_share": internal / (internal + external) if internal + external else None,
                     "reciprocity": nx.reciprocity(sub) if sub.number_of_edges() else 0.0})
    return pd.DataFrame(rows).sort_values("internal_share", ascending=False) if rows else pd.DataFrame()


def cycles(G: nx.DiGraph, nodes: list[str] | None = None, max_len: int = 6, limit: int = 500) -> list[list[str]]:
    H = G.subgraph(nodes) if nodes else G
    out = []
    for c in nx.simple_cycles(H, length_bound=max_len):
        if len(c) >= 2:
            out.append(c)
            if len(out) >= limit:
                break
    return out


def ego(accounts: list[str], radius: int = 1, max_nodes: int = 2000) -> pd.DataFrame:
    """Transfers within ``radius`` hops of the accounts (both directions)."""
    frontier, seen = set(accounts), set(accounts)
    for _ in range(radius):
        df = transactions(sorted(frontier))
        nxt = (set(df["sender_id"]) | set(df["receiver_id"])) - seen
        seen |= nxt
        frontier = nxt
        if len(seen) > max_nodes:
            break
    return transactions(sorted(seen), both_ends=True)


# --------------------------------------------------------------------------- temporal patterns

def forward_chains(start_account: str, max_hops: int = 4, window_hours: float = 72.0,
                   min_ratio: float = 0.5, max_chains: int = 500, start: str | None = None) -> list[list[dict]]:
    """Time-respecting chains: after receiving tx_k, the next hop is an outgoing transfer from the
    receiver within ``window_hours`` with amount >= ``min_ratio`` * amount_k.

    These are *possible* routes; they do not prove the same funds moved.
    """
    window = pd.Timedelta(hours=window_hours)
    first = transactions([start_account], start=start)
    first = first[first["sender_id"] == start_account]
    chains: list[list[dict]] = []
    queue = deque([[r] for r in first.to_dict("records")])
    cache: dict[str, pd.DataFrame] = {}
    while queue and len(chains) < max_chains:
        chain = queue.popleft()
        last = chain[-1]
        if len(chain) >= max_hops:
            chains.append(chain)
            continue
        acct = last["receiver_id"]
        if acct not in cache:
            df = transactions([acct])
            cache[acct] = df[df["sender_id"] == acct]
        outs = cache[acct]
        nxt = outs[(outs["ts"] >= last["ts"]) & (outs["ts"] <= last["ts"] + window)
                   & (outs["amount"] >= min_ratio * last["amount"])]
        visited = {c["sender_id"] for c in chain}
        extended = False
        for r in nxt.to_dict("records"):
            if r["receiver_id"] in visited:
                chains.append(chain + [r])  # closes a loop
                continue
            queue.append(chain + [r])
            extended = True
        if not extended and len(chain) > 1:
            chains.append(chain)
    return chains


def repeated_routes(accounts: list[str] | None = None, window_hours: float = 72.0,
                    min_days: int = 3) -> pd.DataFrame:
    """Two-hop routes A->B->C (B forwards within the window) repeated on at least ``min_days`` distinct days."""
    where, params = _acct_filter(accounts)
    return q(f"""
        WITH t AS (SELECT * FROM tx WHERE {where})
        SELECT a.sender_id AS a, a.receiver_id AS b, b.receiver_id AS c,
               count(DISTINCT CAST(a.ts AS DATE)) AS distinct_days,
               count(*) AS pairs,
               sum(a.amount) AS in_amount, sum(b.amount) AS out_amount,
               list(DISTINCT a.tx_id) AS in_tx, list(DISTINCT b.tx_id) AS out_tx
        FROM t a JOIN tx b ON b.sender_id = a.receiver_id
             AND b.ts >= a.ts AND b.ts <= a.ts + INTERVAL (CAST({window_hours} AS INTEGER)) HOUR
             AND b.receiver_id <> a.sender_id
        GROUP BY 1, 2, 3 HAVING count(DISTINCT CAST(a.ts AS DATE)) >= {min_days}
        ORDER BY distinct_days DESC, pairs DESC
    """, params)


def synchrony(accounts: list[str], bucket: str = "1 hour") -> pd.DataFrame:
    """Pairwise co-activity: Jaccard overlap of active time buckets and of counterparties."""
    df = q(f"""
        SELECT acct, time_bucket(INTERVAL '{bucket}', ts) AS b, cp FROM (
            SELECT sender_id AS acct, ts, receiver_id AS cp FROM tx WHERE sender_id IN (SELECT unnest(?::VARCHAR[]))
            UNION ALL
            SELECT receiver_id, ts, sender_id FROM tx WHERE receiver_id IN (SELECT unnest(?::VARCHAR[])))
    """, [accounts, accounts])
    buckets = df.groupby("acct")["b"].apply(set).to_dict()
    cps = df.groupby("acct")["cp"].apply(set).to_dict()
    rows = []
    accts = sorted(buckets)
    for i, a in enumerate(accts):
        for b in accts[i + 1:]:
            jb = len(buckets[a] & buckets[b]) / len(buckets[a] | buckets[b])
            jc = len(cps[a] & cps[b]) / len(cps[a] | cps[b])
            rows.append({"a": a, "b": b, "time_jaccard": jb, "counterparty_jaccard": jc,
                         "shared_counterparties": sorted(cps[a] & cps[b])[:20]})
    return pd.DataFrame(rows).sort_values(["time_jaccard", "counterparty_jaccard"], ascending=False) if rows else pd.DataFrame()


def balance_walk(account: str) -> pd.DataFrame:
    """Running observed balance (inflow - outflow) per transfer; the opening balance is unknown."""
    df = transactions([account])
    df["signed"] = df.apply(lambda r: r["amount"] if r["receiver_id"] == account else -r["amount"], axis=1)
    df["observed_balance"] = df.groupby("currency")["signed"].cumsum()
    return df


def degree_table(G: nx.DiGraph) -> pd.DataFrame:
    rows = defaultdict(dict)
    for n in G.nodes:
        rows[n] = {"account_id": n, "in_degree": G.in_degree(n), "out_degree": G.out_degree(n),
                   "in_amount": sum(d.get("amount", 0) for _, _, d in G.in_edges(n, data=True)),
                   "out_amount": sum(d.get("amount", 0) for _, _, d in G.out_edges(n, data=True))}
    return pd.DataFrame(rows.values())
