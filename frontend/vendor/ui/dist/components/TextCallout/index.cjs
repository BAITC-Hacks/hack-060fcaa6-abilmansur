Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/TextCallout/TextCallout.tsx
const variantMap = {
	neutral: "inv-text-callout-neutral",
	info: "inv-text-callout-info",
	warning: "inv-text-callout-warning",
	success: "inv-text-callout-success",
	danger: "inv-text-callout-danger"
};
const TextCallout = react.default.forwardRef((props, ref) => {
	const { className, variant = "neutral", title, description, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-text-callout", variantMap[variant], className),
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-text-callout-content",
			children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-text-callout-content-title",
				children: title
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-text-callout-content-description",
				children: description
			})]
		})
	});
});
//#endregion
exports.TextCallout = TextCallout;

//# sourceMappingURL=index.cjs.map