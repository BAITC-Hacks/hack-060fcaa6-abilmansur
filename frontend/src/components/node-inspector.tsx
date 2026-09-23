"use client";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Callout,
  Card,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
} from "./primitives";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Copy,
  Network,
  Plus,
  X,
} from "lucide-react";
import { useResource } from "@/lib/use-resource";
import { money, percent } from "@/lib/api";
import type { Edge, GraphNode, Page, Transaction } from "@/lib/types";
import { ErrorNotice, Priority, RoleTag } from "./ui";
export default function NodeInspector({
  gid,
  onClose,
  onOpen,
  onGraph,
  chosen,
  onToggle,
  revision,
}: {
  gid: string;
  onClose: () => void;
  onOpen: (gid: string) => void;
  onGraph: (gid: string) => void;
  chosen: string[];
  onToggle: (gid: string) => void;
  revision: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { data: node, error } = useResource<GraphNode>(
    `nodes/${gid}?revision=${revision}`,
  );
  const [tab, setTab] = useState("overview");
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const neighbors = useResource<Page<Edge>>(
    tab === "connections"
      ? `nodes/${gid}/neighbors?limit=20&offset=${page * 20}&revision=${revision}`
      : null,
  );
  const transactions = useResource<Page<Transaction>>(
    tab === "transactions"
      ? `nodes/${gid}/transactions?limit=20&offset=${page * 20}&revision=${revision}`
      : null,
  );
  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    return () => el?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="node-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="inspector-title"
    >
      <div className="inspector-shell">
        <div className="inspector-header">
          <span className="eyebrow">Карточка участника</span>
          <IconButton
            aria-label="Закрыть карточку"
            icon={<X size={18} />}
            variant="tertiary"
            onClick={onClose}
          />
        </div>
        <div className="inspector-body">
          <h2 id="inspector-title" className="inspector-gid">
            {gid}
          </h2>
          <div className="inspector-subtitle">
            <span className="muted">Идентификатор клиента</span>
            <Button
              variant="tertiary"
              size="extra-small"
              aria-label="Скопировать gid"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(gid);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </div>
          <ErrorNotice error={error} />
          {!node && !error && <Skeleton count={5} height="56px" />}
          {node && (
            <>
              <div className="inspector-tags">
                <RoleTag role={node.role} />
                {node.is_seed && <Tag text="Seed-клиент" size="sm" />}
                <Tag text={`Кластер ${node.cluster_id + 1}`} size="sm" />
              </div>
              <div className="inspector-actions">
                <Button
                  size="small"
                  iconLeft={
                    chosen.includes(gid) ? (
                      <Check size={15} />
                    ) : (
                      <Plus size={15} />
                    )
                  }
                  disabled={!chosen.includes(gid) && chosen.length >= 20}
                  onClick={() => onToggle(gid)}
                >
                  {chosen.includes(gid) ? "В проверке" : "Добавить в проверку"}
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  iconLeft={<Network size={15} />}
                  onClick={() => onGraph(gid)}
                >
                  На графе
                </Button>
              </div>
              <Tabs
                value={tab}
                onValueChange={(value) => {
                  setTab(value);
                  setPage(0);
                }}
              >
                <TabsList>
                  <TabsTrigger value="overview" text="Обзор" />
                  <TabsTrigger value="connections" text="Связи" />
                  <TabsTrigger value="transactions" text="Операции" />
                </TabsList>
                <TabsContent value="overview">
                  <div className="detail-stack">
                    <Card variant="sunk">
                      <div className="label-row">
                        <span>Приоритет проверки</span>
                        <Priority score={node.priority_score} />
                      </div>
                      <p className="evidence">{node.evidence}</p>
                      <p className="muted small">
                        Скор роли {node.role_score.toFixed(2)} · гипотеза, не
                        вероятность нарушения
                      </p>
                    </Card>
                    <div className="flow-grid">
                      <div>
                        <span>
                          <ArrowDownLeft size={16} /> Входящие
                        </span>
                        <strong>{money(node.in_kzt)} ₸</strong>
                        <small>{node.in_degree} плательщиков</small>
                      </div>
                      <div>
                        <span>
                          <ArrowUpRight size={16} /> Исходящие
                        </span>
                        <strong>{money(node.out_kzt)} ₸</strong>
                        <small>{node.out_degree} получателей</small>
                      </div>
                    </div>
                    {node.warnings.map((w) => (
                      <Callout key={w} variant="warning" description={w} />
                    ))}
                    <section>
                      <h3>Из чего складывается приоритет</h3>
                      <div className="contributions">
                        {Object.entries(node.priority_components).map(
                          ([key, value]) => (
                            <div key={key}>
                              <span>
                                {{
                                  fanin: "Входящие связи",
                                  volume: "Оборот",
                                  seed_reach: "Пути от seed",
                                  betweenness: "Посредничество",
                                  role: "Роль",
                                }[key] || key}
                              </span>
                              <span className="contribution-track">
                                <span
                                  style={{ width: `${(value / 0.3) * 100}%` }}
                                />
                              </span>
                              <b>{value.toFixed(3)}</b>
                            </div>
                          ),
                        )}
                      </div>
                    </section>
                    <section>
                      <h3>Наблюдаемые признаки</h3>
                      <dl className="detail-facts">
                        <div>
                          <dt>Колено обхода</dt>
                          <dd>{node.depth}</dd>
                        </div>
                        <div>
                          <dt>Достижим от seed</dt>
                          <dd>{node.seed_reach}</dd>
                        </div>
                        <div>
                          <dt>Исходящие / входящие</dt>
                          <dd>
                            {node.observed_out_in_ratio === null
                              ? "Нет данных"
                              : percent(node.observed_out_in_ratio)}
                          </dd>
                        </div>
                        <div>
                          <dt>Исходящие в течение 2 дней¹</dt>
                          <dd>
                            {node.near_outgoing_day_ratio === null
                              ? "Нет данных"
                              : percent(node.near_outgoing_day_ratio)}
                          </dd>
                        </div>
                        <div>
                          <dt>Макс. плательщиков за день</dt>
                          <dd>{node.max_same_day_senders}</dd>
                        </div>
                      </dl>
                      <p className="muted small">
                        ¹ Совпадение дат не доказывает транзит одной и той же
                        суммы.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                <TabsContent value="connections">
                  <div className="detail-stack">
                    <ErrorNotice error={neighbors.error} />
                    {neighbors.loading && <Skeleton count={4} height="48px" />}
                    {neighbors.data && (
                      <>
                        <p className="muted small">
                          Наблюдаемых связей: {neighbors.data.total}
                        </p>
                        {neighbors.data.items.map((e) => {
                          const incoming = e.dst === gid;
                          const other = incoming ? e.src : e.dst;
                          return (
                            <button
                              className="connection-row"
                              key={`${e.src}-${e.dst}`}
                              onClick={() => onOpen(other)}
                            >
                              <span
                                className={`flow-icon ${incoming ? "in" : "out"}`}
                              >
                                {incoming ? (
                                  <ArrowDownLeft size={16} />
                                ) : (
                                  <ArrowUpRight size={16} />
                                )}
                              </span>
                              <span>
                                <b>{other}</b>
                                <small>
                                  {incoming ? "Поступление от" : "Перевод к"} ·{" "}
                                  {e.n_tx} операций
                                </small>
                              </span>
                              <strong>{money(e.sum_kzt, true)} ₸</strong>
                            </button>
                          );
                        })}
                        {neighbors.data.total === 0 && (
                          <p className="muted">Связей в выборке нет.</p>
                        )}
                        <Pagination
                          page={page}
                          total={neighbors.data.total}
                          onPage={setPage}
                        />
                      </>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="transactions">
                  <div className="detail-stack">
                    <ErrorNotice error={transactions.error} />
                    {transactions.loading && (
                      <Skeleton count={4} height="48px" />
                    )}
                    {transactions.data && (
                      <>
                        <p className="muted small">
                          Операций: {transactions.data.total}
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Дата / контрагент</TableHead>
                              <TableHead align="right">Сумма, ₸</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.data.items.map((tx, i) => (
                              <TableRow key={`${page}-${i}`}>
                                <TableCell>
                                  <span className="muted small">{tx.date}</span>
                                  <button
                                    className="gid-button small"
                                    onClick={() =>
                                      onOpen(tx.src === gid ? tx.dst : tx.src)
                                    }
                                  >
                                    {tx.src === gid ? tx.dst : tx.src}
                                  </button>
                                </TableCell>
                                <TableCell align="right">
                                  <span
                                    className={
                                      tx.dst === gid ? "incoming-amount" : ""
                                    }
                                  >
                                    {tx.dst === gid ? "+" : "−"}
                                    {money(tx.sum_kzt)}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Pagination
                          page={page}
                          total={transactions.data.total}
                          onPage={setPage}
                        />
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
        <div className="inspector-footer">
          Только наблюдаемые переводы · полный баланс неизвестен
        </div>
      </div>
    </dialog>
  );
}
function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (n: number) => void;
}) {
  return total > 20 ? (
    <div className="pagination">
      <Button
        size="small"
        variant="secondary"
        disabled={page === 0}
        onClick={() => onPage(page - 1)}
      >
        Назад
      </Button>
      <span>
        {page + 1} / {Math.ceil(total / 20)}
      </span>
      <Button
        size="small"
        variant="secondary"
        disabled={(page + 1) * 20 >= total}
        onClick={() => onPage(page + 1)}
      >
        Далее
      </Button>
    </div>
  ) : null;
}
