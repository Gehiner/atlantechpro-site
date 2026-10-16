import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Check } from "lucide-react";
import heroImg from "@/assets/hero-network.jpg";
import { siteConfig } from "@/config/site";
import { pageHead, organizationLd, faqLd } from "@/lib/seo";
import { solutions, needs, processSteps, advantages, faqs } from "@/data/solutions";
import { productCategories } from "@/data/catalog";
import { projects } from "@/data/projects";
import { SectionHeader, ServiceCard, CTASection, ProjectCard, FAQList } from "@/components/ui-site";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "AtlanTech Pro — Servicios tecnológicos en Chiquinquirá y Boyacá",
      description: siteConfig.seoDescription,
      path: "/",
      jsonLd: [organizationLd(), faqLd(faqs)],
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-60"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30"
          aria-hidden
        />
        <div className="container-site relative py-16 md:py-24">
          <div className="max-w-2xl space-y-5 animate-fade-up">
            <p className="eyebrow">Soluciones tecnológicas para personas y empresas.</p>
            <h1 className="text-5xl font-bold leading-[1.05] md:text-6xl text-balance">
              Tecnología que resuelve.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Equipos, soporte técnico, redes, desarrollo de software, automatización e inteligencia
              artificial.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTA label="Cuéntanos qué necesitas" context="hero" />
              <Link to="/soluciones" className="btn btn-outline">
                Ver soluciones
              </Link>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden /> Atención en Chiquinquirá y
              Boyacá · Soluciones digitales en Colombia
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <SectionHeader
          eyebrow="Necesidades"
          title="¿Qué necesitas resolver?"
          text="Elige tu caso y escríbenos. Te orientamos sin compromiso."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((n) => (
            <li key={n.title}>
              <WhatsAppCTA
                variant="outline"
                label={n.title}
                message={n.message}
                context={n.title}
                className="h-full w-full justify-start text-left"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="container-site py-16 md:py-20">
          <SectionHeader
            eyebrow="Soluciones"
            title="Productos, soporte y soluciones digitales"
            text="Un solo aliado tecnológico: te recomendamos, implementamos y acompañamos."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <ServiceCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="container-site py-16 md:py-20">
          <SectionHeader
            eyebrow="Proceso"
            title="¿Cómo trabajamos?"
            text="No intentamos venderte cualquier cosa: primero entendemos tu necesidad."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.n} className="bg-background p-6">
                <span className="font-display text-3xl font-bold text-accent">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Productos"
            title="Equipos con asesoría"
            text="Te ayudamos a elegir y conseguir el equipo correcto según tu uso y presupuesto."
          />
          <Link to="/productos" className="btn btn-outline shrink-0">
            Ver categorías <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {productCategories.map((p) => (
            <li key={p.title}>
              <WhatsAppCTA
                variant="outline"
                label={p.title}
                message={p.message}
                event="click_product"
                context={p.title}
                className="min-h-10 rounded-full px-4 text-sm"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="container-site py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Proyectos"
              title="Proyectos y soluciones"
              text="Software, productos propios y soluciones tecnológicas reales."
            />
            <Link to="/proyectos" className="btn btn-outline shrink-0">
              Ver proyectos <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel="h3" />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <SectionHeader eyebrow="Por qué AtlanTech" title="Un aliado tecnológico cercano" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <li key={a.title} className="surface-card flex gap-3 p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site pb-4">
        <SectionHeader eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
        <div className="mt-8 max-w-3xl">
          <FAQList items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
