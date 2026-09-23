import React from "react";
import type { CellRendererProps } from "./CellTypes";
export interface TextBaseEditableCellProps extends CellRendererProps {
    inputType: "text" | "number" | "url";
    parseOnSave: (raw: string) => any;
    renderDisplay?: (value: any) => React.ReactNode;
}
export declare const TextBaseEditableCell: React.FC<TextBaseEditableCellProps>;
export default TextBaseEditableCell;
//# sourceMappingURL=TextBaseEditableCell.d.ts.map