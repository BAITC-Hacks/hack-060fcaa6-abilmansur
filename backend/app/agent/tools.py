"""In-process MCP tools that give the agent a persistent investigation board.

Claude explores data freely (Bash + Python + the ``sql`` tool). These tools are how findings
become durable state: the candidate queue, explored coverage, competing versions, members with
inclusion grounds, links, money trails, objections and evidence packages. Everything that
references source data is verified by the app before it is stored.
"""

import hashlib
import json
import re
from collections.abc import Awaitable, Callable
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from claude_agent_sdk import create_sdk_mcp_server, tool
from mcp.types import ToolAnnotations

import pandas as pd

from app import db, duck, pipeline, verification
from app.agent.state import STAGES, state_brief
from app.config import get_settings

SERVER_NAME = "inv"

ROLES = {
    "source": "sends funds into the structure (origin within available data)",
    "collector": "gathers transfers from many senders",
    "distributor": "receives into one node and fans funds out to many",
    "transit": "forwards comparable amounts soon after receipt, small residual",
    "final_recipient": "last observed receiver of funds within available data",
    "coordinated_account": "acts in synchronised time windows / shares counterparties with the group",
    "organizer": "controls or directs the structure - requires strong, multi-source grounds",
    "unclear": "belongs to the structure but role is not established",
}
PATTERNS = ["collection", "distribution", "transit", "repeated_routes", "coordination", "cycles",
            "structuring", "other"]
ORGANIZER_MIN_EVIDENCE = 3
# SQL results the agent sees are cut to this many characters (rows are dropped from the end): big raw
# listings fill the context without helping; aggregates stay small, and transaction sets for evidence are
# passed by query id (`tx_query_id`) instead of being copied into the call.
SQL_RESULT_MAX_CHARS = 20_000
TX_QUERY_MAX_IDS = 20_000
TOP_REVIEW_N = 20  # graph datasets: finish_run reports top-ranked nodes the run never looked at
# Board roles that must not reach the analyst's report on a graph dataset: the task vocabulary replaces them.
BOARD_TO_TASK_ROLE = {"collector": "consolidator", "final_recipient": "terminal",
                      "coordinated_account": "coordinator", "organizer": "coordinator", "unclear": "peripheral"}
SHORT_ID = re.compile(r"(?<!\d)\d{12}(?!\d)")
BOARD_ROLE_WORD = re.compile(r"\b(" + "|".join(BOARD_TO_TASK_ROLE) + r")\b")
TX_QUERY_HINT = ("tx_query_id: the query_id of a logged `sql` query that selects a `tx_id` column; the app reruns it "
                 "in full (no row limit) and uses every tx_id it returns - no need to copy ids by hand")


@dataclass
class RunContext:
    investigation_id: str
    run_id: str
    run_kind: str
    dataset_path: str
    workspace: Path


def _ok(data: Any) -> dict[str, Any]:
    return {"content": [{"type": "text", "text": json.dumps(data, ensure_ascii=False, default=str)}]}


def _err(message: str, **extra: Any) -> dict[str, Any]:
    body = {"error": message, **extra}
    return {"content": [{"type": "text", "text": json.dumps(body, ensure_ascii=False, default=str)}],
            "is_error": True}


def _schema(props: dict[str, Any], required: list[str]) -> dict[str, Any]:
    return {"type": "object", "properties": props, "required": required, "additionalProperties": False}


STR = {"type": "string"}
NUM = {"type": "number"}
STR_LIST = {"type": "array", "items": {"type": "string"}}


