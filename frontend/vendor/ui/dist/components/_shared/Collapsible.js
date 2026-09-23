import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
/**
 * Content-agnostic, aria-correct collapsible — the extracted version of the old
 * `ToolCodeBlock` (chevron + `aria-expanded`/`aria-controls`, the `--loading`
 * label state) so request/response (and anything else) can slot into it.
 *
 * @category Components
 */
export function Collapsible({ label, labelLoading, loading = false, defaultOpen = false, children, }) {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);
    const panelId = useId();
    const labelId = useId();
    const shownLabel = loading && labelLoading ? labelLoading : label;
    return (_jsxs("div", { className: "inv-tool-code-block", children: [_jsxs("button", { className: "inv-tool-code-block__header", type: "button", "aria-expanded": isExpanded, "aria-controls": panelId, onClick: () => setIsExpanded((v) => !v), children: [_jsx("span", { id: labelId, className: clsx("inv-tool-code-block__label", {
                            "inv-tool-code-block__label--loading": loading,
                        }), children: shownLabel }), _jsx(ChevronDown, { size: 14, className: clsx("inv-tool-code-block__chevron", {
                            "inv-tool-code-block__chevron--expanded": isExpanded,
                        }) })] }), isExpanded && (_jsx("div", { className: "inv-tool-code-block__content", id: panelId, role: "region", "aria-labelledby": labelId, children: children }))] }));
}
//# sourceMappingURL=Collapsible.js.map