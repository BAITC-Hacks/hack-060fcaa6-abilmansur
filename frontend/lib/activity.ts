/** Turns the raw investigation event log into a per-run activity timeline:
 *  user message → intent → progress notes, each with the tool steps under it → final summary. */

import type { InvestigationEvent, Stage } from "./api";
import { CANDIDATE_STATUS, ROLES, STAGES } from "./format";

export type StepStatus = "running" | "completed" | "failed";
export type StepKind =
  | "search" | "read" | "query" | "command" | "edit" | "test" | "subagent" | "plan"
  | "state" | "stage" | "board" | "graph" | "evidence" | "objection" | "answer" | "finish";

export interface Step {
  key: string;
  tool: string;
  input: Record<string, unknown> | string | null;
  output?: string;
  status: StepStatus;
  /** Still running when its run ended. */
  interrupted?: boolean;
  startedAt: string;
  finishedAt?: string;
  /** Board events produced by this step (member added, evidence verified…). */
  outcomes: InvestigationEvent[];
  /** Built from a board event with no matching tool call (older runs, demo data). */
  synthetic?: boolean;
}

export interface Segment {
  key: string;
  /** The agent's short progress note that opens this group of steps. */
  note?: InvestigationEvent;
  steps: Step[];
}

export interface RunTimeline {
  runId: string;
  kind: string;
  prompt: string;
  stage?: Stage;
  queuedAt?: string;
  started?: InvestigationEvent;
  segments: Segment[];
  answers: InvestigationEvent[];
  summary?: InvestigationEvent;
  finished?: InvestigationEvent;
  /** Board events of this run, for the final "found / changed" counts. */
  changes: InvestigationEvent[];
}

const BOARD = new Set([
  "stage", "passport", "candidate", "coverage", "version", "member", "link", "trail", "evidence", "evidence_rejected",
  "objection", "open_question", "query",
]);

/** Which MCP tools emit a given board event (used to attach the event to its step). */
const PRODUCER: Record<string, string[]> = {
  stage: ["set_stage"], passport: ["save_dataset_passport"], candidate: ["add_candidate", "update_candidate"],
  coverage: ["record_coverage"], version: ["create_version", "update_version"], member: ["set_member"],
  link: ["add_link", "set_link_status"], trail: ["add_trail"], evidence: ["add_evidence"],
  evidence_rejected: ["add_evidence"], objection: ["add_objection", "resolve_objection"],
  open_question: ["add_open_question"], query: ["sql"], answer: ["answer_question"], summary: ["finish_run"],
};

export const shortTool = (name: string) => name.replace(/^mcp__inv__/, "");

export function buildTimelines(events: InvestigationEvent[]): RunTimeline[] {
  const runs = new Map<string, RunTimeline>();
  const steps = new Map<string, Step>();

  const runOf = (e: InvestigationEvent) => {
    let run = runs.get(e.run_id);
    if (!run) {
      run = { runId: e.run_id, kind: "investigate", prompt: "", segments: [], answers: [], changes: [] };
      runs.set(e.run_id, run);
    }
    return run;
  };
  const segmentOf = (run: RunTimeline) => {
    if (!run.segments.length) run.segments.push({ key: `${run.runId}-intro`, steps: [] });
    return run.segments[run.segments.length - 1];
  };
  const runningStep = (run: RunTimeline, tools: string[]) => {
    for (const seg of run.segments)
      for (const s of seg.steps) if (s.status === "running" && tools.includes(shortTool(s.tool))) return s;
    return undefined;
  };

  for (const e of events) {
    const run = runOf(e);
    switch (e.type) {
      case "run_queued":
        run.kind = String(e.kind ?? run.kind);
        run.prompt = String(e.prompt ?? run.prompt);
        run.queuedAt = e.ts;
        break;
      case "run_started":
        run.started = e;
        run.kind = String(e.kind ?? run.kind);
        run.prompt = String(e.prompt ?? run.prompt);
        run.stage = e.stage as Stage | undefined;
        break;
      case "agent_text":
        run.segments.push({ key: `n${e.id}`, note: e, steps: [] });
        break;
      case "tool_call": {
        const input = e.input as Step["input"];
        const step: Step = {
          key: `t${e.id}`, tool: String(e.name), input: parseInput(input), status: "running", startedAt: e.ts, outcomes: [],
        };
        segmentOf(run).steps.push(step);
        steps.set(String(e.ref), step);
        break;
      }
      case "tool_result": {
        const step = steps.get(String(e.tool_use_id));
        if (step) {
          step.status = e.is_error ? "failed" : "completed";
          step.output = e.preview == null ? undefined : String(e.preview);
          step.finishedAt = e.ts;
        }
        break;
      }
      case "answer":
        run.answers.push(e);
        runningStep(run, PRODUCER.answer)?.outcomes.push(e);
        break;
      case "summary":
        run.summary = e;
        break;
      case "run_finished":
        run.finished = e;
        for (const seg of run.segments)
          for (const s of seg.steps)
            if (s.status === "running") Object.assign(s, { status: "failed", interrupted: true, finishedAt: e.ts });
        break;
      default:
        if (!BOARD.has(e.type)) break;
        if (e.type !== "query") run.changes.push(e);
        {
          const owner = runningStep(run, PRODUCER[e.type] ?? []);
          if (owner) owner.outcomes.push(e);
          else if (e.type !== "query")
            segmentOf(run).steps.push({
              key: `b${e.id}`, tool: `mcp__inv__${syntheticTool(e)}`, input: null,
              status: e.type === "evidence_rejected" ? "failed" : "completed", startedAt: e.ts, finishedAt: e.ts,
              outcomes: [e], synthetic: true,
            });
        }
    }
  }
  return [...runs.values()].filter((r) => r.prompt || r.started || r.segments.length);
}

