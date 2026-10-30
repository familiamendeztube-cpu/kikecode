import { describe, expect, it } from "vitest";
import { leadOutcomeMessage, previewNotice } from "./lead-form";

describe("lead form outcome copy", () => {
  it("says nothing extra while idle, sending or after a real send (each form words its own success)", () => {
    expect(leadOutcomeMessage({ status: "idle" }, "es")).toBeNull();
    expect(leadOutcomeMessage({ status: "sending" }, "es")).toBeNull();
    expect(leadOutcomeMessage({ status: "sent" }, "es")).toBeNull();
  });

  it("tells a preview visitor that nothing was sent, in both languages", () => {
    expect(leadOutcomeMessage({ status: "preview" }, "en")).toMatch(/nothing was sent/i);
    expect(leadOutcomeMessage({ status: "preview" }, "es")).toMatch(/no se envió nada/i);
    expect(previewNotice("en")).toMatch(/not sent/i);
    expect(previewNotice("es")).toMatch(/no se envían/i);
  });

  it("says the message was not sent on every failure, and offers the phone when there is one", () => {
    for (const reason of ["network", "rate_limited", "rejected", "server", "not_configured"] as const) {
      const en = leadOutcomeMessage({ status: "failed", reason }, "en", "+506 8888 8888");
      const es = leadOutcomeMessage({ status: "failed", reason }, "es", "+506 8888 8888");
      expect(en).toContain("+506 8888 8888");
      expect(es).toContain("+506 8888 8888");
      expect(en).not.toMatch(/thank|received|sent!/i);
      expect(es).not.toMatch(/gracias|recibid/i);
    }
    expect(leadOutcomeMessage({ status: "failed", reason: "server" }, "en")).not.toMatch(/call/i);
  });
});
