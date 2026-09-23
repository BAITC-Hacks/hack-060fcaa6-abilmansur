export type ImageTextLayout = "horizontal" | "vertical";
export interface ImageTextProps {
    title: string;
    subtitle?: string;
    src: string;
    alt?: string;
    bold?: boolean;
    layout?: ImageTextLayout;
    /** Square image size in px. Defaults to 40 for horizontal layout. */
    imageSize?: number;
    className?: string;
}
/** A small square image beside (or above) a title with an optional subtitle. */
export declare const ImageText: import("react").ForwardRefExoticComponent<ImageTextProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ImageText.d.ts.map