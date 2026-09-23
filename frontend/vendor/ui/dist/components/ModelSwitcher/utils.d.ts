import type { ModelOption } from "./ModelSwitcher";
export interface ModelGroup {
    /** Group header, or null for the ungrouped leading section. */
    label: string | null;
    models: ModelOption[];
}
export declare function groupModels(models: ModelOption[]): ModelGroup[];
export declare function useHydrated(): boolean;
//# sourceMappingURL=utils.d.ts.map