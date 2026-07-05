# FolioFrame Deployment Transition Plan

## Purpose

This plan describes how a buyer can transition FolioFrame from the current repository state to a production static demo deployment.

## Current Deployment Position

Recommended deployment state:

- Static service website.
- Static portal/demo surface.
- Approved FolioFrame brand assets.
- Static/demo boundary messaging preserved.

Current branch:

- `folioframe/deploy-production-static-demo`

Current source baseline commit:

- `8e6f830 Add FolioFrame production static demo deployment checklist`

## Deployment Commands

Use:

```bash
npm ci
npm run prisma:generate
npm run lint
npm run typecheck
npm run build
```

Expected build result:

- Production build passes.
- `63/63` static pages generated.

## Environment

Required for static deployment:

```bash
NEXT_PUBLIC_APP_URL="https://your-production-domain.example"
```

Do not configure production secrets for this phase.

## Forbidden Static-Phase Secrets

Do not add:

- Production `DATABASE_URL`
- Production Clerk secrets
- Stripe secrets
- Resend secrets
- Zapier or Make webhook URLs
- MailerLite or ConvertKit API keys
- Airtable API keys
- Vimeo access tokens
- Real customer or support credentials

## Transition Steps

1. Confirm branch and commit.
2. Set `NEXT_PUBLIC_APP_URL`.
3. Run the verification commands.
4. Deploy to the chosen static-capable host.
5. Verify `/`, `/signature-launch`, `/pricing` and `/app`.
6. Confirm static/demo language remains visible.
7. Confirm no live integration settings are exposed.
8. Capture post-deploy screenshots.

## Rollback

If post-deploy QA fails:

1. Roll back to the previous known-good deployment.
2. Keep deployment logs.
3. Fix in a branch.
4. Rerun all verification commands.
5. Redeploy after QA passes.

## Future Live Phase

Live SaaS work should be separate and approved.

It should cover:

- Production auth.
- Database isolation.
- Payment webhooks.
- Email sending.
- Support request handling.
- Monitoring.
- Legal/privacy review.
- Security review.
