"""Deterministic graph scoring for a crawl dataset (nodes / edges / transactions parquet).

For every node it computes observable features, a role from the task vocabulary (consolidator, transit,
distributor, terminal, coordinator, peripheral) with a ``role_score``, a network cluster, a global
``priority_score`` in [0, 1] with a rank, and a short evidence line. Output: exactly three CSV files —
``nodes_roles.csv``, ``clusters.csv``, ``top_nodes.csv``.

It does not depend on the agent or on investigation stages: the agent uses these results as a baseline
and explains / challenges them.

    uv run python -m app.pipeline --data ../data --out ./output

Every threshold and weight is a named constant below; the project README ("Как появляются роли и приоритеты")
documents them.

Data caveats the rules respect:
- The crawl follows only *outgoing* transfers from 81 seeds, 4 hops deep. Nodes found at the last hop
  (depth 4) were never expanded, so their out_degree = 0 is censored, not evidence of a terminal node.
- Incoming transfers are observed only from crawled nodes, so received / sent and retention are
  incomplete (for seeds almost always). Balance ratios are not used in any rule or score.
- Transactions carry a date, not a time: "in -> out" means an outgoing transfer on the same day or up to
  FAST_DAYS days after an incoming one; the order within one day is unknown.
"""

import argparse
import math
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import duckdb
import networkx as nx
import numpy as np
import pandas as pd

FILES = ("nodes", "edges", "transactions")
REQUIRED_COLUMNS = {
    "nodes": {"gid", "depth", "is_seed"},
    "edges": {"src", "dst", "sum_kzt", "n_tx", "depth"},
    "transactions": {"src", "dst", "date", "sum_kzt"},
}
OUTPUTS = ("nodes_roles.csv", "clusters.csv", "top_nodes.csv")

# --------------------------------------------------------------------------- thresholds (see the project README)

FAST_DAYS = 2                 # in -> out within 0..FAST_DAYS days counts as fast forwarding
HUB_MIN_DEGREE = 5            # consolidator: >= 5 unique senders; distributor: >= 5 unique receivers
HUB_DOMINANCE = 2.0           # ... and at least 2x more than in the opposite direction
TRANSIT_MIN_FAST_SHARE = 0.5  # transit: >= 50% of outgoing KZT sent within FAST_DAYS after an incoming transfer
TRANSIT_MIN_FAST_TX = 2       # ... in at least 2 such outgoing transfers (one fast transfer is a coincidence)
COORD_MIN_HUB_LINKS = 3       # coordinator: linked to >= 3 hub-role nodes, receiving from one AND paying one ...
COORD_BETWEENNESS_PCT = 0.98  # ... or betweenness in the top 2% while touching >= 2 other clusters
COORD_MIN_CLUSTERS = 2
REPEAT_MIN_DAYS = 2           # a route A -> B -> C repeated on >= 2 distinct days
SYNC_CAP = 5                  # distinct senders on one day at which synchrony saturates
SEED_HOPS = 3                 # seeds counted "upstream" of a node: a directed path of <= 3 transfers from the seed
CONS_MIN_SEEDS = 3            # consolidator (convergence rule): money from >= 3 different seeds ...
CONS_MIN_SENDERS = 2          # ... arriving from >= 2 senders, and at least as many senders as receivers
SEED_CAP = 8                  # upstream seeds at which the convergence signal saturates
SEED_PRIORITY_FACTOR = 0.6    # seeds are already known to the investigators: their priority is scaled down
EVIDENCE_MAX_CHARS = 200      # the task's limit for evidence / why
PEER_OUTLIER = 0.95           # depth-peer anomaly: a metric higher than in >= 95% of the nodes at the same depth
# Metrics compared within the node's own crawl hop: (column, feature name, words for evidence).
PEER_METRICS = [("in_degree", "in_degree", "числу плательщиков"), ("out_degree", "out_degree", "числу получателей"),
                ("volume_kzt", "volume", "обороту"), ("betweenness", "betweenness", "посредничеству")]
TOP_DEFAULT = 30              # top_nodes.csv size (the task requires at least 20)
LOUVAIN_RESOLUTION = 1.0
LOUVAIN_SEED = 7
EXACT_BETWEENNESS_MAX_NODES = 20_000  # above this betweenness is estimated from a node sample

ROLE_WEIGHT = {"consolidator": 1.0, "coordinator": 1.0, "distributor": 0.9, "transit": 0.9,
               "terminal": 0.5, "peripheral": 0.1}
PRIORITY_WEIGHTS = {"role": 0.25, "seed": 0.25, "temporal": 0.20, "centrality": 0.15, "flow": 0.10, "cluster": 0.05}
# Internal board roles of the investigation agent -> task vocabulary.
AGENT_ROLE_TO_TASK = {"collector": "consolidator", "distributor": "distributor", "transit": "transit",
                      "final_recipient": "terminal", "organizer": "coordinator",
                      "coordinated_account": "coordinator", "source": "peripheral", "unclear": "peripheral"}
