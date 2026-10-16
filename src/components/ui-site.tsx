import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ImageIcon, ExternalLink, MapPin } from "lucide-react";
import type { Solution } from "@/data/solutions";
import type { ProductCategory } from "@/data/catalog";
import type { Project } from "@/data/projects";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  text,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const H = as;
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H
        className={cn(
          "font-bold text-balance",
          as === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
        )}
      >
        {title}
      </H>
      {text && <p className="text-pretty text-muted-foreground md:text-lg">{text}</p>}
    </div>
  );
}

export function ServiceCard({ solution, detailed }: { solution: Solution; detailed?: boolean }) {
  const Icon = solution.icon;
  return (
    <article id={solution.slug} className="surface-card flex flex-col p-6 scroll-mt-24">
      <div className="mb-5 grid size-11 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="text-xl font-semibold">{solution.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{solution.summary}</p>
      {detailed && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {solution.items.map((i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {i}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-6">
        <WhatsAppCTA
          variant="link"
          label={`Solicitar asesoría sobre ${solution.title.toLowerCase()}`}
          message={solution.message}
          event="click_solution"
          context={solution.slug}
        />
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: ProductCategory }) {
  const Icon = product.icon;
  return (
    <article className="surface-card flex flex-col p-6">
      <Icon className="size-6 text-accent" aria-hidden />
      <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
      <p className="mt-1.5 mb-5 text-sm text-muted-foreground">{product.text}</p>
      <WhatsAppCTA
        variant="outline"
        className="mt-auto text-sm"
        label="Consultar disponibilidad"
        message={product.message}
        event="click_product"
        context={product.title}
      />
    </article>
  );
}

export function ProjectCard({
  project,
  headingLevel = "h2",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const cover = project.images[0];
  return (
    <article id={project.slug} className="surface-card flex flex-col overflow-hidden scroll-mt-24">
      {cover ? (
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div
          className="grid aspect-video place-items-center border-b border-border bg-surface-2 text-muted-foreground"
          role="img"
          aria-label="Imágenes del proyecto próximamente"
        >
          <ImageIcon className="size-8 opacity-50" aria-hidden />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">
          {project.kind} · {project.area}
        </p>
        <H className="mt-2 text-xl font-semibold">{project.name}</H>
        {project.client && <p className="mt-1 text-sm font-medium">{project.client}</p>}
        {project.location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {project.location}
          </p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
        {project.note && (
          <p className="mt-2 text-xs text-muted-foreground italic">{project.note}</p>
        )}
        {project.status && (
          <p className="mt-2 text-sm">
            <strong>Estado:</strong> {project.status}
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Etiquetas">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("click_project", { context: project.slug })}
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                {l.label} <ExternalLink className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function CTASection({
  title = "¿Tienes una necesidad tecnológica?",
  text = "Cuéntanos qué necesitas y te orientamos hacia la solución adecuada.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-site py-16 md:py-20">
      <div className="bg-cta relative overflow-hidden rounded-2xl border border-border p-8 md:p-14">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative max-w-xl space-y-4">
          <h2 className="text-3xl font-bold md:text-4xl text-balance">{title}</h2>
          <p className="text-muted-foreground md:text-lg">{text}</p>
          <div className="pt-2">
            <WhatsAppCTA label="Cuéntanos qué necesitas" context="cta" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: "/" }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.to ? (
              <Link to={it.to} className="hover:text-foreground">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumb,
  eyebrow,
  title,
  text,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero border-b border-border">
      <div className="container-site space-y-6 pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: crumb }]} />
        <SectionHeader
          as="h1"
          eyebrow={eyebrow}
          title={title}
          text={text}
          className="animate-fade-up"
        />
        {children}
      </div>
    </section>
  );
}

export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            <h3 className="text-base font-medium">{f.q}</h3>
            <ChevronRight
              className="size-4 shrink-0 transition-transform group-open:rotate-90"
              aria-hidden
            />
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
