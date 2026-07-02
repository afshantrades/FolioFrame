# FolioFrame Static Buyer Demo Deployment Notes

## Deployment Status

FolioFrame is ready to deploy as a buyer-ready static service website and static portal/demo surface.

It is not ready to operate as a live SaaS, automated fulfilment product, billing system, support system or production integration hub.

## Recommended Platform

- Vercel is the expected deployment path for the current Next.js App Router build.
- The app can also run on any host that supports Next.js 15.
- Use the existing `next build` output. Do not deploy `.env.local`, local database volumes, `.next/` from development, or local screenshot tooling.

## Build Commands

Required commands before deployment:

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run build
```

Expected production build command:

```bash
npm run build
```

Expected output:

- Next.js App Router build completes successfully.
- Public buyer routes are generated as static pages.
- `/app` remains available as a static/demo portal surface when auth is not configured.
- Dynamic Clerk sign-in/sign-up routes may remain server-rendered if Clerk is configured later.

## Environment Variables

The static buyer demo can build without production credentials.

Recommended public deployment value:

```bash
NEXT_PUBLIC_APP_URL="https://your-approved-domain.example"
```

Optional live-product variables should not be configured for this static demo unless the live phase is intentionally being tested:

```bash
DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
AUTH_SECRET
ADMIN_EMAIL
SUPPORT_EMAIL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
SENTRY_DSN
```

Do not commit `.env`, `.env.local` or production secrets.

## Static/Demo Boundaries

The deployed buyer demo must continue to state:

- No live billing is active.
- No live checkout is connected.
- No live customer records are shown.
- No live monitoring is active.
- No production webhooks are active.
- No support ticketing workflow is active.
- The `/app` area is a static/demo portal surface unless Clerk/database are intentionally configured later.

## Auth, Database And Prisma Notes

- Clerk is installed as the selected auth foundation, but it is optional for this static demo.
- Prisma is installed and generated for the live-product foundation, but deployment does not require a production database for the static buyer demo.
- If Clerk variables are not configured, public pages remain available and `/app` remains a static/demo portal surface.
- If a live database is introduced later, workspace access must remain server-checked.

## SEO And Discovery

This deployment pass adds:

- Root metadata with title, description, Open Graph and Twitter preview data.
- Route metadata for `/`, `/signature-launch`, `/pricing` and `/app`.
- `manifest.webmanifest` using the approved standalone emblem asset.
- `robots.txt` generated from `app/robots.ts`.
- `sitemap.xml` generated from `app/sitemap.ts`.

The sitemap lists public buyer-facing routes only. `/app`, `/sign-in` and `/sign-up` are not intended for public search indexing.

## Public Route Checks

Primary routes to verify after deployment:

- `/`
- `/signature-launch`
- `/pricing`
- `/app`

Additional retained route:

- `/signature-launch-system`

## Asset Rules

Do not replace, redraw, regenerate, crop, trace, imitate or substitute approved FolioFrame assets.

Approved assets remain under:

- `public/assets/logos/`
- `public/assets/visuals_01_to_10/`
- `public/assets/curated_motifs/`

Rejected generated assets must not be imported or referenced.

## Deployment Recommendation

Deploy as a static buyer-facing service website and demo portal.

Do not present the deployment as a live SaaS/product until production auth, secure credential handling, database configuration, live checkout/webhook/email integrations, monitoring decisions and legal/privacy review are complete.
