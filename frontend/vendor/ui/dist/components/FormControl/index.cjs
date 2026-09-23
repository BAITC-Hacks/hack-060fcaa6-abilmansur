Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_context = require("../../context-CXogfcGD.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/FormControl/FormControl.tsx
const FormControl = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, hasError = false } = props;
	const formControlContextValue = (0, react.useMemo)(() => ({ hasError }), [hasError]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-form-control", className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_context.FormControlProvider, {
			value: formControlContextValue,
			children
		})
	});
});
FormControl.displayName = "FormControl";
//#endregion
//#region src/components/FormControl/Hint/Hint.tsx
const Hint = (0, react.forwardRef)(({ children, className, style, hasError, ...props }, ref) => {
	const ctx = require_context.useFormControlContext();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-hint", className, { "inv-hint-error": hasError ?? ctx?.hasError ?? false }),
		style,
		...props,
		children
	});
});
Hint.displayName = "Hint";
//#endregion
exports.FormControl = FormControl;
exports.Hint = Hint;

//# sourceMappingURL=index.cjs.map