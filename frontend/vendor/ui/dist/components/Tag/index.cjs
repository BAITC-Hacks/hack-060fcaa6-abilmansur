Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Tag/Tag.tsx
const sizeMap = {
	sm: "inv-tag-sm",
	md: "inv-tag-md",
	lg: "inv-tag-lg"
};
const variantMap = {
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
		className: (0, clsx.default)("inv-tag", sizeMap[size], variantMap[variant], className),
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
exports.Tag = Tag;

//# sourceMappingURL=index.cjs.map