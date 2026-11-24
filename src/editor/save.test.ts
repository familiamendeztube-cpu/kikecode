import { describe, expect, it } from "vitest";
import { getTemplate } from "@/templates";
import { brandFields, saveErrorFields, sitePayload } from "./save";

describe("saving a site", () => {
  it("trims a pasted space off the email (kike-sites rejects it otherwise)", () => {
    const tpl = getTemplate("barber")!;
    const payload = sitePayload(tpl.slug, { ...brandFields(tpl.brand), email: "  hola@negocio.com " }, tpl);
    expect(payload.brand.email).toBe("hola@negocio.com");
  });

  it("names the fields a failed save points at, as the drawer's input ids use them", () => {
    const err = (code: string, fields?: string[]) => Object.assign(new Error(code), { fields });
    expect(saveErrorFields(err("invalid_payload", ["brand.email", "custom_domain"]))).toEqual(["brand.email", "custom_domain"]);
    expect(saveErrorFields(err("invalid_payload", ["brand.phoneHref"]))).toEqual(["brand.phone"]);
    expect(saveErrorFields(err("domain_taken"))).toEqual(["custom_domain"]);
    expect(saveErrorFields(err("domain_requires_client"))).toEqual(["client_id"]);
    expect(saveErrorFields(new Error("conflict"))).toEqual([]);
  });
});
