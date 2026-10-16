import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const wa = whatsappUrl();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-accent">
            TECNOLOGÍA QUE RESUELVE.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden />
            {siteConfig.location.city}, {siteConfig.location.region}, {siteConfig.location.country}
          </p>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="mb-3 text-sm font-semibold">Navegación</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {siteConfig.navigation.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Contacto</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  WhatsApp
                </a>
              ) : (
                <Link to="/contacto" className="hover:text-foreground">
                  Contacto y asesoría
                </Link>
              )}
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden />
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-3 pt-6 pb-24 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {siteConfig.legal.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <a href={l.href} className="hover:text-foreground">
                    {l.label}
                  </a>
                ) : (
                  <span>{l.label} (próximamente)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
