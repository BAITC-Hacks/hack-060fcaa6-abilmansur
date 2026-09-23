import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActiveDetailedView } from "@inv/headless";
import clsx from "clsx";
import { PanelLeft } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLayoutContext } from "../../context/LayoutContext";
import { IconButton } from "../IconButton";
import { AgentInterfaceTooltip } from "./_shared/AgentInterfaceTooltip";
import { useAgentInterfaceStore } from "./_shared/store";
const SIDEBAR_FADE_DURATION_MS = 90;
const SIDEBAR_RESIZE_DURATION_MS = 160;
const SidebarVisualStateContext = createContext(null);
export const useOptionalSidebarVisualState = () => useContext(SidebarVisualStateContext);
export const SidebarContainer = ({ children, className, }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
        isSidebarOpen: state.isSidebarOpen,
        setIsSidebarOpen: state.setIsSidebarOpen,
    }));
    const { isDetailedViewActive } = useActiveDetailedView();
    const { layout } = useLayoutContext() || {};
    const isMobile = layout === "mobile";
    const [isCollapsedLayout, setIsCollapsedLayout] = useState(!isSidebarOpen);
    const [visualState, setVisualState] = useState(isSidebarOpen ? "expanded" : "collapsed");
    const animationTimeoutsRef = useRef([]);
    const previousIsMobileRef = useRef(null);
    const clearAnimationTimeouts = () => {
        animationTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        animationTimeoutsRef.current = [];
    };
    useEffect(() => {
        return () => {
            clearAnimationTimeouts();
        };
    }, []);
    useEffect(() => {
        clearAnimationTimeouts();
        const justSwitchedLayout = previousIsMobileRef.current !== isMobile;
        previousIsMobileRef.current = isMobile;
        if (justSwitchedLayout) {
            const targetOpen = !isMobile;
            if (isSidebarOpen !== targetOpen) {
                setIsSidebarOpen(targetOpen);
                return;
            }
        }
        if (isMobile) {
            setIsCollapsedLayout(!isSidebarOpen);
            setVisualState(isSidebarOpen ? "expanded" : "collapsed");
            return;
        }
        if (isSidebarOpen) {
            if (visualState === "expanded" && !isCollapsedLayout) {
                return;
            }
            setIsCollapsedLayout(true);
            setVisualState("expanding");
            animationTimeoutsRef.current.push(setTimeout(() => {
                setIsCollapsedLayout(false);
                animationTimeoutsRef.current.push(setTimeout(() => {
                    setVisualState("expanded");
                }, SIDEBAR_RESIZE_DURATION_MS));
            }, SIDEBAR_FADE_DURATION_MS));
            return;
        }
        if (visualState === "collapsed" && isCollapsedLayout) {
            return;
        }
        setIsCollapsedLayout(false);
        setVisualState("collapsing");
        animationTimeoutsRef.current.push(setTimeout(() => {
            setIsCollapsedLayout(true);
            animationTimeoutsRef.current.push(setTimeout(() => {
                setVisualState("collapsed");
            }, SIDEBAR_RESIZE_DURATION_MS));
        }, SIDEBAR_FADE_DURATION_MS));
    }, [isMobile, isSidebarOpen]);
    const contextValue = useMemo(() => ({
        isCollapsedLayout,
        visualState,
    }), [isCollapsedLayout, visualState]);
    return (_jsxs(SidebarVisualStateContext.Provider, { value: contextValue, children: [isMobile && (_jsx("div", { className: clsx("inv-agent-sidebar-container__overlay", {
                    "inv-agent-sidebar-container__overlay--collapsed": !isSidebarOpen,
                }), onClick: () => {
                    setIsSidebarOpen(false);
                } })), _jsx("div", { className: clsx("inv-agent-sidebar-container", {
                    "inv-agent-sidebar-container--collapsed": isCollapsedLayout,
                    "inv-agent-sidebar-container--hidden": isDetailedViewActive && !isMobile,
                }, className), "data-sidebar-visual-state": visualState, onClick: () => {
                    if (!isMobile && isCollapsedLayout) {
                        setIsSidebarOpen(true);
                    }
                }, children: children })] }));
};
export const SidebarHeader = ({ className, logo, agentName: agentNameProp, collapseButton, children, }) => {
    const { agentName: ctxAgentName, logoUrl, setIsSidebarOpen, isSidebarOpen, } = useAgentInterfaceStore((state) => ({
        agentName: state.agentName,
        logoUrl: state.logoUrl,
        setIsSidebarOpen: state.setIsSidebarOpen,
        isSidebarOpen: state.isSidebarOpen,
    }));
    const sidebarVisualState = useOptionalSidebarVisualState();
    const isCollapsedLayout = sidebarVisualState?.isCollapsedLayout ?? !isSidebarOpen;
    if (children != null) {
        if (typeof process !== "undefined" &&
            process.env?.["NODE_ENV"] !== "production" &&
            (logo !== undefined || agentNameProp !== undefined || collapseButton !== undefined)) {
            console.warn("[AgentInterface] <AgentInterface.SidebarHeader> received both children and override props; children win.");
        }
        return (_jsx("div", { className: clsx("inv-agent-sidebar-header", { "inv-agent-sidebar-header--collapsed": isCollapsedLayout }, className), children: children }));
    }
    const defaultLogo = logoUrl ? (_jsx("img", { src: logoUrl, alt: ctxAgentName, className: "inv-agent-sidebar-header__logo" })) : null;
    const defaultAgentName = (_jsx("div", { className: "inv-agent-sidebar-header__agent-name", children: ctxAgentName }));
    const defaultCollapseButton = (_jsx(AgentInterfaceTooltip, { content: isCollapsedLayout ? "Open sidebar" : "Close sidebar", side: "right", children: _jsx(IconButton, { icon: _jsx(PanelLeft, { size: "1em", strokeWidth: 2 }), onClick: (e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
            }, size: "small", variant: "tertiary", "aria-label": isSidebarOpen ? "Collapse sidebar" : "Expand sidebar", className: "inv-agent-sidebar-header__toggle-button" }) }));
    return (_jsx("div", { className: clsx("inv-agent-sidebar-header", { "inv-agent-sidebar-header--collapsed": isCollapsedLayout }, className), children: _jsxs("div", { className: "inv-agent-sidebar-header__top-row", children: [logo ?? defaultLogo, agentNameProp ?? defaultAgentName, collapseButton === false ? null : (collapseButton ?? defaultCollapseButton)] }) }));
};
export const SidebarContent = ({ children, className, }) => {
    const isSidebarOpen = useAgentInterfaceStore((state) => state.isSidebarOpen);
    const sidebarVisualState = useOptionalSidebarVisualState();
    const isCollapsedLayout = sidebarVisualState?.isCollapsedLayout ?? !isSidebarOpen;
    return (_jsx("div", { className: clsx("inv-agent-sidebar-content", className, {
            "inv-agent-sidebar-content--collapsed": isCollapsedLayout,
        }), children: children }));
};
export const SidebarSeparator = () => {
    return _jsx("div", { className: "inv-agent-sidebar-separator" });
};
//# sourceMappingURL=Sidebar.js.map