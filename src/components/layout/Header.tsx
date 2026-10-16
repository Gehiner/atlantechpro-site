import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export function Header() {
  const [open, setOpen] = useState(false);
  const links = siteConfig.navigation.filter((n) => n.to !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 btn btn-primary"
      >
        Saltar al contenido
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground", "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppCTA label="WhatsApp" compact className="min-h-10 px-3 sm:px-4 text-sm" />
          <button
            type="button"
            className="btn btn-outline size-10 min-h-10 p-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Móvil"
          className="border-t border-border lg:hidden animate-fade-up"
        >
          <ul className="container-site flex flex-col py-3">
            {siteConfig.navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-accent" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
