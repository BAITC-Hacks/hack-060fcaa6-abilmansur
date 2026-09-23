import { type HTMLAttributes, type ReactNode } from "react";
import { type MetricIndicatorInlineProps } from "../MetricIndicator";
export type OverviewCardBlockLayout = "grid" | "carousel";
export interface OverviewCardBlockItem {
    id?: string;
    /** Top slot content (typically an IconText / ImageText / Text). */
    top?: ReactNode;
    /** Bottom metric rendered with MetricIndicatorInline. */
    bottom?: Omit<MetricIndicatorInlineProps, "className">;
}
export interface OverviewCardBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
    items: OverviewCardBlockItem[];
    layout?: OverviewCardBlockLayout;
    /** Collapses the grid / shrinks carousel cards on narrow containers. */
    responsive?: boolean;
    /** Overrides the gap between cards (px number or any CSS length). */
    gap?: number | string;
    /** Renders the cards as buttons and fires `onItemClick`. */
    clickable?: boolean;
    onItemClick?: (item: OverviewCardBlockItem, index: number) => void;
    className?: string;
}
declare const OverviewCardBlock: import("react").ForwardRefExoticComponent<OverviewCardBlockProps & import("react").RefAttributes<HTMLDivElement>>;
export { OverviewCardBlock };
//# sourceMappingURL=OverviewCardBlock.d.ts.map