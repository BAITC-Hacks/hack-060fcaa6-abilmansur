import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import clsx from "clsx";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Link, List, RotateCcw, Type, } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { getCellRenderer } from "./base/components/cellRegistry";
const CellRenderer = (info) => {
    const colKey = info.column.id;
    const colConfig = info.columns.find((c) => c.key === colKey);
    const type = (colConfig?.type || "text");
    const CellCmp = getCellRenderer(type);
    const rowIndex = info.row.index;
    const columnId = colKey;
    const isSelected = info.selectedPosition?.row === rowIndex && info.selectedPosition?.column === columnId;
    const isEditing = info.editingPosition?.row === rowIndex && info.editingPosition?.column === columnId;
    return (_jsx(CellCmp, { value: info.getValue(), rowIndex: rowIndex, columnId: columnId, isSelected: isSelected, isEditing: isEditing, onSelect: info.handleCellSelect, onStartEdit: info.handleStartEdit, onFinishEdit: info.handleFinishEdit, onNavigate: info.handleNavigate, table: info.table }));
};
const headerIcon = (type) => {
    switch (type) {
        case "url":
            return _jsx(Link, { size: 16 });
        case "date-single":
            return _jsx(CalendarDays, { size: 16 });
        case "select":
            return _jsx(List, { size: 16 });
        case "text":
        case "number":
        default:
            return _jsx(Type, { size: 16 });
    }
};
const PORTAL_CELL_TYPES = ["date-single", "select"];
/**
 * Spreadsheet-like editable grid built on @tanstack/react-table. Cells are
 * selected with a click / keyboard and edited inline according to the column
 * `type` (text, number, url, date-single, select).
 */
