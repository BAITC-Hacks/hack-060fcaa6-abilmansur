import { jsx as _jsx } from "react/jsx-runtime";
import * as Radio from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { forwardRef } from "react";
const variants = {
    clear: "inv-radio-group-clear",
    card: "inv-radio-group-card",
    sunk: "inv-radio-group-sunk",
};
const RadioGroup = forwardRef((props, ref) => {
    const { children, className, style, variant = "clear", ...rest } = props;
    return (_jsx(Radio.Root, { ref: ref, className: clsx("inv-radio-group", variants[variant], className), style: style, ...rest, children: children }));
});
RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
//# sourceMappingURL=RadioGroup.js.map