import { jsx as _jsx } from "react/jsx-runtime";
import { TextBaseEditableCell } from "./TextBaseEditableCell";
export const EditableTextCell = (props) => (_jsx(TextBaseEditableCell, { ...props, inputType: "text", parseOnSave: (raw) => raw }));
export default EditableTextCell;
//# sourceMappingURL=EditableTextCell.js.map