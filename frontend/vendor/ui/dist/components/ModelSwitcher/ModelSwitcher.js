"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, } from "../Select";
import { Tag } from "../Tag";
import { useTheme } from "../ThemeProvider";
import { groupModels, useHydrated } from "./utils";
export function ModelSwitcher({ models, value, onValueChange }) {
    const hydrated = useHydrated();
    const { mode } = useTheme();
    const selected = models.find((model) => model.id === value) ?? models[0];
    const groups = groupModels(models);
    return (_jsx("div", { className: "inv-model-switcher", children: _jsxs(Select, { value: value, onValueChange: onValueChange, size: "sm", children: [_jsx(SelectTrigger, { "aria-label": "Select model", title: hydrated ? (selected?.id ?? value) : undefined, className: "inv-model-switcher-trigger", children: hydrated ? (_jsx(TriggerContent, { option: selected, fallback: value, mode: mode })) : (_jsx(TriggerSkeleton, {})) }), _jsx(SelectContent, { align: "start", className: "inv-model-switcher-content", children: groups.map((group, index) => (_jsxs(SelectGroup, { children: [index > 0 ? _jsx(SelectSeparator, {}) : null, group.label ? _jsx(SelectLabel, { children: group.label }) : null, group.models.map((model) => (_jsx(SelectItem, { value: model.id, showTick: false, className: "inv-model-switcher-item", children: _jsx(ModelRow, { model: model, mode: mode }) }, model.id)))] }, group.label ?? `group-${index}`))) })] }) }));
}
// Resolve a model's logo for the active theme: a `{ light, dark }` pair yields
// the variant for `mode`; a plain node renders as-is.
function resolveLogo(logo, mode) {
    if (logo && typeof logo === "object" && "light" in logo && "dark" in logo) {
        return mode === "dark" ? logo.dark : logo.light;
    }
    return (logo ?? null);
}
function TriggerContent({ option, fallback, mode, }) {
    const logo = option ? resolveLogo(option.logo, mode) : null;
    return (_jsxs(_Fragment, { children: [logo ? _jsx("span", { className: "inv-model-switcher-logo", children: logo }) : null, _jsx("span", { className: "inv-model-switcher-name", children: option?.name ?? fallback }), option ? _jsx(Badge, { model: option, variant: "trigger" }) : null] }));
}
// Neutral skeleton shown until the client reads the persisted model, so a
// refresh doesn't flash a fallback name.
function TriggerSkeleton() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": "true", className: "inv-model-switcher-skeleton-dot" }), _jsx("span", { "aria-hidden": "true", className: "inv-model-switcher-skeleton-bar" })] }));
}
function ModelRow({ model, mode }) {
    const logo = resolveLogo(model.logo, mode);
    return (_jsxs("span", { className: "inv-model-switcher-row", children: [logo ? _jsx("span", { className: "inv-model-switcher-logo", children: logo }) : null, _jsx("span", { className: "inv-model-switcher-name", children: model.name }), _jsx(Badge, { model: model, variant: "row" })] }));
}
function badgeFor(model) {
    if (model.recommended)
        return { label: "Recommended", kind: "recommended" };
    if (model.badge)
        return { label: model.badge, kind: "badge" };
    return null;
}
function Badge({ model, variant }) {
    const badge = badgeFor(model);
    if (!badge)
        return null;
    // The trigger is too compact for a Tag — show a colored dot with an
    // sr-only label instead.
    if (variant === "trigger") {
        return (_jsxs("span", { className: "inv-model-switcher-badge-trigger", children: [_jsx("span", { "aria-hidden": "true", className: clsx("inv-model-switcher-dot", `inv-model-switcher-dot-${badge.kind}`) }), _jsx("span", { className: "inv-model-switcher-sr", children: badge.label })] }));
    }
    return (_jsx(Tag, { size: "sm", variant: badge.kind === "recommended" ? "info" : "success", text: badge.label }));
}
//# sourceMappingURL=ModelSwitcher.js.map