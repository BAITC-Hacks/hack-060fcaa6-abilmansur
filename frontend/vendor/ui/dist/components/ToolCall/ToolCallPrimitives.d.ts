import type { ToolActivity, ToolCallStatus } from "@inv/headless";
import { SquareCode } from "lucide-react";
import { type ReactNode } from "react";
/**
 * Compound, reusable building blocks for rendering one tool call + its result.
 *
 * `ToolCall.Root` holds the typed {@link ToolActivity} and expand state in
 * context; the thin parts read it and expose typed `data-*` / `aria` attributes
 * plus a `render` escape hatch (Base-UI / Radix style) so a consumer can swap
 * the element or markup per place. The batteries-included `DefaultToolCard` /
 * `TimelineToolCard` are just two compositions of these parts — drop them into a
 * sidebar, a compact chip, or a debug panel and reuse the typed state without
 * re-deriving anything.
 *
 * @category Components
 */
interface ToolCallContextValue {
    activity: ToolActivity;
    isLast: boolean;
    /**
     * Whether the owning thread is still running. The in-progress affordances
     * (icon spin, name shimmer) require this so a tool call that closed its args
     * but never received a result does NOT animate forever after the run ends.
     * Defaults to `true` for standalone (thread-less) primitive use.
     */
    running: boolean;
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    panelId: string;
    /** Stable id on the rendered Trigger button; names the Content region. */
    triggerId: string;
}
/** Reads the nearest {@link ToolCall.Root} context. @category Hooks */
export declare function useToolCall(): ToolCallContextValue;
type RenderProp<State, Props> = (state: State, props: Props) => ReactNode;
/** Default human label for a status + tool name. @category Functions */
export declare function defaultLabel(status: ToolCallStatus, name: string): string;
/** Pretty-prints a JSON result string, falling back to the raw string. @category Functions */
export declare function prettyResult(value?: string): string;
export declare function toolIcon(toolName: string, status: ToolCallStatus): typeof SquareCode;
interface PartProps<State> {
    render?: RenderProp<State, Record<string, unknown>>;
    className?: string;
    children?: ReactNode;
}
declare function Root({ activity, isLast, running, defaultOpen, className, children, }: {
    activity: ToolActivity;
    isLast?: boolean;
    /** Whether the owning thread is still running (gates the in-progress animations). */
    running?: boolean;
    defaultOpen?: boolean;
    className?: string;
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * The compound tool-call primitive set. Compose `Root` + parts to render a tool
 * call however a given surface needs.
 *
 * @category Components
 */
export declare const ToolCall: {
    Root: typeof Root;
    Trigger: ({ render, className, children }: PartProps<{
        state: "open" | "closed";
    }>) => ReactNode;
    Content: ({ render, className, children }: PartProps<{
        isOpen: boolean;
    }>) => ReactNode;
    StatusIcon: ({ render, className }: PartProps<{
        status: ToolCallStatus;
    }>) => ReactNode;
    StatusText: ({ render, className, }: PartProps<{
        status: ToolCallStatus;
        label: string;
    }>) => ReactNode;
    ToolName: ({ render, className }: PartProps<{
        toolName: string;
    }>) => ReactNode;
    Parameters: ({ render, className }: PartProps<{
        input: unknown;
        inputString: string;
    }>) => ReactNode;
    Result: ({ render, className, }: PartProps<{
        result?: string;
        isError: boolean;
        errorText?: string;
    }>) => ReactNode;
};
export {};
//# sourceMappingURL=ToolCallPrimitives.d.ts.map