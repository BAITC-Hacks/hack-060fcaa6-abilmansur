import { type ToolActivity } from "@inv/headless";
import type { ToolDetailedViewPanel } from "../_shared/tool-renderer/ToolActivityRenderer";
/**
 * One display row of the timeline: a tool activity, or a thinking-text step
 * (prose the model emitted alongside its tool calls), in run order.
 */
export type TimelineStep = {
    type: "text";
    id: string;
    text: string;
} | {
    type: "activity";
    activity: ToolActivity;
};
/**
 * The "Working / Behind the scenes" timeline wrapper, driven by
 * {@link ToolActivity}[] from `useToolActivities`. Reveals the run's steps
 * one-by-one and keeps every revealed one on screen, holds the tray open across
 * the tool-result → first-token gap (`awaitingResponse`), and lets a manual
 * close stick for the rest of the run. "Running" is read from each activity's
 * status, not an `isThinking` prop.
 *
 * (Animations are CSS-only — framer-motion is intentionally not a dependency.)
 *
 * @category Components
 */
export declare function ToolCallTimeline({ activities, steps, isLast, detailedViewPanel, forceDefault, awaitingResponse, }: {
    activities: ToolActivity[];
    /** Ordered display rows interleaving thinking text with tool activities */
    steps?: TimelineStep[];
    isLast?: boolean;
    detailedViewPanel?: ToolDetailedViewPanel;
    /** Render every row as the raw default card (e.g. so matched tools' raw
     *  request/response stay inspectable here while their rich preview renders elsewhere). */
    forceDefault?: boolean;
    /** Hold the compact "Working…" tray open across the tool-result → first-token
     *  gap instead of collapsing the instant the last result lands. */
    awaitingResponse?: boolean;
}): import("react").JSX.Element | null;
//# sourceMappingURL=ToolCallTimeline.d.ts.map