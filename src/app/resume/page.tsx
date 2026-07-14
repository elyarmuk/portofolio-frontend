import type { Metadata } from "next";
import { Download, Mail, FileText } from "lucide-react";

import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/sections/page-header";
import { SocialLinks } from "@/components/navigation/social-links";

export const metadata: Metadata = createMetadata({
  title: "Résumé",
  description: `Résumé of ${siteConfig.name}, software engineer specializing in Java, Spring Boot, React, cloud, and DevOps.`,
  path: "/resume",
});

const lastUpdated =
  siteConfig.resume.lastUpdated === "TODO"
    ? "TODO: set date when the approved PDF is added"
    : siteConfig.resume.lastUpdated;

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Résumé" title="Résumé" description={profile.positioningStatement}>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={siteConfig.resume.path} size="lg">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button href={`mailto:${siteConfig.contact.email}`} variant="secondary" size="lg">
            <Mail className="h-4 w-4" />
            Email me
          </Button>
        </div>
        <p className="mt-4 text-sm text-subtle">Last updated: {lastUpdated}</p>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
          {/* Preview */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Preview</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-2">
              {/* The <object> renders the PDF where supported and falls back to
                  the message below when the file is missing or unsupported. */}
              <object
                data={siteConfig.resume.path}
                type="application/pdf"
                className="h-[70vh] max-h-[900px] w-full"
                aria-label={`${siteConfig.name} résumé preview`}
              >
                <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                  <FileText className="h-8 w-8 text-subtle" aria-hidden />
                  <p className="font-medium text-muted">
                    Résumé preview isn&apos;t available in this browser.
                  </p>
                  <p className="max-w-sm text-sm text-subtle">
                    TODO: Add the approved PDF at{" "}
                    <span className="font-mono">public{siteConfig.resume.path}</span>. Until then,
                    use the download button above.
                  </p>
                  <Button href={siteConfig.resume.path} variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </object>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-bold text-foreground">
                Professional Summary
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {profile.summary.body[0]}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-subtle">
                  Contact
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-3 block text-sm font-medium text-primary hover:text-primary-hover"
                >
                  {siteConfig.contact.email}
                </a>
                <div className="mt-4">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
