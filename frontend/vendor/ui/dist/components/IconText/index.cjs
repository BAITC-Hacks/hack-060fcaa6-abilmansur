Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_IconTag_index = require("../IconTag/index.cjs");
const require_components_TextBlock_index = require("../TextBlock/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
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
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconTag_index.IconTag, {
		icon,
		variant: normalizeIconVariant(iconVariant),
		size: "l"
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-icon-text__content",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TextBlock_index.TextBlockView, {
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
exports.IconText = IconText;

//# sourceMappingURL=index.cjs.map