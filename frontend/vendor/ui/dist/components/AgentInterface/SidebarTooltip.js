import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Tooltip from "@radix-ui/react-tooltip";
export const SidebarTooltip = ({ children, content, disabled = false }) => {
    if (disabled)
        return children;
    // Provider is hoisted once into <Container> so delay/skip-delay are shared.
    return (_jsxs(Tooltip.Root, { children: [_jsx(Tooltip.Trigger, { asChild: true, children: children }), _jsx(Tooltip.Portal, { children: _jsx(Tooltip.Content, { className: "inv-agent-sidebar-tooltip", side: "right", align: "center", sideOffset: 8, children: content }) })] }));
};
//# sourceMappingURL=SidebarTooltip.js.map