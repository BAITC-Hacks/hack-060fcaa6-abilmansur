import { type ReactNode } from "react";
/** Per-tab labels for the per-thread Workspace rail. */
export interface WorkspaceTabLabels {
    all?: string;
    artifacts?: string;
    apps?: string;
}
/**
 * Consumer-overridable display strings for the artifact browser + workspace.
 * Every field is optional; omitted values fall back to the English defaults.
 * Pass via `<AgentInterface labels={...}>`.
 */
export interface AgentInterfaceLabels {
    /**
     * Fallback title/nav label for the artifact browser when no category is
     * configured (a configured category always uses its own `name`). Default
     * `"Artifacts"`.
     */
    defaultCategory?: string;
    /** Title for the workspace rail and its toggle tooltip. Default `"Thread workspace"`. */
    workspaceToggle?: string;
    /** Labels for the workspace rail tabs. Defaults: `All` / `Artifacts` / `Apps`. */
    tabs?: WorkspaceTabLabels;
}
/** Fully-resolved labels (defaults applied) — what consumers of the hook get. */
export interface ResolvedLabels {
    defaultCategory: string;
    workspaceToggle: string;
    tabs: {
        all: string;
        artifacts: string;
        apps: string;
    };
}
export interface LabelsProviderProps {
    labels?: AgentInterfaceLabels;
    children: ReactNode;
}
export declare const LabelsProvider: ({ labels, children }: LabelsProviderProps) => import("react").JSX.Element;
/**
 * Resolved (default-merged) consumer labels for the artifact browser + workspace.
 * Works without a provider (returns the English defaults).
 */
export declare const useAgentInterfaceLabels: () => ResolvedLabels;
//# sourceMappingURL=labelsContext.d.ts.map