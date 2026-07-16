# Deployment

The site is a standard Next.js App Router application and deploys cleanly to
**Vercel** (recommended, free tier) or **Cloudflare Pages**.

## Prerequisites

- The repository pushed to GitHub (`elyarmuk/portofolio-frontend`).
- A production build passing locally: `npm run build`.
- A **Node.js runtime** on the host. The contact form uses a Server Action, so
  plain static/shared hosting will not run it — use Hostinger Node.js hosting or
  a VPS (or Vercel/Cloudflare).

## Secrets handling

**Never put secrets in the repository or in code.** No API keys, tokens, or
passwords in commits, `.env` files that get committed, or source.

- Set secrets **only** in the hosting platform's environment settings
  (Hostinger hPanel → Node.js → Environment, or Vercel → Settings → Environment
  Variables). They are injected at runtime.
- `.env.example` is a **template only** — it lists variable names with empty
  values and must never contain real secrets.
- If a secret is ever pasted into a chat, ticket, screenshot, or commit, treat
  it as compromised: **rotate/revoke it immediately**, then re-issue a fresh one
  straight into the platform env.
- `RESEND_API_KEY` is the only true secret here. `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL` are configuration, not secrets
  (and `NEXT_PUBLIC_*` values are exposed to the browser by design — never put a
  secret behind that prefix).

## Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and **import** the GitHub repo.
2. Framework preset is auto-detected as **Next.js**. Leave build/output settings default.
3. Add environment variables (Project → Settings → Environment Variables):

   | Variable | Required | Notes |
   | -------- | -------- | ----- |
   | `NEXT_PUBLIC_SITE_URL` | Yes | Production URL, no trailing slash: `https://ahmedmoussa.tech`. |
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

## Hostinger

This app uses Server Components and a contact **Server Action**, so it needs a
**Node.js** runtime (not static HTML hosting). Use Hostinger's **Node.js hosting**
(Business/Cloud plans) or a **VPS**. The build emits a self-contained server via
`output: "standalone"` in `next.config.ts`, so you don't need to ship the full
`node_modules` tree to run it.

### Option A — Hostinger Managed Node.js Web App (hPanel) — recommended

This is the configured deployment path: **GitHub → Hostinger Managed Node.js
Web App → ahmedmoussa.tech**.

1. In hPanel, create the **Node.js Web App**:
   - **Source / repository:** `elyarmuk/portofolio-frontend` (connect GitHub)
   - **Branch:** `main` (enable auto-deploy on push if offered)
   - **Node.js version:** `22` (matches `.nvmrc`; `engines` requires ≥ 20.9)
2. **Build & start commands:**

   | Field | Value |
   | ----- | ----- |
   | Install / Build | `npm install && npm run build` |
   | Start command | `npm start` |

   > `npm start` runs `next start`, which binds to the `PORT` Hostinger injects.
   > The production build works even if the host installs prod-only
   > (`NODE_ENV=production`) — build-critical packages are in `dependencies` and
   > test files are excluded from the build's type-check.
   >
   > If your panel requires a single JS **startup file** instead of a run
   > command, use `.next/standalone/server.js` and set the build to
   > `npm install && npm run build && npm run postbuild:standalone`.
3. Set **environment variables** (hPanel → app → Environment):

   | Variable | Value |
   | -------- | ----- |
   | `NEXT_PUBLIC_SITE_URL` | `https://ahmedmoussa.tech` |
   | `NODE_ENV` | `production` |
   | `HOSTNAME` | `0.0.0.0` (only needed for the standalone startup-file variant) |
   | `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Optional — enable contact-form email delivery. Secrets go here only, never in the repo. |

4. **Deploy** from the panel, then attach the domain (below).

### Option B — Hostinger VPS

1. SSH in and install Node.js 20+ (`nvm install 20`).
2. Clone the repo, then:
   ```bash
   npm ci
   npm run build
   ```
3. Run it with a process manager so it survives restarts:
   ```bash
   npm i -g pm2
   npm run postbuild:standalone
   PORT=3000 HOSTNAME=0.0.0.0 pm2 start .next/standalone/server.js --name portfolio
   pm2 save && pm2 startup
   ```
   Or run `npm run start:standalone` directly (copies assets, then starts).
4. Put **Nginx** in front as a reverse proxy to `127.0.0.1:3000` and terminate
   HTTPS (Let's Encrypt / Hostinger SSL). Example proxy block:
   ```nginx
   location / {
     proxy_pass http://127.0.0.1:3000;
     proxy_http_version 1.1;
     proxy_set_header Host $host;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header X-Forwarded-Proto $scheme;
   }
   ```
   > The `X-Forwarded-For` header is what the contact-form rate limiter uses to
   > identify clients — keep it set.

### Redeploying

On each release: `git pull`, `npm ci`, `npm run build`, `npm run postbuild:standalone`,
then restart the Node app (hPanel) or `pm2 reload portfolio` (VPS).

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
