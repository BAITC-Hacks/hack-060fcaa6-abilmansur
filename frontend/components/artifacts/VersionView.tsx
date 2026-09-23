"use client";

import { Button, Tabs, TabsContent, TabsList, TabsTrigger, useThread, useThreadList } from "@inv/ui";
import { Eye, EyeOff, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { BoardPanel } from "@/components/investigation/BoardPanel";
import { EvidencePanel } from "@/components/investigation/EvidencePanel";
import type { ReplayState } from "@/components/investigation/GraphView";
import { ASKS, NodePanel, type AskMode } from "@/components/investigation/NodePanel";
import { ReplayBar } from "@/components/investigation/ReplayBar";
import { LinksPanel, MembersPanel } from "@/components/investigation/StructurePanels";
import { Skeleton, ease } from "@/components/ui";
import { useActiveRuns, useApi, type Board, type Timeline, type VersionGraph } from "@/lib/api";
import { ROLES } from "@/lib/format";
import { setNextIntent } from "@/lib/chat/adapters";

// WebGL renderer: client only.
const GraphView = dynamic(() => import("@/components/investigation/GraphView"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 grid place-items-center text-sm text-secondary">Готовлю граф…</div>,
});

type Tab = "members" | "links" | "board" | "evidence" | "node";

/** Full view of a version artifact: the network graph (with replay over time) and its board. */
export function VersionView({ investigationId, versionId: initialVersion }: { investigationId: string; versionId: string }) {
  const [versionId, setVersionId] = useState(initialVersion);
  const { data: board } = useApi<Board>(`/investigations/${investigationId}/board`, { refreshInterval: 8000 });
  const { data: graph } = useApi<VersionGraph>(`/investigations/${investigationId}/versions/${versionId}/graph?context=4`, {
    refreshInterval: 8000,
  });
  const version = board?.versions.find((v) => v.id === versionId);

  const [selected, setSelected] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<Set<string> | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [tab, setTab] = useState<Tab>("members");

  // ------------------------------------------------------------ asking through the chat
  const selectedThreadId = useThreadList((s) => s.selectedThreadId);
  const isRunning = useThread((s) => s.isRunning);
  const processMessage = useThread((s) => s.processMessage);
  const { data: activeRuns } = useActiveRuns();
  const inThread = selectedThreadId === investigationId;
  const busy = isRunning || !!activeRuns?.some((r) => r.investigation_id === investigationId);
  const ask = (mode: AskMode, account: string) => {
    const q = ASKS.find((a) => a.mode === mode)!;
    setNextIntent({ kind: "ask", mode, accountId: account, versionId });
    void processMessage({ role: "user", content: q.question(account) });
  };

  // ------------------------------------------------------------ replay
  const [replayOpen, setReplayOpen] = useState(false);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const { data: timeline } = useApi<Timeline>(replayOpen ? `/investigations/${investigationId}/versions/${versionId}/timeline?bucket=day` : null);
  const frames = useMemo(() => timeline?.frames ?? [], [timeline]);

  useEffect(() => {
    if (!playing || !frames.length) return;
    const t = window.setInterval(() => {
      setFrame((f) => {
        if (f >= frames.length - 1) {
          setPlaying(false);
          return f;
        }
        return f + 1;
      });
    }, 1100 / speed);
    return () => window.clearInterval(t);
  }, [playing, speed, frames.length]);

  const replay: ReplayState | null = useMemo(() => {
    if (!replayOpen || !frames.length) return null;
    const edgeFrame = new Map<string, number>();
    const nodeFrame = new Map<string, number>();
    frames.forEach((f, i) => {
      for (const t of f.tx) {
        const k = `tx:${t.sender_id}->${t.receiver_id}`;
        if (!edgeFrame.has(k)) edgeFrame.set(k, i);
        if (!nodeFrame.has(t.sender_id)) nodeFrame.set(t.sender_id, i);
        if (!nodeFrame.has(t.receiver_id)) nodeFrame.set(t.receiver_id, i);
      }
    });
    const cur = frames[Math.min(frame, frames.length - 1)];
    return {
      frame, edgeFrame, nodeFrame,
      currentEdges: new Set(cur.tx.map((t) => `tx:${t.sender_id}->${t.receiver_id}`)),
      currentNodes: new Set(cur.tx.flatMap((t) => [t.sender_id, t.receiver_id])),
    };
  }, [replayOpen, frames, frame]);

  // ------------------------------------------------------------ actions
  const selectNode = (node: string | null) => {
    setSelected(node);
    setHighlight(null);
    if (node) setTab("node");
  };
  const showTx = (ids: string[]) => {
    setHighlight(new Set(ids));
    setSelected(null);
    setReplayOpen(false);
  };

  const member = version?.members.find((m) => m.account_id === selected);
  const rolesInGraph = useMemo(
    () => [...new Set(graph?.nodes.filter((n) => n.attributes.member).map((n) => n.attributes.role))],
    [graph],
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative min-h-[320px] flex-[1.2] overflow-hidden border-b border-line bg-sunk-light">
        {graph && graph.nodes.length > 0 ? (
          <GraphView data={graph} selected={selected} onSelect={selectNode} highlightTx={highlight} replay={replay} showContext={showContext} />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-secondary">
            {graph ? "В версии пока нет участников." : "Загружаю граф…"}
          </div>
        )}

        {graph && !replayOpen && (
          <div className="absolute bottom-3 left-3 z-10 flex max-w-[240px] flex-col gap-1 rounded-xl border border-line bg-popover p-2.5 text-xs text-secondary shadow-s">
            {rolesInGraph.map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <span className="size-2 shrink-0 rounded-full" style={{ background: ROLES[r].color }} /> {ROLES[r].label}
              </span>
            ))}
            <Button
              variant="tertiary"
              size="extra-small"
              aria-pressed={showContext}
              onClick={() => setShowContext((v) => !v)}
              iconLeft={showContext ? <Eye size={13} /> : <EyeOff size={13} />}
              className="mt-1 -ml-2 text-xs text-secondary"
            >
              {showContext ? "Скрыть контрагентов" : "Показать контрагентов"}
            </Button>
          </div>
        )}

        <AnimatePresence>
          {highlight && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-xl bg-inverted py-1 pr-1 pl-3 text-sm text-on-inverted shadow-l"
            >
              <span className="size-2 rounded-full bg-[#f97316]" /> Подсвечено {highlight.size} перев.
              <button
                type="button"
                onClick={() => setHighlight(null)}
                className="cursor-pointer rounded-lg px-2 py-1 text-on-inverted/70 transition-colors duration-[120ms] hover:text-on-inverted"
              >
                Сбросить
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {replayOpen ? (
            frames.length > 0 && (
              <ReplayBar
                frames={frames}
                frame={Math.min(frame, frames.length - 1)}
                playing={playing}
                speed={speed}
                onFrame={(i) => { setFrame(i); setPlaying(false); }}
                onPlay={(p) => { if (p && frame >= frames.length - 1) setFrame(0); setPlaying(p); }}
                onSpeed={setSpeed}
                onClose={() => { setReplayOpen(false); setPlaying(false); }}
              />
            )
          ) : (
            graph && graph.nodes.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-14 bottom-3 z-10"
              >
                <Button
                  variant="primary"
                  size="small"
                  iconLeft={<Play size="1em" fill="currentColor" />}
                  onClick={() => { setReplayOpen(true); setHighlight(null); setFrame(0); setPlaying(true); }}
                >
                  По времени
                </Button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="min-h-0 flex-1 gap-3 pt-2">
        <div className="px-4">
          <TabsList aria-label="Разделы версии">
            <TabsTrigger value="members" text={version ? `Участники ${version.members.length}` : "Участники"} />
            <TabsTrigger value="links" text={version ? `Связи ${version.links.length}` : "Связи"} />
            <TabsTrigger value="board" text="Доска" />
            <TabsTrigger value="evidence" text={version ? `Доказательства ${version.evidence.length}` : "Доказательства"} />
            <TabsTrigger value="node" text={selected ? "Узел •" : "Узел"} />
          </TabsList>
        </div>
        <TabsContent value="members" className="flex min-h-0 flex-1 flex-col border-0 p-0">
          <MembersPanel version={version} selected={selected} onSelectNode={selectNode} />
        </TabsContent>
        <TabsContent value="links" className="flex min-h-0 flex-1 flex-col border-0 p-0">
          <LinksPanel version={version} onSelectNode={selectNode} onShowTx={showTx} />
        </TabsContent>
        <TabsContent value="board" className="flex min-h-0 flex-1 flex-col border-0 p-0">
          {board ? (
            <BoardPanel board={board} versionId={versionId} onVersion={(v) => { setVersionId(v); setSelected(null); setHighlight(null); }} onShowTx={showTx} onSelectNode={selectNode} />
          ) : (
            <div className="px-4"><Skeleton count={4} height="40px" /></div>
          )}
        </TabsContent>
        <TabsContent value="evidence" className="flex min-h-0 flex-1 flex-col border-0 p-0">
          <EvidencePanel investigationId={investigationId} items={version?.evidence ?? []} onShowTx={showTx} onSelectNode={selectNode} />
        </TabsContent>
        <TabsContent value="node" className="flex min-h-0 flex-1 flex-col border-0 p-0">
          <NodePanel
            investigationId={investigationId}
            account={selected}
            member={member}
            refreshKey={0}
            busy={busy}
            onShowTx={showTx}
            onSelectNode={selectNode}
            onAsk={inThread ? ask : undefined}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
