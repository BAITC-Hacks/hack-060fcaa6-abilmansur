"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent } from "@inv/lang";
import { TextContentWrapper } from "../../components/TextContentWrapper";
import { TextContentSchema } from "./schema";
const BODY_SIZE_VARS = {
    small: "--inv-text-body-sm",
    default: "--inv-text-body-default",
    large: "--inv-text-body-lg",
    "small-heavy": "--inv-text-body-sm-heavy",
    "large-heavy": "--inv-text-body-lg-heavy",
};
export { TextContentSchema } from "./schema";
export const TextContent = defineComponent({
    name: "TextContent",
    props: TextContentSchema,
    description: 'Text block. Supports markdown. Optional size: "small" | "default" | "large" | "small-heavy" | "large-heavy".',
    component: ({ props }) => {
        const size = props.size ?? "default";
        const varName = BODY_SIZE_VARS[size] ?? BODY_SIZE_VARS["default"];
        const style = size === "default"
            ? undefined
            : {
                "--inv-text-body-default": `var(${varName})`,
                "--inv-text-body-default-letter-spacing": `var(${varName}-letter-spacing)`,
            };
        const text = props.text == null ? "" : String(props.text);
        return (_jsx("div", { style: style, children: _jsx(TextContentWrapper, { textMarkdown: text }) }));
    },
});
//# sourceMappingURL=index.js.map