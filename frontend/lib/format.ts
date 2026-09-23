import type { Tone } from "@/components/ui";
import type { Role, RunStatus, Stage, TaskRole } from "./api";

export const STAGES: { key: Stage; label: string; hint: string }[] = [
  { key: "data_study", label: "Данные", hint: "Паспорт датасета и ограничения" },
  { key: "network_overview", label: "Обзор сети", hint: "Вся сеть и очередь кандидатов" },
  { key: "candidate_review", label: "Кандидаты", hint: "Проверка окружения и повторяемости" },
  { key: "structure_recovery", label: "Структура", hint: "Роли, связи и маршруты" },
  { key: "refutation", label: "Опровержение", hint: "Обычные объяснения и слабые связи" },
  { key: "done", label: "Итог", hint: "Пересмотренная версия" },
];

export const stageIndex = (s: Stage) => STAGES.findIndex((x) => x.key === s);

export const ROLES: Record<Role | "context", { label: string; color: string; short: string }> = {
  source: { label: "Источник", color: "#10b981", short: "Ист." },
  collector: { label: "Сборщик", color: "#8b5cf6", short: "Сбор" },
  distributor: { label: "Распределитель", color: "#f97316", short: "Распр." },
  transit: { label: "Транзитный узел", color: "#ec4899", short: "Транз." },
  final_recipient: { label: "Конечный получатель в данных", color: "#3b82f6", short: "Получ." },
  coordinated_account: { label: "Согласованный счёт", color: "#14b8a6", short: "Согл." },
  organizer: { label: "Организатор", color: "#ef4444", short: "Орг." },
  unclear: { label: "Роль не ясна", color: "#9ca3af", short: "?" },
  context: { label: "Контрагент вне группы", color: "#d1d5db", short: "—" },
};

/** Roles of the task vocabulary (the scoring pipeline's output), in the order they are explained. */
export const TASK_ROLES: Record<TaskRole, { label: string; color: string; hint: string }> = {
  consolidator: { label: "Консолидатор", color: "#8b5cf6", hint: "аккумулирует средства от нескольких участников" },
  transit: { label: "Транзит", color: "#ec4899", hint: "пропускает средства дальше, не удерживая" },
  distributor: { label: "Распределитель", color: "#f97316", hint: "веерно раздаёт средства многим получателям" },
  coordinator: { label: "Координатор", color: "#ef4444", hint: "связывает узлы-хабы, кандидат в организаторы" },
  terminal: { label: "Конечный получатель", color: "#3b82f6", hint: "деньги приходят и остаются (в данных)" },
  peripheral: { label: "Периферия", color: "#9ca3af", hint: "признаков роли не выявлено" },
};

export const RUN_STATUS: Record<RunStatus, { label: string; tone: "live" | "ok" | "warn" | "bad" | "muted" }> = {
  queued: { label: "В очереди", tone: "muted" },
  running: { label: "Идёт анализ", tone: "live" },
  cancelling: { label: "Останавливается", tone: "warn" },
  cancelled: { label: "Отменён", tone: "muted" },
  completed: { label: "Завершён", tone: "ok" },
  stopped: { label: "Остановлен по лимиту", tone: "warn" },
  failed: { label: "Ошибка", tone: "bad" },
};

export const CANDIDATE_STATUS: Record<string, { label: string; tone: Tone }> = {
  queued: { label: "В очереди", tone: "neutral" },
  in_progress: { label: "Проверяется", tone: "purple" },
  confirmed: { label: "Подтверждён", tone: "success" },
  dismissed: { label: "Отклонён", tone: "neutral" },
  merged: { label: "Объединён", tone: "info" },
  deferred: { label: "Отложен", tone: "alert" },
};

export const VERSION_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: "Черновик", tone: "neutral" },
  challenged: { label: "Оспаривается", tone: "alert" },
  revised: { label: "Пересмотрена", tone: "info" },
  rejected: { label: "Отклонена", tone: "danger" },
  final: { label: "Итоговая", tone: "success" },
};

export const PATTERNS: Record<string, string> = {
  collection: "Сбор",
  distribution: "Распределение",
  transit: "Транзит",
  repeated_routes: "Повторяющиеся маршруты",
  coordination: "Согласованность",
  cycles: "Замкнутые переводы",
  structuring: "Дробление",
  other: "Другое",
};

export const CERTAINTY: Record<string, { label: string; tone: Tone }> = {
  possible_route_ambiguous: { label: "Возможный маршрут · атрибуция неоднозначна", tone: "alert" },
  consistent_sequence: { label: "Последовательность согласована · не доказывает те же деньги", tone: "info" },
  invalid: { label: "Не прошёл проверку", tone: "danger" },
};

const nf = new Intl.NumberFormat("ru-RU");
const compact = new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 });

export const fmtInt = (n: number | null | undefined) => (n == null ? "—" : nf.format(n));
export const fmtCompact = (n: number | null | undefined) => (n == null ? "—" : compact.format(n));
/** Very short form for 50px tiles: 192K, 1.4M. */
export const fmtShort = (n: number) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n);
export const fmtMoney = (n: number, currency: string) =>
  `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: n >= 100 ? 0 : 2 }).format(n)} ${currency}`;
export const fmtTotals = (totals: Record<string, number> | undefined) =>
  totals ? Object.entries(totals).map(([c, v]) => fmtMoney(v, c)).join(" · ") : "—";

export const fmtDate = (s: string | null | undefined, withTime = false) => {
  if (!s) return "—";
  const d = new Date(s.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString("ru-RU", {
    day: "2-digit", month: "short", year: withTime ? undefined : "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
};

export const fmtTime = (s: string) =>
  new Date(s).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
};
