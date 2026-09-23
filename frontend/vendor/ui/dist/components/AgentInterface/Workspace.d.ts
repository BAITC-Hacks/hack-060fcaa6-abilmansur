import { type ReactNode } from "react";
export interface WorkspaceProps {
    className?: string;
    /** Mode C — replaces the entire rail (you own the chrome and visibility). */
    children?: ReactNode;
}
/**
 * Per-thread workspace rail (right edge of the layout) listing the artifacts
 * registered in the active thread.
 *
 * - Renders nothing while the registry is empty — drop-in users without
 *   artifact renderers never see it. Visibility is controlled by the header
 *   workspace toggle.
 * - Lists every registered artifact, grouped into one section per
 *   `artifactCategories` entry configured on `<AgentInterface>`; a single
 *   "Artifacts" section lists everything when no categories are configured.
 *   There are no tabs or filtering — the rail shows it all.
 * - Item click activates the corresponding DetailedView; the rail closes while
 *   a DetailedView is open.
 * - Rendered only in the thread view — hidden on Route pages and the
 *   artifact browser. Hidden on mobile.
 *
 * Modes: A (omit → default above) and C (children replace the rail).
 *
 * @category Components
 */
export declare const Workspace: ({ className, children }: WorkspaceProps) => import("react").JSX.Element;
//# sourceMappingURL=Workspace.d.ts.map