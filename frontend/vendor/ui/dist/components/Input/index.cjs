Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_context = require("../../context-CXogfcGD.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Input/Input.tsx
const sizes = {
	small: "inv-input-small",
	medium: "inv-input-medium",
	large: "inv-input-large"
};
const Input = react.default.forwardRef(({ className, styles, size = "medium", hasError, ...props }, ref) => {
	const ctx = require_context.useFormControlContext();
	const resolvedHasError = hasError ?? ctx?.hasError ?? false;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
		autoComplete: "off",
		ref,
		className: (0, clsx.default)("inv-input", sizes[size], className, { "inv-input-error": resolvedHasError }),
		style: styles,
		...props
	});
});
Input.displayName = "Input";
//#endregion
exports.Input = Input;

//# sourceMappingURL=index.cjs.map