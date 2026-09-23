export interface TextContentWrapperProps {
    textMarkdown: string;
    header?: {
        heading: string;
        description?: string;
    };
    variant?: "clear" | "card" | "sunk";
    className?: string;
}
/**
 * Full-featured markdown block for chat responses: GFM, math (KaTeX),
 * line breaks, and inline `[n]` citations resolved against the enclosing
 * `CardSourceProvider`.
 */
export declare const TextContentWrapper: import("react").MemoExoticComponent<(props: TextContentWrapperProps) => import("react").JSX.Element>;
//# sourceMappingURL=TextContentWrapper.d.ts.map