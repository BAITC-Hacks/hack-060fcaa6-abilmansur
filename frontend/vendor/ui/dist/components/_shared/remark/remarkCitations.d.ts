/**
 * # remarkCitations
 *
 * Remark plugin that transforms citation patterns like [1][2] into custom React components.
 * Scans markdown text nodes, splits them into text and citation parts, and converts
 * citations to span elements with data attributes for TextContentCitation to render.
 *
 * **How it works:**
 * 1. Uses regex `/(\[\d+\]\s*)+/g` to find citation patterns
 * 2. Splits text nodes: text before → citation component → text after
 * 3. Creates span nodes with `data-component-type="citation"` and `data-citation-indices="1,2"`
 * 4. Replaces original text node with split parts in the AST
 *
 * **Example:**
 * Input: "Statement [1][2] text" → Output: [Text, Citation(1,2), Text]
 */
/**
 * Remark plugin that transforms citation patterns into custom component nodes.
 * Returns a function that processes the markdown AST tree.
 */
export declare const remarkCitations: () => (tree: any) => void;
//# sourceMappingURL=remarkCitations.d.ts.map