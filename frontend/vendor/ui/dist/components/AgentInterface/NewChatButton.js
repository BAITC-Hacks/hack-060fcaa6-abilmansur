import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThreadList } from "@inv/headless";
import clsx from "clsx";
import { SquarePen } from "lucide-react";
import { useLayoutContext } from "../../context/LayoutContext";
import { Button } from "../Button";
import { useOptionalSidebarVisualState } from "./Sidebar";
import { SidebarTooltip } from "./SidebarTooltip";
import { useOptionalNav } from "./_shared/navContext";
import { useAgentInterfaceStore } from "./_shared/store";
export const NewChatButton = ({ className }) => {
    const switchToNewThread = useThreadList((s) => s.switchToNewThread);
    const { isSidebarOpen } = useAgentInterfaceStore((state) => ({
        isSidebarOpen: state.isSidebarOpen,
    }));
    const sidebarVisualState = useOptionalSidebarVisualState();
    const showExpandedButton = sidebarVisualState
        ? !sidebarVisualState.isCollapsedLayout
        : isSidebarOpen;
    const nav = useOptionalNav();
    const { layout } = useLayoutContext();
    const isMobile = layout === "mobile";
    const handleNewChat = (e) => {
        e.stopPropagation();
        switchToNewThread();
        if (nav && nav.path !== undefined) {
            nav.navigate(undefined);
        }
    };
    if (isMobile) {
        return (_jsx(Button, { variant: "primary", size: "large", iconLeft: _jsx(SquarePen, { size: "1em" }), className: clsx("inv-agent-new-chat-floating-button", className), onClick: handleNewChat, "aria-label": "New chat", children: "New Chat" }));
    }
    return (_jsx(SidebarTooltip, { content: "New Chat", disabled: showExpandedButton, children: _jsxs("button", { type: "button", className: clsx("inv-agent-new-chat-button", { "inv-agent-new-chat-button--collapsed": !showExpandedButton }, className), onClick: handleNewChat, "aria-label": "New chat", children: [_jsx("div", { className: "inv-agent-new-chat-button__icon", "aria-hidden": "true", children: _jsx(SquarePen, { size: "1em" }) }), _jsx("div", { className: "inv-agent-new-chat-button__label", children: "New Chat" })] }) }));
};
//# sourceMappingURL=NewChatButton.js.map