const TELEMETRY_REQUEST_TIMEOUT_MS = 2e3;
function getTelemetryConfig(env) {
	const host = env?.["INV_TELEMETRY_HOST"] ?? "";
	return {
		apiKey: env?.["INV_TELEMETRY_KEY"] ?? "",
		captureUrl: new URL("/capture/", host).toString()
	};
}
function isTruthyEnv(value) {
	return value === "1" || value?.toLowerCase() === "true";
}
function isTelemetryDisabled(env) {
	return true;
	return isTruthyEnv(env?.["INV_TELEMETRY_DISABLED"]) || isTruthyEnv(env?.["DO_NOT_TRACK"]);
}
/** Runtime telemetry is opt-in: it requires explicit consent and honors the disable flags. */
function isRuntimeTelemetryEnabled(env) {
	return isTruthyEnv(env?.["INV_RUNTIME_TELEMETRY_ENABLED"]) && !isTelemetryDisabled(env);
}
function normalizeProjectIdentity(rawValue) {
	const value = rawValue.trim();
	if (!value) return "";
	try {
		const url = new URL(value);
		const repositoryPath = normalizeRepositoryPath(decodeURIComponent(url.pathname));
		if (url.protocol === "file:") return `file:${repositoryPath}`;
		if (url.host) return joinHostAndPath(url.host, repositoryPath);
	} catch {}
	if (/^[A-Za-z]:[\\/]/.test(value)) return normalizeRepositoryPath(value);
	const scpMatch = /^(?:[^@/\s]+@)?([^:/\s]+):(.+)$/.exec(value);
	if (scpMatch) return joinHostAndPath(scpMatch[1], scpMatch[2]);
	return normalizeRepositoryPath(value);
}
function joinHostAndPath(host, repositoryPath) {
	const normalizedHost = host.trim().toLowerCase();
	const normalizedPath = normalizeRepositoryPath(repositoryPath);
	return normalizedPath ? `${normalizedHost}/${normalizedPath}` : normalizedHost;
}
function normalizeRepositoryPath(repositoryPath) {
	return repositoryPath.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "");
}
//#endregion
export { isTruthyEnv as a, isTelemetryDisabled as i, getTelemetryConfig as n, normalizeProjectIdentity as o, isRuntimeTelemetryEnabled as r, TELEMETRY_REQUEST_TIMEOUT_MS as t };

//# sourceMappingURL=shared-Dzgc28Wo.mjs.map