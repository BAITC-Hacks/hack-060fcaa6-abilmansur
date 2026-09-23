Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/ListItem/ListItem.tsx
const ListItem = react.default.forwardRef((props, ref) => {
	const { className, style, variant = "number", size = "default", icon, image, index = 0, listHasSubtitle, title, subtitle, actionIcon, actionLabel, onClick, ...rest } = props;
	const hasAction = !!onClick;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("inv-list-item-wrapper", size === "small" && "inv-list-item-wrapper--small", hasAction && "inv-list-item-wrapper-with-action", className),
		style,
		...rest,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, clsx.default)("inv-list-item", hasAction && "inv-list-item-clickable"),
			onClick,
			role: hasAction ? "button" : void 0,
			tabIndex: hasAction ? 0 : void 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, clsx.default)("inv-list-item-indicator", !listHasSubtitle && "inv-list-item-indicator-no-subtitle", hasAction && "inv-list-item-indicator-clickable"),
				children: [
					variant === "number" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-indicator-number",
						children: index + 1
					}),
					variant === "icon" && icon,
					variant === "image" && image && (image.src || image.alt) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-indicator-image",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
							src: image.src,
							alt: image.alt,
							width: 40,
							height: 40
						})
					})
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-list-item-content-wrapper",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-list-item-content",
					children: [title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-title",
						children: title
					}), subtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-subtitle",
						children: subtitle
					})]
				}), hasAction && (actionIcon || actionLabel) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "inv-list-item-action",
					children: [actionLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-action-label",
						children: actionLabel
					}), actionIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "inv-list-item-action-icon",
						children: actionIcon
					})]
				})]
			})]
		})
	});
});
ListItem.displayName = "ListItem";
//#endregion
exports.ListItem = ListItem;

//# sourceMappingURL=index.cjs.map