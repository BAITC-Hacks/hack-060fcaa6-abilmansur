import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { AlertCircle, Blocks, Globe, ImageIcon, SquareCode } from "lucide-react";
import { createContext, createElement, useContext, useId, useState } from "react";
const ToolCallContext = createContext(null);
/** Reads the nearest {@link ToolCall.Root} context. @category Hooks */
export function useToolCall() {
    const ctx = useContext(ToolCallContext);
    if (!ctx)
        throw new Error("ToolCall.* parts must be used inside <ToolCall.Root>");
    return ctx;
}
/**
 * Renders the consumer's `render` prop if given, else the default element with
 * `defaultProps`, exposing the typed `state` to the render prop. Not a hook
 * (contains no hooks) despite slotting into component bodies.
 */
function renderPart(render, tag, state, defaultProps) {
    if (render)
        return render(state, defaultProps);
    return createElement(tag, defaultProps);
}
const isRunning = (status) => status === "streaming" || status === "executing";
// ── Shared label / formatting helpers ──
const LABELS = {
    streaming: (n) => `Calling the ${n} tool`,
    executing: (n) => `Running the ${n} tool`,
    complete: (n) => `Called the ${n} tool`,
    error: (n) => `${n} failed`,
};
// Used when the tool name is empty/blank — avoids the doubled-word "tool tool"
// that an interpolated `${name || "tool"}` fallback would produce.
const NAMELESS_LABELS = {
    streaming: "Calling the tool",
    executing: "Running the tool",
    complete: "Called the tool",
    error: "Tool failed",
};
/** Default human label for a status + tool name. @category Functions */
export function defaultLabel(status, name) {
    if (!name || !name.trim())
        return NAMELESS_LABELS[status];
    return LABELS[status](name);
}
/** Pretty-prints a JSON result string, falling back to the raw string. @category Functions */
export function prettyResult(value) {
    if (value == null)
        return "";
    try {
        return JSON.stringify(JSON.parse(value), null, 2);
    }
    catch {
        return value;
    }
}
const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
/** Pretty-prints any value (objects stringified, strings shown verbatim). */
function prettyValue(value) {
    if (typeof value === "string")
        return value;
    try {
        return JSON.stringify(value, null, 2);
    }
    catch {
        return String(value);
    }
}
/**
 * Resolves what to show in the request panel. Honors the deprecated `_request`
 * arg key (shows just that), and — when the parsed input is empty (unparseable
 * / earliest streaming frame) — falls back to the raw argument string so the
 * user sees the partial text instead of an empty `{}`.
 */
