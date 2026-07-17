import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProjectsWithGallery, projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/certifications",
    "/resume",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const galleryRoutes = getProjectsWithGallery().map((p) => ({
    url: `${base}/projects/${p.slug}/gallery`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...galleryRoutes];
}
