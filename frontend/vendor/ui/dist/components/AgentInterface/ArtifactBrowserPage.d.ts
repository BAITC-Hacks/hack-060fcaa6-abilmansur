import { type ArtifactSummary } from "@inv/headless";
import { type ReactNode } from "react";
export declare const formatArtifactUpdatedAt: (updatedAt: ArtifactSummary["updatedAt"]) => string | undefined;
/**
 * Resolves the visual for an artifact type: the icon declared on its renderer
 * (`defineArtifactRenderer({ icon })`) — any ReactNode the consumer chose — or a
 * generic default. The framework is agnostic about what that node is.
 */
export declare const useArtifactIcon: (type: string) => ReactNode;
/**
 * Resolves the display label for an artifact type: the label declared on its
 * renderer (`defineArtifactRenderer({ label })`), else a prettified `type`.
 * Mirrors {@link useArtifactIcon} — never shows the raw machine id.
 */
export declare const useArtifactTypeLabel: (type: string) => string;
/**
 * Full-page searchable artifact list for one category (reserved path
 * `artifacts/{category}`). Title search + category type filter are applied
 * server-side via `ArtifactStorage.list`; pagination via cursor.
 *
 * Internal — rendered by AgentInterface when the current path matches the
 * reserved `artifacts/` prefix.
 *
 * @internal
 */
export declare const ArtifactBrowserPage: ({ categoryName }: {
    categoryName?: string;
}) => import("react").JSX.Element | null;
//# sourceMappingURL=ArtifactBrowserPage.d.ts.map