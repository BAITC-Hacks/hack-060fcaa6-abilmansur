/**
 * Semantic icon-category → representative lucide icon name (kebab-case).
 *
 * When an icon name doesn't resolve, surfaces fall back to the category's
 * representative icon before their own generic fallback, so a miss still
 * renders something topical (`finance` → dollar sign, not a bare circle).
 */
export declare const categoryFallbacks: Record<string, string>;
/** Rendered when neither the icon name nor its category resolves. */
export declare const defaultFallbackIconName = "circle-dot";
/** The icon name to load when a requested icon name misses the catalog. */
export declare const getFallbackIconName: (category?: string) => string;
//# sourceMappingURL=categoryFallbacks.d.ts.map