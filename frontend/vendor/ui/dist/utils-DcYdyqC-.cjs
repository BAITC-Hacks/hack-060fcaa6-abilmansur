//#region src/components/_shared/utils/safeUrl.ts
/**
* Reject URLs whose scheme can execute JS in the host origin
* (`javascript:`, `data:`, `vbscript:`, `file:`). Mirrors the regex used by
* `sanitizeSvg` in MermaidDiagram/utils so the policy is consistent across
* every LLM-controlled URL sink (anchor `href`, `window.open`, etc.).
*
* Returns the trimmed URL when safe, otherwise `undefined`.
*/
const DANGEROUS_URI_RE = /^\s*(?:javascript|data|vbscript|file)\s*:/i;
const SCHEME_OBFUSCATION_RE = /[\u0000-\u001F\u007F]/g;
const safeUrl = (url) => {
	if (typeof url !== "string") return void 0;
	const trimmed = url.trim();
	if (!trimmed) return void 0;
	const normalized = trimmed.replace(SCHEME_OBFUSCATION_RE, "");
	if (DANGEROUS_URI_RE.test(normalized)) return void 0;
	return trimmed;
};
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
const safeOpenUrl = (url, target = "_blank", features = "noopener,noreferrer") => {
	if (typeof window === "undefined") return null;
	const safe = safeUrl(url);
	if (!safe) return null;
	return window.open(safe, target, features);
};
/**
* Turn an LLM-controlled image URL into a `url("...")` CSS value, or `undefined`
* when the URL is unsafe. Quotes, backslashes and newlines are escaped so the
* value cannot break out of the declaration.
*/
const toCssUrl = (url) => {
	const safe = safeUrl(url);
	if (!safe) return void 0;
	return `url("${safe.replace(/[\\"\n\r]/g, (c) => `\\${c.charCodeAt(0).toString(16)} `)}")`;
};
//#endregion
//#region src/components/_shared/utils/index.ts
const isChatEmpty = ({ isLoadingMessages, messages }) => {
	return !isLoadingMessages && messages.length === 0;
};
//#endregion
Object.defineProperty(exports, "isChatEmpty", {
	enumerable: true,
	get: function() {
		return isChatEmpty;
	}
});
Object.defineProperty(exports, "safeOpenUrl", {
	enumerable: true,
	get: function() {
		return safeOpenUrl;
	}
});
Object.defineProperty(exports, "safeUrl", {
	enumerable: true,
	get: function() {
		return safeUrl;
	}
});
Object.defineProperty(exports, "toCssUrl", {
	enumerable: true,
	get: function() {
		return toCssUrl;
	}
});

//# sourceMappingURL=utils-DcYdyqC-.cjs.map