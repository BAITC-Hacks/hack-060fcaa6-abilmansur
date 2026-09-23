"""Deterministic graph heuristics. Scores are not probabilities of wrongdoing."""

from collections import Counter, defaultdict
from dataclasses import dataclass

import networkx as nx
import pandas as pd

from money_graph.data import Dataset

ROLES = {"consolidator", "transit", "distributor", "terminal", "coordinator", "peripheral"}
LIMITATIONS = [
    "Роли — гипотезы для проверки, не выводы о виновности; скоры не калиброваны.",
    "Видны только внутрибанковские переводы от seed, до четырёх колен; полный баланс неизвестен.",
    "Исходящие depth=4 обрезаны сбором; отсутствие переводов не доказывает удержание денег.",
    "Входящие seed неполны; out/in для них не используется в правилах ролей.",
    "Переводы ниже 5 000 KZT не наблюдаются; дробление ниже порога оценить нельзя.",
    "Совпадение дат не доказывает, что дальше переведены именно полученные деньги.",
]


def classify(m: dict) -> tuple[str, float, str]:
    """First matching rule wins; keep thresholds in sync with METHODOLOGY.md."""
    incoming, outgoing = m["in_degree"], m["out_degree"]
    ratio = m["out_kzt"] / m["in_kzt"] if m["in_kzt"] else None
    if incoming + outgoing == 0:
        return "peripheral", 0.2, "Связи в выборке отсутствуют"
    if (
        m["depth"] < 4
        and incoming >= 2
        and outgoing >= 2
        and m["seed_reach"] >= 3
        and m["betweenness"] > 0
        and m["betweenness_rank"] >= 0.9
    ):
        return (
            "coordinator",
            0.65,
            f"Гипотеза координации: пути от {m['seed_reach']} seed, высокая посредническая роль",
        )
    if incoming >= 3 and (
        m["depth"] == 4 or (not m["is_seed"] and ratio is not None and ratio <= 0.5)
    ):
        score = 0.55 if m["depth"] == 4 else 0.8
        return "consolidator", score, f"Признаки консолидации: {incoming} плательщиков"
    if outgoing >= 3 and outgoing >= 2 * incoming:
        return (
            "distributor",
            0.8,
            f"Признаки распределения: {outgoing} получателей, {incoming} плательщиков",
        )
    if (
        m["depth"] < 4
        and not m["is_seed"]
        and incoming >= 1
        and outgoing >= 1
        and ratio is not None
        and 0.8 <= ratio <= 1.2
    ):
        return (
            "transit",
            0.7,
            f"Признаки транзита: исходящие составляют {ratio:.0%} наблюдаемых входящих",
        )
    if m["depth"] < 4 and not m["is_seed"] and incoming >= 1 and outgoing == 0:
        return (
            "terminal",
            0.6,
            "Кандидат в конечные получатели: в наблюдаемом периоде исходящих нет",
        )
    return "peripheral", 0.3, "Выраженные признаки роли по заданным порогам не выявлены"


def positive_ranks(values: dict[int, float]) -> dict[int, float]:
    """Zero stays zero; positive values receive empirical percentile ranks."""
    positive = pd.Series({k: v for k, v in values.items() if v > 0}, dtype=float)
    ranked = positive.rank(method="average", pct=True).to_dict()
    return {k: float(ranked.get(k, 0)) for k in values}


@dataclass
class Analysis:
    data: Dataset
    graph: nx.DiGraph
    nodes: list[dict]
    clusters: list[dict]
    summary: dict

    def top(self, limit: int = 50) -> list[dict]:
        ordered = sorted(self.nodes, key=lambda n: (-n["priority_score"], n["gid"]))[:limit]
        return [
            dict(
                rank=i,
                gid=n["gid"],
                role=n["role"],
                priority_score=n["priority_score"],
                why=n["priority_evidence"],
            )
            for i, n in enumerate(ordered, 1)
        ]


