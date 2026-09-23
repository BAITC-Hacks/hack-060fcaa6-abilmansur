import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { InlineMarkdownRenderer } from "../InlineMarkdownRenderer";
function EntityListRowView({ row, rowType }) {
    const rightVariant = row.rightVariant ?? "text";
    return (_jsxs("div", { className: clsx("inv-entity-list__row", `inv-entity-list__row--${rowType}`), children: [_jsx("span", { className: clsx("inv-entity-list__cell-left", `inv-entity-list__cell-left--${rowType}`), children: _jsx(InlineMarkdownRenderer, { content: row.left }) }), _jsx("span", { className: clsx("inv-entity-list__cell-right", `inv-entity-list__cell-right--${rightVariant}`, `inv-entity-list__cell-right--${rowType}`), children: _jsx(InlineMarkdownRenderer, { content: row.right }) })] }));
}
/** A two-column key/value list with optional header and footer rows. */
export const EntityList = forwardRef(({ rows = [], size = "default", header, footer, className }, ref) => {
    const showHeaderFooter = size === "default";
    return (_jsxs("div", { ref: ref, className: clsx("inv-entity-list", `inv-entity-list--${size}`, className), children: [showHeaderFooter && header && _jsx(EntityListRowView, { row: header, rowType: "header" }), rows.map((row, index) => (_jsx(EntityListRowView, { row: row, rowType: "body" }, index))), showHeaderFooter && footer && _jsx(EntityListRowView, { row: footer, rowType: "footer" })] }));
});
EntityList.displayName = "EntityList";
//# sourceMappingURL=EntityList.js.map