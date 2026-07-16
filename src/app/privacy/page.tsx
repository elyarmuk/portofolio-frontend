import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = createMetadata({
  title: "Privacy",
  description: `Privacy information for ${siteConfig.name}'s portfolio website.`,
  path: "/privacy",
});

const sections = [
  {
    heading: "Overview",
    body: [
      `This privacy page explains what limited information this website collects and how it is used. ${siteConfig.name}'s portfolio is a personal website and does not sell or share personal data.`,
    ],
  },
  {
    heading: "Contact Form",
    body: [
      "If you use the contact form, the details you submit (name, email, subject, reason for contact, and message) are used solely to respond to your inquiry.",
      "Submissions are processed server-side. Basic spam protection and rate limiting are applied to prevent abuse. Your information is not used for marketing and is not sold.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "This site may use privacy-conscious, cookieless analytics (e.g. Vercel Analytics) to understand aggregate traffic. These analytics do not use tracking cookies and do not build advertising profiles.",
      "If cookies requiring consent are ever introduced, an appropriate consent experience will be added and this page updated.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "Contact messages are retained only as long as needed to handle your inquiry.",
    ],
  },
  {
    heading: "Your Choices",
    body: [
      `You can request that any message you sent be deleted by emailing ${siteConfig.contact.email}.`,
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about this page? Email ${siteConfig.contact.email}.`],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        description="What this site collects, and why. Kept intentionally minimal."
      />
      <Section>
        <div className="max-w-2xl space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-foreground">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="text-sm text-subtle">
            This is general information, not legal advice.
          </p>
        </div>
      </Section>
    </>
  );
}