export const EditableTable = React.forwardRef(({ data, columns, onDataChange, className }, ref) => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [editingPosition, setEditingPosition] = useState(null);
    const tableRef = useRef(null);
    const scrollContainerRef = useRef(null);
    /**
     * Horizontal scroll controls state
     * - isScrollable: whether content overflows horizontally
     * - canScrollLeft/canScrollRight: whether there is hidden content in that direction
     * - columnLefts: cumulative left offsets of header cells relative to the scroll container
     *   Used to snap scrolling by exactly one column at a time.
     */
    const [isScrollable, setIsScrollable] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [columnLefts, setColumnLefts] = useState([]);
    React.useImperativeHandle(ref, () => tableRef.current);
    const updateData = useCallback((rowIndex, columnId, value) => {
        const oldRow = data[rowIndex];
        if (!oldRow)
            return;
        const newData = [...data];
        newData[rowIndex] = { ...oldRow, [columnId]: value };
        onDataChange?.(newData);
    }, [data, onDataChange]);
    const handleCellSelect = useCallback((rowIndex, columnId) => {
        setSelectedPosition({ row: rowIndex, column: columnId });
        setEditingPosition(null);
    }, []);
    const handleStartEdit = useCallback((rowIndex, columnId) => {
        const cellType = columns.find((col) => col.key === columnId)?.type ?? "text";
        setSelectedPosition({ row: rowIndex, column: columnId });
        setEditingPosition({ row: rowIndex, column: columnId, cellType });
    }, [columns]);
    const handleFinishEdit = useCallback((_save) => {
        // Keep the cell selected after editing
        setEditingPosition(null);
    }, []);
    const handleNavigate = useCallback((direction) => {
        if (!selectedPosition)
            return;
        const { row, column } = selectedPosition;
        const columnIndex = columns.findIndex((col) => col.key === column);
        let newRow = row;
        let newColumnIndex = columnIndex;
        switch (direction) {
            case "up":
                newRow = Math.max(0, row - 1);
                break;
            case "down":
                newRow = Math.min(data.length - 1, row + 1);
                break;
            case "left":
                newColumnIndex = Math.max(0, columnIndex - 1);
                break;
            case "right":
                newColumnIndex = Math.min(columns.length - 1, columnIndex + 1);
                break;
        }
        const newColumn = columns[newColumnIndex]?.key || column;
        setSelectedPosition({ row: newRow, column: newColumn });
        setEditingPosition(null);
    }, [selectedPosition, columns, data.length]);
    // Handle table-level keyboard events
    useEffect(() => {
        const handleTableKeyDown = (e) => {
            // Only handle if no cell is focused and we're not editing
            if (!editingPosition && document.activeElement === tableRef.current) {
                if (e.key === "Tab") {
                    e.preventDefault();
                    // Focus first cell if nothing is selected
                    if (!selectedPosition && data.length > 0 && columns.length > 0) {
                        const firstColumn = columns[0];
                        if (firstColumn) {
                            setSelectedPosition({ row: 0, column: firstColumn.key });
                        }
                    }
                }
            }
        };
        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener("keydown", handleTableKeyDown);
            return () => {
                tableElement.removeEventListener("keydown", handleTableKeyDown);
            };
        }
        return undefined;
    }, [editingPosition, selectedPosition, data.length, columns]);
    // Handle click outside table to deselect
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isPortalCellEditing = editingPosition?.cellType && PORTAL_CELL_TYPES.includes(editingPosition.cellType);
            if (tableRef.current &&
                !tableRef.current.contains(event.target) &&
                !isPortalCellEditing) {
                // Clear selections - the blur event will handle saving any active edits
                setSelectedPosition(null);
                setEditingPosition(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [editingPosition?.cellType]);
    const columnHelper = createColumnHelper();
    const tableColumns = columns.map((col) => columnHelper.accessor(col.key, {
        header: col.header,
        minSize: 0,
        size: col.width || 120,
        meta: (col.options
            ? { options: col.options, type: col.type }
            : { type: col.type }),
    }));
    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        meta: { updateData },
    });
    const headerIconForColumn = useCallback((column) => {
        const type = column.columnDef.meta?.type;
        return type ? headerIcon(type) : null;
    }, []);
    /**
     * Measure scrollability and header column positions.
     * - Recomputes on container resize via ResizeObserver
     * - Updates button enabled/disabled state on scroll
     * - Computes `columnLefts` by reading each <th> left position relative to the scroll container
     */
    useEffect(() => {
        const container = scrollContainerRef.current;
        const wrapper = tableRef.current;
        if (!container || !wrapper)
            return;
        const updateScrollButtons = () => {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
        };
        const compute = () => {
            setIsScrollable(container.scrollWidth > container.clientWidth);
            updateScrollButtons();
            // Measure header cell left positions relative to the scroll container
            const ths = wrapper.querySelectorAll("thead th");
            if (!ths || ths.length === 0) {
                setColumnLefts([]);
                return;
            }
            const containerRect = container.getBoundingClientRect();
            const lefts = [];
            ths.forEach((th) => {
                const rect = th.getBoundingClientRect();
                const left = rect.left - containerRect.left + container.scrollLeft;
                lefts.push(Math.max(0, Math.round(left)));
            });
            // Ensure unique and sorted
            setColumnLefts(Array.from(new Set(lefts)).sort((a, b) => a - b));
        };
        compute();
        const ro = new ResizeObserver(() => compute());
        ro.observe(container);
        container.addEventListener("scroll", updateScrollButtons);
        return () => {
            ro.disconnect();
            container.removeEventListener("scroll", updateScrollButtons);
        };
    }, [columns, data]);
    /**
     * Scroll right to the start of the next column that is not fully visible.
     * If no next column is found, scrolls to the maximum possible scroll position.
     */
    const scrollToNextColumn = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container || columnLefts.length === 0)
            return;
        const current = container.scrollLeft;
        const target = columnLefts.find((l) => l > current + 1);
        const maxScroll = container.scrollWidth - container.clientWidth;
        const next = typeof target === "number" ? target : maxScroll;
        container.scrollTo({ left: Math.min(next, maxScroll), behavior: "smooth" });
    }, [columnLefts]);
    /**
     * Scroll left to the start of the previous column.
     * Picks the nearest stored left offset smaller than current scrollLeft.
     */
    const scrollToPrevColumn = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container || columnLefts.length === 0)
            return;
        const current = container.scrollLeft;
        const prevs = columnLefts.filter((l) => l < current - 1);
        const prev = prevs.at(-1) ?? 0;
        container.scrollTo({ left: Math.max(0, prev), behavior: "smooth" });
    }, [columnLefts]);
    return (_jsxs("div", { className: clsx("inv-editable-table-wrapper", className), ref: tableRef, tabIndex: 0, children: [isScrollable && (_jsxs(_Fragment, { children: [_jsx("div", { className: clsx("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--left", !canScrollLeft && "inv-editable-table-scroll-control--disabled"), children: _jsx(IconButton, { "aria-label": "Scroll left", size: "small", variant: "secondary", onClick: scrollToPrevColumn, disabled: !canScrollLeft, icon: _jsx(ChevronLeft, { size: 16 }) }) }), _jsx("div", { className: clsx("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--right", !canScrollRight && "inv-editable-table-scroll-control--disabled"), children: _jsx(IconButton, { "aria-label": "Scroll right", size: "small", variant: "secondary", onClick: scrollToNextColumn, disabled: !canScrollRight, icon: _jsx(ChevronRight, { size: 16 }) }) })] })), _jsx("div", { className: "inv-editable-table-scroll-container", ref: scrollContainerRef, children: _jsxs("table", { className: "inv-editable-table-table", style: { width: isScrollable ? "max-content" : "100%" }, children: [_jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { children: headerGroup.headers.map((header) => (_jsx("th", { style: { width: header.getSize() }, children: _jsxs("div", { className: "inv-editable-table-header-container", children: [header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext()), _jsx("div", { className: "inv-editable-table-header-icon", children: headerIconForColumn(header.column) })] }) }, header.id))) }, headerGroup.id))) }), _jsx("tbody", { children: table.getRowModel().rows.map((row) => (_jsx("tr", { children: row.getVisibleCells().map((cell) => (_jsx("td", { style: { width: cell.column.getSize() }, children: flexRender(CellRenderer, {
                                        ...cell.getContext(),
                                        columns,
                                        selectedPosition,
                                        editingPosition,
                                        handleCellSelect,
                                        handleStartEdit,
                                        handleFinishEdit,
                                        handleNavigate,
                                    }) }, cell.id))) }, row.id))) })] }) })] }));
});
EditableTable.displayName = "EditableTable";
/**
 * Pending-changes summary bar shown beneath an EditableTable, with reset / save actions.
 * Renders nothing when `changedCellCount` is 0.
 */
export const EditableTableChangesBar = ({ changedCellCount, onReset, onSave, resetLabel = "Reset", saveLabel = "Save Changes", className, }) => {
    if (changedCellCount <= 0)
        return null;
    return (_jsxs("div", { className: clsx("inv-editable-table-changes-container", className), children: [_jsxs("div", { className: "inv-editable-table-changes-count", children: [changedCellCount, " changes made"] }), _jsxs("div", { className: "inv-editable-table-changes-buttons", children: [_jsx(Button, { onClick: onReset, variant: "secondary", size: "small", iconLeft: _jsx(RotateCcw, { size: 16 }), children: resetLabel }), _jsx(Button, { onClick: onSave, variant: "primary", size: "small", iconLeft: _jsx(Check, { size: 16 }), children: saveLabel })] })] }));
};
//# sourceMappingURL=EditableTable.js.map