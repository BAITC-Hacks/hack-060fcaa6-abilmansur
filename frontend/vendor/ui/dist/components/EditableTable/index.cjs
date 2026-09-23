Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_components_IconButton_index = require("../IconButton/index.cjs");
const require_components_Button_index = require("../Button/index.cjs");
const require_components_Select_index = require("../Select/index.cjs");
const require_utils = require("../../utils-DcYdyqC-.cjs");
const require_DatePicker = require("../../DatePicker-BEdZZMXw.cjs");
const require_components_TooltipWrapper_index = require("../TooltipWrapper/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
react = require_chunk.__toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
let _tanstack_react_table = require("@tanstack/react-table");
//#region src/components/EditableTable/base/hooks/useEditableCellKeyboard.ts
const useEditableCellKeyboard = ({ isEditing, isSelected, rowIndex, columnId, onNavigate, onStartEdit, onSave, onCancel, onStartEditWithChar }) => {
	return { handleKeyDown: (0, react.useCallback)((e) => {
		if (isEditing) switch (e.key) {
			case "Enter":
				e.preventDefault();
				onSave();
				onNavigate("down");
				break;
			case "Tab":
				e.preventDefault();
				onSave();
				if (e.shiftKey) onNavigate("left");
				else onNavigate("right");
				break;
			case "Escape":
				e.preventDefault();
				onCancel();
				break;
		}
		else if (isSelected) switch (e.key) {
			case "Enter":
			case "F2":
				e.preventDefault();
				onStartEdit(rowIndex, columnId);
				break;
			case "Tab":
				e.preventDefault();
				if (e.shiftKey) onNavigate("left");
				else onNavigate("right");
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
	}, [
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave,
		onCancel,
		onStartEditWithChar
	]) };
};
//#endregion
//#region src/components/EditableTable/base/components/CellOutline.tsx
const SIDES = [
	"top",
	"bottom",
	"left",
	"right"
];
const CellOutline = ({ isSelected, isEditing }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: SIDES.map((side) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, clsx.default)(`inv-editable-table-cell-outline-${side}`, isSelected && `inv-editable-table-cell-outline-${side}-selected`, isEditing && `inv-editable-table-cell-outline-${side}-editing`) }, side)) });
};
//#endregion
//#region src/components/EditableTable/base/components/EditableDateCell.tsx
/** Table cells store dates as ISO strings; parse them back for the picker. */
function toDate(value) {
	if (value instanceof Date) return value;
	if (typeof value !== "string" && typeof value !== "number") return void 0;
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? void 0 : d;
}
const EditableDateCell = (props) => {
	const { value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table } = props;
	const [editDate, setEditDate] = (0, react.useState)(toDate(value));
	const cellRef = (0, react.useRef)(null);
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditDate(toDate(value));
	}, [value, isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleCancel = (0, react.useCallback)(() => {
		setEditDate(toDate(value));
		onFinishEdit(false);
	}, [value, onFinishEdit]);
	const { handleKeyDown } = useEditableCellKeyboard({
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave: () => {},
		onCancel: handleCancel
	});
	const handleKeyDownWithPicker = (0, react.useCallback)((e) => {
		if (isEditing) switch (e.key) {
			case "Tab":
				e.preventDefault();
				e.stopPropagation();
				onNavigate(e.shiftKey ? "left" : "right");
				return;
			case "Enter":
				e.preventDefault();
				e.stopPropagation();
				onNavigate("down");
				return;
			case "Escape":
				e.preventDefault();
				e.stopPropagation();
				handleCancel();
				return;
		}
		handleKeyDown(e);
	}, [
		isEditing,
		handleCancel,
		onNavigate,
		handleKeyDown
	]);
	const handleClick = (e) => {
		if (isEditing) return;
		e.stopPropagation();
		if (!isSelected) onSelect(rowIndex, columnId);
		else onStartEdit(rowIndex, columnId);
	};
	const handleDateChange = (date) => {
		setEditDate(date);
		updateTableData?.(rowIndex, columnId, date?.toISOString());
		onFinishEdit(true);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClickCapture: handleClick,
		onKeyDown: handleKeyDownWithPicker,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DatePicker.DatePicker, {
			selectedSingleDate: editDate,
			setSelectedSingleDate: handleDateChange,
			mode: "single",
			isOpen: isEditing,
			setIsOpen: (isOpen) => {
				if (!isOpen) onFinishEdit(true);
			}
		})]
	});
};
//#endregion
//#region src/components/EditableTable/base/utils/utilsFn.ts
const isValidUrl = (value) => {
	if (typeof value !== "string") return false;
	const str = value.trim();
	if (!str) return false;
	return (/* @__PURE__ */ new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")).test(str);
};
//#endregion
//#region src/components/EditableTable/base/components/TextBaseEditableCell.tsx
const toDisplayString = (value) => value === void 0 || value === null ? "" : String(value);
const TextBaseEditableCell = ({ value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table, inputType, parseOnSave, renderDisplay }) => {
	const [editValue, setEditValue] = (0, react.useState)(toDisplayString(value));
	const inputRef = (0, react.useRef)(null);
	const cellRef = (0, react.useRef)(null);
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditValue(toDisplayString(value));
	}, [value, isEditing]);
	const justCancelledRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleSave = (0, react.useCallback)(() => {
		const processedValue = parseOnSave(editValue);
		updateTableData?.(rowIndex, columnId, processedValue);
		onFinishEdit(true);
	}, [
		editValue,
		parseOnSave,
		rowIndex,
		columnId,
		updateTableData,
		onFinishEdit
	]);
	const { handleKeyDown } = useEditableCellKeyboard({
		isEditing,
		isSelected,
		rowIndex,
		columnId,
		onNavigate,
		onStartEdit,
		onSave: handleSave,
		onCancel: (0, react.useCallback)(() => {
			justCancelledRef.current = true;
			setEditValue(toDisplayString(value));
			onFinishEdit(false);
		}, [value, onFinishEdit]),
		onStartEditWithChar: (char) => setEditValue(char)
	});
	const handleClick = (e) => {
		if (e.target.closest("a")) return;
		e.stopPropagation();
		if (!isSelected && !isEditing) onSelect(rowIndex, columnId);
		else onStartEdit(rowIndex, columnId);
	};
	const handleContainerBlur = (e) => {
		if (justCancelledRef.current) {
			justCancelledRef.current = false;
			return;
		}
		if (!isEditing) return;
		const currentTarget = e.currentTarget;
		const nextFocusedElement = e.relatedTarget;
		if (nextFocusedElement && currentTarget.contains(nextFocusedElement)) return;
		handleSave();
	};
	const renderContent = () => {
		if (isEditing) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: inputType,
			value: editValue,
			onChange: (e) => setEditValue(e.target.value),
			onKeyDown: handleKeyDown,
			className: "inv-editable-table-cell-input"
		});
		const display = renderDisplay ? renderDisplay(value) : value ?? "";
		if (inputType === "url") {
			const rawHref = toDisplayString(value);
			const safeHref = require_utils.safeUrl(rawHref);
			const isValid = isValidUrl(rawHref) && safeHref !== void 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-editable-table-display-url-container",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, {
						size: 16,
						className: "inv-editable-table-display-url-icon"
					}),
					safeHref ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						href: safeHref,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inv-editable-table-display-url",
						onClick: (e) => e.stopPropagation(),
						children: display
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "inv-editable-table-display-url",
						onClick: (e) => e.stopPropagation(),
						children: display
					}),
					!isValid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_TooltipWrapper_index.TooltipWrapper, {
						tooltipContent: "This might not be a valid URL",
						side: "right",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Info, {
							size: 16,
							className: "inv-editable-table-display-url-warning-icon"
						}) })
					})
				]
			});
		}
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, clsx.default)({
				"inv-editable-table-display-text": inputType === "text",
				"inv-editable-table-display-number": inputType === "number"
			}),
			children: display
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		onBlur: handleContainerBlur,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), renderContent()]
	});
};
//#endregion
//#region src/components/EditableTable/base/components/EditableNumberCell.tsx
const EditableNumberCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "number",
	parseOnSave: (raw) => {
		const parsed = parseFloat(raw);
		return Number.isFinite(parsed) ? parsed : 0;
	},
	renderDisplay: (value) => value === void 0 || value === null ? "" : String(value)
});
//#endregion
//#region src/components/EditableTable/base/components/EditableSelectCell.tsx
const EditableSelectCell = (props) => {
	const { value, rowIndex, columnId, isSelected, isEditing, onSelect, onStartEdit, onFinishEdit, onNavigate, table } = props;
	const [editValue, setEditValue] = (0, react.useState)(value || "");
	const cellRef = (0, react.useRef)(null);
	const options = (table.getColumn(columnId)?.columnDef?.meta)?.options ?? [];
	const updateTableData = table.options.meta?.updateData;
	(0, react.useEffect)(() => {
		if (!isEditing) setEditValue(value || "");
	}, [value, isEditing]);
	(0, react.useEffect)(() => {
		if (isSelected && !isEditing && cellRef.current) cellRef.current.focus();
	}, [isSelected, isEditing]);
	const handleSave = (0, react.useCallback)(() => {
		updateTableData?.(rowIndex, columnId, editValue);
		onFinishEdit(true);
	}, [
		editValue,
		rowIndex,
		columnId,
		updateTableData,
		onFinishEdit
	]);
	const handleCancel = (0, react.useCallback)(() => {
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
		onCancel: handleCancel
	});
	const handleKeyDownWithSelect = (0, react.useCallback)((e) => {
		if (isEditing) switch (e.key) {
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
		handleKeyDown(e);
	}, [
		isEditing,
		handleSave,
		handleCancel,
		onNavigate,
		handleKeyDown
	]);
	const handleClick = () => {
		if (!isSelected && !isEditing) onSelect(rowIndex, columnId);
		else if (isSelected && !isEditing) onStartEdit(rowIndex, columnId);
	};
	const handleValueChange = (newValue) => {
		setEditValue(newValue);
		updateTableData?.(rowIndex, columnId, newValue);
		onFinishEdit(true);
	};
	const handleOpenChange = (open) => {
		if (!open && isEditing) onFinishEdit(false);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		ref: cellRef,
		className: "inv-editable-table-cell-base",
		onClick: handleClick,
		onKeyDown: handleKeyDownWithSelect,
		tabIndex: 0,
		style: { outline: "none" },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellOutline, {
			isSelected,
			isEditing
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Select_index.Select, {
			value: editValue,
			onValueChange: handleValueChange,
			open: isEditing,
			onOpenChange: handleOpenChange,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectTrigger, {
				className: "inv-editable-table-select-trigger",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectValue, { placeholder: "Select an option" })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectContent, { children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectItem, {
				value: option.value,
				className: "inv-editable-table-select-item",
				children: option.label
			}, option.value)) })]
		})]
	});
};
//#endregion
//#region src/components/EditableTable/base/components/EditableTextCell.tsx
const EditableTextCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "text",
	parseOnSave: (raw) => raw
});
//#endregion
//#region src/components/EditableTable/base/components/EditableUrlCell.tsx
const EditableUrlCell = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextBaseEditableCell, {
	...props,
	inputType: "url",
	parseOnSave: (raw) => raw,
	renderDisplay: (value) => value === void 0 || value === null ? "" : String(value)
});
//#endregion
//#region src/components/EditableTable/base/components/cellRegistry.ts
const registry = {
	text: EditableTextCell,
	number: EditableNumberCell,
	"date-single": EditableDateCell,
	select: EditableSelectCell,
	url: EditableUrlCell
};
function getCellRenderer(type) {
	return registry[type ?? "text"];
}
//#endregion
//#region src/components/EditableTable/EditableTable.tsx
const CellRenderer = (info) => {
	const colKey = info.column.id;
	const CellCmp = getCellRenderer(info.columns.find((c) => c.key === colKey)?.type || "text");
	const rowIndex = info.row.index;
	const columnId = colKey;
	const isSelected = info.selectedPosition?.row === rowIndex && info.selectedPosition?.column === columnId;
	const isEditing = info.editingPosition?.row === rowIndex && info.editingPosition?.column === columnId;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CellCmp, {
		value: info.getValue(),
		rowIndex,
		columnId,
		isSelected,
		isEditing,
		onSelect: info.handleCellSelect,
		onStartEdit: info.handleStartEdit,
		onFinishEdit: info.handleFinishEdit,
		onNavigate: info.handleNavigate,
		table: info.table
	});
};
const headerIcon = (type) => {
	switch (type) {
		case "url": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Link, { size: 16 });
		case "date-single": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.CalendarDays, { size: 16 });
		case "select": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.List, { size: 16 });
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Type, { size: 16 });
	}
};
const PORTAL_CELL_TYPES = ["date-single", "select"];
/**
* Spreadsheet-like editable grid built on @tanstack/react-table. Cells are
* selected with a click / keyboard and edited inline according to the column
* `type` (text, number, url, date-single, select).
*/
const EditableTable = react.default.forwardRef(({ data, columns, onDataChange, className }, ref) => {
	const [selectedPosition, setSelectedPosition] = (0, react.useState)(null);
	const [editingPosition, setEditingPosition] = (0, react.useState)(null);
	const tableRef = (0, react.useRef)(null);
	const scrollContainerRef = (0, react.useRef)(null);
	/**
	* Horizontal scroll controls state
	* - isScrollable: whether content overflows horizontally
	* - canScrollLeft/canScrollRight: whether there is hidden content in that direction
	* - columnLefts: cumulative left offsets of header cells relative to the scroll container
	*   Used to snap scrolling by exactly one column at a time.
	*/
	const [isScrollable, setIsScrollable] = (0, react.useState)(false);
	const [canScrollLeft, setCanScrollLeft] = (0, react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, react.useState)(false);
	const [columnLefts, setColumnLefts] = (0, react.useState)([]);
	react.default.useImperativeHandle(ref, () => tableRef.current);
	const updateData = (0, react.useCallback)((rowIndex, columnId, value) => {
		const oldRow = data[rowIndex];
		if (!oldRow) return;
		const newData = [...data];
		newData[rowIndex] = {
			...oldRow,
			[columnId]: value
		};
		onDataChange?.(newData);
	}, [data, onDataChange]);
	const handleCellSelect = (0, react.useCallback)((rowIndex, columnId) => {
		setSelectedPosition({
			row: rowIndex,
			column: columnId
		});
		setEditingPosition(null);
	}, []);
	const handleStartEdit = (0, react.useCallback)((rowIndex, columnId) => {
		const cellType = columns.find((col) => col.key === columnId)?.type ?? "text";
		setSelectedPosition({
			row: rowIndex,
			column: columnId
		});
		setEditingPosition({
			row: rowIndex,
			column: columnId,
			cellType
		});
	}, [columns]);
	const handleFinishEdit = (0, react.useCallback)((_save) => {
		setEditingPosition(null);
	}, []);
	const handleNavigate = (0, react.useCallback)((direction) => {
		if (!selectedPosition) return;
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
		setSelectedPosition({
			row: newRow,
			column: newColumn
		});
		setEditingPosition(null);
	}, [
		selectedPosition,
		columns,
		data.length
	]);
	(0, react.useEffect)(() => {
		const handleTableKeyDown = (e) => {
			if (!editingPosition && document.activeElement === tableRef.current) {
				if (e.key === "Tab") {
					e.preventDefault();
					if (!selectedPosition && data.length > 0 && columns.length > 0) {
						const firstColumn = columns[0];
						if (firstColumn) setSelectedPosition({
							row: 0,
							column: firstColumn.key
						});
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
	}, [
		editingPosition,
		selectedPosition,
		data.length,
		columns
	]);
	(0, react.useEffect)(() => {
		const handleClickOutside = (event) => {
			const isPortalCellEditing = editingPosition?.cellType && PORTAL_CELL_TYPES.includes(editingPosition.cellType);
			if (tableRef.current && !tableRef.current.contains(event.target) && !isPortalCellEditing) {
				setSelectedPosition(null);
				setEditingPosition(null);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [editingPosition?.cellType]);
	const columnHelper = (0, _tanstack_react_table.createColumnHelper)();
	const table = (0, _tanstack_react_table.useReactTable)({
		data,
		columns: columns.map((col) => columnHelper.accessor(col.key, {
			header: col.header,
			minSize: 0,
			size: col.width || 120,
			meta: col.options ? {
				options: col.options,
				type: col.type
			} : { type: col.type }
		})),
		getCoreRowModel: (0, _tanstack_react_table.getCoreRowModel)(),
		meta: { updateData }
	});
	const headerIconForColumn = (0, react.useCallback)((column) => {
		const type = column.columnDef.meta?.type;
		return type ? headerIcon(type) : null;
	}, []);
	/**
	* Measure scrollability and header column positions.
	* - Recomputes on container resize via ResizeObserver
	* - Updates button enabled/disabled state on scroll
	* - Computes `columnLefts` by reading each <th> left position relative to the scroll container
	*/
	(0, react.useEffect)(() => {
		const container = scrollContainerRef.current;
		const wrapper = tableRef.current;
		if (!container || !wrapper) return;
		const updateScrollButtons = () => {
			setCanScrollLeft(container.scrollLeft > 0);
			setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
		};
		const compute = () => {
			setIsScrollable(container.scrollWidth > container.clientWidth);
			updateScrollButtons();
			const ths = wrapper.querySelectorAll("thead th");
			if (!ths || ths.length === 0) {
				setColumnLefts([]);
				return;
			}
			const containerRect = container.getBoundingClientRect();
			const lefts = [];
			ths.forEach((th) => {
				const left = th.getBoundingClientRect().left - containerRect.left + container.scrollLeft;
				lefts.push(Math.max(0, Math.round(left)));
			});
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
	const scrollToNextColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLefts.length === 0) return;
		const current = container.scrollLeft;
		const target = columnLefts.find((l) => l > current + 1);
		const maxScroll = container.scrollWidth - container.clientWidth;
		const next = typeof target === "number" ? target : maxScroll;
		container.scrollTo({
			left: Math.min(next, maxScroll),
			behavior: "smooth"
		});
	}, [columnLefts]);
	/**
	* Scroll left to the start of the previous column.
	* Picks the nearest stored left offset smaller than current scrollLeft.
	*/
	const scrollToPrevColumn = (0, react.useCallback)(() => {
		const container = scrollContainerRef.current;
		if (!container || columnLefts.length === 0) return;
		const current = container.scrollLeft;
		const prev = columnLefts.filter((l) => l < current - 1).at(-1) ?? 0;
		container.scrollTo({
			left: Math.max(0, prev),
			behavior: "smooth"
		});
	}, [columnLefts]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-editable-table-wrapper", className),
		ref: tableRef,
		tabIndex: 0,
		children: [isScrollable && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--left", !canScrollLeft && "inv-editable-table-scroll-control--disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
				"aria-label": "Scroll left",
				size: "small",
				variant: "secondary",
				onClick: scrollToPrevColumn,
				disabled: !canScrollLeft,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronLeft, { size: 16 })
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)("inv-editable-table-scroll-control", "inv-editable-table-scroll-control--right", !canScrollRight && "inv-editable-table-scroll-control--disabled"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_IconButton_index.IconButton, {
				"aria-label": "Scroll right",
				size: "small",
				variant: "secondary",
				onClick: scrollToNextColumn,
				disabled: !canScrollRight,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.ChevronRight, { size: 16 })
			})
		})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-editable-table-scroll-container",
			ref: scrollContainerRef,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
				className: "inv-editable-table-table",
				style: { width: isScrollable ? "max-content" : "100%" },
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
					style: { width: header.getSize() },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "inv-editable-table-header-container",
						children: [header.isPlaceholder ? null : (0, _tanstack_react_table.flexRender)(header.column.columnDef.header, header.getContext()), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "inv-editable-table-header-icon",
							children: headerIconForColumn(header.column)
						})]
					})
				}, header.id)) }, headerGroup.id)) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
					style: { width: cell.column.getSize() },
					children: (0, _tanstack_react_table.flexRender)(CellRenderer, {
						...cell.getContext(),
						columns,
						selectedPosition,
						editingPosition,
						handleCellSelect,
						handleStartEdit,
						handleFinishEdit,
						handleNavigate
					})
				}, cell.id)) }, row.id)) })]
			})
		})]
	});
});
EditableTable.displayName = "EditableTable";
/**
* Pending-changes summary bar shown beneath an EditableTable, with reset / save actions.
* Renders nothing when `changedCellCount` is 0.
*/
const EditableTableChangesBar = ({ changedCellCount, onReset, onSave, resetLabel = "Reset", saveLabel = "Save Changes", className }) => {
	if (changedCellCount <= 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-editable-table-changes-container", className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-editable-table-changes-count",
			children: [changedCellCount, " changes made"]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "inv-editable-table-changes-buttons",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
				onClick: onReset,
				variant: "secondary",
				size: "small",
				iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.RotateCcw, { size: 16 }),
				children: resetLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Button_index.Button, {
				onClick: onSave,
				variant: "primary",
				size: "small",
				iconLeft: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.Check, { size: 16 }),
				children: saveLabel
			})]
		})]
	});
};
//#endregion
exports.EditableTable = EditableTable;
exports.EditableTableChangesBar = EditableTableChangesBar;

//# sourceMappingURL=index.cjs.map