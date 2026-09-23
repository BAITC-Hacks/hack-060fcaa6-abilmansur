/**
 * Inline fallback shown when a matched renderer's `parse`/`parser` throws.
 * Keeps one bad renderer from blanking the whole thread.
 *
 * @internal
 */
export declare function ToolCallErrorFallback({ error, toolName }: {
    error: string;
    toolName: string;
}): import("react").JSX.Element;
//# sourceMappingURL=ToolCallErrorFallback.d.ts.map