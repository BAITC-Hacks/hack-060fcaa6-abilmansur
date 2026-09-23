import { EditableDateCell } from "./EditableDateCell";
import { EditableNumberCell } from "./EditableNumberCell";
import { EditableSelectCell } from "./EditableSelectCell";
import { EditableTextCell } from "./EditableTextCell";
import { EditableUrlCell } from "./EditableUrlCell";
const registry = {
    text: EditableTextCell,
    number: EditableNumberCell,
    "date-single": EditableDateCell,
    select: EditableSelectCell,
    url: EditableUrlCell,
};
export function getCellRenderer(type) {
    return registry[type ?? "text"];
}
//# sourceMappingURL=cellRegistry.js.map