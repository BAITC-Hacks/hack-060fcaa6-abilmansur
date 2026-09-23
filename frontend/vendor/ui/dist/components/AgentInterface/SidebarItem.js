import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useLayoutContext } from "../../context/LayoutContext";
import { useOptionalSidebarVisualState } from "./Sidebar";
import { SidebarTooltip } from "./SidebarTooltip";
import { useOptionalNav } from "./_shared/navContext";
import { useAgentInterfaceStore } from "./_shared/store";
/**
 * Styled clickable item for use inside <AgentInterface.Sidebar>. Visually
 * matches the ThreadList row so custom nav items blend with the default
 * thread list.
 */
export const SidebarItem = ({ icon, trailing, selected, path, className, children, onClick, ...rest }) => {
    const nav = useOptionalNav();
    const layoutCtx = useLayoutContext();
    const setIsSidebarOpen = useAgentInterfaceStore((s) => s.setIsSidebarOpen);
    const sidebarVisualState = useOptionalSidebarVisualState();
    const isCollapsedLayout = sidebarVisualState?.isCollapsedLayout ?? false;
    const isActive = selected !== undefined ? selected : path !== undefined && nav?.path === path;
    const handleClick = (e) => {
        onClick?.(e);
        if (e.defaultPrevented)
            return;
        if (path !== undefined && nav) {
            nav.navigate(path);
            if (layoutCtx?.layout === "mobile") {
                setIsSidebarOpen(false);
            }
        }
    };
    const button = (_jsxs("button", { type: "button", className: clsx("inv-agent-sidebar-item", { "inv-agent-sidebar-item--selected": isActive }, className), onClick: handleClick, ...rest, children: [icon !== undefined && _jsx("span", { className: "inv-agent-sidebar-item__icon", children: icon }), _jsx("span", { className: "inv-agent-sidebar-item__label", children: children }), trailing !== undefined && (_jsx("span", { className: "inv-agent-sidebar-item__trailing", children: trailing }))] }));
    return (_jsx(SidebarTooltip, { content: children, disabled: !isCollapsedLayout, children: button }));
};
//# sourceMappingURL=SidebarItem.js.map