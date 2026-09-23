import { jsx as _jsx } from "react/jsx-runtime";
import { useArtifactCategories, useArtifactStorage } from "@inv/headless";
import { Boxes } from "lucide-react";
import { artifactListPath } from "./_shared/artifactPaths";
import { useAgentInterfaceLabels } from "./_shared/labelsContext";
import { useOptionalNav } from "./_shared/navContext";
import { SidebarItem } from "./SidebarItem";
/**
 * Sidebar navigation for the global artifact browser.
 *
 * Renders one {@link SidebarItem} per configured `artifactCategories` entry
 * (or a single "Artifacts" item when no categories are configured). Clicking
 * navigates to the reserved `artifacts/{category}` path, which AgentInterface
 * renders as the searchable artifact browser in the thread region.
 *
 * Each item's icon is the category's own `icon` (`artifactCategories: [{ icon }]`),
 * else the `icon` prop, else a generic default — the library hardcodes no
 * per-category icons.
 *
 * Renders nothing when `storage.artifact` is not configured.
 *
 * Included automatically in the default sidebar; compose it manually inside
 * a custom `<AgentInterface.Sidebar>`.
 *
 * @category Components
 */
export const ArtifactNav = ({ className, icon }) => {
    const storage = useArtifactStorage();
    const categories = useArtifactCategories();
    const nav = useOptionalNav();
    const { defaultCategory } = useAgentInterfaceLabels();
    if (!storage)
        return null;
    const items = categories.length > 0
        ? categories.map((c) => ({
            label: c.name,
            path: artifactListPath(c.name),
            categoryIcon: c.icon,
        }))
        : [
            {
                label: defaultCategory,
                path: artifactListPath(),
                categoryIcon: undefined,
            },
        ];
    // Category nav icon: the category's own icon → the `icon` prop → a generic default.
    const getItemIcon = (categoryIcon) => categoryIcon ?? icon ?? _jsx(Boxes, { size: "1em" });
    return (_jsx("div", { className: className, children: items.map((item) => (_jsx(SidebarItem, { path: item.path, icon: getItemIcon(item.categoryIcon), 
            // Highlight on the list page AND while viewing an artifact within it.
            selected: nav?.path === item.path || nav?.path?.startsWith(`${item.path}/`) === true, children: item.label }, item.path))) }));
};
//# sourceMappingURL=ArtifactNav.js.map