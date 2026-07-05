# FolioFrame Deployment-Readiness Summary

## Current Recommendation

FolioFrame is ready to deploy as a buyer-ready static service website and static portal/demo surface.

It should not be deployed or sold as a live automated SaaS until live-product blockers are resolved.

## Platform

Recommended platform:

- Vercel

Compatible with:

- Any hosting environment that supports Next.js 15 App Router builds.

## Commands

Pre-deployment commands:

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run build
```

Expected build command:

```bash
npm run build
```

## Route Output

Deployment readiness build generated 63 pages, including:

- `/`
- `/signature-launch`
- `/pricing`
- `/app`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`

## Metadata And Discovery

Included:

- Root title and description
- Open Graph metadata
- Twitter/social preview metadata
- Manifest route
- Sitemap route
- Robots route
- Noindex metadata for `/app`

## Environment Variables

For static demo deployment, only this value is recommended:

```bash
NEXT_PUBLIC_APP_URL="https://your-approved-domain.example"
```

Do not configure live-product secrets unless intentionally starting the live phase:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `AUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `SENTRY_DSN`

## Deployment Boundaries

The deployment is a static buyer demo. It does not include:

- Live checkout
- Live billing
- Live support ticketing
- Live monitoring
- Real customer records
- Production webhooks
- Production credential handling

## Buyer Deployment Checklist

- Choose production domain.
- Set `NEXT_PUBLIC_APP_URL`.
- Deploy with `npm run build`.
- Confirm `/`, `/signature-launch`, `/pricing` and `/app`.
- Confirm `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest`.
- Verify approved assets load on the deployed domain.
- Confirm static/demo notices are visible.
- Complete legal/privacy review before public promotion.
