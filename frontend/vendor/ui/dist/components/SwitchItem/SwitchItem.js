import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Switch from "@radix-ui/react-switch";
import clsx from "clsx";
import { forwardRef, useId } from "react";
const SwitchItem = forwardRef((props, ref) => {
    const { label, description, onChange, className, disabled, required, ...rest } = props;
    const id = useId();
    return (_jsxs("div", { className: "inv-switch-item-container", children: [_jsx(Switch.Root, { ref: ref, onCheckedChange: onChange, id: id, className: clsx("inv-switch-item-root", className), disabled: disabled, required: required, ...rest, children: _jsx(Switch.Thumb, { className: "inv-switch-item-thumb" }) }), _jsxs("div", { className: "inv-switch-item-content", children: [label && (_jsx("label", { htmlFor: id, className: "inv-switch-item-label", children: label })), description && _jsx("p", { className: "inv-switch-item-description", children: description })] })] }));
});
SwitchItem.displayName = "SwitchItem";
export { SwitchItem };
//# sourceMappingURL=SwitchItem.js.map