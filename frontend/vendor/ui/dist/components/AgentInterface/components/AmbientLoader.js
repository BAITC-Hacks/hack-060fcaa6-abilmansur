import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { DotMatrixLoader } from "../../DotMatrixLoader";
/**
 * Ambient loading state for AgentInterface surfaces: two blurred glow blobs
 * drift and breathe behind a centered dot-matrix loader with a contextual
 * label. Fills whatever panel hosts it (min 280px tall), adapts to light/dark
 * through the theme tokens, and freezes under `prefers-reduced-motion`.
 *
 * The label is required on purpose — every loading surface should say what is
 * actually happening ("Loading artifacts…"), never a bare "Loading…".
 */
export const AmbientLoader = ({ label, className }) => (_jsxs("div", { className: clsx("inv-agent-ambient-loader", className), role: "status", "aria-live": "polite", children: [_jsx("div", { className: "inv-agent-ambient-loader__glow inv-agent-ambient-loader__glow--a" }), _jsx("div", { className: "inv-agent-ambient-loader__glow inv-agent-ambient-loader__glow--b" }), _jsx("span", { "aria-hidden": "true", children: _jsx(DotMatrixLoader, {}) }), _jsx("span", { className: "inv-agent-ambient-loader__label", children: label })] }));
//# sourceMappingURL=AmbientLoader.js.map