/** Backend investigation events → AG-UI stream events, the protocol the chat store consumes.
 *
 *  One run becomes one assistant turn. The chat renders text segments as messages and runs of tool calls as
 *  a collapsible "Working" tray, so:
 *  - what the agent says (its notes, answers, the finish_run summary, the SDK's final result) → text segments,
 *    outside the tray;
 *  - its tool calls and results, and the app's own progress lines (the plan at run start) → tool calls inside
 *    the tray (with `_title` = human label);
 *  - a new version / evidence → a synthetic tool call matched by an artifact renderer
 *    (preview card in the chat, full view in the side panel, listed in the workspace and artifact browser). */

import { EventType, type AGUIEvent } from "@inv/headless";

import { describeStep, shortTool, type Step, type StepKind } from "@/lib/activity";
import type { InvestigationEvent, Stage } from "@/lib/api";
import { STAGES } from "@/lib/format";

export const VERSION_TOOL = "investigation_version";
export const EVIDENCE_TOOL = "evidence_packet";

export interface VersionArtifactContent {
  investigationId: string;
  versionId: string;
  title: string;
  status?: string;
}

export interface EvidenceArtifactContent {
  investigationId: string;
  evidenceId: string;
  title: string;
  status?: string;
  txCount?: number;
}

const FINISH: Record<string, string> = {
  stopped: "Остановлено по лимиту — доска сохранена.",
  failed: "Запуск завершился с ошибкой.",
  cancelled: "Остановлено пользователем.",
};

/** One line the tray shows while the agent works (`_phase`), by the kind of the current step. */
const PHASE: Record<StepKind, string> = {
  plan: "Думаю…",
  state: "Изучаю состояние расследования…",
  search: "Изучаю данные…",
  read: "Изучаю данные…",
  query: "Анализирую структуру сети…",
  command: "Считаю метрики на данных…",
  edit: "Записываю расчёт…",
  test: "Проверяю расчёт…",
  subagent: "Распределяю подзадачи…",
  stage: "Перехожу к следующему этапу…",
  board: "Проверяю кандидатов…",
  graph: "Восстанавливаю структуру группы…",
  evidence: "Сверяю выводы с транзакциями…",
  objection: "Проверяю обычные объяснения…",
  answer: "Формулирую ответ…",
  finish: "Подвожу итог…",
};

export class RunConverter {
  private seen = new Set<string>();
  /** What the agent said last, so the SDK's final result is not repeated when it is the same text. */
  private lastText = "";
  private summarized = false;
  private open = new Set<string>();
  private n = 0;

  constructor(
    private investigationId: string,
    private runId: string,
  ) {}

  push(e: InvestigationEvent): AGUIEvent[] {
    switch (e.type) {
      case "run_started": {
        // The app's plan for the run is process, not the agent's answer: a step inside the tray.
        const plan = intent(String(e.kind ?? "investigate"), e.stage as Stage | undefined);
        if (!plan) return [];
        const id = `plan-${this.runId}`;
        return [...this.toolCall(id, "План", { _title: plan, _phase: PHASE.plan }), this.result(id, plan, false)];
      }
      case "agent_text":
        return this.said(String(e.text ?? ""));
      case "result": {
        const text = String(e.text ?? "").trim();
        if (this.summarized || !text || text === this.lastText.trim()) return [];
        return this.said(text);
      }
      case "tool_call": {
        const id = String(e.ref);
        const input = normalizeInput(e.input);
        const step = { tool: String(e.name), input, outcomes: [] } as unknown as Step;
        this.open.add(id);
        const described = describeStep(step);
        return this.toolCall(id, shortTool(String(e.name)), {
          _title: described.label,
          _phase: PHASE[described.kind] ?? "Работаю…",
          ...(typeof input === "object" && input ? input : { input }),
        });
      }
      case "tool_result": {
        const id = String(e.tool_use_id);
        if (!this.open.delete(id)) return [];
        const content = e.preview == null || String(e.preview).trim() === "" ? "Готово" : String(e.preview);
        return [this.result(id, content, Boolean(e.is_error))];
      }
      case "version": {
        const content: VersionArtifactContent = {
          investigationId: this.investigationId, versionId: String(e.ref), title: String(e.title ?? "Версия"), status: e.status as string,
        };
        return this.artifact(`ver:${content.versionId}`, VERSION_TOOL, `Версия «${content.title}»`, content);
      }
      case "evidence": {
        const content: EvidenceArtifactContent = {
          investigationId: this.investigationId, evidenceId: String(e.ref), title: String(e.title ?? "Доказательство"),
          status: e.status as string, txCount: e.tx_count as number,
        };
        return this.artifact(`ev:${content.evidenceId}`, EVIDENCE_TOOL, `Доказательство «${content.title}»`, content);
      }
      case "answer":
        return this.said(String(e.answer ?? ""));
      case "summary": {
        const gaps = (e.gaps as string[] | undefined) ?? [];
        const text = [String(e.summary ?? ""), gaps.length ? `**Осталось незакрытым**\n${gaps.map((g) => `- ${g}`).join("\n")}` : ""]
          .filter(Boolean)
          .join("\n\n");
        this.summarized = true;
        return this.said(text);
      }
      case "run_finished": {
        // Close steps the run never answered, so they don't spin forever.
        const dangling = [...this.open].map((id) => this.result(id, "Прервано: запуск завершился раньше", true));
        this.open.clear();
        const status = String(e.status ?? "completed");
        const note = FINISH[status];
        return note ? [...dangling, ...this.text(e.error ? `${note}\n\n${String(e.error)}` : note)] : dangling;
      }
      default:
        return [];
    }
  }

