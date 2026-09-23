import { Key, ReactNode } from "react";
import { z } from "zod/v4";
export declare const CardSourceSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    sourceName: z.ZodString;
}, z.core.$strip>;
export type CardSource = z.infer<typeof CardSourceSchema>;
export interface SourceWithFavicon extends CardSource {
    faviconUrl: string;
    key?: Key;
}
export declare const openSourceInNewTab: (url?: string) => void;
/**
 * React context that provides enriched source data to child components.
 * Contains sources with favicon URLs, source IDs, and validation status.
 */
export declare const CardSourceContext: import("react").Context<SourceWithFavicon[] | undefined>;
/**
 * Returns the favicon URL for a given website using Google's favicon service.
 *
 * Attempts to parse the provided URL string and extract the hostname (domain).
 * If parsing succeeds, returns a URL (with size 128) from Google's s2/favicons API.
 * If the URL is invalid or parsing fails, returns an empty string.
 */
export declare const getFaviconUrl: (url?: string) => string;
/**
 * Context provider that enriches sources with favicon URLs.
 * Generates favicon URLs from Google's service for each source.
 */
export declare const CardSourceProvider: ({ sources, children, }: {
    sources: CardSource[] | undefined;
    children: ReactNode;
}) => import("react").JSX.Element;
/**
 * Hook to access all enriched sources from CardSourceContext.
 * Returns array of SourceWithFavicon objects, or empty array if context unavailable.
 */
export declare const useCardSourceContext: () => SourceWithFavicon[];
//# sourceMappingURL=SourceContext.d.ts.map