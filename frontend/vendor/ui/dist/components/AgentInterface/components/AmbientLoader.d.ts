/**
 * Ambient loading state for AgentInterface surfaces: two blurred glow blobs
 * drift and breathe behind a centered dot-matrix loader with a contextual
 * label. Fills whatever panel hosts it (min 280px tall), adapts to light/dark
 * through the theme tokens, and freezes under `prefers-reduced-motion`.
 *
 * The label is required on purpose — every loading surface should say what is
 * actually happening ("Loading artifacts…"), never a bare "Loading…".
 */
export declare const AmbientLoader: ({ label, className }: {
    label: string;
    className?: string;
}) => import("react").JSX.Element;
//# sourceMappingURL=AmbientLoader.d.ts.map