# Deployment

The site is a standard Next.js App Router application and deploys cleanly to
**Vercel** (recommended, free tier) or **Cloudflare Pages**.

## Prerequisites

- The repository pushed to GitHub (`elyarmuk/portofolio-frontend`).
- A production build passing locally: `npm run build`.

## Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and **import** the GitHub repo.
2. Framework preset is auto-detected as **Next.js**. Leave build/output settings default.
3. Add environment variables (Project → Settings → Environment Variables):

   | Variable | Required | Notes |
   | -------- | -------- | ----- |
   | `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL, no trailing slash (e.g. `https://ahmedmoussa.dev`). |
   | `RESEND_API_KEY` | Optional | Enables contact-form email delivery. |
   | `CONTACT_TO_EMAIL` | Optional | Where contact submissions are sent. |
   | `CONTACT_FROM_EMAIL` | Optional | Verified Resend sender. |

4. Deploy. Vercel's Git integration then handles the rest automatically:
   - **Pull requests** → Preview Deployments (unique URL per PR).
   - **Merges to `main`** → Production deployment.

5. (Optional) Add a custom domain under Project → Settings → Domains, then update
   `NEXT_PUBLIC_SITE_URL` to match.

> Because Vercel deploys via its Git integration, no deploy tokens are stored in
> the repo. The GitHub Actions workflow (`.github/workflows/ci.yml`) runs the
> quality gate (lint, typecheck, test, build, audit) on every PR.

## Cloudflare Pages (alternative)

1. Create a Pages project from the GitHub repo.
2. Build command: `npx @cloudflare/next-on-pages@1` (or use the Next.js preset).
3. Set the same environment variables as above.
4. Deploy. Preview deployments are created per branch/PR.

## Post-deploy checklist

- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain (fixes canonical URLs, sitemap, OG tags).
- [ ] `/sitemap.xml` and `/robots.txt` resolve and reference the correct host.
- [ ] Social share preview renders (`/opengraph-image`).
- [ ] Contact form: submit a test message; confirm delivery (or check server logs if Resend is unset).
- [ ] Replace remaining `TODO` content (see `docs/CONTENT_GUIDE.md`).
- [ ] Add the résumé PDF to `public/documents/ahmed-moussa-resume.pdf`.
- [ ] Run Lighthouse on the production URL (targets: Perf 90+, A11y 95+, Best Practices 95+, SEO 95+).
