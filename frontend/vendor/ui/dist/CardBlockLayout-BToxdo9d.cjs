const require_chunk = require("./chunk-CKQMccvm.cjs");
const require_smallCardBlockUtils = require("./smallCardBlockUtils-Dpn86fno.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/_shared/cards/CardBlockLayout.tsx
/** Shared grid/carousel scaffolding for the small and medium card blocks. */
function CardBlockLayoutInner(props, ref) {
	const { size, cardType, items, layout = "grid", responsive = true, maxPerRow, gap, renderItem, itemKey, className, style, ...rest } = props;
	const { scrollRef, maskLeft, maskRight } = require_smallCardBlockUtils.useCarouselMask();
	const safeItems = items ?? [];
	const base = `inv-${size}-card-block`;
	const count = safeItems.length;
	const gapStyle = gap ? { [`--inv-${size}-card-gap`]: typeof gap === "number" ? `${gap}px` : gap } : void 0;
	const renderCell = (item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: layout === "carousel" ? `${base}__carousel-item` : `${base}__item`,
		children: renderItem(item, index)
	}, itemKey?.(item, index) ?? `${cardType}-${index}`);
	let rowStartIndex = 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)(base, `${base}--${cardType}`, `${base}--${layout}`, className),
		"data-card-type": cardType,
		"data-layout": layout,
		"data-count": count,
		style: {
			...gapStyle,
			...style
		},
		...rest,
		children: layout === "carousel" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: scrollRef,
			className: (0, clsx.default)(`${base}__carousel`, responsive && `${base}__carousel--responsive`, maskLeft && `${base}__carousel--mask-left`, maskRight && `${base}__carousel--mask-right`),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: `${base}__carousel-track`,
				children: safeItems.map((item, index) => renderCell(item, index))
			})
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, clsx.default)(`${base}__grid`, responsive && `${base}__grid--responsive`, responsive && count % 2 === 1 && `${base}__grid--odd-count`),
			children: require_smallCardBlockUtils.getRowConfiguration(count, maxPerRow).map((itemsInRow, rowIndex) => {
				const currentRowStartIndex = rowStartIndex;
				rowStartIndex += itemsInRow;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)(`${base}__row`, `${base}__row--${itemsInRow}`),
					children: safeItems.slice(currentRowStartIndex, currentRowStartIndex + itemsInRow).map((item, columnIndex) => renderCell(item, currentRowStartIndex + columnIndex))
				}, `${cardType}-row-${rowIndex}`);
			})
		})
	});
}
const CardBlockLayout = (0, react.forwardRef)(CardBlockLayoutInner);
/** Enter/Space keyboard activation for card-like `role="button"` divs. */
function cardKeyDownHandler(onActivate) {
	return (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		onActivate();
	};
}
//#endregion
Object.defineProperty(exports, "CardBlockLayout", {
	enumerable: true,
	get: function() {
		return CardBlockLayout;
	}
});
Object.defineProperty(exports, "cardKeyDownHandler", {
	enumerable: true,
	get: function() {
		return cardKeyDownHandler;
	}
});

//# sourceMappingURL=CardBlockLayout-BToxdo9d.cjs.map