import { Theme } from "./types";
/**
 * Convert a camel case string to a kebab case string.
 * @param str - The string to convert.
 * @returns A kebab case string.
 */
export declare function camelToKebab(str: string): string;
/**
 * Convert a theme object to a string of CSS variables.
 * @param theme - The theme object to convert.
 * @param prefix - The prefix to use for the CSS variables.
 * @returns A string of CSS variables.
 */
export declare function themeToCssVars(theme: Record<string, unknown>, prefix?: string): string;
/**
 * Every theme key accepted at runtime: all keys present in the default themes
 * plus the chart palette keys, which are declared only on the type (a default
 * palette would override the per-chart `theme` prop fallback in
 * useChartPalette). `CHART_PALETTE_KEYS` in types.ts is the single source the
 * `ChartColorPalette` type itself derives from. Shared by `createTheme()` and
 * the ThemeProvider prop validator so the two allow-lists cannot drift apart.
 */
export declare const KNOWN_THEME_KEYS: ReadonlySet<string>;
/**
 * Validate a partial theme object in development and return it as-is.
 *
 * Works for both light and dark overrides — call it once per theme object:
 *
 * ```tsx
 * <ThemeProvider
 *   lightTheme={createTheme({ interactiveAccentDefault: "oklch(0.6 0.2 260)" })}
 *   darkTheme={createTheme({ interactiveAccentDefault: "oklch(0.4 0.2 260)" })}
 * />
 * ```
 *
 * In non-production builds this checks every key against the known theme keys
 * and emits a `console.warn` with a "did you mean …?" suggestion for typos.
 * In production the validation code is stripped by bundlers.
 *
 * @param theme - A partial {@link Theme} to validate (light or dark overrides).
 * @returns The same `theme` object, unmodified.
 */
export declare function createTheme(theme: Theme): Theme;
//# sourceMappingURL=utils.d.ts.map