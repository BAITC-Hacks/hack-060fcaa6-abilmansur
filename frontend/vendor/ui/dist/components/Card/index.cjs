Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Card/Card.tsx
const variantMap = {
	clear: "inv-card-clear",
	card: "inv-card-card",
	sunk: "inv-card-sunk"
};
const widthMap = {
	standard: "inv-card-standard",
	full: "inv-card-full"
};
const Card = react.default.forwardRef((props, ref) => {
	const { className, children, variant = "card", width = "standard", ...rest } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-card", className, variantMap[variant], widthMap[width]),
		...rest,
		children
	});
});
Card.displayName = "Card";
//#endregion
exports.Card = Card;

//# sourceMappingURL=index.cjs.map