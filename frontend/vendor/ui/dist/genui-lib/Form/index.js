"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, FormNameContext, FormValidationContext, useCreateFormValidation, } from "@inv/lang";
import { FormSchema } from "./schema";
export { FormSchema } from "./schema";
/** Shared renderer — also used by the chat library's Form variant (wider FormControl). */
export const FormRenderer = ({ props, renderNode }) => {
    const formValidation = useCreateFormValidation();
    const formName = props.name;
    return (_jsx(FormValidationContext.Provider, { value: formValidation, children: _jsx(FormNameContext.Provider, { value: formName, children: _jsxs("div", { role: "form", style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [renderNode(props.fields), renderNode(props.buttons)] }) }) }));
};
export const Form = defineComponent({
    name: "Form",
    props: FormSchema,
    description: "Form container with fields and explicit action buttons",
    component: FormRenderer,
});
//# sourceMappingURL=index.js.map