ROLE_RU = {"consolidator": "консолидатор", "distributor": "распределитель", "transit": "транзит",
           "coordinator": "координатор", "terminal": "конечный получатель", "peripheral": "периферия"}


@dataclass
class Result:
    nodes: pd.DataFrame
    clusters: pd.DataFrame
    top: pd.DataFrame


# --------------------------------------------------------------------------- loading

def load(data_dir: Path) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    frames = []
    for name in FILES:
        path = data_dir / f"{name}.parquet"
        if not path.is_file():
            raise FileNotFoundError(f"{path} not found: the dataset needs nodes.parquet, edges.parquet, transactions.parquet")
        df = pd.read_parquet(path)
        missing = REQUIRED_COLUMNS[name] - set(df.columns)
        if missing:
            raise ValueError(f"{name}.parquet is missing columns {sorted(missing)} (has {list(df.columns)})")
        frames.append(df)
    nodes, edges, tx = frames
    nodes = nodes.astype({"gid": "int64", "depth": "int64"}).assign(is_seed=nodes["is_seed"].astype(bool))
    edges = edges.astype({"src": "int64", "dst": "int64", "n_tx": "int64", "depth": "int64", "sum_kzt": "float64"})
    tx = tx.astype({"src": "int64", "dst": "int64", "sum_kzt": "float64"}).assign(date=pd.to_datetime(tx["date"]))
    # Nodes referenced by edges / transactions but absent from nodes.parquet would break the censoring logic.
    known = set(nodes["gid"])
    unknown = (set(edges["src"]) | set(edges["dst"]) | set(tx["src"]) | set(tx["dst"])) - known
    if unknown:
        raise ValueError(f"{len(unknown)} gids appear in edges/transactions but not in nodes.parquet")
    return nodes, edges, tx


# --------------------------------------------------------------------------- helpers

def pct(s: pd.Series) -> pd.Series:
    """Percentile in (0, 1] among positive values; 0 stays 0 (a zero is not 'average')."""
    out = pd.Series(0.0, index=s.index)
    pos = s > 0
    if pos.any():
        out[pos] = s[pos].rank(method="max", pct=True)
    return out


def cap(s: pd.Series | float, at: float):
    return np.minimum(1.0, np.asarray(s, dtype=float) / at) if at else 0.0


def fmt_kzt(v: float) -> str:
    if v >= 1e6:
        return f"{v / 1e6:.1f} млн ₸"
    if v >= 1e3:
        return f"{v / 1e3:.0f} тыс ₸"
    return f"{v:.0f} ₸"


# --------------------------------------------------------------------------- features

