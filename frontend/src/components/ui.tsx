"use client";
import { Callout, Card, Skeleton, Tag, TooltipWrapper } from "./primitives";
import { roles } from "@/lib/roles";
import type { Role } from "@/lib/types";
import { percent } from "@/lib/api";
import type { ReactNode } from "react";

export function RoleTag({ role }: { role: Role }) {
  return (
    <TooltipWrapper tooltipContent={roles[role].description}>
      <Tag
        className={`role-tag role-${role}`}
        size="sm"
        text={
          <>
            <span
              className="role-dot"
              style={{ background: roles[role].color }}
            />
            {roles[role].label}
          </>
        }
      />
    </TooltipWrapper>
  );
}
export function Priority({ score }: { score: number }) {
  return (
    <div className="priority">
      <span className="priority-track">
        <span style={{ width: percent(score) }} />
      </span>
      <span>{score.toFixed(2)}</span>
    </div>
  );
}
export function Filter({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <select
      className="ui-select"
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export function Empty({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state" role="status">
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function Loading() {
  return (
    <div
      className="loading-state"
      aria-busy="true"
      aria-label="Загрузка аналитики"
    >
      <Skeleton height="36px" width="45%" />
      <div className="stats-grid">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i}>
            <Skeleton height="70px" />
          </Card>
        ))}
      </div>
      <Skeleton height="360px" />
    </div>
  );
}
export function ErrorNotice({ error }: { error: string | null }) {
  return error ? (
    <Callout
      variant="danger"
      title="Не удалось загрузить данные"
      description={error}
    />
  ) : null;
}
