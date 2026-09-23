Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_TextBlock_index = require("../TextBlock/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TextBlock_index.TextBlockView, {
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
exports.ImageTextLarge = ImageTextLarge;

//# sourceMappingURL=index.cjs.map