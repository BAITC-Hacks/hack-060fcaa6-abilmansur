import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { memo } from "react";
import { SourceIcon } from "./SourceIcon";
import { ToolCall, toolIcon } from "./ToolCallPrimitives";
import { extractToolSources } from "./toolSources";
/** Favicon + title rows for the links a tool's result carries (see
 *  {@link extractToolSources} — per-tool formats live in one registry). */
const ToolSources = ({ sources }) => {
    return (_jsx("div", { className: "inv-tool-call__sources", children: sources.map((source) => (_jsxs("a", { href: source.url, target: "_blank", rel: "noopener noreferrer", className: "inv-tool-call__source", children: [_jsxs("span", { className: "inv-tool-call__source-left", children: [_jsx(SourceIcon, { src: `https://www.google.com/s2/favicons?domain=${source.host}&sz=64` }), _jsx("span", { className: "inv-tool-call__source-title", children: source.title })] }), _jsx("span", { className: "inv-tool-call__source-desc", children: source.siteName })] }, source.url))) }));
};
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
export const TimelineToolCard = memo(function TimelineToolCard({ activity, isLast, isRunning = true, }) {
    const Icon = toolIcon(activity.toolName, activity.status);
    const running = (activity.status === "streaming" || activity.status === "executing") && isLast && isRunning;
    // Links speak for themselves; the raw block would only repeat them. A failure
    // always falls back to it, since that's where the error text lives.
    const sources = typeof activity.result === "string" && !activity.isError
        ? extractToolSources(activity.toolName, activity.result)
        : [];
    return (_jsxs(ToolCall.Root, { activity: activity, isLast: isLast, running: isRunning, defaultOpen: activity.isError, children: [_jsxs(ToolCall.Trigger, { className: "inv-tool-call__title-row", children: [_jsx(ToolCall.StatusIcon, { render: (_state, props) => (_jsx("span", { className: `inv-tool-call__icon-wrapper${props["data-spin"] ? " inv-tool-call__icon--blinking" : ""}`, "data-status": props["data-status"], children: _jsx(Icon, { size: 14, className: "inv-tool-call__icon" }) })) }), _jsx(ToolCall.StatusText, { render: (_state, props) => (_jsx("span", { 
                            // Announce tool-call status transitions (Calling → Running →
                            // Called/failed) to assistive tech; only changes are spoken, so
                            // settled/historical cards stay quiet.
                            role: "status", "aria-live": "polite", className: `inv-tool-call__name${running ? " inv-tool-call__name--shimmer" : ""}`, children: props["children"] })) }), _jsx(ChevronDown, { size: 14, className: "inv-tool-call__chevron" })] }), _jsx(ToolCall.Content, { className: "inv-tool-call__content", children: sources.length > 0 ? (_jsx(ToolSources, { sources: sources })) : (
                // Request and response share one block; ToolCall.Result renders
                // nothing until a result or error lands.
                _jsxs("pre", { className: "inv-tool-call__block inv-tool-code-block__code", children: [_jsx(ToolCall.Parameters, { render: (_s, p) => _jsx("code", { children: p["children"] }) }), _jsx(ToolCall.Result, { render: (s, p) => (_jsx("code", { className: s.isError ? "inv-tool-code-block__code--error" : undefined, children: `\n\n${p["children"]}` })) })] })) })] }));
});
//# sourceMappingURL=TimelineToolCard.js.map