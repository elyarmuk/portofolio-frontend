import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} about engineering roles, architecture, consulting, collaboration, or building a product.`,
  path: "/contact",
});

const channels = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: siteConfig.social.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "See my code",
    href: siteConfig.social.github,
    Icon: GithubIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="I'm open to engineering and architecture roles, technical collaboration, consulting, software projects, and startup conversations. Tell me a bit about what you have in mind."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <aside className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">Other ways to reach me</h2>
                <ul className="mt-4 space-y-3">
                  {channels.map((c) => {
                    const isExternal = c.href.startsWith("http");
                    return (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40"
                        >
                          <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <c.Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">{c.label}</span>
                            <span className="block truncate text-sm text-muted">{c.value}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2/60 p-4 text-sm text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                <p>
                  Your details are used only to reply. See the{" "}
                  <Link href="/privacy" className="font-medium text-primary hover:underline">
                    privacy page
                  </Link>{" "}
                  for how submissions are handled.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
