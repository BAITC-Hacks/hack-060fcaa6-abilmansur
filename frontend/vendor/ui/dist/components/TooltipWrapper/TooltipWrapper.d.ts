import React from "react";
export interface TooltipWrapperProps {
    tooltipHeading?: string;
    tooltipContent?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
    delayDuration?: number;
    showOnlyWhenTruncated?: boolean;
    headingSelector?: string;
    contentSelector?: string;
}
export declare const TooltipWrapper: ({ tooltipHeading, tooltipContent, children, className, side, align, sideOffset, alignOffset, delayDuration, showOnlyWhenTruncated, headingSelector, contentSelector, }: React.PropsWithChildren<TooltipWrapperProps>) => React.JSX.Element;
//# sourceMappingURL=TooltipWrapper.d.ts.map