function syntheticTool(e: InvestigationEvent) {
  if (e.type === "candidate" && e.status !== "queued") return "update_candidate";
  if (e.type === "objection" && e.status && e.status !== "open") return "resolve_objection";
  return (PRODUCER[e.type] ?? [e.type])[0];
}

function parseInput(input: unknown): Step["input"] {
  if (input == null) return null;
  if (typeof input === "object") return input as Record<string, unknown>;
  // Older runs stored a JSON preview string (possibly clipped).
  try {
    return JSON.parse(String(input));
  } catch {
    return String(input);
  }
}

// ---------------------------------------------------------------- human descriptions

const field = (step: Step, key: string): string | undefined => {
  if (step.input && typeof step.input === "object" && step.input[key] != null) return String(step.input[key]);
  // Steps rebuilt from board events have no input: the event carries the same fields.
  const fromEvent = step.outcomes[0]?.[key];
  if (fromEvent != null && typeof step.input !== "string") return String(fromEvent);
  if (typeof step.input === "string") {
    // Clipped JSON: pull the field out with a regex.
    const m = step.input.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)`));
    return m?.[1];
  }
  return undefined;
};

const base = (p?: string) => (p ? p.split("/").filter(Boolean).pop() ?? p : "файл");
const clip = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** Toolkit calls → what they mean for the user. First match wins. */
const TOOLKIT: [RegExp, string, StepKind][] = [
  [/pytest|unittest/, "Запускаю тесты", "test"],
  [/account_features|with_percentiles/, "Считаю признаки по всем счетам", "query"],
  [/pattern_flags/, "Отмечаю аномальные паттерны", "query"],
  [/communit/, "Ищу сообщества в графе переводов", "graph"],
  [/cycles/, "Ищу замкнутые циклы переводов", "graph"],
  [/forward_chains/, "Прослеживаю цепочки переводов", "graph"],
  [/repeated_routes/, "Ищу повторяющиеся маршруты", "graph"],
  [/synchrony/, "Проверяю синхронность счетов", "graph"],
  [/balance_walk/, "Прослеживаю остатки на счетах", "graph"],
  [/full_agg_graph|agg_graph|tx_graph|ego\(|components_summary|networkx|nx\./, "Строю граф связей между счетами", "graph"],
  [/tk\.q\(|duckdb|read_parquet/, "Считаю по транзакциям", "query"],
  [/^\s*(ls|find|tree)\b/, "Смотрю файлы в рабочей папке", "search"],
  [/^\s*(cat|head|tail|less|wc)\b/, "Читаю файл", "read"],
  [/^\s*(grep|rg)\b/, "Ищу по коду", "search"],
  [/python/, "Запускаю анализ на Python", "command"],
];

export function describeStep(step: Step): { label: string; kind: StepKind; target?: string } {
  const tool = shortTool(step.tool);
  switch (tool) {
    case "Bash": {
      const cmd = field(step, "command") ?? "";
      const hit = TOOLKIT.find(([re]) => re.test(cmd));
      const described = field(step, "description");
      return { label: hit?.[1] ?? described ?? "Выполняю команду", kind: hit?.[2] ?? "command", target: cmd };
    }
    case "Read": return { label: `Читаю ${base(field(step, "file_path"))}`, kind: "read", target: field(step, "file_path") };
    case "Write": return { label: `Создаю ${base(field(step, "file_path"))}`, kind: "edit", target: field(step, "file_path") };
    case "Edit":
    case "MultiEdit":
      return { label: `Правлю ${base(field(step, "file_path"))}`, kind: "edit", target: field(step, "file_path") };
    case "Glob": return { label: "Ищу файлы", kind: "search", target: field(step, "pattern") };
    case "Grep": return { label: `Ищу «${clip(field(step, "pattern") ?? "", 30)}» в коде`, kind: "search", target: field(step, "path") };
    case "TodoWrite": return { label: "Обновляю план работы", kind: "plan" };
    case "Task":
    case "Agent":
      return { label: `Запускаю субагента: ${clip(field(step, "description") ?? "подзадача", 40)}`, kind: "subagent" };
    case "sql": return { label: `Запрос к данным: ${clip(field(step, "purpose") ?? "SQL", 48)}`, kind: "query", target: field(step, "query") };
    case "get_state": return { label: "Читаю состояние расследования", kind: "state" };
    case "node_card": return { label: `Смотрю карточку узла ${field(step, "account_id") ?? ""}`.trim(), kind: "query" };
    case "set_stage": {
      const s = STAGES.find((x) => x.key === field(step, "stage"));
      return { label: `Перехожу к этапу «${s?.label ?? field(step, "stage") ?? "…"}»`, kind: "stage" };
    }
    case "save_dataset_passport": return { label: "Сохраняю паспорт датасета", kind: "board" };
    case "add_candidate": return { label: `Ставлю в очередь кандидата «${clip(field(step, "label") ?? "", 40)}»`, kind: "board" };
    case "update_candidate": return { label: "Проверяю кандидата", kind: "board" };
    case "record_coverage": return { label: "Отмечаю исследованную часть сети", kind: "board" };
    case "create_version": return { label: `Создаю версию «${clip(field(step, "title") ?? "", 40)}»`, kind: "graph" };
    case "update_version": return { label: "Обновляю версию структуры", kind: "graph" };
    case "set_member": return { label: `Добавляю ${field(step, "account_id") ?? "счёт"} в структуру`, kind: "graph" };
    case "add_link": return { label: "Добавляю связь между счетами", kind: "graph" };
    case "set_link_status": return { label: "Ослабляю связь", kind: "graph" };
    case "add_trail": return { label: "Записываю маршрут денег", kind: "graph" };
    case "add_evidence": return { label: `Публикую доказательство «${clip(field(step, "title") ?? "", 36)}»`, kind: "evidence" };
    case "add_objection": return { label: "Проверяю альтернативное объяснение", kind: "objection" };
    case "resolve_objection": return { label: "Закрываю возражение", kind: "objection" };
    case "add_open_question": return { label: "Записываю открытый вопрос", kind: "objection" };
    case "answer_question": return { label: "Формирую ответ", kind: "answer" };
    case "finish_run": return { label: "Подвожу итог", kind: "finish" };
    default: return { label: tool, kind: "command" };
  }
}

/** One-line result of a board event, shown under its step. */
export function describeOutcome(e: InvestigationEvent): string {
  switch (e.type) {
    case "stage": return `Этап «${STAGES.find((x) => x.key === e.stage)?.label ?? e.stage}»${e.note ? ` — ${e.note}` : ""}`;
    case "passport": return "Паспорт датасета сохранён";
    case "candidate": return `«${e.label}» · ${CANDIDATE_STATUS[String(e.status)]?.label ?? e.status}`;
    case "coverage": return `${e.scope} — ${e.result}`;
    case "version": return `Версия «${e.title}»${e.status ? ` · ${e.status}` : ""}`;
    case "member": return `${e.account_id} → ${ROLES[String(e.role) as keyof typeof ROLES]?.label ?? e.role}`;
    case "link": return `${e.source ?? ""} → ${e.target ?? ""}${e.status ? ` · ${e.status}` : ""}`;
    case "trail": return `Маршрут «${e.title}»`;
    case "evidence": return `${e.tx_count} перев. · проверено приложением`;
    case "evidence_rejected": return `Проверка отклонила «${e.title}» — агент исправляет`;
    case "objection": return String(e.text ?? e.resolution ?? "");
    case "open_question": return String(e.text ?? "");
    case "query": return `${e.rows} строк · ${e.query_id}`;
    case "answer": return "Ответ готов";
    default: return e.type;
  }
}

/** What the agent is about to do, shown right after the user's message (before the model's first note). */
export function intentOf(run: RunTimeline): string {
  if (run.kind === "question") return "Разберу вопрос по доске и данным и отвечу с конкретными транзакциями.";
  if (run.kind === "challenge") return "Проверю альтернативное объяснение на данных и обновлю версию, если оно подтвердится.";
  const stage = STAGES.find((s) => s.key === run.stage);
  if (!stage || stage.key === "data_study")
    return "Сначала изучу данные и всю сеть, затем проверю кандидатов, восстановлю структуру группы и попробую её опровергнуть.";
  if (stage.key === "done") return "Перепроверю итоговую версию на данных и обновлю доску, если что-то изменится.";
  return `Продолжу с этапа «${stage.label}»: ${stage.hint.toLowerCase()}.`;
}

/** Totals for the final summary card. */
export function runTotals(run: RunTimeline) {
  const uniq = (type: string, key: string) => new Set(run.changes.filter((e) => e.type === type).map((e) => String(e[key]))).size;
  const steps = run.segments.flatMap((s) => s.steps);
  return {
    members: uniq("member", "account_id"),
    evidence: run.changes.filter((e) => e.type === "evidence").length,
    rejected: run.changes.filter((e) => e.type === "evidence_rejected").length,
    versions: uniq("version", "title"),
    candidates: uniq("candidate", "label"),
    objections: run.changes.filter((e) => e.type === "objection").length,
    trails: run.changes.filter((e) => e.type === "trail").length,
    actions: steps.length,
    failed: steps.filter((s) => s.status === "failed").length,
  };
}
