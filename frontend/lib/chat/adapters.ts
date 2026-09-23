"use client";

/** Wires the chat interface (AgentInterface / ChatProvider) to the investigator backend:
 *  threads = investigations, a message = one run, artifacts = versions and evidence packets. */

import {
  processStreamedMessage,
  type AGUIEvent,
  type ArtifactSummary,
  type ChatLLM,
  type ChatStorage,
  type Message,
  type Thread,
} from "@inv/headless";

import { API_URL, api, patch, post, type Board, type Evidence, type Investigation, type InvestigationEvent, type Run } from "@/lib/api";
import { EVIDENCE_TOOL, RunConverter, VERSION_TOOL } from "./converter";
import { useDatasetStore } from "./datasetStore";

export const VERSION_ARTIFACT = "inv_version";
export const EVIDENCE_ARTIFACT = "inv_evidence";

// ---------------------------------------------------------------- how the next message is sent

/** Set right before `processMessage` by controls that need more than a free question
 *  (continue the investigation, ask about a node). Consumed by the next `send`. */
export type SendIntent =
  | { kind: "investigate"; prompt: string }
  | { kind: "ask"; mode: "why" | "connections" | "challenge" | "free"; accountId?: string | null; versionId?: string | null };

let pendingIntent: SendIntent | null = null;
export const setNextIntent = (intent: SendIntent) => {
  pendingIntent = intent;
};

// ---------------------------------------------------------------- hidden threads

// The backend has no delete: "Delete" in the template's thread menu hides the investigation in this browser.
const HIDDEN_KEY = "investigator:hidden-threads";
const hidden = (): Set<string> => {
  try {
    return new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
};
const hide = (id: string) => {
  try {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify([...hidden().add(id)]));
  } catch {}
};

// ---------------------------------------------------------------- history → messages

/** Rebuilds a thread from the backend: per run, the user's prompt and the assistant turn
 *  (built by the same converter + the template's own stream reducer used for live runs). */
export async function loadMessages(investigationId: string, liveRunId?: string): Promise<Message[]> {
  const all = (await api<Run[]>(`/investigations/${investigationId}/runs`)).reverse();
  // A run that is still going contributes only its prompt: its assistant turn is rebuilt from the live stream.
  const live = all.find((r) => r.id === liveRunId);
  const runs = all.filter((r) => r.id !== liveRunId);
  const histories = await Promise.all(
    runs.map((r) =>
      api<{ id: number; type: string; ts: string; run_id: string; payload: Record<string, unknown> }[]>(
        `/runs/${r.id}/events/history?limit=5000`,
      ),
    ),
  );
  const messages: Message[] = [];
  for (const [i, run] of runs.entries()) {
    messages.push({ id: `user-${run.id}`, role: "user", content: run.prompt });
    const converter = new RunConverter(investigationId, run.id);
    const events = histories[i].flatMap((row) => converter.push(toEvent(row.type, row.id, row.run_id, row.ts, row.payload)));
    await processStreamedMessage({
      response: new Response(null),
      adapter: { parse: () => iterate(events) },
      createMessage: (m: Message) => messages.push(m),
      updateMessage: (m: Message) => {
        const at = messages.findIndex((x) => x.id === m.id);
        if (at !== -1) messages[at] = m;
      },
    });
  }
  if (live) messages.push({ id: `user-${live.id}`, role: "user", content: live.prompt });
  return messages;
}

async function* iterate(events: AGUIEvent[]) {
  for (const e of events) yield e;
}

function toEvent(type: string, id: number, runId: string, ts: string, payload: Record<string, unknown>): InvestigationEvent {
  // The payload may carry its own `id` (a version or evidence id): keep it as `ref`, the event id wins.
  return { ...payload, ref: payload.id, id, type, run_id: runId, ts } as InvestigationEvent;
}

// ---------------------------------------------------------------- generated titles

/** A thread starts with the user's first message as its title while a short title is generated on the
 *  backend; `watchTitle` polls for it and hands it to listeners (ThreadSync puts it into the thread list). */
type TitleListener = (threadId: string, title: string) => void;
const titleListeners = new Set<TitleListener>();
export const onGeneratedTitle = (listener: TitleListener) => {
  titleListeners.add(listener);
  return () => void titleListeners.delete(listener);
};

const TITLE_POLL_MS = 1500;
// Usually ~10 s, but slower when an agent run starts at the same time; polling backs off to 10 s.
const TITLE_POLL_MAX_MS = 10_000;
const TITLE_TIMEOUT_MS = 5 * 60_000;
const watching = new Set<string>();
/** Last title the backend is known to hold per thread, so echoing it back is not saved as a rename. */
const serverTitles = new Map<string, string>();

