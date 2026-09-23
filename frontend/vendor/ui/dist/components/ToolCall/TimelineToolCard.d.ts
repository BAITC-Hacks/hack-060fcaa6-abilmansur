import type { ToolActivity } from "@inv/headless";
/**
 * Timeline-shaped composition of the compound {@link ToolCall} parts: one row —
 * tool glyph, status label, chevron — that expands into either the result's
 * sources or a SINGLE block holding the request and the response together. The
 * running affordances (glyph blink, label shimmer) are
 * `(streaming|executing) && isLast`, derived from the lifecycle status rather
 * than a separate `isThinking` flag. `ToolCall.Root` is the single
 * `.inv-tool-call` container, so we compose *inside* it.
 *
 * @category Components
 */
export declare const TimelineToolCard: import("react").NamedExoticComponent<{
    activity: ToolActivity;
    isLast: boolean;
    /** Whether the owning thread is still running — gates the running shimmer/spin
     *  so a closed-args call with no result doesn't animate forever after the run ends. */
    isRunning?: boolean;
}>;
//# sourceMappingURL=TimelineToolCard.d.ts.map