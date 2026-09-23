/**
 * Optional color arrays used by chart components.
 * Each palette overrides the default for its specific chart type.
 *
 * Single source of truth for palette keys: the `ChartColorPalette` type is
 * derived from this array and the runtime theme-key validators consume it,
 * so a new palette is added in exactly one place.
 */
export const CHART_PALETTE_KEYS = [
    "defaultChartPalette",
    "barChartPalette",
    "lineChartPalette",
    "areaChartPalette",
    "pieChartPalette",
    "radarChartPalette",
    "radialChartPalette",
    "horizontalBarChartPalette",
];
//# sourceMappingURL=types.js.map