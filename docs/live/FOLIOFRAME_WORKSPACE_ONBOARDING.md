# FolioFrame Workspace Onboarding

Status: live foundation planning and local development behavior.

## Purpose

Workspace onboarding is the first bridge from the static/demo portal to a database-backed FolioFrame workspace. It creates only safe local development records:

- FolioFrame `User`
- `Workspace`
- `WorkspaceMember` with `OWNER` role
- fictional demo client
- fictional demo products
- fictional demo product tiers
- setup audit logs
- owner action audit entries

It does not create buyers, orders, payments, Stripe records, email records, webhook events or real customer data.

## Clerk Identity to FolioFrame User

Clerk handles sign-in. FolioFrame stores its own `User` record for workspace access.

When Clerk is configured and a user is signed in, FolioFrame maps:

- Clerk user id to `User.clerkUserId`
- Clerk primary email to `User.email`
- Clerk display name to `User.name` when available

If Clerk is not configured, onboarding is disabled and the portal stays in static/demo mode.

## WorkspaceMember Access

A signed-in user cannot see database-backed workspace records until an active `WorkspaceMember` exists.

Roles:

- `OWNER`: owns setup and approval decisions.
- `ADMIN`: manages workspace configuration.
- `OPERATOR`: works inside delivery and support workflows.
- `VIEWER`: read-only workspace access.

All workspace reads must be server-side membership checked. Client-provided workspace ids are not trusted.

## Workspace Setup Route

Route:

```text
/app/workspace-setup
```

Behavior:

- Clerk not configured: shows auth-disabled guidance and keeps static/demo fallback.
- Clerk configured but no signed-in user: shows sign-in CTA.
- Signed in but no workspace: shows a create demo workspace action.
- Workspace exists: shows workspace summary and links to the premium dashboard.

## Create a Demo Workspace

After local Clerk dev keys are configured and the user signs in:

1. Open `/app/workspace-setup`.
2. Select `Create demo workspace`.
3. FolioFrame creates fictional local records only.
4. Open `/app/premium-dashboard`.
5. Confirm the portal data source can become database-backed after membership exists.

## Development Owner Assignment

If a user signs in but needs to be assigned to the seeded demo workspace, use:

```bash
npm run db:assign-demo-owner
```

This script requires:

- ignored local `DATABASE_URL`
- `DEV_OWNER_EMAIL` or a non-placeholder `ADMIN_EMAIL`
- an existing FolioFrame `User` record for that email
- the seeded demo workspace

It writes an audit log and does not print secrets.

## Boundaries

Still not connected:

- Stripe
- Resend
- webhooks
- public backend form handling
- live buyer records
- real customer data
- production credential handling

Keep `.env.local` ignored and never commit credentials.
