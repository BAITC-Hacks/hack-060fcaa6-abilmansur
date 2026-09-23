import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lookupArtifactRendererByType, useArtifactCategories, useArtifactRendererRegistry, useArtifactStorage, useThreadList, } from "@inv/headless";
import { Boxes, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { DotMatrixLoader } from "../DotMatrixLoader";
import { IconButton } from "../IconButton";
import { artifactListPath, artifactViewPath } from "./_shared/artifactPaths";
import { useAgentInterfaceLabels } from "./_shared/labelsContext";
import { useNav } from "./_shared/navContext";
const SEARCH_DEBOUNCE_MS = 300;
/** Last-resort label: `"chart_v2"` → `"Chart V2"` (never the raw machine id). */
const prettifyType = (type) => type
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || type;
export const formatArtifactUpdatedAt = (updatedAt) => {
    if (updatedAt === undefined)
        return undefined;
    const date = new Date(updatedAt);
    if (Number.isNaN(date.getTime()))
        return undefined;
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
    }).format(date);
};
/**
 * Resolves the visual for an artifact type: the icon declared on its renderer
 * (`defineArtifactRenderer({ icon })`) — any ReactNode the consumer chose — or a
 * generic default. The framework is agnostic about what that node is.
 */
export const useArtifactIcon = (type) => {
    const registry = useArtifactRendererRegistry();
    const rendererIcon = registry ? lookupArtifactRendererByType(registry, type)?.icon : undefined;
    return rendererIcon ?? _jsx(Boxes, { size: "1em" });
};
/**
 * Resolves the display label for an artifact type: the label declared on its
 * renderer (`defineArtifactRenderer({ label })`), else a prettified `type`.
 * Mirrors {@link useArtifactIcon} — never shows the raw machine id.
 */
