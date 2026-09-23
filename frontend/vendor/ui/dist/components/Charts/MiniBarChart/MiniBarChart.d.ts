import { type PaletteName } from "../utils/PalletUtils";
import { type MiniBarChartData } from "./types";
export interface MiniBarChartProps {
    data: MiniBarChartData;
    theme?: PaletteName;
    customPalette?: string[];
    radius?: number;
    isAnimationActive?: boolean;
    onBarsClick?: (data: any) => void;
    size?: number | string;
    className?: string;
    barColor?: string;
}
export declare const MiniBarChart: ({ data, theme, customPalette, radius, isAnimationActive, onBarsClick, size, className, barColor, }: MiniBarChartProps) => import("react").JSX.Element;
//# sourceMappingURL=MiniBarChart.d.ts.map