Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let _radix_ui_react_radio_group = require("@radix-ui/react-radio-group");
_radix_ui_react_radio_group = require_chunk.__toESM(_radix_ui_react_radio_group);
//#region src/components/RadioGroup/RadioGroup.tsx
const variants = {
	clear: "inv-radio-group-clear",
	card: "inv-radio-group-card",
	sunk: "inv-radio-group-sunk"
};
const RadioGroup = (0, react.forwardRef)((props, ref) => {
	const { children, className, style, variant = "clear", ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_radio_group.Root, {
		ref,
		className: (0, clsx.default)("inv-radio-group", variants[variant], className),
		style,
		...rest,
		children
	});
});
RadioGroup.displayName = "RadioGroup";
//#endregion
exports.RadioGroup = RadioGroup;

//# sourceMappingURL=index.cjs.map