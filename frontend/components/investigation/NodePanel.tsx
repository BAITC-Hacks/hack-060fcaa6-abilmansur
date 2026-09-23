"use client";

import { Button } from "@inv/ui";
import clsx from "clsx";
import { Link2, MessageCircleQuestion, MousePointerClick, ShieldQuestion } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { Badge, SectionLabel, rowPress } from "@/components/ui";
import { useApi, type AccountCard, type Member } from "@/lib/api";
import { ROLES, fmtDate, fmtInt, fmtMoney } from "@/lib/format";

/** Same questions the backend builds for these modes (ASK_TEMPLATES), shown as the user's message in the chat. */
export const ASKS = [
  {
    mode: "why", label: "Почему он здесь?", icon: MessageCircleQuestion,
    question: (a: string) => `Почему счёт ${a} включён в версию? Какие конкретные транзакции и признаки это обосновывают?`,
  },
  {
    mode: "connections", label: "Что связывает с остальными?", icon: Link2,
    question: (a: string) => `Что связывает счёт ${a} с остальными участниками? Покажи конкретные переводы и участок графа.`,
  },
  {
    mode: "challenge", label: "Проверь альтернативное объяснение", icon: ShieldQuestion,
    question: (a: string) => `Проверь альтернативное (обычное) объяснение для счёта ${a}.`,
  },
] as const;

export type AskMode = (typeof ASKS)[number]["mode"];

export function NodePanel({
  investigationId, account, member, refreshKey, busy, onShowTx, onSelectNode, onAsk,
}: {
  investigationId: string;
  account: string | null;
  member?: Member;
  refreshKey: number;
  /** Asking is unavailable (a run is in progress, or this view is outside its investigation's thread). */
  busy: boolean;
  onShowTx: (ids: string[]) => void;
  onSelectNode: (id: string) => void;
  /** Sends the question through the chat (the answer streams into the thread). */
  onAsk?: (mode: AskMode, account: string) => void;
}) {
  const { data: card } = useApi<AccountCard>(
    account ? `/investigations/${investigationId}/accounts/${encodeURIComponent(account)}?r=${refreshKey}` : null,
    { keepPreviousData: true },
  );

  if (!account) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="text-tertiary">
          <MousePointerClick size={32} />
        </span>
        <p className="text-sm text-secondary">Выберите узел на графе, чтобы увидеть основания включения и задать вопрос агенту.</p>
      </div>
    );
  }

  const role = ROLES[member?.role ?? "context"];

  return (
    <div className="scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={account}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3 rounded-xl border border-line p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full text-white" style={{ background: role.color }}>
              <span className="text-[11px] font-semibold">{role.short}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-sm font-medium text-primary">{account}</p>
              <p className="text-xs text-secondary">
                {role.label}
                {card?.summary.account_type && ` · ${card.summary.account_type === "legal" ? "юрлицо" : "физлицо"}`}
              </p>
            </div>
            {member && (
              <div className="text-right">
                <p className="text-lg font-semibold text-primary tabular-nums">{Math.round(member.confidence * 100)}%</p>
                <p className="text-[11px] text-secondary">уверенность</p>
              </div>
            )}
          </div>

          {member ? (
            <div className="flex flex-col gap-2">
              <Reason title="Основание включения" tone="border-accent">{member.inclusion_basis}</Reason>
              <Reason title="Альтернатива" tone="border-alert">{member.alternative_explanation}</Reason>
              <Reason title="Не хватает" tone="border-line-emphasis">{member.missing_information}</Reason>
            </div>
          ) : (
            <p className="rounded-xl bg-sunk p-3 text-sm text-secondary">Счёт не входит в выбранную версию — это контрагент участников.</p>
          )}

          <section className="flex flex-col gap-1">
            <SectionLabel className="pb-1">Спросить агента</SectionLabel>
            {ASKS.map((a) => (
              <button
                key={a.mode}
                type="button"
                disabled={busy || !onAsk}
                onClick={() => onAsk?.(a.mode, account)}
                className={clsx(rowPress, "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-primary")}
              >
                <a.icon size={16} className="shrink-0 text-secondary" />
                <span className="flex-1">{a.label}</span>
              </button>
            ))}
            {busy && <p className="px-2 text-xs text-secondary">Агент занят текущим запуском — вопрос можно задать после него.</p>}
            {!onAsk && <p className="px-2 text-xs text-secondary">Откройте расследование, чтобы задать вопрос агенту.</p>}
          </section>

          {card?.answers && card.answers.length > 0 && (
            <section className="flex flex-col gap-2">
              <SectionLabel>Ответы агента</SectionLabel>
              {card.answers.map((a) => (
                <div key={a.id} className="rounded-xl border border-line p-3 text-sm leading-5">
                  <p className="text-xs font-medium text-secondary">{a.question}</p>
                  <p className="mt-1 whitespace-pre-wrap text-primary">{a.answer}</p>
                  {a.tx_ids.length > 0 && (
                    <Button variant="secondary" size="extra-small" onClick={() => onShowTx(a.tx_ids)} className="mt-2">
                      Открыть {a.tx_ids.length} перев. на графе
                    </Button>
                  )}
                </div>
              ))}
            </section>
          )}

          {card && (
            <section className="flex flex-col gap-2">
              <SectionLabel>Активность в данных</SectionLabel>
              <div className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line text-center">
                <Mini label="Входящих" value={fmtInt(card.summary.in_count)} />
                <Mini label="Исходящих" value={fmtInt(card.summary.out_count)} />
                <Mini label="Период" value={fmtDate(card.summary.first_ts)} sub={`— ${fmtDate(card.summary.last_ts)}`} />
              </div>
              <div className="flex flex-col">
                {card.top_counterparties.slice(0, 8).map((c) => (
                  <button
                    key={`${c.counterparty}-${c.direction}-${c.currency}`}
                    type="button"
                    onClick={() => onSelectNode(c.counterparty)}
                    className={clsx(rowPress, "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs")}
                  >
                    <Badge tone={c.direction === "in" ? "info" : "alert"}>{c.direction === "in" ? "от" : "кому"}</Badge>
                    <span className="flex-1 truncate font-mono text-primary">{c.counterparty}</span>
                    <span className="text-secondary">{c.n}×</span>
                    <span className="text-primary tabular-nums">{fmtMoney(c.amount, c.currency)}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Reason({ title, tone, children }: { title: string; tone: string; children: ReactNode }) {
  if (!children) return null;
  return (
    <div className={clsx("border-l-2 py-0.5 pl-3", tone)}>
      <p className="text-xs text-secondary">{title}</p>
      <p className="mt-0.5 text-sm leading-5 text-primary">{children}</p>
    </div>
  );
}

function Mini({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-2 py-2.5">
      <p className="text-[11px] text-secondary">{label}</p>
      <p className="text-sm font-semibold text-primary">{value}</p>
      {sub && <p className="text-[11px] text-secondary">{sub}</p>}
    </div>
  );
}
