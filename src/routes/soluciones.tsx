import { createFileRoute } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { solutions } from "@/data/solutions";
import { PageHero, ServiceCard, CTASection } from "@/components/ui-site";

export const Route = createFileRoute("/soluciones")({
  head: () =>
    pageHead({
      title: "Soluciones tecnológicas en Boyacá — AtlanTech Pro",
      description:
        "Soporte técnico en Chiquinquirá, redes e infraestructura en Boyacá y desarrollo de software e IA para toda Colombia.",
      path: "/soluciones",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones" },
        ]),
        ...solutions.map((s) => ({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.summary,
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          areaServed: ["Chiquinquirá", "Boyacá", "Colombia"],
        })),
      ],
    }),
  component: () => (
    <>
      <PageHero
        crumb="Soluciones"
        eyebrow="Soluciones"
        title="Soluciones tecnológicas"
        text="Entendemos tu necesidad, recomendamos una solución, la implementamos y te acompañamos."
      />
      <section className="container-site grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s) => (
          <ServiceCard key={s.slug} solution={s} detailed />
        ))}
      </section>
      <CTASection />
    </>
  ),
});
