"use client";

import { Button, useThreadList } from "@inv/ui";
import { Database, Download, FileSpreadsheet, Network, Upload } from "lucide-react";
import { useState } from "react";

import { BrowserEmpty, BrowserItem, BrowserPage } from "@/components/BrowserPage";
import { outputUrl, useDatasets, type Dataset } from "@/lib/api";
import { fmtDate, fmtInt } from "@/lib/format";
import { useDatasetStore } from "@/lib/chat/datasetStore";
import { useUpload } from "@/lib/useUpload";

/** Datasets as a template Route page (sidebar item «Датасеты»). Picking one starts a new investigation on it. */
export function DatasetsPage({ onPick }: { onPick: () => void }) {
  const { data: datasets } = useDatasets();
  const setDatasetId = useDatasetStore((s) => s.setDatasetId);
  const switchToNewThread = useThreadList((s) => s.switchToNewThread);
  const upload = useUpload((ds) => setDatasetId(ds.id));
  const [query, setQuery] = useState("");

  const pick = (id: string) => {
    setDatasetId(id);
    switchToNewThread();
    onPick();
  };

  const q = query.trim().toLowerCase();
  const items = (datasets ?? []).filter((d) => !q || d.name.toLowerCase().includes(q));

  return (
    <>
      <input {...upload.inputProps} />
      <BrowserPage
        title="Датасеты"
        query={query}
        onQuery={setQuery}
        searchPlaceholder="Найти датасет"
        action={
          <Button variant="primary" size="medium" iconLeft={<Upload size="1em" />} onClick={upload.open} disabled={upload.uploading}>
            {upload.uploading ? "Загружаю…" : "Загрузить"}
          </Button>
        }
        loading={!datasets}
        empty={
          items.length === 0 ? (
            <BrowserEmpty
              icon={<Database size="1em" />}
              title={q ? "Ничего не найдено" : "Датасетов пока нет"}
              subtitle={
                q
                  ? "Попробуйте другой запрос."
                  : "Загрузите CSV / Parquet с операциями или сразу три файла графа: nodes, edges, transactions.parquet."
              }
            />
          ) : undefined
        }
      >
        {upload.status && <p className={upload.error ? "px-3 text-sm text-danger" : "px-3 text-sm text-secondary"}>{upload.status}</p>}
        {items.map((d) => (
          <BrowserItem
            key={d.id}
            onClick={() => pick(d.id)}
            icon={d.profile.graph ? <Network size="1em" /> : <FileSpreadsheet size="1em" />}
            title={d.name}
            meta={datasetMeta(d)}
            trailing={
              <div className="flex shrink-0 items-center gap-3">
                {d.profile.graph && <OutputLinks datasetId={d.id} />}
                <Button
                variant="secondary"
                size="small"
                className="shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  pick(d.id);
                }}
              >
                Расследовать
                </Button>
              </div>
            }
          />
        ))}
      </BrowserPage>
    </>
  );
}

function datasetMeta(d: Dataset) {
  const g = d.profile.graph;
  if (!g)
    return `${fmtInt(d.row_count)} операций · ${fmtInt(d.profile.accounts.total)} счетов · загружен ${fmtDate(d.created_at)}`;
  return (
    `${fmtInt(g.nodes)} узлов (seed ${fmtInt(g.seeds)}) · ${fmtInt(g.edges)} рёбер · ${fmtInt(d.row_count)} транзакций · ` +
    `${fmtInt(g.clusters)} кластеров · ${fmtInt(g.censored_nodes)} на границе обхода · загружен ${fmtDate(d.created_at)}`
  );
}

const OUTPUTS = [
  { name: "nodes_roles.csv", label: "Роли" },
  { name: "clusters.csv", label: "Кластеры" },
  { name: "top_nodes.csv", label: "Топ узлов" },
];

/** The scoring pipeline's three result files, downloadable as CSV. */
function OutputLinks({ datasetId }: { datasetId: string }) {
  return (
    <div className="hidden items-center gap-3 md:flex">
      {OUTPUTS.map((o) => (
        <a
          key={o.name}
          href={outputUrl(datasetId, o.name)}
          download={o.name}
          title={o.name}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-sm text-secondary transition-colors duration-150 hover:text-primary"
        >
          <Download size={14} aria-hidden />
          {o.label}
        </a>
      ))}
    </div>
  );
}
