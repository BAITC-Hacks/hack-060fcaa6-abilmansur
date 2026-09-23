"use client";

import { useTheme } from "@inv/ui";
import { DirectedGraph } from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import Sigma from "sigma";

import { IconAction } from "@/components/ui";
import type { Network } from "@/lib/api";
import { IN_EDGE, OUT_EDGE, nodeColor, type ColorMode } from "./palette";

/** WebGL colours (sigma cannot read CSS variables). Solid, muted edges: translucent arrows add up to a white mass. */
const PALETTES = {
  light: { edge: "#d9d9d9", faded: "#ececec", fadedEdge: "#f1f1f1", label: "#404040", other: "#cbd5e1" },
  dark: { edge: "#3a3a3a", faded: "#2a2a2a", fadedEdge: "#262626", label: "#d4d4d4", other: "#52525b" },
};

interface Props {
  data: Network;
  colorMode: ColorMode;
  selected: string | null;
  onSelect: (gid: string | null) => void;
}

/** Deterministic start: clusters on a spiral (largest first), each cluster's nodes on a small circle around it.
 *  ForceAtlas2 run synchronously from the same start gives the same picture every time. */
function seedPositions(data: Network) {
  const byCluster = new Map<number, string[]>();
  for (const n of data.nodes) byCluster.set(n.cluster_id, [...(byCluster.get(n.cluster_id) ?? []), n.gid]);
  const clusters = [...byCluster.entries()].sort((a, b) => b[1].length - a[1].length);
  const pos = new Map<string, { x: number; y: number }>();
  clusters.forEach(([, gids], i) => {
    const r = 40 * Math.sqrt(i);
    const a = i * 2.39996; // golden angle
    const cx = r * Math.cos(a), cy = r * Math.sin(a);
    const spread = 4 + Math.sqrt(gids.length) * 1.5;
    gids.sort().forEach((g, j) => {
      const b = (j / gids.length) * Math.PI * 2;
      pos.set(g, { x: cx + spread * Math.cos(b), y: cy + spread * Math.sin(b) });
    });
  });
  return pos;
}

