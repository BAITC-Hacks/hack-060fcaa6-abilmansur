"""HTTP API. The agent itself runs in the separate worker process (``python -m app.worker``)."""

import asyncio
import json
import shutil
import tempfile
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Literal

from fastapi import BackgroundTasks, FastAPI, File, Form, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse
import pandas as pd
from pydantic import BaseModel, Field
from sse_starlette.sse import EventSourceResponse

from app import datasets, db, duck, pipeline, titles, verification
from app.api import views
from app.config import get_settings

@asynccontextmanager
async def lifespan(_: FastAPI):
    db.init_db()
    yield


app = FastAPI(title="Financial Investigator API", version="0.1.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.add_middleware(GZipMiddleware, minimum_size=4096)  # the network payload is ~1.8 MB of JSON

TERMINAL = {"completed", "failed", "cancelled", "stopped"}


def _must(row: dict | None, what: str) -> dict:
    if row is None:
        raise HTTPException(404, f"{what} not found")
    return row


def _inv(investigation_id: str) -> dict:
    return _must(db.fetch_one("SELECT * FROM investigations WHERE id = ?", (investigation_id,)), "investigation")


def _version(investigation_id: str, version_id: str) -> dict:
    return _must(db.fetch_one("SELECT * FROM versions WHERE id = ? AND investigation_id = ?",
                              (version_id, investigation_id)), "version")


def _queue_run(investigation_id: str, kind: str, prompt: str, context: dict | None = None) -> dict:
    active = db.fetch_one("SELECT id FROM runs WHERE investigation_id = ? AND status IN ('queued','running','cancelling')",
                          (investigation_id,))
    if active:
        raise HTTPException(409, f"run {active['id']} is still active for this investigation")
    run = {"id": db.new_id("run"), "investigation_id": investigation_id, "kind": kind, "prompt": prompt,
           "context": context or {}, "status": "queued", "created_at": db.now()}
    db.insert("runs", run)
    db.add_event(run["id"], investigation_id, "run_queued", {"kind": kind, "prompt": prompt})
    return run


WORKER_STALE_S = 15


@app.get("/health")
def health() -> dict:
    settings = get_settings()
    beat = settings.worker_heartbeat
    age = time.time() - beat.stat().st_mtime if beat.exists() else None
    return {"ok": True, "model": settings.agent_model,
            "worker_alive": age is not None and age < WORKER_STALE_S,
            "worker_last_seen_s": None if age is None else round(age, 1)}


# ---------------------------------------------------------------- datasets

@app.post("/datasets")
async def upload_dataset(file: UploadFile = File(...), name: str = Form(...),
                         column_map: str | None = Form(None, description="JSON {canonical: source_column}")) -> dict:
    mapping = json.loads(column_map) if column_map else None
    suffix = Path(file.filename or "data.csv").suffix
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = Path(tmp.name)
    try:
        return await asyncio.to_thread(datasets.ingest, tmp_path, name, mapping)
    except ValueError as exc:
        raise HTTPException(422, str(exc)) from exc
    finally:
        tmp_path.unlink(missing_ok=True)


class DatasetFromPath(BaseModel):
    path: str
    name: str | None = None  # default: the folder name (graph) or the file name without extension
    column_map: dict[str, str] | None = None


@app.post("/datasets/graph")
async def upload_graph_dataset(nodes: UploadFile = File(...), edges: UploadFile = File(...),
                               transactions: UploadFile = File(...), name: str = Form(...)) -> dict:
    """A crawl graph as three Parquet files; the scoring pipeline runs right away."""
    tmp_dir = Path(tempfile.mkdtemp())
    try:
        paths = {}
        for key, upload in (("nodes", nodes), ("edges", edges), ("transactions", transactions)):
            paths[key] = tmp_dir / f"{key}.parquet"
            with paths[key].open("wb") as out:
                shutil.copyfileobj(upload.file, out)
        return await asyncio.to_thread(datasets.ingest_graph, paths, name)
    except (ValueError, FileNotFoundError) as exc:
        raise HTTPException(422, str(exc)) from exc
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)