def analyze(data: Dataset) -> Analysis:
    graph = nx.DiGraph()
    graph.add_nodes_from(int(gid) for gid in sorted(data.nodes.gid))
    for row in data.edges.sort_values(["src", "dst"]).itertuples(index=False):
        graph.add_edge(
            int(row.src),
            int(row.dst),
            sum_kzt=float(row.sum_kzt),
            n_tx=int(row.n_tx),
            depth=int(row.depth),
        )
    # Sum both directions; DiGraph.to_undirected() would overwrite reciprocal weights.
    undirected = nx.Graph()
    undirected.add_nodes_from(graph)
    for src, dst, attrs in graph.edges(data=True):
        previous = undirected.get_edge_data(src, dst, {}).get("weight", 0)
        undirected.add_edge(src, dst, weight=previous + attrs["sum_kzt"])
    communities = []
    for component in sorted(nx.connected_components(undirected), key=min):
        subgraph = undirected.subgraph(sorted(component))
        if len(component) == 1:
            communities.append(set(component))
        else:
            communities.extend(nx.community.louvain_communities(subgraph, seed=42, weight="weight"))
    communities.sort(key=lambda group: (-len(group), min(group)))
    cluster_ids = {gid: i for i, group in enumerate(communities) for gid in group}
    between = nx.betweenness_centrality(graph, k=min(128, len(graph)), seed=42, weight=None)
    between_rank = positive_ranks(between)
    seed_reach = Counter()
    for seed in sorted(data.nodes.loc[data.nodes.is_seed, "gid"]):
        seed_reach.update(nx.descendants(graph, int(seed)))
    temporal = temporal_metrics(data)
    nodes = []
    for row in data.nodes.sort_values("gid").itertuples(index=False):
        gid = int(row.gid)
        # Self-transfers do not count as distinct counterparties or net flows.
        incoming = [(s, a) for s, _, a in graph.in_edges(gid, data=True) if s != gid]
        outgoing = [(d, a) for _, d, a in graph.out_edges(gid, data=True) if d != gid]
        in_kzt = round(sum(a["sum_kzt"] for _, a in incoming), 2)
        out_kzt = round(sum(a["sum_kzt"] for _, a in outgoing), 2)
        m = dict(
            gid=gid,
            depth=int(row.depth),
            is_seed=bool(row.is_seed),
            cluster_id=cluster_ids[gid],
            in_degree=len(incoming),
            out_degree=len(outgoing),
            in_kzt=in_kzt,
            out_kzt=out_kzt,
            seed_reach=seed_reach[gid],
            betweenness=float(between[gid]),
            betweenness_rank=between_rank[gid],
            boundary_censored=row.depth == 4,
            observed_out_in_ratio=round(out_kzt / in_kzt, 4) if in_kzt else None,
            **temporal.get(gid, {}),
        )
        role, score, evidence = classify(m)
        warnings = []
        if m["boundary_censored"]:
            warnings.append("Обрыв на 4-м колене: исходящие неизвестны")
        if m["is_seed"]:
            warnings.append("Входящие seed неполны")
        if out_kzt > in_kzt:
            warnings.append("Исходящие выше наблюдаемых входящих; баланс неполон")
        if warnings:
            evidence += "; " + warnings[0]
        m.update(role=role, role_score=score, evidence=evidence[:200], warnings=warnings)
        nodes.append(m)
    fanin = positive_ranks({n["gid"]: n["in_degree"] for n in nodes})
    volume = positive_ranks({n["gid"]: n["in_kzt"] + n["out_kzt"] for n in nodes})
    role_weight = dict(
        coordinator=1, consolidator=0.9, transit=0.65, distributor=0.6, terminal=0.45, peripheral=0
    )
    for n in nodes:
        gid = n["gid"]
        parts = dict(
            fanin=0.3 * fanin[gid],
            volume=0.25 * volume[gid],
            seed_reach=0.2 * min(n["seed_reach"] / 5, 1),
            betweenness=0.15 * between_rank[gid],
            role=0.1 * role_weight[n["role"]],
        )
        n["priority_components"] = {key: round(value, 6) for key, value in parts.items()}
        n["priority_score"] = round(sum(parts.values()), 6)
        n["priority_evidence"] = (
            f"{n['evidence']}. Вход от {n['in_degree']} узлов; "
            f"оборот {n['in_kzt'] + n['out_kzt']:,.2f} KZT; "
            f"достижим от {n['seed_reach']} seed. "
            f"Вклады: вход={parts['fanin']:.3f}, оборот={parts['volume']:.3f}, "
            f"seed={parts['seed_reach']:.3f}, посредничество={parts['betweenness']:.3f}, "
            f"роль={parts['role']:.3f}."
        )
    by_id = {n["gid"]: n for n in nodes}
    internal = Counter()
    for src, dst, attrs in graph.edges(data=True):
        if cluster_ids[src] == cluster_ids[dst]:
            internal[cluster_ids[src]] += attrs["sum_kzt"]
    clusters = []
    for cid, members in enumerate(communities):
        leaders = sorted(members, key=lambda g: (-by_id[g]["priority_score"], g))[:5]
        counts = Counter(by_id[g]["role"] for g in members)
        dominant = sorted(counts, key=lambda role: (-counts[role], role))[0]
        clusters.append(
            dict(
                cluster_id=cid,
                n_nodes=len(members),
                n_seed=sum(by_id[g]["is_seed"] for g in members),
                sum_kzt_internal=round(internal[cid], 2),
                top_gids=leaders,
                hypothesis=f"Структурное сообщество; преобладает {dominant}. "
                "Совместную деятельность следует проверить.",
            )
        )
    summary = dict(
        n_nodes=len(nodes),
        n_edges=graph.number_of_edges(),
        n_transactions=len(data.transactions),
        n_seed=int(data.nodes.is_seed.sum()),
        n_clusters=len(clusters),
        n_components=nx.number_weakly_connected_components(graph),
        n_isolates=len(list(nx.isolates(graph))),
        total_kzt=round(float(data.edges.sum_kzt.sum()), 2),
        boundary_nodes=sum(n["boundary_censored"] for n in nodes),
        period_start=None if data.transactions.empty else str(data.transactions.date.min().date()),
        period_end=None if data.transactions.empty else str(data.transactions.date.max().date()),
        roles=dict(Counter(n["role"] for n in nodes)),
        limitations=LIMITATIONS,
        method_version="1.0.0",
    )
    return Analysis(data, graph, nodes, clusters, summary)


def temporal_metrics(data: Dataset) -> dict[int, dict]:
    """Date-level co-occurrence only: never claim tracing of specific money."""
    incoming, outgoing = defaultdict(set), defaultdict(set)
    senders = defaultdict(lambda: defaultdict(set))
    for row in data.transactions.itertuples(index=False):
        if row.src == row.dst:
            continue
        incoming[row.dst].add(row.date)
        outgoing[row.src].add(row.date)
        senders[row.dst][row.date].add(row.src)
    result = {}
    for gid in data.nodes.gid:
        days = incoming[gid]
        matched = sum(
            any(day + pd.Timedelta(days=offset) in outgoing[gid] for offset in range(3))
            for day in days
        )
        result[int(gid)] = dict(
            incoming_active_days=len(days),
            outgoing_active_days=len(outgoing[gid]),
            near_outgoing_day_ratio=round(matched / len(days), 4) if days else None,
            max_same_day_senders=max((len(s) for s in senders[gid].values()), default=0),
        )
    return result
