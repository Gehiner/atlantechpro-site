/**
 * Commercial event tracking. No-op until a provider (gtag / fbq) is loaded via
 * the IDs in siteConfig.analytics — no credentials are hardcoded.
 */
export type AnalyticsEvent =
  "click_whatsapp" | "click_email" | "click_product" | "click_solution" | "click_project";

type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}
