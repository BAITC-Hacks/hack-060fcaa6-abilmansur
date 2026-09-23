import { jsx as _jsx } from "react/jsx-runtime";
import { TextBaseEditableCell } from "./TextBaseEditableCell";
export const EditableUrlCell = (props) => (_jsx(TextBaseEditableCell, { ...props, inputType: "url", parseOnSave: (raw) => raw, renderDisplay: (value) => (value === undefined || value === null ? "" : String(value)) }));
export default EditableUrlCell;
//# sourceMappingURL=EditableUrlCell.js.map