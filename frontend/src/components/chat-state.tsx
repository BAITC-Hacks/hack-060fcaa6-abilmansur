"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { answerQuestion, type ChatMessage } from "./assistant";
import type { Snapshot } from "@/lib/investigation";

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}
const storageKey = "money-graph:conversations:v1";
export function useChatSession(snapshot: Snapshot | null, chosen: string[]) {
  const [threads, setThreads] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [restored, setRestored] = useState(false);
  const [storageError, setStorageError] = useState("");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    let disposed = false;
    Promise.resolve().then(() => {
      if (disposed) return;
      try {
        const saved: unknown = JSON.parse(
          localStorage.getItem(storageKey) || "[]",
        );
        if (Array.isArray(saved)) {
          const valid = saved.filter(
            (t): t is Conversation =>
              t &&
              typeof t.id === "string" &&
              typeof t.title === "string" &&
              Array.isArray(t.messages) &&
              t.messages.every(
                (m: ChatMessage) =>
                  m &&
                  typeof m.id === "string" &&
                  typeof m.content === "string" &&
                  ["user", "assistant"].includes(m.role),
              ),
          );
          setThreads(valid);
        }
      } catch {
        setStorageError(
          "История недоступна. Новые разговоры останутся в этой вкладке.",
        );
      }
      setRestored(true);
    });
    return () => {
      disposed = true;
      controller.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(threads));
    } catch {
      queueMicrotask(() =>
        setStorageError("Не удалось сохранить историю в браузере."),
      );
    }
  }, [threads, restored]);
  const send = async (question: string) => {
    const content = question.trim();
    if (!content || controller.current || !snapshot || !restored) return;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    const id = activeId || crypto.randomUUID();
    const history = threads.find((t) => t.id === id)?.messages || [];
    const user: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setActiveId(id);
    setThreads((current) =>
      current.some((t) => t.id === id)
        ? current.map((t) =>
            t.id === id ? { ...t, messages: [...t.messages, user] } : t,
          )
        : [{ id, title: content.slice(0, 70), messages: [user] }, ...current],
    );
    const append = (message: ChatMessage) =>
      setThreads((current) =>
        current.map((t) =>
          t.id === id ? { ...t, messages: [...t.messages, message] } : t,
        ),
      );
    try {
      const answer = await answerQuestion({
        question: content,
        snapshot,
        chosen: [...chosen],
        history,
        signal: abort.signal,
      });
      if (!abort.signal.aborted)
        append({ id: crypto.randomUUID(), role: "assistant", ...answer });
    } catch (error) {
      if (!abort.signal.aborted)
        append({
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Не удалось завершить запрос: ${(error as Error).message}\n\nПовторите вопрос. Данные сохранены.`,
        });
    } finally {
      if (abort.signal.aborted)
        append({
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Ответ остановлен.",
        });
      if (controller.current === abort) {
        controller.current = null;
        setBusy(false);
      }
    }
  };
  return {
    threads,
    activeId,
    busy,
    restored,
    storageError,
    send,
    messages: threads.find((t) => t.id === activeId)?.messages || [],
    cancel: () => controller.current?.abort(),
    select: (id: string | null) => {
      if (!controller.current) {
        setActiveId(id);
      }
    },
    remove: (id: string) => {
      if (controller.current) return;
      setThreads((current) => current.filter((t) => t.id !== id));
      if (activeId === id) {
        setActiveId(null);
      }
    },
  };
}
export type ChatState = ReturnType<typeof useChatSession>;
export const ChatContext = createContext<ChatState | null>(null);
export function useChat() {
  const state = useContext(ChatContext);
  if (!state) throw new Error("Chat provider missing");
  return state;
}
