/**
 * # TextContentCitation
 *
 * Renders inline citations in markdown text. Converts citation markers like [1][2]
 * into interactive Citation components that link to source URLs.
 *
 * **How it works:**
 * 1. Detects spans with `data-component-type="citation"` and `data-citation-indices="1,2"`
 * 2. Looks up sources from CardSourceContext using citation indices (converts 1-indexed to 0-indexed)
 * 3. Filters to only include sources with valid titles/names
 * 4. Renders Citation component, or returns null if no valid sources
 *
 * Wired in as the `span` component of markdown renderers together with the
 * `remarkCitations` plugin - typically not called directly.
 */
import { HTMLAttributes, ReactNode } from "react";
export type TextContentCitationProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    node?: {
        properties?: Record<string, unknown>;
    };
    children?: ReactNode;
};
export declare const TextContentCitation: ({ node, children, ...rest }: TextContentCitationProps) => import("react").JSX.Element | null;
//# sourceMappingURL=TextContentCitation.d.ts.map