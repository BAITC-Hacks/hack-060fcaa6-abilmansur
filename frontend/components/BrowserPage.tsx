"use client";

import { Search } from "lucide-react";
import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui";

// The template's artifact browser (ArtifactBrowserPage): sticky title + search, list of large rows, empty state.

export function BrowserPage({
  title, action, query, onQuery, searchPlaceholder = "Поиск", loading, empty, children,
}: {
  title: string;
  action?: ReactNode;
  query?: string;
  onQuery?: (q: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  /** Rendered instead of the list when there is nothing to show. */
  empty?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="inv-agent-artifact-browser min-h-0 flex-1">
      <div className="inv-agent-artifact-browser__content">
        <div className="inv-agent-artifact-browser__header">
          <h1 className="inv-agent-artifact-browser__title">{title}</h1>
          <div className="flex min-w-0 items-center gap-2">
            {onQuery && (
              <label className="inv-agent-artifact-browser__search">
                <Search size={16} className="shrink-0" />
                <input
                  className="inv-agent-artifact-browser__search-input"
                  value={query}
                  onChange={(e) => onQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                />
              </label>
            )}
            {action}
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col gap-5 px-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton height="52px" width="64px" borderRadius="8px" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton height="16px" width={`${70 - i * 12}%`} />
                  <Skeleton height="12px" width="30%" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          empty ?? <div className="inv-agent-artifact-browser__list">{children}</div>
        )}
      </div>
    </div>
  );
}

export function BrowserItem({
  icon, title, meta, trailing, onClick,
}: {
  icon: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  onClick: () => void;
}) {
  return (
    // A div with role=button, so trailing actions can be real buttons inside it.
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="inv-agent-artifact-browser__item"
    >
      <span className="inv-agent-artifact-browser__item-icon">{icon}</span>
      <span className="inv-agent-artifact-browser__item-meta">
        <span className="inv-agent-artifact-browser__item-title">{title}</span>
        {meta && <span className="inv-agent-artifact-browser__item-updated-at">{meta}</span>}
      </span>
      {trailing}
    </div>
  );
}

export function BrowserEmpty({ icon, title, subtitle, action }: { icon: ReactNode; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="inv-agent-artifact-browser__empty">
      <div className="inv-agent-artifact-browser__empty-illustration">{icon}</div>
      <div className="inv-agent-artifact-browser__empty-copy">
        <p className="inv-agent-artifact-browser__empty-text">{title}</p>
        {subtitle && <p className="inv-agent-artifact-browser__empty-subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
