Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _radix_ui_react_slot = require("@radix-ui/react-slot");
//#region src/components/IconButton/IconButton.tsx
const normalIconButtonVariants = {
	primary: "inv-icon-button-primary",
	secondary: "inv-icon-button-secondary",
	tertiary: "inv-icon-button-tertiary"
};
const destructiveIconButtonVariants = {
	primary: "inv-icon-button-destructive-primary",
	secondary: "inv-icon-button-destructive-secondary",
	tertiary: "inv-icon-button-destructive-tertiary"
};
const iconButtonSizes = {
	"3-extra-small": "inv-icon-button-3-extra-small",
	"2-extra-small": "inv-icon-button-2-extra-small",
	"extra-small": "inv-icon-button-extra-small",
	small: "inv-icon-button-small",
	medium: "inv-icon-button-medium",
	large: "inv-icon-button-large"
};
const iconButtonShapes = {
	square: "inv-icon-button-square",
	circle: "inv-icon-button-circle"
};
const IconButton = (0, react.forwardRef)((props, ref) => {
	const { className, icon, variant = "primary", size = "medium", shape = "square", appearance = "normal", asChild = false, children, ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(asChild ? _radix_ui_react_slot.Slot : "button", {
		ref,
		className: (0, clsx.default)("inv-icon-button", (appearance === "normal" ? normalIconButtonVariants : destructiveIconButtonVariants)[variant], iconButtonSizes[size], iconButtonShapes[shape], className),
		...rest,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_slot.Slottable, { children }), icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-icon-button-icon",
			children: icon
		})]
	});
});
IconButton.displayName = "IconButton";
//#endregion
exports.IconButton = IconButton;

//# sourceMappingURL=index.cjs.map