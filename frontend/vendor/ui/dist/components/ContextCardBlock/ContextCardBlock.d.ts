import { type ReactNode } from "react";
export type ContextCardBgColor = "gray" | "info" | "success" | "warning" | "danger";
export interface ContextCardBlockItem {
    id?: string;
    /** Plain string renders as small title text; any other node (e.g. a Tag) renders in the tag slot. */
    title?: ReactNode;
    /** Inline markdown supported. */
    body?: string;
    bgColor?: ContextCardBgColor;
    bgImageSrc?: string;
    /** Alt text for the background image. */
    bgImageAlt?: string;
}
export interface ContextCardProps {
    item: ContextCardBlockItem;
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
}
/** A compact tinted card with a title (text or tag) and a bold markdown body. */
export declare const ContextCard: import("react").ForwardRefExoticComponent<ContextCardProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ContextCardBlockProps {
    items: ContextCardBlockItem[];
    layout?: "grid" | "carousel";
    responsive?: boolean;
    /** Overrides the CSS gap variable (numbers are treated as px). */
    gap?: number | string;
    /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
    clickable?: boolean;
    onItemClick?: (index: number) => void;
    className?: string;
}
/** A grid or carousel of ContextCards (uses the small card block layout). */
export declare const ContextCardBlock: import("react").ForwardRefExoticComponent<ContextCardBlockProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContextCardBlock.d.ts.map