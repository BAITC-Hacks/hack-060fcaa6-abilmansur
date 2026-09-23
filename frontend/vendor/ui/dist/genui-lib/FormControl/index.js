"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent, useFormValidation } from "@inv/lang";
import { AlertCircle } from "lucide-react";
import { FormControl as InvFormControl } from "../../components/FormControl";
import { Hint as InvHint } from "../../components/FormControl/Hint";
import { Label as InvLabel } from "../../components/Label";
import { FormControlSchema } from "./schema";
export { FormControlSchema } from "./schema";
export const FormControlRenderer = ({ props, renderNode }) => {
    const formValidation = useFormValidation();
    const inputObj = props.input;
    // Extract the field name from the rendered input element props.
    const rawName = inputObj?.type === "element" ? inputObj.props?.name : undefined;
    const fieldName = typeof rawName === "object" && rawName?.name ? rawName.name : rawName;
    const error = fieldName ? formValidation?.errors[fieldName] : undefined;
    const isRequired = inputObj?.type === "element" && inputObj.props?.rules?.required === true;
    return (_jsxs(InvFormControl, { children: [_jsx(InvLabel, { className: "text-sm font-medium", required: isRequired, htmlFor: fieldName, children: props.label }), renderNode(props.input), error ? (_jsxs(InvHint, { hasError: true, children: [_jsx(AlertCircle, { size: 14 }), error] })) : props.hint ? (_jsx(InvHint, { children: props.hint })) : null] }));
};
export const FormControl = defineComponent({
    name: "FormControl",
    props: FormControlSchema,
    description: "Field with label, input component, and optional hint text",
    component: FormControlRenderer,
});
//# sourceMappingURL=index.js.map