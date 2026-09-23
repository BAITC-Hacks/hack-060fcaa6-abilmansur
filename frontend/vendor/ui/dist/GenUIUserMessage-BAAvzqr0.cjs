require("./chunk-CKQMccvm.cjs");
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/utils/sentinelParser.ts
const INV_INLINE_SENTINEL = "]]>inv:";
const CONTENT_MARKER = `${INV_INLINE_SENTINEL}content`;
const CONTEXT_MARKER = `${INV_INLINE_SENTINEL}context`;
const END_MARKER = `${INV_INLINE_SENTINEL}end`;
const STREAM_PARTIAL_TOKENS = [
	CONTENT_MARKER,
	CONTEXT_MARKER,
	END_MARKER
];
function wrapContent(text) {
	return `${CONTENT_MARKER}\n${text}`;
}
function wrapContentWithHeader(text, contentHeader) {
	return contentHeader ? `${contentHeader}\n${text}` : wrapContent(text);
}
function wrapContext(json) {
	return `\n${CONTEXT_MARKER}\n${json}`;
}
function separateContentAndContext(raw) {
	const { text, end } = extractEndMarker(raw);
	const sections = splitSections(text);
	const content = stripStreamingTail(sections.content);
	return {
		...sections,
		content,
		...end ? { end: true } : {}
	};
}
/**
* Whether the content carries recognizable Inv-lang syntax — the
* ```inv-lang ``` fence, or a top-level `root =` binding when emitted
* unfenced.
*/
function hasLangSyntax(content) {
	return !!content && (content.includes("```inv-lang") || /(^|\n)\s*root\s*=/.test(content));
}
function splitSections(raw) {
	const lastContentIdx = raw.lastIndexOf(CONTENT_MARKER);
	const lastContextIdx = raw.lastIndexOf(CONTEXT_MARKER);
	if (lastContentIdx === -1 && lastContextIdx === -1) return parseLegacyXml(raw);
	if (lastContentIdx === -1) return {
		content: stripSectionSeparator(raw.slice(0, lastContextIdx)),
		contextString: raw.slice(bodyStartIndex(raw, lastContextIdx))
	};
	if (lastContextIdx === -1 || lastContentIdx > lastContextIdx) return {
		content: raw.slice(bodyStartIndex(raw, lastContentIdx)),
		contextString: null,
		contentHeader: contentHeader(raw, lastContentIdx)
	};
	return {
		content: stripSectionSeparator(raw.slice(bodyStartIndex(raw, lastContentIdx), lastContextIdx)),
		contextString: raw.slice(bodyStartIndex(raw, lastContextIdx)),
		contentHeader: contentHeader(raw, lastContentIdx)
	};
}
function extractEndMarker(raw) {
	let text = raw;
	let end = false;
	for (let idx = text.indexOf(END_MARKER); idx !== -1; idx = text.indexOf(END_MARKER)) {
		end = true;
		const lineEnd = text.indexOf("\n", idx);
		const before = stripSectionSeparator(text.slice(0, idx));
		const after = lineEnd === -1 ? "" : text.slice(lineEnd + 1);
		text = after === "" ? before : `${before}\n${after}`;
	}
	return {
		text,
		end
	};
}
function stripStreamingTail(content) {
	let trim = 0;
	for (const token of STREAM_PARTIAL_TOKENS) {
		const max = Math.min(token.length - 1, content.length);
		for (let k = max; k > trim; k--) if (content.endsWith(token.slice(0, k))) {
			trim = k;
			break;
		}
	}
	return trim > 0 ? stripSectionSeparator(content.slice(0, content.length - trim)) : content;
}
function contentHeader(raw, markerIdx) {
	const headerEndIdx = raw.indexOf("\n", markerIdx);
	return headerEndIdx === -1 ? raw.slice(markerIdx) : raw.slice(markerIdx, headerEndIdx);
}
function bodyStartIndex(raw, markerIdx) {
	const headerEndIdx = raw.indexOf("\n", markerIdx);
	return headerEndIdx === -1 ? raw.length : headerEndIdx + 1;
}
function stripSectionSeparator(value) {
	if (value.endsWith("\r\n")) return value.slice(0, -2);
	if (value.endsWith("\n")) return value.slice(0, -1);
	return value;
}
/**
* @deprecated Legacy `<content>`/`<context>` XML envelope. Retained only to
* parse messages persisted before the inline sentinel format; new messages are
* always wrapped with {@link wrapContent}/{@link wrapContext}.
*/
function parseLegacyXml(raw) {
	let content = raw;
	let contextString = null;
	const contextMatch = raw.match(/<context>([\s\S]*)<\/context>\s*$/);
	if (contextMatch) {
		contextString = contextMatch[1] ?? null;
		content = raw.slice(0, contextMatch.index).trimEnd();
	}
	const contentMatch = content.match(/^<content[^>]*>([\s\S]*)<\/content>\s*$/);
	if (contentMatch) content = contentMatch[1] ?? content;
	return {
		content,
		contextString
	};
}
`${INV_INLINE_SENTINEL}`;
//#endregion
//#region src/components/InvChat/GenUIUserMessage.tsx
/**
* Extracts the first plain object from a context string.
* The triggerAction context format is: ["action description string", { formState }]
*/
function parseContextForDisplay(contextString) {
	if (!contextString) return {};
	try {
		const parsed = JSON.parse(contextString);
		if (Array.isArray(parsed)) return parsed.find((item) => item !== null && typeof item === "object" && !Array.isArray(item)) ?? {};
		if (typeof parsed === "object" && parsed !== null) return parsed;
		return {};
	} catch {
		return {};
	}
}
function getEntries(state) {
	const isNested = Object.values(state).some((v) => v !== null && typeof v === "object" && !("value" in v) && Object.values(v).some((f) => f !== null && typeof f === "object" && "value" in f));
	const entries = [];
	if (isNested) for (const [, fields] of Object.entries(state)) {
		if (typeof fields !== "object" || fields === null) continue;
		for (const [fieldName, field] of Object.entries(fields)) if (field && typeof field === "object" && "value" in field) {
			const val = field.value;
			if (val !== void 0 && val !== null && val !== "") entries.push({
				label: fieldName,
				value: String(val)
			});
		}
	}
	else for (const [fieldName, field] of Object.entries(state)) if (field && typeof field === "object" && "value" in field) {
		const val = field.value;
		if (val !== void 0 && val !== null && val !== "") entries.push({
			label: fieldName,
			value: String(val)
		});
	}
	return entries;
}
function FormDataAccordion({ state }) {
	const [isExpanded, setIsExpanded] = (0, react.useState)(false);
	const entries = getEntries(state);
	if (entries.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-genui-user-message__form-state",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-genui-user-message__form-state-header",
			onClick: () => setIsExpanded((v) => !v),
			type: "button",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "inv-genui-user-message__form-state-label",
				children: [
					"Form data (",
					entries.length,
					" ",
					entries.length === 1 ? "field" : "fields",
					")"
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: `inv-genui-user-message__form-state-chevron${isExpanded ? " inv-genui-user-message__form-state-chevron--expanded" : ""}`
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-genui-user-message__form-state-content",
			children: entries.map(({ label, value }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-genui-user-message__form-field",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "inv-genui-user-message__form-field-label",
					children: [label, ":"]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-genui-user-message__form-field-value",
					children: value
				})]
			}, label))
		})]
	});
}
/**
* Renders a user message, handling both plain text messages and
* inline-formatted messages from form submissions.
*/
const GenUIUserMessage = ({ message }) => {
	const { content: humanText, contextString } = separateContentAndContext(typeof message.content === "string" ? message.content : "");
	const formState = parseContextForDisplay(contextString);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-shell-thread-message-user",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-genui-user-message",
			children: [Object.keys(formState).length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FormDataAccordion, { state: formState }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-shell-thread-message-user__content",
				children: humanText && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: humanText })
			})]
		})
	});
};
//#endregion
Object.defineProperty(exports, "GenUIUserMessage", {
	enumerable: true,
	get: function() {
		return GenUIUserMessage;
	}
});
Object.defineProperty(exports, "hasLangSyntax", {
	enumerable: true,
	get: function() {
		return hasLangSyntax;
	}
});
Object.defineProperty(exports, "separateContentAndContext", {
	enumerable: true,
	get: function() {
		return separateContentAndContext;
	}
});
Object.defineProperty(exports, "wrapContent", {
	enumerable: true,
	get: function() {
		return wrapContent;
	}
});
Object.defineProperty(exports, "wrapContentWithHeader", {
	enumerable: true,
	get: function() {
		return wrapContentWithHeader;
	}
});
Object.defineProperty(exports, "wrapContext", {
	enumerable: true,
	get: function() {
		return wrapContext;
	}
});

//# sourceMappingURL=GenUIUserMessage-BAAvzqr0.cjs.map