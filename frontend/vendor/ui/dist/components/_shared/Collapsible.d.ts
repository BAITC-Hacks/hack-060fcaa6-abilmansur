import { type ReactNode } from "react";
/**
 * Content-agnostic, aria-correct collapsible — the extracted version of the old
 * `ToolCodeBlock` (chevron + `aria-expanded`/`aria-controls`, the `--loading`
 * label state) so request/response (and anything else) can slot into it.
 *
 * @category Components
 */
export declare function Collapsible({ label, labelLoading, loading, defaultOpen, children, }: {
    label: string;
    /** Shimmering label shown while `loading` is `true` (falls back to `label`). */
    labelLoading?: string;
    loading?: boolean;
    defaultOpen?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=Collapsible.d.ts.map