export const useArtifactTypeLabel = (type) => {
    const registry = useArtifactRendererRegistry();
    const label = registry ? lookupArtifactRendererByType(registry, type)?.label : undefined;
    return label ?? prettifyType(type);
};
const ArtifactBrowserCard = ({ artifact, updatedAt, onClick, }) => {
    const icon = useArtifactIcon(artifact.type);
    const typeLabel = useArtifactTypeLabel(artifact.type);
    const metadata = [typeLabel, updatedAt].filter(Boolean).join(" · ");
    return (_jsxs("button", { type: "button", className: "inv-agent-artifact-browser__item", onClick: onClick, children: [_jsx("span", { className: "inv-agent-artifact-browser__item-icon", children: icon }), _jsxs("div", { className: "inv-agent-artifact-browser__item-meta", children: [_jsx("span", { className: "inv-agent-artifact-browser__item-title", children: artifact.title }), metadata && (_jsx("span", { className: "inv-agent-artifact-browser__item-updated-at", children: metadata }))] })] }));
};
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
export const ArtifactBrowserPage = ({ categoryName }) => {
    const storage = useArtifactStorage();
    const categories = useArtifactCategories();
    const { navigate } = useNav();
    const switchToNewThread = useThreadList((s) => s.switchToNewThread);
    const { defaultCategory } = useAgentInterfaceLabels();
    const category = categoryName ? categories.find((c) => c.name === categoryName) : undefined;
    // A named category that matches no configured category (stale/renamed path,
    // hand-edited or bookmarked URL). Distinct from `all` (categoryName undefined),
    // which intentionally lists everything. `categories` is static config, so this
    // is decided synchronously with no loading race.
    const notFound = categoryName !== undefined && category === undefined;
    const typeFilter = category?.filter.type;
    const categoryIllustration = useArtifactIcon(typeFilter?.[0] ?? "");
    const categoryItemLabel = categoryName
        ? categoryName.replace(/s$/i, "").toLowerCase()
        : "artifact";
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [artifacts, setArtifacts] = useState([]);
    const [nextCursor, setNextCursor] = useState(undefined);
    // Starts true so a fresh mount (see the `key` on this component at its render
    // site — the category name) shows the loader immediately rather than flashing
    // the empty state before the fetch effect runs.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const requestIdRef = useRef(0);
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [search]);
    const typeKey = typeFilter?.join(" ");
    const emptyTitle = debouncedSearch
        ? `No results found for "${debouncedSearch}"`
        : `Ready to create your first ${categoryItemLabel}?`;
    const emptySubtitle = debouncedSearch
        ? undefined
        : "Start with a prompt and create your first draft.";
    // Initial page + reload on search/category change.
    useEffect(() => {
        if (!storage || notFound)
            return;
        const requestId = ++requestIdRef.current;
        setIsLoading(true);
        setError(null);
        storage
            .list({
            name: debouncedSearch || undefined,
            type: typeKey === undefined ? undefined : typeKey.split(" "),
        })
            .then(({ artifacts: page, nextCursor: cursor }) => {
            if (requestId !== requestIdRef.current)
                return;
            setArtifacts(page);
            setNextCursor(cursor);
            setIsLoading(false);
        })
            .catch((e) => {
            if (requestId !== requestIdRef.current)
                return;
            setError(e instanceof Error ? e : new Error(String(e)));
            setIsLoading(false);
        });
    }, [storage, debouncedSearch, typeKey, notFound]);
    const loadMore = () => {
        if (!storage || nextCursor === undefined || isLoading)
            return;
        const requestId = ++requestIdRef.current;
        setIsLoading(true);
        storage
            .list({
            name: debouncedSearch || undefined,
            type: typeKey === undefined ? undefined : typeKey.split(" "),
            cursor: nextCursor,
        })
            .then(({ artifacts: page, nextCursor: cursor }) => {
            if (requestId !== requestIdRef.current)
                return;
            setArtifacts((prev) => [...prev, ...page]);
            setNextCursor(cursor);
            setIsLoading(false);
        })
            .catch((e) => {
            if (requestId !== requestIdRef.current)
                return;
            setError(e instanceof Error ? e : new Error(String(e)));
            setIsLoading(false);
        });
    };
    const handleNewChat = () => {
        switchToNewThread();
        navigate(undefined);
    };
    if (!storage)
        return null;
    if (notFound) {
        return (_jsx("div", { className: "inv-agent-artifact-browser", children: _jsxs("div", { className: "inv-agent-artifact-browser__content", children: [_jsx("div", { className: "inv-agent-artifact-browser__header", children: _jsx("h2", { className: "inv-agent-artifact-browser__title", children: defaultCategory }) }), _jsx("div", { className: "inv-agent-artifact-browser__list", children: _jsxs("div", { className: "inv-agent-artifact-browser__empty", children: [_jsx("span", { className: "inv-agent-artifact-browser__empty-illustration", children: _jsx(Boxes, { size: "1em" }) }), _jsxs("span", { className: "inv-agent-artifact-browser__empty-text", children: ["No category named \u201C", categoryName, "\u201D"] }), _jsx(Button, { variant: "secondary", size: "small", onClick: () => navigate(artifactListPath()), children: "View all artifacts" })] }) })] }) }));
    }
    return (_jsx("div", { className: "inv-agent-artifact-browser", children: _jsxs("div", { className: "inv-agent-artifact-browser__content", children: [_jsxs("div", { className: "inv-agent-artifact-browser__header", children: [_jsx("h2", { className: "inv-agent-artifact-browser__title", children: categoryName ?? defaultCategory }), _jsxs("div", { className: "inv-agent-artifact-browser__search", children: [_jsx(Search, { size: 14, className: "inv-agent-artifact-browser__search-icon" }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by title", className: "inv-agent-artifact-browser__search-input", "aria-label": "Search artifacts by title" }), search && (_jsx(IconButton, { size: "2-extra-small", variant: "tertiary", icon: _jsx(X, { size: "1em" }), "aria-label": "Clear search", onClick: () => setSearch("") }))] })] }), _jsxs("div", { className: "inv-agent-artifact-browser__list", children: [error && (_jsxs("div", { className: "inv-agent-artifact-browser__error", children: ["Failed to load artifacts: ", error.message] })), !error && artifacts.length === 0 && !isLoading && (_jsxs("div", { className: "inv-agent-artifact-browser__empty", children: [_jsx("span", { className: "inv-agent-artifact-browser__empty-illustration", children: categoryIllustration }), _jsxs("div", { className: "inv-agent-artifact-browser__empty-copy", children: [_jsx("span", { className: "inv-agent-artifact-browser__empty-text", children: emptyTitle }), emptySubtitle && (_jsx("span", { className: "inv-agent-artifact-browser__empty-subtitle", children: emptySubtitle }))] }), !debouncedSearch && (_jsx(Button, { variant: "primary", size: "small", onClick: handleNewChat, children: "New Chat" }))] })), artifacts.map((artifact) => {
                            const updatedAt = formatArtifactUpdatedAt(artifact.updatedAt);
                            return (_jsx(ArtifactBrowserCard, { artifact: artifact, updatedAt: updatedAt, onClick: () => navigate(artifactViewPath(categoryName, artifact.id)) }, artifact.id));
                        }), isLoading && (_jsx("div", { className: "inv-agent-artifact-browser__loading", children: _jsx(DotMatrixLoader, {}) })), !isLoading && nextCursor !== undefined && (_jsx("div", { className: "inv-agent-artifact-browser__load-more", children: _jsx(Button, { variant: "secondary", size: "small", onClick: loadMore, children: "Load more" }) }))] })] }) }));
};
//# sourceMappingURL=ArtifactBrowserPage.js.map