const require_chunk = require("./chunk-CKQMccvm.cjs");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let lucide_react_dynamicIconImports_mjs = require("lucide-react/dynamicIconImports.mjs");
lucide_react_dynamicIconImports_mjs = require_chunk.__toESM(lucide_react_dynamicIconImports_mjs, 1);
//#region src/components/_shared/icons/categoryFallbacks.ts
/**
* Semantic icon-category → representative lucide icon name (kebab-case).
*
* When an icon name doesn't resolve, surfaces fall back to the category's
* representative icon before their own generic fallback, so a miss still
* renders something topical (`finance` → dollar sign, not a bare circle).
*/
const categoryFallbacks = {
	accessibility: "accessibility",
	account: "user",
	animals: "cat",
	arrows: "arrow-right",
	brands: "box",
	buildings: "building",
	charts: "chart-line",
	communication: "message-square",
	connectivity: "wifi",
	cursors: "mouse-pointer",
	design: "palette",
	development: "code",
	devices: "smartphone",
	emoji: "smile",
	files: "file",
	finance: "dollar-sign",
	"food-beverage": "cooking-pot",
	gaming: "gamepad",
	home: "house",
	layout: "layout",
	mail: "mail",
	math: "calculator",
	medical: "heart-pulse",
	multimedia: "music",
	nature: "tree-pine",
	navigation: "map-pin",
	notifications: "bell",
	people: "users",
	photography: "camera",
	science: "microscope",
	seasons: "sun",
	security: "shield",
	shapes: "circle",
	shopping: "shopping-cart",
	social: "share-2",
	sports: "trophy",
	sustainability: "leaf",
	text: "type",
	time: "clock",
	tools: "wrench",
	transportation: "car",
	travel: "plane",
	weather: "cloud"
};
/** The icon name to load when a requested icon name misses the catalog. */
const getFallbackIconName = (category) => categoryFallbacks[category?.trim().toLowerCase() ?? ""] ?? "circle-dot";
//#endregion
//#region src/components/_shared/icons/iconNames.ts
/**
* Normalize PascalCase/camelCase input to kebab-case candidates for
* `lucide-react/dynamicIconImports` map keys. Unlike kebab → Pascal, this
* direction is ambiguous around digits (`ArrowUp10` is `arrow-up-1-0`
* upstream, but `Axis3d` is `axis-3d`). Dimension-shaped names add another
* ambiguity (`Grid2x2` is exported as both `grid-2x2` and `grid-2-x-2`), so
* callers try each deterministic candidate in priority order.
*/
const toKebabIconCandidates = (name) => {
	const base = name.trim().replace(/[\s_]+/g, "-").replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Za-z])(\d)/g, "$1-$2").toLowerCase();
	const digitSplit = base.replace(/(\d)(?=\d)/g, "$1-");
	const compactDimension = base.replace(/(\d)x-(\d)/g, "$1x$2");
	const splitDimension = base.replace(/(\d)x-(\d)/g, "$1-x-$2");
	return [...new Set([
		base,
		digitSplit,
		compactDimension,
		splitDimension
	])];
};
//#endregion
//#region src/components/_shared/icons/lucide/lucideDynamicImports.mjs
var lucideDynamicImports_default = lucide_react_dynamicIconImports_mjs.default;
//#endregion
//#region src/components/_shared/icons/dynamicIconImports.ts
/**
* CJS interop: this package ships both CJS and ESM builds. When the CJS
* build loads the `.mjs` icon map, the import hands back a namespace object
* (`{ __esModule, default: map }`) instead of the map itself, and bundler
* interop helpers can stack a second `default` layer on top. Unwrap until we
* reach the actual key → import-thunk map (`circle` is a stable lucide key),
* else every icon silently resolves null for CJS consumers.
*/
const unwrapModuleDefault = (mod) => {
	let candidate = mod;
	while (candidate != null && typeof candidate === "object" && typeof candidate["circle"] !== "function" && "default" in candidate) candidate = candidate["default"];
	return candidate ?? {};
};
const exactDynamicIconImports = unwrapModuleDefault(lucideDynamicImports_default);
const getArrayPermutations = (arr) => {
	if (arr.length === 0) return [[]];
	const firstElement = arr[0];
	const permsWithoutFirst = getArrayPermutations(arr.slice(1));
	const allPermutations = [];
	permsWithoutFirst.forEach((perm) => {
		for (let i = 0; i <= perm.length; i++) {
			const permWithFirst = [
				...perm.slice(0, i),
				firstElement,
				...perm.slice(i)
			].filter((item) => item !== void 0);
			allPermutations.push(permWithFirst);
		}
	});
	return allPermutations;
};
const getIconNamePermutations = (inputString) => {
	const words = inputString.trim().split(/-/).filter((word) => word.length > 0);
	if (words.length === 0) return [""];
	return getArrayPermutations(words).map((perm) => perm.join("-"));
};
const permutationIconImports = Object.entries(exactDynamicIconImports).reduce((acc, [key, value]) => {
	getIconNamePermutations(key).forEach((iconName) => {
		acc[iconName] = value;
	});
	return acc;
}, {});
const dynamicIconImports = Object.assign(permutationIconImports, exactDynamicIconImports);
const getIconNameMatchVariations = (iconName) => {
	const iconNameParts = iconName.split("-");
	const iconNameVariations = [iconNameParts[0]];
	let lastVariation = iconNameVariations[0];
	for (const part of iconNameParts.slice(1)) {
		const newVariation = `${lastVariation}-${part}`;
		lastVariation = newVariation;
		iconNameVariations.push(newVariation);
	}
	return iconNameVariations.reverse();
};
const getIconImport = (iconName) => {
	const kebabCandidates = toKebabIconCandidates(iconName);
	for (const candidate of [iconName, ...kebabCandidates]) {
		const iconImport = dynamicIconImports[candidate];
		if (iconImport) return iconImport;
	}
	const iconNameImportVariations = getIconNameMatchVariations(kebabCandidates[0] ?? iconName);
	for (const variation of iconNameImportVariations) {
		const iconImport = dynamicIconImports[variation];
		if (iconImport) return iconImport;
	}
	return null;
};
//#endregion
//#region src/components/_shared/icons/IconWrapper.tsx
const cachedIcons = /* @__PURE__ */ new Map();
const IconWrapper = ({ name, category, ...props }) => {
	const [IconComponent, setIconComponent] = (0, react.useState)(() => cachedIcons.get(name) || null);
	(0, react.useEffect)(() => {
		let cancelled = false;
		const loadIcon = async (iconName) => {
			const iconImport = getIconImport(iconName);
			if (!iconImport) return false;
			try {
				const module = await iconImport();
				if (module?.default) {
					cachedIcons.set(iconName, module.default);
					if (!cancelled) setIconComponent(() => module.default);
					return true;
				}
			} catch {
				return false;
			}
			return false;
		};
		const loadIconWithFallback = async () => {
			if (cachedIcons.has(name)) {
				setIconComponent(cachedIcons.get(name));
				return;
			}
			if (!await loadIcon(name) && !cancelled) {
				const fallbackName = getFallbackIconName(category);
				if (cachedIcons.has(fallbackName)) setIconComponent(cachedIcons.get(fallbackName));
				else await loadIcon(fallbackName);
			}
		};
		loadIconWithFallback();
		return () => {
			cancelled = true;
		};
	}, [name, category]);
	if (!IconComponent) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {
		size: 14,
		...props
	});
};
//#endregion
Object.defineProperty(exports, "IconWrapper", {
	enumerable: true,
	get: function() {
		return IconWrapper;
	}
});

//# sourceMappingURL=IconWrapper-CWrIgsEo.cjs.map