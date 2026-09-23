Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let _radix_ui_react_accordion = require("@radix-ui/react-accordion");
_radix_ui_react_accordion = require_chunk.__toESM(_radix_ui_react_accordion);
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Accordion/Accordion.tsx
const variantMap = {
	clear: "inv-accordion-clear",
	card: "inv-accordion-card",
	sunk: "inv-accordion-sunk"
};
const Accordion = (0, react.forwardRef)(({ className, style, variant = "clear", ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Root, {
	ref,
	className: (0, clsx.default)("inv-accordion", variantMap[variant], className),
	style,
	...props
}));
const AccordionItem = (0, react.forwardRef)(({ className, style, value, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Item, {
	ref,
	className: (0, clsx.default)("inv-accordion-item", className),
	style,
	value,
	...props
}));
const AccordionTrigger = (0, react.forwardRef)(({ className, style, text, icon, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Header, {
	className: (0, clsx.default)("inv-accordion-header"),
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_radix_ui_react_accordion.Trigger, {
		ref,
		className: (0, clsx.default)("inv-accordion-trigger", className),
		style,
		...props,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-accordion-trigger-content",
			children: [icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-accordion-trigger-content-icon",
				children: icon
			}), text]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDownIcon, { className: "inv-accordion-trigger-icon" })]
	})
}));
const AccordionContent = (0, react.forwardRef)(({ className, style, children, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_radix_ui_react_accordion.Content, {
	ref,
	className: (0, clsx.default)("inv-accordion-content", className),
	style,
	...props,
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-accordion-content-wrapper",
		children
	})
}));
//#endregion
exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;

//# sourceMappingURL=index.cjs.map