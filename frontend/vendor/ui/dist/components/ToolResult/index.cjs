Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/ToolResult/ToolResult.tsx
const ToolResult = ({ message, toolName, className }) => {
	const [isExpanded, setIsExpanded] = (0, react.useState)(false);
	const hasError = !!message.error;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-tool-result", className, { "inv-tool-result--error": hasError }),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			className: "inv-tool-result__header",
			onClick: () => setIsExpanded(!isExpanded),
			type: "button",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-tool-result__header-left",
				children: [hasError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.AlertCircle, {
					size: 14,
					className: "inv-tool-result__icon--error"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.CheckCircle2, {
					size: 14,
					className: "inv-tool-result__icon--success"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "inv-tool-result__label",
					children: toolName ? `${toolName} result` : "Tool result"
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronDown, {
				size: 14,
				className: (0, clsx.default)("inv-tool-result__chevron", { "inv-tool-result__chevron--expanded": isExpanded })
			})]
		}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-tool-result__content",
			children: [hasError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-tool-result__error",
				children: message.error
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: "inv-tool-result__output",
				children: message.content
			})]
		})]
	});
};
//#endregion
exports.ToolResult = ToolResult;

//# sourceMappingURL=index.cjs.map