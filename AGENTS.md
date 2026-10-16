<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- All business facts (name, contact, WhatsApp, location, nav, social, analytics IDs) live in `src/config/site.ts`; never hardcode them elsewhere — one place to update real data.
- Unknown business data stays `null`/empty and the UI degrades gracefully; never invent phone, address, clients, projects, prices — brief forbids fabricated info.
- No contact form: WhatsApp (via `whatsappUrl()`/`WhatsAppCTA` with contextual messages) is the only conversion channel; the deprecated `contact_requests` table/RPC are unused — V1 scope is a commercial site, not lead capture.
- Commercial click events go through `track()` in `src/lib/analytics.ts`, a no-op until a provider ID is configured — no fake IDs.
- Each route builds its head with `pageHead()` from `src/lib/seo.ts` (canonical, OG, Twitter, JSON-LD) — consistent SEO.
- Content lists (solutions, needs, FAQ, product categories, projects) live in `src/data/` — add content without touching components.
- Official brand assets are referenced through `siteConfig.brand`; derive display variants from the original raster without redrawing, applying only owner-approved color changes, and derive the local favicon from the official isotipo to preserve identity.
- Blog posts are a typed module in `src/data/blog.ts` (no CMS/DB); only `draft: false` posts are routed and listed in the sitemap — simplest maintainable content source.
- Legal text marks owner-supplied unknowns with a visible `Pending` marker instead of invented values.
