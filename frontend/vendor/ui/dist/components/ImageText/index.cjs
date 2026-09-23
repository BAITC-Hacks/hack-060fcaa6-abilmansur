Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_TextBlock_index = require("../TextBlock/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TextBlock_index.TextBlockView, {
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
exports.ImageText = ImageText;

//# sourceMappingURL=index.cjs.map