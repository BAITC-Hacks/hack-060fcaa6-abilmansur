export type Role =
  | "coordinator"
  | "consolidator"
  | "transit"
  | "distributor"
  | "terminal"
  | "peripheral";
export interface GraphNode {
  gid: string;
  depth: number;
  is_seed: boolean;
  cluster_id: number;
  role: Role;
  role_score: number;
  priority_score: number;
  evidence: string;
  priority_evidence: string;
  priority_components: Record<string, number>;
  in_degree: number;
  out_degree: number;
  in_kzt: number;
  out_kzt: number;
  seed_reach: number;
  betweenness: number;
  betweenness_rank: number;
  boundary_censored: boolean;
  observed_out_in_ratio: number | null;
  incoming_active_days: number;
  outgoing_active_days: number;
  near_outgoing_day_ratio: number | null;
  max_same_day_senders: number;
  warnings: string[];
}
export interface Edge {
  src: string;
  dst: string;
  sum_kzt: number;
  n_tx: number;
  depth: number;
}
export interface GraphData {
  nodes: GraphNode[];
  edges: Edge[];
  total_nodes: number;
  truncated: boolean;
  directed: boolean;
}
export interface Summary {
  n_nodes: number;
  n_edges: number;
  n_transactions: number;
  n_seed: number;
  n_clusters: number;
  n_components: number;
  n_isolates: number;
  total_kzt: number;
  boundary_nodes: number;
  period_start: string;
  period_end: string;
  roles: Record<Role, number>;
  limitations: string[];
  method_version: string;
}
export interface Cluster {
  cluster_id: number;
  n_nodes: number;
  n_seed: number;
  sum_kzt_internal: number;
  top_gids: string[];
  hypothesis: string;
}
export interface Page<T> {
  total: number;
  limit: number;
  offset: number;
  items: T[];
}
export interface Transaction {
  src: string;
  dst: string;
  sum_kzt: number;
  date: string;
}
export interface Answer {
  answer: string;
  cited_gids: string[];
  limitations: string[];
  suggested_checks: string[];
  error?: boolean;
}
