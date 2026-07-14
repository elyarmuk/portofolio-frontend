import { siteConfig } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

const links = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
];

/** External profile links (LinkedIn, GitHub). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-1 " + (className ?? "")}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens in a new tab)`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
