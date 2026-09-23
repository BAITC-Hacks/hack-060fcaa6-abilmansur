import { type RefObject } from "react";
export interface UseAutoFocusOptions {
    /** @default true */
    enabled?: boolean;
    /** When this value changes, the element is re-focused */
    focusKey?: unknown;
}
/**
 * Focuses a ref'd element on mount, whenever `focusKey` changes, and whenever
 * `enabled` flips back to `true` — but only while the element is actually on
 * screen.
 */
export declare const useAutoFocus: <T extends HTMLElement | null>(ref: RefObject<T>, { enabled, focusKey }?: UseAutoFocusOptions) => void;
//# sourceMappingURL=useAutoFocus.d.ts.map