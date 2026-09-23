import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useShellStore } from "../_shared/store";
/**
 * Wraps a GenUI assistant message with the assistant logo + content layout.
 *
 * Extracted from the (now-deleted) Shell so the kept `GenUIAssistantMessage`
 * keeps rendering under `AgentInterface`. `logoUrl`/`showAssistantLogo` come
 * from the library-wide shell store, which `AgentInterface`'s `Container`
 * provides via `ShellStoreProvider`.
 */
export const AssistantMessageContainer = ({ children, className, }) => {
    const { logoUrl, showAssistantLogo } = useShellStore((store) => ({
        logoUrl: store.logoUrl,
        showAssistantLogo: store.showAssistantLogo,
    }));
    return (_jsxs("div", { className: clsx("inv-shell-thread-message-assistant", className, {
            "inv-shell-thread-message-assistant--without-logo": !showAssistantLogo,
        }), children: [showAssistantLogo && (_jsx("img", { src: logoUrl, alt: "Assistant", className: "inv-shell-thread-message-assistant__logo" })), _jsx("div", { className: "inv-shell-thread-message-assistant__content", children: children })] }));
};
//# sourceMappingURL=AssistantMessageContainer.js.map