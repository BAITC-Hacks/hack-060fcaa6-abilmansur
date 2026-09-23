import { type ArtifactRendererConfig, type ToolActivity } from "@inv/headless";
import { type ComponentType, type ReactNode } from "react";
/**
 * The subset of `DetailedViewPanel` props the renderer needs. Lets a thread
 * family inject its own panel (the AgentInterface panel differs from the shared
 * one only in its close button) so one renderer module serves all of them.
 *
 * @category Types
 */
export type ToolDetailedViewPanel = ComponentType<{
    viewId: string;
    title?: string;
    children: ReactNode;
}>;
/**
 * Renders a matched artifact renderer for a single {@link ToolActivity}.
 *
 * Lifecycle mirrors the previous `RendererInstance`: run the renderer, register
 * the entry in ThreadContext when `meta` is non-null, and render
 * `preview(props, controls)` inline + `<DetailedViewPanel>` for the side panel.
 * The renderer is wrapped in try/catch — a throw renders an inline fallback
 * instead of blanking the thread.
 *
 * @internal
 */
export declare function ToolActivityRenderer<Props>({ renderer, activity, detailedViewPanel: DetailedViewPanel, fallback, }: {
    renderer: ArtifactRendererConfig<Props>;
    activity: ToolActivity;
    detailedViewPanel?: ToolDetailedViewPanel;
    /** Rendered when the matched renderer's parse/parser returns `null` (skips) —
     *  lets the caller show a default card instead of nothing. */
    fallback?: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=ToolActivityRenderer.d.ts.map