import { type ReactNode } from "react";
export interface VisualCardBlockItem {
    id?: string;
    /** Rendered in the top-left slot (typically a Tag). */
    tag?: ReactNode;
    /** Rendered inside the bottom panel (typically bold text). */
    body?: ReactNode;
    bgImageSrc?: string;
    /** Alt text for the background image. */
    bgImageAlt?: string;
}
export interface VisualCardProps {
    item: VisualCardBlockItem;
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
}
/** A photo-first card: background image with gradient, a tag on top and a body panel at the bottom. */
export declare const VisualCard: import("react").ForwardRefExoticComponent<VisualCardProps & import("react").RefAttributes<HTMLDivElement>>;
export interface VisualCardBlockProps {
    items: VisualCardBlockItem[];
    layout?: "grid" | "carousel";
    responsive?: boolean;
    /** Overrides the CSS gap variable (numbers are treated as px). */
    gap?: number | string;
    /** Makes every card focusable/clickable; `onItemClick` receives the item index. */
    clickable?: boolean;
    onItemClick?: (index: number) => void;
    className?: string;
}
/** A three-per-row grid or carousel of VisualCards. */
export declare const VisualCardBlock: import("react").ForwardRefExoticComponent<VisualCardBlockProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VisualCardBlock.d.ts.map