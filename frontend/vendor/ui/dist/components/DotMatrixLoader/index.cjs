Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("../../chunk-CKQMccvm.cjs");
let clsx = require("clsx");
clsx = require_chunk.__toESM(clsx);
let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/DotMatrixLoader/DotMatrixLoader.tsx
/** Time for each trail to complete one revolution of its ring. */
const REVOLUTION_MS = 1400;
const MIN_OPACITY = .14;
/** Trail length as a fraction of the ring — same visual proportion on both rings. */
const TRAIL_LENGTH = .28;
const createClockwiseRing = (gridSize, inset) => {
	const start = inset;
	const end = gridSize - inset - 1;
	const ring = [];
	for (let col = start; col <= end; col++) ring.push([start, col]);
	for (let row = start + 1; row <= end; row++) ring.push([row, end]);
	for (let col = end - 1; col >= start; col--) ring.push([end, col]);
	for (let row = end - 1; row > start; row--) ring.push([row, start]);
	return ring;
};
const RINGS = {
	4: {
		outer: createClockwiseRing(4, 0),
		inner: createClockwiseRing(4, 1)
	},
	5: {
		outer: createClockwiseRing(5, 0),
		inner: createClockwiseRing(5, 1)
	}
};
const DotMatrixLoader = ({ className, size, variant = "default" }) => {
	const dotsRef = (0, react.useRef)(/* @__PURE__ */ new Map());
	const isCompact = variant === "compact";
	const gridSize = isCompact ? 4 : 5;
	const rings = RINGS[gridSize];
	const resolvedSize = size ?? (isCompact ? 24 : 36);
	(0, react.useEffect)(() => {
		const dots = dotsRef.current;
		dots.forEach((dot) => {
			dot.style.opacity = String(MIN_OPACITY);
		});
		const paintRing = (ring, head) => {
			const tail = ring.length * TRAIL_LENGTH;
			for (let i = 0; i < ring.length; i++) {
				const cell = ring[i];
				const dot = cell && dots.get(`${cell[0]}-${cell[1]}`);
				if (!dot) continue;
				const distance = (head - i + ring.length) % ring.length;
				const trailIntensity = Math.exp(-distance / tail);
				const forwardDistance = (i - head + ring.length) % ring.length;
				const leadProgress = forwardDistance < 1 ? 1 - forwardDistance : 0;
				const leadIntensity = leadProgress * leadProgress * (3 - 2 * leadProgress);
				const intensity = Math.max(trailIntensity, leadIntensity);
				dot.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * intensity);
			}
		};
		let frame;
		const tick = (now) => {
			const progress = now % REVOLUTION_MS / REVOLUTION_MS;
			paintRing(rings.outer, progress * rings.outer.length);
			paintRing(rings.inner, (1 - progress) * rings.inner.length);
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [rings]);
	const dots = [];
	for (let row = 0; row < gridSize; row++) for (let col = 0; col < gridSize; col++) {
		const key = `${row}-${col}`;
		dots.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: "inv-dot-matrix-loader__dot",
			ref: (el) => {
				if (el) dotsRef.current.set(key, el);
				else dotsRef.current.delete(key);
			}
		}, key));
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("inv-dot-matrix-loader", className),
		role: "status",
		"aria-live": "polite",
		"aria-label": "Loading",
		style: {
			"--inv-dot-matrix-loader-grid-size": gridSize,
			"--inv-dot-matrix-loader-size": `${resolvedSize}px`
		},
		children: dots
	});
};
//#endregion
exports.DotMatrixLoader = DotMatrixLoader;

//# sourceMappingURL=index.cjs.map