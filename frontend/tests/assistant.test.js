import { afterEach, expect, test } from "bun:test";
import { answerQuestion } from "../src/components/assistant";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const snapshot = {
  id: "dataset-test",
  graph: { nodes: [], edges: [] },
  summary: { n_nodes: 0 },
  clusters: [],
};
const options = {
  snapshot,
  chosen: ["123"],
  history: [],
  signal: new AbortController().signal,
};

test("local analysis returns renderable results without calling the AI", async () => {
  globalThis.fetch = () => {
    throw new Error("Unexpected network call");
  };
  const result = await answerQuestion({
    ...options,
    question: "Проанализируй сеть",
  });
  expect(result.results.map((r) => r.kind)).toEqual(["metrics", "nodes"]);
  expect(result.results.every((r) => r.datasetId === snapshot.id)).toBe(true);
});

test("AI request preserves selected gids, bounded history and abort signal", async () => {
  let request;
  globalThis.fetch = async (url, init) => {
    request = { url, ...init };
    return Response.json({
      answer: "Готово",
      cited_gids: [],
      limitations: [],
      views: [{ kind: "metrics" }],
    });
  };
  const history = Array.from({ length: 20 }, (_, i) => ({
    role: i % 2 ? "assistant" : "user",
    content: "x".repeat(5000),
  }));
  const result = await answerQuestion({
    ...options,
    question: "Где сходятся деньги?",
    history,
  });
  expect(request.url).toBe("/api/backend/api/v1/assistant/query");
  expect(request.signal).toBe(options.signal);
  const body = JSON.parse(request.body);
  expect(body.gids).toEqual(["123"]);
  expect(body.history).toHaveLength(12);
  expect(body.history.every((m) => m.content.length === 4000)).toBe(true);
  expect(result.content).toBe("Готово");
  expect(result.results[0].kind).toBe("metrics");
});

test("backend errors propagate for the conversation error state", async () => {
  globalThis.fetch = async () =>
    Response.json({ detail: "AI недоступен" }, { status: 503 });
  await expect(
    answerQuestion({ ...options, question: "Почему?" }),
  ).rejects.toThrow("AI недоступен");
});

test("cancelled requests preserve AbortError", async () => {
  globalThis.fetch = async () => {
    throw new DOMException("Stopped", "AbortError");
  };
  await expect(
    answerQuestion({ ...options, question: "Почему?" }),
  ).rejects.toMatchObject({ name: "AbortError" });
});
