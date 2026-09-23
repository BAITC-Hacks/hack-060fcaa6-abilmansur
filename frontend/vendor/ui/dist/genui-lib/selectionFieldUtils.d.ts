export type SelectionType = "single" | "multiple";
export type SelectionDefaultValue = string | string[] | undefined;
/** Resolves the stored form value (falling back to defaultValue) into a list of selected values. */
export declare function normalizeSelection(type: SelectionType, storedValue: unknown, defaultValue: SelectionDefaultValue): string[];
/** Shape of defaultValue as it should be written into form state (string for single, string[] for multiple). */
export declare function getStoredDefaultValue(type: SelectionType, defaultValue: SelectionDefaultValue): string | string[] | undefined;
/** Toggles `itemValue` in `selection` according to the selection type. */
export declare function toggleSelection(type: SelectionType, selection: string[], itemValue: string): string[];
//# sourceMappingURL=selectionFieldUtils.d.ts.map