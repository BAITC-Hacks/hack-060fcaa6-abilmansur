"use client";

import clsx from "clsx";
import { ArrowDownLeft, ArrowUpRight, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState, type ReactNode } from "react";

import { IconAction, Skeleton } from "@/components/ui";
import { useDatasets, useNetwork, useResilience, type Network, type NetworkNode } from "@/lib/api";
import { fmtInt, fmtShort, TASK_ROLES } from "@/lib/format";
import { useDatasetStore } from "@/lib/chat/datasetStore";
import { CLUSTER_COLORS, IN_EDGE, OUT_EDGE, type ColorMode } from "./palette";

// WebGL renderer: browser only.
const NetworkGraph = dynamic(() => import("./NetworkGraph"), { ssr: false });

const TOP_N = 30;
const kzt = (v: number) => `${fmtInt(Math.round(v))} ₸`;
const pctOf = (v: number | null | undefined) => (v == null ? "—" : `${Math.round(v * 100)}%`);

/** The whole crawl graph with the pipeline's roles: search by gid, top list, clusters, node card. */
export function NetworkPage() {
  const { data: datasets } = useDatasets();
  const storeId = useDatasetStore((s) => s.datasetId);
  // The network needs a graph dataset: the selected one if it is a graph, else the newest graph.
  const dataset = useMemo(() => {
    const graphs = (datasets ?? []).filter((d) => d.profile.kind === "graph");
    return graphs.find((d) => d.id === storeId) ?? graphs[0] ?? null;
  }, [datasets, storeId]);
  const { data, error } = useNetwork(dataset?.id ?? null);
  const [selected, setSelected] = useState<string | null>(null);
  const [colorMode, setColorMode] = useState<ColorMode>("role");

  if (datasets && !dataset)
    return <Empty>Нет датасета-графа. Загрузите nodes.parquet, edges.parquet и transactions.parquet на странице «Датасеты».</Empty>;
  if (error) return <Empty>Не удалось загрузить сеть: {String(error.message ?? error)}</Empty>;
  if (!data) return <div className="flex flex-1 items-center justify-center"><Skeleton height="60%" width="80%" /></div>;

  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      <Sidebar data={data} datasetId={dataset!.id} selected={selected} onSelect={setSelected} />
      <div className="relative min-h-[60vh] flex-1 md:min-h-0">
        <NetworkGraph data={data} colorMode={colorMode} selected={selected} onSelect={setSelected} />
        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-xl border border-line bg-surface p-1 shadow-s">
          {(["role", "cluster"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={colorMode === m}
              onClick={() => setColorMode(m)}
              className={clsx(
                "rounded-lg px-3 py-1 text-sm transition-colors duration-[120ms]",
                colorMode === m ? "bg-sunk text-primary" : "text-secondary hover:text-primary",
              )}
            >
              {m === "role" ? "Роли" : "Кластеры"}
            </button>
          ))}
        </div>
        <Legend data={data} mode={colorMode} />
      </div>
      {selected && <NodeCard data={data} gid={selected} onSelect={setSelected} />}
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 items-center justify-center p-8 text-center text-secondary">{children}</div>;
}

// ---------------------------------------------------------------- left: search, top list, clusters

const TABS = { top: `Топ-${TOP_N}`, clusters: "Кластеры", resilience: "Устойчивость" } as const;

