export interface ParsedMessageContent {
    content: string;
    contextString: string | null;
    contentHeader?: string;
    /**
     * True when the bare `]]>inv:end` liveness marker was present — the
     * stream reached its terminal chunk. Absent on a PERSISTED message ⇒ the
     * stream died mid-write. HOW a response ended is structural (output item
     * `status` + the Responses terminal event), never in-band bytes.
     */
    end?: boolean;
}
export declare function wrapContent(text: string): string;
export declare function wrapContentWithHeader(text: string, contentHeader?: string): string;
export declare function wrapContext(json: string): string;
export declare function separateContentAndContext(raw: string): ParsedMessageContent;
/**
 * Whether the content carries recognizable Inv-lang syntax — the
 * ```inv-lang ``` fence, or a top-level `root =` binding when emitted
 * unfenced.
 */
export declare function hasLangSyntax(content: string | null | undefined): boolean;
export type ArtifactKind = "slides" | "report";
export interface ArtifactSentinelHeader {
    artifact_id: string;
    type: ArtifactKind;
    name?: string;
    version?: string;
}
/**
 * Parse the artifact carrier `]]>inv:artifact <header-json>\n<program>` into
 * the validated header + raw program (program is "" on a stripped reload).
 * Returns null when `raw` is not an artifact sentinel.
 */
export declare function parseArtifactSentinel(raw: unknown): {
    header: ArtifactSentinelHeader;
    program: string;
} | null;
//# sourceMappingURL=sentinelParser.d.ts.map