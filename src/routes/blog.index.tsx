import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { publishedPosts, formatPostDate } from "@/data/blog";
import { PageHero, CTASection } from "@/components/ui-site";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog de tecnología — AtlanTech Pro, Chiquinquirá",
      description:
        "Guías prácticas sobre computadores, redes Wi-Fi, soporte técnico y automatización para personas y pequeños negocios en Chiquinquirá y Boyacá.",
      path: "/blog",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Blog"
        title="Guías prácticas de tecnología"
        text="Consejos claros para elegir equipos, mejorar tu red y aprovechar el software en tu casa o negocio."
      />
      <section className="container-site grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {publishedPosts.map((p) => (
          <article key={p.slug} className="surface-card flex flex-col p-6">
            <time dateTime={p.publishedAt} className="text-xs text-muted-foreground">
              {formatPostDate(p.publishedAt)}
            </time>
            <h2 className="mt-2 text-xl font-semibold text-balance">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-accent">
                {p.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.description}</p>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              aria-label={`Leer: ${p.title}`}
            >
              Leer artículo <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>
        ))}
      </section>
      <CTASection />
    </>
  );
}
