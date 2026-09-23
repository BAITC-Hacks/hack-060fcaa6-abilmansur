import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface SidebarItemProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
    /** Leading icon. */
    icon?: ReactNode;
    /** Trailing content — badges, counts, etc. Rendered right-aligned. */
    trailing?: ReactNode;
    /**
     * Selected/active state. Defaults to `currentPath === path` when `path` is
     * provided. Pass explicitly to override the auto-derivation.
     */
    selected?: boolean;
    /**
     * Path this item navigates to. When provided, clicking the item calls
     * `navigate(path)` and the item auto-selects when current path matches.
     * Works in both controlled and uncontrolled <AgentInterface>.
     */
    path?: string;
    children: ReactNode;
}
/**
 * Styled clickable item for use inside <AgentInterface.Sidebar>. Visually
 * matches the ThreadList row so custom nav items blend with the default
 * thread list.
 */
export declare const SidebarItem: ({ icon, trailing, selected, path, className, children, onClick, ...rest }: SidebarItemProps) => import("react").JSX.Element;
//# sourceMappingURL=SidebarItem.d.ts.map