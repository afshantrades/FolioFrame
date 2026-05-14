# FolioFrame Step 9E Database Verification

Status: verification tooling added. No local migration or seed was run in this environment because `DATABASE_URL` was not present.

## Purpose

Step 9E adds safe local database verification for the FolioFrame live foundation. The tooling is designed to skip cleanly when no database is configured and to block production-like database URLs before migration or seed work.

## Create A Local Database

Install and start local Postgres, then create a development database:

```bash
createdb folioframe_dev
```

## Set DATABASE_URL Locally Only

Copy `.env.example` to a local `.env` file and update only local development values:

```bash
DATABASE_URL="postgresql://local_user:local_password@localhost:5432/folioframe_dev"
```

Do not commit `.env`.

## Run Prisma Migration

Only after `DATABASE_URL` points to a safe local/development database:

```bash
npx prisma migrate dev --name init_database_auth_foundation
```

The safety helper blocks production-like URLs in verification tooling, but you should still inspect your local environment before running migrations.

## Run Demo Seed

```bash
npm run db:seed
```

The seed creates fictional demo data only.

## Run Verification

```bash
npm run db:verify
```

Expected outcomes:

- If `DATABASE_URL` is missing, verification exits `0` and reports skipped status.
- If `DATABASE_URL` appears production-like, verification is blocked.
- If a local database is configured, verification checks connection, model counts and seeded workspace presence.

## Inspect Live Foundation Page

Run the app locally:

```bash
npm run dev
```

Then open:

```text
/app/live-foundation
```

The page shows safe booleans and counts only. It does not expose `DATABASE_URL`.

## Static Fallback Still Active

Static fallback is active when:

- Auth is not configured.
- Database is not configured.
- Database connection fails.
- No workspace is available for the current user.

This is expected until local Postgres, migration, seed data and Clerk development auth are configured.

## If Connection Fails

Check:

- Postgres is running.
- The local database exists.
- The local `.env` file is present but not staged.
- `DATABASE_URL` points to localhost, Docker local host or an explicit development/staging database.
- Prisma migration has been run.
- Seed data has been run if you expect the demo workspace.

## Still Not Connected

- Stripe
- Resend
- Webhooks
- Public backend form handling
- Production credentials

