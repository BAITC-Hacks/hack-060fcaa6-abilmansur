import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronDown, SquareCode } from "lucide-react";
import { useState } from "react";
export const ToolCallComponent = ({ toolCall, isStreaming, toolsDone, isLast = false, className, }) => {
    const isRunning = !!isStreaming && !toolsDone;
    const actionLabel = isRunning
        ? `Calling the ${toolCall.function.name} tool`
        : `Called the ${toolCall.function.name} tool`;
    let parsedArgs = null;
    try {
        parsedArgs = JSON.parse(toolCall.function.arguments);
    }
    catch {
        // not parseable yet
    }
    const hasRequest = parsedArgs && parsedArgs._request != null;
    const hasResponse = parsedArgs && parsedArgs._response != null;
    const requestStr = hasRequest ? JSON.stringify(parsedArgs._request, null, 2) : null;
    const responseStr = hasResponse ? JSON.stringify(parsedArgs._response, null, 2) : null;
    const plainArgs = !hasRequest && !hasResponse && toolCall.function.arguments
        ? (() => {
            try {
                return JSON.stringify(JSON.parse(toolCall.function.arguments), null, 2);
            }
            catch {
                return toolCall.function.arguments;
            }
        })()
        : null;
    return (_jsxs("div", { className: clsx("inv-tool-call", className), children: [_jsxs("div", { className: "inv-tool-call__title-row", children: [_jsx("span", { className: clsx("inv-tool-call__icon-wrapper", {
                            "inv-tool-call__icon--blinking": isRunning && isLast,
                        }), children: _jsx(SquareCode, { size: 14, className: "inv-tool-call__icon" }) }), _jsx("span", { className: clsx("inv-tool-call__name", {
                            "inv-tool-call__name--shimmer": isRunning && isLast,
                        }), children: actionLabel })] }), _jsx("div", { className: clsx("inv-tool-call__connector", {
                    "inv-tool-call__connector--last": isLast,
                }), children: _jsxs("div", { className: "inv-tool-call__args-block", children: [requestStr && (_jsx(ToolCodeBlock, { type: "request", code: requestStr, isRunning: isRunning && !hasResponse, toolName: toolCall.function.name })), responseStr && (_jsx(ToolCodeBlock, { type: "response", code: responseStr, isRunning: isRunning && isLast, toolName: toolCall.function.name })), plainArgs && (_jsx(ToolCodeBlock, { type: "request", code: plainArgs, isRunning: isRunning, toolName: toolCall.function.name }))] }) })] }));
};
const ToolCodeBlock = ({ type, code, isRunning = false, toolName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const label = type === "request" ? "Tool Request" : "Tool Response";
    const runningLabel = type === "request"
        ? `Sending request to ${toolName}...`
        : `Awaiting response from ${toolName}...`;
    return (_jsxs("div", { className: "inv-tool-code-block", children: [_jsxs("button", { className: "inv-tool-code-block__header", onClick: () => setIsExpanded((v) => !v), type: "button", children: [_jsx("span", { className: clsx("inv-tool-code-block__label", {
                            "inv-tool-code-block__label--loading": isRunning,
                        }), children: isRunning ? runningLabel : label }), _jsx(ChevronDown, { size: 14, className: clsx("inv-tool-code-block__chevron", {
                            "inv-tool-code-block__chevron--expanded": isExpanded,
                        }) })] }), isExpanded && (_jsx("div", { className: "inv-tool-code-block__content", children: _jsx("pre", { className: "inv-tool-code-block__code", children: code }) }))] }));
};
//# sourceMappingURL=ToolCall.js.map