@app.post("/datasets/from-path")
async def dataset_from_path(body: DatasetFromPath) -> dict:
    """Register a large file already on the server (avoids HTTP upload). A folder with nodes / edges /
    transactions parquet is registered as a crawl graph."""
    p = Path(body.path)
    try:
        if p.is_dir():
            files = {k: p / f"{k}.parquet" for k in pipeline.FILES}
            return await asyncio.to_thread(datasets.ingest_graph, files, body.name or p.resolve().name)
        if not p.is_file():
            raise HTTPException(404, "file not found on server")
        return await asyncio.to_thread(datasets.ingest, p, body.name or p.stem, body.column_map)
    except (ValueError, FileNotFoundError) as exc:
        raise HTTPException(422, str(exc)) from exc


@app.get("/datasets")
def list_datasets() -> list[dict]:
    return db.fetch_all("SELECT * FROM datasets ORDER BY created_at DESC")


@app.get("/datasets/{dataset_id}")
def get_dataset(dataset_id: str) -> dict:
    return _must(datasets.get_dataset(dataset_id), "dataset")


@app.get("/datasets/{dataset_id}/outputs")
def list_outputs(dataset_id: str) -> list[dict]:
    """The scoring pipeline's result files (graph datasets only)."""
    out = datasets.output_dir(_must(datasets.get_dataset(dataset_id), "dataset"))
    return [{"name": n, "size": (out / n).stat().st_size} for n in pipeline.OUTPUTS if (out / n).is_file()]


@app.get("/datasets/{dataset_id}/outputs/{name}")
def get_output(dataset_id: str, name: str) -> FileResponse:
    if name not in pipeline.OUTPUTS:
        raise HTTPException(404, "unknown output")
    ds = _must(datasets.get_dataset(dataset_id), "dataset")
    path = datasets.output_dir(ds) / name
    if not path.is_file():
        raise HTTPException(404, "output not computed for this dataset")
    return FileResponse(path, media_type="text/csv", filename=name)


NETWORK_NODE_FIELDS = ["gid", "role", "role_score", "cluster_id", "priority_score", "rank", "evidence", "depth", "is_seed",
                       "censored", "seeds_upstream", "seeds_direct", "in_degree", "out_degree", "in_tx", "out_tx",
                       "in_sum_kzt", "out_sum_kzt", "retention", "fast_out_share", "peer_in_degree", "peer_out_degree",
                       "peer_volume", "peer_betweenness", "depth_outliers"]


@app.get("/datasets/{dataset_id}/network")
def get_network(dataset_id: str) -> dict:
    """The whole crawl graph with the pipeline's result per node, for the network screen. gids are strings:
    18-digit ids do not survive JavaScript numbers."""
    ds = _must(datasets.get_dataset(dataset_id), "dataset")
    out, graph = datasets.output_dir(ds), datasets.graph_dir(ds)
    if not (out / "nodes_roles.csv").is_file():
        raise HTTPException(404, "no pipeline results for this dataset (graph datasets only)")
    con = duck.connect(ds["path"])
    cols = ", ".join(f"CAST(gid AS VARCHAR) AS gid" if c == "gid" else c for c in NETWORK_NODE_FIELDS)
    rel = con.execute(f"SELECT {cols} FROM node_roles ORDER BY rank")
    names = [d[0] for d in rel.description]
    nodes = [dict(zip(names, r)) for r in rel.fetchall()]
    edges = [{"source": s, "target": t, "sum_kzt": v, "n_tx": n} for s, t, v, n in con.execute(
        "SELECT CAST(src AS VARCHAR), CAST(dst AS VARCHAR), sum_kzt, n_tx FROM edges").fetchall()]
    rel = con.execute("SELECT cluster_id, n_nodes, n_seed, sum_kzt_internal, top_gids, hypothesis FROM clusters "
                      "ORDER BY cluster_id")
    clusters = [dict(zip([d[0] for d in rel.description], r)) for r in rel.fetchall()]
    return {"nodes": nodes, "edges": edges, "clusters": clusters}


