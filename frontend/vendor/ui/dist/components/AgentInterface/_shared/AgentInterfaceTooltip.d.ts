import type { ReactElement, ReactNode } from "react";
export interface AgentInterfaceTooltipProps {
    children: ReactElement;
    content: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}
export declare const AgentInterfaceTooltip: ({ children, content, side, align, sideOffset, }: AgentInterfaceTooltipProps) => import("react").JSX.Element;
//# sourceMappingURL=AgentInterfaceTooltip.d.ts.map