  private said(text: string): AGUIEvent[] {
    if (text.trim()) this.lastText = text;
    return this.text(text);
  }

  private text(text: string): AGUIEvent[] {
    if (!text.trim()) return [];
    const messageId = `msg-${this.runId}-${++this.n}`;
    return [
      { type: EventType.TEXT_MESSAGE_START, messageId, role: "assistant" },
      { type: EventType.TEXT_MESSAGE_CONTENT, messageId, delta: text },
      { type: EventType.TEXT_MESSAGE_END, messageId },
    ] as AGUIEvent[];
  }

  private toolCall(id: string, name: string, args: unknown): AGUIEvent[] {
    return [
      { type: EventType.TOOL_CALL_START, toolCallId: id, toolCallName: name },
      { type: EventType.TOOL_CALL_ARGS, toolCallId: id, delta: JSON.stringify(args) },
      { type: EventType.TOOL_CALL_END, toolCallId: id },
    ] as AGUIEvent[];
  }

  private result(id: string, content: string, isError: boolean): AGUIEvent {
    return {
      type: EventType.TOOL_CALL_RESULT, messageId: `res-${id}`, toolCallId: id, content, role: "tool",
      ...(isError ? { isError: true, error: content } : {}),
    } as AGUIEvent;
  }

  /** One card per version / evidence per run (later updates of the same one don't repeat it). */
  private artifact(key: string, tool: string, title: string, content: object): AGUIEvent[] {
    if (this.seen.has(key)) return [];
    this.seen.add(key);
    const id = `art-${this.runId}-${key}-${++this.n}`;
    return [...this.toolCall(id, tool, { _title: title, ...content }), this.result(id, JSON.stringify(content), false)];
  }
}

function intent(kind: string, stage?: Stage) {
  if (kind === "message") return "";
  if (kind === "question") return "Разберу вопрос по доске и данным и отвечу с конкретными транзакциями.";
  if (kind === "challenge") return "Проверю альтернативное объяснение на данных и обновлю версию, если оно подтвердится.";
  const s = STAGES.find((x) => x.key === stage);
  if (!s || s.key === "data_study")
    return "Сначала изучу данные и всю сеть, затем проверю кандидатов, восстановлю структуру группы и попробую её опровергнуть.";
  if (s.key === "done") return "Перепроверю итоговую версию на данных и обновлю доску, если что-то изменится.";
  return `Продолжу с этапа «${s.label}»: ${s.hint.toLowerCase()}.`;
}

function normalizeInput(input: unknown): unknown {
  if (input == null || typeof input === "object") return input ?? {};
  // Older runs stored a JSON preview string (possibly clipped).
  try {
    return JSON.parse(String(input));
  } catch {
    return String(input);
  }
}
