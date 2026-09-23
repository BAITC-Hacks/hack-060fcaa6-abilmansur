import type { Cluster, GraphData, GraphNode, Summary } from "./types";
import { api } from "./api";

export const DATA_FILES = [
  "nodes.parquet",
  "edges.parquet",
  "transactions.parquet",
];
export interface DatasetHealth {
  ai_enabled: boolean;
  dataset_loaded: boolean;
  dataset_id: string | null;
  files: { name: string; size: number }[];
}
export interface Snapshot {
  id: string;
  files: DatasetHealth["files"];
  summary: Summary;
  graph: GraphData;
  clusters: Cluster[];
}
export interface ResultView {
  kind: "nodes" | "graph" | "clusters" | "metrics";
  gids?: string[];
  cluster_ids?: number[];
}
export interface ResultBlock extends ResultView {
  id: string;
  datasetId: string;
  title: string;
  nodes?: GraphNode[];
  graph?: GraphData;
  clusters?: Cluster[];
  summary?: Summary;
  focus?: string;
  cluster?: number;
}
export async function readSnapshot(
  signal?: AbortSignal,
): Promise<{ snapshot: Snapshot | null; ai: boolean }> {
  const health = await api<DatasetHealth>("health", { signal });
  if (!health.dataset_loaded || !health.dataset_id)
    return { snapshot: null, ai: health.ai_enabled };
  const [summary, graph, clusters] = await Promise.all([
    api<Summary>("summary", { signal }),
    api<GraphData>("graph?limit=5000", { signal }),
    api<{ items: Cluster[] }>("clusters?limit=500", { signal }),
  ]);
  return {
    snapshot: {
      id: health.dataset_id,
      files: health.files,
      summary,
      graph,
      clusters: clusters.items,
    },
    ai: health.ai_enabled,
  };
}
export function attachmentsError(files: File[]): string | null {
  if (files.some((f) => !DATA_FILES.includes(f.name)))
    return "Прикрепите только nodes.parquet, edges.parquet и transactions.parquet.";
  if (files.reduce((sum, f) => sum + f.size, 0) > 30 * 1024 * 1024)
    return "Общий размер файлов не должен превышать 30 МБ.";
  const missing = DATA_FILES.filter(
    (name) => !files.some((f) => f.name === name),
  );
  return missing.length ? `Для анализа добавьте ${missing.join(", ")}.` : null;
}
export function buildResult(view: ResultView, snapshot: Snapshot): ResultBlock {
  const ranked = [...snapshot.graph.nodes].sort(
    (a, b) => b.priority_score - a.priority_score,
  );
  const nodes = view.gids?.length
    ? view.gids
        .map((id) => snapshot.graph.nodes.find((n) => n.gid === id))
        .filter((n): n is GraphNode => !!n)
    : ranked.slice(0, 5);
  const clusters = [...snapshot.clusters]
    .filter(
      (c) =>
        !view.cluster_ids?.length || view.cluster_ids.includes(c.cluster_id),
    )
    .sort((a, b) => b.n_nodes - a.n_nodes)
    .slice(0, 3);
  const title = {
    nodes: "Участники для проверки",
    graph: "Связи участников",
    clusters: "Крупнейшие кластеры",
    metrics: "Данные проанализированы",
  }[view.kind];
  const result: ResultBlock = {
    ...view,
    id: crypto.randomUUID(),
    datasetId: snapshot.id,
    title,
  };
  if (view.kind === "nodes") result.nodes = nodes.slice(0, 5);
  if (view.kind === "clusters") result.clusters = clusters;
  if (view.kind === "metrics") result.summary = snapshot.summary;
  if (view.kind === "graph") {
    const cluster = view.cluster_ids?.[0];
    const focus = cluster === undefined ? nodes[0]?.gid : undefined;
    const allowed = new Set(
      focus
        ? [focus]
        : snapshot.graph.nodes
            .filter((n) => n.cluster_id === cluster)
            .map((n) => n.gid),
    );
    if (focus)
      snapshot.graph.edges.forEach((e) => {
        if (e.src === focus) allowed.add(e.dst);
        if (e.dst === focus) allowed.add(e.src);
      });
    const candidates = ranked.filter((n) => allowed.has(n.gid));
    const chosen = candidates
      .sort((a, b) => Number(b.gid === focus) - Number(a.gid === focus))
      .slice(0, 100);
    const ids = new Set(chosen.map((n) => n.gid));
    result.graph = {
      nodes: chosen,
      edges: snapshot.graph.edges.filter(
        (e) => ids.has(e.src) && ids.has(e.dst),
      ),
      total_nodes: candidates.length,
      truncated: chosen.length < candidates.length,
      directed: true,
    };
    result.focus = focus;
    result.cluster = cluster;
  }
  return result;
}

// Exact actions only. Free-form questions are interpreted by Codex, not keyword guesses.
export function localRequest(
  question: string,
  snapshot: Snapshot,
  chosen: string[],
): { text: string; views: ResultView[] } | null {
  const q = question
    .trim()
    .replace(/[.!?]+$/, "")
    .toLowerCase();
  if (["проанализируй сеть", "анализировать", "проанализировать"].includes(q))
    return {
      text: "Данные проверены. Начните с приоритетных участников или задайте вопрос о переводах. Роли — гипотезы для проверки.",
      views: [{ kind: "metrics" }, { kind: "nodes" }],
    };
  if (q === "кого проверить первым")
    return {
      text: "Показаны первые пять участников по рассчитанному приоритету. Откройте связи или попросите объяснить роль. Скор не является вероятностью нарушения.",
      views: [{ kind: "nodes" }],
    };
  if (q === "покажи крупнейшие кластеры")
    return {
      text: "Три крупнейших сообщества по числу участников. Гипотезы основаны на наблюдаемой структуре переводов.",
      views: [{ kind: "clusters" }],
    };
  if (q === "объясни роль участника" && !chosen.length)
    return {
      text: "Укажите gid участника в вопросе или добавьте участника в проверку из карточки.",
      views: [],
    };
  const graph = /^покажи связи(?: gid (\d+))?$/.exec(q);
  if (graph) {
    const gids = graph[1] ? [graph[1]] : chosen.slice(0, 1);
    if (gids.some((id) => !snapshot.graph.nodes.some((n) => n.gid === id)))
      return {
        text: "Участник с таким gid не найден в текущей выборке.",
        views: [],
      };
    return {
      text: "Показаны ближайшие связи участника. Стрелки — направление переводов; связи не доказывают движение одних и тех же денег.",
      views: [{ kind: "graph", gids }],
    };
  }
  const cluster = /^покажи связи кластера (\d+)$/.exec(q);
  if (cluster) {
    const id = Number(cluster[1]);
    return snapshot.clusters.some((c) => c.cluster_id === id)
      ? {
          text: "Связи внутри выбранного кластера.",
          views: [{ kind: "graph", cluster_ids: [id] }],
        }
      : { text: "Кластер не найден.", views: [] };
  }
  return null;
}

export function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((part) => part?.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n");
}
