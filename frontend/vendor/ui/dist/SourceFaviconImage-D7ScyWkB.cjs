require("./chunk-CKQMccvm.cjs");
const require_IconWrapper = require("./IconWrapper-CWrIgsEo.cjs");
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/SourceFaviconImage/SourceFaviconImage.tsx
/**
* Favicon image with a globe-icon fallback. Google's favicon service returns a
* 16x16 placeholder when it has nothing better, which is treated as a miss.
*/
const SourceFaviconImage = (0, react.memo)(({ height, width, url, alt }) => {
	const ref = (0, react.useRef)(null);
	const [imageError, setImageError] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		setImageError(false);
	}, [url]);
	const onSuccess = () => {
		const img = ref.current;
		if (img && img.naturalWidth <= 16 && img.naturalHeight <= 16) setImageError(true);
		else setImageError(false);
	};
	const onError = () => {
		setImageError(true);
	};
	if (imageError || !url) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_IconWrapper.IconWrapper, {
		name: "globe",
		size: Math.max(height, width)
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		ref,
		src: url,
		alt,
		height,
		width,
		onLoad: onSuccess,
		onError,
		className: "inv-source-favicon-image"
	});
});
SourceFaviconImage.displayName = "SourceFaviconImage";
//#endregion
Object.defineProperty(exports, "SourceFaviconImage", {
	enumerable: true,
	get: function() {
		return SourceFaviconImage;
	}
});

//# sourceMappingURL=SourceFaviconImage-D7ScyWkB.cjs.map