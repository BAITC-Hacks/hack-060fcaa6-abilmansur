import { jsx as _jsx } from "react/jsx-runtime";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { useRef } from "react";
import { LayoutContextProvider } from "../../context/LayoutContext";
import { useElementSize } from "../../hooks/useElementSize";
import { ShellStoreProvider } from "../_shared/store";
import { AgentInterfaceStoreProvider } from "./_shared/store";
export const Container = ({ children, logoUrl, agentName, className }) => {
    const ref = useRef(null);
    const { width } = useElementSize({ ref }) || {};
    // TODO: revisit this logic
    const isMobile = width > 0 && width < 768;
    const isFullScreen = width > 768;
    const layout = isMobile ? "mobile" : isFullScreen ? "fullscreen" : "tray";
    return (_jsx(AgentInterfaceStoreProvider, { logoUrl: logoUrl, agentName: agentName, children: _jsx(ShellStoreProvider, { logoUrl: logoUrl, agentName: agentName, children: _jsx(LayoutContextProvider, { layout: layout, children: _jsx(Tooltip.Provider, { delayDuration: 250, children: _jsx("div", { className: clsx("inv-agent-container", {
                            "inv-agent-container--mobile": isMobile,
                        }, className), ref: ref, children: children }) }) }) }) }));
};
//# sourceMappingURL=Container.js.map