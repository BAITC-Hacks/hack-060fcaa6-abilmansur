import React from "react";
export interface FormControlContextValue {
    hasError: boolean;
}
export declare function useFormControlContext(): FormControlContextValue | null;
export declare function FormControlProvider(props: React.PropsWithChildren<{
    value: FormControlContextValue;
}>): React.JSX.Element;
//# sourceMappingURL=context.d.ts.map