import { type ReactNode } from "react";
export interface CompositeCardBlockItem {
    id?: string;
    header?: ReactNode;
    body?: ReactNode[];
    footer?: {
        price?: ReactNode;
        button?: ReactNode;
    };
}
export interface CompositeCardProps {
    item: CompositeCardBlockItem;
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
}
/** A bordered card with header, stacked body content and a price/button footer. */
export declare const CompositeCard: import("react").ForwardRefExoticComponent<CompositeCardProps & import("react").RefAttributes<HTMLDivElement>>;
export interface CompositeCardBlockProps {
    items: CompositeCardBlockItem[];
    layout?: "grid" | "carousel";
    responsive?: boolean;
    /** Overrides the CSS gap variable (numbers are treated as px). */
    gap?: number | string;
    /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
    clickable?: boolean;
    onItemClick?: (index: number) => void;
    className?: string;
}
/** A two-per-row grid or carousel of CompositeCards. */
export declare const CompositeCardBlock: import("react").ForwardRefExoticComponent<CompositeCardBlockProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompositeCardBlock.d.ts.map