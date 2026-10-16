/**
 * Central site configuration. Every business fact shown on the site comes from here.
 * Fields set to null are intentionally empty until the real data is provided —
 * never fill them with invented values.
 */
import logoWhiteText from "@/assets/atlantech-pro-logo-white-text.png";
import isotipoAsset from "@/assets/atlantech-pro-isotipo.png.asset.json";

export type NavPath =
  "/" | "/soluciones" | "/productos" | "/proyectos" | "/nosotros" | "/blog" | "/contacto";
export type NavItem = { label: string; to: NavPath };

export const siteConfig = {
  name: "AtlanTech Pro",
  brand: { logo: logoWhiteText, isotipo: isotipoAsset.url },
  tagline: "Tecnología que resuelve.",
  description:
    "Soluciones tecnológicas en Chiquinquirá y Boyacá para personas y empresas: computadores y equipos, soporte técnico, redes, desarrollo de software, automatización e inteligencia artificial.",
  /** Meta description for the home page (≤160 chars so search results do not truncate it). */
  seoDescription:
    "Soluciones tecnológicas en Chiquinquirá y Boyacá: computadores, soporte técnico, redes, desarrollo de software, automatización e IA.",
  domain: "atlantechpro.com",
  url: "https://atlantechpro.com",
  /** Absolute social preview image (served from /public). */
  ogImage: "https://atlantechpro.com/og-image.jpg",
  contact: {
    email: "soporte@atlantechpro.com",
    /**
     * WhatsApp Business number — international format, digits only, no "+" (e.g. "57XXXXXXXXXX").
     * When null, WhatsApp buttons fall back to /contacto.
     */
    whatsapp: "573028373799" as string | null,
    whatsappDefaultMessage:
      "Hola, AtlanTech Pro. Quisiera recibir asesoría sobre una solución tecnológica.",
  },
  location: {
    city: "Chiquinquirá",
    region: "Boyacá",
    country: "Colombia",
    countryCode: "CO",
  },
  coverage: ["Chiquinquirá", "Boyacá", "Colombia (soluciones digitales y remotas)"],
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    googleBusiness: null as string | null,
  },
  analytics: {
    /** Scripts load only when an ID is set. */
    googleAnalyticsId: null as string | null,
    metaPixelId: null as string | null,
  },
  /** Legal documents: set a URL/path once the text is written by the owner. */
  legal: [
    {
      label: "Política de privacidad y tratamiento de datos",
      href: "/privacidad" as string | null,
    },
    { label: "Términos y condiciones", href: null as string | null },
  ],
  navigation: [
    { label: "Inicio", to: "/" },
    { label: "Soluciones", to: "/soluciones" },
    { label: "Productos", to: "/productos" },
    { label: "Proyectos", to: "/proyectos" },
    { label: "Nosotros", to: "/nosotros" },
    { label: "Blog", to: "/blog" },
    { label: "Contacto", to: "/contacto" },
  ] satisfies NavItem[],
} as const;

/** Pure builder (testable): returns null when no number is configured. */
export function buildWhatsappUrl(
  number: string | null | undefined,
  message: string,
): string | null {
  const n = (number ?? "").replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrl(message?: string): string | null {
  return buildWhatsappUrl(
    siteConfig.contact.whatsapp,
    message ?? siteConfig.contact.whatsappDefaultMessage,
  );
}

/** "Hola, AtlanTech Pro. {body}" — consistent contextual messages. */
export const waMsg = (body: string) => `Hola, AtlanTech Pro. ${body}`;
