import { type HTMLAttributes, type ReactNode } from "react";
export type ChipsSelectionType = "single" | "multiple";
export interface ChipsItem {
    value: string;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
}
export interface ChipsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
    items: ChipsItem[];
    /** Currently selected item values. */
    selected?: string[];
    type?: ChipsSelectionType;
    /** Disables every chip (e.g. while streaming). */
    disabled?: boolean;
    onToggle?: (value: string) => void;
    className?: string;
}
declare const Chips: import("react").ForwardRefExoticComponent<ChipsProps & import("react").RefAttributes<HTMLDivElement>>;
export { Chips };
//# sourceMappingURL=Chips.d.ts.map