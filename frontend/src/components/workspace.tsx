"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Callout, Tag, IconButton } from "./primitives";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Database,
  Download,
  Menu,
  Network,
  PanelLeftClose,
  Plus,
  Search,
  Square,
  Trash2,
} from "lucide-react";
import { api, API, dateLabel, integer } from "@/lib/api";
import {
  readSnapshot,
  type Snapshot,
  type ResultBlock,
} from "@/lib/investigation";
import {
  InvestigationContext,
  useInvestigation,
} from "./investigation-context";
import { ChatContext, useChat, useChatSession } from "./chat-state";
import NetworkView from "./network-view";
import { NodeCard, ResultContent } from "./result-blocks";
import NodeInspector from "./node-inspector";
import { Loading } from "./ui";

function DatasetHeader() {
  const ctx = useInvestigation();
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !details.current?.contains(event.target)
      )
        details.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <div className="dataset-header">
      <details
        ref={details}
        className="dataset-status"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            details.current?.removeAttribute("open");
            details.current?.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          <Database size={16} />
          <span>
            {ctx.snapshot ? "Все данные подключены" : "Данные не подключены"}
          </span>
          {ctx.snapshot && (
            <span className="dataset-count">{ctx.snapshot.files.length}</span>
          )}
          <ChevronDown size={14} />
        </summary>
        <div className="dataset-popover">
          <strong>Данные исследования</strong>
          <p>
            {ctx.snapshot
              ? "Все источники автоматически включены в анализ."
              : "Проверьте подключение к серверу и файлы в папке data/."}
          </p>
          {ctx.snapshot?.files.map((file) => (
            <div className="dataset-file" key={file.name}>
              <Database size={16} />
              <span>
                {file.name}
                <small>{Math.ceil(file.size / 1024)} КБ</small>
              </span>
              <Check size={16} aria-label="Подключён" />
            </div>
          ))}
          <Button
            size="small"
            variant="tertiary"
            onClick={() => {
              details.current?.removeAttribute("open");
              ctx.navigate("/data");
            }}
          >
            Подробнее о данных
          </Button>
        </div>
      </details>
      <div className="result-actions">
        {!!ctx.chosen.length && (
          <Button
            variant="tertiary"
            size="small"
            onClick={() => ctx.navigate("/selected")}
          >
            В проверке: {ctx.chosen.length}
          </Button>
        )}
        <Button
          variant="secondary"
          size="small"
          iconLeft={<Network size={16} />}
          disabled={!ctx.snapshot}
          onClick={() => ctx.navigate("/graph")}
        >
          Граф
        </Button>
      </div>
    </div>
  );
}

