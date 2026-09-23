export declare const safeUrl: (url: string | null | undefined) => string | undefined;
/**
 * The single allowed entry point for `window.open` in this package.
 *
 * - Validates the URL through `safeUrl` (rejects `javascript:`/`data:`/
 *   `vbscript:`/`file:` schemes, including control-char obfuscation).
 * - Defaults `target` to `_blank` and `features` to `noopener,noreferrer`
 *   to prevent reverse-tabnabbing.
 * - Returns the opened `Window`, or `null` if the URL was rejected or
 *   `window` is unavailable (SSR).
 *
 * Route every `window.open` call site through this util.
 */
export declare const safeOpenUrl: (url: string | null | undefined, target?: string, features?: string) => Window | null;
/**
 * Turn an LLM-controlled image URL into a `url("...")` CSS value, or `undefined`
 * when the URL is unsafe. Quotes, backslashes and newlines are escaped so the
 * value cannot break out of the declaration.
 */
export declare const toCssUrl: (url: string | null | undefined) => string | undefined;
//# sourceMappingURL=safeUrl.d.ts.map