@app.get("/datasets/{dataset_id}/resilience")
async def get_resilience(dataset_id: str) -> dict:
    """How the network falls apart when the top-priority nodes are removed, against random removal."""
    ds = _must(datasets.get_dataset(dataset_id), "dataset")
    roles = datasets.output_dir(ds) / "nodes_roles.csv"
    if not roles.is_file():
        raise HTTPException(404, "no pipeline results for this dataset (graph datasets only)")
    return await asyncio.to_thread(pipeline.resilience, datasets.graph_dir(ds), pd.read_csv(roles))


@app.post("/datasets/{dataset_id}/pipeline")
async def rerun_pipeline(dataset_id: str) -> dict:
    ds = _must(datasets.get_dataset(dataset_id), "dataset")
    try:
        return await asyncio.to_thread(datasets.rerun_pipeline, ds)
    except ValueError as exc:
        raise HTTPException(422, str(exc)) from exc


# ---------------------------------------------------------------- investigations & runs

class InvestigationCreate(BaseModel):
    dataset_id: str
    title: str
    brief: str = ("Найти организованную группу среди обычных операций, восстановить её финансовую структуру: "
                  "участников, связи, наблюдаемые роли и движение денег, с проверяемыми доказательствами.")
    start: bool = True
    # `title` is temporary: a short title is generated from `brief` in the background (title_status: pending).
    generate_title: bool = False


@app.post("/investigations")
def create_investigation(body: InvestigationCreate, background: BackgroundTasks) -> dict:
    _must(datasets.get_dataset(body.dataset_id), "dataset")
    inv_id = db.new_id("inv")
    workspace = get_settings().runs_dir / inv_id / "workspace"
    (workspace / "scripts").mkdir(parents=True)
    db.insert("investigations", {"id": inv_id, "dataset_id": body.dataset_id, "title": body.title,
                                 "title_status": "pending" if body.generate_title else "final",
                                 "brief": body.brief, "workspace": str(workspace),
                                 "created_at": db.now(), "updated_at": db.now()})
    if body.generate_title:
        background.add_task(titles.title_investigation, inv_id, body.brief)
    run = _queue_run(inv_id, "investigate", body.brief) if body.start else None
    return {"investigation": _inv(inv_id), "run": run}


@app.get("/investigations")
def list_investigations() -> list[dict]:
    return db.fetch_all("SELECT * FROM investigations ORDER BY created_at DESC")


@app.get("/investigations/{investigation_id}")
def get_investigation(investigation_id: str) -> dict:
    inv = _inv(investigation_id)
    counts = {t: db.fetch_one(f"SELECT count(*) AS n FROM {t} WHERE investigation_id = ?", (investigation_id,))["n"]
              for t in ("candidates", "coverage", "versions", "evidence", "runs", "answers")}
    return {**inv, "counts": counts}


class InvestigationUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=200)


@app.patch("/investigations/{investigation_id}")
def update_investigation(investigation_id: str, body: InvestigationUpdate) -> dict:
    """Rename; a title set by hand is final (a pending generated title no longer overwrites it)."""
    _inv(investigation_id)
    db.update("investigations", {"id": investigation_id},
              {"title": body.title.strip(), "title_status": "final", "updated_at": db.now()})
    return _inv(investigation_id)


@app.get("/investigations/{investigation_id}/board")
def get_board(investigation_id: str) -> dict:
    _inv(investigation_id)
    return views.board(investigation_id)


class RunCreate(BaseModel):
    kind: Literal["investigate", "message", "question", "challenge"] = "investigate"
    prompt: str
    context: dict[str, Any] = Field(default_factory=dict)


@app.post("/investigations/{investigation_id}/runs")
def create_run(investigation_id: str, body: RunCreate) -> dict:
    _inv(investigation_id)
    return _queue_run(investigation_id, body.kind, body.prompt, body.context)


ASK_TEMPLATES = {
    "why": "Почему счёт {account} включён в версию? Какие конкретные транзакции и признаки это обосновывают?",
    "connections": "Что связывает счёт {account} с остальными участниками? Покажи конкретные переводы и участок графа.",
    "challenge": "Проверь альтернативное (обычное) объяснение для счёта {account}.",
}


