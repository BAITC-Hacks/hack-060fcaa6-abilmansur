import { type ReactNode } from "react";
/**
 * Props for {@link DetailedViewPanel}.
 *
 * @category Components
 */
export type DetailedViewPanelProps = {
    /** Detailed-view id this panel renders content for. Must match the id passed to `useDetailedView(viewId)`. */
    viewId: string;
    /** Content rendered inside the panel when this view is active. */
    children: ReactNode;
    /** Display title for the panel header and aria-label. Defaults to `"Detailed view"`. */
    title?: string;
    /** Additional CSS class name(s) applied to the panel container. */
    className?: string;
    /** Fallback UI rendered if children throw during rendering. Defaults to `null`. */
    errorFallback?: ReactNode;
    /**
     * Controls the panel header.
     * - `true` (default): built-in header with title + close button
     * - `false`: no header, raw children only
     * - `ReactNode`: custom header replacing the built-in one
     */
    header?: boolean | ReactNode;
};
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
export declare const DetailedViewPanel: import("react").ForwardRefExoticComponent<DetailedViewPanelProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DetailedViewPanel.d.ts.map