def build_tools(ctx: RunContext) -> list:
    settings = get_settings()
    con = duck.connect(ctx.dataset_path)
    inv = ctx.investigation_id

    def emit(type_: str, payload: dict[str, Any]) -> None:
        db.add_event(ctx.run_id, inv, type_, payload)

    def version_of_inv(version_id: str) -> dict[str, Any] | None:
        return db.fetch_one("SELECT * FROM versions WHERE id = ? AND investigation_id = ?", (version_id, inv))

    def logged_query(query_id: str) -> str | None:
        q = db.fetch_one("SELECT sql FROM queries WHERE id = ? AND investigation_id = ?", (query_id, inv))
        return q["sql"] if q else None

    def resolve_tx_ids(args: dict) -> tuple[list[str], str | None]:
        """tx_ids given inline plus those selected by `tx_query_id` (rerun in full). Returns (ids, error)."""
        ids = list(args.get("tx_ids") or [])
        qid = args.get("tx_query_id")
        if qid:
            sql_text = logged_query(qid)
            if sql_text is None:
                return [], "unknown tx_query_id - run the query with `sql` first and pass the query_id it returns"
            inner = sql_text.strip().rstrip(";")
            try:
                rel = con.sql(f"SELECT DISTINCT CAST(tx_id AS VARCHAR) FROM ({inner}) AS q WHERE tx_id IS NOT NULL")
                rows = rel.limit(TX_QUERY_MAX_IDS + 1).fetchall()
            except Exception as exc:
                return [], f"tx_query_id {qid} must select a `tx_id` column (one row per transaction): {exc}"
            if len(rows) > TX_QUERY_MAX_IDS:
                return [], f"tx_query_id {qid} selects more than {TX_QUERY_MAX_IDS} transactions - narrow it"
            ids += [r[0] for r in rows]
        ids = list(dict.fromkeys(ids))
        if not ids:
            return [], "reference transactions: pass tx_ids and/or tx_query_id"
        return ids, None

    # Crawl-graph datasets carry the scoring pipeline's per-node facts (view `node_roles`).
    has_scores = "node_roles" in duck.extra_views(Path(ctx.dataset_path).resolve().parent)

    def node_row(account: str) -> dict[str, Any] | None:
        if not has_scores:
            return None
        rel = con.execute("SELECT * FROM node_roles WHERE CAST(gid AS VARCHAR) = ?", [str(account)])
        row = rel.fetchone()
        return dict(zip([d[0] for d in rel.description], row)) if row else None

    gids = ({str(r[0]) for r in con.execute("SELECT gid FROM node_roles").fetchall()} if has_scores else set())

    def report_problems(text: str) -> dict[str, Any] | None:
        """Checks on the analyst-facing text of a graph run: full gids (analysts search the graph by them) and
        the task's role vocabulary. Returns what to fix, or None."""
        if not has_scores:
            return None
        short = sorted({m for m in SHORT_ID.findall(text) if f"100000{m}" in gids or any(g.endswith(m) for g in gids)})
        roles = sorted(set(BOARD_ROLE_WORD.findall(text)))
        if not short and not roles:
            return None
        fixes: dict[str, Any] = {}
        if short:
            fixes["shortened_gids"] = {m: next((g for g in gids if g.endswith(m)), None) for m in short}
        if roles:
            fixes["board_roles"] = {r: BOARD_TO_TASK_ROLE[r] for r in roles}
        return fixes

    def guarded(fn: Callable[[dict], Awaitable[dict]]) -> Callable[[dict], Awaitable[dict]]:
        async def wrapper(args: dict) -> dict:
            try:
                return await fn(args)
            except Exception as exc:  # surface to the agent instead of killing the run
                return _err(f"{type(exc).__name__}: {exc}")
        wrapper.__name__ = fn.__name__
        return wrapper

    # ------------------------------------------------------------------ state & process

    @tool("get_state", "Current persistent investigation state: stage, passport, candidate queue, "
          "explored coverage, versions with open objections. Call at the start and whenever unsure.",
          _schema({}, []), annotations=ToolAnnotations(readOnlyHint=True, maxResultSizeChars=200_000))
    @guarded
    async def get_state(args: dict) -> dict:
        return _ok({"brief": state_brief(inv)})

    @tool("set_stage", "Move the investigation stage. Order: " + " -> ".join(STAGES) +
          ". Prerequisites (passport, network-wide coverage, candidates, versions, objections) are advisory: the "
          "move always succeeds and returns what is still missing as warnings - address them when the budget allows.",
          _schema({"stage": {"type": "string", "enum": STAGES}, "note": STR}, ["stage"]))
    @guarded
    async def set_stage(args: dict) -> dict:
        target = args["stage"]
        current = db.fetch_one("SELECT stage, passport FROM investigations WHERE id = ?", (inv,))
        problems = []
        if STAGES.index(target) >= STAGES.index("network_overview") and not current["passport"]:
            problems.append("save_dataset_passport first")
        if STAGES.index(target) >= STAGES.index("candidate_review"):
            methods = db.fetch_all(
                "SELECT DISTINCT method FROM coverage WHERE investigation_id = ? AND scope_kind IN ('network','pattern_scan')",
                (inv,))
            if len(methods) < 2:
                problems.append("record at least 2 network-wide coverage entries (different methods) before drilling down")
            n_cand = db.fetch_one("SELECT count(*) AS n FROM candidates WHERE investigation_id = ?", (inv,))["n"]
            if n_cand < 2:
                problems.append("queue at least 2 candidates from the network overview before deep review")
        if STAGES.index(target) >= STAGES.index("refutation"):
            n_ver = db.fetch_one("SELECT count(*) AS n FROM versions WHERE investigation_id = ?", (inv,))["n"]
            if n_ver == 0:
                problems.append("create at least one version before refutation")
        if target == "done":
            versions = db.fetch_all(
                "SELECT id FROM versions WHERE investigation_id = ? AND status NOT IN ('rejected','revised')", (inv,))
            for v in versions:
                n = db.fetch_one("SELECT count(*) AS n FROM objections WHERE version_id = ?", (v["id"],))["n"]
                if n == 0:
                    problems.append(f"version {v['id']} has no objections considered")
                still_open = db.fetch_one(
                    "SELECT count(*) AS n FROM objections WHERE version_id = ? AND status = 'open'", (v["id"],))["n"]
                if still_open:
                    problems.append(f"version {v['id']} has {still_open} open objections - resolve (refuted/accepted)")
        # Advisory only: the scoring pipeline already produced the result files, so the deeper review
        # stages are a bonus and never block progress.
        db.update("investigations", {"id": inv}, {"stage": target, "updated_at": db.now()})
        emit("stage", {"stage": target, "note": args.get("note", ""), "warnings": problems})
        return _ok({"stage": target, "warnings": problems})

    @tool("save_dataset_passport", "Save the dataset passport (stage data_study): fields and their meaning, "
          "periods, currencies, data quality/completeness, and analytical limitations.",
          _schema({
              "fields": {"type": "array", "items": _schema({"name": STR, "meaning": STR, "quality": STR}, ["name", "meaning"])},
              "period": STR, "currencies": STR_LIST, "entity_types": STR,
              "quality_issues": STR_LIST, "limitations": STR_LIST, "notes": STR,
          }, ["fields", "period", "currencies", "quality_issues", "limitations"]))
    @guarded
    async def save_dataset_passport(args: dict) -> dict:
        db.update("investigations", {"id": inv}, {"passport": args, "updated_at": db.now()})
        emit("passport", args)
        return _ok({"saved": True})

    # ------------------------------------------------------------------ data access

    @tool("sql", "Run ONE read-only DuckDB SELECT over view `tx` (columns: tx_id, ts, sender_id, receiver_id, "
          "amount, currency, sender_type, receiver_type, purpose, channel, source_row, raw_*). A crawl-graph dataset "
          "also has views `nodes` (gid, depth, is_seed), `edges` (src, dst, sum_kzt, n_tx, depth), `node_roles` "
          "(scoring pipeline: gid, role, role_score, cluster_id, priority_score, rank, evidence, features) and "
          "`clusters` (cluster_id, n_nodes, n_seed, sum_kzt_internal, top_gids, hypothesis); gid is BIGINT, "
          "tx.sender_id / receiver_id are its text form. Returns at most "
          f"{settings.sql_max_rows} rows and about {SQL_RESULT_MAX_CHARS // 1000}K characters - aggregate in SQL. The query "
          "is logged: cite its query_id in evidence, and to reference many transactions select a `tx_id` column and "
          "pass the query_id as tx_query_id (the app reruns it in full) instead of copying ids.",
          _schema({"query": STR, "purpose": STR}, ["query", "purpose"]),
          annotations=ToolAnnotations(readOnlyHint=True, maxResultSizeChars=150_000))
    @guarded
    async def sql(args: dict) -> dict:
        try:
            res = duck.run_readonly(con, args["query"], settings.sql_max_rows)
        except Exception as exc:
            return _err(str(exc))
        qid = db.new_id("q")
        db.insert("queries", {"id": qid, "investigation_id": inv, "run_id": ctx.run_id, "purpose": args["purpose"],
                              "sql": args["query"], "row_count": len(res["rows"]), "created_at": db.now()})
        emit("query", {"query_id": qid, "purpose": args["purpose"], "rows": len(res["rows"])})
        rows, shown = res["rows"], len(res["rows"])
        while shown > 1 and len(json.dumps(rows[:shown], ensure_ascii=False, default=str)) > SQL_RESULT_MAX_CHARS:
            shown = max(1, shown * 3 // 4)
        out: dict[str, Any] = {"query_id": qid, "columns": res["columns"], "rows": rows[:shown],
                               "truncated": res["truncated"] or shown < len(rows)}
        if out["truncated"]:
            out["note"] = (f"showing {shown} rows. Aggregate in SQL for overviews; to cite these transactions pass "
                           f"tx_query_id={qid} (it must select tx_id) - the app uses the full result.")
        return _ok(out)

    # ------------------------------------------------------------------ candidates & coverage

    @tool("add_candidate", "Queue a candidate (seed accounts + patterns) found during the network overview "
          "or while reviewing. Queue broadly first; drill down later.",
          _schema({"label": STR, "accounts": STR_LIST,
                   "patterns": {"type": "array", "items": {"type": "string", "enum": PATTERNS}},
                   "discovered_by": STR, "priority": {"type": "number", "minimum": 0, "maximum": 1}, "notes": STR},
                  ["label", "accounts", "patterns", "discovered_by", "priority"]))
    @guarded
    async def add_candidate(args: dict) -> dict:
        cid = db.new_id("cand")
        db.insert("candidates", {"id": cid, "investigation_id": inv, "label": args["label"],
                                 "accounts": args["accounts"], "patterns": args["patterns"],
                                 "discovered_by": args["discovered_by"], "priority": args["priority"],
                                 "notes": args.get("notes"), "created_run": ctx.run_id, "updated_at": db.now()})
        emit("candidate", {"id": cid, "label": args["label"], "status": "queued", "priority": args["priority"],
                           "accounts": args["accounts"][:50], "patterns": args["patterns"]})
        return _ok({"candidate_id": cid})

    @tool("update_candidate", "Change a candidate's status (in_progress, confirmed, dismissed, merged, deferred) "
          "with the reason. Dismissals must state the ordinary explanation found.",
          _schema({"candidate_id": STR,
                   "status": {"type": "string", "enum": ["queued", "in_progress", "confirmed", "dismissed", "merged", "deferred"]},
                   "notes": STR, "priority": NUM, "add_accounts": STR_LIST}, ["candidate_id", "status", "notes"]))
    @guarded
    async def update_candidate(args: dict) -> dict:
        cand = db.fetch_one("SELECT * FROM candidates WHERE id = ? AND investigation_id = ?", (args["candidate_id"], inv))
        if not cand:
            return _err("unknown candidate_id")
        values: dict[str, Any] = {"status": args["status"], "notes": args["notes"], "updated_at": db.now()}
        if "priority" in args:
            values["priority"] = args["priority"]
        if args.get("add_accounts"):
            values["accounts"] = sorted(set(cand["accounts"]) | set(args["add_accounts"]))
        db.update("candidates", {"id": cand["id"]}, values)
        emit("candidate", {"id": cand["id"], "label": cand["label"], "status": args["status"], "notes": args["notes"]})
        return _ok({"updated": True})

    @tool("record_coverage", "Mark a part of the network (or a network-wide scan) as explored, with the method "
          "and result, so later runs don't repeat it and gaps are visible.",
          _schema({"scope_kind": {"type": "string", "enum": ["network", "pattern_scan", "component", "community",
                                                             "account_set", "period"]},
                   "scope": STR, "method": STR, "result": STR, "accounts": STR_LIST},
                  ["scope_kind", "scope", "method", "result"]))
    @guarded
    async def record_coverage(args: dict) -> dict:
        cid = db.new_id("cov")
        db.insert("coverage", {"id": cid, "investigation_id": inv, "scope_kind": args["scope_kind"],
                               "scope": args["scope"], "accounts": args.get("accounts"), "method": args["method"],
                               "result": args["result"], "run_id": ctx.run_id, "created_at": db.now()})
        emit("coverage", {"id": cid, **{k: args[k] for k in ("scope_kind", "scope", "method", "result")}})
        return _ok({"coverage_id": cid})

    # ------------------------------------------------------------------ versions

    @tool("create_version", "Create a version (hypothesis) of the group's structure. Keep competing versions "
          "side by side; to revise, create a new one with parent_id (the parent becomes 'revised').",
          _schema({"title": STR, "summary": STR, "candidate_ids": STR_LIST, "parent_id": STR,
                   "confidence": {"type": "number", "minimum": 0, "maximum": 1}},
                  ["title", "summary", "confidence"]))
    @guarded
    async def create_version(args: dict) -> dict:
        vid = db.new_id("ver")
        parent = args.get("parent_id")
        if parent and not version_of_inv(parent):
            return _err("unknown parent_id")
        db.insert("versions", {"id": vid, "investigation_id": inv, "parent_id": parent, "title": args["title"],
                               "summary": args["summary"], "confidence": args["confidence"],
                               "candidate_ids": args.get("candidate_ids", []), "created_run": ctx.run_id,
                               "created_at": db.now(), "updated_at": db.now()})
        copied = 0
        if parent:
            db.update("versions", {"id": parent}, {"status": "revised", "updated_at": db.now()})
            # Carry members/links forward so the revision starts from the parent and edits it.
            for m in db.fetch_all("SELECT * FROM members WHERE version_id = ?", (parent,)):
                db.insert("members", {**m, "version_id": vid, "updated_at": db.now()})
                copied += 1
            for link in db.fetch_all("SELECT * FROM links WHERE version_id = ? AND status <> 'removed'", (parent,)):
                db.insert("links", {**link, "id": db.new_id("lnk"), "version_id": vid})
        emit("version", {"id": vid, "title": args["title"], "status": "draft", "parent_id": parent,
                         "confidence": args["confidence"]})
        return _ok({"version_id": vid, "members_carried_over": copied})

    @tool("update_version", "Update a version's status (draft, challenged, rejected, final), summary or confidence.",
          _schema({"version_id": STR, "status": {"type": "string", "enum": ["draft", "challenged", "rejected", "final"]},
                   "summary": STR, "confidence": NUM, "reason": STR}, ["version_id"]))
    @guarded
    async def update_version(args: dict) -> dict:
        v = version_of_inv(args["version_id"])
        if not v:
            return _err("unknown version_id")
        values = {k: args[k] for k in ("status", "summary", "confidence") if k in args}
        if values.get("status") == "final":
            n_members = db.fetch_one("SELECT count(*) AS n FROM members WHERE version_id = ? AND status = 'included'",
                                     (v["id"],))["n"]
            open_obj = db.fetch_one("SELECT count(*) AS n FROM objections WHERE version_id = ? AND status = 'open'",
                                    (v["id"],))["n"]
            any_obj = db.fetch_one("SELECT count(*) AS n FROM objections WHERE version_id = ?", (v["id"],))["n"]
            if n_members == 0 or any_obj == 0 or open_obj:
                return _err("a final version needs included members, at least one objection considered, "
                            "and no open objections", members=n_members, objections=any_obj, open=open_obj)
        values["updated_at"] = db.now()
        db.update("versions", {"id": v["id"]}, values)
        emit("version", {"id": v["id"], "title": v["title"], **values, "reason": args.get("reason", "")})
        return _ok({"updated": True})

    # ------------------------------------------------------------------ evidence

    @tool("add_evidence", "Publish an evidence package. Must reference real tx_ids, the analysis period, how it was "
          "obtained (REQUIRED: query_id from `sql` and/or script_path of a script saved in the workspace - inline "
          "`python3 -c` code cannot be cited), observed features, limitations and alternative explanations. "
          "Transactions: " + TX_QUERY_HINT + "; tx_ids lists them explicitly (both may be combined). "
          "Numeric claims in `claimed` must describe exactly these transactions: the app recomputes them and "
          "rejects mismatches. Omit `claimed` fields you did not compute. Never sum across currencies. "
          "A date-only period_end includes that whole day.",
          _schema({
              "title": STR, "claim": STR, "pattern": {"type": "string", "enum": PATTERNS},
              "observed_features": STR_LIST, "tx_ids": STR_LIST, "accounts": STR_LIST,
              "tx_query_id": STR, "period_start": STR, "period_end": STR, "query_id": STR, "script_path": STR,
              "claimed": _schema({"tx_count": {"type": "integer"}, "total_amount": NUM, "currency": STR,
                                  "totals_by_currency": {"type": "object", "additionalProperties": NUM}}, []),
              "limitations": STR, "alternatives": STR, "version_id": STR,
          }, ["title", "claim", "observed_features", "accounts", "period_start", "period_end",
              "limitations", "alternatives"]))
    @guarded
    async def add_evidence(args: dict) -> dict:
        # The query that selects the transactions also documents how they were obtained.
        if args.get("tx_query_id") and not args.get("query_id") and not args.get("script_path"):
            args = {**args, "query_id": args["tx_query_id"]}
        if not args.get("query_id") and not args.get("script_path"):
            return _err("provide query_id and/or script_path so the result is reproducible: run the query that "
                        "selects these transactions with `sql` and pass its query_id, or save your Python code as "
                        "scripts/<name>.py, run it, and pass script_path (inline `python3 -c` cannot be cited)")
        if args.get("version_id") and not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        query_sql = None
        if args.get("query_id"):
            q = db.fetch_one("SELECT sql FROM queries WHERE id = ? AND investigation_id = ?", (args["query_id"], inv))
            if not q:
                return _err("unknown query_id")
            query_sql = q["sql"]
        script_content = script_sha = None
        if args.get("script_path"):
            p = (ctx.workspace / args["script_path"]).resolve()
            if not p.is_relative_to(ctx.workspace.resolve()) or not p.is_file():
                return _err("script_path must be an existing file inside the workspace")
            script_content = p.read_text(errors="replace")
            script_sha = hashlib.sha256(script_content.encode()).hexdigest()
        tx_ids, problem = resolve_tx_ids(args)
        if problem:
            return _err(problem)
        claimed = args.get("claimed") or {}
        result = verification.verify_evidence(con, tx_ids, args["accounts"], args["period_start"],
                                              args["period_end"], claimed)
        if result["status"] == "failed":
            emit("evidence_rejected", {"title": args["title"], "checks": result["checks"]})
            failed = [c for c in result["checks"] if not c["ok"] and c["severity"] == "error"]
            rec = result["recomputed"]
            return _err("verification failed - fix the claim or the referenced transactions and retry",
                        failed_checks=failed,
                        recomputed_from_referenced_tx={"tx_count": rec.get("tx_count"),
                                                       "totals_by_currency": rec.get("totals_by_currency"),
                                                       "period": rec.get("period")})
        eid = db.new_id("ev")
        db.insert("evidence", {
            "id": eid, "investigation_id": inv, "version_id": args.get("version_id"), "run_id": ctx.run_id,
            "title": args["title"], "claim": args["claim"], "pattern": args.get("pattern"),
            "observed_features": args["observed_features"], "tx_ids": tx_ids, "accounts": args["accounts"],
            "period_start": args["period_start"], "period_end": args["period_end"],
            "query_id": args.get("query_id"), "query_sql": query_sql, "script_path": args.get("script_path"),
            "script_content": script_content, "script_sha256": script_sha, "claimed": claimed,
            "verification": result, "limitations": args["limitations"], "alternatives": args["alternatives"],
            "created_at": db.now(),
        })
        emit("evidence", {"id": eid, "title": args["title"], "status": result["status"],
                          "tx_count": result["recomputed"]["tx_count"], "accounts": args["accounts"][:30]})
        return _ok({"evidence_id": eid, "verification": result["status"],
                    "warnings": [c for c in result["checks"] if not c["ok"]]})

    # ------------------------------------------------------------------ members, links, trails

    @tool("node_card", "Computed facts about one node of a crawl-graph dataset: depth, seed flag, whether its outgoing "
          "transfers were observed at all (censored = last crawl hop), incoming / outgoing sums, counts and "
          "counterparties, the share passed on, seeds upstream, the pipeline's role / rank / evidence, the top "
          "senders and receivers, and ready-made sentences (`facts`). Use these numbers and sentences in your "
          "report instead of computing percentages yourself. Call it before assigning a role.",
          _schema({"account_id": STR}, ["account_id"]),
          annotations=ToolAnnotations(readOnlyHint=True))
    @guarded
    async def node_card(args: dict) -> dict:
        if not has_scores:
            return _err("node_card needs a crawl-graph dataset (nodes / edges / transactions)")
        acc = str(args["account_id"]).strip()
        row = node_row(acc)
        if row is None:
            return _err(f"{acc} is not a node of this graph - pass the full gid (all digits)")

        def parties(sql: str) -> list[dict]:
            rel = con.execute(sql, [acc])
            return [dict(zip(["gid", "n_tx", "sum_kzt", "first_date", "last_date"], r)) for r in rel.fetchall()]

        senders = parties("SELECT sender_id, count(*), round(sum(amount), 2), min(ts)::DATE::VARCHAR, "
                          "max(ts)::DATE::VARCHAR FROM tx WHERE receiver_id = ? GROUP BY 1 ORDER BY 3 DESC LIMIT 5")
        receivers = parties("SELECT receiver_id, count(*), round(sum(amount), 2), min(ts)::DATE::VARCHAR, "
                            "max(ts)::DATE::VARCHAR FROM tx WHERE sender_id = ? GROUP BY 1 ORDER BY 3 DESC LIMIT 5")
        money = lambda v: f"{v:,.0f}".replace(",", " ") + " ₸"  # noqa: E731
        censored, seed = bool(row["censored"]), bool(row["is_seed"])
        facts = [
            f"Глубина {row['depth']}{', seed' if seed else ''}. " + (
                "Исходящие не наблюдались: последнее колено обхода, out = 0 ничего не значит." if censored
                else "Исходящие переводы в данных наблюдаются полностью (≥ 5 000 ₸, июль)."),
            f"Получил {money(row['in_sum_kzt'])} в {row['in_tx']} переводах от {row['in_degree']} плательщиков"
            + (" (у seed входящие почти не видны)." if seed else " (видны только переводы от обойдённых узлов)."),
        ]
        if not censored:
            facts.append(f"Отправил {money(row['out_sum_kzt'])} в {row['out_tx']} переводах {row['out_degree']} получателям.")
        if not seed and not censored and row["in_sum_kzt"] > 0:
            ratio = row["out_sum_kzt"] / row["in_sum_kzt"]
            facts.append(f"Отдал дальше {money(row['out_sum_kzt'])} из {money(row['in_sum_kzt'])} видимого входа "
                         f"({ratio:.0%}), осталось {max(0.0, 1 - ratio):.0%}." if ratio <= 1 else
                         f"Отдал в {ratio:.1f} раза больше видимого входа: часть входа вне данных.")
        if row["seeds_upstream"]:
            facts.append(f"Деньги от {row['seeds_upstream']} разных seed (путь ≤ 3 переводов), "
                         f"из них {row['seeds_direct']} напрямую.")
        peer = pipeline.peer_fact(pd.Series(row))
        if peer:
            facts.append(peer[0].upper() + peer[1:] + ".")
        terminal_ok = not censored and row["out_tx"] == 0
        return _ok({"card": {k: row[k] for k in (
            "gid", "depth", "is_seed", "censored", "in_degree", "out_degree", "in_tx", "out_tx", "in_sum_kzt",
            "out_sum_kzt", "retention", "seeds_upstream", "seeds_direct", "fast_out_share", "role", "role_score",
            "cluster_id", "priority_score", "rank", "evidence", "peer_in_degree", "peer_out_degree",
            "peer_volume", "peer_betweenness", "depth_outliers")},
            "can_be_final_recipient": terminal_ok,
            "facts": facts, "top_senders": senders, "top_receivers": receivers})

    @tool("set_member", "Add or update an account in a version with an OBSERVABLE role, the concrete inclusion "
          "basis, the ordinary alternative explanation, and what information is missing. Roles: " +
          "; ".join(f"{k} = {v}" for k, v in ROLES.items()) +
          f". 'organizer' needs >= {ORGANIZER_MIN_EVIDENCE} verified evidence items. Cash-out cannot be "
          "established from transfers alone - use final_recipient.",
          _schema({"version_id": STR, "account_id": STR, "role": {"type": "string", "enum": list(ROLES)},
                   "confidence": {"type": "number", "minimum": 0, "maximum": 1}, "inclusion_basis": STR,
                   "alternative_explanation": STR, "missing_information": STR, "evidence_ids": STR_LIST,
                   "status": {"type": "string", "enum": ["included", "uncertain", "excluded"]}},
                  ["version_id", "account_id", "role", "confidence", "inclusion_basis",
                   "alternative_explanation", "missing_information", "evidence_ids", "status"]))
    @guarded
    async def set_member(args: dict) -> dict:
        if not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        exists = con.execute("SELECT count(*) FROM tx WHERE sender_id = ? OR receiver_id = ?",
                             [args["account_id"], args["account_id"]]).fetchone()[0]
        if not exists:
            return _err(f"account {args['account_id']} does not appear in the dataset")
        card = node_row(args["account_id"])
        if args["role"] == "final_recipient" and card is not None:
            # Checked facts, not judgement: "money stays here" needs observed outgoing data showing none left.
            if card["censored"]:
                return _err("final_recipient refused: the node is on the last crawl hop, its outgoing transfers were "
                            "never observed - use 'unclear' and say the boundary hides where money went",
                            depth=card["depth"])
            if card["out_tx"] > 0:
                return _err("final_recipient refused: the node sends money on in the data "
                            f"({card['out_tx']} transfers, {card['out_sum_kzt']:.0f} KZT to {card['out_degree']} "
                            "receivers) - pick the role that fits (collector / transit / ...) and cite node_card facts",
                            out_tx=card["out_tx"], out_sum_kzt=card["out_sum_kzt"])
        ev = db.fetch_all(
            f"SELECT id, accounts, json_extract(verification, '$.status') AS vstatus FROM evidence "
            f"WHERE investigation_id = ? AND id IN ({','.join('?' * len(args['evidence_ids']))})",
            [inv, *args["evidence_ids"]]) if args["evidence_ids"] else []
        found = {e["id"] for e in ev}
        missing = [e for e in args["evidence_ids"] if e not in found]
        if missing:
            return _err("unknown evidence_ids", missing=missing)
        if args["status"] == "included" and not ev:
            return _err("an included member needs at least one evidence item")
        unrelated = [e["id"] for e in ev if args["account_id"] not in e["accounts"]]
        if args["role"] == "organizer" and len(ev) < ORGANIZER_MIN_EVIDENCE:
            return _err(f"'organizer' requires >= {ORGANIZER_MIN_EVIDENCE} evidence items; "
                        "use an observable role until the grounds are strong")
        db.execute("DELETE FROM members WHERE version_id = ? AND account_id = ?", (args["version_id"], args["account_id"]))
        db.insert("members", {k: args[k] for k in ("version_id", "account_id", "role", "confidence", "inclusion_basis",
                                                   "alternative_explanation", "missing_information", "evidence_ids",
                                                   "status")} | {"updated_at": db.now()})
        emit("member", {k: args[k] for k in ("version_id", "account_id", "role", "confidence", "status")})
        return _ok({"saved": True, "warnings": [f"evidence {e} does not list this account" for e in unrelated]})

    @tool("add_link", "Add a link between two accounts in a version. kind=transfer: the transactions must all be "
          "source->target (stats are recomputed by the app). coordination / shared_counterparty: transactions that "
          "show the relationship. Transactions: " + TX_QUERY_HINT + "; or tx_ids explicitly.",
          _schema({"version_id": STR, "source": STR, "target": STR,
                   "kind": {"type": "string", "enum": ["transfer", "coordination", "shared_counterparty"]},
                   "tx_ids": STR_LIST, "tx_query_id": STR, "rationale": STR},
                  ["version_id", "source", "target", "kind", "rationale"]))
    @guarded
    async def add_link(args: dict) -> dict:
        if not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        tx_ids, problem = resolve_tx_ids(args)
        if problem:
            return _err(problem)
        stats = verification.link_stats(con, args["source"], args["target"], args["kind"], tx_ids)
        if stats["status"] == "failed":
            return _err("link verification failed", verification=stats)
        lid = db.new_id("lnk")
        db.insert("links", {"id": lid, "version_id": args["version_id"], "source": args["source"],
                            "target": args["target"], "kind": args["kind"], "tx_ids": tx_ids,
                            "stats": stats, "rationale": args["rationale"], "created_at": db.now()})
        emit("link", {"id": lid, "version_id": args["version_id"], "source": args["source"], "target": args["target"],
                      "kind": args["kind"], "tx_count": stats["tx_count"], "totals": stats["totals_by_currency"]})
        return _ok({"link_id": lid, "stats": stats})

    @tool("set_link_status", "Mark a link weak or removed (e.g. after the refutation stage) with a reason.",
          _schema({"link_id": STR, "status": {"type": "string", "enum": ["active", "weak", "removed"]}, "reason": STR},
                  ["link_id", "status", "reason"]))
    @guarded
    async def set_link_status(args: dict) -> dict:
        link = db.fetch_one("SELECT l.* FROM links l JOIN versions v ON v.id = l.version_id "
                            "WHERE l.id = ? AND v.investigation_id = ?", (args["link_id"], inv))
        if not link:
            return _err("unknown link_id")
        db.update("links", {"id": link["id"]}, {"status": args["status"],
                                                "rationale": link["rationale"] + f"\n[{args['status']}] {args['reason']}"})
        emit("link", {"id": link["id"], "version_id": link["version_id"], "status": args["status"], "reason": args["reason"]})
        return _ok({"updated": True})

    @tool("add_trail", "Record a money route as ordered steps [{from, to, tx_ids}]. The app checks direction, "
          "continuity and time order, and measures attribution ambiguity at each hop. Routes are published as "
          "POSSIBLE routes - never state that the same money moved.",
          _schema({"version_id": STR, "title": STR, "description": STR,
                   "steps": {"type": "array", "minItems": 2,
                             "items": _schema({"from": STR, "to": STR, "tx_ids": STR_LIST}, ["from", "to", "tx_ids"])}},
                  ["version_id", "title", "steps"]))
    @guarded
    async def add_trail(args: dict) -> dict:
        if not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        result = verification.verify_trail(con, args["steps"])
        if result["status"] == "failed":
            return _err("trail verification failed", verification=result)
        tid = db.new_id("trl")
        db.insert("trails", {"id": tid, "version_id": args["version_id"], "title": args["title"],
                             "steps": args["steps"], "description": args.get("description"),
                             "verification": result, "created_at": db.now()})
        emit("trail", {"id": tid, "version_id": args["version_id"], "title": args["title"],
                       "certainty": result["certainty"]})
        return _ok({"trail_id": tid, "certainty": result["certainty"], "hops": result["hops"],
                    "warnings": [c for c in result["checks"] if not c["ok"]]})

    # ------------------------------------------------------------------ refutation

    @tool("add_objection", "Record an objection / alternative explanation against a version, member, link or trail.",
          _schema({"version_id": STR, "target_kind": {"type": "string", "enum": ["version", "member", "link", "trail"]},
                   "target_ref": STR, "text": STR}, ["version_id", "target_kind", "text"]))
    @guarded
    async def add_objection(args: dict) -> dict:
        if not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        oid = db.new_id("obj")
        db.insert("objections", {"id": oid, "version_id": args["version_id"], "target_kind": args["target_kind"],
                                 "target_ref": args.get("target_ref"), "text": args["text"],
                                 "created_at": db.now(), "updated_at": db.now()})
        emit("objection", {"id": oid, "version_id": args["version_id"], "text": args["text"], "status": "open"})
        return _ok({"objection_id": oid})

    @tool("resolve_objection", "Resolve an objection: 'refuted' (data contradicts the alternative - cite evidence) "
          "or 'accepted' (the alternative holds; then weaken/remove the affected member/link).",
          _schema({"objection_id": STR, "status": {"type": "string", "enum": ["refuted", "accepted"]},
                   "resolution": STR, "evidence_ids": STR_LIST}, ["objection_id", "status", "resolution"]))
    @guarded
    async def resolve_objection(args: dict) -> dict:
        obj = db.fetch_one("SELECT o.* FROM objections o JOIN versions v ON v.id = o.version_id "
                           "WHERE o.id = ? AND v.investigation_id = ?", (args["objection_id"], inv))
        if not obj:
            return _err("unknown objection_id")
        if args["status"] == "refuted" and not args.get("evidence_ids"):
            return _err("refuting an objection requires evidence_ids")
        db.update("objections", {"id": obj["id"]}, {"status": args["status"], "resolution": args["resolution"],
                                                    "evidence_ids": args.get("evidence_ids", []), "updated_at": db.now()})
        emit("objection", {"id": obj["id"], "version_id": obj["version_id"], "status": args["status"],
                           "resolution": args["resolution"]})
        return _ok({"updated": True})

    @tool("add_open_question", "Record an unresolved question for a version (what data would settle it).",
          _schema({"version_id": STR, "text": STR}, ["version_id", "text"]))
    @guarded
    async def add_open_question(args: dict) -> dict:
        if not version_of_inv(args["version_id"]):
            return _err("unknown version_id")
        qid = db.new_id("oq")
        db.insert("open_questions", {"id": qid, "version_id": args["version_id"], "text": args["text"],
                                     "created_at": db.now()})
        emit("open_question", {"id": qid, "version_id": args["version_id"], "text": args["text"]})
        return _ok({"question_id": qid})

    # ------------------------------------------------------------------ answers & finish

    @tool("answer_question", "Answer the user's question (question/challenge runs). Point to the exact "
          "accounts and transactions so the UI can open them and the graph fragment. Transactions: "
          + TX_QUERY_HINT + "; or tx_ids explicitly.",
          _schema({"question": STR, "answer": STR, "accounts": STR_LIST, "tx_ids": STR_LIST, "tx_query_id": STR,
                   "evidence_ids": STR_LIST},
                  ["question", "answer", "accounts"]))
    @guarded
    async def answer_question(args: dict) -> dict:
        problems = report_problems(args["answer"])
        if problems:
            return _err("rewrite the answer: write every account as its full gid and roles in the task vocabulary "
                        "(consolidator, transit, distributor, terminal, coordinator, peripheral)", **problems)
        tx_ids: list[str] = []
        if args.get("tx_ids") or args.get("tx_query_id"):
            tx_ids, problem = resolve_tx_ids(args)
            if problem:
                return _err(problem)
            rows = duck.fetch_transactions(con, tx_ids)
            found = {r["tx_id"] for r in rows}
            missing = [t for t in tx_ids if t not in found]
            if missing:
                return _err("unknown tx_ids", missing=missing[:20])
        aid = db.new_id("ans")
        record = {"question": args["question"], "answer": args["answer"], "accounts": args["accounts"],
                  "tx_ids": tx_ids, "evidence_ids": args.get("evidence_ids", [])}
        db.insert("answers", {"id": aid, "run_id": ctx.run_id, "investigation_id": inv, **record, "created_at": db.now()})
        emit("answer", {"id": aid, "question": args["question"], "answer": args["answer"],
                        "accounts": args["accounts"], "tx_ids": tx_ids[:200]})
        return _ok({"answer_id": aid})

    @tool("finish_run", "Finish this run with a summary (markdown). For investigate runs the app reports gaps "
          "(unreviewed high-priority candidates, stage not done); pass acknowledge_gaps to finish anyway.",
          _schema({"summary": STR, "acknowledge_gaps": STR}, ["summary"]))
    @guarded
    async def finish_run(args: dict) -> dict:
        gaps = []
        if ctx.run_kind == "investigate":
            stage = db.fetch_one("SELECT stage FROM investigations WHERE id = ?", (inv,))["stage"]
            if stage != "done":
                gaps.append(f"stage is '{stage}', not 'done'")
            pending = db.fetch_all("SELECT id, label, priority FROM candidates WHERE investigation_id = ? "
                                   "AND status IN ('queued', 'in_progress') AND priority >= 0.5", (inv,))
            if pending:
                gaps.append(f"{len(pending)} high-priority candidates not reviewed: {[p['label'] for p in pending][:10]}")
            if has_scores:
                top = [r[0] for r in con.execute(
                    f"SELECT CAST(gid AS VARCHAR) FROM node_roles WHERE rank <= {TOP_REVIEW_N} ORDER BY rank").fetchall()]
                seen: set[str] = set()
                for sql_ in ("SELECT accounts FROM candidates WHERE investigation_id = ?",
                             "SELECT accounts FROM coverage WHERE investigation_id = ?",
                             "SELECT accounts FROM evidence WHERE investigation_id = ?",
                             "SELECT accounts FROM answers WHERE investigation_id = ?"):
                    for r in db.fetch_all(sql_, (inv,)):
                        seen.update(str(a) for a in (r["accounts"] or []))
                seen.update(r["account_id"] for r in db.fetch_all(
                    "SELECT m.account_id FROM members m JOIN versions v ON v.id = m.version_id "
                    "WHERE v.investigation_id = ?", (inv,)))
                unreviewed = [g for g in top if g not in seen]
                if unreviewed:
                    gaps.append(f"{len(unreviewed)} of the top-{TOP_REVIEW_N} ranked nodes were never recorded as "
                                f"reviewed (candidate, coverage, member, evidence or answer): {unreviewed}. Review "
                                "them, or say plainly in the summary which ones you did not check")
        problems = report_problems(args["summary"])
        if problems:
            return _err("rewrite the summary: write every account as its full gid and roles in the task vocabulary "
                        "(consolidator, transit, distributor, terminal, coordinator, peripheral)", **problems)
        if gaps and not args.get("acknowledge_gaps"):
            return _err("gaps remain; resolve them or pass acknowledge_gaps explaining why", gaps=gaps)
        db.update("runs", {"id": ctx.run_id}, {"summary": args["summary"]})
        emit("summary", {"summary": args["summary"], "gaps": gaps, "acknowledged": args.get("acknowledge_gaps")})
        return _ok({"finished": True})

    return [get_state, set_stage, save_dataset_passport, sql, node_card, add_candidate, update_candidate, record_coverage,
            create_version, update_version, add_evidence, set_member, add_link, set_link_status, add_trail,
            add_objection, resolve_objection, add_open_question, answer_question, finish_run]


def build_server(ctx: RunContext):
    tools = build_tools(ctx)
    return create_sdk_mcp_server(name=SERVER_NAME, version="1.0.0", tools=tools), [
        f"mcp__{SERVER_NAME}__{t.name}" for t in tools
    ]
