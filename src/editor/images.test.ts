import { beforeEach, describe, expect, it, vi } from "vitest";

/*
  Uploaded photos go to PLW Storage and the site keeps only their URL. When
  Storage cannot take one, the photo stays inline so editing never breaks.
*/

const callFn = vi.fn();
const uploadToSignedUrl = vi.fn();
vi.mock("@/lib/plw", () => ({
  callFn: (...args: unknown[]) => callFn(...args),
  supabase: { storage: { from: (bucket: string) => ({ uploadToSignedUrl: (...args: unknown[]) => uploadToSignedUrl(bucket, ...args) }) } },
}));

const { storeImage } = await import("./images");

// A 1×1 transparent PNG.
const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const SITE = "11111111-1111-4111-8111-111111111111";

beforeEach(() => {
  callFn.mockReset();
  uploadToSignedUrl.mockReset();
});

describe("storeImage", () => {
  it("uploads with the signed token and returns the public URL", async () => {
    callFn.mockResolvedValue({ reused: false, path: `sites/${SITE}/a.png`, token: "tok", url: "https://cdn.test/a.png" });
    uploadToSignedUrl.mockResolvedValue({ error: null });
    expect(await storeImage(PNG, SITE)).toBe("https://cdn.test/a.png");
    const [, request] = callFn.mock.calls[0];
    expect(request).toMatchObject({ action: "upload_url", mime: "image/png", site_id: SITE });
    expect(request.bytes).toBeGreaterThan(0);
    expect(request.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(uploadToSignedUrl).toHaveBeenCalledWith("kike-site-assets", `sites/${SITE}/a.png`, "tok", expect.any(Blob), { contentType: "image/png", cacheControl: "31536000" });
  });

  it("reuses an identical earlier upload without sending the file again", async () => {
    callFn.mockResolvedValue({ reused: true, url: "https://cdn.test/same.png" });
    expect(await storeImage(PNG, null)).toBe("https://cdn.test/same.png");
    expect(uploadToSignedUrl).not.toHaveBeenCalled();
  });

  it("keeps the photo inline when Storage cannot take it", async () => {
    callFn.mockRejectedValue(new Error("unknown_action"));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await storeImage(PNG, SITE)).toBe(PNG);
    callFn.mockResolvedValue({ reused: false, path: "p", token: "t", url: "u" });
    uploadToSignedUrl.mockResolvedValue({ error: new Error("mime type not supported") });
    expect(await storeImage(PNG, SITE)).toBe(PNG);
    warn.mockRestore();
  });

  it("leaves a URL that is already stored alone", async () => {
    expect(await storeImage("https://cdn.test/x.jpg", SITE)).toBe("https://cdn.test/x.jpg");
    expect(callFn).not.toHaveBeenCalled();
  });
});
