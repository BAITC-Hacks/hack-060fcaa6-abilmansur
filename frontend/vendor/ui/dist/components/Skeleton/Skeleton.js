import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
function SkeletonBar({ height, width, borderRadius }) {
    return (_jsx("div", { className: "inv-skeleton-bar", style: {
            height,
            width,
            ...(borderRadius ? { borderRadius } : {}),
        } }));
}
export function Skeleton({ count = 1, height = "16px", width = "100%", borderRadius, className, }) {
    return (_jsx("div", { className: clsx("inv-skeleton-stack", className), children: Array.from({ length: count }, (_, i) => (_jsx(SkeletonBar, { height: height, width: width, borderRadius: borderRadius }, i))) }));
}
export function PieChartSkeleton({ size = 200, legendItems = 4, variant = "pie", appearance = "circular", }) {
    const isSemi = appearance === "semiCircular";
    const isDonut = variant === "donut";
    const chartClass = clsx("inv-skeleton-pie-chart-shape", isSemi && isDonut
        ? "inv-skeleton-pie-chart-semi-donut"
        : isSemi
            ? "inv-skeleton-pie-chart-semi"
            : isDonut
                ? "inv-skeleton-pie-chart-donut"
                : undefined);
    const chartHeight = isSemi ? size / 2 : size;
    return (_jsxs("div", { className: "inv-skeleton-pie-chart-wrapper", children: [_jsx("div", { className: "inv-skeleton-pie-chart-container", children: _jsx("div", { className: chartClass, style: { width: size, height: chartHeight } }) }), _jsx("div", { className: "inv-skeleton-pie-chart-legend", children: Array.from({ length: legendItems }, (_, i) => (_jsxs("div", { className: "inv-skeleton-pie-chart-legend-item", children: [_jsx("div", { className: "inv-skeleton-pie-chart-legend-dot" }), _jsx(SkeletonBar, { height: "12px", width: `${50 + ((i * 15) % 40)}%` })] }, i))) })] }));
}
export function TableSkeleton({ rows = 5, columns = 4 }) {
    return (_jsxs("div", { className: "inv-skeleton-table", children: [_jsx("div", { className: "inv-skeleton-table-row", style: { gridTemplateColumns: `repeat(${columns}, 1fr)` }, children: Array.from({ length: columns }, (_, i) => (_jsx("div", { className: clsx("inv-skeleton-table-cell", "inv-skeleton-table-cell-short"), children: _jsx(SkeletonBar, { height: "14px", width: "100%" }) }, `h-${i}`))) }), Array.from({ length: rows }, (_, ri) => (_jsx("div", { className: "inv-skeleton-table-row", style: { gridTemplateColumns: `repeat(${columns}, 1fr)` }, children: Array.from({ length: columns }, (_, ci) => (_jsx("div", { className: "inv-skeleton-table-cell", children: _jsx(SkeletonBar, { height: "14px", width: `${50 + ((ri * 7 + ci * 13) % 40)}%` }) }, `c-${ri}-${ci}`))) }, `r-${ri}`)))] }));
}
//# sourceMappingURL=Skeleton.js.map