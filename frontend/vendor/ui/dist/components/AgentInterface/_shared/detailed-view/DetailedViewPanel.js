import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDetailedView, useDetailedViewPortalTarget } from "@inv/headless";
import clsx from "clsx";
import { X } from "lucide-react";
import { Component, forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../../../IconButton";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";
/** @internal */
class DetailedViewErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}
/** @internal */
const DefaultHeader = ({ title, onClose }) => (_jsxs("div", { className: "inv-detailed-view-panel__header", children: [_jsx("span", { className: "inv-detailed-view-panel__title", children: title }), _jsx(IconButton, { variant: "tertiary", size: "small", icon: _jsx(X, { size: "1em" }), onClick: onClose, "aria-label": "Close detailed-view panel" })] }));
/**
 * Portals detailed-view content into the nearest {@link DetailedViewPortalTarget}.
 *
 * Renders nothing when the view is inactive or no portal target is mounted.
 * Wraps children in an error boundary and applies theme-scoped class names.
 *
 * Requires `<DetailedViewPortalTarget />` to be mounted in the layout.
 *
 * @category Components
 */
export const DetailedViewPanel = forwardRef(({ viewId, children, title, className, errorFallback, header = true }, ref) => {
    const { isActive, close } = useDetailedView(viewId);
    const { node: panelNode } = useDetailedViewPortalTarget();
    const { portalThemeClassName } = useTheme();
    useEffect(() => {
        if (!isActive || panelNode)
            return;
        const timer = setTimeout(() => {
            console.warn("[Inv] DetailedViewPanel: view is active but no render target is mounted. " +
                "Ensure <DetailedViewPortalTarget /> is rendered in your layout.");
        }, 100);
        return () => clearTimeout(timer);
    }, [isActive, panelNode]);
    if (!isActive || !panelNode)
        return null;
    const handleClose = () => close();
    let headerContent = null;
    if (header === true) {
        headerContent = _jsx(DefaultHeader, { title: title ?? "Detailed view", onClose: handleClose });
    }
    else if (header !== false) {
        headerContent = header;
    }
    return createPortal(_jsxs("div", { ref: ref, id: `inv-detailed-view-panel-${viewId}`, className: clsx("inv-detailed-view-panel", portalThemeClassName, className), role: "region", "aria-label": title ?? "Detailed view panel", children: [headerContent, _jsx(DetailedViewErrorBoundary, { fallback: errorFallback, children: children })] }), panelNode);
});
DetailedViewPanel.displayName = "DetailedViewPanel";
//# sourceMappingURL=DetailedViewPanel.js.map