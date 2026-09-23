require("./chunk-CKQMccvm.cjs");
let react = require("react");
//#region src/components/ThemeProvider/useSystemThemeMode.ts
const mediaQuery = "(prefers-color-scheme: dark)";
const getSnapshot = () => window.matchMedia(mediaQuery).matches ? "dark" : "light";
const getServerSnapshot = () => "light";
const subscribe = (onStoreChange) => {
	const query = window.matchMedia(mediaQuery);
	query.addEventListener("change", onStoreChange);
	return () => query.removeEventListener("change", onStoreChange);
};
function useSystemThemeMode() {
	return (0, react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
Object.defineProperty(exports, "useSystemThemeMode", {
	enumerable: true,
	get: function() {
		return useSystemThemeMode;
	}
});

//# sourceMappingURL=ThemeProvider-Lk6GmwS4.cjs.map