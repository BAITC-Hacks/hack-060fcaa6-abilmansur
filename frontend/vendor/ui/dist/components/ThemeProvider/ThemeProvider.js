import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useId, useInsertionEffect, useMemo } from "react";
import { defaultDarkTheme, defaultLightTheme } from "./defaultTheme";
import { KNOWN_THEME_KEYS, themeToCssVars } from "./utils";
/**
 * React context that carries the resolved theme, active mode, and a CSS class
 * name for portals. Consumed via {@link useTheme}.
 */
export const ThemeContext = createContext({
    theme: defaultLightTheme,
    mode: "light",
    portalThemeClassName: "",
});
/**
 * Access the current theme, mode, and portal class name from the nearest
 * {@link ThemeProvider}.
 *
 * @returns An object with:
 *  - `theme` – the fully resolved {@link Theme} object
 *  - `mode` – `"light"` or `"dark"`
 *  - `portalThemeClassName` – a unique CSS class name to apply on portal
 *     containers so they inherit the same `--inv-*` custom properties
 *
 * Falls back to the default light theme when no provider is present.
 *
 * @example
 * ```tsx
 * const { theme, mode, portalThemeClassName } = useTheme();
 * ```
 */
export const useTheme = () => useContext(ThemeContext);
const themes = {
    light: defaultLightTheme,
    dark: defaultDarkTheme,
};
// ---------------------------------------------------------------------------
// Internal context for nesting detection
// ---------------------------------------------------------------------------
const INV_THEME_SENTINEL = Symbol("inv-theme-provider");
const InternalContext = createContext(null);
// ---------------------------------------------------------------------------
// Dev-mode warning deduplication
// ---------------------------------------------------------------------------
const _devWarned = new Set();
function warnOnce(key, message) {
    if (_devWarned.has(key))
        return;
    _devWarned.add(key);
    console.warn(message);
}
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function cssSafeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "");
}
function validateThemeObject(themeObj, propName) {
    for (const [key, value] of Object.entries(themeObj)) {
        if (value !== undefined && typeof value !== "string" && !Array.isArray(value)) {
            warnOnce(`non-string:${propName}:${key}`, `[Inv] ${propName} key "${key}" has a non-string value (${typeof value}). All theme values should be strings.`);
        }
        if (!KNOWN_THEME_KEYS.has(key)) {
            warnOnce(`unknown-key:${propName}:${key}`, `[Inv] ${propName} contains unknown key "${key}". It will be ignored. Use createTheme() for typo detection with suggestions.`);
        }
    }
}
/**
 * Injects the Inv design-token CSS custom properties (`--inv-*`) into the
 * DOM and provides theme context to all descendant components.
 *
 * Supports automatic scoping when nested inside another ThemeProvider: the inner
 * provider wraps its children in a `<div>` with `display: contents` and injects
 * a scoped style rule instead of targeting `body`.
 *
 * @example
 * ```tsx
 * <ThemeProvider
 *   mode="dark"
 *   lightTheme={createTheme({ interactiveAccentDefault: "oklch(0.6 0.2 260)" })}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({ mode: modeProp, children, lightTheme, darkTheme, theme: deprecatedTheme, cssSelector = "body", }) => {
    const id = cssSafeId(useId());
    const parent = useContext(InternalContext);
    const isNested = parent != null;
    const mode = modeProp ?? parent?.mode ?? "light";
    const effectiveCssSelector = cssSelector || "body";
    const hasExplicitSelector = effectiveCssSelector !== "body";
    // Resolve the deprecated `theme` prop → `lightTheme` takes precedence
    const userLightTheme = lightTheme ?? deprecatedTheme ?? {};
    const userDarkTheme = darkTheme;
    // ---------------------------------------------------------------------------
    // Dev-mode warnings
    // ---------------------------------------------------------------------------
    if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production") {
        if (deprecatedTheme !== undefined && lightTheme !== undefined) {
            warnOnce("theme+lightTheme", '[Inv] Both "theme" and "lightTheme" were passed to ThemeProvider. "lightTheme" takes precedence. Remove the deprecated "theme" prop.');
        }
        if (deprecatedTheme !== undefined && lightTheme === undefined) {
            warnOnce("deprecated-theme", '[Inv] The "theme" prop on ThemeProvider is deprecated. Use "lightTheme" instead.');
        }
        validateThemeObject(userLightTheme, "lightTheme");
        if (userDarkTheme) {
            validateThemeObject(userDarkTheme, "darkTheme");
        }
        // if (isNested && !hasExplicitSelector) {
        //   warnOnce(
        //     "nested-global",
        //     '[Inv] A nested ThemeProvider is targeting "body". The inner provider will auto-scope to avoid overwriting the parent. Pass an explicit cssSelector to opt out.',
        //   );
        // }
    }
    // ---------------------------------------------------------------------------
    // Theme resolution
    // ---------------------------------------------------------------------------
    const resolvedLightTheme = useMemo(() => ({ ...themes.light, ...userLightTheme }), [userLightTheme]);
    const resolvedDarkTheme = useMemo(() => {
        const overrides = userDarkTheme ?? userLightTheme;
        return { ...themes.dark, ...overrides };
    }, [userDarkTheme, userLightTheme]);
    const activeTheme = mode === "light" ? resolvedLightTheme : resolvedDarkTheme;
    const cssVarsString = useMemo(() => themeToCssVars(activeTheme), [activeTheme]);
    const portalClassName = `inv-theme-portal-${id}`;
    const scopedClassName = `inv-theme-${id}`;
    const contextValue = useMemo(() => ({ theme: activeTheme, mode, portalThemeClassName: portalClassName }), [activeTheme, mode, portalClassName]);
    const internalValue = useMemo(() => ({
        [INV_THEME_SENTINEL]: true,
        theme: activeTheme,
        mode,
        portalThemeClassName: portalClassName,
    }), [activeTheme, mode, portalClassName]);
    // ---------------------------------------------------------------------------
    // Style injection via useInsertionEffect (Step 4)
    // ---------------------------------------------------------------------------
    const useAutoScope = isNested && !hasExplicitSelector;
    const styleSelector = useAutoScope ? `.${scopedClassName}` : effectiveCssSelector;
    // Intentionally unlayered — must override component styles in both modes,
    // including when consumers opt into layered-components.css (@layer inv),
    // so runtime theming always wins. See README "Styling integration" before changing.
    useInsertionEffect(() => {
        const style = document.createElement("style");
        style.setAttribute("data-inv-theme", id);
        style.textContent = `${styleSelector}, .${portalClassName} { ${cssVarsString} }`;
        document.head.appendChild(style);
        return () => style.remove();
    }, [cssVarsString, styleSelector, portalClassName, id]);
    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (_jsx(InternalContext.Provider, { value: internalValue, children: _jsx(ThemeContext.Provider, { value: contextValue, children: useAutoScope ? (_jsx("div", { className: scopedClassName, style: { display: "contents" }, children: children })) : (children) }) }));
};
//# sourceMappingURL=ThemeProvider.js.map