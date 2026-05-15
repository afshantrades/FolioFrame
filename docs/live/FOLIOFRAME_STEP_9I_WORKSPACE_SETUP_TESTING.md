# FolioFrame Step 9I Workspace Setup Testing

Status: local development test guide.

## Preflight

Confirm local Postgres and Prisma are ready:

```bash
npm run db:dev:up
npm run db:verify
```

Confirm `.env.local` is ignored:

```bash
git status --ignored --short .env.local
```

Expected:

```text
!! .env.local
```

## Test With Clerk Disabled

Use placeholder Clerk values or remove local Clerk values from ignored `.env.local`.

Open:

```text
/app/workspace-setup
/app/live-foundation
/app/premium-dashboard
```

Expected:

- auth mode is `disabled-dev`
- portal source is `static-demo`
- workspace setup explains Clerk dev setup
- no form creates real records
- database verification may still show local Postgres readiness

## Test With Clerk Configured

Add Clerk development keys to ignored `.env.local`, then restart:

```bash
npm run dev
```

Open:

```text
/sign-in
/app/workspace-setup
```

Expected:

- `/sign-in` shows Clerk sign-in
- `/app` routes are protected by Clerk middleware
- `/app/workspace-setup` can show setup guidance and a sign-in CTA

## Create a Demo Workspace

After signing in:

1. Open `/app/workspace-setup`.
2. Use `Create demo workspace` if no workspace exists.
3. Confirm redirect to `/app/premium-dashboard`.
4. Confirm dashboard shows database-backed workspace counts.
5. Confirm `/app/live-foundation` reports signed-in user and workspace membership booleans.

## Assign a Development Owner

If using the seeded demo workspace instead of creating a new one:

1. Sign in once so FolioFrame can create a `User` record.
2. Set `DEV_OWNER_EMAIL` in ignored `.env.local`.
3. Run:

```bash
npm run db:assign-demo-owner
```

If the user or workspace is missing, the script exits safely with guidance.

## Do Not Test Yet

These are intentionally not part of Step 9I:

- Stripe checkout
- Stripe webhooks
- Resend email sending
- public backend form handling
- real buyer/customer records
- production credentials
- final logo or final brand visuals
