const require_chunk = require("./chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("./ThemeProvider-sEZdBvkV.cjs");
const require_usePinnableTooltip = require("./usePinnableTooltip-CHTGA15A.cjs");
const require_IconWrapper = require("./IconWrapper-CWrIgsEo.cjs");
const require_SourceFaviconImage = require("./SourceFaviconImage-D7ScyWkB.cjs");
const require_SourceContext = require("./SourceContext-BYJenojd.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = require_chunk.__toESM(_radix_ui_react_tooltip);
//#region src/components/Citation/CitationItem.tsx
const CitationItem = (0, react.memo)((props) => {
	const { title, sourceName, onClick, faviconUrl, url } = props;
	const handleClick = () => {
		require_SourceContext.openSourceInNewTab(url);
		onClick?.();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		className: (0, clsx.default)("inv-citation-item", { "inv-citation-item--has-url": url && url.trim() !== "" }),
		onClick: handleClick,
		type: "button",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-citation-item__logo",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SourceFaviconImage.SourceFaviconImage, {
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
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
	const { isOpen, handleMouseEnter, handleMouseLeave, handleTriggerClick, handleContentClick, closeTooltip, getPointerDownOutsideHandler } = require_usePinnableTooltip.usePinnableTooltip();
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
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_IconWrapper.IconWrapper, {
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
	const sources = require_SourceContext.useCardSourceContext();
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
Object.defineProperty(exports, "Citation", {
	enumerable: true,
	get: function() {
		return Citation;
	}
});
Object.defineProperty(exports, "CitationItem", {
	enumerable: true,
	get: function() {
		return CitationItem;
	}
});
Object.defineProperty(exports, "TextContentCitation", {
	enumerable: true,
	get: function() {
		return TextContentCitation;
	}
});

//# sourceMappingURL=Citation-BVJr-M7W.cjs.map