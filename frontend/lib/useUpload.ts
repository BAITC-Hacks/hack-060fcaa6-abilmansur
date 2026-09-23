"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { mutate } from "swr";

import { post, type Dataset } from "./api";

const ACCEPTED = /\.(csv|tsv|parquet)$/i;
/** A crawl-graph dataset: exactly these three Parquet files, picked or dropped together. */
const GRAPH_PARTS = ["nodes", "edges", "transactions"] as const;

const baseName = (f: File) => f.name.replace(/\.[^.]+$/, "").toLowerCase();

/** Hidden file input + POST /datasets (one transactions file) or POST /datasets/graph (nodes + edges +
 *  transactions parquet). Large files can instead be registered via /datasets/from-path. */
export function useUpload(onDone?: (d: Dataset) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const send = async (path: string, form: FormData, label: string) => {
    setUploading(true);
    setError(false);
    setStatus(`Загружаю и обрабатываю ${label}…`);
    try {
      const ds = await post<Dataset>(path, form);
      await mutate("/datasets");
      const g = ds.profile.graph;
      setStatus(
        g
          ? `Граф «${ds.name}» готов: ${g.nodes.toLocaleString("ru-RU")} узлов, роли и приоритеты посчитаны.`
          : `Датасет «${ds.name}» готов: ${ds.row_count.toLocaleString("ru-RU")} операций.`,
      );
      onDone?.(ds);
    } catch (err) {
      setError(true);
      setStatus(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  /** Upload what was picked, pasted or dropped: one transactions file, or the three graph files. */
  const upload = async (input: File | File[]) => {
    const files = Array.isArray(input) ? input : [input];
    const bad = files.find((f) => !ACCEPTED.test(f.name));
    if (bad) {
      setError(true);
      setStatus(`«${bad.name}» не подходит: нужен CSV, TSV или Parquet.`);
      return;
    }
    const byPart = new Map(files.map((f) => [baseName(f), f]));
    const graphFiles = GRAPH_PARTS.map((p) => byPart.get(p));
    if (files.length > 1 || GRAPH_PARTS.some((p) => p !== "transactions" && byPart.has(p))) {
      const missing = GRAPH_PARTS.filter((_, i) => !graphFiles[i]);
      if (missing.length || files.length !== GRAPH_PARTS.length) {
        setError(true);
        setStatus(
          `Для графа выберите сразу три файла: nodes.parquet, edges.parquet, transactions.parquet` +
            (missing.length ? ` (не хватает: ${missing.map((m) => `${m}.parquet`).join(", ")}).` : "."),
        );
        return;
      }
      const form = new FormData();
      GRAPH_PARTS.forEach((p, i) => form.append(p, graphFiles[i]!));
      // Named after the folder the files came from (known when a folder is dropped), else "data".
      const folder = graphFiles[0]!.webkitRelativePath.split("/").slice(-2, -1)[0];
      form.append("name", folder || "data");
      await send("/datasets/graph", form, "граф из трёх файлов");
      return;
    }
    const [file] = files;
    const form = new FormData();
    form.append("file", file);
    form.append("name", file.name.replace(/\.[^.]+$/, ""));
    await send("/datasets", form, `«${file.name}»`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length) void upload(files);
  };

  return {
    open: () => ref.current?.click(),
    upload,
    uploading,
    status,
    error,
    inputProps: { ref, type: "file" as const, accept: ".csv,.tsv,.parquet", multiple: true, hidden: true, onChange },
  };
}
