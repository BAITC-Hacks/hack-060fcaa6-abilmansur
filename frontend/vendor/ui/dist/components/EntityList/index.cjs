Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/EntityList/EntityList.tsx
function EntityListRowView({ row, rowType }) {
	const rightVariant = row.rightVariant ?? "text";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-entity-list__row", `inv-entity-list__row--${rowType}`),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)("inv-entity-list__cell-left", `inv-entity-list__cell-left--${rowType}`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: row.left })
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)("inv-entity-list__cell-right", `inv-entity-list__cell-right--${rightVariant}`, `inv-entity-list__cell-right--${rowType}`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InlineMarkdownRenderer.InlineMarkdownRenderer, { content: row.right })
		})]
	});
}
/** A two-column key/value list with optional header and footer rows. */
const EntityList = (0, react.forwardRef)(({ rows = [], size = "default", header, footer, className }, ref) => {
	const showHeaderFooter = size === "default";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref,
		className: (0, clsx.default)("inv-entity-list", `inv-entity-list--${size}`, className),
		children: [
			showHeaderFooter && header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row: header,
				rowType: "header"
			}),
			rows.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row,
				rowType: "body"
			}, index)),
			showHeaderFooter && footer && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EntityListRowView, {
				row: footer,
				rowType: "footer"
			})
		]
	});
});
EntityList.displayName = "EntityList";
//#endregion
exports.EntityList = EntityList;

//# sourceMappingURL=index.cjs.map