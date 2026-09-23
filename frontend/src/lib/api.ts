export const API = "/api/backend";
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `${API}/${path.startsWith("health") ? path : `api/v1/${path}`}`,
    {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : "Не удалось выполнить запрос",
    );
  return data as T;
}
export const integer = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);
export const money = (value: number, compact = false) =>
  new Intl.NumberFormat("ru-RU", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 2,
  }).format(value);
export const percent = (value: number) => `${Math.round(value * 100)}%`;
export const shortGid = (gid: string) => `…${gid.slice(-8)}`;
export const dateLabel = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
