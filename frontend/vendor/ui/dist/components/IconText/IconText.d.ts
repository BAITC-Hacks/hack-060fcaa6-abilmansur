import { type IconTagVariant } from "../IconTag";
import type { IconProps } from "../_shared/icons";
export type IconTextIconVariant = IconTagVariant | "filled" | "soft";
export type IconTextLayout = "horizontal" | "vertical";
export interface IconTextProps {
    icon: IconProps;
    title: string;
    subtitle?: string;
    iconVariant?: IconTextIconVariant;
    bold?: boolean;
    layout?: IconTextLayout;
    className?: string;
}
/** An icon badge beside (or above) a title with an optional subtitle. */
export declare const IconText: import("react").ForwardRefExoticComponent<IconTextProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=IconText.d.ts.map