export default function NetworkGraph({ data, colorMode, selected, onSelect }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<Sigma | null>(null);
  const graphRef = useRef<DirectedGraph | null>(null);
  const view = useRef({ selected, colorMode, hovered: null as string | null });
  const onSelectRef = useRef(onSelect);
  const { mode } = useTheme();

  useLayoutEffect(() => {
    view.current.selected = selected;
    view.current.colorMode = colorMode;
    onSelectRef.current = onSelect;
  });

  // Build the graph, lay it out and create the renderer once per dataset / theme.
  useEffect(() => {
    if (!container.current) return;
    const P = PALETTES[mode];
    const graph = new DirectedGraph();
    const start = seedPositions(data);
    for (const n of data.nodes) {
      graph.addNode(n.gid, {
        ...start.get(n.gid)!,
        label: n.gid,
        size: 2 + Math.pow(n.priority_score, 1.6) * 12,
        role: n.role,
        cluster: n.cluster_id,
        rank: n.rank,
      });
    }
    for (const e of data.edges) {
      if (!graph.hasNode(e.source) || !graph.hasNode(e.target) || graph.hasEdge(e.source, e.target)) continue;
      graph.addEdge(e.source, e.target, { size: 0.4 + Math.log10(1 + e.sum_kzt / 1e4) * 0.6, type: "arrow" });
    }
    forceAtlas2.assign(graph, {
      iterations: 180,
      settings: { ...forceAtlas2.inferSettings(graph), barnesHutOptimize: true, gravity: 0.6, scalingRatio: 8, slowDown: 4 },
    });
    graphRef.current = graph;

    const sigma = new Sigma(graph, container.current, {
      defaultEdgeType: "arrow",
      labelFont: getComputedStyle(document.body).fontFamily || "Inter, sans-serif",
      labelSize: 11,
      labelWeight: "500",
      labelColor: { color: P.label },
      labelRenderedSizeThreshold: 14,
      zIndex: true,
      stagePadding: 40,
      minCameraRatio: 0.02,
      maxCameraRatio: 4,
      nodeReducer: (node, attrs) => {
        const { selected, colorMode, hovered } = view.current;
        const res: Record<string, unknown> = { ...attrs, color: nodeColor(attrs.role, attrs.cluster, colorMode, P.other) };
        if (attrs.rank <= 10) res.forceLabel = !selected;
        if (selected) {
          if (node === selected) {
            res.forceLabel = true;
            res.zIndex = 3;
            res.size = Math.max(attrs.size as number, 7) * 1.4;
          } else if (graph.areNeighbors(selected, node)) {
            res.zIndex = 2;
            res.forceLabel = graph.degree(selected) <= 25;
          } else {
            res.color = P.faded;
            res.label = "";
            res.zIndex = 0;
          }
        }
        if (node === hovered) {
          res.forceLabel = true;
          res.zIndex = 3;
        }
        return res;
      },
      edgeReducer: (edge, attrs) => {
        const { selected } = view.current;
        const res: Record<string, unknown> = { ...attrs, color: P.edge };
        if (selected) {
          const [s, t] = graph.extremities(edge);
          if (t === selected) Object.assign(res, { color: IN_EDGE, size: (attrs.size as number) + 1, zIndex: 2 });
          else if (s === selected) Object.assign(res, { color: OUT_EDGE, size: (attrs.size as number) + 1, zIndex: 2 });
          else res.color = P.fadedEdge;
        }
        return res;
      },
    });
    sigma.on("clickNode", ({ node }) => onSelectRef.current(node));
    sigma.on("clickStage", () => onSelectRef.current(null));
    sigma.on("enterNode", ({ node }) => {
      view.current.hovered = node;
      container.current!.style.cursor = "pointer";
      sigma.refresh({ skipIndexation: true });
    });
    sigma.on("leaveNode", () => {
      view.current.hovered = null;
      container.current!.style.cursor = "";
      sigma.refresh({ skipIndexation: true });
    });
    sigmaRef.current = sigma;
    return () => {
      sigma.kill();
      sigmaRef.current = null;
      graphRef.current = null;
    };
  }, [data, mode]);

  // Re-colour / re-highlight without rebuilding; bring a newly selected node into view.
  useEffect(() => {
    const sigma = sigmaRef.current;
    if (!sigma) return;
    sigma.refresh({ skipIndexation: true });
    if (selected && graphRef.current?.hasNode(selected)) {
      const d = sigma.getNodeDisplayData(selected);
      if (d) sigma.getCamera().animate({ x: d.x, y: d.y, ratio: Math.min(sigma.getCamera().ratio, 0.35) }, { duration: 450 });
    }
  }, [selected, colorMode]);

  const zoom = (kind: "in" | "out" | "reset") => {
    const cam = sigmaRef.current?.getCamera();
    if (kind === "in") cam?.animatedZoom({ duration: 200 });
    else if (kind === "out") cam?.animatedUnzoom({ duration: 200 });
    else cam?.animatedReset({ duration: 300 });
  };
  return (
    <div className="relative h-full w-full">
      <div ref={container} className="absolute inset-0" />
      <div className="absolute right-3 bottom-3 flex flex-col gap-1 rounded-xl border border-line bg-surface p-1 shadow-s">
        <IconAction label="Приблизить" tooltipSide="left" icon={<ZoomIn size="1em" />} onClick={() => zoom("in")} />
        <IconAction label="Отдалить" tooltipSide="left" icon={<ZoomOut size="1em" />} onClick={() => zoom("out")} />
        <IconAction label="Вся сеть" tooltipSide="left" icon={<Maximize size="1em" />} onClick={() => zoom("reset")} />
      </div>
    </div>
  );
}
