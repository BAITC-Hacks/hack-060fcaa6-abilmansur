/**
 * Splits `n` items into rows of at most `maxPerRow` (2 or 3) so the grid never
 * ends with a lonely single card when it can be avoided.
 */
export declare function getRowConfiguration(n: number, maxPerRow: number): number[];
export interface CarouselMask {
    /** Attach to the scrolling element (callback ref, so late mounts are observed). */
    scrollRef: (element: HTMLDivElement | null) => void;
    maskLeft: boolean;
    maskRight: boolean;
}
/** Tracks a horizontally scrolling element and reports whether either edge is overflowing. */
export declare function useCarouselMask(): CarouselMask;
//# sourceMappingURL=smallCardBlockUtils.d.ts.map