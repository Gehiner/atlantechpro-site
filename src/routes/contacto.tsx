import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Laptop, Wrench, Network, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { track } from "@/lib/analytics";
import { PageHero, CTASection } from "@/components/ui-site";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

const topics = [
  {
    icon: Laptop,
    title: "Equipos",
    text: "Qué computador, portátil o equipo conviene según tu uso y presupuesto.",
  },
  {
    icon: Wrench,
    title: "Soporte técnico",
    text: "Mantenimiento, upgrades de SSD/RAM, Windows y configuración.",
  },
  { icon: Network, title: "Redes", text: "Routers, Wi-Fi y conectividad para casa o negocio." },
  {
    icon: Code2,
    title: "Software e IA",
    text: "Páginas, sistemas, automatizaciones e inteligencia artificial.",
  },
];

export const Route = createFileRoute("/contacto")({
  head: () =>
    pageHead({
      title: "Contacto y asesoría — AtlanTech Pro, Chiquinquirá",
      description:
        "Habla con AtlanTech Pro por WhatsApp o correo. Asesoría en equipos, soporte técnico, redes y software en Chiquinquirá y Boyacá.",
      path: "/contacto",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ]),
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  const hasWa = Boolean(siteConfig.contact.whatsapp);
  return (
    <>
      <PageHero
        crumb="Contacto"
        eyebrow="Contacto y asesoría"
        title="Cuéntanos qué necesitas"
        text="Si buscas un equipo, necesitas soporte técnico, quieres mejorar tu red o tienes un proyecto de software, cuéntanos qué necesitas y te orientamos hacia una solución."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {hasWa && <WhatsAppCTA label="Hablar por WhatsApp" context="contacto" />}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={() => track("click_email", { context: "contacto" })}
            className={hasWa ? "btn btn-outline" : "btn btn-primary"}
          >
            <Mail className="size-4" aria-hidden /> {siteConfig.contact.email}
          </a>
        </div>
      </PageHero>

      <section className="container-site grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-2xl font-bold">¿En qué te podemos asesorar?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {topics.map((t) => (
              <li key={t.title} className="surface-card p-5">
                <t.icon className="size-5 text-accent" aria-hidden />
                <h3 className="mt-3 font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <aside className="surface-card h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">Ubicación y cobertura</h2>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-accent" aria-hidden /> {siteConfig.location.city},{" "}
            {siteConfig.location.region}, {siteConfig.location.country}
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {siteConfig.coverage.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </aside>
      </section>
      <CTASection title="Hablemos de tu necesidad" />
    </>
  );
}