class AskBody(BaseModel):
    mode: Literal["why", "connections", "challenge", "free"] = "free"
    question: str | None = None
    account_id: str | None = None
    version_id: str | None = None
    tx_ids: list[str] = Field(default_factory=list)


@app.post("/investigations/{investigation_id}/ask")
def ask(investigation_id: str, body: AskBody) -> dict:
    _inv(investigation_id)
    if body.version_id:
        _version(investigation_id, body.version_id)
    question = body.question
    if not question:
        if body.mode == "free" or not body.account_id:
            raise HTTPException(422, "question is required (or mode + account_id)")
        question = ASK_TEMPLATES[body.mode].format(account=body.account_id)
    kind = "challenge" if body.mode == "challenge" else "question"
    context = {"account_id": body.account_id, "version_id": body.version_id, "tx_ids": body.tx_ids}
    return _queue_run(investigation_id, kind, question, context)


@app.get("/investigations/{investigation_id}/runs")
def list_runs(investigation_id: str) -> list[dict]:
    return db.fetch_all("SELECT * FROM runs WHERE investigation_id = ? ORDER BY created_at DESC", (investigation_id,))


@app.get("/runs/active")
def active_runs() -> list[dict]:
    return db.fetch_all(
        "SELECT r.*, i.title AS investigation_title FROM runs r JOIN investigations i ON i.id = r.investigation_id "
        "WHERE r.status IN ('queued', 'running', 'cancelling') ORDER BY r.created_at")


@app.get("/runs/{run_id}")
def get_run(run_id: str) -> dict:
    return _must(db.fetch_one("SELECT * FROM runs WHERE id = ?", (run_id,)), "run")


@app.post("/runs/{run_id}/cancel")
def cancel_run(run_id: str) -> dict:
    run = get_run(run_id)
    if run["status"] == "queued":
        db.update("runs", {"id": run_id}, {"status": "cancelled", "finished_at": db.now()})
        db.add_event(run_id, run["investigation_id"], "run_finished", {"status": "cancelled"})
    elif run["status"] == "running":
        db.update("runs", {"id": run_id}, {"status": "cancelling"})
    return get_run(run_id)


# ---------------------------------------------------------------- progress (SSE)

async def _event_stream(request: Request, where: str, key: str, after: int, until_run_done: str | None):
    last = after
    while True:
        if await request.is_disconnected():
            return
        rows = db.fetch_all(f"SELECT * FROM events WHERE {where} = ? AND id > ? ORDER BY id LIMIT 500", (key, last))
        for r in rows:
            last = r["id"]
            yield {"id": str(r["id"]), "event": r["type"],
                   "data": db.dumps({"run_id": r["run_id"], "ts": r["ts"], **r["payload"]})}
        if until_run_done and not rows:
            run = db.fetch_one("SELECT status FROM runs WHERE id = ?", (until_run_done,))
            if run is None or run["status"] in TERMINAL:
                return
        if not rows:
            await asyncio.sleep(0.5)


def _last_id(request: Request, after: int) -> int:
    header = request.headers.get("last-event-id")
    return int(header) if header and header.isdigit() else after


@app.get("/runs/{run_id}/events")
async def run_events(run_id: str, request: Request, after: int = 0):
    get_run(run_id)
    return EventSourceResponse(_event_stream(request, "run_id", run_id, _last_id(request, after), run_id), ping=15)


@app.get("/investigations/{investigation_id}/events")
async def investigation_events(investigation_id: str, request: Request, after: int = 0):
    _inv(investigation_id)
    return EventSourceResponse(
        _event_stream(request, "investigation_id", investigation_id, _last_id(request, after), None), ping=15)


@app.get("/runs/{run_id}/events/history")
def run_events_history(run_id: str, after: int = 0, limit: int = Query(1000, le=5000)) -> list[dict]:
    return db.fetch_all("SELECT * FROM events WHERE run_id = ? AND id > ? ORDER BY id LIMIT ?", (run_id, after, limit))


