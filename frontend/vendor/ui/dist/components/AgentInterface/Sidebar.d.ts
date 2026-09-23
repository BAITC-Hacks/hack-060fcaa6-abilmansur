type SidebarVisualState = "expanded" | "collapsing" | "collapsed" | "expanding";
export declare const useOptionalSidebarVisualState: () => {
    isCollapsedLayout: boolean;
    visualState: SidebarVisualState;
} | null;
export declare const SidebarContainer: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => import("react").JSX.Element;
export interface SidebarHeaderProps {
    className?: string;
    logo?: React.ReactNode;
    agentName?: React.ReactNode;
    collapseButton?: React.ReactNode | false;
    children?: React.ReactNode;
}
export declare const SidebarHeader: ({ className, logo, agentName: agentNameProp, collapseButton, children, }: SidebarHeaderProps) => import("react").JSX.Element;
export declare const SidebarContent: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => import("react").JSX.Element;
export declare const SidebarSeparator: () => import("react").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map