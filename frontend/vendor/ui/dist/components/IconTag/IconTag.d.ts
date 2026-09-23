import { type IconProps } from "../_shared/icons";
export type IconTagSize = "xs" | "s" | "m" | "l" | "xl";
export type IconTagVariant = "neutral" | "info" | "success" | "warning" | "danger" | "inverted";
export interface IconTagProps {
    icon: IconProps;
    size?: IconTagSize;
    variant?: IconTagVariant;
    className?: string;
}
/** Small icon badge used inside card primitives. */
export declare const IconTag: import("react").ForwardRefExoticComponent<IconTagProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=IconTag.d.ts.map