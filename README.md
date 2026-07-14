# Ahmed Moussa — Portfolio

A modern, premium, production-ready personal portfolio for **Ahmed Moussa** — Software Engineer, Java Full-Stack Developer, and Cloud & AI Product Builder.

Built with the Next.js App Router, TypeScript, and Tailwind CSS. Fast, accessible, SEO-optimized, and easy to maintain — professional content lives in structured data files, not in page components.

---

## Tech stack

| Area        | Choice |
| ----------- | ------ |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack) |
| Language    | TypeScript |
| Styling     | Tailwind CSS v4 (token-based design system, light/dark) |
| Animation   | Framer Motion (subtle, reduced-motion aware) |
| Icons       | lucide-react (+ inline brand marks) |
| Theming     | next-themes |
| Forms       | Server Action + Zod validation + rate limiting (Resend optional) |
| Analytics   | Vercel Analytics (cookieless) |
| Testing     | Vitest + Testing Library |
| Deployment  | Vercel (free tier) |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; the site runs without it
npm run dev                  # http://localhost:3000
```

### Scripts

| Command             | Description |
| ------------------- | ----------- |
| `npm run dev`       | Start the dev server |
| `npm run build`     | Production build |
| `npm run start`     | Serve the production build |
| `npm run lint`      | ESLint |
| `npm run typecheck` | TypeScript type-check (no emit) |
| `npm test`          | Run unit & component tests |
| `npm run test:watch`| Tests in watch mode |

## Project structure

```
src/
  app/                     # Routes (App Router)
    about/  experience/  projects/[slug]/  skills/
    certifications/  resume/  contact/  privacy/
    layout.tsx  page.tsx
    sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  not-found.tsx
    contact/actions.ts     # contact server action
  components/
    ui/          # Button, Card, Badge, Section, Container, Reveal
    navigation/  # Header (mobile menu, focus trap), Footer, Logo, SocialLinks
    sections/    # PageHeader, HeroVisual
    projects/    # ProjectCard, ProjectsGrid (filterable)
    forms/       # ContactForm
    seo/         # JSON-LD (Person, CreativeWork)
    icons/       # brand marks
  content/       # profile, experience, projects, skills, certifications, tech-stack
  lib/           # site config, seo helper, validation (zod), rate-limit, email, utils
public/
  documents/  images/  icons/
```

## Editing content

All professional content is in [`src/content`](src/content) and [`src/lib/site.ts`](src/lib/site.ts).
See [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) for a field-by-field walkthrough.

> **Integrity note.** Unverified facts (job title, dates, certifications, résumé
> date, LinkedIn URL) are intentionally marked `TODO` in the content files
> rather than invented. Search the repo for `TODO` before launch.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). In short: import the repo on Vercel,
set `NEXT_PUBLIC_SITE_URL`, and (optionally) the Resend variables for the contact form.

## Accessibility & performance

- Semantic HTML, skip-to-content link, visible focus states, keyboard-accessible
  mobile menu with focus trap and `Esc` support.
- `prefers-reduced-motion` respected; animations degrade to no-ops.
- WCAG-AA-oriented color tokens in both themes.
- Server Components by default; minimal client JS; fonts optimized via `next/font`.
- Security headers + Content Security Policy configured in `next.config.ts`.

## License

Personal project. All rights reserved.
