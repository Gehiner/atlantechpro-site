import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Compass, Cpu, Wrench, LifeBuoy } from "lucide-react";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { PageHero, SectionHeader, CTASection } from "@/components/ui-site";

const values = [
  {
    icon: Cpu,
    title: "Conocimiento técnico",
    text: "Equipos, redes y software desde una misma mirada.",
  },
  {
    icon: HeartHandshake,
    title: "Cercanía",
    text: "Te hablamos claro y te atendemos de forma personal.",
  },
  { icon: Compass, title: "Asesoría", text: "Te recomendamos lo que realmente necesitas." },
  {
    icon: Wrench,
    title: "Soluciones prácticas",
    text: "Resultados concretos, sin complicaciones innecesarias.",
  },
  {
    icon: LifeBuoy,
    title: "Acompañamiento",
    text: "Seguimos contigo después de la implementación.",
  },
];

export const Route = createFileRoute("/nosotros")({
  head: () =>
    pageHead({
      title: "Nosotros — AtlanTech Pro, tecnología desde Chiquinquirá",
      description:
        "AtlanTech Pro ofrece soluciones tecnológicas prácticas en Chiquinquirá y Boyacá: equipos, soporte, redes y desarrollo de software.",
      path: "/nosotros",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Nosotros", path: "/nosotros" },
        ]),
      ],
    }),
  component: () => (
    <>
      <PageHero
        crumb="Nosotros"
        eyebrow="Nosotros"
        title="Tu aliado tecnológico"
        text="AtlanTech Pro nace con la intención de ofrecer soluciones tecnológicas prácticas para personas y empresas, combinando equipos, soporte, infraestructura y desarrollo de software."
      />
      <section className="container-site py-16">
        <SectionHeader
          eyebrow="Lo que nos define"
          title="Cómo trabajamos contigo"
          text="Entendemos la necesidad, recomendamos una solución, la implementamos y te acompañamos."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="surface-card p-6">
              <v.icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <CTASection />
    </>
  ),
});
