import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { createContext, useContext } from "react";
const WelcomeGlowContext = createContext(false);
export const WelcomeGlowProvider = ({ children, enabled, }) => _jsx(WelcomeGlowContext.Provider, { value: enabled, children: children });
/**
 * Positions the optional welcome glow around a custom composer. The animation
 * is enabled by the nearest <AgentInterface.Welcome glowAnimation> ancestor.
 */
export const WelcomeGlow = ({ children, className }) => {
    const enabled = useContext(WelcomeGlowContext);
    if (!enabled) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsxs("div", { className: clsx("inv-agent-welcome-glow", className), children: [_jsx("span", { "aria-hidden": "true", className: "inv-agent-welcome-glow__blob inv-agent-welcome-glow__blob--accent" }), _jsx("span", { "aria-hidden": "true", className: "inv-agent-welcome-glow__blob inv-agent-welcome-glow__blob--foreground" }), children] }));
};
//# sourceMappingURL=WelcomeGlow.js.map