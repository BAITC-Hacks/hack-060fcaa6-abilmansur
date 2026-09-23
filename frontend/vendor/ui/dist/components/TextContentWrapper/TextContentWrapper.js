import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkCitations } from "../_shared/remark/remarkCitations";
import { TextContentCitation } from "../Citation";
import { InlineHeader } from "../InlineHeader";
import { MarkDownRenderer } from "../MarkDownRenderer";
import { useTheme } from "../ThemeProvider";
/**
 * Full-featured markdown block for chat responses: GFM, math (KaTeX),
 * line breaks, and inline `[n]` citations resolved against the enclosing
 * `CardSourceProvider`.
 */
export const TextContentWrapper = memo((props) => {
    const { mode } = useTheme();
    const [rehypeKatex, setRehypeKatex] = useState(null);
    useEffect(() => {
        let cancelled = false;
        import("rehype-katex").then((m) => {
            if (!cancelled)
                setRehypeKatex(() => m.default);
        });
        return () => {
            cancelled = true;
        };
    }, []);
    return (_jsxs("div", { className: clsx("inv-text-content", props.className), children: [props.header && (_jsx(InlineHeader, { heading: props.header.heading, description: props.header.description })), _jsx(MarkDownRenderer, { textMarkdown: props.textMarkdown, variant: props.variant, options: {
                    remarkPlugins: [
                        // singleTilde: false → only ~~double tildes~~ render as strikethrough.
                        // A lone ~ (e.g. "~$886K" meaning "approximately") stays literal instead
                        // of being parsed as a strikethrough delimiter, which otherwise strikes
                        // through everything between two such tildes in a sentence.
                        [remarkGfm, { singleTilde: false }],
                        [remarkMath, { singleDollarTextMath: false }],
                        [remarkBreaks, { breaks: true }],
                        remarkCitations,
                    ],
                    rehypePlugins: rehypeKatex ? [rehypeKatex] : [],
                    components: {
                        span: TextContentCitation,
                    },
                }, className: clsx("inv-text-content-markdown", {
                    "inv-text-content-markdown-dark-mode": mode === "dark",
                }) })] }));
});
TextContentWrapper.displayName = "TextContentWrapper";
//# sourceMappingURL=TextContentWrapper.js.map