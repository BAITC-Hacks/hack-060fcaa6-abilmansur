import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Select";
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard";
import { CellOutline } from "./CellOutline";
export const EditableSelectCell = (props) => {
    const { value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table, } = props;
    const [editValue, setEditValue] = useState(value || "");
    const cellRef = useRef(null);
    // Get options from column definition through table instance
    const column = table.getColumn(columnId);
    const options = column?.columnDef?.meta?.options ?? [];
    const updateTableData = table.options.meta?.updateData;
    useEffect(() => {
        if (!isEditing)
            setEditValue(value || "");
    }, [value, isEditing]);
    useEffect(() => {
        if (isSelected && !isEditing && cellRef.current) {
            cellRef.current.focus();
        }
    }, [isSelected, isEditing]);
    const handleSave = useCallback(() => {
        updateTableData?.(rowIndex, columnId, editValue);
        onFinishEdit(true);
    }, [editValue, rowIndex, columnId, updateTableData, onFinishEdit]);
    const handleCancel = useCallback(() => {
        setEditValue(value || "");
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
    });
    // When Select is open and in editing mode, intercept certain keys
    const handleKeyDownWithSelect = useCallback((e) => {
        if (isEditing) {
            switch (e.key) {
                case "Tab":
                    e.preventDefault();
                    e.stopPropagation();
                    handleSave();
                    onNavigate(e.shiftKey ? "left" : "right");
                    return;
                case "Escape":
                    e.preventDefault();
                    e.stopPropagation();
                    handleCancel();
                    return;
            }
        }
        handleKeyDown(e);
    }, [isEditing, handleSave, handleCancel, onNavigate, handleKeyDown]);
    const handleClick = () => {
        if (!isSelected && !isEditing) {
            onSelect(rowIndex, columnId);
        }
        else if (isSelected && !isEditing) {
            onStartEdit(rowIndex, columnId);
        }
    };
    const handleValueChange = (newValue) => {
        setEditValue(newValue);
        // Save and finish editing on selection
        updateTableData?.(rowIndex, columnId, newValue);
        onFinishEdit(true);
    };
    // Handle when Select closes without selecting
    const handleOpenChange = (open) => {
        if (!open && isEditing) {
            onFinishEdit(false);
        }
    };
    return (_jsxs("div", { ref: cellRef, className: "inv-editable-table-cell-base", onClick: handleClick, onKeyDown: handleKeyDownWithSelect, tabIndex: 0, style: { outline: "none" }, children: [_jsx(CellOutline, { isSelected: isSelected, isEditing: isEditing }), _jsxs(Select, { value: editValue, onValueChange: handleValueChange, open: isEditing, onOpenChange: handleOpenChange, children: [_jsx(SelectTrigger, { className: "inv-editable-table-select-trigger", children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsx(SelectContent, { children: options.map((option) => (_jsx(SelectItem, { value: option.value, className: "inv-editable-table-select-item", children: option.label }, option.value))) })] })] }));
};
export default EditableSelectCell;
//# sourceMappingURL=EditableSelectCell.js.map