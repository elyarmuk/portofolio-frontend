import { siteConfig } from "@/lib/site";

/** Renders a JSON-LD <script>. Content is trusted (built from local data). */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Person schema for the site owner — emitted once in the root layout. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.contact.email}`,
    image: `${siteConfig.url}/images/ahmed-moussa.jpg`,
    jobTitle: "Software Engineer",
    description: siteConfig.description,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "AWS",
      "Microservices",
      "DevOps",
      "Cloud Architecture",
    ],
  };
  return <JsonLd data={data} />;
}

type CreativeWorkInput = {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
};

/** CreativeWork schema for a project case study. */
export function ProjectJsonLd({ name, description, url, keywords }: CreativeWorkInput) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
  };
  return <JsonLd data={data} />;
}
