import type { ToolActivity } from "@inv/headless";
/**
 * Batteries-included default tool card — the chevron-header composition of the
 * compound {@link ToolCall} parts. Status comes from the data, the collapsible
 * is aria-correct, and it's memoized. Used by `<ToolCallEntry>` for flat
 * (non-timeline) threads, sidebars, debug panels, etc.
 *
 * @category Components
 */
export declare const DefaultToolCard: import("react").NamedExoticComponent<{
    activity: ToolActivity;
    isLast: boolean;
    /** Whether the owning thread is still running — gates the running spin/shimmer. */
    isRunning?: boolean;
}>;
//# sourceMappingURL=DefaultToolCard.d.ts.map