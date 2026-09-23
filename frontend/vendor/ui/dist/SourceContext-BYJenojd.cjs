require("./chunk-CKQMccvm.cjs");
const require_utils = require("./utils-DcYdyqC-.cjs");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let zod_v4 = require("zod/v4");
//#region src/components/Sources/SourceContext.tsx
const CardSourceSchema = zod_v4.z.object({
	url: zod_v4.z.string().optional(),
	title: zod_v4.z.string(),
	sourceName: zod_v4.z.string()
});
const openSourceInNewTab = (url) => {
	require_utils.safeOpenUrl(url);
};
/**
* React context that provides enriched source data to child components.
* Contains sources with favicon URLs, source IDs, and validation status.
*/
const CardSourceContext = (0, react.createContext)(void 0);
/**
* Returns the favicon URL for a given website using Google's favicon service.
*
* Attempts to parse the provided URL string and extract the hostname (domain).
* If parsing succeeds, returns a URL (with size 128) from Google's s2/favicons API.
* If the URL is invalid or parsing fails, returns an empty string.
*/
const getFaviconUrl = (url) => {
	try {
		if (!url) return "";
		return `https://www.google.com/s2/favicons?sz=128&domain=${new URL(url).hostname}`;
	} catch {
		return "";
	}
};
/**
* Context provider that enriches sources with favicon URLs.
* Generates favicon URLs from Google's service for each source.
*/
const CardSourceProvider = ({ sources, children }) => {
	const enrichedSources = (0, react.useMemo)(() => {
		return sources?.map((source) => ({
			...source,
			faviconUrl: getFaviconUrl(source.url)
		})) ?? [];
	}, [sources]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardSourceContext.Provider, {
		value: enrichedSources,
		children
	});
};
/**
* Hook to access all enriched sources from CardSourceContext.
* Returns array of SourceWithFavicon objects, or empty array if context unavailable.
*/
const useCardSourceContext = () => {
	return (0, react.useContext)(CardSourceContext) ?? [];
};
//#endregion
Object.defineProperty(exports, "CardSourceContext", {
	enumerable: true,
	get: function() {
		return CardSourceContext;
	}
});
Object.defineProperty(exports, "CardSourceProvider", {
	enumerable: true,
	get: function() {
		return CardSourceProvider;
	}
});
Object.defineProperty(exports, "CardSourceSchema", {
	enumerable: true,
	get: function() {
		return CardSourceSchema;
	}
});
Object.defineProperty(exports, "getFaviconUrl", {
	enumerable: true,
	get: function() {
		return getFaviconUrl;
	}
});
Object.defineProperty(exports, "openSourceInNewTab", {
	enumerable: true,
	get: function() {
		return openSourceInNewTab;
	}
});
Object.defineProperty(exports, "useCardSourceContext", {
	enumerable: true,
	get: function() {
		return useCardSourceContext;
	}
});

//# sourceMappingURL=SourceContext-BYJenojd.cjs.map