"use client";

import { useEffect, useRef, useState } from "react";
import useSWR, { type SWRConfiguration } from "swr";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ---------------------------------------------------------------- types (mirror backend/app)

export type Stage = "data_study" | "network_overview" | "candidate_review" | "structure_recovery" | "refutation" | "done";
export type RunStatus = "queued" | "running" | "cancelling" | "cancelled" | "completed" | "stopped" | "failed";
export type Role =
  | "source" | "collector" | "distributor" | "transit" | "final_recipient"
  | "coordinated_account" | "organizer" | "unclear";

export interface Dataset {
  id: string;
  name: string;
  row_count: number;
  created_at: string;
  profile: {
    row_count: number;
    period: { min_ts: string; max_ts: string };
    accounts: { total: number; senders: number; receivers: number };
    currencies: { currency: string; tx_count: number; total: number; median: number }[];
    quality: { duplicate_tx_ids: number; self_transfers: number; non_positive_amounts: number };
    /** "graph" for a crawl graph imported as nodes / edges / transactions parquet. */
    kind?: "graph";
    graph?: GraphProfile;
  };
}

export type TaskRole = "consolidator" | "transit" | "distributor" | "terminal" | "coordinator" | "peripheral";

export interface GraphProfile {
  nodes: number;
  seeds: number;
  edges: number;
  max_depth: number;
  nodes_by_depth: Record<string, number>;
  /** Last-hop nodes: never expanded, so their outgoing transfers are unknown. */
  censored_nodes: number;
  roles: Partial<Record<TaskRole, number>>;
  clusters: number;
  outputs: string[];
}

/** Download URL of a scoring-pipeline result file (nodes_roles.csv, clusters.csv, top_nodes.csv). */
export const outputUrl = (datasetId: string, name: string) => `${API_URL}/datasets/${datasetId}/outputs/${name}`;

export interface Investigation {
  id: string;
  dataset_id: string;
  title: string;
  /** pending: a short title is being generated from the first message; the current one is temporary. */
  title_status: "pending" | "ready" | "failed" | "final";
  brief: string | null;
  stage: Stage;
  passport: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  counts?: Record<"candidates" | "coverage" | "versions" | "evidence" | "runs" | "answers", number>;
}

export interface Run {
  id: string;
  investigation_id: string;
  investigation_title?: string;
  kind: "investigate" | "message" | "question" | "challenge";
  prompt: string;
  status: RunStatus;
  summary: string | null;
  error: string | null;
  cost_usd: number | null;
  num_turns: number | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

export interface Candidate {
  id: string;
  label: string;
  accounts: string[];
  patterns: string[];
  discovered_by: string | null;
  priority: number;
  status: "queued" | "in_progress" | "confirmed" | "dismissed" | "merged" | "deferred";
  notes: string | null;
}

export interface Coverage {
  id: string;
  scope_kind: string;
  scope: string;
  method: string;
  result: string;
  created_at: string;
}

export interface Member {
  account_id: string;
  role: Role;
  confidence: number;
  inclusion_basis: string;
  alternative_explanation: string | null;
  missing_information: string | null;
  evidence_ids: string[];
  status: "included" | "uncertain" | "excluded";
}

export interface Link {
  id: string;
  source: string;
  target: string;
  kind: "transfer" | "coordination" | "shared_counterparty";
  tx_ids: string[];
  rationale: string;
  status: "active" | "weak" | "removed";
  stats: { tx_count: number; totals_by_currency: Record<string, number>; period: { start: string; end: string } };
}

export interface Check { check: string; ok: boolean; severity: "error" | "warning"; detail: string }

export interface TrailHop {
  node: string;
  strict_sequence: boolean;
  exclusive_inflow_share: number | null;
  other_senders_in_window: number;
  outflow_to_inflow_ratio: number | null;
}

export interface Trail {
  id: string;
  title: string;
  description?: string | null;
  steps: { from: string; to: string; tx_ids: string[] }[];
  verification: { status: string; certainty: string; hops: TrailHop[]; note: string; checks: Check[] };
}

export interface Objection {
  id: string;
  target_kind: string;
  target_ref: string | null;
  text: string;
  status: "open" | "refuted" | "accepted";
  resolution: string | null;
}

export interface OpenQuestion { id: string; text: string; status: string; answer: string | null }

export interface EvidenceSummary {
  id: string;
  title: string;
  claim: string;
  pattern: string | null;
  accounts: string[];
  period_start: string | null;
  period_end: string | null;
  verification: { status: "verified" | "warning" | "failed"; checks: Check[]; recomputed: Recomputed };
}

export interface Recomputed {
  tx_count: number;
  totals_by_currency: Record<string, number>;
  period: { start: string | null; end: string | null };
  accounts_involved: string[];
}

export interface Transaction {
  tx_id: string;
  ts: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  currency: string;
  sender_type: string | null;
  receiver_type: string | null;
  purpose: string | null;
  channel: string | null;
}

export interface Evidence extends EvidenceSummary {
  observed_features: string[];
  tx_ids: string[];
  query_id: string | null;
  query_sql: string | null;
  script_path: string | null;
  script_content: string | null;
  script_sha256: string | null;
  limitations: string | null;
  alternatives: string | null;
  claimed: Record<string, unknown> | null;
  transactions: Transaction[];
}

export interface Version {
  id: string;
  parent_id: string | null;
  title: string;
  summary: string;
  status: "draft" | "challenged" | "revised" | "rejected" | "final";
  confidence: number | null;
  created_at: string;
  members: Member[];
  links: Link[];
  trails: Trail[];
  objections: Objection[];
  open_questions: OpenQuestion[];
  evidence: EvidenceSummary[];
}

export interface Board {
  investigation: Investigation;
  candidates: Candidate[];
  coverage: Coverage[];
  versions: Version[];
}

export interface GraphNode {
  key: string;
  attributes: {
    label: string;
    role: Role | "context";
    member: boolean;
    confidence?: number;
    status?: Member["status"];
    inclusion_basis?: string;
    alternative_explanation?: string | null;
    missing_information?: string | null;
    evidence_ids?: string[];
  };
}

export interface GraphEdge {
  key: string;
  source: string;
  target: string;
  attributes: {
    type: "transfer" | "coordination" | "shared_counterparty" | "context";
    tx_count?: number;
    tx_ids: string[];
    totals_by_currency?: Record<string, number>;
    first_ts?: string;
    last_ts?: string;
    asserted: boolean;
    link_id?: string | null;
    link_status?: string | null;
    rationale?: string | null;
  };
}

export interface VersionGraph {
  attributes: { version_id: string; title: string; status: string };
  nodes: GraphNode[];
  edges: GraphEdge[];
  trails: { id: string; title: string; steps: Trail["steps"]; certainty: string; hops: TrailHop[]; note: string }[];
}

export interface TimelineTx extends Transaction { sender_role: string; receiver_role: string }
export interface TimelineFrame {
  frame: string;
  index: number;
  tx: TimelineTx[];
  totals_by_currency: Record<string, number>;
  role_flows: Record<string, number>;
}
export interface Timeline { version_id: string; bucket: string; frames: TimelineFrame[]; tx_count: number }

export interface AccountCard {
  account_id: string;
  summary: { out_count: number; in_count: number; first_ts: string; last_ts: string; account_type: string | null };
  totals_by_currency: { currency: string; out_amount: number | null; in_amount: number | null }[];
  top_counterparties: { counterparty: string; direction: "in" | "out"; currency: string; n: number; amount: number }[];
  recent_transactions: Transaction[];
  memberships: (Member & { version_id: string; version_title: string; version_status: string })[];
  answers: Answer[];
}

export interface Answer {
  id: string;
  run_id: string;
  question: string;
  answer: string;
  accounts: string[];
  tx_ids: string[];
  evidence_ids: string[];
  created_at: string;
}

export interface InvestigationEvent {
  id: number;
  type: string;
  run_id: string;
  ts: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------- fetching

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: init?.body instanceof FormData ? init?.headers : { "content-type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail ?? body);
    } catch {}
    throw new ApiError(res.status, detail);
  }
  return res.json() as Promise<T>;
}

