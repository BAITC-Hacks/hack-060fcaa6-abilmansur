Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
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
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, {
				content: primary,
				className: "inv-text-block__primary"
			}),
			secondary && (secondaryStyle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: secondaryClassName,
				style: secondaryStyle,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: secondary })
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, {
				content: secondary,
				className: secondaryClassName
			})),
			tertiary && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, {
				content: tertiary,
				className: "inv-text-block__tertiary"
			})
		]
	});
});
TextBlockView.displayName = "TextBlockView";
//#endregion
exports.TextBlockView = TextBlockView;

//# sourceMappingURL=index.cjs.map