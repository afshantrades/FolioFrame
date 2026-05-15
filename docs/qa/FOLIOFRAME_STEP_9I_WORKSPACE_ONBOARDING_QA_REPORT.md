# FolioFrame Step 9I Workspace Onboarding QA Report

Status: workspace onboarding foundation added.

## Workspace Bootstrap Service

Added server-only workspace bootstrap utilities for:

- creating a workspace for the current signed-in user
- creating a fictional demo workspace
- ensuring a workspace exists
- creating default fictional products and tiers
- creating owner action audit entries
- creating workspace audit logs

The service requires Clerk auth and database configuration before creating records.

## Workspace Setup Route

Added:

```text
/app/workspace-setup
```

Expected behavior:

- Clerk disabled: static/demo guidance.
- Clerk configured but unauthenticated: sign-in CTA.
- Signed in without workspace: create fictional demo workspace action.
- Workspace exists: workspace summary and dashboard link.

## Server Action

Added a server action that:

- checks current Clerk/database/workspace state through server-side helpers
- prevents duplicate workspace creation when membership already exists
- creates only fictional development records
- writes audit logs
- redirects safely after completion

No client-provided workspace id is trusted.

## Portal Data Source Behavior

The portal adapter continues to support:

- `static-demo`
- `auth-required`
- `workspace-required`
- `database`

Database snapshots now include:

- workspace
- products
- product tiers
- audit logs
- membership role/status
- signed-in user detected boolean
- workspace membership found boolean
- owner actions from audit metadata when available

## Developer Script

Added:

```bash
npm run db:assign-demo-owner
```

The script exits safely when `DEV_OWNER_EMAIL` or a non-placeholder `ADMIN_EMAIL` is missing. It does not print secrets.

## Safety Status

- No Stripe integration added.
- No Resend integration added.
- No webhooks added.
- No production credentials added.
- No `.env` or `.env.local` committed.
- No real customer, buyer, order or payment data added.
- No public backend form handling added.
- No logo files changed.
- No final visuals added.

## Test Coverage

Added tests for:

- workspace bootstrap eligibility and duplicate prevention state
- demo owner assignment email guard
- existing portal adapter auth/workspace-required branches

Full Clerk sign-in and WorkspaceMember integration testing still requires real Clerk development keys in ignored `.env.local`.
