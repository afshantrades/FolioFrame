# FolioFrame Production Static Demo Deployment Checklist

## Current Deployment Baseline

- Current branch: `folioframe/deploy-production-static-demo`
- Latest commit: `ca89375 Prepare FolioFrame static buyer demo for deployment`
- Deployment target: buyer-ready static service website and static portal/demo surface
- Product status: static/demo only

## Build Result

Most recent local verification passed:

- `npm run prisma:generate`: passed
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build`: passed

Build output summary:

- Next.js production build completed successfully.
- `63/63` static pages generated.
- `/sign-in` and `/sign-up` remain dynamic Clerk foundation routes, but live production auth is not part of this static demo deployment.

## Required Environment Variable

Set only the public application URL for this static phase:

```bash
NEXT_PUBLIC_APP_URL="https://your-production-domain.example"
```

Use the real deployed domain once selected.

## Forbidden Live Secrets For This Static Phase

Do not add production secrets or live integration credentials for this static demo deployment.

Do not configure:

- `DATABASE_URL` for production data
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` for live production auth
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `SENTRY_DSN` unless deliberately adding monitoring in a separate approved step
- `MAKE_WEBHOOK_URL`
- `ZAPIER_WEBHOOK_URL`
- `MAILERLITE_API_KEY`
- `CONVERTKIT_API_KEY`
- `AIRTABLE_API_KEY`
- `VIMEO_ACCESS_TOKEN`
- Any customer, buyer, billing, support or production integration secret

The static demo should not imply live auth, billing, customer records, webhooks, email sending, support tickets, monitoring or fulfilment automation.

## Route Checklist

Verify these priority routes after deployment:

- `/`
- `/signature-launch`
- `/signature-launch-system`
- `/pricing`
- `/modules`
- `/apply`
- `/faq`
- `/privacy`
- `/terms`
- `/refund-policy`
- `/accessibility`
- `/app`
- `/app/premium-dashboard`
- `/app/implementation-docs`

Expected result:

- Public routes load without server errors.
- `/signature-launch` is the clean buyer-facing route.
- `/signature-launch-system` remains available if retained for compatibility.
- `/app` loads as a static/demo portal surface.
- No route asks buyers for production credentials.

## `/app` Static/Demo Boundary Check

Confirm `/app` and internal portal pages clearly communicate:

- Static/demo only.
- No real auth.
- No live billing.
- No live customer records.
- No live Stripe, Resend, Zapier, Make, MailerLite, ConvertKit or webhook connection.
- No live monitoring.
- No real support tickets.
- Production integrations are not connected.

If Clerk or database environment variables are absent, the portal should remain safe and readable as a static demo/fallback surface.

## Post-Deploy QA Checklist

After deployment, verify:

- Homepage loads with approved FolioFrame brand assets.
- Approved logo is visible and not distorted.
- Approved visuals and motifs load.
- No rejected generated assets appear.
- Header and footer navigation links work.
- Primary CTAs route to safe static/demo destinations.
- Pricing page remains readable on desktop and mobile.
- `/app` shows usable dashboard content, not only navigation.
- Static/demo notices are visible but not overwhelming.
- No horizontal overflow at 390px mobile width.
- Metadata/social preview renders the FolioFrame title and description.
- `robots.txt`, `sitemap.xml` and `manifest.webmanifest` load.
- No `.env`, `.env.local`, secret value or local-only file is exposed.

Recommended viewport checks:

- Desktop: `1440px`
- Tablet: `768px`
- Mobile: `390px`

## Rollback Notes

If deployment fails or buyer-facing QA finds a blocking issue:

1. Roll back to the previous successful deployment in the hosting platform.
2. Confirm the previous deployment still loads `/`, `/signature-launch`, `/pricing` and `/app`.
3. Keep the failed deployment logs for review.
4. Fix in a new branch; do not hot-edit production assets or secrets.
5. Rerun:

```bash
npm run prisma:generate
npm run lint
npm run typecheck
npm run build
```

6. Redeploy only after the build and route checks pass.

## Final Deploy Recommendation

Recommended status: ready to deploy as a production static demo and buyer-facing service website.

Do not deploy or describe FolioFrame as a live SaaS, live billing product, customer database, support desk, monitoring product or automated fulfilment platform until production auth, backend, secure credential handling, integrations, legal/privacy review and operating processes are completed in a separate approved phase.