function Sidebar({ data, datasetId, selected, onSelect }: {
  data: Network;
  datasetId: string;
  selected: string | null;
  onSelect: (g: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<keyof typeof TABS>("top");
  const q = query.replace(/\D/g, "");
  // Any part of the gid matches (analysts often have the tail of an id); exact matches first.
  const matches = useMemo(
    () => (q.length < 3 ? [] : data.nodes.filter((n) => n.gid.includes(q)).sort((a, b) => Number(b.gid === q) - Number(a.gid === q) || a.rank - b.rank).slice(0, 8)),
    [data, q],
  );

  return (
    <aside className="flex max-h-[40vh] w-full shrink-0 flex-col border-line md:max-h-none md:w-80 md:border-r">
      <div className="p-3">
        <label className="flex items-center gap-2 rounded-xl border border-line-interactive bg-surface px-3 py-2 focus-within:border-line-emphasis">
          <Search size={16} className="shrink-0 text-tertiary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && matches[0]) {
                onSelect(matches[0].gid);
                setQuery("");
              }
            }}
            placeholder="Найти узел по gid"
            aria-label="Найти узел по gid"
            inputMode="numeric"
            className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-tertiary"
          />
        </label>
        {q.length >= 3 && (
          <div className="mt-2 flex flex-col">
            {matches.length === 0 && <p className="px-2 py-1 text-sm text-tertiary">Нет узла с такими цифрами</p>}
            {matches.map((n) => (
              <NodeRow key={n.gid} node={n} active={n.gid === selected} onClick={() => { onSelect(n.gid); setQuery(""); }} />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-1 px-3">
        {(Object.keys(TABS) as (keyof typeof TABS)[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={clsx("rounded-lg px-3 py-1 text-sm transition-colors duration-[120ms]", tab === t ? "bg-sunk text-primary" : "text-secondary hover:text-primary")}
          >
            {TABS[t]}
          </button>
        ))}
      </div>
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-2">
        {tab === "resilience" ? (
          <ResiliencePanel datasetId={datasetId} />
        ) : tab === "top"
          ? data.nodes.slice(0, TOP_N).map((n) => <NodeRow key={n.gid} node={n} active={n.gid === selected} onClick={() => onSelect(n.gid)} />)
          : data.clusters.map((c) => (
              <button
                key={c.cluster_id}
                type="button"
                onClick={() => onSelect(c.top_gids.split(" ")[0])}
                className="flex w-full flex-col gap-1 rounded-lg px-2 py-2 text-left transition-colors duration-[120ms] hover:bg-highlight"
              >
                <span className="flex items-center gap-2 text-sm text-primary">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: CLUSTER_COLORS[c.cluster_id] ?? "var(--color-tertiary)" }} />
                  Кластер {c.cluster_id}
                  <span className="text-tertiary">· {c.n_nodes} узл. · seed {c.n_seed} · {fmtShort(c.sum_kzt_internal)} ₸</span>
                </span>
                <span className="line-clamp-2 text-xs text-secondary">{c.hypothesis}</span>
              </button>
            ))}
      </div>
    </aside>
  );
}

function NodeRow({ node, active, onClick }: { node: NetworkNode; active: boolean; onClick: () => void }) {
  const role = TASK_ROLES[node.role];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active || undefined}
      className={clsx("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-[120ms]", active ? "bg-sunk" : "hover:bg-highlight")}
    >
      <span className="w-7 shrink-0 text-right text-xs text-tertiary tabular-nums">{node.rank}</span>
      <span className="size-2.5 shrink-0 rounded-full" style={{ background: role.color }} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono text-xs text-primary">{node.gid}</span>
        <span className="block truncate text-xs text-secondary">{role.label}{node.is_seed ? " · seed" : ""}</span>
      </span>
      <span className="shrink-0 text-xs text-tertiary tabular-nums">{node.priority_score.toFixed(2)}</span>
    </button>
  );
}

// ---------------------------------------------------------------- resilience

