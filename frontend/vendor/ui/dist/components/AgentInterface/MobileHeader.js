import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThreadList } from "@inv/headless";
import clsx from "clsx";
import { Menu, SquarePen } from "lucide-react";
import { IconButton } from "../IconButton";
import { useAgentInterfaceStore } from "./_shared/store";
export const MobileHeader = ({ className, logo, agentName: agentNameProp, menuButton, newChatButton, actions, children, }) => {
    const switchToNewThread = useThreadList((s) => s.switchToNewThread);
    const { agentName: ctxAgentName, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
        agentName: state.agentName,
        setIsSidebarOpen: state.setIsSidebarOpen,
    }));
    if (children != null) {
        if (typeof process !== "undefined" &&
            process.env?.["NODE_ENV"] !== "production" &&
            (logo !== undefined ||
                agentNameProp !== undefined ||
                menuButton !== undefined ||
                newChatButton !== undefined ||
                actions !== undefined)) {
            console.warn("[AgentInterface] <AgentInterface.MobileHeader> received both children and override props; children win.");
        }
        return _jsx("div", { className: clsx("inv-agent-mobile-header", className), children: children });
    }
    const defaultMenuButton = (_jsx(IconButton, { size: "medium", icon: _jsx(Menu, { size: "1em" }), onClick: () => setIsSidebarOpen(true), variant: "secondary", "aria-label": "Open sidebar" }));
    const defaultAgentName = (_jsx("span", { className: "inv-agent-mobile-header-agent-name", children: ctxAgentName }));
    const defaultNewChatButton = (_jsx(IconButton, { size: "medium", icon: _jsx(SquarePen, { size: "1em" }), onClick: switchToNewThread, variant: "secondary", "aria-label": "New chat" }));
    return (_jsxs("div", { className: clsx("inv-agent-mobile-header", className), children: [menuButton === false ? null : (menuButton ?? defaultMenuButton), _jsxs("div", { className: "inv-agent-mobile-header-logo-container", children: [logo, agentNameProp ?? defaultAgentName] }), _jsxs("div", { className: "inv-agent-mobile-header-actions", children: [newChatButton === false ? null : (newChatButton ?? defaultNewChatButton), actions] })] }));
};
//# sourceMappingURL=MobileHeader.js.map