import { describe, it, expect } from "vitest";
import { publishedPosts, getPost } from "@/data/blog";
describe("blog", () => {
  it("publishes the three launch articles", () => expect(publishedPosts).toHaveLength(3));
  it("resolves the computer guide by slug", () =>
    expect(getPost("como-elegir-computador")?.title).toContain("computador"));
});
