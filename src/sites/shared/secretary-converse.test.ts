import { describe, it, expect, vi, afterEach } from "vitest";
import { pickRecorderMime, mimeExt, micProblem, converse, CONVERSE_ENDPOINT } from "./secretary-converse";

describe("pickRecorderMime", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("prefers webm/opus (Chrome) when supported", () => {
    vi.stubGlobal("MediaRecorder", { isTypeSupported: (m: string) => m.startsWith("audio/webm") });
    expect(pickRecorderMime()).toBe("audio/webm;codecs=opus");
  });

  it("falls back to mp4 (mobile Safari) and returns null when nothing is supported", () => {
    vi.stubGlobal("MediaRecorder", { isTypeSupported: (m: string) => m === "audio/mp4" });
    expect(pickRecorderMime()).toBe("audio/mp4");
    vi.stubGlobal("MediaRecorder", { isTypeSupported: () => false });
    expect(pickRecorderMime()).toBeNull();
  });

  it("returns null when MediaRecorder is missing entirely", () => {
    vi.stubGlobal("MediaRecorder", undefined);
    expect(pickRecorderMime()).toBeNull();
  });
});

describe("mimeExt", () => {
  it("maps container to file extension", () => {
    expect(mimeExt("audio/webm;codecs=opus")).toBe("webm");
    expect(mimeExt("audio/mp4")).toBe("m4a");
    expect(mimeExt("audio/mpeg")).toBe("mp3");
    expect(mimeExt("audio/ogg")).toBe("bin");
  });
});

describe("micProblem", () => {
  it("classifies permission denial and missing hardware", () => {
    expect(micProblem(new DOMException("no", "NotAllowedError"))).toBe("denied");
    expect(micProblem(new DOMException("no device", "NotFoundError"))).toBe("unavailable");
    expect(micProblem(new Error("boom"))).toBe("other");
  });
});

describe("converse", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("treats an audio/mpeg success as the reply audio itself", async () => {
    const mp3 = new Blob(["ID3fakemp3"], { type: "audio/mpeg" });
    vi.stubGlobal("fetch", vi.fn(async () => new Response(mp3, { status: 200, headers: { "Content-Type": "audio/mpeg" } })));
    const out = await converse("tok", "es", { text: "hola" });
    expect(out.kind).toBe("audio");
    if (out.kind === "audio") expect(out.audio.type).toBe("audio/mpeg");
  });

  it("surfaces the server's Spanish error message as-is", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(
      JSON.stringify({ error: "El reconocimiento de voz no está disponible." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    )));
    const out = await converse("tok", "es", { text: "hola" });
    expect(out.kind).toBe("error");
    if (out.kind === "error") expect(out.message).toContain("reconocimiento de voz");
  });

  it("handles a non-JSON error body gracefully", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("gateway timeout", { status: 504 })));
    const out = await converse("tok", "es", { text: "hola" });
    expect(out.kind).toBe("error");
    if (out.kind === "error") expect(out.message).toBe("");
  });

  it("sends multipart with token+text and a container-correct audio filename", async () => {
    const fetchMock = vi.fn((_input: unknown) => new Response(new Blob(["a"], { type: "audio/mpeg" }), { status: 200, headers: { "Content-Type": "audio/mpeg" } }));
    vi.stubGlobal("fetch", fetchMock);
    await converse("tok-123", "es", { text: "hola<a>" });
    const call = fetchMock.mock.calls[0] as unknown as [unknown, RequestInit];
    expect(call[0]).toBe(CONVERSE_ENDPOINT);
    const form = (call[1]?.body ?? new FormData()) as FormData;
    expect(form.get("token")).toBe("tok-123");
    expect(form.get("text")).toBe("holaa");

    await converse("tok", "auto", { audio: new Blob(["x"], { type: "audio/webm" }), mime: "audio/webm;codecs=opus" });
    const form2 = (fetchMock.mock.calls[1] as unknown as [unknown, RequestInit])[1]?.body as FormData;
    expect((form2.get("audio") as File).name).toBe("turn.webm");
  });
});
