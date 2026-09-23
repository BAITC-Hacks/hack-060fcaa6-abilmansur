export interface SourceFaviconImageProps {
    height: number;
    width: number;
    url: string;
    alt: string;
}
/**
 * Favicon image with a globe-icon fallback. Google's favicon service returns a
 * 16x16 placeholder when it has nothing better, which is treated as a miss.
 */
export declare const SourceFaviconImage: import("react").MemoExoticComponent<({ height, width, url, alt }: SourceFaviconImageProps) => import("react").JSX.Element>;
//# sourceMappingURL=SourceFaviconImage.d.ts.map