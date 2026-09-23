require("./chunk-CKQMccvm.cjs");
let react = require("react");
//#region src/components/_shared/hooks/useId.ts
const useId = () => {
	return (0, react.useMemo)(() => crypto.randomUUID(), []);
};
//#endregion
//#region src/components/_shared/hooks/usePinnableTooltip.ts
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
function usePinnableTooltip(options = {}) {
	const { groupId = DEFAULT_GROUP_ID, closeDelay = 200, onOpenChange } = options;
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const [isPinned, setIsPinned] = (0, react.useState)(false);
	const [suppressHoverUntilLeave, setSuppressHoverUntilLeave] = (0, react.useState)(false);
	const leaveTimeoutRef = (0, react.useRef)(null);
	const tooltipId = useId();
	const clearLeaveTimeout = (0, react.useCallback)(() => {
		if (leaveTimeoutRef.current !== null) {
			window.clearTimeout(leaveTimeoutRef.current);
			leaveTimeoutRef.current = null;
		}
	}, []);
	const handleMouseEnter = (0, react.useCallback)(() => {
		clearLeaveTimeout();
		if (isPinned) return;
		if (suppressHoverUntilLeave) setSuppressHoverUntilLeave(false);
		setIsOpen(true);
	}, [
		clearLeaveTimeout,
		isPinned,
		suppressHoverUntilLeave
	]);
	const handleMouseLeave = (0, react.useCallback)(() => {
		if (suppressHoverUntilLeave) setSuppressHoverUntilLeave(false);
		if (isPinned) return;
		leaveTimeoutRef.current = window.setTimeout(() => {
			setIsOpen(false);
			leaveTimeoutRef.current = null;
		}, closeDelay);
	}, [
		isPinned,
		suppressHoverUntilLeave,
		closeDelay
	]);
	const handleTriggerClick = (0, react.useCallback)(() => {
		clearLeaveTimeout();
		setIsPinned((prevPinned) => {
			const nextPinned = !prevPinned;
			setIsOpen(nextPinned);
			if (!nextPinned) setSuppressHoverUntilLeave(true);
			return nextPinned;
		});
	}, [clearLeaveTimeout]);
	const closeTooltip = (0, react.useCallback)(() => {
		clearLeaveTimeout();
		setIsPinned(false);
		setSuppressHoverUntilLeave(true);
		setIsOpen(false);
	}, [clearLeaveTimeout]);
	const handleContentClick = (0, react.useCallback)(() => {
		closeTooltip();
	}, [closeTooltip]);
	const getPointerDownOutsideHandler = (0, react.useCallback)((triggerSelector) => {
		return (event) => {
			if (event.target?.closest(triggerSelector)) return;
			closeTooltip();
		};
	}, [closeTooltip]);
	(0, react.useEffect)(() => {
		return () => {
			clearLeaveTimeout();
		};
	}, [clearLeaveTimeout]);
	(0, react.useEffect)(() => {
		onOpenChange?.(isOpen);
	}, [isOpen, onOpenChange]);
	(0, react.useEffect)(() => {
		if (!isOpen) return;
		window.dispatchEvent(new CustomEvent(PINNABLE_TOOLTIP_OPEN_EVENT, { detail: {
			id: tooltipId,
			groupId
		} }));
	}, [
		tooltipId,
		isOpen,
		groupId
	]);
	(0, react.useEffect)(() => {
		const handleExternalOpen = (event) => {
			const detail = event.detail;
			if (detail?.groupId !== groupId || detail?.id === tooltipId) return;
			closeTooltip();
		};
		window.addEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
		return () => {
			window.removeEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
		};
	}, [
		tooltipId,
		groupId,
		closeTooltip
	]);
	return {
		isOpen,
		isPinned,
		handleMouseEnter,
		handleMouseLeave,
		handleTriggerClick,
		handleContentClick,
		closeTooltip,
		getPointerDownOutsideHandler
	};
}
//#endregion
Object.defineProperty(exports, "useId", {
	enumerable: true,
	get: function() {
		return useId;
	}
});
Object.defineProperty(exports, "usePinnableTooltip", {
	enumerable: true,
	get: function() {
		return usePinnableTooltip;
	}
});

//# sourceMappingURL=usePinnableTooltip-CHTGA15A.cjs.map