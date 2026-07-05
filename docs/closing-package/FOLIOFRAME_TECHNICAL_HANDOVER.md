# FolioFrame Technical Handover

## Technical Summary

FolioFrame is built as a Next.js App Router project with TypeScript and Tailwind CSS.

The current deployment branch is:

- `folioframe/deploy-production-static-demo`

The current source baseline commit is:

- `8e6f830 Add FolioFrame production static demo deployment checklist`

## Package Manager

Use npm.

Package manager declared in `package.json`:

```text
npm@11.12.1
```

## Key Commands

```bash
npm ci
npm run prisma:generate
npm run lint
npm run typecheck
npm run build
```

Development command:

```bash
npm run dev
```

## Build Status

Latest verified production build on 2026-07-04:

- `npm run prisma:generate`: passed
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build`: passed
- Static pages generated: `63/63`

## Route Families

Public website:

- `/`
- `/signature-launch`
- `/signature-launch-system`
- `/pricing`
- `/modules`
- module detail routes
- legal/support starter routes

Static portal/demo:

- `/app`
- `/app/premium-dashboard`
- `/app/implementation-docs`
- module workspace routes
- live foundation and workspace setup foundation routes

Auth foundation:

- `/sign-in`
- `/sign-up`

## Environment Variables

For production static demo deployment, only the public app URL is required:

```bash
NEXT_PUBLIC_APP_URL="https://your-production-domain.example"
```

Do not add live production secrets during the static demo phase.

## Static/Demo Runtime Boundary

The current site should remain honest that:

- There is no live billing.
- There is no production auth operation.
- There is no real customer data.
- There is no live fulfilment automation.
- There is no live monitoring.
- There are no real support tickets.

## Live Product Foundation

The repository includes planning and foundation work for future live operation:

- Prisma schema foundation.
- Local Postgres development setup.
- Clerk auth foundation.
- Workspace/service helpers.
- Static fallback behavior.

These are not the same as production SaaS readiness.

## Deployment Notes

Relevant deployment documents:

- `docs/deployment/FOLIOFRAME_STATIC_BUYER_DEMO_DEPLOYMENT_NOTES.md`
- `docs/deployment/FOLIOFRAME_PRODUCTION_STATIC_DEMO_DEPLOYMENT_CHECKLIST.md`

## Handover Recommendation

Deploy as a static service website and static demo surface first.

Scope live SaaS functionality separately, with secure credentials, production auth, database isolation, payment webhooks, email sending, monitoring and legal/privacy review.
