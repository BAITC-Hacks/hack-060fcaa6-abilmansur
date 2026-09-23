import type { ToolMessage } from "@inv/headless";
export interface ToolResultProps {
    message: ToolMessage;
    /** The name of the tool that was called (resolved from the parent assistant message's toolCalls) */
    toolName?: string;
    className?: string;
}
export declare const ToolResult: ({ message, toolName, className }: ToolResultProps) => import("react").JSX.Element;
//# sourceMappingURL=ToolResult.d.ts.map