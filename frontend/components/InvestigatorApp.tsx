"use client";

import {
  AgentInterface,
  Button,
  IconButton,
  ModelSwitcher,
  Tag,
  useSystemThemeMode,
  useThread,
  useThreadList,
  type ModelOption,
} from "@inv/ui";
import { Database, FileText, Network, Timer, Upload, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";

import { DatasetsPage } from "@/components/DatasetsPage";
import { ARTIFACT_CATEGORIES, ARTIFACT_RENDERERS } from "@/components/artifacts/renderers";
import { Tooltip } from "@/components/ui";
import { useActiveRuns, useDatasets, useHealth } from "@/lib/api";
import { fmtShort, greeting } from "@/lib/format";
import { createLLM, createStorage, isFollowedRun, loadMessages, onGeneratedTitle, openRunStream } from "@/lib/chat/adapters";
import { useDatasetStore } from "@/lib/chat/datasetStore";
import { useUpload } from "@/lib/useUpload";

/** Transparent mark, reads on both light and dark backgrounds. */
const LOGO = "/logo-falcon.png";
const APP_NAME = "Falcon";

const STARTERS = [
  {
    icon: <Network size={16} />, displayText: "Найти организованную группу",
    prompt: "Найти организованную группу среди обычных операций, восстановить её финансовую структуру: участников, связи, наблюдаемые роли и движение денег, с проверяемыми доказательствами.",
  },
  {
    icon: <Timer size={16} />, displayText: "Где быстрый транзит?",
    prompt: "Найти счета, через которые деньги быстро проходят транзитом с малым остатком, и проверить, образуют ли они общую структуру.",
  },
  {
    icon: <Users size={16} />, displayText: "Кто собирает средства?",
    prompt: "Найти счета-сборщики, получающие переводы от множества отправителей, и проследить, куда уходят собранные средства.",
  },
  {
    icon: <FileText size={16} />, displayText: "Паспорт датасета",
    prompt: "Изучить датасет: поля, периоды, валюты, качество и полноту данных; описать ограничения и первые подозрительные структуры.",
  },
];


/** The chat interface (AgentInterface), backed by the investigator API. */
export default function InvestigatorApp({ initialThreadId }: { initialThreadId?: string }) {
  const mode = useSystemThemeMode();
  // ChatProvider captures storage and llm at mount.
  const [storage] = useState(createStorage);
  const [llm] = useState(createLLM);
  const [path, setPath] = useState<string | undefined>(undefined);

  return (
    <div className="inv-app-page">
      <AgentInterface
        storage={storage}
        llm={llm}
        artifactRenderers={ARTIFACT_RENDERERS}
        artifactCategories={ARTIFACT_CATEGORIES}
        logoUrl={LOGO}
        agentName={APP_NAME}
        theme={{ mode }}
        starters={STARTERS}
        // The default "user-message-anchor" pads the last message to a viewport height, leaving empty space
        // to scroll into; "always" ends the thread at its content and follows a live run to the bottom.
        scrollVariant="always"
        path={path}
        onNavigate={setPath}
        labels={{
          defaultCategory: "Артефакты",
          workspaceToggle: "Материалы расследования",
          tabs: { all: "Все", artifacts: "Артефакты", apps: "Приложения" },
        }}
      >
        <AgentInterface.Sidebar>
          {/* The template's default sidebar, plus a Datasets item. */}
          <div className="inv-agent-sidebar-actions">
            <AgentInterface.SidebarHeader />
            <div className="inv-agent-sidebar-primary-actions">
              <AgentInterface.NewChatButton />
              <AgentInterface.ArtifactNav className="inv-agent-sidebar-artifact-nav" />
              <DatasetsNavItem />
            </div>
          </div>
          <AgentInterface.SidebarContent>
            <AgentInterface.ThreadList />
          </AgentInterface.SidebarContent>
        </AgentInterface.Sidebar>
        <AgentInterface.MobileHeader agentName="" actions={<HeaderControls compact />} />
        <AgentInterface.ThreadHeader className="inv-app-thread-header">
          <HeaderControls />
        </AgentInterface.ThreadHeader>
        <AgentInterface.Welcome title={`${greeting()}!`} description="Какую сеть переводов расследуем сегодня?" glowAnimation />
        <AgentInterface.Composer placeholder="Спросите агента о сети, версии или конкретной связи…" />
        <AgentInterface.Route path="datasets">
          <DatasetsPage onPick={() => setPath(undefined)} />
        </AgentInterface.Route>
        <ThreadSync initialThreadId={initialThreadId} />
        <DatasetDrop />
      </AgentInterface>
    </div>
  );
}

function DatasetsNavItem() {
  const { data } = useDatasets();
  return (
    <AgentInterface.SidebarItem path="datasets" icon={<Database size="1em" />} trailing={data?.length || undefined}>
      Датасеты
    </AgentInterface.SidebarItem>
  );
}

// ---------------------------------------------------------------- header (where the template puts its model switcher)

/** As in the template: the header holds only the switcher (here: the dataset for a new investigation).
 *  An open investigation keeps the template's default header. */
function HeaderControls({ compact = false }: { compact?: boolean }) {
  const selected = useThreadList((s) => s.selectedThreadId);
  return selected ? null : <DatasetControls compact={compact} />;
}

/** New investigation: pick the dataset (the template's ModelSwitcher) or upload one. */
function DatasetControls({ compact }: { compact: boolean }) {
  const { data: datasets } = useDatasets();
  const { data: health } = useHealth();
  const { datasetId, setDatasetId } = useDatasetStore();
  const upload = useUpload((ds) => setDatasetId(ds.id));

  // Default to the newest dataset when nothing (valid) is picked.
  useEffect(() => {
    if (datasets?.length && !datasets.some((d) => d.id === datasetId)) setDatasetId(datasets[0].id);
  }, [datasets, datasetId, setDatasetId]);

  const models: ModelOption[] = (datasets ?? []).map((d) => ({
    id: d.id, name: d.name, group: "Датасеты", badge: `${fmtShort(d.row_count)} опер.`,
  }));

  return (
    <>
      <input {...upload.inputProps} />
      <div className="flex min-w-0 items-center gap-2">
        {models.length > 0 && datasetId && <ModelSwitcher models={models} value={datasetId} onValueChange={setDatasetId} />}
        {!compact && upload.status && (
          <span className={upload.error ? "truncate text-sm text-danger" : "truncate text-sm text-secondary"}>{upload.status}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {health && !health.worker_alive && (
          <Tooltip content="Запустите в папке backend: uv run python -m app.worker">
            <span>
              <Tag variant="warning" size="md" text="Агент не запущен" />
            </span>
          </Tooltip>
        )}
        {compact ? (
          <IconButton
            size="medium"
            variant="tertiary"
            icon={<Upload size="1em" />}
            aria-label="Загрузить датасет"
            onClick={upload.open}
            disabled={upload.uploading}
          />
        ) : (
          <Button variant="secondary" size="small" iconLeft={<Upload size="1em" />} onClick={upload.open} disabled={upload.uploading}>
            {upload.uploading ? "Загружаю…" : "Загрузить датасет"}
          </Button>
        )}
      </div>
    </>
  );
}

/** Drop a CSV / Parquet (or the three graph parquet files) anywhere on the welcome screen to upload it and
 *  use it for the next investigation. */
function DatasetDrop() {
  const selected = useThreadList((s) => s.selectedThreadId);
  const setDatasetId = useDatasetStore((s) => s.setDatasetId);
  const upload = useUpload((ds) => setDatasetId(ds.id));
  const uploadRef = useRef(upload.upload);
  useEffect(() => {
    uploadRef.current = upload.upload;
  });
  useEffect(() => {
    if (selected) return;
    const over = (e: DragEvent) => e.dataTransfer?.types.includes("Files") && e.preventDefault();
    const drop = (e: DragEvent) => {
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (!files.length) return;
      e.preventDefault();
      void uploadRef.current(files);
    };
    window.addEventListener("dragover", over);
    window.addEventListener("drop", drop);
    return () => {
      window.removeEventListener("dragover", over);
      window.removeEventListener("drop", drop);
    };
  }, [selected]);
  return null;
}

// ---------------------------------------------------------------- thread ↔ URL, live runs

/** Opens /investigations/<id> deep links, keeps the URL on the open investigation, and follows runs
 *  that were not started from this page (another tab, the worker picking up a queued run, a reload). */
function ThreadSync({ initialThreadId }: { initialThreadId?: string }) {
  const selected = useThreadList((s) => s.selectedThreadId);
  const selectThread = useThreadList((s) => s.selectThread);
  const loadThreads = useThreadList((s) => s.loadThreads);
  const isRunning = useThread((s) => s.isRunning);
  const isLoadingMessages = useThread((s) => s.isLoadingMessages);
  const setMessages = useThread((s) => s.setMessages);
  const attachRun = useThread((s) => s.attachRun);
  const threads = useThreadList((s) => s.threads);
  const updateThread = useThreadList((s) => s.updateThread);
  const { data: activeRuns } = useActiveRuns();
  const activeRun = selected ? activeRuns?.find((r) => r.investigation_id === selected) : undefined;

  // A generated title replaces the temporary one on the same thread row (the row crossfades the text).
  const threadsRef = useRef(threads);
  useEffect(() => {
    threadsRef.current = threads;
  });
  useEffect(
    () =>
      onGeneratedTitle((id, title) => {
        const thread = threadsRef.current.find((t) => t.id === id);
        if (thread && thread.title !== title) updateThread({ ...thread, title });
      }),
    [updateThread],
  );
  // The selection at the time an async refresh lands (the user may have switched threads).
  const selectedRef = useRef(selected);
  useEffect(() => {
    selectedRef.current = selected;
  });

  useEffect(() => {
    if (initialThreadId) selectThread(initialThreadId);
  }, [initialThreadId, selectThread]);

  useEffect(() => {
    const url = selected ? `/investigations/${selected}` : "/";
    if (window.location.pathname !== url) window.history.replaceState(null, "", url);
  }, [selected]);

  // New investigations change titles and lists elsewhere in the UI.
  useEffect(() => {
    if (!isRunning) {
      void mutate("/investigations");
      loadThreads();
    }
  }, [isRunning, loadThreads]);

  // A run this tab did not start (another tab, the API, the worker picking up a queued run, a reload) is
  // followed as a live assistant turn: running state, stop button, streamed steps - as if sent from here.
  const attached = useRef(new Set<string>());
  const runId = activeRun?.id;
  useEffect(() => {
    if (!selected || !runId || isRunning || isLoadingMessages) return;
    if (isFollowedRun(runId) || attached.current.has(runId)) return;
    attached.current.add(runId);
    const threadId = selected;
    void (async () => {
      const history = await loadMessages(threadId, runId).catch(() => null);
      if (!history || selectedRef.current !== threadId) {
        attached.current.delete(runId);
        return;
      }
      setMessages(history);
      await attachRun((signal) => openRunStream(threadId, runId, signal));
      // Left the thread mid-run: attach again on return. Otherwise the run ended (or was stopped here).
      if (selectedRef.current !== threadId) attached.current.delete(runId);
    })();
  }, [selected, runId, isRunning, isLoadingMessages, attachRun, setMessages]);

  // One refresh when a run of the open thread leaves the active list (e.g. stopped: its final status shows up).
  const lastRun = useRef<string | undefined>(undefined);
  useEffect(() => {
    const prev = lastRun.current;
    lastRun.current = runId;
    if (!prev || runId || !selected || isRunning) return;
    void loadMessages(selected).then((messages) => {
      if (selectedRef.current === selected) setMessages(messages);
    });
  }, [runId, selected, isRunning, setMessages]);

  return null;
}

