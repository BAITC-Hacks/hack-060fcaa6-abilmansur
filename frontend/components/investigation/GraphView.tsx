"use client";

import { useTheme } from "@inv/ui";
import clsx from "clsx";
import { MultiDirectedGraph } from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { AnimatePresence, motion } from "motion/react";
import { Focus, Network, Workflow, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Sigma from "sigma";
import { animateNodes } from "sigma/utils";

import { IconAction } from "@/components/ui";
import type { VersionGraph } from "@/lib/api";
import { ROLES, fmtTotals } from "@/lib/format";
import { flowLayout } from "./layout";

export interface ReplayState {
  frame: number;
  /** edge key -> first frame the edge carries money */
  edgeFrame: Map<string, number>;
  nodeFrame: Map<string, number>;
  currentEdges: Set<string>;
  currentNodes: Set<string>;
}

interface Props {
  data: VersionGraph;
  selected: string | null;
  onSelect: (node: string | null) => void;
  highlightTx: Set<string> | null;
  replay: ReplayState | null;
  showContext: boolean;
}

/** WebGL colours (sigma cannot read CSS variables), matched to the UI-kit neutral palette per theme. */
const PALETTES = {
  light: {
    faded: "#e5e5e5", edge: "rgba(10,10,10,0.28)", edgeContext: "rgba(10,10,10,0.08)", edgeDim: "rgba(10,10,10,0.05)",
    edgeIn: "#0a0a0a", context: "#cbd5e1", label: "#525252",
  },
  dark: {
    faded: "#303030", edge: "rgba(250,250,250,0.18)", edgeContext: "rgba(250,250,250,0.08)", edgeDim: "rgba(250,250,250,0.05)",
    edgeIn: "#fafafa", context: "#52525b", label: "#a3a3a3",
  },
};
/** Data highlights: money on the move (orange) and the selected node's outflow (violet). */
const HOT = "#f97316";
const SELECTED = "#8b5cf6";
const COORDINATION = "#14b8a6";

export default function GraphView({ data, selected, onSelect, highlightTx, replay, showContext }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<Sigma | null>(null);
  const graphRef = useRef<MultiDirectedGraph | null>(null);
  const [layout, setLayout] = useState<"flow" | "force">("flow");
  const [hovered, setHovered] = useState<string | null>(null);
  const [halos, setHalos] = useState<{ key: string; x: number; y: number; color: string; r: number; hot: boolean }[]>([]);
  const [tip, setTip] = useState<{ x: number; y: number; node: string } | null>(null);

  // Everything the reducers read lives in a ref so we never rebuild the renderer on interaction.
  const view = useRef({ selected, highlightTx, replay, hovered, showContext });
  const onSelectRef = useRef(onSelect);
  const overlaysRef = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    view.current = { selected, highlightTx, replay, hovered, showContext };
    onSelectRef.current = onSelect;
  });

  const flow = useMemo(() => flowLayout(data.nodes, data.edges), [data]);
  const { mode } = useTheme();

  // Build graph + renderer once per dataset.
  useEffect(() => {
    if (!container.current) return;
    const P = PALETTES[mode];
    const graph = new MultiDirectedGraph();
    for (const n of data.nodes) {
      const role = ROLES[n.attributes.role] ?? ROLES.unclear;
      const conf = n.attributes.confidence ?? 0.3;
      graph.addNode(n.key, {
        ...flow[n.key],
        label: n.key,
        size: n.attributes.member ? 7 + conf * 9 : 3.5,
        color: n.attributes.member ? role.color : P.context,
        member: n.attributes.member,
        role: n.attributes.role,
      });
    }
    for (const e of data.edges) {
      if (!graph.hasNode(e.source) || !graph.hasNode(e.target)) continue;
      const count = e.attributes.tx_count ?? e.attributes.tx_ids.length;
      const kind = e.attributes.type;
      graph.addEdgeWithKey(e.key, e.source, e.target, {
        size: kind === "context" ? 0.6 : Math.min(1 + Math.log2(1 + count) * 0.9, 6),
        color: kind === "context" ? P.edgeContext : kind === "transfer" ? P.edge : COORDINATION,
        kind,
        asserted: e.attributes.asserted,
        txIds: new Set(e.attributes.tx_ids),
        type: "arrow",
      });
    }
    graphRef.current = graph;

    const sigma = new Sigma(graph, container.current, {
      defaultEdgeType: "arrow",
      renderEdgeLabels: false,
      labelFont: getComputedStyle(document.body).fontFamily || "Inter, sans-serif",
      labelSize: 11,
      labelWeight: "500",
      labelColor: { color: P.label },
      labelRenderedSizeThreshold: 9,
      zIndex: true,
      stagePadding: 72,
      minCameraRatio: 0.08,
      maxCameraRatio: 3,
      nodeReducer: (node, attrs) => {
        const { selected, highlightTx, replay, hovered, showContext } = view.current;
        const res: Record<string, unknown> = { ...attrs };
        if (!attrs.member && !showContext) res.hidden = true;
        if (replay) {
          const first = replay.nodeFrame.get(node);
          if (first === undefined || first > replay.frame) res.hidden = true;
          else if (replay.currentNodes.has(node)) {
            res.size = (attrs.size as number) * 1.35;
            res.forceLabel = true;
            res.zIndex = 2;
          } else res.color = mix(attrs.color as string);
        }
        if (highlightTx) {
          const touched = graphRef.current!.edges(node).some((e) => hasAny(graphRef.current!.getEdgeAttribute(e, "txIds"), highlightTx));
          if (!touched) res.color = P.faded;
          else { res.forceLabel = true; res.zIndex = 2; }
        } else if (selected && selected !== node && !graphRef.current!.areNeighbors(selected, node)) {
          res.color = P.faded;
          res.label = "";
        }
        if (node === selected || node === hovered) {
          res.forceLabel = true;
          res.zIndex = 3;
          res.highlighted = true;
        }
        return res;
      },
      edgeReducer: (edge, attrs) => {
        const { selected, highlightTx, replay, showContext } = view.current;
        const res: Record<string, unknown> = { ...attrs };
        const g = graphRef.current!;
        if (attrs.kind === "context" && !showContext) res.hidden = true;
        if (replay) {
          const first = replay.edgeFrame.get(edge);
          if (first === undefined || first > replay.frame) res.hidden = true;
          else if (replay.currentEdges.has(edge)) {
            res.color = HOT;
            res.size = (attrs.size as number) * 1.6 + 1;
            res.zIndex = 2;
          }
        }
        if (highlightTx) {
          if (hasAny(attrs.txIds as Set<string>, highlightTx)) {
            res.color = HOT;
            res.size = (attrs.size as number) + 2;
            res.zIndex = 2;
          } else res.color = P.edgeDim;
        } else if (selected) {
          const [s, t] = g.extremities(edge);
          if (s !== selected && t !== selected) res.color = P.edgeDim;
          else { res.color = s === selected ? SELECTED : P.edgeIn; res.zIndex = 2; }
        }
        return res;
      },
    });
    sigmaRef.current = sigma;

    sigma.on("clickNode", ({ node }) => onSelectRef.current(node));
    sigma.on("clickStage", () => onSelectRef.current(null));
    sigma.on("enterNode", ({ node }) => {
      setHovered(node);
      container.current!.style.cursor = "pointer";
    });
    sigma.on("leaveNode", () => {
      setHovered(null);
      container.current!.style.cursor = "";
    });
    sigma.on("afterRender", () => overlaysRef.current());

    // Entrance: nodes grow from the centre of the flow.
    const targets: Record<string, Record<string, number>> = {};
    graph.forEachNode((n, a) => {
      targets[n] = { x: a.x, y: a.y, size: a.size };
      graph.mergeNodeAttributes(n, { x: a.x * 0.2, y: a.y * 0.2, size: 0.5 });
    });
    const cancel = animateNodes(graph, targets, { duration: 900, easing: "cubicOut" });

    return () => {
      cancel();
      sigma.kill();
      sigmaRef.current = null;
    };
    // Rebuilt when the theme flips: the palette is baked into node/edge attributes.
  }, [data, flow, mode]);

  // Re-render when interaction state changes.
  useEffect(() => {
    sigmaRef.current?.refresh({ skipIndexation: true });
  }, [selected, highlightTx, replay, hovered, showContext]);

  // Camera follows the selection.
  useEffect(() => {
    const sigma = sigmaRef.current;
    if (!sigma || !selected || !graphRef.current?.hasNode(selected)) return;
    const d = sigma.getNodeDisplayData(selected);
    if (d) sigma.getCamera().animate({ x: d.x, y: d.y, ratio: Math.min(sigma.getCamera().ratio, 0.6) }, { duration: 650, easing: "cubicInOut" });
  }, [selected]);

  // Switch layouts with an animated transition.
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    let targets: Record<string, { x: number; y: number }>;
    if (layout === "flow") targets = flow;
    else {
      const copy = graph.copy();
      copy.forEachNode((n) => copy.mergeNodeAttributes(n, flow[n]));
      targets = forceAtlas2(copy, { iterations: 300, settings: { ...forceAtlas2.inferSettings(copy), gravity: 1, scalingRatio: 6 } });
    }
    const cancel = animateNodes(graph, targets, { duration: 800, easing: "cubicInOut" });
    return cancel;
  }, [layout, flow]);

  const positionOverlays = () => {
    const sigma = sigmaRef.current;
    const graph = graphRef.current;
    if (!sigma || !graph) return;
    const { selected, replay, hovered } = view.current;
    const keys = new Set<string>();
    if (selected && graph.hasNode(selected)) keys.add(selected);
    if (replay) replay.currentNodes.forEach((n) => keys.add(n));
    const next = [...keys].filter((k) => graph.hasNode(k)).map((k) => {
      const a = graph.getNodeAttributes(k);
      const p = sigma.graphToViewport({ x: a.x, y: a.y });
      const d = sigma.getNodeDisplayData(k);
      return { key: k, x: p.x, y: p.y, color: a.color as string, r: (d?.size ?? a.size) * 1.1, hot: k !== selected };
    });
    setHalos((prev) => (sameHalos(prev, next) ? prev : next));
    if (hovered && graph.hasNode(hovered)) {
      const a = graph.getNodeAttributes(hovered);
      const p = sigma.graphToViewport({ x: a.x, y: a.y });
      setTip((t) => (t && t.node === hovered && Math.abs(t.x - p.x) < 0.5 && Math.abs(t.y - p.y) < 0.5 ? t : { x: p.x, y: p.y, node: hovered }));
    } else setTip(null);
  };
  useLayoutEffect(() => {
    overlaysRef.current = positionOverlays;
  });

  const zoom = (f: number) => sigmaRef.current?.getCamera().animatedZoom({ factor: f, duration: 300 });
  const tipNode = tip ? data.nodes.find((n) => n.key === tip.node) : null;

  return (
    <div className="absolute inset-0">
      <div ref={container} className="absolute inset-0" />

      {/* Halos: selected node (violet ring) and nodes active in the current replay frame (orange pulse). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {halos.map((h) => (
          <span key={h.key} className="absolute" style={{ left: h.x, top: h.y }}>
            <span
              className={clsx("absolute animate-ping-soft rounded-full border-2", h.hot ? "border-[#f97316]/80" : "border-[#a78bfa]")}
              style={{ width: h.r * 2 + 10, height: h.r * 2 + 10, left: -(h.r + 5), top: -(h.r + 5) }}
            />
            {!h.hot && (
              <span
                className="absolute rounded-full border-2 border-[#8b5cf6]/70"
                style={{ width: h.r * 2 + 8, height: h.r * 2 + 8, left: -(h.r + 4), top: -(h.r + 4) }}
              />
            )}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {tip && tipNode && (
          <motion.div
            key={tip.node}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-20 w-64 -translate-x-1/2 rounded-xl border border-line-interactive bg-popover p-3 text-xs shadow-xl"
            style={{ left: tip.x, top: tip.y + 18 }}
          >
            <p className="flex items-center gap-2 font-mono text-sm font-medium text-primary">
              <span className="size-2.5 rounded-full" style={{ background: ROLES[tipNode.attributes.role]?.color }} />
              {tipNode.key}
            </p>
            <p className="mt-0.5 text-secondary">
              {ROLES[tipNode.attributes.role]?.label}
              {tipNode.attributes.confidence != null && ` · уверенность ${Math.round(tipNode.attributes.confidence * 100)}%`}
            </p>
            {tipNode.attributes.inclusion_basis && (
              <p className="mt-1.5 line-clamp-3 leading-4 text-primary">{tipNode.attributes.inclusion_basis}</p>
            )}
            {!tipNode.attributes.member && <EdgeSummary data={data} node={tipNode.key} />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 flex-col gap-0.5 rounded-xl border border-line bg-popover p-1 shadow-s">
        <GraphButton label="Приблизить" onClick={() => zoom(1.5)} icon={<ZoomIn size="1em" />} />
        <GraphButton label="Отдалить" onClick={() => zoom(1 / 1.5)} icon={<ZoomOut size="1em" />} />
        <GraphButton label="Показать всё" onClick={() => sigmaRef.current?.getCamera().animatedReset({ duration: 500 })} icon={<Focus size="1em" />} />
        <div className="mx-1 my-0.5 h-px bg-line" />
        <GraphButton label="Раскладка: поток денег" active={layout === "flow"} onClick={() => setLayout("flow")} icon={<Workflow size="1em" />} />
        <GraphButton label="Раскладка: силовая" active={layout === "force"} onClick={() => setLayout("force")} icon={<Network size="1em" />} />
      </div>
    </div>
  );
}

function EdgeSummary({ data, node }: { data: VersionGraph; node: string }) {
  const e = data.edges.filter((x) => x.source === node || x.target === node);
  const totals: Record<string, number> = {};
  for (const x of e) for (const [c, v] of Object.entries(x.attributes.totals_by_currency ?? {})) totals[c] = (totals[c] ?? 0) + v;
  return <p className="mt-1 text-secondary">Контрагент вне группы · {fmtTotals(totals)}</p>;
}

function GraphButton({ label, icon, onClick, active }: { label: string; icon: ReactNode; onClick: () => void; active?: boolean }) {
  return <IconAction label={label} tooltipSide="left" selected={active} onClick={onClick} icon={icon} />;
}

function hasAny(set: Set<string> | undefined, ids: Set<string>) {
  if (!set) return false;
  for (const id of set) if (ids.has(id)) return true;
  return false;
}

function mix(color: string) {
  // Past-frame nodes stay visible but calmer than the current frame.
  if (!/^#[0-9a-f]{6}$/i.test(color)) return color;
  const n = parseInt(color.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0.55)`;
}

function sameHalos(a: { key: string; x: number; y: number }[], b: { key: string; x: number; y: number }[]) {
  return a.length === b.length && a.every((h, i) => h.key === b[i].key && Math.abs(h.x - b[i].x) < 0.5 && Math.abs(h.y - b[i].y) < 0.5);
}
