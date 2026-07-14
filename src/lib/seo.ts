import type { Metadata } from "next";
import { siteConfig } from "./site";

const baseUrl = siteConfig.url;

type CreateMetadataInput = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/projects". */
  path?: string;
  /** Override the OG image path (defaults to the dynamic opengraph-image). */
  image?: string;
  noIndex?: boolean;
};

/**
 * Builds consistent per-page metadata: title template, canonical URL,
 * Open Graph, and Twitter cards.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const url = new URL(path, baseUrl).toString();
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Software Engineer, Java Full-Stack Developer & Cloud Engineer`;

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
