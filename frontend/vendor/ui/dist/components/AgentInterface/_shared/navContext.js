import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
const NavContext = createContext(null);
/**
 * Standard controlled/uncontrolled split:
 * - `onNavigate` provided → controlled. Parent owns state; `path` prop is the source of truth.
 * - `onNavigate` absent → uncontrolled. Internal state starts at `defaultPath`.
 */
export const NavProvider = ({ path, defaultPath, onNavigate, children }) => {
    const isControlled = onNavigate !== undefined;
    const [internalPath, setInternalPath] = useState(defaultPath);
    const currentPath = isControlled ? path : internalPath;
    const navigate = useCallback((next) => {
        if (isControlled) {
            onNavigate?.(next);
        }
        else {
            setInternalPath(next);
        }
    }, [isControlled, onNavigate]);
    const value = useMemo(() => ({ path: currentPath, navigate }), [currentPath, navigate]);
    return _jsx(NavContext.Provider, { value: value, children: children });
};
/**
 * Read the current navigation state from inside <AgentInterface>.
 *
 * Returns `{ path, navigate }`. Call `navigate(undefined)` to return to the
 * thread view (clears any active route).
 */
export const useNav = () => {
    const ctx = useContext(NavContext);
    if (!ctx) {
        throw new Error("useNav() must be used inside <AgentInterface>");
    }
    return ctx;
};
/** Returns the nav context if mounted, otherwise null. Internal use. */
export const useOptionalNav = () => useContext(NavContext);
//# sourceMappingURL=navContext.js.map