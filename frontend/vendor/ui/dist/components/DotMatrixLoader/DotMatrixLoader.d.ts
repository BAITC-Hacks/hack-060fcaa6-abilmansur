/**
 * Dot-matrix loader with a 5×5 default grid and a 4×4 compact grid. Two comet
 * trails orbit in lockstep — one clockwise around the perimeter, one
 * counterclockwise around the inner ring.
 */
export type DotMatrixLoaderVariant = "default" | "compact";
export declare const DotMatrixLoader: ({ className, size, variant, }: {
    className?: string;
    /** Overrides the variant's total width/height in px. */
    size?: number;
    variant?: DotMatrixLoaderVariant;
}) => import("react").JSX.Element;
//# sourceMappingURL=DotMatrixLoader.d.ts.map