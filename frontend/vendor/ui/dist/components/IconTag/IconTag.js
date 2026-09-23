import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconWrapper } from "../_shared/icons";
/** Small icon badge used inside card primitives. */
export const IconTag = forwardRef(({ icon, size = "m", variant = "neutral", className }, ref) => {
    if (!icon?.name) {
        return null;
    }
    return (_jsx("div", { ref: ref, className: clsx("inv-icon-tag", `inv-icon-tag--${size}`, `inv-icon-tag--${variant}`, className), children: _jsx(IconWrapper, { name: icon.name, category: icon.category }) }));
});
IconTag.displayName = "IconTag";
//# sourceMappingURL=IconTag.js.map