import { type ToolActivity } from "@inv/headless";
import { type ToolDetailedViewPanel } from "./ToolActivityRenderer";
export interface TimelineEntryProps {
    activity: ToolActivity;
    /** Whether this entry belongs to the live (last assistant) message — drives the running shimmer. */
    isLast?: boolean;
    /** Optional detailed-view panel for matched renderers (defaults to the shared one). */
    detailedViewPanel?: ToolDetailedViewPanel;
    /** Always render the raw default card, even when a renderer matches (used for the "Behind the scenes" raw view). */
    forceDefault?: boolean;
    /**
     * When a matched renderer's parser returns null, fall back to the raw default
     * card (default `true`). Set `false` when a separate raw card already covers
     * this call (e.g. InvChat shows the raw card in its forceDefault timeline),
     * to avoid rendering the raw card twice.
     */
    fallbackToDefault?: boolean;
}
/**
 * Timeline-flavoured sibling of {@link ToolCallEntry}: the same matched-renderer
 * **xor** default dispatch, but the default is the timeline-shaped
 * {@link TimelineToolCard} (dot + connector + StatusStep) instead of the chevron
 * card. Used both inside `<ToolCallTimeline>` and directly by flat threads that
 * want the always-visible timeline rows.
 *
 * @category Components
 */
export declare const TimelineEntry: import("react").NamedExoticComponent<TimelineEntryProps>;
//# sourceMappingURL=TimelineEntry.d.ts.map