import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { memo } from "react";
import { ToolCall } from "./ToolCallPrimitives";
/**
 * Batteries-included default tool card — the chevron-header composition of the
 * compound {@link ToolCall} parts. Status comes from the data, the collapsible
 * is aria-correct, and it's memoized. Used by `<ToolCallEntry>` for flat
 * (non-timeline) threads, sidebars, debug panels, etc.
 *
 * @category Components
 */
export const DefaultToolCard = memo(function DefaultToolCard({ activity, isLast, isRunning = true, }) {
    return (_jsxs(ToolCall.Root, { activity: activity, isLast: isLast, running: isRunning, defaultOpen: activity.isError, className: "inv-tool-call--card", children: [_jsxs(ToolCall.Trigger, { className: "inv-tool-call__header", children: [_jsx(ToolCall.StatusIcon, {}), _jsx(ToolCall.StatusText, {}), _jsx(ChevronDown, { size: 14, className: "inv-tool-call__chevron" })] }), _jsxs(ToolCall.Content, { className: "inv-tool-call__panel", children: [_jsx(ToolCall.Parameters, { className: "inv-tool-call__request inv-tool-code-block__code" }), _jsx(ToolCall.Result, { className: "inv-tool-call__response inv-tool-code-block__code" })] })] }));
});
//# sourceMappingURL=DefaultToolCard.js.map