/**
 * Props for {@link DetailedViewPortalTarget}.
 */
export type DetailedViewPortalTargetProps = {
    /** Additional CSS class name(s) applied to the container element. */
    className?: string;
};
/**
 * Registers a DOM node as the render target for {@link DetailedViewPanel} portals.
 *
 * Mount exactly one instance in your layout. Renders a `<div>` with
 * `display: contents` so it doesn't affect layout flow.
 *
 * @category Components
 */
export declare const DetailedViewPortalTarget: import("react").ForwardRefExoticComponent<DetailedViewPortalTargetProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DetailedViewPortalTarget.d.ts.map