/**
 * Slot marker for a routable view. Never rendered directly — the parent
 * <AgentInterface> extracts all Routes from its children, finds the one
 * whose `path` matches the current nav state, and renders that Route's
 * children in place of the entire thread region (MobileHeader, ThreadHeader,
 * ScrollArea/Messages, Composer all hidden).
 *
 * Use multiple <AgentInterface.Route> siblings to define separate views.
 * When no Route matches, the thread region renders normally.
 */
export const Route = (_props) => null;
Route.displayName = "AgentInterface.Route";
//# sourceMappingURL=Route.js.map