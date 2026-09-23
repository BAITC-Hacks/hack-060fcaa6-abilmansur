import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Tooltip from "@radix-ui/react-tooltip";
export const AgentInterfaceTooltip = ({ children, content, side = "bottom", align = "center", sideOffset = 8, }) => (
// Provider is hoisted once into <Container> so delay/skip-delay are shared.
_jsxs(Tooltip.Root, { children: [_jsx(Tooltip.Trigger, { asChild: true, children: children }), _jsx(Tooltip.Portal, { children: _jsx(Tooltip.Content, { className: "inv-agent-tooltip", side: side, align: align, sideOffset: sideOffset, children: content }) })] }));
//# sourceMappingURL=AgentInterfaceTooltip.js.map