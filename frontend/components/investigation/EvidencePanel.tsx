"use client";

import { Button } from "@inv/ui";
import clsx from "clsx";
import { AlertCircle, CheckCircle2, RefreshCw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { Badge, IconAction, Skeleton, ease, rowPress, textLink, type Tone } from "@/components/ui";
import { post, useApi, type Check, type Evidence, type EvidenceSummary } from "@/lib/api";
import { PATTERNS, fmtDate, fmtInt, fmtMoney, fmtTotals } from "@/lib/format";

const VSTATUS: Record<EvidenceSummary["verification"]["status"], { label: string; tone: Tone; icon: typeof CheckCircle2 }> = {
  verified: { label: "Проверено", tone: "success", icon: CheckCircle2 },
  warning: { label: "С предупреждениями", tone: "alert", icon: AlertCircle },
  failed: { label: "Не прошло", tone: "danger", icon: AlertCircle },
};

export function EvidencePanel({
  investigationId, items, onShowTx, onSelectNode,
}: {
  investigationId: string;
  items: EvidenceSummary[];
  onShowTx: (ids: string[]) => void;
  onSelectNode: (id: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {items.length === 0 && <p className="py-8 text-center text-sm text-secondary">Доказательств в этой версии пока нет.</p>}
        {items.map((e, i) => {
          const v = VSTATUS[e.verification.status];
          return (
            <motion.button
              key={e.id}
              type="button"
              onClick={() => setOpen(e.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className={clsx(rowPress, "block w-full rounded-xl border border-line px-3.5 py-3 text-sm leading-5")}
            >
              <div className="flex items-start gap-2">
                <p className="flex-1 font-medium text-primary">{e.title}</p>
                <Badge tone={v.tone}><v.icon size={12} />{v.label}</Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-secondary">{e.claim}</p>
              <p className="mt-1.5 text-xs text-secondary">
                {fmtInt(e.verification.recomputed.tx_count)} перев. · {fmtTotals(e.verification.recomputed.totals_by_currency)}
                {e.pattern ? ` · ${PATTERNS[e.pattern] ?? e.pattern}` : ""}
              </p>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {open && (
          <EvidenceDrawer
            key={open}
            investigationId={investigationId}
            evidenceId={open}
            onClose={() => setOpen(null)}
            onShowTx={(ids) => { onShowTx(ids); setOpen(null); }}
            onSelectNode={(id) => { onSelectNode(id); setOpen(null); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function EvidenceDrawer({
  investigationId, evidenceId, onClose, onShowTx, onSelectNode,
}: {
  investigationId: string;
  evidenceId: string;
  onClose: () => void;
  onShowTx: (ids: string[]) => void;
  onSelectNode: (id: string) => void;
}) {
  const { data: ev } = useApi<Evidence>(`/investigations/${investigationId}/evidence/${evidenceId}`);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
      <div className="absolute inset-0 bg-overlay" onClick={onClose} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Пакет доказательств"
        initial={{ x: 32, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 32, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative flex h-full w-full max-w-[640px] flex-col overflow-hidden border-l border-line bg-surface shadow-2xl"
      >
        <header className="flex items-start gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-secondary">Пакет доказательств · {evidenceId}</p>
            <h3 className="mt-0.5 text-lg font-medium text-primary">{ev?.title ?? "…"}</h3>
          </div>
          <IconAction label="Закрыть" icon={<X size="1em" />} onClick={onClose} />
        </header>
        <EvidenceDetail investigationId={investigationId} evidenceId={evidenceId} onShowTx={onShowTx} onSelectNode={onSelectNode} />
      </motion.aside>
    </motion.div>
  );
}

/** Full evidence packet: claim, recomputed stats, app checks, SQL/script, transactions.
 *  Used by the drawer and by the evidence artifact view. */
export function EvidenceDetail({
  investigationId, evidenceId, onShowTx, onSelectNode,
}: {
  investigationId: string;
  evidenceId: string;
  onShowTx?: (ids: string[]) => void;
  onSelectNode?: (id: string) => void;
}) {
  const { data: ev, mutate } = useApi<Evidence>(`/investigations/${investigationId}/evidence/${evidenceId}`);
  const [rechecking, setRechecking] = useState(false);
  const recheck = async () => {
    setRechecking(true);
    try {
      await post(`/investigations/${investigationId}/evidence/${evidenceId}/reverify`);
      await mutate();
    } finally {
      setRechecking(false);
    }
  };
  const claimed = (ev?.claimed ?? {}) as { tx_count?: number; total_amount?: number; currency?: string };
  return !ev ? (
          <div className="p-5"><Skeleton count={4} height="24px" /></div>
        ) : (
          <div className="scrollbar-thin flex flex-col gap-6 overflow-y-auto p-5 text-sm leading-5 text-primary">
            <p className="text-base leading-6">{ev.claim}</p>
            <div className="flex flex-wrap gap-1.5">
              {ev.observed_features.map((f) => <Badge key={f}>{f}</Badge>)}
            </div>

            <div className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
              <Stat label="Период анализа" value={`${fmtDate(ev.period_start)} – ${fmtDate(ev.period_end)}`} />
              <Stat label="Переводов (пересчёт)" value={fmtInt(ev.verification.recomputed.tx_count)} sub={claimed.tx_count != null ? `заявлено ${fmtInt(claimed.tx_count)}` : undefined} />
              <Stat
                label="Сумма (пересчёт)"
                value={fmtTotals(ev.verification.recomputed.totals_by_currency)}
                sub={claimed.total_amount != null ? `заявлено ${fmtMoney(claimed.total_amount, claimed.currency ?? "")}` : undefined}
              />
            </div>

            <Block title="Проверки приложения" action={
              <Button
                variant="tertiary"
                size="extra-small"
                onClick={recheck}
                disabled={rechecking}
                iconLeft={<RefreshCw size={14} className={clsx(rechecking && "animate-spin")} />}
              >
                Перепроверить по исходным данным
              </Button>
            }>
              <ul className="flex flex-col divide-y divide-line rounded-xl border border-line">
                {ev.verification.checks.map((c, i) => <CheckRow key={`${c.check}-${i}`} c={c} />)}
              </ul>
            </Block>

            {ev.query_sql && (
              <Block title={`SQL-запрос · ${ev.query_id}`}>
                <Code>{ev.query_sql}</Code>
              </Block>
            )}
            {ev.script_content && (
              <Block title={`Скрипт агента · ${ev.script_path}`} action={<span className="font-mono text-[11px] text-secondary">sha256 {ev.script_sha256?.slice(0, 12)}…</span>}>
                <Code className="max-h-72">{ev.script_content}</Code>
              </Block>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Block title="Ограничения"><p className="rounded-xl bg-sunk p-3">{ev.limitations}</p></Block>
              <Block title="Альтернативные объяснения"><p className="rounded-xl bg-sunk p-3">{ev.alternatives}</p></Block>
            </div>

            <Block
              title={`Транзакции · ${ev.transactions.length}`}
              action={onShowTx && <Button variant="primary" size="extra-small" onClick={() => onShowTx(ev.tx_ids)}>Показать на графе</Button>}
            >
              <div className="scrollbar-thin max-h-80 overflow-auto rounded-xl border border-line">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-surface text-secondary">
                    <tr>
                      <th className="px-3 py-2 font-medium">ID</th>
                      <th className="px-3 py-2 font-medium">Время</th>
                      <th className="px-3 py-2 font-medium">Откуда → куда</th>
                      <th className="px-3 py-2 text-right font-medium">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ev.transactions.map((t) => (
                      <tr key={t.tx_id} className="border-t border-line">
                        <td className="px-3 py-1.5 font-mono text-[11px] text-secondary">{t.tx_id}</td>
                        <td className="px-3 py-1.5 whitespace-nowrap text-secondary">{fmtDate(t.ts, true)}</td>
                        <td className="px-3 py-1.5 font-mono text-[11px]">
                          <button type="button" onClick={() => onSelectNode?.(t.sender_id)} disabled={!onSelectNode} className={textLink}>{t.sender_id}</button>
                          {" → "}
                          <button type="button" onClick={() => onSelectNode?.(t.receiver_id)} disabled={!onSelectNode} className={textLink}>{t.receiver_id}</button>
                        </td>
                        <td className="px-3 py-1.5 text-right whitespace-nowrap tabular-nums">{fmtMoney(t.amount, t.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>
          </div>
        );
}

function CheckRow({ c }: { c: Check }) {
  const tone = c.ok ? "text-success" : c.severity === "error" ? "text-danger" : "text-alert";
  const Glyph = c.ok ? CheckCircle2 : AlertCircle;
  return (
    <li className="flex items-start gap-2 px-3 py-2">
      <Glyph size={15} className={clsx("mt-0.5 shrink-0", tone)} />
      <span className="font-mono text-[11px] text-secondary">{c.check}</span>
      <span className="flex-1 text-right text-xs text-primary">{c.detail}</span>
    </li>
  );
}

function Code({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <pre className={clsx("scrollbar-thin overflow-auto rounded-xl border border-line bg-sunk p-4 font-mono text-xs leading-5 text-primary", className)}>
      {children}
    </pre>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-3">
      <p className="text-[11px] text-secondary">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-primary">{value}</p>
      {sub && <p className="text-[11px] text-secondary">{sub}</p>}
    </div>
  );
}

function Block({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex min-h-7 items-center gap-2">
        <h4 className="flex-1 text-sm font-medium text-secondary">{title}</h4>
        {action}
      </div>
      {children}
    </section>
  );
}
