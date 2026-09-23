import { SourceWithFavicon } from "../Sources/SourceContext";
export interface CitationProps {
    onClick?: () => void;
    sources: SourceWithFavicon[];
}
/**
 * Inline citation trigger: a small globe button that opens a pinnable tooltip
 * listing the cited sources.
 */
export declare const Citation: import("react").MemoExoticComponent<(props: CitationProps) => import("react").JSX.Element | null>;
//# sourceMappingURL=Citation.d.ts.map