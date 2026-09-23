import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThread, useThreadList } from "@inv/headless";
import clsx from "clsx";
import { ArrowUp, Square } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { useLayoutContext } from "../../../context/LayoutContext";
import { useAutoFocus } from "../../../hooks/useAutoFocus";
import { useComposerState } from "../../../hooks/useComposerState";
import { IconButton } from "../../IconButton";
export const DesktopWelcomeComposer = ({ className, placeholder = "Type your query here", value, onChange, drafting, inputRef, }) => {
    const internal = useComposerState();
    const isControlled = value !== undefined;
    const textContent = isControlled ? value : internal.textContent;
    const setTextContent = isControlled ? (onChange ?? (() => undefined)) : internal.setTextContent;
    const processMessage = useThread((s) => s.processMessage);
    const cancelMessage = useThread((s) => s.cancelMessage);
    const isRunning = useThread((s) => s.isRunning);
    const isLoadingMessages = useThread((s) => s.isLoadingMessages);
    const ownRef = useRef(null);
    const textareaRef = inputRef ?? ownRef;
    const selectedThreadId = useThreadList((s) => s.selectedThreadId);
    const { layout } = useLayoutContext();
    useAutoFocus(textareaRef, {
        enabled: layout !== "mobile" && !isLoadingMessages,
        focusKey: selectedThreadId,
    });
    const handleSubmit = () => {
        if (!textContent.trim() || isRunning || isLoadingMessages) {
            return;
        }
        processMessage({
            role: "user",
            content: textContent,
        });
        setTextContent("");
    };
    useLayoutEffect(() => {
        const input = textareaRef.current;
        if (!input)
            return;
        // Reset to 0 (not "auto") so scrollHeight reflects content, not container
        input.style.height = "0px";
        input.style.height = `${Math.max(input.scrollHeight, 24)}px`;
    }, [textContent, textareaRef]);
    return (_jsxs("div", { className: clsx("inv-agent-desktop-welcome-composer", className), "data-drafting": (drafting ?? textContent.length > 0) || undefined, children: [_jsx("textarea", { ref: textareaRef, value: textContent, onChange: (e) => setTextContent(e.target.value), className: "inv-agent-desktop-welcome-composer__input", placeholder: placeholder, rows: 1, onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                    }
                } }), _jsx("div", { className: "inv-agent-desktop-welcome-composer__action-bar", children: _jsx(IconButton, { onClick: isRunning ? cancelMessage : handleSubmit, disabled: !textContent.trim() && !isRunning, "aria-label": isRunning ? "Cancel" : "Send", icon: isRunning ? _jsx(Square, { size: "1em", fill: "currentColor" }) : _jsx(ArrowUp, { size: "1em" }), size: "extra-small", variant: "primary", className: "inv-agent-desktop-welcome-composer__submit-button" }) })] }));
};
export default DesktopWelcomeComposer;
//# sourceMappingURL=DesktopWelcomeComposer.js.map