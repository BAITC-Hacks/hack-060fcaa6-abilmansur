Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/SwitchGroup/SwitchGroup.tsx
const variants = {
	clear: "inv-switch-group-clear",
	card: "inv-switch-group-card",
	sunk: "inv-switch-group-sunk"
};
const SwitchGroup = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, variant = "clear" } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-switch-group", variants[variant], className),
		style,
		children
	});
});
SwitchGroup.displayName = "SwitchGroup";
//#endregion
exports.SwitchGroup = SwitchGroup;

//# sourceMappingURL=index.cjs.map