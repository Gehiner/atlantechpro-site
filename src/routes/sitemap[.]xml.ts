import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { publishedPosts } from "@/data/blog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = siteConfig.navigation
          .map(
            (n) =>
              `<url><loc>${siteConfig.url}${n.to === "/" ? "/" : n.to}</loc><changefreq>weekly</changefreq><priority>${n.to === "/" ? "1.0" : "0.8"}</priority></url>`,
          )
          .concat(
            publishedPosts.map(
              (p) =>
                `<url><loc>${siteConfig.url}/blog/${p.slug}</loc><lastmod>${p.publishedAt}</lastmod><priority>0.6</priority></url>`,
            ),
            [`<url><loc>${siteConfig.url}/privacidad</loc><priority>0.3</priority></url>`],
          )
          .join("");
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
          {
            headers: { "Content-Type": "application/xml; charset=utf-8" },
          },
        );
      },
    },
  },
});