function DataUtility({
  onReload,
  error,
}: {
  onReload: () => Promise<void>;
  error: string;
}) {
  const ctx = useInvestigation();
  const { busy } = useChat();
  const [rebuilding, setRebuilding] = useState(false);
  const [failure, setFailure] = useState("");
  const snapshot = ctx.snapshot;
  return (
    <section className="utility-page">
      <Button variant="tertiary" size="small" onClick={() => ctx.navigate()}>
        ← К исследованию
      </Button>
      <h1>Данные</h1>
      {(error || failure) && (
        <Callout variant="warning" description={failure || error} />
      )}
      {!snapshot ? (
        <>
          <p>
            Данные не загружены. Проверьте подключение к серверу и наличие
            файлов в папке data/.
          </p>
          <Button
            onClick={async () => {
              setFailure("");
              try {
                await onReload();
              } catch (e) {
                setFailure((e as Error).message);
              }
            }}
          >
            Повторить подключение
          </Button>
        </>
      ) : (
        <>
          <Tag
            text={rebuilding ? "Пересчёт…" : "Данные проверены"}
            variant="success"
            size="sm"
          />
          <div className="data-files">
            {snapshot.files.map((file) => (
              <div key={file.name}>
                <span>{file.name}</span>
                <span className="muted">{Math.ceil(file.size / 1024)} КБ</span>
              </div>
            ))}
          </div>
          <dl className="detail-facts">
            <div>
              <dt>Период</dt>
              <dd>
                {snapshot.summary.period_start
                  ? `${dateLabel(snapshot.summary.period_start)} — ${dateLabel(snapshot.summary.period_end)}`
                  : "Нет операций"}
              </dd>
            </div>
            <div>
              <dt>Размер выборки</dt>
              <dd>
                {integer(snapshot.summary.n_nodes)} участников ·{" "}
                {integer(snapshot.summary.n_transactions)} переводов
              </dd>
            </div>
          </dl>
          <Button
            variant="secondary"
            disabled={busy || rebuilding}
            onClick={async () => {
              setRebuilding(true);
              setFailure("");
              try {
                await api("analysis/rebuild", { method: "POST" });
                await onReload();
              } catch (e) {
                setFailure((e as Error).message);
              } finally {
                setRebuilding(false);
              }
            }}
          >
            {rebuilding ? "Пересчитываю…" : "Пересчитать"}
          </Button>
          <h2>Скачать результаты</h2>
          <div className="result-actions">
            {["nodes_roles.csv", "clusters.csv", "top_nodes.csv"].map(
              (name) => (
                <a
                  key={name}
                  className="download-link"
                  href={`${API}/api/v1/exports/${name}`}
                  download
                >
                  <Download size={15} />
                  {name}
                </a>
              ),
            )}
          </div>
          <p className="muted small">
            Все три файла подключаются автоматически при запуске сервера.
          </p>
          <details>
            <summary>Ограничения анализа</summary>
            {snapshot.summary.limitations.map((text) => (
              <p className="muted small" key={text}>
                {text}
              </p>
            ))}
          </details>
        </>
      )}
    </section>
  );
}

function Composer() {
  const { send, busy, cancel, restored } = useChat();
  const { snapshot } = useInvestigation();
  const [draft, setDraft] = useState("");
  const submit = () => {
    if (!draft.trim() || busy || !snapshot || !restored) return;
    void send(draft);
    setDraft("");
  };
  return (
    <form
      className="chat-composer"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <textarea
        aria-label="Сообщение ассистенту"
        placeholder="Спросите о переводах, участниках и связях…"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={3}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            submit();
          }
        }}
      />
      <div className="chat-composer-actions">
        <span>{busy ? "Анализирую данные…" : ""}</span>
        {busy ? (
          <IconButton
            icon={<Square size={16} />}
            aria-label="Остановить ответ"
            onClick={cancel}
          />
        ) : (
          <IconButton
            icon={<ArrowUp size={18} />}
            aria-label="Отправить"
            type="submit"
            disabled={!draft.trim() || !snapshot || !restored}
          />
        )}
      </div>
    </form>
  );
}
function Conversation({
  onExpand,
}: {
  onExpand: (block: ResultBlock) => void;
}) {
  const chat = useChat();
  const { snapshot } = useInvestigation();
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.messages.length, chat.busy]);
  if (!chat.messages.length)
    return (
      <div className="chat-welcome">
        <h1>Рады вас видеть</h1>
        <p>Что исследуем сегодня?</p>
        <Composer key={chat.activeId || "new"} />
        <div className="chat-starters">
          {[
            { text: "Кого проверить первым?", icon: <Search size={18} /> },
            { text: "Покажи крупнейшие кластеры", icon: <Network size={18} /> },
            { text: "Проанализируй сеть", icon: <Database size={18} /> },
          ].map((starter) => (
            <button
              key={starter.text}
              disabled={!snapshot || !chat.restored}
              onClick={() => void chat.send(starter.text)}
            >
              {starter.icon}
              {starter.text}
            </button>
          ))}
        </div>
      </div>
    );
  return (
    <div className="chat-conversation">
      <div className="chat-messages">
        {chat.messages.map((message) => (
          <article
            key={message.id}
            className={`chat-message chat-message--${message.role}`}
            aria-label={
              message.role === "user" ? "Ваш вопрос" : "Ответ ассистента"
            }
          >
            <div className="chat-message-text">
              {message.role === "assistant" ? (
                <Markdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </Markdown>
              ) : (
                message.content
              )}
            </div>
            {message.results?.map((block) => (
              <ResultContent
                key={block.id}
                block={block}
                controls={{ open: () => onExpand(block) }}
              />
            ))}
          </article>
        ))}
        {chat.busy && (
          <div className="chat-thinking" role="status">
            Анализирую данные<span>…</span>
          </div>
        )}
        <div ref={bottom} />
      </div>
      <div className="chat-composer-dock">
        <Composer key={chat.activeId} />
      </div>
    </div>
  );
}

