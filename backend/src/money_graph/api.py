"""Local API for the future frontend. Bind to loopback; no authentication layer yet."""

import os
from contextlib import asynccontextmanager
from pathlib import Path
from threading import Lock
from typing import Annotated, Literal

import networkx as nx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from money_graph.analysis import Analysis, analyze
from money_graph.assistant import AssistantUnavailable, CodexAssistant, context_for
from money_graph.cli import DEFAULT_DATA
from money_graph.data import DataError, Dataset
from money_graph.export import EXPORTS, csv_content
from money_graph.schemas import (
    AssistantAnswer,
    Cluster,
    Edge,
    Graph,
    GraphPath,
    Node,
    Page,
    Question,
    Role,
    TopList,
    Transaction,
    wire,
)

Limit = Annotated[int, Query(ge=1, le=500)]
Offset = Annotated[int, Query(ge=0)]


def create_app(data_dir: Path | None = None, ai_enabled: bool | None = None) -> FastAPI:
    directory = data_dir or Path(os.getenv("MONEY_GRAPH_DATA_DIR", str(DEFAULT_DATA)))
    rebuild_lock = Lock()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.analysis = analyze(Dataset.load(directory))
        app.state.assistant = CodexAssistant(
            enabled=ai_enabled
            if ai_enabled is not None
            else os.getenv("MONEY_GRAPH_AI_ENABLED") == "1"
        )
        yield

    app = FastAPI(
        title="Граф денег API",
        version="0.1.0",
        lifespan=lifespan,
        description="Локальный анализ транзакций. gid/src/dst — строки int64. "
        "Роли и приоритеты — гипотезы для проверки, не вывод о виновности.",
    )
    origins = os.getenv("MONEY_GRAPH_CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins.split(","),
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )

    def current() -> Analysis:
        return app.state.analysis

    def node_in(result: Analysis, gid: int) -> dict:
        node = next((n for n in result.nodes if n["gid"] == gid), None)
        if node is None:
            raise HTTPException(404, "Узел не найден")
        return node

    @app.get("/health", tags=["system"])
    def health():
        return {
            "status": "ok",
            "ai_enabled": app.state.assistant.enabled,
            "dataset_loaded": True,
            "method_version": current().summary["method_version"],
        }

    @app.get("/api/v1/summary", tags=["analytics"])
    def summary():
        return current().summary

    @app.post("/api/v1/analysis/rebuild", tags=["analytics"])
    def rebuild():
        """Re-read the configured local dataset; keep the previous snapshot if validation fails."""
        if not rebuild_lock.acquire(blocking=False):
            raise HTTPException(409, "Пересчёт уже выполняется")
        try:
            result = analyze(Dataset.load(directory))
            app.state.analysis = result
            return result.summary
        except DataError as exc:
            raise HTTPException(422, str(exc)) from exc
        finally:
            rebuild_lock.release()

    @app.get("/api/v1/nodes", response_model=Page[Node], tags=["nodes"])
    def nodes(
        limit: Limit = 50,
        offset: Offset = 0,
        role: Role | None = None,
        cluster_id: int | None = None,
        is_seed: bool | None = None,
        gid: str | None = None,
        min_priority: Annotated[float, Query(ge=0, le=1)] = 0,
    ):
        """Sorted by priority descending, then gid ascending. gid is an exact string search."""
        rows = [
            n
            for n in current().nodes
            if (role is None or n["role"] == role)
            and (cluster_id is None or n["cluster_id"] == cluster_id)
            and (is_seed is None or n["is_seed"] == is_seed)
            and (gid is None or str(n["gid"]) == gid)
            and n["priority_score"] >= min_priority
        ]
        rows.sort(key=lambda n: (-n["priority_score"], n["gid"]))
        return wire(
            dict(total=len(rows), offset=offset, limit=limit, items=rows[offset : offset + limit])
        )

    @app.get("/api/v1/nodes/{gid}", response_model=Node, tags=["nodes"])
    def node(gid: int):
        return wire(node_in(current(), gid))

    @app.get("/api/v1/nodes/{gid}/neighbors", response_model=Page[Edge], tags=["nodes"])
    def neighbors(
        gid: int,
        limit: Limit = 50,
        offset: Offset = 0,
        direction: Literal["in", "out", "both"] = "both",
    ):
        result = current()
        node_in(result, gid)
        pairs = set()
        if direction in {"in", "both"}:
            pairs.update(result.graph.in_edges(gid))
        if direction in {"out", "both"}:
            pairs.update(result.graph.out_edges(gid))
        rows = [dict(src=s, dst=d, **result.graph[s][d]) for s, d in pairs]
        rows.sort(key=lambda e: (-e["sum_kzt"], e["src"], e["dst"]))
        return wire(
            dict(total=len(rows), items=rows[offset : offset + limit], offset=offset, limit=limit)
        )

    @app.get("/api/v1/nodes/{gid}/transactions", response_model=Page[Transaction], tags=["nodes"])
    def transactions(gid: int, limit: Limit = 50, offset: Offset = 0):
        result = current()
        node_in(result, gid)
        tx = result.data.transactions
        rows = tx.loc[(tx.src == gid) | (tx.dst == gid)].copy()
        rows["date"] = rows.date.dt.strftime("%Y-%m-%d")
        return wire(
            dict(
                total=len(rows),
                items=rows.iloc[offset : offset + limit].to_dict("records"),
                offset=offset,
                limit=limit,
            )
        )

    @app.get("/api/v1/clusters", response_model=Page[Cluster], tags=["clusters"])
    def clusters(limit: Limit = 100, offset: Offset = 0):
        rows = current().clusters
        return wire(
            dict(total=len(rows), items=rows[offset : offset + limit], offset=offset, limit=limit)
        )

    @app.get("/api/v1/clusters/{cluster_id}", response_model=Cluster, tags=["clusters"])
    def cluster(cluster_id: int):
        rows = current().clusters
        if not 0 <= cluster_id < len(rows):
            raise HTTPException(404, "Кластер не найден")
        return wire(rows[cluster_id])

    @app.get("/api/v1/top", response_model=TopList, tags=["analytics"])
    def top(limit: Limit = 50):
        result = current()
        return wire(dict(total=len(result.nodes), items=result.top(limit)))

    @app.get("/api/v1/graph", response_model=Graph, tags=["graph"])
    def graph(
        gid: int | None = None,
        hops: Annotated[int, Query(ge=1, le=4)] = 1,
        cluster_id: int | None = None,
        limit: Annotated[int, Query(ge=1, le=5000)] = 1000,
    ):
        """Induced directed graph. Neighborhood uses both directions; edges retain direction."""
        result = current()
        candidates = set(result.graph)
        if gid is not None:
            node_in(result, gid)
            candidates = set(
                nx.single_source_shortest_path_length(
                    result.graph.to_undirected(as_view=True), gid, cutoff=hops
                )
            )
        if cluster_id is not None:
            if not 0 <= cluster_id < len(result.clusters):
                raise HTTPException(404, "Кластер не найден")
            candidates &= {n["gid"] for n in result.nodes if n["cluster_id"] == cluster_id}
        rows = sorted(
            (n for n in result.nodes if n["gid"] in candidates),
            key=lambda n: (n["gid"] != gid, -n["priority_score"], n["gid"]),
        )[:limit]
        ids = {n["gid"] for n in rows}
        edges = [
            dict(src=s, dst=d, **a)
            for s, d, a in result.graph.edges(data=True)
            if s in ids and d in ids
        ]
        return wire(
            dict(
                nodes=rows,
                edges=edges,
                total_nodes=len(candidates),
                truncated=len(candidates) > limit,
                directed=True,
            )
        )

    @app.get("/api/v1/paths", response_model=GraphPath, tags=["graph"])
    def paths(src: int, dst: int, max_hops: Annotated[int, Query(ge=1, le=12)] = 4):
        result = current()
        node_in(result, src)
        node_in(result, dst)
        found = nx.single_source_shortest_path(result.graph, src, cutoff=max_hops).get(dst)
        if found is None:
            raise HTTPException(404, "Направленный путь в пределах max_hops не найден")
        edges = [
            dict(src=s, dst=d, **result.graph[s][d]) for s, d in zip(found, found[1:], strict=False)
        ]
        return wire(
            dict(
                path=found,
                edges=edges,
                hops=len(found) - 1,
                caveat="Структурная связь; путь не доказывает движение одних и тех же денег.",
            )
        )

    @app.get("/api/v1/exports/{filename}", tags=["exports"])
    def download(filename: str):
        if filename not in EXPORTS:
            raise HTTPException(404, "Выгрузка не найдена")
        return Response(
            csv_content(current(), filename),
            media_type="text/csv",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )

    @app.post("/api/v1/assistant/query", response_model=AssistantAnswer, tags=["assistant"])
    async def ask(question: Question):
        try:
            context = context_for(current(), question)
            return await app.state.assistant.answer(question, context)
        except KeyError as exc:
            raise HTTPException(404, "Один из выбранных узлов не найден") from exc
        except AssistantUnavailable as exc:
            raise HTTPException(503, str(exc)) from exc

    return app
