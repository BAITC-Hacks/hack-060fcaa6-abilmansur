import React from "react";
/**
 * Wraps a GenUI assistant message with the assistant logo + content layout.
 *
 * Extracted from the (now-deleted) Shell so the kept `GenUIAssistantMessage`
 * keeps rendering under `AgentInterface`. `logoUrl`/`showAssistantLogo` come
 * from the library-wide shell store, which `AgentInterface`'s `Container`
 * provides via `ShellStoreProvider`.
 */
export declare const AssistantMessageContainer: ({ children, className, }: {
    children?: React.ReactNode;
    className?: string;
}) => React.JSX.Element;
//# sourceMappingURL=AssistantMessageContainer.d.ts.map