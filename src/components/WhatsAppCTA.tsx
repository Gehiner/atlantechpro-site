import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  message?: string;
  className?: string;
  compact?: boolean;
  /** Extra commercial event fired alongside click_whatsapp (e.g. click_product). */
  event?: AnalyticsEvent;
  context?: string;
  variant?: "whatsapp" | "outline" | "link";
};

/**
 * Primary conversion CTA. Opens WhatsApp with a contextual message using the
 * number from siteConfig. While no number is configured it falls back to /contacto.
 */
export function WhatsAppCTA({
  label = "Hablar por WhatsApp",
  message,
  className,
  compact,
  event,
  context = "",
  variant = "whatsapp",
}: Props) {
  const href = whatsappUrl(message);
  const cls = cn(
    variant === "link"
      ? "inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      : cn("btn", variant === "outline" ? "btn-outline" : "btn-whatsapp"),
    className,
  );
  const onClick = () => {
    if (event) track(event, { context });
    if (href) track("click_whatsapp", { context });
  };
  const content = (
    <>
      <MessageCircle
        className={variant === "link" ? "size-4 shrink-0" : "size-5 shrink-0"}
        aria-hidden
      />
      <span className={cn(compact && "sr-only sm:not-sr-only")}>{label}</span>
    </>
  );
  if (!href) {
    return (
      <Link to="/contacto" className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
      {content}
      <span className="sr-only"> (abre WhatsApp)</span>
    </a>
  );
}

/** Discreet floating button (mobile + desktop) — rendered only once a real number exists. */
export function WhatsAppFloating() {
  const href = whatsappUrl();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => track("click_whatsapp", { context: "floating" })}
      className="btn btn-whatsapp fixed right-4 bottom-4 z-40 size-14 rounded-full p-0 shadow-lg md:size-12"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
