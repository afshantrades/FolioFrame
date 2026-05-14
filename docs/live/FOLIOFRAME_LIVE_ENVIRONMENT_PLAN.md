# FolioFrame Live Environment Plan

Status: planning only. Do not create `.env` files in this step. Values below are placeholder variable names only and are not credentials.

## Environment Rules

- Never commit `.env` files.
- Never commit real API keys, database URLs, webhook secrets or tokens.
- Configure production values only inside the deployment provider or secret manager.
- Keep separate development, preview/staging and production values.
- Rotate secrets if a value is ever exposed.

## Planned Variables

| Variable | Purpose | Required for | Notes |
| --- | --- | --- | --- |
| `DATABASE_URL` | Postgres connection string used by Prisma. | Database/auth foundation | Use a development database locally and a managed production database later. Never commit the value. |
| `AUTH_SECRET` | Secret used by auth/session infrastructure if needed. | Auth foundation | Clerk may not require this in the same way Auth.js does, but keep the slot documented for future auth/session signing needs. |
| `NEXT_PUBLIC_APP_URL` | Public base URL for links, callbacks and emails. | Auth, email, deployment | Public value, but still environment-specific. |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key. | Later Stripe phase | Placeholder only. Do not add until Stripe phase is approved. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature secret. | Later Stripe phase | Placeholder only. Required before processing Stripe events. |
| `RESEND_API_KEY` | Server-side Resend API key. | Later email phase | Placeholder only. Use restricted provider access where possible. |
| `SENTRY_DSN` | Sentry project DSN for error reporting. | Later hardening phase | Public/client DSNs are not equivalent to private secrets, but configure through env per environment. |
| `ADMIN_EMAIL` | Primary internal admin contact. | Admin setup | Use for initial notifications or seeded owner record after approval. |
| `SUPPORT_EMAIL` | Operational support mailbox. | AccessHub and support workflows | Use a controlled mailbox, not a personal inbox, for production support. |

## Provider-Specific Variables To Add Later

Clerk variables should be added during the approved auth implementation step, using the exact provider names required by the Clerk Next.js package at that time. Do not add placeholder values to committed files.

Possible future examples:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- Clerk sign-in/sign-up URL variables if needed

Stripe variables should be added only during the approved checkout/webhook phase.

Resend variables should be added only during the approved transactional email phase.

Sentry variables should be added only during the approved deployment hardening phase.

## Environment Separation

Development:

- Local or hosted development Postgres database.
- Test auth application.
- No live Stripe events.
- No production email sending.

Preview/staging:

- Staging database.
- Staging auth application.
- Stripe test mode only when webhook phase begins.
- Restricted test email domain where possible.

Production:

- Production database.
- Production auth application.
- Production Stripe only after signature checks, idempotency and owner approval.
- Production email only after template and privacy review.

