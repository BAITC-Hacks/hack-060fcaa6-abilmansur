import type { ReactNode } from "react";
/** A single logo node, or a light/dark pair the switcher picks from by theme. */
export type ModelLogo = ReactNode | {
    light: ReactNode;
    dark: ReactNode;
};
export interface ModelOption {
    /** Unique id — the value the switcher reports through `onValueChange`. */
    id: string;
    /** Display name. */
    name: string;
    /** Optional section header this model is grouped under (e.g. a provider or "Free"). */
    group?: string;
    /** Optional chip label (e.g. "Free"). */
    badge?: string;
    /** Marks the model with a "Recommended" chip. */
    recommended?: boolean;
    /** Optional leading logo/icon — apps supply their own asset */
    logo?: ModelLogo;
}
export interface ModelSwitcherProps {
    /** The models to choose from. Grouped by `group` in first-seen order. */
    models: ModelOption[];
    /** The selected model id. */
    value: string;
    /** Called with the newly selected model id. */
    onValueChange: (id: string) => void;
}
export declare function ModelSwitcher({ models, value, onValueChange }: ModelSwitcherProps): import("react").JSX.Element;
//# sourceMappingURL=ModelSwitcher.d.ts.map