export default function Workspace() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [ai, setAi] = useState(false);
  const [error, setError] = useState("");
  const [chosen, setChosen] = useState<string[]>([]);
  const [path, setPath] = useState<string | undefined>();
  const [gid, setGid] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  const [graphFocus, setGraphFocus] = useState<string | null>(null);
  const [graphCluster, setGraphCluster] = useState("all");
  const chat = useChatSession(snapshot, chosen);
  const reload = async () => {
    const result = await readSnapshot();
    setSnapshot(result.snapshot);
    setAi(result.ai);
    setError("");
    setRevision((value) => value + 1);
  };
  useEffect(() => {
    const abort = new AbortController();
    readSnapshot(abort.signal)
      .then((result) => {
        setSnapshot(result.snapshot);
        setAi(result.ai);
        try {
          const saved = JSON.parse(
            localStorage.getItem("money-graph:selection") || "null",
          );
          if (
            saved?.datasetId === result.snapshot?.id &&
            Array.isArray(saved.gids)
          )
            setChosen(
              saved.gids
                .filter((id: string) =>
                  result.snapshot?.graph.nodes.some((n) => n.gid === id),
                )
                .slice(0, 20),
            );
        } catch {
          /* Selection is optional browser state. */
        }
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!abort.signal.aborted) setLoading(false);
      });
    return () => abort.abort();
  }, []);
  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem(
        "money-graph:selection",
        JSON.stringify({ datasetId: snapshot?.id, gids: chosen }),
      );
    } catch {
      /* Conversation persistence reports storage failures. */
    }
  }, [chosen, snapshot?.id, loading]);
  const toggle = (id: string) =>
    setChosen((current) =>
      current.includes(id)
        ? current.filter((g) => g !== id)
        : current.length < 20
          ? [...current, id]
          : current,
    );
  const navigate = (next?: string) => {
    setPath(next);
    setSidebar(false);
    if (next === "/graph") {
      setGraphFocus(null);
      setGraphCluster("all");
    }
  };
  return (
    <ChatContext.Provider value={chat}>
      <InvestigationContext.Provider
        value={{ snapshot, chosen, toggle, openNode: setGid, navigate }}
      >
        <div className={`finance-shell ${sidebar ? "sidebar-open" : ""}`}>
          {sidebar && (
            <button
              className="sidebar-backdrop"
              aria-label="Закрыть меню"
              onClick={() => setSidebar(false)}
            />
          )}
          <aside className="chat-sidebar" aria-label="Разговоры">
            <div className="chat-brand">
              <Network size={25} />
              <strong>Граф денег</strong>
              <IconButton
                className="sidebar-close"
                icon={<PanelLeftClose size={18} />}
                variant="tertiary"
                aria-label="Закрыть меню"
                onClick={() => setSidebar(false)}
              />
            </div>
            <Button
              variant="tertiary"
              iconLeft={<Plus size={18} />}
              disabled={chat.busy}
              onClick={() => {
                chat.select(null);
                navigate();
              }}
            >
              Новый разговор
            </Button>
            <nav className="chat-history" aria-label="История разговоров">
              {chat.threads.map((thread) => (
                <div
                  className={`chat-history-row ${thread.id === chat.activeId ? "is-active" : ""}`}
                  key={thread.id}
                >
                  <button
                    disabled={chat.busy}
                    title={thread.title}
                    onClick={() => {
                      chat.select(thread.id);
                      navigate();
                    }}
                  >
                    {thread.title}
                  </button>
                  <IconButton
                    disabled={chat.busy}
                    variant="tertiary"
                    size="extra-small"
                    icon={<Trash2 size={14} />}
                    aria-label={`Удалить разговор: ${thread.title}`}
                    onClick={() => chat.remove(thread.id)}
                  />
                </div>
              ))}
            </nav>
            <div className="sidebar-footer">
              <Database size={14} />
              <span>
                {snapshot
                  ? `${integer(snapshot.summary.n_nodes)} участников · 3 источника`
                  : "Ожидание данных"}
              </span>
            </div>
          </aside>
          <main className="chat-main" id="main-content">
            <header className="chat-header">
              <IconButton
                className="mobile-menu"
                variant="tertiary"
                icon={<Menu size={20} />}
                aria-label="Открыть меню"
                onClick={() => setSidebar(true)}
              />
              <DatasetHeader />
            </header>
            {error && (
              <Callout
                variant="danger"
                description={
                  <>
                    {error}{" "}
                    <Button
                      variant="tertiary"
                      size="small"
                      onClick={() =>
                        void reload().catch((e) => setError(e.message))
                      }
                    >
                      Повторить
                    </Button>
                  </>
                }
              />
            )}
            {chat.storageError && (
              <Callout variant="warning" description={chat.storageError} />
            )}
            {loading ? (
              <Loading />
            ) : path === "/graph" ? (
              <div className="graph-route">
                <Button
                  className="route-back"
                  variant="tertiary"
                  size="small"
                  onClick={() => navigate()}
                >
                  ← К разговору
                </Button>
                {snapshot && (
                  <NetworkView
                    key={`${graphFocus}-${graphCluster}`}
                    graph={snapshot.graph}
                    clusters={snapshot.clusters}
                    onOpen={setGid}
                    focus={graphFocus}
                    initialCluster={graphCluster}
                  />
                )}
              </div>
            ) : path === "/data" ? (
              <DataUtility error={error} onReload={reload} />
            ) : path === "/selected" ? (
              <div className="utility-page">
                <Button variant="tertiary" onClick={() => navigate()}>
                  ← К разговору
                </Button>
                <h1>В проверке · {chosen.length}</h1>
                <p className="muted">
                  Выбранные участники учитываются в вопросах к ассистенту.
                </p>
                {snapshot?.graph.nodes
                  .filter((n) => chosen.includes(n.gid))
                  .map((node) => (
                    <NodeCard key={node.gid} node={node} />
                  ))}
                {!chosen.length && (
                  <p>Добавьте участников из графа или ответа ассистента.</p>
                )}
              </div>
            ) : (
              <Conversation
                onExpand={(block) => {
                  setGraphFocus(block.focus || null);
                  setGraphCluster(
                    block.cluster === undefined ? "all" : String(block.cluster),
                  );
                  setPath("/graph");
                }}
              />
            )}
            {!ai && snapshot && (
              <div className="chat-service-status" role="status">
                AI не подключён · граф и готовые сводки доступны
              </div>
            )}
          </main>
          {gid && (
            <NodeInspector
              key={gid}
              gid={gid}
              onClose={() => setGid(null)}
              onOpen={setGid}
              chosen={chosen}
              onToggle={toggle}
              revision={revision}
              onGraph={(id) => {
                setGid(null);
                setGraphFocus(id);
                setGraphCluster("all");
                setPath("/graph");
              }}
            />
          )}
        </div>
      </InvestigationContext.Provider>
    </ChatContext.Provider>
  );
}
