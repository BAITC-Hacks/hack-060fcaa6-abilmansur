"use client";
import dynamic from "next/dynamic";
import { Button, Callout, MetricIndicatorInline } from "./primitives";
import { Check, Plus } from "lucide-react";
import type { GraphNode, Cluster, Summary } from "@/lib/types";
import type { ResultBlock } from "@/lib/investigation";
import { integer, money } from "@/lib/api";
import { RoleTag } from "./ui";
import { NodesTable } from "./nodes-table";
import NetworkView from "./network-view";
import { useChat } from "./chat-state";
import { useInvestigation } from "./investigation-context";
const NetworkGraph = dynamic(() => import("./network-graph"), { ssr: false });

export function EvidenceCard({ node }: { node: GraphNode }) {
  return (
    <div className="node-evidence">
      <p>
        <b>Почему:</b> {node.evidence}
      </p>
      {node.warnings.length > 0 && (
        <details>
          <summary>Ограничения данных</summary>
          {node.warnings.map((w) => (
            <p key={w}>{w}</p>
          ))}
        </details>
      )}
    </div>
  );
}
export function NodeCard({ node }: { node: GraphNode }) {
  const ctx = useInvestigation();
  const { send, busy } = useChat();
  const selected = ctx.chosen.includes(node.gid);
  const ask = (question: string) => {
    ctx.navigate();
    void send(question);
  };
  return (
    <article className="node-result">
      <div className="node-result-heading">
        <Button
          variant="tertiary"
          size="small"
          onClick={() => ctx.openNode(node.gid)}
        >
          GID {node.gid}
        </Button>
        <RoleTag role={node.role} />
        <span className="muted small">
          Приоритет {node.priority_score.toFixed(2)}
        </span>
      </div>
      <p className="muted small">
        Получает от {node.in_degree} · передаёт {node.out_degree}
      </p>
      <EvidenceCard node={node} />
      <div className="result-actions">
        <Button
          variant="secondary"
          size="small"
          disabled={busy}
          onClick={() => ask(`Покажи связи gid ${node.gid}`)}
        >
          Показать связи
        </Button>
        <Button
          variant="tertiary"
          size="small"
          disabled={busy}
          onClick={() =>
            ask(
              `Объясни роль участника ${node.gid}. Какие признаки подтверждают гипотезу?`,
            )
          }
        >
          Объяснить
        </Button>
        <Button
          variant="tertiary"
          size="small"
          disabled={!selected && ctx.chosen.length >= 20}
          iconLeft={selected ? <Check size={14} /> : <Plus size={14} />}
          onClick={() => ctx.toggle(node.gid)}
        >
          {selected ? "Убрать из проверки" : "Добавить в проверку"}
        </Button>
      </div>
    </article>
  );
}
export function ClusterCard({ cluster }: { cluster: Cluster }) {
  const { send, busy } = useChat();
  const ctx = useInvestigation();
  return (
    <article className="cluster-result">
      <h3>Кластер {cluster.cluster_id + 1}</h3>
      <p className="muted small">
        {integer(cluster.n_nodes)} участников · {cluster.n_seed} seed ·{" "}
        {money(cluster.sum_kzt_internal, true)} ₸ внутри группы
      </p>
      <p>{cluster.hypothesis}</p>
      <Button
        variant="secondary"
        size="small"
        disabled={busy}
        onClick={() => {
          ctx.navigate();
          void send(`Покажи связи кластера ${cluster.cluster_id}`);
        }}
      >
        Показать связи
      </Button>
    </article>
  );
}
export function MetricCard({ summary }: { summary: Summary }) {
  return (
    <div className="inline-metrics">
      <MetricIndicatorInline
        value={integer(summary.n_nodes)}
        subtext="участников"
      />
      <MetricIndicatorInline
        value={integer(summary.n_edges)}
        subtext="связей"
      />
      <MetricIndicatorInline
        value={integer(summary.n_transactions)}
        subtext="переводов"
      />
    </div>
  );
}
export function ResultContent({
  block,
  controls,
  expanded = false,
}: {
  block: ResultBlock;
  controls: { open: () => void };
  expanded?: boolean;
}) {
  const ctx = useInvestigation();
  if (block.datasetId !== ctx.snapshot?.id)
    return (
      <Callout
        variant="neutral"
        description="Этот результат относится к предыдущему набору данных. Задайте вопрос повторно для текущих источников."
      />
    );
  if (block.kind === "graph" && block.graph)
    return expanded ? (
      <NetworkView
        graph={ctx.snapshot.graph}
        clusters={ctx.snapshot.clusters}
        onOpen={ctx.openNode}
        focus={block.focus || null}
        initialCluster={
          block.cluster === undefined ? "all" : String(block.cluster)
        }
      />
    ) : (
      <section className="graph-result">
        <div className="result-heading">
          <h3>{block.focus ? `Связи ${block.focus}` : "Связи кластера"}</h3>
          <Button size="small" variant="secondary" onClick={controls.open}>
            Развернуть граф
          </Button>
        </div>
        <NetworkGraph
          data={block.graph}
          onSelect={ctx.openNode}
          selected={block.focus || null}
          compact
        />
        <p className="muted small">
          {block.graph.nodes.length} из {block.graph.total_nodes} участников ·{" "}
          {block.graph.edges.length} связей · нажмите на узел для деталей
        </p>
      </section>
    );
  if (block.kind === "metrics" && block.summary)
    return <MetricCard summary={block.summary} />;
  if (block.kind === "clusters")
    return (
      <section className="result-stack">
        {block.clusters?.map((c) => (
          <ClusterCard key={c.cluster_id} cluster={c} />
        ))}
      </section>
    );
  const nodes = block.nodes || [];
  return (
    <section className="result-stack">
      {nodes.slice(0, 3).map((node) => (
        <NodeCard key={node.gid} node={node} />
      ))}
      {nodes.length > 3 && (
        <details className="result-more">
          <summary>Все {nodes.length} участников в таблице</summary>
          <NodesTable
            nodes={nodes}
            onSelect={ctx.openNode}
            selected={ctx.chosen}
            onToggle={ctx.toggle}
            compact
          />
        </details>
      )}
    </section>
  );
}
