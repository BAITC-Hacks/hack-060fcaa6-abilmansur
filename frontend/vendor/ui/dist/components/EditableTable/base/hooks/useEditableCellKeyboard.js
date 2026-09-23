import { useCallback } from "react";
export const useEditableCellKeyboard = ({ isEditing, isSelected, rowIndex, columnId, onNavigate, onStartEdit, onSave, onCancel, onStartEditWithChar, }) => {
    const handleKeyDown = useCallback((e) => {
        if (isEditing) {
            switch (e.key) {
                case "Enter":
                    e.preventDefault();
                    onSave();
                    onNavigate("down");
                    break;
                case "Tab":
                    e.preventDefault();
                    onSave();
                    if (e.shiftKey) {
                        onNavigate("left");
                    }
                    else {
                        onNavigate("right");
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    onCancel();
                    break;
            }
        }
        else if (isSelected) {
            switch (e.key) {
                case "Enter":
                case "F2":
                    e.preventDefault();
                    onStartEdit(rowIndex, columnId);
                    break;
                case "Tab":
                    e.preventDefault();
                    if (e.shiftKey) {
                        onNavigate("left");
                    }
                    else {
                        onNavigate("right");
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    onNavigate("up");
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    onNavigate("down");
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    onNavigate("left");
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    onNavigate("right");
                    break;
                default:
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                        e.preventDefault();
                        onStartEdit(rowIndex, columnId);
                        onStartEditWithChar?.(e.key);
                    }
                    break;
            }
        }
    }, [
        isEditing,
        isSelected,
        rowIndex,
        columnId,
        onNavigate,
        onStartEdit,
        onSave,
        onCancel,
        onStartEditWithChar,
    ]);
    return { handleKeyDown };
};
//# sourceMappingURL=useEditableCellKeyboard.js.map