/** What removing the top-priority nodes does to the network, against removing as many random nodes. */
function ResiliencePanel({ datasetId }: { datasetId: string }) {
  const { data } = useResilience(datasetId);
  if (!data) return <div className="p-2"><Skeleton height="120px" /></div>;
  const base = data.baseline;
  const drop = (v: number) => `−${Math.round((1 - v / base.reachable_from_seeds) * 100)}%`;
  return (
    <div className="flex flex-col gap-3 px-2 py-1 text-xs">
      <p className="text-secondary">
        Что будет с сетью, если изъять узлы с вершины рейтинга, и для сравнения — столько же случайных узлов
        (среднее по 20 попыткам). Seed не изымаются.
      </p>
      <p className="text-tertiary">
        Сейчас: деньги от seed доходят до {fmtInt(base.reachable_from_seeds)} узлов, крупнейший фрагмент {fmtInt(base.largest_fragment)}, фрагментов {base.fragments}.
      </p>
      <table className="w-full tabular-nums">
        <thead className="text-tertiary">
          <tr>
            <th className="py-1 text-left font-normal">Изъято</th>
            <th className="py-1 text-right font-normal">Достижимо от seed</th>
            <th className="py-1 text-right font-normal">Фрагментов</th>
          </tr>
        </thead>
        <tbody>
          {data.steps.map((s) => (
            <tr key={s.removed} className="border-t border-line">
              <td className="py-1.5 text-secondary">топ-{s.removed}<br /><span className="text-tertiary">случайные</span></td>
              <td className="py-1.5 text-right">
                <span className="text-primary">{fmtInt(s.top.reachable_from_seeds)} <span className="text-danger">{drop(s.top.reachable_from_seeds)}</span></span>
                <br />
                <span className="text-tertiary">{fmtInt(Math.round(s.random.reachable_from_seeds))} {drop(s.random.reachable_from_seeds)}</span>
              </td>
              <td className="py-1.5 text-right">
                <span className="text-primary">{s.top.fragments}</span>
                <br />
                <span className="text-tertiary">{Math.round(s.random.fragments)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------- legend

function Legend({ data, mode }: { data: Network; mode: ColorMode }) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const n of data.nodes) c[n.role] = (c[n.role] ?? 0) + 1;
    return c;
  }, [data]);
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 hidden flex-col gap-1 rounded-xl border border-line bg-surface/90 p-3 text-xs shadow-s sm:flex">
      {mode === "role"
        ? Object.entries(TASK_ROLES).map(([key, r]) => (
            <span key={key} className="flex items-center gap-2 text-secondary">
              <span className="size-2.5 rounded-full" style={{ background: r.color }} />
              {r.label} <span className="text-tertiary tabular-nums">{fmtInt(counts[key] ?? 0)}</span>
            </span>
          ))
        : CLUSTER_COLORS.map((color, i) => (
            <span key={i} className="flex items-center gap-2 text-secondary">
              <span className="size-2.5 rounded-full" style={{ background: color }} />
              Кластер {i} <span className="text-tertiary">{data.clusters[i]?.n_nodes ?? 0} узл.</span>
            </span>
          ))}
      <span className="mt-1 flex items-center gap-3 text-tertiary">
        <span className="flex items-center gap-1"><span className="h-0.5 w-3" style={{ background: IN_EDGE }} /> вход</span>
        <span className="flex items-center gap-1"><span className="h-0.5 w-3" style={{ background: OUT_EDGE }} /> выход</span>
        <span>размер = приоритет</span>
      </span>
    </div>
  );
}

// ---------------------------------------------------------------- right: node card

function NodeCard({ data, gid, onSelect }: { data: Network; gid: string; onSelect: (g: string | null) => void }) {
  const byGid = useMemo(() => new Map(data.nodes.map((n) => [n.gid, n])), [data]);
  const node = byGid.get(gid);
  const { senders, receivers } = useMemo(() => {
    const s = data.edges.filter((e) => e.target === gid).sort((a, b) => b.sum_kzt - a.sum_kzt);
    const r = data.edges.filter((e) => e.source === gid).sort((a, b) => b.sum_kzt - a.sum_kzt);
    return { senders: s, receivers: r };
  }, [data, gid]);
  if (!node) return null;
  const role = TASK_ROLES[node.role];
  const cluster = data.clusters.find((c) => c.cluster_id === node.cluster_id);
  const shared = node.in_sum_kzt > 0 && !node.is_seed && !node.censored ? node.out_sum_kzt / node.in_sum_kzt : null;
  const peers = [
    ["по числу плательщиков", node.peer_in_degree],
    ["по числу получателей", node.peer_out_degree],
    ["по обороту", node.peer_volume],
    ["по посредничеству", node.peer_betweenness],
  ] as const;

  return (
    <aside className="scrollbar-thin flex max-h-[60vh] w-full shrink-0 flex-col gap-4 overflow-y-auto border-line p-4 md:max-h-none md:w-96 md:border-l">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-sm break-all text-primary select-all">{node.gid}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-primary">
            <span className="size-2.5 rounded-full" style={{ background: role.color }} />
            {role.label}
            <span className="text-tertiary">· уверенность {node.role_score.toFixed(2)}</span>
          </p>
        </div>
        <IconAction label="Закрыть" icon={<X size="1em" />} onClick={() => onSelect(null)} />
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <Chip>#{node.rank} · приоритет {node.priority_score.toFixed(2)}</Chip>
        <Chip>Кластер {node.cluster_id}</Chip>
        <Chip>{node.depth === 0 ? "seed" : `${node.depth}-е колено`}</Chip>
        {node.censored && <Chip tone="warn">граница обхода: исходящие не видны</Chip>}
      </div>

      <div>
        <p className="mb-1 text-xs text-tertiary">Почему эта роль</p>
        <p className="text-sm text-primary">{node.evidence}</p>
        <p className="mt-1 text-xs text-tertiary">{role.label}: {role.hint}.</p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <Metric label="Получил" value={kzt(node.in_sum_kzt)} sub={`${node.in_tx} пер. от ${node.in_degree}`} />
        <Metric label="Отправил" value={node.censored ? "не видно" : kzt(node.out_sum_kzt)} sub={node.censored ? "4-е колено" : `${node.out_tx} пер. ${node.out_degree} получ.`} />
        <Metric label="Отдал дальше" value={shared == null ? "—" : shared > 1 ? `×${shared.toFixed(1)}` : pctOf(shared)} sub={shared == null ? (node.is_seed ? "у seed вход не виден" : "нельзя посчитать") : shared > 1 ? "больше видимого входа" : "от видимого входа"} />
        <Metric label="Деньги от seed" value={String(node.seeds_upstream)} sub={`${node.seeds_direct} напрямую`} />
        <Metric label="Уходит ≤ 2 дней" value={pctOf(node.fast_out_share)} sub="после поступления" />
      </dl>

      <div>
        <p className="mb-1 text-xs text-tertiary">Сравнение с {node.depth === 0 ? "другими seed" : `узлами ${node.depth}-го колена`} (доля узлов с меньшим значением)</p>
        <div className="flex flex-col gap-1">
          {peers.map(([label, v]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className="w-40 shrink-0 text-secondary">{label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunk">
                {v != null && <span className="block h-full rounded-full bg-accent" style={{ width: `${v * 100}%` }} />}
              </span>
              <span className="w-9 text-right text-tertiary tabular-nums">{pctOf(v)}</span>
            </div>
          ))}
        </div>
      </div>

      <Counterparties title="Плательщики" icon={<ArrowDownLeft size={14} style={{ color: IN_EDGE }} />} edges={senders} pick={(e) => e.source} byGid={byGid} onSelect={onSelect} />
      <Counterparties title="Получатели" icon={<ArrowUpRight size={14} style={{ color: OUT_EDGE }} />} edges={receivers} pick={(e) => e.target} byGid={byGid} onSelect={onSelect} empty={node.censored ? "Не видно: узел на границе обхода" : "Исходящих ≥ 5 000 ₸ нет"} />

      {cluster && (
        <div>
          <p className="mb-1 text-xs text-tertiary">Кластер {cluster.cluster_id} · {cluster.n_nodes} узл. · seed {cluster.n_seed}</p>
          <p className="text-xs text-secondary">{cluster.hypothesis}</p>
        </div>
      )}
    </aside>
  );
}

function Chip({ children, tone }: { children: ReactNode; tone?: "warn" }) {
  return <span className={clsx("rounded-full px-2 py-0.5", tone === "warn" ? "bg-alert-bg text-alert" : "bg-sunk text-secondary")}>{children}</span>;
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <dt className="text-xs text-tertiary">{label}</dt>
      <dd className="text-primary tabular-nums">{value}</dd>
      {sub && <dd className="text-xs text-tertiary">{sub}</dd>}
    </div>
  );
}

function Counterparties({ title, icon, edges, pick, byGid, onSelect, empty }: {
  title: string;
  icon: ReactNode;
  edges: Network["edges"];
  pick: (e: Network["edges"][number]) => string;
  byGid: Map<string, NetworkNode>;
  onSelect: (g: string) => void;
  empty?: string;
}) {
  const [all, setAll] = useState(false);
  const shown = all ? edges : edges.slice(0, 8);
  return (
    <div>
      <p className="mb-1 flex items-center gap-1 text-xs text-tertiary">{icon}{title} · {edges.length}</p>
      {edges.length === 0 && <p className="text-xs text-tertiary">{empty ?? "Нет"}</p>}
      <div className="flex flex-col">
        {shown.map((e) => {
          const other = byGid.get(pick(e));
          return (
            <button
              key={`${e.source}-${e.target}`}
              type="button"
              onClick={() => onSelect(pick(e))}
              className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs transition-colors duration-[120ms] hover:bg-highlight"
            >
              <span className="size-2 shrink-0 rounded-full" style={{ background: other ? TASK_ROLES[other.role].color : undefined }} />
              <span className="min-w-0 flex-1 truncate font-mono text-primary">{pick(e)}</span>
              <span className="shrink-0 text-tertiary tabular-nums">{e.n_tx} пер. · {kzt(e.sum_kzt)}</span>
            </button>
          );
        })}
      </div>
      {edges.length > 8 && (
        <button type="button" onClick={() => setAll(!all)} className="mt-1 px-1.5 text-xs text-secondary transition-colors duration-[120ms] hover:text-primary">
          {all ? "Свернуть" : `Показать все ${edges.length}`}
        </button>
      )}
    </div>
  );
}