function resolveRequest(activity) {
    const input = activity.input;
    // `!= null` matches the legacy ToolCallComponent gating — a `_request: null`
    // is treated as absent, not as the request payload.
    if (isObject(input) && input["_request"] != null)
        return prettyValue(input["_request"]);
    if (isObject(input) && Object.keys(input).length === 0) {
        const raw = activity.toolCall.function.arguments;
        if (raw && raw.trim())
            return raw;
    }
    return prettyValue(input);
}
/** The deprecated `_response` arg key, if non-null (else `undefined`). */
function resolveLegacyResponse(activity) {
    const input = activity.input;
    const value = isObject(input) ? input["_response"] : undefined;
    return value != null ? value : undefined;
}
// Built-in tool families that get their own glyph. Matched on the name
const TOOL_ICONS = [
    { match: /image[_-]?search/i, icon: ImageIcon },
    { match: /web[_-]?search/i, icon: Globe },
    { match: /artifact|generate[_-]?report/i, icon: Blocks },
];
export function toolIcon(toolName, status) {
    if (status === "error")
        return AlertCircle;
    return TOOL_ICONS.find((entry) => entry.match.test(toolName))?.icon ?? SquareCode;
}
function Root({ activity, isLast = false, running = true, defaultOpen = false, className, children, }) {
    const [isOpen, setOpen] = useState(defaultOpen);
    const panelId = useId();
    const triggerId = useId();
    return (_jsx(ToolCallContext.Provider, { value: { activity, isLast, running, isOpen, setOpen, panelId, triggerId }, children: _jsx("div", { className: clsx("inv-tool-call", `inv-tool-call--${activity.status}`, className), "data-status": activity.status, children: children }) }));
}
const StatusIcon = ({ render, className }) => {
    const { activity, isLast, running } = useToolCall();
    const spin = isRunning(activity.status) && isLast && running;
    const Icon = toolIcon(activity.toolName, activity.status);
    return renderPart(render, "span", { status: activity.status }, {
        className: clsx("inv-tool-call__icon-wrapper", { "inv-tool-call__icon--blinking": spin }, className),
        "data-status": activity.status,
        "data-spin": spin,
        children: _jsx(Icon, { size: 14, className: "inv-tool-call__icon" }),
    });
};
const ToolName = ({ render, className }) => {
    const { activity } = useToolCall();
    return renderPart(render, "span", { toolName: activity.toolName }, {
        className,
        children: activity.toolName,
    });
};
const StatusText = ({ render, className, }) => {
    const { activity, isLast, running } = useToolCall();
    const label = activity.statusMessage ?? defaultLabel(activity.status, activity.toolName);
    const shimmer = isRunning(activity.status) && isLast && running;
    return renderPart(render, "span", { status: activity.status, label }, {
        // Live region so status transitions (Calling → Running → Called/failed)
        // are announced; only changes are spoken, so settled cards stay quiet.
        role: "status",
        "aria-live": "polite",
        className: clsx("inv-tool-call__name", { "inv-tool-call__name--shimmer": shimmer }, className),
        children: label,
    });
};
const Parameters = ({ render, className }) => {
    const { activity } = useToolCall();
    // Honors the legacy `_request` key + falls back to raw args when unparseable.
    const inputString = resolveRequest(activity);
    return renderPart(render, "pre", { input: activity.input, inputString }, {
        className,
        children: inputString,
    });
};
const Result = ({ render, className, }) => {
    const { activity } = useToolCall();
    // Legacy tools packed the result into a `_response` arg key (no tool message).
    const legacyResponse = resolveLegacyResponse(activity);
    // Enabled when there's a paired result, an error, or a legacy `_response`.
    if (activity.result == null && !activity.isError && legacyResponse === undefined)
        return null;
    const text = activity.isError
        ? (activity.errorText ?? activity.result ?? "")
        : legacyResponse !== undefined
            ? prettyValue(legacyResponse)
            : prettyResult(activity.result);
    return renderPart(render, "div", { result: activity.result, isError: activity.isError, errorText: activity.errorText }, {
        className: clsx({ "inv-tool-call__result--error": activity.isError }, className),
        children: text,
    });
};
const Trigger = ({ render, className, children }) => {
    const { isOpen, setOpen, panelId, triggerId } = useToolCall();
    return renderPart(render, "button", { state: isOpen ? "open" : "closed" }, {
        type: "button",
        id: triggerId,
        className,
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        onClick: () => setOpen(!isOpen),
        children,
    });
};
const Content = ({ render, className, children }) => {
    const { isOpen, panelId, triggerId } = useToolCall();
    if (!isOpen)
        return null;
    return renderPart(render, "div", { isOpen }, {
        id: panelId,
        role: "region",
        "aria-labelledby": triggerId,
        "data-state": "open",
        className,
        children,
    });
};
/**
 * The compound tool-call primitive set. Compose `Root` + parts to render a tool
 * call however a given surface needs.
 *
 * @category Components
 */
export const ToolCall = {
    Root,
    Trigger,
    Content,
    StatusIcon,
    StatusText,
    ToolName,
    Parameters,
    Result,
};
//# sourceMappingURL=ToolCallPrimitives.js.map