export const post = <T,>(path: string, body?: unknown) =>
  api<T>(path, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body ?? {}) });

export const patch = <T,>(path: string, body: unknown) => api<T>(path, { method: "PATCH", body: JSON.stringify(body) });

export function useApi<T>(path: string | null, config?: SWRConfiguration<T>) {
  return useSWR<T>(path, (p: string) => api<T>(p), { revalidateOnFocus: false, ...config });
}

export const useDatasets = () => useApi<Dataset[]>("/datasets");
export const useInvestigations = () => useApi<Investigation[]>("/investigations", { refreshInterval: 10_000 });
export const useActiveRuns = () => useApi<Run[]>("/runs/active", { refreshInterval: 4_000 });

export interface Health { ok: boolean; model: string; worker_alive: boolean; worker_last_seen_s: number | null }
/** Whether an agent worker process is running (queued runs only start when it is). */
export const useHealth = () => useApi<Health>("/health", { refreshInterval: 5_000 });

// ---------------------------------------------------------------- live events (SSE)

/** Streams investigation events. Keeps the most recent `keep` events; replays history on connect. */
// Tool calls and results are part of the activity timeline, so keep a long history.
export function useInvestigationEvents(investigationId: string, onEvent?: (e: InvestigationEvent) => void, keep = 5000) {
  const [events, setEvents] = useState<InvestigationEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const handler = useRef(onEvent);
  useEffect(() => {
    handler.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    const source = new EventSource(`${API_URL}/investigations/${investigationId}/events`);
    const buffer: InvestigationEvent[] = [];
    let frame = 0;
    const flush = () => {
      frame = 0;
      const batch = buffer.splice(0);
      setEvents((prev) => [...prev, ...batch].slice(-keep));
    };
    const listener = (msg: MessageEvent) => {
      // The payload may carry its own `id` (e.g. a candidate id): keep it as `ref`, the event id wins.
      const payload = JSON.parse(msg.data);
      const event = { ...payload, ref: payload.id, id: Number(msg.lastEventId), type: msg.type } as InvestigationEvent;
      buffer.push(event);
      handler.current?.(event);
      if (!frame) frame = requestAnimationFrame(flush);
    };
    for (const type of EVENT_TYPES) source.addEventListener(type, listener);
    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    return () => {
      cancelAnimationFrame(frame);
      source.close();
    };
  }, [investigationId, keep]);

  return { events, connected };
}

export const EVENT_TYPES = [
  "run_queued", "run_started", "session", "agent_text", "tool_call", "tool_result", "query", "stage", "passport",
  "candidate", "coverage", "version", "member", "link", "trail", "evidence", "evidence_rejected", "objection",
  "open_question", "answer", "summary", "run_finished",
] as const;

/** Event types that change the board and should trigger a refetch. */
export const BOARD_EVENTS = new Set([
  "stage", "passport", "candidate", "coverage", "version", "member", "link", "trail", "evidence", "objection",
  "open_question", "summary", "run_finished", "run_queued", "run_started",
]);