function watchTitle(id: string) {
  if (watching.has(id)) return;
  watching.add(id);
  const started = Date.now();
  let delay = TITLE_POLL_MS;
  const tick = async () => {
    try {
      const inv = await api<Investigation>(`/investigations/${id}`);
      if (inv.title_status !== "pending") {
        watching.delete(id);
        serverTitles.set(id, inv.title);
        if (inv.title_status === "ready") titleListeners.forEach((l) => l(id, inv.title));
        return;
      }
    } catch {}
    delay = Math.min(delay * 1.5, TITLE_POLL_MAX_MS);
    if (Date.now() - started < TITLE_TIMEOUT_MS) window.setTimeout(tick, delay);
    else watching.delete(id);
  };
  window.setTimeout(tick, TITLE_POLL_MS);
}

/** The first message as a one-line temporary title (the sidebar truncates it). */
const temporaryTitle = (text: string) => text.replace(/\s+/g, " ").trim().slice(0, 200) || "Новый чат";

// ---------------------------------------------------------------- storage

const toThread = (inv: Investigation): Thread => {
  serverTitles.set(inv.id, inv.title);
  if (inv.title_status === "pending") watchTitle(inv.id);
  return { id: inv.id, title: inv.title, createdAt: inv.created_at };
};

/** Titles of artifacts seen in the last listing, so `get` can answer without another round trip. */
const artifactIndex = new Map<string, ArtifactSummary>();

export function createStorage(): ChatStorage {
  return {
    thread: {
      async listThreads() {
        const hiddenIds = hidden();
        const investigations = await api<Investigation[]>("/investigations");
        return { threads: investigations.filter((i) => !hiddenIds.has(i.id)).map(toThread) };
      },
      async createThread(firstMessage) {
        const datasetId = useDatasetStore.getState().datasetId;
        if (!datasetId) throw new Error("Сначала выберите или загрузите датасет — переключатель вверху экрана.");
        const brief = messageText(firstMessage).trim();
        // Created right away under a temporary title; the backend generates the real one in the background.
        const res = await post<{ investigation: Investigation }>("/investigations", {
          dataset_id: datasetId, title: temporaryTitle(brief), brief, start: false, generate_title: true,
        });
        return toThread(res.investigation);
      },
      getMessages: loadMessages,
      async updateThread(thread) {
        if (serverTitles.get(thread.id) === thread.title) return thread; // e.g. a generated title arriving
        const inv = await patch<Investigation>(`/investigations/${thread.id}`, { title: thread.title });
        return toThread(inv);
      },
      async deleteThread(id) {
        hide(id);
      },
    },
    artifact: {
      async list(params) {
        const hiddenIds = hidden();
        const investigations = (await api<Investigation[]>("/investigations")).filter((i) => !hiddenIds.has(i.id));
        const [boards, evidenceLists] = await Promise.all([
          Promise.all(investigations.map((i) => api<Board>(`/investigations/${i.id}/board`).catch(() => null))),
          // Every evidence packet of the investigation: the agent may publish one before (or without) a version.
          Promise.all(investigations.map((i) => api<Evidence[]>(`/investigations/${i.id}/evidence`).catch(() => []))),
        ]);
        const all: ArtifactSummary[] = [];
        investigations.forEach((inv, i) => {
          for (const v of boards[i]?.versions ?? [])
            all.push({ id: `ver:${inv.id}:${v.id}`, title: v.title, type: VERSION_ARTIFACT, threadId: inv.id, updatedAt: v.created_at });
          for (const e of evidenceLists[i])
            all.push({ id: `ev:${inv.id}:${e.id}`, title: e.title, type: EVIDENCE_ARTIFACT, threadId: inv.id, updatedAt: e.created_at });
        });
        all.forEach((a) => artifactIndex.set(a.id, a));
        const name = params?.name?.trim().toLowerCase();
        const artifacts = all.filter((a) => (!params?.type?.length || params.type.includes(a.type)) && (!name || a.title.toLowerCase().includes(name)));
        return { artifacts };
      },
      async get(id) {
        const [kind, investigationId, ref] = id.split(":");
        const summary = artifactIndex.get(id);
        const title = summary?.title ?? ref;
        const content =
          kind === "ver" ? { investigationId, versionId: ref, title } : { investigationId, evidenceId: ref, title };
        return {
          id, title, content, threadId: investigationId,
          type: kind === "ver" ? VERSION_ARTIFACT : EVIDENCE_ARTIFACT,
          updatedAt: summary?.updatedAt,
        };
      },
      // Artifacts are views of the board; nothing to write back.
      async update({ id }) {
        return (await this.get(id)) as ArtifactSummary;
      },
    },
  };
}

// ---------------------------------------------------------------- LLM: queue a run, stream its events

