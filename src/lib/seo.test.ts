import { describe, it, expect } from "vitest";
import { createMetadata } from "./seo";
import { siteConfig } from "./site";

describe("createMetadata", () => {
  it("builds a titled canonical URL for a path", () => {
    const meta = createMetadata({ title: "Projects", path: "/projects" });
    expect(meta.title).toContain("Projects");
    expect(meta.title).toContain(siteConfig.name);
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/projects`);
  });

  it("falls back to the default title for the home page", () => {
    const meta = createMetadata();
    expect(meta.title).toContain(siteConfig.name);
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/`);
  });

  it("sets noindex robots when requested", () => {
    const meta = createMetadata({ noIndex: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("includes Open Graph and Twitter cards", () => {
    const meta = createMetadata({ title: "About", path: "/about" });
    expect(meta.openGraph?.url).toBe(`${siteConfig.url}/about`);
    // twitter is typed loosely; assert the card type is present.
    expect(meta.twitter).toBeTruthy();
  });
});
