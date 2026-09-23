import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from "react";
const DEFAULT_LABELS = {
    defaultCategory: "Artifacts",
    workspaceToggle: "Thread workspace",
    tabs: { all: "All", artifacts: "Artifacts", apps: "Apps" },
};
const LabelsContext = createContext(DEFAULT_LABELS);
export const LabelsProvider = ({ labels, children }) => {
    const value = useMemo(() => ({
        defaultCategory: labels?.defaultCategory ?? DEFAULT_LABELS.defaultCategory,
        workspaceToggle: labels?.workspaceToggle ?? DEFAULT_LABELS.workspaceToggle,
        tabs: {
            all: labels?.tabs?.all ?? DEFAULT_LABELS.tabs.all,
            artifacts: labels?.tabs?.artifacts ?? DEFAULT_LABELS.tabs.artifacts,
            apps: labels?.tabs?.apps ?? DEFAULT_LABELS.tabs.apps,
        },
    }), [
        labels?.defaultCategory,
        labels?.workspaceToggle,
        labels?.tabs?.all,
        labels?.tabs?.artifacts,
        labels?.tabs?.apps,
    ]);
    return _jsx(LabelsContext.Provider, { value: value, children: children });
};
/**
 * Resolved (default-merged) consumer labels for the artifact browser + workspace.
 * Works without a provider (returns the English defaults).
 */
export const useAgentInterfaceLabels = () => useContext(LabelsContext);
//# sourceMappingURL=labelsContext.js.map