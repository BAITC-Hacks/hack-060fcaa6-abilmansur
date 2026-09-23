import { jsx as _jsx } from "react/jsx-runtime";
import { useDetailedViewPortalTarget } from "@inv/headless";
import { forwardRef, useCallback, useRef } from "react";
/**
 * Registers a DOM node as the render target for {@link DetailedViewPanel} portals.
 *
 * Mount exactly one instance in your layout. Renders a `<div>` with
 * `display: contents` so it doesn't affect layout flow.
 *
 * @category Components
 */
export const DetailedViewPortalTarget = forwardRef(({ className }, ref) => {
    const { setNode } = useDetailedViewPortalTarget();
    const forwardedRef = useRef(ref);
    forwardedRef.current = ref;
    const callbackRef = useCallback((node) => {
        setNode(node);
        const fRef = forwardedRef.current;
        if (typeof fRef === "function") {
            fRef(node);
        }
        else if (fRef) {
            fRef.current = node;
        }
    }, [setNode]);
    return _jsx("div", { ref: callbackRef, className: className, style: { display: "contents" } });
});
DetailedViewPortalTarget.displayName = "DetailedViewPortalTarget";
//# sourceMappingURL=DetailedViewPortalTarget.js.map