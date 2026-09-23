import { SliderProps } from "./Slider";
export interface SliderBlockProps extends Omit<SliderProps, "value" | "defaultValue"> {
    label: string;
    defaultValue?: number[];
    /** Props are still arriving; step-derived UI is suppressed until they settle. */
    isStreaming?: boolean;
}
export declare const SliderBlock: (props: SliderBlockProps) => import("react").JSX.Element;
//# sourceMappingURL=SliderBlock.d.ts.map