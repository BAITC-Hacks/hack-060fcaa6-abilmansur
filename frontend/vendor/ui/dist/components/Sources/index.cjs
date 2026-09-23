Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_IconButton_index = require("../IconButton/index.cjs");
const require_components_Carousel_index = require("../Carousel/index.cjs");
const require_SourceFaviconImage = require("../../SourceFaviconImage-D7ScyWkB.cjs");
const require_SourceContext = require("../../SourceContext-BYJenojd.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Sources/SourcesItem.tsx
const ListedSourceItem = (0, react.memo)((props) => {
	const { title, sourceName, onClick, faviconUrl, url, sourceId } = props;
	const handleClick = () => {
		require_SourceContext.openSourceInNewTab(url);
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
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SourceFaviconImage.SourceFaviconImage, {
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
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
					variant: "secondary",
					size: "small",
					onClick: () => ref.current?.scroll("left"),
					disabled: !scroll.left,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, {})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
					variant: "secondary",
					size: "small",
					onClick: () => ref.current?.scroll("right"),
					disabled: !scroll.right,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, {})
				})]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Carousel_index.Carousel, {
			variant: "sunk",
			ref,
			showButtons: false,
			onScrollLeftEnabled: handleScrollLeftEnabled,
			onScrollRightEnabled: handleScrollRightEnabled,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Carousel_index.CarouselContent, { children: sources.map((item, index) => {
				const { key: _key, ...rest } = item;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Carousel_index.CarouselItem, {
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
	const sources = require_SourceContext.useCardSourceContext();
	if (!sources.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ListedSources, { sources });
});
Sources.displayName = "Sources";
//#endregion
exports.CardSourceContext = require_SourceContext.CardSourceContext;
exports.CardSourceProvider = require_SourceContext.CardSourceProvider;
exports.CardSourceSchema = require_SourceContext.CardSourceSchema;
exports.ListedSourceItem = ListedSourceItem;
exports.ListedSources = ListedSources;
exports.Sources = Sources;
exports.getFaviconUrl = require_SourceContext.getFaviconUrl;
exports.openSourceInNewTab = require_SourceContext.openSourceInNewTab;
exports.useCardSourceContext = require_SourceContext.useCardSourceContext;

//# sourceMappingURL=index.cjs.map