/**
 * Reserved nav paths for the artifact browser.
 *
 * `artifacts/{category}`        → searchable artifact list for a category
 * `artifacts/{category}/{id}`   → full-page artifact view
 *
 * `{category}` is the URI-encoded category name, or the literal `all` when no
 * `artifactCategories` are configured. The `artifacts/` prefix is reserved:
 * AgentInterface matches it before consulting user-defined `<Route>`s, and
 * controlled-mode `onNavigate` consumers must round-trip these paths.
 */
export declare const ARTIFACTS_PATH_PREFIX = "artifacts/";
export declare const UNCATEGORIZED_SEGMENT = "all";
export declare const artifactListPath: (categoryName?: string) => string;
export declare const artifactViewPath: (categoryName: string | undefined, artifactId: string) => string;
export type ParsedArtifactPath = {
    kind: "list";
    categoryName?: string;
} | {
    kind: "view";
    categoryName?: string;
    artifactId: string;
};
export declare function parseArtifactPath(path: string): ParsedArtifactPath | null;
//# sourceMappingURL=artifactPaths.d.ts.map