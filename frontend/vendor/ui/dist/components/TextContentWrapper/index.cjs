Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
const require_components_MarkDownRenderer_index = require("../MarkDownRenderer/index.cjs");
const require_Citation = require("../../Citation-BVJr-M7W.cjs");
const require_InlineMarkdownRenderer = require("../../InlineMarkdownRenderer-BVDLD2eH.cjs");
const require_components_InlineHeader_index = require("../InlineHeader/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let remark_breaks = require("remark-breaks");
remark_breaks = require_chunk.__toESM(remark_breaks);
let remark_gfm = require("remark-gfm");
remark_gfm = require_chunk.__toESM(remark_gfm);
let remark_math = require("remark-math");
remark_math = require_chunk.__toESM(remark_math);
//#region src/components/TextContentWrapper/TextContentWrapper.tsx
/**
* Full-featured markdown block for chat responses: GFM, math (KaTeX),
* line breaks, and inline `[n]` citations resolved against the enclosing
* `CardSourceProvider`.
*/
const TextContentWrapper = (0, react.memo)((props) => {
	const { mode } = require_ThemeProvider.useTheme();
	const [rehypeKatex, setRehypeKatex] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
		let cancelled = false;
		import("rehype-katex").then((m) => {
			if (!cancelled) setRehypeKatex(() => m.default);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-text-content", props.className),
		children: [props.header && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_InlineHeader_index.InlineHeader, {
			heading: props.header.heading,
			description: props.header.description
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_MarkDownRenderer_index.MarkDownRenderer, {
			textMarkdown: props.textMarkdown,
			variant: props.variant,
			options: {
				remarkPlugins: [
					[remark_gfm.default, { singleTilde: false }],
					[remark_math.default, { singleDollarTextMath: false }],
					[remark_breaks.default, { breaks: true }],
					require_InlineMarkdownRenderer.remarkCitations
				],
				rehypePlugins: rehypeKatex ? [rehypeKatex] : [],
				components: { span: require_Citation.TextContentCitation }
			},
			className: (0, clsx.default)("inv-text-content-markdown", { "inv-text-content-markdown-dark-mode": mode === "dark" })
		})]
	});
});
TextContentWrapper.displayName = "TextContentWrapper";
//#endregion
exports.TextContentWrapper = TextContentWrapper;

//# sourceMappingURL=index.cjs.map