"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Card, Input, Tag } from "./primitives";
import { Search, X } from "lucide-react";
import type { Cluster, GraphData } from "@/lib/types";
import { roles, roleKeys } from "@/lib/roles";
import { Filter } from "./ui";
const NetworkGraph = dynamic(() => import("./network-graph"), { ssr: false });
export default function NetworkView({
  graph,
  clusters,
  onOpen,
  focus,
  initialCluster,
}: {
  graph: GraphData;
  clusters: Cluster[];
  onOpen: (gid: string) => void;
  focus: string | null;
  initialCluster: string;
}) {
  const [cluster, setCluster] = useState(initialCluster);
  const [role, setRole] = useState("all");
  const [limit, setLimit] = useState("200");
  const [color, setColor] = useState("role");
  const initialFocus =
    focus ||
    (initialCluster === "all"
      ? [...graph.nodes].sort((a, b) => b.priority_score - a.priority_score)[0]
          ?.gid
      : null) ||
    null;
  const [query, setQuery] = useState(initialFocus || "");
  const [target, setTarget] = useState(initialFocus);
  const [hops, setHops] = useState("1");
  const [error, setError] = useState("");
  const subset = useMemo(() => {
    let allowed: Set<string> | null = null;
    if (target) {
      let reached = new Set<string>([target]);
      for (let i = 0; i < Number(hops); i++) {
        const next: Set<string> = new Set(reached);
        for (const e of graph.edges) {
          if (reached.has(e.src)) next.add(e.dst);
          if (reached.has(e.dst)) next.add(e.src);
        }
        reached = next;
      }
      allowed = reached;
    }
    const candidates = graph.nodes.filter(
      (n) =>
        (!allowed || allowed.has(n.gid)) &&
        (cluster === "all" || n.cluster_id === Number(cluster)) &&
        (role === "all" || n.role === role),
    );
    candidates.sort(
      (a, b) =>
        Number(b.gid === target) - Number(a.gid === target) ||
        b.priority_score - a.priority_score ||
        a.gid.localeCompare(b.gid),
    );
    const nodes =
      limit === "all" ? candidates : candidates.slice(0, Number(limit));
    const ids = new Set(nodes.map((n) => n.gid));
    return {
      ...graph,
      nodes,
      edges: graph.edges.filter((e) => ids.has(e.src) && ids.has(e.dst)),
      total_nodes: candidates.length,
      truncated: nodes.length < candidates.length,
    };
  }, [graph, target, hops, cluster, role, limit]);
  return (
    <div className="page-content network-page">
      <div className="page-heading">
        <div>
          <h1>Граф переводов</h1>
          <p>
            Найдите gid или нажмите на узел, чтобы открыть участника. Стрелки
            показывают направление переводов.
          </p>
        </div>
        <Tag text="Направленный граф" size="sm" />
      </div>
      <Card width="full" className="graph-card">
        <div className="network-toolbar">
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault();
              const q = query.trim();
              if (!q) {
                setTarget(null);
                setError("");
                return;
              }
              if (!graph.nodes.some((n) => n.gid === q)) {
                setError("Узел с таким gid не найден");
                return;
              }
              setTarget(q);
              setCluster("all");
              setRole("all");
              setError("");
            }}
          >
            <Search size={16} />
            <Input
              aria-label="Найти узел на графе"
              placeholder="Найти точный gid…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="extra-small" variant="secondary" type="submit">
              Найти
            </Button>
          </form>
          <details className="advanced-filters">
            <summary>Настройки графа</summary>
            <div className="upload-actions">
              <Filter
                label="Кластер графа"
                value={cluster}
                onChange={setCluster}
                options={[
                  { value: "all", label: "Все кластеры" },
                  ...clusters.map((c) => ({
                    value: String(c.cluster_id),
                    label: `Кластер ${c.cluster_id + 1} · ${c.n_nodes}`,
                  })),
                ]}
              />
              <Filter
                label="Число узлов на графе"
                value={limit}
                onChange={setLimit}
                options={[
                  { value: "200", label: "Топ-200 узлов" },
                  { value: "500", label: "Топ-500 узлов" },
                  { value: "all", label: "Все узлы" },
                ]}
              />
              <Filter
                label="Цвет узлов"
                value={color}
                onChange={setColor}
                options={[
                  { value: "role", label: "Цвет по роли" },
                  { value: "cluster", label: "Цвет по кластеру" },
                ]}
              />
            </div>
          </details>
        </div>
        {error && (
          <p className="inline-error" role="alert">
            {error}
          </p>
        )}
        {target && (
          <div className="focus-strip">
            <span>
              Окрестность <b>{target}</b>
            </span>
            <Filter
              label="Радиус окрестности"
              value={hops}
              onChange={setHops}
              options={[
                { value: "1", label: "1 переход" },
                { value: "2", label: "2 перехода" },
              ]}
            />
            <Button
              variant="tertiary"
              size="extra-small"
              iconLeft={<X size={14} />}
              onClick={() => {
                setTarget(null);
                setQuery("");
              }}
            >
              Сбросить
            </Button>
          </div>
        )}
        <div className="graph-legend">
          <Button
            size="extra-small"
            variant={role === "all" ? "primary" : "tertiary"}
            onClick={() => setRole("all")}
          >
            Все роли
          </Button>
          {roleKeys.map((r) => (
            <Button
              size="extra-small"
              variant={role === r ? "primary" : "tertiary"}
              key={r}
              onClick={() => setRole(role === r ? "all" : r)}
            >
              <i className="role-dot" style={{ background: roles[r].color }} />
              {roles[r].label}
            </Button>
          ))}
        </div>
        <NetworkGraph
          key={`${target}-${cluster}-${limit}-${role}`}
          data={subset}
          selected={target}
          colorBy={color as "role" | "cluster"}
          onSelect={onOpen}
        />
        <div className="graph-status">
          <span>
            {subset.nodes.length} из {subset.total_nodes} узлов ·{" "}
            {subset.edges.length} связей
          </span>
          <span>
            {subset.truncated
              ? "Показаны узлы с наибольшим приоритетом"
              : "Все узлы выбранной области"}
          </span>
        </div>
      </Card>
      <p className="muted small">
        Линии показывают агрегированные переводы. Положение узлов условное и не
        отражает географию или последовательность операций.
      </p>
    </div>
  );
}
