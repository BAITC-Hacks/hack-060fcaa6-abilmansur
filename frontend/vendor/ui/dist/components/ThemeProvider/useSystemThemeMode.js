"use client";
import { useSyncExternalStore } from "react";
const mediaQuery = "(prefers-color-scheme: dark)";
const getSnapshot = () => (window.matchMedia(mediaQuery).matches ? "dark" : "light");
const getServerSnapshot = () => "light";
const subscribe = (onStoreChange) => {
    const query = window.matchMedia(mediaQuery);
    query.addEventListener("change", onStoreChange);
    return () => query.removeEventListener("change", onStoreChange);
};
export function useSystemThemeMode() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
//# sourceMappingURL=useSystemThemeMode.js.map