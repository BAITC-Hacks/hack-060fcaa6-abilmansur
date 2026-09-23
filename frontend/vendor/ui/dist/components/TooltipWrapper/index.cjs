Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
let _radix_ui_react_tooltip = require("@radix-ui/react-tooltip");
_radix_ui_react_tooltip = require_chunk.__toESM(_radix_ui_react_tooltip);
//#region src/components/TooltipWrapper/TooltipWrapper.tsx
const TooltipWrapper = ({ tooltipHeading, tooltipContent, children, className, side = "bottom", align = "start", sideOffset = 5, alignOffset = 0, delayDuration = 100, showOnlyWhenTruncated = false, headingSelector, contentSelector }) => {
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
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
exports.TooltipWrapper = TooltipWrapper;

//# sourceMappingURL=index.cjs.map