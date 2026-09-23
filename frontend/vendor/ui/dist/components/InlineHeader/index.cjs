Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/InlineHeader/InlineHeader.tsx
const InlineHeader = ({ heading, description, className }) => {
	if (!heading && !description) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-inline-header", className),
		children: [heading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-inline-header-heading",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: heading })
		}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-inline-header-description",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: description })
		})]
	});
};
//#endregion
exports.InlineHeader = InlineHeader;

//# sourceMappingURL=index.cjs.map