import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { memo } from "react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { remarkCitations } from "../_shared/remark/remarkCitations";
import { TextContentCitation } from "../Citation";
import { MarkDownRenderer } from "../MarkDownRenderer";
import { useTheme } from "../ThemeProvider";
const Fragment = ({ children }) => children;
/**
 * Lightweight markdown renderer for inline text (bold, italic, links, code).
 * Block-level elements (paragraphs, headings, lists) are flattened so the
 * output stays inline.
 */
export const InlineMarkdownRenderer = memo(({ content, className }) => {
    const { mode } = useTheme();
    if (!content) {
        return null;
    }
    return (_jsx("span", { className: clsx("inv-inline-markdown-renderer", className, {
            "inv-inline-markdown-renderer--dark": mode === "dark",
        }), children: _jsx(MarkDownRenderer, { textMarkdown: content, options: {
                remarkPlugins: [
                    remarkCitations,
                    [remarkBreaks, { breaks: false }],
                    [remarkGfm, { singleTilde: false }],
                ],
                components: {
                    p: Fragment,
                    h1: Fragment,
                    h2: Fragment,
                    h3: Fragment,
                    h4: Fragment,
                    h5: Fragment,
                    h6: Fragment,
                    ul: Fragment,
                    ol: Fragment,
                    li: Fragment,
                    span: TextContentCitation,
                },
            } }) }));
});
InlineMarkdownRenderer.displayName = "InlineMarkdownRenderer";
//# sourceMappingURL=InlineMarkdownRenderer.js.map