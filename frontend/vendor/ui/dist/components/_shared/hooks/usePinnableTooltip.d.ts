export interface UsePinnableTooltipOptions {
    /**
     * Group ID for coordinating multiple tooltips (only one open at a time per group).
     * If not provided, uses a global group so only one tooltip is open at a time across the app.
     */
    groupId?: string;
    /** Delay in ms before closing on mouse leave (default: 200) */
    closeDelay?: number;
    /** Callback when open state changes */
    onOpenChange?: (isOpen: boolean) => void;
}
export interface UsePinnableTooltipReturn {
    /** Whether the tooltip is currently open */
    isOpen: boolean;
    /** Whether the tooltip is pinned (clicked open) */
    isPinned: boolean;
    /** Handler for mouse entering trigger or content */
    handleMouseEnter: () => void;
    /** Handler for mouse leaving trigger or content */
    handleMouseLeave: () => void;
    /** Handler for clicking the trigger (toggles pin state) */
    handleTriggerClick: () => void;
    /** Handler for clicking content (closes tooltip) */
    handleContentClick: () => void;
    /** Close the tooltip programmatically */
    closeTooltip: () => void;
    /** Handler for pointer down outside (use with onPointerDownOutside) */
    getPointerDownOutsideHandler: (triggerSelector: string) => (event: {
        target: EventTarget | null;
    }) => void;
}
/**
 * Hook for managing pinnable tooltip state with hover, click-to-pin,
 * and group coordination functionality.
 *
 * @example
 * ```tsx
 * const {
 *   isOpen,
 *   handleMouseEnter,
 *   handleMouseLeave,
 *   handleTriggerClick,
 *   handleContentClick,
 *   getPointerDownOutsideHandler,
 * } = usePinnableTooltip({ groupId: 'my-tooltip-group' })
 *
 * <Tooltip.Root open={isOpen}>
 *   <Tooltip.Trigger
 *     onClick={handleTriggerClick}
 *     onMouseEnter={handleMouseEnter}
 *     onMouseLeave={handleMouseLeave}
 *   >
 *     Trigger
 *   </Tooltip.Trigger>
 *   <Tooltip.Content
 *     onMouseEnter={handleMouseEnter}
 *     onMouseLeave={handleMouseLeave}
 *     onClick={handleContentClick}
 *     onPointerDownOutside={getPointerDownOutsideHandler('.my-trigger')}
 *   >
 *     Content
 *   </Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
export declare function usePinnableTooltip(options?: UsePinnableTooltipOptions): UsePinnableTooltipReturn;
//# sourceMappingURL=usePinnableTooltip.d.ts.map