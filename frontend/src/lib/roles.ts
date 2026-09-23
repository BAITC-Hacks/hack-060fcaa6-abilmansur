import type { Role } from "./types";
export const roles: Record<
  Role,
  { label: string; color: string; description: string }
> = {
  coordinator: {
    label: "Координатор",
    color: "var(--finance-text-purple-primary)",
    description: "Соединяет пути от нескольких seed",
  },
  consolidator: {
    label: "Консолидация",
    color: "var(--finance-text-info-primary)",
    description: "Сходящиеся потоки от нескольких плательщиков",
  },
  transit: {
    label: "Транзит",
    color: "var(--finance-text-success-primary)",
    description: "Сопоставимые входящие и исходящие потоки",
  },
  distributor: {
    label: "Распределение",
    color: "var(--finance-text-alert-primary)",
    description: "Веер переводов на нескольких получателей",
  },
  terminal: {
    label: "Конечный получатель",
    color: "var(--finance-text-pink-primary)",
    description: "Нет исходящих в наблюдаемом периоде",
  },
  peripheral: {
    label: "Периферия",
    color: "var(--finance-text-neutral-secondary)",
    description: "Недостаточно структурных признаков",
  },
};
export const roleKeys = Object.keys(roles) as Role[];
