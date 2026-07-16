import Link from "next/link";
import { Mail } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

const currentYear = new Date().getFullYear();

const secondaryLinks = [
  { label: "Certifications", href: "/certifications" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-slate-300">
      <Container className="py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.title}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.contact.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {[...navItems, ...secondaryLinks].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              Connect
            </p>
            <SocialLinks onDark />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono text-xs">Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
