export interface EntityListRow {
    left: string;
    right: string;
    rightVariant?: "text" | "number";
}
export type EntityListSize = "small" | "default";
export interface EntityListProps {
    rows?: EntityListRow[];
    size?: EntityListSize;
    /** Only rendered when `size` is "default". */
    header?: EntityListRow;
    /** Only rendered when `size` is "default". */
    footer?: EntityListRow;
    className?: string;
}
/** A two-column key/value list with optional header and footer rows. */
export declare const EntityList: import("react").ForwardRefExoticComponent<EntityListProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EntityList.d.ts.map