const require_chunk = require("./chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("./ThemeProvider-sEZdBvkV.cjs");
const require_components_MarkDownRenderer_index = require("./components/MarkDownRenderer/index.cjs");
const require_Citation = require("./Citation-BVJr-M7W.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let remark_breaks = require("remark-breaks");
remark_breaks = require_chunk.__toESM(remark_breaks);
let remark_gfm = require("remark-gfm");
remark_gfm = require_chunk.__toESM(remark_gfm);
let unist_util_visit = require("unist-util-visit");
//#region src/components/_shared/remark/remarkCitations.ts
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
* Regex to match citation patterns like [1], [1][2], [1] [2]
* Matches one or more [number] patterns with optional whitespace
*/
const customComponentRegex = /(\[\d+\]\s*)+/g;
/**
* Regex to extract individual numbers from citation brackets
* Example: "[1][2]" → ["1", "2"]
*/
const numberExtractorRegex = /\[(\d+)\]/g;
/**
* Remark plugin that transforms citation patterns into custom component nodes.
* Returns a function that processes the markdown AST tree.
*/
const remarkCitations = () => {
	return (tree) => {
		(0, unist_util_visit.visit)(tree, "text", (node, index, parent) => {
			if (typeof node.value !== "string") return;
			const parts = [];
			let lastIndex = 0;
			let match;
			while ((match = customComponentRegex.exec(node.value)) !== null) {
				if (match.index > lastIndex) parts.push({
					type: "text",
					value: node.value.slice(lastIndex, match.index)
				});
				const fullMatch = match[0];
				const numbers = [];
				let numberMatch;
				while ((numberMatch = numberExtractorRegex.exec(fullMatch)) !== null) numbers.push(numberMatch[1] ?? "");
				numberExtractorRegex.lastIndex = 0;
				if (numbers.length > 0) parts.push({
					type: "customComponent",
					data: {
						hName: "span",
						hProperties: {
							"data-component-type": "citation",
							"data-citation-indices": numbers.join(",")
						}
					},
					children: [{
						type: "text",
						value: fullMatch.trim()
					}]
				});
				lastIndex = match.index + fullMatch.length;
			}
			customComponentRegex.lastIndex = 0;
			if (lastIndex < node.value.length) parts.push({
				type: "text",
				value: node.value.slice(lastIndex)
			});
			if (parts.length > 0 && parent && typeof index === "number") {
				parent.children.splice(index, 1, ...parts);
				return index + parts.length;
			}
		});
	};
};
//#endregion
//#region src/components/InlineMarkdownRenderer/InlineMarkdownRenderer.tsx
const Fragment = ({ children }) => children;
/**
* Lightweight markdown renderer for inline text (bold, italic, links, code).
* Block-level elements (paragraphs, headings, lists) are flattened so the
* output stays inline.
*/
const InlineMarkdownRenderer = (0, react.memo)(({ content, className }) => {
	const { mode } = require_ThemeProvider.useTheme();
	if (!content) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: (0, clsx.default)("inv-inline-markdown-renderer", className, { "inv-inline-markdown-renderer--dark": mode === "dark" }),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_MarkDownRenderer_index.MarkDownRenderer, {
			textMarkdown: content,
			options: {
				remarkPlugins: [
					remarkCitations,
					[remark_breaks.default, { breaks: false }],
					[remark_gfm.default, { singleTilde: false }]
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
					span: require_Citation.TextContentCitation
				}
			}
		})
	});
});
InlineMarkdownRenderer.displayName = "InlineMarkdownRenderer";
//#endregion
Object.defineProperty(exports, "InlineMarkdownRenderer", {
	enumerable: true,
	get: function() {
		return InlineMarkdownRenderer;
	}
});
Object.defineProperty(exports, "remarkCitations", {
	enumerable: true,
	get: function() {
		return remarkCitations;
	}
});

//# sourceMappingURL=InlineMarkdownRenderer-BVDLD2eH.cjs.map