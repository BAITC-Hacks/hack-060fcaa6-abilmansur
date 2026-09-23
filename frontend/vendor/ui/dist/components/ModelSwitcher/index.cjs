Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
const require_components_Select_index = require("../Select/index.cjs");
const require_components_Tag_index = require("../Tag/index.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/ModelSwitcher/utils.ts
function groupModels(models) {
	const order = [];
	const byGroup = /* @__PURE__ */ new Map();
	for (const model of models) {
		const key = model.group ?? "";
		let bucket = byGroup.get(key);
		if (!bucket) {
			bucket = [];
			byGroup.set(key, bucket);
			order.push(key);
		}
		bucket.push(model);
	}
	return order.map((key) => ({
		label: key === "" ? null : key,
		models: byGroup.get(key) ?? []
	}));
}
const subscribeNoop = () => () => {};
function useHydrated() {
	return (0, react.useSyncExternalStore)(subscribeNoop, () => true, () => false);
}
//#endregion
//#region src/components/ModelSwitcher/ModelSwitcher.tsx
function ModelSwitcher({ models, value, onValueChange }) {
	const hydrated = useHydrated();
	const { mode } = require_ThemeProvider.useTheme();
	const selected = models.find((model) => model.id === value) ?? models[0];
	const groups = groupModels(models);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "inv-model-switcher",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Select_index.Select, {
			value,
			onValueChange,
			size: "sm",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectTrigger, {
				"aria-label": "Select model",
				title: hydrated ? selected?.id ?? value : void 0,
				className: "inv-model-switcher-trigger",
				children: hydrated ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerContent, {
					option: selected,
					fallback: value,
					mode
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerSkeleton, {})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectContent, {
				align: "start",
				className: "inv-model-switcher-content",
				children: groups.map((group, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_components_Select_index.SelectGroup, { children: [
					index > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectSeparator, {}) : null,
					group.label ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectLabel, { children: group.label }) : null,
					group.models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Select_index.SelectItem, {
						value: model.id,
						showTick: false,
						className: "inv-model-switcher-item",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelRow, {
							model,
							mode
						})
					}, model.id))
				] }, group.label ?? `group-${index}`))
			})]
		})
	});
}
function resolveLogo(logo, mode) {
	if (logo && typeof logo === "object" && "light" in logo && "dark" in logo) return mode === "dark" ? logo.dark : logo.light;
	return logo ?? null;
}
function TriggerContent({ option, fallback, mode }) {
	const logo = option ? resolveLogo(option.logo, mode) : null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		logo ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-logo",
			children: logo
		}) : null,
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-name",
			children: option?.name ?? fallback
		}),
		option ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, {
			model: option,
			variant: "trigger"
		}) : null
	] });
}
function TriggerSkeleton() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "inv-model-switcher-skeleton-dot"
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "inv-model-switcher-skeleton-bar"
	})] });
}
function ModelRow({ model, mode }) {
	const logo = resolveLogo(model.logo, mode);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: "inv-model-switcher-row",
		children: [
			logo ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-model-switcher-logo",
				children: logo
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "inv-model-switcher-name",
				children: model.name
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, {
				model,
				variant: "row"
			})
		]
	});
}
function badgeFor(model) {
	if (model.recommended) return {
		label: "Recommended",
		kind: "recommended"
	};
	if (model.badge) return {
		label: model.badge,
		kind: "badge"
	};
	return null;
}
function Badge({ model, variant }) {
	const badge = badgeFor(model);
	if (!badge) return null;
	if (variant === "trigger") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: "inv-model-switcher-badge-trigger",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: (0, clsx.default)("inv-model-switcher-dot", `inv-model-switcher-dot-${badge.kind}`)
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-model-switcher-sr",
			children: badge.label
		})]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_components_Tag_index.Tag, {
		size: "sm",
		variant: badge.kind === "recommended" ? "info" : "success",
		text: badge.label
	});
}
//#endregion
exports.ModelSwitcher = ModelSwitcher;

//# sourceMappingURL=index.cjs.map