"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { defineComponent, useFormName, useIsStreaming, useTriggerAction, } from "@inv/lang";
import { IconButton as InvIconButton } from "../../components/IconButton";
import { IconWrapper } from "../../components/_shared/icons";
import { IconButtonSchema } from "./schema";
export * from "./schema";
function IconButtonRenderer({ props }) {
    const triggerAction = useTriggerAction();
    const formName = useFormName();
    const isStreaming = useIsStreaming();
    return (_jsx(InvIconButton, { icon: _jsx(IconWrapper, { name: props.icon.props.name, category: props.icon.props.category }), variant: props.variant ?? "secondary", size: props.size ?? "medium", shape: props.shape ?? "square", disabled: isStreaming, "aria-label": props.name, onClick: () => triggerAction(props.name, formName, props.action) }));
}
export const IconButton = defineComponent({
    name: "IconButton",
    props: IconButtonSchema,
    description: "Icon-only button. name is the accessible label and the action label; icon is an Icon; action fires on click.",
    component: IconButtonRenderer,
});
//# sourceMappingURL=index.js.map