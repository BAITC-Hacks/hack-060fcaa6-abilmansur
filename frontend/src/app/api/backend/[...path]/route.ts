import { NextRequest } from "next/server";

// Fixed upstream and explicit routes: never proxy a user-provided URL.
const allowed =
  /^(health|api\/v1\/(summary|nodes(?:\/\d+(?:\/(?:neighbors|transactions))?)?|clusters(?:\/\d+)?|top|graph|paths|exports\/(?:nodes_roles|clusters|top_nodes)\.csv|dataset\/upload|analysis\/rebuild|assistant\/query))$/;
async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const path = (await context.params).path.join("/");
  if (!allowed.test(path))
    return Response.json({ detail: "Маршрут не найден" }, { status: 404 });
  const mutation =
    /\/(dataset\/upload|analysis\/rebuild|assistant\/query)$/.test(path);
  if (
    (mutation && request.method !== "POST") ||
    (!mutation && request.method !== "GET")
  ) {
    return Response.json(
      { detail: "Метод не поддерживается" },
      { status: 405 },
    );
  }
  if (request.method === "POST") {
    const origin = request.headers.get("origin");
    if (origin && origin !== request.nextUrl.origin) {
      return Response.json(
        { detail: "Недопустимый источник запроса" },
        { status: 403 },
      );
    }
  }
  try {
    const upload = path === "api/v1/dataset/upload";
    let body: Uint8Array | undefined;
    if (request.method === "POST") {
      const max = upload ? 32 * 1024 * 1024 : 24000;
      const chunks: Uint8Array[] = [];
      let size = 0;
      const reader = request.body?.getReader();
      if (reader) {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          size += part.value.length;
          if (size > max) {
            await reader.cancel();
            return Response.json(
              { detail: "Превышен допустимый размер загрузки" },
              { status: 413 },
            );
          }
          chunks.push(part.value);
        }
      }
      body = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.length;
      }
    }
    if (!upload && body && body.length > 24000)
      return Response.json(
        { detail: "Запрос слишком большой" },
        { status: 413 },
      );
    const base = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    const response = await fetch(
      `${base.replace(/\/$/, "")}/${path}${request.nextUrl.search}`,
      {
        method: request.method,
        body: body as BodyInit | undefined,
        cache: "no-store",
        headers: {
          "Content-Type":
            request.headers.get("content-type") || "application/json",
        },
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(100000)]),
      },
    );
    const headers = new Headers({
      "Content-Type":
        response.headers.get("content-type") || "application/json",
      "Cache-Control": "no-store",
    });
    const disposition = response.headers.get("content-disposition");
    if (disposition) headers.set("Content-Disposition", disposition);
    return new Response(response.body, { status: response.status, headers });
  } catch {
    return Response.json(
      {
        detail:
          "Нет соединения с бэкендом. Проверьте, что сервер запущен, и повторите запрос.",
      },
      { status: 502 },
    );
  }
}
export const GET = proxy;
export const POST = proxy;
