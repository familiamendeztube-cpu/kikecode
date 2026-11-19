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
  it("sends multipart with token+text and normalizes the reply", async () => {
    const fetchMock = vi.fn((_input: unknown) => new Response(
      JSON.stringify({ transcript: "hola", reply: "¡Hola!", answerId: "secretary-welcome", language: "es" }),
      { status: 200 },
    ));
    vi.stubGlobal("fetch", fetchMock);
    const out = await converse("tok-123", "es", { text: "hola<a>" });
    const call = fetchMock.mock.calls[0] as unknown as [unknown, RequestInit];
    expect(call[0]).toBe(CONVERSE_ENDPOINT);
    const form = (call[1]?.body ?? new FormData()) as FormData;
    expect(form.get("token")).toBe("tok-123");
    expect(form.get("language")).toBe("es");
    expect(form.get("text")).toBe("holaa");
    expect(out.answerId).toBe("secretary-welcome");
    expect(out.language).toBe("es");
  });

  it("appends the audio blob with a container-correct filename", async () => {
    const fetchMock = vi.fn((_input: unknown) => new Response(
      JSON.stringify({ transcript: "t", reply: "r", answerId: "secretary-orders", language: "en" }),
      { status: 200 },
    ));
    vi.stubGlobal("fetch", fetchMock);
    await converse("tok", "auto", { audio: new Blob(["x"], { type: "audio/webm" }), mime: "audio/webm;codecs=opus" });
    const call2 = fetchMock.mock.calls[0] as unknown as [unknown, RequestInit];
    const form = (call2[1]?.body ?? new FormData()) as FormData;
    const file = form.get("audio") as File;
    expect(file.name).toBe("turn.webm");
  });

  it("coerces an unexpected language to es and rejects a malformed reply", async () => {
    const fetchMock = vi.fn((_input: unknown) => new Response(
      JSON.stringify({ transcript: "t", reply: "r", answerId: "a", language: "de" }),
      { status: 200 },
    ));
    vi.stubGlobal("fetch", fetchMock);
    const ok = await converse("tok", "auto", { text: "hi" });
    expect(ok.language).toBe("es");
  });
});
