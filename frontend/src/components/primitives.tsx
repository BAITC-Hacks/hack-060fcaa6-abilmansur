"use client";

import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "extra-small" | "small" | "medium" | "large";
  iconLeft?: ReactNode;
};
export function Button({
  variant = "primary",
  size = "medium",
  iconLeft,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
      {...props}
    >
      {iconLeft}
      {children}
    </button>
  );
}
export function IconButton({
  icon,
  ...props
}: ButtonProps & { icon: ReactNode }) {
  return (
    <Button {...props} className={`ui-icon-button ${props.className || ""}`}>
      {icon}
    </Button>
  );
}
export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`ui-input ${className}`} {...props} />;
}
export function Card({
  children,
  className = "",
  variant,
  width,
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: string; width?: string }) {
  return (
    <div
      className={`ui-card ${variant === "sunk" ? "ui-card--sunk" : ""} ${width === "full" ? "ui-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export function Tag({
  text,
  icon,
  className = "",
  variant = "neutral",
}: {
  text: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: string;
  size?: string;
}) {
  return (
    <span className={`ui-tag ui-tag--${variant} ${className}`}>
      {icon}
      {text}
    </span>
  );
}
export function Callout({
  title,
  description,
  variant = "neutral",
}: {
  title?: string;
  description: ReactNode;
  variant?: string;
}) {
  return (
    <div
      className={`ui-callout ui-callout--${variant}`}
      role={variant === "danger" ? "alert" : "status"}
    >
      {title && <strong>{title}</strong>}
      <div>{description}</div>
    </div>
  );
}
export function Skeleton({
  count = 1,
  height = "20px",
  width = "100%",
}: {
  count?: number;
  height?: string;
  width?: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="ui-skeleton"
          style={{ height, width }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
export function TooltipWrapper({
  children,
  tooltipContent,
}: {
  children: ReactNode;
  tooltipContent: ReactNode;
}) {
  return (
    <span
      className="ui-tooltip"
      title={typeof tooltipContent === "string" ? tooltipContent : undefined}
    >
      {children}
    </span>
  );
}
export function MetricIndicatorInline({
  value,
  subtext,
}: {
  value: ReactNode;
  subtext: string;
}) {
  return (
    <div className="ui-metric">
      <strong>{value}</strong>
      <span>{subtext}</span>
    </div>
  );
}
export function Table({
  containerClassName = "",
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement> & { containerClassName?: string }) {
  return (
    <div className={`ui-table-wrap ${containerClassName}`}>
      <table {...props}>{children}</table>
    </div>
  );
}
export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}
export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
export function TableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />;
}
export function TableHead(props: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" {...props} />;
}
export function TableCell(props: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} />;
}

const TabsContext = createContext({
  value: "",
  onChange: (() => {}) as (value: string) => void,
  id: "",
});
export function Tabs({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <TabsContext.Provider value={{ value, onChange: onValueChange, id }}>
      <div className="ui-tabs">{children}</div>
    </TabsContext.Provider>
  );
}
export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div
      role="tablist"
      className="ui-tabs-list"
      onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        const tabs = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]',
          ),
        );
        const current = tabs.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : (current +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  tabs.length) %
                tabs.length;
        event.preventDefault();
        tabs[next]?.focus();
        tabs[next]?.click();
      }}
    >
      {children}
    </div>
  );
}
export function TabsTrigger({ value, text }: { value: string; text: string }) {
  const ctx = useContext(TabsContext);
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.id}-${value}-tab`}
      aria-controls={`${ctx.id}-${value}-panel`}
      aria-selected={ctx.value === value}
      tabIndex={ctx.value === value ? 0 : -1}
      onClick={() => ctx.onChange(value)}
    >
      {text}
    </button>
  );
}
export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const ctx = useContext(TabsContext);
  return (
    <div
      role="tabpanel"
      id={`${ctx.id}-${value}-panel`}
      aria-labelledby={`${ctx.id}-${value}-tab`}
      hidden={ctx.value !== value}
    >
      {ctx.value === value ? children : null}
    </div>
  );
}
