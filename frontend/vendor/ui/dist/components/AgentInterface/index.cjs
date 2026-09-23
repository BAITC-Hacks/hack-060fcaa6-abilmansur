Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_IconButton_index = require("../IconButton/index.cjs");
const require_GenUIUserMessage = require("../../GenUIUserMessage-BAAvzqr0.cjs");
const require_store = require("../../store-Ba3AZJcS.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
const require_components_Button_index = require("../Button/index.cjs");
const require_components_DotMatrixLoader_index = require("../DotMatrixLoader/index.cjs");
const require_LayoutContext = require("../../LayoutContext-C4CXVpV3.cjs");
const require_components_Carousel_index = require("../Carousel/index.cjs");
const require_ToolCall = require("../../ToolCall-C34iu6uq.cjs");
const require_TimelineEntry = require("../../TimelineEntry-Bcs12tlk.cjs");
const require_components_MarkDownRenderer_index = require("../MarkDownRenderer/index.cjs");
const require_useMultipleRefs = require("../../useMultipleRefs-Cxs4cq1H.cjs");
const require_components_Callout_index = require("../Callout/index.cjs");
const require_components_Skeleton_index = require("../Skeleton/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
react = require_chunk.__toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
let _invdev_react_headless = require("@inv/headless");
let _invdev_react_lang = require("@inv/lang");
let zustand = require("zustand");
let zustand_react_shallow = require("zustand/react/shallow");
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = require_chunk.__toESM(_radix_ui_react_tooltip);
let _radix_ui_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
_radix_ui_react_dropdown_menu = require_chunk.__toESM(_radix_ui_react_dropdown_menu);
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
	const { logoUrl, showAssistantLogo } = require_store.useShellStore((store) => ({
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
	const { content, contextString, contentHeader } = (0, react.useMemo)(() => message.content ? require_GenUIUserMessage.separateContentAndContext(message.content) : {
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
		const contentPart = require_GenUIUserMessage.wrapContentWithHeader(content ?? "", contentHeader);
		const fullMessage = hasState ? contentPart + require_GenUIUserMessage.wrapContext(JSON.stringify([state])) : contentPart;
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
			const contentPart = event.humanFriendlyMessage ? require_GenUIUserMessage.wrapContent(event.humanFriendlyMessage) : "";
			const messageCtx = [`User clicked: ${event.humanFriendlyMessage}`];
			if (event.formState) messageCtx.push(event.formState);
			processMessage({
				role: "user",
				content: `${contentPart}${require_GenUIUserMessage.wrapContext(JSON.stringify(messageCtx))}`
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
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
						search && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
							!debouncedSearch && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_DotMatrixLoader_index.DotMatrixLoader, {})
					}),
					!isLoading && nextCursor !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-agent-artifact-browser__load-more",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
	const { layout } = require_LayoutContext.useLayoutContext() || {};
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	const layoutCtx = require_LayoutContext.useLayoutContext();
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_DotMatrixLoader_index.DotMatrixLoader, {})
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
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
				artifact && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
const isChatEmpty = ({ isLoadingMessages, messages }) => {
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
	(0, react.useEffect)(() => {
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
	const [textContent, setTextContent] = (0, react.useState)("");
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
	const { layout } = require_LayoutContext.useLayoutContext();
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
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	if (!isChatEmpty({
		isLoadingMessages,
		messages
	})) return null;
	if (starters.length === 0) return null;
	if (variant === "short") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Carousel_index.Carousel, {
		showButtons: false,
		className: (0, clsx.default)("inv-agent-conversation-starter", "inv-agent-conversation-starter--short", className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Carousel_index.CarouselContent, {
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
	const showStarters = isChatEmpty({
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
	const [size, setSize] = (0, react.useState)({
		width: 0,
		height: 0
	});
	(0, react.useEffect)(() => {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_store.ShellStoreProvider, {
			logoUrl,
			agentName,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_LayoutContext.LayoutContextProvider, {
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
	const defaultMenuButton = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	const defaultNewChatButton = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	const { layout } = require_LayoutContext.useLayoutContext();
	const isMobile = layout === "mobile";
	const handleNewChat = (e) => {
		e.stopPropagation();
		switchToNewThread();
		if (nav && nav.path !== void 0) nav.navigate(void 0);
	};
	if (isMobile) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
	const previousLastMessage = (0, react.useRef)(null);
	const lastUserMessage = (0, react.useRef)(null);
	const hasUserScrolledWhenIsRunning = (0, react.useRef)(false);
	const wasScrolledToBottomAfterLoading = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
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
	const scrollToBottom = (0, react.useCallback)(() => {
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
	(0, react.useEffect)(() => {
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
	const mergedRef = require_useMultipleRefs.useMultipleRefs(ref, internalRef);
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_DotMatrixLoader_index.DotMatrixLoader, {})
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
	const [isDragging, setIsDragging] = (0, react.useState)(false);
	const containerRef = (0, react.useRef)(null);
	const chatPanelRef = (0, react.useRef)(null);
	const detailedViewPanelRef = (0, react.useRef)(null);
	const widthRef = (0, react.useRef)(INITIAL_CHAT_WIDTH);
	(0, react.useEffect)(() => {
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
	const setChatWidth = (0, react.useCallback)((width) => {
		if (!chatPanelRef.current) return;
		chatPanelRef.current.style.width = `${width}px`;
		widthRef.current = width;
	}, []);
	const handleResize = (0, react.useCallback)((clientX) => {
		if (!containerRef.current) return;
		const containerRect = containerRef.current.getBoundingClientRect();
		if (containerRect.width <= 0) return;
		const newWidthPx = clientX - containerRect.left;
		const maxWidthPx = containerRect.width * MAX_CHAT_WIDTH_RATIO;
		setChatWidth(Math.min(Math.max(newWidthPx, MIN_CHAT_WIDTH), maxWidthPx));
	}, [setChatWidth]);
	const handleResizeStep = (0, react.useCallback)((deltaPx) => {
		if (!containerRef.current) return;
		const containerWidth = containerRef.current.getBoundingClientRect().width;
		if (containerWidth <= 0) return;
		const maxWidthPx = containerWidth * MAX_CHAT_WIDTH_RATIO;
		setChatWidth(Math.min(Math.max(widthRef.current + deltaPx, MIN_CHAT_WIDTH), maxWidthPx));
	}, [setChatWidth]);
	const getResizeAria = (0, react.useCallback)(() => {
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
		handleDragStart: (0, react.useCallback)(() => {
			setIsDragging(true);
		}, []),
		handleDragEnd: (0, react.useCallback)(() => {
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
		const { content: humanText } = require_GenUIUserMessage.separateContentAndContext(content);
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
	const { layout } = require_LayoutContext.useLayoutContext();
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
	const { layout } = require_LayoutContext.useLayoutContext();
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [message.content && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_MarkDownRenderer_index.MarkDownRenderer, {
		textMarkdown: message.content,
		className: "inv-agent-thread-message-assistant__text"
	}), activities.map((activity, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.TimelineEntry, {
		activity,
		isLast: isLast && idx === activities.length - 1,
		detailedViewPanel: require_TimelineEntry.DetailedViewPanel
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_DotMatrixLoader_index.DotMatrixLoader, { variant: "compact" })
	});
};
const ThreadError = () => {
	const threadError = (0, _invdev_react_headless.useThread)((s) => s.threadError);
	if (!threadError) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-error",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Callout_index.Callout, {
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
	const lastContent = require_GenUIUserMessage.separateContentAndContext(last.content ?? "").content;
	const answer = !turnLive || require_GenUIUserMessage.hasLangSyntax(lastContent) ? last : null;
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
				const prose = require_GenUIUserMessage.separateContentAndContext(seg.content ?? "").content;
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
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ToolCall.ToolCallTimeline, {
			activities: turnActivities,
			steps,
			isLast: turnLive,
			forceDefault: true,
			awaitingResponse: turnLive && !answerStarted
		})),
		matched.map((activity) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TimelineEntry.TimelineEntry, {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Skeleton_index.Skeleton, {
			height: "12px",
			width: "48px"
		})
	}), THREAD_SKELETON_WIDTHS.map((width, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-agent-thread-list-skeleton__row",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Skeleton_index.Skeleton, {
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
	const { layout } = require_LayoutContext.useLayoutContext();
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
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
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
	if (!isChatEmpty({
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
	const { layout } = require_LayoutContext.useLayoutContext();
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
			const Cmp = ({ message }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GenUIUserMessage.GenUIUserMessage, { message });
			return Cmp;
		}
	}, [components?.UserMessage, componentLibrary]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(disableThemeProvider ? DummyThemeProvider : require_ThemeProvider.ThemeProvider, {
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
		menuButton: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
		newChatButton: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
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
exports.AgentInterface = AgentInterface;
exports.ArtifactNav = ArtifactNav;
exports.SidebarItem = SidebarItem;
exports.WelcomeGlow = WelcomeGlow;
exports.artifactListPath = artifactListPath;
exports.artifactViewPath = artifactViewPath;
exports.useNav = useNav;

//# sourceMappingURL=index.cjs.map