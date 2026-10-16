import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";
import { publishedPosts, postHeadTitle } from "@/data/blog";
import { absoluteUrl, blogPostingLd, pageHead } from "@/lib/seo";

const MAX_TITLE = 70;
const MAX_DESCRIPTION = 160;

describe("SEO metadata", () => {
  it("uses a trailing-slash canonical for home, matching the sitemap", () => {
    const head = pageHead({ title: "t", description: "d", path: "/" });
    expect(head.links).toEqual([{ rel: "canonical", href: `${siteConfig.url}/` }]);
    expect(absoluteUrl("/blog")).toBe(`${siteConfig.url}/blog`);
  });

  it("keeps the home description within search-result limits", () => {
    expect(siteConfig.seoDescription.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });

  describe.each(publishedPosts.map((p) => [p.slug, p] as const))("blog post %s", (_slug, post) => {
    it("has a title and description within search-result limits", () => {
      expect(postHeadTitle(post).length).toBeLessThanOrEqual(MAX_TITLE);
      expect(post.description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    });

    it("emits BlogPosting data only from real post fields", () => {
      const ld = blogPostingLd(post);
      expect(ld.datePublished).toBe(post.publishedAt);
      expect(ld.url).toBe(absoluteUrl(`/blog/${post.slug}`));
      expect("dateModified" in ld).toBe(Boolean(post.updatedAt));
      expect(ld.wordCount).toBeGreaterThan(100);
    });
  });
});
