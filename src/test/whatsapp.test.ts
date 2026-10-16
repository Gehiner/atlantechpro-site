import { describe, it, expect } from "vitest";
import { buildWhatsappUrl, siteConfig, whatsappUrl } from "@/config/site";

describe("WhatsApp links", () => {
  it("uses the WhatsApp number configured in siteConfig", () => {
    const number = siteConfig.contact.whatsapp;
    expect(number).toBeTruthy();
    expect(whatsappUrl("Hola")).toBe(`https://wa.me/${number}?text=Hola`);
  });
  it("returns null when a number is not supplied", () =>
    expect(buildWhatsappUrl(null, "Hola")).toBeNull());
  it("builds wa.me link with encoded contextual message", () =>
    expect(buildWhatsappUrl("+57 300", "Hola, AtlanTech Pro.")).toBe(
      "https://wa.me/57300?text=Hola%2C%20AtlanTech%20Pro.",
    ));
});
