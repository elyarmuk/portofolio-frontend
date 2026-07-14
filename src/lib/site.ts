/**
 * Site-wide configuration.
 *
 * Update social/contact links here — they are consumed by the navigation,
 * footer, contact page, and structured data.
 *
 * NOTE: Items marked `TODO` should be replaced with verified values before
 * launch. They are intentionally left as placeholders rather than invented.
 */

export const siteConfig = {
  name: "Ahmed Moussa",
  initials: "AM",
  title: "Software Engineer | Java Full-Stack Developer | Cloud & AI Product Builder",
  tagline:
    "Building scalable enterprise systems, cloud-native applications, and intelligent digital products.",
  description:
    "Portfolio of Ahmed Moussa, a software engineer specializing in Java, Spring Boot, React, AWS, microservices, DevOps, cloud infrastructure, and scalable digital products.",

  // Public production URL. Update after the first Vercel deployment (or set
  // NEXT_PUBLIC_SITE_URL in the environment to override).
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ahmedmoussa.dev", // TODO: confirm final domain

  locale: "en_US",

  contact: {
    email: "elyarmuk@gmail.com",
    // Personal phone intentionally omitted per requirements.
  },

  social: {
    github: "https://github.com/elyarmuk",
    linkedin: "https://www.linkedin.com/in/ahmed-moussa", // TODO: confirm exact LinkedIn URL
  },

  resume: {
    // Drop the latest approved PDF at public/documents/ahmed-moussa-resume.pdf
    path: "/documents/ahmed-moussa-resume.pdf",
    lastUpdated: "TODO", // e.g. "2026-06-01" — set when the approved PDF is added
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Primary navigation links (order matters). */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
