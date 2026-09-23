import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
export const BehindTheScenes = ({ isStreaming, toolCallsComplete, children, }) => {
    // null = auto-managed, boolean = user override
    const [userOverride, setUserOverride] = useState(null);
    // Once tools complete, latch closed — never auto-open again for this message
    const hasCompletedOnce = useRef(false);
    const prevStreaming = useRef(isStreaming);
    // Reset everything when a new streaming session starts
    useEffect(() => {
        if (isStreaming && !prevStreaming.current) {
            setUserOverride(null);
            hasCompletedOnce.current = false;
        }
        prevStreaming.current = isStreaming;
    }, [isStreaming]);
    // Latch: once tool calls complete, remember it forever for this session
    if (toolCallsComplete && !hasCompletedOnce.current) {
        hasCompletedOnce.current = true;
    }
    const toolsActive = !!isStreaming && !hasCompletedOnce.current;
    const autoExpanded = toolsActive;
    const isExpanded = userOverride !== null ? userOverride : autoExpanded;
    const toggle = () => {
        setUserOverride((prev) => (prev !== null ? !prev : !isExpanded));
    };
    const panelId = useId();
    return (_jsxs("div", { className: "inv-behind-the-scenes", children: [_jsxs("button", { className: "inv-behind-the-scenes__toggle", onClick: toggle, type: "button", "aria-expanded": isExpanded, "aria-controls": panelId, children: [isExpanded ? (_jsx(ChevronUp, { size: 14, className: "inv-behind-the-scenes__toggle-icon" })) : (_jsx(ChevronDown, { size: 14, className: "inv-behind-the-scenes__toggle-icon" })), toolsActive ? "Working..." : "Behind the scenes"] }), isExpanded && (_jsx("div", { className: "inv-behind-the-scenes__items", id: panelId, children: children }))] }));
};
//# sourceMappingURL=BehindTheScenes.js.map