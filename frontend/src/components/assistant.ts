import { api } from "@/lib/api";
import {
  buildResult,
  localRequest,
  type Snapshot,
  type ResultBlock,
  type ResultView,
} from "@/lib/investigation";
import type { Answer } from "@/lib/types";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  results?: ResultBlock[];
}

export async function answerQuestion({
  question,
  snapshot,
  chosen,
  history,
  signal,
}: {
  question: string;
  snapshot: Snapshot;
  chosen: string[];
  history: ChatMessage[];
  signal: AbortSignal;
}): Promise<Pick<ChatMessage, "content" | "results">> {
  const local = localRequest(question, snapshot, chosen);
  if (local)
    return {
      content: local.text,
      results: local.views.map((view) => buildResult(view, snapshot)),
    };
  const answer = await api<Answer & { views?: ResultView[] }>(
    "assistant/query",
    {
      method: "POST",
      signal,
      body: JSON.stringify({
        question,
        gids: chosen,
        hops: 4,
        history: history
          .slice(-12)
          .map(({ role, content }) => ({
            role,
            content: content.slice(0, 4000),
          })),
      }),
    },
  );
  const views = answer.views?.length
    ? answer.views
    : answer.cited_gids.length
      ? [{ kind: "nodes" as const, gids: answer.cited_gids.slice(0, 5) }]
      : [];
  return {
    content: [answer.answer, ...answer.limitations.slice(0, 2)].join("\n\n"),
    results: views.map((view) => buildResult(view, snapshot)),
  };
}
