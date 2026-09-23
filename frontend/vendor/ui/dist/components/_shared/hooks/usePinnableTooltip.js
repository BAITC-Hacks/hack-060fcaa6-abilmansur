import { useCallback, useEffect, useRef, useState } from "react";
import { useId } from "./useId";
const PINNABLE_TOOLTIP_OPEN_EVENT = `inv-pinnable-tooltip-open`;
const DEFAULT_GROUP_ID = `inv-pinnable-tooltip-global`;
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
export function usePinnableTooltip(options = {}) {
    const { groupId = DEFAULT_GROUP_ID, closeDelay = 200, onOpenChange } = options;
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [suppressHoverUntilLeave, setSuppressHoverUntilLeave] = useState(false);
    const leaveTimeoutRef = useRef(null);
    const tooltipId = useId();
    const clearLeaveTimeout = useCallback(() => {
        if (leaveTimeoutRef.current !== null) {
            window.clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
    }, []);
    const handleMouseEnter = useCallback(() => {
        clearLeaveTimeout();
        if (isPinned) {
            return;
        }
        if (suppressHoverUntilLeave) {
            setSuppressHoverUntilLeave(false);
        }
        setIsOpen(true);
    }, [clearLeaveTimeout, isPinned, suppressHoverUntilLeave]);
    const handleMouseLeave = useCallback(() => {
        if (suppressHoverUntilLeave) {
            setSuppressHoverUntilLeave(false);
        }
        if (isPinned) {
            return;
        }
        leaveTimeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
            leaveTimeoutRef.current = null;
        }, closeDelay);
    }, [isPinned, suppressHoverUntilLeave, closeDelay]);
    const handleTriggerClick = useCallback(() => {
        clearLeaveTimeout();
        setIsPinned((prevPinned) => {
            const nextPinned = !prevPinned;
            setIsOpen(nextPinned);
            if (!nextPinned) {
                setSuppressHoverUntilLeave(true);
            }
            return nextPinned;
        });
    }, [clearLeaveTimeout]);
    const closeTooltip = useCallback(() => {
        clearLeaveTimeout();
        setIsPinned(false);
        setSuppressHoverUntilLeave(true);
        setIsOpen(false);
    }, [clearLeaveTimeout]);
    const handleContentClick = useCallback(() => {
        closeTooltip();
    }, [closeTooltip]);
    const getPointerDownOutsideHandler = useCallback((triggerSelector) => {
        return (event) => {
            if (event.target?.closest(triggerSelector)) {
                return;
            }
            closeTooltip();
        };
    }, [closeTooltip]);
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            clearLeaveTimeout();
        };
    }, [clearLeaveTimeout]);
    // Notify parent of open state changes
    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);
    // Broadcast open event for coordination with other tooltips in the same group
    useEffect(() => {
        if (!isOpen) {
            return;
        }
        window.dispatchEvent(new CustomEvent(PINNABLE_TOOLTIP_OPEN_EVENT, {
            detail: { id: tooltipId, groupId },
        }));
    }, [tooltipId, isOpen, groupId]);
    // Listen for other tooltips opening in the same group
    useEffect(() => {
        const handleExternalOpen = (event) => {
            const detail = event.detail;
            // Only close if same group and different tooltip
            if (detail?.groupId !== groupId || detail?.id === tooltipId) {
                return;
            }
            closeTooltip();
        };
        window.addEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
        return () => {
            window.removeEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
        };
    }, [tooltipId, groupId, closeTooltip]);
    return {
        isOpen,
        isPinned,
        handleMouseEnter,
        handleMouseLeave,
        handleTriggerClick,
        handleContentClick,
        closeTooltip,
        getPointerDownOutsideHandler,
    };
}
//# sourceMappingURL=usePinnableTooltip.js.map