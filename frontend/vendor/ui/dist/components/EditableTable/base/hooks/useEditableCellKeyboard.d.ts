import React from "react";
import type { EditableCellNavigateDirection } from "../components/CellTypes";
export interface UseEditableCellKeyboardProps {
    isEditing: boolean;
    isSelected: boolean;
    rowIndex: number;
    columnId: string;
    onNavigate: (direction: EditableCellNavigateDirection) => void;
    onStartEdit: (rowIndex: number, columnId: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onStartEditWithChar?: (char: string) => void;
}
export declare const useEditableCellKeyboard: ({ isEditing, isSelected, rowIndex, columnId, onNavigate, onStartEdit, onSave, onCancel, onStartEditWithChar, }: UseEditableCellKeyboardProps) => {
    handleKeyDown: (e: React.KeyboardEvent) => void;
};
//# sourceMappingURL=useEditableCellKeyboard.d.ts.map