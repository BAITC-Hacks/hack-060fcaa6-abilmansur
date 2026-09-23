"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineComponent, parseStructuredRules, useFormValidation, useIsStreaming, useStateField, } from "@inv/lang";
import React from "react";
import { Select as InvSelect, SelectContent as InvSelectContent, SelectItem as InvSelectItem, SelectTrigger as InvSelectTrigger, SelectValue as InvSelectValue, } from "../../components/Select";
import { SelectItemSchema, createSelectSchema } from "./schema";
export { SelectItemSchema } from "./schema";
export const SelectItem = defineComponent({
    name: "SelectItem",
    props: SelectItemSchema,
    description: "Option for Select",
    component: () => null,
});
export const Select = defineComponent({
    name: "Select",
    props: createSelectSchema(SelectItem),
    description: "",
    component: ({ props }) => {
        const isStreaming = useIsStreaming();
        const formValidation = useFormValidation();
        const field = useStateField(props.name, props.value);
        const rules = React.useMemo(() => parseStructuredRules(props.rules), [props.rules]);
        const hasRules = rules.length > 0;
        const items = (props.items ?? []).filter((item) => item?.props?.value);
        const value = field.value ?? "";
        const handleChange = React.useCallback((val) => {
            field.setValue(val);
            if (hasRules) {
                formValidation?.validateField(field.name, val, rules);
            }
        }, [field, formValidation, hasRules, rules]);
        React.useEffect(() => {
            if (!isStreaming && hasRules && formValidation) {
                formValidation.registerField(field.name, rules, () => field.value);
                return () => formValidation.unregisterField(field.name);
            }
            return undefined;
        }, [field.name, field.value, formValidation, hasRules, isStreaming, rules]);
        return (_jsxs(InvSelect, { name: field.name, value: value, onValueChange: handleChange, disabled: isStreaming, size: { small: "sm", medium: "md", large: "lg" }[props.size] ?? "md", children: [_jsx(InvSelectTrigger, { children: _jsx(InvSelectValue, { placeholder: props.placeholder || "Select..." }) }), _jsx(InvSelectContent, { children: items.map((item, i) => (_jsx(InvSelectItem, { value: item.props.value, children: item.props.label || item.props.value }, i))) })] }));
    },
});
//# sourceMappingURL=index.js.map