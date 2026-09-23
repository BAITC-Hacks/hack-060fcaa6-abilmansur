Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
const require_ThemeProvider = require("../../ThemeProvider-sEZdBvkV.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let lucide_react = require("lucide-react");
let react = require("react");
react = require_chunk.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
let react_dom = require("react-dom");
//#region src/components/Modal/Modal.tsx
const sizeClass = {
	sm: "inv-modal-sm",
	md: "inv-modal-md",
	lg: "inv-modal-lg"
};
const Modal = ({ title, open, onOpenChange, size = "md", children }) => {
	const { portalThemeClassName } = require_ThemeProvider.useTheme();
	const contentRef = (0, react.useRef)(null);
	const handleClose = (0, react.useCallback)(() => onOpenChange(false), [onOpenChange]);
	(0, react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") handleClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, handleClose]);
	(0, react.useEffect)(() => {
		if (open && contentRef.current) contentRef.current.focus();
	}, [open]);
	if (!open) return null;
	return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)("inv-modal-root", portalThemeClassName),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "inv-modal-overlay",
			onClick: handleClose
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref: contentRef,
			className: (0, clsx.default)("inv-modal-content", sizeClass[size]),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "inv-modal-title",
			tabIndex: -1,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "inv-modal-header",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					id: "inv-modal-title",
					className: "inv-modal-title",
					children: title
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: "inv-modal-close",
					"aria-label": "Close",
					onClick: handleClose,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(lucide_react.X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "inv-modal-body",
				children
			})]
		})]
	}), document.body);
};
//#endregion
exports.Modal = Modal;

//# sourceMappingURL=index.cjs.map