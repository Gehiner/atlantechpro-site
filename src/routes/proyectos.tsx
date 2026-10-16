import { createFileRoute } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { projects } from "@/data/projects";
import { PageHero, ProjectCard, CTASection } from "@/components/ui-site";

export const Route = createFileRoute("/proyectos")({
  head: () =>
    pageHead({
      title: "Proyectos y soluciones — AtlanTech Pro",
      description:
        "Software, productos propios y soluciones tecnológicas desarrolladas o implementadas por AtlanTech Pro.",
      path: "/proyectos",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Proyectos", path: "/proyectos" },
        ]),
      ],
    }),
  component: () => (
    <>
      <PageHero
        crumb="Proyectos"
        eyebrow="Proyectos"
        title="Proyectos y soluciones"
        text="Software, productos propios y soluciones tecnológicas desarrolladas o implementadas por AtlanTech Pro."
      />
      <section className="container-site grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
      <CTASection title="Cuéntanos tu proyecto" />
    </>
  ),
});
