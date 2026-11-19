import { describe, it, expect, vi, afterEach } from "vitest";
import { demoRequest, CONVERSE_ENDPOINT } from "./secretary-converse";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("demoRequest", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posts {action, token} as JSON and returns the server's body", async () => {
    const status = { notice: "n", closing: "c", remaining: 2, limits: { conversations: 3, questions: 10, minutes: 5 } };
    const fetchMock = vi.fn(async (_url: unknown, _init?: RequestInit) => json(status));
    vi.stubGlobal("fetch", fetchMock);
    expect(await demoRequest("status", "abc")).toEqual(status);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(CONVERSE_ENDPOINT);
    expect(JSON.parse(String(init?.body))).toEqual({ action: "status", token: "abc" });
  });

  it("throws the server's Spanish error text as-is", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => json({ error: "Demasiadas solicitudes. Intente en un momento." }, 429)));
    await expect(demoRequest("start", "abc")).rejects.toThrow("Demasiadas solicitudes. Intente en un momento.");
  });

  it("falls back to a Spanish message when the network or body fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("gateway timeout", { status: 504 })));
    await expect(demoRequest("start", "abc")).rejects.toThrow(/No se pudo conectar/);
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));
    await expect(demoRequest("status", "abc")).rejects.toThrow(/No se pudo conectar/);
  });
});