def temporal_features(tx: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Per-node temporal signals from individual transactions, plus the repeated routes themselves."""
    con = duckdb.connect()
    con.register("t", tx[["src", "dst", "date", "sum_kzt"]])
    fast = con.execute(f"""
        SELECT o.src AS gid, count(*) AS out_tx_t, sum(o.sum_kzt) AS out_kzt_t,
               count(*) FILTER (fast) AS fast_out_tx, coalesce(sum(o.sum_kzt) FILTER (fast), 0) AS fast_out_kzt
        FROM (SELECT o.*, EXISTS (SELECT 1 FROM t i WHERE i.dst = o.src
                                  AND i.date BETWEEN o.date - INTERVAL {FAST_DAYS} DAY AND o.date) AS fast
              FROM t o) o
        GROUP BY 1""").df()
    sync = con.execute("""
        SELECT dst AS gid, max(n) AS sync_in_max, count(*) FILTER (n >= 2) AS sync_in_days
        FROM (SELECT dst, date, count(DISTINCT src) AS n FROM t GROUP BY 1, 2) GROUP BY 1""").df()
    co = con.execute("""
        SELECT a.src AS gid, count(DISTINCT b.src) AS co_senders
        FROM t a JOIN t b ON a.dst = b.dst AND a.date = b.date AND a.src <> b.src GROUP BY 1""").df()
    routes = con.execute(f"""
        SELECT a.src AS a, a.dst AS b, b.dst AS c, count(DISTINCT a.date) AS days,
               sum(a.sum_kzt) AS in_kzt, sum(b.sum_kzt) AS out_kzt
        FROM t a JOIN t b ON b.src = a.dst AND b.dst <> a.src
             AND b.date BETWEEN a.date AND a.date + INTERVAL {FAST_DAYS} DAY
        GROUP BY 1, 2, 3 HAVING count(DISTINCT a.date) >= {REPEAT_MIN_DAYS}""").df()
    con.close()

    feats = fast.merge(sync, on="gid", how="outer").merge(co, on="gid", how="outer")
    mid = routes.groupby("b").size().rename("routes_mid")
    any_ = pd.concat([routes["a"], routes["b"], routes["c"]]).value_counts().rename("routes_any")
    feats = feats.set_index("gid").join(mid, how="outer").join(any_, how="outer").fillna(0)
    feats.index.name = "gid"
    return feats.reset_index(), routes


def graph_features(nodes: pd.DataFrame, edges: pd.DataFrame) -> tuple[nx.DiGraph, pd.DataFrame]:
    G = nx.DiGraph()
    G.add_nodes_from(nodes["gid"])
    G.add_weighted_edges_from(edges[["src", "dst", "sum_kzt"]].itertuples(index=False), weight="sum_kzt")
    pagerank = nx.pagerank(G, weight="sum_kzt")
    if G.number_of_nodes() <= EXACT_BETWEENNESS_MAX_NODES:
        betweenness = nx.betweenness_centrality(G, normalized=True)
    else:
        betweenness = nx.betweenness_centrality(G, k=2000, normalized=True, seed=LOUVAIN_SEED)
    ins = edges.groupby("dst").agg(in_degree=("src", "size"), in_tx=("n_tx", "sum"), in_sum_kzt=("sum_kzt", "sum"))
    outs = edges.groupby("src").agg(out_degree=("dst", "size"), out_tx=("n_tx", "sum"), out_sum_kzt=("sum_kzt", "sum"))
    df = nodes.set_index("gid").join(ins).join(outs).fillna(
        {"in_degree": 0, "in_tx": 0, "in_sum_kzt": 0.0, "out_degree": 0, "out_tx": 0, "out_sum_kzt": 0.0})
    df["pagerank"] = pd.Series(pagerank)
    df["betweenness"] = pd.Series(betweenness)
    for c in ("in_degree", "in_tx", "out_degree", "out_tx"):
        df[c] = df[c].astype(int)
    return G, df.reset_index()


def seed_features(G: nx.DiGraph, nodes: pd.DataFrame) -> pd.DataFrame:
    """How many different seeds send money towards each node: directly (one transfer) and upstream (a directed
    path of <= SEED_HOPS transfers). Seeds are the known lower level, so convergence of several seeds on one
    node is the main sign of a consolidation point above them. A seed does not count itself."""
    direct: dict[int, set] = {}
    upstream: dict[int, set] = {}
    for s in nodes.loc[nodes["is_seed"], "gid"]:
        for n, hops in nx.single_source_shortest_path_length(G, s, cutoff=SEED_HOPS).items():
            if n == s:
                continue
            upstream.setdefault(n, set()).add(s)
            if hops == 1:
                direct.setdefault(n, set()).add(s)
    return pd.DataFrame({"gid": nodes["gid"],
                         "seeds_direct": nodes["gid"].map(lambda g: len(direct.get(g, ()))),
                         "seeds_upstream": nodes["gid"].map(lambda g: len(upstream.get(g, ())))})


def depth_peer_features(df: pd.DataFrame) -> pd.DataFrame:
    """How a node compares with the nodes of its own crawl hop. Structure differs a lot by depth (a depth-4 node
    has at most 3 senders, a seed up to 24), so "9 senders" only means something against the same depth.

    ``peer_<metric>`` = share of same-depth nodes with a strictly smaller value (0..1; ties do not count, so a
    value most peers share scores low). Out-degree is not compared on the last hop (censored), and seeds are
    compared with seeds only (their inflow is equally incomplete). ``depth_outliers`` lists the metrics where
    the node is above >= PEER_OUTLIER of its peers."""
    df["volume_kzt"] = df["in_sum_kzt"] + df["out_sum_kzt"]
    for col, name, _ in PEER_METRICS:
        smaller = df.groupby("depth")[col].rank(method="min") - 1
        size = df.groupby("depth")[col].transform("size")
        df[f"peer_{name}"] = (smaller / (size - 1).clip(lower=1)).round(4)
    df.loc[df["censored"], "peer_out_degree"] = np.nan
    outliers = []
    for _, r in df.iterrows():
        hits = [name for col, name, _ in PEER_METRICS
                if pd.notna(r[f"peer_{name}"]) and r[f"peer_{name}"] >= PEER_OUTLIER and r[col] > 0]
        outliers.append(",".join(hits))
    df["depth_outliers"] = outliers
    return df


def cluster(G: nx.DiGraph, edges: pd.DataFrame) -> dict[int, int]:
    """Louvain communities on the undirected graph, edge weight log1p(sum_kzt) (heavy tails would let a few
    large transfers dominate). Louvain never merges disconnected components; isolated nodes are singletons."""
    U = nx.Graph()
    U.add_nodes_from(G.nodes)
    for r in edges.itertuples(index=False):
        w = math.log1p(r.sum_kzt)
        if U.has_edge(r.src, r.dst):
            U[r.src][r.dst]["weight"] += w
        else:
            U.add_edge(r.src, r.dst, weight=w)
    comms = nx.community.louvain_communities(U, weight="weight", resolution=LOUVAIN_RESOLUTION, seed=LOUVAIN_SEED)
    return {n: i for i, c in enumerate(comms) for n in c}


# --------------------------------------------------------------------------- roles

def assign_roles(df: pd.DataFrame, G: nx.DiGraph) -> pd.DataFrame:
    max_depth = int(df["depth"].max())
    df["censored"] = df["depth"] >= max_depth  # never expanded: outgoing transfers unknown
    fast_share = (df["fast_out_kzt"] / df["out_sum_kzt"].where(df["out_sum_kzt"] > 0)).fillna(0.0)
    # Fast forwarding only means something when an incoming transfer was observed at all.
    df["fast_out_share"] = fast_share.where(df["in_tx"] > 0, 0.0).clip(0, 1)
    # Share of observed inflow that stays (1 - out/in). Only where it means something: not a seed (inflow from
    # outside the crawl is invisible), not censored (outflow unknown), some inflow observed. Otherwise empty.
    valid = ~df["is_seed"] & ~df["censored"] & (df["in_sum_kzt"] > 0)
    df["retention"] = (1 - df["out_sum_kzt"] / df["in_sum_kzt"].where(valid)).clip(0, 1)
    passes = (1 - df["retention"]).fillna(0.5)  # unknown -> neutral
    df["pagerank_pct"] = pct(df["pagerank"])
    df["betweenness_pct"] = pct(df["betweenness"])
    in_sum_pct, out_sum_pct = pct(df["in_sum_kzt"]), pct(df["out_sum_kzt"])

    # Strengths are defined for every node; a role is assigned only where its rule holds.
    s_cons = (0.3 * cap(df["in_degree"], 15) + 0.3 * cap(df["seeds_upstream"], SEED_CAP)
              + 0.15 * cap(df["sync_in_max"], SYNC_CAP) + 0.25 * in_sum_pct)
    s_dist = 0.5 * cap(df["out_degree"], 30) + 0.25 * df["fast_out_share"] + 0.25 * out_sum_pct
    s_tran = (0.45 * df["fast_out_share"] + 0.2 * passes + 0.15 * cap(df["routes_mid"], 3)
              + 0.2 * df["betweenness_pct"])
    rule_cons = (((df["in_degree"] >= HUB_MIN_DEGREE) & (df["in_degree"] >= HUB_DOMINANCE * df["out_degree"]))
                 | ((df["seeds_upstream"] >= CONS_MIN_SEEDS) & (df["in_degree"] >= CONS_MIN_SENDERS)
                    & (df["in_degree"] >= df["out_degree"])))
    rule_dist = (~df["censored"] & (df["out_degree"] >= HUB_MIN_DEGREE)
                 & (df["out_degree"] >= HUB_DOMINANCE * df["in_degree"].clip(lower=1)))
    rule_tran = (~df["censored"] & (df["in_tx"] > 0) & (df["out_tx"] > 0)
                 & (df["fast_out_share"] >= TRANSIT_MIN_FAST_SHARE) & (df["fast_out_tx"] >= TRANSIT_MIN_FAST_TX))

    role = pd.Series("peripheral", index=df.index)
    score = pd.Series(0.0, index=df.index)
    hub = rule_cons | rule_dist
    both = rule_cons & rule_dist
    pick_cons = rule_cons & (~both | (s_cons >= s_dist))
    role[pick_cons], score[pick_cons] = "consolidator", s_cons[pick_cons]
    pick_dist = rule_dist & ~pick_cons
    role[pick_dist], score[pick_dist] = "distributor", s_dist[pick_dist]
    pick_tran = rule_tran & ~hub
    role[pick_tran], score[pick_tran] = "transit", s_tran[pick_tran]

    # Coordinator: a node (not itself a hub or transit) that ties hub-role nodes together or bridges clusters.
    gid = df["gid"].to_numpy()
    hub_nodes = set(gid[role.isin(["consolidator", "distributor", "transit"])])
    cluster_of = dict(zip(gid, df["cluster_id"]))
    hub_in, hub_out, clusters_touched = [], [], []
    for g in gid:
        preds, succs = set(G.predecessors(g)), set(G.successors(g))
        hub_in.append(len(preds & hub_nodes))
        hub_out.append(len(succs & hub_nodes))
        clusters_touched.append(len({cluster_of[n] for n in preds | succs} - {cluster_of[g]}))
    df["hub_in"], df["hub_out"], df["clusters_touched"] = hub_in, hub_out, clusters_touched
    df["hub_links"] = df["hub_in"] + df["hub_out"]
    s_coord = (0.4 * cap(df["hub_links"], 4) + 0.3 * df["betweenness_pct"] + 0.3 * cap(df["clusters_touched"], 3))
    rule_coord = (role == "peripheral") & (
        ((df["hub_links"] >= COORD_MIN_HUB_LINKS) & (df["hub_in"] >= 1) & (df["hub_out"] >= 1))
        | ((df["betweenness_pct"] >= COORD_BETWEENNESS_PCT) & (df["clusters_touched"] >= COORD_MIN_CLUSTERS)))
    role[rule_coord], score[rule_coord] = "coordinator", s_coord[rule_coord]

    # Terminal only where the outgoing side was actually observed (depth < max depth).
    rule_term = (role == "peripheral") & ~df["censored"] & (df["out_degree"] == 0) & (df["in_degree"] > 0)
    s_term = 0.4 + 0.2 * cap(df["in_degree"], 5) + 0.2 * cap(df["seeds_upstream"], SEED_CAP) + 0.2 * in_sum_pct
    role[rule_term], score[rule_term] = "terminal", s_term[rule_term]

    periph = role == "peripheral"
    strongest = pd.concat([s_cons, s_dist, s_tran, s_coord], axis=1).max(axis=1)
    score[periph] = 1.0 - strongest[periph]
    df["role"], df["role_score"] = role, score.clip(0, 1)
    return df


# --------------------------------------------------------------------------- priority & clusters

def cluster_table(df: pd.DataFrame, edges: pd.DataFrame, routes: pd.DataFrame, tx: pd.DataFrame) -> pd.DataFrame:
    cid = dict(zip(df["gid"], df["cluster_id"]))
    e = edges.assign(cs=edges["src"].map(cid), cd=edges["dst"].map(cid))
    internal = e[e["cs"] == e["cd"]]
    external = e[e["cs"] != e["cd"]]
    t = tx.assign(cs=tx["src"].map(cid), cd=tx["dst"].map(cid))
    t_int = t[t["cs"] == t["cd"]]
    r = routes.assign(ca=routes["a"].map(cid), cb=routes["b"].map(cid), cc=routes["c"].map(cid))
    r_int = r[(r["ca"] == r["cb"]) & (r["cb"] == r["cc"])]

    fast_by_node = df.set_index("gid")["fast_out_share"]
    rows = []
    for c, g in df.groupby("cluster_id"):
        roles = g["role"].value_counts().to_dict()
        seeds, others = g[g["is_seed"]], g[~g["is_seed"]]
        active = sum(roles.get(k, 0) for k in ("consolidator", "distributor", "transit", "coordinator"))
        ti = t_int[t_int["cs"] == c]
        fast_kzt = (ti["sum_kzt"] * ti["src"].map(fast_by_node).fillna(0)).sum()
        rows.append({
            "cluster_id": c, "n_nodes": len(g), "n_seed": int(g["is_seed"].sum()),
            "sum_kzt_internal": float(internal.loc[internal["cs"] == c, "sum_kzt"].sum()),
            "sum_kzt_external": float(external.loc[(external["cs"] == c) | (external["cd"] == c), "sum_kzt"].sum()),
            "n_edges_internal": int((internal["cs"] == c).sum()),
            "n_censored": int(g["censored"].sum()),
            # Seeds' inflow is invisible by construction, so compare the cluster's flows on non-seeds only.
            "in_kzt_nonseed": float(others["in_sum_kzt"].sum()), "out_kzt_nonseed": float(others["out_sum_kzt"].sum()),
            "in_kzt_seeds": float(seeds["in_sum_kzt"].sum()), "out_kzt_seeds": float(seeds["out_sum_kzt"].sum()),
            "n_active_roles": active,
            "fast_share_internal": float(fast_kzt / ti["sum_kzt"].sum()) if len(ti) else 0.0,
            "repeated_routes": int((r_int["ca"] == c).sum()),
            "roles": ", ".join(f"{k}:{v}" for k, v in sorted(roles.items(), key=lambda kv: -kv[1])),
            "_roles": roles,
        })
    cl = pd.DataFrame(rows)
    cl["cluster_score"] = (
        0.35 * cap(cl["n_active_roles"] / cl["n_nodes"].clip(lower=1), 1 / 3)
        + 0.25 * cl["fast_share_internal"]
        + 0.20 * cap(cl["repeated_routes"], 3)
        + 0.20 * pct(cl["sum_kzt_internal"])
    ).where(cl["n_nodes"] >= 3, 0.0)
    return cl


def hypothesis(row: pd.Series) -> str:
    r = row["_roles"]
    cons, dist, tran, coord = (r.get(k, 0) for k in ("consolidator", "distributor", "transit", "coordinator"))
    if row["n_nodes"] < 3:
        return "Малая изолированная группа — недостаточно данных для гипотезы."
    facts = (f"{row['n_nodes']} узлов, seed {row['n_seed']}; внутр. оборот {fmt_kzt(row['sum_kzt_internal'])}; "
             f"быстрый транзит {row['fast_share_internal']:.0%}; повторяющихся маршрутов {row['repeated_routes']}")
    alt = ""
    if cons and dist and (tran or coord):
        head = "Сбор → транзит → распределение: полный контур движения средств"
    elif cons and (tran or dist):
        head = "Сбор средств от многих отправителей с дальнейшей передачей"
    elif dist and tran:
        head, alt = "Транзит с веерной раздачей", "выплаты / зарплатный проект"
    elif cons:
        head, alt = "Сбор средств на немногих получателях", "продавец / сбор платежей"
    elif dist:
        head, alt = "Веерная раздача", "зарплата, выплаты поставщикам"
    elif tran or row["repeated_routes"]:
        head = "Цепочки быстрого транзита и повторяющиеся маршруты"
    elif coord:
        head = "Связующие узлы между группами без выраженного потока"
    else:
        head = "Обычная активность без выраженных признаков"
    counts = ", ".join(f"{ROLE_RU[k]} {v}" for k, v in (("consolidator", cons), ("transit", tran),
                                                          ("distributor", dist), ("coordinator", coord)) if v)
    lead = f"; ключевой узел {row['lead_gid']} ({ROLE_RU[row['lead_role']]})" if row.get("lead_gid") else ""
    censored = f"; {row['n_censored']} узлов на границе обхода (исходящие неизвестны)" if row["n_censored"] else ""
    alt = f" Обычное объяснение: {alt}." if alt else ""
    return f"{head}" + (f" ({counts})" if counts else "") + f". {facts}{lead}{censored}.{alt}"


def priority(df: pd.DataFrame, clusters: pd.DataFrame) -> pd.DataFrame:
    w = PRIORITY_WEIGHTS
    role_c = df["role"].map(ROLE_WEIGHT) * df["role_score"]
    temporal = (0.4 * df["fast_out_share"] + 0.2 * cap(df["sync_in_max"], SYNC_CAP)
                + 0.3 * cap(df["routes_any"], 3) + 0.1 * cap(df["co_senders"], 5))
    centrality = 0.5 * df["pagerank_pct"] + 0.5 * df["betweenness_pct"]
    flow = pct(df["in_sum_kzt"] + df["out_sum_kzt"])
    seed_c = 0.6 * cap(df["seeds_upstream"], SEED_CAP) + 0.4 * cap(df["seeds_direct"], 3)
    cl = df["cluster_id"].map(clusters.set_index("cluster_id")["cluster_score"]).fillna(0)
    raw = (w["role"] * role_c + w["seed"] * seed_c + w["temporal"] * temporal + w["centrality"] * centrality
           + w["flow"] * flow + w["cluster"] * cl)
    # The analyst already has the seeds; the ranking should lead to the unknown levels above them.
    df["priority_score"] = (raw * np.where(df["is_seed"], SEED_PRIORITY_FACTOR, 1.0)).clip(0, 1).round(4)
    df["rank"] = df["priority_score"].rank(method="first", ascending=False).astype(int)
    return df


ROLE_HEAD = {"consolidator": "Признаки консолидации", "distributor": "Признаки веерной раздачи",
             "transit": "Признаки транзита", "coordinator": "Связующий узел между хабами",
             "terminal": "Конечная точка в данных", "peripheral": "Периферия, явных признаков нет"}


def peer_fact(r: pd.Series) -> str | None:
    """The first depth-peer outlier metric of the node, in words ("больше плательщиков, чем у 98% узлов 3-го колена")."""
    for _, name, words in PEER_METRICS:
        if name in str(r["depth_outliers"]).split(","):
            peers = "seed" if r["depth"] == 0 else f"узлов {r['depth']}-го колена"
            share = r[f"peer_{name}"]
            return (f"по {words} больше всех {peers}" if share >= 0.995
                    else f"по {words} выше {int(share * 100)}% {peers}")
    return None


def evidence(r: pd.Series) -> str:
    """Why the node has its role, in plain words, most important facts first, at most EVIDENCE_MAX_CHARS."""
    facts: list[str] = []
    if r["seeds_upstream"] >= 2:
        facts.append(f"деньги от {int(r['seeds_upstream'])} seed" +
                     (f" ({int(r['seeds_direct'])} напрямую)" if r["seeds_direct"] else ""))
    if r["in_degree"]:
        facts.append(f"получает от {r['in_degree']} плательщ. ({fmt_kzt(r['in_sum_kzt'])})")
    if r["out_degree"]:
        facts.append(f"платит {r['out_degree']} получат. ({fmt_kzt(r['out_sum_kzt'])})")
    if pd.notna(r["retention"]) and r["out_degree"]:
        ratio = r["out_sum_kzt"] / r["in_sum_kzt"]
        # Paying out more than was seen coming in means part of the inflow is outside the data.
        facts.append(f"отдаёт дальше {ratio:.0%} полученного" if ratio <= 1
                     else f"отдаёт в {ratio:.1f} раза больше видимого входа")
    peer = peer_fact(r)
    if peer:
        facts.append(peer)
    if r["fast_out_share"] > 0:
        facts.append(f"{r['fast_out_share']:.0%} уходит ≤{FAST_DAYS} дн. после поступления")
    if r["sync_in_max"] >= 3:
        facts.append(f"до {int(r['sync_in_max'])} плательщ. в один день")
    if r["routes_any"]:
        facts.append(f"повтор. маршрутов: {int(r['routes_any'])}")
    if r["hub_links"] and r["role"] == "coordinator":
        facts.insert(0, f"связан с {r['hub_in']}+{r['hub_out']} хабами (вход+выход)")
    if r["censored"]:
        facts.insert(0, "4-е колено: исходящие не видны")
    elif r["out_degree"] == 0 and r["in_degree"]:
        facts.append("исходящих ≥5 тыс ₸ нет")
    if r["is_seed"]:
        facts.append("seed, входящие занижены")
    text = ROLE_HEAD[r["role"]]
    for i, f in enumerate(facts):
        candidate = f"{text}{': ' if i == 0 else '; '}{f}"
        if len(candidate) > EVIDENCE_MAX_CHARS:
            continue  # a shorter fact further down may still fit
        text = candidate
    return text


# --------------------------------------------------------------------------- resilience (not part of the CSV output)

RESILIENCE_STEPS = (5, 10, 20, 50)
RESILIENCE_RANDOM_TRIALS = 20


def _network_state(G: nx.DiGraph, seeds: set) -> dict[str, int]:
    """Largest connected fragment, number of fragments (2+ nodes), and how many nodes money from the seeds can
    still reach along transfers (<= 4 hops, the crawl depth)."""
    comps = [len(c) for c in nx.weakly_connected_components(G)]
    reach: set = set()
    for s in seeds:
        if s in G:
            reach.update(nx.single_source_shortest_path_length(G, s, cutoff=4))
    return {"largest_fragment": max(comps, default=0), "fragments": sum(1 for c in comps if c >= 2),
            "reachable_from_seeds": len(reach - seeds)}


def resilience(data_dir: Path, nodes_roles: pd.DataFrame) -> dict:
    """What happens to the network when the top-N nodes by priority are taken out, against taking out N random
    non-seed nodes (mean of RESILIENCE_RANDOM_TRIALS). Seeds always stay: they are the known starting points."""
    nodes, edges, _ = load(data_dir)
    G = nx.DiGraph()
    G.add_nodes_from(nodes["gid"])
    G.add_edges_from(edges[["src", "dst"]].itertuples(index=False))
    seeds = set(nodes.loc[nodes["is_seed"], "gid"])
    ranked = [g for g in nodes_roles.sort_values("rank")["gid"] if g not in seeds]
    others = sorted(set(nodes["gid"]) - seeds)
    rng = np.random.default_rng(LOUVAIN_SEED)
    steps = []
    # A small graph cannot lose more nodes than it has.
    for n in sorted({min(k, len(others), len(ranked)) for k in RESILIENCE_STEPS} - {0}):
        top = G.copy()
        top.remove_nodes_from(ranked[:n])
        rand = [_network_state(nx.restricted_view(G, rng.choice(others, n, replace=False), []), seeds)
                for _ in range(RESILIENCE_RANDOM_TRIALS)]
        steps.append({"removed": n, "top": _network_state(top, seeds),
                      "random": {k: round(float(np.mean([r[k] for r in rand])), 1) for k in rand[0]}})
    return {"baseline": _network_state(G, seeds), "steps": steps}


# --------------------------------------------------------------------------- run

NODE_COLUMNS = ["gid", "role", "role_score", "cluster_id", "priority_score", "rank", "evidence",
                "depth", "is_seed", "censored", "seeds_upstream", "seeds_direct", "in_degree", "out_degree",
                "in_tx", "out_tx", "in_sum_kzt", "out_sum_kzt", "retention", "fast_out_share", "sync_in_max", "co_senders",
                "routes_mid", "routes_any", "pagerank", "betweenness", "hub_in", "hub_out", "clusters_touched",
                "peer_in_degree", "peer_out_degree", "peer_volume", "peer_betweenness", "depth_outliers"]
CLUSTER_COLUMNS = ["cluster_id", "n_nodes", "n_seed", "sum_kzt_internal", "top_gids", "hypothesis",
                   "cluster_score", "sum_kzt_external", "n_edges_internal", "n_censored", "fast_share_internal",
                   "repeated_routes", "in_kzt_nonseed", "out_kzt_nonseed", "in_kzt_seeds", "out_kzt_seeds", "roles"]
# The task's schema first (rank, gid, role, priority_score, why), then context for the analyst.
TOP_COLUMNS = ["rank", "gid", "role", "priority_score", "why", "role_score", "cluster_id", "seeds_upstream",
               "seeds_direct", "in_degree", "out_degree", "in_sum_kzt", "out_sum_kzt", "retention", "fast_out_share",
               "depth", "is_seed", "censored"]


def analyze(data_dir: Path, top: int = TOP_DEFAULT) -> Result:
    nodes, edges, tx = load(data_dir)
    G, df = graph_features(nodes, edges)
    temporal, routes = temporal_features(tx)
    df = df.merge(temporal, on="gid", how="left").merge(seed_features(G, nodes), on="gid", how="left")
    for c in ("fast_out_tx", "fast_out_kzt", "sync_in_max", "sync_in_days", "co_senders", "routes_mid", "routes_any"):
        df[c] = df[c].fillna(0)
    for c in ("sync_in_max", "sync_in_days", "co_senders", "routes_mid", "routes_any", "fast_out_tx"):
        df[c] = df[c].astype(int)

    raw_cluster = cluster(G, edges)
    df["cluster_id"] = df["gid"].map(raw_cluster)
    df = assign_roles(df, G)
    df = depth_peer_features(df)
    clusters = cluster_table(df, edges, routes, tx)
    df = priority(df, clusters)

    # Renumber clusters by suspicion (0 = most suspicious), then attach the top nodes and hypotheses.
    order = clusters.sort_values(["cluster_score", "sum_kzt_internal"], ascending=False)["cluster_id"].tolist()
    remap = {old: new for new, old in enumerate(order)}
    df["cluster_id"] = df["cluster_id"].map(remap)
    clusters["cluster_id"] = clusters["cluster_id"].map(remap)
    top_by_cluster = (df.sort_values("rank").groupby("cluster_id")["gid"]
                      .apply(lambda s: " ".join(str(g) for g in s.head(5))))
    clusters["top_gids"] = clusters["cluster_id"].map(top_by_cluster)
    lead = df.sort_values("rank").groupby("cluster_id").first()
    clusters["lead_gid"] = clusters["cluster_id"].map(lead["gid"])
    clusters["lead_role"] = clusters["cluster_id"].map(lead["role"])
    clusters["hypothesis"] = clusters.apply(hypothesis, axis=1)
    clusters = clusters.sort_values("cluster_id")[CLUSTER_COLUMNS]

    df["evidence"] = df.apply(evidence, axis=1)
    df = df.sort_values("rank")
    for c in ("role_score", "fast_out_share"):
        df[c] = df[c].round(4)
    for c in ("pagerank", "betweenness"):
        df[c] = df[c].round(8)
    for c in ("in_sum_kzt", "out_sum_kzt"):
        df[c] = df[c].round(2)
    for c in ("sum_kzt_internal", "sum_kzt_external", "in_kzt_nonseed", "out_kzt_nonseed", "in_kzt_seeds", "out_kzt_seeds"):
        clusters[c] = clusters[c].round(2)
    for c in ("cluster_score", "fast_share_internal"):
        clusters[c] = clusters[c].round(4)
    df["retention"] = df["retention"].round(4)
    top_n = df.head(max(20, top)).assign(why=lambda d: d["evidence"])[TOP_COLUMNS]
    return Result(nodes=df[NODE_COLUMNS], clusters=clusters, top=top_n)


def write(result: Result, out_dir: Path) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    paths = []
    for name, frame in zip(OUTPUTS, (result.nodes, result.clusters, result.top)):
        path = out_dir / name
        frame.to_csv(path, index=False)
        paths.append(path)
    return paths


def run(data_dir: Path, out_dir: Path, top: int = TOP_DEFAULT) -> Result:
    result = analyze(data_dir, top)
    write(result, out_dir)
    return result


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="python -m app.pipeline", description=__doc__.split("\n\n")[0])
    ap.add_argument("--data", type=Path, default=Path("./data"), help="folder with nodes/edges/transactions.parquet")
    ap.add_argument("--out", type=Path, default=Path("./output"), help="folder for the three CSV files")
    ap.add_argument("--top", type=int, default=TOP_DEFAULT, help="rows in top_nodes.csv (min 20)")
    args = ap.parse_args(argv)
    started = time.perf_counter()
    try:
        result = run(args.data, args.out, args.top)
    except (FileNotFoundError, ValueError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    n = result.nodes
    print(f"{len(n)} nodes, {len(result.clusters)} clusters, {int(n['censored'].sum())} censored (last hop)")
    print("roles:", ", ".join(f"{k}={v}" for k, v in n["role"].value_counts().items()))
    print(f"wrote {', '.join(str(args.out / f) for f in OUTPUTS)} in {time.perf_counter() - started:.1f}s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
