"use client";
import { useIsStreaming, useSetFieldValue } from "@inv/lang";
import React from "react";
export function useHydrateDefaultFieldValue({ formName, componentType, name, existingValue, defaultValue, }) {
    const fields = React.useMemo(() => [{ componentType, name, existingValue, defaultValue }], [componentType, name, existingValue, defaultValue]);
    useHydrateDefaultFieldValues({ formName, fields });
}
export function useHydrateDefaultFieldValues({ formName, fields, }) {
    const setFieldValue = useSetFieldValue();
    const isStreaming = useIsStreaming();
    React.useEffect(() => {
        if (isStreaming) {
            return;
        }
        fields.forEach(({ componentType, name, existingValue, defaultValue }) => {
            if (existingValue === undefined && defaultValue !== undefined) {
                setFieldValue(formName, componentType, name, defaultValue, false);
            }
        });
    }, [fields, formName, isStreaming, setFieldValue]);
}
//# sourceMappingURL=formDefaultValueUtils.js.map