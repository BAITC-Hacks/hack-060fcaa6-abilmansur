const require_chunk = require("./chunk-CKQMccvm.cjs");
const require_components_IconButton_index = require("./components/IconButton/index.cjs");
const require_ThemeProvider = require("./ThemeProvider-sEZdBvkV.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
let react_dom = require("react-dom");
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
const isRunning = (status) => status === "streaming" || status === "executing";
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
	const spin = isRunning(activity.status) && isLast && running;
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
	const shimmer = isRunning(activity.status) && isLast && running;
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
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
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
const propsEqual = (a, b) => a.activity.status === b.activity.status && a.activity.toolCall.function.arguments === b.activity.toolCall.function.arguments && a.activity.result === b.activity.result && a.activity.isError === b.activity.isError && a.isLast === b.isLast && a.forceDefault === b.forceDefault && a.fallbackToDefault === b.fallbackToDefault && a.detailedViewPanel === b.detailedViewPanel;
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
}, propsEqual);
//#endregion
Object.defineProperty(exports, "DefaultToolCard", {
	enumerable: true,
	get: function() {
		return DefaultToolCard;
	}
});
Object.defineProperty(exports, "DetailedViewPanel", {
	enumerable: true,
	get: function() {
		return DetailedViewPanel;
	}
});
Object.defineProperty(exports, "SourceIcon", {
	enumerable: true,
	get: function() {
		return SourceIcon;
	}
});
Object.defineProperty(exports, "TimelineEntry", {
	enumerable: true,
	get: function() {
		return TimelineEntry;
	}
});
Object.defineProperty(exports, "TimelineToolCard", {
	enumerable: true,
	get: function() {
		return TimelineToolCard;
	}
});
Object.defineProperty(exports, "ToolActivityRenderer", {
	enumerable: true,
	get: function() {
		return ToolActivityRenderer;
	}
});
Object.defineProperty(exports, "ToolCall", {
	enumerable: true,
	get: function() {
		return ToolCall;
	}
});
Object.defineProperty(exports, "ToolCallErrorFallback", {
	enumerable: true,
	get: function() {
		return ToolCallErrorFallback;
	}
});
Object.defineProperty(exports, "defaultLabel", {
	enumerable: true,
	get: function() {
		return defaultLabel;
	}
});
Object.defineProperty(exports, "extractToolSources", {
	enumerable: true,
	get: function() {
		return extractToolSources;
	}
});
Object.defineProperty(exports, "prettyResult", {
	enumerable: true,
	get: function() {
		return prettyResult;
	}
});
Object.defineProperty(exports, "toolIcon", {
	enumerable: true,
	get: function() {
		return toolIcon;
	}
});
Object.defineProperty(exports, "useToolCall", {
	enumerable: true,
	get: function() {
		return useToolCall;
	}
});

//# sourceMappingURL=TimelineEntry-Bcs12tlk.cjs.map