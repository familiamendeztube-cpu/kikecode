import { describe, expect, it } from "vitest";
import { crPhone, waDigits } from "./cr";

describe("Costa Rican phones", () => {
  it("formats a number typed the local way and dials it with +506", () => {
    for (const typed of ["8888-1234", "88881234", "8888 1234", "+506 8888 1234", "(506) 8888-1234", "50688881234"]) {
      expect(crPhone(typed)).toEqual({ phone: "+506 8888-1234", phoneHref: "tel:+50688881234" });
    }
  });

  it("gives WhatsApp the country code, from a typed number or a tel: link", () => {
    expect(waDigits("8888-1234")).toBe("50688881234");
    expect(waDigits("tel:+50688881234")).toBe("50688881234");
  });

  it("leaves other countries' numbers as typed", () => {
    expect(crPhone("(562) 550-9099")).toEqual({ phone: "(562) 550-9099", phoneHref: "tel:5625509099" });
    expect(waDigits("+1 562 550 9099")).toBe("15625509099");
  });

  it("keeps an empty phone empty", () => {
    expect(crPhone("")).toEqual({ phone: "", phoneHref: "tel:" });
  });
});
