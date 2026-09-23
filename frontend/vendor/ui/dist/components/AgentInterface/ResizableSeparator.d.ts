import type { ResizeAriaValues } from "./useDetailedViewResize";
interface ResizableSeparatorProps {
    /** Mouse drag: receives the pointer's absolute clientX. */
    onResize: (clientX: number) => void;
    /** Keyboard resize: receives a relative px delta (±Infinity snaps to min/max). */
    onResizeStep: (deltaPx: number) => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    /** Returns the current size as ARIA percentages, or null if unmeasurable. */
    getAriaValues: () => ResizeAriaValues | null;
    /** id of the panel this separator resizes (for aria-controls). */
    controlsId?: string;
    ariaLabel?: string;
    className?: string;
}
/**
 * A draggable, keyboard-operable vertical separator for resizing panels.
 * Used between chat and detailed-view panels in desktop mode.
 *
 * Implements the WAI-ARIA window-splitter pattern: focusable, `role="separator"`,
 * Left/Right (Shift for larger steps) to resize, Home/End to snap to min/max.
 */
export declare const ResizableSeparator: ({ onResize, onResizeStep, onDragStart, onDragEnd, getAriaValues, controlsId, ariaLabel, className, }: ResizableSeparatorProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ResizableSeparator.d.ts.map