import { useCallback, useEffect, useState } from "react";
/**
 * Splits `n` items into rows of at most `maxPerRow` (2 or 3) so the grid never
 * ends with a lonely single card when it can be avoided.
 */
export function getRowConfiguration(n, maxPerRow) {
    if (n <= 0)
        return [];
    if (n === 1)
        return [1];
    if (maxPerRow === 2) {
        const fullRows = Math.floor(n / 2);
        const remainder = n % 2;
        const result = Array(fullRows).fill(2);
        if (remainder)
            result.push(1);
        return result;
    }
    if (n % 3 === 0) {
        return Array(n / 3).fill(3);
    }
    if (n % 3 === 2) {
        const threes = Math.floor(n / 3);
        const result = Array(threes).fill(3);
        result.splice(Math.ceil(result.length / 2), 0, 2);
        return result;
    }
    const threes = Math.floor((n - 4) / 3);
    const result = Array(threes).fill(3);
    return [...result, 2, 2];
}
/** Tracks a horizontally scrolling element and reports whether either edge is overflowing. */
export function useCarouselMask() {
    const [element, setElement] = useState(null);
    const [maskLeft, setMaskLeft] = useState(false);
    const [maskRight, setMaskRight] = useState(false);
    const updateMask = useCallback(() => {
        if (!element) {
            return;
        }
        setMaskLeft(element.scrollLeft > 0);
        setMaskRight(Math.ceil(element.scrollLeft) + element.offsetWidth < element.scrollWidth);
    }, [element]);
    useEffect(() => {
        if (!element) {
            return;
        }
        updateMask();
        const resizeObserver = new ResizeObserver(updateMask);
        resizeObserver.observe(element);
        const mutationObserver = new MutationObserver(updateMask);
        mutationObserver.observe(element, { childList: true, subtree: true });
        element.addEventListener("scroll", updateMask, { passive: true });
        return () => {
            element.removeEventListener("scroll", updateMask);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [element, updateMask]);
    return { scrollRef: setElement, maskLeft, maskRight };
}
//# sourceMappingURL=smallCardBlockUtils.js.map