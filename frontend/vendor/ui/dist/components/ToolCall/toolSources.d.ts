/**
 * Extraction of link "sources" from tool RESULT text, powering the
 * favicon + title rows on tool cards.
 */
export interface ToolResultSource {
    title: string;
    url: string;
    /** Domain used for the favicon lookup (e.g. `en.wikipedia.org`). */
    host: string;
    /** Human-ish site name derived from the host (e.g. `Wikipedia`). */
    siteName: string;
}
/**
 * Link sources of a tool result, deduped by URL. `[]` when no extractor
 * claims the tool or nothing in the result parses.
 */
export declare function extractToolSources(toolName: string, result: string): ToolResultSource[];
//# sourceMappingURL=toolSources.d.ts.map