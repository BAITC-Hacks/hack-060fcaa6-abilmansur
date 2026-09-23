"use client";
import { useEffect, useState } from "react";
import { api } from "./api";
export function useResource<T>(path: string | null) {
  const [state, setState] = useState<{
    path: string | null;
    data: T | null;
    error: string | null;
  }>({ path: null, data: null, error: null });
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    api<T>(path, { signal: controller.signal })
      .then((data) => setState({ path, data, error: null }))
      .catch((e: Error) => {
        if (!controller.signal.aborted)
          setState({ path, data: null, error: e.message });
      });
    return () => controller.abort();
  }, [path]);
  return {
    data: state.path === path ? state.data : null,
    error: state.path === path ? state.error : null,
    loading: !!path && (state.path !== path || (!state.data && !state.error)),
  };
}
