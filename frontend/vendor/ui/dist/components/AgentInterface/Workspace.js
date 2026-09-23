import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { artifactViewId, useActiveDetailedView, useArtifactCategories, useArtifactList, useDetailedView, useDetailedViewStore, } from "@inv/headless";
import clsx from "clsx";
import { useEffect } from "react";
import { useLayoutContext } from "../../context/LayoutContext";
import { formatArtifactUpdatedAt, useArtifactIcon, useArtifactTypeLabel, } from "./ArtifactBrowserPage";
import { useAgentInterfaceLabels } from "./_shared/labelsContext";
import { useAgentInterfaceStore } from "./_shared/store";
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
export const Workspace = ({ className, children }) => {
    if (children != null)
        return _jsx(_Fragment, { children: children });
    return _jsx(DefaultWorkspace, { className: className });
};
const DefaultWorkspace = ({ className }) => {
    const { isWorkspaceOpen, setIsWorkspaceOpen } = useAgentInterfaceStore((state) => ({
        isWorkspaceOpen: state.isWorkspaceOpen,
        setIsWorkspaceOpen: state.setIsWorkspaceOpen,
    }));
    const { isDetailedViewActive } = useActiveDetailedView();
    const { layout } = useLayoutContext();
    const categories = useArtifactCategories();
    const all = useArtifactList();
    const { workspaceToggle } = useAgentInterfaceLabels();
    const entries = latestPerId(all);
    const shouldShowWorkspace = isWorkspaceOpen && !isDetailedViewActive;
    useEffect(() => {
        if (isDetailedViewActive && isWorkspaceOpen) {
            setIsWorkspaceOpen(false);
        }
    }, [isDetailedViewActive, isWorkspaceOpen, setIsWorkspaceOpen]);
    // Nothing renders while the registry is empty; the header controls open state.
    if (entries.length === 0)
        return null;
    return (_jsxs(_Fragment, { children: [layout === "mobile" && (_jsx("div", { className: clsx("inv-agent-workspace-sidebar__overlay", {
                    "inv-agent-workspace-sidebar__overlay--collapsed": !shouldShowWorkspace,
                }), onClick: () => setIsWorkspaceOpen(false) })), _jsxs("div", { className: clsx("inv-agent-workspace-sidebar", { "inv-agent-workspace-sidebar--collapsed": !shouldShowWorkspace }, className), children: [_jsx("div", { className: "inv-agent-workspace-sidebar__header", children: _jsx("h2", { className: "inv-agent-workspace-sidebar__title", children: workspaceToggle }) }), _jsx("div", { className: "inv-agent-workspace-sidebar__content", children: categories.length > 0 ? (_jsx(WorkspaceSections, { categories: categories, entries: entries })) : (_jsx(WorkspaceSection, { entries: entries })) })] })] }));
};
const WorkspaceSections = ({ categories, entries, }) => {
    // Show every category that has registered entries — no tab filtering.
    const visibleCategories = categories.filter((category) => entries.some((entry) => entryMatchesCategory(entry, category)));
    // Entries matching no configured category are still shown (never dropped),
    // in a fallback section after the categorized ones.
    const uncategorized = entries.filter((entry) => !categories.some((category) => entryMatchesCategory(entry, category)));
    return (_jsxs(_Fragment, { children: [visibleCategories.map((category) => (_jsx(WorkspaceSection, { entries: entries.filter((entry) => entryMatchesCategory(entry, category)) }, category.name))), uncategorized.length > 0 && (_jsx(WorkspaceSection, { entries: uncategorized }, "__uncategorized__"))] }));
};
const WorkspaceSection = ({ entries, emptyHint, }) => {
    if (entries.length === 0) {
        if (!emptyHint)
            return null;
        return _jsx("div", { className: "inv-agent-workspace-sidebar__section-empty", children: emptyHint });
    }
    return (_jsx("ul", { className: "inv-agent-workspace-sidebar__list", children: entries.map((entry) => (_jsx(WorkspaceItem, { entry: entry }, entry.id))) }));
};
const WorkspaceItem = ({ entry }) => {
    const viewId = artifactViewId(entry.id, entry.version);
    const { isActive } = useDetailedView(viewId);
    const store = useDetailedViewStore();
    const onClick = () => store.getState().setActiveDetailedView(viewId);
    const icon = useArtifactIcon(entry.type);
    const updatedAt = formatArtifactUpdatedAt(entry.updatedAt);
    const metadata = [useArtifactTypeLabel(entry.type), updatedAt].filter(Boolean).join(" · ");
    return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: onClick, "aria-pressed": isActive, className: clsx("inv-agent-workspace-sidebar__item", {
                "inv-agent-workspace-sidebar__item--active": isActive,
            }), children: [_jsx("span", { className: "inv-agent-workspace-sidebar__item-icon", children: icon }), _jsxs("span", { className: "inv-agent-workspace-sidebar__item-body", children: [_jsx("span", { className: "inv-agent-workspace-sidebar__item-label", children: entry.heading }), metadata && (_jsx("span", { className: "inv-agent-workspace-sidebar__item-meta", children: metadata }))] })] }) }));
};
/** Picks the latest version (highest version number, kept as the last element after sort). */
function latestPerId(registry) {
    return Object.values(registry)
        .map((versions) => versions[versions.length - 1])
        .filter((entry) => entry !== undefined);
}
function entryMatchesCategory(entry, category) {
    return category.filter.type.includes(entry.type);
}
//# sourceMappingURL=Workspace.js.map