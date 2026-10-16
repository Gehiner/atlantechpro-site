import { siteConfig } from "@/config/site";
import { postWordCount, type BlogPost } from "@/data/blog";

type PageSeo = { title: string; description: string; path: string; jsonLd?: object[] };

/** Absolute URL for a site path. Home is `https://domain/`, exactly as listed in the sitemap. */
export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

/** Builds per-route head(): title, description, canonical, Open Graph, Twitter, JSON-LD. */
export function pageHead({ title, description, path, jsonLd = [] }: PageSeo) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { property: "og:image", content: siteConfig.ogImage },
      { name: "twitter:image", content: siteConfig.ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/**
 * BlogPosting for a published post. Every value comes from the post data or siteConfig:
 * `dateModified` only when `updatedAt` is set; `image` is the same social image the page
 * already declares in og:image (replace it when the post has its own real image).
 */
export function blogPostingLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const organization = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "es-CO",
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    wordCount: postWordCount(post),
    image: [siteConfig.ogImage],
    author: organization,
    publisher: organization,
    isPartOf: {
      "@type": "Blog",
      name: `Blog de tecnología — ${siteConfig.name}`,
      url: absoluteUrl("/blog"),
    },
  };
}

export function organizationLd() {
  const sameAs = Object.values(siteConfig.social).filter((v): v is string => Boolean(v));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    areaServed: ["Chiquinquirá", "Boyacá", "Colombia"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Only use for Q&A that is visible on the same page. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
