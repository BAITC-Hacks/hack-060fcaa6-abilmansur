"use client";

import { defineArtifactRenderer, type ArtifactCategory, type ArtifactRendererControls } from "@inv/ui";
import clsx from "clsx";
import { ChevronRight, FileCheck2, Waypoints } from "lucide-react";
import type { ReactNode } from "react";

import { EvidenceDetail } from "@/components/investigation/EvidencePanel";
import { EVIDENCE_ARTIFACT, EVIDENCE_TOOL, VERSION_ARTIFACT, VERSION_TOOL } from "@/lib/chat/adapters";
import type { EvidenceArtifactContent, VersionArtifactContent } from "@/lib/chat/converter";
import { VersionView } from "./VersionView";

// Versions and evidence are the investigation's artifacts. In the chat they appear as preview cards;
// "open" shows the full view in the template's side panel; they are also listed in the thread
// workspace and the Artifacts browser (sidebar).

function parse<T>(raw: { args: unknown; response: unknown }): T | null {
  const value = raw.response ?? raw.args;
  if (value == null) return null;
  if (typeof value === "object") return value as T;
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return null;
  }
}

export const versionRenderer = defineArtifactRenderer<VersionArtifactContent>({
  type: VERSION_ARTIFACT,
  toolName: VERSION_TOOL,
  label: "Версия структуры",
  icon: <Waypoints size="1em" />,
  parser: (raw, ctx) => {
    const props = parse<VersionArtifactContent>(raw);
    if (!props?.versionId) return null;
    return {
      props,
      meta: ctx.isStreaming ? null : { id: `ver:${props.investigationId}:${props.versionId}`, version: 1, heading: props.title, type: VERSION_ARTIFACT },
    };
  },
  preview: (props, controls) => (
    <PreviewCard controls={controls} icon={<Waypoints size={18} />} kind="Версия структуры" title={props.title} meta="Граф связей, маршруты, доска" />
  ),
  actual: (props) => <VersionView key={props.versionId} investigationId={props.investigationId} versionId={props.versionId} />,
});

export const evidenceRenderer = defineArtifactRenderer<EvidenceArtifactContent>({
  type: EVIDENCE_ARTIFACT,
  toolName: EVIDENCE_TOOL,
  label: "Доказательство",
  icon: <FileCheck2 size="1em" />,
  parser: (raw, ctx) => {
    const props = parse<EvidenceArtifactContent>(raw);
    if (!props?.evidenceId) return null;
    return {
      props,
      meta: ctx.isStreaming ? null : { id: `ev:${props.investigationId}:${props.evidenceId}`, version: 1, heading: props.title, type: EVIDENCE_ARTIFACT },
    };
  },
  preview: (props, controls) => (
    <PreviewCard
      controls={controls}
      icon={<FileCheck2 size={18} />}
      kind="Доказательство · проверено приложением"
      title={props.title}
      meta={props.txCount != null ? `${props.txCount} перев.` : undefined}
    />
  ),
  actual: (props) => (
    <div className="h-full overflow-y-auto">
      <EvidenceDetail investigationId={props.investigationId} evidenceId={props.evidenceId} />
    </div>
  ),
});

export const ARTIFACT_RENDERERS = [versionRenderer, evidenceRenderer];

export const ARTIFACT_CATEGORIES: ArtifactCategory[] = [
  { name: "Версии", filter: { type: [VERSION_ARTIFACT] }, icon: <Waypoints size="1em" /> },
  { name: "Доказательства", filter: { type: [EVIDENCE_ARTIFACT] }, icon: <FileCheck2 size="1em" /> },
];

/** Inline card in the chat, in the template's workspace-item look. */
function PreviewCard({
  controls, icon, kind, title, meta,
}: { controls: ArtifactRendererControls; icon: ReactNode; kind: string; title: string; meta?: string }) {
  return (
    <button
      type="button"
      onClick={controls.toggle}
      aria-pressed={controls.isActive}
      className={clsx(
        "my-1 flex w-full max-w-[520px] cursor-pointer items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors duration-[120ms]",
        controls.isActive ? "border-line-emphasis bg-sunk" : "border-line-interactive bg-surface hover:bg-highlight",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-highlight text-secondary">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-xs text-secondary">{kind}</span>
        <span className="truncate text-sm font-medium text-primary">{title}</span>
        {meta && <span className="text-xs text-secondary">{meta}</span>}
      </span>
      <ChevronRight size={16} className="shrink-0 text-secondary" />
    </button>
  );
}
