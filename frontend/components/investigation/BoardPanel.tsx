"use client";

import { Button } from "@inv/ui";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Badge, ease, rowPress, type Tone } from "@/components/ui";
import type { Board, Trail, Version } from "@/lib/api";
import { CANDIDATE_STATUS, CERTAINTY, PATTERNS, ROLES, VERSION_STATUS } from "@/lib/format";

const OBJECTION: Record<"open" | "refuted" | "accepted", { label: string; tone: Tone }> = {
  open: { label: "открыто", tone: "alert" },
  refuted: { label: "опровергнуто", tone: "success" },
  accepted: { label: "принято", tone: "info" },
};

export function BoardPanel({
  board, versionId, onVersion, onShowTx, onSelectNode,
}: {
  board: Board;
  versionId: string | null;
  onVersion: (id: string) => void;
  onShowTx: (ids: string[]) => void;
  onSelectNode: (id: string) => void;
}) {
  const version = board.versions.find((v) => v.id === versionId);
  const passport = board.investigation.passport as { period?: string; currencies?: string[]; limitations?: string[]; quality_issues?: string[] } | null;
  return (
    <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
      <Section title="Версии" count={board.versions.length} defaultOpen>
        {board.versions.map((v) => (
          <VersionCard key={v.id} v={v} active={v.id === versionId} onClick={() => onVersion(v.id)} parent={board.versions.find((p) => p.id === v.parent_id)} />
        ))}
        {board.versions.length === 0 && <Empty>Версий пока нет — агент создаст их на этапе «Структура».</Empty>}
      </Section>

      {version && (
        <>
          <Section title="Маршруты денег" count={version.trails.length} defaultOpen>
            {version.trails.map((t) => <TrailCard key={t.id} t={t} onShowTx={onShowTx} onSelectNode={onSelectNode} />)}
            {version.trails.length === 0 && <Empty>Маршрутов в этой версии нет.</Empty>}
          </Section>
          <Section title="Возражения" count={version.objections.length} defaultOpen>
            {version.objections.map((o) => (
              <Item key={o.id}>
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-primary">{o.text}</p>
                  <Badge tone={OBJECTION[o.status].tone}>{OBJECTION[o.status].label}</Badge>
                </div>
                {o.resolution && <p className="mt-1 text-xs text-secondary">{o.resolution}</p>}
              </Item>
            ))}
            {version.objections.length === 0 && <Empty>Возражений ещё нет — версия не проходила опровержение.</Empty>}
          </Section>
          <Section title="Открытые вопросы" count={version.open_questions.length}>
            {version.open_questions.map((q) => <Item key={q.id}>{q.text}</Item>)}
            {version.open_questions.length === 0 && <Empty>Нет.</Empty>}
          </Section>
        </>
      )}

      <Section title="Очередь кандидатов" count={board.candidates.length}>
        {board.candidates.map((c) => (
          <Item key={c.id}>
            <div className="flex items-start gap-2">
              <p className={clsx("flex-1 font-medium", c.status === "dismissed" ? "text-secondary line-through" : "text-primary")}>{c.label}</p>
              <Badge tone={CANDIDATE_STATUS[c.status]?.tone}>{CANDIDATE_STATUS[c.status]?.label}</Badge>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {c.patterns.map((p) => <Badge key={p}>{PATTERNS[p] ?? p}</Badge>)}
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-highlight-strong" title={`Приоритет ${Math.round(c.priority * 100)}%`}>
              <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${c.priority * 100}%` }} transition={{ duration: 0.8, ease }} />
            </div>
            {c.notes && <p className="mt-1.5 text-xs text-secondary">{c.notes}</p>}
          </Item>
        ))}
        {board.candidates.length === 0 && <Empty>Очередь пуста.</Empty>}
      </Section>

      <Section title="Исследованные части сети" count={board.coverage.length}>
        {board.coverage.map((c) => (
          <Item key={c.id}>
            <p className="font-medium text-primary">{c.scope}</p>
            <p className="text-xs text-secondary">{c.method}</p>
            <p className="mt-1 text-xs text-primary">{c.result}</p>
          </Item>
        ))}
        {board.coverage.length === 0 && <Empty>Агент ещё не делал обзор сети.</Empty>}
      </Section>

      <Section title="Паспорт датасета">
        {passport ? (
          <Item className="flex flex-col gap-2">
            <p><span className="text-secondary">Период:</span> {passport.period}</p>
            <p><span className="text-secondary">Валюты:</span> {passport.currencies?.join(", ")}</p>
            <List title="Ограничения" items={passport.limitations} />
            <List title="Качество данных" items={passport.quality_issues} />
          </Item>
        ) : (
          <Empty>Паспорт ещё не составлен.</Empty>
        )}
      </Section>
    </div>
  );
}

function VersionCard({ v, active, onClick, parent }: { v: Version; active: boolean; onClick: () => void; parent?: Version }) {
  const included = v.members.filter((m) => m.status === "included");
  const byRole = Object.entries(
    included.reduce<Record<string, number>>((acc, m) => ({ ...acc, [m.role]: (acc[m.role] ?? 0) + 1 }), {}),
  );
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        rowPress,
        "block w-full rounded-xl border px-3.5 py-3 text-sm leading-5",
        active ? "border-line-emphasis bg-sunk-light" : "border-line",
      )}
    >
      <div className="flex items-start gap-2">
        <p className="flex-1 font-medium text-primary">{v.title}</p>
        <Badge tone={VERSION_STATUS[v.status]?.tone}>{VERSION_STATUS[v.status]?.label}</Badge>
      </div>
      {parent && <p className="text-xs text-secondary">пересматривает «{parent.title}»</p>}
      <p className="mt-1 line-clamp-3 text-xs text-secondary">{v.summary}</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex -space-x-1">
          {byRole.map(([role, n]) => (
            <span
              key={role}
              title={`${ROLES[role as keyof typeof ROLES]?.label}: ${n}`}
              className="grid size-5 place-items-center rounded-full border-2 border-surface text-[9px] font-bold text-white"
              style={{ background: ROLES[role as keyof typeof ROLES]?.color }}
            >
              {n}
            </span>
          ))}
        </div>
        <span className="text-xs text-secondary">{included.length} участников · {v.evidence.length} доказ.</span>
        {v.confidence != null && (
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-primary">
            <span className="h-1 w-10 overflow-hidden rounded-full bg-highlight-strong">
              <motion.span className="block h-full rounded-full bg-inverted" initial={{ width: 0 }} animate={{ width: `${v.confidence * 100}%` }} />
            </span>
            {Math.round(v.confidence * 100)}%
          </span>
        )}
      </div>
    </button>
  );
}

function TrailCard({ t, onShowTx, onSelectNode }: { t: Trail; onShowTx: (ids: string[]) => void; onSelectNode: (id: string) => void }) {
  const cert = CERTAINTY[t.verification.certainty];
  const nodes = [t.steps[0]?.from, ...t.steps.map((s) => s.to)];
  const hopBy = new Map(t.verification.hops.map((h) => [h.node, h]));
  return (
    <Item>
      <p className="font-medium text-primary">{t.title}</p>
      {cert && <Badge tone={cert.tone} className="mt-1">{cert.label}</Badge>}
      <div className="mt-3 flex flex-wrap items-center gap-y-2">
        {nodes.map((n, i) => {
          const hop = hopBy.get(n);
          return (
            <span key={`${n}-${i}`} className="flex items-center">
              {i > 0 && (
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.12 }} className="mx-1 h-px w-4 origin-left bg-line-emphasis" />
              )}
              <button
                type="button"
                onClick={() => onSelectNode(n)}
                className="h-6 cursor-pointer rounded-md bg-highlight-strong px-2 font-mono text-[11px] text-primary transition-colors duration-[120ms] hover:bg-elevated"
                title={hop ? `Доля поступлений от маршрута: ${hop.exclusive_inflow_share != null ? Math.round(hop.exclusive_inflow_share * 100) + "%" : "—"}, других отправителей: ${hop.other_senders_in_window}` : undefined}
              >
                {n}
                {hop && hop.exclusive_inflow_share != null && hop.exclusive_inflow_share < 0.999 && (
                  <span className="ml-1 text-alert">{Math.round(hop.exclusive_inflow_share * 100)}%</span>
                )}
              </button>
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-xs leading-4 text-secondary">{t.verification.note}</p>
      <Button variant="secondary" size="extra-small" onClick={() => onShowTx(t.steps.flatMap((s) => s.tx_ids))} className="mt-2">
        Показать маршрут на графе
      </Button>
    </Item>
  );
}

/** Collapsible group, headed like the template's thread-list group label. */
function Section({ title, count, children, defaultOpen = false }: { title: string; count?: number; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={clsx(rowPress, "flex w-full items-center gap-2 rounded-lg px-1.5 py-1.5")}
      >
        <span className="flex-1 text-sm text-secondary">{title}</span>
        {count != null && <span className="text-xs text-secondary tabular-nums">{count}</span>}
        <motion.span animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.15 }} className="text-secondary">
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Item({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("rounded-xl border border-line px-3.5 py-2.5 text-sm leading-5 text-primary", className)}>{children}</div>;
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-secondary">{title}:</p>
      <ul className="ml-4 list-disc">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

const Empty = ({ children }: { children: ReactNode }) => <p className="px-1.5 py-1 text-xs text-secondary">{children}</p>;
