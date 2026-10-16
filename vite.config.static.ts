// Static export for shared hosting (Hostinger Web Premium): `bun run build:static`.
//
// Kept separate from vite.config.ts on purpose: Lovable's own build (Nitro/Cloudflare) keeps
// using vite.config.ts untouched. This config produces plain files in dist/client — no Node.js
// server is needed in production.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // No Nitro runtime/target: the deliverable is static HTML + assets, not a server bundle.
  nitro: false,
  tanstackStart: {
    // Same SSR error-wrapper entry as vite.config.ts (used at build time to render the pages).
    server: { entry: "server" },
    // "/" and the sitemap are listed explicitly. Static routes are auto-discovered and the
    // dynamic /blog/$slug pages are found by crawling the links rendered in /blog.
    // scripts/postbuild-static.mjs then checks that EVERY URL in sitemap.xml has its HTML file.
    pages: [{ path: "/" }, { path: "/sitemap.xml" }],
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Any page that fails to render must fail the build, never be skipped silently.
      failOnError: true,
      // In-page anchors (/soluciones#...) are the same document: don't render them again.
      filter: (page: { path: string }) => !page.path.includes("#"),
    },
  },
});
