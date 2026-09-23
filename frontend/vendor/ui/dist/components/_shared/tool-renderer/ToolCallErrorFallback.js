import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from "lucide-react";
/**
 * Inline fallback shown when a matched renderer's `parse`/`parser` throws.
 * Keeps one bad renderer from blanking the whole thread.
 *
 * @internal
 */
export function ToolCallErrorFallback({ error, toolName }) {
    return (_jsxs("div", { className: "inv-tool-call inv-tool-call--error", "data-status": "error", children: [_jsxs("div", { className: "inv-tool-call__title-row", children: [_jsx("span", { className: "inv-tool-call__icon-wrapper", children: _jsx(AlertCircle, { size: 14, className: "inv-tool-call__icon" }) }), _jsxs("span", { className: "inv-tool-call__name", children: ["Couldn\u2019t render the ", toolName, " tool"] })] }), _jsx("div", { className: "inv-tool-call__connector inv-tool-call__connector--last", children: _jsx("div", { className: "inv-tool-call__args-block", children: _jsx("pre", { className: "inv-tool-code-block__code inv-tool-code-block__code--error", children: error }) }) })] }));
}
//# sourceMappingURL=ToolCallErrorFallback.js.map