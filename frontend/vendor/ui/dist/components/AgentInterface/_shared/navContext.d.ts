import { type ReactNode } from "react";
export interface NavContextValue {
    /** Current path. `undefined` means the thread region is active (no Route matched). */
    path: string | undefined;
    /** Switch path. Pass `undefined` to clear and return to the thread view. */
    navigate: (next: string | undefined) => void;
}
export interface NavProviderProps {
    /** Controlled current path. Provide together with `onNavigate`. */
    path?: string;
    /** Initial path for uncontrolled mode. Ignored when `onNavigate` is provided. */
    defaultPath?: string;
    /** Called when navigation occurs. Presence determines controlled mode. */
    onNavigate?: (next: string | undefined) => void;
    children: ReactNode;
}
/**
 * Standard controlled/uncontrolled split:
 * - `onNavigate` provided → controlled. Parent owns state; `path` prop is the source of truth.
 * - `onNavigate` absent → uncontrolled. Internal state starts at `defaultPath`.
 */
export declare const NavProvider: ({ path, defaultPath, onNavigate, children }: NavProviderProps) => import("react").JSX.Element;
/**
 * Read the current navigation state from inside <AgentInterface>.
 *
 * Returns `{ path, navigate }`. Call `navigate(undefined)` to return to the
 * thread view (clears any active route).
 */
export declare const useNav: () => NavContextValue;
/** Returns the nav context if mounted, otherwise null. Internal use. */
export declare const useOptionalNav: () => NavContextValue | null;
//# sourceMappingURL=navContext.d.ts.map