/** "продолжи", "продолжай расследование", "дальше", "continue"… — a request to go on with the investigation. */
const CONTINUE_COMMAND = /^(продолж\S*|дальше|далее|continue|go on)(\s+(расследование|работу|анализ))?[.!…]*$/i;

const messageText = (m?: Message): string => {
  const c = m?.content as unknown;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.map((p) => (typeof p === "string" ? p : typeof p?.text === "string" ? p.text : "")).join("\n");
  return "";
};

/** The full investigation (the "Кого проверять первым?" starter): the only first message that runs all stages. */
export const INVESTIGATE_PROMPT =
  "Найди, кто стоит выше 81 seed-клиента по цепочке денег: куда они стекаются, через кого проходят и кто ими " +
  "распоряжается. Проверь на транзакциях топ-20 рейтинга приложения и самые подозрительные кластеры. Итог — " +
  "ранжированный список 10–20 узлов для углублённой проверки с коротким понятным обоснованием по каждому.";

/** Runs this tab already streams (sent from here), so ThreadSync does not attach to them a second time. */
const followedRuns = new Set<string>();
export const isFollowedRun = (runId: string) => followedRuns.has(runId);

/** The live event stream of a run, for the chat store's stream protocol below. The stop button aborts the
 *  stream and stops the run on the backend; leaving the thread (abort reason "navigate") only detaches, and
 *  the agent keeps working. */
export async function openRunStream(threadId: string, runId: string, signal: AbortSignal): Promise<Response> {
  signal.addEventListener(
    "abort",
    () => {
      if (signal.reason !== "navigate") void post(`/runs/${runId}/cancel`).catch(() => {});
    },
    { once: true },
  );
  const res = await fetch(`${API_URL}/runs/${runId}/events`, { signal, headers: { accept: "text/event-stream" } });
  const headers = new Headers(res.headers);
  headers.set("x-investigation-id", threadId);
  headers.set("x-run-id", runId);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export function createLLM(): ChatLLM {
  return {
    async send({ threadId, messages, signal }) {
      const text = messageText(messages.findLast((m) => m.role === "user")).trim();
      const intent = pendingIntent;
      pendingIntent = null;
      // Every message continues the same thread: the backend resumes the agent's session, so the agent
      // remembers the conversation. The full-investigation starter runs every stage, a "continue" command
      // resumes the investigation; any other text (a first question too) goes to the agent as a chat message it
      // reads in context - it answers, or investigates if that is what was asked.
      const isFirst = messages.filter((m) => m.role === "user").length === 1;

      let run: Run;
      if (intent?.kind === "ask") {
        run = await post<Run>(`/investigations/${threadId}/ask`, {
          mode: intent.mode,
          question: intent.mode === "free" ? text : undefined,
          account_id: intent.accountId ?? undefined,
          version_id: intent.versionId ?? undefined,
        });
      } else if (intent?.kind === "investigate" || (isFirst && text === INVESTIGATE_PROMPT) || (!isFirst && CONTINUE_COMMAND.test(text))) {
        run = await post<Run>(`/investigations/${threadId}/runs`, {
          kind: "investigate",
          prompt: intent?.kind === "investigate" ? intent.prompt : text,
        });
      } else {
        run = await post<Run>(`/investigations/${threadId}/runs`, { kind: "message", prompt: text });
      }

      followedRuns.add(run.id);
      return openRunStream(threadId, run.id, signal);
    },
    streamProtocol: {
      async *parse(response) {
        const converter = new RunConverter(response.headers.get("x-investigation-id") ?? "", response.headers.get("x-run-id") ?? "");
        for await (const event of readSSE(response)) yield* converter.push(event);
      },
    },
  };
}

/** Parses the backend's server-sent events (sse-starlette; CRLF or LF line endings). */
async function* readSSE(response: Response): AsyncGenerator<InvestigationEvent> {
  if (!response.body) return;
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value.replace(/\r\n?/g, "\n");
    let cut: number;
    while ((cut = buffer.indexOf("\n\n")) !== -1) {
      const block = buffer.slice(0, cut);
      buffer = buffer.slice(cut + 2);
      let type = "message";
      let id = 0;
      const data: string[] = [];
      for (const line of block.split("\n")) {
        if (line.startsWith("event:")) type = line.slice(6).trim();
        else if (line.startsWith("id:")) id = Number(line.slice(3).trim());
        else if (line.startsWith("data:")) data.push(line.slice(5).replace(/^ /, ""));
      }
      if (!data.length) continue; // pings / comments
      const payload = JSON.parse(data.join("\n")) as Record<string, unknown>;
      yield toEvent(type, id, String(payload.run_id ?? ""), String(payload.ts ?? ""), payload);
    }
  }
}

export { EVIDENCE_TOOL, VERSION_TOOL };
