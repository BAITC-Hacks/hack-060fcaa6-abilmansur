export interface InlineMarkdownRendererProps {
    content: string;
    className?: string;
}
/**
 * Lightweight markdown renderer for inline text (bold, italic, links, code).
 * Block-level elements (paragraphs, headings, lists) are flattened so the
 * output stays inline.
 */
export declare const InlineMarkdownRenderer: import("react").MemoExoticComponent<({ content, className }: InlineMarkdownRendererProps) => import("react").JSX.Element | null>;
//# sourceMappingURL=InlineMarkdownRenderer.d.ts.map