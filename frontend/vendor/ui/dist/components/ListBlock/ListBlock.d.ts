import { CSSProperties, ReactElement } from "react";
import { ListItemProps, ListItemSize, ListItemVariant } from "../ListItem";
export interface ListBlockProps {
    /** Controls the indicator shown on every ListItem. Defaults to "number". */
    variant?: ListItemVariant;
    /** "small" tightens spacing and typography (used inside cards). Defaults to "default". */
    size?: ListItemSize;
    children: ReactElement<ListItemProps> | ReactElement<ListItemProps>[];
    className?: string;
    style?: CSSProperties;
}
declare const ListBlock: import("react").ForwardRefExoticComponent<ListBlockProps & import("react").RefAttributes<HTMLDivElement>>;
export { ListBlock };
//# sourceMappingURL=ListBlock.d.ts.map