# ---------------------------------------------------------------- versions, graph, replay

@app.get("/investigations/{investigation_id}/versions/{version_id}")
def get_version(investigation_id: str, version_id: str) -> dict:
    _version(investigation_id, version_id)
    return views.version_full(version_id)


@app.get("/investigations/{investigation_id}/versions/{version_id}/graph")
def get_version_graph(investigation_id: str, version_id: str, context: int = Query(0, ge=0, le=20)) -> dict:
    _version(investigation_id, version_id)
    return views.version_graph(investigation_id, version_id, context)


@app.get("/investigations/{investigation_id}/versions/{version_id}/timeline")
def get_version_timeline(investigation_id: str, version_id: str,
                         bucket: Literal["hour", "day", "week"] = "day") -> dict:
    _version(investigation_id, version_id)
    return views.version_timeline(investigation_id, version_id, bucket)


# ---------------------------------------------------------------- evidence, accounts, transactions

@app.get("/investigations/{investigation_id}/evidence")
def list_evidence(investigation_id: str, version_id: str | None = None) -> list[dict]:
    if version_id:
        return db.fetch_all("SELECT * FROM evidence WHERE investigation_id = ? AND version_id = ? ORDER BY created_at",
                            (investigation_id, version_id))
    return db.fetch_all("SELECT * FROM evidence WHERE investigation_id = ? ORDER BY created_at", (investigation_id,))


@app.get("/investigations/{investigation_id}/evidence/{evidence_id}")
def get_evidence(investigation_id: str, evidence_id: str) -> dict:
    ev = _must(db.fetch_one("SELECT * FROM evidence WHERE id = ? AND investigation_id = ?",
                            (evidence_id, investigation_id)), "evidence")
    ev["transactions"] = duck.fetch_transactions(views.dataset_con(investigation_id), ev["tx_ids"])
    return ev


@app.post("/investigations/{investigation_id}/evidence/{evidence_id}/reverify")
def reverify_evidence(investigation_id: str, evidence_id: str) -> dict:
    ev = _must(db.fetch_one("SELECT * FROM evidence WHERE id = ? AND investigation_id = ?",
                            (evidence_id, investigation_id)), "evidence")
    result = verification.verify_evidence(views.dataset_con(investigation_id), ev["tx_ids"], ev["accounts"],
                                          ev["period_start"], ev["period_end"], ev["claimed"])
    db.update("evidence", {"id": evidence_id}, {"verification": result})
    return result


@app.get("/investigations/{investigation_id}/accounts/{account_id}")
def get_account(investigation_id: str, account_id: str) -> dict:
    _inv(investigation_id)
    return views.account_card(investigation_id, account_id)


class TxLookup(BaseModel):
    tx_ids: list[str] = Field(max_length=5000)


@app.post("/investigations/{investigation_id}/transactions")
def lookup_transactions(investigation_id: str, body: TxLookup) -> list[dict]:
    _inv(investigation_id)
    return duck.fetch_transactions(views.dataset_con(investigation_id), body.tx_ids)


@app.get("/investigations/{investigation_id}/answers")
def list_answers(investigation_id: str) -> list[dict]:
    return db.fetch_all("SELECT * FROM answers WHERE investigation_id = ? ORDER BY created_at DESC", (investigation_id,))


# ---------------------------------------------------------------- workspace (agent's code & notes)

@app.get("/investigations/{investigation_id}/workspace")
def list_workspace(investigation_id: str) -> list[dict]:
    root = Path(_inv(investigation_id)["workspace"])
    return [{"path": str(p.relative_to(root)), "size": p.stat().st_size}
            for p in sorted(root.rglob("*")) if p.is_file() and ".claude" not in p.parts]


@app.get("/investigations/{investigation_id}/workspace/file")
def read_workspace_file(investigation_id: str, path: str) -> dict:
    root = Path(_inv(investigation_id)["workspace"]).resolve()
    p = (root / path).resolve()
    if not p.is_relative_to(root) or not p.is_file():
        raise HTTPException(404, "file not found")
    return {"path": path, "content": p.read_text(errors="replace")}
