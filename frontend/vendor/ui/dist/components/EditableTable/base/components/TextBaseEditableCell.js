import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { Info, Link } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { safeUrl } from "../../../_shared/utils";
import { TooltipWrapper } from "../../../TooltipWrapper";
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard";
import { isValidUrl } from "../utils/utilsFn";
import { CellOutline } from "./CellOutline";
const toDisplayString = (value) => value === undefined || value === null ? "" : String(value);
export const TextBaseEditableCell = ({ value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table, inputType, parseOnSave, renderDisplay, }) => {
    const [editValue, setEditValue] = useState(toDisplayString(value));
    const inputRef = useRef(null);
    const cellRef = useRef(null);
    const updateTableData = table.options.meta?.updateData;
    // Sync the edit buffer from the table only while not editing, so a re-render
    // caused by another cell's save cannot clobber in-progress typing.
    useEffect(() => {
        if (!isEditing)
            setEditValue(toDisplayString(value));
    }, [value, isEditing]);
    // Set when the user cancels; the blur that follows must not commit the value.
    const justCancelledRef = useRef(false);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    useEffect(() => {
        if (isSelected && !isEditing && cellRef.current) {
            cellRef.current.focus();
        }
    }, [isSelected, isEditing]);
    const handleSave = useCallback(() => {
        const processedValue = parseOnSave(editValue);
        updateTableData?.(rowIndex, columnId, processedValue);
        onFinishEdit(true);
    }, [editValue, parseOnSave, rowIndex, columnId, updateTableData, onFinishEdit]);
    const handleCancel = useCallback(() => {
        justCancelledRef.current = true;
        setEditValue(toDisplayString(value));
        onFinishEdit(false);
    }, [value, onFinishEdit]);
    const { handleKeyDown } = useEditableCellKeyboard({
        isEditing,
        isSelected,
        rowIndex,
        columnId,
        onNavigate,
        onStartEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onStartEditWithChar: (char) => setEditValue(char),
    });
    const handleClick = (e) => {
        // Let the url cell's anchor handle its own click.
        if (e.target.closest("a"))
            return;
        e.stopPropagation();
        if (!isSelected && !isEditing) {
            onSelect(rowIndex, columnId);
        }
        else {
            onStartEdit(rowIndex, columnId);
        }
    };
    const handleContainerBlur = (e) => {
        if (justCancelledRef.current) {
            justCancelledRef.current = false;
            return;
        }
        if (!isEditing)
            return;
        const currentTarget = e.currentTarget;
        const nextFocusedElement = e.relatedTarget;
        if (nextFocusedElement && currentTarget.contains(nextFocusedElement)) {
            return;
        }
        handleSave();
    };
    const renderContent = () => {
        if (isEditing) {
            return (_jsx("input", { ref: inputRef, type: inputType, value: editValue, onChange: (e) => setEditValue(e.target.value), onKeyDown: handleKeyDown, className: "inv-editable-table-cell-input" }));
        }
        const display = renderDisplay ? renderDisplay(value) : (value ?? "");
        if (inputType === "url") {
            const rawHref = toDisplayString(value);
            const safeHref = safeUrl(rawHref);
            const isValid = isValidUrl(rawHref) && safeHref !== undefined;
            return (_jsxs("div", { className: "inv-editable-table-display-url-container", children: [_jsx(Link, { size: 16, className: "inv-editable-table-display-url-icon" }), safeHref ? (_jsx("a", { href: safeHref, target: "_blank", rel: "noopener noreferrer", className: "inv-editable-table-display-url", onClick: (e) => e.stopPropagation(), children: display })) : (_jsx("span", { className: "inv-editable-table-display-url", onClick: (e) => e.stopPropagation(), children: display })), !isValid && (_jsx(TooltipWrapper, { tooltipContent: "This might not be a valid URL", side: "right", children: _jsx("div", { children: _jsx(Info, { size: 16, className: "inv-editable-table-display-url-warning-icon" }) }) }))] }));
        }
        return (_jsx("span", { className: clsx({
                "inv-editable-table-display-text": inputType === "text",
                "inv-editable-table-display-number": inputType === "number",
            }), children: display }));
    };
    return (_jsxs("div", { ref: cellRef, className: "inv-editable-table-cell-base", onClick: handleClick, onKeyDown: handleKeyDown, onBlur: handleContainerBlur, tabIndex: 0, style: { outline: "none" }, children: [_jsx(CellOutline, { isSelected: isSelected, isEditing: isEditing }), renderContent()] }));
};
export default TextBaseEditableCell;
//# sourceMappingURL=TextBaseEditableCell.js.map