export type TextBlockVariant = "title-text" | "number-title-text" | "text-subtext" | "highlight-text-number-subtext" | "text" | "highlight-text" | "number" | "highlight-number";
export type TextBlockType = "text" | "number" | "textOnly";
export type TextBlockSize = "xs" | "sm" | "md" | "lg";
export type TextBlockAlign = "left" | "center" | "right";
export type TextBlockSecondaryTone = "positive" | "negative";
export interface TextBlockViewProps {
    primary: string;
    secondary?: string;
    tertiary?: string;
    variant?: TextBlockVariant;
    type?: TextBlockType;
    size?: TextBlockSize;
    align?: TextBlockAlign;
    secondaryMaxLines?: number;
    secondaryTone?: TextBlockSecondaryTone;
    className?: string;
}
/**
 * Low-level text primitive for card content: a primary line with optional
 * secondary/tertiary lines. `variant`, `size`, `type` and `align` control
 * emphasis, spacing and number styling.
 */
export declare const TextBlockView: import("react").ForwardRefExoticComponent<TextBlockViewProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TextBlock.d.ts.map