"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { CodeBlock as InvCodeBlock } from "../../components/CodeBlock";
import { CodeBlockSchema } from "./schema";
export { CodeBlockSchema } from "./schema";
export const CodeBlock = defineComponent({
    name: "CodeBlock",
    props: CodeBlockSchema,
    description: "Syntax-highlighted code block",
    component: ({ props }) => (_jsx(InvCodeBlock, { language: props.language, codeString: props.codeString })),
});
//# sourceMappingURL=index.js.map