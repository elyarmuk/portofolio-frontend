# Content update guide

All professional content lives in structured files so it can be updated without
touching page components. Edit the files below, save, and the site updates.

> **Integrity rule.** Never invent employment dates, titles, metrics, revenue,
> customer counts, certifications, awards, or confidential employer details.
> Where a fact isn't verified, keep the `TODO` placeholder. Search the codebase
> for `TODO` before launch:
>
> ```bash
> grep -rn "TODO" src public
> ```

## Where things live

| File | Controls |
| ---- | -------- |
| `src/lib/site.ts` | Name, title, tagline, **email, LinkedIn/GitHub URLs**, production URL, résumé path & date, nav items |
| `src/content/profile.ts` | Hero copy, positioning statement, professional summary, capability cards, "How I Build Software" steps, career direction, About narrative, learning list, contact CTA |
| `src/content/experience.ts` | Work experience (JPMorgan Chase) — role, dates, location, summary, technologies, grouped contributions |
| `src/content/projects.ts` | Projects + Joe Limo/Barkora/Retail case studies, statuses, tech, private-repo flag |
| `src/content/skills.ts` | Skills grouped by domain, with optional practical-use notes |
| `src/content/certifications.ts` | Completed certifications, currently learning, future goals |
| `src/content/tech-stack.ts` | Grouped tech chips shown on the home page |

## Common edits

### Update contact / social links
Edit `src/lib/site.ts` → `contact.email`, `social.linkedin`, `social.github`.
The `linkedin` URL is currently a `TODO` — set the real profile URL.

### Add the résumé
1. Save the approved PDF at `public/documents/ahmed-moussa-resume.pdf`.
2. In `src/lib/site.ts`, set `resume.lastUpdated` to the date (e.g. `"2026-06-01"`).
   The résumé page preview and download button work automatically.

### Fill in JPMorgan Chase details (`src/content/experience.ts`)
Replace the `TODO` fields — `role`, `startDate`, `endDate`, `location` — with
verified values from the résumé. Keep only résumé-verified contribution bullets.
Do **not** add proprietary system names, internal URLs, customer data, or metrics.

### Add or edit a project (`src/content/projects.ts`)
- Add an object to the `projects` array. `slug` becomes the URL: `/projects/<slug>`.
- `tags` drive the filter UI (must be from the `ProjectCategory` union).
- `featured: true` surfaces it on the home page.
- Private code: set `repo: "private"` (shows a "Private Repository" note, no link).
- Only set a `"Production"`/app-store status if it's currently accurate.
- Provide a `caseStudy` object to generate a full detail page; omit it for a
  card-only project. Use `diagramPlaceholder: true` on a section to render an
  architecture-diagram placeholder.

### Add a completed certification (`src/content/certifications.ts`)
Add to `completedCertifications` **only** when actually completed. Planned items
go in `currentlyLearning` or `futureGoals`.

### Replace the hero visual with a headshot
The hero uses an abstract SVG (`src/components/sections/hero-visual.tsx`). To use
a photo instead, drop it in `public/images/` and swap `<HeroVisual />` in
`src/app/page.tsx` for a `next/image` `<Image>` — the layout already reserves the space.

## After editing

```bash
npm run typecheck   # catches typos in content shapes
npm run build       # confirm it still builds
```
