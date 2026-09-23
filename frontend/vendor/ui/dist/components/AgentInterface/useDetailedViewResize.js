import { useCallback, useEffect, useRef, useState } from "react";
const INITIAL_CHAT_WIDTH = 420;
const MIN_CHAT_WIDTH = 420;
const MAX_CHAT_WIDTH_RATIO = 0.8;
/**
 * Custom hook to manage detailed-view panel resizing logic (desktop only).
 * Handles:
 * - Chat panel width constraints
 * - Resize drag events
 * - Sidebar state when detailed view is active/inactive
 */
export const useDetailedViewResize = ({ isDetailedViewActive, isMobile, setIsSidebarOpen, }) => {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const chatPanelRef = useRef(null);
    const detailedViewPanelRef = useRef(null);
    // Current chat-panel width in px. Kept in sync with style.width so keyboard
    // steps and ARIA can read it without measuring (which would be wrong mid-transition).
    const widthRef = useRef(INITIAL_CHAT_WIDTH);
    // Handle sidebar visibility and panel widths when detailed-view state changes
    useEffect(() => {
        if (isMobile)
            return;
        if (isDetailedViewActive) {
            // Desktop view active: close sidebar and set chat width to 420px
            setIsSidebarOpen(false);
            if (chatPanelRef.current) {
                chatPanelRef.current.style.width = `${INITIAL_CHAT_WIDTH}px`;
            }
            widthRef.current = INITIAL_CHAT_WIDTH;
        }
        else {
            // Desktop view inactive: open sidebar and reset chat width
            setIsSidebarOpen(true);
            if (chatPanelRef.current) {
                chatPanelRef.current.style.width = "100%";
            }
            // Reset so the next time the separator mounts it reads the initial width
            // (its mount-time ARIA sync runs before this effect re-sets it on reopen).
            widthRef.current = INITIAL_CHAT_WIDTH;
        }
    }, [isDetailedViewActive, isMobile, setIsSidebarOpen]);
    const setChatWidth = useCallback((width) => {
        if (!chatPanelRef.current)
            return;
        chatPanelRef.current.style.width = `${width}px`;
        widthRef.current = width;
    }, []);
    const handleResize = useCallback((clientX) => {
        if (!containerRef.current)
            return;
        const containerRect = containerRef.current.getBoundingClientRect();
        // Guard against a zero-width container (hidden / not yet laid out):
        // otherwise maxWidthPx is 0 and the clamp collapses the panel to 0px.
        if (containerRect.width <= 0)
            return;
        const newWidthPx = clientX - containerRect.left;
        // Constrain width between min and max
        const maxWidthPx = containerRect.width * MAX_CHAT_WIDTH_RATIO;
        setChatWidth(Math.min(Math.max(newWidthPx, MIN_CHAT_WIDTH), maxWidthPx));
    }, [setChatWidth]);
    // Keyboard resize: nudge by a relative delta. ±Infinity snaps to min/max.
    const handleResizeStep = useCallback((deltaPx) => {
        if (!containerRef.current)
            return;
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        if (containerWidth <= 0)
            return;
        const maxWidthPx = containerWidth * MAX_CHAT_WIDTH_RATIO;
        setChatWidth(Math.min(Math.max(widthRef.current + deltaPx, MIN_CHAT_WIDTH), maxWidthPx));
    }, [setChatWidth]);
    const getResizeAria = useCallback(() => {
        if (!containerRef.current)
            return null;
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        if (containerWidth <= 0)
            return null;
        return {
            now: Math.round((widthRef.current / containerWidth) * 100),
            min: Math.round((MIN_CHAT_WIDTH / containerWidth) * 100),
            max: Math.round(MAX_CHAT_WIDTH_RATIO * 100),
        };
    }, []);
    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);
    return {
        containerRef,
        chatPanelRef,
        detailedViewPanelRef,
        isDragging,
        handleResize,
        handleResizeStep,
        handleDragStart,
        handleDragEnd,
        getResizeAria,
    };
};
//# sourceMappingURL=useDetailedViewResize.js.map