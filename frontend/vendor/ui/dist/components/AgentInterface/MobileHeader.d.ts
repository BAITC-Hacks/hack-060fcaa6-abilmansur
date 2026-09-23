import type { ReactNode } from "react";
export interface MobileHeaderProps {
    className?: string;
    logo?: ReactNode;
    agentName?: ReactNode;
    menuButton?: ReactNode | false;
    newChatButton?: ReactNode | false;
    actions?: ReactNode;
    children?: ReactNode;
}
export declare const MobileHeader: ({ className, logo, agentName: agentNameProp, menuButton, newChatButton, actions, children, }: MobileHeaderProps) => import("react").JSX.Element;
//# sourceMappingURL=MobileHeader.d.ts.map