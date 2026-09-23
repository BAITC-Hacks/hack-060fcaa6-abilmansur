import { jsx as _jsx } from "react/jsx-runtime";
import { useArtifactRenderer, useThread } from "@inv/headless";
import { memo } from "react";
import { TimelineToolCard } from "../../ToolCall/TimelineToolCard";
import { ToolActivityRenderer } from "./ToolActivityRenderer";
const propsEqual = (a, b) => a.activity.status === b.activity.status &&
    a.activity.toolCall.function.arguments === b.activity.toolCall.function.arguments &&
    a.activity.result === b.activity.result &&
    a.activity.isError === b.activity.isError &&
    a.isLast === b.isLast &&
    a.forceDefault === b.forceDefault &&
    a.fallbackToDefault === b.fallbackToDefault &&
    a.detailedViewPanel === b.detailedViewPanel;
/**
 * Timeline-flavoured sibling of {@link ToolCallEntry}: the same matched-renderer
 * **xor** default dispatch, but the default is the timeline-shaped
 * {@link TimelineToolCard} (dot + connector + StatusStep) instead of the chevron
 * card. Used both inside `<ToolCallTimeline>` and directly by flat threads that
 * want the always-visible timeline rows.
 *
 * @category Components
 */
export const TimelineEntry = memo(function TimelineEntry({ activity, isLast = false, detailedViewPanel, forceDefault = false, fallbackToDefault = true, }) {
    const renderer = useArtifactRenderer(activity.toolName); // exact → RegExp → "*"
    // Run-gate the in-progress animation: a closed-args call with no result must
    // not shimmer forever after the run ends (the status stays streaming/executing).
    const isRunning = useThread((s) => s.isRunning);
    const defaultCard = (_jsx(TimelineToolCard, { activity: activity, isLast: isLast, isRunning: isRunning }));
    if (forceDefault || !renderer)
        return defaultCard;
    // Matched renderer; if its parser returns null (skips), fall back to the raw
    // card so a tool call is never invisible mid-stream — unless a separate raw
    // card already covers it (fallbackToDefault=false).
    return (_jsx(ToolActivityRenderer, { renderer: renderer, activity: activity, detailedViewPanel: detailedViewPanel, fallback: fallbackToDefault ? defaultCard : null }));
}, propsEqual);
//# sourceMappingURL=TimelineEntry.js.map