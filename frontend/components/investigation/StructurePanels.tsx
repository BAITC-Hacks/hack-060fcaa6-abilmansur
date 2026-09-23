"use client";

import { Button } from "@inv/ui";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

import { Badge, rowPress, type Tone } from "@/components/ui";
import type { Link, Member, Version } from "@/lib/api";
import { ROLES, fmtDate, fmtInt, fmtTotals } from "@/lib/format";

const MEMBER_STATUS: Record<Member["status"], { label: string; tone: Tone }> = {
  included: { label: "в группе", tone: "success" },
  uncertain: { label: "под вопросом", tone: "alert" },
  excluded: { label: "исключён", tone: "neutral" },
};

const LINK_KIND: Record<Link["kind"], string> = {
  transfer: "Переводы",
  coordination: "Согласованность",
  shared_counterparty: "Общий контрагент",
};

const LINK_STATUS: Record<Link["status"], { label: string; tone: Tone }> = {
  active: { label: "активна", tone: "success" },
  weak: { label: "ослаблена", tone: "alert" },
  removed: { label: "снята", tone: "neutral" },
};

const ORDER: Record<Member["status"], number> = { included: 0, uncertain: 1, excluded: 2 };

/** Accounts of the version with their observed role and confidence; click opens the node. */
export function MembersPanel({ version, selected, onSelectNode }: { version?: Version; selected: string | null; onSelectNode: (id: string) => void }) {
  const members = [...(version?.members ?? [])].sort((a, b) => ORDER[a.status] - ORDER[b.status] || b.confidence - a.confidence);
  if (!members.length) return <Empty>Участников в этой версии пока нет.</Empty>;
  return (
    <div className="scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4">
      {members.map((m) => {
        const role = ROLES[m.role] ?? ROLES.unclear;
        const status = MEMBER_STATUS[m.status];
        return (
          <button
            key={m.account_id}
            type="button"
            onClick={() => onSelectNode(m.account_id)}
            aria-pressed={selected === m.account_id}
            className={clsx(rowPress, "flex w-full items-center gap-3 rounded-lg px-2 py-2", selected === m.account_id && "bg-sunk")}
          >
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: role.color }} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-mono text-sm text-primary">{m.account_id}</span>
              <span className="truncate text-xs text-secondary">{role.label}</span>
            </span>
            {m.status !== "included" && <Badge tone={status.tone}>{status.label}</Badge>}
            <span className="w-10 shrink-0 text-right text-sm font-medium text-primary tabular-nums">{Math.round(m.confidence * 100)}%</span>
          </button>
        );
      })}
    </div>
  );
}

/** Links between accounts: direction, kind, recomputed stats and the agent's rationale. */
export function LinksPanel({
  version, onSelectNode, onShowTx,
}: { version?: Version; onSelectNode: (id: string) => void; onShowTx: (ids: string[]) => void }) {
  const links = [...(version?.links ?? [])].sort((a, b) => (b.stats?.tx_count ?? 0) - (a.stats?.tx_count ?? 0));
  if (!links.length) return <Empty>Связей в этой версии пока нет.</Empty>;
  return (
    <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
      {links.map((l) => {
        const status = LINK_STATUS[l.status];
        return (
          <div key={l.id} className={clsx("rounded-xl border border-line px-3.5 py-3 text-sm leading-5", l.status === "removed" && "opacity-60")}>
            <div className="flex flex-wrap items-center gap-1.5">
              <NodeChip id={l.source} onClick={onSelectNode} />
              <ArrowRight size={14} className="shrink-0 text-secondary" />
              <NodeChip id={l.target} onClick={onSelectNode} />
              <span className="ml-auto flex items-center gap-1.5">
                <Badge>{LINK_KIND[l.kind] ?? l.kind}</Badge>
                {l.status !== "active" && <Badge tone={status.tone}>{status.label}</Badge>}
              </span>
            </div>
            {l.stats && (
              <p className="mt-1.5 text-xs text-secondary">
                {fmtInt(l.stats.tx_count)} перев. · {fmtTotals(l.stats.totals_by_currency)}
                {l.stats.period?.start && ` · ${fmtDate(l.stats.period.start)} – ${fmtDate(l.stats.period.end)}`}
              </p>
            )}
            {l.rationale && <p className="mt-1.5 text-primary">{l.rationale}</p>}
            {l.tx_ids.length > 0 && (
              <Button variant="secondary" size="extra-small" className="mt-2" onClick={() => onShowTx(l.tx_ids)}>
                Показать на графе
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NodeChip({ id, onClick }: { id: string; onClick: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="h-6 cursor-pointer rounded-md bg-highlight-strong px-2 font-mono text-[11px] text-primary transition-colors duration-[120ms] hover:bg-elevated"
    >
      {id}
    </button>
  );
}

const Empty = ({ children }: { children: React.ReactNode }) => <p className="py-8 text-center text-sm text-secondary">{children}</p>;
