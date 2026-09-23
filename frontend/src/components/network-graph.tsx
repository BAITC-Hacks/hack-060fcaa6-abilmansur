"use client";
import { useId, useMemo, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";
import { IconButton, TooltipWrapper } from "./primitives";
import { Maximize2, Minus, Plus } from "lucide-react";
import type { GraphData, GraphNode } from "@/lib/types";
import { roles } from "@/lib/roles";
import { shortGid } from "@/lib/api";
import { Empty } from "./ui";

interface Point extends SimulationNodeDatum {
  id: string;
  node: GraphNode;
  x: number;
  y: number;
}
function layout(data: GraphData) {
  const points: Point[] = data.nodes.map((node, i) => ({
    id: node.gid,
    node,
    x: 100 + node.depth * 190 + Math.sin(i * 2.4) * 45,
    y: 320 + Math.cos(i * 2.4) * (70 + (i % 200)),
  }));
  const links = data.edges.map((e) => ({ source: e.src, target: e.dst }));
  const sim = forceSimulation(points)
    .stop()
    .force(
      "link",
      forceLink<Point, { source: string; target: string }>(links)
        .id((d) => d.id)
        .distance(42)
        .strength(0.35),
    )
    .force("charge", forceManyBody().strength(points.length > 500 ? -8 : -45))
    .force(
      "collide",
      forceCollide<Point>().radius((d) => 5 + d.node.priority_score * 6),
    )
    .force("x", forceX<Point>((d) => 100 + d.node.depth * 190).strength(0.06))
    .force("y", forceY(310).strength(0.04));
  sim.tick(points.length > 500 ? 90 : 160);
  sim.stop();
  if (points.length) {
    const xs = points.map((p) => p.x),
      ys = points.map((p) => p.y);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const scale = Math.min(
      880 / Math.max(maxX - minX, 1),
      480 / Math.max(maxY - minY, 1),
      2,
    );
    for (const p of points) {
      p.x = 500 + (p.x - (minX + maxX) / 2) * scale;
      p.y = 290 + (p.y - (minY + maxY) / 2) * scale;
    }
  }
  return { points, byId: new Map(points.map((p) => [p.id, p])) };
}
export default function NetworkGraph({
  data,
  selected,
  onSelect,
  compact = false,
  colorBy = "role",
}: {
  data: GraphData;
  selected?: string | null;
  onSelect: (gid: string) => void;
  compact?: boolean;
  colorBy?: "role" | "cluster";
}) {
  const markerId = `graph-arrow-${useId().replace(/:/g, "")}`;
  const { points, byId } = useMemo(() => layout(data), [data]);
  const [hover, setHover] = useState<string | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(
    null,
  );
  const active = hover || selected;
  const neighbors = useMemo(
    () =>
      new Set(
        data.edges.flatMap((e) =>
          e.src === active ? [e.dst] : e.dst === active ? [e.src] : [],
        ),
      ),
    [data.edges, active],
  );
  const leaderIds = useMemo(
    () =>
      new Set(
        [...data.nodes]
          .sort((a, b) => b.priority_score - a.priority_score)
          .slice(0, compact ? 3 : 7)
          .map((n) => n.gid),
      ),
    [data.nodes, compact],
  );
  const palette = [
    "var(--finance-text-info-primary)",
    "var(--finance-text-purple-primary)",
    "var(--finance-text-success-primary)",
    "var(--finance-text-alert-primary)",
    "var(--finance-text-pink-primary)",
  ];
  if (!points.length)
    return (
      <Empty
        title="Нет узлов для отображения"
        description="Измените фильтры или выберите другой кластер."
      />
    );
  return (
    <div className={`network-canvas ${compact ? "compact" : ""}`}>
      <div className="graph-axis">
        <span>Источники</span>
        <span>Направление потока →</span>
        <span>Получатели</span>
      </div>
      <svg
        ref={svg}
        viewBox="0 0 1000 600"
        aria-label="Граф направленных переводов. Выберите узел для просмотра карточки."
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
        }}
        onPointerMove={(e) => {
          if (!drag.current || !svg.current) return;
          const ratio = 1000 / svg.current.getBoundingClientRect().width;
          setView((v) => ({
            ...v,
            x: drag.current!.vx + (e.clientX - drag.current!.x) * ratio,
            y: drag.current!.vy + (e.clientY - drag.current!.y) * ratio,
          }));
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="19"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <g
          transform={`translate(${view.x + 500 * (1 - view.zoom)} ${view.y + 300 * (1 - view.zoom)}) scale(${view.zoom})`}
        >
          <g className="graph-links">
            {data.edges.map((e) => {
              const a = byId.get(e.src),
                b = byId.get(e.dst);
              if (!a || !b) return null;
              const connected =
                active && (e.src === active || e.dst === active);
              return (
                <line
                  key={`${e.src}-${e.dst}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={connected ? "connected" : ""}
                  opacity={active && !connected ? 0.1 : 0.6}
                  strokeWidth={connected ? 1.7 : 0.75}
                  markerEnd={`url(#${markerId})`}
                />
              );
            })}
          </g>
          {points.map((p) => {
            const activeNode = p.id === active;
            const color =
              colorBy === "role"
                ? roles[p.node.role].color
                : palette[p.node.cluster_id % palette.length];
            return (
              <g
                key={p.id}
                transform={`translate(${p.x},${p.y})`}
                className="graph-node"
                role="button"
                tabIndex={compact ? -1 : 0}
                aria-label={`Узел ${p.id}, ${roles[p.node.role].label}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => onSelect(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(p.id);
                  }
                }}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                opacity={
                  active && !activeNode && !neighbors.has(p.id) ? 0.25 : 1
                }
              >
                {(p.node.is_seed || activeNode) && (
                  <circle
                    r={9 + p.node.priority_score * 5}
                    fill="none"
                    stroke={color}
                    strokeWidth={activeNode ? 2 : 0.8}
                    strokeDasharray={
                      p.node.is_seed && !activeNode ? "2 2" : undefined
                    }
                  />
                )}
                <circle
                  r={3.5 + p.node.priority_score * 6}
                  fill={color}
                  stroke="var(--finance-foreground)"
                  strokeWidth="1.5"
                />
                {(activeNode || leaderIds.has(p.id)) && (
                  <text y={-15} textAnchor="middle">
                    {shortGid(p.id)}
                  </text>
                )}
                <title>
                  {p.id} · {roles[p.node.role].label} ·{" "}
                  {p.node.priority_score.toFixed(2)}
                </title>
              </g>
            );
          })}
        </g>
      </svg>
      {!compact && (
        <div className="graph-controls">
          {[
            {
              title: "Приблизить",
              icon: <Plus size={16} />,
              action: () =>
                setView((v) => ({ ...v, zoom: Math.min(4, v.zoom * 1.25) })),
            },
            {
              title: "Отдалить",
              icon: <Minus size={16} />,
              action: () =>
                setView((v) => ({ ...v, zoom: Math.max(0.3, v.zoom / 1.25) })),
            },
            {
              title: "По размеру окна",
              icon: <Maximize2 size={16} />,
              action: () => setView({ x: 0, y: 0, zoom: 1 }),
            },
          ].map((c) => (
            <TooltipWrapper key={c.title} tooltipContent={c.title}>
              <IconButton
                aria-label={c.title}
                icon={c.icon}
                variant="secondary"
                size="small"
                onClick={c.action}
              />
            </TooltipWrapper>
          ))}
        </div>
      )}
      <div className="graph-footnote">
        <span className="seed-symbol" /> Seed-клиент
        {!compact && <span>Перетаскивайте поле · нажмите на узел</span>}
      </div>
    </div>
  );
}
