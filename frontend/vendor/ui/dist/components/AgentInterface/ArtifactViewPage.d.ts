/**
 * Full-page artifact view (reserved path `artifacts/{category}/{id}`),
 * rendered independent of any thread.
 *
 * Fetches the artifact via `ArtifactStorage.get`, resolves the renderer by
 * `artifact.type`, runs the renderer's `parser` with
 * `{ args: undefined, response: artifact.content }` (stored content must have
 * the same shape as the tool-call response), and renders `actual` filling the
 * page. No DetailedView involvement.
 *
 * `controls.close` navigates back to the category list; `open`/`toggle` are
 * no-ops (the page IS the open state). `isStreaming` is always `false`.
 *
 * Internal — rendered by AgentInterface for the reserved `artifacts/` prefix.
 *
 * @internal
 */
export declare const ArtifactViewPage: ({ artifactId, categoryName, }: {
    artifactId: string;
    categoryName?: string;
}) => import("react").JSX.Element;
//# sourceMappingURL=ArtifactViewPage.d.ts.map