# FolioFrame Clerk Development Setup

Status: planning and local development guide only. Do not add production credentials to the repository.

## Purpose

FolioFrame uses Clerk as the recommended auth provider for the live service-led SaaS phase. Clerk should protect internal `/app` routes when usable development keys are configured, while the static/demo portal remains viewable when Clerk keys are missing or still placeholders.

## Create a Clerk Development Application

1. Create a Clerk development application in the Clerk dashboard.
2. Use development keys only for local setup.
3. Keep the FolioFrame public marketing routes outside auth.
4. Use `/sign-in` and `/sign-up` as the local auth routes.

## Local Environment Variables

Add values like these to the ignored local file only:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_development_value"
CLERK_SECRET_KEY="sk_test_your_development_value"
```

Do not commit `.env.local`.

Do not place production keys in:

- `.env.local`
- `.env.example`
- docs
- screenshots
- source files
- issue comments

## Restart the Dev Server

After editing `.env.local`, restart the local dev server:

```bash
npm run dev
```

Then open:

```text
/sign-in
/sign-up
/app/live-foundation
```

Expected local result after Clerk is configured:

- `/sign-in` renders the Clerk sign-in screen.
- `/sign-up` renders the Clerk sign-up screen.
- `/app` routes are protected by Clerk middleware.
- `/app/live-foundation` reports auth mode `clerk`.

## Connect a Signed-In User to a Workspace

Clerk identity alone is not enough to view workspace records.

After signing in, FolioFrame maps the Clerk user id and email to a FolioFrame `User` record. The user must also have an active `WorkspaceMember` record before workspace data can be shown.

Development options:

- Update the seed script for a known Clerk test email.
- Add a `WorkspaceMember` row manually in Prisma Studio.
- Build an owner-approved internal admin flow in a later phase.

Do not auto-create client, product, order, buyer or payment records from auth sign-in.

## Safety Boundaries

- `.env.local` must remain ignored.
- No production credentials belong in Git.
- Stripe is not connected.
- Resend is not connected.
- Webhooks are not connected.
- Public form handling is not connected.
- Final logo and production brand visuals remain pending.
