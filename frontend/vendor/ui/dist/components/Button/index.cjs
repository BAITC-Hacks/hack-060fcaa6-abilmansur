Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Button/Button.tsx
const normalVariantMap = {
	primary: "inv-button-base-primary",
	secondary: "inv-button-base-secondary",
	tertiary: "inv-button-base-tertiary"
};
const destructiveVariantMap = {
	primary: "inv-button-base-destructive-primary",
	secondary: "inv-button-base-destructive-secondary",
	tertiary: "inv-button-base-destructive-tertiary"
};
const sizeMap = {
	"extra-small": "inv-button-base-extra-small",
	small: "inv-button-base-small",
	medium: "inv-button-base-medium",
	large: "inv-button-base-large"
};
const Button = (0, react.forwardRef)(({ children, variant = "primary", size = "medium", iconLeft, iconRight, className, buttonType = "normal", ...props }, ref) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		ref,
		className: (0, clsx.default)("inv-button-base", (buttonType === "destructive" ? destructiveVariantMap : normalVariantMap)[variant], sizeMap[size], className),
		...props,
		children: [
			iconLeft,
			children,
			iconRight
		]
	});
});
Button.displayName = "Button";
//#endregion
exports.Button = Button;

//# sourceMappingURL=index.cjs.map