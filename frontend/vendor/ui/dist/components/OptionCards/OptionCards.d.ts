import { type HTMLAttributes, type ReactNode } from "react";
export type OptionCardsSelectionType = "single" | "multiple";
export interface OptionCardsItem {
    value: string;
    /** Inline markdown supported. */
    title: string;
    /** Inline markdown supported. */
    subtitle?: string;
    topContent?: ReactNode;
    /** Controls the top slot sizing: a small icon tile or a larger image tile. */
    topContentVariant?: "icon" | "image";
    disabled?: boolean;
}
export interface OptionCardsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
    items: OptionCardsItem[];
    /** Currently selected item values. */
    selected?: string[];
    type?: OptionCardsSelectionType;
    /** Disables every card (e.g. while streaming). */
    disabled?: boolean;
    onToggle?: (value: string) => void;
    className?: string;
}
declare const OptionCards: import("react").ForwardRefExoticComponent<OptionCardsProps & import("react").RefAttributes<HTMLDivElement>>;
export { OptionCards };
//# sourceMappingURL=OptionCards.d.ts.map