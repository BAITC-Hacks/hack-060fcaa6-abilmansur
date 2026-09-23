Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_IconWrapper = require("../../IconWrapper-CWrIgsEo.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/IconTag/IconTag.tsx
/** Small icon badge used inside card primitives. */
const IconTag = (0, react.forwardRef)(({ icon, size = "m", variant = "neutral", className }, ref) => {
	if (!icon?.name) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-icon-tag", `inv-icon-tag--${size}`, `inv-icon-tag--${variant}`, className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_IconWrapper.IconWrapper, {
			name: icon.name,
			category: icon.category
		})
	});
});
IconTag.displayName = "IconTag";
//#endregion
exports.IconTag = IconTag;

//# sourceMappingURL=index.cjs.map