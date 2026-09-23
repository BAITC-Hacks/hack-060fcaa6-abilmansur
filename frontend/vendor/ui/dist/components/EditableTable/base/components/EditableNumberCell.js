import { jsx as _jsx } from "react/jsx-runtime";
import { TextBaseEditableCell } from "./TextBaseEditableCell";
export const EditableNumberCell = (props) => (_jsx(TextBaseEditableCell, { ...props, inputType: "number", parseOnSave: (raw) => {
        const parsed = parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : 0;
    }, renderDisplay: (value) => (value === undefined || value === null ? "" : String(value)) }));
export default EditableNumberCell;
//# sourceMappingURL=EditableNumberCell.js.map