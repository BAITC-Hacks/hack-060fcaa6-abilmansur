import React from "react";
import type { EditableCellType } from "./base/components/CellTypes";
export type { EditableCellType } from "./base/components/CellTypes";
export interface EditableTableRow {
    id: string;
    [key: string]: any;
}
export interface EditableTableColumn {
    key: string;
    header: string;
    type?: EditableCellType;
    width?: number;
    /** Options for `select` type cells */
    options?: Array<{
        value: string;
        label: string;
    }>;
}
export interface EditableTableProps {
    data: EditableTableRow[];
    columns: EditableTableColumn[];
    onDataChange?: (data: EditableTableRow[]) => void;
    className?: string;
}
/**
 * Spreadsheet-like editable grid built on @tanstack/react-table. Cells are
 * selected with a click / keyboard and edited inline according to the column
 * `type` (text, number, url, date-single, select).
 */
export declare const EditableTable: React.ForwardRefExoticComponent<EditableTableProps & React.RefAttributes<HTMLDivElement>>;
export interface EditableTableChangesBarProps {
    /** Number of cells changed since the last save/reset */
    changedCellCount: number;
    onReset?: () => void;
    onSave?: () => void;
    resetLabel?: string;
    saveLabel?: string;
    className?: string;
}
/**
 * Pending-changes summary bar shown beneath an EditableTable, with reset / save actions.
 * Renders nothing when `changedCellCount` is 0.
 */
export declare const EditableTableChangesBar: ({ changedCellCount, onReset, onSave, resetLabel, saveLabel, className, }: EditableTableChangesBarProps) => React.JSX.Element | null;
//# sourceMappingURL=EditableTable.d.ts.map