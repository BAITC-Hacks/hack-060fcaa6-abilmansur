Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Callout/Callout.tsx
const variantMap = {
	info: "inv-callout-info",
	danger: "inv-callout-danger",
	warning: "inv-callout-warning",
	success: "inv-callout-success",
	neutral: "inv-callout-neutral"
};
const Callout = react.default.forwardRef((props, ref) => {
	const { className, variant = "neutral", title, description, duration, style, ...rest } = props;
	const dismissStyle = duration ? {
		...style,
		"--callout-duration": `${duration}ms`
	} : style;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-callout", variantMap[variant], duration && "inv-callout-autodismiss", className),
		style: dismissStyle,
		...rest,
		children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-callout-title",
			children: title
		}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-callout-description",
			children: description
		})]
	});
});
//#endregion
exports.Callout = Callout;

//# sourceMappingURL=index.cjs.map