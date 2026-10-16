import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { siteConfig, waMsg } from "@/config/site";
import { pageHead, breadcrumbLd, blogPostingLd } from "@/lib/seo";
import { getPost, publishedPosts, formatPostDate, postHeadTitle } from "@/data/blog";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: `Artículo no encontrado — ${siteConfig.name}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const path = `/blog/${post.slug}`;
    const base = pageHead({
      title: postHeadTitle(post),
      description: post.description,
      path,
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]),
        blogPostingLd(post),
      ],
    });
    return {
      ...base,
      meta: base.meta
        .map((m) =>
          "property" in m && m.property === "og:type"
            ? { property: "og:type", content: "article" }
            : m,
        )
        .concat([
          { property: "article:published_time", content: post.publishedAt },
          ...(post.updatedAt
            ? [{ property: "article:modified_time", content: post.updatedAt }]
            : []),
        ]),
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = publishedPosts.filter((p) => p.slug !== post.slug);
  return (
    <article>
      <header className="bg-hero border-b border-border">
        <div className="container-site max-w-3xl space-y-5 pt-10 pb-12 md:pt-14">
          <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li className="flex items-center gap-1.5">
                <Link to="/" className="hover:text-foreground">
                  Inicio
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
              <li className="flex items-center gap-1.5">
                <Link to="/blog" className="hover:text-foreground">
                  Blog
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
              <li aria-current="page" className="text-foreground line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-balance md:text-5xl">{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            Publicado el <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>{" "}
            · {siteConfig.name}
          </p>
        </div>
      </header>

      <div className="container-site max-w-3xl space-y-10 py-12 text-base leading-relaxed md:text-lg">
        <p className="text-foreground/90">{post.intro}</p>
        {post.sections.map((s) => (
          <section key={s.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="text-muted-foreground">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground marker:text-accent">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <aside className="surface-card space-y-4 p-6" aria-label="Asesoría">
          <p className="font-semibold">¿Quieres que lo revisemos contigo?</p>
          <p className="text-sm text-muted-foreground">
            Escríbenos por WhatsApp y te orientamos según tu caso, en Chiquinquirá, Boyacá o de
            forma remota.
          </p>
          <WhatsAppCTA
            label={post.cta.label}
            message={waMsg(post.cta.message)}
            context={`blog:${post.slug}`}
          />
        </aside>

        <nav aria-label="Enlaces relacionados" className="space-y-3">
          <h2 className="text-xl font-semibold">Relacionado</h2>
          <ul className="space-y-2 text-base">
            {post.related.map((r) => (
              <li key={r.label}>
                <Link
                  to={r.to}
                  {...(r.hash ? { hash: r.hash } : {})}
                  className="text-accent hover:underline"
                >
                  {r.label}
                </Link>
              </li>
            ))}
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: o.slug }}
                  className="text-accent hover:underline"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> Volver al blog
        </Link>
      </div>
    </article>
  );
}
