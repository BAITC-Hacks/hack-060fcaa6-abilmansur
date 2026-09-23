import { TASK_ROLES } from "@/lib/format";

export type ColorMode = "role" | "cluster";

/** Distinct colours for the most suspicious clusters (ids are ordered by suspicion); the rest stay neutral. */
export const CLUSTER_COLORS = [
  "#8b5cf6", "#f97316", "#10b981", "#ec4899", "#3b82f6", "#eab308",
  "#14b8a6", "#ef4444", "#6366f1", "#84cc16", "#06b6d4", "#d946ef",
];

/** The selected node's money: where it came from and where it went. */
export const IN_EDGE = "#3b82f6";
export const OUT_EDGE = "#f97316";

export function nodeColor(role: string, clusterId: number, mode: ColorMode, other: string) {
  if (mode === "role") return TASK_ROLES[role as keyof typeof TASK_ROLES]?.color ?? other;
  return CLUSTER_COLORS[clusterId] ?? other;
}
