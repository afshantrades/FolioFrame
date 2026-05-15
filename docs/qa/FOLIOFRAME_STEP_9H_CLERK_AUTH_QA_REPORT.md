# FolioFrame Step 9H Clerk Auth QA Report

Status: Clerk auth routing foundation added with safe disabled-dev fallback.

## Auth Mode Result

The new auth mode helper reports one of two modes:

- `disabled-dev`: Clerk keys are missing or placeholder values.
- `clerk`: Clerk publishable and secret keys are present and not placeholders.

No key values are displayed.

## Clerk Configured Status

In the current local placeholder environment, Clerk remains not configured. The app still builds and the internal portal remains available as a static/demo preview.

When real Clerk development keys are added to ignored `.env.local`, internal `/app` routes are prepared for Clerk protection.

## Database Configured Status

Local Postgres remains available from Step 9G. Database verification should continue to show:

- database configured
- can connect
- seeded workspace found
- fictional demo workspace counts

## Protected Route Behavior

- Public marketing routes remain public.
- `/sign-in` remains public.
- `/sign-up` remains public.
- `/app` routes are protected only when Clerk is configured.
- When Clerk is not configured, `/app` routes stay available with clear disabled-dev/static-demo messaging.

## Sign-In and Sign-Up Route Behavior

- If Clerk is configured, `/sign-in` and `/sign-up` render Clerk components.
- If Clerk is not configured, both routes render a FolioFrame setup page with local setup steps.
- The fallback pages remind the owner not to commit `.env.local`.

## Portal Data Source Behavior

The portal data adapter now supports:

- `static-demo`
- `auth-required`
- `workspace-required`
- `database`

Expected state in the current placeholder Clerk environment:

```text
source: static-demo
auth mode: disabled-dev
database configured: yes when local Postgres is running
```

## Workspace Membership Helper Status

Added server-side helpers for:

- current Clerk identity lookup
- FolioFrame user record mapping
- current workspace context
- required workspace context
- required workspace role

Workspace access is checked server-side. Client-provided workspace ids are not trusted.

## Tests Added

Added tests for:

- auth mode helper with placeholder Clerk values
- auth mode helper with configured-looking Clerk values
- portal data adapter static-demo fallback
- portal data adapter auth-required branch
- portal data adapter workspace-required branch

The workspace role helper depends on server-only Clerk/database request context, so direct role enforcement is left for an integration test after Clerk development keys and a signed-in test user are configured.

## Safety Status

- No Stripe integration added.
- No Resend integration added.
- No webhooks added.
- No production credentials added.
- No `.env` committed.
- `.env.local` remains ignored.
- No real customer data added.
- No backend public form handling added.
- No logo files changed.
- No final brand visuals added.
