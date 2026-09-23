import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
const SIDES = ["top", "bottom", "left", "right"];
export const CellOutline = ({ isSelected, isEditing }) => {
    return (_jsx(_Fragment, { children: SIDES.map((side) => (_jsx("div", { className: clsx(`inv-editable-table-cell-outline-${side}`, isSelected && `inv-editable-table-cell-outline-${side}-selected`, isEditing && `inv-editable-table-cell-outline-${side}-editing`) }, side))) }));
};
export default CellOutline;
//# sourceMappingURL=CellOutline.js.map