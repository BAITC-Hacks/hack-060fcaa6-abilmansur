type DefaultFieldConfig = {
    componentType: string;
    name: string;
    existingValue: unknown;
    defaultValue: unknown;
};
export declare function useHydrateDefaultFieldValue({ formName, componentType, name, existingValue, defaultValue, }: {
    formName?: string;
    componentType: string;
    name: string;
    existingValue: unknown;
    defaultValue: unknown;
}): void;
export declare function useHydrateDefaultFieldValues({ formName, fields, }: {
    formName?: string;
    fields: DefaultFieldConfig[];
}): void;
export {};
//# sourceMappingURL=formDefaultValueUtils.d.ts.map