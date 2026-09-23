import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThreadList } from "@inv/headless";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { EllipsisIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLayoutContext } from "../../context/LayoutContext";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Skeleton } from "../Skeleton";
import { useOptionalNav } from "./_shared/navContext";
import { useAgentInterfaceStore } from "./_shared/store";
const THREAD_SKELETON_WIDTHS = ["78%", "62%", "86%", "70%"];
const ThreadListSkeleton = () => (_jsxs("div", { className: "inv-agent-thread-list-skeleton", role: "status", "aria-live": "polite", "aria-label": "Loading threads", children: [_jsx("div", { className: "inv-agent-thread-list-skeleton__group", "aria-hidden": "true", children: _jsx(Skeleton, { height: "12px", width: "48px" }) }), THREAD_SKELETON_WIDTHS.map((width, index) => (_jsx("div", { className: "inv-agent-thread-list-skeleton__row", "aria-hidden": "true", children: _jsx(Skeleton, { height: "14px", width: width }) }, `${width}-${index}`)))] }));
export const ThreadButton = ({ id, title, className, }) => {
    const selectThread = useThreadList((s) => s.selectThread);
    const deleteThread = useThreadList((s) => s.deleteThread);
    const selectedThreadId = useThreadList((s) => s.selectedThreadId);
    const { isSidebarOpen, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
        isSidebarOpen: state.isSidebarOpen,
        setIsSidebarOpen: state.setIsSidebarOpen,
    }));
    const { layout } = useLayoutContext();
    const nav = useOptionalNav();
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    return (_jsxs("div", { className: clsx("inv-agent-thread-button", {
            "inv-agent-thread-button--selected": selectedThreadId === id,
            "inv-agent-thread-button--actions-open": isActionsOpen,
        }, className), children: [_jsx("button", { className: "inv-agent-thread-button-title", onClick: () => {
                    if (layout === "mobile") {
                        setIsSidebarOpen(!isSidebarOpen);
                    }
                    selectThread(id);
                    // Auto-clear any active route so the thread view surfaces.
                    if (nav && nav.path !== undefined) {
                        nav.navigate(undefined);
                    }
                }, children: title }), _jsxs(DropdownMenu.Root, { open: isActionsOpen, onOpenChange: setIsActionsOpen, children: [_jsx(DropdownMenu.Trigger, { asChild: true, children: _jsx(IconButton, { className: "inv-agent-thread-button-dropdown-trigger", icon: _jsx(EllipsisIcon, { size: "1em" }), size: "2-extra-small", variant: "tertiary", "aria-label": "Thread actions" }) }), _jsx(DropdownMenu.Portal, { children: _jsx(DropdownMenu.Content, { className: "inv-agent-thread-button-dropdown-menu", side: "bottom", align: "start", sideOffset: 4, children: _jsx(DropdownMenu.Item, { asChild: true, onSelect: () => {
                                    deleteThread(id);
                                }, children: _jsx(Button, { buttonType: "destructive", className: "inv-agent-thread-button-dropdown-menu-item", iconLeft: _jsx(Trash2Icon, { size: "1em" }), size: "extra-small", variant: "tertiary", children: "Delete" }) }) }) })] })] }));
};
export const ThreadList = ({ className }) => {
    const threads = useThreadList((s) => s.threads);
    const isLoadingThreads = useThreadList((s) => s.isLoadingThreads);
    const loadThreads = useThreadList((s) => s.loadThreads);
    const [hasRequestedThreads, setHasRequestedThreads] = useState(false);
    const [scrollMasks, setScrollMasks] = useState({ top: false, bottom: false });
    const listRef = useRef(null);
    const updateScrollMasks = useCallback(() => {
        const list = listRef.current;
        if (!list)
            return;
        const maxScrollTop = list.scrollHeight - list.clientHeight;
        const nextMasks = {
            top: maxScrollTop > 0 && list.scrollTop > 1,
            bottom: maxScrollTop > 0 && list.scrollTop < maxScrollTop - 1,
        };
        setScrollMasks((current) => current.top === nextMasks.top && current.bottom === nextMasks.bottom ? current : nextMasks);
    }, []);
    useEffect(() => {
        setHasRequestedThreads(true);
        loadThreads();
    }, []);
    useEffect(() => {
        const list = listRef.current;
        if (!list)
            return;
        updateScrollMasks();
        const resizeObserver = new ResizeObserver(updateScrollMasks);
        resizeObserver.observe(list);
        const mutationObserver = new MutationObserver(updateScrollMasks);
        mutationObserver.observe(list, { childList: true, subtree: true });
        list.addEventListener("scroll", updateScrollMasks, { passive: true });
        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            list.removeEventListener("scroll", updateScrollMasks);
        };
    }, [updateScrollMasks]);
    const showSkeleton = !hasRequestedThreads || isLoadingThreads;
    return (_jsx("div", { ref: listRef, className: clsx("inv-agent-thread-list", {
            "inv-agent-thread-list--mask-top": scrollMasks.top,
            "inv-agent-thread-list--mask-bottom": scrollMasks.bottom,
        }, className), children: showSkeleton ? (_jsx(ThreadListSkeleton, {})) : (_jsxs("div", { className: "inv-agent-thread-list-content", children: [threads.length > 0 && _jsx("div", { className: "inv-agent-thread-list-group", children: "Threads" }), threads.map((thread) => (_jsx(ThreadButton, { id: thread.id, title: thread.title }, thread.id)))] })) }));
};
//# sourceMappingURL=ThreadList.js.map