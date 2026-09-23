import { type HTMLAttributes, type ReactNode } from "react";
export interface SnippetCardTooltip {
    heading?: string;
    content?: string;
}
export interface SnippetCardBlockItem {
    id?: string;
    /** Left-hand content (typically an IconText / ImageText). */
    lhs: ReactNode;
    /** Right-hand value content (typically a Text / BoldText). Chevron is shown instead when clickable and absent. */
    rhs?: ReactNode;
    /** Tooltip shown when the lhs text is truncated. */
    lhsTooltip?: SnippetCardTooltip;
    /** Tooltip shown when the rhs text is truncated. */
    rhsTooltip?: SnippetCardTooltip;
}
export interface SnippetCardBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
    items: SnippetCardBlockItem[];
    /** Collapses the grid to 2 / 1 columns on narrow containers. */
    responsive?: boolean;
    /** Overrides the gap between cards (px number or any CSS length). */
    gap?: number | string;
    /** Renders the cards as buttons and fires `onItemClick`. */
    clickable?: boolean;
    onItemClick?: (item: SnippetCardBlockItem, index: number) => void;
    className?: string;
}
declare const SnippetCardBlock: import("react").ForwardRefExoticComponent<SnippetCardBlockProps & import("react").RefAttributes<HTMLDivElement>>;
export { SnippetCardBlock };
//# sourceMappingURL=SnippetCardBlock.d.ts.map