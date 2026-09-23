"use client";

import { create } from "zustand";

const KEY = "investigator:dataset";

/** Dataset used for the next new investigation (a new thread). Picked in the thread header, like the
 *  template's model switcher, and remembered in the browser. */
export const useDatasetStore = create<{ datasetId: string | null; setDatasetId: (id: string | null) => void }>((set) => ({
  datasetId: readStored(),
  setDatasetId: (id) => {
    try {
      if (id) localStorage.setItem(KEY, id);
      else localStorage.removeItem(KEY);
    } catch {}
    set({ datasetId: id });
  },
}));

function readStored() {
  try {
    return typeof window === "undefined" ? null : localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
