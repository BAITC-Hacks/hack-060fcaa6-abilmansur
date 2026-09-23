import { type ForwardedRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
export type CardBlockLayoutVariant = "grid" | "carousel";
export type CardBlockSize = "small" | "medium";
export interface CardBlockLayoutProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Picks the `inv-small-card-block` / `inv-medium-card-block` class family. */
    size: CardBlockSize;
    /** Appended as `inv-<size>-card-block--<cardType>` and exposed as `data-card-type`. */
    cardType: string;
    items: T[];
    layout?: CardBlockLayoutVariant;
    responsive?: boolean;
    maxPerRow: 2 | 3;
    /** Overrides the CSS gap variable (numbers are treated as px). */
    gap?: number | string;
    /** Renders one card; the layout wraps it in the item/carousel-item cell. */
    renderItem: (item: T, index: number) => ReactNode;
    itemKey?: (item: T, index: number) => string;
}
export declare const CardBlockLayout: <T>(props: CardBlockLayoutProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
}) => ReactNode;
/** Enter/Space keyboard activation for card-like `role="button"` divs. */
export declare function cardKeyDownHandler(onActivate: () => void): (event: KeyboardEvent<HTMLDivElement>) => void;
//# sourceMappingURL=CardBlockLayout.d.ts.map