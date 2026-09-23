import type { ReactNode } from "react";
export interface ArtifactNavProps {
    className?: string;
    /**
     * Fallback icon for category items that don't set their own `icon`.
     * Defaults to a boxes icon.
     */
    icon?: ReactNode;
}
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
export declare const ArtifactNav: ({ className, icon }: ArtifactNavProps) => import("react").JSX.Element | null;
//# sourceMappingURL=ArtifactNav.d.ts.map