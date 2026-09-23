Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/Skeleton/Skeleton.tsx
function SkeletonBar({ height, width, borderRadius }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-skeleton-bar",
		style: {
			height,
			width,
			...borderRadius ? { borderRadius } : {}
		}
	});
}
function Skeleton({ count = 1, height = "16px", width = "100%", borderRadius, className }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-skeleton-stack", className),
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
			height,
			width,
			borderRadius
		}, i))
	});
}
function PieChartSkeleton({ size = 200, legendItems = 4, variant = "pie", appearance = "circular" }) {
	const isSemi = appearance === "semiCircular";
	const isDonut = variant === "donut";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-skeleton-pie-chart-wrapper",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-pie-chart-container",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-skeleton-pie-chart-shape", isSemi && isDonut ? "inv-skeleton-pie-chart-semi-donut" : isSemi ? "inv-skeleton-pie-chart-semi" : isDonut ? "inv-skeleton-pie-chart-donut" : void 0),
				style: {
					width: size,
					height: isSemi ? size / 2 : size
				}
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-pie-chart-legend",
			children: Array.from({ length: legendItems }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-skeleton-pie-chart-legend-item",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "inv-skeleton-pie-chart-legend-dot" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "12px",
					width: `${50 + i * 15 % 40}%`
				})]
			}, i))
		})]
	});
}
function TableSkeleton({ rows = 5, columns = 4 }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "inv-skeleton-table",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-table-row",
			style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
			children: Array.from({ length: columns }, (_, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)("inv-skeleton-table-cell", "inv-skeleton-table-cell-short"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "14px",
					width: "100%"
				})
			}, `h-${i}`))
		}), Array.from({ length: rows }, (_, ri) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-skeleton-table-row",
			style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
			children: Array.from({ length: columns }, (_, ci) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-skeleton-table-cell",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkeletonBar, {
					height: "14px",
					width: `${50 + (ri * 7 + ci * 13) % 40}%`
				})
			}, `c-${ri}-${ci}`))
		}, `r-${ri}`))]
	});
}
//#endregion
exports.PieChartSkeleton = PieChartSkeleton;
exports.Skeleton = Skeleton;
exports.TableSkeleton = TableSkeleton;

//# sourceMappingURL=index.cjs.map