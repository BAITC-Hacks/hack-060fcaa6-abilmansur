"use client";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _radix_ui_react_accordion = require("@radix-ui/react-accordion");
_radix_ui_react_accordion = __toESM(_radix_ui_react_accordion);
let clsx = require("clsx");
clsx = __toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react$1 = __toESM(react, 1);
react = __toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
let _radix_ui_react_slot = require("@radix-ui/react-slot");
let _invdev_react_lang = require("@inv/lang");
let zustand = require("zustand");
let zustand_react_shallow = require("zustand/react/shallow");
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = __toESM(_radix_ui_react_tooltip);
let react_markdown = require("react-markdown");
react_markdown = __toESM(react_markdown);
let react_syntax_highlighter_dist_cjs_styles_prism = require("react-syntax-highlighter/dist/cjs/styles/prism");
let react_syntax_highlighter = require("react-syntax-highlighter");
let react_dom = require("react-dom");
let _radix_ui_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
_radix_ui_react_dropdown_menu = __toESM(_radix_ui_react_dropdown_menu);
let react_day_picker = require("react-day-picker");
let _radix_ui_react_select = require("@radix-ui/react-select");
_radix_ui_react_select = __toESM(_radix_ui_react_select);
let lodash_es_debounce = require("lodash-es/debounce");
lodash_es_debounce = __toESM(lodash_es_debounce);
let recharts = require("recharts");
recharts = __toESM(recharts);
let lodash_es = require("lodash-es");
let tiny_invariant = require("tiny-invariant");
tiny_invariant = __toESM(tiny_invariant, 1);
let _floating_ui_react_dom = require("@floating-ui/react-dom");
let _radix_ui_react_separator = require("@radix-ui/react-separator");
_radix_ui_react_separator = __toESM(_radix_ui_react_separator);
let _radix_ui_react_checkbox = require("@radix-ui/react-checkbox");
_radix_ui_react_checkbox = __toESM(_radix_ui_react_checkbox);
let lucide_react_dynamicIconImports_mjs = require("lucide-react/dynamicIconImports.mjs");
lucide_react_dynamicIconImports_mjs = __toESM(lucide_react_dynamicIconImports_mjs, 1);
let zod_v4 = require("zod/v4");
let remark_breaks = require("remark-breaks");
remark_breaks = __toESM(remark_breaks);
let remark_gfm = require("remark-gfm");
remark_gfm = __toESM(remark_gfm);
let unist_util_visit = require("unist-util-visit");
let date_fns = require("date-fns");
let _tanstack_react_table = require("@tanstack/react-table");
let _radix_ui_react_aspect_ratio = require("@radix-ui/react-aspect-ratio");
_radix_ui_react_aspect_ratio = __toESM(_radix_ui_react_aspect_ratio);
let _radix_ui_react_label = require("@radix-ui/react-label");
_radix_ui_react_label = __toESM(_radix_ui_react_label);
let _radix_ui_react_dialog = require("@radix-ui/react-dialog");
_radix_ui_react_dialog = __toESM(_radix_ui_react_dialog);
let _radix_ui_react_radio_group = require("@radix-ui/react-radio-group");
_radix_ui_react_radio_group = __toESM(_radix_ui_react_radio_group);
let _radix_ui_react_slider = require("@radix-ui/react-slider");
_radix_ui_react_slider = __toESM(_radix_ui_react_slider);
let _radix_ui_react_switch = require("@radix-ui/react-switch");
_radix_ui_react_switch = __toESM(_radix_ui_react_switch);
let _radix_ui_react_tabs = require("@radix-ui/react-tabs");
_radix_ui_react_tabs = __toESM(_radix_ui_react_tabs);
let remark_math = require("remark-math");
remark_math = __toESM(remark_math);
//#region src/components/Accordion/Accordion.tsx
const variantMap$7 = {
	clear: "inv-accordion-clear",
	card: "inv-accordion-card",
	sunk: "inv-accordion-sunk"
};
const Accordion = (0, react.forwardRef)(({ className, style, variant = "clear", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Root, {
	ref,
	className: (0, clsx.default)("inv-accordion", variantMap$7[variant], className),
	style,
	...props
}));
const AccordionItem = (0, react.forwardRef)(({ className, style, value, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Item, {
	ref,
	className: (0, clsx.default)("inv-accordion-item", className),
	style,
	value,
	...props
}));
const AccordionTrigger = (0, react.forwardRef)(({ className, style, text, icon, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Header, {
	className: (0, clsx.default)("inv-accordion-header"),
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_accordion.Trigger, {
		ref,
		className: (0, clsx.default)("inv-accordion-trigger", className),
		style,
		...props,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-accordion-trigger-content",
			children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-accordion-trigger-content-icon",
				children: icon
			}), text]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDownIcon, { className: "inv-accordion-trigger-icon" })]
	})
}));
const AccordionContent = (0, react.forwardRef)(({ className, style, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Content, {
	ref,
	className: (0, clsx.default)("inv-accordion-content", className),
	style,
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-accordion-content-wrapper",
		children
	})
}));
//#endregion
//#region src/components/AgentInterface/_shared/artifactPaths.ts
/**
* Reserved nav paths for the artifact browser.
*
* `artifacts/{category}`        → searchable artifact list for a category
* `artifacts/{category}/{id}`   → full-page artifact view
*
* `{category}` is the URI-encoded category name, or the literal `all` when no
* `artifactCategories` are configured. The `artifacts/` prefix is reserved:
* AgentInterface matches it before consulting user-defined `<Route>`s, and
* controlled-mode `onNavigate` consumers must round-trip these paths.
*/
const ARTIFACTS_PATH_PREFIX = "artifacts/";
const artifactListPath = (categoryName) => `${ARTIFACTS_PATH_PREFIX}${categoryName !== void 0 ? encodeURIComponent(categoryName) : "all"}`;
const artifactViewPath = (categoryName, artifactId) => `${artifactListPath(categoryName)}/${encodeURIComponent(artifactId)}`;
function parseArtifactPath(path) {
	if (!path.startsWith("artifacts/")) return null;
	const rest = path.slice(10);
	if (!rest) return null;
	const [categorySegment, idSegment, ...extra] = rest.split("/");
	if (!categorySegment || extra.length > 0) return null;
	const categoryName = categorySegment === "all" ? void 0 : decodeURIComponent(categorySegment);
	if (idSegment === void 0) return {
		kind: "list",
		categoryName
	};
	if (!idSegment) return null;
	return {
		kind: "view",
		categoryName,
		artifactId: decodeURIComponent(idSegment)
	};
}
//#endregion
//#region src/components/AgentInterface/_shared/navContext.tsx
const NavContext = (0, react.createContext)(null);
/**
* Standard controlled/uncontrolled split:
* - `onNavigate` provided → controlled. Parent owns state; `path` prop is the source of truth.
* - `onNavigate` absent → uncontrolled. Internal state starts at `defaultPath`.
*/
const NavProvider = ({ path, defaultPath, onNavigate, children }) => {
	const isControlled = onNavigate !== void 0;
	const [internalPath, setInternalPath] = (0, react.useState)(defaultPath);
	const currentPath = isControlled ? path : internalPath;
	const navigate = (0, react.useCallback)((next) => {
		if (isControlled) onNavigate?.(next);
		else setInternalPath(next);
	}, [isControlled, onNavigate]);
	const value = (0, react.useMemo)(() => ({
		path: currentPath,
		navigate
	}), [currentPath, navigate]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NavContext.Provider, {
		value,
		children
	});
};
/**
* Read the current navigation state from inside <AgentInterface>.
*
* Returns `{ path, navigate }`. Call `navigate(undefined)` to return to the
* thread view (clears any active route).
*/
const useNav = () => {
	const ctx = (0, react.useContext)(NavContext);
	if (!ctx) throw new Error("useNav() must be used inside <AgentInterface>");
	return ctx;
};
/** Returns the nav context if mounted, otherwise null. Internal use. */
const useOptionalNav = () => (0, react.useContext)(NavContext);
//#endregion
//#region src/components/IconButton/IconButton.tsx
const normalIconButtonVariants = {
	primary: "inv-icon-button-primary",
	secondary: "inv-icon-button-secondary",
	tertiary: "inv-icon-button-tertiary"
};
const destructiveIconButtonVariants = {
	primary: "inv-icon-button-destructive-primary",
	secondary: "inv-icon-button-destructive-secondary",
	tertiary: "inv-icon-button-destructive-tertiary"
};
const iconButtonSizes = {
	"3-extra-small": "inv-icon-button-3-extra-small",
	"2-extra-small": "inv-icon-button-2-extra-small",
	"extra-small": "inv-icon-button-extra-small",
	small: "inv-icon-button-small",
	medium: "inv-icon-button-medium",
	large: "inv-icon-button-large"
};
const iconButtonShapes = {
	square: "inv-icon-button-square",
	circle: "inv-icon-button-circle"
};
const IconButton = (0, react.forwardRef)((props, ref) => {
	const { className, icon, variant = "primary", size = "medium", shape = "square", appearance = "normal", asChild = false, children, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(asChild ? _radix_ui_react_slot.Slot : "button", {
		ref,
		className: (0, clsx.default)("inv-icon-button", (appearance === "normal" ? normalIconButtonVariants : destructiveIconButtonVariants)[variant], iconButtonSizes[size], iconButtonShapes[shape], className),
		...rest,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slot.Slottable, { children }), icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-icon-button-icon",
			children: icon
		})]
	});
});
IconButton.displayName = "IconButton";
//#endregion
//#region src/utils/messages.ts
/** Id of the "live" assistant message in a thread, or null. Shared by the
*  thread and the assistant component to decide which message is streaming. */
function getLastAssistantMessageId(messages) {
	for (let i = messages.length - 1; i >= 0; i--) {
		const role = messages[i]?.role;
		if (role === "assistant") return messages[i].id;
		if (role === "user") return null;
	}
	return null;
}
/** Activities whose tool has a matched artifact/search renderer — the ones that
*  render a rich preview outside the raw timeline. */
function getMatchedRendererActivities(registry, activities) {
	return activities.filter((a) => !!(registry && (0, _invdev_react_headless.lookupArtifactRenderer)(registry, a.toolName)));
}
//#endregion
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
//#region src/components/_shared/store/store.tsx
const createShellStore = ({ logoUrl, agentName, showAssistantLogo }) => (0, zustand.create)((set) => ({
	isSidebarOpen: true,
	isWorkspaceOpen: true,
	agentName,
	logoUrl,
	showAssistantLogo,
	setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
	setIsWorkspaceOpen: (isOpen) => set({ isWorkspaceOpen: isOpen }),
	setAgentName: (name) => set({ agentName: name }),
	setLogoUrl: (url) => set({ logoUrl: url }),
	setShowAssistantLogo: (show) => set({ showAssistantLogo: show })
}));
const ShellStoreContext = (0, react.createContext)(null);
const useShellStore = (selector) => {
	const store = (0, react.useContext)(ShellStoreContext);
	if (!store) throw new Error("useShellStore must be used within a ShellStoreProvider");
	return store((0, zustand_react_shallow.useShallow)(selector));
};
const ShellStoreProvider = ({ children, agentName, logoUrl, showAssistantLogo = false }) => {
	const shellStoreRef = (0, react.useRef)(null);
	if (!shellStoreRef.current) shellStoreRef.current = createShellStore({
		agentName,
		logoUrl,
		showAssistantLogo
	});
	const shellStore = shellStoreRef.current;
	(0, react.useEffect)(() => {
		const { setAgentName, setLogoUrl, setShowAssistantLogo } = shellStore.getState();
		setAgentName(agentName);
		setLogoUrl(logoUrl);
		setShowAssistantLogo(showAssistantLogo);
	}, [
		agentName,
		logoUrl,
		shellStore,
		showAssistantLogo
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShellStoreContext.Provider, {
		value: shellStore,
		children
	});
};
//#endregion
//#region src/components/InvChat/AssistantMessageContainer.tsx
/**
* Wraps a GenUI assistant message with the assistant logo + content layout.
*
* Extracted from the (now-deleted) Shell so the kept `GenUIAssistantMessage`
* keeps rendering under `AgentInterface`. `logoUrl`/`showAssistantLogo` come
* from the library-wide shell store, which `AgentInterface`'s `Container`
* provides via `ShellStoreProvider`.
*/
const AssistantMessageContainer$1 = ({ children, className }) => {
	const { logoUrl, showAssistantLogo } = useShellStore((store) => ({
		logoUrl: store.logoUrl,
		showAssistantLogo: store.showAssistantLogo
	}));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-shell-thread-message-assistant", className, { "inv-shell-thread-message-assistant--without-logo": !showAssistantLogo }),
		children: [showAssistantLogo && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src: logoUrl,
			alt: "Assistant",
			className: "inv-shell-thread-message-assistant__logo"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-shell-thread-message-assistant__content",
			children
		})]
	});
};
//#endregion
//#region src/components/InvChat/GenUIAssistantMessage.tsx
/** Renders the Inv-Lang response for one assistant message. */
const GenUIAssistantMessage = ({ message, library }) => {
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const processMessage = (0, _invdev_react_headless.useThread)((s) => s.processMessage);
	const updateMessage = (0, _invdev_react_headless.useThread)((s) => s.updateMessage);
	const lastAssistantId = (0, react.useMemo)(() => getLastAssistantMessageId(messages), [messages]);
	const isStreaming = isRunning && lastAssistantId === message.id;
	const { content, contextString, contentHeader } = (0, react.useMemo)(() => message.content ? separateContentAndContext(message.content) : {
		content: null,
		contextString: null,
		contentHeader: void 0
	}, [message.content]);
	const initialState = (0, react.useMemo)(() => {
		if (!contextString) return void 0;
		try {
			const parsed = JSON.parse(contextString);
			if (Array.isArray(parsed) && typeof parsed[0] === "object") return parsed[0];
			if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
			return;
		} catch {
			return;
		}
	}, [contextString]);
	const handleStateUpdate = (0, react.useCallback)((state) => {
		const hasState = Object.keys(state).length > 0;
		const contentPart = wrapContentWithHeader(content ?? "", contentHeader);
		const fullMessage = hasState ? contentPart + wrapContext(JSON.stringify([state])) : contentPart;
		updateMessage({
			...message,
			content: fullMessage
		});
	}, [
		updateMessage,
		message,
		content,
		contentHeader
	]);
	const handleAction = (0, react.useCallback)((event) => {
		if (event.type === _invdev_react_lang.BuiltinActionType.ContinueConversation) {
			const contentPart = event.humanFriendlyMessage ? wrapContent(event.humanFriendlyMessage) : "";
			const messageCtx = [`User clicked: ${event.humanFriendlyMessage}`];
			if (event.formState) messageCtx.push(event.formState);
			processMessage({
				role: "user",
				content: `${contentPart}${wrapContext(JSON.stringify(messageCtx))}`
			});
		} else if (event.type === _invdev_react_lang.BuiltinActionType.OpenUrl) {
			const url = event.params?.["url"];
			if (typeof window !== "undefined" && url) window.open(url, "_blank");
		}
	}, [processMessage]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantMessageContainer$1, { children: content && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_lang.Renderer, {
		response: content,
		library,
		isStreaming,
		onAction: handleAction,
		onStateUpdate: handleStateUpdate,
		initialState
	}) });
};
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
//#region src/components/ThemeProvider/swatches.ts
const BASE_SWATCHES = {
	neutral: {
		25: "oklch(0.994 0 89.876 / 1)",
		50: "oklch(0.985 0 89.876 / 1)",
		100: "oklch(0.97 0 89.876 / 1)",
		200: "oklch(0.922 0 89.876 / 1)",
		300: "oklch(0.87 0 89.876 / 1)",
		400: "oklch(0.715 0 89.876 / 1)",
		500: "oklch(0.556 0 89.876 / 1)",
		600: "oklch(0.439 0 89.876 / 1)",
		700: "oklch(0.371 0 89.876 / 1)",
		800: "oklch(0.269 0 89.876 / 1)",
		900: "oklch(0.205 0 0 / 1)",
		925: "oklch(0.173 0 0 / 1)",
		950: "oklch(0.145 0 0 / 1)",
		1e3: "oklch(0.097 0 0 / 1)"
	},
	slate: {
		25: "oklch(0.994 0.002 247.839 / 1)",
		50: "oklch(0.984 0.003 247.858 / 1)",
		100: "oklch(0.968 0.007 247.896 / 1)",
		200: "oklch(0.929 0.013 255.508 / 1)",
		300: "oklch(0.869 0.02 252.894 / 1)",
		400: "oklch(0.711 0.035 256.788 / 1)",
		500: "oklch(0.554 0.041 257.417 / 1)",
		600: "oklch(0.446 0.037 257.281 / 1)",
		700: "oklch(0.372 0.039 257.287 / 1)",
		800: "oklch(0.279 0.037 260.031 / 1)",
		900: "oklch(0.208 0.04 265.755 / 1)",
		925: "oklch(0.166 0.029 267.188 / 1)",
		950: "oklch(0.129 0.041 264.695 / 1)",
		1e3: "oklch(0.091 0.029 268.957 / 1)"
	},
	gray: {
		25: "oklch(0.991 0.001 286.376 / 1)",
		50: "oklch(0.985 0.002 247.839 / 1)",
		100: "oklch(0.967 0.003 264.542 / 1)",
		200: "oklch(0.928 0.006 264.531 / 1)",
		300: "oklch(0.872 0.009 258.338 / 1)",
		400: "oklch(0.714 0.019 261.325 / 1)",
		500: "oklch(0.551 0.023 264.364 / 1)",
		600: "oklch(0.446 0.026 256.802 / 1)",
		700: "oklch(0.373 0.031 259.733 / 1)",
		800: "oklch(0.278 0.03 256.848 / 1)",
		900: "oklch(0.21 0.032 264.665 / 1)",
		925: "oklch(0.171 0.028 267.356 / 1)",
		950: "oklch(0.13 0.027 261.692 / 1)",
		1e3: "oklch(0.089 0.024 267.878 / 1)"
	},
	zinc: {
		25: "oklch(0.994 0 89.876 / 1)",
		50: "oklch(0.985 0 89.876 / 1)",
		100: "oklch(0.967 0.001 286.375 / 1)",
		200: "oklch(0.92 0.004 286.32 / 1)",
		300: "oklch(0.871 0.005 286.286 / 1)",
		400: "oklch(0.712 0.013 286.067 / 1)",
		500: "oklch(0.552 0.014 285.938 / 1)",
		600: "oklch(0.442 0.015 285.786 / 1)",
		700: "oklch(0.37 0.012 285.805 / 1)",
		800: "oklch(0.274 0.005 286.033 / 1)",
		900: "oklch(0.21 0.006 285.885 / 1)",
		925: "oklch(0.179 0.004 285.981 / 1)",
		950: "oklch(0.141 0.004 285.823 / 1)",
		1e3: "oklch(0.108 0.004 285.762 / 1)"
	},
	stone: {
		25: "oklch(0.994 0.001 106.423 / 1)",
		50: "oklch(0.985 0.001 106.423 / 1)",
		100: "oklch(0.97 0.001 106.424 / 1)",
		200: "oklch(0.923 0.003 48.717 / 1)",
		300: "oklch(0.869 0.004 56.366 / 1)",
		400: "oklch(0.716 0.009 56.259 / 1)",
		500: "oklch(0.553 0.012 58.071 / 1)",
		600: "oklch(0.444 0.01 73.639 / 1)",
		700: "oklch(0.374 0.009 67.558 / 1)",
		800: "oklch(0.268 0.006 34.298 / 1)",
		900: "oklch(0.216 0.006 56.043 / 1)",
		925: "oklch(0.184 0.005 67.497 / 1)",
		950: "oklch(0.147 0.004 49.25 / 1)",
		1e3: "oklch(0.108 0.005 71.346 / 1)"
	},
	blue: {
		25: "oklch(0.986 0.007 247.894 / 1)",
		50: "oklch(0.97 0.014 254.604 / 1)",
		100: "oklch(0.932 0.032 255.585 / 1)",
		200: "oklch(0.882 0.057 254.128 / 1)",
		300: "oklch(0.809 0.096 251.813 / 1)",
		400: "oklch(0.714 0.143 254.624 / 1)",
		500: "oklch(0.623 0.188 259.815 / 1)",
		600: "oklch(0.546 0.215 262.881 / 1)",
		700: "oklch(0.488 0.217 264.376 / 1)",
		800: "oklch(0.424 0.181 265.638 / 1)",
		900: "oklch(0.379 0.138 265.522 / 1)",
		925: "oklch(0.328 0.111 266.206 / 1)",
		950: "oklch(0.282 0.087 267.935 / 1)",
		1e3: "oklch(0.217 0.066 266.921 / 1)"
	},
	sky: {
		25: "oklch(0.991 0.006 223.454 / 1)",
		50: "oklch(0.977 0.012 236.62 / 1)",
		100: "oklch(0.951 0.025 236.824 / 1)",
		200: "oklch(0.901 0.055 230.902 / 1)",
		300: "oklch(0.828 0.101 230.318 / 1)",
		400: "oklch(0.754 0.139 232.661 / 1)",
		500: "oklch(0.685 0.148 237.323 / 1)",
		600: "oklch(0.588 0.139 241.966 / 1)",
		700: "oklch(0.5 0.119 242.749 / 1)",
		800: "oklch(0.443 0.1 240.79 / 1)",
		900: "oklch(0.391 0.085 240.876 / 1)",
		925: "oklch(0.339 0.07 239.068 / 1)",
		950: "oklch(0.293 0.063 243.157 / 1)",
		1e3: "oklch(0.212 0.042 240.144 / 1)"
	},
	cyan: {
		25: "oklch(0.991 0.009 205.897 / 1)",
		50: "oklch(0.984 0.019 200.873 / 1)",
		100: "oklch(0.956 0.044 203.388 / 1)",
		200: "oklch(0.917 0.077 205.041 / 1)",
		300: "oklch(0.865 0.115 207.078 / 1)",
		400: "oklch(0.797 0.134 211.53 / 1)",
		500: "oklch(0.715 0.126 215.221 / 1)",
		600: "oklch(0.609 0.111 221.723 / 1)",
		700: "oklch(0.52 0.094 223.128 / 1)",
		800: "oklch(0.45 0.077 224.283 / 1)",
		900: "oklch(0.398 0.066 227.392 / 1)",
		925: "oklch(0.345 0.057 226.509 / 1)",
		950: "oklch(0.302 0.054 229.695 / 1)",
		1e3: "oklch(0.217 0.037 227.615 / 1)"
	},
	teal: {
		25: "oklch(0.992 0.007 174.385 / 1)",
		50: "oklch(0.984 0.014 180.72 / 1)",
		100: "oklch(0.953 0.05 180.801 / 1)",
		200: "oklch(0.91 0.093 180.426 / 1)",
		300: "oklch(0.855 0.125 181.071 / 1)",
		400: "oklch(0.785 0.133 181.912 / 1)",
		500: "oklch(0.704 0.123 182.503 / 1)",
		600: "oklch(0.6 0.104 184.704 / 1)",
		700: "oklch(0.511 0.086 186.391 / 1)",
		800: "oklch(0.437 0.071 188.216 / 1)",
		900: "oklch(0.386 0.059 188.416 / 1)",
		925: "oklch(0.335 0.051 189.115 / 1)",
		950: "oklch(0.277 0.045 192.524 / 1)",
		1e3: "oklch(0.206 0.033 191.443 / 1)"
	},
	emerald: {
		25: "oklch(0.99 0.01 164.879 / 1)",
		50: "oklch(0.979 0.021 166.113 / 1)",
		100: "oklch(0.95 0.051 163.051 / 1)",
		200: "oklch(0.905 0.089 164.15 / 1)",
		300: "oklch(0.845 0.13 164.978 / 1)",
		400: "oklch(0.773 0.153 163.223 / 1)",
		500: "oklch(0.696 0.149 162.48 / 1)",
		600: "oklch(0.596 0.127 163.225 / 1)",
		700: "oklch(0.508 0.105 165.612 / 1)",
		800: "oklch(0.432 0.086 166.913 / 1)",
		900: "oklch(0.378 0.073 168.94 / 1)",
		925: "oklch(0.325 0.062 169.847 / 1)",
		950: "oklch(0.262 0.049 172.552 / 1)",
		1e3: "oklch(0.188 0.033 177.113 / 1)"
	},
	lime: {
		25: "oklch(0.993 0.018 120.67 / 1)",
		50: "oklch(0.986 0.031 120.757 / 1)",
		100: "oklch(0.967 0.066 122.328 / 1)",
		200: "oklch(0.938 0.122 124.321 / 1)",
		300: "oklch(0.897 0.179 126.665 / 1)",
		400: "oklch(0.849 0.207 128.85 / 1)",
		500: "oklch(0.768 0.204 130.85 / 1)",
		600: "oklch(0.648 0.175 131.684 / 1)",
		700: "oklch(0.532 0.141 131.589 / 1)",
		800: "oklch(0.453 0.113 130.933 / 1)",
		900: "oklch(0.405 0.096 131.063 / 1)",
		925: "oklch(0.341 0.079 131.173 / 1)",
		950: "oklch(0.274 0.069 132.109 / 1)",
		1e3: "oklch(0.192 0.046 130.171 / 1)"
	},
	amber: {
		25: "oklch(0.993 0.012 96.417 / 1)",
		50: "oklch(0.987 0.021 95.277 / 1)",
		100: "oklch(0.962 0.058 95.617 / 1)",
		200: "oklch(0.924 0.115 95.746 / 1)",
		300: "oklch(0.879 0.153 91.605 / 1)",
		400: "oklch(0.837 0.164 84.429 / 1)",
		500: "oklch(0.769 0.165 70.08 / 1)",
		600: "oklch(0.666 0.157 58.318 / 1)",
		700: "oklch(0.555 0.146 48.998 / 1)",
		800: "oklch(0.473 0.125 46.201 / 1)",
		900: "oklch(0.414 0.105 45.904 / 1)",
		925: "oklch(0.35 0.087 45.765 / 1)",
		950: "oklch(0.279 0.074 45.635 / 1)",
		1e3: "oklch(0.206 0.05 48.704 / 1)"
	},
	orange: {
		25: "oklch(0.987 0.01 72.664 / 1)",
		50: "oklch(0.98 0.016 73.684 / 1)",
		100: "oklch(0.954 0.037 75.164 / 1)",
		200: "oklch(0.901 0.073 70.697 / 1)",
		300: "oklch(0.837 0.117 66.29 / 1)",
		400: "oklch(0.758 0.159 55.934 / 1)",
		500: "oklch(0.705 0.187 47.604 / 1)",
		600: "oklch(0.646 0.194 41.116 / 1)",
		700: "oklch(0.553 0.174 38.402 / 1)",
		800: "oklch(0.47 0.143 37.304 / 1)",
		900: "oklch(0.408 0.116 38.172 / 1)",
		925: "oklch(0.342 0.096 37.716 / 1)",
		950: "oklch(0.266 0.076 36.259 / 1)",
		1e3: "oklch(0.197 0.051 37.083 / 1)"
	},
	green: {
		25: "oklch(0.989 0.012 153.679 / 1)",
		50: "oklch(0.982 0.018 155.826 / 1)",
		100: "oklch(0.962 0.043 156.743 / 1)",
		200: "oklch(0.925 0.081 155.995 / 1)",
		300: "oklch(0.871 0.136 154.449 / 1)",
		400: "oklch(0.8 0.182 151.711 / 1)",
		500: "oklch(0.723 0.192 149.579 / 1)",
		600: "oklch(0.627 0.17 149.214 / 1)",
		700: "oklch(0.527 0.137 150.069 / 1)",
		800: "oklch(0.448 0.108 151.328 / 1)",
		900: "oklch(0.393 0.09 152.535 / 1)",
		925: "oklch(0.337 0.076 152.793 / 1)",
		950: "oklch(0.266 0.063 152.934 / 1)",
		1e3: "oklch(0.19 0.041 156.904 / 1)"
	},
	yellow: {
		25: "oklch(0.995 0.013 102.007 / 1)",
		50: "oklch(0.987 0.026 102.212 / 1)",
		100: "oklch(0.973 0.069 103.193 / 1)",
		200: "oklch(0.945 0.124 101.54 / 1)",
		300: "oklch(0.905 0.166 98.111 / 1)",
		400: "oklch(0.861 0.173 91.936 / 1)",
		500: "oklch(0.795 0.162 86.047 / 1)",
		600: "oklch(0.681 0.142 75.834 / 1)",
		700: "oklch(0.554 0.121 66.442 / 1)",
		800: "oklch(0.476 0.103 61.907 / 1)",
		900: "oklch(0.421 0.09 57.708 / 1)",
		925: "oklch(0.357 0.075 57.491 / 1)",
		950: "oklch(0.286 0.064 53.813 / 1)",
		1e3: "oklch(0.209 0.044 56.227 / 1)"
	},
	red: {
		25: "oklch(0.982 0.009 17.303 / 1)",
		50: "oklch(0.971 0.013 17.38 / 1)",
		100: "oklch(0.936 0.031 17.717 / 1)",
		200: "oklch(0.885 0.059 18.334 / 1)",
		300: "oklch(0.808 0.103 19.571 / 1)",
		400: "oklch(0.711 0.166 22.216 / 1)",
		500: "oklch(0.637 0.208 25.331 / 1)",
		600: "oklch(0.577 0.215 27.325 / 1)",
		700: "oklch(0.505 0.19 27.518 / 1)",
		800: "oklch(0.444 0.161 26.899 / 1)",
		900: "oklch(0.396 0.133 25.723 / 1)",
		925: "oklch(0.332 0.111 25.625 / 1)",
		950: "oklch(0.258 0.089 26.042 / 1)",
		1e3: "oklch(0.184 0.058 25.017 / 1)"
	},
	purple: {
		25: "oklch(0.987 0.009 314.783 / 1)",
		50: "oklch(0.977 0.014 308.299 / 1)",
		100: "oklch(0.946 0.033 307.174 / 1)",
		200: "oklch(0.902 0.06 306.703 / 1)",
		300: "oklch(0.827 0.108 306.383 / 1)",
		400: "oklch(0.722 0.177 305.504 / 1)",
		500: "oklch(0.627 0.233 303.9 / 1)",
		600: "oklch(0.558 0.252 302.321 / 1)",
		700: "oklch(0.496 0.237 301.924 / 1)",
		800: "oklch(0.438 0.198 303.724 / 1)",
		900: "oklch(0.381 0.166 304.987 / 1)",
		925: "oklch(0.325 0.142 305.38 / 1)",
		950: "oklch(0.291 0.143 302.717 / 1)",
		1e3: "oklch(0.205 0.098 304.68 / 1)"
	},
	violet: {
		25: "oklch(0.98 0.011 297.63 / 1)",
		50: "oklch(0.969 0.016 293.756 / 1)",
		100: "oklch(0.943 0.028 294.588 / 1)",
		200: "oklch(0.894 0.055 293.283 / 1)",
		300: "oklch(0.811 0.101 293.571 / 1)",
		400: "oklch(0.709 0.159 293.541 / 1)",
		500: "oklch(0.606 0.219 292.717 / 1)",
		600: "oklch(0.541 0.247 293.009 / 1)",
		700: "oklch(0.491 0.241 292.581 / 1)",
		800: "oklch(0.432 0.211 292.759 / 1)",
		900: "oklch(0.38 0.178 293.745 / 1)",
		925: "oklch(0.324 0.151 293.976 / 1)",
		950: "oklch(0.283 0.135 291.089 / 1)",
		1e3: "oklch(0.203 0.088 292.692 / 1)"
	},
	fuchsia: {
		25: "oklch(0.984 0.012 329.558 / 1)",
		50: "oklch(0.977 0.017 320.058 / 1)",
		100: "oklch(0.952 0.036 318.852 / 1)",
		200: "oklch(0.903 0.073 319.62 / 1)",
		300: "oklch(0.833 0.132 321.434 / 1)",
		400: "oklch(0.748 0.207 322.16 / 1)",
		500: "oklch(0.667 0.259 322.15 / 1)",
		600: "oklch(0.591 0.257 322.896 / 1)",
		700: "oklch(0.518 0.226 323.949 / 1)",
		800: "oklch(0.452 0.192 324.591 / 1)",
		900: "oklch(0.401 0.16 325.612 / 1)",
		925: "oklch(0.341 0.135 326.232 / 1)",
		950: "oklch(0.293 0.131 325.661 / 1)",
		1e3: "oklch(0.208 0.091 326.186 / 1)"
	},
	pink: {
		25: "oklch(0.986 0.009 341.798 / 1)",
		50: "oklch(0.971 0.014 343.198 / 1)",
		100: "oklch(0.948 0.028 342.258 / 1)",
		200: "oklch(0.899 0.059 343.231 / 1)",
		300: "oklch(0.823 0.11 346.018 / 1)",
		400: "oklch(0.725 0.175 349.761 / 1)",
		500: "oklch(0.656 0.212 354.308 / 1)",
		600: "oklch(0.592 0.218 0.584 / 1)",
		700: "oklch(0.525 0.199 3.958 / 1)",
		800: "oklch(0.459 0.17 3.815 / 1)",
		900: "oklch(0.408 0.144 2.432 / 1)",
		925: "oklch(0.347 0.124 2.558 / 1)",
		950: "oklch(0.284 0.105 3.907 / 1)",
		1e3: "oklch(0.201 0.073 1.239 / 1)"
	}
};
/** Absolute black in oklch format. */
const black = "oklch(0 0 0 / 1)";
/** Absolute white in oklch format. */
const white = "oklch(1 0 89.876 / 1)";
/**
* Return a copy of an oklch color string with its alpha channel replaced.
*
* @param color - An oklch color string with `/ 1` alpha (e.g. `"oklch(0.5 0.1 260 / 1)"`)
* @param alpha - New alpha value between 0 and 1
* @returns The color string with the updated alpha
*
* @example
* ```ts
* withAlpha("oklch(0.5 0.1 260 / 1)", 0.5)
* // => "oklch(0.5 0.1 260 / 0.5)"
* ```
*/
const withAlpha = (color, alpha) => color.replace(/\s\/\s(?:1|1\.0)\)$/, ` / ${alpha})`);
const STANDARD_ALPHA_STEPS = [
	.02,
	.04,
	.06,
	.08,
	.1,
	.12,
	.2,
	.3,
	.4,
	.5,
	.6,
	.7,
	.8,
	.9,
	1
];
const LEGACY_BLACK_WHITE_ALPHA_STEPS = [
	0,
	.16,
	.24,
	.32,
	.96
];
const SWATCH_SHADES = [
	25,
	50,
	100,
	200,
	300,
	400,
	500,
	600,
	700,
	800,
	900,
	925,
	950,
	1e3
];
const toAlphaSuffix = (alpha) => `a${Math.round(alpha * 100).toString().padStart(2, "0")}`;
const buildAlphaSwatches = () => {
	const map = {};
	for (const alpha of STANDARD_ALPHA_STEPS) {
		map[`black-${toAlphaSuffix(alpha)}`] = withAlpha(black, alpha);
		map[`white-${toAlphaSuffix(alpha)}`] = withAlpha(white, alpha);
	}
	for (const alpha of LEGACY_BLACK_WHITE_ALPHA_STEPS) {
		map[`black-${toAlphaSuffix(alpha)}`] = withAlpha(black, alpha);
		map[`white-${toAlphaSuffix(alpha)}`] = withAlpha(white, alpha);
	}
	for (const family of Object.keys(BASE_SWATCHES)) {
		const baseShade = family === "neutral" || family === "slate" || family === "gray" || family === "zinc" || family === "stone" ? 1e3 : 600;
		const base = BASE_SWATCHES[family][baseShade];
		for (const alpha of STANDARD_ALPHA_STEPS) map[`${family}-${baseShade}-${toAlphaSuffix(alpha)}`] = withAlpha(base, alpha);
	}
	return map;
};
const buildBaseTokenMap = () => {
	const map = {
		black,
		white
	};
	for (const family of Object.keys(BASE_SWATCHES)) for (const shade of SWATCH_SHADES) map[`${family}-${shade}`] = BASE_SWATCHES[family][shade];
	return map;
};
const SWATCH_TOKENS = {
	...buildBaseTokenMap(),
	...buildAlphaSwatches()
};
/**
* Look up a raw oklch color value by swatch family name and shade.
*
* @param name  - One of the 20 swatch families (e.g. `"blue"`, `"neutral"`)
* @param shade - Shade step from 25 (lightest) to 1000 (darkest)
* @returns The oklch color string
*
* @example
* ```ts
* swatch("blue", 600) // => "oklch(0.546 0.215 262.881 / 1)"
* ```
*/
const swatch = (name, shade) => BASE_SWATCHES[name][shade];
/**
* Resolve a flat token key (e.g. `"blue-600"`, `"black-a50"`) to its oklch
* color value. Returns `""` for unknown tokens.
*/
const swatchToken = (token) => SWATCH_TOKENS[token] ?? "";
/** The complete flat map of all swatch tokens (base shades + alpha variants). */
const swatchTokens = SWATCH_TOKENS;
//#endregion
//#region src/components/ThemeProvider/defaultTheme.ts
const LIGHT_SWATCHES = {
	neutralSwatch: "neutral",
	brandSwatch: "blue"
};
const DARK_SWATCHES = {
	neutralSwatch: "neutral",
	brandSwatch: "blue"
};
const SEMANTIC_SWATCHES = {
	info: "blue",
	success: "green",
	alert: "yellow",
	danger: "red",
	purple: "purple",
	pink: "pink"
};
const getBrandBaseShade = (brandSwatch) => brandSwatch === "neutral" || brandSwatch === "slate" || brandSwatch === "gray" || brandSwatch === "zinc" || brandSwatch === "stone" ? 1e3 : 600;
const AA_LARGE_CONTRAST_THRESHOLD = 3;
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const parseOklch = (value) => {
	const match = value.match(/^oklch\(\s*([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)(?:\s*\/\s*[+-]?\d*\.?\d+)?\s*\)$/i);
	if (!match) return null;
	return {
		l: Number(match[1]),
		c: Number(match[2]),
		h: Number(match[3])
	};
};
const relativeLuminanceFromOklch = (oklchValue) => {
	const parsed = parseOklch(oklchValue);
	if (!parsed) return 0;
	const hRadians = parsed.h * Math.PI / 180;
	const a = parsed.c * Math.cos(hRadians);
	const b = parsed.c * Math.sin(hRadians);
	const lPrime = parsed.l + .3963377774 * a + .2158037573 * b;
	const mPrime = parsed.l - .1055613458 * a - .0638541728 * b;
	const sPrime = parsed.l - .0894841775 * a - 1.291485548 * b;
	const l = lPrime ** 3;
	const m = mPrime ** 3;
	const s = sPrime ** 3;
	const rLinear = clamp01(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s);
	const gLinear = clamp01(-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s);
	const bLinear = clamp01(-.0041960863 * l - .7034186147 * m + 1.707614701 * s);
	return .2126 * rLinear + .7152 * gLinear + .0722 * bLinear;
};
const contrastRatio = (foreground, background) => {
	const luminance1 = relativeLuminanceFromOklch(foreground);
	const luminance2 = relativeLuminanceFromOklch(background);
	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);
	return (lighter + .05) / (darker + .05);
};
const pickAccentTextFromNeutral = ({ neutralSwatch, accentBackground }) => {
	const neutral25 = swatch(neutralSwatch, 25);
	const neutral1000 = swatch(neutralSwatch, 1e3);
	const ratio25 = contrastRatio(neutral25, accentBackground);
	const ratio1000 = contrastRatio(neutral1000, accentBackground);
	const pass25 = ratio25 >= AA_LARGE_CONTRAST_THRESHOLD;
	const pass1000 = ratio1000 >= AA_LARGE_CONTRAST_THRESHOLD;
	if (pass25 && pass1000) return neutral25;
	if (pass25) return neutral25;
	if (pass1000) return neutral1000;
	return neutral25;
};
const createColorTheme = ({ mode, neutralSwatch, brandSwatch }) => {
	const isDark = mode === "dark";
	const neutral = neutralSwatch;
	const brandBase = getBrandBaseShade(brandSwatch);
	const brandSolid = brandSwatch === "neutral" ? isDark ? swatch(neutral, 25) : swatch(neutral, 1e3) : swatch(brandSwatch, brandBase);
	const overlayBase = isDark ? swatch(neutral, 25) : swatch(neutral, 1e3);
	const neutralPrimary = isDark ? swatch(neutral, 50) : swatch(neutral, 1e3);
	const neutralSecondary = withAlpha(neutralPrimary, .5);
	const neutralTertiary = withAlpha(neutralPrimary, .2);
	const accentText = brandSwatch === "neutral" ? isDark ? swatch(neutral, 1e3) : swatch(neutral, 25) : pickAccentTextFromNeutral({
		neutralSwatch: neutral,
		accentBackground: brandSolid
	});
	const accentTextSecondary = withAlpha(accentText, .5);
	const accentTextTertiary = withAlpha(accentText, .2);
	const infoSwatch = SEMANTIC_SWATCHES.info;
	const successSwatch = SEMANTIC_SWATCHES.success;
	const alertSwatch = SEMANTIC_SWATCHES.alert;
	const dangerSwatch = SEMANTIC_SWATCHES.danger;
	const purpleSwatch = SEMANTIC_SWATCHES.purple;
	const pinkSwatch = SEMANTIC_SWATCHES.pink;
	return {
		background: isDark ? swatch(neutral, 950) : swatch(neutral, 100),
		foreground: isDark ? swatch(neutral, 900) : swatch(neutral, 25),
		popoverBackground: isDark ? swatch(neutral, 900) : swatch(neutral, 25),
		sunkLight: withAlpha(overlayBase, .02),
		sunk: withAlpha(overlayBase, .04),
		sunkDeep: withAlpha(overlayBase, .08),
		elevatedLight: withAlpha(overlayBase, .04),
		elevated: withAlpha(overlayBase, .08),
		elevatedStrong: withAlpha(overlayBase, .16),
		elevatedIntense: withAlpha(overlayBase, .32),
		overlay: isDark ? withAlpha(black, .6) : withAlpha(black, .4),
		highlightSubtle: withAlpha(overlayBase, .02),
		highlight: withAlpha(overlayBase, .04),
		highlightStrong: withAlpha(overlayBase, .08),
		highlightIntense: withAlpha(overlayBase, isDark ? .3 : .32),
		invertedBackground: isDark ? swatch(neutral, 25) : swatch(neutral, 1e3),
		infoBackground: withAlpha(swatch(infoSwatch, 500), .12),
		successBackground: withAlpha(swatch(successSwatch, 600), .12),
		alertBackground: withAlpha(swatch(alertSwatch, 500), .16),
		dangerBackground: withAlpha(swatch(dangerSwatch, 600), .12),
		purpleBackground: withAlpha(swatch(purpleSwatch, 500), .12),
		pinkBackground: withAlpha(swatch(pinkSwatch, 600), .12),
		textNeutralPrimary: neutralPrimary,
		textNeutralSecondary: neutralSecondary,
		textNeutralTertiary: neutralTertiary,
		textNeutralLink: neutralPrimary,
		textBrand: brandSolid,
		textWhite: white,
		textBlack: black,
		textAccentPrimary: accentText,
		textAccentSecondary: accentTextSecondary,
		textAccentTertiary: accentTextTertiary,
		textSuccessPrimary: isDark ? swatch(successSwatch, 300) : swatch(successSwatch, 800),
		textSuccessInverted: swatch(successSwatch, 100),
		textAlertPrimary: isDark ? swatch(alertSwatch, 300) : swatch(alertSwatch, 800),
		textAlertInverted: swatch(alertSwatch, 100),
		textDangerPrimary: isDark ? swatch(dangerSwatch, 300) : swatch(dangerSwatch, 700),
		textDangerSecondary: isDark ? swatch(dangerSwatch, 200) : swatch(dangerSwatch, 400),
		textDangerTertiary: isDark ? swatch(dangerSwatch, 100) : swatch(dangerSwatch, 300),
		textDangerInvertedPrimary: swatch(dangerSwatch, 25),
		textDangerInvertedSecondary: withAlpha(swatch(dangerSwatch, 25), .5),
		textDangerInvertedTertiary: withAlpha(swatch(dangerSwatch, 25), .3),
		textInfoPrimary: isDark ? swatch(infoSwatch, 300) : swatch(infoSwatch, 800),
		textInfoInverted: swatch(infoSwatch, 100),
		textPinkPrimary: isDark ? swatch(pinkSwatch, 300) : swatch(pinkSwatch, 800),
		textPinkInverted: swatch(pinkSwatch, 100),
		textPurplePrimary: isDark ? swatch(purpleSwatch, 300) : swatch(purpleSwatch, 800),
		textPurpleInverted: swatch(purpleSwatch, 100),
		interactiveAccentDefault: brandSolid,
		interactiveAccentHover: withAlpha(brandSolid, .8),
		interactiveAccentDisabled: withAlpha(brandSolid, .4),
		interactiveAccentPressed: brandSolid,
		interactiveDestructiveDefault: withAlpha(swatch(dangerSwatch, 600), .02),
		interactiveDestructiveHover: withAlpha(swatch(dangerSwatch, 600), .08),
		interactiveDestructiveDisabled: withAlpha(swatch(dangerSwatch, 600), .02),
		interactiveDestructivePressed: withAlpha(swatch(dangerSwatch, 600), .1),
		interactiveDestructiveAccentDefault: swatch(dangerSwatch, 600),
		interactiveDestructiveAccentHover: swatch(dangerSwatch, 500),
		interactiveDestructiveAccentPressed: swatch(dangerSwatch, 700),
		interactiveDestructiveAccentDisabled: withAlpha(swatch(dangerSwatch, 600), .4),
		chatUserResponseBg: withAlpha(overlayBase, .08),
		chatUserResponseText: neutralPrimary,
		borderDefault: withAlpha(overlayBase, isDark ? .06 : .06),
		borderInteractive: withAlpha(overlayBase, isDark ? .12 : .12),
		borderInteractiveEmphasis: withAlpha(overlayBase, isDark ? .4 : .3),
		borderInteractiveSelected: isDark ? swatch(neutral, 50) : swatch(neutral, 1e3),
		borderAccent: withAlpha(brandSolid, isDark ? .2 : .08),
		borderAccentEmphasis: withAlpha(brandSolid, isDark ? .4 : .3),
		borderInfo: withAlpha(swatch(infoSwatch, 500), .08),
		borderInfoEmphasis: swatch(infoSwatch, 600),
		borderAlert: withAlpha(swatch(alertSwatch, 400), .08),
		borderAlertEmphasis: swatch(alertSwatch, 600),
		borderSuccess: withAlpha(swatch(successSwatch, 600), .08),
		borderSuccessEmphasis: swatch(successSwatch, 600),
		borderDanger: withAlpha(swatch(dangerSwatch, 600), .08),
		borderDangerEmphasis: swatch(dangerSwatch, 600)
	};
};
const lightColorTheme = createColorTheme({
	mode: "light",
	...LIGHT_SWATCHES
});
const darkColorTheme = createColorTheme({
	mode: "dark",
	...DARK_SWATCHES
});
const SPACE_BASE = 2;
const RADIUS_BASE = 2;
const toPx = (base, multiplier) => {
	const value = base * multiplier;
	if (value === 0) return "0";
	return `${value}px`;
};
const layoutTheme = {
	space000: toPx(SPACE_BASE, 0),
	space3xs: toPx(SPACE_BASE, 1),
	space2xs: toPx(SPACE_BASE, 2),
	spaceXs: toPx(SPACE_BASE, 3),
	spaceS: toPx(SPACE_BASE, 4),
	spaceSM: toPx(SPACE_BASE, 5),
	spaceM: toPx(SPACE_BASE, 6),
	spaceML: toPx(SPACE_BASE, 8),
	spaceL: toPx(SPACE_BASE, 9),
	spaceXl: toPx(SPACE_BASE, 12),
	space2xl: toPx(SPACE_BASE, 18),
	space3xl: toPx(SPACE_BASE, 24),
	radiusNone: toPx(RADIUS_BASE, 0),
	radius3xs: toPx(RADIUS_BASE, .5),
	radius2xs: toPx(RADIUS_BASE, 1),
	radiusXs: toPx(RADIUS_BASE, 2),
	radiusS: toPx(RADIUS_BASE, 3),
	radiusM: toPx(RADIUS_BASE, 4),
	radiusL: toPx(RADIUS_BASE, 5),
	radiusXl: toPx(RADIUS_BASE, 6),
	radius2xl: toPx(RADIUS_BASE, 7),
	radius3xl: toPx(RADIUS_BASE, 8),
	radius4xl: toPx(RADIUS_BASE, 10),
	radius5xl: toPx(RADIUS_BASE, 12),
	radius6xl: toPx(RADIUS_BASE, 14),
	radius7xl: toPx(RADIUS_BASE, 16),
	radius8xl: toPx(RADIUS_BASE, 20),
	radius9xl: toPx(RADIUS_BASE, 24),
	radiusFull: "9999px"
};
const FONT_BODY = "\"Inter\", sans-serif";
const FONT_CODE = "\"SFMono-Regular\", Menlo, monospace";
const FONT_HEADING = "\"Inter\", sans-serif";
const FONT_LABEL = "\"Inter\", sans-serif";
const FONT_NUMBERS = "\"Inter\", sans-serif";
const typographyTheme = {
	fontBody: FONT_BODY,
	fontCode: FONT_CODE,
	fontHeading: FONT_HEADING,
	fontLabel: FONT_LABEL,
	fontNumbers: FONT_NUMBERS,
	fontSize2xs: "10px",
	fontSizeXs: "12px",
	fontSizeSm: "14px",
	fontSizeMd: "16px",
	fontSizeLg: "18px",
	fontSizeXl: "20px",
	fontSize2xl: "24px",
	fontSize3xl: "28px",
	fontSize4xl: "32px",
	fontSize5xl: "36px",
	fontWeightRegular: "375",
	fontWeightMedium: "475",
	fontWeightBold: "600",
	fontWeightHeavy: "700",
	lineHeightBody: "1.5",
	lineHeightHeading: "1.25",
	lineHeightHeadingLarge: "1.1",
	lineHeightLabel: "1.25",
	lineHeightCode: "1.5",
	letterSpacingNormal: "0",
	letterSpacingTight: "-0.1px",
	letterSpacingTighter: "-0.2px",
	textBodyXs: `400 12px/1.5 ${FONT_BODY}`,
	textBodyXsLetterSpacing: "0",
	textBodyXsHeavy: `500 12px/1.5 ${FONT_BODY}`,
	textBodyXsHeavyLetterSpacing: "0",
	textBodySm: `400 14px/1.5 ${FONT_BODY}`,
	textBodySmLetterSpacing: "0",
	textBodySmHeavy: `500 14px/1.5 ${FONT_BODY}`,
	textBodySmHeavyLetterSpacing: "0",
	textBodyDefault: `400 16px/1.5 ${FONT_BODY}`,
	textBodyDefaultLetterSpacing: "0",
	textBodyDefaultHeavy: `500 16px/1.5 ${FONT_BODY}`,
	textBodyDefaultHeavyLetterSpacing: "0",
	textBodyLg: `400 18px/1.5 ${FONT_BODY}`,
	textBodyLgLetterSpacing: "0",
	textBodyLgHeavy: `500 18px/1.5 ${FONT_BODY}`,
	textBodyLgHeavyLetterSpacing: "0",
	textHeadingXs: `600 16px/1.25 ${FONT_HEADING}`,
	textHeadingXsLetterSpacing: "0",
	textHeadingSm: `600 18px/1.25 ${FONT_HEADING}`,
	textHeadingSmLetterSpacing: "0",
	textHeadingMd: `600 24px/1.1 ${FONT_HEADING}`,
	textHeadingMdLetterSpacing: "0",
	textHeadingLg: `600 28px/1.1 ${FONT_HEADING}`,
	textHeadingLgLetterSpacing: "-0.1px",
	textHeadingXl: `700 32px/1.1 ${FONT_HEADING}`,
	textHeadingXlLetterSpacing: "-0.1px",
	textLabelXs: `400 12px/1.25 ${FONT_LABEL}`,
	textLabelXsLetterSpacing: "0",
	textLabelXsHeavy: `500 12px/1.25 ${FONT_LABEL}`,
	textLabelXsHeavyLetterSpacing: "0",
	textLabelSm: `400 14px/1.25 ${FONT_LABEL}`,
	textLabelSmLetterSpacing: "0",
	textLabelSmHeavy: `500 14px/1.25 ${FONT_LABEL}`,
	textLabelSmHeavyLetterSpacing: "0",
	textLabelDefault: `400 16px/1.25 ${FONT_LABEL}`,
	textLabelDefaultLetterSpacing: "0",
	textLabelDefaultHeavy: `500 16px/1.25 ${FONT_LABEL}`,
	textLabelDefaultHeavyLetterSpacing: "0",
	textLabelLg: `400 18px/1.25 ${FONT_LABEL}`,
	textLabelLgLetterSpacing: "0",
	textLabelLgHeavy: `500 18px/1.25 ${FONT_LABEL}`,
	textLabelLgHeavyLetterSpacing: "0",
	textNumbersXs: `400 12px/1.5 ${FONT_NUMBERS}`,
	textNumbersXsLetterSpacing: "0",
	textNumbersXsHeavy: `500 12px/1.5 ${FONT_NUMBERS}`,
	textNumbersXsHeavyLetterSpacing: "0",
	textNumbersSm: `400 14px/1.5 ${FONT_NUMBERS}`,
	textNumbersSmLetterSpacing: "0",
	textNumbersSmHeavy: `500 14px/1.5 ${FONT_NUMBERS}`,
	textNumbersSmHeavyLetterSpacing: "0",
	textNumbersDefault: `400 16px/1.5 ${FONT_NUMBERS}`,
	textNumbersDefaultLetterSpacing: "0",
	textNumbersDefaultHeavy: `500 16px/1.5 ${FONT_NUMBERS}`,
	textNumbersDefaultHeavyLetterSpacing: "0",
	textNumbersLg: `400 18px/1.5 ${FONT_NUMBERS}`,
	textNumbersLgLetterSpacing: "0",
	textNumbersLgHeavy: `500 18px/1.5 ${FONT_NUMBERS}`,
	textNumbersLgHeavyLetterSpacing: "0",
	textNumbersHeadingSm: `600 18px/1.25 ${FONT_NUMBERS}`,
	textNumbersHeadingSmLetterSpacing: "0",
	textNumbersHeadingMd: `600 24px/1.1 ${FONT_NUMBERS}`,
	textNumbersHeadingMdLetterSpacing: "0",
	textNumbersHeadingLg: `600 28px/1.1 ${FONT_NUMBERS}`,
	textNumbersHeadingLgLetterSpacing: "0",
	textNumbersHeadingXl: `600 32px/1.1 ${FONT_NUMBERS}`,
	textNumbersHeadingXlLetterSpacing: "0",
	textCodeSm: `400 12px/1.5 ${FONT_CODE}`,
	textCodeSmLetterSpacing: "0",
	textCodeSmHeavy: `700 12px/1.5 ${FONT_CODE}`,
	textCodeSmHeavyLetterSpacing: "0",
	textCodeDefault: `400 14px/1.5 ${FONT_CODE}`,
	textCodeDefaultLetterSpacing: "0",
	textCodeDefaultHeavy: `700 14px/1.5 ${FONT_CODE}`,
	textCodeDefaultHeavyLetterSpacing: "0"
};
const lightEffectTheme = {
	shadow0: "none",
	shadowS: "0 1px 3px -2px oklch(0 0 0 / 0.02), 0 2px 5px -2px oklch(0 0 0 / 0.04)",
	shadowM: "0 4px 6px -2px oklch(0 0 0 / 0.025), 0 2px 2px -2px oklch(0 0 0 / 0.05)",
	shadowL: "0 4px 4px -2px oklch(0 0 0 / 0.05), 0 4px 8px -2px oklch(0 0 0 / 0.04)",
	shadowXl: "0 8px 16px -4px oklch(0 0 0 / 0.08), 0 16px 32px -6px oklch(0 0 0 / 0.12)",
	shadow2xl: "0 12px 24px -6px oklch(0 0 0 / 0.12), 0 24px 48px -8px oklch(0 0 0 / 0.16)",
	shadow3xl: "0 16px 32px -8px oklch(0 0 0 / 0.16), 0 32px 64px -12px oklch(0 0 0 / 0.22)"
};
const darkEffectTheme = {
	shadow0: "none",
	shadowS: "0 1px 3px -2px oklch(0 0 0 / 0.06), 0 2px 5px -2px oklch(0 0 0 / 0.10)",
	shadowM: "0 4px 6px -2px oklch(0 0 0 / 0.08), 0 2px 2px -2px oklch(0 0 0 / 0.12)",
	shadowL: "0 4px 4px -2px oklch(0 0 0 / 0.12), 0 4px 8px -2px oklch(0 0 0 / 0.10)",
	shadowXl: "0 8px 16px -4px oklch(0 0 0 / 0.16), 0 16px 32px -6px oklch(0 0 0 / 0.20)",
	shadow2xl: "0 12px 24px -6px oklch(0 0 0 / 0.20), 0 24px 48px -8px oklch(0 0 0 / 0.24)",
	shadow3xl: "0 16px 32px -8px oklch(0 0 0 / 0.24), 0 32px 64px -12px oklch(0 0 0 / 0.28)"
};
/**
* The built-in light theme. Combines the neutral-swatch light color palette,
* shared layout and typography tokens, and light-mode shadow values.
*
* Used as the base when `ThemeProvider` is rendered with `mode="light"`.
*/
const defaultLightTheme = Object.freeze({
	...lightColorTheme,
	...layoutTheme,
	...typographyTheme,
	...lightEffectTheme
});
/**
* The built-in dark theme. Uses the neutral-swatch dark color palette with
* inverted surface lightness, higher shadow opacity, and shared layout /
* typography tokens.
*
* Used as the base when `ThemeProvider` is rendered with `mode="dark"`.
*/
const defaultDarkTheme = Object.freeze({
	...darkColorTheme,
	...layoutTheme,
	...typographyTheme,
	...darkEffectTheme
});
//#endregion
//#region src/components/ThemeProvider/types.ts
/**
* Optional color arrays used by chart components.
* Each palette overrides the default for its specific chart type.
*
* Single source of truth for palette keys: the `ChartColorPalette` type is
* derived from this array and the runtime theme-key validators consume it,
* so a new palette is added in exactly one place.
*/
const CHART_PALETTE_KEYS = [
	"defaultChartPalette",
	"barChartPalette",
	"lineChartPalette",
	"areaChartPalette",
	"pieChartPalette",
	"radarChartPalette",
	"radialChartPalette",
	"horizontalBarChartPalette"
];
//#endregion
//#region src/components/ThemeProvider/utils.ts
/**
* Convert a camel case string to a kebab case string.
* @param str - The string to convert.
* @returns A kebab case string.
*/
function camelToKebab(str) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])(\d)/g, "$1-$2").toLowerCase();
}
/**
* Convert a theme object to a string of CSS variables.
* @param theme - The theme object to convert.
* @param prefix - The prefix to use for the CSS variables.
* @returns A string of CSS variables.
*/
function themeToCssVars(theme, prefix = "inv") {
	return Object.entries(theme).filter(([, v]) => typeof v === "string").map(([key, value]) => `--${prefix}-${camelToKebab(key)}: ${value};`).join("\n          ");
}
/**
* Every theme key accepted at runtime: all keys present in the default themes
* plus the chart palette keys, which are declared only on the type (a default
* palette would override the per-chart `theme` prop fallback in
* useChartPalette). `CHART_PALETTE_KEYS` in types.ts is the single source the
* `ChartColorPalette` type itself derives from. Shared by `createTheme()` and
* the ThemeProvider prop validator so the two allow-lists cannot drift apart.
*/
const KNOWN_THEME_KEYS = new Set([...Object.keys(defaultLightTheme), ...CHART_PALETTE_KEYS]);
function levenshteinDistance(a, b) {
	const m = a.length;
	const n = b.length;
	const prev = Array(n + 1).fill(0);
	const curr = Array(n + 1).fill(0);
	for (let j = 0; j <= n; j++) prev[j] = j;
	for (let i = 1; i <= m; i++) {
		curr[0] = i;
		for (let j = 1; j <= n; j++) curr[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
		for (let j = 0; j <= n; j++) prev[j] = curr[j];
	}
	return prev[n];
}
const _warnedKeys = /* @__PURE__ */ new Set();
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
function createTheme(theme) {
	if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production") for (const key of Object.keys(theme)) {
		if (KNOWN_THEME_KEYS.has(key) || _warnedKeys.has(key)) continue;
		_warnedKeys.add(key);
		let suggestion = "";
		let bestDist = Infinity;
		for (const known of KNOWN_THEME_KEYS) {
			const dist = levenshteinDistance(key, known);
			if (dist < bestDist) {
				bestDist = dist;
				suggestion = known;
			}
		}
		const hint = bestDist <= 3 ? ` Did you mean "${suggestion}"?` : "";
		console.warn(`[Inv] Unknown theme key "${key}".${hint}`);
	}
	return theme;
}
//#endregion
//#region src/components/ThemeProvider/ThemeProvider.tsx
/**
* React context that carries the resolved theme, active mode, and a CSS class
* name for portals. Consumed via {@link useTheme}.
*/
const ThemeContext = (0, react.createContext)({
	theme: defaultLightTheme,
	mode: "light",
	portalThemeClassName: ""
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
const useTheme = () => (0, react.useContext)(ThemeContext);
const themes = {
	light: defaultLightTheme,
	dark: defaultDarkTheme
};
const INV_THEME_SENTINEL = Symbol("inv-theme-provider");
const InternalContext = (0, react.createContext)(null);
const _devWarned = /* @__PURE__ */ new Set();
function warnOnce(key, message) {
	if (_devWarned.has(key)) return;
	_devWarned.add(key);
	console.warn(message);
}
function cssSafeId(id) {
	return id.replace(/[^a-zA-Z0-9-_]/g, "");
}
function validateThemeObject(themeObj, propName) {
	for (const [key, value] of Object.entries(themeObj)) {
		if (value !== void 0 && typeof value !== "string" && !Array.isArray(value)) warnOnce(`non-string:${propName}:${key}`, `[Inv] ${propName} key "${key}" has a non-string value (${typeof value}). All theme values should be strings.`);
		if (!KNOWN_THEME_KEYS.has(key)) warnOnce(`unknown-key:${propName}:${key}`, `[Inv] ${propName} contains unknown key "${key}". It will be ignored. Use createTheme() for typo detection with suggestions.`);
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
const ThemeProvider = ({ mode: modeProp, children, lightTheme, darkTheme, theme: deprecatedTheme, cssSelector = "body" }) => {
	const id = cssSafeId((0, react.useId)());
	const parent = (0, react.useContext)(InternalContext);
	const isNested = parent != null;
	const mode = modeProp ?? parent?.mode ?? "light";
	const effectiveCssSelector = cssSelector || "body";
	const hasExplicitSelector = effectiveCssSelector !== "body";
	const userLightTheme = lightTheme ?? deprecatedTheme ?? {};
	const userDarkTheme = darkTheme;
	if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production") {
		if (deprecatedTheme !== void 0 && lightTheme !== void 0) warnOnce("theme+lightTheme", "[Inv] Both \"theme\" and \"lightTheme\" were passed to ThemeProvider. \"lightTheme\" takes precedence. Remove the deprecated \"theme\" prop.");
		if (deprecatedTheme !== void 0 && lightTheme === void 0) warnOnce("deprecated-theme", "[Inv] The \"theme\" prop on ThemeProvider is deprecated. Use \"lightTheme\" instead.");
		validateThemeObject(userLightTheme, "lightTheme");
		if (userDarkTheme) validateThemeObject(userDarkTheme, "darkTheme");
	}
	const resolvedLightTheme = (0, react.useMemo)(() => ({
		...themes.light,
		...userLightTheme
	}), [userLightTheme]);
	const resolvedDarkTheme = (0, react.useMemo)(() => {
		const overrides = userDarkTheme ?? userLightTheme;
		return {
			...themes.dark,
			...overrides
		};
	}, [userDarkTheme, userLightTheme]);
	const activeTheme = mode === "light" ? resolvedLightTheme : resolvedDarkTheme;
	const cssVarsString = (0, react.useMemo)(() => themeToCssVars(activeTheme), [activeTheme]);
	const portalClassName = `inv-theme-portal-${id}`;
	const scopedClassName = `inv-theme-${id}`;
	const contextValue = (0, react.useMemo)(() => ({
		theme: activeTheme,
		mode,
		portalThemeClassName: portalClassName
	}), [
		activeTheme,
		mode,
		portalClassName
	]);
	const internalValue = (0, react.useMemo)(() => ({
		[INV_THEME_SENTINEL]: true,
		theme: activeTheme,
		mode,
		portalThemeClassName: portalClassName
	}), [
		activeTheme,
		mode,
		portalClassName
	]);
	const useAutoScope = isNested && !hasExplicitSelector;
	const styleSelector = useAutoScope ? `.${scopedClassName}` : effectiveCssSelector;
	(0, react.useInsertionEffect)(() => {
		const style = document.createElement("style");
		style.setAttribute("data-inv-theme", id);
		style.textContent = `${styleSelector}, .${portalClassName} { ${cssVarsString} }`;
		document.head.appendChild(style);
		return () => style.remove();
	}, [
		cssVarsString,
		styleSelector,
		portalClassName,
		id
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InternalContext.Provider, {
		value: internalValue,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThemeContext.Provider, {
			value: contextValue,
			children: useAutoScope ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: scopedClassName,
				style: { display: "contents" },
				children
			}) : children
		})
	});
};
//#endregion
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
	return (0, react$1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
//#region src/components/AgentInterface/_shared/AgentInterfaceTooltip.tsx
const AgentInterfaceTooltip = ({ children, content, side = "bottom", align = "center", sideOffset = 8 }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Root, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Trigger, {
	asChild: true,
	children
}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Content, {
	className: "inv-agent-tooltip",
	side,
	align,
	sideOffset,
	children: content
}) })] });
//#endregion
//#region src/components/AgentInterface/_shared/GalleryHorizontalEndIcon.tsx
const GalleryHorizontalEndIcon = ({ size = "1em", ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	focusable: "false",
	...props,
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.5 19.323A2 2 0 0 1 2 18V6a2 2 0 0 1 .5-1.323" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.5 19.823A2 2 0 0 1 6 18.49V5.5a2 2 0 0 1 .268-1" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "4",
			width: "12",
			height: "16",
			rx: "2"
		})
	]
});
//#endregion
//#region src/components/AgentInterface/_shared/labelsContext.tsx
const DEFAULT_LABELS = {
	defaultCategory: "Artifacts",
	workspaceToggle: "Thread workspace",
	tabs: {
		all: "All",
		artifacts: "Artifacts",
		apps: "Apps"
	}
};
const LabelsContext = (0, react.createContext)(DEFAULT_LABELS);
const LabelsProvider = ({ labels, children }) => {
	const value = (0, react.useMemo)(() => ({
		defaultCategory: labels?.defaultCategory ?? DEFAULT_LABELS.defaultCategory,
		workspaceToggle: labels?.workspaceToggle ?? DEFAULT_LABELS.workspaceToggle,
		tabs: {
			all: labels?.tabs?.all ?? DEFAULT_LABELS.tabs.all,
			artifacts: labels?.tabs?.artifacts ?? DEFAULT_LABELS.tabs.artifacts,
			apps: labels?.tabs?.apps ?? DEFAULT_LABELS.tabs.apps
		}
	}), [
		labels?.defaultCategory,
		labels?.workspaceToggle,
		labels?.tabs?.all,
		labels?.tabs?.artifacts,
		labels?.tabs?.apps
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelsContext.Provider, {
		value,
		children
	});
};
/**
* Resolved (default-merged) consumer labels for the artifact browser + workspace.
* Works without a provider (returns the English defaults).
*/
const useAgentInterfaceLabels = () => (0, react.useContext)(LabelsContext);
//#endregion
//#region src/components/AgentInterface/_shared/startersContext.tsx
const StartersContext = (0, react.createContext)({});
const StartersProvider = ({ starters, starterVariant, children }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StartersContext.Provider, {
	value: {
		starters,
		starterVariant
	},
	children
});
const useStartersFromContext = () => (0, react.useContext)(StartersContext);
//#endregion
//#region src/components/AgentInterface/_shared/store/store.tsx
const createAgentInterfaceStore = ({ logoUrl, agentName }) => (0, zustand.create)((set) => ({
	isSidebarOpen: true,
	isWorkspaceOpen: false,
	agentName,
	logoUrl,
	setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
	setIsWorkspaceOpen: (isOpen) => set({ isWorkspaceOpen: isOpen }),
	setAgentName: (name) => set({ agentName: name }),
	setLogoUrl: (url) => set({ logoUrl: url })
}));
const AgentInterfaceStoreContext = (0, react.createContext)(null);
const useAgentInterfaceStore = (selector) => {
	const store = (0, react.useContext)(AgentInterfaceStoreContext);
	if (!store) throw new Error("useAgentInterfaceStore must be used within AgentInterfaceStoreProvider");
	return store((0, zustand_react_shallow.useShallow)(selector));
};
const AgentInterfaceStoreProvider = ({ children, agentName, logoUrl }) => {
	const shellStore = (0, react.useMemo)(() => createAgentInterfaceStore({
		agentName,
		logoUrl
	}), []);
	(0, react.useEffect)(() => {
		const { setAgentName, setLogoUrl } = shellStore.getState();
		setAgentName(agentName);
		setLogoUrl(logoUrl);
	}, [agentName, logoUrl]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceStoreContext.Provider, {
		value: shellStore,
		children
	});
};
//#endregion
//#region src/components/Button/Button.tsx
const normalVariantMap = {
	primary: "inv-button-base-primary",
	secondary: "inv-button-base-secondary",
	tertiary: "inv-button-base-tertiary"
};
const destructiveVariantMap = {
	primary: "inv-button-base-destructive-primary",
	secondary: "inv-button-base-destructive-secondary",
	tertiary: "inv-button-base-destructive-tertiary"
};
const sizeMap$2 = {
	"extra-small": "inv-button-base-extra-small",
	small: "inv-button-base-small",
	medium: "inv-button-base-medium",
	large: "inv-button-base-large"
};
const Button = (0, react.forwardRef)(({ children, variant = "primary", size = "medium", iconLeft, iconRight, className, buttonType = "normal", ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		ref,
		className: (0, clsx.default)("inv-button-base", (buttonType === "destructive" ? destructiveVariantMap : normalVariantMap)[variant], sizeMap$2[size], className),
		...props,
		children: [
			iconLeft,
			children,
			iconRight
		]
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/DotMatrixLoader/DotMatrixLoader.tsx
/** Time for each trail to complete one revolution of its ring. */
const REVOLUTION_MS = 1400;
const MIN_OPACITY = .14;
/** Trail length as a fraction of the ring — same visual proportion on both rings. */
const TRAIL_LENGTH = .28;
const createClockwiseRing = (gridSize, inset) => {
	const start = inset;
	const end = gridSize - inset - 1;
	const ring = [];
	for (let col = start; col <= end; col++) ring.push([start, col]);
	for (let row = start + 1; row <= end; row++) ring.push([row, end]);
	for (let col = end - 1; col >= start; col--) ring.push([end, col]);
	for (let row = end - 1; row > start; row--) ring.push([row, start]);
	return ring;
};
const RINGS = {
	4: {
		outer: createClockwiseRing(4, 0),
		inner: createClockwiseRing(4, 1)
	},
	5: {
		outer: createClockwiseRing(5, 0),
		inner: createClockwiseRing(5, 1)
	}
};
const DotMatrixLoader = ({ className, size, variant = "default" }) => {
	const dotsRef = (0, react.useRef)(/* @__PURE__ */ new Map());
	const isCompact = variant === "compact";
	const gridSize = isCompact ? 4 : 5;
	const rings = RINGS[gridSize];
	const resolvedSize = size ?? (isCompact ? 24 : 36);
	(0, react.useEffect)(() => {
		const dots = dotsRef.current;
		dots.forEach((dot) => {
			dot.style.opacity = String(MIN_OPACITY);
		});
		const paintRing = (ring, head) => {
			const tail = ring.length * TRAIL_LENGTH;
			for (let i = 0; i < ring.length; i++) {
				const cell = ring[i];
				const dot = cell && dots.get(`${cell[0]}-${cell[1]}`);
				if (!dot) continue;
				const distance = (head - i + ring.length) % ring.length;
				const trailIntensity = Math.exp(-distance / tail);
				const forwardDistance = (i - head + ring.length) % ring.length;
				const leadProgress = forwardDistance < 1 ? 1 - forwardDistance : 0;
				const leadIntensity = leadProgress * leadProgress * (3 - 2 * leadProgress);
				const intensity = Math.max(trailIntensity, leadIntensity);
				dot.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * intensity);
			}
		};
		let frame;
		const tick = (now) => {
			const progress = now % REVOLUTION_MS / REVOLUTION_MS;
			paintRing(rings.outer, progress * rings.outer.length);
			paintRing(rings.inner, (1 - progress) * rings.inner.length);
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [rings]);
	const dots = [];
	for (let row = 0; row < gridSize; row++) for (let col = 0; col < gridSize; col++) {
		const key = `${row}-${col}`;
		dots.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-dot-matrix-loader__dot",
			ref: (el) => {
				if (el) dotsRef.current.set(key, el);
				else dotsRef.current.delete(key);
			}
		}, key));
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-dot-matrix-loader", className),
		role: "status",
		"aria-live": "polite",
		"aria-label": "Loading",
		style: {
			"--inv-dot-matrix-loader-grid-size": gridSize,
			"--inv-dot-matrix-loader-size": `${resolvedSize}px`
		},
		children: dots
	});
};
//#endregion
//#region src/components/AgentInterface/ArtifactBrowserPage.tsx
const SEARCH_DEBOUNCE_MS = 300;
/** Last-resort label: `"chart_v2"` → `"Chart V2"` (never the raw machine id). */
const prettifyType = (type) => type.replace(/[_-]+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase()) || type;
const formatArtifactUpdatedAt = (updatedAt) => {
	if (updatedAt === void 0) return void 0;
	const date = new Date(updatedAt);
	if (Number.isNaN(date.getTime())) return void 0;
	return new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(date);
};
/**
* Resolves the visual for an artifact type: the icon declared on its renderer
* (`defineArtifactRenderer({ icon })`) — any ReactNode the consumer chose — or a
* generic default. The framework is agnostic about what that node is.
*/
const useArtifactIcon = (type) => {
	const registry = (0, _invdev_react_headless.useArtifactRendererRegistry)();
	return (registry ? (0, _invdev_react_headless.lookupArtifactRendererByType)(registry, type)?.icon : void 0) ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Boxes, { size: "1em" });
};
/**
* Resolves the display label for an artifact type: the label declared on its
* renderer (`defineArtifactRenderer({ label })`), else a prettified `type`.
* Mirrors {@link useArtifactIcon} — never shows the raw machine id.
*/
const useArtifactTypeLabel = (type) => {
	const registry = (0, _invdev_react_headless.useArtifactRendererRegistry)();
	return (registry ? (0, _invdev_react_headless.lookupArtifactRendererByType)(registry, type)?.label : void 0) ?? prettifyType(type);
};
const ArtifactBrowserCard = ({ artifact, updatedAt, onClick }) => {
	const icon = useArtifactIcon(artifact.type);
	const metadata = [useArtifactTypeLabel(artifact.type), updatedAt].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "inv-agent-artifact-browser__item",
		onClick,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-artifact-browser__item-icon",
			children: icon
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-artifact-browser__item-meta",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-artifact-browser__item-title",
				children: artifact.title
			}), metadata && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-artifact-browser__item-updated-at",
				children: metadata
			})]
		})]
	});
};
/**
* Full-page searchable artifact list for one category (reserved path
* `artifacts/{category}`). Title search + category type filter are applied
* server-side via `ArtifactStorage.list`; pagination via cursor.
*
* Internal — rendered by AgentInterface when the current path matches the
* reserved `artifacts/` prefix.
*
* @internal
*/
const ArtifactBrowserPage = ({ categoryName }) => {
	const storage = (0, _invdev_react_headless.useArtifactStorage)();
	const categories = (0, _invdev_react_headless.useArtifactCategories)();
	const { navigate } = useNav();
	const switchToNewThread = (0, _invdev_react_headless.useThreadList)((s) => s.switchToNewThread);
	const { defaultCategory } = useAgentInterfaceLabels();
	const category = categoryName ? categories.find((c) => c.name === categoryName) : void 0;
	const notFound = categoryName !== void 0 && category === void 0;
	const typeFilter = category?.filter.type;
	const categoryIllustration = useArtifactIcon(typeFilter?.[0] ?? "");
	const categoryItemLabel = categoryName ? categoryName.replace(/s$/i, "").toLowerCase() : "artifact";
	const [search, setSearch] = (0, react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, react.useState)("");
	const [artifacts, setArtifacts] = (0, react.useState)([]);
	const [nextCursor, setNextCursor] = (0, react.useState)(void 0);
	const [isLoading, setIsLoading] = (0, react.useState)(true);
	const [error, setError] = (0, react.useState)(null);
	const requestIdRef = (0, react.useRef)(0);
	(0, react.useEffect)(() => {
		const t = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
		return () => clearTimeout(t);
	}, [search]);
	const typeKey = typeFilter?.join(" ");
	const emptyTitle = debouncedSearch ? `No results found for "${debouncedSearch}"` : `Ready to create your first ${categoryItemLabel}?`;
	const emptySubtitle = debouncedSearch ? void 0 : "Start with a prompt and create your first draft.";
	(0, react.useEffect)(() => {
		if (!storage || notFound) return;
		const requestId = ++requestIdRef.current;
		setIsLoading(true);
		setError(null);
		storage.list({
			name: debouncedSearch || void 0,
			type: typeKey === void 0 ? void 0 : typeKey.split(" ")
		}).then(({ artifacts: page, nextCursor: cursor }) => {
			if (requestId !== requestIdRef.current) return;
			setArtifacts(page);
			setNextCursor(cursor);
			setIsLoading(false);
		}).catch((e) => {
			if (requestId !== requestIdRef.current) return;
			setError(e instanceof Error ? e : new Error(String(e)));
			setIsLoading(false);
		});
	}, [
		storage,
		debouncedSearch,
		typeKey,
		notFound
	]);
	const loadMore = () => {
		if (!storage || nextCursor === void 0 || isLoading) return;
		const requestId = ++requestIdRef.current;
		setIsLoading(true);
		storage.list({
			name: debouncedSearch || void 0,
			type: typeKey === void 0 ? void 0 : typeKey.split(" "),
			cursor: nextCursor
		}).then(({ artifacts: page, nextCursor: cursor }) => {
			if (requestId !== requestIdRef.current) return;
			setArtifacts((prev) => [...prev, ...page]);
			setNextCursor(cursor);
			setIsLoading(false);
		}).catch((e) => {
			if (requestId !== requestIdRef.current) return;
			setError(e instanceof Error ? e : new Error(String(e)));
			setIsLoading(false);
		});
	};
	const handleNewChat = () => {
		switchToNewThread();
		navigate(void 0);
	};
	if (!storage) return null;
	if (notFound) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-artifact-browser",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-artifact-browser__content",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-artifact-browser__header",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					className: "inv-agent-artifact-browser__title",
					children: defaultCategory
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-artifact-browser__list",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-agent-artifact-browser__empty",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "inv-agent-artifact-browser__empty-illustration",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Boxes, { size: "1em" })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "inv-agent-artifact-browser__empty-text",
							children: [
								"No category named “",
								categoryName,
								"”"
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "small",
							onClick: () => navigate(artifactListPath()),
							children: "View all artifacts"
						})
					]
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-artifact-browser",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-artifact-browser__content",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-artifact-browser__header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					className: "inv-agent-artifact-browser__title",
					children: categoryName ?? defaultCategory
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-agent-artifact-browser__search",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Search, {
							size: 14,
							className: "inv-agent-artifact-browser__search-icon"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search by title",
							className: "inv-agent-artifact-browser__search-input",
							"aria-label": "Search artifacts by title"
						}),
						search && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
							size: "2-extra-small",
							variant: "tertiary",
							icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: "1em" }),
							"aria-label": "Clear search",
							onClick: () => setSearch("")
						})
					]
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-artifact-browser__list",
				children: [
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-agent-artifact-browser__error",
						children: ["Failed to load artifacts: ", error.message]
					}),
					!error && artifacts.length === 0 && !isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-agent-artifact-browser__empty",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "inv-agent-artifact-browser__empty-illustration",
								children: categoryIllustration
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "inv-agent-artifact-browser__empty-copy",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "inv-agent-artifact-browser__empty-text",
									children: emptyTitle
								}), emptySubtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "inv-agent-artifact-browser__empty-subtitle",
									children: emptySubtitle
								})]
							}),
							!debouncedSearch && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
								variant: "primary",
								size: "small",
								onClick: handleNewChat,
								children: "New Chat"
							})
						]
					}),
					artifacts.map((artifact) => {
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactBrowserCard, {
							artifact,
							updatedAt: formatArtifactUpdatedAt(artifact.updatedAt),
							onClick: () => navigate(artifactViewPath(categoryName, artifact.id))
						}, artifact.id);
					}),
					isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-agent-artifact-browser__loading",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotMatrixLoader, {})
					}),
					!isLoading && nextCursor !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-agent-artifact-browser__load-more",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "small",
							onClick: loadMore,
							children: "Load more"
						})
					})
				]
			})]
		})
	});
};
//#endregion
//#region src/context/LayoutContext.tsx
const LayoutContext = (0, react.createContext)({ layout: "fullscreen" });
const LayoutContextProvider = ({ children, layout }) => {
	const value = (0, react.useMemo)(() => ({ layout }), [layout]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LayoutContext.Provider, {
		value,
		children
	});
};
const useLayoutContext = () => {
	return (0, react.useContext)(LayoutContext);
};
//#endregion
//#region src/components/AgentInterface/Sidebar.tsx
const SIDEBAR_FADE_DURATION_MS = 90;
const SIDEBAR_RESIZE_DURATION_MS = 160;
const SidebarVisualStateContext = (0, react.createContext)(null);
const useOptionalSidebarVisualState = () => (0, react.useContext)(SidebarVisualStateContext);
const SidebarContainer = ({ children, className }) => {
	const { isSidebarOpen, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
		isSidebarOpen: state.isSidebarOpen,
		setIsSidebarOpen: state.setIsSidebarOpen
	}));
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const { layout } = useLayoutContext() || {};
	const isMobile = layout === "mobile";
	const [isCollapsedLayout, setIsCollapsedLayout] = (0, react.useState)(!isSidebarOpen);
	const [visualState, setVisualState] = (0, react.useState)(isSidebarOpen ? "expanded" : "collapsed");
	const animationTimeoutsRef = (0, react.useRef)([]);
	const previousIsMobileRef = (0, react.useRef)(null);
	const clearAnimationTimeouts = () => {
		animationTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		animationTimeoutsRef.current = [];
	};
	(0, react.useEffect)(() => {
		return () => {
			clearAnimationTimeouts();
		};
	}, []);
	(0, react.useEffect)(() => {
		clearAnimationTimeouts();
		const justSwitchedLayout = previousIsMobileRef.current !== isMobile;
		previousIsMobileRef.current = isMobile;
		if (justSwitchedLayout) {
			const targetOpen = !isMobile;
			if (isSidebarOpen !== targetOpen) {
				setIsSidebarOpen(targetOpen);
				return;
			}
		}
		if (isMobile) {
			setIsCollapsedLayout(!isSidebarOpen);
			setVisualState(isSidebarOpen ? "expanded" : "collapsed");
			return;
		}
		if (isSidebarOpen) {
			if (visualState === "expanded" && !isCollapsedLayout) return;
			setIsCollapsedLayout(true);
			setVisualState("expanding");
			animationTimeoutsRef.current.push(setTimeout(() => {
				setIsCollapsedLayout(false);
				animationTimeoutsRef.current.push(setTimeout(() => {
					setVisualState("expanded");
				}, SIDEBAR_RESIZE_DURATION_MS));
			}, SIDEBAR_FADE_DURATION_MS));
			return;
		}
		if (visualState === "collapsed" && isCollapsedLayout) return;
		setIsCollapsedLayout(false);
		setVisualState("collapsing");
		animationTimeoutsRef.current.push(setTimeout(() => {
			setIsCollapsedLayout(true);
			animationTimeoutsRef.current.push(setTimeout(() => {
				setVisualState("collapsed");
			}, SIDEBAR_RESIZE_DURATION_MS));
		}, SIDEBAR_FADE_DURATION_MS));
	}, [isMobile, isSidebarOpen]);
	const contextValue = (0, react.useMemo)(() => ({
		isCollapsedLayout,
		visualState
	}), [isCollapsedLayout, visualState]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(SidebarVisualStateContext.Provider, {
		value: contextValue,
		children: [isMobile && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-agent-sidebar-container__overlay", { "inv-agent-sidebar-container__overlay--collapsed": !isSidebarOpen }),
			onClick: () => {
				setIsSidebarOpen(false);
			}
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-agent-sidebar-container", {
				"inv-agent-sidebar-container--collapsed": isCollapsedLayout,
				"inv-agent-sidebar-container--hidden": isDetailedViewActive && !isMobile
			}, className),
			"data-sidebar-visual-state": visualState,
			onClick: () => {
				if (!isMobile && isCollapsedLayout) setIsSidebarOpen(true);
			},
			children
		})]
	});
};
const SidebarHeader = ({ className, logo, agentName: agentNameProp, collapseButton, children }) => {
	const { agentName: ctxAgentName, logoUrl, setIsSidebarOpen, isSidebarOpen } = useAgentInterfaceStore((state) => ({
		agentName: state.agentName,
		logoUrl: state.logoUrl,
		setIsSidebarOpen: state.setIsSidebarOpen,
		isSidebarOpen: state.isSidebarOpen
	}));
	const isCollapsedLayout = useOptionalSidebarVisualState()?.isCollapsedLayout ?? !isSidebarOpen;
	if (children != null) {
		if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production" && (logo !== void 0 || agentNameProp !== void 0 || collapseButton !== void 0)) console.warn("[AgentInterface] <AgentInterface.SidebarHeader> received both children and override props; children win.");
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-agent-sidebar-header", { "inv-agent-sidebar-header--collapsed": isCollapsedLayout }, className),
			children
		});
	}
	const defaultLogo = logoUrl ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		src: logoUrl,
		alt: ctxAgentName,
		className: "inv-agent-sidebar-header__logo"
	}) : null;
	const defaultAgentName = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-sidebar-header__agent-name",
		children: ctxAgentName
	});
	const defaultCollapseButton = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceTooltip, {
		content: isCollapsedLayout ? "Open sidebar" : "Close sidebar",
		side: "right",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.PanelLeft, {
				size: "1em",
				strokeWidth: 2
			}),
			onClick: (e) => {
				e.stopPropagation();
				setIsSidebarOpen(!isSidebarOpen);
			},
			size: "small",
			variant: "tertiary",
			"aria-label": isSidebarOpen ? "Collapse sidebar" : "Expand sidebar",
			className: "inv-agent-sidebar-header__toggle-button"
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-sidebar-header", { "inv-agent-sidebar-header--collapsed": isCollapsedLayout }, className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-sidebar-header__top-row",
			children: [
				logo ?? defaultLogo,
				agentNameProp ?? defaultAgentName,
				collapseButton === false ? null : collapseButton ?? defaultCollapseButton
			]
		})
	});
};
const SidebarContent = ({ children, className }) => {
	const isSidebarOpen = useAgentInterfaceStore((state) => state.isSidebarOpen);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-sidebar-content", className, { "inv-agent-sidebar-content--collapsed": useOptionalSidebarVisualState()?.isCollapsedLayout ?? !isSidebarOpen }),
		children
	});
};
const SidebarSeparator = () => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-agent-sidebar-separator" });
};
//#endregion
//#region src/components/AgentInterface/SidebarTooltip.tsx
const SidebarTooltip = ({ children, content, disabled = false }) => {
	if (disabled) return children;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Root, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Trigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Content, {
		className: "inv-agent-sidebar-tooltip",
		side: "right",
		align: "center",
		sideOffset: 8,
		children: content
	}) })] });
};
//#endregion
//#region src/components/AgentInterface/SidebarItem.tsx
/**
* Styled clickable item for use inside <AgentInterface.Sidebar>. Visually
* matches the ThreadList row so custom nav items blend with the default
* thread list.
*/
const SidebarItem = ({ icon, trailing, selected, path, className, children, onClick, ...rest }) => {
	const nav = useOptionalNav();
	const layoutCtx = useLayoutContext();
	const setIsSidebarOpen = useAgentInterfaceStore((s) => s.setIsSidebarOpen);
	const isCollapsedLayout = useOptionalSidebarVisualState()?.isCollapsedLayout ?? false;
	const isActive = selected !== void 0 ? selected : path !== void 0 && nav?.path === path;
	const handleClick = (e) => {
		onClick?.(e);
		if (e.defaultPrevented) return;
		if (path !== void 0 && nav) {
			nav.navigate(path);
			if (layoutCtx?.layout === "mobile") setIsSidebarOpen(false);
		}
	};
	const button = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		className: (0, clsx.default)("inv-agent-sidebar-item", { "inv-agent-sidebar-item--selected": isActive }, className),
		onClick: handleClick,
		...rest,
		children: [
			icon !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-sidebar-item__icon",
				children: icon
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-sidebar-item__label",
				children
			}),
			trailing !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-sidebar-item__trailing",
				children: trailing
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarTooltip, {
		content: children,
		disabled: !isCollapsedLayout,
		children: button
	});
};
//#endregion
//#region src/components/AgentInterface/ArtifactNav.tsx
/**
* Sidebar navigation for the global artifact browser.
*
* Renders one {@link SidebarItem} per configured `artifactCategories` entry
* (or a single "Artifacts" item when no categories are configured). Clicking
* navigates to the reserved `artifacts/{category}` path, which AgentInterface
* renders as the searchable artifact browser in the thread region.
*
* Each item's icon is the category's own `icon` (`artifactCategories: [{ icon }]`),
* else the `icon` prop, else a generic default — the library hardcodes no
* per-category icons.
*
* Renders nothing when `storage.artifact` is not configured.
*
* Included automatically in the default sidebar; compose it manually inside
* a custom `<AgentInterface.Sidebar>`.
*
* @category Components
*/
const ArtifactNav = ({ className, icon }) => {
	const storage = (0, _invdev_react_headless.useArtifactStorage)();
	const categories = (0, _invdev_react_headless.useArtifactCategories)();
	const nav = useOptionalNav();
	const { defaultCategory } = useAgentInterfaceLabels();
	if (!storage) return null;
	const items = categories.length > 0 ? categories.map((c) => ({
		label: c.name,
		path: artifactListPath(c.name),
		categoryIcon: c.icon
	})) : [{
		label: defaultCategory,
		path: artifactListPath(),
		categoryIcon: void 0
	}];
	const getItemIcon = (categoryIcon) => categoryIcon ?? icon ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Boxes, { size: "1em" });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className,
		children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarItem, {
			path: item.path,
			icon: getItemIcon(item.categoryIcon),
			selected: nav?.path === item.path || nav?.path?.startsWith(`${item.path}/`) === true,
			children: item.label
		}, item.path))
	});
};
//#endregion
//#region src/components/AgentInterface/ArtifactViewPage.tsx
/**
* Full-page artifact view (reserved path `artifacts/{category}/{id}`),
* rendered independent of any thread.
*
* Fetches the artifact via `ArtifactStorage.get`, resolves the renderer by
* `artifact.type`, runs the renderer's `parser` with
* `{ args: undefined, response: artifact.content }` (stored content must have
* the same shape as the tool-call response), and renders `actual` filling the
* page. No DetailedView involvement.
*
* `controls.close` navigates back to the category list; `open`/`toggle` are
* no-ops (the page IS the open state). `isStreaming` is always `false`.
*
* Internal — rendered by AgentInterface for the reserved `artifacts/` prefix.
*
* @internal
*/
const ArtifactViewPage = ({ artifactId, categoryName }) => {
	const storage = (0, _invdev_react_headless.useArtifactStorage)();
	const registry = (0, _invdev_react_headless.useArtifactRendererRegistry)();
	const { navigate } = useNav();
	const selectThread = (0, _invdev_react_headless.useThreadList)((s) => s.selectThread);
	const [artifact, setArtifact] = (0, react.useState)(null);
	const [error, setError] = (0, react.useState)(null);
	const requestIdRef = (0, react.useRef)(0);
	(0, react.useEffect)(() => {
		if (!storage) return;
		const requestId = ++requestIdRef.current;
		setArtifact(null);
		setError(null);
		storage.get(artifactId).then((a) => {
			if (requestId !== requestIdRef.current) return;
			setArtifact(a);
		}).catch((e) => {
			if (requestId !== requestIdRef.current) return;
			setError(e instanceof Error ? e : new Error(String(e)));
		});
	}, [storage, artifactId]);
	const backToList = () => navigate(artifactListPath(categoryName));
	const goToThread = () => {
		if (!artifact) return;
		selectThread(artifact.threadId);
		navigate(void 0);
	};
	const renderer = (0, react.useMemo)(() => {
		if (!artifact || !registry) return null;
		return (0, _invdev_react_headless.lookupArtifactRendererByType)(registry, artifact.type);
	}, [artifact, registry]);
	const parsed = (0, react.useMemo)(() => {
		if (!artifact || !renderer) return null;
		return renderer.parser({
			args: void 0,
			response: artifact.content
		}, { isStreaming: false });
	}, [artifact, renderer]);
	const controls = {
		isActive: true,
		isStreaming: false,
		open: () => {},
		close: backToList,
		toggle: backToList
	};
	let body;
	if (!storage) body = null;
	else if (error) body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-agent-artifact-view__error",
		children: ["Failed to load artifact: ", error.message]
	});
	else if (!artifact) body = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-artifact-view__loading",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotMatrixLoader, {})
	});
	else if (!renderer) body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-agent-artifact-view__error",
		children: [
			"No renderer registered for artifact type \"",
			artifact.type,
			"\"."
		]
	});
	else if (!parsed) body = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-artifact-view__error",
		children: "The renderer could not parse this artifact's content."
	});
	else body = renderer.actual(parsed.props, controls);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-agent-artifact-view",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-artifact-view__header",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					variant: "tertiary",
					size: "small",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ArrowLeft, { size: "1em" }),
					"aria-label": "Back",
					onClick: backToList
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-agent-artifact-view__title",
					children: artifact?.title ?? ""
				}),
				artifact && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
					variant: "tertiary",
					size: "small",
					iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.MessageSquare, { size: 14 }),
					onClick: goToThread,
					children: "Go to thread"
				})
			]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-artifact-view__content",
			children: body
		})]
	});
};
//#endregion
//#region src/components/AgentInterface/_shared/utils/index.ts
const isChatEmpty$1 = ({ isLoadingMessages, messages }) => {
	return !isLoadingMessages && messages.length === 0;
};
//#endregion
//#region src/hooks/useAutoFocus.ts
/** Whether an element is currently rendered on screen enough to receive focus. */
const canFocus = (el) => typeof el.checkVisibility === "function" ? el.checkVisibility() : el.getClientRects().length > 0;
/**
* Focuses a ref'd element on mount, whenever `focusKey` changes, and whenever
* `enabled` flips back to `true` — but only while the element is actually on
* screen.
*/
const useAutoFocus = (ref, { enabled = true, focusKey } = {}) => {
	(0, react$1.useEffect)(() => {
		if (!enabled) return;
		const el = ref.current;
		if (!el || !canFocus(el)) return;
		el.focus();
	}, [
		ref,
		enabled,
		focusKey
	]);
};
//#endregion
//#region src/hooks/useComposerState.ts
const useComposerState = () => {
	const [textContent, setTextContent] = (0, react$1.useState)("");
	return {
		textContent,
		setTextContent
	};
};
//#endregion
//#region src/components/AgentInterface/components/Composer.tsx
const Composer$1 = ({ className, placeholder = "Type your query here" }) => {
	const { textContent, setTextContent } = useComposerState();
	const processMessage = (0, _invdev_react_headless.useThread)((s) => s.processMessage);
	const cancelMessage = (0, _invdev_react_headless.useThread)((s) => s.cancelMessage);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	const inputRef = (0, react.useRef)(null);
	const [hasInputOverflowTop, setHasInputOverflowTop] = (0, react.useState)(false);
	const [hasInputOverflowBottom, setHasInputOverflowBottom] = (0, react.useState)(false);
	const selectedThreadId = (0, _invdev_react_headless.useThreadList)((s) => s.selectedThreadId);
	const { layout } = useLayoutContext();
	useAutoFocus(inputRef, {
		enabled: layout !== "mobile" && !isLoadingMessages,
		focusKey: selectedThreadId
	});
	const updateInputOverflow = (0, react.useCallback)(() => {
		const input = inputRef.current;
		if (!input) return;
		const maxScrollTop = input.scrollHeight - input.clientHeight;
		setHasInputOverflowTop(maxScrollTop > 0 && input.scrollTop > 0);
		setHasInputOverflowBottom(maxScrollTop > 0 && input.scrollTop < maxScrollTop - 1);
	}, []);
	const handleSubmit = () => {
		if (!textContent.trim() || isRunning || isLoadingMessages) return;
		processMessage({
			role: "user",
			content: textContent
		});
		setTextContent("");
	};
	(0, react.useLayoutEffect)(() => {
		const input = inputRef.current;
		if (!input) return;
		input.style.height = "0px";
		input.style.height = `${Math.max(input.scrollHeight, 24)}px`;
		updateInputOverflow();
	}, [textContent, updateInputOverflow]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-thread-composer", className),
		"data-drafting": textContent.length > 0 || void 0,
		onClick: (e) => {
			if (!e.target.closest("button, a, [role='button']")) inputRef.current?.focus();
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-thread-composer__input-wrapper",
			"data-overflow-top": hasInputOverflowTop || void 0,
			"data-overflow-bottom": hasInputOverflowBottom || void 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
				ref: inputRef,
				value: textContent,
				autoFocus: true,
				onChange: (e) => setTextContent(e.target.value),
				onScroll: updateInputOverflow,
				className: "inv-agent-thread-composer__input",
				placeholder,
				rows: 1,
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						handleSubmit();
					}
				}
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-thread-composer__action-bar",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					onClick: isRunning ? cancelMessage : handleSubmit,
					icon: isRunning ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Square, {
						size: "1em",
						fill: "currentColor"
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ArrowUp, { size: "1em" }),
					size: "extra-small",
					variant: "primary",
					"aria-label": isRunning ? "Cancel message" : "Send message",
					className: "inv-agent-thread-composer__submit-button"
				})
			})]
		})
	});
};
//#endregion
//#region src/components/Carousel/Carousel.tsx
const CarouselContext = (0, react.createContext)(null);
const useCarousel = () => {
	const context = (0, react.useContext)(CarouselContext);
	if (!context) throw new Error("useCarousel must be used within a Carousel");
	return context;
};
const Carousel = (0, react.forwardRef)(({ itemsToScroll = 1, noSnap, showButtons = true, variant = "card", className, children, onScrollLeftEnabled, onScrollRightEnabled, ...props }, ref) => {
	const scrollDivRef = (0, react.useRef)(null);
	const [isPrevVisible, setIsPrevVisible] = (0, react.useState)(false);
	const [isNextVisible, setIsNextVisible] = (0, react.useState)(false);
	const scroll = (0, react.useCallback)((direction) => {
		if (!scrollDivRef.current) return;
		const container = scrollDivRef.current;
		const items = noSnap ? Array.from(container.children[0]?.children ?? []) : Array.from(container.children);
		if (items.length === 0) return;
		const containerRect = container.getBoundingClientRect();
		const visibleIndex = items.findIndex((child) => {
			return child.getBoundingClientRect().left >= containerRect.left;
		});
		let currentIndex = visibleIndex;
		if (visibleIndex === -1) currentIndex = items.length - 1;
		const targetElement = items[direction === "left" ? Math.max(0, currentIndex - itemsToScroll) : Math.min(items.length - 1, currentIndex + itemsToScroll)];
		if (targetElement) container.scrollTo({
			left: targetElement.offsetLeft,
			behavior: "smooth"
		});
	}, [noSnap, itemsToScroll]);
	(0, react.useEffect)(() => {
		if (!scrollDivRef.current) return;
		const container = scrollDivRef.current;
		const handleScroll = () => {
			const canScrollLeft = container.scrollLeft > 0;
			const canScrollRight = Math.ceil(container.scrollLeft) + container.offsetWidth < container.scrollWidth;
			setIsPrevVisible(canScrollLeft);
			setIsNextVisible(canScrollRight);
		};
		handleScroll();
		const resizeObserver = new ResizeObserver(handleScroll);
		resizeObserver.observe(container);
		const mutationObserver = new MutationObserver(handleScroll);
		mutationObserver.observe(container, {
			childList: true,
			subtree: true
		});
		container.addEventListener("scroll", handleScroll);
		return () => {
			container.removeEventListener("scroll", handleScroll);
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
	}, []);
	(0, react.useEffect)(() => {
		onScrollLeftEnabled?.(isPrevVisible);
	}, [isPrevVisible, onScrollLeftEnabled]);
	(0, react.useEffect)(() => {
		onScrollRightEnabled?.(isNextVisible);
	}, [isNextVisible, onScrollRightEnabled]);
	(0, react.useImperativeHandle)(ref, () => {
		return {
			scroll,
			scrollDivRef
		};
	}, [scroll]);
	const contextValue = (0, react.useMemo)(() => ({
		scrollDivRef,
		scroll,
		itemsToScroll,
		noSnap,
		showButtons,
		variant,
		isPrevVisible,
		isNextVisible
	}), [
		scrollDivRef,
		scroll,
		itemsToScroll,
		noSnap,
		showButtons,
		variant,
		isPrevVisible,
		isNextVisible
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-carousel", `inv-carousel--${variant}`, className),
			...props,
			children
		})
	});
});
const CarouselContent = (0, react.forwardRef)(({ className, children, ...props }, _ref) => {
	const { scrollDivRef, noSnap, isPrevVisible, isNextVisible } = useCarousel();
	const content = noSnap ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-carousel-content-wrapper",
		children
	}) : children;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: scrollDivRef,
		className: (0, clsx.default)("inv-carousel-content", {
			"inv-carousel-content--mask-left": isPrevVisible,
			"inv-carousel-content--mask-right": isNextVisible
		}, className),
		...props,
		children: content
	});
});
const CarouselItem = (0, react.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref,
	className: (0, clsx.default)("inv-carousel-item", className),
	...props,
	children
}));
const CarouselPrevious = (0, react.forwardRef)(({ className, style, ...props }, ref) => {
	const { scroll, showButtons, isPrevVisible } = useCarousel();
	if (!isPrevVisible || !showButtons) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-carousel-button inv-carousel-button-left", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			ref,
			shape: "square",
			variant: "secondary",
			size: "small",
			onClick: () => scroll("left"),
			style,
			...props
		})
	});
});
const CarouselNext = (0, react.forwardRef)(({ className, style, ...props }, ref) => {
	const { scroll, showButtons, isNextVisible } = useCarousel();
	if (!isNextVisible || !showButtons) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-carousel-button inv-carousel-button-right", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			ref,
			shape: "square",
			variant: "secondary",
			size: "small",
			onClick: () => scroll("right"),
			style,
			...props
		})
	});
});
//#endregion
//#region src/components/AgentInterface/ConversationStarter.tsx
/**
* Renders the appropriate icon based on the icon prop value
* - undefined: Show default lightbulb icon
* - ReactNode: Show the provided icon (use <></> or React.Fragment for no icon)
*/
const renderIcon = (icon) => {
	if (icon === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Lightbulb, { size: 16 });
	return icon;
};
const hasRenderableIcon = (icon) => {
	if (icon === null || icon === void 0 || icon === false) return false;
	if ((0, react.isValidElement)(icon) && icon.type === react.Fragment) return Boolean(icon.props.children);
	return true;
};
const ConversationStarterItem = ({ displayText, onClick, variant, icon }) => {
	const renderedIcon = renderIcon(icon);
	const shouldRenderIcon = hasRenderableIcon(renderedIcon);
	if (variant === "short") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "inv-agent-conversation-starter-item-short",
		onClick,
		children: [shouldRenderIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-conversation-starter-item-short__icon",
			children: renderedIcon
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-conversation-starter-item-short__text",
			children: displayText
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "inv-agent-conversation-starter-item-long",
		onClick,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-conversation-starter-item-long__content",
			children: [shouldRenderIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-conversation-starter-item-long__icon",
				children: renderedIcon
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-conversation-starter-item-long__text",
				children: displayText
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-conversation-starter-item-long__arrow",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ArrowUp, { size: 16 })
		})]
	});
};
const ConversationStarter = ({ starters, className, variant = "short", onSelect }) => {
	const processMessage = (0, _invdev_react_headless.useThread)((s) => s.processMessage);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	const handleClick = (starter) => {
		if (isRunning) return;
		if (onSelect) {
			onSelect(starter);
			return;
		}
		processMessage({
			role: "user",
			content: starter.prompt
		});
	};
	if (!isChatEmpty$1({
		isLoadingMessages,
		messages
	})) return null;
	if (starters.length === 0) return null;
	if (variant === "short") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Carousel, {
		showButtons: false,
		className: (0, clsx.default)("inv-agent-conversation-starter", "inv-agent-conversation-starter--short", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselContent, {
			className: "inv-agent-conversation-starter__carousel-content",
			children: starters.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarterItem, {
				displayText: item.displayText,
				prompt: item.prompt,
				icon: item.icon,
				onClick: () => handleClick(item),
				variant
			}, `${item.displayText}-${index}`))
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-conversation-starter", `inv-agent-conversation-starter--${variant}`, className),
		children: starters.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.Fragment, { children: [index > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-conversation-starter__separator",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarterItem, {
			displayText: item.displayText,
			prompt: item.prompt,
			icon: item.icon,
			onClick: () => handleClick(item),
			variant
		})] }, `${item.displayText}-${index}`))
	});
};
//#endregion
//#region src/components/AgentInterface/Composer.tsx
const Composer = ({ className, placeholder, starters: ownStarters, starterVariant: ownVariant, children }) => {
	const fromCtx = useStartersFromContext();
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	if (children != null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-composer-slot", className),
		children
	});
	const effectiveStarters = ownStarters ?? fromCtx.starters;
	const effectiveVariant = ownVariant ?? fromCtx.starterVariant ?? "short";
	const showStarters = isChatEmpty$1({
		isLoadingMessages,
		messages
	}) && effectiveStarters !== void 0 && effectiveStarters.length > 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-composer-slot", className),
		children: [showStarters && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarter, {
			starters: effectiveStarters,
			variant: effectiveVariant
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Composer$1, { placeholder })]
	});
};
//#endregion
//#region src/hooks/useElementSize.ts
const useElementSize = ({ ref }) => {
	const [size, setSize] = (0, react$1.useState)({
		width: 0,
		height: 0
	});
	(0, react$1.useEffect)(() => {
		if (!ref.current) return;
		const element = ref.current;
		const handleResize = () => {
			setSize({
				width: element.clientWidth,
				height: element.clientHeight
			});
		};
		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(element);
		handleResize();
		return () => {
			resizeObserver.disconnect();
		};
	}, [ref]);
	return size;
};
//#endregion
//#region src/components/AgentInterface/Container.tsx
const Container = ({ children, logoUrl, agentName, className }) => {
	const ref = (0, react.useRef)(null);
	const { width } = useElementSize({ ref }) || {};
	const isMobile = width > 0 && width < 768;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceStoreProvider, {
		logoUrl,
		agentName,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShellStoreProvider, {
			logoUrl,
			agentName,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LayoutContextProvider, {
				layout: isMobile ? "mobile" : width > 768 ? "fullscreen" : "tray",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Provider, {
					delayDuration: 250,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, clsx.default)("inv-agent-container", { "inv-agent-container--mobile": isMobile }, className),
						ref,
						children
					})
				})
			})
		})
	});
};
//#endregion
//#region src/components/AgentInterface/MobileHeader.tsx
const MobileHeader = ({ className, logo, agentName: agentNameProp, menuButton, newChatButton, actions, children }) => {
	const switchToNewThread = (0, _invdev_react_headless.useThreadList)((s) => s.switchToNewThread);
	const { agentName: ctxAgentName, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
		agentName: state.agentName,
		setIsSidebarOpen: state.setIsSidebarOpen
	}));
	if (children != null) {
		if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production" && (logo !== void 0 || agentNameProp !== void 0 || menuButton !== void 0 || newChatButton !== void 0 || actions !== void 0)) console.warn("[AgentInterface] <AgentInterface.MobileHeader> received both children and override props; children win.");
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-agent-mobile-header", className),
			children
		});
	}
	const defaultMenuButton = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		size: "medium",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Menu, { size: "1em" }),
		onClick: () => setIsSidebarOpen(true),
		variant: "secondary",
		"aria-label": "Open sidebar"
	});
	const defaultAgentName = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-agent-mobile-header-agent-name",
		children: ctxAgentName
	});
	const defaultNewChatButton = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		size: "medium",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.SquarePen, { size: "1em" }),
		onClick: switchToNewThread,
		variant: "secondary",
		"aria-label": "New chat"
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-mobile-header", className),
		children: [
			menuButton === false ? null : menuButton ?? defaultMenuButton,
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-mobile-header-logo-container",
				children: [logo, agentNameProp ?? defaultAgentName]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-mobile-header-actions",
				children: [newChatButton === false ? null : newChatButton ?? defaultNewChatButton, actions]
			})
		]
	});
};
//#endregion
//#region src/components/AgentInterface/NewChatButton.tsx
const NewChatButton = ({ className }) => {
	const switchToNewThread = (0, _invdev_react_headless.useThreadList)((s) => s.switchToNewThread);
	const { isSidebarOpen } = useAgentInterfaceStore((state) => ({ isSidebarOpen: state.isSidebarOpen }));
	const sidebarVisualState = useOptionalSidebarVisualState();
	const showExpandedButton = sidebarVisualState ? !sidebarVisualState.isCollapsedLayout : isSidebarOpen;
	const nav = useOptionalNav();
	const { layout } = useLayoutContext();
	const isMobile = layout === "mobile";
	const handleNewChat = (e) => {
		e.stopPropagation();
		switchToNewThread();
		if (nav && nav.path !== void 0) nav.navigate(void 0);
	};
	if (isMobile) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
		variant: "primary",
		size: "large",
		iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.SquarePen, { size: "1em" }),
		className: (0, clsx.default)("inv-agent-new-chat-floating-button", className),
		onClick: handleNewChat,
		"aria-label": "New chat",
		children: "New Chat"
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarTooltip, {
		content: "New Chat",
		disabled: showExpandedButton,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: (0, clsx.default)("inv-agent-new-chat-button", { "inv-agent-new-chat-button--collapsed": !showExpandedButton }, className),
			onClick: handleNewChat,
			"aria-label": "New chat",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-new-chat-button__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.SquarePen, { size: "1em" })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-new-chat-button__label",
				children: "New Chat"
			})]
		})
	});
};
//#endregion
//#region src/components/AgentInterface/Route.tsx
/**
* Slot marker for a routable view. Never rendered directly — the parent
* <AgentInterface> extracts all Routes from its children, finds the one
* whose `path` matches the current nav state, and renders that Route's
* children in place of the entire thread region (MobileHeader, ThreadHeader,
* ScrollArea/Messages, Composer all hidden).
*
* Use multiple <AgentInterface.Route> siblings to define separate views.
* When no Route matches, the thread region renders normally.
*/
const Route = (_props) => null;
Route.displayName = "AgentInterface.Route";
//#endregion
//#region src/components/AgentInterface/SidebarSlot.tsx
/**
* Slot marker for the entire sidebar region. Never rendered directly — the
* parent <AgentInterface> extracts its children and arranges them inside the
* SidebarContainer in place of the default sidebar arrangement.
*
* Mode A: omitted → default sidebar renders (SidebarHeader + SidebarContent
*         with SidebarSeparator + ThreadList).
* Mode C: provided with children → children replace the entire sidebar's
*         inner content (user composes SidebarHeader, SidebarSeparator,
*         ThreadList, etc. as needed).
*/
const SidebarSlot = (_props) => null;
SidebarSlot.displayName = "AgentInterface.Sidebar";
//#endregion
//#region src/hooks/useScrollToBottom.ts
const useScrollToBottom = ({ ref, lastMessage, scrollVariant, userMessageSelector = ".inv-shell-thread-message-user", isRunning, isLoadingMessages, scrollOnLoad = true }) => {
	const previousLastMessage = (0, react$1.useRef)(null);
	const lastUserMessage = (0, react$1.useRef)(null);
	const hasUserScrolledWhenIsRunning = (0, react$1.useRef)(false);
	const wasScrolledToBottomAfterLoading = (0, react$1.useRef)(false);
	(0, react$1.useEffect)(() => {
		const element = ref.current;
		if (!isRunning || !element) {
			hasUserScrolledWhenIsRunning.current = false;
			return;
		}
		let isUserScrolling = false;
		const userScrollingDisabler = () => {
			isUserScrolling = false;
		};
		const userScrollingEnabler = () => {
			isUserScrolling = true;
		};
		const scrollListener = () => {
			if (!isUserScrolling) return;
			hasUserScrolledWhenIsRunning.current = true;
			removeListeners();
		};
		const addListeners = () => {
			element.addEventListener("scroll", scrollListener);
			element.addEventListener("click", userScrollingDisabler);
			element.addEventListener("touchmove", userScrollingEnabler);
			element.addEventListener("wheel", userScrollingEnabler);
			element.addEventListener("keydown", userScrollingEnabler);
			element.addEventListener("mousedown", userScrollingEnabler);
		};
		const removeListeners = () => {
			element.removeEventListener("scroll", scrollListener);
			element.removeEventListener("click", userScrollingDisabler);
			element.removeEventListener("touchmove", userScrollingEnabler);
			element.removeEventListener("wheel", userScrollingEnabler);
			element.removeEventListener("keydown", userScrollingEnabler);
			element.removeEventListener("mousedown", userScrollingEnabler);
		};
		addListeners();
		return () => {
			removeListeners();
		};
	}, [isRunning]);
	const scrollToBottom = (0, react$1.useCallback)(() => {
		const element = ref.current;
		if (!element) return;
		if (scrollVariant === "always") {
			if (previousLastMessage.current !== lastMessage) if (element.scrollHeight - element.scrollTop - element.clientHeight > 90) element.scrollTo({
				top: element.scrollHeight,
				behavior: "smooth"
			});
			else element.scrollTop = element.scrollHeight;
		} else if (scrollVariant === "once") {
			if (previousLastMessage.current?.id !== lastMessage.id) element.scrollTo({
				top: element.scrollHeight,
				behavior: "smooth"
			});
		} else {
			const lastUserMessageDiv = Array.from(element.querySelectorAll(userMessageSelector)).pop();
			const lastUserMessageNextSibling = lastUserMessageDiv?.nextElementSibling;
			if (lastUserMessageDiv && (!lastUserMessageNextSibling?.nextElementSibling || !wasScrolledToBottomAfterLoading.current) && previousLastMessage.current?.id !== lastMessage.id) {
				const scrollPaddingTop = Number.parseFloat(window.getComputedStyle(element).scrollPaddingTop || "0") || 0;
				const scrollPosition = lastUserMessageDiv.getBoundingClientRect().top - element.getBoundingClientRect().top + element.scrollTop - scrollPaddingTop;
				element.scrollTo({
					top: Math.max(scrollPosition, 0),
					behavior: "smooth"
				});
				lastUserMessage.current = lastUserMessageDiv;
			}
		}
		previousLastMessage.current = lastMessage;
	}, [
		ref,
		lastMessage,
		scrollVariant,
		userMessageSelector
	]);
	(0, react$1.useEffect)(() => {
		if (isRunning && !hasUserScrolledWhenIsRunning.current || scrollOnLoad && !wasScrolledToBottomAfterLoading.current && !isLoadingMessages) {
			scrollToBottom();
			wasScrolledToBottomAfterLoading.current = true;
		}
		if (isLoadingMessages) wasScrolledToBottomAfterLoading.current = false;
	}, [
		scrollToBottom,
		isRunning,
		isLoadingMessages,
		scrollOnLoad
	]);
};
//#endregion
//#region src/components/ToolCall/BehindTheScenes.tsx
const BehindTheScenes = ({ isStreaming, toolCallsComplete, children }) => {
	const [userOverride, setUserOverride] = (0, react.useState)(null);
	const hasCompletedOnce = (0, react.useRef)(false);
	const prevStreaming = (0, react.useRef)(isStreaming);
	(0, react.useEffect)(() => {
		if (isStreaming && !prevStreaming.current) {
			setUserOverride(null);
			hasCompletedOnce.current = false;
		}
		prevStreaming.current = isStreaming;
	}, [isStreaming]);
	if (toolCallsComplete && !hasCompletedOnce.current) hasCompletedOnce.current = true;
	const toolsActive = !!isStreaming && !hasCompletedOnce.current;
	const isExpanded = userOverride !== null ? userOverride : toolsActive;
	const toggle = () => {
		setUserOverride((prev) => prev !== null ? !prev : !isExpanded);
	};
	const panelId = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-behind-the-scenes",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-behind-the-scenes__toggle",
			onClick: toggle,
			type: "button",
			"aria-expanded": isExpanded,
			"aria-controls": panelId,
			children: [isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {
				size: 14,
				className: "inv-behind-the-scenes__toggle-icon"
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: "inv-behind-the-scenes__toggle-icon"
			}), toolsActive ? "Working..." : "Behind the scenes"]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-behind-the-scenes__items",
			id: panelId,
			children
		})]
	});
};
//#endregion
//#region src/components/ToolCall/ToolCall.tsx
const ToolCallComponent = ({ toolCall, isStreaming, toolsDone, isLast = false, className }) => {
	const isRunning = !!isStreaming && !toolsDone;
	const actionLabel = isRunning ? `Calling the ${toolCall.function.name} tool` : `Called the ${toolCall.function.name} tool`;
	let parsedArgs = null;
	try {
		parsedArgs = JSON.parse(toolCall.function.arguments);
	} catch {}
	const hasRequest = parsedArgs && parsedArgs._request != null;
	const hasResponse = parsedArgs && parsedArgs._response != null;
	const requestStr = hasRequest ? JSON.stringify(parsedArgs._request, null, 2) : null;
	const responseStr = hasResponse ? JSON.stringify(parsedArgs._response, null, 2) : null;
	const plainArgs = !hasRequest && !hasResponse && toolCall.function.arguments ? (() => {
		try {
			return JSON.stringify(JSON.parse(toolCall.function.arguments), null, 2);
		} catch {
			return toolCall.function.arguments;
		}
	})() : null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-tool-call", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-tool-call__title-row",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-call__icon-wrapper", { "inv-tool-call__icon--blinking": isRunning && isLast }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.SquareCode, {
					size: 14,
					className: "inv-tool-call__icon"
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-call__name", { "inv-tool-call__name--shimmer": isRunning && isLast }),
				children: actionLabel
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-tool-call__connector", { "inv-tool-call__connector--last": isLast }),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-tool-call__args-block",
				children: [
					requestStr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "request",
						code: requestStr,
						isRunning: isRunning && !hasResponse,
						toolName: toolCall.function.name
					}),
					responseStr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "response",
						code: responseStr,
						isRunning: isRunning && isLast,
						toolName: toolCall.function.name
					}),
					plainArgs && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCodeBlock, {
						type: "request",
						code: plainArgs,
						isRunning,
						toolName: toolCall.function.name
					})
				]
			})
		})]
	});
};
const ToolCodeBlock = ({ type, code, isRunning = false, toolName }) => {
	const [isExpanded, setIsExpanded] = (0, react.useState)(false);
	const label = type === "request" ? "Tool Request" : "Tool Response";
	const runningLabel = type === "request" ? `Sending request to ${toolName}...` : `Awaiting response from ${toolName}...`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-tool-code-block",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-tool-code-block__header",
			onClick: () => setIsExpanded((v) => !v),
			type: "button",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, clsx.default)("inv-tool-code-block__label", { "inv-tool-code-block__label--loading": isRunning }),
				children: isRunning ? runningLabel : label
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: (0, clsx.default)("inv-tool-code-block__chevron", { "inv-tool-code-block__chevron--expanded": isExpanded })
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-tool-code-block__content",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: "inv-tool-code-block__code",
				children: code
			})
		})]
	});
};
//#endregion
//#region src/components/ToolCall/ToolCallPrimitives.tsx
const ToolCallContext = (0, react.createContext)(null);
/** Reads the nearest {@link ToolCall.Root} context. @category Hooks */
function useToolCall() {
	const ctx = (0, react.useContext)(ToolCallContext);
	if (!ctx) throw new Error("ToolCall.* parts must be used inside <ToolCall.Root>");
	return ctx;
}
/**
* Renders the consumer's `render` prop if given, else the default element with
* `defaultProps`, exposing the typed `state` to the render prop. Not a hook
* (contains no hooks) despite slotting into component bodies.
*/
function renderPart(render, tag, state, defaultProps) {
	if (render) return render(state, defaultProps);
	return (0, react.createElement)(tag, defaultProps);
}
const isRunning$1 = (status) => status === "streaming" || status === "executing";
const LABELS = {
	streaming: (n) => `Calling the ${n} tool`,
	executing: (n) => `Running the ${n} tool`,
	complete: (n) => `Called the ${n} tool`,
	error: (n) => `${n} failed`
};
const NAMELESS_LABELS = {
	streaming: "Calling the tool",
	executing: "Running the tool",
	complete: "Called the tool",
	error: "Tool failed"
};
/** Default human label for a status + tool name. @category Functions */
function defaultLabel(status, name) {
	if (!name || !name.trim()) return NAMELESS_LABELS[status];
	return LABELS[status](name);
}
/** Pretty-prints a JSON result string, falling back to the raw string. @category Functions */
function prettyResult(value) {
	if (value == null) return "";
	try {
		return JSON.stringify(JSON.parse(value), null, 2);
	} catch {
		return value;
	}
}
const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
/** Pretty-prints any value (objects stringified, strings shown verbatim). */
function prettyValue(value) {
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return String(value);
	}
}
/**
* Resolves what to show in the request panel. Honors the deprecated `_request`
* arg key (shows just that), and — when the parsed input is empty (unparseable
* / earliest streaming frame) — falls back to the raw argument string so the
* user sees the partial text instead of an empty `{}`.
*/
function resolveRequest(activity) {
	const input = activity.input;
	if (isObject(input) && input["_request"] != null) return prettyValue(input["_request"]);
	if (isObject(input) && Object.keys(input).length === 0) {
		const raw = activity.toolCall.function.arguments;
		if (raw && raw.trim()) return raw;
	}
	return prettyValue(input);
}
/** The deprecated `_response` arg key, if non-null (else `undefined`). */
function resolveLegacyResponse(activity) {
	const input = activity.input;
	const value = isObject(input) ? input["_response"] : void 0;
	return value != null ? value : void 0;
}
const TOOL_ICONS = [
	{
		match: /image[_-]?search/i,
		icon: lucide_react.ImageIcon
	},
	{
		match: /web[_-]?search/i,
		icon: lucide_react.Globe
	},
	{
		match: /artifact|generate[_-]?report/i,
		icon: lucide_react.Blocks
	}
];
function toolIcon(toolName, status) {
	if (status === "error") return lucide_react.AlertCircle;
	return TOOL_ICONS.find((entry) => entry.match.test(toolName))?.icon ?? lucide_react.SquareCode;
}
function Root({ activity, isLast = false, running = true, defaultOpen = false, className, children }) {
	const [isOpen, setOpen] = (0, react.useState)(defaultOpen);
	const panelId = (0, react.useId)();
	const triggerId = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCallContext.Provider, {
		value: {
			activity,
			isLast,
			running,
			isOpen,
			setOpen,
			panelId,
			triggerId
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-tool-call", `inv-tool-call--${activity.status}`, className),
			"data-status": activity.status,
			children
		})
	});
}
const StatusIcon = ({ render, className }) => {
	const { activity, isLast, running } = useToolCall();
	const spin = isRunning$1(activity.status) && isLast && running;
	const Icon = toolIcon(activity.toolName, activity.status);
	return renderPart(render, "span", { status: activity.status }, {
		className: (0, clsx.default)("inv-tool-call__icon-wrapper", { "inv-tool-call__icon--blinking": spin }, className),
		"data-status": activity.status,
		"data-spin": spin,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
			size: 14,
			className: "inv-tool-call__icon"
		})
	});
};
const ToolName = ({ render, className }) => {
	const { activity } = useToolCall();
	return renderPart(render, "span", { toolName: activity.toolName }, {
		className,
		children: activity.toolName
	});
};
const StatusText = ({ render, className }) => {
	const { activity, isLast, running } = useToolCall();
	const label = activity.statusMessage ?? defaultLabel(activity.status, activity.toolName);
	const shimmer = isRunning$1(activity.status) && isLast && running;
	return renderPart(render, "span", {
		status: activity.status,
		label
	}, {
		role: "status",
		"aria-live": "polite",
		className: (0, clsx.default)("inv-tool-call__name", { "inv-tool-call__name--shimmer": shimmer }, className),
		children: label
	});
};
const Parameters = ({ render, className }) => {
	const { activity } = useToolCall();
	const inputString = resolveRequest(activity);
	return renderPart(render, "pre", {
		input: activity.input,
		inputString
	}, {
		className,
		children: inputString
	});
};
const Result = ({ render, className }) => {
	const { activity } = useToolCall();
	const legacyResponse = resolveLegacyResponse(activity);
	if (activity.result == null && !activity.isError && legacyResponse === void 0) return null;
	const text = activity.isError ? activity.errorText ?? activity.result ?? "" : legacyResponse !== void 0 ? prettyValue(legacyResponse) : prettyResult(activity.result);
	return renderPart(render, "div", {
		result: activity.result,
		isError: activity.isError,
		errorText: activity.errorText
	}, {
		className: (0, clsx.default)({ "inv-tool-call__result--error": activity.isError }, className),
		children: text
	});
};
const Trigger = ({ render, className, children }) => {
	const { isOpen, setOpen, panelId, triggerId } = useToolCall();
	return renderPart(render, "button", { state: isOpen ? "open" : "closed" }, {
		type: "button",
		id: triggerId,
		className,
		"aria-expanded": isOpen,
		"aria-controls": panelId,
		onClick: () => setOpen(!isOpen),
		children
	});
};
const Content = ({ render, className, children }) => {
	const { isOpen, panelId, triggerId } = useToolCall();
	if (!isOpen) return null;
	return renderPart(render, "div", { isOpen }, {
		id: panelId,
		role: "region",
		"aria-labelledby": triggerId,
		"data-state": "open",
		className,
		children
	});
};
/**
* The compound tool-call primitive set. Compose `Root` + parts to render a tool
* call however a given surface needs.
*
* @category Components
*/
const ToolCall = {
	Root,
	Trigger,
	Content,
	StatusIcon,
	StatusText,
	ToolName,
	Parameters,
	Result
};
//#endregion
//#region src/components/ToolCall/DefaultToolCard.tsx
/**
* Batteries-included default tool card — the chevron-header composition of the
* compound {@link ToolCall} parts. Status comes from the data, the collapsible
* is aria-correct, and it's memoized. Used by `<ToolCallEntry>` for flat
* (non-timeline) threads, sidebars, debug panels, etc.
*
* @category Components
*/
const DefaultToolCard = (0, react.memo)(function DefaultToolCard({ activity, isLast, isRunning = true }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToolCall.Root, {
		activity,
		isLast,
		running: isRunning,
		defaultOpen: activity.isError,
		className: "inv-tool-call--card",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToolCall.Trigger, {
			className: "inv-tool-call__header",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.StatusIcon, {}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.StatusText, {}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
					size: 14,
					className: "inv-tool-call__chevron"
				})
			]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToolCall.Content, {
			className: "inv-tool-call__panel",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.Parameters, { className: "inv-tool-call__request inv-tool-code-block__code" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.Result, { className: "inv-tool-call__response inv-tool-code-block__code" })]
		})]
	});
});
//#endregion
//#region src/components/ToolCall/SourceIcon.tsx
/**
* Favicon for a web-search source, falling back to a globe glyph when the image
* is missing, fails to load, or resolves to a default 16×16 placeholder.
*
* @category Components
*/
const SourceIcon = ({ src }) => {
	const [failed, setFailed] = (0, react.useState)(false);
	if (!src || failed) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Globe, {
		size: 16,
		className: "inv-tool-call__icon"
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: "inv-tool-call__source-logo",
		onLoad: (e) => {
			const img = e.currentTarget;
			if (img.naturalWidth <= 16 && img.naturalHeight <= 16) setFailed(true);
		},
		onError: () => setFailed(true)
	});
};
//#endregion
//#region src/components/ToolCall/toolSources.ts
const stripWww = (host) => host.replace(/^www\./, "");
const TWO_PART_TLD = /\.(co|com|org|net|gov|ac|edu)\.[a-z]{2}$/;
function siteNameFromHost(host) {
	const label = (TWO_PART_TLD.test(host) ? host.replace(TWO_PART_TLD, "") : host.replace(/\.[a-z]+$/i, "")).split(".").pop() || host;
	return label.charAt(0).toUpperCase() + label.slice(1);
}
const NUMBERED_LINKS = /^\[\d+\]\s*([^\n]*)\n(?:\w+ )?URL:\s*(\S+)(?:\nSource:\s*(\S+))?/gm;
function titleFromUrl(parsed, host) {
	const slug = parsed.pathname.split("/").filter(Boolean).pop();
	const words = slug ? decodeURIComponent(slug).replace(/\.[a-z0-9]+$/i, "").replace(/[-_+]+/g, " ").trim() : "";
	if (!words) return siteNameFromHost(host);
	return words.charAt(0).toUpperCase() + words.slice(1);
}
function extractNumberedLinks(result) {
	const sources = [];
	for (const match of result.matchAll(NUMBERED_LINKS)) {
		const url = match[2];
		try {
			const parsed = new URL(url);
			const host = stripWww(match[3] ?? parsed.hostname);
			sources.push({
				title: match[1].trim() || titleFromUrl(parsed, host),
				url,
				host,
				siteName: siteNameFromHost(host)
			});
		} catch {}
	}
	return sources;
}
const EXTRACTORS = [{
	matches: (toolName) => /_search$/.test(toolName),
	extract: extractNumberedLinks
}];
/**
* Link sources of a tool result, deduped by URL. `[]` when no extractor
* claims the tool or nothing in the result parses.
*/
function extractToolSources(toolName, result) {
	const extractor = EXTRACTORS.find((e) => e.matches(toolName));
	if (!extractor) return [];
	const seen = /* @__PURE__ */ new Set();
	return extractor.extract(result).filter((source) => {
		if (seen.has(source.url)) return false;
		seen.add(source.url);
		return true;
	});
}
//#endregion
//#region src/components/ToolCall/TimelineToolCard.tsx
/** Favicon + title rows for the links a tool's result carries (see
*  {@link extractToolSources} — per-tool formats live in one registry). */
const ToolSources = ({ sources }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-tool-call__sources",
		children: sources.map((source) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
			href: source.url,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "inv-tool-call__source",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "inv-tool-call__source-left",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SourceIcon, { src: `https://www.google.com/s2/favicons?domain=${source.host}&sz=64` }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-tool-call__source-title",
					children: source.title
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-tool-call__source-desc",
				children: source.siteName
			})]
		}, source.url))
	});
};
/**
* Timeline-shaped composition of the compound {@link ToolCall} parts: one row —
* tool glyph, status label, chevron — that expands into either the result's
* sources or a SINGLE block holding the request and the response together. The
* running affordances (glyph blink, label shimmer) are
* `(streaming|executing) && isLast`, derived from the lifecycle status rather
* than a separate `isThinking` flag. `ToolCall.Root` is the single
* `.inv-tool-call` container, so we compose *inside* it.
*
* @category Components
*/
const TimelineToolCard = (0, react.memo)(function TimelineToolCard({ activity, isLast, isRunning = true }) {
	const Icon = toolIcon(activity.toolName, activity.status);
	const running = (activity.status === "streaming" || activity.status === "executing") && isLast && isRunning;
	const sources = typeof activity.result === "string" && !activity.isError ? extractToolSources(activity.toolName, activity.result) : [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToolCall.Root, {
		activity,
		isLast,
		running: isRunning,
		defaultOpen: activity.isError,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToolCall.Trigger, {
			className: "inv-tool-call__title-row",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.StatusIcon, { render: (_state, props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: `inv-tool-call__icon-wrapper${props["data-spin"] ? " inv-tool-call__icon--blinking" : ""}`,
					"data-status": props["data-status"],
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, {
						size: 14,
						className: "inv-tool-call__icon"
					})
				}) }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.StatusText, { render: (_state, props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					role: "status",
					"aria-live": "polite",
					className: `inv-tool-call__name${running ? " inv-tool-call__name--shimmer" : ""}`,
					children: props["children"]
				}) }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
					size: 14,
					className: "inv-tool-call__chevron"
				})
			]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.Content, {
			className: "inv-tool-call__content",
			children: sources.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolSources, { sources }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("pre", {
				className: "inv-tool-call__block inv-tool-code-block__code",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.Parameters, { render: (_s, p) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: p["children"] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCall.Result, { render: (s, p) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
					className: s.isError ? "inv-tool-code-block__code--error" : void 0,
					children: `\n\n${p["children"]}`
				}) })]
			})
		})]
	});
});
//#endregion
//#region src/components/CodeBlock/CodeBlock.tsx
const CodeBlock = ({ language, codeString, theme }) => {
	const [copied, setCopied] = (0, react.useState)(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(codeString);
		setCopied(true);
		setTimeout(() => setCopied(false), 1e3);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-code-block-wrapper",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			onClick: handleCopy,
			variant: "secondary",
			size: "small",
			className: (0, clsx.default)("inv-code-block-copy-button", { "inv-code-block-copy-button-copied": copied }),
			icon: copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.CheckCheck, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Copy, {}),
			"aria-label": copied ? "Copied to clipboard" : "Copy code"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_syntax_highlighter.Prism, {
			style: theme ?? react_syntax_highlighter_dist_cjs_styles_prism.vscDarkPlus,
			language,
			PreTag: "div",
			className: "inv-code-block-syntax-highlighter",
			children: codeString
		})]
	});
};
//#endregion
//#region src/components/Table/Table.tsx
const alignmentClasses = {
	left: "inv-table-align-left",
	center: "inv-table-align-center",
	right: "inv-table-align-right"
};
const Table = react.default.forwardRef(({ className, containerRef, containerClassName, containerStyle, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	ref: containerRef,
	className: (0, clsx.default)("inv-table-container", containerClassName),
	style: containerStyle,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("table", {
		ref,
		className: (0, clsx.default)("inv-table", className),
		...props
	})
}));
Table.displayName = "Table";
const TableHeader = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", {
	ref,
	className: (0, clsx.default)("inv-table-header", className),
	...props
}));
TableHeader.displayName = "TableHeader";
const TableBody = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", {
	ref,
	className: (0, clsx.default)("inv-table-body", className),
	...props
}));
TableBody.displayName = "TableBody";
const TableFooter = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tfoot", {
	ref,
	className: (0, clsx.default)("inv-table-footer", className),
	...props
}));
TableFooter.displayName = "TableFooter";
const TableRow = react.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", {
	ref,
	className: (0, clsx.default)("inv-table-row", className),
	...props
}));
TableRow.displayName = "TableRow";
const TableHead = react.default.forwardRef(({ className, children, icon, align, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
	ref,
	className: (0, clsx.default)("inv-table-head", className),
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-table-head-content", align && alignmentClasses[align]),
		children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-table-head-icon",
			children: icon
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-table-head-label",
			children
		})]
	})
}));
TableHead.displayName = "TableHead";
const TableCell = react.default.forwardRef(({ className, align, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
	ref,
	className: (0, clsx.default)("inv-table-cell", align && alignmentClasses[align], className),
	...props
}));
TableCell.displayName = "TableCell";
const ScrollableTable = react.default.forwardRef(({ className, containerClassName, containerStyle, children, ...tableProps }, ref) => {
	const wrapperRef = (0, react.useRef)(null);
	const scrollContainerRef = (0, react.useRef)(null);
	const [isScrollable, setIsScrollable] = (0, react.useState)(false);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const columnLeftsRef = (0, react.useRef)([]);
	(0, react.useEffect)(() => {
		const container = scrollContainerRef.current;
		const wrapper = wrapperRef.current;
		if (!container || !wrapper) return;
		const compute = () => {
			setIsScrollable(container.scrollWidth > container.clientWidth);
			setCanScrollLeft(container.scrollLeft > 0);
			setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
			const ths = wrapper.querySelectorAll("thead th");
			if (!ths || ths.length === 0) {
				columnLeftsRef.current = [];
				return;
			}
			const containerRect = container.getBoundingClientRect();
			const lefts = [];
			ths.forEach((th) => {
				const left = th.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
				lefts.push(Math.max(0, Math.round(left)));
			});
			columnLeftsRef.current = Array.from(new Set(lefts)).sort((a, b) => a - b);
		};
		compute();
		const ro = new ResizeObserver(() => compute());
		ro.observe(container);
		const onScroll = () => {
			setCanScrollLeft(container.scrollLeft > 0);
			setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
		};
		container.addEventListener("scroll", onScroll);
		return () => {
			ro.disconnect();
			container.removeEventListener("scroll", onScroll);
		};
	}, [children]);
	const scrollToNextColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLeftsRef.current.length === 0) return;
		const current = container.scrollLeft;
		const target = columnLeftsRef.current.find((l) => l > current + 1);
		const maxScroll = container.scrollWidth - container.clientWidth;
		const next = typeof target === "number" ? target : maxScroll;
		container.scrollTo({
			left: Math.min(next, maxScroll),
			behavior: "smooth"
		});
	}, []);
	const scrollToPrevColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLeftsRef.current.length === 0) return;
		const current = container.scrollLeft;
		const prev = columnLeftsRef.current.filter((l) => l < current - 1).at(-1) ?? 0;
		container.scrollTo({
			left: Math.max(0, prev),
			behavior: "smooth"
		});
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-scrollable-table-wrapper",
		ref: wrapperRef,
		tabIndex: 0,
		children: [isScrollable && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-scrollable-table-control", "inv-scrollable-table-control-left", !canScrollLeft && "inv-scrollable-table-control-disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
				"aria-label": "Scroll left",
				size: "small",
				variant: "secondary",
				onClick: scrollToPrevColumn,
				disabled: !canScrollLeft,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, { size: 16 })
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-scrollable-table-control", "inv-scrollable-table-control-right", !canScrollRight && "inv-scrollable-table-control-disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
				"aria-label": "Scroll right",
				size: "small",
				variant: "secondary",
				onClick: scrollToNextColumn,
				disabled: !canScrollRight,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
			})
		})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Table, {
			ref,
			containerRef: scrollContainerRef,
			containerClassName: (0, clsx.default)("inv-scrollable-table-scroll-container", containerClassName),
			containerStyle,
			className,
			style: { width: isScrollable ? "max-content" : "100%" },
			...tableProps,
			children
		})]
	});
});
ScrollableTable.displayName = "ScrollableTable";
//#endregion
//#region src/components/MarkDownRenderer/MarkDownRenderer.tsx
function toTableAlignment(align) {
	if (align === "left" || align === "center" || align === "right") return align;
}
const MarkdownTableHead = ({ align, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableHead, {
	...props,
	align: toTableAlignment(align)
});
const MarkdownTableCell = ({ align, ...props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableCell, {
	...props,
	align: toTableAlignment(align)
});
const variantStyles = {
	clear: "",
	card: "inv-markdown-renderer-card",
	sunk: "inv-markdown-renderer-card-sunk"
};
const MarkDownRenderer = (0, react.memo)((props) => {
	const { mode } = useTheme();
	const theme = mode === "dark" ? react_syntax_highlighter_dist_cjs_styles_prism.vscDarkPlus : react_syntax_highlighter_dist_cjs_styles_prism.oneLight;
	const components = {
		code({ className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || "");
			if (match || !className && String(children).includes("\n")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodeBlock, {
				language: match?.[1] ?? "text",
				codeString: String(children).trim(),
				theme
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
				className: (0, clsx.default)("inv-markdown-renderer-code", className),
				...props,
				children
			});
		},
		a({ href, children, ...props }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inv-markdown-renderer-link",
				...props,
				children
			});
		},
		table: Table,
		thead: TableHeader,
		th: MarkdownTableHead,
		tbody: TableBody,
		tr: TableRow,
		td: MarkdownTableCell
	};
	const markdownProps = {
		...props.options,
		components: {
			...components,
			...props.options?.components
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)(props["variant"] && variantStyles[props["variant"]], "inv-markdown-renderer", props.className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_markdown.default, {
			...markdownProps,
			children: props.textMarkdown
		})
	});
});
//#endregion
//#region src/internalUtils/ref.ts
/**
* Assigns a value to a ref.
* Handles both callback refs and ref objects safely.
*
* @template T - The type of the ref value
* @param ref - The ref to assign the value to (can be callback, ref object, or null)
* @param value - The value to assign
*/
const assignRef = (ref, value) => {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
};
//#endregion
//#region src/hooks/useMultipleRefs.ts
/**
* Custom hook to merge multiple refs into a single ref callback.
*
* @template T - The type of element the ref will reference
* @param refs - Any number of refs or ref functions to merge
* @returns A callback ref that assigns the value to all provided refs
*/
const useMultipleRefs = (...refs) => {
	return (0, react$1.useCallback)((value) => {
		refs.forEach((ref) => {
			assignRef(ref, value);
		});
	}, [refs]);
};
//#endregion
//#region src/components/AgentInterface/_shared/detailed-view/DetailedViewPortalTarget.tsx
/**
* Registers a DOM node as the render target for {@link DetailedViewPanel} portals.
*
* Mount exactly one instance in your layout. Renders a `<div>` with
* `display: contents` so it doesn't affect layout flow.
*
* @category Components
*/
const DetailedViewPortalTarget = (0, react.forwardRef)(({ className }, ref) => {
	const { setNode } = (0, _invdev_react_headless.useDetailedViewPortalTarget)();
	const forwardedRef = (0, react.useRef)(ref);
	forwardedRef.current = ref;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: (0, react.useCallback)((node) => {
			setNode(node);
			const fRef = forwardedRef.current;
			if (typeof fRef === "function") fRef(node);
			else if (fRef) fRef.current = node;
		}, [setNode]),
		className,
		style: { display: "contents" }
	});
});
DetailedViewPortalTarget.displayName = "DetailedViewPortalTarget";
//#endregion
//#region src/components/AgentInterface/_shared/detailed-view/DetailedViewOverlay.tsx
/**
* Shared overlay wrapper for the detailed-view portal target.
* Used by the AgentInterface chat surface.
* Renders an absolute-positioned overlay with slide-in/slide-out animations.
*
* @category Components
*/
const DetailedViewOverlay = (0, react.forwardRef)(({ className }, ref) => {
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const [shouldRender, setShouldRender] = (0, react.useState)(isDetailedViewActive);
	const [isExiting, setIsExiting] = (0, react.useState)(false);
	const internalRef = (0, react.useRef)(null);
	const mergedRef = useMultipleRefs(ref, internalRef);
	(0, react.useEffect)(() => {
		if (isDetailedViewActive) {
			setShouldRender(true);
			setIsExiting(false);
		} else if (shouldRender) setIsExiting(true);
	}, [isDetailedViewActive]);
	const handleAnimationEnd = (0, react.useCallback)((e) => {
		if (e.target !== internalRef.current) return;
		if (isExiting) {
			setShouldRender(false);
			setIsExiting(false);
		}
	}, [isExiting]);
	if (!shouldRender) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: mergedRef,
		className: (0, clsx.default)("inv-detailed-view-overlay", { "inv-detailed-view-overlay--exiting": isExiting }, className),
		onAnimationEnd: handleAnimationEnd,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewPortalTarget, {})
	});
});
DetailedViewOverlay.displayName = "DetailedViewOverlay";
//#endregion
//#region src/components/AgentInterface/_shared/detailed-view/DetailedViewPanel.tsx
/** @internal */
var DetailedViewErrorBoundary = class extends react.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	render() {
		if (this.state.hasError) return this.props.fallback ?? null;
		return this.props.children;
	}
};
/** @internal */
const DefaultHeader = ({ title, onClose }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: "inv-detailed-view-panel__header",
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-detailed-view-panel__title",
		children: title
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		variant: "tertiary",
		size: "small",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: "1em" }),
		onClick: onClose,
		"aria-label": "Close detailed-view panel"
	})]
});
/**
* Portals detailed-view content into the nearest {@link DetailedViewPortalTarget}.
*
* Renders nothing when the view is inactive or no portal target is mounted.
* Wraps children in an error boundary and applies theme-scoped class names.
*
* Requires `<DetailedViewPortalTarget />` to be mounted in the layout.
*
* @category Components
*/
const DetailedViewPanel = (0, react.forwardRef)(({ viewId, children, title, className, errorFallback, header = true }, ref) => {
	const { isActive, close } = (0, _invdev_react_headless.useDetailedView)(viewId);
	const { node: panelNode } = (0, _invdev_react_headless.useDetailedViewPortalTarget)();
	const { portalThemeClassName } = useTheme();
	(0, react.useEffect)(() => {
		if (!isActive || panelNode) return;
		const timer = setTimeout(() => {
			console.warn("[Inv] DetailedViewPanel: view is active but no render target is mounted. Ensure <DetailedViewPortalTarget /> is rendered in your layout.");
		}, 100);
		return () => clearTimeout(timer);
	}, [isActive, panelNode]);
	if (!isActive || !panelNode) return null;
	const handleClose = () => close();
	let headerContent = null;
	if (header === true) headerContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultHeader, {
		title: title ?? "Detailed view",
		onClose: handleClose
	});
	else if (header !== false) headerContent = header;
	return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		id: `inv-detailed-view-panel-${viewId}`,
		className: (0, clsx.default)("inv-detailed-view-panel", portalThemeClassName, className),
		role: "region",
		"aria-label": title ?? "Detailed view panel",
		children: [headerContent, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewErrorBoundary, {
			fallback: errorFallback,
			children
		})]
	}), panelNode);
});
DetailedViewPanel.displayName = "DetailedViewPanel";
//#endregion
//#region src/components/_shared/tool-renderer/ToolCallErrorFallback.tsx
/**
* Inline fallback shown when a matched renderer's `parse`/`parser` throws.
* Keeps one bad renderer from blanking the whole thread.
*
* @internal
*/
function ToolCallErrorFallback({ error, toolName }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-tool-call inv-tool-call--error",
		"data-status": "error",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-tool-call__title-row",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-tool-call__icon-wrapper",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, {
					size: 14,
					className: "inv-tool-call__icon"
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "inv-tool-call__name",
				children: [
					"Couldn’t render the ",
					toolName,
					" tool"
				]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-tool-call__connector inv-tool-call__connector--last",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tool-call__args-block",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: "inv-tool-code-block__code inv-tool-code-block__code--error",
					children: error
				})
			})
		})]
	});
}
//#endregion
//#region src/components/_shared/tool-renderer/ToolActivityRenderer.tsx
/**
* Runs a matched renderer for one tool activity via the `parser` contract:
* reconstruct the raw envelope from the typed activity (`args` = the raw JSON
* string, `response` = the result or null) so parsers see exactly today's input.
*/
function runRenderer(renderer, activity) {
	return renderer.parser({
		args: activity.toolCall.function.arguments,
		response: activity.result ?? null
	}, { isStreaming: activity.status === "streaming" || activity.status === "executing" });
}
/**
* Renders a matched artifact renderer for a single {@link ToolActivity}.
*
* Lifecycle mirrors the previous `RendererInstance`: run the renderer, register
* the entry in ThreadContext when `meta` is non-null, and render
* `preview(props, controls)` inline + `<DetailedViewPanel>` for the side panel.
* The renderer is wrapped in try/catch — a throw renders an inline fallback
* instead of blanking the thread.
*
* @internal
*/
function ToolActivityRenderer({ renderer, activity, detailedViewPanel: DetailedViewPanel$1 = DetailedViewPanel, fallback = null }) {
	const fallbackId = (0, react.useId)();
	const tcStore = (0, _invdev_react_headless.useThreadContextStore)();
	const dvStore = (0, _invdev_react_headless.useDetailedViewStore)();
	const isStreaming = activity.status === "streaming" || activity.status === "executing";
	const { parsed, error } = (0, react.useMemo)(() => {
		try {
			return {
				parsed: runRenderer(renderer, activity),
				error: null
			};
		} catch (e) {
			return {
				parsed: null,
				error: String(e)
			};
		}
	}, [
		renderer,
		activity.id,
		activity.status,
		activity.toolCall.function.arguments,
		activity.result,
		activity.isError
	]);
	const meta = parsed?.meta ?? null;
	const viewId = meta ? (0, _invdev_react_headless.artifactViewId)(meta.id, meta.version) : fallbackId;
	(0, react.useEffect)(() => {
		if (!meta) return;
		tcStore.getState().registerArtifact({
			...meta,
			type: meta.type ?? renderer.type,
			updatedAt: Date.now()
		});
		return () => tcStore.getState().unregisterArtifact(meta.id, meta.version);
	}, [
		tcStore,
		renderer.type,
		meta?.id,
		meta?.version,
		meta?.heading,
		meta?.type
	]);
	const prevViewIdRef = (0, react.useRef)(viewId);
	(0, react.useEffect)(() => {
		const prev = prevViewIdRef.current;
		if (prev === viewId) return;
		prevViewIdRef.current = viewId;
		const dv = dvStore.getState();
		if (dv.activeDetailedViewId === prev) dv.setActiveDetailedView(viewId);
	}, [viewId, dvStore]);
	(0, react.useEffect)(() => {
		if (!meta) return;
		const dv = dvStore.getState();
		const active = dv.activeDetailedViewId;
		if (!active || active === viewId) return;
		const parsed = (0, _invdev_react_headless.parseArtifactViewId)(active);
		if (!parsed || parsed.id !== meta.id) return;
		if (meta.version > parsed.version) dv.setActiveDetailedView(viewId);
	}, [
		dvStore,
		viewId,
		meta?.id,
		meta?.version
	]);
	const { isActive, open, close, toggle } = (0, _invdev_react_headless.useDetailedView)(viewId);
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCallErrorFallback, {
		error,
		toolName: activity.toolName
	});
	if (activity.isError || parsed === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	const controls = {
		isActive,
		isStreaming,
		open,
		close,
		toggle
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [renderer.preview(parsed.props, controls), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewPanel$1, {
		viewId,
		title: meta?.heading ?? "Detailed view",
		children: renderer.actual(parsed.props, controls)
	})] });
}
//#endregion
//#region src/components/_shared/tool-renderer/TimelineEntry.tsx
const propsEqual$1 = (a, b) => a.activity.status === b.activity.status && a.activity.toolCall.function.arguments === b.activity.toolCall.function.arguments && a.activity.result === b.activity.result && a.activity.isError === b.activity.isError && a.isLast === b.isLast && a.forceDefault === b.forceDefault && a.fallbackToDefault === b.fallbackToDefault && a.detailedViewPanel === b.detailedViewPanel;
/**
* Timeline-flavoured sibling of {@link ToolCallEntry}: the same matched-renderer
* **xor** default dispatch, but the default is the timeline-shaped
* {@link TimelineToolCard} (dot + connector + StatusStep) instead of the chevron
* card. Used both inside `<ToolCallTimeline>` and directly by flat threads that
* want the always-visible timeline rows.
*
* @category Components
*/
const TimelineEntry = (0, react.memo)(function TimelineEntry({ activity, isLast = false, detailedViewPanel, forceDefault = false, fallbackToDefault = true }) {
	const renderer = (0, _invdev_react_headless.useArtifactRenderer)(activity.toolName);
	const defaultCard = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineToolCard, {
		activity,
		isLast,
		isRunning: (0, _invdev_react_headless.useThread)((s) => s.isRunning)
	});
	if (forceDefault || !renderer) return defaultCard;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolActivityRenderer, {
		renderer,
		activity,
		detailedViewPanel,
		fallback: fallbackToDefault ? defaultCard : null
	});
}, propsEqual$1);
//#endregion
//#region src/components/ToolCall/ToolCallTimeline.tsx
const stepKey = (step) => step.type === "text" ? `text-${step.id}` : step.activity.id;
const TimelineStepRow = ({ step, isLast, detailedViewPanel, forceDefault }) => {
	if (step.type === "text") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-tool-call-timeline__text-step",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, {
			textMarkdown: step.text,
			className: "inv-tool-call-timeline__text-step-body"
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineEntry, {
		activity: step.activity,
		isLast,
		detailedViewPanel,
		forceDefault
	});
};
const REVEAL_INTERVAL = 600;
const NO_FADE = {
	top: false,
	bottom: false
};
const OVERFLOW_SLACK = 8;
const EDGE_SLACK = 4;
/** Visually hidden but available to screen readers; inline so we don't depend on
*  scss (a sibling agent owns the stylesheet). */
const VISUALLY_HIDDEN = {
	position: "absolute",
	width: 1,
	height: 1,
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	margin: -1
};
const isRunning = (a) => a.status === "streaming" || a.status === "executing";
/**
* The "Working / Behind the scenes" timeline wrapper, driven by
* {@link ToolActivity}[] from `useToolActivities`. Reveals the run's steps
* one-by-one and keeps every revealed one on screen, holds the tray open across
* the tool-result → first-token gap (`awaitingResponse`), and lets a manual
* close stick for the rest of the run. "Running" is read from each activity's
* status, not an `isThinking` prop.
*
* (Animations are CSS-only — framer-motion is intentionally not a dependency.)
*
* @category Components
*/
function ToolCallTimeline({ activities, steps, isLast = false, detailedViewPanel, forceDefault = false, awaitingResponse = false }) {
	const displaySteps = steps ?? activities.map((activity) => ({
		type: "activity",
		activity
	}));
	const isThreadRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const thinking = isThreadRunning && isLast && activities.length > 0 && (isRunning(activities[activities.length - 1]) || awaitingResponse);
	const [expanded, setExpanded] = (0, react.useState)(false);
	const [userCollapsed, setUserCollapsed] = (0, react.useState)(false);
	const [revealedCount, setRevealedCount] = (0, react.useState)(() => isLast ? 1 : Math.max(displaySteps.length, 1));
	const prevThinking = (0, react.useRef)(thinking);
	(0, react.useEffect)(() => {
		if (!prevThinking.current && thinking) {
			setRevealedCount(1);
			setExpanded(false);
			setUserCollapsed(false);
			followRef.current = true;
		} else if (prevThinking.current && !thinking) {
			setExpanded(false);
			setRevealedCount(displaySteps.length);
		}
		prevThinking.current = thinking;
	}, [thinking, displaySteps.length]);
	const itemsRef = (0, react.useRef)(null);
	const followRef = (0, react.useRef)(true);
	const distanceFromBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight;
	const [fade, setFade] = (0, react.useState)(NO_FADE);
	const measureEdges = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		const next = el && el.scrollHeight - el.clientHeight > OVERFLOW_SLACK ? {
			top: el.scrollTop > EDGE_SLACK,
			bottom: distanceFromBottom(el) > EDGE_SLACK
		} : NO_FADE;
		setFade((prev) => prev.top === next.top && prev.bottom === next.bottom ? prev : next);
	}, []);
	const observerRef = (0, react.useRef)(null);
	const attachItems = (0, react.useCallback)((el) => {
		itemsRef.current = el;
		observerRef.current?.disconnect();
		observerRef.current = null;
		if (!el || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => measureEdges());
		observer.observe(el);
		observerRef.current = observer;
	}, [measureEdges]);
	(0, react.useEffect)(() => () => observerRef.current?.disconnect(), []);
	(0, react.useLayoutEffect)(() => {
		measureEdges();
	});
	const itemsClassName = (0, clsx.default)("inv-behind-the-scenes__items", {
		"inv-behind-the-scenes__items--fade-top": fade.top,
		"inv-behind-the-scenes__items--fade-bottom": fade.bottom
	});
	const handleItemsScroll = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		if (el && distanceFromBottom(el) < 24) followRef.current = true;
		measureEdges();
	}, [measureEdges]);
	const handleItemsWheel = (0, react.useCallback)((e) => {
		if (e.deltaY < 0) followRef.current = false;
	}, []);
	const handleItemsTouchMove = (0, react.useCallback)(() => {
		const el = itemsRef.current;
		if (el && distanceFromBottom(el) >= 24) followRef.current = false;
	}, []);
	(0, react.useLayoutEffect)(() => {
		if (!thinking || !followRef.current) return;
		const el = itemsRef.current;
		if (!el || distanceFromBottom(el) < 1) return;
		const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		el.scrollTo({
			top: el.scrollHeight,
			behavior: reduceMotion ? "auto" : "smooth"
		});
	});
	const revealingStep = displaySteps[revealedCount - 1];
	const currentReady = !revealingStep || revealingStep.type === "text" ? true : revealingStep.activity.status !== "streaming";
	(0, react.useEffect)(() => {
		if (isLast && revealedCount < displaySteps.length && currentReady) {
			const t = setTimeout(() => setRevealedCount((c) => c + 1), REVEAL_INTERVAL);
			return () => clearTimeout(t);
		}
	}, [
		isLast,
		displaySteps.length,
		revealedCount,
		currentReady
	]);
	(0, react.useEffect)(() => {
		if (!isThreadRunning && revealedCount < displaySteps.length) setRevealedCount(displaySteps.length);
	}, [
		isThreadRunning,
		revealedCount,
		displaySteps.length
	]);
	if (activities.length === 0 || displaySteps.length === 0) return null;
	const revealing = revealedCount < displaySteps.length;
	const showCompact = (thinking || revealing) && !expanded && !userCollapsed;
	const isOpen = expanded || showCompact;
	const current = displaySteps[Math.min(revealedCount - 1, displaySteps.length - 1)];
	const liveLabel = current.type === "text" ? current.text : current.activity.statusMessage ?? defaultLabel(current.activity.status, current.activity.toolName);
	const failedCount = !thinking && !revealing ? activities.filter((a) => a.status === "error").length : 0;
	const working = thinking || revealing;
	const toggleLabel = working ? "Working" : failedCount > 0 ? `Behind the scenes · ${failedCount} failed` : "Behind the scenes";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-behind-the-scenes",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				role: "status",
				"aria-live": "polite",
				style: VISUALLY_HIDDEN,
				children: liveLabel
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				className: "inv-behind-the-scenes__toggle",
				type: "button",
				"aria-expanded": isOpen,
				onClick: () => {
					if (isOpen) {
						setExpanded(false);
						setUserCollapsed(true);
					} else setExpanded(true);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: (0, clsx.default)("inv-behind-the-scenes__toggle-label", { "inv-behind-the-scenes__toggle-label--shimmer": working }),
					children: toggleLabel
				}), isOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {
					size: 14,
					className: "inv-behind-the-scenes__toggle-icon"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
					size: 14,
					className: "inv-behind-the-scenes__toggle-icon"
				})]
			}),
			isLast && !expanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-behind-the-scenes__compact", { "inv-behind-the-scenes__compact--closed": !showCompact }),
				inert: !showCompact,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-behind-the-scenes__compact-inner",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: itemsClassName,
						ref: attachItems,
						onScroll: handleItemsScroll,
						onWheel: handleItemsWheel,
						onTouchMove: handleItemsTouchMove,
						children: displaySteps.slice(0, revealedCount).map((step, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-behind-the-scenes__reveal-item",
							style: { width: "100%" },
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineStepRow, {
								step,
								isLast: idx === revealedCount - 1,
								detailedViewPanel,
								forceDefault
							})
						}, stepKey(step)))
					})
				})
			}),
			expanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: itemsClassName,
				ref: attachItems,
				onScroll: handleItemsScroll,
				onWheel: handleItemsWheel,
				onTouchMove: handleItemsTouchMove,
				children: displaySteps.map((step, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: { width: "100%" },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineStepRow, {
						step,
						isLast: isLast && idx === displaySteps.length - 1,
						detailedViewPanel,
						forceDefault
					})
				}, stepKey(step)))
			})
		]
	});
}
//#endregion
//#region src/components/_shared/tool-renderer/ToolCallEntry.tsx
const propsEqual = (a, b) => a.activity.status === b.activity.status && a.activity.toolCall.function.arguments === b.activity.toolCall.function.arguments && a.activity.result === b.activity.result && a.activity.isError === b.activity.isError && a.isLast === b.isLast && a.detailedViewPanel === b.detailedViewPanel;
/**
* Renders one tool call: a matched artifact renderer (exact → RegExp → `"*"`)
* **xor** the batteries-included {@link DefaultToolCard} — never both. The
* single render path that replaces the copy-pasted call-card + result-renderer
* blocks across the thread components. Memoized so it only re-renders when the
* activity actually changes.
*
* @category Components
*/
const ToolCallEntry = (0, react.memo)(function ToolCallEntry({ activity, isLast = false, detailedViewPanel }) {
	const renderer = (0, _invdev_react_headless.useArtifactRenderer)(activity.toolName);
	const defaultCard = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultToolCard, {
		activity,
		isLast,
		isRunning: (0, _invdev_react_headless.useThread)((s) => s.isRunning)
	});
	if (!renderer) return defaultCard;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolActivityRenderer, {
		renderer,
		activity,
		detailedViewPanel,
		fallback: defaultCard
	});
}, propsEqual);
//#endregion
//#region src/components/_shared/tool-renderer/ToolMessageRenderer.tsx
/**
* Dispatches a tool call to a matching renderer, else renders `fallback`.
*
* @deprecated Prefer `useToolActivities` + `<ToolCallEntry>` / `<ToolCallTimeline>`,
* which pair calls↔results by id, carry real status, and render the matched
* renderer xor the default card. This wrapper now builds a single
* {@link ToolActivity} from `toolCall`/`toolMessage` and delegates to
* {@link ToolActivityRenderer}, so existing imports keep working.
*
* @category Components
*/
const ToolMessageRenderer = ({ toolMessage, toolCall, fallback, detailedViewPanel }) => {
	const renderer = (0, _invdev_react_headless.useArtifactRenderer)(toolCall.function.name);
	if (!renderer) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	const [activity] = (0, _invdev_react_headless.pairToolActivity)({
		id: `__tool_message_renderer__${toolCall.id}`,
		role: "assistant",
		content: "",
		toolCalls: [toolCall]
	}, toolMessage ? [toolMessage] : []);
	if (!activity) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolActivityRenderer, {
		renderer,
		activity,
		detailedViewPanel
	});
};
//#endregion
//#region src/components/Callout/Callout.tsx
const variantMap$6 = {
	info: "inv-callout-info",
	danger: "inv-callout-danger",
	warning: "inv-callout-warning",
	success: "inv-callout-success",
	neutral: "inv-callout-neutral"
};
const Callout = react.default.forwardRef((props, ref) => {
	const { className, variant = "neutral", title, description, duration, style, ...rest } = props;
	const dismissStyle = duration ? {
		...style,
		"--callout-duration": `${duration}ms`
	} : style;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-callout", variantMap$6[variant], duration && "inv-callout-autodismiss", className),
		style: dismissStyle,
		...rest,
		children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-callout-title",
			children: title
		}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-callout-description",
			children: description
		})]
	});
});
//#endregion
//#region src/components/AgentInterface/components/AmbientLoader.tsx
/**
* Ambient loading state for AgentInterface surfaces: two blurred glow blobs
* drift and breathe behind a centered dot-matrix loader with a contextual
* label. Fills whatever panel hosts it (min 280px tall), adapts to light/dark
* through the theme tokens, and freezes under `prefers-reduced-motion`.
*
* The label is required on purpose — every loading surface should say what is
* actually happening ("Loading artifacts…"), never a bare "Loading…".
*/
const AmbientLoader = ({ label, className }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: (0, clsx.default)("inv-agent-ambient-loader", className),
	role: "status",
	"aria-live": "polite",
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-agent-ambient-loader__glow inv-agent-ambient-loader__glow--a" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-agent-ambient-loader__glow inv-agent-ambient-loader__glow--b" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotMatrixLoader, {})
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-ambient-loader__label",
			children: label
		})
	]
});
//#endregion
//#region src/components/AgentInterface/components/ScrollToLatest.tsx
const SHOW_BELOW_PX = 96;
const HIDE_BELOW_PX = 24;
/**
* Bottom of the last message's rendered CONTENT, in viewport coordinates.
* The user-message-anchor spacer inflates the last message's own box, so
* measure its children instead.
*/
function lastContent(scroller) {
	const last = scroller.querySelector(".inv-agent-thread-messages")?.lastElementChild;
	if (!last) return null;
	const children = Array.from(last.children);
	if (children.length === 0) return {
		el: last,
		bottom: last.getBoundingClientRect().bottom
	};
	let el = children[0];
	let bottom = last.getBoundingClientRect().top;
	for (const child of children) {
		const r = child.getBoundingClientRect();
		if (r.bottom > bottom) {
			bottom = r.bottom;
			el = child;
		}
	}
	return {
		el,
		bottom
	};
}
/** Down-arrow above the composer, shown only when content sits below the fold. */
const ScrollToLatest = ({ scrollRef }) => {
	const [belowFold, setBelowFold] = (0, react.useState)(false);
	const measure = (0, react.useCallback)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const content = lastContent(el);
		if (!content) {
			setBelowFold(false);
			return;
		}
		const delta = content.bottom - el.getBoundingClientRect().bottom;
		setBelowFold((prev) => prev ? delta > HIDE_BELOW_PX : delta > SHOW_BELOW_PX);
	}, [scrollRef]);
	(0, react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		measure();
		el.addEventListener("scroll", measure, { passive: true });
		return () => el.removeEventListener("scroll", measure);
	}, [scrollRef, measure]);
	(0, react.useEffect)(() => {
		const el = scrollRef.current;
		measure();
		if (!el || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		const content = el.firstElementChild;
		if (content) ro.observe(content);
		return () => ro.disconnect();
	}, [measure, scrollRef]);
	const jump = (0, react.useCallback)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const content = lastContent(el);
		if (!content) return;
		content.el.scrollIntoView({
			block: "end",
			behavior: "smooth"
		});
	}, [scrollRef]);
	if (!belowFold) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
		type: "button",
		className: "inv-agent-thread-scroll-latest",
		onClick: jump,
		"aria-label": "Scroll to latest message",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			className: "inv-agent-thread-scroll-latest__arrow",
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 5v14" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m19 12-7 7-7-7" })]
		})
	});
};
//#endregion
//#region src/components/AgentInterface/ResizableSeparator.tsx
const KEYBOARD_STEP = 16;
const KEYBOARD_STEP_LARGE = 64;
/**
* A draggable, keyboard-operable vertical separator for resizing panels.
* Used between chat and detailed-view panels in desktop mode.
*
* Implements the WAI-ARIA window-splitter pattern: focusable, `role="separator"`,
* Left/Right (Shift for larger steps) to resize, Home/End to snap to min/max.
*/
const ResizableSeparator = ({ onResize, onResizeStep, onDragStart, onDragEnd, getAriaValues, controlsId, ariaLabel = "Resize panel", className }) => {
	const isDraggingRef = (0, react.useRef)(false);
	const onResizeRef = (0, react.useRef)(onResize);
	const onDragStartRef = (0, react.useRef)(onDragStart);
	const onDragEndRef = (0, react.useRef)(onDragEnd);
	const [aria, setAria] = (0, react.useState)(null);
	const syncAria = () => setAria(getAriaValues());
	const syncAriaRef = (0, react.useRef)(syncAria);
	syncAriaRef.current = syncAria;
	(0, react.useEffect)(() => {
		onResizeRef.current = onResize;
		onDragStartRef.current = onDragStart;
		onDragEndRef.current = onDragEnd;
	}, [
		onResize,
		onDragStart,
		onDragEnd
	]);
	(0, react.useEffect)(() => {
		syncAriaRef.current();
	}, []);
	(0, react.useEffect)(() => {
		const handleMouseMove = (e) => {
			if (isDraggingRef.current) {
				e.preventDefault();
				onResizeRef.current(e.clientX);
			}
		};
		const handleMouseUp = () => {
			if (isDraggingRef.current) {
				isDraggingRef.current = false;
				onDragEndRef.current();
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				syncAriaRef.current();
			}
		};
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);
	const handleMouseDown = () => {
		isDraggingRef.current = true;
		onDragStartRef.current();
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	};
	const handleKeyDown = (e) => {
		let delta = null;
		switch (e.key) {
			case "ArrowLeft":
				delta = -(e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP);
				break;
			case "ArrowRight":
				delta = e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
				break;
			case "Home":
				delta = -Infinity;
				break;
			case "End":
				delta = Infinity;
				break;
			default: return;
		}
		e.preventDefault();
		onResizeStep(delta);
		syncAria();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		role: "separator",
		"aria-orientation": "vertical",
		"aria-label": ariaLabel,
		"aria-controls": controlsId,
		"aria-valuenow": aria?.now,
		"aria-valuemin": aria?.min,
		"aria-valuemax": aria?.max,
		"aria-valuetext": aria ? `${aria.now}%` : void 0,
		tabIndex: 0,
		className: (0, clsx.default)("inv-agent-resizable-separator", className),
		onMouseDown: handleMouseDown,
		onKeyDown: handleKeyDown,
		onFocus: syncAria,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-agent-resizable-separator__handle" })
	});
};
//#endregion
//#region src/components/AgentInterface/useDetailedViewResize.ts
const INITIAL_CHAT_WIDTH = 420;
const MIN_CHAT_WIDTH = 420;
const MAX_CHAT_WIDTH_RATIO = .8;
/**
* Custom hook to manage detailed-view panel resizing logic (desktop only).
* Handles:
* - Chat panel width constraints
* - Resize drag events
* - Sidebar state when detailed view is active/inactive
*/
const useDetailedViewResize = ({ isDetailedViewActive, isMobile, setIsSidebarOpen }) => {
	const [isDragging, setIsDragging] = (0, react$1.useState)(false);
	const containerRef = (0, react$1.useRef)(null);
	const chatPanelRef = (0, react$1.useRef)(null);
	const detailedViewPanelRef = (0, react$1.useRef)(null);
	const widthRef = (0, react$1.useRef)(INITIAL_CHAT_WIDTH);
	(0, react$1.useEffect)(() => {
		if (isMobile) return;
		if (isDetailedViewActive) {
			setIsSidebarOpen(false);
			if (chatPanelRef.current) chatPanelRef.current.style.width = `${INITIAL_CHAT_WIDTH}px`;
			widthRef.current = INITIAL_CHAT_WIDTH;
		} else {
			setIsSidebarOpen(true);
			if (chatPanelRef.current) chatPanelRef.current.style.width = "100%";
			widthRef.current = INITIAL_CHAT_WIDTH;
		}
	}, [
		isDetailedViewActive,
		isMobile,
		setIsSidebarOpen
	]);
	const setChatWidth = (0, react$1.useCallback)((width) => {
		if (!chatPanelRef.current) return;
		chatPanelRef.current.style.width = `${width}px`;
		widthRef.current = width;
	}, []);
	const handleResize = (0, react$1.useCallback)((clientX) => {
		if (!containerRef.current) return;
		const containerRect = containerRef.current.getBoundingClientRect();
		if (containerRect.width <= 0) return;
		const newWidthPx = clientX - containerRect.left;
		const maxWidthPx = containerRect.width * MAX_CHAT_WIDTH_RATIO;
		setChatWidth(Math.min(Math.max(newWidthPx, MIN_CHAT_WIDTH), maxWidthPx));
	}, [setChatWidth]);
	const handleResizeStep = (0, react$1.useCallback)((deltaPx) => {
		if (!containerRef.current) return;
		const containerWidth = containerRef.current.getBoundingClientRect().width;
		if (containerWidth <= 0) return;
		const maxWidthPx = containerWidth * MAX_CHAT_WIDTH_RATIO;
		setChatWidth(Math.min(Math.max(widthRef.current + deltaPx, MIN_CHAT_WIDTH), maxWidthPx));
	}, [setChatWidth]);
	const getResizeAria = (0, react$1.useCallback)(() => {
		if (!containerRef.current) return null;
		const containerWidth = containerRef.current.getBoundingClientRect().width;
		if (containerWidth <= 0) return null;
		return {
			now: Math.round(widthRef.current / containerWidth * 100),
			min: Math.round(MIN_CHAT_WIDTH / containerWidth * 100),
			max: Math.round(MAX_CHAT_WIDTH_RATIO * 100)
		};
	}, []);
	return {
		containerRef,
		chatPanelRef,
		detailedViewPanelRef,
		isDragging,
		handleResize,
		handleResizeStep,
		handleDragStart: (0, react$1.useCallback)(() => {
			setIsDragging(true);
		}, []),
		handleDragEnd: (0, react$1.useCallback)(() => {
			setIsDragging(false);
		}, []),
		getResizeAria
	};
};
//#endregion
//#region src/components/AgentInterface/UserMessageContent.tsx
const ALLOWED_URL_SCHEMES = ["http:", "https:"];
const ALLOWED_DATA_MIME = /^(?:image|audio|video)\/|^application\/pdf$/i;
const isSafeBase64 = (v) => /^[A-Za-z0-9+/]+={0,2}$/.test(v.replace(/\s/g, ""));
/** Build a vetted `data:` URI, or `""` if the mime/payload isn't allowed. */
function buildDataUri(mimeType, value) {
	if (!mimeType || !ALLOWED_DATA_MIME.test(mimeType)) return "";
	if (!isSafeBase64(value)) return "";
	return `data:${mimeType};base64,${value}`;
}
/** Vet a source URL: allow http(s) + allowlisted `data:`, reject javascript:/etc. */
function sanitizeUrl(raw) {
	const s = raw.trim();
	if (s.startsWith("data:")) {
		const semi = s.indexOf(";");
		const mime = semi > 5 ? s.slice(5, semi) : "";
		return ALLOWED_DATA_MIME.test(mime) ? s : "";
	}
	try {
		return ALLOWED_URL_SCHEMES.includes(new URL(s).protocol) ? s : "";
	} catch {
		return s;
	}
}
/** mimeType → modality, used to route a `binary` part (which has no `type`). */
function modalityFromMime(mime) {
	if (mime.startsWith("image/")) return "image";
	if (mime.startsWith("audio/")) return "audio";
	if (mime.startsWith("video/")) return "video";
	return "file";
}
/** mimeType → short badge label for the file chip. */
function fileBadge(mime) {
	if (!mime) return "FILE";
	if (mime.includes("pdf")) return "PDF";
	if (mime.includes("sheet") || mime.includes("excel")) return "XLS";
	if (mime.includes("presentation") || mime.includes("powerpoint")) return "PPT";
	if (mime.includes("word") || mime.includes("document")) return "DOC";
	if (mime.startsWith("text/")) return "TXT";
	if (mime.startsWith("image/")) return "IMG";
	if (mime.startsWith("audio/")) return "AUD";
	if (mime.startsWith("video/")) return "VID";
	return "FILE";
}
/** Best-effort filename from an optional `metadata` bag (image/audio/video/document). */
function metaFilename(metadata) {
	if (metadata && typeof metadata === "object" && "filename" in metadata) {
		const f = metadata["filename"];
		if (typeof f === "string" && f.length > 0) return f;
	}
}
/** Resolve a media-style `source` ({ type:"data"|"url", value, mimeType }) to a vetted src. */
function resolveSource(source) {
	return source.type === "url" ? sanitizeUrl(source.value) : buildDataUri(source.mimeType, source.value);
}
/** Resolve any `InputContent` part to a render-ready descriptor. */
function resolveInputPart(part) {
	switch (part.type) {
		case "text": return {
			kind: "text",
			src: "",
			text: part.text,
			label: part.text
		};
		case "image":
		case "audio":
		case "video": {
			const filename = metaFilename(part.metadata);
			return {
				kind: part.type,
				src: resolveSource(part.source),
				filename,
				mimeType: part.source.mimeType,
				label: filename ?? `${part.type} attachment`
			};
		}
		case "document": {
			const filename = metaFilename(part.metadata);
			const mimeType = part.source.mimeType;
			return {
				kind: "file",
				src: resolveSource(part.source),
				filename,
				mimeType,
				label: filename ?? mimeType ?? "File"
			};
		}
		case "binary": {
			const { mimeType } = part;
			const src = part.url ? sanitizeUrl(part.url) : part.data ? buildDataUri(mimeType, part.data) : "";
			return {
				kind: modalityFromMime(mimeType),
				src,
				filename: part.filename,
				mimeType,
				label: part.filename ?? mimeType ?? "File"
			};
		}
		default: return {
			kind: "file",
			src: "",
			label: "Unsupported attachment"
		};
	}
}
const FileChip = ({ part, broken = false }) => {
	const name = part.filename ?? part.mimeType ?? "Attachment";
	const body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: (0, clsx.default)("inv-agent-thread-message-user__chip", { "inv-agent-thread-message-user__chip--broken": broken }),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-thread-message-user__chip-badge",
			"aria-hidden": "true",
			children: fileBadge(part.mimeType)
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-thread-message-user__chip-name",
			children: name
		})]
	});
	return part.src ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
		href: part.src,
		download: part.filename ?? "",
		rel: "noreferrer",
		target: "_blank",
		className: "inv-agent-thread-message-user__chip-link",
		"aria-label": `Download ${name}`,
		children: body
	}) : body;
};
const MediaPart = ({ part }) => {
	const [error, setError] = (0, react.useState)(false);
	if (!part.src || error && part.kind !== "file") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileChip, {
		part,
		broken: Boolean(part.src) && error
	});
	switch (part.kind) {
		case "image": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src: part.src,
			alt: part.label,
			loading: "lazy",
			className: "inv-agent-thread-message-user__image",
			onError: () => setError(true)
		});
		case "audio": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("figure", {
			className: "inv-agent-thread-message-user__media",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("audio", {
				controls: true,
				preload: "metadata",
				src: part.src,
				className: "inv-agent-thread-message-user__audio",
				"aria-label": part.label,
				onError: () => setError(true)
			}), part.filename && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("figcaption", {
				className: "inv-agent-thread-message-user__filename",
				children: part.filename
			})]
		});
		case "video": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("video", {
			controls: true,
			preload: "metadata",
			src: part.src,
			className: "inv-agent-thread-message-user__video",
			"aria-label": part.label,
			onError: () => setError(true)
		});
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileChip, { part });
	}
};
const UserMessageContent = ({ message }) => {
	if (message.role !== "user") return null;
	const content = message.content;
	if (typeof content === "string") {
		const { content: humanText } = separateContentAndContext(content);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: humanText });
	}
	if (!content?.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: content.map((part, i) => {
		const resolved = resolveInputPart(part);
		if (resolved.kind === "text") return resolved.text?.trim() ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-thread-message-user__text",
			children: resolved.text
		}, i) : null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MediaPart, { part: resolved }, i);
	}) });
};
//#endregion
//#region src/components/AgentInterface/components/DesktopWelcomeComposer.tsx
const DesktopWelcomeComposer = ({ className, placeholder = "Type your query here", value, onChange, drafting, inputRef }) => {
	const internal = useComposerState();
	const isControlled = value !== void 0;
	const textContent = isControlled ? value : internal.textContent;
	const setTextContent = isControlled ? onChange ?? (() => void 0) : internal.setTextContent;
	const processMessage = (0, _invdev_react_headless.useThread)((s) => s.processMessage);
	const cancelMessage = (0, _invdev_react_headless.useThread)((s) => s.cancelMessage);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	const ownRef = (0, react.useRef)(null);
	const textareaRef = inputRef ?? ownRef;
	const selectedThreadId = (0, _invdev_react_headless.useThreadList)((s) => s.selectedThreadId);
	const { layout } = useLayoutContext();
	useAutoFocus(textareaRef, {
		enabled: layout !== "mobile" && !isLoadingMessages,
		focusKey: selectedThreadId
	});
	const handleSubmit = () => {
		if (!textContent.trim() || isRunning || isLoadingMessages) return;
		processMessage({
			role: "user",
			content: textContent
		});
		setTextContent("");
	};
	(0, react.useLayoutEffect)(() => {
		const input = textareaRef.current;
		if (!input) return;
		input.style.height = "0px";
		input.style.height = `${Math.max(input.scrollHeight, 24)}px`;
	}, [textContent, textareaRef]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-desktop-welcome-composer", className),
		"data-drafting": (drafting ?? textContent.length > 0) || void 0,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
			ref: textareaRef,
			value: textContent,
			onChange: (e) => setTextContent(e.target.value),
			className: "inv-agent-desktop-welcome-composer__input",
			placeholder,
			rows: 1,
			onKeyDown: (e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					handleSubmit();
				}
			}
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-desktop-welcome-composer__action-bar",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
				onClick: isRunning ? cancelMessage : handleSubmit,
				disabled: !textContent.trim() && !isRunning,
				"aria-label": isRunning ? "Cancel" : "Send",
				icon: isRunning ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Square, {
					size: "1em",
					fill: "currentColor"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ArrowUp, { size: "1em" }),
				size: "extra-small",
				variant: "primary",
				className: "inv-agent-desktop-welcome-composer__submit-button"
			})
		})]
	});
};
//#endregion
//#region src/components/AgentInterface/components/WelcomePrefillChips.tsx
const PrefillChipButton = ({ chip, disabled, onClick }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
	type: "button",
	className: "inv-agent-prefill-chip",
	disabled,
	onClick,
	children: [chip.icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-agent-prefill-chip__icon",
		"aria-hidden": true,
		children: chip.icon
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-agent-prefill-chip__label",
		children: chip.displayText
	})]
});
/**
* Chip row + grid-stacked starters layers for the prefill-chips welcome.
* Layer 1 (chips + default starters) hides via `visibility` while drafting so
* the layout doesn't jump; layer 2 shows the selected chip's contextual
* starters, which submit the completed prompt (see WelcomeScreen).
*/
const WelcomePrefillChips = ({ chips, starters, starterVariant, draft, selectedChip, onChipClick, onContextualSelect, disabled }) => {
	const isDraftEmpty = draft.length === 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-agent-welcome-screen__desktop-starters inv-agent-welcome-screen__starters-layers",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-welcome-screen__starters-layer",
			"data-hidden": !isDraftEmpty || void 0,
			"aria-hidden": !isDraftEmpty || void 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-welcome-screen__chip-row",
				children: chips.map((chip, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefillChipButton, {
					chip,
					disabled,
					onClick: () => onChipClick(chip)
				}, `${chip.displayText}-${index}`))
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarter, {
				starters,
				variant: starterVariant
			})]
		}), selectedChip && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-welcome-screen__starters-layer",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarter, {
				starters: selectedChip.completions,
				variant: "long",
				onSelect: onContextualSelect
			})
		})]
	});
};
//#endregion
//#region src/components/AgentInterface/Thread.tsx
const ThreadContainer = ({ children, className }) => {
	const { layout } = useLayoutContext();
	const isMobile = layout === "mobile";
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const { setIsSidebarOpen } = useAgentInterfaceStore((state) => ({ setIsSidebarOpen: state.setIsSidebarOpen }));
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	const { containerRef, chatPanelRef, detailedViewPanelRef, isDragging, handleResize, handleResizeStep, handleDragStart, handleDragEnd, getResizeAria } = useDetailedViewResize({
		isDetailedViewActive,
		isMobile,
		setIsSidebarOpen
	});
	const chatPanelId = (0, react.useId)();
	const detailPanelId = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-thread-container", className, { "inv-agent-thread-container--detailed-view-active": isDetailedViewActive }),
		style: { visibility: isLoadingMessages ? "hidden" : void 0 },
		children: [isLoadingMessages && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AmbientLoader, {
			className: "inv-agent-thread-container__loading",
			label: "Loading conversation…"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-thread-wrapper",
			ref: containerRef,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: chatPanelRef,
				id: chatPanelId,
				className: (0, clsx.default)("inv-agent-thread-chat-panel", { "inv-agent-thread-chat-panel--animating": !isDragging }),
				children: [children, isMobile && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewOverlay, {})]
			}), !isMobile && isDetailedViewActive && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResizableSeparator, {
				onResize: handleResize,
				onResizeStep: handleResizeStep,
				onDragStart: handleDragStart,
				onDragEnd: handleDragEnd,
				getAriaValues: getResizeAria,
				controlsId: `${chatPanelId} ${detailPanelId}`,
				ariaLabel: "Resize chat panel"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: detailedViewPanelRef,
				id: detailPanelId,
				className: (0, clsx.default)("inv-agent-thread-detailed-view-panel", { "inv-agent-thread-detailed-view-panel--animating": !isDragging }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailedViewPortalTarget, {})
			})] })]
		})]
	});
};
const ScrollArea = ({ children, className, scrollVariant = "user-message-anchor", userMessageSelector = ".inv-agent-thread-message-user, .inv-shell-thread-message-user", scrollOnLoad = true }) => {
	const ref = (0, react.useRef)(null);
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	useScrollToBottom({
		ref,
		lastMessage: messages[messages.length - 1] || { id: "" },
		scrollVariant,
		userMessageSelector,
		isRunning,
		isLoadingMessages,
		scrollOnLoad
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-agent-thread-scroll-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref,
			className: (0, clsx.default)("inv-agent-thread-scroll-area", { "inv-agent-thread-scroll-area--user-message-anchor": scrollVariant === "user-message-anchor" }, className),
			children
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollToLatest, { scrollRef: ref })]
	});
};
const AssistantMessageContainer = ({ children, className }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-thread-message-assistant", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-thread-message-assistant__content",
			children
		})
	});
};
const UserMessageContainer = ({ children, className }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-thread-message-user", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-thread-message-user__content",
			children
		})
	});
};
const AssistantMessageContent = ({ message, allMessages, isLast }) => {
	const activities = (0, _invdev_react_headless.useToolActivities)(message, allMessages);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [message.content && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, {
		textMarkdown: message.content,
		className: "inv-agent-thread-message-assistant__text"
	}), activities.map((activity, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineEntry, {
		activity,
		isLast: isLast && idx === activities.length - 1,
		detailedViewPanel: DetailedViewPanel
	}, activity.id))] });
};
const RenderMessage = (0, react.memo)(({ message, className, allMessages, assistantMessage: CustomAssistantMessage, userMessage: CustomUserMessage, isStreaming, isLast }) => {
	if (message.role === "tool") return null;
	if (message.role === "assistant") {
		if (CustomAssistantMessage) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomAssistantMessage, {
			message,
			isStreaming
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantMessageContainer, {
			className,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantMessageContent, {
				message,
				allMessages,
				isLast
			})
		});
	}
	if (message.role === "user") {
		if (CustomUserMessage) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomUserMessage, { message });
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserMessageContainer, {
			className,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UserMessageContent, { message })
		});
	}
	return null;
});
const MessageLoading = () => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-message-loading",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotMatrixLoader, { variant: "compact" })
	});
};
const ThreadError = () => {
	const threadError = (0, _invdev_react_headless.useThread)((s) => s.threadError);
	if (!threadError) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-error",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Callout, {
			variant: "danger",
			title: "Something went wrong",
			description: threadError.message || "An unexpected error occurred. Please try again."
		})
	});
};
/**
* Groups a message list into turns: a run of consecutive assistant/tool
* messages becomes ONE group; every other message (user, system, …) stands alone.
* `startIndex` is the group's position in the original list.
*/
function groupIntoTurns(messages) {
	const groups = [];
	let current = null;
	messages.forEach((message, i) => {
		if (message.role === "assistant" || message.role === "tool") {
			if (!current) {
				current = {
					messages: [],
					startIndex: i
				};
				groups.push(current);
			}
			current.messages.push(message);
		} else {
			current = null;
			groups.push({
				messages: [message],
				startIndex: i
			});
		}
	});
	return groups;
}
/**
* A whole turn as one unit. Owned here rather than per-message
* so the tray is a single element keyed by the turn's first segment ({@link Messages})
*/
const InterleavedTurn = ({ segments, allMessages, assistantMessage: CustomAssistantMessage, toolCallTimeline: CustomToolCallTimeline, className, isRunning, lastAssistantId }) => {
	const activeSegments = (0, react.useMemo)(() => {
		const withBody = segments.filter((s) => (s.content?.length ?? 0) > 0 || (s.toolCalls?.length ?? 0) > 0);
		return withBody.length > 0 ? withBody : segments;
	}, [segments]);
	const last = activeSegments[activeSegments.length - 1];
	const turnLive = isRunning && lastAssistantId === last.id;
	const turnActivities = (0, _invdev_react_headless.useToolActivities)((0, react.useMemo)(() => ({
		...activeSegments[0],
		toolCalls: activeSegments.flatMap((s) => s.toolCalls ?? [])
	}), [activeSegments]), allMessages);
	const lastContent = separateContentAndContext(last.content ?? "").content;
	const answer = !turnLive || hasLangSyntax(lastContent) ? last : null;
	const answerMessage = (0, react.useMemo)(() => answer ? {
		...answer,
		toolCalls: []
	} : null, [answer]);
	const steps = (0, react.useMemo)(() => {
		const byCallId = new Map(turnActivities.map((a) => [a.toolCall.id, a]));
		const rows = [];
		const claimed = /* @__PURE__ */ new Set();
		for (const seg of activeSegments) {
			if (seg.id !== answer?.id) {
				const prose = separateContentAndContext(seg.content ?? "").content;
				if (prose) rows.push({
					type: "text",
					id: seg.id,
					text: prose
				});
			}
			for (const tc of seg.toolCalls ?? []) {
				const activity = byCallId.get(tc.id);
				if (activity) {
					rows.push({
						type: "activity",
						activity
					});
					claimed.add(tc.id);
				}
			}
		}
		for (const activity of turnActivities) if (!claimed.has(activity.toolCall.id)) rows.push({
			type: "activity",
			activity
		});
		return rows;
	}, [
		activeSegments,
		turnActivities,
		answer?.id
	]);
	const matched = getMatchedRendererActivities((0, _invdev_react_headless.useArtifactRendererRegistry)(), turnActivities);
	const answerStarted = !!answer && lastContent.length > 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		turnActivities.length > 0 && (CustomToolCallTimeline ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomToolCallTimeline, {
			activities: turnActivities,
			steps,
			isLast: turnLive,
			awaitingResponse: turnLive && !answerStarted
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCallTimeline, {
			activities: turnActivities,
			steps,
			isLast: turnLive,
			forceDefault: true,
			awaitingResponse: turnLive && !answerStarted
		})),
		matched.map((activity) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimelineEntry, {
			activity,
			isLast: turnLive,
			fallbackToDefault: false
		}, activity.id)),
		answer && answerMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_headless.MessageProvider, {
			message: answerMessage,
			children: CustomAssistantMessage ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomAssistantMessage, {
				message: answerMessage,
				isStreaming: isRunning && lastAssistantId === answer.id
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantMessageContainer, {
				className,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantMessageContent, {
					message: answerMessage,
					allMessages,
					isLast: isRunning && lastAssistantId === answer.id
				})
			})
		}, answer.id)
	] });
};
/** Renders one turn (a group from {@link groupIntoTurns}). */
const RenderGroup = ({ group, allMessages, assistantMessage: CustomAssistantMessage, toolCallTimeline, userMessage, className, isRunning, lastAssistantId }) => {
	const assistants = group.filter((m) => m.role === "assistant");
	const message = group[0];
	return assistants.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InterleavedTurn, {
		segments: assistants,
		allMessages,
		assistantMessage: CustomAssistantMessage,
		toolCallTimeline,
		className,
		isRunning,
		lastAssistantId
	}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_headless.MessageProvider, {
		message,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderMessage, {
			message,
			allMessages,
			assistantMessage: CustomAssistantMessage,
			userMessage,
			isStreaming: isRunning && message.id === lastAssistantId,
			isLast: message.id === lastAssistantId,
			className
		})
	}, message.id);
};
const Messages = ({ className, loader, assistantMessage, userMessage, toolCallTimeline }) => {
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const threadError = (0, _invdev_react_headless.useThread)((s) => s.threadError);
	const groups = (0, react.useMemo)(() => groupIntoTurns(messages), [messages]);
	const lastAssistantId = (0, react.useMemo)(() => getLastAssistantMessageId(messages), [messages]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-thread-messages", className),
		children: [
			groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RenderGroup, {
				group: group.messages,
				allMessages: messages,
				assistantMessage,
				userMessage,
				toolCallTimeline,
				className,
				isRunning,
				lastAssistantId
			}, group.messages[0].id)),
			isRunning && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: loader }),
			!isRunning && threadError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadError, {})
		]
	});
};
const ThreadHeader = ({ children, className }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-thread-header", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-agent-thread-header__title" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-thread-header__actions",
			children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceToggleButton, {})]
		})]
	});
};
const WorkspaceToggleButton = () => {
	const artifacts = (0, _invdev_react_headless.useArtifactList)();
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const { workspaceToggle } = useAgentInterfaceLabels();
	const { isWorkspaceOpen, setIsWorkspaceOpen } = useAgentInterfaceStore((state) => ({
		isWorkspaceOpen: state.isWorkspaceOpen,
		setIsWorkspaceOpen: state.setIsWorkspaceOpen
	}));
	const hasArtifacts = Object.keys(artifacts).length > 0;
	if (!hasArtifacts || isDetailedViewActive) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceTooltip, {
		content: workspaceToggle,
		side: "left",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GalleryHorizontalEndIcon, { size: "1em" }),
			onClick: () => {
				if (hasArtifacts) setIsWorkspaceOpen(!isWorkspaceOpen);
			},
			size: "small",
			variant: "tertiary",
			"aria-label": isWorkspaceOpen ? "Collapse workspace" : "Expand workspace",
			className: "inv-agent-thread-header__workspace-toggle-button"
		})
	});
};
//#endregion
//#region src/components/Skeleton/Skeleton.tsx
function SkeletonBar({ height, width, borderRadius }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-skeleton-bar",
		style: {
			height,
			width,
			...borderRadius ? { borderRadius } : {}
		}
	});
}
function Skeleton({ count = 1, height = "16px", width = "100%", borderRadius, className }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-skeleton-stack", className),
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
			height,
			width,
			borderRadius
		}, i))
	});
}
function PieChartSkeleton({ size = 200, legendItems = 4, variant = "pie", appearance = "circular" }) {
	const isSemi = appearance === "semiCircular";
	const isDonut = variant === "donut";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-skeleton-pie-chart-wrapper",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-pie-chart-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-skeleton-pie-chart-shape", isSemi && isDonut ? "inv-skeleton-pie-chart-semi-donut" : isSemi ? "inv-skeleton-pie-chart-semi" : isDonut ? "inv-skeleton-pie-chart-donut" : void 0),
				style: {
					width: size,
					height: isSemi ? size / 2 : size
				}
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-pie-chart-legend",
			children: Array.from({ length: legendItems }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-skeleton-pie-chart-legend-item",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-skeleton-pie-chart-legend-dot" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "12px",
					width: `${50 + i * 15 % 40}%`
				})]
			}, i))
		})]
	});
}
function TableSkeleton({ rows = 5, columns = 4 }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-skeleton-table",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-table-row",
			style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
			children: Array.from({ length: columns }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-skeleton-table-cell", "inv-skeleton-table-cell-short"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "14px",
					width: "100%"
				})
			}, `h-${i}`))
		}), Array.from({ length: rows }, (_, ri) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-table-row",
			style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
			children: Array.from({ length: columns }, (_, ci) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-skeleton-table-cell",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "14px",
					width: `${50 + (ri * 7 + ci * 13) % 40}%`
				})
			}, `c-${ri}-${ci}`))
		}, `r-${ri}`))]
	});
}
//#endregion
//#region src/components/AgentInterface/ThreadList.tsx
const THREAD_SKELETON_WIDTHS = [
	"78%",
	"62%",
	"86%",
	"70%"
];
const ThreadListSkeleton = () => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: "inv-agent-thread-list-skeleton",
	role: "status",
	"aria-live": "polite",
	"aria-label": "Loading threads",
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-list-skeleton__group",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Skeleton, {
			height: "12px",
			width: "48px"
		})
	}), THREAD_SKELETON_WIDTHS.map((width, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-list-skeleton__row",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Skeleton, {
			height: "14px",
			width
		})
	}, `${width}-${index}`))]
});
const ThreadButton = ({ id, title, className }) => {
	const selectThread = (0, _invdev_react_headless.useThreadList)((s) => s.selectThread);
	const deleteThread = (0, _invdev_react_headless.useThreadList)((s) => s.deleteThread);
	const selectedThreadId = (0, _invdev_react_headless.useThreadList)((s) => s.selectedThreadId);
	const { isSidebarOpen, setIsSidebarOpen } = useAgentInterfaceStore((state) => ({
		isSidebarOpen: state.isSidebarOpen,
		setIsSidebarOpen: state.setIsSidebarOpen
	}));
	const { layout } = useLayoutContext();
	const nav = useOptionalNav();
	const [isActionsOpen, setIsActionsOpen] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-thread-button", {
			"inv-agent-thread-button--selected": selectedThreadId === id,
			"inv-agent-thread-button--actions-open": isActionsOpen
		}, className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
			className: "inv-agent-thread-button-title",
			onClick: () => {
				if (layout === "mobile") setIsSidebarOpen(!isSidebarOpen);
				selectThread(id);
				if (nav && nav.path !== void 0) nav.navigate(void 0);
			},
			children: title
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dropdown_menu.Root, {
			open: isActionsOpen,
			onOpenChange: setIsActionsOpen,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Trigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					className: "inv-agent-thread-button-dropdown-trigger",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.EllipsisIcon, { size: "1em" }),
					size: "2-extra-small",
					variant: "tertiary",
					"aria-label": "Thread actions"
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Content, {
				className: "inv-agent-thread-button-dropdown-menu",
				side: "bottom",
				align: "start",
				sideOffset: 4,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dropdown_menu.Item, {
					asChild: true,
					onSelect: () => {
						deleteThread(id);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						buttonType: "destructive",
						className: "inv-agent-thread-button-dropdown-menu-item",
						iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Trash2Icon, { size: "1em" }),
						size: "extra-small",
						variant: "tertiary",
						children: "Delete"
					})
				})
			}) })]
		})]
	});
};
const ThreadList = ({ className }) => {
	const threads = (0, _invdev_react_headless.useThreadList)((s) => s.threads);
	const isLoadingThreads = (0, _invdev_react_headless.useThreadList)((s) => s.isLoadingThreads);
	const loadThreads = (0, _invdev_react_headless.useThreadList)((s) => s.loadThreads);
	const [hasRequestedThreads, setHasRequestedThreads] = (0, react.useState)(false);
	const [scrollMasks, setScrollMasks] = (0, react.useState)({
		top: false,
		bottom: false
	});
	const listRef = (0, react.useRef)(null);
	const updateScrollMasks = (0, react.useCallback)(() => {
		const list = listRef.current;
		if (!list) return;
		const maxScrollTop = list.scrollHeight - list.clientHeight;
		const nextMasks = {
			top: maxScrollTop > 0 && list.scrollTop > 1,
			bottom: maxScrollTop > 0 && list.scrollTop < maxScrollTop - 1
		};
		setScrollMasks((current) => current.top === nextMasks.top && current.bottom === nextMasks.bottom ? current : nextMasks);
	}, []);
	(0, react.useEffect)(() => {
		setHasRequestedThreads(true);
		loadThreads();
	}, []);
	(0, react.useEffect)(() => {
		const list = listRef.current;
		if (!list) return;
		updateScrollMasks();
		const resizeObserver = new ResizeObserver(updateScrollMasks);
		resizeObserver.observe(list);
		const mutationObserver = new MutationObserver(updateScrollMasks);
		mutationObserver.observe(list, {
			childList: true,
			subtree: true
		});
		list.addEventListener("scroll", updateScrollMasks, { passive: true });
		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			list.removeEventListener("scroll", updateScrollMasks);
		};
	}, [updateScrollMasks]);
	const showSkeleton = !hasRequestedThreads || isLoadingThreads;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: listRef,
		className: (0, clsx.default)("inv-agent-thread-list", {
			"inv-agent-thread-list--mask-top": scrollMasks.top,
			"inv-agent-thread-list--mask-bottom": scrollMasks.bottom
		}, className),
		children: showSkeleton ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadListSkeleton, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-agent-thread-list-content",
			children: [threads.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-agent-thread-list-group",
				children: "Threads"
			}), threads.map((thread) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadButton, {
				id: thread.id,
				title: thread.title
			}, thread.id))]
		})
	});
};
//#endregion
//#region src/components/AgentInterface/WelcomeGlow.tsx
const WelcomeGlowContext = (0, react.createContext)(false);
const WelcomeGlowProvider = ({ children, enabled }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WelcomeGlowContext.Provider, {
	value: enabled,
	children
});
/**
* Positions the optional welcome glow around a custom composer. The animation
* is enabled by the nearest <AgentInterface.Welcome glowAnimation> ancestor.
*/
const WelcomeGlow = ({ children, className }) => {
	if (!(0, react.useContext)(WelcomeGlowContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-welcome-glow", className),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "inv-agent-welcome-glow__blob inv-agent-welcome-glow__blob--accent"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "inv-agent-welcome-glow__blob inv-agent-welcome-glow__blob--foreground"
			}),
			children
		]
	});
};
//#endregion
//#region src/components/AgentInterface/_shared/utils/welcomePrefill.ts
/**
* Joins a contextual-starter prompt onto the current draft, inserting a single
* space separator unless the draft is empty or already ends with a space.
* (Prefill chips end their prompt with a trailing space on purpose.)
*/
const appendStarterPrompt = (draft, prompt) => {
	return `${draft}${draft.length > 0 && !draft.endsWith(" ") ? " " : ""}${prompt}`;
};
/** Composes a contextual starter with the current draft and submits it. */
const submitStarterPrompt = (processMessage, draft, prompt) => processMessage({
	role: "user",
	content: appendStarterPrompt(draft, prompt)
});
//#endregion
//#region src/components/AgentInterface/WelcomeScreen.tsx
/**
* Type guard to check if image is a URL object
*/
const isImageUrl = (image) => {
	return typeof image === "object" && image !== null && "url" in image;
};
const WelcomeScreen = (props) => {
	const { className, glowAnimation = false } = props;
	const fromCtx = useStartersFromContext();
	const ownStarters = "starters" in props ? props.starters : void 0;
	const ownVariant = "starterVariant" in props ? props.starterVariant : void 0;
	const starters = ownStarters ?? fromCtx.starters ?? [];
	const starterVariant = ownVariant ?? fromCtx.starterVariant ?? "long";
	const promptTemplates = ("promptTemplates" in props ? props.promptTemplates : void 0) ?? [];
	const hasChips = promptTemplates.length > 0;
	const messages = (0, _invdev_react_headless.useThread)((s) => s.messages);
	const isLoadingMessages = (0, _invdev_react_headless.useThread)((s) => s.isLoadingMessages);
	const isRunning = (0, _invdev_react_headless.useThread)((s) => s.isRunning);
	const processMessage = (0, _invdev_react_headless.useThread)((s) => s.processMessage);
	const [draft, setDraft] = (0, react.useState)("");
	const [selectedChip, setSelectedChip] = (0, react.useState)(null);
	const inputRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		setDraft("");
		setSelectedChip(null);
	}, [(0, _invdev_react_headless.useThreadList)((s) => s.selectedThreadId)]);
	if (!isChatEmpty$1({
		isLoadingMessages,
		messages
	})) return null;
	if ("children" in props && props.children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WelcomeGlowProvider, {
		enabled: glowAnimation,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-agent-welcome-screen", className, { "inv-agent-welcome-screen--animated": glowAnimation }),
			children: props.children
		})
	});
	const { title, description, image } = props;
	const renderImage = () => {
		if (!image) return null;
		if (isImageUrl(image)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src: image.url,
			alt: title || "",
			className: "inv-agent-welcome-screen__image"
		});
		return image;
	};
	const handleDraftChange = (value) => {
		setDraft(value);
		if (!value) setSelectedChip(null);
	};
	const handleChipClick = (chip) => {
		if (isRunning) return;
		setDraft(chip.prompt);
		setSelectedChip(chip);
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		requestAnimationFrame(() => {
			input.setSelectionRange(chip.prompt.length, chip.prompt.length);
		});
	};
	const handleContextualSelect = (starter) => {
		submitStarterPrompt(processMessage, draft, starter.prompt);
		setDraft("");
		setSelectedChip(null);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WelcomeGlowProvider, {
		enabled: glowAnimation,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-agent-welcome-screen", "inv-agent-welcome-screen--with-composer", className, { "inv-agent-welcome-screen--animated": glowAnimation }),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-welcome-screen__header",
				children: [image && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-agent-welcome-screen__image-container",
					children: renderImage()
				}), (title || description) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-agent-welcome-screen__content",
					children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						className: "inv-agent-welcome-screen__title",
						children: title
					}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "inv-agent-welcome-screen__description",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-welcome-screen__composer-starters-container",
				"data-has-prefill-chips": hasChips && draft.length === 0 || void 0,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-agent-welcome-screen__desktop-composer",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WelcomeGlow, { children: hasChips ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DesktopWelcomeComposer, {
						value: draft,
						onChange: handleDraftChange,
						drafting: draft.length > 0 && !selectedChip,
						inputRef
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DesktopWelcomeComposer, {}) })
				}), hasChips ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WelcomePrefillChips, {
					chips: promptTemplates,
					starters,
					starterVariant,
					draft,
					selectedChip,
					onChipClick: handleChipClick,
					onContextualSelect: handleContextualSelect,
					disabled: isRunning
				}) : starters.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-agent-welcome-screen__desktop-starters",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversationStarter, {
						starters,
						variant: starterVariant
					})
				})]
			})]
		})
	});
};
//#endregion
//#region src/components/AgentInterface/Workspace.tsx
/**
* Per-thread workspace rail (right edge of the layout) listing the artifacts
* registered in the active thread.
*
* - Renders nothing while the registry is empty — drop-in users without
*   artifact renderers never see it. Visibility is controlled by the header
*   workspace toggle.
* - Lists every registered artifact, grouped into one section per
*   `artifactCategories` entry configured on `<AgentInterface>`; a single
*   "Artifacts" section lists everything when no categories are configured.
*   There are no tabs or filtering — the rail shows it all.
* - Item click activates the corresponding DetailedView; the rail closes while
*   a DetailedView is open.
* - Rendered only in the thread view — hidden on Route pages and the
*   artifact browser. Hidden on mobile.
*
* Modes: A (omit → default above) and C (children replace the rail).
*
* @category Components
*/
const Workspace = ({ className, children }) => {
	if (children != null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultWorkspace, { className });
};
const DefaultWorkspace = ({ className }) => {
	const { isWorkspaceOpen, setIsWorkspaceOpen } = useAgentInterfaceStore((state) => ({
		isWorkspaceOpen: state.isWorkspaceOpen,
		setIsWorkspaceOpen: state.setIsWorkspaceOpen
	}));
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const { layout } = useLayoutContext();
	const categories = (0, _invdev_react_headless.useArtifactCategories)();
	const all = (0, _invdev_react_headless.useArtifactList)();
	const { workspaceToggle } = useAgentInterfaceLabels();
	const entries = latestPerId(all);
	const shouldShowWorkspace = isWorkspaceOpen && !isDetailedViewActive;
	(0, react.useEffect)(() => {
		if (isDetailedViewActive && isWorkspaceOpen) setIsWorkspaceOpen(false);
	}, [
		isDetailedViewActive,
		isWorkspaceOpen,
		setIsWorkspaceOpen
	]);
	if (entries.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [layout === "mobile" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-agent-workspace-sidebar__overlay", { "inv-agent-workspace-sidebar__overlay--collapsed": !shouldShowWorkspace }),
		onClick: () => setIsWorkspaceOpen(false)
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-agent-workspace-sidebar", { "inv-agent-workspace-sidebar--collapsed": !shouldShowWorkspace }, className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-workspace-sidebar__header",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
				className: "inv-agent-workspace-sidebar__title",
				children: workspaceToggle
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-workspace-sidebar__content",
			children: categories.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceSections, {
				categories,
				entries
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceSection, { entries })
		})]
	})] });
};
const WorkspaceSections = ({ categories, entries }) => {
	const visibleCategories = categories.filter((category) => entries.some((entry) => entryMatchesCategory(entry, category)));
	const uncategorized = entries.filter((entry) => !categories.some((category) => entryMatchesCategory(entry, category)));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [visibleCategories.map((category) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceSection, { entries: entries.filter((entry) => entryMatchesCategory(entry, category)) }, category.name)), uncategorized.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceSection, { entries: uncategorized }, "__uncategorized__")] });
};
const WorkspaceSection = ({ entries, emptyHint }) => {
	if (entries.length === 0) {
		if (!emptyHint) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-agent-workspace-sidebar__section-empty",
			children: emptyHint
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
		className: "inv-agent-workspace-sidebar__list",
		children: entries.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceItem, { entry }, entry.id))
	});
};
const WorkspaceItem = ({ entry }) => {
	const viewId = (0, _invdev_react_headless.artifactViewId)(entry.id, entry.version);
	const { isActive } = (0, _invdev_react_headless.useDetailedView)(viewId);
	const store = (0, _invdev_react_headless.useDetailedViewStore)();
	const onClick = () => store.getState().setActiveDetailedView(viewId);
	const icon = useArtifactIcon(entry.type);
	const updatedAt = formatArtifactUpdatedAt(entry.updatedAt);
	const metadata = [useArtifactTypeLabel(entry.type), updatedAt].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": isActive,
		className: (0, clsx.default)("inv-agent-workspace-sidebar__item", { "inv-agent-workspace-sidebar__item--active": isActive }),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-workspace-sidebar__item-icon",
			children: icon
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: "inv-agent-workspace-sidebar__item-body",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-workspace-sidebar__item-label",
				children: entry.heading
			}), metadata && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-agent-workspace-sidebar__item-meta",
				children: metadata
			})]
		})]
	}) });
};
/** Picks the latest version (highest version number, kept as the last element after sort). */
function latestPerId(registry) {
	return Object.values(registry).map((versions) => versions[versions.length - 1]).filter((entry) => entry !== void 0);
}
function entryMatchesCategory(entry, category) {
	return category.filter.type.includes(entry.type);
}
//#endregion
//#region src/components/AgentInterface/AgentInterface.tsx
const SLOT_KEY_BY_TYPE = new Map([
	[SidebarSlot, "sidebar"],
	[SidebarHeader, "sidebarHeader"],
	[MobileHeader, "mobileHeader"],
	[ThreadHeader, "threadHeader"],
	[WelcomeScreen, "welcome"],
	[Composer, "composer"],
	[Workspace, "workspace"]
]);
const isDev = () => typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production";
function extractSlots(children) {
	const result = {
		routes: [],
		rest: []
	};
	react.Children.forEach(children, (child) => {
		if (!(0, react.isValidElement)(child)) {
			result.rest.push(child);
			return;
		}
		if (child.type === Route) {
			result.routes.push(child);
			return;
		}
		const key = SLOT_KEY_BY_TYPE.get(child.type);
		if (!key) {
			result.rest.push(child);
			return;
		}
		if (result[key]) {
			if (isDev()) console.warn(`[AgentInterface] Multiple <AgentInterface.${key}> slot children — using the first; ignoring the rest.`);
			return;
		}
		result[key] = child;
	});
	return result;
}
const DummyThemeProvider = ({ children }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
const AgentInterface = ((props) => {
	const { storage, llm, artifactRenderers, artifactCategories, artifactAutoOpen, componentLibrary, components, theme, disableThemeProvider, logoUrl, agentName, labels, starters, starterVariant, path, defaultPath, onNavigate, scrollVariant, scrollOnLoad, children } = props;
	const slots = (0, react.useMemo)(() => extractSlots(children), [children]);
	if (slots.sidebar && slots.sidebarHeader) {
		if (isDev()) console.warn("[AgentInterface] <AgentInterface.SidebarHeader> at top level is ignored because <AgentInterface.Sidebar> is provided. Put SidebarHeader inside Sidebar instead.");
		slots.sidebarHeader = void 0;
	}
	const resolvedAssistantMessage = (0, react.useMemo)(() => {
		if (components?.AssistantMessage) return components.AssistantMessage;
		if (componentLibrary) {
			const Cmp = ({ message }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GenUIAssistantMessage, {
				message,
				library: componentLibrary
			});
			return Cmp;
		}
	}, [components?.AssistantMessage, componentLibrary]);
	const resolvedUserMessage = (0, react.useMemo)(() => {
		if (components?.UserMessage) return components.UserMessage;
		if (componentLibrary) {
			const Cmp = ({ message }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GenUIUserMessage, { message });
			return Cmp;
		}
	}, [components?.UserMessage, componentLibrary]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(disableThemeProvider ? DummyThemeProvider : ThemeProvider, {
		...theme,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_headless.ChatProvider, {
			storage,
			llm,
			artifactRenderers,
			artifactCategories,
			artifactAutoOpen,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NavProvider, {
				path,
				defaultPath,
				onNavigate,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StartersProvider, {
					starters,
					starterVariant,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelsProvider, {
						labels,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceBody, {
							slots,
							logoUrl: logoUrl ?? "",
							agentName: agentName ?? "",
							resolvedAssistantMessage,
							resolvedUserMessage,
							toolCallTimeline: components?.ToolCallTimeline,
							scrollVariant,
							scrollOnLoad
						})
					})
				})
			})
		})
	});
});
const ArtifactViewMobileHeader = ({ artifactId, categoryName }) => {
	const storage = (0, _invdev_react_headless.useArtifactStorage)();
	const selectThread = (0, _invdev_react_headless.useThreadList)((s) => s.selectThread);
	const { navigate } = useNav();
	const [artifact, setArtifact] = (0, react.useState)(null);
	const requestIdRef = (0, react.useRef)(0);
	(0, react.useEffect)(() => {
		if (!storage) {
			setArtifact(null);
			return;
		}
		const requestId = ++requestIdRef.current;
		setArtifact(null);
		storage.get(artifactId).then((a) => {
			if (requestId !== requestIdRef.current) return;
			setArtifact(a);
		}).catch(() => {
			if (requestId !== requestIdRef.current) return;
			setArtifact(null);
		});
	}, [storage, artifactId]);
	const backToList = () => navigate(artifactListPath(categoryName));
	const goToThread = () => {
		if (!artifact) return;
		selectThread(artifact.threadId);
		navigate(void 0);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MobileHeader, {
		menuButton: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			size: "medium",
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ArrowLeft, { size: "1em" }),
			onClick: backToList,
			variant: "secondary",
			"aria-label": "Back to artifacts"
		}),
		agentName: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-agent-mobile-header-agent-name",
			children: artifact?.title ?? ""
		}),
		newChatButton: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			size: "medium",
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.MessageSquare, { size: "1em" }),
			onClick: goToThread,
			variant: "secondary",
			"aria-label": "Go to thread",
			disabled: !artifact
		})
	});
};
const MobileWorkspaceToggleButton = () => {
	const artifacts = (0, _invdev_react_headless.useArtifactList)();
	const { isDetailedViewActive } = (0, _invdev_react_headless.useActiveDetailedView)();
	const { workspaceToggle } = useAgentInterfaceLabels();
	const { isWorkspaceOpen, setIsWorkspaceOpen } = useAgentInterfaceStore((state) => ({
		isWorkspaceOpen: state.isWorkspaceOpen,
		setIsWorkspaceOpen: state.setIsWorkspaceOpen
	}));
	if (!(Object.keys(artifacts).length > 0) || isDetailedViewActive) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentInterfaceTooltip, {
		content: workspaceToggle,
		side: "left",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			size: "medium",
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GalleryHorizontalEndIcon, { size: "1em" }),
			onClick: () => setIsWorkspaceOpen(!isWorkspaceOpen),
			variant: "secondary",
			"aria-label": isWorkspaceOpen ? "Collapse workspace" : "Expand workspace"
		})
	});
};
const AgentInterfaceBody = ({ slots, logoUrl, agentName, resolvedAssistantMessage, resolvedUserMessage, toolCallTimeline, scrollVariant, scrollOnLoad }) => {
	const { path } = useNav();
	const artifactPath = (0, react.useMemo)(() => path === void 0 ? null : parseArtifactPath(path), [path]);
	const activeRoute = (0, react.useMemo)(() => {
		if (path === void 0 || artifactPath) return void 0;
		return slots.routes.find((route) => route.props.path === path);
	}, [
		path,
		artifactPath,
		slots.routes
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Container, {
		logoUrl,
		agentName,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarContainer, { children: slots.sidebar ? slots.sidebar.props.children : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-agent-sidebar-actions",
				children: [slots.sidebarHeader ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarHeader, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-agent-sidebar-primary-actions",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(NewChatButton, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactNav, { className: "inv-agent-sidebar-artifact-nav" })]
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadList, {}) })] }) }),
			artifactPath ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ThreadContainer, { children: [slots.mobileHeader ?? (artifactPath.kind === "view" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactViewMobileHeader, {
				artifactId: artifactPath.artifactId,
				categoryName: artifactPath.categoryName
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MobileHeader, {})), artifactPath.kind === "list" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactBrowserPage, { categoryName: artifactPath.categoryName }, artifactPath.categoryName ?? "__all__") : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArtifactViewPage, {
				artifactId: artifactPath.artifactId,
				categoryName: artifactPath.categoryName
			})] }) : activeRoute ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadContainer, { children: activeRoute.props.children }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ThreadContainer, { children: [
				slots.mobileHeader ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MobileHeader, { actions: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MobileWorkspaceToggleButton, {}) }),
				slots.threadHeader ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThreadHeader, {}),
				slots.welcome,
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollArea, {
					scrollVariant,
					scrollOnLoad,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Messages, {
						loader: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MessageLoading, {}),
						assistantMessage: resolvedAssistantMessage,
						userMessage: resolvedUserMessage,
						toolCallTimeline
					})
				}),
				slots.composer ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Composer, {})
			] }), slots.workspace ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Workspace, {})] }),
			slots.rest
		]
	});
};
AgentInterface.Sidebar = SidebarSlot;
AgentInterface.SidebarHeader = SidebarHeader;
AgentInterface.SidebarContent = SidebarContent;
AgentInterface.SidebarSeparator = SidebarSeparator;
AgentInterface.SidebarItem = SidebarItem;
AgentInterface.ArtifactNav = ArtifactNav;
AgentInterface.Workspace = Workspace;
AgentInterface.Route = Route;
AgentInterface.MobileHeader = MobileHeader;
AgentInterface.ThreadHeader = ThreadHeader;
AgentInterface.Welcome = WelcomeScreen;
AgentInterface.WelcomeGlow = WelcomeGlow;
AgentInterface.Composer = Composer;
AgentInterface.NewChatButton = NewChatButton;
AgentInterface.ThreadList = ThreadList;
AgentInterface.Messages = Messages;
AgentInterface.MessageLoading = MessageLoading;
AgentInterface.ScrollArea = ScrollArea;
//#endregion
//#region src/components/_shared/Collapsible.tsx
/**
* Content-agnostic, aria-correct collapsible — the extracted version of the old
* `ToolCodeBlock` (chevron + `aria-expanded`/`aria-controls`, the `--loading`
* label state) so request/response (and anything else) can slot into it.
*
* @category Components
*/
function Collapsible({ label, labelLoading, loading = false, defaultOpen = false, children }) {
	const [isExpanded, setIsExpanded] = (0, react.useState)(defaultOpen);
	const panelId = (0, react.useId)();
	const labelId = (0, react.useId)();
	const shownLabel = loading && labelLoading ? labelLoading : label;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-tool-code-block",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-tool-code-block__header",
			type: "button",
			"aria-expanded": isExpanded,
			"aria-controls": panelId,
			onClick: () => setIsExpanded((v) => !v),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				id: labelId,
				className: (0, clsx.default)("inv-tool-code-block__label", { "inv-tool-code-block__label--loading": loading }),
				children: shownLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: (0, clsx.default)("inv-tool-code-block__chevron", { "inv-tool-code-block__chevron--expanded": isExpanded })
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-tool-code-block__content",
			id: panelId,
			role: "region",
			"aria-labelledby": labelId,
			children
		})]
	});
}
//#endregion
//#region src/components/Buttons/Buttons.tsx
const variantMap$5 = {
	vertical: "inv-buttons-vertical",
	horizontal: "inv-buttons-horizontal"
};
const Buttons = (0, react.forwardRef)((props, ref) => {
	const { className, style, variant = "horizontal", children, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-buttons", variantMap$5[variant], className),
		style,
		...rest,
		children
	});
});
Buttons.displayName = "Buttons";
//#endregion
//#region src/components/Select/Select.tsx
const SelectSizeContext = (0, react.createContext)(null);
const useSelectSizeContext = () => (0, react.useContext)(SelectSizeContext);
const Select = ({ size = "md", ...props }) => {
	const [currentSize, setCurrentSize] = (0, react.useState)(size);
	(0, react.useEffect)(() => {
		setCurrentSize(size);
	}, [size]);
	const contextValue = (0, react.useMemo)(() => ({
		size: currentSize,
		setSize: setCurrentSize
	}), [currentSize]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectSizeContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Root, { ...props })
	});
};
const SelectGroup = (0, react.forwardRef)(({ className, style, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Group, {
	ref,
	className: (0, clsx.default)("inv-select-group", className),
	style,
	...props
}));
const SelectValue = _radix_ui_react_select.Value;
const sizeMap$1 = {
	sm: "inv-select-trigger-sm",
	md: "inv-select-trigger-md",
	lg: "inv-select-trigger-lg"
};
const SelectTrigger = (0, react.forwardRef)(({ className, style, children, hideDropdownIcon, size, ...props }, ref) => {
	const sizeContext = useSelectSizeContext();
	const resolvedSize = size ?? sizeContext?.size ?? "md";
	(0, react.useEffect)(() => {
		if (sizeContext && sizeContext.size !== resolvedSize) sizeContext.setSize(resolvedSize);
	}, [resolvedSize, sizeContext]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_select.Trigger, {
		ref,
		className: (0, clsx.default)("inv-select-trigger", sizeMap$1[resolvedSize], className),
		style,
		...props,
		children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Icon, {
			asChild: true,
			children: !hideDropdownIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, { className: "inv-select-trigger-icon" })
		})]
	});
});
const SelectContent = (0, react.forwardRef)(({ className, children, position = "popper", ...props }, ref) => {
	const { portalThemeClassName } = useTheme();
	const sizeContext = useSelectSizeContext();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Content, {
		ref,
		className: (0, clsx.default)("inv-select-content", sizeContext && `inv-select-content-${sizeContext.size}`, className, portalThemeClassName),
		position,
		sideOffset: 2,
		...props,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Viewport, {
			className: "inv-select-viewport",
			"data-position": position,
			children
		})
	}) });
});
const SelectLabel = (0, react.forwardRef)(({ className, style, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Label, {
	ref,
	className: (0, clsx.default)("inv-select-label", className),
	style,
	...props
}));
const SelectItem = (0, react.forwardRef)(({ className, style, children, showTick = true, textValue, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_select.Item, {
	ref,
	className: (0, clsx.default)("inv-select-item", showTick ? "inv-select-item--with-tick" : "inv-select-item--without-tick", className),
	style,
	...props,
	children: [
		showTick && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-select-item-check-wrapper",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemIndicator, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { className: "inv-select-item-check-icon" }) })
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.ItemText, {
			className: "inv-select-item-text",
			children
		}),
		textValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-select-item-text-value",
			children: textValue
		})
	]
}));
const SelectSeparator = (0, react.forwardRef)(({ className, style, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Separator, {
	ref,
	className: (0, clsx.default)("inv-select-separator", className),
	style,
	...props
}));
//#endregion
//#region src/components/Calendar/utils/helperFn.tsx
const getMonthName = (monthNumber) => {
	switch (monthNumber) {
		case 0: return "January";
		case 1: return "February";
		case 2: return "March";
		case 3: return "April";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "August";
		case 8: return "September";
		case 9: return "October";
		case 10: return "November";
		case 11: return "December";
		default: return "Invalid Month";
	}
};
const getMonthNumber = (monthName) => {
	switch (monthName) {
		case "January": return 0;
		case "February": return 1;
		case "March": return 2;
		case "April": return 3;
		case "May": return 4;
		case "June": return 5;
		case "July": return 6;
		case "August": return 7;
		case "September": return 8;
		case "October": return 9;
		case "November": return 10;
		case "December": return 11;
		default: return -1;
	}
};
//#endregion
//#region src/components/Calendar/components/helperComponents.tsx
const SelectContent$1 = (0, react.forwardRef)(({ className, children, position = "popper", viewportClassName, container, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Portal, {
	container: container || document.body,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Content, {
		ref,
		className: (0, clsx.default)("inv-select-content", className),
		position,
		...props,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_select.Viewport, {
			className: (0, clsx.default)("inv-select-viewport", viewportClassName),
			"data-position": position,
			children
		})
	})
}));
const MonthsDropdown = (props) => {
	const { className, disabled, onChange, options, value, key, "aria-label": ariaLabel, container } = props;
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [containerHeight, setContainerHeight] = (0, react.useState)(0);
	(0, react.useEffect)(() => {
		if (!container) return;
		const targetElement = container.children[0]?.children[0];
		if (!targetElement) return;
		const resizeObserver = new ResizeObserver((0, lodash_es_debounce.default)((entries) => {
			const { width, height } = entries[0]?.contentRect || {};
			setContainerWidth(width || 0);
			setContainerHeight(height || 0);
		}, 100));
		resizeObserver.observe(targetElement);
		return () => {
			resizeObserver.disconnect();
		};
	}, [container]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
		onValueChange: (value) => onChange?.({ target: { value: getMonthNumber(value) } }),
		value: getMonthName(Number(value)),
		disabled,
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, {
			className: (0, clsx.default)("inv-calendar-select-trigger", className),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a month" })
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent$1, {
			container,
			className: "inv-calendar-select-content-months",
			sideOffset: 4,
			alignOffset: 0,
			style: {
				maxHeight: `${containerHeight - 45}px`,
				minWidth: `${containerWidth}px`
			},
			children: options?.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
				value: getMonthName(option.value),
				disabled: option.disabled,
				children: option.label
			}, option.value))
		})]
	}, key);
};
const YearsDropdown = (props) => {
	const { className, disabled, onChange, options, value, key, "aria-label": ariaLabel, container, botType } = props;
	const [containerHeight, setContainerHeight] = (0, react.useState)(0);
	(0, react.useEffect)(() => {
		if (!container) return;
		const targetElement = container.children[0]?.children[0];
		if (!targetElement) return;
		const resizeObserver = new ResizeObserver((0, lodash_es_debounce.default)((entries) => {
			const { height } = entries[0]?.contentRect || {};
			setContainerHeight(height || 0);
		}, 100));
		resizeObserver.observe(targetElement);
		return () => {
			resizeObserver.disconnect();
		};
	}, [container]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
		onValueChange: (value) => onChange?.({ target: { value: Number(value) } }),
		value: String(value),
		disabled,
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, {
			className: (0, clsx.default)("inv-calendar-select-trigger", className),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a month" })
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent$1, {
			container,
			className: "inv-calendar-select-content-years",
			viewportClassName: (0, clsx.default)("inv-calendar-select-viewport", botType === "mobile" && "inv-calendar-select-viewport-mobile"),
			sideOffset: 4,
			alignOffset: -75,
			style: {
				minHeight: `${containerHeight - 45}px`,
				maxHeight: `${containerHeight - 45}px`
			},
			children: options?.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
				value: String(option.value),
				disabled: option.disabled,
				showTick: false,
				className: "inv-calendar-select-item",
				children: option.label
			}, option.value))
		})]
	}, key);
};
//#endregion
//#region src/components/Calendar/utils/styles.tsx
const getDayPickerStyles = (botType) => {
	const defaultClassNames = (0, react_day_picker.getDefaultClassNames)();
	const commonClassNames = {
		root: `${defaultClassNames.root} inv-calendar-root`,
		nav: `${defaultClassNames.nav} ${{
			mobile: "inv-calendar-nav-mobile",
			fullscreen: "inv-calendar-nav-fullscreen",
			tray: "inv-calendar-nav-tray",
			copilot: "inv-calendar-nav-copilot"
		}[botType]}`,
		dropdowns: `${defaultClassNames.dropdowns} ${{
			mobile: "inv-calendar-dropdowns-mobile",
			fullscreen: "inv-calendar-dropdowns-fullscreen",
			tray: "inv-calendar-dropdowns-tray",
			copilot: "inv-calendar-dropdowns-copilot"
		}[botType]}`,
		month_caption: `inv-calendar-month-caption`,
		month_grid: `inv-calendar-month-grid`,
		button_next: `inv-calendar-button-next `,
		button_previous: `inv-calendar-button-previous `,
		today: `inv-calendar-today`,
		disabled: `inv-calendar-disabled`,
		weekdays: `inv-calendar-weekdays`,
		weekday: `inv-calendar-weekday`,
		chevron: `inv-calendar-chevron`,
		month: `inv-calendar-month`,
		months_dropdown: `inv-calendar-months-dropdown`,
		years_dropdown: `inv-calendar-years-dropdown`,
		footer: `inv-calendar-footer`
	};
	return {
		DateSingleClasses: {
			...commonClassNames,
			day_button: "inv-calendar-single-day-button",
			day: "inv-calendar-single-day",
			selected: "inv-calendar-single-day-selected"
		},
		DateRangeClasses: {
			...commonClassNames,
			selected: "",
			range_start: "inv-calendar-range-start",
			range_middle: "inv-calendar-range-middle",
			range_end: "inv-calendar-range-end",
			day_button: "inv-calendar-range-day-button",
			day: "inv-calendar-range-day"
		}
	};
};
//#endregion
//#region src/components/Calendar/Calendar.tsx
const Calendar = (0, react.forwardRef)(({ className, classNames, ...props }, ref) => {
	const { layout } = useLayoutContext();
	const { DateSingleClasses, DateRangeClasses } = getDayPickerStyles(layout);
	const containerRef = (0, react.useRef)(null);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: useMultipleRefs(ref, containerRef),
		className: (0, clsx.default)("inv-calendar-container", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_day_picker.DayPicker, {
			captionLayout: "dropdown",
			components: {
				MonthsDropdown: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MonthsDropdown, {
					...props,
					container: containerRef.current
				}),
				YearsDropdown: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YearsDropdown, {
					...props,
					container: containerRef.current
				})
			},
			...props,
			classNames: {
				...props.mode === "single" || props.mode === "multiple" ? DateSingleClasses : DateRangeClasses,
				...classNames
			}
		})
	});
});
//#endregion
//#region src/components/Card/Card.tsx
const variantMap$4 = {
	clear: "inv-card-clear",
	card: "inv-card-card",
	sunk: "inv-card-sunk"
};
const widthMap = {
	standard: "inv-card-standard",
	full: "inv-card-full"
};
const Card = react.default.forwardRef((props, ref) => {
	const { className, children, variant = "card", width = "standard", ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-card", className, variantMap$4[variant], widthMap[width]),
		...rest,
		children
	});
});
Card.displayName = "Card";
//#endregion
//#region src/components/CardHeader/CardHeader.tsx
const CardHeader = (0, react.forwardRef)((props, ref) => {
	const { icon, title, subtitle, actions, className, styles, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-header", className),
		style: styles,
		...rest,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-header-top",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-header-top-left",
				children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-header-top-left-icon",
					children: icon
				}), title]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-header-top-right",
				children: Array.isArray(actions) ? actions.map((action, index) => (0, react.cloneElement)(action, { key: index })) : actions
			})]
		}), subtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-header-bottom",
			children: subtitle
		})]
	});
});
CardHeader.displayName = "CardHeader";
//#endregion
//#region src/context/PrintContext.tsx
const PrintContext = (0, react.createContext)(null);
const usePrintContext = () => {
	return (0, react.useContext)(PrintContext);
};
const PrintContextProvider = ({ children }) => {
	const memoizedValue = (0, react.useMemo)(() => ({}), []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrintContext.Provider, {
		value: memoizedValue,
		children
	});
};
//#endregion
//#region src/components/Charts/Charts.tsx
/**
* @module Charts
* A collection of chart components built on top of Recharts with enhanced styling and theming capabilities.
*/
/**
* Available themes for chart customization
* @constant
* @type {Record<'light' | 'dark', string>}
*/
const THEMES = {
	light: "",
	dark: ".dark"
};
const ChartContext = (0, react.createContext)(null);
/**
* Hook to access chart context
* @throws Error if used outside of ChartContainer
*/
function useChart() {
	const context = (0, react.useContext)(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
/**
* Component that generates theme-specific styles for chart elements
*/
const ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
    ${prefix} [data-chart=${id}] {
    ${colorConfig.map(([_, itemConfig]) => {
		const transformedKey = itemConfig.transformed;
		const themeValue = itemConfig.theme?.[theme];
		const color = typeof themeValue === "string" ? themeValue : themeValue?.color || itemConfig.color;
		const secondaryColor = typeof themeValue === "object" ? themeValue?.secondaryColor : "secondaryColor" in itemConfig ? itemConfig.secondaryColor : void 0;
		return [color ? `  --color-${transformedKey}: ${color};` : null, secondaryColor ? `  --color-${transformedKey}-secondary: ${secondaryColor};` : null].filter(Boolean).join("\n");
	}).filter(Boolean).join("\n")}
    }
    `).join("\n") } });
};
/**
* Container component for charts that provides configuration context and styling
*/
const ChartContainer = (0, react.forwardRef)(({ id, className, children, config, rechartsProps, style, ...props }, ref) => {
	const uniqueId = (0, react.useId)();
	const chartId = `inv-chart-${id || uniqueId.replace(/:/g, "")}`;
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContext.Provider, {
		value: {
			config,
			id: chartId
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			"data-chart": chartId,
			ref,
			className: (0, clsx.default)("inv-chart-container", className),
			style: {
				"--inv-foreground": theme.foreground,
				"--inv-text-neutral-primary": theme.textNeutralPrimary,
				width: "100%",
				height: "100%",
				...style
			},
			...props,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.ResponsiveContainer, {
				width: rechartsProps?.width ?? "100%",
				height: rechartsProps?.height ?? "100%",
				minWidth: rechartsProps?.minWidth ?? 1,
				minHeight: rechartsProps?.minHeight ?? 1,
				initialDimension: rechartsProps?.initialDimension ?? {
					width: 1,
					height: 1
				},
				id: rechartsProps?.id ?? chartId,
				...rechartsProps,
				children
			})]
		})
	});
});
ChartContainer.displayName = "Chart";
/**
* Re-exported Tooltip component from Recharts
*/
const ChartTooltip = recharts.Tooltip;
function ChartTooltipContentRender({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, showPercentage = false }, ref) {
	const { config } = useChart();
	const tooltipLabel = (0, react.useMemo)(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-chart-tooltip-label-heavy", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-chart-tooltip-label", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-chart-tooltip", className),
		children: [!nestLabel && tooltipLabel, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-chart-tooltip-content",
			children: payload.map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey ?? item.name ?? item.dataKey ?? "value"}`);
				const indicatorColor = (color ?? item.payload.fill) || item.color;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)("inv-chart-tooltip-content-item", indicator === "dot" && "inv-chart-tooltip-content-item--dot"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, clsx.default)("inv-chart-tooltip-content-indicator", `inv-chart-tooltip-content-indicator--${indicator}`),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: (0, clsx.default)("inv-chart-tooltip-content-value-wrapper", nestLabel ? "inv-chart-tooltip-content-value-wrapper--nested" : "inv-chart-tooltip-content-value-wrapper--standard"),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "inv-chart-tooltip-content-label",
							children: [nestLabel && tooltipLabel, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: itemConfig?.label || item.name })]
						}), item.value !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: (0, clsx.default)("inv-chart-tooltip-content-value", showPercentage && "percentage"),
							children: [item.value.toLocaleString(), showPercentage ? "%" : ""]
						})]
					})] })
				}, item.dataKey);
			})
		})]
	});
}
const ChartTooltipContent = (0, react.forwardRef)(ChartTooltipContentRender);
ChartTooltipContent.displayName = "ChartTooltip";
/**
* Custom legend content component with enhanced styling
*/
const ChartLegendContent = (0, react.forwardRef)(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
	const { config } = useChart();
	const payloadWithKeys = (0, react.useMemo)(() => payload?.map((item) => ({
		...item,
		uniqueKey: (0, lodash_es.uniqueId)(`chart-legend-${item.dataKey || item.value || ""}-`)
	})), [payload]);
	if (!payload?.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-chart-legend", `inv-chart-legend--${verticalAlign}`, className),
		children: payloadWithKeys?.map((item) => {
			const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.dataKey || "value"}`);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-chart-legend-item",
				children: [itemConfig?.icon && !hideIcon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(itemConfig.icon, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-chart-legend-item-indicator",
					style: { backgroundColor: item.color }
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chart-legend-item-label",
					children: itemConfig?.label
				})]
			}, item.uniqueKey);
		})
	});
});
ChartLegendContent.displayName = "ChartLegend";
/**
* Helper function to extract configuration for a chart element from a payload
*/
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
//#endregion
//#region src/components/Charts/context/SideBarTooltipContext.tsx
const SideBarTooltipContext = (0, react.createContext)(void 0);
const SideBarTooltipProvider = ({ children, isSideBarTooltipOpen, setIsSideBarTooltipOpen, data, setData }) => {
	const value = {
		data,
		isSideBarTooltipOpen,
		setData,
		setIsSideBarTooltipOpen
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipContext.Provider, {
		value,
		children
	});
};
const useSideBarTooltip = () => {
	const context = (0, react.useContext)(SideBarTooltipContext);
	if (context === void 0) throw new Error("useSideBarTooltip must be used within a SideBarTooltipProvider");
	return context;
};
//#endregion
//#region src/components/Charts/hooks/useAutoAngleCalculation.ts
/**
* Calculates the optimal rotation angle and height for X-axis labels using trigonometry.
*
* This hook uses the Pythagorean theorem to determine the optimal angle for rotating
* labels based on the maximum label width and available horizontal space.
*
* Mathematical approach:
* - Hypotenuse = maxLabelWidth (the label length)
* - Base = X_AXIS_PADDING (available horizontal space from left edge to first label)
* - Height = sqrt(hypotenuse² - base²)
* - Angle = atan(height / base) converted to degrees
*
* @param maxLabelWidth - The maximum width of all labels in pixels
* @param enabled - Whether to calculate the angle (typically based on tickVariant)
* @returns Object containing the calculated angle (in degrees) and required height
*/
const useAutoAngleCalculation = (maxLabelWidth, enabled, widthOfData) => {
	return (0, react$1.useMemo)(() => {
		if (!enabled) return {
			angle: 0,
			height: 30
		};
		const base = widthOfData ?? 20;
		const hypotenuse = maxLabelWidth;
		if (base >= hypotenuse) {
			const angleRadians = 0 * Math.PI / 180;
			const height = Math.ceil(hypotenuse * Math.sin(angleRadians));
			return {
				angle: -0,
				height: Math.max(height, 30)
			};
		}
		const heightSquared = hypotenuse * hypotenuse - base * base;
		const height = Math.sqrt(Math.max(0, heightSquared));
		const angleDegrees = Math.atan(height / base) * 180 / Math.PI;
		const finalAngle = Math.max(angleDegrees, 0);
		const finalHeight = finalAngle > angleDegrees ? Math.ceil(hypotenuse * Math.sin(finalAngle * Math.PI / 180)) : Math.ceil(height);
		return {
			angle: -finalAngle,
			height: Math.max(finalHeight + 16, 30)
		};
	}, [
		maxLabelWidth,
		enabled,
		widthOfData
	]);
};
//#endregion
//#region src/components/Charts/hooks/useCanvasContextForLabelSize.ts
/**
* Creates a canvas 2D rendering context and sets its font style.
*
* This hook initializes a canvas element in memory, gets its 2D context,
* and then applies a font style based on the theme. It includes a fallback
* to a default font if the theme property is not available.
*
* @returns The canvas 2D context with the font style applied, or `null` if the
*
*/
const useCanvasContextForLabelSize = () => {
	const { theme: userTheme } = useTheme();
	return (0, react$1.useMemo)(() => {
		const context = document.createElement("canvas").getContext("2d");
		context.font = userTheme.textLabelXs ?? "400 10px/12px Inter";
		return context;
	}, [userTheme.textLabelXs]);
};
//#endregion
//#region src/components/Charts/hooks/useExportChartData.ts
const useExportChartData = ({ type, data, categoryKey, dataKeys, colors, legend, xAxisLabel, yAxisLabel, extraOptions, customDataTransform }) => {
	const printContext = usePrintContext();
	return (0, react$1.useMemo)(() => {
		if (!printContext) return;
		const exportData = {
			type,
			data: customDataTransform ? customDataTransform() : (dataKeys || []).map((key) => ({
				name: key,
				labels: data.map((item) => categoryKey ? String(item[categoryKey]) : ""),
				values: data.map((item) => Number(item[key]))
			})),
			options: {
				chartColors: colors,
				showLegend: legend,
				catAxisTitle: typeof xAxisLabel === "string" ? xAxisLabel : void 0,
				showCatAxisTitle: typeof xAxisLabel === "string",
				valAxisTitle: typeof yAxisLabel === "string" ? yAxisLabel : void 0,
				showValAxisTitle: typeof yAxisLabel === "string",
				...extraOptions
			}
		};
		return JSON.stringify(exportData);
	}, [
		type,
		data,
		dataKeys,
		categoryKey,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel,
		extraOptions,
		customDataTransform,
		printContext
	]);
};
//#endregion
//#region src/components/Charts/hooks/useMaxLabelHeight.tsx
const DEFAULT_HEIGHT = 30;
const useMaxLabelHeight = (data, categoryKey, tickVariant, widthOfGroup = 70) => {
	const { theme: userTheme } = useTheme();
	const maxLabelHeight = (0, react.useMemo)(() => {
		if (typeof window === "undefined" || !data || data.length === 0) return DEFAULT_HEIGHT;
		const largestLabel = data.reduce((max, item) => {
			const label = String(item[categoryKey]);
			if (max.length < label.length) return label;
			return max;
		}, "");
		const [div1, div2, div3] = [
			document.createElement("div"),
			document.createElement("div"),
			document.createElement("div")
		];
		div1.style.font = userTheme.textLabelXs ?? "";
		div1.style.letterSpacing = userTheme.textLabelXsLetterSpacing ?? "";
		div1.style.opacity = "0";
		div1.style.pointerEvents = "none";
		div2.innerText = largestLabel;
		div3.innerText = "a";
		div1.append(div2, div3);
		div1.style.width = `${widthOfGroup}px`;
		div1.style.maxWidth = `${widthOfGroup}px`;
		div1.style.wordBreak = "break-word";
		div1.style.position = "absolute";
		div1.style.visibility = "hidden";
		document.body.append(div1);
		const largestLabelHeight = Math.min(div2.getBoundingClientRect().height, div3.getBoundingClientRect().height * 3);
		div1.remove();
		return largestLabelHeight;
	}, [
		data,
		categoryKey,
		tickVariant,
		widthOfGroup
	]);
	if (tickVariant === "multiLine") return Math.max(maxLabelHeight + 13, DEFAULT_HEIGHT);
	else return DEFAULT_HEIGHT;
};
/**
* Hook to calculate the maximum label height for horizontal bar charts.
* This considers the vertical layout and label width constraints specific to horizontal bars.
* @param data - The chart data
* @param categoryKey - The category key
* @param labelWidth - The available width for labels (full chart width for horizontal bars)
* @returns The calculated label height
*/
const useHorizontalBarLabelHeight = (data, categoryKey, labelWidth) => {
	const { theme: userTheme } = useTheme();
	return (0, react.useMemo)(() => {
		if (typeof window === "undefined" || !data || data.length === 0) return 20;
		const largestLabel = data.reduce((max, item) => {
			const label = String(item[categoryKey]);
			if (max.length < label.length) return label;
			return max;
		}, "");
		const [div1, div2] = [document.createElement("div"), document.createElement("div")];
		div1.style.font = userTheme.textLabelXs ?? "";
		div1.style.letterSpacing = userTheme.textLabelXsLetterSpacing ?? "";
		div1.style.opacity = "0";
		div1.style.pointerEvents = "none";
		div1.style.position = "absolute";
		div1.style.visibility = "hidden";
		div2.innerText = largestLabel;
		div1.append(div2);
		div1.style.width = `${labelWidth}px`;
		div1.style.maxWidth = `${labelWidth}px`;
		div1.style.overflow = "hidden";
		div1.style.whiteSpace = "nowrap";
		div1.style.textOverflow = "ellipsis";
		div1.style.display = "flex";
		div1.style.alignItems = "center";
		document.body.append(div1);
		const calculatedHeight = div2.getBoundingClientRect().height;
		div1.remove();
		return Math.max(calculatedHeight + 8, 24);
	}, [
		data,
		categoryKey,
		labelWidth,
		userTheme.textLabelXs,
		userTheme.textLabelXsLetterSpacing
	]);
};
//#endregion
//#region src/components/Charts/hooks/useMaxLabelWidth.ts
/**
* Calculates the maximum width of all labels in the chart data.
*
* This hook measures the pixel width of each category label and returns
* the maximum width found. It uses a canvas context to accurately measure
* text dimensions based on the current theme's font settings.
*
* @param data - The chart data array
* @param categoryKey - The key in the data object that contains the label text
* @returns The maximum label width in pixels
*/
const useMaxLabelWidth = (data, categoryKey) => {
	const context = useCanvasContextForLabelSize();
	return (0, react$1.useMemo)(() => {
		if (!data || data.length === 0) return 0;
		let maxWidth = 0;
		for (const item of data) {
			const labelValue = String(item[categoryKey] ?? "");
			const width = context.measureText(labelValue).width;
			if (width > maxWidth) maxWidth = width;
		}
		return maxWidth;
	}, [
		data,
		categoryKey,
		context
	]);
};
//#endregion
//#region src/components/Charts/hooks/useTransformKey.tsx
const useTransformedKeys = (keys) => {
	const cacheRef = (0, react.useRef)({});
	return (0, react.useMemo)(() => {
		return keys.reduce((acc, key) => {
			if (!cacheRef.current[key]) cacheRef.current[key] = crypto.randomUUID();
			acc[key] = cacheRef.current[key];
			return acc;
		}, {});
	}, [keys]);
};
//#endregion
//#region src/components/Charts/utils/dataUtils.ts
/**
* This function returns the data keys for the chart, used for the data keys of the chart.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @returns The data keys for the chart.
*/
const getDataKeys = (data, categoryKey) => {
	return Object.keys(data[0] || {}).filter((key) => key !== categoryKey);
};
/**
* This function returns the chart configuration object, used for the chart configuration object of the chart.
* @param dataKeys - The data keys for the chart.
* @param colors - The colors for the chart.
* @param transformedKeys - The transformed keys for the chart.
* @param secondaryColors - The secondary colors for the chart (optional).
* @param icons - The icons for the chart (optional).
* @returns The chart configuration object for the chart.
*/
const get2dChartConfig = (dataKeys, colors, transformedKeys, secondaryColors, icons) => {
	return dataKeys.reduce((config, key, index) => ({
		...config,
		[key]: {
			label: key,
			icon: icons?.[key],
			color: colors[index],
			secondaryColor: secondaryColors?.[index] || colors[dataKeys.length - index - 1],
			transformed: transformedKeys[key]
		}
	}), {});
};
const getCategoricalChartConfig = (data, categoryKey, colors, transformedKeys) => {
	return data.reduce((config, item, index) => {
		const originalKey = String(item[categoryKey]);
		const transformedKey = `key-${transformedKeys[originalKey] ?? originalKey}`;
		return {
			...config,
			[transformedKey]: {
				label: String(item[categoryKey]),
				color: colors[index],
				secondaryColor: colors[data.length - index - 1]
			}
		};
	}, {});
};
/**
* This function returns the legend items for the chart, used for the legend items of the chart.
* @param dataKeys - The data keys for the chart.
* @param colors - The colors for the chart.
* @param icons - The icons for the chart.
* @returns The legend items for the chart.
*/
const getLegendItems = (dataKeys, colors, icons) => {
	return dataKeys.map((key, index) => ({
		key,
		label: key,
		color: colors[index] ?? "#000000",
		icon: icons?.[key]
	}));
};
/**
* This function returns the color value for a specific data key based on its position in the dataKeys array.
* Use this instead of payload.fill to ensure consistent color mapping.
* @param dataKey - The data key to get the color for.
* @param dataKeys - The array of all data keys in the chart.
* @param colors - The array of colors corresponding to the data keys.
* @returns The color value for the specified data key.
*/
const getColorForDataKey = (dataKey, dataKeys, colors) => {
	return colors[dataKeys.indexOf(dataKey)] ?? "#000000";
};
//#endregion
//#region src/components/Charts/utils/PalletUtils.ts
const colorPalettes = {
	ocean: {
		name: "Ocean",
		colors: [
			"#0D47A1",
			"#1565C0",
			"#1976D2",
			"#1E88E5",
			"#2196F3",
			"#42A5F5",
			"#64B5F6",
			"#90CAF9",
			"#BBDEFB",
			"#E3F2FD",
			"#EFF8FF"
		]
	},
	orchid: {
		name: "Orchid",
		colors: [
			"#3A365B",
			"#482E77",
			"#552594",
			"#631DB0",
			"#7014CC",
			"#883BD5",
			"#A062DD",
			"#B88AE6",
			"#CFB1EE",
			"#E7D8F7",
			"#F7EFFF"
		]
	},
	emerald: {
		name: "Emerald",
		colors: [
			"#10451D",
			"#155D27",
			"#1A7431",
			"#208B3A",
			"#25A244",
			"#2DC653",
			"#4AD66D",
			"#6EDE8A",
			"#92E6A7",
			"#B7EFC5",
			"#DCFFE5"
		]
	},
	spectrum: {
		name: "Spectrum",
		colors: [
			"#2171BC",
			"#2681D7",
			"#72A4EB",
			"#A0C0F7",
			"#C2D4F7",
			"#EADDE8",
			"#EEB3B1",
			"#E99492",
			"#E17475",
			"#D75259",
			"#CB253E"
		]
	},
	sunset: {
		name: "Sunset",
		colors: [
			"#0D0887",
			"#42049E",
			"#6A00A8",
			"#900DA4",
			"#B12A90",
			"#CC4678",
			"#E16462",
			"#F1844B",
			"#FCA636",
			"#FCCE25",
			"#FFE06E"
		]
	},
	vivid: {
		name: "Vivid",
		colors: [
			"#FF595E",
			"#FF924C",
			"#FFCA3A",
			"#C5CA30",
			"#8AC926",
			"#36949D",
			"#1982C4",
			"#4267AC",
			"#565AA0",
			"#6A4C93",
			"#63438F"
		]
	}
};
const getPalette = (key) => {
	const palette = colorPalettes[key];
	(0, tiny_invariant.default)(palette, `Palette ${key} not found`);
	return palette;
};
const getDistributedColors = (colors, dataLength) => {
	const midIndex = Math.floor(colors.length / 2);
	if (dataLength === 1) return [colors[midIndex]];
	if (dataLength === 2) return [colors[midIndex - 1], colors[midIndex + 1]];
	const result = [];
	const offset = Math.floor((dataLength - 1) / 2);
	for (let i = 0; i < dataLength; i++) {
		const index = midIndex + (i - offset);
		let actualIndex;
		if (index < 0) actualIndex = colors.length + index % colors.length;
		else if (index >= colors.length) actualIndex = index % colors.length;
		else actualIndex = index;
		result.push(colors[actualIndex]);
	}
	return result;
};
const useChartPalette = ({ chartThemeName, customPalette, themePaletteName, dataLength }) => {
	const { theme } = useTheme();
	const paletteFromTheme = theme[themePaletteName] || theme.defaultChartPalette;
	const paletteFromChartTheme = getPalette(chartThemeName);
	const palette = customPalette || paletteFromTheme || paletteFromChartTheme.colors;
	return (0, react$1.useMemo)(() => {
		return getDistributedColors(palette, dataLength);
	}, [palette, dataLength]);
};
//#endregion
//#region src/components/Charts/utils/styleUtils.ts
/**
* This function returns the formatter for the Y-axis tick values.
* @returns The formatter for the Y-axis tick values.
* internally used by the YAxis component reCharts
*/
const numberTickFormatter = (value) => {
	if (typeof value === "number") {
		const absValue = Math.abs(value);
		if (absValue >= 0xe8d4a51000) return (value / 0xe8d4a51000).toFixed(absValue >= 0x9184e72a000 ? 0 : 1) + "T";
		else if (absValue >= 1e9) return (value / 1e9).toFixed(absValue >= 1e10 ? 0 : 1) + "B";
		else if (absValue >= 1e6) return (value / 1e6).toFixed(absValue >= 1e7 ? 0 : 1) + "M";
		else if (absValue >= 1e3) return (value / 1e3).toFixed(absValue >= 1e4 ? 0 : 1) + "K";
		else {
			if (value % 1 !== 0) return value.toFixed(2);
			return value.toString();
		}
	}
	return String(value);
};
//#endregion
//#region src/components/Charts/hooks/useYAxisLabelWidth.tsx
const DEFAULT_Y_AXIS_WIDTH = 40;
const MIN_Y_AXIS_WIDTH = 20;
const MAX_Y_AXIS_WIDTH = 200;
const LABEL_PADDING = 10;
const useYAxisLabelWidth = (data, dataKeys) => {
	const context = useCanvasContextForLabelSize();
	const [maxLabelWidthReceived, setMaxLabelWidthReceived] = (0, react.useState)(0);
	const maxLabelWidth = (0, react.useMemo)(() => {
		if (typeof window === "undefined" || !data || data.length === 0 || !dataKeys.length) return DEFAULT_Y_AXIS_WIDTH;
		if (!context) return DEFAULT_Y_AXIS_WIDTH;
		let maxWidth = 0;
		dataKeys.forEach((key) => {
			[...new Set(data.map((item) => item[key]).filter((v) => v != null && typeof v === "number"))].forEach((value) => {
				const displayValue = numberTickFormatter(value);
				const textWidth = context.measureText(displayValue).width;
				maxWidth = Math.max(maxWidth, textWidth);
			});
		});
		const totalWidth = Math.ceil(maxWidth) + LABEL_PADDING;
		return Math.max(MIN_Y_AXIS_WIDTH, Math.min(MAX_Y_AXIS_WIDTH, totalWidth));
	}, [
		data,
		dataKeys,
		context
	]);
	const maxLabelWidthRef = (0, react.useRef)(maxLabelWidth);
	maxLabelWidthRef.current = maxLabelWidthReceived || maxLabelWidth;
	const setLabelWidth = (0, react.useCallback)((displayValue) => {
		const textWidth = context.measureText(displayValue).width + LABEL_PADDING;
		setMaxLabelWidthReceived((currentWidth) => Math.max(currentWidth, textWidth));
	}, [context]);
	return {
		yAxisWidth: maxLabelWidthRef.current,
		setLabelWidth
	};
};
//#endregion
//#region src/components/Charts/shared/ActiveDot/ActiveDot.tsx
const ActiveDot = (props) => {
	const { cx, cy, fill, stroke } = props;
	const ref = (0, react.useRef)(null);
	(0, react.useLayoutEffect)(() => {
		if (ref.current) {
			const parent = ref.current.parentElement?.parentElement;
			const dotGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
			const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle1.setAttribute("cx", String(cx));
			circle1.setAttribute("cy", String(cy));
			circle1.setAttribute("r", "4");
			circle1.setAttribute("fill", "var(--inv-foreground)");
			circle1.setAttribute("stroke", "var(--inv-foreground)");
			circle1.setAttribute("stroke-width", "1");
			const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle2.setAttribute("cx", String(cx));
			circle2.setAttribute("cy", String(cy));
			circle2.setAttribute("r", "2");
			circle2.setAttribute("fill", fill || "var(--color-bg)");
			circle2.setAttribute("stroke", stroke || "transparent");
			circle2.setAttribute("stroke-width", "0");
			dotGroup.appendChild(circle1);
			dotGroup.appendChild(circle2);
			if (parent) parent.appendChild(dotGroup);
			return () => {
				dotGroup.remove();
			};
		}
	});
	if (cx === void 0 || cy === void 0 || cx === null || cy === null) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", { ref });
};
//#endregion
//#region src/components/Charts/shared/CartesianGrid/cartesianGrid.tsx
const cartesianGrid = () => gridCartesianGrid({ vertical: false });
const verticalCartesianGrid = () => gridCartesianGrid({ horizontal: false });
const gridCartesianGrid = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.CartesianGrid, {
	vertical: props.vertical ?? true,
	horizontal: props.horizontal ?? true,
	fillOpacity: 1,
	strokeOpacity: 1,
	strokeWidth: 1,
	strokeDasharray: "0",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	stroke: "currentColor",
	className: "inv-chart-cartesian-grid"
});
//#endregion
//#region src/components/Charts/shared/DefaultLegend/hooks/useDefaultLegend.ts
const CHARACTER_WIDTH = 7;
const INDICATOR_WIDTH = 10;
const GAP_WIDTH = 12;
const useDefaultLegend = ({ items, containerWidth, buttonWidth, isExpanded }) => {
	const canvasContext = useCanvasContextForLabelSize();
	const calculateItemWidth = (0, react$1.useMemo)(() => (item) => {
		let displayText = item.label;
		if (item.percentage !== void 0) displayText += ` (${item.percentage.toFixed(1)}%)`;
		if (canvasContext) return canvasContext.measureText(displayText).width + INDICATOR_WIDTH + GAP_WIDTH;
		return displayText.length * CHARACTER_WIDTH + INDICATOR_WIDTH + GAP_WIDTH;
	}, [canvasContext]);
	const { visibleItems, hasMoreItems } = (0, react$1.useMemo)(() => {
		if (!containerWidth || items.length === 0) return {
			visibleItems: items,
			hasMoreItems: false
		};
		const availableWidth = containerWidth - (buttonWidth ?? 0);
		let currentWidth = 0;
		let visibleCount = 0;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (!item) continue;
			const itemWidth = calculateItemWidth(item);
			const requiredWidth = visibleCount > 0 ? itemWidth + GAP_WIDTH : itemWidth;
			if (currentWidth + requiredWidth <= availableWidth) {
				currentWidth += requiredWidth;
				visibleCount++;
			} else break;
		}
		if (visibleCount === items.length) return {
			visibleItems: items,
			hasMoreItems: false
		};
		if (visibleCount === 0 && items[0]) return {
			visibleItems: [items[0]],
			hasMoreItems: items.length > 1
		};
		return {
			visibleItems: items.slice(0, visibleCount),
			hasMoreItems: items.length > visibleCount
		};
	}, [
		items,
		containerWidth,
		buttonWidth,
		calculateItemWidth
	]);
	return {
		displayItems: (0, react$1.useMemo)(() => isExpanded ? items : visibleItems, [
			isExpanded,
			items,
			visibleItems
		]),
		hasMoreItems,
		toggleButtonText: (0, react$1.useMemo)(() => {
			if (isExpanded) return "Show Less";
			return `${items.length - visibleItems.length} more`;
		}, [
			isExpanded,
			items.length,
			visibleItems.length
		])
	};
};
//#endregion
//#region src/components/Charts/shared/DefaultLegend/DefaultLegend.tsx
const DefaultLegend = (0, react.memo)(react.default.forwardRef(({ items, className, yAxisLabel, xAxisLabel, containerWidth, isExpanded, setIsExpanded, style }, ref) => {
	const [buttonWidth, setButtonWidth] = (0, react.useState)(0);
	const { displayItems, hasMoreItems, toggleButtonText } = useDefaultLegend({
		items,
		containerWidth,
		buttonWidth,
		isExpanded
	});
	const buttonRef = (0, react.useCallback)((node) => {
		if (node) {
			if (node.clientWidth !== buttonWidth) setButtonWidth(node.clientWidth);
		}
	}, [buttonWidth]);
	const handleToggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};
	const showToggleButton = hasMoreItems;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-chart-legend-container inv-chart-legend--bottom", className),
		style,
		children: [(xAxisLabel || yAxisLabel) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-chart-legend-axis-label-container",
			children: [xAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "inv-chart-legend-axis-label",
				children: ["X-Axis: ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chart-legend-axis-label-text",
					children: xAxisLabel
				})]
			}), yAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "inv-chart-legend-axis-label",
				children: ["Y-Axis: ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chart-legend-axis-label-text",
					children: yAxisLabel
				})]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-chart-legend", {
				"inv-chart-legend--expanded": isExpanded,
				"inv-chart-legend--collapsed": !isExpanded && showToggleButton
			}),
			children: [displayItems.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-chart-legend-item",
				children: [item.icon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(item.icon, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-chart-legend-item-indicator",
					style: { backgroundColor: item.color }
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-chart-legend-item-label-container",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "inv-chart-legend-item-label",
						children: item.label
					}), item.percentage !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "inv-chart-legend-item-percentage",
						children: [item.percentage.toFixed(1), "%"]
					})]
				})]
			}, item.key)), showToggleButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				variant: "tertiary",
				size: "small",
				ref: buttonRef,
				className: "inv-chart-legend-toggle-button",
				onClick: handleToggleExpanded,
				iconRight: isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUpIcon, { className: "inv-chart-legend-toggle-button-icon" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDownIcon, { className: "inv-chart-legend-toggle-button-icon" }),
				children: toggleButtonText
			})]
		})]
	});
}));
DefaultLegend.displayName = "DefaultLegend";
//#endregion
//#region src/components/Charts/shared/LineInBarShape/LineInBarShape.tsx
const DEFAULT_STACK_GAP = 1;
const MIN_LINE_DIMENSION = 8;
const MIN_BAR_WIDTH_FOR_LINE = 3;
const LINE_PADDING = 6;
const MIN_GROUP_BAR_HEIGHT = 2;
const MIN_STACKED_BAR_HEIGHT = 4;
const MIN_BAR_WIDTH = 2;
const LineInBarShape = react.default.memo((props) => {
	const { x = 0, y = 0, width = 0, height = 0, fill, radius: r, stroke, strokeWidth, internalLineColor: iLineColor, internalLineWidth: iLineWidth, isHovered, hoveredCategory, categoryKey, payload, variant = "grouped", stackGap = DEFAULT_STACK_GAP, orientation = "vertical", hasNegativeValueInStack } = props;
	const isVertical = orientation === "vertical";
	const isNegative = isVertical ? height < 0 : width < 0;
	const w = isNegative && !isVertical ? -width : width;
	const h = isNegative && isVertical ? -height : height;
	const x_ = isNegative && !isVertical ? x + width : x;
	const y_ = isNegative && isVertical ? y + height : y;
	/**
	* Calculates the corner radii for the bar.
	* This logic ensures that only the "outer" corners of a bar are rounded,
	* depending on its orientation (vertical/horizontal) and whether it's a
	* positive or negative value.
	*
	* - For vertical bars, top corners are rounded for positive values, and
	*   bottom corners for negative values.
	* - For horizontal bars, right corners are rounded for positive values, and
	*   left corners for negative values.
	*
	* If the bar's dimensions are below a certain threshold, no rounding is applied.
	* The `radius` prop can be a single number or an array `[rTL, rTR, rBR, rBL]`.
	*/
	const { rTL, rTR, rBL, rBR } = (0, react.useMemo)(() => {
		const minDimension = isVertical ? MIN_GROUP_BAR_HEIGHT : MIN_BAR_WIDTH;
		const dimension = isVertical ? h : w;
		if (variant === "grouped" && dimension < minDimension || variant === "stacked" && dimension < MIN_STACKED_BAR_HEIGHT) return {
			rTL: 0,
			rTR: 0,
			rBL: 0,
			rBR: 0
		};
		if ((isVertical ? w : h) < 7) return {
			rTL: 0,
			rTR: 0,
			rBL: 0,
			rBR: 0
		};
		if (Array.isArray(r)) return {
			rTL: r[0] || 0,
			rTR: r[1] || 0,
			rBR: r[2] || 0,
			rBL: r[3] || 0
		};
		else if (typeof r === "number") {
			if (isVertical) {
				if (isNegative) return {
					rTL: 0,
					rTR: 0,
					rBL: r,
					rBR: r
				};
				return {
					rTL: r,
					rTR: r,
					rBL: 0,
					rBR: 0
				};
			}
			if (isNegative) return {
				rTL: r,
				rTR: 0,
				rBL: r,
				rBR: 0
			};
			return {
				rTL: 0,
				rTR: r,
				rBL: 0,
				rBR: r
			};
		}
		return {
			rTL: 0,
			rTR: 0,
			rBL: 0,
			rBR: 0
		};
	}, [
		r,
		variant,
		h,
		w,
		isVertical,
		isNegative
	]);
	const opacity = (0, react.useMemo)(() => {
		if (!isHovered || hoveredCategory === null || !payload || !categoryKey) return 1;
		return payload[categoryKey] === hoveredCategory ? 1 : .4;
	}, [
		isHovered,
		hoveredCategory,
		payload,
		categoryKey
	]);
	const { adjustedX, adjustedY, adjustedWidth, adjustedHeight } = (0, react.useMemo)(() => {
		let finalX = x_;
		let finalY = y_;
		let finalWidth = w;
		let finalHeight = h;
		if (isVertical) {
			if (variant === "stacked" && stackGap > 0) finalHeight = h - stackGap;
			if (h > 0) {
				const minHeight = variant === "grouped" ? MIN_GROUP_BAR_HEIGHT : MIN_STACKED_BAR_HEIGHT - stackGap;
				finalHeight = Math.max(finalHeight, minHeight);
			}
			if (!isNegative) if (variant === "stacked" && stackGap > 0 && hasNegativeValueInStack) finalY = y + h - finalHeight - stackGap;
			else finalY = y + h - finalHeight;
		} else {
			if (variant === "stacked" && stackGap > 0) finalWidth = w - stackGap;
			if (w > 0) finalWidth = Math.max(finalWidth, MIN_BAR_WIDTH);
		}
		return {
			adjustedX: finalX,
			adjustedY: finalY,
			adjustedWidth: finalWidth,
			adjustedHeight: finalHeight
		};
	}, [
		variant,
		stackGap,
		x,
		y,
		w,
		h,
		isVertical,
		isNegative,
		x_,
		y_
	]);
	/**
	* Generates the SVG path for the bar.
	* This code creates the SVG path string for a bar with rounded corners.
	* The path drawing logic changes based on:
	* 1. Bar orientation (vertical vs horizontal)
	* 2. Value sign (positive vs negative)
	*
	* The SVG path is drawn using commands:
	* - M x,y: Move to point (x,y) without drawing
	* - L x,y: Draw line to point (x,y)
	* - A rx,ry angle,large-arc,sweep x,y: Draw arc with radius rx,ry to point (x,y)
	*   The arc parameters control:
	*   - angle: rotation of arc (0 = no rotation)
	*   - large-arc: 0 = small arc, 1 = large arc
	*   - sweep: 0 = counter-clockwise, 1 = clockwise
	* - Z: Close path by drawing line back to start
	*
	* For rounded corners, we:
	* 1. Move to start point
	* 2. Draw straight edges
	* 3. For each corner that should be rounded:
	*    - Stop short of corner by radius amount
	*    - Draw arc with specified radius to next edge
	*    - Continue with straight edges
	* 4. Close path
	*/
	const path = (0, react.useMemo)(() => {
		if (isVertical) {
			if (isNegative) return `
          M ${x},${adjustedY}
          L ${x + adjustedWidth},${adjustedY}
          L ${x + adjustedWidth},${adjustedY + adjustedHeight - rBR}
          ${rBR > 0 ? `A ${rBR},${rBR} 0 0 1 ${x + adjustedWidth - rBR},${adjustedY + adjustedHeight}` : `L ${x + adjustedWidth},${adjustedY + adjustedHeight}`}
          L ${x + rBL},${adjustedY + adjustedHeight}
          ${rBL > 0 ? `A ${rBL},${rBL} 0 0 1 ${x},${adjustedY + adjustedHeight - rBL}` : `L ${x},${adjustedY + adjustedHeight}`}
          Z`;
			return `
        M ${x},${adjustedY + rTL}
        ${rTL > 0 ? `A ${rTL},${rTL} 0 0 1 ${x + rTL},${adjustedY}` : `L ${x},${adjustedY}`}
        L ${x + adjustedWidth - rTR},${adjustedY}
        ${rTR > 0 ? `A ${rTR},${rTR} 0 0 1 ${x + adjustedWidth},${adjustedY + rTR}` : `L ${x + adjustedWidth},${adjustedY}`}
        L ${x + adjustedWidth},${adjustedY + adjustedHeight}
        L ${x},${adjustedY + adjustedHeight}
        Z`;
		}
		if (isNegative) return `
      M ${adjustedX + rTL},${y}
      ${rTL > 0 ? `A ${rTL},${rTL} 0 0 0 ${adjustedX},${y + rTL}` : `L ${adjustedX},${y}`}
      L ${adjustedX},${y + height - rBL}
      ${rBL > 0 ? `A ${rBL},${rBL} 0 0 0 ${adjustedX + rBL},${y + height}` : `L ${adjustedX},${y + height}`}
      L ${adjustedX + adjustedWidth},${y + height}
      L ${adjustedX + adjustedWidth},${y}
      Z`;
		return `
      M ${adjustedX},${y}
      L ${adjustedX + adjustedWidth - rTR},${y}
      ${rTR > 0 ? `A ${rTR},${rTR} 0 0 1 ${adjustedX + adjustedWidth},${y + rTR}` : `L ${adjustedX + adjustedWidth},${y}`}
      L ${adjustedX + adjustedWidth},${y + height - rBR}
      ${rBR > 0 ? `A ${rBR},${rBR} 0 0 1 ${adjustedX + adjustedWidth - rBR},${y + height}` : `L ${adjustedX + adjustedWidth},${y + height}`}
      L ${adjustedX},${y + height}
      Z`;
	}, [
		x,
		y,
		adjustedX,
		adjustedY,
		adjustedWidth,
		adjustedHeight,
		height,
		rTL,
		rTR,
		rBL,
		rBR,
		isVertical,
		isNegative
	]);
	const lineCoords = (0, react.useMemo)(() => {
		if (isVertical) {
			if (width <= 0 || width < MIN_BAR_WIDTH_FOR_LINE || adjustedHeight < MIN_LINE_DIMENSION) return null;
			const centerX = x + width / 2;
			return {
				x1: centerX,
				y1: adjustedY + LINE_PADDING,
				x2: centerX,
				y2: adjustedY + adjustedHeight - LINE_PADDING
			};
		}
		if (adjustedWidth < MIN_LINE_DIMENSION || height <= 0) return null;
		const centerY = y + height / 2;
		return {
			x1: adjustedX + LINE_PADDING,
			y1: centerY,
			x2: adjustedX + adjustedWidth - LINE_PADDING,
			y2: centerY
		};
	}, [
		x,
		y,
		adjustedX,
		adjustedY,
		width,
		height,
		adjustedWidth,
		adjustedHeight,
		isVertical
	]);
	if (![
		x,
		y,
		width,
		height,
		adjustedX,
		adjustedY,
		adjustedWidth,
		adjustedHeight,
		rTL,
		rTR,
		rBL,
		rBR
	].every(Number.isFinite)) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: path,
		fill,
		stroke,
		strokeWidth,
		opacity
	}), lineCoords && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
		x1: lineCoords.x1,
		y1: lineCoords.y1,
		x2: lineCoords.x2,
		y2: lineCoords.y2,
		stroke: iLineColor,
		strokeWidth: iLineWidth,
		strokeLinecap: "round",
		opacity
	})] });
});
LineInBarShape.displayName = "LineInBarShape";
//#endregion
//#region src/components/Charts/shared/PortalTooltip/FloatingUIPortal.tsx
const FloatingUIPortal = ({ children, className = "", chartId, portalContainer, position, placement = "right-start", offsetDistance = 20 }) => {
	const { refs, floatingStyles, update } = (0, _floating_ui_react_dom.useFloating)({
		placement,
		middleware: [
			(0, _floating_ui_react_dom.offset)(offsetDistance),
			(0, _floating_ui_react_dom.flip)(),
			(0, _floating_ui_react_dom.hide)()
		],
		whileElementsMounted: _floating_ui_react_dom.autoUpdate
	});
	const { portalThemeClassName } = useTheme();
	(0, react.useEffect)(() => {
		if (position) update();
	}, [position, update]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: refs.setReference,
		style: {
			position: "absolute",
			top: position?.y,
			left: position?.x
		}
	}), (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: refs.setFloating,
		className: (0, clsx.default)("inv-portal-tooltip", portalThemeClassName, className),
		"data-chart": chartId,
		style: floatingStyles,
		children
	}), portalContainer?.current || document.body)] });
};
//#endregion
//#region src/components/Charts/shared/PortalTooltip/utils/index.ts
const tooltipNumberFormatter = (value) => {
	const isNegative = value < 0;
	const absValue = Math.abs(value);
	if (absValue < 1e5) return (isNegative ? "-" : "") + absValue.toLocaleString();
	const units = [
		"",
		"K",
		"M",
		"B",
		"T"
	];
	let unitIndex = 0;
	let scaledValue = absValue;
	while (scaledValue >= 1e3 && unitIndex < units.length - 1) {
		scaledValue /= 1e3;
		unitIndex++;
	}
	const formattedValue = Math.floor(scaledValue * 10) / 10;
	return (isNegative ? "-" : "") + `${formattedValue}${units[unitIndex]}`;
};
//#endregion
//#region src/components/Charts/shared/PortalTooltip/CustomTooltipContent.tsx
const DEFAULT_INDICATOR = "dot";
/**
* Custom tooltip content component for floating tooltips
* Mirrors the functionality of ChartTooltipContent but works with FloatingUIPortal
*/
function CustomTooltipContentRender(props, ref) {
	const { active, payload, className, indicator = DEFAULT_INDICATOR, hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, showPercentage = false, portalContainer, parentRef } = props;
	const { config, id } = useChart();
	const { isSideBarTooltipOpen } = useSideBarTooltip();
	const isGreaterThanTen = !!(payload?.length && payload.length > 10);
	const remainingItems = payload && isGreaterThanTen ? payload.length - 5 : 0;
	const [forcefullyHideTooltip, setForcefullyHideTooltip] = (0, react.useState)(false);
	const [parentScrollPosition, setParentScrollPosition] = (0, react.useState)({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	const tooltipLabel = (0, react.useMemo)(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-chart-tooltip-label-heavy", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-chart-tooltip-label", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	const nestLabel = (0, react.useMemo)(() => payload?.length === 1 && indicator !== DEFAULT_INDICATOR, [payload?.length, indicator]);
	const payloadItems = (0, react.useMemo)(() => {
		if (!payload?.length) return [];
		const renderPayloadItem = (item, index, isTwoItemsLayout) => {
			const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey ?? item.name ?? item.dataKey ?? "value"}`);
			const indicatorColor = (color ?? item.payload?.fill) || item.color;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, clsx.default)("inv-chart-tooltip-content-item", !isTwoItemsLayout && indicator === DEFAULT_INDICATOR && "inv-chart-tooltip-content-item--dot"),
				children: [formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)("inv-chart-tooltip-content-indicator", `inv-chart-tooltip-content-indicator--${indicator}`, isTwoItemsLayout && "inv-chart-tooltip-content-indicator--two-items"),
					style: {
						"--color-bg": indicatorColor,
						"--color-border": indicatorColor
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: (0, clsx.default)("inv-chart-tooltip-content-value-wrapper", isTwoItemsLayout && "inv-chart-tooltip-content-value-wrapper--vertical", nestLabel ? "inv-chart-tooltip-content-value-wrapper--nested" : "inv-chart-tooltip-content-value-wrapper--standard"),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-chart-tooltip-content-label",
						children: [nestLabel && tooltipLabel, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: itemConfig?.label || item.name })]
					}), item.value !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: (0, clsx.default)("inv-chart-tooltip-content-value", showPercentage && "percentage"),
						children: [typeof item.value === "number" ? tooltipNumberFormatter(item.value) : item.value, showPercentage ? "%" : ""]
					})]
				})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-tooltip-content-item-separator" })]
			}, `${item.dataKey}-${index}`);
		};
		if (payload.length <= 2) return payload.map((item, index) => renderPayloadItem(item, index, true));
		return (isGreaterThanTen ? payload.slice(0, 5) : payload).map((item, index) => renderPayloadItem(item, index, false));
	}, [
		payload,
		nameKey,
		config,
		color,
		indicator,
		formatter,
		hideIndicator,
		nestLabel,
		tooltipLabel,
		showPercentage
	]);
	(0, react.useEffect)(() => {
		const parent = parentRef.current;
		if (!parent) return;
		const touchHandler = (e) => {
			for (let i = 0; i < e.targetTouches.length; i++) {
				const target = e.targetTouches[i].target;
				if (!parent.contains(target)) {
					setForcefullyHideTooltip(true);
					return;
				}
			}
			setForcefullyHideTooltip(false);
		};
		document.body.addEventListener("touchstart", touchHandler);
		const scrollHandler = () => {
			setParentScrollPosition({
				x: parent.scrollLeft,
				y: parent.scrollTop,
				width: parent.clientWidth,
				height: parent.clientHeight
			});
		};
		parent.addEventListener("scroll", scrollHandler);
		setParentScrollPosition({
			x: parent.scrollLeft,
			y: parent.scrollTop,
			width: parent.clientWidth,
			height: parent.clientHeight
		});
		return () => {
			document.body.removeEventListener("touchstart", touchHandler);
			parent.removeEventListener("scroll", scrollHandler);
		};
	}, [parentRef.current]);
	if (!active || !payload?.length || isSideBarTooltipOpen || forcefullyHideTooltip) return null;
	const tooltipContent = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-chart-tooltip", className),
		children: [
			!nestLabel && tooltipLabel,
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-tooltip-content-item-separator" }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-chart-tooltip-content",
				children: payloadItems
			}),
			isGreaterThanTen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-tooltip-content-item-separator" }),
			isGreaterThanTen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-chart-tooltip-content-view-more",
				children: ["Click to view all ", remainingItems]
			})
		]
	});
	const coordinates = {
		x: props.coordinate?.x ?? 0,
		y: props.coordinate?.y ?? 0
	};
	if (parentScrollPosition.x > coordinates.x || parentScrollPosition.y > coordinates.y || parentScrollPosition.width + parentScrollPosition.x < coordinates.x || parentScrollPosition.height + parentScrollPosition.y < coordinates.y) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(FloatingUIPortal, {
		chartId: id,
		portalContainer,
		position: props.coordinate,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartStyle, {
			id,
			config
		}), tooltipContent]
	});
}
const CustomTooltipContent = (0, react.memo)((0, react.forwardRef)(CustomTooltipContentRender));
CustomTooltipContent.displayName = "CustomTooltipContent";
//#endregion
//#region src/components/Charts/shared/ScrollButtonsHorizontal/ScrollButtonsHorizontal.tsx
const ScrollButtonsHorizontal = react.default.memo(({ dataWidth, effectiveWidth, canScrollLeft, canScrollRight, isSideBarTooltipOpen, onScrollLeft, onScrollRight }) => {
	if (dataWidth <= effectiveWidth) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-chart-horizontal-scroll-buttons-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			className: (0, clsx.default)("inv-chart-horizontal-scroll-button inv-chart-horizontal-scroll-button--left", { "inv-chart-horizontal-scroll-button--disabled": !canScrollLeft }),
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {}),
			variant: "secondary",
			onClick: onScrollLeft,
			size: "2-extra-small",
			disabled: !canScrollLeft,
			"aria-label": "Scroll left"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			className: (0, clsx.default)("inv-chart-horizontal-scroll-button inv-chart-horizontal-scroll-button--right", {
				"inv-chart-horizontal-scroll-button--disabled": !canScrollRight,
				"inv-chart-horizontal-scroll-button--SideBarTooltip": isSideBarTooltipOpen
			}),
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {}),
			variant: "secondary",
			size: "2-extra-small",
			onClick: onScrollRight,
			disabled: !canScrollRight,
			"aria-label": "Scroll right"
		})]
	});
});
ScrollButtonsHorizontal.displayName = "ScrollButtonsHorizontal";
//#endregion
//#region src/components/Charts/shared/ScrollButtonsVertical/ScrollButtonsVertical.tsx
const ScrollButtonsVertical = react.default.memo(({ dataHeight, effectiveHeight, canScrollUp, canScrollDown, isSideBarTooltipOpen, onScrollUp, onScrollDown }) => {
	if (dataHeight <= effectiveHeight) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-chart-vertical-scroll-buttons-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			className: (0, clsx.default)("inv-chart-vertical-scroll-button inv-chart-vertical-scroll-button--up", { "inv-chart-vertical-scroll-button--disabled": !canScrollUp }),
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {}),
			variant: "secondary",
			onClick: onScrollUp,
			size: "extra-small",
			disabled: !canScrollUp,
			"aria-label": "Scroll up"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
			className: (0, clsx.default)("inv-chart-vertical-scroll-button inv-chart-vertical-scroll-button--down", {
				"inv-chart-vertical-scroll-button--disabled": !canScrollDown,
				"inv-chart-vertical-scroll-button--SideBarTooltip": isSideBarTooltipOpen
			}),
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {}),
			variant: "secondary",
			size: "extra-small",
			onClick: onScrollDown,
			disabled: !canScrollDown,
			"aria-label": "Scroll down"
		})]
	});
});
ScrollButtonsVertical.displayName = "ScrollButtonsVertical";
//#endregion
//#region src/components/Charts/shared/SideBarTooltip/SideBarTooltip.tsx
const capitalizeString = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
const SideBarTooltip = react.default.memo(({ height }) => {
	const { setIsSideBarTooltipOpen, data } = useSideBarTooltip();
	if (!data) {
		setIsSideBarTooltipOpen(false);
		return null;
	}
	const handleClose = (0, react.useCallback)(() => {
		setIsSideBarTooltipOpen(false);
	}, [setIsSideBarTooltipOpen]);
	const processedValues = (0, react.useMemo)(() => {
		return data.values?.map((value, index) => ({
			...value,
			capitalizedLabel: capitalizeString(value.label),
			isLast: index === data.values.length - 1
		}));
	}, [data.values]);
	const title = data.title;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-chart-side-bar-tooltip",
		style: { height: `${height}px` },
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-chart-side-bar-tooltip-header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-chart-side-bar-tooltip-title",
					children: title
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, {}),
					size: "extra-small",
					onClick: handleClose,
					variant: "secondary",
					className: "inv-chart-side-bar-tooltip-close-button"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-side-bar-tooltip-content-item-separator" }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-chart-side-bar-tooltip-content",
				autoFocus: true,
				children: processedValues?.map((value, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-chart-side-bar-tooltip-content-item",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-chart-side-bar-tooltip-content-item-color",
							style: { backgroundColor: value.color }
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-chart-side-bar-tooltip-content-item-label",
							children: value.capitalizedLabel
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-chart-side-bar-tooltip-content-item-value",
							children: tooltipNumberFormatter(value.value)
						})
					]
				}), !value.isLast && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-side-bar-tooltip-content-item-separator" })] }, index))
			})
		]
	});
});
SideBarTooltip.displayName = "SideBarTooltip";
//#endregion
//#region src/components/Separator/Separator.tsx
const Separator = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_separator.Root, {
		className: (0, clsx.default)("inv-separator", className),
		...props
	});
};
//#endregion
//#region src/components/Charts/shared/StackedLegend/StackedLegend.tsx
const formatPercentage = (value, total) => {
	return `${(value / total * 100).toFixed(1)}%`;
};
const ITEM_HEIGHT = 36;
const ITEM_GAP = 2;
const LEGEND_ITEM_LIMIT = 6;
const SHOW_MORE_BREAKPOINT = 450;
const StackedLegend = ({ items, onItemHover, activeKey, onLegendItemHover, containerWidth, separator = false, showTitle = true, layout = "auto", className, style }) => {
	const containerRef = (0, react.useRef)(null);
	const listRef = (0, react.useRef)(null);
	const [showUpButton, setShowUpButton] = (0, react.useState)(false);
	const [showDownButton, setShowDownButton] = (0, react.useState)(false);
	const [showAll, setShowAll] = (0, react.useState)(false);
	const [isOverflowing, setIsOverflowing] = (0, react.useState)(false);
	const isShowMoreLayout = layout === "showMore" || layout === "auto" && containerWidth !== void 0 && (containerWidth < SHOW_MORE_BREAKPOINT || items.length > LEGEND_ITEM_LIMIT);
	const isScrollableLayout = layout === "scrollable" || layout === "auto" && !isShowMoreLayout;
	const handleMouseEnter = (key, index) => {
		onItemHover?.(key);
		onLegendItemHover?.(index);
	};
	const handleMouseLeave = () => {
		onItemHover?.(null);
		onLegendItemHover?.(null);
	};
	(0, react.useEffect)(() => {
		const checkScroll = () => {
			if (listRef.current && containerRef.current) {
				const { scrollTop, scrollHeight, clientHeight } = listRef.current;
				setIsOverflowing(scrollHeight > clientHeight);
				setShowUpButton(scrollTop > 0);
				setShowDownButton(scrollTop < scrollHeight - clientHeight - 1);
			}
		};
		if (isShowMoreLayout) {
			setShowUpButton(false);
			setShowDownButton(false);
			return;
		}
		checkScroll();
		const currentRef = listRef.current;
		if (currentRef) {
			currentRef.addEventListener("scroll", checkScroll);
			const resizeObserver = new ResizeObserver(checkScroll);
			resizeObserver.observe(currentRef);
			return () => {
				currentRef.removeEventListener("scroll", checkScroll);
				resizeObserver.disconnect();
			};
		}
		return () => {};
	}, [isShowMoreLayout]);
	const scrollUp = () => {
		if (listRef.current) listRef.current.scrollBy({
			top: -(ITEM_HEIGHT + ITEM_GAP),
			behavior: "smooth"
		});
	};
	const scrollDown = () => {
		if (listRef.current) listRef.current.scrollBy({
			top: ITEM_HEIGHT + ITEM_GAP,
			behavior: "smooth"
		});
	};
	const total = items.reduce((sum, item) => sum + item.value, 0);
	const itemsToDisplay = isShowMoreLayout && !showAll ? items.slice(0, 6) : items;
	const shouldShowScrollControls = isScrollableLayout && isOverflowing && items.length > LEGEND_ITEM_LIMIT;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: (0, clsx.default)("inv-stacked-legend-container", className),
		style: {
			width: containerWidth ? `${containerWidth}px` : "100%",
			...style
		},
		children: [
			shouldShowScrollControls && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-stacked-legend-header",
				children: [showTitle && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-stacked-legend-header-title",
					children: [items.length, " labels"]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-stacked-legend-header-buttons",
					children: shouldShowScrollControls && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
						className: "inv-stacked-legend-scroll-button inv-stacked-legend-scroll-up",
						onClick: scrollUp,
						"aria-label": "Scroll legend up",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronUp, {}),
						variant: "secondary",
						size: "extra-small",
						disabled: !showUpButton
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
						className: "inv-stacked-legend-scroll-button inv-stacked-legend-scroll-down",
						onClick: scrollDown,
						"aria-label": "Scroll legend down",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {}),
						variant: "secondary",
						size: "extra-small",
						disabled: !showDownButton
					})] })
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: listRef,
				className: "inv-stacked-legend",
				children: itemsToDisplay.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.default.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: `inv-stacked-legend__item ${activeKey === item.key ? "inv-stacked-legend__item--active" : ""}`,
					onMouseEnter: () => handleMouseEnter(item.key, index),
					onMouseLeave: handleMouseLeave,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-stacked-legend__item-label",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-stacked-legend__item-color-container",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "inv-stacked-legend__item-color",
								style: { backgroundColor: item.color }
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-stacked-legend__item-label-text",
							children: item.label
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-stacked-legend__item-value",
						children: formatPercentage(item.value, total)
					})]
				}), index !== itemsToDisplay.length - 1 && separator && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Separator, { className: "inv-stacked-legend-separator" })] }, item.key))
			}),
			isShowMoreLayout && !showAll && items.length > LEGEND_ITEM_LIMIT && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "small",
				onClick: () => setShowAll(true),
				className: "inv-stacked-legend-show-more-button",
				children: "Show more"
			}),
			isShowMoreLayout && showAll && items.length > LEGEND_ITEM_LIMIT && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "small",
				onClick: () => setShowAll(false),
				className: "inv-stacked-legend-show-less-button",
				children: "Show less"
			})
		]
	});
};
//#endregion
//#region src/components/Charts/shared/SVGXAxisTick/SVGXAxisTick.tsx
const SVGXAxisTick = react.default.forwardRef((props, ref) => {
	const { x, y, payload, className, angle = 0, textAnchor = "middle", tickFormatter, dy = 16 } = props;
	if (x === void 0 || y === void 0) return null;
	const raw = payload?.value;
	const displayValue = tickFormatter ? tickFormatter(raw) : typeof raw === "number" ? numberTickFormatter(raw) : String(raw ?? "");
	const transform = angle !== 0 ? `rotate(${angle}, ${x}, ${y})` : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
		ref,
		className: (0, clsx.default)("inv-chart-svg-x-axis-tick", angle !== 0 && "inv-chart-svg-x-axis-tick-angled", className),
		x,
		y,
		dy,
		textAnchor,
		transform,
		children: displayValue
	});
});
SVGXAxisTick.displayName = "SVGXAxisTick";
//#endregion
//#region src/components/Charts/shared/LabelTooltip/LabelTooltip.tsx
const DEFAULT_DELAY_DURATION = 300;
const DEFAULT_SKIP_DELAY_DURATION = 300;
const DEFAULT_DISABLE_HOVERABLE_CONTENT = false;
const LabelTooltipProvider = (props) => {
	const { children, delayDuration = DEFAULT_DELAY_DURATION, skipDelayDuration = DEFAULT_SKIP_DELAY_DURATION, disableHoverableContent = DEFAULT_DISABLE_HOVERABLE_CONTENT } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Provider, {
		delayDuration,
		skipDelayDuration,
		disableHoverableContent,
		children
	});
};
const LabelTooltip = react.default.forwardRef((props, ref) => {
	const { children, content, side = "top", sideOffset = 1, delayDuration = DEFAULT_DELAY_DURATION, className = "inv-chart-label-tooltip", disabled = false, open, defaultOpen, onOpenChange } = props;
	if (disabled) return children;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Root, {
		delayDuration,
		open,
		defaultOpen,
		onOpenChange,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Trigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Content, {
			ref,
			className,
			side,
			sideOffset,
			children: content
		}) })]
	});
});
LabelTooltip.displayName = "LabelTooltip";
//#endregion
//#region src/components/Charts/shared/XAxisTick/XAxisTick.tsx
const XAxisTick = react.default.forwardRef((props, ref) => {
	const { x, y, payload, className, variant = "multiLine", widthOfGroup = 70, labelHeight = 20, onMouseEnter, onMouseLeave } = props;
	const rawValue = payload?.value;
	const value = String(rawValue || "");
	const foreignObjectRef = (0, react.useRef)(null);
	const spanRef = (0, react.useRef)(null);
	const [isTruncated, setIsTruncated] = (0, react.useState)(false);
	(0, react.useLayoutEffect)(() => {
		if (spanRef.current) {
			const element = spanRef.current;
			setIsTruncated(variant === "multiLine" ? element.scrollHeight > element.clientHeight : element.scrollWidth > element.clientWidth);
		}
	}, [
		value,
		variant,
		widthOfGroup
	]);
	if (x === void 0 || y === void 0) return null;
	const calX = variant === "multiLine" ? x - widthOfGroup / 2 + 2 : x - widthOfGroup / 2 + 5;
	const calWidth = variant === "multiLine" ? widthOfGroup - 4 : widthOfGroup - 10;
	const spanClassName = variant === "multiLine" ? "inv-chart-x-axis-tick-multi-line" : "inv-chart-x-axis-tick-single-line";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		ref,
		transform: `translate(${calX},${y})`,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("foreignObject", {
			ref: foreignObjectRef,
			transform: "translate(0, 0)",
			width: calWidth,
			height: labelHeight,
			className: "inv-chart-x-axis-tick-foreign",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: {
					width: "100%",
					height: "100%",
					boxSizing: "border-box"
				},
				onMouseEnter: () => onMouseEnter?.(props),
				onMouseLeave: () => onMouseLeave?.(props),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltip, {
					content: value,
					side: "top",
					disabled: !isTruncated,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						ref: spanRef,
						style: {
							textAlign: "center",
							wordBreak: "break-word"
						},
						className: (0, clsx.default)(spanClassName, className),
						children: value
					})
				})
			})
		})
	});
});
XAxisTick.displayName = "XAxisTick";
//#endregion
//#region src/components/Charts/shared/YAxisTick/YAxisTick.tsx
const YAxisTick = (props) => {
	const { x, y, payload, textAnchor, verticalAnchor, className, setLabelWidth } = props;
	const displayValue = typeof payload?.value === "number" ? numberTickFormatter(payload?.value) : String(payload?.value);
	(0, react.useLayoutEffect)(() => {
		setLabelWidth(displayValue);
	}, [displayValue, setLabelWidth]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		transform: `translate(${x},${y})`,
		className,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
			x: 0,
			y: 0,
			dy: verticalAnchor === "middle" ? 4 : 0,
			textAnchor: textAnchor || "end",
			className: "inv-chart-y-axis-tick",
			children: displayValue
		})
	});
};
//#endregion
//#region src/components/Charts/utils/AreaAndLine/AreaAndLineUtils.ts
const ELEMENT_SPACING = 72;
/**
* AREA CHART AND LINE CHART SPECIFIC FUNCTION
* This function returns the width of the data in the area chart, used for padding calculation, scroll amount calculation, and
* for the width of the chart container.
* @param data - The data to be displayed in the chart.
*/
const getWidthOfData$2 = (data, containerWidth) => {
	if (data.length === 0) return containerWidth;
	const width = data.length * getWidthOfGroup$1(data);
	if (containerWidth >= width) return containerWidth;
	if (data.length === 1) return Math.max(width, 200);
	return width;
};
/**
* SHARED UTILITY FUNCTION
* This function returns the nearest snap position index for both chart types.
* The implementation is identical for both AreaChart and LineChart.
* @param snapPositions - The snap positions for the chart.
* @param currentScroll - The current scroll of the chart.
* @param direction - The direction of the scroll.
* @returns The nearest snap position index for the chart.
*/
const findNearestSnapPosition$1 = (snapPositions, currentScroll, direction) => {
	let currentIndex = 0;
	for (let i = 0; i < snapPositions.length; i++) {
		const snapPosition = snapPositions[i];
		if (snapPosition !== void 0 && currentScroll >= snapPosition) currentIndex = i;
		else break;
	}
	if (direction === "left") return Math.max(0, currentIndex - 1);
	else return Math.min(snapPositions.length - 1, currentIndex + 1);
};
/**
* SHARED UTILITY FUNCTION
* This function returns the width of each group/category for both chart types.
* Both AreaChart and LineChart use the same ELEMENT_SPACING.
* @param data - The data to be displayed in the chart.
* @returns The width of each group/category.
*/
const getWidthOfGroup$1 = (data) => {
	if (data.length === 0) return 200;
	return ELEMENT_SPACING;
};
/**
* SHARED UTILITY FUNCTION
* This function returns the snap positions for both chart types, used for smooth scrolling.
* @param data - The data to be displayed in the chart.
* @returns The snap positions for the chart.
*/
const getSnapPositions$2 = (data) => {
	if (data.length === 0) return [0];
	const positions = [0];
	const groupWidthValue = getWidthOfGroup$1(data);
	for (let i = 1; i < data.length; i++) positions.push(i * groupWidthValue);
	return positions;
};
//#endregion
//#region src/components/Charts/utils/AreaAndLine/common.ts
const getLineType = (lineType) => {
	switch (lineType) {
		case "linear": return "linear";
		case "natural": return "monotone";
		case "step": return "step";
	}
};
//#endregion
//#region src/components/Charts/AreaChart/AreaChart.tsx
const X_AXIS_PADDING$1 = 36;
const CHART_CONTAINER_BOTTOM_MARGIN$5 = 10;
const AreaChartComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant: areaChartVariant = "natural", tickVariant = "multiLine", grid = true, icons = {}, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const variant = getLineType(areaChartVariant);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const widthOfGroup = (0, react.useMemo)(() => {
		return getWidthOfGroup$1(data);
	}, [data]);
	const maxLabelHeight = useMaxLabelHeight(data, categoryKey, tickVariant, widthOfGroup);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "areaChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const chartContainerRef = (0, react.useRef)(null);
	const mainContainerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	const effectiveContainerWidth = (0, react.useMemo)(() => {
		return Math.max(0, effectiveWidth - (showYAxis ? yAxisWidth : 0) - 40);
	}, [
		effectiveWidth,
		showYAxis,
		yAxisWidth
	]);
	const dataWidth = (0, react.useMemo)(() => {
		return getWidthOfData$2(data, effectiveContainerWidth);
	}, [data, effectiveContainerWidth]);
	const snapPositions = (0, react.useMemo)(() => {
		return getSnapPositions$2(data);
	}, [data]);
	const chartHeight = (0, react.useMemo)(() => {
		return height ?? 296 + maxLabelHeight;
	}, [height, maxLabelHeight]);
	const updateScrollState = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = mainContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	}, []);
	const scrollLeft = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition$1(snapPositions, currentScroll, "left")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	const scrollRight = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition$1(snapPositions, currentScroll, "right")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	(0, react.useEffect)(() => {
		if (width || !chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(chartContainerRef.current);
		setContainerWidth(chartContainerRef.current.getBoundingClientRect().width);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		updateScrollState();
	}, [
		effectiveWidth,
		dataWidth,
		updateScrollState
	]);
	(0, react.useEffect)(() => {
		setIsSideBarTooltipOpen(false);
		setIsLegendExpanded(false);
	}, [dataKeys]);
	(0, react.useEffect)(() => {
		const mainContainer = mainContainerRef.current;
		if (!mainContainer) return;
		const handleScroll = () => {
			updateScrollState();
		};
		mainContainer.addEventListener("scroll", handleScroll);
		return () => {
			mainContainer.removeEventListener("scroll", handleScroll);
		};
	}, [updateScrollState]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons
	]);
	const exportData = useExportChartData({
		type: "area",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel
	});
	const id = (0, react.useId)();
	const gradientID = (0, react.useMemo)(() => `area-chart-gradient-${id}`, [id]);
	const onAreaClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-area-chart-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.AreaChart, {
				width: yAxisWidth,
				height: chartHeight,
				data,
				margin: {
					top: 20,
					bottom: maxLabelHeight + CHART_CONTAINER_BOTTOM_MARGIN$5,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Area, {
						dataKey: key,
						type: variant,
						stroke: "none",
						fill: "transparent",
						fillOpacity: 0,
						stackId: "a"
					}, `y-axis-${key}`);
				})]
			}, `y-axis-chart-${id}`)
		});
	}, [
		showYAxis,
		chartHeight,
		data,
		dataKeys,
		variant,
		id,
		maxLabelHeight,
		yAxisWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-area-chart-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-area-chart-container-inner",
					ref: chartContainerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-area-chart-main-container",
							ref: mainContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: dataWidth,
									minWidth: "100%",
									height: chartHeight
								},
								rechartsProps: {
									width: "100%",
									height: "100%",
									minHeight: 1,
									minWidth: 1,
									initialDimension: {
										width: 1,
										height: 1
									}
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.AreaChart, {
									accessibilityLayer: true,
									data,
									margin: {
										top: 20,
										bottom: CHART_CONTAINER_BOTTOM_MARGIN$5
									},
									onClick: onAreaClick,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											textAnchor: "middle",
											interval: 0,
											height: maxLabelHeight,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(XAxisTick, {
												variant: tickVariant,
												widthOfGroup,
												labelHeight: maxLabelHeight
											}),
											orientation: "bottom",
											padding: {
												left: X_AXIS_PADDING$1,
												right: X_AXIS_PADDING$1
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: mainContainerRef }),
											offset: 15
										}),
										dataKeys.map((key) => {
											const transformedKey = transformedKeys[key];
											const color = `var(--color-${transformedKey})`;
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
												id: `${gradientID}-${transformedKey}`,
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: color,
													stopOpacity: .6
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: color,
													stopOpacity: 0
												})]
											}) }, `gradient-${transformedKey}`);
										}),
										dataKeys.map((key) => {
											const transformedKey = transformedKeys[key];
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Area, {
												dataKey: key,
												type: variant,
												stroke: `var(--color-${transformedKey})`,
												fill: `url(#${gradientID}-${transformedKey})`,
												fillOpacity: 1,
												stackId: "a",
												activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {}, `active-dot-${key}-${id}`),
												dot: false,
												isAnimationActive
											}, `main-${key}`);
										})
									]
								}, `area-chart-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: chartHeight })
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollButtonsHorizontal, {
					dataWidth,
					effectiveWidth,
					canScrollLeft,
					canScrollRight,
					isSideBarTooltipOpen,
					onScrollLeft: scrollLeft,
					onScrollRight: scrollRight
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					yAxisLabel,
					xAxisLabel,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
const AreaChart = react.default.memo(AreaChartComponent);
//#endregion
//#region src/components/Charts/AreaChartCondensed/AreaChartCondensed.tsx
const CHART_HEIGHT$2 = 296;
const CHART_CONTAINER_BOTTOM_MARGIN$4 = 10;
const AreaChartCondensedComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant: areaChartVariant = "natural", tickVariant = "singleLine", grid = true, icons = {}, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height = CHART_HEIGHT$2, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const variant = getLineType(areaChartVariant);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const maxLabelWidth = useMaxLabelWidth(data, categoryKey);
	const chartContainerRef = (0, react.useRef)(null);
	const [chartContainerWidth, setChartContainerWidth] = (0, react.useState)(0);
	const widthOfData = (0, react.useMemo)(() => {
		if (data.length === 0) return 0;
		return (width ?? chartContainerWidth) / data.length;
	}, [
		width,
		chartContainerWidth,
		data
	]);
	const { angle: calculatedAngle, height: xAxisHeight } = useAutoAngleCalculation(maxLabelWidth, tickVariant === "angled", maxLabelWidth < 100 ? widthOfData : void 0);
	const isAngled = (0, react.useMemo)(() => {
		return calculatedAngle !== 0;
	}, [calculatedAngle]);
	const effectiveHeight = (0, react.useMemo)(() => {
		if (tickVariant === "angled") return xAxisHeight + height;
		return height + 30;
	}, [
		height,
		xAxisHeight,
		tickVariant
	]);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "areaChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const id = (0, react.useId)();
	const exportData = useExportChartData({
		type: "area",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel
	});
	const gradientID = (0, react.useMemo)(() => `area-chart-condensed-gradient-${id}`, [id]);
	const chartMargin = (0, react.useMemo)(() => ({
		top: 10,
		right: 10,
		bottom: CHART_CONTAINER_BOTTOM_MARGIN$4,
		left: showYAxis ? 10 : 0
	}), [showYAxis]);
	const onAreaClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	(0, react.useEffect)(() => {
		if (width || !containerRef.current || !chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === containerRef.current) setContainerWidth(entry.contentRect.width);
				if (entry.target === chartContainerRef.current) setChartContainerWidth(entry.contentRect.width);
			}
		});
		resizeObserver.observe(containerRef.current);
		resizeObserver.observe(chartContainerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		setIsLegendExpanded(false);
	}, [dataKeys]);
	const legendItems = (0, react.useMemo)(() => {
		if (!legend) return [];
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons,
		legend
	]);
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-area-chart-condensed-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.AreaChart, {
				width: yAxisWidth,
				height: effectiveHeight,
				data,
				margin: {
					top: chartMargin.top,
					bottom: xAxisHeight + chartMargin.bottom,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Area, {
						dataKey: key,
						fill: "transparent",
						stroke: "transparent",
						stackId: "a",
						isAnimationActive: false
					}, `yaxis-area-chart-condensed-${key}`);
				})]
			}, `y-axis-area-chart-condensed-${id}`)
		});
	}, [
		showYAxis,
		effectiveHeight,
		data,
		dataKeys,
		id,
		yAxisWidth,
		chartMargin,
		xAxisHeight,
		setLabelWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-area-chart-condensed-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				yAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-area-chart-condensed-y-axis-label",
					children: yAxisLabel
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-area-chart-condensed-container-inner",
					ref: containerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-area-chart-condensed",
							ref: chartContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: "100%",
									height: effectiveHeight
								},
								rechartsProps: {
									width: "100%",
									height: "100%"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.AreaChart, {
									accessibilityLayer: true,
									data,
									margin: chartMargin,
									onClick: onAreaClick,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											textAnchor: isAngled ? "end" : "middle",
											interval: "preserveStartEnd",
											minTickGap: 5,
											height: xAxisHeight,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVGXAxisTick, {}),
											angle: calculatedAngle,
											orientation: "bottom",
											padding: {
												left: 20,
												right: 20
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: containerRef }),
											offset: 10
										}),
										dataKeys.map((key) => {
											const transformedKey = transformedKeys[key];
											const color = `var(--color-${transformedKey})`;
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
												id: `${gradientID}-${transformedKey}`,
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: color,
													stopOpacity: .6
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: color,
													stopOpacity: 0
												})]
											}) }, `gradient-${transformedKey}`);
										}),
										dataKeys.map((key) => {
											const transformedKey = transformedKeys[key];
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Area, {
												dataKey: key,
												type: variant,
												stroke: `var(--color-${transformedKey})`,
												fill: `url(#${gradientID}-${transformedKey})`,
												fillOpacity: 1,
												stackId: "a",
												activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {}, `active-dot-${key}-${id}`),
												dot: false,
												isAnimationActive
											}, `area-${key}`);
										})
									]
								}, `area-chart-condensed-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: effectiveHeight })
					]
				}),
				xAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-area-chart-condensed-x-axis-label",
					children: xAxisLabel
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
const AreaChartCondensed = react.default.memo(AreaChartCondensedComponent);
//#endregion
//#region src/components/Charts/utils/BarCharts/BarChartsUtils.ts
const getRadiusArray = (variant, radius, orientation, isFirst, isLast, isNegative) => {
	if (variant === "grouped") if (orientation === "vertical") {
		if (isNegative) return [
			0,
			0,
			radius,
			radius
		];
		return [
			radius,
			radius,
			0,
			0
		];
	} else {
		if (isNegative) return [
			radius,
			0,
			0,
			radius
		];
		return [
			0,
			radius,
			radius,
			0
		];
	}
	else if (variant === "stacked") {
		if (isFirst && isLast) if (orientation === "vertical") return isNegative ? [
			0,
			0,
			radius,
			radius
		] : [
			radius,
			radius,
			0,
			0
		];
		else return isNegative ? [
			radius,
			0,
			0,
			radius
		] : [
			0,
			radius,
			radius,
			0
		];
		if (orientation === "vertical") {
			if (isLast) {
				if (isNegative) return [
					0,
					0,
					radius,
					radius
				];
				return [
					radius,
					radius,
					0,
					0
				];
			}
		} else if (isLast) {
			if (isNegative) return [
				radius,
				0,
				0,
				radius
			];
			return [
				0,
				radius,
				radius,
				0
			];
		}
		return [
			0,
			0,
			0,
			0
		];
	}
	return [
		radius,
		radius,
		radius,
		radius
	];
};
const findNearestSnapPosition = (snapPositions, currentScroll, direction) => {
	let currentIndex = 0;
	for (let i = 0; i < snapPositions.length; i++) if (currentScroll >= snapPositions[i]) currentIndex = i;
	else break;
	if (direction === "up" || direction === "left") return Math.max(0, currentIndex - 1);
	else return Math.min(snapPositions.length - 1, currentIndex + 1);
};
function getBarStackInfo(variant, value, dataKey, payload, dataKeys) {
	const isNegative = Array.isArray(value) ? value[0] <= 0 && value[1] < 0 : value < 0;
	if (variant !== "stacked") return { isNegative };
	const stackedKeys = dataKeys.filter((k) => typeof payload[k] === "number");
	const positiveKeys = stackedKeys.filter((k) => payload[k] >= 0);
	const negativeKeys = stackedKeys.filter((k) => payload[k] < 0);
	const hasNegativeValueInStack = negativeKeys.length > 0;
	const keys = isNegative ? negativeKeys : positiveKeys;
	const currentIndex = keys.indexOf(dataKey);
	return {
		isNegative,
		isFirstInStack: currentIndex === 0,
		isLastInStack: currentIndex === keys.length - 1,
		hasNegativeValueInStack
	};
}
const ELEMENT_SPACING_GROUPED = 56;
const ELEMENT_SPACING_STACKED = 56;
/**
* INTERNAL HELPER FUNCTION
* Get the appropriate element spacing based on chart variant
* @param variant - The chart variant
* @returns The spacing value for the given variant
*/
const getElementSpacing = (variant) => {
	switch (variant) {
		case "stacked": return ELEMENT_SPACING_STACKED;
		default: return ELEMENT_SPACING_GROUPED;
	}
};
/**
* This function returns the width of the data in the chart, used for padding calculation, scroll amount calculation, and
* for the width of the chart container.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
*/
const getWidthOfData$1 = (data, categoryKey, variant) => {
	if (data.length === 0) return 0;
	const width = data.length * getWidthOfGroup(data, categoryKey, variant);
	if (data.length === 1) return Math.max(width, 200);
	return width;
};
/**
* This function returns the padding for the chart, used for the padding of the chart container.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param containerWidth - The width of the container of the chart.
* @param variant - The variant of the chart.
*/
const getPadding$2 = (data, categoryKey, containerWidth, variant) => {
	const paddingValue = containerWidth - getWidthOfData$1(data, categoryKey, variant);
	if (paddingValue < 0) return {
		left: 10,
		right: 10
	};
	else return {
		left: paddingValue / 2,
		right: paddingValue / 2
	};
};
/**
* This function returns the scroll amount for the chart, used for the scroll amount of the chart.
* This can also be used to calculate the width of each group/category.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
*/
const getWidthOfGroup = (data, categoryKey, variant) => {
	if (data.length === 0) return 200;
	const dataKeys = getDataKeys(data, categoryKey);
	const elementSpacing = getElementSpacing(variant);
	if (variant === "stacked") return 16 + elementSpacing;
	else return dataKeys.length * 24 - 8 + elementSpacing;
};
/**
* This function returns the snap positions for the chart, used for the snap positions of the chart.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
* @returns The snap positions for the chart.
*/
const getSnapPositions$1 = (data, categoryKey, variant) => {
	if (data.length === 0) return [0];
	const positions = [0];
	const groupWidthValue = getWidthOfGroup(data, categoryKey, variant);
	for (let i = 1; i < data.length; i++) positions.push(i * groupWidthValue);
	return positions;
};
//#endregion
//#region src/components/Charts/BarChart/BarChart.tsx
const BAR_GAP$2 = 10;
const BAR_CATEGORY_GAP$2 = "20%";
const BAR_INTERNAL_LINE_WIDTH$2 = 1;
const BAR_RADIUS$2 = 4;
const CHART_CONTAINER_BOTTOM_MARGIN$3 = 10;
const BarChartComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant = "grouped", tickVariant = "multiLine", grid = true, icons = {}, radius, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const widthOfGroup = getWidthOfGroup(data, categoryKey, variant);
	const maxLabelHeight = useMaxLabelHeight(data, categoryKey, tickVariant, widthOfGroup);
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "barChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const chartContainerRef = (0, react.useRef)(null);
	const mainContainerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const [hoveredCategory, setHoveredCategory] = (0, react.useState)(null);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	const effectiveContainerWidth = (0, react.useMemo)(() => {
		return Math.max(0, effectiveWidth - (showYAxis ? yAxisWidth : 0));
	}, [
		effectiveWidth,
		showYAxis,
		yAxisWidth
	]);
	const padding = (0, react.useMemo)(() => {
		return getPadding$2(data, categoryKey, effectiveContainerWidth, variant);
	}, [
		data,
		categoryKey,
		effectiveContainerWidth,
		variant
	]);
	const dataWidth = (0, react.useMemo)(() => {
		return getWidthOfData$1(data, categoryKey, variant);
	}, [
		data,
		categoryKey,
		variant
	]);
	const snapPositions = (0, react.useMemo)(() => {
		return getSnapPositions$1(data, categoryKey, variant);
	}, [
		data,
		categoryKey,
		variant
	]);
	const chartHeight = (0, react.useMemo)(() => {
		return height ?? 296 + maxLabelHeight;
	}, [height, maxLabelHeight]);
	const updateScrollState = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = mainContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	}, []);
	const scrollLeft = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition(snapPositions, currentScroll, "left")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	const scrollRight = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition(snapPositions, currentScroll, "right")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	(0, react.useEffect)(() => {
		if (width || !chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(chartContainerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		updateScrollState();
	}, [
		effectiveWidth,
		dataWidth,
		updateScrollState
	]);
	(0, react.useEffect)(() => {
		setIsSideBarTooltipOpen(false);
		setIsLegendExpanded(false);
	}, [dataKeys]);
	(0, react.useEffect)(() => {
		const mainContainer = mainContainerRef.current;
		if (!mainContainer) return;
		const handleScroll = () => {
			updateScrollState();
		};
		mainContainer.addEventListener("scroll", handleScroll);
		return () => {
			mainContainer.removeEventListener("scroll", handleScroll);
		};
	}, [updateScrollState]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons
	]);
	const exportData = useExportChartData({
		type: "bar",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel
	});
	const id = (0, react.useId)();
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-bar-chart-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
				width: yAxisWidth,
				height: chartHeight,
				data,
				stackOffset: "sign",
				margin: {
					top: 20,
					bottom: maxLabelHeight + CHART_CONTAINER_BOTTOM_MARGIN$3,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
						dataKey: key,
						fill: "transparent",
						stackId: variant === "stacked" ? "a" : void 0,
						isAnimationActive: false,
						maxBarSize: 0
					}, `yaxis-bar-chart-${key}`);
				})]
			}, `y-axis-bar-chart-${id}`)
		});
	}, [
		showYAxis,
		chartHeight,
		data,
		dataKeys,
		variant,
		id,
		maxLabelHeight,
		yAxisWidth
	]);
	const handleChartMouseMove = (0, react.useCallback)((state) => {
		if (state && state.activeLabel !== void 0) setHoveredCategory(state.activeLabel);
	}, []);
	const handleChartMouseLeave = (0, react.useCallback)(() => {
		setHoveredCategory(null);
	}, []);
	const handleXAxisTickMouseEnter = (0, react.useCallback)((tickProps) => {
		if (typeof tickProps.payload?.value === "string") setHoveredCategory(tickProps.payload.value);
	}, []);
	const handleXAxisTickMouseLeave = (0, react.useCallback)(() => {
		setHoveredCategory(null);
	}, []);
	const { mode, theme: userTheme } = useTheme();
	const barInternalLineColor = (0, react.useMemo)(() => {
		if (mode === "light") return "rgba(255, 255, 255, 0.3)";
		return "rgba(0, 0, 0, 0.3)";
	}, [mode]);
	const calculatedRadius = (0, react.useMemo)(() => {
		let radiusValue = BAR_RADIUS$2;
		if (typeof radius === "number") radiusValue = radius;
		else {
			const radiusTheme = userTheme.radius2xs;
			if (radiusTheme) radiusValue = typeof radiusTheme === "string" ? parseInt(radiusTheme) : radiusTheme;
		}
		return radiusValue;
	}, [userTheme.radius2xs, radius]);
	const onBarsClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const barElements = (0, react.useMemo)(() => {
		return dataKeys.map((key) => {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
				dataKey: key,
				fill: `var(--color-${transformedKeys[key]})`,
				stackId: variant === "stacked" ? "a" : void 0,
				isAnimationActive,
				maxBarSize: 16,
				barSize: 16,
				shape: (props) => {
					const { payload, value, dataKey } = props;
					const { isNegative, isFirstInStack, isLastInStack, hasNegativeValueInStack } = getBarStackInfo(variant, value, dataKey, payload, dataKeys);
					const customRadius = getRadiusArray(variant, calculatedRadius, "vertical", isFirstInStack, isLastInStack, isNegative);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineInBarShape, {
						...props,
						radius: customRadius,
						internalLineColor: barInternalLineColor,
						internalLineWidth: BAR_INTERNAL_LINE_WIDTH$2,
						isHovered: hoveredCategory !== null,
						hoveredCategory,
						categoryKey,
						variant,
						hasNegativeValueInStack
					});
				}
			}, `main-${key}`);
		});
	}, [
		dataKeys,
		transformedKeys,
		variant,
		calculatedRadius,
		isAnimationActive,
		barInternalLineColor,
		hoveredCategory,
		categoryKey
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-bar-chart-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-bar-chart-container-inner",
					ref: chartContainerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-bar-chart-main-container",
							ref: mainContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: dataWidth,
									minWidth: "100%",
									height: chartHeight
								},
								rechartsProps: {
									width: "100%",
									height: "100%",
									minHeight: 1,
									minWidth: 1,
									initialDimension: {
										width: 1,
										height: 1
									}
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
									stackOffset: "sign",
									accessibilityLayer: true,
									data,
									margin: {
										top: 20,
										bottom: CHART_CONTAINER_BOTTOM_MARGIN$3
									},
									onClick: onBarsClick,
									onMouseMove: handleChartMouseMove,
									onMouseLeave: handleChartMouseLeave,
									barGap: BAR_GAP$2,
									barCategoryGap: BAR_CATEGORY_GAP$2,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											textAnchor: "middle",
											interval: 0,
											height: maxLabelHeight,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(XAxisTick, {
												variant: tickVariant,
												widthOfGroup,
												labelHeight: maxLabelHeight,
												onMouseEnter: handleXAxisTickMouseEnter,
												onMouseLeave: handleXAxisTickMouseLeave
											}),
											orientation: "bottom",
											padding
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											cursor: {
												fill: "var(--inv-highlight)",
												stroke: "var(--inv-stroke-default)",
												opacity: 1,
												strokeWidth: 1
											},
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: mainContainerRef }),
											offset: 15
										}),
										barElements
									]
								}, `bar-chart-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: chartHeight })
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollButtonsHorizontal, {
					dataWidth,
					effectiveWidth,
					canScrollLeft,
					canScrollRight,
					isSideBarTooltipOpen,
					onScrollLeft: scrollLeft,
					onScrollRight: scrollRight
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					yAxisLabel,
					xAxisLabel,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
const BarChart = react.default.memo(BarChartComponent);
//#endregion
//#region src/components/Charts/BarChartCondensed/BarChartCondensed.tsx
const DEFAULT_MAX_BAR_WIDTH = 12;
const BAR_GAP$1 = 10;
const BAR_CATEGORY_GAP$1 = "20%";
const BAR_INTERNAL_LINE_WIDTH$1 = 1;
const BAR_RADIUS$1 = 4;
const CHART_HEIGHT$1 = 296;
const CHART_CONTAINER_BOTTOM_MARGIN$2 = 10;
const BarChartCondensedComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant = "grouped", tickVariant = "singleLine", grid = true, icons = {}, radius, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height = CHART_HEIGHT$1, width, maxBarWidth = DEFAULT_MAX_BAR_WIDTH }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const maxLabelWidth = useMaxLabelWidth(data, categoryKey);
	const chartContainerRef = (0, react.useRef)(null);
	const [chartContainerWidth, setChartContainerWidth] = (0, react.useState)(0);
	const widthOfData = (0, react.useMemo)(() => {
		if (data.length === 0) return 0;
		return (width ?? chartContainerWidth) / data.length;
	}, [
		chartContainerWidth,
		data,
		width
	]);
	const { angle: calculatedAngle, height: xAxisHeight } = useAutoAngleCalculation(maxLabelWidth, tickVariant === "angled", maxLabelWidth < 100 ? widthOfData : void 0);
	const isAngled = (0, react.useMemo)(() => {
		return calculatedAngle !== 0;
	}, [calculatedAngle]);
	const effectiveHeight = (0, react.useMemo)(() => {
		if (tickVariant === "angled") return xAxisHeight + height;
		return height + 30;
	}, [
		height,
		xAxisHeight,
		tickVariant
	]);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "barChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const id = (0, react.useId)();
	const exportData = useExportChartData({
		type: "bar",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel
	});
	const chartMargin = (0, react.useMemo)(() => ({
		top: 10,
		right: 10,
		bottom: CHART_CONTAINER_BOTTOM_MARGIN$2,
		left: showYAxis ? 10 : 0
	}), [showYAxis]);
	const { mode, theme: userTheme } = useTheme();
	const calculatedRadius = (0, react.useMemo)(() => {
		let radiusValue = BAR_RADIUS$1;
		if (typeof radius === "number") radiusValue = radius;
		else {
			const radiusTheme = userTheme.radius2xs;
			if (radiusTheme) radiusValue = typeof radiusTheme === "string" ? parseInt(radiusTheme) : radiusTheme;
		}
		return radiusValue;
	}, [userTheme.radius2xs, radius]);
	const barInternalLineColor = (0, react.useMemo)(() => {
		if (mode === "light") return "rgba(255, 255, 255, 0.3)";
		return "rgba(0, 0, 0, 0.3)";
	}, [mode]);
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const [hoveredCategory, setHoveredCategory] = (0, react.useState)(null);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	const explicitChartWidth = (0, react.useMemo)(() => {
		if (!width) return void 0;
		return width - (showYAxis ? yAxisWidth : 0) - chartMargin.left - chartMargin.right;
	}, [
		width,
		showYAxis,
		yAxisWidth,
		chartMargin.left,
		chartMargin.right
	]);
	const calculatedBarWidth = (0, react.useMemo)(() => {
		const availableWidth = explicitChartWidth ?? chartContainerWidth;
		if (!availableWidth || availableWidth === 0 || data.length === 0) return;
		const barWidth = availableWidth / data.length / (variant === "stacked" ? 1 : dataKeys.length);
		return Math.min(maxBarWidth, barWidth);
	}, [
		explicitChartWidth,
		chartContainerWidth,
		data.length,
		dataKeys.length,
		variant,
		maxBarWidth
	]);
	const handleChartMouseMove = (0, react.useCallback)((state) => {
		if (state && state.activeLabel !== void 0) setHoveredCategory(state.activeLabel);
	}, []);
	const handleChartMouseLeave = (0, react.useCallback)(() => {
		setHoveredCategory(null);
	}, []);
	const onBarClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	(0, react.useEffect)(() => {
		if (!chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === containerRef.current && !width) setContainerWidth(entry.contentRect.width);
				if (entry.target === chartContainerRef.current) setChartContainerWidth(entry.contentRect.width);
			}
		});
		resizeObserver.observe(chartContainerRef.current);
		if (!width && containerRef.current) resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		setIsLegendExpanded(false);
	}, [dataKeys]);
	const legendItems = (0, react.useMemo)(() => {
		if (!legend) return [];
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons,
		legend
	]);
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-bar-chart-condensed-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
				width: yAxisWidth,
				height: effectiveHeight,
				data,
				stackOffset: "sign",
				margin: {
					top: chartMargin.top,
					bottom: xAxisHeight + chartMargin.bottom,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
						dataKey: key,
						fill: "transparent",
						stackId: variant === "stacked" ? "a" : void 0,
						isAnimationActive: false,
						maxBarSize: 0
					}, `yaxis-bar-chart-condensed-${key}`);
				})]
			}, `y-axis-bar-chart-condensed-${id}`)
		});
	}, [
		showYAxis,
		effectiveHeight,
		data,
		dataKeys,
		variant,
		id,
		yAxisWidth,
		chartMargin,
		xAxisHeight,
		setLabelWidth
	]);
	const barElements = (0, react.useMemo)(() => {
		return dataKeys.map((key) => {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
				dataKey: key,
				fill: `var(--color-${transformedKeys[key]})`,
				stackId: variant === "stacked" ? "a" : void 0,
				isAnimationActive,
				maxBarSize: calculatedBarWidth,
				barSize: calculatedBarWidth,
				shape: (props) => {
					const { payload, value, dataKey } = props;
					const { isNegative, isFirstInStack, isLastInStack, hasNegativeValueInStack } = getBarStackInfo(variant, value, dataKey, payload, dataKeys);
					const customRadius = getRadiusArray(variant, calculatedRadius, "vertical", isFirstInStack, isLastInStack, isNegative);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineInBarShape, {
						...props,
						radius: customRadius,
						internalLineColor: barInternalLineColor,
						internalLineWidth: BAR_INTERNAL_LINE_WIDTH$1,
						isHovered: hoveredCategory !== null,
						hoveredCategory,
						categoryKey,
						variant,
						hasNegativeValueInStack
					});
				}
			}, `bar-${key}`);
		});
	}, [
		dataKeys,
		transformedKeys,
		variant,
		calculatedRadius,
		isAnimationActive,
		barInternalLineColor,
		hoveredCategory,
		categoryKey,
		calculatedBarWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-bar-chart-condensed-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				yAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-bar-chart-condensed-y-axis-label",
					children: yAxisLabel
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-bar-chart-condensed-container-inner",
					ref: containerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-bar-chart-condensed",
							ref: chartContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: explicitChartWidth ? `${explicitChartWidth}px` : "100%",
									height: effectiveHeight
								},
								rechartsProps: {
									width: explicitChartWidth ?? "100%",
									height: effectiveHeight
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
									stackOffset: "sign",
									accessibilityLayer: true,
									data,
									margin: chartMargin,
									barGap: BAR_GAP$1,
									barCategoryGap: BAR_CATEGORY_GAP$1,
									onMouseMove: handleChartMouseMove,
									onMouseLeave: handleChartMouseLeave,
									onClick: onBarClick,
									width: explicitChartWidth,
									height: effectiveHeight,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											textAnchor: isAngled ? "end" : "middle",
											interval: "preserveStartEnd",
											minTickGap: 5,
											height: xAxisHeight,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVGXAxisTick, {}),
											angle: calculatedAngle,
											orientation: "bottom",
											padding: {
												left: 20,
												right: 20
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											cursor: {
												fill: "var(--inv-highlight)",
												stroke: "var(--inv-stroke-default)",
												opacity: 1,
												strokeWidth: 1
											},
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: containerRef }),
											offset: 10
										}),
										barElements
									]
								}, `bar-chart-condensed-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: effectiveHeight })
					]
				}),
				xAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-bar-chart-condensed-x-axis-label",
					children: xAxisLabel
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
const BarChartCondensed = react.default.memo(BarChartCondensedComponent);
//#endregion
//#region src/components/Charts/HorizontalBarChart/components/CustomBarShape.tsx
const CustomBarShapeComponent = (props) => {
	const { y, payload, index, categoryKey, effectiveWidth, labelHeight, barInternalLineColor, internalLineWidth, hoveredCategory, variant, ...rest } = props;
	if (y === void 0 || !payload) return null;
	let label = null;
	if (index === 0 && payload[categoryKey]) {
		const labelX = 0;
		const labelWidth = effectiveWidth;
		label = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("foreignObject", {
			x: labelX,
			y: y - labelHeight / 2,
			width: labelWidth,
			height: labelHeight,
			style: { pointerEvents: "none" },
			xmlns: "http://www.w3.org/1999/xhtml",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-horizontal-bar-chart-category-label",
				children: payload[categoryKey]
			})
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [label, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineInBarShape, {
		...rest,
		payload,
		y: y + labelHeight / 2,
		internalLineColor: barInternalLineColor,
		internalLineWidth,
		isHovered: hoveredCategory !== null,
		hoveredCategory,
		categoryKey,
		variant,
		orientation: "horizontal"
	})] });
};
const CustomBarShape = react.default.memo(CustomBarShapeComponent);
//#endregion
//#region src/components/Charts/HorizontalBarChart/hooks/useMaxCategoryLabelWidth.tsx
const useMaxCategoryLabelWidth = (data, categoryKey) => {
	const context = useCanvasContextForLabelSize();
	return (0, react.useMemo)(() => {
		if (data.length === 0) return 100;
		if (!context) return Math.max(...data.map((item) => String(item[categoryKey] || "").length * 8), 100);
		return Math.max(...data.map((item) => {
			const text = String(item[categoryKey] || "");
			return context.measureText(text).width;
		}), 100);
	}, [
		data,
		categoryKey,
		context
	]);
};
/**
* This function returns the height of the data in the chart, used for padding calculation, scroll amount calculation, and
* for the height of the chart container.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
* @param labelHeight - The height of the category label.
*/
const getHeightOfData = (data, categoryKey, variant, labelHeight) => {
	if (data.length === 0) return 0;
	const height = data.length * getHeightOfGroup(data, categoryKey, variant, labelHeight);
	if (data.length === 1) return Math.max(height, 80);
	return height;
};
/**
* This function returns the padding for the chart, used for the padding of the chart container.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param containerHeight - The height of the container of the chart.
* @param variant - The variant of the chart.
* @param labelHeight - The height of the category label.
*/
const getPadding$1 = (data, categoryKey, containerHeight, variant, labelHeight) => {
	const paddingValue = containerHeight - getHeightOfData(data, categoryKey, variant, labelHeight);
	if (paddingValue < 0) return {
		top: 10,
		bottom: 10
	};
	else return {
		top: paddingValue / 2,
		bottom: paddingValue / 2
	};
};
/**
* This function returns the height of each group/category.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
* @param labelHeight - The height of the category label.
*/
const getHeightOfGroup = (data, categoryKey, variant, labelHeight) => {
	if (data.length === 0) return 200;
	const dataKeys = getDataKeys(data, categoryKey);
	const PADDING = 16;
	if (variant === "stacked") return 16 + labelHeight + PADDING;
	else return dataKeys.length * 26 - 10 + labelHeight + PADDING;
};
/**
* This function returns the snap positions for the chart, used for the snap positions of the chart.
* @param data - The data to be displayed in the chart.
* @param categoryKey - The key of the category to be displayed in the chart.
* @param variant - The variant of the chart.
* @param labelHeight - The height of the category label.
* @returns The snap positions for the chart.
*/
const getSnapPositions = (data, categoryKey, variant, labelHeight) => {
	if (data.length === 0) return [0];
	const positions = [0];
	const groupHeightValue = getHeightOfGroup(data, categoryKey, variant, labelHeight);
	for (let i = 1; i < data.length; i++) positions.push(i * groupHeightValue);
	return positions;
};
//#endregion
//#region src/components/Charts/HorizontalBarChart/HorizontalBarChart.tsx
const X_AXIS_HEIGHT$1 = 40;
const BAR_CATEGORY_GAP = "20%";
const BAR_INTERNAL_LINE_WIDTH = 1;
const BAR_RADIUS = 4;
const HorizontalBarChartComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant = "grouped", grid = true, icons = {}, radius = BAR_RADIUS, isAnimationActive = false, showXAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const maxCategoryLabelWidth = useMaxCategoryLabelWidth(data, categoryKey);
	const chartContainerRef = (0, react.useRef)(null);
	const mainContainerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [canScrollUp, setCanScrollUp] = (0, react.useState)(false);
	const [canScrollDown, setCanScrollDown] = (0, react.useState)(false);
	const [hoveredCategory, setHoveredCategory] = (0, react.useState)(null);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	const labelHeight = useHorizontalBarLabelHeight(data, categoryKey, effectiveWidth);
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "barChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const effectiveHeight = (0, react.useMemo)(() => {
		return height ?? 296 + X_AXIS_HEIGHT$1;
	}, [height]);
	const effectiveContainerHeight = (0, react.useMemo)(() => {
		return Math.max(0, effectiveHeight - (showXAxis ? X_AXIS_HEIGHT$1 : 0));
	}, [effectiveHeight, showXAxis]);
	const padding = (0, react.useMemo)(() => {
		return getPadding$1(data, categoryKey, effectiveContainerHeight, variant, labelHeight);
	}, [
		data,
		categoryKey,
		effectiveContainerHeight,
		variant,
		labelHeight
	]);
	const dataHeight = (0, react.useMemo)(() => {
		return getHeightOfData(data, categoryKey, variant, labelHeight);
	}, [
		data,
		categoryKey,
		variant,
		labelHeight
	]);
	const snapPositions = (0, react.useMemo)(() => {
		return getSnapPositions(data, categoryKey, variant, labelHeight);
	}, [
		data,
		categoryKey,
		variant,
		labelHeight
	]);
	const updateScrollState = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = mainContainerRef.current;
			setCanScrollUp(scrollTop > 0);
			setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
		}
	}, []);
	const scrollUp = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollTop;
			const targetPosition = snapPositions[findNearestSnapPosition(snapPositions, currentScroll, "up")] ?? 0;
			mainContainerRef.current.scrollTo({
				top: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	const scrollDown = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollTop;
			const targetPosition = snapPositions[findNearestSnapPosition(snapPositions, currentScroll, "down")] ?? 0;
			mainContainerRef.current.scrollTo({
				top: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	(0, react.useEffect)(() => {
		if (!chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) if (!width) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(chartContainerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [height, width]);
	(0, react.useEffect)(() => {
		updateScrollState();
	}, [
		effectiveContainerHeight,
		dataHeight,
		containerWidth,
		updateScrollState
	]);
	(0, react.useEffect)(() => {
		setIsSideBarTooltipOpen(false);
		setIsLegendExpanded(false);
	}, [dataKeys]);
	(0, react.useEffect)(() => {
		const mainContainer = mainContainerRef.current;
		if (!mainContainer) return;
		const handleScroll = () => {
			updateScrollState();
		};
		mainContainer.addEventListener("scroll", handleScroll);
		return () => {
			mainContainer.removeEventListener("scroll", handleScroll);
		};
	}, [updateScrollState]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons
	]);
	const exportData = useExportChartData({
		type: "bar",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel,
		extraOptions: { barDir: "bar" }
	});
	const id = (0, react.useId)();
	const xAxis = (0, react.useMemo)(() => {
		if (!showXAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-horizontal-bar-chart-x-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
				config: chartConfig,
				style: {
					width: "100%",
					height: X_AXIS_HEIGHT$1
				},
				rechartsProps: { height: X_AXIS_HEIGHT$1 },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
					data,
					layout: "vertical",
					margin: {
						top: 0,
						bottom: 0,
						left: 5,
						right: 2
					},
					stackOffset: "sign",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
						type: "number",
						height: X_AXIS_HEIGHT$1,
						tickLine: false,
						axisLine: false,
						tickFormatter: numberTickFormatter,
						tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVGXAxisTick, {})
					}), dataKeys.map((key) => {
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
							dataKey: key,
							fill: "transparent",
							stackId: variant === "stacked" ? "a" : void 0,
							isAnimationActive: false,
							maxBarSize: 0
						}, `x-axis-horizontal-bar-chart-${key}`);
					})]
				}, `x-axis-horizontal-bar-chart-${id}`)
			})
		});
	}, [
		showXAxis,
		chartConfig,
		data,
		dataKeys,
		variant,
		id
	]);
	const handleChartMouseMove = (0, react.useCallback)((state) => {
		if (state && state.activeLabel !== void 0) setHoveredCategory(state.activeLabel);
	}, []);
	const handleChartMouseLeave = (0, react.useCallback)(() => {
		setHoveredCategory(null);
	}, []);
	const { mode } = useTheme();
	const barInternalLineColor = (0, react.useMemo)(() => {
		if (mode === "light") return "rgba(255, 255, 255, 0.3)";
		return "rgba(0, 0, 0, 0.3)";
	}, [mode]);
	const onBarsClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const setLabelWidth = (0, react.useCallback)(() => {}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-horizontal-bar-chart-container", className),
			"data-inv-chart": exportData,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-horizontal-bar-chart-container-inner-wrapper",
				style: { height: height ? `${height}px` : effectiveHeight },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-horizontal-bar-chart-container-inner",
						ref: chartContainerRef,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-horizontal-bar-chart-main-container",
							ref: mainContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									height: dataHeight,
									minHeight: "100%",
									width: "100%"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
									accessibilityLayer: true,
									data,
									layout: "vertical",
									onClick: onBarsClick,
									onMouseMove: handleChartMouseMove,
									onMouseLeave: handleChartMouseLeave,
									barGap: 10,
									barCategoryGap: BAR_CATEGORY_GAP,
									margin: {
										top: 0,
										bottom: 0,
										left: 2,
										right: 2
									},
									stackOffset: "sign",
									children: [
										grid && verticalCartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											type: "number",
											tickLine: false,
											axisLine: false,
											hide: true
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
											type: "category",
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											width: maxCategoryLabelWidth,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth }),
											interval: 0,
											padding,
											hide: true
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											cursor: {
												fill: "var(--inv-highlight)",
												stroke: "var(--inv-stroke-default)",
												opacity: 1,
												strokeWidth: 1
											},
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: mainContainerRef }),
											offset: 15
										}),
										dataKeys.map((key, index) => {
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
												dataKey: key,
												fill: `var(--color-${transformedKeys[key]})`,
												stackId: variant === "stacked" ? "a" : void 0,
												isAnimationActive,
												maxBarSize: 16,
												barSize: 16,
												shape: (props) => {
													const { payload, value, dataKey } = props;
													const { isNegative, isFirstInStack, isLastInStack } = getBarStackInfo(variant, value, dataKey, payload, dataKeys);
													const customRadius = getRadiusArray(variant, radius, "horizontal", isFirstInStack, isLastInStack, isNegative);
													return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomBarShape, {
														...props,
														radius: customRadius,
														index,
														categoryKey,
														effectiveWidth,
														labelHeight,
														barInternalLineColor,
														internalLineWidth: BAR_INTERNAL_LINE_WIDTH,
														hoveredCategory,
														variant
													});
												}
											}, `main-${key}`);
										})
									]
								}, `horizontal-bar-chart-${id}`)
							})
						}), xAxis]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollButtonsVertical, {
						dataHeight,
						effectiveHeight: effectiveContainerHeight,
						canScrollUp,
						canScrollDown,
						isSideBarTooltipOpen,
						onScrollUp: scrollUp,
						onScrollDown: scrollDown
					}),
					isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: effectiveHeight })
				]
			}), legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
				items: legendItems,
				yAxisLabel,
				xAxisLabel,
				containerWidth: effectiveWidth,
				isExpanded: isLegendExpanded,
				setIsExpanded: setIsLegendExpanded
			})]
		})
	}) });
};
const HorizontalBarChart = react.default.memo(HorizontalBarChartComponent);
//#endregion
//#region src/components/Charts/LineChart/LineChart.tsx
const X_AXIS_PADDING = 36;
const CHART_CONTAINER_BOTTOM_MARGIN$1 = 10;
const LineChart = ({ data, categoryKey, theme = "ocean", customPalette, variant: lineChartVariant = "natural", tickVariant = "multiLine", grid = true, icons = {}, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height, width, strokeWidth = 2 }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const variant = getLineType(lineChartVariant);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const widthOfGroup = (0, react.useMemo)(() => {
		return getWidthOfGroup$1(data);
	}, [data]);
	const maxLabelHeight = useMaxLabelHeight(data, categoryKey, tickVariant, widthOfGroup);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "lineChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const chartContainerRef = (0, react.useRef)(null);
	const mainContainerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	const effectiveContainerWidth = (0, react.useMemo)(() => {
		return Math.max(0, effectiveWidth - (showYAxis ? yAxisWidth : 0) - 40);
	}, [
		effectiveWidth,
		showYAxis,
		yAxisWidth
	]);
	const dataWidth = (0, react.useMemo)(() => {
		return getWidthOfData$2(data, effectiveContainerWidth);
	}, [data, effectiveContainerWidth]);
	const snapPositions = (0, react.useMemo)(() => {
		return getSnapPositions$2(data);
	}, [data]);
	const chartHeight = (0, react.useMemo)(() => {
		return height ?? 296 + maxLabelHeight;
	}, [height, maxLabelHeight]);
	const updateScrollState = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = mainContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	}, []);
	const scrollLeft = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition$1(snapPositions, currentScroll, "left")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	const scrollRight = (0, react.useCallback)(() => {
		if (mainContainerRef.current) {
			const currentScroll = mainContainerRef.current.scrollLeft;
			const targetPosition = snapPositions[findNearestSnapPosition$1(snapPositions, currentScroll, "right")] ?? 0;
			mainContainerRef.current.scrollTo({
				left: targetPosition,
				behavior: "smooth"
			});
		}
	}, [snapPositions]);
	(0, react.useEffect)(() => {
		if (width || !chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(chartContainerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		updateScrollState();
	}, [
		effectiveWidth,
		dataWidth,
		updateScrollState
	]);
	(0, react.useEffect)(() => {
		setIsSideBarTooltipOpen(false);
		setIsLegendExpanded(false);
	}, [dataKeys]);
	(0, react.useEffect)(() => {
		const mainContainer = mainContainerRef.current;
		if (!mainContainer) return;
		const handleScroll = () => {
			updateScrollState();
		};
		mainContainer.addEventListener("scroll", handleScroll);
		return () => {
			mainContainer.removeEventListener("scroll", handleScroll);
		};
	}, [updateScrollState]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons
	]);
	const exportData = useExportChartData({
		type: "line",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel,
		extraOptions: { lineSize: strokeWidth }
	});
	const id = (0, react.useId)();
	const onLineClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-line-chart-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.LineChart, {
				width: yAxisWidth,
				height: chartHeight,
				data,
				margin: {
					top: 20,
					bottom: maxLabelHeight + CHART_CONTAINER_BOTTOM_MARGIN$1,
					left: 0,
					right: 0
				},
				onClick: onLineClick,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Line, {
						dataKey: key,
						type: variant,
						stroke: "transparent",
						strokeWidth: 0,
						dot: false,
						activeDot: false,
						isAnimationActive
					}, `y-axis-${key}`);
				})]
			}, `y-axis-chart-${id}`)
		});
	}, [
		showYAxis,
		id,
		chartHeight,
		data,
		onLineClick,
		dataKeys,
		variant,
		isAnimationActive,
		maxLabelHeight,
		yAxisWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-line-chart-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-line-chart-container-inner",
					ref: chartContainerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-line-chart-main-container",
							ref: mainContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: dataWidth,
									minWidth: "100%",
									height: chartHeight
								},
								rechartsProps: {
									width: "100%",
									height: "100%",
									minHeight: 1,
									minWidth: 1,
									initialDimension: {
										width: 1,
										height: 1
									}
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.LineChart, {
									accessibilityLayer: true,
									data,
									margin: {
										top: 20,
										bottom: CHART_CONTAINER_BOTTOM_MARGIN$1
									},
									onClick: onLineClick,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											height: maxLabelHeight,
											textAnchor: "middle",
											interval: 0,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(XAxisTick, {
												variant: tickVariant,
												widthOfGroup,
												labelHeight: maxLabelHeight
											}),
											orientation: "bottom",
											padding: {
												left: X_AXIS_PADDING,
												right: X_AXIS_PADDING
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: mainContainerRef }),
											offset: 15
										}),
										dataKeys.map((key) => {
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Line, {
												dataKey: key,
												type: variant,
												stroke: `var(--color-${transformedKeys[key]})`,
												strokeWidth,
												dot: false,
												activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {}, `active-dot-${key}-${id}`),
												isAnimationActive
											}, `main-${key}`);
										})
									]
								}, `line-chart-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: chartHeight })
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollButtonsHorizontal, {
					dataWidth,
					effectiveWidth,
					canScrollLeft,
					canScrollRight,
					isSideBarTooltipOpen,
					onScrollLeft: scrollLeft,
					onScrollRight: scrollRight
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					yAxisLabel,
					xAxisLabel,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
//#endregion
//#region src/components/Charts/LineChartCondensed/LineChartCondensed.tsx
const CHART_HEIGHT = 296;
const CHART_CONTAINER_BOTTOM_MARGIN = 10;
const LineChartCondensedComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant: lineChartVariant = "natural", tickVariant = "singleLine", grid = true, icons = {}, isAnimationActive = false, showYAxis = true, xAxisLabel, yAxisLabel, legend = true, className, height = CHART_HEIGHT, width, strokeWidth = 2 }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const variant = getLineType(lineChartVariant);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(data, dataKeys);
	const maxLabelWidth = useMaxLabelWidth(data, categoryKey);
	const chartContainerRef = (0, react.useRef)(null);
	const [chartContainerWidth, setChartContainerWidth] = (0, react.useState)(0);
	const widthOfData = (0, react.useMemo)(() => {
		if (data.length === 0) return 0;
		return (width ?? chartContainerWidth) / data.length;
	}, [
		width,
		chartContainerWidth,
		data
	]);
	const { angle: calculatedAngle, height: xAxisHeight } = useAutoAngleCalculation(maxLabelWidth, tickVariant === "angled", maxLabelWidth < 100 ? widthOfData : void 0);
	const isAngled = (0, react.useMemo)(() => {
		return calculatedAngle !== 0;
	}, [calculatedAngle]);
	const effectiveHeight = (0, react.useMemo)(() => {
		if (tickVariant === "angled") return xAxisHeight + height;
		return height + 30;
	}, [
		height,
		xAxisHeight,
		tickVariant
	]);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "lineChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const id = (0, react.useId)();
	const exportData = useExportChartData({
		type: "line",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel,
		extraOptions: { lineSize: strokeWidth }
	});
	const chartMargin = (0, react.useMemo)(() => ({
		top: 10,
		right: 10,
		bottom: CHART_CONTAINER_BOTTOM_MARGIN,
		left: showYAxis ? 10 : 0
	}), [showYAxis]);
	const onLineClick = (0, react.useCallback)((data) => {
		if (data?.activePayload?.length && data.activePayload.length > 10) {
			setIsSideBarTooltipOpen(true);
			setSideBarTooltipData({
				title: data.activeLabel,
				values: data.activePayload.map((payload) => ({
					value: payload.value,
					label: payload.name || payload.dataKey,
					color: getColorForDataKey(payload.dataKey, dataKeys, colors)
				}))
			});
		}
	}, [dataKeys, colors]);
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const effectiveWidth = (0, react.useMemo)(() => {
		return width ?? containerWidth;
	}, [width, containerWidth]);
	(0, react.useEffect)(() => {
		if (width || !containerRef.current || !chartContainerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === containerRef.current) setContainerWidth(entry.contentRect.width);
				if (entry.target === chartContainerRef.current) setChartContainerWidth(entry.contentRect.width);
			}
		});
		resizeObserver.observe(containerRef.current);
		resizeObserver.observe(chartContainerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [width]);
	(0, react.useEffect)(() => {
		setIsLegendExpanded(false);
	}, [dataKeys]);
	const legendItems = (0, react.useMemo)(() => {
		if (!legend) return [];
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons,
		legend
	]);
	const yAxis = (0, react.useMemo)(() => {
		if (!showYAxis) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-line-chart-condensed-y-axis-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.LineChart, {
				width: yAxisWidth,
				height: effectiveHeight,
				data,
				margin: {
					top: chartMargin.top,
					bottom: xAxisHeight + chartMargin.bottom,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					width: yAxisWidth,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth })
				}), dataKeys.map((key) => {
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Line, {
						dataKey: key,
						stroke: "transparent",
						strokeWidth: 0,
						dot: false,
						isAnimationActive: false
					}, `yaxis-line-chart-condensed-${key}`);
				})]
			}, `y-axis-line-chart-condensed-${id}`)
		});
	}, [
		showYAxis,
		effectiveHeight,
		data,
		dataKeys,
		id,
		yAxisWidth,
		chartMargin,
		xAxisHeight,
		setLabelWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelTooltipProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-line-chart-condensed-container", className),
			"data-inv-chart": exportData,
			style: { width: width ? `${width}px` : void 0 },
			children: [
				yAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-line-chart-condensed-y-axis-label",
					children: yAxisLabel
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-line-chart-condensed-container-inner",
					ref: containerRef,
					children: [
						yAxis,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-line-chart-condensed",
							ref: chartContainerRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: "100%",
									height: effectiveHeight
								},
								rechartsProps: {
									width: "100%",
									height: "100%"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.LineChart, {
									accessibilityLayer: true,
									data,
									margin: chartMargin,
									onClick: onLineClick,
									children: [
										grid && cartesianGrid(),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											dataKey: categoryKey,
											tickLine: false,
											axisLine: false,
											textAnchor: isAngled ? "end" : "middle",
											interval: "preserveStartEnd",
											minTickGap: 5,
											height: xAxisHeight,
											tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVGXAxisTick, {}),
											angle: calculatedAngle,
											orientation: "bottom",
											padding: {
												left: 20,
												right: 20
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: containerRef }),
											offset: 10
										}),
										dataKeys.map((key) => {
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Line, {
												dataKey: key,
												type: variant,
												stroke: `var(--color-${transformedKeys[key]})`,
												strokeWidth,
												dot: false,
												activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {}, `active-dot-${key}-${id}`),
												isAnimationActive
											}, `line-${key}`);
										})
									]
								}, `line-chart-condensed-${id}`)
							})
						}),
						isSideBarTooltipOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: effectiveHeight })
					]
				}),
				xAxisLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-line-chart-condensed-x-axis-label",
					children: xAxisLabel
				}),
				legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					containerWidth: effectiveWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			]
		})
	}) });
};
const LineChartCondensed = react.default.memo(LineChartCondensedComponent);
/**
* Transforms mini chart data into a standardized format for rendering.
* Handles both numeric values and objects with value/label properties.
* Works for both MiniAreaChart and MiniLineChart components.
*
* @param data - The mini chart data array (can contain numbers or objects with value/label)
* @returns An array of chart data objects with value and label properties
*/
const transformDataForChart$1 = (data) => {
	return data.map((item, index) => {
		if (typeof item === "number") return {
			value: item,
			label: `Item ${index + 1}`
		};
		else return {
			value: item.value,
			label: item.label || `Item ${index + 1}`
		};
	});
};
/**
* Filters data to include only the most recent items that can fit within the container width.
* This function ensures the chart displays the latest data when space is limited.
* Works for both MiniAreaChart and MiniLineChart components.
*
* @param data - The complete mini chart data array
* @param containerWidth - The total width of the container in pixels
* @returns A filtered array containing only the most recent data items that fit in the container
*/
const getRecentDataThatFits$1 = (data, containerWidth) => {
	if (containerWidth <= 0 || data.length === 0) return data;
	const maxItems = Math.floor((containerWidth + 20) / 20);
	if (maxItems >= data.length) return data;
	return data.slice(-maxItems);
};
const DATA_KEY$1 = "value";
//#endregion
//#region src/components/Charts/MiniAreaChart/MiniAreaChart.tsx
const MiniAreaChart = ({ data, theme = "ocean", customPalette, variant: areaChartVariant = "natural", opacity = .5, isAnimationActive = false, onAreaClick, size = "100%", className, areaColor, useGradient = true }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const variant = getLineType(areaChartVariant);
	(0, react.useEffect)(() => {
		if (!containerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	const filteredData = (0, react.useMemo)(() => {
		return getRecentDataThatFits$1(data, containerWidth);
	}, [data, containerWidth]);
	const chartData = (0, react.useMemo)(() => {
		return transformDataForChart$1(filteredData);
	}, [filteredData]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette: customPalette || (areaColor ? [areaColor] : void 0),
		themePaletteName: "areaChartPalette",
		dataLength: 1
	});
	const transformedKeys = (0, react.useMemo)(() => ({ [DATA_KEY$1]: DATA_KEY$1 }), []);
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig([DATA_KEY$1], colors, transformedKeys);
	}, [colors, transformedKeys]);
	const id = (0, react.useId)();
	const gradientId = (0, react.useMemo)(() => `miniAreaGradient-${id}`, [id]);
	const color = `var(--color-${DATA_KEY$1})`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
		config: chartConfig,
		style: {
			width: size,
			height: size,
			aspectRatio: 1 / 1,
			minHeight: 100,
			minWidth: 100
		},
		rechartsProps: { aspect: 1 / 1 },
		onClick: onAreaClick,
		ref: containerRef,
		className: (0, clsx.default)("inv-charts-mini-area-chart-container", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.AreaChart, {
			accessibilityLayer: true,
			data: chartData,
			margin: { top: 10 },
			children: [
				useGradient && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
					id: gradientId,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "5%",
						stopColor: color,
						stopOpacity: .6
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
						offset: "95%",
						stopColor: color,
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
					dataKey: "label",
					hide: true
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Area, {
					dataKey: DATA_KEY$1,
					type: variant,
					stroke: color,
					fill: useGradient ? `url(#${gradientId})` : color,
					fillOpacity: useGradient ? 1 : opacity,
					isAnimationActive,
					strokeWidth: 1.5
				})
			]
		})
	});
};
const CONTAINER_HORIZONTAL_PADDING = 8;
/**
* Calculates the total width of the data.
*
* @param data - The mini bar chart data array
* @returns The total width needed in pixels to display all data items
*/
const getWidthOfData = (data) => {
	return data.length * 18;
};
/**
* Calculates the left and right padding for the chart container based on available space.
* If the chart data exceeds the container width, no padding is applied.
*
* @param data - The mini bar chart data array
* @param containerWidth - The total width of the container in pixels
* @returns An object with left and right padding values in pixels
*/
const getPadding = (data, containerWidth) => {
	const paddingValue = containerWidth - CONTAINER_HORIZONTAL_PADDING - getWidthOfData(data);
	if (paddingValue < 0) return {
		left: 0,
		right: 0
	};
	return {
		left: paddingValue,
		right: 0
	};
};
/**
* Filters the data to include only the most recent items that can fit within the container width.
* This function ensures the chart displays the latest data when space is limited.
*
* @param data - The complete mini bar chart data array
* @param containerWidth - The total width of the container in pixels
* @returns A filtered array containing only the most recent data items that fit in the container
*/
const getRecentDataThatFits = (data, containerWidth) => {
	if (containerWidth <= 0 || data.length === 0) return data;
	const availableWidth = containerWidth - CONTAINER_HORIZONTAL_PADDING;
	const maxItems = Math.floor(availableWidth / 18);
	if (maxItems >= data.length) return data;
	return data.slice(-maxItems);
};
/**
* Transforms the mini bar chart data into a standardized format for rendering.
* Handles both numeric values and objects with value/label properties.
*
* @param data - The mini bar chart data array (can contain numbers or objects with value/label)
* @returns An array of chart data objects with value and label properties
*/
const transformDataForChart = (data) => {
	return data.map((item, index) => {
		if (typeof item === "number") return {
			value: item,
			label: `Item ${index + 1}`
		};
		else return {
			value: item.value,
			label: item.label || `Item ${index + 1}`
		};
	});
};
const DATA_KEY = "value";
//#endregion
//#region src/components/Charts/MiniBarChart/MiniBarChart.tsx
const MINI_BAR_CHART_INNER_LINE_WIDTH = 1;
const MiniBarChart = ({ data, theme = "ocean", customPalette, radius = 1, isAnimationActive = false, onBarsClick, size = "100%", className, barColor }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	(0, react.useEffect)(() => {
		if (!containerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	const filteredData = (0, react.useMemo)(() => {
		return getRecentDataThatFits(data, containerWidth);
	}, [data, containerWidth]);
	const chartData = (0, react.useMemo)(() => {
		return transformDataForChart(filteredData);
	}, [filteredData]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette: customPalette || (barColor ? [barColor] : void 0),
		themePaletteName: "barChartPalette",
		dataLength: 1
	});
	const transformedKeys = (0, react.useMemo)(() => ({ [DATA_KEY]: DATA_KEY }), []);
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig([DATA_KEY], colors, transformedKeys);
	}, [colors, transformedKeys]);
	const { mode } = useTheme();
	const barInternalLineColor = (0, react.useMemo)(() => {
		if (mode === "light") return "rgba(255, 255, 255, 0.3)";
		return "rgba(0, 0, 0, 0.3)";
	}, [mode]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
		config: chartConfig,
		style: {
			width: size,
			height: size,
			aspectRatio: 1 / 1,
			minHeight: 100,
			minWidth: 100
		},
		rechartsProps: { aspect: 1 / 1 },
		onClick: onBarsClick,
		ref: containerRef,
		className: (0, clsx.default)("inv-charts-mini-bar-chart-container", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.BarChart, {
			accessibilityLayer: true,
			data: chartData,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
				hide: true,
				padding: getPadding(filteredData, containerWidth)
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Bar, {
				dataKey: DATA_KEY,
				fill: `var(--color-${DATA_KEY})`,
				radius: [
					radius,
					radius,
					0,
					0
				],
				isAnimationActive,
				maxBarSize: 8,
				barSize: 8,
				shape: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineInBarShape, {
					internalLineWidth: MINI_BAR_CHART_INNER_LINE_WIDTH,
					internalLineColor: barInternalLineColor
				})
			})]
		})
	});
};
//#endregion
//#region src/components/Charts/MiniLineChart/MiniLineChart.tsx
const MiniLineChart = ({ data, theme = "ocean", customPalette, variant: lineChartVariant = "natural", strokeWidth = 2, isAnimationActive = true, onLineClick, size = "100%", className, lineColor }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const containerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const variant = getLineType(lineChartVariant);
	(0, react.useEffect)(() => {
		if (!containerRef.current) return () => {};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	const filteredData = (0, react.useMemo)(() => {
		return getRecentDataThatFits$1(data, containerWidth);
	}, [data, containerWidth]);
	const chartData = (0, react.useMemo)(() => {
		return transformDataForChart$1(filteredData);
	}, [filteredData]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette: customPalette || (lineColor ? [lineColor] : void 0),
		themePaletteName: "lineChartPalette",
		dataLength: 1
	});
	const transformedKeys = (0, react.useMemo)(() => ({ [DATA_KEY$1]: DATA_KEY$1 }), []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
		config: (0, react.useMemo)(() => {
			return get2dChartConfig([DATA_KEY$1], colors, transformedKeys);
		}, [colors, transformedKeys]),
		style: {
			width: size,
			height: size,
			aspectRatio: 1 / 1,
			minHeight: 100,
			minWidth: 100
		},
		rechartsProps: { aspect: 1 / 1 },
		onClick: onLineClick,
		ref: containerRef,
		className: (0, clsx.default)("inv-charts-mini-line-chart-container", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.LineChart, {
			accessibilityLayer: true,
			data: chartData,
			margin: { top: 10 },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
				dataKey: "label",
				hide: true
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Line, {
				dataKey: DATA_KEY$1,
				type: variant,
				stroke: `var(--color-${DATA_KEY$1})`,
				strokeWidth,
				dot: false,
				isAnimationActive
			})]
		})
	});
};
//#endregion
//#region src/components/Charts/PieChart/utils/PieChartUtils.ts
/**
* Utility functions for pie charts
*/
/**
* Calculates the percentage value of a number relative to a total
* @param value - The value to calculate percentage for
* @param total - The total value to calculate percentage against
* @returns The calculated percentage rounded to 2 decimal places
*/
const calculatePercentage$1 = (value, total) => {
	if (total === 0) return 0;
	return Number((value / total * 100).toFixed(2));
};
/**
* Calculates dimensions for standard pie/donut charts
* @param width - The container width
* @param variant - The chart variant ('pie' or 'donut')
* @returns Object containing outer and inner radius values
*/
const calculateChartDimensions = (width, variant) => {
	let outerRadius = Math.round(width * .45);
	outerRadius = Math.max(50, Math.min(outerRadius, width / 2 - 10));
	let innerRadius = 0;
	if (variant === "donut") innerRadius = Math.round(outerRadius * .6);
	return {
		outerRadius,
		innerRadius
	};
};
/**
* Calculates dimensions for two-level pie charts
* @param width - The container width
* @returns Object containing outer, middle, and inner radius values
*/
const calculateTwoLevelChartDimensions = (width) => {
	let outerRadius = Math.round(width * .45);
	outerRadius = Math.max(50, Math.min(outerRadius, width / 2 - 10));
	const middleRadius = Math.round(outerRadius * .9);
	const innerRadius = Math.round(middleRadius * .28);
	return {
		outerRadius,
		middleRadius,
		innerRadius
	};
};
/**
* Generates hover style properties for chart cells
* @param index - The index of the current cell
* @param activeIndex - The index of the currently hovered cell
* @returns Object containing hover style properties
*/
const getHoverStyles = (index, activeIndex) => {
	return {
		opacity: activeIndex === null || activeIndex === index ? 1 : .5,
		stroke: activeIndex === index ? "#fff" : "none",
		strokeWidth: activeIndex === index ? 2 : 0
	};
};
/**
* Transforms data by adding percentage calculations
* @param data - The input data array
* @param dataKey - The key to use for value calculations
* @returns Transformed data with added percentage and original value
*/
const transformDataWithPercentages = (data, dataKey) => {
	const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);
	return data.map((item) => ({
		...item,
		percentage: calculatePercentage$1(Number(item[dataKey]), total),
		originalValue: item[dataKey]
	}));
};
/**
* Custom hook for managing chart hover effects
* @returns Object containing hover state and handlers
*/
const useChartHover = () => {
	const [activeIndex, setActiveIndex] = (0, react$1.useState)(null);
	const handleMouseEnter = (_, index) => {
		setActiveIndex(index);
	};
	const handleMouseLeave = () => {
		setActiveIndex(null);
	};
	return {
		activeIndex,
		handleMouseEnter,
		handleMouseLeave
	};
};
/**
* Creates animation configuration for pie chart
* @param config - Animation configuration options
* @returns Animation configuration object
*/
const createAnimationConfig = (config = {}) => {
	return {
		isAnimationActive: config.isAnimationActive ?? true,
		animationBegin: config.animationBegin ?? 0,
		animationDuration: config.animationDuration ?? 1500,
		animationEasing: config.animationEasing ?? "ease"
	};
};
/**
* Creates event handlers for pie chart
* @param onMouseEnter - Mouse enter handler
* @param onMouseLeave - Mouse leave handler
* @param onClick - Click handler
* @returns Object containing event handlers
*/
const createEventHandlers = (onMouseEnter, onMouseLeave, onClick) => {
	return {
		onMouseEnter: onMouseEnter ? (data, index) => onMouseEnter(data, index) : void 0,
		onMouseLeave: onMouseLeave ? () => onMouseLeave() : void 0,
		onClick: onClick ? (data, index) => onClick(data, index) : void 0
	};
};
//#endregion
//#region src/components/Charts/PieChart/PieChart.tsx
const STACKED_LEGEND_BREAKPOINT$1 = 400;
const MIN_CHART_SIZE$2 = 150;
const MAX_CHART_SIZE$2 = 500;
const CORNER_RADIUS = 0;
const PieChartComponent = ({ data, categoryKey, dataKey, theme = "ocean", customPalette, variant = "pie", format = "number", legend = true, legendVariant = "stacked", isAnimationActive = true, appearance = "circular", cornerRadius, paddingAngle = 0, onMouseEnter, onMouseLeave, onClick, className, maxChartSize = MAX_CHART_SIZE$2, minChartSize = MIN_CHART_SIZE$2, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const wrapperRef = (0, react.useRef)(null);
	const [wrapperRect, setWrapperRect] = (0, react.useState)({
		width: 0,
		height: 0
	});
	const [hoveredLegendKey, setHoveredLegendKey] = (0, react.useState)(null);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const { activeIndex, handleMouseEnter, handleMouseLeave } = useChartHover();
	const { theme: userTheme } = useTheme();
	const isRowLayout = legend && legendVariant === "stacked" && wrapperRect.width >= STACKED_LEGEND_BREAKPOINT$1;
	const sortedProcessedData = (0, react.useMemo)(() => [...data].sort((a, b) => Number(b[dataKey]) - Number(a[dataKey])), [data, dataKey]);
	const transformedKeys = useTransformedKeys((0, react.useMemo)(() => sortedProcessedData.map((item) => String(item[categoryKey])), [sortedProcessedData, categoryKey]));
	const categoryKeyString = (0, react.useMemo)(() => String(categoryKey), [categoryKey]);
	const dataKeyString = (0, react.useMemo)(() => String(dataKey), [dataKey]);
	const formatKey = (0, react.useMemo)(() => format === "percentage" ? "percentage" : dataKeyString, [format, dataKeyString]);
	const effectiveWidth = wrapperRect.width;
	const effectiveHeight = wrapperRect.height;
	const chartSize = (0, react.useMemo)(() => {
		const containerWidth = isRowLayout ? Math.max(0, (effectiveWidth - 20) / 2) : effectiveWidth;
		let size = effectiveHeight >= minChartSize ? Math.min(containerWidth, effectiveHeight) : containerWidth;
		size = Math.min(size, maxChartSize);
		return Math.max(minChartSize, size);
	}, [
		effectiveWidth,
		effectiveHeight,
		isRowLayout
	]);
	const isSemiCircular = appearance === "semiCircular";
	const chartViewportHeight = (0, react.useMemo)(() => isSemiCircular ? Math.max(1, Math.ceil(chartSize / 2)) : chartSize, [chartSize, isSemiCircular]);
	const chartSizeStyle = (0, react.useMemo)(() => ({
		width: chartSize,
		height: chartViewportHeight
	}), [chartSize, chartViewportHeight]);
	const rechartsProps = (0, react.useMemo)(() => ({
		width: "100%",
		height: "100%",
		minWidth: 1,
		minHeight: 1,
		initialDimension: {
			width: 1,
			height: 1
		}
	}), []);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "pieChartPalette",
		dataLength: sortedProcessedData.length
	});
	const exportData = useExportChartData({
		type: "pie",
		data: sortedProcessedData,
		categoryKey,
		dataKeys: [dataKey],
		colors,
		legend
	});
	const transformedData = (0, react.useMemo)(() => transformDataWithPercentages(sortedProcessedData, dataKey), [sortedProcessedData, dataKey]);
	const chartConfig = (0, react.useMemo)(() => getCategoricalChartConfig(sortedProcessedData, categoryKey, colors, transformedKeys), [
		sortedProcessedData,
		categoryKey,
		colors,
		transformedKeys
	]);
	const animationConfig = (0, react.useMemo)(() => createAnimationConfig({ isAnimationActive }), [isAnimationActive]);
	const eventHandlers = (0, react.useMemo)(() => createEventHandlers(onMouseEnter, onMouseLeave, onClick), [
		onMouseEnter,
		onMouseLeave,
		onClick
	]);
	const sectorStyle = (0, react.useMemo)(() => {
		let cornerRadiusValue = CORNER_RADIUS;
		if (typeof cornerRadius === "number") cornerRadiusValue = cornerRadius;
		else {
			const cornerRadiusTheme = userTheme.radius2xs;
			if (cornerRadiusTheme) cornerRadiusValue = typeof cornerRadiusTheme === "string" ? parseInt(cornerRadiusTheme) : cornerRadiusTheme;
		}
		return {
			cornerRadius: cornerRadiusValue,
			paddingAngle: variant === "donut" ? .5 : paddingAngle
		};
	}, [
		cornerRadius,
		variant,
		paddingAngle,
		userTheme.radius2xs
	]);
	const legendItems = (0, react.useMemo)(() => sortedProcessedData.map((item, index) => ({
		key: String(item[categoryKey]),
		label: String(item[categoryKey]),
		value: Number(item[dataKey]),
		color: colors[index] || "#000000"
	})), [
		sortedProcessedData,
		categoryKey,
		dataKey,
		colors
	]);
	const defaultLegendItems = (0, react.useMemo)(() => {
		return legendItems.map(({ key, label, color }) => ({
			key,
			label,
			color
		}));
	}, [legendItems]);
	const handleLegendItemHover = (0, react.useCallback)((index) => {
		if (legendVariant !== "stacked") return;
		if (index !== null) {
			const item = sortedProcessedData[index];
			if (item) {
				const categoryValue = String(item[categoryKey]);
				setHoveredLegendKey(categoryValue);
				const transformedIndex = transformedData.findIndex((d) => String(d[categoryKey]) === categoryValue);
				if (transformedIndex !== -1) handleMouseEnter(transformedData[transformedIndex], transformedIndex);
			}
		} else {
			setHoveredLegendKey(null);
			handleMouseLeave();
		}
	}, [
		sortedProcessedData,
		categoryKey,
		transformedData,
		handleMouseEnter,
		handleMouseLeave,
		legendVariant
	]);
	const handleChartMouseEnter = (0, react.useCallback)((entry, index) => {
		handleMouseEnter(entry, index);
		if (legend && legendVariant === "stacked") setHoveredLegendKey(String(entry[categoryKey]));
		eventHandlers.onMouseEnter?.(entry, index);
	}, [
		handleMouseEnter,
		categoryKey,
		legend,
		legendVariant,
		eventHandlers.onMouseEnter
	]);
	const handleChartMouseLeave = (0, react.useCallback)(() => {
		handleMouseLeave();
		if (legend && legendVariant === "stacked") setHoveredLegendKey(null);
		eventHandlers.onMouseLeave?.();
	}, [
		handleMouseLeave,
		legend,
		legendVariant,
		eventHandlers.onMouseLeave
	]);
	const dimensions = (0, react.useMemo)(() => {
		if (variant === "donut") return calculateTwoLevelChartDimensions(chartSize);
		if (isSemiCircular) return {
			...calculateChartDimensions(chartSize, variant),
			middleRadius: 0
		};
		return {
			outerRadius: "90%",
			innerRadius: 0,
			middleRadius: 0
		};
	}, [
		variant,
		chartSize,
		isSemiCircular
	]);
	const startAngle = (0, react.useMemo)(() => appearance === "semiCircular" ? 180 : 0, [appearance]);
	const endAngle = (0, react.useMemo)(() => appearance === "semiCircular" ? 0 : 360, [appearance]);
	const commonPieProps = (0, react.useMemo)(() => ({
		data: transformedData,
		dataKey: formatKey,
		nameKey: categoryKeyString,
		labelLine: false,
		label: false,
		...animationConfig,
		...eventHandlers,
		...sectorStyle,
		startAngle,
		endAngle,
		cx: "50%",
		cy: isSemiCircular ? chartViewportHeight : "50%",
		onMouseEnter: handleChartMouseEnter,
		onMouseLeave: handleChartMouseLeave
	}), [
		transformedData,
		formatKey,
		categoryKeyString,
		animationConfig,
		eventHandlers,
		sectorStyle,
		startAngle,
		endAngle,
		isSemiCircular,
		chartViewportHeight,
		handleChartMouseEnter,
		handleChartMouseLeave
	]);
	(0, react.useLayoutEffect)(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) setWrapperRect({
				width: entry.contentRect.width,
				height: entry.contentRect.height
			});
		});
		observer.observe(wrapper);
		const rect = wrapper.getBoundingClientRect();
		setWrapperRect({
			width: rect.width,
			height: rect.height
		});
		return () => observer.disconnect();
	}, []);
	const renderPieCharts = (0, react.useCallback)(() => {
		if (variant === "donut") return [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Pie, {
			...commonPieProps,
			innerRadius: dimensions.innerRadius,
			outerRadius: dimensions.middleRadius,
			children: transformedData.map((entry, index) => {
				const categoryValue = String(entry[categoryKey] || "");
				const config = chartConfig[transformedKeys[categoryValue] ?? categoryValue];
				const hoverStyles = getHoverStyles(index, activeIndex);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Cell, {
					fill: config?.color || colors[index],
					...hoverStyles,
					stroke: "none",
					className: "inv-pie-chart__inner-cell"
				}, `inner-cell-${index}`);
			})
		}, "inner-pie"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Pie, {
			...commonPieProps,
			innerRadius: dimensions.middleRadius,
			outerRadius: dimensions.outerRadius,
			children: transformedData.map((entry, index) => {
				const categoryValue = String(entry[categoryKey] || "");
				const config = chartConfig[transformedKeys[categoryValue] ?? categoryValue];
				const hoverStyles = getHoverStyles(index, activeIndex);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Cell, {
					fill: config?.color || colors[index],
					...hoverStyles,
					stroke: "none"
				}, `outer-cell-${index}`);
			})
		}, "outer-pie")];
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Pie, {
			...commonPieProps,
			outerRadius: dimensions.outerRadius,
			innerRadius: dimensions.innerRadius,
			activeIndex: activeIndex ?? void 0,
			children: transformedData.map((entry, index) => {
				const categoryValue = String(entry[categoryKey] || "");
				const config = chartConfig[transformedKeys[categoryValue] ?? categoryValue];
				const hoverStyles = getHoverStyles(index, activeIndex);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Cell, {
					fill: config?.color || colors[index],
					...hoverStyles,
					stroke: "none"
				}, `cell-${index}`);
			})
		});
	}, [
		variant,
		commonPieProps,
		dimensions,
		transformedData,
		categoryKey,
		chartConfig,
		activeIndex,
		colors,
		transformedKeys
	]);
	const renderLegend = (0, react.useCallback)(() => {
		if (!legend) return null;
		if (legendVariant === "stacked") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-pie-chart-legend-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedLegend, {
				items: legendItems,
				onItemHover: setHoveredLegendKey,
				activeKey: hoveredLegendKey,
				onLegendItemHover: handleLegendItemHover,
				containerWidth: isRowLayout ? void 0 : wrapperRect.width
			})
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
			items: defaultLegendItems,
			containerWidth: wrapperRect.width,
			isExpanded: isLegendExpanded,
			setIsExpanded: setIsLegendExpanded
		});
	}, [
		legend,
		legendVariant,
		legendItems,
		hoveredLegendKey,
		handleLegendItemHover,
		wrapperRect.width,
		isRowLayout,
		defaultLegendItems,
		isLegendExpanded
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		className: (0, react.useMemo)(() => (0, clsx.default)("inv-pie-chart-container-wrapper", className, {
			"layout-row": isRowLayout,
			"layout-column": !isRowLayout,
			"legend-default": legend && legendVariant === "default",
			"legend-stacked": legend && legendVariant === "stacked"
		}), [
			className,
			legend,
			legendVariant,
			isRowLayout
		]),
		style: (0, react.useMemo)(() => {
			const formatDimension = (value) => {
				if (typeof value === "number") return `${value}px`;
				return value;
			};
			return {
				width: formatDimension(width),
				height: formatDimension(height)
			};
		}, [width, height]),
		"data-inv-chart": exportData,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-pie-chart-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-pie-chart-container-inner",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: chartSizeStyle,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
						config: chartConfig,
						className: "inv-pie-chart",
						rechartsProps,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.PieChart, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltipContent, { showPercentage: format === "percentage" }) }), renderPieCharts()] })
					})
				})
			})
		}), renderLegend()]
	});
};
const PieChart = (0, react.memo)(PieChartComponent);
PieChart.displayName = "PieChart";
//#endregion
//#region src/components/Charts/RadarChart/utils/index.ts
/**
* Truncates text to fit within specified width bounds
* @param text - The original text
* @param maxWidth - Maximum width in pixels
* @param fontSize - Font size for measurement
* @returns Truncated text with ellipsis if needed
*/
const truncateText = (text, maxWidth, fontSize = 10) => {
	if (maxWidth <= 0) return text;
	const context = document.createElement("canvas").getContext("2d");
	if (!context) return text;
	context.font = `${fontSize}px Inter`;
	if (context.measureText(text).width <= maxWidth) return text;
	let low = 0;
	let high = text.length;
	let result = text;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const truncated = text.substring(0, mid) + "...";
		if (context.measureText(truncated).width <= maxWidth) {
			result = truncated;
			low = mid + 1;
		} else high = mid - 1;
	}
	return result;
};
/**
* Calculates the available width for a text label based on its position and anchor point
*
* This function determines how much horizontal space is available for a text label
* by checking its position relative to the container bounds. The calculation varies
* based on the text anchor position:
*
* - For "start" anchored text: Available space is from labelX to container right edge
* - For "end" anchored text: Available space is from container left edge to labelX
* - For "middle" anchored text: Takes minimum of left/right space and doubles it
*
* @param labelX - X coordinate of the label position
* @param containerWidth - Total width of the container
* @param textAnchor - How text is anchored ("start", "end", or "middle")
* @param padding - Optional padding to maintain from container edges (default 10px)
* @returns The maximum width available for the label in pixels
*/
const calculateAvailableWidth = (labelX, containerWidth, textAnchor, padding = 0) => {
	switch (textAnchor) {
		case "start": return Math.max(0, containerWidth - labelX - padding);
		case "end": return Math.max(0, labelX - padding);
		default:
			const leftSpace = labelX - padding;
			const rightSpace = containerWidth - labelX - padding;
			return Math.max(0, Math.min(leftSpace, rightSpace) * 2);
	}
};
//#endregion
//#region src/components/Charts/RadarChart/components/AxisLabel.tsx
const AxisLabel = (props) => {
	const { x, y, payload, textAnchor, portalContainerRef, className } = props;
	const anchorRef = (0, react.useRef)(null);
	/**
	* Memoizes the calculation of truncated text for axis labels
	*
	* This hook handles text truncation based on available space in the chart container:
	* 1. Returns empty string or original value if payload/container is missing
	* 2. Calculates container width and available space based on text anchor position
	* 3. Truncates text to fit within available width using specified font size
	*
	* @returns {string} Truncated text that fits within available space
	*
	* Dependencies:
	* - payload?.value: The text content to truncate
	* - x: X-coordinate of the label
	* - textAnchor: Text anchor position ('start', 'middle', 'end')
	* - portalContainerRef: Reference to container element
	*/
	const truncatedText = (0, react.useMemo)(() => {
		if (!payload?.value || !portalContainerRef?.current) return payload?.value || "";
		const containerWidth = portalContainerRef.current.getBoundingClientRect().width;
		const padding = 0;
		const fontSize = 10;
		const availableWidth = calculateAvailableWidth(x || 0, containerWidth, textAnchor || "middle", padding);
		return truncateText(payload.value, availableWidth, fontSize);
	}, [
		payload?.value,
		x,
		textAnchor,
		portalContainerRef
	]);
	(0, react.useLayoutEffect)(() => {
		const container = portalContainerRef?.current;
		const anchor = anchorRef.current;
		if (!container || !anchor || !truncatedText) return;
		const labelEl = document.createElement("div");
		labelEl.textContent = truncatedText;
		container.appendChild(labelEl);
		const updatePosition = () => {
			const anchorRect = anchor.getBoundingClientRect();
			const containerRect = container.getBoundingClientRect();
			const left = anchorRect.left - containerRect.left;
			const top = anchorRect.top - containerRect.top;
			const padding = 0;
			let transform = "";
			if (textAnchor === "end") transform = `translate(calc(-100% - ${padding}px), -50%)`;
			else if (textAnchor === "start") transform = `translate(${padding}px, -50%)`;
			else transform = "translate(-50%, -50%)";
			labelEl.style.position = "absolute";
			labelEl.style.left = `${left}px`;
			labelEl.style.top = `${top}px`;
			labelEl.style.transform = transform;
			labelEl.style.pointerEvents = "none";
			labelEl.style.zIndex = "0";
			labelEl.className = (0, clsx.default)("inv-chart-polar-angle-axis-label", className);
			const containerWidth = containerRect.width;
			const availableWidth = calculateAvailableWidth(left, containerWidth, textAnchor ?? "middle", 0);
			const newTruncatedText = truncateText(payload?.value ?? "", availableWidth, 10);
			if (labelEl.textContent !== newTruncatedText) labelEl.textContent = newTruncatedText;
		};
		updatePosition();
		const resizeObserver = new ResizeObserver(updatePosition);
		resizeObserver.observe(container);
		return () => {
			resizeObserver.disconnect();
			if (container.contains(labelEl)) container.removeChild(labelEl);
		};
	}, [
		x,
		y,
		textAnchor,
		truncatedText,
		portalContainerRef,
		className,
		payload?.value
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		ref: anchorRef,
		transform: `translate(${x || 0}, ${y || 0})`
	});
};
//#endregion
//#region src/components/Charts/RadarChart/RadarChart.tsx
const MIN_CHART_SIZE$1 = 150;
const MAX_CHART_SIZE$1 = 296;
const RadarChartComponent = ({ data, categoryKey, theme = "ocean", customPalette, variant = "line", grid = true, legend = true, strokeWidth = 2, areaOpacity = .2, icons = {}, isAnimationActive = false, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const dataKeys = (0, react.useMemo)(() => {
		return getDataKeys(data, categoryKey);
	}, [data, categoryKey]);
	const transformedKeys = useTransformedKeys(dataKeys);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "radarChartPalette",
		dataLength: dataKeys.length
	});
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(dataKeys, colors, transformedKeys, void 0, icons);
	}, [
		dataKeys,
		icons,
		colors,
		transformedKeys
	]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(dataKeys, colors, icons);
	}, [
		dataKeys,
		colors,
		icons
	]);
	const exportData = useExportChartData({
		type: "radar",
		data,
		categoryKey,
		dataKeys,
		colors,
		legend
	});
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const wrapperRef = (0, react.useRef)(null);
	const [wrapperRect, setWrapperRect] = (0, react.useState)({
		width: 0,
		height: 0
	});
	(0, react.useLayoutEffect)(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) setWrapperRect({
				width: entry.contentRect.width,
				height: entry.contentRect.height
			});
		});
		const rect = wrapper.getBoundingClientRect();
		setWrapperRect({
			width: rect.width,
			height: rect.height
		});
		observer.observe(wrapper);
		return () => observer.disconnect();
	}, []);
	const chartSize = (0, react.useMemo)(() => {
		const effectiveWidth = wrapperRect.width;
		const effectiveHeight = wrapperRect.height;
		let charts = Math.min(effectiveWidth, effectiveHeight);
		charts = Math.min(charts, MAX_CHART_SIZE$1);
		return Math.max(MIN_CHART_SIZE$1, charts);
	}, [wrapperRect]);
	const chartSizeStyle = (0, react.useMemo)(() => ({
		width: chartSize,
		height: chartSize
	}), [chartSize]);
	const rechartsProps = (0, react.useMemo)(() => ({
		width: "100%",
		height: "100%",
		minWidth: 1,
		minHeight: 1,
		initialDimension: {
			width: 1,
			height: 1
		}
	}), []);
	const radars = (0, react.useMemo)(() => {
		return dataKeys.map((key) => {
			const color = `var(--color-${transformedKeys[key]})`;
			if (variant === "line") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Radar, {
				dataKey: key,
				fill: color,
				fillOpacity: 0,
				stroke: color,
				strokeWidth,
				isAnimationActive,
				activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {})
			}, key);
			else return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Radar, {
				dataKey: key,
				fill: color,
				stroke: color,
				strokeWidth,
				fillOpacity: areaOpacity,
				isAnimationActive,
				activeDot: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActiveDot, {})
			}, key);
		});
	}, [
		dataKeys,
		transformedKeys,
		variant,
		strokeWidth,
		areaOpacity,
		isAnimationActive
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen: false,
		setIsSideBarTooltipOpen: () => {},
		data: void 0,
		setData: () => {},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref: wrapperRef,
			className: (0, react.useMemo)(() => (0, clsx.default)("inv-radar-chart-container-wrapper", { "layout-column": true }), []),
			style: (0, react.useMemo)(() => {
				const formatDimension = (value) => {
					if (typeof value === "number") return `${value}px`;
					return value;
				};
				const dimensions = {
					width: formatDimension(width),
					height: formatDimension(height)
				};
				if (dimensions.width === void 0) delete dimensions.width;
				if (dimensions.height === void 0) delete dimensions.height;
				return dimensions;
			}, [width, height]),
			"data-inv-chart": exportData,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-radar-chart-container",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-radar-chart-container-inner",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: chartSizeStyle,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
							config: chartConfig,
							className: "inv-radar-chart",
							rechartsProps,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.RadarChart, {
								data,
								margin: {
									left: 10,
									right: 10,
									top: 10,
									bottom: 10
								},
								children: [
									grid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.PolarGrid, {
										className: "inv-chart-polar-grid",
										stroke: "currentColor"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.PolarAngleAxis, {
										dataKey: categoryKey,
										tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AxisLabel, { portalContainerRef: wrapperRef })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
										cursor: false,
										content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, { parentRef: wrapperRef })
									}),
									radars
								]
							})
						})
					})
				})
			}), legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
				items: legendItems,
				containerWidth: wrapperRect.width,
				isExpanded: isLegendExpanded,
				setIsExpanded: setIsLegendExpanded,
				style: { paddingTop: 0 }
			})]
		})
	});
};
const RadarChart = (0, react.memo)(RadarChartComponent);
RadarChart.displayName = "RadarChart";
//#endregion
//#region src/components/Charts/RadialChart/utils/RadialChartUtils.ts
/**
* Utility functions for radial charts
*/
/**
* Calculates the percentage value of a number relative to a total
* @param value - The value to calculate percentage for
* @param total - The total value to calculate percentage against
* @returns The calculated percentage rounded to 2 decimal places
*/
const calculatePercentage = (value, total) => {
	if (total === 0) return 0;
	return Number((value / total * 100).toFixed(2));
};
/**
* Calculates dimensions for radial charts based on container size
* @param width - The container width
* @param variant - The chart variant ('semicircle' or 'circular')
* @returns Object containing outer and inner radius values
*/
const calculateRadialChartDimensions = (width) => {
	let outerRadius = Math.round(width * .45);
	outerRadius = Math.max(50, Math.min(outerRadius, Math.round(width / 2) - 10));
	const innerRadius = Math.round(outerRadius * .3);
	return {
		outerRadius,
		innerRadius
	};
};
/**
* Generates hover style properties for radial chart cells
* @param index - The index of the current cell
* @param activeIndex - The index of the currently hovered cell
* @returns Object containing hover style properties
*/
const getRadialHoverStyles = (index, activeIndex) => {
	return {
		opacity: activeIndex === null || activeIndex === index ? 1 : .6,
		stroke: activeIndex === index ? "#fff" : "none",
		strokeWidth: activeIndex === index ? 2 : 0
	};
};
/**
* Transforms data by adding percentage calculations and colors
* @param data - The input data array
* @param dataKey - The key to use for value calculations
* @param theme - The color theme to use
* @returns Transformed data with added percentage, original value, and fill color
*/
const transformRadialDataWithPercentages = (data, dataKey, colors) => {
	const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);
	return data.map((item, index) => ({
		...item,
		percentage: calculatePercentage(Number(item[dataKey]), total),
		originalValue: item[dataKey],
		fill: colors[index]
	}));
};
/**
* Custom hook for managing radial chart hover effects
* @returns Object containing hover state and handlers
*/
const useRadialChartHover = () => {
	const [activeIndex, setActiveIndex] = (0, react$1.useState)(null);
	const handleMouseEnter = (_, index) => {
		setActiveIndex(index);
	};
	const handleMouseLeave = () => {
		setActiveIndex(null);
	};
	return {
		activeIndex,
		handleMouseEnter,
		handleMouseLeave
	};
};
/**
* Creates animation configuration for radial chart
* @param config - Animation configuration options
* @returns Animation configuration object
*/
const createRadialAnimationConfig = (config = {}) => {
	return {
		isAnimationActive: config.isAnimationActive ?? true,
		animationBegin: config.animationBegin ?? 0,
		animationDuration: config.animationDuration ?? 1500,
		animationEasing: config.animationEasing ?? "ease"
	};
};
/**
* Creates event handlers for radial chart
* @param onMouseEnter - Mouse enter handler
* @param onMouseLeave - Mouse leave handler
* @param onClick - Click handler
* @returns Object containing event handlers
*/
const createRadialEventHandlers = (onMouseEnter, onMouseLeave, onClick) => {
	return {
		onMouseEnter: onMouseEnter ? (data, index) => onMouseEnter(data, index) : void 0,
		onMouseLeave: onMouseLeave ? () => onMouseLeave() : void 0,
		onClick: onClick ? (data, index) => onClick(data, index) : void 0
	};
};
//#endregion
//#region src/components/Charts/RadialChart/RadialChart.tsx
const STACKED_LEGEND_BREAKPOINT = 400;
const MIN_CHART_SIZE = 150;
const MAX_CHART_SIZE = 500;
const RadialChart = ({ data, categoryKey, dataKey, theme = "ocean", customPalette, variant = "circular", format = "number", legend = true, legendVariant = "stacked", grid = false, isAnimationActive = false, cornerRadius = 10, onMouseEnter, onMouseLeave, onClick, className, maxChartSize = MAX_CHART_SIZE, minChartSize = MIN_CHART_SIZE, height, width }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const wrapperRef = (0, react.useRef)(null);
	const [wrapperRect, setWrapperRect] = (0, react.useState)({
		width: 0,
		height: 0
	});
	const [hoveredLegendKey, setHoveredLegendKey] = (0, react.useState)(null);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const { activeIndex, handleMouseEnter, handleMouseLeave } = useRadialChartHover();
	const isRowLayout = legend && legendVariant === "stacked" && wrapperRect.width >= STACKED_LEGEND_BREAKPOINT;
	const sortedProcessedData = (0, react.useMemo)(() => [...data].sort((a, b) => Number(b[dataKey]) - Number(a[dataKey])), [data, dataKey]);
	const transformedKeys = useTransformedKeys((0, react.useMemo)(() => sortedProcessedData.map((item) => String(item[categoryKey])), [sortedProcessedData, categoryKey]));
	const categoryKeyString = (0, react.useMemo)(() => String(categoryKey), [categoryKey]);
	const dataKeyString = (0, react.useMemo)(() => String(dataKey), [dataKey]);
	const formatKey = (0, react.useMemo)(() => format === "percentage" ? "percentage" : dataKeyString, [format, dataKeyString]);
	const effectiveWidth = wrapperRect.width;
	const effectiveHeight = wrapperRect.height;
	const chartSize = (0, react.useMemo)(() => {
		const containerWidth = isRowLayout ? Math.max(0, (effectiveWidth - 20) / 2) : effectiveWidth;
		let size = effectiveHeight >= minChartSize ? Math.min(containerWidth, effectiveHeight) : containerWidth;
		size = Math.min(size, maxChartSize);
		return Math.max(minChartSize, size);
	}, [
		effectiveWidth,
		effectiveHeight,
		isRowLayout
	]);
	const chartSizeStyle = (0, react.useMemo)(() => ({
		width: chartSize,
		height: chartSize
	}), [chartSize]);
	const rechartsProps = (0, react.useMemo)(() => ({
		width: "100%",
		height: "100%",
		minWidth: 1,
		minHeight: 1,
		initialDimension: {
			width: 1,
			height: 1
		}
	}), []);
	const dimensions = (0, react.useMemo)(() => calculateRadialChartDimensions(chartSize), [chartSize]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "radialChartPalette",
		dataLength: sortedProcessedData.length
	});
	const exportData = useExportChartData({
		type: "pie",
		data: sortedProcessedData,
		categoryKey,
		dataKeys: [dataKey],
		colors,
		legend
	});
	const transformedData = (0, react.useMemo)(() => transformRadialDataWithPercentages(sortedProcessedData, dataKey, colors), [
		sortedProcessedData,
		dataKey,
		colors
	]);
	const chartConfig = (0, react.useMemo)(() => getCategoricalChartConfig(sortedProcessedData, categoryKey, colors, transformedKeys), [
		sortedProcessedData,
		categoryKey,
		colors,
		transformedKeys
	]);
	const animationConfig = (0, react.useMemo)(() => createRadialAnimationConfig({ isAnimationActive }), [isAnimationActive]);
	const eventHandlers = (0, react.useMemo)(() => createRadialEventHandlers(onMouseEnter, onMouseLeave, onClick), [
		onMouseEnter,
		onMouseLeave,
		onClick
	]);
	const legendItems = (0, react.useMemo)(() => sortedProcessedData.map((item, index) => ({
		key: String(item[categoryKey]),
		label: String(item[categoryKey]),
		value: Number(item[dataKey]),
		color: colors[index] || "#000000"
	})), [
		sortedProcessedData,
		categoryKey,
		dataKey,
		colors
	]);
	const defaultLegendItems = (0, react.useMemo)(() => {
		return legendItems.map(({ key, label, color }) => ({
			key,
			label,
			color
		}));
	}, [legendItems]);
	const handleLegendItemHover = (0, react.useCallback)((index) => {
		if (legendVariant !== "stacked") return;
		if (index !== null) {
			const item = sortedProcessedData[index];
			if (item) {
				const categoryValue = String(item[categoryKey]);
				setHoveredLegendKey(categoryValue);
				const transformedIndex = transformedData.findIndex((d) => String(d[categoryKey]) === categoryValue);
				if (transformedIndex !== -1) handleMouseEnter(transformedData[transformedIndex], transformedIndex);
			}
		} else {
			setHoveredLegendKey(null);
			handleMouseLeave();
		}
	}, [
		sortedProcessedData,
		categoryKey,
		transformedData,
		handleMouseEnter,
		handleMouseLeave,
		legendVariant
	]);
	const handleChartMouseEnter = (0, react.useCallback)((entry, index) => {
		handleMouseEnter(entry, index);
		if (legend && legendVariant === "stacked") setHoveredLegendKey(String(entry[categoryKey]));
		eventHandlers.onMouseEnter?.(entry, index);
	}, [
		handleMouseEnter,
		categoryKey,
		legend,
		legendVariant,
		eventHandlers.onMouseEnter
	]);
	const handleChartMouseLeave = (0, react.useCallback)(() => {
		handleMouseLeave();
		if (legend && legendVariant === "stacked") setHoveredLegendKey(null);
		eventHandlers.onMouseLeave?.();
	}, [
		handleMouseLeave,
		legend,
		legendVariant,
		eventHandlers.onMouseLeave
	]);
	(0, react.useEffect)(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) setWrapperRect({
				width: entry.contentRect.width,
				height: entry.contentRect.height
			});
		});
		observer.observe(wrapper);
		return () => observer.disconnect();
	}, []);
	const renderLegend = (0, react.useCallback)(() => {
		if (!legend) return null;
		if (legendVariant === "stacked") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-radial-chart-legend-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedLegend, {
				items: legendItems,
				onItemHover: setHoveredLegendKey,
				activeKey: hoveredLegendKey,
				onLegendItemHover: handleLegendItemHover,
				containerWidth: isRowLayout ? void 0 : wrapperRect.width
			})
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
			items: defaultLegendItems,
			containerWidth: wrapperRect.width,
			isExpanded: isLegendExpanded,
			setIsExpanded: setIsLegendExpanded
		});
	}, [
		legend,
		legendVariant,
		legendItems,
		hoveredLegendKey,
		handleLegendItemHover,
		wrapperRect.width,
		isRowLayout,
		defaultLegendItems,
		isLegendExpanded
	]);
	const wrapperClassName = (0, clsx.default)("inv-radial-chart-container-wrapper", className, {
		"layout-row": isRowLayout,
		"layout-column": !isRowLayout,
		"legend-default": legend && legendVariant === "default",
		"legend-stacked": legend && legendVariant === "stacked"
	});
	const startAngle = variant === "semicircle" ? 180 : 0;
	const endAngle = variant === "semicircle" ? 0 : 360;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		className: wrapperClassName,
		style: (0, react.useMemo)(() => {
			const formatDimension = (value) => {
				if (typeof value === "number") return `${value}px`;
				return value;
			};
			const dimensions = {
				width: formatDimension(width),
				height: formatDimension(height)
			};
			if (dimensions.width === void 0) delete dimensions.width;
			if (dimensions.height === void 0) delete dimensions.height;
			return dimensions;
		}, [width, height]),
		"aria-description": "radial-chart-wrapper",
		"data-inv-chart": exportData,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-radial-chart-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-radial-chart-container-inner",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: chartSizeStyle,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
						config: chartConfig,
						className: "inv-radial-chart",
						rechartsProps,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.RadialBarChart, {
							data: transformedData,
							startAngle,
							endAngle,
							innerRadius: dimensions.innerRadius,
							outerRadius: dimensions.outerRadius,
							children: [
								grid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.PolarGrid, { gridType: "circle" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
									cursor: false,
									content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltipContent, {
										showPercentage: format === "percentage",
										nameKey: categoryKeyString
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.RadialBar, {
									dataKey: formatKey,
									background: !grid,
									cornerRadius,
									...animationConfig,
									activeIndex: activeIndex ?? void 0,
									onMouseEnter: handleChartMouseEnter,
									onMouseLeave: handleChartMouseLeave,
									onClick: eventHandlers.onClick,
									children: transformedData.map((entry, index) => {
										const config = chartConfig[String(entry[categoryKey] || "")];
										const hoverStyles = getRadialHoverStyles(index, activeIndex);
										return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Cell, {
											fill: config?.color || colors[index],
											...hoverStyles,
											stroke: "none"
										}, `cell-${index}`);
									})
								})
							]
						})
					})
				})
			})
		}), renderLegend()]
	});
};
//#endregion
//#region src/components/Charts/ScatterChart/components/ScatterDot.tsx
const ScatterDot = ({ cx, cy, fill, variant = "circle" }) => {
	const [active, setActive] = (0, react.useState)(false);
	if (typeof cx !== "number" || typeof cy !== "number") return null;
	const OUTLINE_COLOR = "var(--inv-highlight)";
	const OUTLINE_WIDTH = 2;
	const displayRadius = active ? 5 : 3;
	if (variant === "square") {
		const sideLength = displayRadius * 2;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: cx - displayRadius,
			y: cy - displayRadius,
			width: sideLength,
			height: sideLength,
			fill,
			stroke: active ? OUTLINE_COLOR : "none",
			strokeWidth: OUTLINE_WIDTH,
			strokeLinejoin: "round",
			vectorEffect: "non-scaling-stroke",
			rx: 2,
			onPointerEnter: () => {
				setActive(true);
			},
			onPointerLeave: () => {
				setActive(false);
			}
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
		cx,
		cy,
		r: displayRadius,
		fill,
		stroke: active ? OUTLINE_COLOR : "none",
		strokeWidth: OUTLINE_WIDTH,
		vectorEffect: "non-scaling-stroke",
		onPointerEnter: () => {
			setActive(true);
		},
		onPointerLeave: () => {
			setActive(false);
		}
	});
};
//#endregion
//#region src/components/Charts/ScatterChart/utils/ScatterChartUtils.ts
/**
* Extracts dataset names from scatter chart data
* @param data - The scatter chart data (array of datasets)
* @returns Array of dataset names
*/
const getScatterDatasets = (data) => {
	if (!data || !Array.isArray(data)) return [];
	return data.map((dataset) => dataset.name);
};
/**
* Transforms scatter chart data for recharts consumption
* @param data - The scatter chart data (array of datasets)
* @param datasets - Array of dataset names to include
* @param colors - Array of colors for datasets
* @returns Flattened array of all points with color and dataset info
*/
const transformScatterData = (data, datasets, colors) => {
	if (!data || !Array.isArray(data) || data.length === 0) return [];
	const datasetColors = {};
	datasets.forEach((ds, i) => {
		datasetColors[ds] = colors[i] ?? "transparent";
	});
	const transformedPoints = [];
	data.forEach((dataset) => {
		const color = datasetColors[dataset.name] || "transparent";
		dataset.data.forEach((point) => {
			transformedPoints.push({
				...point,
				x: Number(point.x),
				y: Number(point.y),
				z: point.z ? Number(point.z) : void 0,
				color,
				dataset: dataset.name
			});
		});
	});
	return transformedPoints;
};
/**
* Calculates the domain for scatter chart axes
* @param data - The scatter chart data (array of datasets)
* @param axis - Which axis ('x' or 'y')
* @returns Domain array [min, max] with padding
*/
const calculateScatterDomain = (data, axis) => {
	if (!data || !Array.isArray(data) || !data.length) return [0, 100];
	const values = data.flatMap((dataset) => dataset.data).map((point) => Number(point[axis])).filter((val) => !isNaN(val));
	if (!values.length) return [0, 100];
	const min = Math.min(...values);
	const max = Math.max(...values);
	const padding = (max - min) * .1;
	return [Math.max(0, min - padding), max + padding];
};
/**
* Formats scatter chart data for tooltip display
* @param dataKey - The data key being displayed
* @param value - The value to format
* @param unit - Optional unit to append
* @returns Formatted string
*/
const formatScatterTooltipValue = (value, unit) => {
	const formattedValue = typeof value === "number" ? value.toLocaleString() : value;
	return unit ? `${formattedValue} ${unit}` : formattedValue;
};
//#endregion
//#region src/components/Charts/ScatterChart/ScatterChart.tsx
const DEFAULT_CHART_HEIGHT = 296;
const X_AXIS_HEIGHT = 40;
const ScatterChart = ({ data, xAxisDataKey = "x", yAxisDataKey = "y", theme = "ocean", customPalette, grid = true, xAxisLabel, yAxisLabel, legend = true, isAnimationActive = false, className, height, width, shape = "circle" }) => {
	isAnimationActive = usePrintContext() ? false : isAnimationActive;
	const datasets = (0, react.useMemo)(() => {
		return getScatterDatasets(data);
	}, [data]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "lineChartPalette",
		dataLength: datasets.length
	});
	const transformedData = (0, react.useMemo)(() => {
		if (!data || !Array.isArray(data)) return [];
		return transformScatterData(data, datasets, colors);
	}, [
		data,
		datasets,
		colors
	]);
	const { yAxisWidth, setLabelWidth } = useYAxisLabelWidth(transformedData, [yAxisDataKey]);
	const chartConfig = (0, react.useMemo)(() => {
		return get2dChartConfig(datasets, colors, datasets.reduce((acc, key) => ({
			...acc,
			[key]: key
		}), {}), void 0);
	}, [datasets, colors]);
	const chartWrapperRef = (0, react.useRef)(null);
	const legendContainerRef = (0, react.useRef)(null);
	const xAxisContainerRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [isSideBarTooltipOpen, setIsSideBarTooltipOpen] = (0, react.useState)(false);
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [sideBarTooltipData, setSideBarTooltipData] = (0, react.useState)({
		title: "",
		values: []
	});
	const chartWidth = (0, react.useMemo)(() => {
		if (!containerWidth) return;
		return containerWidth - yAxisWidth;
	}, [containerWidth, yAxisWidth]);
	const chartHeight = (0, react.useMemo)(() => {
		const legendHeight = legendContainerRef.current?.offsetHeight ?? 0;
		const xAxisHeight = xAxisContainerRef.current?.offsetHeight ?? 0;
		if (typeof height === "number") return height - legendHeight - xAxisHeight;
		if (typeof height === "string" && height.endsWith("px")) {
			const numericHeight = parseInt(height, 10);
			if (!isNaN(numericHeight)) return numericHeight - legendHeight - xAxisHeight;
		}
		if (!height || !chartWrapperRef.current) return DEFAULT_CHART_HEIGHT;
		return chartWrapperRef.current.offsetHeight - legendHeight - xAxisHeight;
	}, [containerWidth, height]);
	const isFixedNumericHeight = (0, react.useMemo)(() => {
		if (typeof height === "number") return true;
		if (typeof height === "string" && height.endsWith("px")) return true;
		return false;
	}, [height]);
	const xDomain = (0, react.useMemo)(() => {
		return calculateScatterDomain(data, xAxisDataKey);
	}, [data, xAxisDataKey]);
	const yDomain = (0, react.useMemo)(() => {
		return calculateScatterDomain(data, yAxisDataKey);
	}, [data, yAxisDataKey]);
	const renderDotShape = (0, react.useMemo)(() => {
		return (props) => {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScatterDot, {
				...props,
				variant: shape
			});
		};
	}, [shape]);
	(0, react.useEffect)(() => {
		const chartElement = chartWrapperRef.current;
		if (!chartElement) return;
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) if (entry.target === chartElement) setContainerWidth(entry.contentRect.width);
		});
		resizeObserver.observe(chartElement);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	(0, react.useEffect)(() => {
		setIsSideBarTooltipOpen(false);
		setIsLegendExpanded(false);
	}, [datasets]);
	const legendItems = (0, react.useMemo)(() => {
		return getLegendItems(datasets, colors);
	}, [datasets, colors]);
	const exportData = useExportChartData({
		type: "scatter",
		data,
		colors,
		legend,
		xAxisLabel,
		yAxisLabel,
		customDataTransform: () => data.map((dataset) => ({
			name: dataset.name,
			x: dataset.data.map((p) => p[xAxisDataKey]),
			y: dataset.data.map((p) => p[yAxisDataKey])
		}))
	});
	const id = (0, react.useId)();
	const xAxis = (0, react.useMemo)(() => {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-scatter-chart-x-axis-container",
			ref: xAxisContainerRef,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
				config: chartConfig,
				style: {
					width: "100%",
					height: X_AXIS_HEIGHT
				},
				rechartsProps: { height: X_AXIS_HEIGHT },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.ScatterChart, {
					data: transformedData,
					margin: {
						top: 10,
						bottom: 0,
						left: yAxisWidth,
						right: 0
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
						type: "number",
						height: X_AXIS_HEIGHT,
						name: xAxisLabel,
						tickLine: false,
						axisLine: false,
						tickFormatter: numberTickFormatter,
						tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVGXAxisTick, { dy: 10 }),
						domain: xDomain,
						dataKey: xAxisDataKey
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Scatter, {
						data: transformedData,
						fill: "transparent",
						isAnimationActive,
						shape: "circle"
					})]
				}, `x-axis-scatter-chart-${id}`)
			})
		});
	}, [
		chartConfig,
		transformedData,
		id,
		xDomain,
		xAxisDataKey,
		isAnimationActive,
		xAxisLabel,
		yAxisWidth
	]);
	const yAxis = (0, react.useMemo)(() => {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-scatter-chart-y-axis-container",
			style: { height: chartHeight + 20 },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.ScatterChart, {
				width: yAxisWidth,
				height: chartHeight + 10,
				data: transformedData,
				margin: {
					top: 10,
					bottom: 12,
					left: 0,
					right: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
					type: "number",
					width: yAxisWidth,
					dataKey: yAxisDataKey,
					name: yAxisLabel,
					domain: yDomain,
					tickLine: false,
					axisLine: false,
					tick: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(YAxisTick, { setLabelWidth }),
					tickFormatter: numberTickFormatter
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Scatter, {
					data: transformedData,
					fill: "transparent",
					isAnimationActive,
					shape: "circle"
				})]
			}, `y-axis-scatter-chart-${id}`)
		});
	}, [
		transformedData,
		id,
		yAxisWidth,
		chartHeight,
		yDomain,
		yAxisDataKey,
		yAxisLabel,
		isAnimationActive,
		setLabelWidth
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltipProvider, {
		isSideBarTooltipOpen,
		setIsSideBarTooltipOpen,
		data: sideBarTooltipData,
		setData: setSideBarTooltipData,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-scatter-chart-container", className),
			"data-inv-chart": exportData,
			style: {
				width: typeof width === "number" ? `${width}px` : width || "100%",
				height: isFixedNumericHeight ? "auto" : height ?? "auto"
			},
			ref: chartWrapperRef,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-scatter-chart-container-inner",
				children: [
					yAxis,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-scatter-chart-main-and-x-axis-container",
						style: { width: chartWidth },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-scatter-chart-main-container",
							style: {
								width: "100%",
								height: chartHeight
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartContainer, {
								config: chartConfig,
								style: {
									width: "100%",
									height: "100%",
									aspectRatio: 0
								},
								rechartsProps: {
									width: "100%",
									height: "100%"
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(recharts.ScatterChart, {
									margin: {
										top: 10,
										right: 2,
										bottom: 2,
										left: 2
									},
									children: [
										grid && gridCartesianGrid({
											horizontal: true,
											vertical: true
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.XAxis, {
											type: "number",
											name: xAxisLabel,
											domain: xDomain,
											dataKey: xAxisDataKey,
											hide: true
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.YAxis, {
											type: "number",
											dataKey: yAxisDataKey,
											name: yAxisLabel,
											domain: yDomain,
											hide: true
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartTooltip, {
											content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CustomTooltipContent, {
												parentRef: chartWrapperRef,
												hideIndicator: true,
												labelKey: "dataset"
											}),
											offset: 15
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Scatter, {
											data: transformedData,
											shape: renderDotShape,
											isAnimationActive,
											children: transformedData.map((entry, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(recharts.Cell, { fill: entry["color"] }, `cell-${index}`))
										}, `scatter-${id}`)
									]
								}, `scatter-chart-${id}`)
							})
						})
					}),
					xAxis,
					isSideBarTooltipOpen && chartHeight > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SideBarTooltip, { height: chartHeight })
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-scatter-chart-legend-container",
				ref: legendContainerRef,
				children: legend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
					items: legendItems,
					yAxisLabel,
					xAxisLabel,
					containerWidth,
					isExpanded: isLegendExpanded,
					setIsExpanded: setIsLegendExpanded
				})
			})]
		})
	});
};
//#endregion
//#region src/components/Charts/SingleStackedBarChart/components/ToolTip.tsx
const ToolTip = ({ label, color, value, percentage }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-chart-tooltip",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-chart-tooltip-label",
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-chart-tooltip-content",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-chart-tooltip-content-item",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-chart-tooltip-content-indicator inv-chart-tooltip-content-indicator--dot",
						style: {
							["--color-bg"]: color,
							["--color-border"]: color
						}
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-chart-tooltip-content-value-wrapper",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-chart-tooltip-content-label",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Value" })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "inv-chart-tooltip-content-value",
							children: typeof value === "number" ? numberTickFormatter(value) : value
						})]
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-chart-tooltip-content-item-separator" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-chart-tooltip-content-item",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-chart-tooltip-content-value-wrapper",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-chart-tooltip-content-label",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Percentage" })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "inv-chart-tooltip-content-value percentage",
							children: typeof percentage === "number" ? `${percentage.toFixed(1)}%` : "-"
						})]
					})
				})
			]
		})]
	});
};
//#endregion
//#region src/components/Charts/SingleStackedBarChart/SingleStackedBarChart.tsx
const SingleStackedBar = ({ data, categoryKey, dataKey, theme = "ocean", customPalette, legend = true, legendVariant = "default", className, style, animated = true }) => {
	const [isLegendExpanded, setIsLegendExpanded] = (0, react.useState)(false);
	const [activeIndex, setActiveIndex] = (0, react.useState)(null);
	const [hoveredLegendKey, setHoveredLegendKey] = (0, react.useState)(null);
	const wrapperRef = (0, react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, react.useState)(0);
	const [tooltipPosition, setTooltipPosition] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) setContainerWidth(entry.contentRect.width);
		});
		observer.observe(wrapper);
		return () => observer.disconnect();
	}, []);
	const segments = (0, react.useMemo)(() => {
		if (!data || data.length === 0) return [];
		const total = data.reduce((acc, item) => acc + Number(item[dataKey]), 0);
		return data.map((item, index) => ({
			value: Number(item[dataKey]),
			category: String(item[categoryKey]),
			index,
			percentage: total > 0 ? Number(item[dataKey]) / total * 100 : 0
		}));
	}, [
		data,
		dataKey,
		categoryKey
	]);
	const colors = useChartPalette({
		chartThemeName: theme,
		customPalette,
		themePaletteName: "barChartPalette",
		dataLength: Math.max(segments.length, 1)
	});
	const legendItems = (0, react.useMemo)(() => {
		return segments.map((segment, index) => ({
			key: `${segment.category}-${index}`,
			label: segment.category,
			color: colors[index % colors.length] || "",
			percentage: segment.percentage
		}));
	}, [segments, colors]);
	const stackedLegendItems = (0, react.useMemo)(() => segments.map((segment, index) => ({
		key: `${segment.category}-${index}`,
		label: segment.category,
		value: segment.value,
		color: colors[index % colors.length] || ""
	})), [segments, colors]);
	animated = usePrintContext() ? false : animated;
	const exportData = useExportChartData({
		type: "bar",
		data,
		categoryKey,
		dataKeys: [dataKey],
		colors,
		legend,
		extraOptions: {
			barDir: "bar",
			barGrouping: "stacked"
		}
	});
	const handleLegendItemHover = (0, react.useCallback)((hoverIndex) => {
		setActiveIndex(hoverIndex);
		if (hoverIndex !== null) {
			const segment = segments[hoverIndex];
			if (segment) setHoveredLegendKey(`${segment.category}-${hoverIndex}`);
			const segmentEl = wrapperRef.current?.querySelectorAll(".inv-single-stacked-bar-chart-segment")?.[hoverIndex];
			if (segmentEl) {
				const rect = segmentEl.getBoundingClientRect();
				const containerRect = wrapperRef.current?.getBoundingClientRect();
				if (containerRect) setTooltipPosition({
					x: rect.left + rect.width / 2 - containerRect.left,
					y: rect.top - containerRect.top
				});
				else setTooltipPosition({
					x: rect.left + rect.width / 2,
					y: rect.top
				});
			}
		} else {
			setHoveredLegendKey(null);
			setTooltipPosition(null);
		}
	}, [segments]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		className: (0, clsx.default)("inv-single-stacked-bar-chart-container", className, { "inv-single-stacked-bar-chart-container-gap": legend && legendVariant === "default" }),
		style,
		"data-inv-chart": exportData,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-single-stacked-bar-chart",
				children: segments.map((segment, index) => {
					const isActive = activeIndex === null || activeIndex === index;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, clsx.default)("inv-single-stacked-bar-chart-segment", { "inv-single-stacked-bar-chart-animated": animated }),
						style: {
							width: `${segment.percentage}%`,
							backgroundColor: colors[index % colors.length],
							opacity: isActive ? 1 : .5
						},
						onMouseEnter: (e) => {
							setActiveIndex(index);
							setHoveredLegendKey(`${segment.category}-${index}`);
							const rect = e.currentTarget.getBoundingClientRect();
							const containerRect = wrapperRef.current?.getBoundingClientRect();
							if (containerRect) setTooltipPosition({
								x: rect.left + rect.width / 2 - containerRect.left,
								y: rect.top - containerRect.top
							});
							else setTooltipPosition({
								x: rect.left + rect.width / 2,
								y: rect.top
							});
						},
						onMouseLeave: () => {
							setActiveIndex(null);
							setHoveredLegendKey(null);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-single-stacked-bar-chart-segment-line" })
					}, `segment-${index}`);
				})
			}),
			activeIndex !== null && tooltipPosition && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FloatingUIPortal, {
				position: tooltipPosition,
				placement: "top",
				offsetDistance: 10,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolTip, {
					label: legendItems[activeIndex]?.label ?? "",
					color: stackedLegendItems[activeIndex]?.color ?? "#000000",
					value: stackedLegendItems[activeIndex]?.value ?? 0,
					percentage: segments[activeIndex]?.percentage ?? 0
				})
			}),
			legend && legendVariant === "default" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Separator, {}),
			legend && legendVariant === "default" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultLegend, {
				items: legendItems,
				isExpanded: isLegendExpanded,
				setIsExpanded: setIsLegendExpanded,
				containerWidth,
				style: { paddingTop: 0 }
			}),
			legend && legendVariant === "stacked" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedLegend, {
				items: stackedLegendItems,
				containerWidth,
				onItemHover: setHoveredLegendKey,
				activeKey: hoveredLegendKey,
				onLegendItemHover: handleLegendItemHover,
				separator: true,
				showTitle: false,
				layout: "showMore",
				className: "inv-single-stacked-bar-chart-stacked-legend"
			})
		]
	});
};
//#endregion
//#region src/components/CheckBoxGroup/CheckBoxGroup.tsx
const variantMap$3 = {
	clear: "inv-checkbox-group-clear",
	card: "inv-checkbox-group-card",
	sunk: "inv-checkbox-group-sunk"
};
const CheckBoxGroup = react.default.forwardRef((props, ref) => {
	const { children, className, style, variant = "clear" } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-checkbox-group", variantMap$3[variant], className),
		style,
		children
	});
});
CheckBoxGroup.displayName = "CheckBoxGroup";
//#endregion
//#region src/components/CheckBoxItem/CheckBoxItem.tsx
const CheckBoxItem = (0, react.forwardRef)((props, ref) => {
	const { label, description, onChange, className, disabled, required, ...rest } = props;
	const id = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "inv-checkbox-item-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_checkbox.Root, {
			...rest,
			ref,
			onCheckedChange: onChange,
			id,
			className: (0, clsx.default)("inv-checkbox-item-root", className),
			disabled,
			required,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_checkbox.Indicator, {
				className: "inv-checkbox-item-indicator",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					width: "10",
					height: "8",
					viewBox: "0 0 10 8",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M9 1L3.5 6.5L1 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-checkbox-item-content",
			children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "inv-checkbox-item-label",
				children: label
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: "inv-checkbox-item-description",
				children: description
			})]
		})]
	});
});
CheckBoxItem.displayName = "CheckBoxItem";
//#endregion
//#region src/components/Chips/Chips.tsx
const Chips = (0, react.forwardRef)((props, ref) => {
	const { items, selected = [], type = "multiple", disabled = false, onToggle, className, ...rest } = props;
	const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-chips", className),
		role: "listbox",
		"aria-multiselectable": type === "multiple",
		...rest,
		children: renderableItems.map((item) => {
			const isSelected = selected.includes(item.value);
			const isDisabled = disabled || item.disabled === true;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "option",
				"aria-selected": isSelected,
				disabled: isDisabled,
				className: (0, clsx.default)("inv-chip-item", isSelected && "inv-chip-item--selected", isDisabled && "inv-chip-item--disabled"),
				onClick: () => onToggle?.(item.value),
				children: [item.icon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chip-item__icon",
					children: item.icon
				}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-chip-item__text",
					children: item.label
				})]
			}, item.value);
		})
	});
});
Chips.displayName = "Chips";
//#endregion
//#region src/components/_shared/hooks/useId.ts
const useId$2 = () => {
	return (0, react$1.useMemo)(() => crypto.randomUUID(), []);
};
//#endregion
//#region src/components/_shared/hooks/usePinnableTooltip.ts
const PINNABLE_TOOLTIP_OPEN_EVENT = `inv-pinnable-tooltip-open`;
const DEFAULT_GROUP_ID = `inv-pinnable-tooltip-global`;
/**
* Hook for managing pinnable tooltip state with hover, click-to-pin,
* and group coordination functionality.
*
* @example
* ```tsx
* const {
*   isOpen,
*   handleMouseEnter,
*   handleMouseLeave,
*   handleTriggerClick,
*   handleContentClick,
*   getPointerDownOutsideHandler,
* } = usePinnableTooltip({ groupId: 'my-tooltip-group' })
*
* <Tooltip.Root open={isOpen}>
*   <Tooltip.Trigger
*     onClick={handleTriggerClick}
*     onMouseEnter={handleMouseEnter}
*     onMouseLeave={handleMouseLeave}
*   >
*     Trigger
*   </Tooltip.Trigger>
*   <Tooltip.Content
*     onMouseEnter={handleMouseEnter}
*     onMouseLeave={handleMouseLeave}
*     onClick={handleContentClick}
*     onPointerDownOutside={getPointerDownOutsideHandler('.my-trigger')}
*   >
*     Content
*   </Tooltip.Content>
* </Tooltip.Root>
* ```
*/
function usePinnableTooltip(options = {}) {
	const { groupId = DEFAULT_GROUP_ID, closeDelay = 200, onOpenChange } = options;
	const [isOpen, setIsOpen] = (0, react$1.useState)(false);
	const [isPinned, setIsPinned] = (0, react$1.useState)(false);
	const [suppressHoverUntilLeave, setSuppressHoverUntilLeave] = (0, react$1.useState)(false);
	const leaveTimeoutRef = (0, react$1.useRef)(null);
	const tooltipId = useId$2();
	const clearLeaveTimeout = (0, react$1.useCallback)(() => {
		if (leaveTimeoutRef.current !== null) {
			window.clearTimeout(leaveTimeoutRef.current);
			leaveTimeoutRef.current = null;
		}
	}, []);
	const handleMouseEnter = (0, react$1.useCallback)(() => {
		clearLeaveTimeout();
		if (isPinned) return;
		if (suppressHoverUntilLeave) setSuppressHoverUntilLeave(false);
		setIsOpen(true);
	}, [
		clearLeaveTimeout,
		isPinned,
		suppressHoverUntilLeave
	]);
	const handleMouseLeave = (0, react$1.useCallback)(() => {
		if (suppressHoverUntilLeave) setSuppressHoverUntilLeave(false);
		if (isPinned) return;
		leaveTimeoutRef.current = window.setTimeout(() => {
			setIsOpen(false);
			leaveTimeoutRef.current = null;
		}, closeDelay);
	}, [
		isPinned,
		suppressHoverUntilLeave,
		closeDelay
	]);
	const handleTriggerClick = (0, react$1.useCallback)(() => {
		clearLeaveTimeout();
		setIsPinned((prevPinned) => {
			const nextPinned = !prevPinned;
			setIsOpen(nextPinned);
			if (!nextPinned) setSuppressHoverUntilLeave(true);
			return nextPinned;
		});
	}, [clearLeaveTimeout]);
	const closeTooltip = (0, react$1.useCallback)(() => {
		clearLeaveTimeout();
		setIsPinned(false);
		setSuppressHoverUntilLeave(true);
		setIsOpen(false);
	}, [clearLeaveTimeout]);
	const handleContentClick = (0, react$1.useCallback)(() => {
		closeTooltip();
	}, [closeTooltip]);
	const getPointerDownOutsideHandler = (0, react$1.useCallback)((triggerSelector) => {
		return (event) => {
			if (event.target?.closest(triggerSelector)) return;
			closeTooltip();
		};
	}, [closeTooltip]);
	(0, react$1.useEffect)(() => {
		return () => {
			clearLeaveTimeout();
		};
	}, [clearLeaveTimeout]);
	(0, react$1.useEffect)(() => {
		onOpenChange?.(isOpen);
	}, [isOpen, onOpenChange]);
	(0, react$1.useEffect)(() => {
		if (!isOpen) return;
		window.dispatchEvent(new CustomEvent(PINNABLE_TOOLTIP_OPEN_EVENT, { detail: {
			id: tooltipId,
			groupId
		} }));
	}, [
		tooltipId,
		isOpen,
		groupId
	]);
	(0, react$1.useEffect)(() => {
		const handleExternalOpen = (event) => {
			const detail = event.detail;
			if (detail?.groupId !== groupId || detail?.id === tooltipId) return;
			closeTooltip();
		};
		window.addEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
		return () => {
			window.removeEventListener(PINNABLE_TOOLTIP_OPEN_EVENT, handleExternalOpen);
		};
	}, [
		tooltipId,
		groupId,
		closeTooltip
	]);
	return {
		isOpen,
		isPinned,
		handleMouseEnter,
		handleMouseLeave,
		handleTriggerClick,
		handleContentClick,
		closeTooltip,
		getPointerDownOutsideHandler
	};
}
//#endregion
//#region src/components/_shared/icons/categoryFallbacks.ts
/**
* Semantic icon-category → representative lucide icon name (kebab-case).
*
* When an icon name doesn't resolve, surfaces fall back to the category's
* representative icon before their own generic fallback, so a miss still
* renders something topical (`finance` → dollar sign, not a bare circle).
*/
const categoryFallbacks = {
	accessibility: "accessibility",
	account: "user",
	animals: "cat",
	arrows: "arrow-right",
	brands: "box",
	buildings: "building",
	charts: "chart-line",
	communication: "message-square",
	connectivity: "wifi",
	cursors: "mouse-pointer",
	design: "palette",
	development: "code",
	devices: "smartphone",
	emoji: "smile",
	files: "file",
	finance: "dollar-sign",
	"food-beverage": "cooking-pot",
	gaming: "gamepad",
	home: "house",
	layout: "layout",
	mail: "mail",
	math: "calculator",
	medical: "heart-pulse",
	multimedia: "music",
	nature: "tree-pine",
	navigation: "map-pin",
	notifications: "bell",
	people: "users",
	photography: "camera",
	science: "microscope",
	seasons: "sun",
	security: "shield",
	shapes: "circle",
	shopping: "shopping-cart",
	social: "share-2",
	sports: "trophy",
	sustainability: "leaf",
	text: "type",
	time: "clock",
	tools: "wrench",
	transportation: "car",
	travel: "plane",
	weather: "cloud"
};
/** The icon name to load when a requested icon name misses the catalog. */
const getFallbackIconName = (category) => categoryFallbacks[category?.trim().toLowerCase() ?? ""] ?? "circle-dot";
//#endregion
//#region src/components/_shared/icons/iconNames.ts
/**
* Normalize PascalCase/camelCase input to kebab-case candidates for
* `lucide-react/dynamicIconImports` map keys. Unlike kebab → Pascal, this
* direction is ambiguous around digits (`ArrowUp10` is `arrow-up-1-0`
* upstream, but `Axis3d` is `axis-3d`). Dimension-shaped names add another
* ambiguity (`Grid2x2` is exported as both `grid-2x2` and `grid-2-x-2`), so
* callers try each deterministic candidate in priority order.
*/
const toKebabIconCandidates = (name) => {
	const base = name.trim().replace(/[\s_]+/g, "-").replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Za-z])(\d)/g, "$1-$2").toLowerCase();
	const digitSplit = base.replace(/(\d)(?=\d)/g, "$1-");
	const compactDimension = base.replace(/(\d)x-(\d)/g, "$1x$2");
	const splitDimension = base.replace(/(\d)x-(\d)/g, "$1-x-$2");
	return [...new Set([
		base,
		digitSplit,
		compactDimension,
		splitDimension
	])];
};
//#endregion
//#region src/components/_shared/icons/lucide/lucideDynamicImports.mjs
var lucideDynamicImports_default = lucide_react_dynamicIconImports_mjs.default;
//#endregion
//#region src/components/_shared/icons/dynamicIconImports.ts
/**
* CJS interop: this package ships both CJS and ESM builds. When the CJS
* build loads the `.mjs` icon map, the import hands back a namespace object
* (`{ __esModule, default: map }`) instead of the map itself, and bundler
* interop helpers can stack a second `default` layer on top. Unwrap until we
* reach the actual key → import-thunk map (`circle` is a stable lucide key),
* else every icon silently resolves null for CJS consumers.
*/
const unwrapModuleDefault = (mod) => {
	let candidate = mod;
	while (candidate != null && typeof candidate === "object" && typeof candidate["circle"] !== "function" && "default" in candidate) candidate = candidate["default"];
	return candidate ?? {};
};
const exactDynamicIconImports = unwrapModuleDefault(lucideDynamicImports_default);
const getArrayPermutations = (arr) => {
	if (arr.length === 0) return [[]];
	const firstElement = arr[0];
	const permsWithoutFirst = getArrayPermutations(arr.slice(1));
	const allPermutations = [];
	permsWithoutFirst.forEach((perm) => {
		for (let i = 0; i <= perm.length; i++) {
			const permWithFirst = [
				...perm.slice(0, i),
				firstElement,
				...perm.slice(i)
			].filter((item) => item !== void 0);
			allPermutations.push(permWithFirst);
		}
	});
	return allPermutations;
};
const getIconNamePermutations = (inputString) => {
	const words = inputString.trim().split(/-/).filter((word) => word.length > 0);
	if (words.length === 0) return [""];
	return getArrayPermutations(words).map((perm) => perm.join("-"));
};
const permutationIconImports = Object.entries(exactDynamicIconImports).reduce((acc, [key, value]) => {
	getIconNamePermutations(key).forEach((iconName) => {
		acc[iconName] = value;
	});
	return acc;
}, {});
const dynamicIconImports = Object.assign(permutationIconImports, exactDynamicIconImports);
const getIconNameMatchVariations = (iconName) => {
	const iconNameParts = iconName.split("-");
	const iconNameVariations = [iconNameParts[0]];
	let lastVariation = iconNameVariations[0];
	for (const part of iconNameParts.slice(1)) {
		const newVariation = `${lastVariation}-${part}`;
		lastVariation = newVariation;
		iconNameVariations.push(newVariation);
	}
	return iconNameVariations.reverse();
};
const getIconImport = (iconName) => {
	const kebabCandidates = toKebabIconCandidates(iconName);
	for (const candidate of [iconName, ...kebabCandidates]) {
		const iconImport = dynamicIconImports[candidate];
		if (iconImport) return iconImport;
	}
	const iconNameImportVariations = getIconNameMatchVariations(kebabCandidates[0] ?? iconName);
	for (const variation of iconNameImportVariations) {
		const iconImport = dynamicIconImports[variation];
		if (iconImport) return iconImport;
	}
	return null;
};
//#endregion
//#region src/components/_shared/icons/IconWrapper.tsx
const cachedIcons = /* @__PURE__ */ new Map();
const IconWrapper = ({ name, category, ...props }) => {
	const [IconComponent, setIconComponent] = (0, react.useState)(() => cachedIcons.get(name) || null);
	(0, react.useEffect)(() => {
		let cancelled = false;
		const loadIcon = async (iconName) => {
			const iconImport = getIconImport(iconName);
			if (!iconImport) return false;
			try {
				const module = await iconImport();
				if (module?.default) {
					cachedIcons.set(iconName, module.default);
					if (!cancelled) setIconComponent(() => module.default);
					return true;
				}
			} catch {
				return false;
			}
			return false;
		};
		const loadIconWithFallback = async () => {
			if (cachedIcons.has(name)) {
				setIconComponent(cachedIcons.get(name));
				return;
			}
			if (!await loadIcon(name) && !cancelled) {
				const fallbackName = getFallbackIconName(category);
				if (cachedIcons.has(fallbackName)) setIconComponent(cachedIcons.get(fallbackName));
				else await loadIcon(fallbackName);
			}
		};
		loadIconWithFallback();
		return () => {
			cancelled = true;
		};
	}, [name, category]);
	if (!IconComponent) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {
		size: 14,
		...props
	});
};
//#endregion
//#region src/components/_shared/icons/schema.ts
/**
* The icon wire contract shared by every surface that embeds an `Icon`
* (chat + dashboard `Icon` components). Field order is wire-load-bearing
* (inv-lang binds positionally): `name` first, `category` second — never
* reorder.
*
* Report/presentation blocks intentionally use a flat `iconName` field
* instead (it shipped positionally before this schema existed here).
*/
const iconPropsSchema = zod_v4.z.object({
	name: zod_v4.z.string().describe("lucide-react icon name in kebab-case (e.g. 'circle-check', 'rocket')."),
	category: zod_v4.z.string().optional().describe("Optional icon category (e.g. 'finance', 'charts', 'security', 'travel', 'people', 'time') used to pick a topical fallback icon when `name` doesn't resolve.")
});
//#endregion
//#region src/components/SourceFaviconImage/SourceFaviconImage.tsx
/**
* Favicon image with a globe-icon fallback. Google's favicon service returns a
* 16x16 placeholder when it has nothing better, which is treated as a miss.
*/
const SourceFaviconImage = (0, react.memo)(({ height, width, url, alt }) => {
	const ref = (0, react.useRef)(null);
	const [imageError, setImageError] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		setImageError(false);
	}, [url]);
	const onSuccess = () => {
		const img = ref.current;
		if (img && img.naturalWidth <= 16 && img.naturalHeight <= 16) setImageError(true);
		else setImageError(false);
	};
	const onError = () => {
		setImageError(true);
	};
	if (imageError || !url) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
		name: "globe",
		size: Math.max(height, width)
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		ref,
		src: url,
		alt,
		height,
		width,
		onLoad: onSuccess,
		onError,
		className: "inv-source-favicon-image"
	});
});
SourceFaviconImage.displayName = "SourceFaviconImage";
//#endregion
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
//#region src/components/Sources/SourceContext.tsx
const CardSourceSchema = zod_v4.z.object({
	url: zod_v4.z.string().optional(),
	title: zod_v4.z.string(),
	sourceName: zod_v4.z.string()
});
const openSourceInNewTab = (url) => {
	safeOpenUrl(url);
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
//#region src/components/Citation/CitationItem.tsx
const CitationItem = (0, react.memo)((props) => {
	const { title, sourceName, onClick, faviconUrl, url } = props;
	const handleClick = () => {
		openSourceInNewTab(url);
		onClick?.();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		className: (0, clsx.default)("inv-citation-item", { "inv-citation-item--has-url": url && url.trim() !== "" }),
		onClick: handleClick,
		type: "button",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-citation-item__logo",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SourceFaviconImage, {
				url: faviconUrl,
				alt: sourceName,
				width: 24,
				height: 24
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-citation-item__content",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-citation-item__title",
				children: title
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-citation-item__source",
				children: sourceName
			})]
		})]
	});
});
CitationItem.displayName = "CitationItem";
//#endregion
//#region src/components/Citation/Citation.tsx
const MultiCitation = (0, react.memo)((props) => {
	const { sources } = props;
	const { portalThemeClassName } = useTheme();
	const { isOpen, handleMouseEnter, handleMouseLeave, handleTriggerClick, handleContentClick, closeTooltip, getPointerDownOutsideHandler } = usePinnableTooltip();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-citation-container",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Provider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Root, {
			open: isOpen,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Trigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inv-citation",
					"aria-label": "Citations",
					onClick: handleTriggerClick,
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
						name: "globe",
						size: 12
					})
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Content, {
				side: "bottom",
				align: "start",
				sideOffset: 4,
				alignOffset: -8,
				className: (0, clsx.default)("inv-citation-tooltip", portalThemeClassName),
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				onClick: handleContentClick,
				onPointerDownOutside: getPointerDownOutsideHandler(".inv-citation"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-citation-tooltip__content",
					children: sources.map((itemProps, index) => {
						const { key: _key, ...rest } = itemProps;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CitationItem, {
							...rest,
							onClick: closeTooltip
						}, index);
					})
				})
			}) })]
		}) })
	});
});
MultiCitation.displayName = "MultiCitation";
/**
* Inline citation trigger: a small globe button that opens a pinnable tooltip
* listing the cited sources.
*/
const Citation = (0, react.memo)((props) => {
	const { sources } = props;
	if (!sources || sources.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MultiCitation, { ...props });
});
Citation.displayName = "Citation";
//#endregion
//#region src/components/Citation/TextContentCitation.tsx
const TextContentCitation = ({ node, children, ...rest }) => {
	const sources = useCardSourceContext();
	const properties = node?.properties ?? {};
	const componentType = properties["data-component-type"];
	const indicesString = properties["data-citation-indices"];
	if (componentType !== "citation" || !indicesString) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		...rest,
		children
	});
	if (!sources.length) return null;
	const relevantSources = indicesString.split(",").map(Number).map((idx) => sources[idx - 1]).filter((source) => source !== void 0).filter((source) => source.sourceName && source.title && source.sourceName.trim() !== "" && source.title.trim() !== "");
	if (relevantSources.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Citation, { sources: relevantSources });
};
//#endregion
//#region src/components/_shared/cards/smallCardBlockUtils.ts
/**
* Splits `n` items into rows of at most `maxPerRow` (2 or 3) so the grid never
* ends with a lonely single card when it can be avoided.
*/
function getRowConfiguration(n, maxPerRow) {
	if (n <= 0) return [];
	if (n === 1) return [1];
	if (maxPerRow === 2) {
		const fullRows = Math.floor(n / 2);
		const remainder = n % 2;
		const result = Array(fullRows).fill(2);
		if (remainder) result.push(1);
		return result;
	}
	if (n % 3 === 0) return Array(n / 3).fill(3);
	if (n % 3 === 2) {
		const threes = Math.floor(n / 3);
		const result = Array(threes).fill(3);
		result.splice(Math.ceil(result.length / 2), 0, 2);
		return result;
	}
	const threes = Math.floor((n - 4) / 3);
	return [
		...Array(threes).fill(3),
		2,
		2
	];
}
/** Tracks a horizontally scrolling element and reports whether either edge is overflowing. */
function useCarouselMask() {
	const [element, setElement] = (0, react$1.useState)(null);
	const [maskLeft, setMaskLeft] = (0, react$1.useState)(false);
	const [maskRight, setMaskRight] = (0, react$1.useState)(false);
	const updateMask = (0, react$1.useCallback)(() => {
		if (!element) return;
		setMaskLeft(element.scrollLeft > 0);
		setMaskRight(Math.ceil(element.scrollLeft) + element.offsetWidth < element.scrollWidth);
	}, [element]);
	(0, react$1.useEffect)(() => {
		if (!element) return;
		updateMask();
		const resizeObserver = new ResizeObserver(updateMask);
		resizeObserver.observe(element);
		const mutationObserver = new MutationObserver(updateMask);
		mutationObserver.observe(element, {
			childList: true,
			subtree: true
		});
		element.addEventListener("scroll", updateMask, { passive: true });
		return () => {
			element.removeEventListener("scroll", updateMask);
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
	}, [element, updateMask]);
	return {
		scrollRef: setElement,
		maskLeft,
		maskRight
	};
}
//#endregion
//#region src/components/_shared/cards/CardBlockLayout.tsx
/** Shared grid/carousel scaffolding for the small and medium card blocks. */
function CardBlockLayoutInner(props, ref) {
	const { size, cardType, items, layout = "grid", responsive = true, maxPerRow, gap, renderItem, itemKey, className, style, ...rest } = props;
	const { scrollRef, maskLeft, maskRight } = useCarouselMask();
	const safeItems = items ?? [];
	const base = `inv-${size}-card-block`;
	const count = safeItems.length;
	const gapStyle = gap ? { [`--inv-${size}-card-gap`]: typeof gap === "number" ? `${gap}px` : gap } : void 0;
	const renderCell = (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: layout === "carousel" ? `${base}__carousel-item` : `${base}__item`,
		children: renderItem(item, index)
	}, itemKey?.(item, index) ?? `${cardType}-${index}`);
	let rowStartIndex = 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)(base, `${base}--${cardType}`, `${base}--${layout}`, className),
		"data-card-type": cardType,
		"data-layout": layout,
		"data-count": count,
		style: {
			...gapStyle,
			...style
		},
		...rest,
		children: layout === "carousel" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: scrollRef,
			className: (0, clsx.default)(`${base}__carousel`, responsive && `${base}__carousel--responsive`, maskLeft && `${base}__carousel--mask-left`, maskRight && `${base}__carousel--mask-right`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: `${base}__carousel-track`,
				children: safeItems.map((item, index) => renderCell(item, index))
			})
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)(`${base}__grid`, responsive && `${base}__grid--responsive`, responsive && count % 2 === 1 && `${base}__grid--odd-count`),
			children: getRowConfiguration(count, maxPerRow).map((itemsInRow, rowIndex) => {
				const currentRowStartIndex = rowStartIndex;
				rowStartIndex += itemsInRow;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)(`${base}__row`, `${base}__row--${itemsInRow}`),
					children: safeItems.slice(currentRowStartIndex, currentRowStartIndex + itemsInRow).map((item, columnIndex) => renderCell(item, currentRowStartIndex + columnIndex))
				}, `${cardType}-row-${rowIndex}`);
			})
		})
	});
}
const CardBlockLayout = (0, react.forwardRef)(CardBlockLayoutInner);
/** Enter/Space keyboard activation for card-like `role="button"` divs. */
function cardKeyDownHandler(onActivate) {
	return (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		onActivate();
	};
}
//#endregion
//#region src/components/CompositeCardBlock/CompositeCardBlock.tsx
/** A bordered card with header, stacked body content and a price/button footer. */
const CompositeCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { header, body, footer } = item;
	const bodyItems = body ?? [];
	const hasFooter = Boolean(footer?.price || footer?.button);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-composite-card__wrapper",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref,
			className: (0, clsx.default)("inv-composite-card", clickable ? "inv-composite-card--clickable" : "inv-composite-card--static", className),
			role: clickable ? "button" : void 0,
			tabIndex: clickable ? 0 : void 0,
			onClick: clickable ? onClick : void 0,
			onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : void 0,
			children: [
				header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__header",
					children: header
				}),
				bodyItems.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__body",
					children: bodyItems
				}),
				hasFooter && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-composite-card__footer",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-composite-card__footer-content",
						children: [footer?.price ?? null, footer?.button ?? null]
					})
				})
			]
		})
	});
});
CompositeCard.displayName = "CompositeCard";
/** A two-per-row grid or carousel of CompositeCards. */
const CompositeCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBlockLayout, {
		ref,
		size: "medium",
		cardType: "composite-card",
		"data-card-type": "CompositeCard",
		items,
		layout,
		responsive,
		maxPerRow: 2,
		gap,
		className,
		itemKey: (item, index) => {
			const itemId = item.id?.trim();
			return itemId ? `composite-card-${itemId}-${index}` : `composite-card-${index}`;
		},
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CompositeCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
CompositeCardBlock.displayName = "CompositeCardBlock";
//#endregion
//#region src/components/_shared/remark/remarkCitations.ts
/**
* # remarkCitations
*
* Remark plugin that transforms citation patterns like [1][2] into custom React components.
* Scans markdown text nodes, splits them into text and citation parts, and converts
* citations to span elements with data attributes for TextContentCitation to render.
*
* **How it works:**
* 1. Uses regex `/(\[\d+\]\s*)+/g` to find citation patterns
* 2. Splits text nodes: text before → citation component → text after
* 3. Creates span nodes with `data-component-type="citation"` and `data-citation-indices="1,2"`
* 4. Replaces original text node with split parts in the AST
*
* **Example:**
* Input: "Statement [1][2] text" → Output: [Text, Citation(1,2), Text]
*/
/**
* Regex to match citation patterns like [1], [1][2], [1] [2]
* Matches one or more [number] patterns with optional whitespace
*/
const customComponentRegex = /(\[\d+\]\s*)+/g;
/**
* Regex to extract individual numbers from citation brackets
* Example: "[1][2]" → ["1", "2"]
*/
const numberExtractorRegex = /\[(\d+)\]/g;
/**
* Remark plugin that transforms citation patterns into custom component nodes.
* Returns a function that processes the markdown AST tree.
*/
const remarkCitations = () => {
	return (tree) => {
		(0, unist_util_visit.visit)(tree, "text", (node, index, parent) => {
			if (typeof node.value !== "string") return;
			const parts = [];
			let lastIndex = 0;
			let match;
			while ((match = customComponentRegex.exec(node.value)) !== null) {
				if (match.index > lastIndex) parts.push({
					type: "text",
					value: node.value.slice(lastIndex, match.index)
				});
				const fullMatch = match[0];
				const numbers = [];
				let numberMatch;
				while ((numberMatch = numberExtractorRegex.exec(fullMatch)) !== null) numbers.push(numberMatch[1] ?? "");
				numberExtractorRegex.lastIndex = 0;
				if (numbers.length > 0) parts.push({
					type: "customComponent",
					data: {
						hName: "span",
						hProperties: {
							"data-component-type": "citation",
							"data-citation-indices": numbers.join(",")
						}
					},
					children: [{
						type: "text",
						value: fullMatch.trim()
					}]
				});
				lastIndex = match.index + fullMatch.length;
			}
			customComponentRegex.lastIndex = 0;
			if (lastIndex < node.value.length) parts.push({
				type: "text",
				value: node.value.slice(lastIndex)
			});
			if (parts.length > 0 && parent && typeof index === "number") {
				parent.children.splice(index, 1, ...parts);
				return index + parts.length;
			}
		});
	};
};
//#endregion
//#region src/components/InlineMarkdownRenderer/InlineMarkdownRenderer.tsx
const Fragment$1 = ({ children }) => children;
/**
* Lightweight markdown renderer for inline text (bold, italic, links, code).
* Block-level elements (paragraphs, headings, lists) are flattened so the
* output stays inline.
*/
const InlineMarkdownRenderer = (0, react.memo)(({ content, className }) => {
	const { mode } = useTheme();
	if (!content) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: (0, clsx.default)("inv-inline-markdown-renderer", className, { "inv-inline-markdown-renderer--dark": mode === "dark" }),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, {
			textMarkdown: content,
			options: {
				remarkPlugins: [
					remarkCitations,
					[remark_breaks.default, { breaks: false }],
					[remark_gfm.default, { singleTilde: false }]
				],
				components: {
					p: Fragment$1,
					h1: Fragment$1,
					h2: Fragment$1,
					h3: Fragment$1,
					h4: Fragment$1,
					h5: Fragment$1,
					h6: Fragment$1,
					ul: Fragment$1,
					ol: Fragment$1,
					li: Fragment$1,
					span: TextContentCitation
				}
			}
		})
	});
});
InlineMarkdownRenderer.displayName = "InlineMarkdownRenderer";
//#endregion
//#region src/components/ContextCardBlock/ContextCardBlock.tsx
/** A compact tinted card with a title (text or tag) and a bold markdown body. */
const ContextCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { title, body, bgColor, bgImageSrc, bgImageAlt } = item;
	const backgroundImage = toCssUrl(bgImageSrc);
	const variant = backgroundImage ? "image" : bgColor;
	const titleContent = title == null || title === "" ? null : typeof title === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "inv-context-card__title-text",
		children: title
	}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-context-card__tag-wrapper",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-context-card__tag",
			children: title
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-context-card", clickable ? "inv-context-card--clickable" : "inv-context-card--static", variant && `inv-context-card--variant-${variant}`, className),
		style: backgroundImage ? { backgroundImage } : void 0,
		"aria-label": backgroundImage ? bgImageAlt : void 0,
		role: clickable ? "button" : void 0,
		tabIndex: clickable ? 0 : void 0,
		onClick: clickable ? onClick : void 0,
		onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : void 0,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-context-card__vertical",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-context-card__slot inv-context-card__slot--top",
				children: [titleContent, clickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-context-card__chevron",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
				})]
			}), body && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-context-card__slot inv-context-card__slot--bottom",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-context-card__body-text",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: body })
				})
			})]
		})
	});
});
ContextCard.displayName = "ContextCard";
/** A grid or carousel of ContextCards (uses the small card block layout). */
const ContextCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBlockLayout, {
		ref,
		size: "small",
		cardType: "context-card",
		"data-card-type": "ContextCard",
		items,
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `context-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
ContextCardBlock.displayName = "ContextCardBlock";
//#endregion
//#region src/components/DatePicker/helpers/context/DatePickerContext.tsx
const DatePickerContext = (0, react.createContext)({
	selectedDate: void 0,
	selectedRange: {
		from: void 0,
		to: void 0
	},
	isOpen: false,
	mode: "single",
	botType: "fullscreen",
	setSelectedDate: (_date) => {},
	setSelectedRange: (_range) => {},
	setIsOpen: (_isOpen) => {}
});
const useDatePicker = () => {
	const context = (0, react.useContext)(DatePickerContext);
	if (!context) throw new Error("useDatePicker must be used within a DatePickerProvider");
	return context;
};
const DatePickerProvider = ({ children, selectedDateFromParent, selectedRangeFromParent, setSelectedDateFromParent, setSelectedRangeFromParent, isOpenFromParent, setIsOpenFromParent, mode, botType }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePickerContext.Provider, {
		value: {
			selectedDate: selectedDateFromParent,
			selectedRange: selectedRangeFromParent,
			setSelectedDate: setSelectedDateFromParent,
			setSelectedRange: setSelectedRangeFromParent,
			mode,
			isOpen: isOpenFromParent,
			setIsOpen: setIsOpenFromParent,
			botType
		},
		children
	});
};
//#endregion
//#region src/components/DatePicker/helpers/utils/helperFn.tsx
const formatDateRange = (range) => {
	if (!range) return "Select a range";
	const { from, to } = range;
	if (!from) return "Select a range";
	if (!to) return (0, date_fns.format)(from, "MMM d, yyyy");
	if (from.toDateString() === to.toDateString()) return (0, date_fns.format)(from, "MMM d, yyyy");
	return `${(0, date_fns.format)(from, "MMM d, yyyy")} - ${(0, date_fns.format)(to, "MMM d, yyyy")}`;
};
const formatSingleDate = (date) => {
	if (!date) return "Select a date";
	return (0, date_fns.format)(date, "MMM d, yyyy");
};
//#endregion
//#region src/components/DatePicker/helpers/components/DatePickerRenderer.tsx
const DatepickerRenderer = (0, react.forwardRef)(({ className, style }, ref) => {
	const { selectedDate, selectedRange, mode, setSelectedDate, setSelectedRange } = useDatePicker();
	if (mode === "single") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-date-picker-renderer-single-mode", className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Calendar, {
			mode: "single",
			selected: selectedDate,
			onSelect: setSelectedDate,
			startMonth: new Date(1900, 0),
			endMonth: new Date(2100, 11)
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-date-picker-renderer-range-mode", className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Calendar, {
			mode: "range",
			selected: selectedRange,
			onSelect: setSelectedRange,
			startMonth: new Date(1900, 0),
			endMonth: new Date(2100, 11)
		})
	});
});
//#endregion
//#region src/components/DatePicker/helpers/components/FloatingDatePickerRenderer.tsx
const FloatingDateInput = () => {
	const { mode, selectedDate, selectedRange, isOpen, setIsOpen } = useDatePicker();
	const hasSelectedDate = mode === "single" ? !!selectedDate : !!(selectedRange && selectedRange.from && selectedRange.to);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-date-picker-renderer-floating-input-container", {
			"inv-date-picker-renderer-floating-input-container-open": isOpen,
			"inv-date-picker-renderer-floating-input-container-not-open": !isOpen,
			"inv-date-picker-renderer-floating-input-container-has-no-selected-date": !hasSelectedDate
		}),
		onClick: (e) => {
			e.stopPropagation();
			setIsOpen(!isOpen);
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-date-picker-renderer-floating-input-container-text",
			children: mode === "single" ? formatSingleDate(selectedDate) : formatDateRange(selectedRange)
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
			size: 16,
			className: (0, clsx.default)({ "inv-date-picker-renderer-floating-input-container-icon": isOpen })
		})]
	});
};
const FloatingDatePicker = (0, react.forwardRef)((_, ref) => {
	const { isOpen } = useDatePicker();
	const menuPositionDivRef = (0, react.useRef)(null);
	const { portalThemeClassName } = useTheme();
	const { refs: { setFloating, setReference }, floatingStyles } = (0, _floating_ui_react_dom.useFloating)({
		strategy: "absolute",
		placement: "bottom-start",
		whileElementsMounted: _floating_ui_react_dom.autoUpdate,
		middleware: [(0, _floating_ui_react_dom.offset)(5), (0, _floating_ui_react_dom.flip)()]
	});
	const menuPositionDivRefs = useMultipleRefs(setReference, menuPositionDivRef);
	const floatingRef = useMultipleRefs(setFloating, ref);
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: menuPositionDivRefs,
		className: (0, clsx.default)("inv-date-picker-renderer-floating-reference")
	}), (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref: floatingRef,
		style: {
			...floatingStyles,
			width: "fit-content"
		},
		className: (0, clsx.default)("inv-date-picker-renderer-floating-content", portalThemeClassName),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-date-picker-renderer-floating-menu",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatepickerRenderer, {})
		})
	}), document.body)] });
});
const FloatingDatePickerRenderer = ({ className, style }) => {
	const { isOpen, setIsOpen } = useDatePicker();
	const menuRef = (0, react.useRef)(null);
	const containerRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		if (!isOpen) return;
		const handleInteraction = (e) => {
			const targetNode = e.target;
			if (menuRef.current?.contains(targetNode) || containerRef.current?.contains(targetNode)) return;
			setIsOpen(false);
		};
		document.body.addEventListener("mousedown", handleInteraction);
		document.body.addEventListener("touchstart", handleInteraction);
		return () => {
			document.body.removeEventListener("mousedown", handleInteraction);
			document.body.removeEventListener("touchstart", handleInteraction);
		};
	}, [isOpen, setIsOpen]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: (0, clsx.default)("inv-date-picker-renderer-floating-container", className),
		style,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FloatingDateInput, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FloatingDatePicker, { ref: menuRef })]
	});
};
//#endregion
//#region src/components/DatePicker/DatePicker.tsx
const DatePicker = (props) => {
	const { layout } = useLayoutContext();
	const { mode = "single", selectedSingleDate, selectedRangeDates, setSelectedSingleDate, setSelectedRangeDates, isOpen, setIsOpen, className, style } = props;
	const [internalSelectedDate, setInternalSelectedDate] = (0, react.useState)(selectedSingleDate);
	const [internalSelectedRange, setInternalSelectedRange] = (0, react.useState)(selectedRangeDates);
	const [internalIsOpen, setInternalIsOpen] = (0, react.useState)(isOpen ?? false);
	const selectedDateHandler = (selectedDate) => {
		if (selectedSingleDate) {
			setSelectedSingleDate?.(selectedDate);
			return;
		}
		setSelectedSingleDate?.(selectedDate);
		setInternalSelectedDate(selectedDate);
	};
	const selectedRangeHandler = (selectedRange) => {
		if (selectedRangeDates) {
			setSelectedRangeDates?.(selectedRange);
			return;
		}
		setSelectedRangeDates?.(selectedRange);
		setInternalSelectedRange(selectedRange);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePickerProvider, {
		mode,
		botType: layout,
		selectedDateFromParent: selectedSingleDate ?? internalSelectedDate,
		selectedRangeFromParent: selectedRangeDates ?? internalSelectedRange,
		setSelectedDateFromParent: selectedDateHandler,
		setSelectedRangeFromParent: selectedRangeHandler,
		isOpenFromParent: isOpen ?? internalIsOpen,
		setIsOpenFromParent: setIsOpen ?? setInternalIsOpen,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FloatingDatePickerRenderer, {
			className,
			style
		})
	});
};
//#endregion
//#region src/components/EditableTable/base/hooks/useEditableCellKeyboard.ts
const useEditableCellKeyboard = ({ isEditing, isSelected, rowIndex, columnId, onNavigate, onStartEdit, onSave, onCancel, onStartEditWithChar }) => {
	return { handleKeyDown: (0, react$1.useCallback)((e) => {
		if (isEditing) switch (e.key) {
			case "Enter":
				e.preventDefault();
				onSave();
				onNavigate("down");
				break;
			case "Tab":
				e.preventDefault();
				onSave();
				if (e.shiftKey) onNavigate("left");
				else onNavigate("right");
				break;
			case "Escape":
				e.preventDefault();
				onCancel();
				break;
		}
		else if (isSelected) switch (e.key) {
			case "Enter":
			case "F2":
				e.preventDefault();
				onStartEdit(rowIndex, columnId);
				break;
			case "Tab":
				e.preventDefault();
				if (e.shiftKey) onNavigate("left");
				else onNavigate("right");
				break;
			case "ArrowUp":
				e.preventDefault();
				onNavigate("up");
				break;
			case "ArrowDown":
				e.preventDefault();
				onNavigate("down");
				break;
			case "ArrowLeft":
				e.preventDefault();
				onNavigate("left");
				break;
			case "ArrowRight":
				e.preventDefault();
				onNavigate("right");
				break;
			default:
				if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
					e.preventDefault();
					onStartEdit(rowIndex, columnId);
					onStartEditWithChar?.(e.key);
				}
				break;
		}
	}, [
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave,
		onCancel,
		onStartEditWithChar
	]) };
};
//#endregion
//#region src/components/EditableTable/base/components/CellOutline.tsx
const SIDES = [
	"top",
	"bottom",
	"left",
	"right"
];
const CellOutline = ({ isSelected, isEditing }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: SIDES.map((side) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, clsx.default)(`inv-editable-table-cell-outline-${side}`, isSelected && `inv-editable-table-cell-outline-${side}-selected`, isEditing && `inv-editable-table-cell-outline-${side}-editing`) }, side)) });
};
//#endregion
//#region src/components/EditableTable/base/components/EditableDateCell.tsx
/** Table cells store dates as ISO strings; parse them back for the picker. */
function toDate(value) {
	if (value instanceof Date) return value;
	if (typeof value !== "string" && typeof value !== "number") return void 0;
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? void 0 : d;
}
const EditableDateCell = (props) => {
	const { value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table } = props;
	const [editDate, setEditDate] = (0, react.useState)(toDate(value));
	const cellRef = (0, react.useRef)(null);
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditDate(toDate(value));
	}, [value, isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleCancel = (0, react.useCallback)(() => {
		setEditDate(toDate(value));
		onFinishEdit(false);
	}, [value, onFinishEdit]);
	const { handleKeyDown } = useEditableCellKeyboard({
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave: () => {},
		onCancel: handleCancel
	});
	const handleKeyDownWithPicker = (0, react.useCallback)((e) => {
		if (isEditing) switch (e.key) {
			case "Tab":
				e.preventDefault();
				e.stopPropagation();
				onNavigate(e.shiftKey ? "left" : "right");
				return;
			case "Enter":
				e.preventDefault();
				e.stopPropagation();
				onNavigate("down");
				return;
			case "Escape":
				e.preventDefault();
				e.stopPropagation();
				handleCancel();
				return;
		}
		handleKeyDown(e);
	}, [
		isEditing,
		handleCancel,
		onNavigate,
		handleKeyDown
	]);
	const handleClick = (e) => {
		if (isEditing) return;
		e.stopPropagation();
		if (!isSelected) onSelect(rowIndex, columnId);
		else onStartEdit(rowIndex, columnId);
	};
	const handleDateChange = (date) => {
		setEditDate(date);
		updateTableData?.(rowIndex, columnId, date?.toISOString());
		onFinishEdit(true);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClickCapture: handleClick,
		onKeyDown: handleKeyDownWithPicker,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePicker, {
			selectedSingleDate: editDate,
			setSelectedSingleDate: handleDateChange,
			mode: "single",
			isOpen: isEditing,
			setIsOpen: (isOpen) => {
				if (!isOpen) onFinishEdit(true);
			}
		})]
	});
};
//#endregion
//#region src/components/TooltipWrapper/TooltipWrapper.tsx
const TooltipWrapper = ({ tooltipHeading, tooltipContent, children, className, side = "bottom", align = "start", sideOffset = 5, alignOffset = 0, delayDuration = 100, showOnlyWhenTruncated = false, headingSelector, contentSelector }) => {
	const { portalThemeClassName } = useTheme();
	const triggerRef = (0, react.useRef)(null);
	const [isHeadingTruncated, setIsHeadingTruncated] = (0, react.useState)(false);
	const [isContentTruncated, setIsContentTruncated] = (0, react.useState)(false);
	const child = react.default.Children.only(children);
	const triggerWithRef = (0, react.isValidElement)(child) && showOnlyWhenTruncated ? (0, react.cloneElement)(child, { ref: triggerRef }) : children;
	(0, react.useLayoutEffect)(() => {
		const measure = () => {
			if (triggerRef.current) {
				const { children: childNodes } = triggerRef.current;
				const elements = Array.from(childNodes);
				const headingEl = headingSelector ? triggerRef.current.querySelector(headingSelector) ?? void 0 : tooltipHeading ? elements[0] : void 0;
				const contentEl = contentSelector ? triggerRef.current.querySelector(contentSelector) ?? void 0 : tooltipContent ? tooltipHeading ? elements[1] : elements[elements.length - 1] : void 0;
				if (headingEl) {
					const isNowTruncated = headingEl.scrollWidth > headingEl.clientWidth || headingEl.scrollHeight > headingEl.clientHeight;
					if (isNowTruncated !== isHeadingTruncated) setIsHeadingTruncated(isNowTruncated);
				} else if (isHeadingTruncated) setIsHeadingTruncated(false);
				if (contentEl) {
					const isNowTruncated = contentEl.scrollWidth > contentEl.clientWidth || contentEl.scrollHeight > contentEl.clientHeight;
					if (isNowTruncated !== isContentTruncated) setIsContentTruncated(isNowTruncated);
				} else if (isContentTruncated) setIsContentTruncated(false);
			}
		};
		if (showOnlyWhenTruncated) {
			measure();
			const resizeObserver = new ResizeObserver(measure);
			const trigger = triggerRef.current;
			if (trigger) resizeObserver.observe(trigger);
			return () => {
				if (trigger) resizeObserver.unobserve(trigger);
			};
		}
	}, [
		children,
		showOnlyWhenTruncated,
		isHeadingTruncated,
		isContentTruncated,
		tooltipHeading,
		tooltipContent,
		headingSelector,
		contentSelector
	]);
	const displayTooltipHeading = showOnlyWhenTruncated ? isHeadingTruncated ? tooltipHeading : void 0 : tooltipHeading;
	const displayTooltipContent = showOnlyWhenTruncated ? isContentTruncated ? tooltipContent : void 0 : tooltipContent;
	if (!(displayTooltipHeading || displayTooltipContent)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: triggerWithRef });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Provider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tooltip.Root, {
		delayDuration,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Trigger, {
			asChild: true,
			children: triggerWithRef
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Portal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tooltip.Content, {
			className: (0, clsx.default)("inv-tooltip-content", portalThemeClassName, className),
			side,
			align,
			sideOffset,
			alignOffset,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-tooltip-body",
				children: [displayTooltipHeading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-tooltip-heading",
					children: displayTooltipHeading
				}), displayTooltipContent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-tooltip-text-content",
					children: displayTooltipContent
				})]
			})
		}) })]
	}) });
};
//#endregion
//#region src/components/EditableTable/base/utils/utilsFn.ts
const isValidUrl = (value) => {
	if (typeof value !== "string") return false;
	const str = value.trim();
	if (!str) return false;
	return (/* @__PURE__ */ new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")).test(str);
};
//#endregion
//#region src/components/EditableTable/base/components/TextBaseEditableCell.tsx
const toDisplayString = (value) => value === void 0 || value === null ? "" : String(value);
const TextBaseEditableCell = ({ value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table, inputType, parseOnSave, renderDisplay }) => {
	const [editValue, setEditValue] = (0, react.useState)(toDisplayString(value));
	const inputRef = (0, react.useRef)(null);
	const cellRef = (0, react.useRef)(null);
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditValue(toDisplayString(value));
	}, [value, isEditing]);
	const justCancelledRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleSave = (0, react.useCallback)(() => {
		const processedValue = parseOnSave(editValue);
		updateTableData?.(rowIndex, columnId, processedValue);
		onFinishEdit(true);
	}, [
		editValue,
		parseOnSave,
		rowIndex,
		columnId,
		updateTableData,
		onFinishEdit
	]);
	const { handleKeyDown } = useEditableCellKeyboard({
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave: handleSave,
		onCancel: (0, react.useCallback)(() => {
			justCancelledRef.current = true;
			setEditValue(toDisplayString(value));
			onFinishEdit(false);
		}, [value, onFinishEdit]),
		onStartEditWithChar: (char) => setEditValue(char)
	});
	const handleClick = (e) => {
		if (e.target.closest("a")) return;
		e.stopPropagation();
		if (!isSelected && !isEditing) onSelect(rowIndex, columnId);
		else onStartEdit(rowIndex, columnId);
	};
	const handleContainerBlur = (e) => {
		if (justCancelledRef.current) {
			justCancelledRef.current = false;
			return;
		}
		if (!isEditing) return;
		const currentTarget = e.currentTarget;
		const nextFocusedElement = e.relatedTarget;
		if (nextFocusedElement && currentTarget.contains(nextFocusedElement)) return;
		handleSave();
	};
	const renderContent = () => {
		if (isEditing) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: inputType,
			value: editValue,
			onChange: (e) => setEditValue(e.target.value),
			onKeyDown: handleKeyDown,
			className: "inv-editable-table-cell-input"
		});
		const display = renderDisplay ? renderDisplay(value) : value ?? "";
		if (inputType === "url") {
			const rawHref = toDisplayString(value);
			const safeHref = safeUrl(rawHref);
			const isValid = isValidUrl(rawHref) && safeHref !== void 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-editable-table-display-url-container",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, {
						size: 16,
						className: "inv-editable-table-display-url-icon"
					}),
					safeHref ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						href: safeHref,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inv-editable-table-display-url",
						onClick: (e) => e.stopPropagation(),
						children: display
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "inv-editable-table-display-url",
						onClick: (e) => e.stopPropagation(),
						children: display
					}),
					!isValid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipWrapper, {
						tooltipContent: "This might not be a valid URL",
						side: "right",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Info, {
							size: 16,
							className: "inv-editable-table-display-url-warning-icon"
						}) })
					})
				]
			});
		}
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)({
				"inv-editable-table-display-text": inputType === "text",
				"inv-editable-table-display-number": inputType === "number"
			}),
			children: display
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		onBlur: handleContainerBlur,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), renderContent()]
	});
};
//#endregion
//#region src/components/EditableTable/base/components/EditableNumberCell.tsx
const EditableNumberCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "number",
	parseOnSave: (raw) => {
		const parsed = parseFloat(raw);
		return Number.isFinite(parsed) ? parsed : 0;
	},
	renderDisplay: (value) => value === void 0 || value === null ? "" : String(value)
});
//#endregion
//#region src/components/EditableTable/base/components/EditableSelectCell.tsx
const EditableSelectCell = (props) => {
	const { value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table } = props;
	const [editValue, setEditValue] = (0, react.useState)(value || "");
	const cellRef = (0, react.useRef)(null);
	const options = (table.getColumn(columnId)?.columnDef?.meta)?.options ?? [];
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditValue(value || "");
	}, [value, isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleSave = (0, react.useCallback)(() => {
		updateTableData?.(rowIndex, columnId, editValue);
		onFinishEdit(true);
	}, [
		editValue,
		rowIndex,
		columnId,
		updateTableData,
		onFinishEdit
	]);
	const handleCancel = (0, react.useCallback)(() => {
		setEditValue(value || "");
		onFinishEdit(false);
	}, [value, onFinishEdit]);
	const { handleKeyDown } = useEditableCellKeyboard({
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave: handleSave,
		onCancel: handleCancel
	});
	const handleKeyDownWithSelect = (0, react.useCallback)((e) => {
		if (isEditing) switch (e.key) {
			case "Tab":
				e.preventDefault();
				e.stopPropagation();
				handleSave();
				onNavigate(e.shiftKey ? "left" : "right");
				return;
			case "Escape":
				e.preventDefault();
				e.stopPropagation();
				handleCancel();
				return;
		}
		handleKeyDown(e);
	}, [
		isEditing,
		handleSave,
		handleCancel,
		onNavigate,
		handleKeyDown
	]);
	const handleClick = () => {
		if (!isSelected && !isEditing) onSelect(rowIndex, columnId);
		else if (isSelected && !isEditing) onStartEdit(rowIndex, columnId);
	};
	const handleValueChange = (newValue) => {
		setEditValue(newValue);
		updateTableData?.(rowIndex, columnId, newValue);
		onFinishEdit(true);
	};
	const handleOpenChange = (open) => {
		if (!open && isEditing) onFinishEdit(false);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClick: handleClick,
		onKeyDown: handleKeyDownWithSelect,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
			value: editValue,
			onValueChange: handleValueChange,
			open: isEditing,
			onOpenChange: handleOpenChange,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, {
				className: "inv-editable-table-select-trigger",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, { placeholder: "Select an option" })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
				value: option.value,
				className: "inv-editable-table-select-item",
				children: option.label
			}, option.value)) })]
		})]
	});
};
//#endregion
//#region src/components/EditableTable/base/components/EditableTextCell.tsx
const EditableTextCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "text",
	parseOnSave: (raw) => raw
});
//#endregion
//#region src/components/EditableTable/base/components/EditableUrlCell.tsx
const EditableUrlCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "url",
	parseOnSave: (raw) => raw,
	renderDisplay: (value) => value === void 0 || value === null ? "" : String(value)
});
//#endregion
//#region src/components/EditableTable/base/components/cellRegistry.ts
const registry = {
	text: EditableTextCell,
	number: EditableNumberCell,
	"date-single": EditableDateCell,
	select: EditableSelectCell,
	url: EditableUrlCell
};
function getCellRenderer(type) {
	return registry[type ?? "text"];
}
//#endregion
//#region src/components/EditableTable/EditableTable.tsx
const CellRenderer = (info) => {
	const colKey = info.column.id;
	const CellCmp = getCellRenderer(info.columns.find((c) => c.key === colKey)?.type || "text");
	const rowIndex = info.row.index;
	const columnId = colKey;
	const isSelected = info.selectedPosition?.row === rowIndex && info.selectedPosition?.column === columnId;
	const isEditing = info.editingPosition?.row === rowIndex && info.editingPosition?.column === columnId;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellCmp, {
		value: info.getValue(),
		rowIndex,
		columnId,
		isSelected,
		isEditing,
		onSelect: info.handleCellSelect,
		onStartEdit: info.handleStartEdit,
		onFinishEdit: info.handleFinishEdit,
		onNavigate: info.handleNavigate,
		table: info.table
	});
};
const headerIcon = (type) => {
	switch (type) {
		case "url": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, { size: 16 });
		case "date-single": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.CalendarDays, { size: 16 });
		case "select": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.List, { size: 16 });
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Type, { size: 16 });
	}
};
const PORTAL_CELL_TYPES = ["date-single", "select"];
/**
* Spreadsheet-like editable grid built on @tanstack/react-table. Cells are
* selected with a click / keyboard and edited inline according to the column
* `type` (text, number, url, date-single, select).
*/
const EditableTable = react.default.forwardRef(({ data, columns, onDataChange, className }, ref) => {
	const [selectedPosition, setSelectedPosition] = (0, react.useState)(null);
	const [editingPosition, setEditingPosition] = (0, react.useState)(null);
	const tableRef = (0, react.useRef)(null);
	const scrollContainerRef = (0, react.useRef)(null);
	/**
	* Horizontal scroll controls state
	* - isScrollable: whether content overflows horizontally
	* - canScrollLeft/canScrollRight: whether there is hidden content in that direction
	* - columnLefts: cumulative left offsets of header cells relative to the scroll container
	*   Used to snap scrolling by exactly one column at a time.
	*/
	const [isScrollable, setIsScrollable] = (0, react.useState)(false);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const [columnLefts, setColumnLefts] = (0, react.useState)([]);
	react.default.useImperativeHandle(ref, () => tableRef.current);
	const updateData = (0, react.useCallback)((rowIndex, columnId, value) => {
		const oldRow = data[rowIndex];
		if (!oldRow) return;
		const newData = [...data];
		newData[rowIndex] = {
			...oldRow,
			[columnId]: value
		};
		onDataChange?.(newData);
	}, [data, onDataChange]);
	const handleCellSelect = (0, react.useCallback)((rowIndex, columnId) => {
		setSelectedPosition({
			row: rowIndex,
			column: columnId
		});
		setEditingPosition(null);
	}, []);
	const handleStartEdit = (0, react.useCallback)((rowIndex, columnId) => {
		const cellType = columns.find((col) => col.key === columnId)?.type ?? "text";
		setSelectedPosition({
			row: rowIndex,
			column: columnId
		});
		setEditingPosition({
			row: rowIndex,
			column: columnId,
			cellType
		});
	}, [columns]);
	const handleFinishEdit = (0, react.useCallback)((_save) => {
		setEditingPosition(null);
	}, []);
	const handleNavigate = (0, react.useCallback)((direction) => {
		if (!selectedPosition) return;
		const { row, column } = selectedPosition;
		const columnIndex = columns.findIndex((col) => col.key === column);
		let newRow = row;
		let newColumnIndex = columnIndex;
		switch (direction) {
			case "up":
				newRow = Math.max(0, row - 1);
				break;
			case "down":
				newRow = Math.min(data.length - 1, row + 1);
				break;
			case "left":
				newColumnIndex = Math.max(0, columnIndex - 1);
				break;
			case "right":
				newColumnIndex = Math.min(columns.length - 1, columnIndex + 1);
				break;
		}
		const newColumn = columns[newColumnIndex]?.key || column;
		setSelectedPosition({
			row: newRow,
			column: newColumn
		});
		setEditingPosition(null);
	}, [
		selectedPosition,
		columns,
		data.length
	]);
	(0, react.useEffect)(() => {
		const handleTableKeyDown = (e) => {
			if (!editingPosition && document.activeElement === tableRef.current) {
				if (e.key === "Tab") {
					e.preventDefault();
					if (!selectedPosition && data.length > 0 && columns.length > 0) {
						const firstColumn = columns[0];
						if (firstColumn) setSelectedPosition({
							row: 0,
							column: firstColumn.key
						});
					}
				}
			}
		};
		const tableElement = tableRef.current;
		if (tableElement) {
			tableElement.addEventListener("keydown", handleTableKeyDown);
			return () => {
				tableElement.removeEventListener("keydown", handleTableKeyDown);
			};
		}
	}, [
		editingPosition,
		selectedPosition,
		data.length,
		columns
	]);
	(0, react.useEffect)(() => {
		const handleClickOutside = (event) => {
			const isPortalCellEditing = editingPosition?.cellType && PORTAL_CELL_TYPES.includes(editingPosition.cellType);
			if (tableRef.current && !tableRef.current.contains(event.target) && !isPortalCellEditing) {
				setSelectedPosition(null);
				setEditingPosition(null);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [editingPosition?.cellType]);
	const columnHelper = (0, _tanstack_react_table.createColumnHelper)();
	const table = (0, _tanstack_react_table.useReactTable)({
		data,
		columns: columns.map((col) => columnHelper.accessor(col.key, {
			header: col.header,
			minSize: 0,
			size: col.width || 120,
			meta: col.options ? {
				options: col.options,
				type: col.type
			} : { type: col.type }
		})),
		getCoreRowModel: (0, _tanstack_react_table.getCoreRowModel)(),
		meta: { updateData }
	});
	const headerIconForColumn = (0, react.useCallback)((column) => {
		const type = column.columnDef.meta?.type;
		return type ? headerIcon(type) : null;
	}, []);
	/**
	* Measure scrollability and header column positions.
	* - Recomputes on container resize via ResizeObserver
	* - Updates button enabled/disabled state on scroll
	* - Computes `columnLefts` by reading each <th> left position relative to the scroll container
	*/
	(0, react.useEffect)(() => {
		const container = scrollContainerRef.current;
		const wrapper = tableRef.current;
		if (!container || !wrapper) return;
		const updateScrollButtons = () => {
			setCanScrollLeft(container.scrollLeft > 0);
			setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
		};
		const compute = () => {
			setIsScrollable(container.scrollWidth > container.clientWidth);
			updateScrollButtons();
			const ths = wrapper.querySelectorAll("thead th");
			if (!ths || ths.length === 0) {
				setColumnLefts([]);
				return;
			}
			const containerRect = container.getBoundingClientRect();
			const lefts = [];
			ths.forEach((th) => {
				const left = th.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
				lefts.push(Math.max(0, Math.round(left)));
			});
			setColumnLefts(Array.from(new Set(lefts)).sort((a, b) => a - b));
		};
		compute();
		const ro = new ResizeObserver(() => compute());
		ro.observe(container);
		container.addEventListener("scroll", updateScrollButtons);
		return () => {
			ro.disconnect();
			container.removeEventListener("scroll", updateScrollButtons);
		};
	}, [columns, data]);
	/**
	* Scroll right to the start of the next column that is not fully visible.
	* If no next column is found, scrolls to the maximum possible scroll position.
	*/
	const scrollToNextColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLefts.length === 0) return;
		const current = container.scrollLeft;
		const target = columnLefts.find((l) => l > current + 1);
		const maxScroll = container.scrollWidth - container.clientWidth;
		const next = typeof target === "number" ? target : maxScroll;
		container.scrollTo({
			left: Math.min(next, maxScroll),
			behavior: "smooth"
		});
	}, [columnLefts]);
	/**
	* Scroll left to the start of the previous column.
	* Picks the nearest stored left offset smaller than current scrollLeft.
	*/
	const scrollToPrevColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLefts.length === 0) return;
		const current = container.scrollLeft;
		const prev = columnLefts.filter((l) => l < current - 1).at(-1) ?? 0;
		container.scrollTo({
			left: Math.max(0, prev),
			behavior: "smooth"
		});
	}, [columnLefts]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-editable-table-wrapper", className),
		ref: tableRef,
		tabIndex: 0,
		children: [isScrollable && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--left", !canScrollLeft && "inv-editable-table-scroll-control--disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
				"aria-label": "Scroll left",
				size: "small",
				variant: "secondary",
				onClick: scrollToPrevColumn,
				disabled: !canScrollLeft,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, { size: 16 })
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--right", !canScrollRight && "inv-editable-table-scroll-control--disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
				"aria-label": "Scroll right",
				size: "small",
				variant: "secondary",
				onClick: scrollToNextColumn,
				disabled: !canScrollRight,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
			})
		})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-editable-table-scroll-container",
			ref: scrollContainerRef,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
				className: "inv-editable-table-table",
				style: { width: isScrollable ? "max-content" : "100%" },
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
					style: { width: header.getSize() },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-editable-table-header-container",
						children: [header.isPlaceholder ? null : (0, _tanstack_react_table.flexRender)(header.column.columnDef.header, header.getContext()), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-editable-table-header-icon",
							children: headerIconForColumn(header.column)
						})]
					})
				}, header.id)) }, headerGroup.id)) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
					style: { width: cell.column.getSize() },
					children: (0, _tanstack_react_table.flexRender)(CellRenderer, {
						...cell.getContext(),
						columns,
						selectedPosition,
						editingPosition,
						handleCellSelect,
						handleStartEdit,
						handleFinishEdit,
						handleNavigate
					})
				}, cell.id)) }, row.id)) })]
			})
		})]
	});
});
EditableTable.displayName = "EditableTable";
/**
* Pending-changes summary bar shown beneath an EditableTable, with reset / save actions.
* Renders nothing when `changedCellCount` is 0.
*/
const EditableTableChangesBar = ({ changedCellCount, onReset, onSave, resetLabel = "Reset", saveLabel = "Save Changes", className }) => {
	if (changedCellCount <= 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-editable-table-changes-container", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-editable-table-changes-count",
			children: [changedCellCount, " changes made"]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-editable-table-changes-buttons",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				onClick: onReset,
				variant: "secondary",
				size: "small",
				iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.RotateCcw, { size: 16 }),
				children: resetLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				onClick: onSave,
				variant: "primary",
				size: "small",
				iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }),
				children: saveLabel
			})]
		})]
	});
};
//#endregion
//#region src/components/EntityList/EntityList.tsx
function EntityListRowView({ row, rowType }) {
	const rightVariant = row.rightVariant ?? "text";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-entity-list__row", `inv-entity-list__row--${rowType}`),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)("inv-entity-list__cell-left", `inv-entity-list__cell-left--${rowType}`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: row.left })
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)("inv-entity-list__cell-right", `inv-entity-list__cell-right--${rightVariant}`, `inv-entity-list__cell-right--${rowType}`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: row.right })
		})]
	});
}
/** A two-column key/value list with optional header and footer rows. */
const EntityList = (0, react.forwardRef)(({ rows = [], size = "default", header, footer, className }, ref) => {
	const showHeaderFooter = size === "default";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-entity-list", `inv-entity-list--${size}`, className),
		children: [
			showHeaderFooter && header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row: header,
				rowType: "header"
			}),
			rows.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row,
				rowType: "body"
			}, index)),
			showHeaderFooter && footer && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row: footer,
				rowType: "footer"
			})
		]
	});
});
EntityList.displayName = "EntityList";
//#endregion
//#region src/components/FollowUpBlock/FollowUpBlock.tsx
const FollowUpBlock = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-follow-up-block", className),
		style,
		...rest,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-follow-up-block__header",
			children: "Related Queries"
		}), children]
	});
});
FollowUpBlock.displayName = "FollowUpBlock";
//#endregion
//#region src/components/FollowUpItem/FollowUpItem.tsx
const FollowUpItem = (0, react.forwardRef)((props, ref) => {
	const { className, text, icon, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		ref,
		className: (0, clsx.default)("inv-follow-up-item", className),
		...rest,
		children: [text && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-follow-up-item-text",
			children: text
		}), icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-follow-up-item-icon",
			children: icon
		})]
	});
});
FollowUpItem.displayName = "FollowUpItem";
//#endregion
//#region src/components/FormControl/context.tsx
const FormControlContext = (0, react.createContext)(null);
function useFormControlContext() {
	return (0, react.useContext)(FormControlContext);
}
function FormControlProvider(props) {
	const { value, children } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FormControlContext.Provider, {
		value,
		children
	});
}
//#endregion
//#region src/components/FormControl/FormControl.tsx
const FormControl = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, hasError = false } = props;
	const formControlContextValue = (0, react.useMemo)(() => ({ hasError }), [hasError]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-form-control", className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FormControlProvider, {
			value: formControlContextValue,
			children
		})
	});
});
FormControl.displayName = "FormControl";
//#endregion
//#region src/components/FormControl/Hint/Hint.tsx
const Hint = (0, react.forwardRef)(({ children, className, style, hasError, ...props }, ref) => {
	const ctx = useFormControlContext();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-hint", className, { "inv-hint-error": hasError ?? ctx?.hasError ?? false }),
		style,
		...props,
		children
	});
});
Hint.displayName = "Hint";
//#endregion
//#region src/components/IconTag/IconTag.tsx
/** Small icon badge used inside card primitives. */
const IconTag = (0, react.forwardRef)(({ icon, size = "m", variant = "neutral", className }, ref) => {
	if (!icon?.name) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-icon-tag", `inv-icon-tag--${size}`, `inv-icon-tag--${variant}`, className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
			name: icon.name,
			category: icon.category
		})
	});
});
IconTag.displayName = "IconTag";
//#endregion
//#region src/components/TextBlock/TextBlock.tsx
/**
* Low-level text primitive for card content: a primary line with optional
* secondary/tertiary lines. `variant`, `size`, `type` and `align` control
* emphasis, spacing and number styling.
*/
const TextBlockView = (0, react.forwardRef)(({ primary, secondary, tertiary, variant = "title-text", type = "text", size = "sm", align = "left", secondaryMaxLines, secondaryTone, className }, ref) => {
	const secondaryClassName = (0, clsx.default)("inv-text-block__secondary", secondaryTone && `inv-text-block__secondary--${secondaryTone}`);
	const secondaryStyle = secondaryMaxLines !== void 0 ? {
		display: "-webkit-box",
		WebkitLineClamp: secondaryMaxLines,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis"
	} : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-text-block", `inv-text-block--${variant}`, `inv-text-block--size-${size}`, `inv-text-block--align-${align}`, `inv-text-block--type-${type}`, className),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, {
				content: primary,
				className: "inv-text-block__primary"
			}),
			secondary && (secondaryStyle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: secondaryClassName,
				style: secondaryStyle,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: secondary })
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, {
				content: secondary,
				className: secondaryClassName
			})),
			tertiary && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, {
				content: tertiary,
				className: "inv-text-block__tertiary"
			})
		]
	});
});
TextBlockView.displayName = "TextBlockView";
//#endregion
//#region src/components/IconText/IconText.tsx
function normalizeIconVariant(variant) {
	switch (variant) {
		case "filled":
		case "soft": return "neutral";
		default: return variant;
	}
}
/** An icon badge beside (or above) a title with an optional subtitle. */
const IconText = (0, react.forwardRef)(({ icon, title, subtitle, iconVariant = "neutral", bold = false, layout = "horizontal", className }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	ref,
	className: (0, clsx.default)("inv-icon-text", `inv-icon-text--${layout}`, className),
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconTag, {
		icon,
		variant: normalizeIconVariant(iconVariant),
		size: "l"
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-icon-text__content",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBlockView, {
			variant: bold ? "highlight-text-number-subtext" : "text-subtext",
			primary: title,
			secondary: subtitle,
			type: "text",
			size: layout === "horizontal" ? "xs" : "sm",
			align: "left"
		})
	})]
}));
IconText.displayName = "IconText";
//#endregion
//#region src/components/Image/Image.tsx
const aspectRatioMap = {
	"1:1": 1,
	"3:2": 3 / 2,
	"3:4": 3 / 4,
	"4:3": 4 / 3,
	"16:9": 16 / 9
};
const scaleMap = {
	fit: "inv-image-fit",
	fill: "inv-image-fill"
};
const Image = (0, react.forwardRef)((props, ref) => {
	const { src, alt, styles, className, aspectRatio = "3:2", scale = "fill", ...rest } = props;
	const [hasError, setHasError] = (0, react.useState)(false);
	const image = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		ref,
		src,
		alt,
		className: (0, clsx.default)("inv-image", {
			[`${scaleMap[scale]}`]: scale,
			"inv-image--error": hasError
		}, className),
		style: styles,
		onLoad: () => setHasError(false),
		onError: () => setHasError(true),
		...rest
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_aspect_ratio.Root, {
		ratio: aspectRatioMap[aspectRatio],
		children: image
	});
});
Image.displayName = "Image";
//#endregion
//#region src/hooks/useResponsiveContainer.ts
function getBreakpoint(width) {
	if (width < 480) return "mobile";
	if (width < 800) return "tablet";
	return "desktop";
}
/**
* Continuously tracks a container's size via ResizeObserver and returns
* width, height, and a breakpoint derived from the container width.
*
* Breakpoints: mobile (<480px) | tablet (480–800px) | desktop (>800px)
*/
function useResponsiveContainer(containerRef) {
	const [size, setSize] = (0, react$1.useState)({
		width: 0,
		height: 0,
		breakpoint: "mobile"
	});
	const [element, setElement] = (0, react$1.useState)(null);
	(0, react$1.useLayoutEffect)(() => {
		const current = containerRef.current;
		if (current !== element) setElement(current);
	});
	(0, react$1.useLayoutEffect)(() => {
		if (!element) return;
		const updateSize = () => {
			const width = element.clientWidth;
			const height = element.clientHeight;
			setSize((prev) => {
				if (prev.width === width && prev.height === height) return prev;
				return {
					width,
					height,
					breakpoint: getBreakpoint(width)
				};
			});
		};
		const rafUpdateSize = () => requestAnimationFrame(updateSize);
		const resizeObserver = new ResizeObserver(rafUpdateSize);
		resizeObserver.observe(element);
		updateSize();
		return () => {
			resizeObserver.disconnect();
		};
	}, [element]);
	return size;
}
//#endregion
//#region src/components/ImageBlock/ImageBlock.tsx
const ImageBlock = (0, react.forwardRef)(({ src, alt, className, imageLoading, ...rest }, ref) => {
	const [isImageLoading, setIsImageLoading] = (0, react.useState)(imageLoading ?? true);
	const [hasError, setHasError] = (0, react.useState)(false);
	const containerRef = (0, react.useRef)(null);
	const { breakpoint } = useResponsiveContainer(containerRef);
	const isMobile = breakpoint === "mobile";
	if (!src) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: (node) => {
			containerRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		},
		className: (0, clsx.default)("inv-image-block-wrapper", {
			"inv-image-block-wrapper--mobile": isMobile,
			"inv-image-block-wrapper--error": hasError
		}, className),
		style: src && !hasError ? { "--bg-image": `url(${src})` } : void 0,
		...rest,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: (0, clsx.default)("inv-image-block-image", {
				"inv-image-block-image--mobile": isMobile,
				"inv-image-block-image--error": hasError
			}),
			onLoad: () => {
				setIsImageLoading(false);
				setHasError(false);
			},
			onError: () => {
				setIsImageLoading(false);
				setHasError(true);
			}
		}), isImageLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-image-block-loader" })]
	});
});
ImageBlock.displayName = "ImageBlock";
//#endregion
//#region src/components/ImageGallery/GalleryModal.tsx
const GalleryModal = ({ images, selectedImageIndex, setSelectedImageIndex, onClose }) => {
	const [scrollButtons, setScrollButtons] = (0, react.useState)({
		showLeft: false,
		showRight: false
	});
	const carouselRef = (0, react.useRef)(null);
	const modalContentRef = (0, react.useRef)(null);
	const { portalThemeClassName } = useTheme();
	const checkScroll = (0, react.useCallback)(() => {
		if (!carouselRef.current) return;
		const container = carouselRef.current;
		setScrollButtons({
			showLeft: container.scrollLeft > 0,
			showRight: container.scrollLeft + container.offsetWidth < container.scrollWidth
		});
	}, []);
	(0, react.useEffect)(() => {
		if (!carouselRef.current) return;
		const container = carouselRef.current;
		checkScroll();
		const resizeObserver = new ResizeObserver(checkScroll);
		resizeObserver.observe(container);
		container.addEventListener("scroll", checkScroll);
		return () => {
			container.removeEventListener("scroll", checkScroll);
			resizeObserver.disconnect();
		};
	}, [checkScroll]);
	(0, react.useEffect)(() => {
		document.body.style.overflow = "hidden";
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		const handleOutsideClick = (e) => {
			if (modalContentRef.current && !modalContentRef.current.contains(e.target)) onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onClose]);
	const scroll = (direction) => {
		if (carouselRef.current) {
			const container = carouselRef.current;
			const scrollAmount = container.getBoundingClientRect().width * .28;
			if (direction === "left") container.scrollBy({
				left: -scrollAmount,
				behavior: "smooth"
			});
			else container.scrollBy({
				left: scrollAmount,
				behavior: "smooth"
			});
		}
	};
	const handleThumbnailClick = (0, react.useCallback)((index) => () => setSelectedImageIndex(index), [setSelectedImageIndex]);
	return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-gallery__modal", portalThemeClassName),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-gallery__modal-content",
			ref: modalContentRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "inv-gallery-modal-heading",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-gallery__modal-header",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						id: "inv-gallery-modal-heading",
						className: "inv-gallery__modal-heading",
						children: "All Photos"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
						size: "small",
						variant: "secondary",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, {}),
						onClick: onClose,
						"aria-label": "Close gallery"
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-gallery__modal-main",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
						src: images[selectedImageIndex]?.src,
						alt: images[selectedImageIndex]?.alt || `Gallery image ${selectedImageIndex + 1}`
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-gallery__modal-carousel-container",
					children: [
						scrollButtons.showLeft && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: (0, clsx.default)("inv-gallery__modal-carousel-button-container", "inv-gallery__modal-carousel-button-container-left"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
								className: (0, clsx.default)("inv-gallery__carousel-button", "inv-gallery__carousel-button--left"),
								onClick: () => scroll("left"),
								"aria-label": "Scroll images left",
								icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {}),
								variant: "secondary",
								size: "extra-small"
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-gallery__modal-carousel",
							ref: carouselRef,
							children: images.map((image, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: (0, clsx.default)("inv-gallery__modal-thumbnail", index === selectedImageIndex && "inv-gallery__modal-thumbnail--active"),
								role: "button",
								tabIndex: 0,
								"aria-label": image.alt || `Gallery image ${index + 1}`,
								"aria-pressed": index === selectedImageIndex,
								onClick: handleThumbnailClick(index),
								onKeyDown: (e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleThumbnailClick(index)();
									}
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
									src: image.src,
									alt: "",
									"aria-hidden": "true"
								})
							}, index))
						}),
						scrollButtons.showRight && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: (0, clsx.default)("inv-gallery__modal-carousel-button-container", "inv-gallery__modal-carousel-button-container-right"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
								className: (0, clsx.default)("inv-gallery__carousel-button", "inv-gallery__carousel-button--right"),
								onClick: () => scroll("right"),
								"aria-label": "Scroll images right",
								icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {}),
								variant: "secondary",
								size: "extra-small"
							})
						})
					]
				})
			]
		})
	}), document.body);
};
//#endregion
//#region src/components/ImageGallery/ImageGallery.tsx
const MAX_GRID_IMAGES = 5;
const getLayoutClassName = (imageCount) => {
	switch (imageCount) {
		case 1: return "inv-gallery--single";
		case 2: return "inv-gallery--double";
		case 3: return "inv-gallery--triple";
		case 4: return "inv-gallery--quad";
		default: return "inv-gallery--default";
	}
};
const ImageGallery = ({ images }) => {
	const [showAll, setShowAll] = (0, react.useState)(false);
	const [selectedImageIndex, setSelectedImageIndex] = (0, react.useState)(0);
	const layoutClass = (0, react.useMemo)(() => getLayoutClassName(images.length), [images.length]);
	const shouldShowButton = (0, react.useMemo)(() => images.length > MAX_GRID_IMAGES, [images.length]);
	const visibleImages = (0, react.useMemo)(() => images.slice(0, MAX_GRID_IMAGES), [images]);
	const toggleShowAll = (0, react.useCallback)(() => {
		setShowAll((prev) => !prev);
	}, []);
	const handleImageClick = (0, react.useCallback)((index) => {
		setSelectedImageIndex(index);
		setShowAll(true);
	}, []);
	const setSelectedImageIndexMemoized = (0, react.useCallback)((index) => {
		setSelectedImageIndex(index);
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-gallery", layoutClass),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-gallery__grid",
			children: [visibleImages.map((image, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-gallery__image", index === 0 && "inv-gallery__image--main"),
				onClick: () => handleImageClick(index),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
					src: image.src,
					alt: image.alt || `Gallery image ${index + 1}`
				})
			}, index)), shouldShowButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-gallery__show-all-button",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "small",
					onClick: toggleShowAll,
					children: "Show All"
				})
			})]
		}), showAll && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GalleryModal, {
			images,
			selectedImageIndex,
			setSelectedImageIndex: setSelectedImageIndexMemoized,
			onClose: toggleShowAll
		})]
	});
};
//#endregion
//#region src/components/ImageText/ImageText.tsx
/** A small square image beside (or above) a title with an optional subtitle. */
const ImageText = (0, react.forwardRef)(({ title, subtitle, src, alt, bold = false, layout = "horizontal", imageSize, className }, ref) => {
	const altText = alt ?? title;
	const size = imageSize ?? (layout === "horizontal" ? 40 : void 0);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-image-text", `inv-image-text--${layout}`, className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-image-text__image-container",
			style: size ? {
				width: size,
				height: size
			} : void 0,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				className: "inv-image-text__image",
				src,
				alt: altText
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-image-text__content",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBlockView, {
				variant: bold ? "highlight-text-number-subtext" : "text-subtext",
				primary: title,
				secondary: subtitle,
				type: "text",
				size: layout === "horizontal" ? "xs" : "sm",
				align: "left"
			})
		})]
	});
});
ImageText.displayName = "ImageText";
//#endregion
//#region src/components/ImageTextLarge/ImageTextLarge.tsx
/** A full-width banner image above a bold title with an optional subtitle. */
const ImageTextLarge = (0, react.forwardRef)(({ title, subtitle, src, alt, className }, ref) => {
	const altText = alt ?? title;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-image-text-large", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-image-text-large__image-wrap",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				className: "inv-image-text-large__image",
				src,
				alt: altText
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-image-text-large__content",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBlockView, {
				variant: "highlight-text",
				primary: title,
				secondary: subtitle,
				type: "text",
				size: "sm",
				align: "left"
			})
		})]
	});
});
ImageTextLarge.displayName = "ImageTextLarge";
//#endregion
//#region src/components/InlineHeader/InlineHeader.tsx
const InlineHeader = ({ heading, description, className }) => {
	if (!heading && !description) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-inline-header", className),
		children: [heading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-inline-header-heading",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: heading })
		}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-inline-header-description",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: description })
		})]
	});
};
//#endregion
//#region src/components/Input/Input.tsx
const sizes = {
	small: "inv-input-small",
	medium: "inv-input-medium",
	large: "inv-input-large"
};
const Input = react.default.forwardRef(({ className, styles, size = "medium", hasError, ...props }, ref) => {
	const ctx = useFormControlContext();
	const resolvedHasError = hasError ?? ctx?.hasError ?? false;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		autoComplete: "off",
		ref,
		className: (0, clsx.default)("inv-input", sizes[size], className, { "inv-input-error": resolvedHasError }),
		style: styles,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/Label/Label.tsx
const Label = (0, react.forwardRef)(({ children, className, style, disabled, required, ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_label.Root, {
		ref,
		className: (0, clsx.default)("inv-label", { "inv-label-disabled": disabled }, className),
		style,
		...props,
		children: [children, required && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-label-required-asterisk",
			children: "*"
		})]
	});
});
Label.displayName = _radix_ui_react_label.Root.displayName;
//#endregion
//#region src/components/ListBlock/ListBlock.tsx
const ListBlock = (0, react.forwardRef)((props, ref) => {
	const { children, variant = "number", size = "default", className, style } = props;
	const listHasSubtitle = react.Children.toArray(children).some((child) => (0, react.isValidElement)(child) && !!child.props.subtitle);
	const enhancedChildren = react.Children.map(children, (child, index) => {
		if ((0, react.isValidElement)(child)) return (0, react.cloneElement)(child, {
			variant,
			size,
			listHasSubtitle,
			index
		});
		return child;
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-list-block", size === "small" && "inv-list-block--small", className),
		style,
		children: enhancedChildren
	});
});
ListBlock.displayName = "ListBlock";
//#endregion
//#region src/components/ListItem/ListItem.tsx
const ListItem = react.default.forwardRef((props, ref) => {
	const { className, style, variant = "number", size = "default", icon, image, index = 0, listHasSubtitle, title, subtitle, actionIcon, actionLabel, onClick, ...rest } = props;
	const hasAction = !!onClick;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-list-item-wrapper", size === "small" && "inv-list-item-wrapper--small", hasAction && "inv-list-item-wrapper-with-action", className),
		style,
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-list-item", hasAction && "inv-list-item-clickable"),
			onClick,
			role: hasAction ? "button" : void 0,
			tabIndex: hasAction ? 0 : void 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, clsx.default)("inv-list-item-indicator", !listHasSubtitle && "inv-list-item-indicator-no-subtitle", hasAction && "inv-list-item-indicator-clickable"),
				children: [
					variant === "number" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-indicator-number",
						children: index + 1
					}),
					variant === "icon" && icon,
					variant === "image" && image && (image.src || image.alt) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-indicator-image",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
							src: image.src,
							alt: image.alt,
							width: 40,
							height: 40
						})
					})
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-list-item-content-wrapper",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-list-item-content",
					children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-title",
						children: title
					}), subtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-subtitle",
						children: subtitle
					})]
				}), hasAction && (actionIcon || actionLabel) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-list-item-action",
					children: [actionLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-action-label",
						children: actionLabel
					}), actionIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-action-icon",
						children: actionIcon
					})]
				})]
			})]
		})
	});
});
ListItem.displayName = "ListItem";
//#endregion
//#region src/components/MetricIndicator/MetricIndicator.tsx
const MetricIndicatorBase = (0, react.forwardRef)(({ value, subtext, previousValue, trend, variant, className }, ref) => {
	const isPositive = trend?.direction === "up";
	const isInline = variant === "inline";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-metric-indicator", `inv-metric-indicator--variant-${variant}`, subtext && "inv-metric-indicator--has-subtext", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-metric-indicator__row",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__main-value",
					children: value
				}),
				!isInline && previousValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__previous-value",
					children: previousValue
				}),
				trend && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: (0, clsx.default)("inv-metric-indicator__trend", isPositive ? "inv-metric-indicator__trend--success" : "inv-metric-indicator__trend--danger"),
					children: [
						isPositive ? "+" : "-",
						trend.value,
						"%"
					]
				}),
				isInline && subtext && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-metric-indicator__subtext",
					children: subtext
				})
			]
		}), !isInline && subtext && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-metric-indicator__subtext",
			children: subtext
		})]
	});
});
MetricIndicatorBase.displayName = "MetricIndicatorBase";
/** A headline metric with an optional struck-through previous value, trend and subtext. */
const MetricIndicatorWithStrikethrough = (0, react.forwardRef)((props, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorBase, {
	ref,
	...props,
	variant: "with-strikethrough"
}));
MetricIndicatorWithStrikethrough.displayName = "MetricIndicatorWithStrikethrough";
/** A headline metric with trend and subtext rendered on a single line. */
const MetricIndicatorInline = (0, react.forwardRef)((props, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorBase, {
	ref,
	...props,
	variant: "inline"
}));
MetricIndicatorInline.displayName = "MetricIndicatorInline";
//#endregion
//#region src/components/Tag/Tag.tsx
const sizeMap = {
	sm: "inv-tag-sm",
	md: "inv-tag-md",
	lg: "inv-tag-lg"
};
const variantMap$2 = {
	neutral: "inv-tag-neutral",
	info: "inv-tag-info",
	success: "inv-tag-success",
	warning: "inv-tag-warning",
	danger: "inv-tag-danger"
};
const Tag = (0, react.forwardRef)((props, ref) => {
	const { className, styles, icon, text, size = "md", variant = "neutral", ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-tag", sizeMap[size], variantMap$2[variant], className),
		style: styles,
		...rest,
		children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-tag-icon",
			children: icon
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-tag-text",
			children: text
		})]
	});
});
Tag.displayName = "Tag";
//#endregion
//#region src/components/ModelSwitcher/utils.ts
function groupModels(models) {
	const order = [];
	const byGroup = /* @__PURE__ */ new Map();
	for (const model of models) {
		const key = model.group ?? "";
		let bucket = byGroup.get(key);
		if (!bucket) {
			bucket = [];
			byGroup.set(key, bucket);
			order.push(key);
		}
		bucket.push(model);
	}
	return order.map((key) => ({
		label: key === "" ? null : key,
		models: byGroup.get(key) ?? []
	}));
}
const subscribeNoop = () => () => {};
function useHydrated() {
	return (0, react$1.useSyncExternalStore)(subscribeNoop, () => true, () => false);
}
//#endregion
//#region src/components/ModelSwitcher/ModelSwitcher.tsx
function ModelSwitcher({ models, value, onValueChange }) {
	const hydrated = useHydrated();
	const { mode } = useTheme();
	const selected = models.find((model) => model.id === value) ?? models[0];
	const groups = groupModels(models);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-model-switcher",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
			value,
			onValueChange,
			size: "sm",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, {
				"aria-label": "Select model",
				title: hydrated ? selected?.id ?? value : void 0,
				className: "inv-model-switcher-trigger",
				children: hydrated ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerContent, {
					option: selected,
					fallback: value,
					mode
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerSkeleton, {})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, {
				align: "start",
				className: "inv-model-switcher-content",
				children: groups.map((group, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(SelectGroup, { children: [
					index > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectSeparator, {}) : null,
					group.label ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectLabel, { children: group.label }) : null,
					group.models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
						value: model.id,
						showTick: false,
						className: "inv-model-switcher-item",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelRow, {
							model,
							mode
						})
					}, model.id))
				] }, group.label ?? `group-${index}`))
			})]
		})
	});
}
function resolveLogo(logo, mode) {
	if (logo && typeof logo === "object" && "light" in logo && "dark" in logo) return mode === "dark" ? logo.dark : logo.light;
	return logo ?? null;
}
function TriggerContent({ option, fallback, mode }) {
	const logo = option ? resolveLogo(option.logo, mode) : null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		logo ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-logo",
			children: logo
		}) : null,
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-name",
			children: option?.name ?? fallback
		}),
		option ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, {
			model: option,
			variant: "trigger"
		}) : null
	] });
}
function TriggerSkeleton() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "inv-model-switcher-skeleton-dot"
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "inv-model-switcher-skeleton-bar"
	})] });
}
function ModelRow({ model, mode }) {
	const logo = resolveLogo(model.logo, mode);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: "inv-model-switcher-row",
		children: [
			logo ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-model-switcher-logo",
				children: logo
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-model-switcher-name",
				children: model.name
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, {
				model,
				variant: "row"
			})
		]
	});
}
function badgeFor(model) {
	if (model.recommended) return {
		label: "Recommended",
		kind: "recommended"
	};
	if (model.badge) return {
		label: model.badge,
		kind: "badge"
	};
	return null;
}
function Badge({ model, variant }) {
	const badge = badgeFor(model);
	if (!badge) return null;
	if (variant === "trigger") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: "inv-model-switcher-badge-trigger",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: (0, clsx.default)("inv-model-switcher-dot", `inv-model-switcher-dot-${badge.kind}`)
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-sr",
			children: badge.label
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
		size: "sm",
		variant: badge.kind === "recommended" ? "info" : "success",
		text: badge.label
	});
}
//#endregion
//#region src/components/InvChat/ShareThreadModal.tsx
const getErrorMessage = (error) => {
	if (error instanceof DOMException && error.name === "NotAllowedError") return "Clipboard access denied. Please allow clipboard access in your browser settings, or copy the link manually from the text area above.";
	else if (error instanceof DOMException && error.name === "NotSupportedError") return "Clipboard not supported. Please copy the link manually from the text area above.";
	else return "Failed to copy to clipboard. Please copy the link manually from the text area above.";
};
/**
* Modal dialog for generating and copying a shareable link.
*
* @category Components
*/
const ShareThreadModal = (0, react.forwardRef)(({ title, trigger, generateLink, themeClassName }, _ref) => {
	const { portalThemeClassName } = useTheme();
	const { layout } = useLayoutContext() || {};
	const isMobile = layout === "mobile";
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [generatedLink, setGeneratedLink] = (0, react.useState)(null);
	const [hasCopied, setHasCopied] = (0, react.useState)(false);
	const [clipboardError, setClipboardError] = (0, react.useState)(null);
	const handleGenerateLink = (0, react.useCallback)(async () => {
		setIsLoading(true);
		try {
			setGeneratedLink(await generateLink());
		} catch (_error) {
			console.error(_error);
		} finally {
			setIsLoading(false);
		}
	}, [generateLink]);
	const handleCopy = (0, react.useCallback)(async () => {
		if (!generatedLink) return;
		setClipboardError(null);
		if (!navigator.clipboard) {
			setClipboardError("Clipboard access not available. Please copy the link manually from the text area above.");
			return;
		}
		try {
			await navigator.clipboard.writeText(generatedLink);
			setHasCopied(true);
			setTimeout(() => setHasCopied(false), 2e3);
		} catch (error) {
			console.warn("Copy to clipboard failed:", error);
			setClipboardError(getErrorMessage(error));
		}
	}, [generatedLink]);
	const handleOnOpenChange = (0, react.useCallback)((open) => {
		setIsOpen(open);
		if (!open) setTimeout(() => {
			setIsLoading(false);
			setGeneratedLink(null);
			setHasCopied(false);
			setClipboardError(null);
		}, 300);
	}, []);
	const renderActionButton = () => {
		if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
			onClick: handleCopy,
			size: "medium",
			disabled: true,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Loader2, { className: "inv-share-thread-modal__loading-icon" }), "Generating..."]
		});
		if (generatedLink) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
			onClick: handleCopy,
			size: "medium",
			children: [hasCopied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Copy, {}), hasCopied ? "Copied!" : "Copy link"]
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
			onClick: handleGenerateLink,
			size: "medium",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, {}), "Generate link"]
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Root, {
		open: isOpen,
		onOpenChange: handleOnOpenChange,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Trigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Portal, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Overlay, { className: (0, clsx.default)("inv-share-thread-modal__overlay", themeClassName || portalThemeClassName) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_dialog.Content, {
			className: (0, clsx.default)("inv-share-thread-modal__content", isMobile ? "inv-share-thread-modal__content--mobile" : "", themeClassName || portalThemeClassName),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-share-thread-modal__header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_dialog.Title, {
					className: "inv-share-thread-modal__title",
					children: title ?? "Share chat"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, {}),
					variant: "tertiary",
					size: "small",
					onClick: () => handleOnOpenChange(false),
					className: "inv-share-thread-modal__close-button"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-share-thread-modal__body",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: "inv-share-thread-modal__description",
					children: "This conversation may include personal information. Take a moment to check the content before sharing the link."
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-share-thread-modal__input-section",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-share-thread-modal__input-wrapper",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Input, {
							value: generatedLink || "",
							placeholder: generatedLink ? "" : "Click \"Generate link\" to create a shareable link",
							readOnly: true,
							className: "inv-share-thread-modal__input"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-share-thread-modal__button-container",
							children: renderActionButton()
						})]
					}), clipboardError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "inv-share-thread-modal__error-message",
						children: clipboardError
					})]
				})]
			})]
		})] })]
	});
});
ShareThreadModal.displayName = "ShareThreadModal";
//#endregion
//#region src/components/InvChat/useShareThread.ts
/**
* Hook for sharing conversation threads by threadId.
* The consumer's backend looks up messages by threadId.
*
* @category Hooks
*/
const useShareThread = ({ generateShareLink }) => {
	const { isRunning, isLoadingMessages, messages } = (0, _invdev_react_headless.useThread)();
	const { selectedThreadId } = (0, _invdev_react_headless.useThreadList)();
	const getShareThreadLink = (0, react$1.useCallback)(async () => {
		if (!selectedThreadId) throw new Error("No thread selected");
		return generateShareLink(selectedThreadId);
	}, [generateShareLink, selectedThreadId]);
	return {
		shouldDisableShareButton: isRunning || isLoadingMessages || !selectedThreadId,
		hasMessages: messages.length > 0,
		getShareThreadLink
	};
};
//#endregion
//#region src/components/InvChat/ShareThread.tsx
/**
* Share button that opens a modal for generating and copying a shareable link.
* Renders nothing when there are no messages to share.
*
* @category Components
*/
const ShareThread = ({ generateShareLink, modalTitle, customTrigger }) => {
	const { layout } = useLayoutContext() || {};
	const isMobile = layout === "mobile";
	const { portalThemeClassName } = useTheme();
	const { hasMessages, getShareThreadLink, shouldDisableShareButton } = useShareThread({ generateShareLink });
	if (!hasMessages) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShareThreadModal, {
		title: modalTitle,
		trigger: customTrigger ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DefaultShareButton, {
			isMobile,
			shouldDisableShareButton
		}),
		generateLink: getShareThreadLink,
		themeClassName: portalThemeClassName
	});
};
ShareThread.displayName = "ShareThread";
const DefaultShareButton = react.default.forwardRef(({ isMobile, shouldDisableShareButton, ...props }, ref) => {
	return isMobile ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		ref,
		size: "medium",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Share2, { size: "1em" }),
		variant: "secondary",
		disabled: shouldDisableShareButton,
		...props
	}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
		ref,
		variant: "secondary",
		disabled: shouldDisableShareButton,
		...props,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Share2, {}), "Share"]
	});
});
DefaultShareButton.displayName = "DefaultShareButton";
//#endregion
//#region src/components/InvChat/utils/index.ts
/**
* Type guard to check if a WelcomeMessageConfig is a custom React component.
*
* Use this to differentiate between a custom component and a props-based
* configuration when rendering the welcome message.
*
* @param config - The welcome message configuration to check
* @returns `true` if config is a React component, `false` if it's a props object
*
* @example
* if (isWelcomeComponent(welcomeMessage)) {
*   // welcomeMessage is a React.ComponentType
*   const CustomWelcome = welcomeMessage;
*   return <CustomWelcome />;
* } else {
*   // welcomeMessage is { title?, description?, image? }
*   return <WelcomeScreen {...welcomeMessage} />;
* }
*/
const isWelcomeComponent = (config) => {
	return typeof config === "function";
};
//#endregion
//#region src/components/OptionCards/OptionCards.tsx
const OptionCards = (0, react.forwardRef)((props, ref) => {
	const { items, selected = [], type = "single", disabled = false, onToggle, className, ...rest } = props;
	const renderableItems = (items ?? []).filter((item) => Boolean(item?.value));
	const rowConfiguration = getRowConfiguration(renderableItems.length, 3);
	let cardIndex = 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-option-cards", className),
		role: type === "single" ? "radiogroup" : "group",
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-option-cards__grid", "inv-option-cards__grid--responsive", renderableItems.length % 2 === 1 && "inv-option-cards__grid--odd-count"),
			children: rowConfiguration.map((itemsInRow, rowIndex) => {
				const rowItems = renderableItems.slice(cardIndex, cardIndex + itemsInRow);
				cardIndex += itemsInRow;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)("inv-option-cards__row", `inv-option-cards__row--${itemsInRow}`),
					children: rowItems.map((item) => {
						const isSelected = selected.includes(item.value);
						const isDisabled = disabled || item.disabled === true;
						const hasTopContent = item.topContent != null;
						const topVariant = item.topContentVariant ?? "icon";
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-option-cards__item",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: type === "single" ? "radio" : "checkbox",
								"aria-checked": isSelected,
								disabled: isDisabled,
								className: (0, clsx.default)("inv-option-card", isSelected && "inv-option-card--selected", isDisabled && "inv-option-card--disabled"),
								onClick: () => onToggle?.(item.value),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "inv-option-card__content",
									children: [hasTopContent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: (0, clsx.default)("inv-option-card__top", `inv-option-card__top--${topVariant}`),
										children: item.topContent
									}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "inv-option-card__text",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "inv-option-card__title",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: item.title })
										}), item.subtitle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "inv-option-card__subtitle",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineMarkdownRenderer, { content: item.subtitle })
										}) : null]
									})]
								})
							})
						}, item.value);
					})
				}, `option-cards-row-${rowIndex}`);
			})
		})
	});
});
OptionCards.displayName = "OptionCards";
//#endregion
//#region src/components/OverviewCardBlock/OverviewCardBlock.tsx
const OverviewCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout = "grid", responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
	const isClickable = clickable && Boolean(onItemClick);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBlockLayout, {
		ref,
		size: "small",
		cardType: "overview-card",
		"data-card-type": "OverviewCard",
		items: items ?? [],
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `overview-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-overview-card", isClickable && "inv-overview-card--clickable"),
			role: isClickable ? "button" : void 0,
			tabIndex: isClickable ? 0 : void 0,
			onClick: isClickable ? () => onItemClick?.(item, index) : void 0,
			onKeyDown: isClickable ? cardKeyDownHandler(() => onItemClick?.(item, index)) : void 0,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-overview-card__vertical",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-overview-card__top-row",
					children: [item.top != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-overview-card__slot inv-overview-card__slot--top",
						children: item.top
					}), isClickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-overview-card__chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 14 })
					})]
				}), item.bottom && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-overview-card__slot inv-overview-card__slot--bottom",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorInline, { ...item.bottom })
				})]
			})
		}),
		...rest
	});
});
OverviewCardBlock.displayName = "OverviewCardBlock";
//#endregion
//#region src/components/RadioGroup/RadioGroup.tsx
const variants$2 = {
	clear: "inv-radio-group-clear",
	card: "inv-radio-group-card",
	sunk: "inv-radio-group-sunk"
};
const RadioGroup = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, variant = "clear", ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Root, {
		ref,
		className: (0, clsx.default)("inv-radio-group", variants$2[variant], className),
		style,
		...rest,
		children
	});
});
RadioGroup.displayName = "RadioGroup";
//#endregion
//#region src/components/RadioItem/RadioItem.tsx
const RadioItem = (0, react.forwardRef)((props, ref) => {
	const { label, description, className, style, disabled, required, value } = props;
	const id = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "inv-radio-item-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Item, {
			ref,
			id,
			className: (0, clsx.default)("inv-radio-item-root", className),
			value,
			disabled,
			required,
			style,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: 16,
				height: 16,
				fill: "none",
				viewBox: "0 0 16 16",
				className: "inv-radio-item-svg",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						fill: "currentColor",
						d: "M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z",
						className: "inv-radio-item-svg-path"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						stroke: "currentColor",
						d: "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z",
						className: "inv-radio-item-svg-border"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						fill: "currentColor",
						d: "M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z",
						className: "inv-radio-item-svg-inner"
					})
				]
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-radio-item-content",
			children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "inv-radio-item-label",
				children: label
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: "inv-radio-item-description",
				children: description
			})]
		})]
	});
});
RadioItem.displayName = "RadioItem";
//#endregion
//#region src/components/SectionBlock/FoldableSection.tsx
const FoldableSectionRoot = (0, react.forwardRef)(({ className, style, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Root, {
	ref,
	className: (0, clsx.default)("inv-foldable-section-root", className),
	style,
	...props
}));
FoldableSectionRoot.displayName = "FoldableSectionRoot";
const FoldableSectionItem = (0, react.forwardRef)(({ className, style, value, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Item, {
	ref,
	className: (0, clsx.default)("inv-foldable-section-item", className),
	style,
	value,
	...props
}));
FoldableSectionItem.displayName = "FoldableSectionItem";
const FoldableSectionTrigger = (0, react.forwardRef)(({ className, style, text, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Header, {
	className: "inv-foldable-section-header",
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Trigger, {
		ref,
		className: (0, clsx.default)("inv-foldable-section-trigger", className),
		style,
		...props,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-foldable-section-trigger-content-wrapper",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Separator, { className: "inv-foldable-section-trigger-content-separator" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-foldable-section-trigger-content-icon-button-wrapper",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					asChild: true,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { className: "inv-foldable-section-trigger-content-icon-button-icon" }),
					size: "3-extra-small",
					variant: "secondary",
					className: "inv-foldable-section-trigger-content-icon-button",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { "aria-hidden": "true" })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-foldable-section-trigger-content-text",
					children: text
				})]
			})]
		})
	})
}));
FoldableSectionTrigger.displayName = "FoldableSectionTrigger";
const FoldableSectionContent = (0, react.forwardRef)(({ className, style, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Content, {
	ref,
	className: (0, clsx.default)("inv-foldable-section-content", className),
	style,
	...props,
	children
}));
FoldableSectionContent.displayName = "FoldableSectionContent";
//#endregion
//#region src/components/SectionBlock/SectionV2.tsx
const SectionV2 = ({ trigger, children }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-section-v2",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-section-v2-wrapper",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Separator, { orientation: "horizontal" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-section-v2-header",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-section-v2-header-trigger",
						children: trigger
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-section-v2-content",
					children
				})
			]
		})
	});
};
//#endregion
//#region src/components/Slider/Slider.tsx
const formatNumber = (num) => {
	if (num === void 0) return "";
	if (num >= 1e3) return new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short"
	}).format(num).toLowerCase();
	return String(num);
};
const Slider = (0, react.forwardRef)(({ variant, min, max, step, disabled, value, defaultValue, onValueChange, className, style, leftContent, rightContent, ...props }, ref) => {
	const [internalValue, setInternalValue] = (0, react.useState)(defaultValue && defaultValue.length > 0 ? defaultValue : [min]);
	const isControlled = value !== void 0;
	const valueToShow = isControlled ? value : internalValue;
	const isRange = valueToShow && valueToShow.length > 1;
	const thumbs = (0, react.useMemo)(() => {
		const thumbClass = "inv-slider-thumb-handle";
		const valueIndicatorClass = "inv-slider-thumb-value";
		if (isRange) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: valueToShow?.map((v, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Thumb, {
			className: "inv-slider-thumb",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: thumbClass,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-slider-thumb-handle-inner",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-slider-thumb-handle-inner-dot" })
				}), !disabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: valueIndicatorClass,
					children: formatNumber(v)
				})]
			})
		}, i)) });
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Thumb, {
			className: "inv-slider-thumb",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: thumbClass,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-slider-thumb-handle-inner",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-slider-thumb-handle-inner-dot" })
				}), !disabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: valueIndicatorClass,
					children: formatNumber(valueToShow?.[0])
				})]
			})
		});
	}, [
		disabled,
		valueToShow,
		isRange
	]);
	const renderDots = () => {
		if (variant === "discrete" && step) {
			const numSteps = Math.floor((max - min) / step);
			const currentValue = valueToShow?.[0] ?? min;
			return Array.from({ length: numSteps + 1 }, (_, index) => {
				const value = min + step * index;
				const position = (value - min) / (max - min) * 100;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)("inv-slider-dots-dot", { "inv-slider-dots-dot--active": isRange ? value >= (valueToShow?.[0] ?? min) && value <= (valueToShow?.[1] ?? max) : value <= currentValue }),
					style: { left: `${position}%` }
				}, value);
			});
		}
		return null;
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-slider-wrapper",
		children: [
			leftContent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-slider-left-content",
				children: leftContent
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-slider-container-wrapper",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-slider-container",
					children: /* @__PURE__ */ (0, react.createElement)(_radix_ui_react_slider.Root, {
						ref,
						className: (0, clsx.default)("inv-slider-root", { "inv-slider--disabled": disabled }, className),
						...props,
						min,
						max,
						step,
						value: valueToShow,
						onValueChange: (val) => {
							if (!isControlled) setInternalValue(val);
							onValueChange?.(val);
						},
						minStepsBetweenThumbs: 1,
						disabled,
						key: variant,
						style
					}, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_slider.Track, {
						className: "inv-slider-track",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slider.Range, { className: (0, clsx.default)("inv-slider-range", { "inv-slider-range--at-min": !isRange && valueToShow?.[0] === min }) }), variant === "discrete" && renderDots()]
					}), thumbs)
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-slider-labels",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: formatNumber(min) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: formatNumber(max) })]
				})]
			}),
			rightContent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-slider-right-content",
				children: rightContent
			})
		]
	});
});
//#endregion
//#region src/components/Slider/SliderBlock.tsx
const ValueInput = ({ value, onChange, error, disabled }) => {
	const [inputValue, setInputValue] = (0, react.useState)(value);
	const [isFocused, setIsFocused] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		if (!isFocused) setInputValue(value);
	}, [value, isFocused]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-slider-block__validated-input",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Input, {
			type: "text",
			value: inputValue,
			onChange: (e) => {
				const { value: newValue } = e.target;
				setInputValue(newValue);
				if (!isNaN(Number(newValue))) onChange(Number(newValue));
			},
			className: (0, clsx.default)("inv-slider-block__input", { "inv-slider-block__input-error": error }),
			disabled,
			onFocus: () => setIsFocused(true),
			onBlur: () => setIsFocused(false)
		})
	});
};
const SliderBlock = (props) => {
	const { label, name, variant, min = 0, max = 100, step, defaultValue, disabled, isStreaming, ...sliderProps } = props;
	const [value, setValue] = (0, react.useState)(defaultValue ?? [min]);
	const { min: minError, max: maxError } = (0, react.useMemo)(() => {
		const [minValue, maxValue] = value;
		const checkValue = (v) => {
			if (isNaN(v)) return "Invalid number";
			if (v < min || v > max) return `Value must be between ${min} and ${max}`;
			return "";
		};
		const error = {
			min: checkValue(minValue),
			max: checkValue(maxValue)
		};
		if (value.length > 1 && minValue > maxValue) error.min = "Min must be less than max";
		return error;
	}, [
		value,
		min,
		max
	]);
	const onValueCommitRef = (0, react.useRef)(sliderProps?.onValueCommit);
	onValueCommitRef.current = sliderProps.onValueCommit;
	const debouncedOnValueCommit = (0, react.useMemo)(() => (0, lodash_es_debounce.default)((newValue) => {
		onValueCommitRef.current?.(newValue);
	}, 200), []);
	(0, react.useEffect)(() => {
		return () => {
			debouncedOnValueCommit.flush();
		};
	}, [debouncedOnValueCommit]);
	const setValueAndCommit = (0, react.useCallback)((newValue) => {
		setValue(newValue);
		debouncedOnValueCommit(newValue);
	}, [debouncedOnValueCommit]);
	(0, react.useEffect)(() => {
		setValue(defaultValue ?? [min]);
	}, [defaultValue, min]);
	const isRange = value.length > 1;
	const isDiscrete = variant === "discrete";
	const effectiveStep = isDiscrete ? step ?? 1 : Math.max(1, step ?? 1);
	const controlElements = (0, react.useMemo)(() => {
		if (isStreaming) return null;
		if (isDiscrete) {
			const allOptions = Array.from({ length: Math.floor((max - min) / effectiveStep) + 1 }, (_, i) => min + i * effectiveStep);
			return isRange ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-slider-block__controls is-range",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-slider-block__validated-select-container",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
							value: String(value[0]),
							disabled,
							onValueChange: (val) => setValueAndCommit([Number(val), value[1] ?? max].sort((a, b) => a - b)),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: allOptions.filter((o) => o < (value[1] ?? max)).map((o) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
								value: String(o),
								children: String(o)
							}, o)) })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-slider-block__separator" }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
							value: String(value[1]),
							disabled,
							onValueChange: (val) => setValueAndCommit([value[0] ?? min, Number(val)].sort((a, b) => a - b)),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: allOptions.filter((o) => o > (value[0] ?? min)).map((o) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
								value: String(o),
								children: String(o)
							}, o)) })]
						})
					]
				})
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-slider-block__controls is-single",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
					value: String(value[0]),
					disabled,
					onValueChange: (val) => setValueAndCommit([Number(val)]),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: allOptions.map((o) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
						value: String(o),
						children: String(o)
					}, o)) })]
				})
			});
		} else return isRange ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-slider-block__controls inv-slider-block__controls--inputs is-range",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-slider-block__validated-input-container",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueInput, {
						value: value[0] ?? min,
						onChange: (newMin) => setValueAndCommit([newMin, value[1] ?? max]),
						error: minError,
						disabled
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-slider-block__separator" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueInput, {
						value: value[1] ?? max,
						onChange: (newMax) => setValueAndCommit([value[0] ?? min, newMax]),
						error: maxError,
						disabled
					})
				]
			}), (minError || maxError) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-slider-block__error-message",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, { size: 14 }),
					" ",
					minError || maxError
				]
			})]
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-slider-block__controls inv-slider-block__controls--inputs is-single",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueInput, {
				value: value[0] ?? min,
				onChange: (newVal) => setValueAndCommit([newVal]),
				error: minError,
				disabled
			}), minError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-slider-block__error-message",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, { size: 14 }), minError]
			})]
		});
	}, [
		isStreaming,
		isDiscrete,
		isRange,
		value,
		min,
		max,
		effectiveStep,
		minError,
		maxError,
		disabled,
		setValueAndCommit
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-slider-block",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-slider-block__header", { "inv-slider-block__header--with-error": !isStreaming && !isDiscrete && (isRange ? Boolean(minError || maxError) : Boolean(minError)) }),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-slider-block__label",
				children: label
			}), controlElements]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-slider-block__content",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
				...sliderProps,
				value,
				onValueChange: (v) => {
					setValueAndCommit([...v].sort((a, b) => a - b));
				},
				min,
				max,
				step: effectiveStep,
				variant: isStreaming ? "continuous" : variant,
				name,
				disabled
			})
		})]
	});
};
//#endregion
//#region src/components/SnippetCardBlock/SnippetCardBlock.tsx
const TEXT_BLOCK_HEADING_SELECTOR = ".inv-text-block__primary";
const TEXT_BLOCK_CONTENT_SELECTOR = ".inv-text-block__secondary";
const SnippetCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, responsive = true, gap, clickable = false, onItemClick, className, ...rest } = props;
	const isClickable = clickable && Boolean(onItemClick);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBlockLayout, {
		ref,
		size: "small",
		cardType: "value-card",
		"data-card-type": "SnippetCard",
		items: items ?? [],
		layout: "grid",
		responsive,
		maxPerRow: 2,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `snippet-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-value-card", !isClickable && "inv-value-card--static", isClickable && "inv-value-card--clickable"),
			role: isClickable ? "button" : void 0,
			tabIndex: isClickable ? 0 : void 0,
			onClick: isClickable ? () => onItemClick?.(item, index) : void 0,
			onKeyDown: isClickable ? cardKeyDownHandler(() => onItemClick?.(item, index)) : void 0,
			children: [item.lhs != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipWrapper, {
				tooltipHeading: item.lhsTooltip?.heading,
				tooltipContent: item.lhsTooltip?.content,
				showOnlyWhenTruncated: true,
				headingSelector: TEXT_BLOCK_HEADING_SELECTOR,
				contentSelector: TEXT_BLOCK_CONTENT_SELECTOR,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-value-card__lhs",
					children: item.lhs
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-value-card__rhs",
				children: item.rhs != null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipWrapper, {
					tooltipHeading: item.rhsTooltip?.heading,
					tooltipContent: item.rhsTooltip?.content,
					showOnlyWhenTruncated: true,
					headingSelector: TEXT_BLOCK_HEADING_SELECTOR,
					contentSelector: TEXT_BLOCK_CONTENT_SELECTOR,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-value-card__rhs-content",
						children: item.rhs
					})
				}) : isClickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-value-card__chevron",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 14 })
				})
			})]
		}),
		...rest
	});
});
SnippetCardBlock.displayName = "SnippetCardBlock";
//#endregion
//#region src/components/Sources/SourcesItem.tsx
const ListedSourceItem = (0, react.memo)((props) => {
	const { title, sourceName, onClick, faviconUrl, url, sourceId } = props;
	const handleClick = () => {
		openSourceInNewTab(url);
		onClick?.();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-listed-source-item", { "inv-listed-source-item--has-url": url && url.trim() !== "" }),
		onClick: handleClick,
		role: "button",
		tabIndex: 0,
		"data-source-id": sourceId,
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleClick();
			}
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-listed-source-item__header",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-listed-source-item__logo",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SourceFaviconImage, {
					url: faviconUrl,
					alt: sourceName,
					width: 20,
					height: 20
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-listed-source-item__source-name",
				children: sourceName
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-listed-source-item__title",
			children: title
		})]
	});
});
ListedSourceItem.displayName = "ListedSourceItem";
//#endregion
//#region src/components/Sources/ListedSources.tsx
const ListedSources = (0, react.memo)((props) => {
	const sources = props.sources ?? [];
	const ref = (0, react.useRef)(null);
	const [scroll, setScroll] = (0, react.useState)({
		left: false,
		right: false
	});
	const handleScrollLeftEnabled = (0, react.useCallback)((enabled) => {
		setScroll((prev) => ({
			...prev,
			left: enabled
		}));
	}, []);
	const handleScrollRightEnabled = (0, react.useCallback)((enabled) => {
		setScroll((prev) => ({
			...prev,
			right: enabled
		}));
	}, []);
	if (!sources.length) return null;
	const hasOverflow = scroll.left || scroll.right;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-listed-sources",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-listed-sources-header",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-listed-sources-header__title",
				children: "Sources"
			}), hasOverflow && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-listed-sources-header__buttons",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					variant: "secondary",
					size: "small",
					onClick: () => ref.current?.scroll("left"),
					disabled: !scroll.left,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					variant: "secondary",
					size: "small",
					onClick: () => ref.current?.scroll("right"),
					disabled: !scroll.right,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {})
				})]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Carousel, {
			variant: "sunk",
			ref,
			showButtons: false,
			onScrollLeftEnabled: handleScrollLeftEnabled,
			onScrollRightEnabled: handleScrollRightEnabled,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselContent, { children: sources.map((item, index) => {
				const { key: _key, ...rest } = item;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselItem, {
					className: (0, clsx.default)("inv-listed-sources-item-container", { "inv-listed-sources-item-container--has-url": item.url }),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListedSourceItem, {
						...rest,
						sourceId: index
					})
				}, item.url ?? index);
			}) })
		})]
	});
});
ListedSources.displayName = "ListedSources";
//#endregion
//#region src/components/Sources/Sources.tsx
/**
* Renders the sources strip for the enclosing `CardSourceProvider`.
* Returns null when there are no sources.
*/
const Sources = (0, react.memo)(() => {
	const sources = useCardSourceContext();
	if (!sources.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListedSources, { sources });
});
Sources.displayName = "Sources";
//#endregion
//#region src/components/Steps/Steps.tsx
const StepNumberContext = (0, react.createContext)(0);
const Steps = ({ children }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: `inv-steps-container`,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-steps",
			children: react.default.Children.map(children, (child, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StepNumberContext.Provider, {
				value: index + 1,
				children: child
			}))
		})
	});
};
const StepsItem = ({ title, details, number }) => {
	const stepNumber = (0, react.useContext)(StepNumberContext);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-step-item",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-step-connector",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-step-number",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "inv-step-number-inner",
					children: Number.isInteger(number) ? number : stepNumber
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-connector-line" })]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-step-content",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-step-title",
				children: title
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-step-details",
				children: details
			})]
		})]
	});
};
//#endregion
//#region src/components/SwitchGroup/SwitchGroup.tsx
const variants$1 = {
	clear: "inv-switch-group-clear",
	card: "inv-switch-group-card",
	sunk: "inv-switch-group-sunk"
};
const SwitchGroup = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, variant = "clear" } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-switch-group", variants$1[variant], className),
		style,
		children
	});
});
SwitchGroup.displayName = "SwitchGroup";
//#endregion
//#region src/components/SwitchItem/SwitchItem.tsx
const SwitchItem = (0, react.forwardRef)((props, ref) => {
	const { label, description, onChange, className, disabled, required, ...rest } = props;
	const id = (0, react.useId)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-switch-item-container",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_switch.Root, {
			ref,
			onCheckedChange: onChange,
			id,
			className: (0, clsx.default)("inv-switch-item-root", className),
			disabled,
			required,
			...rest,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_switch.Thumb, { className: "inv-switch-item-thumb" })
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-switch-item-content",
			children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "inv-switch-item-label",
				children: label
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: "inv-switch-item-description",
				children: description
			})]
		})]
	});
});
SwitchItem.displayName = "SwitchItem";
//#endregion
//#region src/components/Tabs/Tabs.tsx
const tabsVariants = { clear: "inv-tabs-clear" };
const Tabs = (0, react.forwardRef)(({ className, style, variant = "clear", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.Root, {
	ref,
	className: (0, clsx.default)("inv-tabs", tabsVariants[variant], className),
	style,
	...props
}));
Tabs.displayName = "Tabs";
const tabsListVariants = {
	title: "inv-tabs-list--title",
	iconTitle: "inv-tabs-list--icon-title",
	iconTitleSubtext: "inv-tabs-list--icon-title-subtext",
	imageTitle: "inv-tabs-list--image-title",
	imageTitleSubtext: "inv-tabs-list--image-title-subtext"
};
const TabsList = (0, react.forwardRef)(({ className, style, variant = "title", ...props }, ref) => {
	const listRef = (0, react.useRef)(null);
	const indicatorRef = (0, react.useRef)(null);
	const [showLeftButton, setShowLeftButton] = (0, react.useState)(false);
	const [showRightButton, setShowRightButton] = (0, react.useState)(false);
	const updateIndicator = (0, react.useCallback)((animated) => {
		const list = listRef.current;
		const indicator = indicatorRef.current;
		if (!list || !indicator) return;
		const activeTab = list.querySelector("[role=\"tab\"][data-state=\"active\"]");
		if (!activeTab) return;
		const left = activeTab.offsetLeft - list.scrollLeft;
		const width = activeTab.offsetWidth;
		indicator.style.transition = animated ? "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
		indicator.style.width = `${width}px`;
		indicator.style.transform = `translateX(${left}px)`;
		indicator.style.opacity = "1";
	}, []);
	(0, react.useEffect)(() => {
		const checkScroll = () => {
			if (listRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
				setShowLeftButton(scrollLeft > 0);
				setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
			}
		};
		const handleScroll = () => {
			checkScroll();
			updateIndicator(false);
		};
		checkScroll();
		updateIndicator(false);
		const currentRef = listRef.current;
		if (currentRef) {
			currentRef.addEventListener("scroll", handleScroll);
			const resizeObserver = new ResizeObserver(() => {
				checkScroll();
				updateIndicator(false);
			});
			resizeObserver.observe(currentRef);
			return () => {
				currentRef.removeEventListener("scroll", handleScroll);
				resizeObserver.disconnect();
			};
		}
		return () => {};
	}, [updateIndicator]);
	(0, react.useEffect)(() => {
		const list = listRef.current;
		if (!list) return;
		const observer = new MutationObserver(() => updateIndicator(true));
		observer.observe(list, {
			attributes: true,
			subtree: true,
			attributeFilter: ["data-state"]
		});
		return () => observer.disconnect();
	}, [updateIndicator]);
	(0, react.useEffect)(() => {
		const list = listRef.current;
		if (!list) return;
		const handleClick = (e) => {
			const trigger = e.target.closest("[role=\"tab\"]");
			if (!trigger) return;
			const listWidth = list.clientWidth;
			const triggerLeft = trigger.offsetLeft;
			const triggerWidth = trigger.offsetWidth;
			const scrollTo = triggerLeft - listWidth / 2 + triggerWidth / 2;
			list.scrollTo({
				left: scrollTo,
				behavior: "smooth"
			});
		};
		list.addEventListener("click", handleClick);
		return () => list.removeEventListener("click", handleClick);
	}, []);
	const scrollLeft = () => {
		if (listRef.current) listRef.current.scrollBy({
			left: -120,
			behavior: "smooth"
		});
	};
	const scrollRight = () => {
		if (listRef.current) listRef.current.scrollBy({
			left: 120,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-tabs-list-container",
		children: [
			showLeftButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tabs-scroll-button-container-left",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					className: "inv-tabs-scroll-button inv-tabs-scroll-left",
					onClick: scrollLeft,
					"aria-label": "Scroll tabs left",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {}),
					variant: "secondary",
					size: "small"
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.List, {
				ref: (node) => {
					if (typeof ref === "function") ref(node);
					else if (ref) ref.current = node;
					listRef.current = node;
				},
				className: (0, clsx.default)("inv-tabs-list", tabsListVariants[variant], className),
				style,
				...props
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tabs-indicator",
				ref: indicatorRef
			}),
			showRightButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tabs-scroll-button-container-right",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					className: "inv-tabs-scroll-button inv-tabs-scroll-right",
					onClick: scrollRight,
					"aria-label": "Scroll tabs right",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {}),
					variant: "secondary",
					size: "small"
				})
			})
		]
	});
});
TabsList.displayName = "TabsList";
const TabsTrigger = (0, react.forwardRef)(({ className, style, icon, text, subtext, image, value, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_tabs.Trigger, {
	ref,
	className: (0, clsx.default)("inv-tabs-trigger", className),
	style,
	value,
	...props,
	children: [
		image && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-tabs-trigger-image",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				src: image,
				alt: ""
			})
		}),
		icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-tabs-trigger-icon",
			children: icon
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: "inv-tabs-trigger-content",
			children: [text && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-tabs-trigger-text",
				children: text
			}), subtext && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-tabs-trigger-subtext",
				children: subtext
			})]
		})
	]
}));
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = (0, react.forwardRef)(({ className, style, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_tabs.Content, {
	ref,
	className: (0, clsx.default)("inv-tabs-content", className),
	style,
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-tabs-content-inner",
		children
	})
}));
TabsContent.displayName = "TabsContent";
//#endregion
//#region src/components/TagBlock/TagBlock.tsx
const TagBlock = (0, react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-tag-block", props.className),
		style: props.styles,
		children: props.children
	});
});
TagBlock.displayName = "TagBlock";
//#endregion
//#region src/components/TextArea/TextArea.tsx
const TextArea = (0, react.forwardRef)((props, ref) => {
	const { className, rows = 3, hasError, ...rest } = props;
	const ctx = useFormControlContext();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
		ref,
		className: (0, clsx.default)("inv-textarea", className, { "inv-textarea-error": hasError ?? ctx?.hasError ?? false }),
		...rest,
		rows
	});
});
TextArea.displayName = "TextArea";
//#endregion
//#region src/components/TextCallout/TextCallout.tsx
const variantMap$1 = {
	neutral: "inv-text-callout-neutral",
	info: "inv-text-callout-info",
	warning: "inv-text-callout-warning",
	success: "inv-text-callout-success",
	danger: "inv-text-callout-danger"
};
const TextCallout = react.default.forwardRef((props, ref) => {
	const { className, variant = "neutral", title, description, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-text-callout", variantMap$1[variant], className),
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-text-callout-content",
			children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-text-callout-content-title",
				children: title
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-text-callout-content-description",
				children: description
			})]
		})
	});
});
//#endregion
//#region src/components/TextContent/TextContent.tsx
const variants = {
	clear: "text-content-clear",
	card: "text-content-card",
	sunk: "text-content-sunk"
};
const TextContent = (props) => {
	const { children, variant = "sunk", className, style } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("text-content", variants[variant], className),
		style,
		children
	});
};
//#endregion
//#region src/components/TextContentWrapper/TextContentWrapper.tsx
/**
* Full-featured markdown block for chat responses: GFM, math (KaTeX),
* line breaks, and inline `[n]` citations resolved against the enclosing
* `CardSourceProvider`.
*/
const TextContentWrapper = (0, react.memo)((props) => {
	const { mode } = useTheme();
	const [rehypeKatex, setRehypeKatex] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
		let cancelled = false;
		import("rehype-katex").then((m) => {
			if (!cancelled) setRehypeKatex(() => m.default);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-text-content", props.className),
		children: [props.header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineHeader, {
			heading: props.header.heading,
			description: props.header.description
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, {
			textMarkdown: props.textMarkdown,
			variant: props.variant,
			options: {
				remarkPlugins: [
					[remark_gfm.default, { singleTilde: false }],
					[remark_math.default, { singleDollarTextMath: false }],
					[remark_breaks.default, { breaks: true }],
					remarkCitations
				],
				rehypePlugins: rehypeKatex ? [rehypeKatex] : [],
				components: { span: TextContentCitation }
			},
			className: (0, clsx.default)("inv-text-content-markdown", { "inv-text-content-markdown-dark-mode": mode === "dark" })
		})]
	});
});
TextContentWrapper.displayName = "TextContentWrapper";
//#endregion
//#region src/components/ToolResult/ToolResult.tsx
const ToolResult = ({ message, toolName, className }) => {
	const [isExpanded, setIsExpanded] = (0, react.useState)(false);
	const hasError = !!message.error;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-tool-result", className, { "inv-tool-result--error": hasError }),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-tool-result__header",
			onClick: () => setIsExpanded(!isExpanded),
			type: "button",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-tool-result__header-left",
				children: [hasError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, {
					size: 14,
					className: "inv-tool-result__icon--error"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.CheckCircle2, {
					size: 14,
					className: "inv-tool-result__icon--success"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-tool-result__label",
					children: toolName ? `${toolName} result` : "Tool result"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: (0, clsx.default)("inv-tool-result__chevron", { "inv-tool-result__chevron--expanded": isExpanded })
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-tool-result__content",
			children: [hasError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tool-result__error",
				children: message.error
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: "inv-tool-result__output",
				children: message.content
			})]
		})]
	});
};
//#endregion
//#region src/components/VisualCardBlock/VisualCardBlock.tsx
/** A photo-first card: background image with gradient, a tag on top and a body panel at the bottom. */
const VisualCard = (0, react.forwardRef)((props, ref) => {
	const { item, clickable = false, onClick, className } = props;
	const { tag, body, bgImageSrc, bgImageAlt } = item;
	const backgroundImage = toCssUrl(bgImageSrc);
	const cardImageStyle = backgroundImage ? { "--inv-visual-card-image": backgroundImage } : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-visual-first-card", clickable ? "inv-visual-first-card--clickable" : "inv-visual-first-card--static", className),
		style: cardImageStyle,
		"aria-label": cardImageStyle ? bgImageAlt : void 0,
		role: clickable ? "button" : void 0,
		tabIndex: clickable ? 0 : void 0,
		onClick: clickable ? onClick : void 0,
		onKeyDown: clickable && onClick ? cardKeyDownHandler(onClick) : void 0,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-visual-first-card__top",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-visual-first-card__tag",
				children: tag ?? null
			}), clickable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-visual-first-card__action",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
			})]
		}), body ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-visual-first-card__bottom",
			children: body
		}) : null]
	});
});
VisualCard.displayName = "VisualCard";
/** A three-per-row grid or carousel of VisualCards. */
const VisualCardBlock = (0, react.forwardRef)((props, ref) => {
	const { items, layout, responsive, gap, clickable = false, onItemClick, className } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBlockLayout, {
		ref,
		size: "medium",
		cardType: "visual-first-card",
		"data-card-type": "VisualCard",
		items,
		layout,
		responsive,
		maxPerRow: 3,
		gap,
		className,
		itemKey: (item, index) => item.id ?? `visual-card-${index}`,
		renderItem: (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(VisualCard, {
			item,
			clickable,
			onClick: () => onItemClick?.(index)
		})
	});
});
VisualCardBlock.displayName = "VisualCardBlock";
//#endregion
//#region src/genui-lib/Text/schema.ts
const TextSchema = zod_v4.z.object({
	variant: zod_v4.z.enum(["text", "number"]).default("text"),
	value: zod_v4.z.string(),
	subtext: zod_v4.z.string().optional(),
	subtextVariant: zod_v4.z.enum([
		"text",
		"number",
		"metric"
	]).default("text"),
	size: zod_v4.z.enum([
		"xs",
		"sm",
		"md",
		"lg"
	]).default("sm")
});
//#endregion
//#region src/genui-lib/Text/index.tsx
function getMetricSubtextTone(subtextVariant, subtext) {
	if (subtextVariant !== "metric" || !subtext) return void 0;
	if (subtext.startsWith("+")) return "positive";
	if (subtext.startsWith("-")) return "negative";
}
function TextRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBlockView, {
		variant: props.subtext ? "text-subtext" : "text",
		primary: props.value,
		secondary: props.subtext,
		type: props.variant,
		size: props.size,
		align: "left",
		secondaryTone: getMetricSubtextTone(props.subtextVariant, props.subtext)
	});
}
const Text = (0, _invdev_react_lang.defineComponent)({
	name: "Text",
	props: TextSchema,
	description: "Plain text line with optional subtext. variant 'number' uses tabular number styling; subtextVariant 'metric' colors a leading +/- subtext green/red.",
	component: TextRenderer
});
//#endregion
//#region src/genui-lib/BoldText/schema.ts
const BoldTextSchema = zod_v4.z.object({
	variant: zod_v4.z.enum(["text", "number"]).default("text"),
	value: zod_v4.z.string(),
	subtext: zod_v4.z.string().optional(),
	subtextVariant: zod_v4.z.enum([
		"text",
		"number",
		"metric"
	]).default("text"),
	size: zod_v4.z.enum([
		"xs",
		"sm",
		"md",
		"lg"
	]).default("sm")
});
//#endregion
//#region src/genui-lib/BoldText/index.tsx
function BoldTextRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBlockView, {
		variant: props.subtext ? "highlight-text-number-subtext" : props.variant === "number" ? "highlight-number" : "highlight-text",
		primary: props.value,
		secondary: props.subtext,
		type: props.variant,
		size: props.size,
		align: "left",
		secondaryTone: getMetricSubtextTone(props.subtextVariant, props.subtext)
	});
}
const BoldText = (0, _invdev_react_lang.defineComponent)({
	name: "BoldText",
	props: BoldTextSchema,
	description: "Emphasized (bold) text line with optional subtext. variant 'number' uses tabular number styling; subtextVariant 'metric' colors a leading +/- subtext green/red.",
	component: BoldTextRenderer
});
//#endregion
//#region src/genui-lib/helpers.ts
function hasAllProps(obj, ...keys) {
	return keys.every((k) => obj[k] != null);
}
function asArray(v) {
	if (Array.isArray(v)) return v;
	if (v == null) return [];
	return [v];
}
function asElementNodes(v) {
	return asArray(v).filter((x) => typeof x === "object" && x !== null && x["type"] === "element");
}
function buildChartData(labels, series) {
	const lbls = asArray(labels);
	const rows = asArray(series);
	if (rows.length > 0 && Array.isArray(rows[0])) {
		const seriesNames = lbls.slice(1);
		return rows.map((row) => {
			const cells = row;
			const point = { category: String(cells[0] ?? "") };
			seriesNames.forEach((name, si) => {
				const val = cells[si + 1];
				point[name] = typeof val === "number" ? val : Number(val) || 0;
			});
			return point;
		});
	}
	const seriesNodes = asElementNodes(series);
	return lbls.map((label, i) => {
		const point = { category: label };
		seriesNodes.forEach((s) => {
			const cat = s.props["category"];
			const vals = s.props["values"];
			if (typeof cat === "string" && Array.isArray(vals) && i < vals.length) point[cat] = vals[i];
		});
		return point;
	});
}
function buildSliceData(slices) {
	return asElementNodes(slices).map((s) => ({
		category: s.props["category"],
		value: s.props["value"]
	}));
}
//#endregion
//#region src/genui-lib/EntityList/schema.ts
const EntityListRowSchema = zod_v4.z.object({
	left: zod_v4.z.string(),
	right: zod_v4.z.string(),
	rightVariant: zod_v4.z.enum(["text", "number"]).default("text")
});
const EntityListSchema = zod_v4.z.object({
	rows: zod_v4.z.array(EntityListRowSchema).default([]),
	size: zod_v4.z.enum(["small", "default"]).default("default"),
	header: EntityListRowSchema.optional(),
	footer: EntityListRowSchema.optional()
}).refine(({ size, header, footer }) => size === "default" || !header && !footer, {
	message: "EntityList size=\"small\" does not support header or footer.",
	path: ["size"]
});
//#endregion
//#region src/genui-lib/EntityList/index.tsx
function EntityListRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityList, {
		rows: asArray(props.rows),
		size: props.size,
		header: props.header,
		footer: props.footer
	});
}
const EntityList$1 = (0, _invdev_react_lang.defineComponent)({
	name: "EntityList",
	props: EntityListSchema,
	description: "Two-column key/value rows (left label, right value). size 'default' supports optional header and footer rows; rightVariant 'number' uses tabular numbers.",
	component: EntityListRenderer
});
//#endregion
//#region src/genui-lib/Action/schema.ts
/**
* Shared action prop schema.
*
* Tagged as `ActionExpression` so the local react-lang prompt renders the v0.5
* `Action([@steps...])` expression syntax. The JSON schema (used by `inv
* generate` and cloud/muse prompt rendering) carries the legacy object
* contract, which react-lang also accepts at runtime (legacy action path).
*/
const actionPropSchema = zod_v4.z.union([
	zod_v4.z.object({
		type: zod_v4.z.literal("open_url"),
		url: zod_v4.z.string()
	}),
	zod_v4.z.object({
		type: zod_v4.z.literal("continue_conversation"),
		context: zod_v4.z.string().optional()
	}),
	zod_v4.z.object({
		type: zod_v4.z.string(),
		params: zod_v4.z.record(zod_v4.z.string(), zod_v4.z.any()).optional()
	})
]);
(0, _invdev_react_lang.tagSchemaId)(actionPropSchema, "ActionExpression");
//#endregion
//#region src/genui-lib/Icon/index.tsx
function IconRenderer({ props }) {
	if (!props.name) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
		name: props.name,
		category: props.category
	});
}
const Icon = (0, _invdev_react_lang.defineComponent)({
	name: "Icon",
	props: iconPropsSchema,
	description: "A lucide icon by kebab-case name (e.g. 'circle-check'). Optional category picks a topical fallback when the name doesn't resolve.",
	component: IconRenderer
});
//#endregion
//#region src/genui-lib/IconButton/schema.ts
const IconButtonSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	icon: Icon.ref,
	action: actionPropSchema.optional(),
	variant: zod_v4.z.enum([
		"primary",
		"secondary",
		"tertiary"
	]).optional(),
	size: zod_v4.z.enum([
		"extra-small",
		"small",
		"medium",
		"large"
	]).optional(),
	shape: zod_v4.z.enum(["square", "circle"]).optional()
});
//#endregion
//#region src/genui-lib/IconButton/index.tsx
function IconButtonRenderer({ props }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
			name: props.icon.props.name,
			category: props.icon.props.category
		}),
		variant: props.variant ?? "secondary",
		size: props.size ?? "medium",
		shape: props.shape ?? "square",
		disabled: isStreaming,
		"aria-label": props.name,
		onClick: () => triggerAction(props.name, formName, props.action)
	});
}
const IconButton$1 = (0, _invdev_react_lang.defineComponent)({
	name: "IconButton",
	props: IconButtonSchema,
	description: "Icon-only button. name is the accessible label and the action label; icon is an Icon; action fires on click.",
	component: IconButtonRenderer
});
//#endregion
//#region src/genui-lib/IconText/schema.ts
const IconTextSchema = zod_v4.z.object({
	icon: Icon.ref,
	iconVariant: zod_v4.z.enum([
		"neutral",
		"info",
		"success",
		"warning",
		"danger",
		"inverted",
		"filled",
		"soft"
	]).default("neutral"),
	iconSize: zod_v4.z.enum([
		"xs",
		"s",
		"m",
		"l",
		"xl",
		"sm",
		"md",
		"lg"
	]).default("m"),
	title: zod_v4.z.string(),
	subtitle: zod_v4.z.string().optional(),
	bold: zod_v4.z.boolean().default(false),
	layout: zod_v4.z.enum(["horizontal", "vertical"]).default("horizontal")
});
//#endregion
//#region src/genui-lib/IconText/index.tsx
function IconTextRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconText, {
		icon: props.icon.props,
		iconVariant: props.iconVariant,
		title: props.title,
		subtitle: props.subtitle,
		bold: props.bold,
		layout: props.layout
	});
}
const IconText$1 = (0, _invdev_react_lang.defineComponent)({
	name: "IconText",
	props: IconTextSchema,
	description: "An icon badge with a title and optional subtitle, laid out horizontally or vertically. iconVariant sets the badge color.",
	component: IconTextRenderer
});
//#endregion
//#region src/genui-lib/ImageText/schema.ts
const ImageTextSchema = zod_v4.z.object({
	src: zod_v4.z.string(),
	alt: zod_v4.z.string().optional(),
	title: zod_v4.z.string(),
	subtitle: zod_v4.z.string().optional(),
	bold: zod_v4.z.boolean().default(false),
	layout: zod_v4.z.enum(["horizontal", "vertical"]).default("horizontal"),
	imageSize: zod_v4.z.number().optional()
});
//#endregion
//#region src/genui-lib/ImageText/index.tsx
function ImageTextRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageText, {
		src: props.src,
		alt: props.alt,
		title: props.title,
		subtitle: props.subtitle,
		bold: props.bold,
		layout: props.layout,
		imageSize: props.imageSize
	});
}
const ImageText$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ImageText",
	props: ImageTextSchema,
	description: "A small square image (thumbnail/avatar) with a title and optional subtitle. src must be a real image URL.",
	component: ImageTextRenderer
});
//#endregion
//#region src/genui-lib/ImageTextLarge/schema.ts
const ImageTextLargeSchema = zod_v4.z.object({
	src: zod_v4.z.string(),
	alt: zod_v4.z.string().optional(),
	title: zod_v4.z.string(),
	subtitle: zod_v4.z.string().optional(),
	bold: zod_v4.z.boolean().default(false)
});
//#endregion
//#region src/genui-lib/ImageTextLarge/index.tsx
function ImageTextLargeRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageTextLarge, {
		src: props.src,
		alt: props.alt,
		title: props.title,
		subtitle: props.subtitle
	});
}
const ImageTextLarge$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ImageTextLarge",
	props: ImageTextLargeSchema,
	description: "A full-width banner image above a bold title and optional subtitle. src must be a real image URL.",
	component: ImageTextLargeRenderer
});
//#endregion
//#region src/genui-lib/InlineHeader/schema.ts
const InlineHeaderSchema = zod_v4.z.object({
	heading: zod_v4.z.string(),
	description: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/InlineHeader/index.tsx
function InlineHeaderRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InlineHeader, {
		heading: props.heading,
		description: props.description
	});
}
const InlineHeader$1 = (0, _invdev_react_lang.defineComponent)({
	name: "InlineHeader",
	props: InlineHeaderSchema,
	description: "Compact section heading with an optional one-line description, for use inside cards.",
	component: InlineHeaderRenderer
});
//#endregion
//#region src/genui-lib/ListItem/index.tsx
const ListItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ListItem",
	props: zod_v4.z.object({
		title: zod_v4.z.string(),
		subtitle: zod_v4.z.string().optional(),
		image: zod_v4.z.object({
			src: zod_v4.z.string(),
			alt: zod_v4.z.string()
		}).optional(),
		actionLabel: zod_v4.z.string().optional(),
		action: actionPropSchema.optional()
	}),
	description: "Item in a ListBlock — displays a title with an optional subtitle and image. When action is provided, the item becomes clickable.",
	component: () => null
});
//#endregion
//#region src/genui-lib/ListBlock/index.tsx
const ListBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ListBlock",
	props: zod_v4.z.object({
		items: zod_v4.z.array(ListItem$1.ref),
		variant: zod_v4.z.enum(["number", "image"]).optional(),
		size: zod_v4.z.enum(["default", "small"]).optional()
	}),
	description: "A list of items with number or image indicators. Each item can optionally have an action. size small renders a compact list.",
	component: ({ props }) => {
		const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
		const items = props.items ?? [];
		const variant = props.variant ?? "number";
		const size = props.size ?? "default";
		const listHasSubtitle = items.some((item) => !!item?.props?.subtitle);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListBlock, {
			variant,
			size,
			children: items.map((item, index) => {
				const title = String(item?.props?.title ?? "");
				const subtitle = item?.props?.subtitle ? String(item.props.subtitle) : void 0;
				const image = item?.props?.image;
				const actionLabel = item?.props?.actionLabel ? String(item.props.actionLabel) : void 0;
				const action = item?.props?.action;
				const hasAction = !!action;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListItem, {
					title,
					subtitle,
					listHasSubtitle,
					image: variant === "image" ? image : void 0,
					actionLabel: hasAction ? actionLabel : void 0,
					actionIcon: hasAction ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 }) : void 0,
					onClick: hasAction ? () => triggerAction(title, void 0, action) : void 0
				}, index);
			})
		});
	}
});
//#endregion
//#region src/genui-lib/MetricIndicator/schema.ts
const MetricIndicatorTrendSchema = zod_v4.z.object({
	direction: zod_v4.z.enum(["up", "down"]),
	value: zod_v4.z.number()
});
const MetricIndicatorWithStrikethroughSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	subtext: zod_v4.z.string().optional(),
	previousValue: zod_v4.z.string().optional(),
	trend: MetricIndicatorTrendSchema.optional()
});
const MetricIndicatorInlineSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	subtext: zod_v4.z.string().optional(),
	trend: MetricIndicatorTrendSchema.optional()
});
//#endregion
//#region src/genui-lib/MetricIndicator/index.tsx
function MetricIndicatorWithStrikethroughRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorWithStrikethrough, {
		value: props.value,
		subtext: props.subtext,
		previousValue: props.previousValue,
		trend: props.trend
	});
}
function MetricIndicatorInlineRenderer({ props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MetricIndicatorInline, {
		value: props.value,
		subtext: props.subtext,
		trend: props.trend
	});
}
const MetricIndicatorWithStrikethrough$1 = (0, _invdev_react_lang.defineComponent)({
	name: "MetricIndicatorWithStrikethrough",
	props: MetricIndicatorWithStrikethroughSchema,
	description: "Headline metric value with an optional struck-through previousValue, a +/- percentage trend, and subtext below.",
	component: MetricIndicatorWithStrikethroughRenderer
});
const MetricIndicatorInline$1 = (0, _invdev_react_lang.defineComponent)({
	name: "MetricIndicatorInline",
	props: MetricIndicatorInlineSchema,
	description: "Headline metric value with an optional +/- percentage trend and subtext, all on one line.",
	component: MetricIndicatorInlineRenderer
});
//#endregion
//#region src/genui-lib/EditableTable/schema.ts
const EditableTableSchema = zod_v4.z.object({
	/** Unique name of the table; used as the form field name for the edited data */
	name: zod_v4.z.string().default(""),
	/** Column definitions; `options` is only used by `select` columns */
	columns: zod_v4.z.array(zod_v4.z.object({
		type: zod_v4.z.enum([
			"text",
			"number",
			"date-single",
			"select",
			"url"
		]),
		key: zod_v4.z.string().default("default"),
		header: zod_v4.z.string().default(""),
		width: zod_v4.z.number().optional(),
		options: zod_v4.z.array(zod_v4.z.object({
			value: zod_v4.z.string(),
			label: zod_v4.z.string()
		})).optional()
	})).default([]),
	/** Rows; `values` are ordered positionally to match `columns` */
	data: zod_v4.z.array(zod_v4.z.object({
		id: zod_v4.z.string(),
		values: zod_v4.z.array(zod_v4.z.union([zod_v4.z.string(), zod_v4.z.number()]))
	})).default([])
});
//#endregion
//#region src/genui-lib/EditableTable/index.tsx
function EditableTableRenderer({ props }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const setFieldValue = (0, _invdev_react_lang.useSetFieldValue)();
	const getFieldValue = (0, _invdev_react_lang.useGetFieldValue)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const tableName = props.name;
	const columns = props.columns;
	const initialData = props.data;
	const columnKeys = (0, react.useMemo)(() => columns.map((c) => c.key), [columns]);
	const toRows = (0, react.useCallback)((data) => data.map((row) => {
		return {
			...columnKeys.reduce((acc, key, index) => {
				acc[key] = row.values[index];
				return acc;
			}, {}),
			id: row.id
		};
	}), [columnKeys]);
	const fromRows = (0, react.useCallback)((rows) => rows.map((row) => ({
		id: row.id,
		values: columnKeys.map((key) => row[key])
	})), [columnKeys]);
	const existingValue = getFieldValue(tableName, tableName);
	const baselineDataMapRef = (0, react.useRef)(void 0);
	const [tableData, setTableData] = (0, react.useState)(() => toRows(existingValue || initialData));
	const [changedCellCount, setChangedCellCount] = (0, react.useState)(0);
	(0, react.useEffect)(() => {
		setTableData(toRows(existingValue || initialData));
	}, [
		existingValue,
		initialData,
		toRows
	]);
	(0, react.useEffect)(() => {
		if (!isStreaming && baselineDataMapRef.current === void 0) baselineDataMapRef.current = new Map(toRows(existingValue || initialData).map((row) => [row.id, row]));
	}, [
		isStreaming,
		existingValue,
		initialData,
		toRows
	]);
	const calculateChangedCellCount = (0, react.useCallback)((changedData, baseline) => {
		if (!baseline) {
			setChangedCellCount(0);
			return;
		}
		let count = 0;
		const changedMap = new Map(changedData.map(({ id, ...values }) => [id, values]));
		baseline.forEach((baseValues, id) => {
			const changedValues = changedMap.get(id);
			if (!changedValues) return;
			for (const key of columnKeys) if (changedValues[key] !== baseValues[key]) count++;
		});
		setChangedCellCount(count);
	}, [columnKeys]);
	const handleDataChange = (0, react.useCallback)((changedData) => {
		calculateChangedCellCount(changedData, baselineDataMapRef.current);
		setTableData(changedData);
	}, [calculateChangedCellCount]);
	const handleReset = (0, react.useCallback)(() => {
		setChangedCellCount(0);
		if (baselineDataMapRef.current) setTableData(Array.from(baselineDataMapRef.current.values()));
	}, []);
	const handleSubmit = (0, react.useCallback)(() => {
		setFieldValue(tableName, "EditableTable", tableName, fromRows(tableData));
		triggerAction("Save Changes", tableName);
		setChangedCellCount(0);
		baselineDataMapRef.current = new Map(tableData.map((row) => [row.id, row]));
	}, [
		tableName,
		tableData,
		fromRows,
		setFieldValue,
		triggerAction
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(EditableTable, {
		data: tableData,
		columns,
		onDataChange: handleDataChange
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EditableTableChangesBar, {
		changedCellCount,
		onReset: handleReset,
		onSave: handleSubmit
	})] });
}
const EditableTable$1 = (0, _invdev_react_lang.defineComponent)({
	name: "EditableTable",
	props: EditableTableSchema,
	description: "Spreadsheet-like table whose cells the user can edit inline (text, number, url, date, select columns); edits are saved back as a form field",
	component: EditableTableRenderer
});
//#endregion
//#region src/genui-lib/formDefaultValueUtils.ts
function useHydrateDefaultFieldValue({ formName, componentType, name, existingValue, defaultValue }) {
	useHydrateDefaultFieldValues({
		formName,
		fields: react$1.default.useMemo(() => [{
			componentType,
			name,
			existingValue,
			defaultValue
		}], [
			componentType,
			name,
			existingValue,
			defaultValue
		])
	});
}
function useHydrateDefaultFieldValues({ formName, fields }) {
	const setFieldValue = (0, _invdev_react_lang.useSetFieldValue)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	react$1.default.useEffect(() => {
		if (isStreaming) return;
		fields.forEach(({ componentType, name, existingValue, defaultValue }) => {
			if (existingValue === void 0 && defaultValue !== void 0) setFieldValue(formName, componentType, name, defaultValue, false);
		});
	}, [
		fields,
		formName,
		isStreaming,
		setFieldValue
	]);
}
//#endregion
//#region src/genui-lib/selectionFieldUtils.ts
const onlyStrings = (values) => values.filter((value) => typeof value === "string");
/** Resolves the stored form value (falling back to defaultValue) into a list of selected values. */
function normalizeSelection(type, storedValue, defaultValue) {
	if (type === "single") {
		if (typeof storedValue === "string") return storedValue ? [storedValue] : [];
		if (Array.isArray(storedValue) && typeof storedValue[0] === "string") return storedValue[0] ? [storedValue[0]] : [];
		if (typeof defaultValue === "string") return defaultValue ? [defaultValue] : [];
		if (Array.isArray(defaultValue) && typeof defaultValue[0] === "string") return defaultValue[0] ? [defaultValue[0]] : [];
		return [];
	}
	if (Array.isArray(storedValue)) return onlyStrings(storedValue);
	if (typeof storedValue === "string") return storedValue ? [storedValue] : [];
	if (Array.isArray(defaultValue)) return onlyStrings(defaultValue);
	if (typeof defaultValue === "string") return defaultValue ? [defaultValue] : [];
	return [];
}
/** Shape of defaultValue as it should be written into form state (string for single, string[] for multiple). */
function getStoredDefaultValue(type, defaultValue) {
	if (type === "single") {
		if (typeof defaultValue === "string") return defaultValue || void 0;
		if (Array.isArray(defaultValue) && typeof defaultValue[0] === "string") return defaultValue[0] || void 0;
		return;
	}
	if (Array.isArray(defaultValue)) return onlyStrings(defaultValue);
	if (typeof defaultValue === "string") return defaultValue ? [defaultValue] : [];
}
/** Toggles `itemValue` in `selection` according to the selection type. */
function toggleSelection(type, selection, itemValue) {
	if (type === "single") return selection[0] === itemValue ? [] : [itemValue];
	return selection.includes(itemValue) ? selection.filter((value) => value !== itemValue) : [...selection, itemValue];
}
//#endregion
//#region src/genui-lib/rules.ts
/**
* Structured validation rules for form field components.
* Example: { required: true, email: true, minLength: 5, max: 100 }
* Available keys: required, email, url, numeric, min (number), max (number), minLength (number), maxLength (number), pattern (regex string)
*/
const rulesSchema = zod_v4.z.object({
	required: zod_v4.z.boolean().optional(),
	email: zod_v4.z.boolean().optional(),
	url: zod_v4.z.boolean().optional(),
	numeric: zod_v4.z.boolean().optional(),
	min: zod_v4.z.number().optional(),
	max: zod_v4.z.number().optional(),
	minLength: zod_v4.z.number().optional(),
	maxLength: zod_v4.z.number().optional(),
	pattern: zod_v4.z.string().optional()
}).optional();
//#endregion
//#region src/genui-lib/Chips/schema.ts
const ChipItemSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	label: zod_v4.z.string(),
	icon: zod_v4.z.optional(Icon.ref),
	disabled: zod_v4.z.boolean().optional()
});
const ChipItem = (0, _invdev_react_lang.defineComponent)({
	name: "ChipItem",
	props: ChipItemSchema,
	description: "A single selectable chip inside a Chips group, with a value, label and optional icon.",
	component: () => null
});
const ChipsSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	type: zod_v4.z.enum(["single", "multiple"]).default("multiple"),
	items: zod_v4.z.array(ChipItem.ref).default([]),
	rules: rulesSchema,
	defaultValue: zod_v4.z.union([zod_v4.z.string(), zod_v4.z.array(zod_v4.z.string())]).optional()
});
//#endregion
//#region src/genui-lib/Chips/index.tsx
function ChipsRenderer({ props, renderNode }) {
	const formName = (0, _invdev_react_lang.useFormName)();
	const getFieldValue = (0, _invdev_react_lang.useGetFieldValue)();
	const setFieldValue = (0, _invdev_react_lang.useSetFieldValue)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const formValidation = (0, _invdev_react_lang.useFormValidation)();
	const fieldName = props.name;
	const type = props.type ?? "multiple";
	const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
	const hasRules = rules.length > 0;
	const items = (props.items ?? []).filter((item) => item.props.value);
	const existingValue = getFieldValue(formName, fieldName);
	const selection = normalizeSelection(type, existingValue, props.defaultValue);
	const storedDefaultValue = react.default.useMemo(() => getStoredDefaultValue(type, props.defaultValue), [type, props.defaultValue]);
	useHydrateDefaultFieldValue({
		formName,
		componentType: "Chips",
		name: fieldName,
		existingValue,
		defaultValue: storedDefaultValue
	});
	react.default.useEffect(() => {
		if (!isStreaming && hasRules && formValidation) {
			formValidation.registerField(fieldName, rules, () => {
				const value = getFieldValue(formName, fieldName) ?? storedDefaultValue;
				if (type === "single") return typeof value === "string" && value ? value : void 0;
				return Array.isArray(value) && value.length > 0 ? value : void 0;
			});
			return () => formValidation.unregisterField(fieldName);
		}
	}, [
		fieldName,
		formName,
		formValidation,
		getFieldValue,
		hasRules,
		isStreaming,
		rules,
		storedDefaultValue,
		type
	]);
	const handleToggle = (itemValue) => {
		if (isStreaming) return;
		const nextSelection = toggleSelection(type, selection, itemValue);
		const storedValue = type === "single" ? nextSelection[0] ?? void 0 : nextSelection;
		const validationValue = type === "single" ? nextSelection[0] ?? void 0 : nextSelection.length > 0 ? nextSelection : void 0;
		setFieldValue(formName, "Chips", fieldName, storedValue, true);
		if (hasRules) formValidation?.validateField(fieldName, validationValue, rules);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Chips, {
		type,
		selected: selection,
		disabled: isStreaming,
		onToggle: handleToggle,
		items: items.map((item) => ({
			value: item.props.value,
			label: item.props.label,
			icon: item.props.icon ? renderNode(item.props.icon) : void 0,
			disabled: item.props.disabled
		}))
	});
}
const Chips$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Chips",
	props: ChipsSchema,
	description: "A form field of compact selectable chips for choosing one or many short options; the selection is stored under `name`.",
	component: ChipsRenderer
});
//#endregion
//#region src/genui-lib/Image/schema.ts
const ImageSchema = zod_v4.z.object({
	alt: zod_v4.z.string(),
	src: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/Image/index.tsx
const Image$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Image",
	props: ImageSchema,
	description: "Image with alt text and optional URL",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Image, {
		src: props.src || "",
		alt: props.alt
	})
});
//#endregion
//#region src/genui-lib/OptionCards/schema.ts
const OptionCardSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	title: zod_v4.z.string(),
	subtitle: zod_v4.z.string().optional(),
	topContent: zod_v4.z.union([Icon.ref, Image$1.ref]).optional(),
	disabled: zod_v4.z.boolean().optional()
});
const OptionCard = (0, _invdev_react_lang.defineComponent)({
	name: "OptionCard",
	props: OptionCardSchema,
	description: "A single selectable card inside an OptionCards group, with a value, title, optional subtitle and an optional Icon or Image on top.",
	component: () => null
});
const OptionCardsSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	type: zod_v4.z.enum(["single", "multiple"]).default("single"),
	items: zod_v4.z.array(OptionCard.ref).default([]),
	rules: rulesSchema,
	defaultValue: zod_v4.z.union([zod_v4.z.string(), zod_v4.z.array(zod_v4.z.string())]).optional()
});
//#endregion
//#region src/genui-lib/OptionCards/index.tsx
function isImageTopContent(topContent) {
	const candidate = topContent;
	return typeof candidate === "object" && candidate !== null && candidate.type === "element" && typeof candidate.props?.src === "string";
}
function OptionCardsRenderer({ props, renderNode }) {
	const formName = (0, _invdev_react_lang.useFormName)();
	const getFieldValue = (0, _invdev_react_lang.useGetFieldValue)();
	const setFieldValue = (0, _invdev_react_lang.useSetFieldValue)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const formValidation = (0, _invdev_react_lang.useFormValidation)();
	const fieldName = props.name;
	const type = props.type ?? "single";
	const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
	const hasRules = rules.length > 0;
	const items = (props.items ?? []).filter((item) => item.props.value);
	const existingValue = getFieldValue(formName, fieldName);
	const selection = normalizeSelection(type, existingValue, props.defaultValue);
	const storedDefaultValue = react.default.useMemo(() => getStoredDefaultValue(type, props.defaultValue), [type, props.defaultValue]);
	useHydrateDefaultFieldValue({
		formName,
		componentType: "OptionCards",
		name: fieldName,
		existingValue,
		defaultValue: storedDefaultValue
	});
	react.default.useEffect(() => {
		if (!isStreaming && hasRules && formValidation) {
			formValidation.registerField(fieldName, rules, () => {
				const value = getFieldValue(formName, fieldName) ?? storedDefaultValue;
				if (type === "single") return typeof value === "string" && value ? value : void 0;
				return Array.isArray(value) && value.length > 0 ? value : void 0;
			});
			return () => formValidation.unregisterField(fieldName);
		}
	}, [
		fieldName,
		formName,
		formValidation,
		getFieldValue,
		hasRules,
		isStreaming,
		rules,
		storedDefaultValue,
		type
	]);
	const handleToggle = (itemValue) => {
		if (isStreaming) return;
		const nextSelection = toggleSelection(type, selection, itemValue);
		const storedValue = type === "single" ? nextSelection[0] ?? void 0 : nextSelection;
		const validationValue = type === "single" ? nextSelection[0] ?? void 0 : nextSelection.length > 0 ? nextSelection : void 0;
		setFieldValue(formName, "OptionCards", fieldName, storedValue, true);
		if (hasRules) formValidation?.validateField(fieldName, validationValue, rules);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OptionCards, {
		type,
		selected: selection,
		disabled: isStreaming,
		onToggle: handleToggle,
		items: items.map((item) => {
			const topContent = item.props.topContent;
			return {
				value: item.props.value,
				title: item.props.title,
				subtitle: item.props.subtitle,
				topContent: topContent != null ? renderNode(topContent) : void 0,
				topContentVariant: isImageTopContent(topContent) ? "image" : "icon",
				disabled: item.props.disabled
			};
		})
	});
}
const OptionCards$1 = (0, _invdev_react_lang.defineComponent)({
	name: "OptionCards",
	props: OptionCardsSchema,
	description: "A form field of selectable cards (title, optional subtitle, optional icon or image) laid out in a responsive grid for choosing one or many options; the selection is stored under `name`.",
	component: OptionCardsRenderer
});
//#endregion
//#region src/genui-lib/Button/schema.ts
const ButtonSchema = zod_v4.z.object({
	label: zod_v4.z.string(),
	action: actionPropSchema.optional(),
	variant: zod_v4.z.enum([
		"primary",
		"secondary",
		"tertiary"
	]).optional(),
	type: zod_v4.z.enum(["normal", "destructive"]).optional(),
	size: zod_v4.z.enum([
		"extra-small",
		"small",
		"medium",
		"large"
	]).optional()
});
//#endregion
//#region src/genui-lib/Button/index.tsx
const variantMap = {
	primary: "primary",
	secondary: "secondary",
	ghost: "tertiary",
	tertiary: "tertiary"
};
const Button$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Button",
	props: ButtonSchema,
	description: "Clickable button",
	component: ({ props }) => {
		const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
		const formName = (0, _invdev_react_lang.useFormName)();
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const label = props.label;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
			variant: variantMap[props.variant] || "primary",
			size: props.size || "medium",
			buttonType: props.type,
			disabled: isStreaming,
			onClick: () => {
				const action = props.action;
				const variant = props.variant || "primary";
				if (formValidation && variant === "primary") {
					if (action?.steps) {
						if (action.steps.some((s) => s.type === _invdev_react_lang.ACTION_STEPS.ToAssistant || s.type === _invdev_react_lang.ACTION_STEPS.Run && s.refType === "mutation") && !formValidation.validateForm()) return;
					} else if (!formValidation.validateForm()) return;
				}
				triggerAction(label, formName, action);
			},
			children: label
		});
	}
});
//#endregion
//#region src/genui-lib/cardActionUtils.ts
/** Serialize item context for the ToAssistant `context` string (the only ActionPlan channel the executor forwards). */
function formatItemContext(context) {
	return `Selected item: ${JSON.stringify(context)}`;
}
function isActionPlan(action) {
	return typeof action === "object" && action !== null && Array.isArray(action.steps);
}
function dropUndefined(context) {
	return Object.fromEntries(Object.entries(context).filter(([, value]) => value !== void 0));
}
/**
* Merge per-item click context (itemIndex, itemId, itemTitle, ...) into a card
* block's `action` prop. Item context wins on
* key clash.
*
* - Legacy `{ type?, params? }` (and the bare `{ url }` / `{ context }` shapes):
*   returns `{ type, params }` with url/context/params and item context merged.
* - `ActionPlan` (`{ steps }`): returns a copy whose ToAssistant steps get the
*   item context appended to their `context` string (react-lang forwards only
*   `step.context` to the host for that step type); other steps untouched.
* - `undefined`: returns a ContinueConversation action carrying the item context.
*/
function withItemContext(action, itemContext) {
	const context = dropUndefined(itemContext);
	if (action === void 0 || action === null) return {
		type: _invdev_react_lang.BuiltinActionType.ContinueConversation,
		params: context
	};
	if (isActionPlan(action)) {
		if (Object.keys(context).length === 0) return action;
		const suffix = formatItemContext(context);
		return {
			...action,
			steps: action.steps.map((step) => {
				if (step.type !== _invdev_react_lang.ACTION_STEPS.ToAssistant) return step;
				return {
					...step,
					context: step.context ? `${step.context}\n${suffix}` : suffix
				};
			})
		};
	}
	const legacy = action;
	return {
		type: legacy.type ?? _invdev_react_lang.BuiltinActionType.ContinueConversation,
		params: {
			...legacy.params ?? {},
			...legacy.url !== void 0 ? { url: legacy.url } : {},
			...legacy.context ? { context: legacy.context } : {},
			...context
		}
	};
}
//#endregion
//#region src/genui-lib/Charts/Point.ts
const PointSchema = zod_v4.z.object({
	x: zod_v4.z.number(),
	y: zod_v4.z.number(),
	z: zod_v4.z.number().optional()
});
const Point = (0, _invdev_react_lang.defineComponent)({
	name: "Point",
	props: PointSchema,
	description: "Data point with numeric coordinates",
	component: () => null
});
//#endregion
//#region src/genui-lib/Charts/ScatterSeries.ts
const ScatterSeriesSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	points: zod_v4.z.array(PointSchema)
});
const ScatterSeries = (0, _invdev_react_lang.defineComponent)({
	name: "ScatterSeries",
	props: ScatterSeriesSchema,
	description: "Named dataset",
	component: () => null
});
//#endregion
//#region src/genui-lib/Charts/Series.ts
const SeriesSchema = zod_v4.z.object({
	category: zod_v4.z.string(),
	values: zod_v4.z.array(zod_v4.z.number())
});
const Series = (0, _invdev_react_lang.defineComponent)({
	name: "Series",
	props: SeriesSchema,
	description: "One data series",
	component: () => null
});
//#endregion
//#region src/genui-lib/Charts/Slice.ts
const SliceSchema = zod_v4.z.object({
	category: zod_v4.z.string(),
	value: zod_v4.z.number()
});
const Slice = (0, _invdev_react_lang.defineComponent)({
	name: "Slice",
	props: SliceSchema,
	description: "One slice with label and numeric value",
	component: () => null
});
//#endregion
//#region src/genui-lib/Charts/HorizontalBarChart.ts
const HorizontalBarChartSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	series: zod_v4.z.array(SeriesSchema),
	variant: zod_v4.z.enum(["grouped", "stacked"]).optional(),
	xLabel: zod_v4.z.string().optional(),
	yLabel: zod_v4.z.string().optional()
});
const HorizontalBarChart$1 = (0, _invdev_react_lang.defineComponent)({
	name: "HorizontalBarChart",
	props: HorizontalBarChartSchema,
	description: "Horizontal bars; prefer when category labels are long or for ranked lists",
	component: ({ props }) => {
		if (!hasAllProps(props, "labels", "series")) return null;
		const data = buildChartData(props.labels, props.series);
		if (!data.length) return null;
		return react$1.default.createElement(HorizontalBarChart, {
			data,
			categoryKey: "category",
			variant: props.variant,
			xAxisLabel: props.xLabel,
			yAxisLabel: props.yLabel,
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/Charts/RadarChart.ts
const RadarChartSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	series: zod_v4.z.array(SeriesSchema)
});
const RadarChart$1 = (0, _invdev_react_lang.defineComponent)({
	name: "RadarChart",
	props: RadarChartSchema,
	description: "Spider/web chart; use for comparing multiple variables across one or more entities",
	component: ({ props }) => {
		if (!hasAllProps(props, "labels", "series")) return null;
		const data = buildChartData(props.labels, props.series);
		if (!data.length) return null;
		return react$1.default.createElement(RadarChart, {
			data,
			categoryKey: "category",
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/Charts/PieChart.ts
const PieChartSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	values: zod_v4.z.array(zod_v4.z.number()),
	variant: zod_v4.z.enum(["pie", "donut"]).optional(),
	appearance: zod_v4.z.enum(["circular", "semiCircular"]).optional()
});
const PieChart$1 = (0, _invdev_react_lang.defineComponent)({
	name: "PieChart",
	props: PieChartSchema,
	description: "Circular slices; use plucked arrays: PieChart(data.categories, data.values)",
	component: ({ props }) => {
		const isQueryLoading = (0, _invdev_react_lang.useIsQueryLoading)();
		const labels = asArray(props.labels);
		const values = asArray(props.values);
		const variant = props.variant ?? "pie";
		const appearance = props.appearance ?? "circular";
		if (labels.length > 0 && values.length > 0) {
			const data = labels.map((cat, i) => ({
				category: cat,
				value: typeof values[i] === "number" ? values[i] : 0
			}));
			return react$1.default.createElement(PieChart, {
				data,
				categoryKey: "category",
				dataKey: "value",
				variant,
				appearance,
				isAnimationActive: false
			});
		}
		const sliceData = buildSliceData(props.labels);
		if (sliceData.length) return react$1.default.createElement(PieChart, {
			data: sliceData,
			categoryKey: "category",
			dataKey: "value",
			variant,
			appearance,
			isAnimationActive: false
		});
		if (isQueryLoading) return react$1.default.createElement(PieChartSkeleton, {
			variant,
			appearance
		});
		return null;
	}
});
//#endregion
//#region src/genui-lib/Charts/RadialChart.ts
const RadialChartSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	values: zod_v4.z.array(zod_v4.z.number())
});
const RadialChart$1 = (0, _invdev_react_lang.defineComponent)({
	name: "RadialChart",
	props: RadialChartSchema,
	description: "Radial bars; use plucked arrays: RadialChart(data.categories, data.values)",
	component: ({ props }) => {
		const labels = asArray(props.labels);
		const values = asArray(props.values);
		if (labels.length > 0 && values.length > 0) {
			const data = labels.map((cat, i) => ({
				category: cat,
				value: typeof values[i] === "number" ? values[i] : 0
			}));
			if (!data.length) return null;
			return react$1.default.createElement(RadialChart, {
				data,
				categoryKey: "category",
				dataKey: "value",
				isAnimationActive: false
			});
		}
		const sliceData = buildSliceData(props.labels);
		if (sliceData.length) return react$1.default.createElement(RadialChart, {
			data: sliceData,
			categoryKey: "category",
			dataKey: "value",
			isAnimationActive: false
		});
		return null;
	}
});
//#endregion
//#region src/genui-lib/Charts/SingleStackedBarChart.ts
const SingleStackedBarChartSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	values: zod_v4.z.array(zod_v4.z.number())
});
const SingleStackedBarChart = (0, _invdev_react_lang.defineComponent)({
	name: "SingleStackedBarChart",
	props: SingleStackedBarChartSchema,
	description: "Single horizontal stacked bar; use plucked arrays: SingleStackedBarChart(data.categories, data.values)",
	component: ({ props }) => {
		const labels = asArray(props.labels);
		const values = asArray(props.values);
		if (labels.length > 0 && values.length > 0) {
			const data = labels.map((cat, i) => ({
				category: cat,
				value: typeof values[i] === "number" ? values[i] : 0
			}));
			if (!data.length) return null;
			return react$1.default.createElement(SingleStackedBar, {
				data,
				categoryKey: "category",
				dataKey: "value"
			});
		}
		const sliceData = buildSliceData(props.labels);
		if (sliceData.length) return react$1.default.createElement(SingleStackedBar, {
			data: sliceData,
			categoryKey: "category",
			dataKey: "value"
		});
		return null;
	}
});
//#endregion
//#region src/genui-lib/Charts/ScatterChart.ts
const ScatterChartSchema = zod_v4.z.object({
	datasets: zod_v4.z.array(ScatterSeriesSchema),
	xLabel: zod_v4.z.string().optional(),
	yLabel: zod_v4.z.string().optional()
});
const unwrap = (node) => node?.type === "element" ? node.props : node;
const ScatterChart$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ScatterChart",
	props: ScatterChartSchema,
	description: "X/Y scatter plot; use for correlations, distributions, and clustering",
	component: ({ props }) => {
		if (!hasAllProps(props, "datasets")) return null;
		const data = asArray(props.datasets).map((ds) => {
			const dsProps = unwrap(ds);
			const rawPoints = asArray(dsProps?.points);
			return {
				name: dsProps?.name ?? "",
				data: rawPoints.map((pt) => {
					const ptProps = unwrap(pt);
					return {
						x: Number(ptProps?.x),
						y: Number(ptProps?.y),
						...ptProps?.z != null ? { z: Number(ptProps.z) } : {}
					};
				})
			};
		});
		if (!data.length) return null;
		return react$1.default.createElement(ScatterChart, {
			data,
			xAxisDataKey: "x",
			yAxisDataKey: "y",
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/Charts/AreaChartCondensed.ts
const AreaChartCondensedSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	series: zod_v4.z.array(SeriesSchema),
	variant: zod_v4.z.enum([
		"linear",
		"natural",
		"step"
	]).optional(),
	xLabel: zod_v4.z.string().optional(),
	yLabel: zod_v4.z.string().optional(),
	height: zod_v4.z.number().optional()
});
const AreaChartCondensed$1 = (0, _invdev_react_lang.defineComponent)({
	name: "AreaChart",
	props: AreaChartCondensedSchema,
	description: "Filled area under lines; use for cumulative totals or volume trends over time",
	component: ({ props }) => {
		if (!hasAllProps(props, "labels", "series")) return null;
		const data = buildChartData(props.labels, props.series);
		if (!data.length) return null;
		return react$1.default.createElement(AreaChartCondensed, {
			data,
			categoryKey: "category",
			variant: props.variant,
			xAxisLabel: props.xLabel,
			yAxisLabel: props.yLabel,
			height: props.height,
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/Charts/BarChartCondensed.ts
const BarChartCondensedSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	series: zod_v4.z.array(SeriesSchema),
	variant: zod_v4.z.enum(["grouped", "stacked"]).optional(),
	xLabel: zod_v4.z.string().optional(),
	yLabel: zod_v4.z.string().optional(),
	height: zod_v4.z.number().optional()
});
const BarChartCondensed$1 = (0, _invdev_react_lang.defineComponent)({
	name: "BarChart",
	props: BarChartCondensedSchema,
	description: "Vertical bars; use for comparing values across categories with one or more series",
	component: ({ props }) => {
		if (!hasAllProps(props, "labels", "series")) return null;
		const data = buildChartData(props.labels, props.series);
		if (!data.length) return null;
		return react$1.default.createElement(BarChartCondensed, {
			data,
			categoryKey: "category",
			variant: props.variant,
			xAxisLabel: props.xLabel,
			yAxisLabel: props.yLabel,
			height: props.height,
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/Charts/LineChartCondensed.ts
const LineChartCondensedSchema = zod_v4.z.object({
	labels: zod_v4.z.array(zod_v4.z.string()),
	series: zod_v4.z.array(SeriesSchema),
	variant: zod_v4.z.enum([
		"linear",
		"natural",
		"step"
	]).optional(),
	xLabel: zod_v4.z.string().optional(),
	yLabel: zod_v4.z.string().optional(),
	height: zod_v4.z.number().optional()
});
const LineChartCondensed$1 = (0, _invdev_react_lang.defineComponent)({
	name: "LineChart",
	props: LineChartCondensedSchema,
	description: "Lines over categories; use for trends and continuous data over time",
	component: ({ props }) => {
		if (!hasAllProps(props, "labels", "series")) return null;
		const data = buildChartData(props.labels, props.series);
		if (!data.length) return null;
		return react$1.default.createElement(LineChartCondensed, {
			data,
			categoryKey: "category",
			variant: props.variant,
			xAxisLabel: props.xLabel,
			yAxisLabel: props.yLabel,
			height: props.height,
			isAnimationActive: false
		});
	}
});
//#endregion
//#region src/genui-lib/TagBlock/schema.ts
const TagBlockSchema = zod_v4.z.object({
	tags: zod_v4.z.array(zod_v4.z.string()),
	size: zod_v4.z.enum([
		"sm",
		"md",
		"lg"
	]).optional()
});
//#endregion
//#region src/genui-lib/TagBlock/index.tsx
const TagBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "TagBlock",
	props: TagBlockSchema,
	description: "tags is an array of strings; optional size sm | md | lg",
	component: ({ props }) => {
		const tags = asArray(props.tags);
		const size = props.size;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TagBlock, { children: tags.map((tag, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
			text: tag,
			size
		}, i)) });
	}
});
//#endregion
//#region src/genui-lib/CompositeCardBlock/schema.ts
const CompositeCardBodyItemSchema = zod_v4.z.union([
	Text.ref,
	BoldText.ref,
	MetricIndicatorInline$1.ref,
	IconText$1.ref,
	Image$1.ref,
	AreaChartCondensed$1.ref,
	BarChartCondensed$1.ref,
	LineChartCondensed$1.ref,
	ListBlock$1.ref,
	TagBlock$1.ref,
	EntityList$1.ref
]);
const CompositeCardFooterSchema = zod_v4.z.object({
	price: zod_v4.z.union([BoldText.ref, MetricIndicatorWithStrikethrough$1.ref]).optional(),
	button: zod_v4.z.optional(Button$1.ref)
});
const CompositeCardItemSchema = zod_v4.z.object({
	id: zod_v4.z.string().optional(),
	header: zod_v4.z.union([
		IconText$1.ref,
		ImageText$1.ref,
		ImageTextLarge$1.ref,
		Text.ref,
		Image$1.ref
	]).optional(),
	body: zod_v4.z.array(CompositeCardBodyItemSchema).default([]),
	footer: CompositeCardFooterSchema.optional()
});
const CompositeCardItem = (0, _invdev_react_lang.defineComponent)({
	name: "CompositeCardItem",
	props: CompositeCardItemSchema,
	description: "A single card inside a CompositeCardBlock: an optional header (icon/image/text), a stack of body elements (text, metrics, charts, lists, tags), and an optional price/button footer.",
	component: () => null
});
const CompositeCardBlockSchema = zod_v4.z.object({
	items: zod_v4.z.array(CompositeCardItem.ref).min(2),
	layout: zod_v4.z.enum(["grid", "carousel"]).default("grid"),
	responsive: zod_v4.z.boolean().default(true),
	action: actionPropSchema.optional(),
	gap: zod_v4.z.union([zod_v4.z.number(), zod_v4.z.string()]).optional()
});
//#endregion
//#region src/genui-lib/CompositeCardBlock/index.tsx
const COMPOSITE_CARD_CHART_HEIGHT = 180;
function isElementOf(node, typeNames) {
	return typeof node === "object" && node !== null && node.type === "element" && typeNames.includes(node.typeName ?? "");
}
function withProps(node, overrides) {
	return {
		...node,
		props: {
			...node.props,
			...overrides
		}
	};
}
/** Composite cards keep text size, metric size and chart height visually consistent. */
function renderCompositeCardNode(node, renderNode, key, location) {
	let value = node;
	if (location === "body" && isElementOf(node, [Text.name, BoldText.name])) value = withProps(node, { size: "xs" });
	else if (isElementOf(node, [
		AreaChartCondensed$1.name,
		BarChartCondensed$1.name,
		LineChartCondensed$1.name
	])) value = withProps(node, { height: COMPOSITE_CARD_CHART_HEIGHT });
	else if (isElementOf(node, [ListBlock$1.name])) value = withProps(node, { size: "small" });
	else if (isElementOf(node, [EntityList$1.name])) value = withProps(node, {
		size: "small",
		header: void 0,
		footer: void 0
	});
	else if (isElementOf(node, [TagBlock$1.name])) value = withProps(node, { size: "sm" });
	else if (isElementOf(node, [Button$1.name])) value = withProps(node, { size: "small" });
	else if (location === "body" && isElementOf(node, [MetricIndicatorInline$1.name, MetricIndicatorWithStrikethrough$1.name])) value = node;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react.Fragment, { children: renderNode(value) }, key);
}
function getCompositeHeaderText(item) {
	const headerProps = item.props.header?.props;
	if (!headerProps) return {};
	const pick = (...keys) => {
		for (const key of keys) {
			const value = headerProps[key];
			if (typeof value === "string") return value;
		}
	};
	return {
		title: pick("title", "value"),
		subtitle: pick("subtitle", "subtext"),
		imageAlt: pick("alt")
	};
}
function CompositeCardBlockRenderer({ props, renderNode }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const items = props.items ?? [];
	const isClickable = Boolean(props.action) && !isStreaming;
	const handleItemClick = (index) => {
		const item = items[index];
		if (!item || !props.action || isStreaming) return;
		const { title, subtitle, imageAlt } = getCompositeHeaderText(item);
		const { id, body, footer } = item.props;
		const bodyItems = Array.isArray(body) ? body : [];
		const priceProps = footer?.price?.props;
		triggerAction(title || imageAlt || id || `Composite card ${index + 1}`, formName, withItemContext(props.action, {
			itemIndex: index,
			itemId: id,
			itemHeaderTitle: title,
			itemHeaderSubtitle: subtitle,
			itemHeaderAlt: imageAlt,
			itemBodyCount: bodyItems.length,
			itemFooterPrice: priceProps && "value" in priceProps ? priceProps["value"] : void 0,
			itemFooterButtonLabel: footer?.button?.props.label
		}));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CompositeCardBlock, {
		layout: props.layout ?? "grid",
		responsive: props.responsive !== false,
		gap: props.gap,
		clickable: isClickable,
		onItemClick: handleItemClick,
		items: items.map((item, index) => {
			const { id, header, body, footer } = item.props;
			const itemKey = id?.trim() ? `composite-card-${id.trim()}-${index}` : `composite-card-${index}`;
			const bodyItems = Array.isArray(body) ? body : [];
			return {
				id,
				header: header ? renderNode(header) : void 0,
				body: bodyItems.map((node, bodyIndex) => renderCompositeCardNode(node, renderNode, `${itemKey}-body-${bodyIndex}`, "body")),
				footer: footer ? {
					price: footer.price ? renderCompositeCardNode(footer.price, renderNode, `${itemKey}-footer-price`, "footer") : void 0,
					button: footer.button ? renderCompositeCardNode(footer.button, renderNode, `${itemKey}-footer-button`, "footer") : void 0
				} : void 0
			};
		})
	});
}
const CompositeCardBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "CompositeCardBlock",
	props: CompositeCardBlockSchema,
	description: "A two-per-row grid or carousel of rich cards, each with an optional header, stacked body content (text, metrics, charts, lists, tags) and a price/button footer; an optional action makes every card clickable.",
	component: CompositeCardBlockRenderer
});
//#endregion
//#region src/genui-lib/cardTagUtils.tsx
/** Renders a `Tag` element ref (as used inside card blocks) at the small size. */
function renderCardTag(tag, key) {
	if (!tag) return null;
	const { text, variant, icon } = tag.props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
		text,
		variant: variant ?? "neutral",
		size: "sm",
		icon: icon?.props?.name ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
			name: icon.props.name,
			category: icon.props.category
		}) : void 0
	}, key);
}
//#endregion
//#region src/genui-lib/Tag/schema.ts
const TagSchema = zod_v4.z.object({
	text: zod_v4.z.string(),
	icon: zod_v4.z.optional(Icon.ref),
	size: zod_v4.z.enum([
		"sm",
		"md",
		"lg"
	]).optional(),
	variant: zod_v4.z.enum([
		"neutral",
		"info",
		"success",
		"warning",
		"danger"
	]).optional()
});
//#endregion
//#region src/genui-lib/Tag/index.tsx
const Tag$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Tag",
	props: TagSchema,
	description: "Styled tag/badge with optional Icon and variant",
	component: ({ props }) => {
		const icon = props["icon"];
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
			text: props.text,
			icon: icon?.props?.name ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWrapper, {
				name: icon.props.name,
				category: icon.props.category
			}) : void 0,
			size: props.size,
			variant: props.variant
		});
	}
});
//#endregion
//#region src/genui-lib/ContextCardBlock/schema.ts
const contextCardBgColorSchema = zod_v4.z.enum(["gray"]);
const ContextCardItemSchema = zod_v4.z.object({
	id: zod_v4.z.string().optional(),
	title: zod_v4.z.union([zod_v4.z.string(), Tag$1.ref]),
	body: zod_v4.z.string().optional(),
	bgColor: contextCardBgColorSchema.optional(),
	bgImageSrc: zod_v4.z.string().optional(),
	bgImageAlt: zod_v4.z.string().optional()
});
const ContextCardItem = (0, _invdev_react_lang.defineComponent)({
	name: "ContextCardItem",
	props: ContextCardItemSchema,
	description: "A single card inside a ContextCardBlock: a title (plain string or Tag), an optional markdown body, and an optional gray tint or background image.",
	component: () => null
});
const ContextCardBlockSchema = zod_v4.z.object({
	items: zod_v4.z.array(ContextCardItem.ref).min(2),
	layout: zod_v4.z.enum(["grid", "carousel"]).default("grid"),
	responsive: zod_v4.z.boolean().default(true),
	action: actionPropSchema.optional(),
	gap: zod_v4.z.union([zod_v4.z.number(), zod_v4.z.string()]).optional()
});
//#endregion
//#region src/genui-lib/ContextCardBlock/index.tsx
function getContextTitleText(item) {
	const { title } = item.props;
	if (!title) return "";
	return typeof title === "string" ? title : title.props?.text ?? "";
}
function ContextCardBlockRenderer({ props }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const items = props.items ?? [];
	const isClickable = Boolean(props.action) && !isStreaming;
	const handleItemClick = (index) => {
		const item = items[index];
		if (!item || !props.action || isStreaming) return;
		const { id, body, bgColor, bgImageSrc, bgImageAlt } = item.props;
		triggerAction(getContextTitleText(item) || id || `Context card ${index + 1}`, formName, withItemContext(props.action, {
			itemIndex: index,
			itemId: id,
			itemTitle: getContextTitleText(item),
			itemBody: body,
			itemBgColor: bgColor,
			itemBgImageSrc: bgImageSrc,
			itemBgImageAlt: bgImageAlt
		}));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextCardBlock, {
		layout: props.layout ?? "grid",
		responsive: props.responsive !== false,
		gap: props.gap,
		clickable: isClickable,
		onItemClick: handleItemClick,
		items: items.map((item, index) => {
			const { id, title, body, bgColor, bgImageSrc, bgImageAlt } = item.props;
			return {
				id,
				title: typeof title === "string" ? title : renderCardTag(title, `context-card-tag-${index}`),
				body,
				bgColor,
				bgImageSrc,
				bgImageAlt
			};
		})
	});
}
const ContextCardBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ContextCardBlock",
	props: ContextCardBlockSchema,
	description: "A grid or carousel of compact tinted context cards (title or tag plus a short bold body); an optional action makes every card clickable.",
	component: ContextCardBlockRenderer
});
//#endregion
//#region src/genui-lib/OverviewCardBlock/schema.ts
const OverviewCardItemSchema = zod_v4.z.object({
	id: zod_v4.z.string().optional(),
	top: zod_v4.z.union([
		IconText$1.ref,
		ImageText$1.ref,
		Text.ref
	]),
	bottom: zod_v4.z.optional(MetricIndicatorInline$1.ref)
});
const OverviewCardItem = (0, _invdev_react_lang.defineComponent)({
	name: "OverviewCardItem",
	props: OverviewCardItemSchema,
	description: "One overview card: a heading slot at the top (IconText, ImageText or Text) and an optional MetricIndicatorInline at the bottom.",
	component: () => null
});
const OverviewCardBlockSchema = zod_v4.z.object({
	items: zod_v4.z.array(OverviewCardItem.ref).min(2),
	layout: zod_v4.z.enum(["grid", "carousel"]).default("grid"),
	responsive: zod_v4.z.boolean().default(true),
	action: actionPropSchema.optional(),
	gap: zod_v4.z.union([zod_v4.z.number(), zod_v4.z.string()]).optional()
});
//#endregion
//#region src/genui-lib/OverviewCardBlock/index.tsx
function getStringProp$1(node, key) {
	const value = (typeof node === "object" && node !== null && "props" in node ? node.props : void 0)?.[key];
	return typeof value === "string" ? value : void 0;
}
function getOverviewTitle(item) {
	return getStringProp$1(item.props.top, "title") ?? getStringProp$1(item.props.top, "value");
}
function OverviewCardBlockRenderer({ props, renderNode }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const items = props.items ?? [];
	const isClickable = Boolean(props.action) && !isStreaming;
	const handleItemClick = (item, index) => {
		if (!props.action || isStreaming) return;
		const { id, top, bottom } = item.props;
		const title = getOverviewTitle(item);
		triggerAction(title ?? id ?? `Overview card ${index + 1}`, formName, withItemContext(props.action, {
			itemIndex: index,
			itemId: id,
			itemTitle: title,
			itemSubtitle: getStringProp$1(top, "subtitle") ?? getStringProp$1(top, "subtext"),
			itemMetricValue: bottom?.props.value
		}));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverviewCardBlock, {
		layout: props.layout ?? "grid",
		responsive: props.responsive !== false,
		gap: props.gap,
		clickable: isClickable,
		onItemClick: isClickable ? (_item, index) => {
			const item = items[index];
			if (item) handleItemClick(item, index);
		} : void 0,
		items: items.map((item) => {
			const { id, top, bottom } = item.props;
			return {
				id,
				top: top ? renderNode(top) : void 0,
				bottom: bottom ? {
					value: bottom.props.value,
					subtext: bottom.props.subtext,
					trend: bottom.props.trend
				} : void 0
			};
		})
	});
}
const OverviewCardBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "OverviewCardBlock",
	props: OverviewCardBlockSchema,
	description: "A grid or horizontal carousel of compact overview cards, each with a heading (icon/image/text) on top and an inline metric below; optionally clickable with a shared action.",
	component: OverviewCardBlockRenderer
});
//#endregion
//#region src/genui-lib/SnippetCardBlock/schema.ts
const SnippetCardItemSchema = zod_v4.z.object({
	id: zod_v4.z.string().optional(),
	lhs: zod_v4.z.union([IconText$1.ref, ImageText$1.ref]),
	rhs: zod_v4.z.union([Text.ref, BoldText.ref]).optional()
});
const SnippetCardItem = (0, _invdev_react_lang.defineComponent)({
	name: "SnippetCardItem",
	props: SnippetCardItemSchema,
	description: "One row-style snippet card: a label on the left (IconText or ImageText) and an optional value on the right (Text or BoldText).",
	component: () => null
});
const SnippetCardBlockSchema = zod_v4.z.object({
	items: zod_v4.z.array(SnippetCardItem.ref).min(2),
	layout: zod_v4.z.enum(["grid"]).default("grid"),
	responsive: zod_v4.z.boolean().default(true),
	action: actionPropSchema.optional(),
	gap: zod_v4.z.union([zod_v4.z.number(), zod_v4.z.string()]).optional()
});
//#endregion
//#region src/genui-lib/SnippetCardBlock/index.tsx
function getStringProp(node, key) {
	const value = (typeof node === "object" && node !== null && "props" in node ? node.props : void 0)?.[key];
	return typeof value === "string" ? value : void 0;
}
function SnippetCardBlockRenderer({ props, renderNode }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const items = props.items ?? [];
	const isClickable = Boolean(props.action) && !isStreaming;
	const handleItemClick = (item, index) => {
		if (!props.action || isStreaming) return;
		const { id, lhs, rhs } = item.props;
		triggerAction(getStringProp(lhs, "title") ?? id ?? `Snippet card ${index + 1}`, formName, withItemContext(props.action, {
			itemIndex: index,
			itemId: id,
			itemTitle: getStringProp(lhs, "title"),
			itemSubtitle: getStringProp(lhs, "subtitle"),
			itemValue: getStringProp(rhs, "value")
		}));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SnippetCardBlock, {
		responsive: props.responsive !== false,
		gap: props.gap,
		clickable: isClickable,
		onItemClick: isClickable ? (_item, index) => {
			const item = items[index];
			if (item) handleItemClick(item, index);
		} : void 0,
		items: items.map((item) => {
			const { id, lhs, rhs } = item.props;
			return {
				id,
				lhs: renderNode(lhs),
				rhs: rhs ? renderNode({
					...rhs,
					props: {
						...rhs.props,
						size: "xs"
					}
				}) : void 0,
				lhsTooltip: {
					heading: getStringProp(lhs, "title"),
					content: getStringProp(lhs, "subtitle")
				},
				rhsTooltip: {
					heading: getStringProp(rhs, "value"),
					content: getStringProp(rhs, "subtext")
				}
			};
		})
	});
}
const SnippetCardBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "SnippetCardBlock",
	props: SnippetCardBlockSchema,
	description: "A responsive grid of compact label/value cards (2 per row) for showing several short facts side by side; optionally clickable with a shared action.",
	component: SnippetCardBlockRenderer
});
//#endregion
//#region src/genui-lib/VisualCardBlock/schema.ts
const VisualCardItemSchema = zod_v4.z.object({
	body: BoldText.ref,
	id: zod_v4.z.string().optional(),
	bgImageSrc: zod_v4.z.string().optional(),
	tag: zod_v4.z.optional(Tag$1.ref),
	bgImageAlt: zod_v4.z.string().optional()
});
const VisualCardItem = (0, _invdev_react_lang.defineComponent)({
	name: "VisualCardItem",
	props: VisualCardItemSchema,
	description: "A single photo-first card inside a VisualCardBlock: a BoldText body panel, an optional Tag, and a background image (bgImageSrc must be a real URL; bgImageAlt is its alt text).",
	component: () => null
});
const VisualCardBlockSchema = zod_v4.z.object({
	items: zod_v4.z.array(VisualCardItem.ref).min(2),
	layout: zod_v4.z.enum(["grid", "carousel"]).default("grid"),
	responsive: zod_v4.z.boolean().default(true),
	action: actionPropSchema.optional(),
	gap: zod_v4.z.union([zod_v4.z.number(), zod_v4.z.string()]).optional()
});
//#endregion
//#region src/genui-lib/VisualCardBlock/index.tsx
function VisualCardBlockRenderer({ props, renderNode }) {
	const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
	const formName = (0, _invdev_react_lang.useFormName)();
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const items = props.items ?? [];
	const isClickable = Boolean(props.action) && !isStreaming;
	const handleItemClick = (index) => {
		const item = items[index];
		if (!item || !props.action || isStreaming) return;
		const { id, body, tag, bgImageSrc, bgImageAlt } = item.props;
		const bodyValue = body?.props?.value;
		const tagText = tag?.props?.text;
		triggerAction(bodyValue || tagText || id || `Visual card ${index + 1}`, formName, withItemContext(props.action, {
			itemIndex: index,
			itemId: id,
			itemTag: tagText,
			itemBody: bodyValue,
			itemBodySubtext: body?.props?.subtext,
			itemBgImageSrc: bgImageSrc,
			itemBgImageAlt: bgImageAlt
		}));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(VisualCardBlock, {
		layout: props.layout ?? "grid",
		responsive: props.responsive !== false,
		gap: props.gap,
		clickable: isClickable,
		onItemClick: handleItemClick,
		items: items.map((item, index) => {
			const { id, body, tag, bgImageSrc, bgImageAlt } = item.props;
			return {
				id,
				tag: renderCardTag(tag, `visual-card-tag-${index}`),
				body: body ? renderNode(body) : null,
				bgImageSrc,
				bgImageAlt
			};
		})
	});
}
const VisualCardBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "VisualCardBlock",
	props: VisualCardBlockSchema,
	description: "A grid or carousel of photo-first cards: a full-bleed background image with a tag on top and a bold text panel at the bottom; an optional action makes every card clickable.",
	component: VisualCardBlockRenderer
});
//#endregion
//#region src/genui-lib/Callout/schema.ts
const CalloutSchema = zod_v4.z.object({
	variant: zod_v4.z.enum([
		"info",
		"warning",
		"error",
		"success",
		"neutral"
	]),
	title: zod_v4.z.string(),
	description: zod_v4.z.string(),
	visible: (0, _invdev_react_lang.reactive)(zod_v4.z.boolean().optional())
});
//#endregion
//#region src/genui-lib/Callout/index.tsx
const Callout$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Callout",
	props: CalloutSchema,
	description: "Callout banner. Optional visible is a reactive $boolean — auto-dismisses after 3s by setting $visible to false.",
	component: ({ props }) => {
		const field = (0, _invdev_react_lang.useStateField)("visible", props.visible);
		const hasVisibleBinding = field.isReactive;
		const isVisible = hasVisibleBinding ? field.value === true || field.value === "true" : true;
		react.default.useEffect(() => {
			if (!hasVisibleBinding || !isVisible) return;
			const timer = setTimeout(() => {
				field.setValue(false);
			}, 3e3);
			return () => clearTimeout(timer);
		}, [
			hasVisibleBinding,
			isVisible,
			field
		]);
		if (!isVisible) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Callout, {
			variant: {
				info: "info",
				warning: "warning",
				success: "success",
				error: "warning",
				neutral: "neutral"
			}[props.variant] || "info",
			title: props.title,
			description: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, { textMarkdown: props.description }),
			duration: hasVisibleBinding ? 3e3 : void 0
		});
	}
});
//#endregion
//#region src/genui-lib/CardHeader/schema.ts
const CardHeaderSchema = zod_v4.z.object({
	title: zod_v4.z.string().optional(),
	subtitle: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/CardHeader/index.tsx
const CardHeader$1 = (0, _invdev_react_lang.defineComponent)({
	name: "CardHeader",
	props: CardHeaderSchema,
	description: "Header with optional title and subtitle",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardHeader, {
		title: props.title,
		subtitle: props.subtitle
	})
});
//#endregion
//#region src/genui-lib/CodeBlock/schema.ts
const CodeBlockSchema = zod_v4.z.object({
	language: zod_v4.z.string(),
	codeString: zod_v4.z.string()
});
//#endregion
//#region src/genui-lib/CodeBlock/index.tsx
const CodeBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "CodeBlock",
	props: CodeBlockSchema,
	description: "Syntax-highlighted code block",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodeBlock, {
		language: props.language,
		codeString: props.codeString
	})
});
//#endregion
//#region src/genui-lib/ImageBlock/schema.ts
const ImageBlockSchema = zod_v4.z.object({
	src: zod_v4.z.string(),
	alt: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/ImageBlock/index.tsx
const ImageBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ImageBlock",
	props: ImageBlockSchema,
	description: "Image block with loading state",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageBlock, {
		src: props.src,
		alt: props.alt
	})
});
//#endregion
//#region src/genui-lib/ImageGallery/schema.ts
const ImageItemSchema = zod_v4.z.object({
	src: zod_v4.z.string(),
	alt: zod_v4.z.string().optional(),
	details: zod_v4.z.string().optional()
});
const ImageGallerySchema = zod_v4.z.object({ images: zod_v4.z.array(ImageItemSchema) });
//#endregion
//#region src/genui-lib/ImageGallery/index.tsx
const ImageGallery$1 = (0, _invdev_react_lang.defineComponent)({
	name: "ImageGallery",
	props: ImageGallerySchema,
	description: "Gallery grid of images with modal preview",
	component: ({ props }) => {
		const images = Array.isArray(props.images) ? props.images : [];
		if (!images.length) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageGallery, { images });
	}
});
//#endregion
//#region src/genui-lib/MarkDownRenderer/schema.ts
const MarkDownRendererSchema = zod_v4.z.object({
	textMarkdown: zod_v4.z.string(),
	variant: zod_v4.z.enum([
		"clear",
		"card",
		"sunk"
	]).optional()
});
//#endregion
//#region src/genui-lib/MarkDownRenderer/index.tsx
const MarkDownRenderer$1 = (0, _invdev_react_lang.defineComponent)({
	name: "MarkDownRenderer",
	props: MarkDownRendererSchema,
	description: "Renders markdown text with optional container variant",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, {
		textMarkdown: props.textMarkdown,
		variant: props.variant
	})
});
//#endregion
//#region src/genui-lib/Separator/schema.ts
const SeparatorSchema = zod_v4.z.object({
	orientation: zod_v4.z.enum(["horizontal", "vertical"]).optional(),
	decorative: zod_v4.z.boolean().optional()
});
//#endregion
//#region src/genui-lib/Separator/index.tsx
const Separator$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Separator",
	props: SeparatorSchema,
	description: "Visual divider between content sections",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Separator, {
		orientation: props.orientation,
		decorative: props.decorative
	})
});
//#endregion
//#region src/genui-lib/TextCallout/schema.ts
const TextCalloutSchema = zod_v4.z.object({
	variant: zod_v4.z.enum([
		"neutral",
		"info",
		"warning",
		"success",
		"danger"
	]).optional(),
	title: zod_v4.z.string().optional(),
	description: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/TextCallout/index.tsx
const TextCallout$1 = (0, _invdev_react_lang.defineComponent)({
	name: "TextCallout",
	props: TextCalloutSchema,
	description: "Text callout with variant, title, and description",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextCallout, {
		variant: props.variant,
		title: props.title,
		description: props.description
	})
});
//#endregion
//#region src/genui-lib/TextContent/schema.ts
const TextContentSchema = zod_v4.z.object({
	text: zod_v4.z.string(),
	size: zod_v4.z.enum([
		"small",
		"default",
		"large",
		"small-heavy",
		"large-heavy"
	]).optional()
});
//#endregion
//#region src/genui-lib/TextContent/index.tsx
const BODY_SIZE_VARS = {
	small: "--inv-text-body-sm",
	default: "--inv-text-body-default",
	large: "--inv-text-body-lg",
	"small-heavy": "--inv-text-body-sm-heavy",
	"large-heavy": "--inv-text-body-lg-heavy"
};
const TextContent$1 = (0, _invdev_react_lang.defineComponent)({
	name: "TextContent",
	props: TextContentSchema,
	description: "Text block. Supports markdown. Optional size: \"small\" | \"default\" | \"large\" | \"small-heavy\" | \"large-heavy\".",
	component: ({ props }) => {
		const size = props.size ?? "default";
		const varName = BODY_SIZE_VARS[size] ?? BODY_SIZE_VARS["default"];
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: size === "default" ? void 0 : {
				"--inv-text-body-default": `var(${varName})`,
				"--inv-text-body-default-letter-spacing": `var(${varName}-letter-spacing)`
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextContentWrapper, { textMarkdown: props.text == null ? "" : String(props.text) })
		});
	}
});
//#endregion
//#region src/genui-lib/Table/schema.ts
const ColSchema = zod_v4.z.object({
	/** Column header label */
	label: zod_v4.z.string(),
	/** Column data — array of values or components (one per row). Use array pluck for text, Each() for styled cells like Tag. */
	data: zod_v4.z.any(),
	/** Optional display type hint */
	type: zod_v4.z.enum([
		"string",
		"number",
		"action"
	]).optional()
});
//#endregion
//#region src/genui-lib/Table/index.tsx
const DEFAULT_PAGE_SIZE = 10;
const Col = (0, _invdev_react_lang.defineComponent)({
	name: "Col",
	props: ColSchema,
	description: "Column definition — holds label + data array",
	component: () => null
});
const Table$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Table",
	props: zod_v4.z.object({ columns: zod_v4.z.array(Col.ref) }),
	description: "Data table — column-oriented. Each Col holds its own data array.",
	component: ({ props, renderNode }) => {
		const isQueryLoading = (0, _invdev_react_lang.useIsQueryLoading)();
		const effectivePageSize = DEFAULT_PAGE_SIZE;
		const [currentPage, setCurrentPage] = react.default.useState(0);
		const columns = props.columns ?? [];
		const colDefs = columns.filter((c) => c != null && c.props).map((c) => ({
			label: c.props?.label ?? "",
			data: asArray(c.props?.data ?? [])
		}));
		const rowCount = colDefs.length > 0 ? Math.max(...colDefs.map((c) => c.data.length), 0) : 0;
		if (isQueryLoading && rowCount === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableSkeleton, {
			rows: 5,
			columns: Math.max(colDefs.length || columns.length, 3)
		});
		if (!colDefs.length) return null;
		const totalPages = Math.ceil(rowCount / effectivePageSize);
		const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
		const startRow = safePage * effectivePageSize;
		const visibleRowCount = Math.min(startRow + effectivePageSize, rowCount) - startRow;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ScrollableTable, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableRow, { children: colDefs.map((c, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableHead, { children: c.label }, i)) }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableBody, { children: Array.from({ length: visibleRowCount }, (_, i) => {
			const ri = startRow + i;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableRow, { children: colDefs.map((col, ci) => {
				const cell = col.data[ri];
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TableCell, { children: typeof cell === "object" && cell !== null ? renderNode(cell) : String(cell ?? "") }, ci);
			}) }, ri);
		}) })] }), totalPages > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				gap: "8px",
				paddingTop: "8px"
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					"aria-label": "Previous page",
					size: "small",
					variant: "secondary",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, { size: 16 }),
					disabled: safePage === 0,
					onClick: () => setCurrentPage((p) => Math.max(0, p - 1))
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					style: {
						fontSize: "13px",
						color: "#6b7280"
					},
					children: [
						safePage + 1,
						" / ",
						totalPages
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
					"aria-label": "Next page",
					size: "small",
					variant: "secondary",
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 }),
					disabled: safePage >= totalPages - 1,
					onClick: () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
				})
			]
		})] });
	}
});
//#endregion
//#region src/genui-lib/Buttons/schema.ts
const ButtonsSchema = zod_v4.z.object({
	buttons: zod_v4.z.array(Button$1.ref),
	direction: zod_v4.z.enum(["row", "column"]).optional()
});
//#endregion
//#region src/genui-lib/Buttons/index.tsx
const directionToVariant = {
	row: "horizontal",
	column: "vertical"
};
const Buttons$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Buttons",
	props: ButtonsSchema,
	description: "Group of Button components. direction: \"row\" (default) | \"column\".",
	component: ({ props, renderNode }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Buttons, {
		variant: directionToVariant[props.direction] ?? "horizontal",
		children: renderNode(props.buttons)
	})
});
//#endregion
//#region src/genui-lib/CheckBoxGroup/schema.ts
const CheckBoxItemSchema = zod_v4.z.object({
	label: zod_v4.z.string(),
	description: zod_v4.z.string(),
	name: zod_v4.z.string(),
	defaultChecked: zod_v4.z.boolean().optional()
});
function createCheckBoxGroupSchema(CheckBoxItem) {
	return zod_v4.z.object({
		name: zod_v4.z.string(),
		items: zod_v4.z.array(CheckBoxItem.ref),
		rules: rulesSchema,
		value: (0, _invdev_react_lang.reactive)(zod_v4.z.record(zod_v4.z.string(), zod_v4.z.boolean()).optional())
	});
}
//#endregion
//#region src/genui-lib/CheckBoxGroup/index.tsx
const CheckBoxItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "CheckBoxItem",
	props: CheckBoxItemSchema,
	description: "",
	component: () => null
});
const CheckBoxGroup$1 = (0, _invdev_react_lang.defineComponent)({
	name: "CheckBoxGroup",
	props: createCheckBoxGroupSchema(CheckBoxItem$1),
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		const items = props.items ?? [];
		const getAggregate = react.default.useCallback(() => {
			const stored = field.value;
			const result = {};
			for (const item of items) result[item.props.name] = stored?.[item.props.name] ?? item.props.defaultChecked ?? false;
			return result;
		}, [field.value, items]);
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		if (!items.length) return null;
		const aggregate = getAggregate();
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CheckBoxGroup, { children: items.map((item, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CheckBoxItem, {
			name: item.props.name,
			label: item.props.label,
			description: item.props.description || "",
			checked: aggregate[item.props.name] ?? item.props.defaultChecked ?? false,
			onChange: (val) => {
				const newAggregate = {
					...getAggregate(),
					[item.props.name]: val
				};
				field.setValue(newAggregate);
				if (hasRules) formValidation?.validateField(field.name, newAggregate, rules);
			},
			disabled: isStreaming
		}, i)) });
	}
});
//#endregion
//#region src/genui-lib/DatePicker/schema.ts
const DatePickerSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	mode: zod_v4.z.enum(["single", "range"]).optional(),
	rules: rulesSchema,
	value: (0, _invdev_react_lang.reactive)(zod_v4.z.unknown().optional())
});
//#endregion
//#region src/genui-lib/DatePicker/index.tsx
const DatePicker$1 = (0, _invdev_react_lang.defineComponent)({
	name: "DatePicker",
	props: DatePickerSchema,
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const mode = props.mode || "single";
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		const handleChange = (val) => {
			field.setValue(val);
			if (hasRules) formValidation?.validateField(field.name, val, rules);
		};
		if (mode === "range") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePicker, {
			mode: "range",
			selectedRangeDates: field.value,
			setSelectedRangeDates: handleChange
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePicker, {
			mode: "single",
			selectedSingleDate: field.value,
			setSelectedSingleDate: handleChange
		});
	}
});
//#endregion
//#region src/genui-lib/Input/schema.ts
const InputSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	placeholder: zod_v4.z.string().optional(),
	type: zod_v4.z.enum([
		"text",
		"email",
		"password",
		"number",
		"url"
	]).optional(),
	rules: rulesSchema,
	value: (0, _invdev_react_lang.reactive)(zod_v4.z.string().optional())
});
//#endregion
//#region src/genui-lib/Input/index.tsx
const Input$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Input",
	props: InputSchema,
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Input, {
			id: field.name,
			name: field.name,
			placeholder: props.placeholder || "",
			type: props.type || "text",
			value: field.value ?? "",
			onFocus: () => formValidation?.clearFieldError(field.name),
			onChange: (e) => {
				const val = e.target.value;
				field.setValue(val);
				if (hasRules) formValidation?.clearFieldError(field.name);
			},
			onBlur: (e) => {
				if (hasRules) formValidation?.validateField(field.name, e.target.value, rules);
			},
			disabled: isStreaming
		});
	}
});
//#endregion
//#region src/genui-lib/RadioGroup/schema.ts
const RadioItemSchema = zod_v4.z.object({
	label: zod_v4.z.string(),
	description: zod_v4.z.string(),
	value: zod_v4.z.string()
});
//#endregion
//#region src/genui-lib/RadioGroup/index.tsx
const RadioItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "RadioItem",
	props: RadioItemSchema,
	description: "",
	component: () => null
});
const RadioGroup$1 = (0, _invdev_react_lang.defineComponent)({
	name: "RadioGroup",
	props: zod_v4.z.object({
		name: zod_v4.z.string(),
		items: zod_v4.z.array(RadioItem$1.ref),
		defaultValue: zod_v4.z.string().optional(),
		rules: rulesSchema,
		value: (0, _invdev_react_lang.reactive)(zod_v4.z.string().optional())
	}),
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		const items = props.items ?? [];
		const value = field.value ?? props.defaultValue;
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		if (!items.length) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RadioGroup, {
			name: field.name,
			value: value ?? "",
			onValueChange: (val) => {
				field.setValue(val);
				if (hasRules) formValidation?.validateField(field.name, val, rules);
			},
			disabled: isStreaming,
			children: items.map((item, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RadioItem, {
				value: item.props.value,
				label: item.props.label,
				description: item.props.description || ""
			}, i))
		});
	}
});
//#endregion
//#region src/genui-lib/Select/schema.ts
const SelectItemSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	label: zod_v4.z.string()
});
function createSelectSchema(SelectItem) {
	return zod_v4.z.object({
		name: zod_v4.z.string(),
		items: zod_v4.z.array(SelectItem.ref),
		placeholder: zod_v4.z.string().optional(),
		rules: rulesSchema,
		value: (0, _invdev_react_lang.reactive)(zod_v4.z.string().optional()),
		size: zod_v4.z.enum([
			"small",
			"medium",
			"large"
		]).optional()
	});
}
//#endregion
//#region src/genui-lib/Select/index.tsx
const SelectItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "SelectItem",
	props: SelectItemSchema,
	description: "Option for Select",
	component: () => null
});
const Select$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Select",
	props: createSelectSchema(SelectItem$1),
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		const items = (props.items ?? []).filter((item) => item?.props?.value);
		const value = field.value ?? "";
		const handleChange = react.default.useCallback((val) => {
			field.setValue(val);
			if (hasRules) formValidation?.validateField(field.name, val, rules);
		}, [
			field,
			formValidation,
			hasRules,
			rules
		]);
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Select, {
			name: field.name,
			value,
			onValueChange: handleChange,
			disabled: isStreaming,
			size: {
				small: "sm",
				medium: "md",
				large: "lg"
			}[props.size] ?? "md",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectValue, { placeholder: props.placeholder || "Select..." }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectContent, { children: items.map((item, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectItem, {
				value: item.props.value,
				children: item.props.label || item.props.value
			}, i)) })]
		});
	}
});
//#endregion
//#region src/genui-lib/Slider/schema.ts
const SliderSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	variant: zod_v4.z.enum(["continuous", "discrete"]),
	min: zod_v4.z.number(),
	max: zod_v4.z.number(),
	step: zod_v4.z.number().optional(),
	defaultValue: zod_v4.z.array(zod_v4.z.number()).optional(),
	label: zod_v4.z.string().optional(),
	rules: rulesSchema,
	value: (0, _invdev_react_lang.reactive)(zod_v4.z.array(zod_v4.z.number()).optional())
});
//#endregion
//#region src/genui-lib/Slider/index.tsx
const Slider$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Slider",
	props: SliderSchema,
	description: "Numeric slider input; supports continuous and discrete (stepped) variants",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		const value = field.value ?? props.defaultValue;
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SliderBlock, {
			label: props.label || field.name,
			name: field.name,
			variant: props.variant || "continuous",
			min: props.min,
			max: props.max,
			step: props.step,
			defaultValue: value != null ? value : void 0,
			onValueCommit: (vals) => {
				field.setValue(vals);
				if (hasRules) formValidation?.validateField(field.name, vals[0], rules);
			},
			disabled: isStreaming,
			isStreaming
		});
	}
});
//#endregion
//#region src/genui-lib/TextArea/schema.ts
const TextAreaSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	placeholder: zod_v4.z.string().optional(),
	rows: zod_v4.z.number().optional(),
	rules: rulesSchema,
	value: (0, _invdev_react_lang.reactive)(zod_v4.z.string().optional())
});
//#endregion
//#region src/genui-lib/TextArea/index.tsx
const TextArea$1 = (0, _invdev_react_lang.defineComponent)({
	name: "TextArea",
	props: TextAreaSchema,
	description: "",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const formValidation = (0, _invdev_react_lang.useFormValidation)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const rules = react.default.useMemo(() => (0, _invdev_react_lang.parseStructuredRules)(props.rules), [props.rules]);
		const hasRules = rules.length > 0;
		react.default.useEffect(() => {
			if (!isStreaming && hasRules && formValidation) {
				formValidation.registerField(field.name, rules, () => field.value);
				return () => formValidation.unregisterField(field.name);
			}
		}, [
			field.name,
			field.value,
			formValidation,
			hasRules,
			isStreaming,
			rules
		]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextArea, {
			name: field.name,
			placeholder: props.placeholder || "",
			rows: props.rows || 3,
			value: field.value ?? "",
			onFocus: () => formValidation?.clearFieldError(field.name),
			onChange: (e) => {
				const val = e.target.value;
				field.setValue(val);
				if (hasRules) formValidation?.clearFieldError(field.name);
			},
			onBlur: (e) => {
				if (hasRules) formValidation?.validateField(field.name, e.target.value, rules);
			},
			disabled: isStreaming
		});
	}
});
//#endregion
//#region src/genui-lib/FormControl/schema.ts
const FormControlSchema = zod_v4.z.object({
	label: zod_v4.z.string(),
	input: zod_v4.z.union([
		Input$1.ref,
		TextArea$1.ref,
		Select$1.ref,
		DatePicker$1.ref,
		Slider$1.ref,
		CheckBoxGroup$1.ref,
		RadioGroup$1.ref,
		Chips$1.ref,
		OptionCards$1.ref
	]),
	hint: zod_v4.z.string().optional()
});
//#endregion
//#region src/genui-lib/FormControl/index.tsx
const FormControlRenderer = ({ props, renderNode }) => {
	const formValidation = (0, _invdev_react_lang.useFormValidation)();
	const inputObj = props.input;
	const rawName = inputObj?.type === "element" ? inputObj.props?.name : void 0;
	const fieldName = typeof rawName === "object" && rawName?.name ? rawName.name : rawName;
	const error = fieldName ? formValidation?.errors[fieldName] : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(FormControl, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Label, {
			className: "text-sm font-medium",
			required: inputObj?.type === "element" && inputObj.props?.rules?.required === true,
			htmlFor: fieldName,
			children: props.label
		}),
		renderNode(props.input),
		error ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Hint, {
			hasError: true,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, { size: 14 }), error]
		}) : props.hint ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Hint, { children: props.hint }) : null
	] });
};
const FormControl$1 = (0, _invdev_react_lang.defineComponent)({
	name: "FormControl",
	props: FormControlSchema,
	description: "Field with label, input component, and optional hint text",
	component: FormControlRenderer
});
//#endregion
//#region src/genui-lib/Form/schema.ts
const FormSchema = zod_v4.z.object({
	name: zod_v4.z.string(),
	buttons: Buttons$1.ref,
	fields: zod_v4.z.array(FormControl$1.ref).default([])
});
//#endregion
//#region src/genui-lib/Form/index.tsx
/** Shared renderer — also used by the chat library's Form variant (wider FormControl). */
const FormRenderer = ({ props, renderNode }) => {
	const formValidation = (0, _invdev_react_lang.useCreateFormValidation)();
	const formName = props.name;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_lang.FormValidationContext.Provider, {
		value: formValidation,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_invdev_react_lang.FormNameContext.Provider, {
			value: formName,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				role: "form",
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "16px"
				},
				children: [renderNode(props.fields), renderNode(props.buttons)]
			})
		})
	});
};
const Form = (0, _invdev_react_lang.defineComponent)({
	name: "Form",
	props: FormSchema,
	description: "Form container with fields and explicit action buttons",
	component: FormRenderer
});
//#endregion
//#region src/genui-lib/Steps/schema.ts
const StepsItemSchema = zod_v4.z.object({
	title: zod_v4.z.string(),
	details: zod_v4.z.string()
});
//#endregion
//#region src/genui-lib/Steps/index.tsx
const StepsItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "StepsItem",
	props: StepsItemSchema,
	description: "title and details text for one step",
	component: () => null
});
const Steps$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Steps",
	props: zod_v4.z.object({ items: zod_v4.z.array(StepsItem$1.ref) }),
	description: "Step-by-step guide",
	component: ({ props, renderNode }) => {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Steps, { children: (props.items ?? []).map((item, i) => {
			const details = item.props.details;
			const detailsContent = typeof details === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkDownRenderer, { textMarkdown: details }) : renderNode(details);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StepsItem, {
				number: i + 1,
				title: item.props.title,
				details: detailsContent
			}, i);
		}) });
	}
});
//#endregion
//#region src/genui-lib/FollowUpItem/index.tsx
const FollowUpItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "FollowUpItem",
	props: zod_v4.z.object({ text: zod_v4.z.string() }),
	description: "Clickable follow-up suggestion — when clicked, sends text as user message",
	component: () => null
});
//#endregion
//#region src/genui-lib/FollowUpBlock/index.tsx
const FollowUpBlock$1 = (0, _invdev_react_lang.defineComponent)({
	name: "FollowUpBlock",
	props: zod_v4.z.object({ items: zod_v4.z.array(FollowUpItem$1.ref) }),
	description: "List of clickable follow-up suggestions placed at the end of a response",
	component: ({ props }) => {
		const triggerAction = (0, _invdev_react_lang.useTriggerAction)();
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowUpBlock, { children: (props.items ?? []).map((item, i) => {
			const text = String(item?.props?.text ?? "");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FollowUpItem, {
				text,
				onClick: () => triggerAction(text)
			}, i);
		}) });
	}
});
//#endregion
//#region src/genui-lib/sectionContentUnion.ts
const SectionContentChildUnion = zod_v4.z.union([
	TextContent$1.ref,
	MarkDownRenderer$1.ref,
	CardHeader$1.ref,
	Callout$1.ref,
	TextCallout$1.ref,
	CodeBlock$1.ref,
	Image$1.ref,
	ImageBlock$1.ref,
	ImageGallery$1.ref,
	Separator$1.ref,
	HorizontalBarChart$1.ref,
	RadarChart$1.ref,
	PieChart$1.ref,
	RadialChart$1.ref,
	SingleStackedBarChart.ref,
	ScatterChart$1.ref,
	AreaChartCondensed$1.ref,
	BarChartCondensed$1.ref,
	LineChartCondensed$1.ref,
	Table$1.ref,
	TagBlock$1.ref,
	Form.ref,
	Buttons$1.ref,
	Steps$1.ref,
	ListBlock$1.ref,
	FollowUpBlock$1.ref
]);
//#endregion
//#region src/genui-lib/SectionItem/index.tsx
const SectionItem = (0, _invdev_react_lang.defineComponent)({
	name: "SectionItem",
	props: zod_v4.z.object({
		value: zod_v4.z.string(),
		trigger: zod_v4.z.string(),
		content: zod_v4.z.array(SectionContentChildUnion)
	}),
	description: "Section with a label and collapsible content — used inside SectionBlock",
	component: () => null
});
//#endregion
//#region src/genui-lib/SectionBlock/index.tsx
/** Shared renderer — also used by the chat library's SectionBlock variant (wider SectionItem). */
const SectionBlockRenderer = ({ props, renderNode }) => {
	const items = props.sections ?? [];
	const isFoldable = props.isFoldable !== false;
	const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
	const firstItemValue = items[0]?.props?.value;
	const [openItems, setOpenItems] = react.default.useState([]);
	const userSelected = react.default.useRef(false);
	const prevLengthRef = react.default.useRef(0);
	const prevIsStreaming = react.default.useRef(isStreaming);
	react.default.useEffect(() => {
		if (items.length === 0) return;
		if (isStreaming && items.length > prevLengthRef.current && !userSelected.current) {
			const lastValue = items[items.length - 1]?.props?.value;
			if (lastValue) setOpenItems((prev) => prev.includes(lastValue) ? prev : [...prev, lastValue]);
		} else setOpenItems((prev) => prev.length === 0 && firstItemValue ? [firstItemValue] : prev);
		prevLengthRef.current = items.length;
	}, [
		items.length,
		isStreaming,
		firstItemValue
	]);
	react.default.useEffect(() => {
		if (prevIsStreaming.current && !isStreaming && !userSelected.current && items.length > 0) setOpenItems(firstItemValue ? [firstItemValue] : []);
		prevIsStreaming.current = isStreaming;
	}, [isStreaming]);
	const handleValueChange = react.default.useCallback((value) => {
		userSelected.current = true;
		setOpenItems(value ?? []);
	}, []);
	if (!isFoldable) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: items.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SectionV2, {
		trigger: String(item?.props?.trigger ?? ""),
		children: renderNode(item?.props?.content)
	}, index)) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FoldableSectionRoot, {
		type: "multiple",
		value: openItems,
		onValueChange: handleValueChange,
		children: items.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(FoldableSectionItem, {
			value: String(item?.props?.value ?? index),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FoldableSectionTrigger, { text: String(item?.props?.trigger ?? "") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FoldableSectionContent, { children: renderNode(item?.props?.content) })]
		}, index))
	});
};
const SectionBlock = (0, _invdev_react_lang.defineComponent)({
	name: "SectionBlock",
	props: zod_v4.z.object({
		sections: zod_v4.z.array(SectionItem.ref),
		isFoldable: zod_v4.z.boolean().optional()
	}),
	description: "Collapsible accordion sections. Auto-opens sections as they stream in. Use SectionItem for each section.",
	component: SectionBlockRenderer
});
//#endregion
//#region src/genui-lib/unions.ts
const ContentChildUnion = zod_v4.z.union([
	TextContent$1.ref,
	MarkDownRenderer$1.ref,
	CardHeader$1.ref,
	Callout$1.ref,
	TextCallout$1.ref,
	CodeBlock$1.ref,
	Image$1.ref,
	ImageBlock$1.ref,
	ImageGallery$1.ref,
	Separator$1.ref,
	HorizontalBarChart$1.ref,
	RadarChart$1.ref,
	PieChart$1.ref,
	RadialChart$1.ref,
	SingleStackedBarChart.ref,
	ScatterChart$1.ref,
	AreaChartCondensed$1.ref,
	BarChartCondensed$1.ref,
	LineChartCondensed$1.ref,
	Table$1.ref,
	TagBlock$1.ref,
	Form.ref,
	Buttons$1.ref,
	IconButton$1.ref,
	Steps$1.ref,
	InlineHeader$1.ref,
	EntityList$1.ref,
	EditableTable$1.ref,
	SnippetCardBlock$1.ref,
	OverviewCardBlock$1.ref,
	ContextCardBlock$1.ref,
	CompositeCardBlock$1.ref,
	VisualCardBlock$1.ref
]);
const ChatContentChildUnion = zod_v4.z.union([
	...ContentChildUnion.options,
	ListBlock$1.ref,
	FollowUpBlock$1.ref,
	SectionBlock.ref
]);
//#endregion
//#region src/genui-lib/Carousel/index.tsx
/** Shared renderer — also used by the chat library's Carousel variant (wider content union). */
const CarouselRenderer = ({ props, renderNode }) => {
	const items = props.children ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Carousel, {
		showButtons: true,
		variant: props.variant,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselContent, { children: items.map((item, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselItem, { children: renderNode(item) }, i)) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselPrevious, { icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CarouselNext, { icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {}) })
		]
	});
};
const Carousel$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Carousel",
	props: zod_v4.z.object({
		children: zod_v4.z.array(zod_v4.z.array(ContentChildUnion)),
		variant: zod_v4.z.enum(["card", "sunk"]).optional()
	}),
	description: "Horizontal scrollable carousel",
	component: CarouselRenderer
});
//#endregion
//#region src/genui-lib/Stack/schema.ts
const FlexPropsSchema = zod_v4.z.object({
	direction: zod_v4.z.enum(["row", "column"]).optional(),
	gap: zod_v4.z.enum([
		"none",
		"xs",
		"s",
		"m",
		"l",
		"xl",
		"2xl"
	]).optional(),
	align: zod_v4.z.enum([
		"start",
		"center",
		"end",
		"stretch",
		"baseline"
	]).optional(),
	justify: zod_v4.z.enum([
		"start",
		"center",
		"end",
		"between",
		"around",
		"evenly"
	]).optional(),
	wrap: zod_v4.z.boolean().optional()
});
const StackSchema = zod_v4.z.object({ children: zod_v4.z.array(zod_v4.z.any()) }).merge(FlexPropsSchema);
//#endregion
//#region src/genui-lib/Stack/index.tsx
const gapMap$1 = {
	none: "0",
	xs: "var(--inv-space-xs)",
	s: "var(--inv-space-s)",
	m: "var(--inv-space-m)",
	l: "var(--inv-space-l)",
	xl: "var(--inv-space-xl)",
	"2xl": "var(--inv-space-2xl)"
};
const alignMap$1 = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline"
};
const justifyMap$1 = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly"
};
const Stack = (0, _invdev_react_lang.defineComponent)({
	name: "Stack",
	props: StackSchema,
	description: "Flex container. direction: \"row\"|\"column\" (default \"column\"). gap: \"none\"|\"xs\"|\"s\"|\"m\"|\"l\"|\"xl\"|\"2xl\" (default \"m\"). align: \"start\"|\"center\"|\"end\"|\"stretch\"|\"baseline\". justify: \"start\"|\"center\"|\"end\"|\"between\"|\"around\"|\"evenly\".",
	component: ({ props, renderNode }) => {
		const justify = props.wrap && props.justify === "between" ? "start" : props.justify;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				flexDirection: props.direction ?? "column",
				gap: gapMap$1[props.gap || "m"] || gapMap$1["m"],
				alignItems: alignMap$1[props.align],
				justifyContent: justifyMap$1[justify],
				flexWrap: props.wrap ? "wrap" : void 0
			},
			children: renderNode(props.children)
		});
	}
});
//#endregion
//#region src/genui-lib/Tabs/schema.ts
const TabItemSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	trigger: zod_v4.z.string(),
	content: zod_v4.z.array(ContentChildUnion)
});
//#endregion
//#region src/genui-lib/Tabs/index.tsx
const TabItem = (0, _invdev_react_lang.defineComponent)({
	name: "TabItem",
	props: TabItemSchema,
	description: "value is unique id, trigger is tab label, content is array of components",
	component: () => null
});
/** Shared renderer — also used by the chat library's Tabs variant (wider content union). */
const TabsRenderer = ({ props, renderNode }) => {
	const items = (props.items ?? []).filter((item) => item?.props?.value != null);
	const [activeTab, setActiveTab] = react.default.useState("");
	const userHasInteracted = react.default.useRef(false);
	const prevContentSizes = react.default.useRef({});
	react.default.useEffect(() => {
		const first = items[0];
		if (items.length && !activeTab && first) setActiveTab(first.props.value);
	}, [items.length, activeTab]);
	react.default.useEffect(() => {
		if (userHasInteracted.current) return;
		let candidate = null;
		const nextSizes = {};
		for (const item of items) {
			const size = JSON.stringify(item.props.content).length;
			const prevSize = prevContentSizes.current[item.props.value] ?? 0;
			nextSizes[item.props.value] = size;
			if (size > prevSize) candidate = item.props.value;
		}
		prevContentSizes.current = nextSizes;
		if (candidate && candidate !== activeTab) setActiveTab(candidate);
	});
	const handleValueChange = (value) => {
		userHasInteracted.current = true;
		setActiveTab(value);
	};
	if (!items.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Tabs, {
		value: activeTab,
		onValueChange: handleValueChange,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabsList, { children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabsTrigger, {
			value: item.props.value,
			text: item.props.trigger
		}, item.props.value)) }), items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabsContent, {
			value: item.props.value,
			children: renderNode(item.props.content)
		}, item.props.value))]
	});
};
const Tabs$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Tabs",
	props: zod_v4.z.object({ items: zod_v4.z.array(TabItem.ref) }),
	description: "Tabbed container",
	component: TabsRenderer
});
//#endregion
//#region src/genui-lib/Card/schema.ts
const CardChildUnion = zod_v4.z.union([
	...ContentChildUnion.options,
	Tabs$1.ref,
	Carousel$1.ref,
	Stack.ref
]);
const CardSchema = zod_v4.z.object({
	children: zod_v4.z.array(CardChildUnion),
	variant: zod_v4.z.enum([
		"card",
		"sunk",
		"clear"
	]).optional()
}).merge(FlexPropsSchema);
//#endregion
//#region src/genui-lib/Card/index.tsx
const gapMap = {
	none: "0",
	xs: "var(--inv-space-xs)",
	s: "var(--inv-space-s)",
	m: "var(--inv-space-m)",
	l: "var(--inv-space-l)",
	xl: "var(--inv-space-xl)",
	"2xl": "var(--inv-space-2xl)"
};
const alignMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline"
};
const justifyMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly"
};
const Card$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Card",
	props: CardSchema,
	description: "Styled container. variant: \"card\" (default, elevated) | \"sunk\" (recessed) | \"clear\" (transparent). Always full width. Accepts all Stack flex params (default: direction \"column\"). Cards flex to share space in row/wrap layouts.",
	component: ({ props, renderNode }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Card, {
		variant: props.variant ?? "card",
		width: "full",
		style: {
			flex: 1,
			minWidth: 0,
			display: "flex",
			flexDirection: props.direction || "column",
			flexWrap: props.wrap ? "wrap" : "nowrap",
			gap: gapMap[props.gap || "m"] || gapMap["m"],
			alignItems: alignMap[props.align || "stretch"] || "stretch",
			justifyContent: justifyMap[props.justify || "start"] || "flex-start"
		},
		children: renderNode(props.children)
	})
});
//#endregion
//#region src/genui-lib/Label/schema.ts
const LabelSchema = zod_v4.z.object({ text: zod_v4.z.string() });
//#endregion
//#region src/genui-lib/Label/index.tsx
const Label$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Label",
	props: LabelSchema,
	description: "Text label",
	component: ({ props }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Label, { children: props.text })
});
//#endregion
//#region src/genui-lib/SwitchGroup/schema.ts
const SwitchItemSchema = zod_v4.z.object({
	label: zod_v4.z.string().optional(),
	description: zod_v4.z.string().optional(),
	name: zod_v4.z.string(),
	defaultChecked: zod_v4.z.boolean().optional()
});
function createSwitchGroupSchema(SwitchItem) {
	return zod_v4.z.object({
		name: zod_v4.z.string(),
		items: zod_v4.z.array(SwitchItem.ref),
		variant: zod_v4.z.enum([
			"clear",
			"card",
			"sunk"
		]).optional(),
		value: (0, _invdev_react_lang.reactive)(zod_v4.z.record(zod_v4.z.string(), zod_v4.z.boolean()).optional())
	});
}
//#endregion
//#region src/genui-lib/SwitchGroup/index.tsx
const SwitchItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "SwitchItem",
	props: SwitchItemSchema,
	description: "Individual switch toggle",
	component: () => null
});
const SwitchGroup$1 = (0, _invdev_react_lang.defineComponent)({
	name: "SwitchGroup",
	props: createSwitchGroupSchema(SwitchItem$1),
	description: "Group of switch toggles",
	component: ({ props }) => {
		const isStreaming = (0, _invdev_react_lang.useIsStreaming)();
		const field = (0, _invdev_react_lang.useStateField)(props.name, props.value);
		const items = props.items ?? [];
		const getAggregate = react.default.useCallback(() => {
			const stored = field.value;
			const result = {};
			for (const item of items) result[item.props.name] = stored?.[item.props.name] ?? item.props.defaultChecked ?? false;
			return result;
		}, [field.value, items]);
		if (!items.length) return null;
		const aggregate = getAggregate();
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwitchGroup, {
			variant: props.variant || "clear",
			children: items.map((item, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwitchItem, {
				name: item.props.name,
				label: item.props.label,
				description: item.props.description || "",
				checked: aggregate[item.props.name] ?? item.props.defaultChecked ?? false,
				onChange: (val) => {
					const newAggregate = {
						...getAggregate(),
						[item.props.name]: val
					};
					field.setValue(newAggregate);
				},
				disabled: isStreaming
			}, i))
		});
	}
});
//#endregion
//#region src/genui-lib/Accordion/schema.ts
const AccordionItemSchema = zod_v4.z.object({
	value: zod_v4.z.string(),
	trigger: zod_v4.z.string(),
	content: zod_v4.z.array(ContentChildUnion)
});
//#endregion
//#region src/genui-lib/Accordion/index.tsx
const AccordionItem$1 = (0, _invdev_react_lang.defineComponent)({
	name: "AccordionItem",
	props: AccordionItemSchema,
	description: "value is unique id, trigger is section title",
	component: () => null
});
/** Shared renderer — also used by the chat library's Accordion variant (wider content union). */
const AccordionRenderer = ({ props, renderNode }) => {
	const items = props.items ?? [];
	const [openItem, setOpenItem] = react.default.useState("");
	const userHasInteracted = react.default.useRef(false);
	const prevItemCount = react.default.useRef(0);
	if (!userHasInteracted.current && items.length > prevItemCount.current) {
		const newest = items[items.length - 1];
		if (newest) setOpenItem(newest.props.value);
	}
	prevItemCount.current = items.length;
	const handleValueChange = (value) => {
		userHasInteracted.current = true;
		setOpenItem(value);
	};
	if (!items.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Accordion, {
		type: "single",
		collapsible: true,
		value: openItem,
		onValueChange: handleValueChange,
		children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(AccordionItem, {
			value: item.props.value,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AccordionTrigger, { text: item.props.trigger }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AccordionContent, { children: renderNode(item.props.content) })]
		}, item.props.value))
	});
};
const Accordion$1 = (0, _invdev_react_lang.defineComponent)({
	name: "Accordion",
	props: zod_v4.z.object({ items: zod_v4.z.array(AccordionItem$1.ref) }),
	description: "Collapsible sections",
	component: AccordionRenderer
});
//#endregion
//#region src/components/Modal/Modal.tsx
const sizeClass = {
	sm: "inv-modal-sm",
	md: "inv-modal-md",
	lg: "inv-modal-lg"
};
const Modal$1 = ({ title, open, onOpenChange, size = "md", children }) => {
	const { portalThemeClassName } = useTheme();
	const contentRef = (0, react.useRef)(null);
	const handleClose = (0, react.useCallback)(() => onOpenChange(false), [onOpenChange]);
	(0, react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") handleClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, handleClose]);
	(0, react.useEffect)(() => {
		if (open && contentRef.current) contentRef.current.focus();
	}, [open]);
	if (!open) return null;
	return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-modal-root", portalThemeClassName),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-modal-overlay",
			onClick: handleClose
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref: contentRef,
			className: (0, clsx.default)("inv-modal-content", sizeClass[size]),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "inv-modal-title",
			tabIndex: -1,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-modal-header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					id: "inv-modal-title",
					className: "inv-modal-title",
					children: title
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: "inv-modal-close",
					"aria-label": "Close",
					onClick: handleClose,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-modal-body",
				children
			})]
		})]
	}), document.body);
};
//#endregion
//#region src/genui-lib/Modal/schema.ts
const ModalSchema = zod_v4.z.object({
	title: zod_v4.z.string(),
	open: (0, _invdev_react_lang.reactive)(zod_v4.z.boolean().optional()),
	children: zod_v4.z.array(ContentChildUnion),
	size: zod_v4.z.enum([
		"sm",
		"md",
		"lg"
	]).optional()
});
//#endregion
//#region src/genui-lib/Modal/index.tsx
const Modal = (0, _invdev_react_lang.defineComponent)({
	name: "Modal",
	props: ModalSchema,
	description: "Modal dialog. open is a reactive $boolean binding — set to true to open, X/Escape/backdrop auto-closes. Put Form with buttons inside children.",
	component: ({ props, renderNode }) => {
		const field = (0, _invdev_react_lang.useStateField)("open", props.open);
		const isOpen = field.value === true || field.value === "true";
		const handleOpenChange = (open) => {
			if (!open) field.setValue(false);
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Modal$1, {
			title: props.title,
			open: isOpen,
			onOpenChange: handleOpenChange,
			size: props.size ?? "md",
			children: renderNode(props.children)
		});
	}
});
//#endregion
//#region src/genui-lib/prompt-options/index.ts
const invExamples = [
	`Example 1 — Table (column-oriented):

root = Stack([title, tbl])
title = TextContent("Top Languages", "large-heavy")
tbl = Table([Col("Language", langs), Col("Users (M)", users), Col("Year", years)])
langs = ["Python", "JavaScript", "Java", "TypeScript", "Go"]
users = [15.7, 14.2, 12.1, 8.5, 5.2]
years = [1991, 1995, 1995, 2012, 2009]`,
	`Example 2 — Bar chart:

root = Stack([title, chart])
title = TextContent("Q4 Revenue", "large-heavy")
chart = BarChart(labels, [s1, s2], "grouped")
labels = ["Oct", "Nov", "Dec"]
s1 = Series("Product A", [120, 150, 180])
s2 = Series("Product B", [90, 110, 140])`,
	`Example 3 — Form with validation:

root = Stack([title, form])
title = TextContent("Contact Us", "large-heavy")
form = Form("contact", btns, [nameField, emailField, countryField, msgField])
nameField = FormControl("Name", Input("name", "Your name", "text", { required: true, minLength: 2 }))
emailField = FormControl("Email", Input("email", "you@example.com", "email", { required: true, email: true }))
countryField = FormControl("Country", Select("country", countryOpts, "Select...", { required: true }))
msgField = FormControl("Message", TextArea("message", "Tell us more...", 4, { required: true, minLength: 10 }))
countryOpts = [SelectItem("us", "United States"), SelectItem("uk", "United Kingdom"), SelectItem("de", "Germany")]
btns = Buttons([Button("Submit", Action([@ToAssistant("Submit")]), "primary"), Button("Cancel", Action([@ToAssistant("Cancel")]), "secondary")])`,
	`Example 4 — Tabs with mixed content:

root = Stack([title, tabs])
title = TextContent("React vs Vue", "large-heavy")
tabs = Tabs([tabReact, tabVue])
tabReact = TabItem("react", "React", reactContent)
tabVue = TabItem("vue", "Vue", vueContent)
reactContent = [TextContent("React is a library by Meta for building UIs."), Callout("info", "Note", "React uses JSX syntax.")]
vueContent = [TextContent("Vue is a progressive framework by Evan You."), Callout("success", "Tip", "Vue has a gentle learning curve.")]`,
	`Example 5 — KPI and product cards:

root = Stack([kpiHeader, kpiBlock, productsHeader, productCards])
kpiHeader = InlineHeader("This Month", "Key account metrics")
kpiBlock = SnippetCardBlock([kpi1, kpi2, kpi3])
kpi1 = SnippetCardItem("revenue", kpi1lhs, kpi1rhs)
kpi1lhs = IconText(kpi1icon, "neutral", "m", "Revenue", "Month to date", false, "horizontal")
kpi1icon = Icon("circle-dollar-sign", "finance")
kpi1rhs = BoldText("number", "$48,200", "+8.1%", "metric")
kpi2 = SnippetCardItem("active-users", kpi2lhs, kpi2rhs)
kpi2lhs = IconText(kpi2icon, "neutral", "m", "Active Users", "This month", false, "horizontal")
kpi2icon = Icon("users", "people")
kpi2rhs = BoldText("number", "1,204", "+3.4%", "metric")
kpi3 = SnippetCardItem("churn", kpi3lhs, kpi3rhs)
kpi3lhs = IconText(kpi3icon, "neutral", "m", "Churn", "This month", false, "horizontal")
kpi3icon = Icon("user-minus", "people")
kpi3rhs = BoldText("number", "1.8%", "-0.3%", "metric")
productsHeader = InlineHeader("Top Products", "By units sold")
productCards = CompositeCardBlock([p1, p2])
p1 = CompositeCardItem("widget-pro", p1header, [p1body], p1footer)
p1header = IconText(p1icon, "neutral", "m", "Widget Pro", "Best seller", true, "horizontal")
p1icon = Icon("package", "shopping")
p1body = MetricIndicatorInline("2,410 units", "Sold this month", { direction: "up", value: 12 })
p1footer = { price: BoldText("text", "$29.00"), button: p1btn }
p1btn = Button("View Details", Action([@ToAssistant("Show details for Widget Pro")]), "secondary")
p2 = CompositeCardItem("widget-mini", p2header, [p2body], p2footer)
p2header = IconText(p2icon, "neutral", "m", "Widget Mini", "New arrival", true, "horizontal")
p2icon = Icon("box", "shopping")
p2body = MetricIndicatorInline("980 units", "Sold this month", { direction: "up", value: 4 })
p2footer = { price: BoldText("text", "$14.00"), button: p2btn }
p2btn = Button("View Details", Action([@ToAssistant("Show details for Widget Mini")]), "secondary")`,
	`Example 6 — Editable table and a selection form:

root = Stack([tableHeader, editTable, formHeader, prefsForm])
tableHeader = InlineHeader("Team Roster", "Click a cell to edit")
editTable = EditableTable("roster", [colName, colRole, colStart], [row1, row2])
colName = { type: "text", key: "name", header: "Name" }
colRole = { type: "select", key: "role", header: "Role", options: [roleEng, roleDesign] }
roleEng = { value: "eng", label: "Engineering" }
roleDesign = { value: "design", label: "Design" }
colStart = { type: "date-single", key: "start", header: "Start Date" }
row1 = { id: "1", values: ["Alex Kim", "eng", "2024-01-15"] }
row2 = { id: "2", values: ["Jamie Lee", "design", "2024-03-02"] }
formHeader = InlineHeader("Preferences", "Tell us how you like to work")
prefsForm = Form("prefs", formButtons, [fc1, fc2])
fc1 = FormControl("Working Style", styleCards, "Pick the one that fits best")
styleCards = OptionCards("style", "single", [style1, style2])
style1 = OptionCard("focused", "Deep Focus", "Long uninterrupted blocks", style1icon)
style1icon = Icon("target", "tools")
style2 = OptionCard("collab", "Collaborative", "Frequent pairing and syncs", style2icon)
style2icon = Icon("users", "people")
fc2 = FormControl("Tools", toolChips, "Select all that apply")
toolChips = Chips("tools", "multiple", [tool1, tool2, tool3])
tool1 = ChipItem("figma", "Figma", tool1icon)
tool1icon = Icon("figma", "design")
tool2 = ChipItem("slack", "Slack", tool2icon)
tool2icon = Icon("message-square", "communication")
tool3 = ChipItem("notion", "Notion", tool3icon)
tool3icon = Icon("notebook", "text")
formButtons = Buttons([Button("Save", Action([@ToAssistant("Save preferences")]), "primary")])`
];
const invAdditionalRules = [
	"When asked about data, generate realistic/plausible data",
	"For grid-like layouts, use Stack with direction \"row\" and wrap=true. Avoid justify=\"between\" unless you specifically want large gutters.",
	"For forms, define one FormControl reference per field so controls can stream progressively.",
	"For forms, always provide the second Form argument with Buttons(...) actions: Form(name, buttons, fields).",
	"Never nest Form inside Form.",
	"Use @Reset($var1, $var2) after form submit to restore defaults — not @Set($var, \"\")",
	"Multi-query refresh: Action([@Run(mutation), @Run(query1), @Run(query2), @Reset(...)])",
	"$variables are reactive: changing via Select or @Set re-evaluates all Queries and expressions referencing them",
	"Use existing components (Tabs, Accordion, Modal) before inventing ternary show/hide patterns",
	"Card blocks (SnippetCardBlock, OverviewCardBlock, ContextCardBlock, CompositeCardBlock, VisualCardBlock) need at least 2 items; every item in a block must have the same structure.",
	"Text / BoldText / IconText / ImageText / ImageTextLarge / MetricIndicatorInline / MetricIndicatorWithStrikethrough are inline building blocks used INSIDE card items — do not place them directly in a Stack or Card.",
	"EntityList size='small' (no header/footer) is only for use inside a CompositeCardItem body; use size='default' everywhere else.",
	"Image URLs must be real (from a tool result or the user) — never invent or template an image URL.",
	"Always pass a category to Icon — it enables a topical fallback when the exact icon name is unavailable.",
	"EditableTable requires the consuming app to persist edits — use it only when the user or app explicitly asks for an editable table; default to Table for read-only data."
];
const invPromptOptions = {
	examples: invExamples,
	additionalRules: invAdditionalRules
};
const invChatExamples = [
	`Example 1 — Informational response (the shape for "tell me about X" / explainer asks):

root = Card([header, intro, highlights, statsHeader, statsCards, sectionsBlock, actionBtns], [src1, src2])
header = CardHeader("Paris", "The City of Light · France's Eternal Capital")
intro = TextContent("Paris is one of the world's most visited cities — a timeless blend of iconic landmarks, world-class cuisine, art, and romance [1]. In 2026 the city is buzzing with new energy: the **Grand Palais** has reopened after a €466M renovation, and you can now **swim in the Seine** for the first time in over a century [2].")
highlights = ContextCardBlock([h1, h2, h3], "grid", true, { type: "continue_conversation", context: "Tell me more about this aspect of Paris" })
h1 = ContextCardItem("art-museums", "Art & Museums", "143 museums including the Louvre & newly reopened Grand Palais.", "gray", "https://cdn.britannica.com/03/121003-050-2544BD4E/Interior-Louvre-Museum-Paris.jpg")
h2 = ContextCardItem("gastronomy", "Gastronomy", "9,000+ restaurants, 130+ Michelin stars, and the world's best baguettes.", "gray")
h3 = ContextCardItem("fashion-capital", "Fashion Capital", "Home to Chanel, Dior, Louis Vuitton & Hermès — the global luxury hub.", "gray", "https://thumbs.dreamstime.com/z/dior-storefront-facade-chanel-store-lvmh-s-french-designer-modehouse-christian-adjacent-to-luxury-fashion-beauty-brand-327161553.jpg")
statsHeader = InlineHeader("Paris by the Numbers", "Key visitor statistics")
statsCards = OverviewCardBlock([ov1, ov2, ov3], "grid", true)
ov1 = OverviewCardItem("annual-visitors", ov1top, ov1metric)
ov1top = IconText(ov1icon, "neutral", "m", "Annual Visitors", "2024 arrivals", false, "vertical")
ov1icon = Icon("users", "people")
ov1metric = MetricIndicatorInline("48.7M", "tourists", { direction: "up", value: 2.5 })
ov2 = OverviewCardItem("museums-monuments", ov2top, ov2metric)
ov2top = IconText(ov2icon, "neutral", "m", "Museums & Monuments", "Cultural sites", false, "vertical")
ov2icon = Icon("landmark", "buildings")
ov2metric = MetricIndicatorInline("2,370+", "across the city")
ov3 = OverviewCardItem("tourism-revenue", ov3top, ov3metric)
ov3top = IconText(ov3icon, "neutral", "m", "Tourism Revenue", "2024 estimate", false, "vertical")
ov3icon = Icon("circle-dollar-sign", "finance")
ov3metric = MetricIndicatorInline("€23.4B", "generated")
sectionsBlock = SectionBlock([secLandmarks, secFood, secWhen], false)
secLandmarks = SectionItem("landmarks", "Iconic Landmarks", [landmarksCarousel])
landmarksCarousel = VisualCardBlock([lm1, lm2, lm3, lm4], "carousel", true, { type: "continue_conversation", context: "Tell me more about this Paris landmark" })
lm1 = VisualCardItem(lm1body, "eiffel-tower", "https://c8.alamy.com/comp/RYEB13/aerial-view-of-the-eiffel-tower-with-the-park-champ-de-mars-and-the-river-seine-paris-france-RYEB13.jpg", lm1tag, "Aerial view of the Eiffel Tower")
lm1body = BoldText("text", "Eiffel Tower", "Open daily 9am–midnight")
lm1tag = Tag("Must-See", lm1tagIcon, "sm", "info")
lm1tagIcon = Icon("star", "shapes")
lm2 = VisualCardItem(lm2body, "the-louvre", "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-exterior-of-musee-du-louvre-museum-paris-france-bernard-jaubert.jpg", lm2tag, "Exterior of the Louvre museum")
lm2body = BoldText("text", "The Louvre", "World's largest art museum")
lm2tag = Tag("8.9M visits/yr", lm2tagIcon, "sm", "success")
lm2tagIcon = Icon("trending-up", "charts")
lm3 = VisualCardItem(lm3body, "notre-dame", "https://cdn.britannica.com/29/255529-050-63A22A3C/notre-dame-de-paris-cathedral-paris-france.jpg", lm3tag, "Notre-Dame cathedral facade")
lm3body = BoldText("text", "Notre-Dame", "Fully restored cathedral")
lm3tag = Tag("Reopened 2024", lm3tagIcon, "sm", "warning")
lm3tagIcon = Icon("hammer", "tools")
lm4 = VisualCardItem(lm4body, "versailles", "https://cdn.britannica.com/76/130076-050-31128A3D/Latona-Fountain-Balthazard-Marsy-Gaspard-Andre-Le.jpg", lm4tag, "Latona Fountain at Versailles")
lm4body = BoldText("text", "Palace of Versailles", "Royal gardens & grand halls")
lm4tag = Tag("Day Trip", lm4tagIcon, "sm", "neutral")
lm4tagIcon = Icon("train-front", "travel")
secFood = SectionItem("food", "Food & Drink", [foodCards])
foodCards = ContextCardBlock([f1, f2, f3], "grid", true, { type: "continue_conversation", context: "Tell me more about eating and drinking in Paris" })
f1 = ContextCardItem("bistros", "Bistros", "Classic French fare — try Les Arlots for confit beef cheeks.", "gray", "https://everydayparisian.com/wp-content/uploads/2023/01/IMG_0221-768x1024.webp")
f2 = ContextCardItem("fine-dining", "Fine Dining", "Septime leads a new wave of creative Michelin-starred cuisine.", "gray", "https://production-data.worldofmouth.app/images/72b2e6db-97ea-49c4-aa5d-3b7c8121c812.jpg")
f3 = ContextCardItem("bakeries", "Bakeries", "Shinya Pain for sourdough. Grand Prix-winning baguettes citywide.", "gray", "https://www.davidlebovitz.com/wp-content/uploads/2018/09/Le-petit-grain-paris-bakery-boulangerie-patisserie-pastry-shop-8-640x895.jpg")
secWhen = SectionItem("when", "Best Time to Visit", [whenTabs])
whenTabs = Tabs([tabSpring, tabSummer])
tabSpring = TabItem("spring", "Spring", [springList])
springList = ListBlock([sp1, sp2, sp3], "number")
sp1 = ListItem("Cherry blossoms at Parc de Sceaux", "March – May", null, null, { type: "continue_conversation", context: "Tell me about cherry blossom season in Paris" })
sp2 = ListItem("Picnics along the Seine & in city parks", "Warm, lively atmosphere", null, null, { type: "continue_conversation", context: "Where are the best picnic spots in Paris?" })
sp3 = ListItem("Fewer crowds than summer", "Ideal for sightseeing", null, null, { type: "continue_conversation", context: "How busy is Paris in spring?" })
tabSummer = TabItem("summer", "Summer", [summerList])
summerList = ListBlock([su1, su2, su3], "number")
su1 = ListItem("Swim in the Seine — open July & August 2026", "First time in 102 years", null, null, { type: "continue_conversation", context: "Tell me about swimming in the Seine" })
su2 = ListItem("Open-air cinema at Parc de la Villette", "Free films under the stars", null, null, { type: "continue_conversation", context: "Tell me about the open-air cinema at Parc de la Villette" })
su3 = ListItem("Bastille Day celebrations on July 14", "Fireworks at the Eiffel Tower", null, null, { type: "continue_conversation", context: "What happens in Paris on Bastille Day?" })
actionBtns = Buttons([btn1, btn2, btn3], "row")
btn1 = Button("Plan a Trip to Paris", { type: "continue_conversation", context: "Help me plan a trip to Paris" }, "primary")
btn2 = Button("Best Hotels in Paris", { type: "continue_conversation", context: "Show me the best hotels in Paris" }, "secondary")
btn3 = Button("Build a Paris Itinerary", { type: "continue_conversation", context: "Build a 5-day Paris itinerary for me" }, "secondary")
src1 = { title: "Paris Travel Guide 2025", sourceName: "Travel and Tour World", url: "https://www.travelandtourworld.com/news/article/from-iconic-landmarks-to-hidden-gems-the-ultimate-paris-travel-guide-for-2025-you-need-to-read-now/" }
src2 = { title: "Best Things to Do in Paris 2026", sourceName: "Time Out Paris", url: "http://www.timeout.fr/paris/en/for-tourists" }`,
	`Example 2 — Data and analytics response (quantitative asks lead with KPIs and charts):

root = Card([pageHeader, kpiBlock, sections, deepDiveHeader, compositeCards, actionButtons])
pageHeader = CardHeader("Analytics Dashboard", "April 2026 · Business Performance Overview")
kpiBlock = SnippetCardBlock([kpi1, kpi2, kpi3, kpi4], "grid", true)
kpi1 = SnippetCardItem("total-revenue", kpi1lhs, kpi1rhs)
kpi1lhs = IconText(kpi1icon, "neutral", "m", "Total Revenue", "Month to date", false, "horizontal")
kpi1icon = Icon("circle-dollar-sign", "finance")
kpi1rhs = BoldText("number", "$284,500", "+12.4%", "metric")
kpi2 = SnippetCardItem("active-users", kpi2lhs, kpi2rhs)
kpi2lhs = IconText(kpi2icon, "neutral", "m", "Active Users", "Monthly active users", false, "horizontal")
kpi2icon = Icon("users", "people")
kpi2rhs = BoldText("number", "47,320", "+6.8%", "metric")
kpi3 = SnippetCardItem("conversion-rate", kpi3lhs, kpi3rhs)
kpi3lhs = IconText(kpi3icon, "neutral", "m", "Conversion Rate", "Avg. this month", false, "horizontal")
kpi3icon = Icon("trending-up", "charts")
kpi3rhs = BoldText("number", "5.7%", "+0.9%", "metric")
kpi4 = SnippetCardItem("churn-rate", kpi4lhs, kpi4rhs)
kpi4lhs = IconText(kpi4icon, "neutral", "m", "Churn Rate", "Monthly customer churn", false, "horizontal")
kpi4icon = Icon("user-minus", "people")
kpi4rhs = BoldText("number", "2.1%", "-0.4%", "metric")
sections = SectionBlock([secUsers, secChannels], false)
secUsers = SectionItem("users", "User Activity", [userTabs])
userTabs = Tabs([tabGrowth, tabRetention])
tabGrowth = TabItem("growth", "User Growth", [growthChart])
growthChart = LineChart(months, [dauSeries, mauSeries], "natural", "Month", "Users (k)")
months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]
dauSeries = Series("DAU", [5.1, 5.4, 5.8, 6.2, 6.7, 7.1, 7.6, 8.0, 8.4, 8.9, 9.3, 9.8])
mauSeries = Series("MAU", [28.4, 30.1, 31.8, 33.5, 35.2, 37.1, 38.8, 40.4, 42.1, 43.9, 45.6, 47.3])
tabRetention = TabItem("retention", "Cohort Retention", [retentionChart])
retentionChart = LineChart(cohortMonths, [cohortJan, cohortFeb, cohortMar], "natural", "Month Since Signup", "Retention (%)")
cohortMonths = ["Month 0", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"]
cohortJan = Series("Jan Cohort", [100, 80, 70, 62, 56, 51, 47])
cohortFeb = Series("Feb Cohort", [100, 83, 73, 65, 59, 54, 50])
cohortMar = Series("Mar Cohort", [100, 86, 76, 68, 62, 0, 0])
secChannels = SectionItem("channels", "Acquisition Channels", [channelTabs])
channelTabs = Tabs([tabChannelBar, tabChannelTable])
tabChannelBar = TabItem("channel-bar", "Revenue by Channel", [channelBarChart])
channelBarChart = HorizontalBarChart(channels, [channelSeries], "grouped", "Revenue ($k)", "Channel")
channels = ["Organic Search", "Paid Ads", "Referral Program", "Partner Network", "Direct / Brand", "Email Campaigns"]
channelSeries = Series("Revenue ($k)", [82.4, 68.1, 54.6, 38.2, 26.8, 14.4])
tabChannelTable = TabItem("channel-table", "Full Breakdown", [channelTable])
channelTable = Table([colChannel, colLeads, colConv, colCac, colRevenue, colStatus])
colChannel = Col("Channel", channels, "string")
colLeads = Col("Leads", [4210, 3180, 2050, 1120, 1290, 820], "number")
colConv = Col("Conv. Rate", ["6.4%", "5.1%", "9.4%", "11.8%", "5.8%", "8.1%"], "string")
colCac = Col("CAC ($)", [188, 395, 132, 109, 218, 154], "number")
colRevenue = Col("Revenue ($k)", [82.4, 68.1, 54.6, 38.2, 26.8, 14.4], "number")
colStatus = Col("Status", ["Scaling", "Optimizing", "Scaling", "Growing", "Stable", "Stable"], "string")
deepDiveHeader = InlineHeader("Support Health & Marketing ROI", "Click a card to explore deeper insights")
compositeCards = CompositeCardBlock([cardSupport, cardMarketing], "grid", true, { type: "continue_conversation", context: "Explore this deep-dive area in more detail" })
cardSupport = CompositeCardItem("support-health", supportHeader, [supportMetric, supportChart, supportList])
supportHeader = IconText(supportIcon, "neutral", "m", "Support Health", "Ticket volume & resolution trends", false, "horizontal")
supportIcon = Icon("headphones", "communication")
supportMetric = MetricIndicatorInline("94.2% CSAT", "Customer Satisfaction Score", { direction: "up", value: 2.1 })
supportChart = BarChart(["Jan", "Feb", "Mar", "Apr"], [openSeries, resolvedSeries], "grouped", "Month", "Tickets")
openSeries = Series("Opened", [341, 327, 308, 289])
resolvedSeries = Series("Resolved", [319, 318, 301, 283])
supportList = EntityList([sup1, sup2, sup3], "small")
sup1 = { left: "Avg. Resolution Time", right: "4h 12m", rightVariant: "text" }
sup2 = { left: "First Contact Resolution", right: "78.4%", rightVariant: "number" }
sup3 = { left: "Escalation Rate", right: "6.2%", rightVariant: "number" }
cardMarketing = CompositeCardItem("marketing-roi", marketingHeader, [marketingMetric, marketingChart, marketingList])
marketingHeader = IconText(marketingIcon, "neutral", "m", "Marketing ROI", "Spend vs. pipeline generated", false, "horizontal")
marketingIcon = Icon("megaphone", "communication")
marketingMetric = MetricIndicatorInline("3.8x Blended ROI", "Return on Ad Spend", { direction: "up", value: 0.4 })
marketingChart = AreaChart(["Jan", "Feb", "Mar", "Apr"], [spendSeries, pipelineSeries], "natural", "Month", "Value ($k)")
spendSeries = Series("Ad Spend", [44.0, 46.8, 49.2, 51.6])
pipelineSeries = Series("Pipeline Generated", [158.2, 171.5, 184.9, 196.1])
marketingList = EntityList([mkt1, mkt2, mkt3], "small")
mkt1 = { left: "Total Ad Spend (Apr)", right: "$51,600", rightVariant: "number" }
mkt2 = { left: "Cost per Lead", right: "$48.20", rightVariant: "number" }
mkt3 = { left: "Top Channel", right: "Organic Search", rightVariant: "text" }
actionButtons = Buttons([btnChannels, btnForecast], "row")
btnChannels = Button("Break Down by Channel", { type: "continue_conversation", context: "Break down this month's revenue by acquisition channel" }, "primary")
btnForecast = Button("Forecast Next Quarter", { type: "continue_conversation", context: "Forecast revenue and active users for next quarter" }, "secondary")`,
	`Example 3 — Form response (help-me-choose/plan asks: inspiration cards FIRST, then a compact form). The inspiration-card images below came from an image tool call — include such cards ONLY when you have real URLs; with no real URLs, start directly with the form:

root = Card([header, intro, inspoCards, form])
header = CardHeader("Plan Your Trip", "A few ideas to spark inspiration — then tell me your preferences")
intro = TextContent("Tap a style to jump straight in, or fill the quick form below for a tailored plan.")
inspoCards = VisualCardBlock([insp1, insp2], "grid", true, { type: "continue_conversation", context: "Plan me a trip in this style with destinations, itinerary, and costs" })
insp1 = VisualCardItem(insp1body, "inspo-beach", "https://www.travelandleisure.com/thmb/cuAB7XMQ6s_Gji-no956KNopT7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-maldives-TROPVACAY0325-1b5047d5931d4850b47d082966f9f563.jpg", insp1tag, "Maldives overwater villas")
insp1body = BoldText("text", "Tropical Beach Escape", "Overwater villas & snorkeling")
insp1tag = Tag("Relaxation", insp1icon, "sm", "info")
insp1icon = Icon("umbrella", "travel")
insp2 = VisualCardItem(insp2body, "inspo-mountain", "https://www.salkantaytrekmachu.com/img/adventure-travel-peru-032.jpg", insp2tag, "Trekking in the Peruvian Andes")
insp2body = BoldText("text", "Mountain Adventure", "Trekking & epic views")
insp2tag = Tag("Active", insp2icon, "sm", "warning")
insp2icon = Icon("mountain", "nature")
form = Form("trip-planner", formButtons, [fcDestination, fcDates, fcTravellers, fcTripType, fcBudget, fcStay, fcNotes])
formButtons = Buttons([btnSubmit, btnSkip], "row")
btnSubmit = Button("Plan My Trip", { type: "continue_conversation", context: "Help me plan a trip based on my form submission" }, "primary")
btnSkip = Button("Just Surprise Me", { type: "continue_conversation", context: "Skip the form and surprise me with a destination and itinerary" }, "secondary")
fcDestination = FormControl("Destination", destinationInput, "Leave blank if you'd like suggestions")
destinationInput = Input("destination", "e.g. Tokyo, Japan — or leave blank", "text")
fcDates = FormControl("Travel Dates", datesPicker, "Select your start and end dates")
datesPicker = DatePicker("travel-dates", "range", { required: true })
fcTravellers = FormControl("Number of Travellers", travellersSelect, "How many people are travelling?")
travellersSelect = Select("num-travellers", [tr1, tr2, tr3, tr4], "Select number of travellers", { required: true })
tr1 = SelectItem("1", "1 — Solo")
tr2 = SelectItem("2", "2 — Couple")
tr3 = SelectItem("3-4", "3–4 People")
tr4 = SelectItem("5+", "5+ People")
fcTripType = FormControl("Trip Type", tripTypeCards, "What kind of trip are you planning?")
tripTypeCards = OptionCards("trip-type", "single", [oc1, oc2, oc3, oc4], { required: true })
oc1 = OptionCard("adventure", "Adventure", "Hiking, trekking & outdoor activities", oc1icon)
oc1icon = Icon("mountain", "nature")
oc2 = OptionCard("beach", "Beach & Relaxation", "Sun, sand & leisure", oc2icon)
oc2icon = Icon("waves", "nature")
oc3 = OptionCard("cultural", "Cultural & Historical", "Museums, heritage & local experiences", oc3icon)
oc3icon = Icon("landmark", "buildings")
oc4 = OptionCard("city", "City Break", "Urban exploration & nightlife", oc4icon)
oc4icon = Icon("building-2", "buildings")
fcBudget = FormControl("Estimated Budget (per person)", budgetSlider, "Drag to set your per-person budget in USD")
budgetSlider = Slider("budget", "discrete", 500, 10000, 500, [2500], "Budget (USD)")
fcStay = FormControl("Accommodation Preference", stayChips, "Select all that apply")
stayChips = Chips("accommodation", "multiple", [ch1, ch2, ch3, ch4], {}, ["hotel"])
ch1 = ChipItem("hotel", "Hotel", ch1icon)
ch1icon = Icon("building", "buildings")
ch2 = ChipItem("resort", "Resort", ch2icon)
ch2icon = Icon("umbrella", "travel")
ch3 = ChipItem("airbnb", "Vacation Rental", ch3icon)
ch3icon = Icon("home", "home")
ch4 = ChipItem("camping", "Camping / Glamping", ch4icon)
ch4icon = Icon("tent", "nature")
fcNotes = FormControl("Special Requests or Notes", notesArea, "Any dietary needs, accessibility requirements, or specific interests?")
notesArea = TextArea("special-requests", "e.g. vegetarian meals, wheelchair access, honeymoon surprise...", 4)`,
	`Example 4 — Recommendations with images and links (same pattern for products, movies, restaurants, articles):

root = Card([header, intro, posters, linksHeader, trackCards], [src1, src2])
header = CardHeader("Retro-Energetic Indian Tracks", "New Hindi releases with 80s/90s dance DNA")
intro = TextContent("These recent tracks channel retro synths and 90s party percussion [1][2]. Tap a poster to explore a track, or use its button to watch the exact official video.")
posters = VisualCardBlock([v1, v2], "grid", true, { type: "continue_conversation", context: "Tell me more about this track and its retro influences" })
v1 = VisualCardItem(v1body, "tamma", "https://i.ytimg.com/vi/PQHeOb0Q9oo/hq720.jpg", v1tag, "Tamma Tamma video poster")
v1body = BoldText("text", "Tamma Tamma", "Dhurandhar · Ranveer Singh")
v1tag = Tag("80s Electro-Disco", v1icon, "sm", "success")
v1icon = Icon("disc-3", "multimedia")
v2 = VisualCardItem(v2body, "sajan", "https://i.ytimg.com/vi/mLz-qBiRnl8/hq720.jpg", v2tag, "Sajan Re video poster")
v2body = BoldText("text", "Sajan Re", "Nora Fatehi · Badshah")
v2tag = Tag("Synthwave Electro", v2icon, "sm", "info")
v2icon = Icon("music", "multimedia")
linksHeader = InlineHeader("Watch the Exact Videos", "Each button opens that track's official video")
trackCards = CompositeCardBlock([t1, t2], "grid", true)
t1 = CompositeCardItem("t-tamma", t1h, [t1body, t1tags], { button: t1btn })
t1h = IconText(t1icon, "neutral", "m", "Tamma Tamma", "Bappi Lahiri classic, electro-funk rework", true, "horizontal")
t1icon = Icon("disc-3", "multimedia")
t1body = Text("text", "Heavy analog synths and brass over a fast disco groove.", "Retro Electro-Disco")
t1tags = TagBlock(["2026 Film Hit", "Peak Party"])
t1btn = Button("Watch on YouTube", { type: "open_url", url: "https://www.youtube.com/watch?v=PQHeOb0Q9oo" }, "primary")
t2 = CompositeCardItem("t-sajan", t2h, [t2body, t2tags], { button: t2btn })
t2h = IconText(t2icon, "neutral", "m", "Sajan Re", "Nora Fatehi · Badshah · Sanjoy", true, "horizontal")
t2icon = Icon("music", "multimedia")
t2body = Text("text", "Synthwave melody hooks over a modern club beat.", "Retro-Fusion Electro")
t2tags = TagBlock(["Club Anthem", "Nora x Badshah"])
t2btn = Button("Watch on YouTube", { type: "open_url", url: "https://www.youtube.com/watch?v=COUSCnFazzc" }, "primary")
src1 = { title: "Tamma Tamma (Full Video) - Dhurandhar", sourceName: "YouTube (T-Series)", url: "https://www.youtube.com/watch?v=PQHeOb0Q9oo" }
src2 = { title: "Sajan Re (Official Music Video)", sourceName: "YouTube (T-Series)", url: "https://www.youtube.com/watch?v=COUSCnFazzc" }`,
	`Example 5 — Table with follow-ups:

root = Card([title, tbl, followUps])
title = TextContent("Top Languages", "large-heavy")
tbl = Table([Col("Language", langs), Col("Users (M)", users), Col("Year", years)])
langs = ["Python", "JavaScript", "Java"]
users = [15.7, 14.2, 12.1]
years = [1991, 1995, 1995]
followUps = FollowUpBlock([fu1, fu2])
fu1 = FollowUpItem("Tell me more about Python")
fu2 = FollowUpItem("Show me a JavaScript comparison")`
];
const invChatAdditionalRules = [
	"When asked about data, generate realistic/plausible data",
	"Every response is a single Card(children) — children stack vertically automatically. No layout params are needed on Card.",
	"Card is the only layout container. Do NOT use Stack. Use Tabs to switch between sections, Carousel for horizontal scroll.",
	"Use FollowUpBlock at the END of a Card to suggest what the user can do or ask next.",
	"Use ListBlock when presenting a set of options or steps; give each ListItem an action (5th argument) to make it clickable — without one the item is plain text.",
	"Use SectionBlock to group long responses into collapsible sections — good for reports, FAQs, and structured content.",
	"Use SectionItem inside SectionBlock: each item needs a unique value id, a trigger (header label), and a content array.",
	"Carousel takes an array of slides, where each slide is an array of content: carousel = Carousel([[t1, img1], [t2, img2]])",
	"IMPORTANT: Every slide in a Carousel must use the same component structure in the same order — e.g. all slides: [title, image, description, tags].",
	"For forms, define one FormControl reference per field so controls can stream progressively.",
	"For forms, always provide the second Form argument with Buttons(...) actions: Form(name, buttons, fields).",
	"Never nest Form inside Form.",
	"CardHeader is the page-level heading — place it as the first child of Card; InlineHeader is a lighter subsection label for a block inside the response, and is redundant when the following component already has a heading.",
	"Never use Callout or TextCallout to justify why you did what you did or for any meta-information.",
	"Every image slot (Image, ImageBlock, ImageGallery, VisualCardItem/ContextCardItem bgImageSrc, ImageText, ImageTextLarge, ListItem image) requires a REAL URL from a tool result, the conversation, or the user — NEVER invent, guess, or template a URL.",
	"If no image URL is in context, compose without image components — icons, gray ContextCardItems, and charts still make rich layouts.",
	"Argument-order trap: Image takes alt FIRST, while ImageBlock, ImageText, and ImageTextLarge take src FIRST — alt text in a src slot ships a broken image.",
	"Card blocks (SnippetCardBlock, OverviewCardBlock, ContextCardBlock, CompositeCardBlock, VisualCardBlock) need at least 2 items, all with the same structure; use layout \"grid\" for primary side-by-side comparison and \"carousel\" for secondary browsing.",
	"The card-block action is BLOCK-LEVEL: one action shared by every card, with the clicked card's details attached automatically — keep continue_conversation context generic (e.g. \"Tell me more about this destination\"), and never use a block-level open_url since it would send every card to the same URL.",
	"Card items have NO per-item action: to give each item its own external link, use CompositeCardItem with footer { button: Button(label, { type: \"open_url\", url }) } — never claim a card opens a link it cannot.",
	"Text, BoldText, IconText, ImageText, ImageTextLarge and MetricIndicator* are inline building blocks used INSIDE card items — do not place them directly in the root Card.",
	"EntityList size \"small\" is reserved for CompositeCardItem body content (no header/footer); use size \"default\" elsewhere.",
	"Tag variant must be semantically correct (success=positive, danger=negative, warning=cautionary, info=informational, neutral=label); Tag takes an optional Icon second, so use Tag(text, icon, size, variant) when a variant is needed.",
	"TagBlock takes plain strings — keep it to at most 3 tags.",
	"ListBlock variant \"number\" is for ordered sequences and rankings, \"image\" for products/profiles with a real image; Steps is for ordered sequential processes only.",
	"Use SectionBlock to divide a long response into independent, equally prominent topics; use Tabs when the items are alternative views of the same thing; set isFoldable=false unless a section has 4+ distinct blocks; never make SectionBlock the first Card child.",
	"Accordion is for supplementary or FAQ content only — never primary information, 3-5 items max, and always the last component in its section or card.",
	"Charts: LineChart/AreaChart variant \"natural\" for smooth trends and \"linear\" for precise point-to-point data; BarChart \"grouped\" for side-by-side comparison and \"stacked\" for part-to-whole; prefer HorizontalBarChart when category labels are long or numerous.",
	"For large chart values, scale the data and put the unit in the axis label (e.g. yLabel \"Revenue ($k)\") instead of passing raw thousands or millions.",
	"Quantitative asks get a chart (plus KPI cards where useful) in the FIRST response — do not answer numbers with prose or a table alone.",
	"Table is column-oriented: each Col holds its own data array of plain strings or numbers (never components), and every column's array must have the same length.",
	"Use EditableTable ONLY when the user or app explicitly asks for an editable table; default to Table for read-only data.",
	"Every Form MUST have EXACTLY ONE submit Button with variant \"primary\" — that button validates the form; other buttons (secondary/tertiary escape hatches like \"Just Surprise Me\") skip validation, and there is never a reset button.",
	"Prefer structured inputs (Select, Chips, OptionCards, DatePicker, Slider) over free-text Input, give every FormControl a clear label (and a hint where it prevents mistakes), and keep each field name unique within the response.",
	"Validation rules ({ required: true, email: true, minLength: 8, ... }) are enforced with inline errors — use them for genuinely essential fields, but never require a free-text field where leaving it blank is meaningful.",
	"Form inputs work ONLY inside a FormControl within a Form; for tappable suggestion choices OUTSIDE a form, use Buttons of continue_conversation Buttons — never a bare OptionCards or Chips.",
	"Only add Buttons for real actions: form submit, open_url with a URL from a tool or the user (never fabricated), or a continue_conversation follow-up — never a button for an app action (open, download, export, edit) you cannot perform.",
	"Every Button label must accurately describe what clicking it does; use \"primary\" for the main action and \"secondary\"/\"tertiary\" only for lower-emphasis supporting actions.",
	"Icon: always include the category argument — it enables fallback matching when the exact lucide name is unavailable.",
	"Pass sources on Card ONLY when the answer relies on real references you actually have, and cite them inline in TextContent as [1], [2] (1-based index into sources)."
];
const invChatPromptOptions = {
	examples: invChatExamples,
	additionalRules: invChatAdditionalRules
};
//#endregion
//#region src/genui-lib/invLibrary.tsx
const invComponentGroups = [
	{
		name: "Layout",
		components: [
			"Stack",
			"Tabs",
			"TabItem",
			"Accordion",
			"AccordionItem",
			"Steps",
			"StepsItem",
			"Carousel",
			"Separator",
			"Modal"
		],
		notes: [
			"- For grid-like layouts, use Stack with direction \"row\" and wrap set to true.",
			"- Prefer justify \"start\" (or omit justify) with wrap=true for stable columns instead of uneven gutters.",
			"- Use nested Stacks when you need explicit rows/sections.",
			"- Show/hide sections: $editId != \"\" ? Card([editForm]) : null",
			"- Modal: Modal(\"Title\", $showModal, [content]) — $showModal is boolean, X/Escape auto-closes. Put Form with its own buttons inside children.",
			"- Use Tabs for alternative views (chart types, data sections) — no $variable needed",
			"- Shared filter across Tabs: same $days binding in Query args works across all TabItems"
		]
	},
	{
		name: "Content",
		components: [
			"Card",
			"CardHeader",
			"TextContent",
			"MarkDownRenderer",
			"Callout",
			"TextCallout",
			"Image",
			"ImageBlock",
			"ImageGallery",
			"CodeBlock",
			"InlineHeader"
		],
		notes: [
			"- InlineHeader is a compact heading + description pair for labelling a block (lighter than CardHeader).",
			"- Use Cards to group related KPIs or sections. Stack with direction \"row\" for side-by-side layouts.",
			"- Success toast: Callout(\"success\", \"Saved\", \"Done.\", $showSuccess) — use @Set($showSuccess, true) in save action, auto-dismisses after 3s. For errors: result.status == \"error\" ? Callout(\"error\", \"Failed\", result.error) : null",
			"- KPI card: Card([TextContent(\"Label\", \"small\"), TextContent(\"\" + @Count(@Filter(data.rows, \"field\", \"==\", \"value\")), \"large-heavy\")])"
		]
	},
	{
		name: "Tables",
		components: [
			"Table",
			"Col",
			"EditableTable"
		],
		notes: [
			"- EditableTable lets the user edit cells inline. Give it a unique name, columns of { type, key, header } with type one of text | number | date-single | select | url (select also needs options: [{ value, label }]).",
			"- data is an array of { id, values } rows where values are ordered positionally to match columns. Edited data is submitted when the user clicks Save Changes.",
			"- Table is COLUMN-oriented: Table([Col(\"Label\", dataArray), Col(\"Count\", countArray, \"number\")]). Use array pluck for data: data.rows.fieldName",
			"- Col data can be component arrays for styled cells: Col(\"Status\", @Each(data.rows, \"item\", Tag(item.status, null, \"sm\", item.status == \"open\" ? \"success\" : \"danger\")))",
			"- Row actions: Col(\"Actions\", @Each(data.rows, \"t\", Button(\"Edit\", Action([@Set($showEdit, true), @Set($editId, t.id)]))))",
			"- Sortable: sorted = @Sort(data.rows, $sortField, \"desc\"). Bind $sortField to Select. Use sorted.fieldName for Col data",
			"- Searchable: filtered = @Filter(data.rows, \"title\", \"contains\", $search). Bind $search to Input",
			"- Chain sort + filter: filtered = @Filter(...) then sorted = @Sort(filtered, ...) — use sorted for both Table and Charts",
			"- Empty state: @Count(data.rows) > 0 ? Table([...]) : TextContent(\"No data yet\")"
		]
	},
	{
		name: "Charts (2D)",
		components: [
			"BarChart",
			"LineChart",
			"AreaChart",
			"RadarChart",
			"HorizontalBarChart",
			"Series"
		],
		notes: [
			"- Charts accept column arrays: LineChart(labels, [Series(\"Name\", values)]). Use array pluck: LineChart(data.rows.day, [Series(\"Views\", data.rows.views)])",
			"- Use Cards to wrap charts with CardHeader for titled sections",
			"- Chart + Table from same source: use @Sort or @Filter result for both LineChart and Table Col data",
			"- Multiple chart views: use Tabs — Tabs([TabItem(\"line\", \"Line\", [LineChart(...)]), TabItem(\"bar\", \"Bar\", [BarChart(...)])])"
		]
	},
	{
		name: "Charts (1D)",
		components: [
			"PieChart",
			"RadialChart",
			"SingleStackedBarChart",
			"Slice"
		],
		notes: [
			"- PieChart and BarChart need NUMBERS, not objects. For list data, use @Count(@Filter(...)) to aggregate:",
			"- PieChart from list: `PieChart([\"Low\", \"Med\", \"High\"], [@Count(@Filter(data.rows, \"priority\", \"==\", \"low\")), @Count(@Filter(data.rows, \"priority\", \"==\", \"medium\")), @Count(@Filter(data.rows, \"priority\", \"==\", \"high\"))], \"donut\")`",
			"- KPI from count: `TextContent(\"\" + @Count(@Filter(data.rows, \"status\", \"==\", \"open\")), \"large-heavy\")`"
		]
	},
	{
		name: "Charts (Scatter)",
		components: [
			"ScatterChart",
			"ScatterSeries",
			"Point"
		]
	},
	{
		name: "Forms",
		components: [
			"Form",
			"FormControl",
			"Label",
			"Input",
			"TextArea",
			"Select",
			"SelectItem",
			"DatePicker",
			"Slider",
			"CheckBoxGroup",
			"CheckBoxItem",
			"RadioGroup",
			"RadioItem",
			"SwitchGroup",
			"SwitchItem",
			"Chips",
			"ChipItem",
			"OptionCards",
			"OptionCard"
		],
		notes: [
			"- Chips: compact single/multiple selection pills. Use ChipItem references for each option.",
			"- OptionCards: larger selectable cards with title, subtitle and an optional Icon or Image on top. Use OptionCard references for each option.",
			"- For Form fields, define EACH FormControl as its own reference — do NOT inline all controls in one array. This allows progressive field-by-field streaming.",
			"- NEVER nest Form inside Form — each Form should be a standalone container.",
			"- Form requires explicit buttons. Always pass a Buttons(...) reference as the third Form argument.",
			"- rules is an optional object: {required: true, email: true, minLength: 8, maxLength: 100}",
			"- Available rules: required, email, min, max, minLength, maxLength, pattern, url, numeric",
			"- The renderer shows error messages automatically — do NOT generate error text in the UI",
			"- Conditional fields: $country == \"US\" ? stateField : $country == \"UK\" ? postcodeField : addressField",
			"- Edit form in Modal: Modal(\"Edit\", $showEdit, [Form(\"edit\", Buttons([saveBtn, cancelBtn]), [fields...])]). Save button should include @Set($showEdit, false) to close modal."
		]
	},
	{
		name: "Buttons",
		components: [
			"Button",
			"Buttons",
			"IconButton"
		],
		notes: ["- Icon renders a lucide icon by kebab-case name; it is also used as the icon of IconButton, IconText and OptionCard.", "- Toggle in @Each: @Each(rows, \"t\", Button(t.status == \"open\" ? \"Close\" : \"Reopen\", Action([...])))"]
	},
	{
		name: "Data Display",
		components: [
			"TagBlock",
			"Tag",
			"Icon",
			"EntityList",
			"ListBlock",
			"ListItem"
		],
		notes: [
			"- Color-mapped Tag: Tag(value, null, \"sm\", value == \"high\" ? \"danger\" : value == \"medium\" ? \"warning\" : \"neutral\")",
			"- EntityList is a compact two-column list of { left, right } rows (e.g. name / value). size='default' also supports a header and footer row; size='small' does not.",
			"- ListBlock is a numbered or image list of ListItem references. An action on ListItem is optional."
		]
	},
	{
		name: "Cards",
		components: [
			"SnippetCardBlock",
			"SnippetCardItem",
			"OverviewCardBlock",
			"OverviewCardItem",
			"ContextCardBlock",
			"ContextCardItem",
			"CompositeCardBlock",
			"CompositeCardItem",
			"VisualCardBlock",
			"VisualCardItem",
			"Text",
			"BoldText",
			"IconText",
			"ImageText",
			"ImageTextLarge",
			"MetricIndicatorInline",
			"MetricIndicatorWithStrikethrough"
		],
		notes: [
			"- Card blocks lay out 2+ items in a responsive grid (or carousel where supported). Every item in a block must have the same structure.",
			"- SnippetCardItem: small card with lhs (IconText | ImageText) and optional rhs (Text | BoldText) — good for key/value facts.",
			"- OverviewCardItem: small card with top (IconText | ImageText | Text) and optional bottom MetricIndicatorInline — good for KPIs.",
			"- ContextCardItem: medium card with a title (string or Tag), body text and optional background image — good for summaries.",
			"- CompositeCardItem: rich card with header, body array (Text, BoldText, MetricIndicatorInline, IconText, Image, charts, ListBlock, TagBlock, EntityList) and footer (price + Button) — good for products/offers.",
			"- VisualCardItem: image-first card with a BoldText body and optional Tag.",
			"- Text / BoldText / IconText / ImageText / ImageTextLarge / MetricIndicator* are the inline building blocks used INSIDE card items; do not place them directly in the root Card."
		]
	}
];
const invLibrary = (0, _invdev_react_lang.createLibrary)({
	root: "Stack",
	componentGroups: invComponentGroups,
	components: [
		Card$1,
		CardHeader$1,
		TextContent$1,
		MarkDownRenderer$1,
		Callout$1,
		TextCallout$1,
		Image$1,
		ImageBlock$1,
		ImageGallery$1,
		CodeBlock$1,
		InlineHeader$1,
		Table$1,
		Col,
		EditableTable$1,
		BarChartCondensed$1,
		LineChartCondensed$1,
		AreaChartCondensed$1,
		RadarChart$1,
		HorizontalBarChart$1,
		Series,
		PieChart$1,
		RadialChart$1,
		SingleStackedBarChart,
		Slice,
		ScatterChart$1,
		ScatterSeries,
		Point,
		Form,
		FormControl$1,
		Label$1,
		Input$1,
		TextArea$1,
		Select$1,
		SelectItem$1,
		DatePicker$1,
		Slider$1,
		CheckBoxGroup$1,
		CheckBoxItem$1,
		RadioGroup$1,
		RadioItem$1,
		SwitchGroup$1,
		SwitchItem$1,
		ChipItem,
		Chips$1,
		OptionCard,
		OptionCards$1,
		Button$1,
		Buttons$1,
		IconButton$1,
		Stack,
		Tabs$1,
		TabItem,
		Accordion$1,
		AccordionItem$1,
		Steps$1,
		StepsItem$1,
		Carousel$1,
		Separator$1,
		TagBlock$1,
		Tag$1,
		Icon,
		EntityList$1,
		ListBlock$1,
		ListItem$1,
		Text,
		BoldText,
		IconText$1,
		ImageText$1,
		ImageTextLarge$1,
		MetricIndicatorInline$1,
		MetricIndicatorWithStrikethrough$1,
		SnippetCardItem,
		SnippetCardBlock$1,
		OverviewCardItem,
		OverviewCardBlock$1,
		ContextCardItem,
		ContextCardBlock$1,
		CompositeCardItem,
		CompositeCardBlock$1,
		VisualCardItem,
		VisualCardBlock$1,
		Modal
	]
});
//#endregion
//#region src/genui-lib/invChatLibrary.tsx
const ChatNestedContentUnion = zod_v4.z.union(ChatContentChildUnion.options.filter((o) => o !== SectionBlock.ref));
const ChatAccordionItem = (0, _invdev_react_lang.defineComponent)({
	name: "AccordionItem",
	props: zod_v4.z.object({
		value: zod_v4.z.string(),
		trigger: zod_v4.z.string(),
		content: zod_v4.z.array(ChatNestedContentUnion)
	}),
	description: "value is unique id, trigger is section title",
	component: () => null
});
const ChatAccordion = (0, _invdev_react_lang.defineComponent)({
	name: "Accordion",
	props: zod_v4.z.object({ items: zod_v4.z.array(ChatAccordionItem.ref) }),
	description: "Collapsible sections",
	component: AccordionRenderer
});
const ChatTabItem = (0, _invdev_react_lang.defineComponent)({
	name: "TabItem",
	props: zod_v4.z.object({
		value: zod_v4.z.string(),
		trigger: zod_v4.z.string(),
		content: zod_v4.z.array(zod_v4.z.union([...ChatNestedContentUnion.options, ChatAccordion.ref]))
	}),
	description: "value is unique id, trigger is tab label, content is array of components",
	component: () => null
});
const ChatTabs = (0, _invdev_react_lang.defineComponent)({
	name: "Tabs",
	props: zod_v4.z.object({ items: zod_v4.z.array(ChatTabItem.ref) }),
	description: "Tabbed container",
	component: TabsRenderer
});
const ChatCarousel = (0, _invdev_react_lang.defineComponent)({
	name: "Carousel",
	props: zod_v4.z.object({
		children: zod_v4.z.array(zod_v4.z.array(ChatNestedContentUnion)),
		variant: zod_v4.z.enum(["card", "sunk"]).optional()
	}),
	description: "Horizontal scrollable carousel",
	component: CarouselRenderer
});
const ChatSectionItem = (0, _invdev_react_lang.defineComponent)({
	name: "SectionItem",
	props: zod_v4.z.object({
		value: zod_v4.z.string(),
		trigger: zod_v4.z.string(),
		content: zod_v4.z.array(zod_v4.z.union([
			...ChatNestedContentUnion.options,
			ChatTabs.ref,
			ChatAccordion.ref
		]))
	}),
	description: "Section with a label and collapsible content — used inside SectionBlock",
	component: () => null
});
const ChatSectionBlock = (0, _invdev_react_lang.defineComponent)({
	name: "SectionBlock",
	props: zod_v4.z.object({
		sections: zod_v4.z.array(ChatSectionItem.ref),
		isFoldable: zod_v4.z.boolean().optional()
	}),
	description: "Collapsible accordion sections. Auto-opens sections as they stream in. Use SectionItem for each section.",
	component: SectionBlockRenderer
});
const ChatCardChildUnion = zod_v4.z.union([
	...ChatNestedContentUnion.options,
	ChatSectionBlock.ref,
	ChatTabs.ref,
	ChatCarousel.ref
]);
const ChatCard = (0, _invdev_react_lang.defineComponent)({
	name: "Card",
	props: zod_v4.z.object({
		children: zod_v4.z.array(ChatCardChildUnion),
		sources: zod_v4.z.array(CardSourceSchema).optional()
	}),
	description: "Vertical container for all content in a chat response. Children stack top to bottom automatically. Optional sources ([{ title, sourceName, url }]) render as a Sources strip at the bottom and back inline [n] citations in TextContent.",
	component: ({ props, renderNode }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardSourceProvider, {
		sources: props.sources,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Card, {
			width: "full",
			style: {
				display: "flex",
				flexDirection: "column",
				gap: "var(--inv-space-m)"
			},
			children: [renderNode(props.children), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Sources, {})]
		})
	})
});
const invChatComponentGroups = [
	{
		name: "Content",
		components: [
			"CardHeader",
			"TextContent",
			"MarkDownRenderer",
			"Callout",
			"TextCallout",
			"Image",
			"ImageBlock",
			"ImageGallery",
			"CodeBlock",
			"Separator",
			"InlineHeader"
		],
		notes: ["- InlineHeader is a compact heading + description pair for labelling a block inside the response (lighter than CardHeader).", "- Pass sources on Card ([{ title, sourceName, url }]) when the answer relies on references, and cite them inline in TextContent as [1], [2] (1-based index into sources). A Sources strip renders at the bottom of the card."]
	},
	{
		name: "Tables",
		components: [
			"Table",
			"Col",
			"EditableTable"
		],
		notes: ["- EditableTable lets the user edit cells inline. Give it a unique name, columns of { type, key, header } with type one of text | number | date-single | select | url (select also needs options: [{ value, label }]).", "- data is an array of { id, values } rows where values are ordered positionally to match columns. Edited data is submitted when the user clicks Save Changes."]
	},
	{
		name: "Charts (2D)",
		components: [
			"BarChart",
			"LineChart",
			"AreaChart",
			"RadarChart",
			"HorizontalBarChart",
			"Series"
		]
	},
	{
		name: "Charts (1D)",
		components: [
			"PieChart",
			"RadialChart",
			"SingleStackedBarChart",
			"Slice"
		]
	},
	{
		name: "Charts (Scatter)",
		components: [
			"ScatterChart",
			"ScatterSeries",
			"Point"
		]
	},
	{
		name: "Forms",
		components: [
			"Form",
			"FormControl",
			"Label",
			"Input",
			"TextArea",
			"Select",
			"SelectItem",
			"DatePicker",
			"Slider",
			"CheckBoxGroup",
			"CheckBoxItem",
			"RadioGroup",
			"RadioItem",
			"SwitchGroup",
			"SwitchItem",
			"Chips",
			"ChipItem",
			"OptionCards",
			"OptionCard"
		],
		notes: [
			"- Chips: compact single/multiple selection pills. Use ChipItem references for each option.",
			"- OptionCards: larger selectable cards with title, subtitle and an optional Icon or Image on top. Use OptionCard references for each option.",
			"- Define EACH FormControl as its own reference — do NOT inline all controls in one array.",
			"- NEVER nest Form inside Form.",
			"- Form requires explicit buttons. Always pass a Buttons(...) reference as the second Form argument: Form(name, buttons, fields).",
			"- rules is an optional object: { required: true, email: true, min: 8, maxLength: 100 }",
			"- The renderer shows error messages automatically — do NOT generate error text in the UI"
		]
	},
	{
		name: "Buttons",
		components: [
			"Button",
			"Buttons",
			"Icon",
			"IconButton"
		],
		notes: ["- Icon renders a lucide icon by kebab-case name; it is also used as the icon of IconButton, IconText and OptionCard."]
	},
	{
		name: "Lists & Follow-ups",
		components: [
			"ListBlock",
			"ListItem",
			"FollowUpBlock",
			"FollowUpItem"
		],
		notes: [
			"- Use ListBlock with ListItem references for numbered lists.",
			"- Use FollowUpBlock with FollowUpItem references at the end of a response to suggest next actions.",
			"- A ListItem is clickable ONLY when given an action (5th argument); without one it is plain text.",
			"- Clicking a FollowUpItem, or a ListItem with a continue_conversation action, sends text to the LLM as a user message.",
			"- Example: list = ListBlock([item1, item2])  item1 = ListItem(\"Option A\", \"Details about A\", null, null, { type: \"continue_conversation\", context: \"Option A\" })"
		]
	},
	{
		name: "Sections",
		components: ["SectionBlock", "SectionItem"],
		notes: [
			"- SectionBlock renders collapsible accordion sections that auto-open as they stream.",
			"- Each section needs a unique `value` id, a `trigger` label, and a `content` array.",
			"- Example: sections = SectionBlock([s1, s2])  s1 = SectionItem(\"intro\", \"Introduction\", [content1])",
			"- Set isFoldable=false to render sections as flat headers instead of accordion."
		]
	},
	{
		name: "Layout",
		components: [
			"Tabs",
			"TabItem",
			"Accordion",
			"AccordionItem",
			"Steps",
			"StepsItem",
			"Carousel"
		],
		notes: [
			"- Use Tabs to present alternative views — each TabItem has a value id, trigger label, and content array.",
			"- Carousel takes an array of slides, where each slide is an array of content: carousel = Carousel([[t1, img1], [t2, img2]])",
			"- IMPORTANT: Every slide in a Carousel must have the same structure — same component types in the same order.",
			"- For image carousels use: [[title, image, description, tags], ...] — every slide must follow this exact pattern.",
			"- Use real, publicly accessible image URLs (e.g. https://picsum.photos/seed/KEYWORD/800/500). Never hallucinate image URLs."
		]
	},
	{
		name: "Data Display",
		components: [
			"TagBlock",
			"Tag",
			"EntityList"
		],
		notes: ["- EntityList is a compact two-column list of { left, right } rows (e.g. name / value). size='default' also supports a header and footer row; size='small' does not."]
	},
	{
		name: "Cards",
		components: [
			"SnippetCardBlock",
			"SnippetCardItem",
			"OverviewCardBlock",
			"OverviewCardItem",
			"ContextCardBlock",
			"ContextCardItem",
			"CompositeCardBlock",
			"CompositeCardItem",
			"VisualCardBlock",
			"VisualCardItem",
			"Text",
			"BoldText",
			"IconText",
			"ImageText",
			"ImageTextLarge",
			"MetricIndicatorInline",
			"MetricIndicatorWithStrikethrough"
		],
		notes: [
			"- Card blocks lay out 2+ items in a responsive grid (or carousel where supported). Every item in a block must have the same structure.",
			"- SnippetCardItem: small card with lhs (IconText | ImageText) and optional rhs (Text | BoldText) — good for key/value facts.",
			"- OverviewCardItem: small card with top (IconText | ImageText | Text) and optional bottom MetricIndicatorInline — good for KPIs.",
			"- ContextCardItem: medium card with a title (string or Tag), body text and optional background image — good for summaries.",
			"- CompositeCardItem: rich card with header, body array (Text, BoldText, MetricIndicatorInline, IconText, Image, charts, ListBlock, TagBlock, EntityList) and footer (price + Button) — good for products/offers.",
			"- VisualCardItem: image-first card with a BoldText body and optional Tag.",
			"- Text / BoldText / IconText / ImageText / ImageTextLarge / MetricIndicator* are the inline building blocks used INSIDE card items; do not place them directly in the root Card."
		]
	}
];
const invChatLibrary = (0, _invdev_react_lang.createLibrary)({
	root: "Card",
	componentGroups: invChatComponentGroups,
	components: [
		ChatCard,
		CardHeader$1,
		TextContent$1,
		MarkDownRenderer$1,
		Callout$1,
		TextCallout$1,
		Image$1,
		ImageBlock$1,
		ImageGallery$1,
		CodeBlock$1,
		Separator$1,
		Table$1,
		Col,
		BarChartCondensed$1,
		LineChartCondensed$1,
		AreaChartCondensed$1,
		RadarChart$1,
		HorizontalBarChart$1,
		Series,
		PieChart$1,
		RadialChart$1,
		SingleStackedBarChart,
		Slice,
		ScatterChart$1,
		ScatterSeries,
		Point,
		Form,
		FormControl$1,
		Label$1,
		Input$1,
		TextArea$1,
		Select$1,
		SelectItem$1,
		DatePicker$1,
		Slider$1,
		CheckBoxGroup$1,
		CheckBoxItem$1,
		RadioGroup$1,
		RadioItem$1,
		SwitchGroup$1,
		SwitchItem$1,
		Button$1,
		Buttons$1,
		ListBlock$1,
		ListItem$1,
		FollowUpBlock$1,
		FollowUpItem$1,
		ChatSectionBlock,
		ChatSectionItem,
		ChatTabs,
		ChatTabItem,
		ChatAccordion,
		ChatAccordionItem,
		Steps$1,
		StepsItem$1,
		ChatCarousel,
		TagBlock$1,
		Tag$1,
		EntityList$1,
		InlineHeader$1,
		Icon,
		IconButton$1,
		EditableTable$1,
		ChipItem,
		Chips$1,
		OptionCard,
		OptionCards$1,
		Text,
		BoldText,
		IconText$1,
		ImageText$1,
		ImageTextLarge$1,
		MetricIndicatorInline$1,
		MetricIndicatorWithStrikethrough$1,
		SnippetCardItem,
		SnippetCardBlock$1,
		OverviewCardItem,
		OverviewCardBlock$1,
		ContextCardItem,
		ContextCardBlock$1,
		CompositeCardItem,
		CompositeCardBlock$1,
		VisualCardItem,
		VisualCardBlock$1
	]
});
//#endregion
exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.AgentInterface = AgentInterface;
exports.AreaChart = AreaChart;
exports.AreaChartCondensed = AreaChartCondensed;
exports.ArtifactNav = ArtifactNav;
exports.BarChart = BarChart;
exports.BarChartCondensed = BarChartCondensed;
exports.BehindTheScenes = BehindTheScenes;
exports.Button = Button;
exports.Buttons = Buttons;
exports.CHART_PALETTE_KEYS = CHART_PALETTE_KEYS;
exports.Calendar = Calendar;
exports.Callout = Callout;
exports.Card = Card;
exports.CardHeader = CardHeader;
exports.CardSourceContext = CardSourceContext;
exports.CardSourceProvider = CardSourceProvider;
exports.CardSourceSchema = CardSourceSchema;
exports.Carousel = Carousel;
exports.CarouselContent = CarouselContent;
exports.CarouselItem = CarouselItem;
exports.CarouselNext = CarouselNext;
exports.CarouselPrevious = CarouselPrevious;
exports.CheckBoxGroup = CheckBoxGroup;
exports.CheckBoxItem = CheckBoxItem;
exports.Chips = Chips;
exports.Citation = Citation;
exports.CitationItem = CitationItem;
exports.CodeBlock = CodeBlock;
exports.Collapsible = Collapsible;
exports.CompositeCard = CompositeCard;
exports.CompositeCardBlock = CompositeCardBlock;
exports.ContextCard = ContextCard;
exports.ContextCardBlock = ContextCardBlock;
exports.DatePicker = DatePicker;
exports.DefaultToolCard = DefaultToolCard;
exports.DetailedViewPanel = DetailedViewPanel;
exports.DetailedViewPortalTarget = DetailedViewPortalTarget;
exports.DotMatrixLoader = DotMatrixLoader;
exports.EditableTable = EditableTable;
exports.EditableTableChangesBar = EditableTableChangesBar;
exports.EntityList = EntityList;
exports.FoldableSectionContent = FoldableSectionContent;
exports.FoldableSectionItem = FoldableSectionItem;
exports.FoldableSectionRoot = FoldableSectionRoot;
exports.FoldableSectionTrigger = FoldableSectionTrigger;
exports.FollowUpBlock = FollowUpBlock;
exports.FollowUpItem = FollowUpItem;
exports.FormControl = FormControl;
exports.GalleryModal = GalleryModal;
exports.GenUIUserMessage = GenUIUserMessage;
exports.Hint = Hint;
exports.HorizontalBarChart = HorizontalBarChart;
exports.IconButton = IconButton;
exports.IconTag = IconTag;
exports.IconText = IconText;
exports.IconWrapper = IconWrapper;
exports.Image = Image;
exports.ImageBlock = ImageBlock;
exports.ImageGallery = ImageGallery;
exports.ImageText = ImageText;
exports.ImageTextLarge = ImageTextLarge;
exports.InlineHeader = InlineHeader;
exports.InlineMarkdownRenderer = InlineMarkdownRenderer;
exports.Input = Input;
exports.Label = Label;
exports.LayoutContext = LayoutContext;
exports.LayoutContextProvider = LayoutContextProvider;
exports.LineChart = LineChart;
exports.LineChartCondensed = LineChartCondensed;
exports.ListBlock = ListBlock;
exports.ListItem = ListItem;
exports.ListedSourceItem = ListedSourceItem;
exports.ListedSources = ListedSources;
exports.MarkDownRenderer = MarkDownRenderer;
exports.MetricIndicatorInline = MetricIndicatorInline;
exports.MetricIndicatorWithStrikethrough = MetricIndicatorWithStrikethrough;
exports.MiniAreaChart = MiniAreaChart;
exports.MiniBarChart = MiniBarChart;
exports.MiniLineChart = MiniLineChart;
exports.ModelSwitcher = ModelSwitcher;
exports.OptionCards = OptionCards;
exports.OverviewCardBlock = OverviewCardBlock;
exports.PieChart = PieChart;
exports.PieChartSkeleton = PieChartSkeleton;
exports.PrintContext = PrintContext;
exports.PrintContextProvider = PrintContextProvider;
exports.RadarChart = RadarChart;
exports.RadialChart = RadialChart;
exports.RadioGroup = RadioGroup;
exports.RadioItem = RadioItem;
exports.ScatterChart = ScatterChart;
exports.ScrollableTable = ScrollableTable;
exports.SectionV2 = SectionV2;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator;
exports.ShareThread = ShareThread;
exports.ShareThreadModal = ShareThreadModal;
exports.SidebarItem = SidebarItem;
exports.SingleStackedBar = SingleStackedBar;
exports.Skeleton = Skeleton;
exports.Slider = Slider;
exports.SliderBlock = SliderBlock;
exports.SnippetCardBlock = SnippetCardBlock;
exports.SourceFaviconImage = SourceFaviconImage;
exports.SourceIcon = SourceIcon;
exports.Sources = Sources;
exports.Steps = Steps;
exports.StepsItem = StepsItem;
exports.SwitchGroup = SwitchGroup;
exports.SwitchItem = SwitchItem;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.TableSkeleton = TableSkeleton;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Tag = Tag;
exports.TagBlock = TagBlock;
exports.TextArea = TextArea;
exports.TextBlockView = TextBlockView;
exports.TextCallout = TextCallout;
exports.TextContent = TextContent;
exports.TextContentCitation = TextContentCitation;
exports.TextContentWrapper = TextContentWrapper;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.TimelineEntry = TimelineEntry;
exports.TimelineToolCard = TimelineToolCard;
exports.ToolActivityRenderer = ToolActivityRenderer;
exports.ToolCall = ToolCall;
exports.ToolCallComponent = ToolCallComponent;
exports.ToolCallEntry = ToolCallEntry;
exports.ToolCallErrorFallback = ToolCallErrorFallback;
exports.ToolCallTimeline = ToolCallTimeline;
exports.ToolMessageRenderer = ToolMessageRenderer;
exports.ToolResult = ToolResult;
exports.TooltipWrapper = TooltipWrapper;
exports.VisualCard = VisualCard;
exports.VisualCardBlock = VisualCardBlock;
exports.WelcomeGlow = WelcomeGlow;
exports.artifactListPath = artifactListPath;
exports.artifactViewPath = artifactViewPath;
exports.black = black;
exports.calculateScatterDomain = calculateScatterDomain;
exports.createTheme = createTheme;
exports.defaultDarkTheme = defaultDarkTheme;
exports.defaultLabel = defaultLabel;
exports.defaultLightTheme = defaultLightTheme;
Object.defineProperty(exports, "defineArtifactRenderer", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.defineArtifactRenderer;
	}
});
exports.extractToolSources = extractToolSources;
Object.defineProperty(exports, "fetchLLM", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.fetchLLM;
	}
});
exports.formatScatterTooltipValue = formatScatterTooltipValue;
exports.getFaviconUrl = getFaviconUrl;
exports.getScatterDatasets = getScatterDatasets;
exports.isChatEmpty = isChatEmpty;
exports.isWelcomeComponent = isWelcomeComponent;
exports.openSourceInNewTab = openSourceInNewTab;
exports.invAdditionalRules = invAdditionalRules;
exports.invChatAdditionalRules = invChatAdditionalRules;
exports.invChatComponentGroups = invChatComponentGroups;
exports.invChatExamples = invChatExamples;
exports.invChatLibrary = invChatLibrary;
exports.invChatPromptOptions = invChatPromptOptions;
exports.invComponentGroups = invComponentGroups;
exports.invExamples = invExamples;
exports.invLibrary = invLibrary;
exports.invPromptOptions = invPromptOptions;
Object.defineProperty(exports, "pairToolActivity", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.pairToolActivity;
	}
});
Object.defineProperty(exports, "partialJSONParse", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.partialJSONParse;
	}
});
exports.prettyResult = prettyResult;
Object.defineProperty(exports, "restStorage", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.restStorage;
	}
});
exports.safeOpenUrl = safeOpenUrl;
exports.safeUrl = safeUrl;
exports.swatch = swatch;
exports.swatchToken = swatchToken;
exports.swatchTokens = swatchTokens;
exports.toolIcon = toolIcon;
exports.transformScatterData = transformScatterData;
Object.defineProperty(exports, "useActiveDetailedView", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.useActiveDetailedView;
	}
});
exports.useCardSourceContext = useCardSourceContext;
Object.defineProperty(exports, "useDetailedView", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.useDetailedView;
	}
});
exports.useLayoutContext = useLayoutContext;
exports.useNav = useNav;
exports.usePrintContext = usePrintContext;
exports.useSystemThemeMode = useSystemThemeMode;
exports.useTheme = useTheme;
Object.defineProperty(exports, "useToolActivities", {
	enumerable: true,
	get: function() {
		return _invdev_react_headless.useToolActivities;
	}
});
exports.useToolCall = useToolCall;
exports.white = white;
exports.withAlpha = withAlpha;
Object.keys(_invdev_react_headless).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _invdev_react_headless[k];
		}
	});
});

//# sourceMappingURL=index.cjs.map