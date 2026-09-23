import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
export const ToolResult = ({ message, toolName, className }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasError = !!message.error;
    return (_jsxs("div", { className: clsx("inv-tool-result", className, {
            "inv-tool-result--error": hasError,
        }), children: [_jsxs("button", { className: "inv-tool-result__header", onClick: () => setIsExpanded(!isExpanded), type: "button", children: [_jsxs("div", { className: "inv-tool-result__header-left", children: [hasError ? (_jsx(AlertCircle, { size: 14, className: "inv-tool-result__icon--error" })) : (_jsx(CheckCircle2, { size: 14, className: "inv-tool-result__icon--success" })), _jsx("span", { className: "inv-tool-result__label", children: toolName ? `${toolName} result` : "Tool result" })] }), _jsx(ChevronDown, { size: 14, className: clsx("inv-tool-result__chevron", {
                            "inv-tool-result__chevron--expanded": isExpanded,
                        }) })] }), isExpanded && (_jsxs("div", { className: "inv-tool-result__content", children: [hasError && _jsx("div", { className: "inv-tool-result__error", children: message.error }), _jsx("pre", { className: "inv-tool-result__output", children: message.content })] }))] }));
};
//# sourceMappingURL=ToolResult.js.map