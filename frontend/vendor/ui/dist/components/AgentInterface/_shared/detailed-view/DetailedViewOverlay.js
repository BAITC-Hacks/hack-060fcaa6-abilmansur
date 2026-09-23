import { jsx as _jsx } from "react/jsx-runtime";
import { useActiveDetailedView } from "@inv/headless";
import clsx from "clsx";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useMultipleRefs } from "../../../../hooks/useMultipleRefs";
import { DetailedViewPortalTarget } from "./DetailedViewPortalTarget";
/**
 * Shared overlay wrapper for the detailed-view portal target.
 * Used by the AgentInterface chat surface.
 * Renders an absolute-positioned overlay with slide-in/slide-out animations.
 *
 * @category Components
 */
export const DetailedViewOverlay = forwardRef(({ className }, ref) => {
    const { isDetailedViewActive } = useActiveDetailedView();
    const [shouldRender, setShouldRender] = useState(isDetailedViewActive);
    const [isExiting, setIsExiting] = useState(false);
    const internalRef = useRef(null);
    const mergedRef = useMultipleRefs(ref, internalRef);
    useEffect(() => {
        if (isDetailedViewActive) {
            // Opening: mount immediately, cancel any in-progress exit
            setShouldRender(true);
            setIsExiting(false);
        }
        else if (shouldRender) {
            // Closing: start exit animation, defer unmount
            setIsExiting(true);
        }
    }, [isDetailedViewActive]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleAnimationEnd = useCallback((e) => {
        // Only react to our own animation, not children's animations bubbling up
        if (e.target !== internalRef.current)
            return;
        if (isExiting) {
            setShouldRender(false);
            setIsExiting(false);
        }
    }, [isExiting]);
    if (!shouldRender)
        return null;
    return (_jsx("div", { ref: mergedRef, className: clsx("inv-detailed-view-overlay", { "inv-detailed-view-overlay--exiting": isExiting }, className), onAnimationEnd: handleAnimationEnd, children: _jsx(DetailedViewPortalTarget, {}) }));
});
DetailedViewOverlay.displayName = "DetailedViewOverlay";
//# sourceMappingURL=DetailedViewOverlay.js.map