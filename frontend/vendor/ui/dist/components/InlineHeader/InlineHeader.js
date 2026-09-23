import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { InlineMarkdownRenderer } from "../InlineMarkdownRenderer";
export const InlineHeader = ({ heading, description, className }) => {
    if (!heading && !description)
        return null;
    return (_jsxs("div", { className: clsx("inv-inline-header", className), children: [heading && (_jsx("div", { className: "inv-inline-header-heading", children: _jsx(InlineMarkdownRenderer, { content: heading }) })), description && (_jsx("div", { className: "inv-inline-header-description", children: _jsx(InlineMarkdownRenderer, { content: description }) }))] }));
};
//# sourceMappingURL=InlineHeader.js.map