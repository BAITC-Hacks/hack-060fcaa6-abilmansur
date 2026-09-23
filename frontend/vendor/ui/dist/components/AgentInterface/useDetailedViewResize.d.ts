interface UseDetailedViewResizeProps {
    isDetailedViewActive: boolean;
    isMobile: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}
/** Chat-panel width as percentages of the container, for the resize separator's ARIA. */
export interface ResizeAriaValues {
    now: number;
    min: number;
    max: number;
}
interface UseDetailedViewResizeReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    chatPanelRef: React.RefObject<HTMLDivElement | null>;
    detailedViewPanelRef: React.RefObject<HTMLDivElement | null>;
    isDragging: boolean;
    handleResize: (clientX: number) => void;
    /** Resize by a relative px delta (keyboard). Pass ±Infinity to snap to min/max. */
    handleResizeStep: (deltaPx: number) => void;
    handleDragStart: () => void;
    handleDragEnd: () => void;
    getResizeAria: () => ResizeAriaValues | null;
}
/**
 * Custom hook to manage detailed-view panel resizing logic (desktop only).
 * Handles:
 * - Chat panel width constraints
 * - Resize drag events
 * - Sidebar state when detailed view is active/inactive
 */
export declare const useDetailedViewResize: ({ isDetailedViewActive, isMobile, setIsSidebarOpen, }: UseDetailedViewResizeProps) => UseDetailedViewResizeReturn;
export {};
//# sourceMappingURL=useDetailedViewResize.d.ts.map