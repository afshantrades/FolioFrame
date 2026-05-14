# FolioFrame Prisma Setup

Status: setup documentation only. No database migration was run in Step 9B.

## Files

- Prisma schema: `prisma/schema.prisma`
- Prisma config: `prisma.config.ts`
- Prisma client helper: `lib/db.ts`
- Environment template: `.env.example`

Prisma 7 reads the datasource URL from `prisma.config.ts`; the schema declares the PostgreSQL datasource and the config maps it to `DATABASE_URL`.

## Local Setup Later

After database setup is approved:

1. Create a local Postgres database.
2. Create a local `.env` file from `.env.example`.
3. Replace placeholder values with local development values.
4. Run:

```bash
npx prisma format
npx prisma generate
npx prisma migrate dev --name init_database_auth_foundation
```

Do not commit `.env`.

## Step 9B Commands

Step 9B runs:

```bash
npx prisma format
npx prisma generate
```

Migration is intentionally deferred until a database is available and approved.

## Current Schema Scope

The schema covers the foundation only:

- Users
- Workspaces
- Workspace members
- Clients
- Products
- Product tiers
- Audit logs

The schema does not yet include Stripe, Resend, webhooks, buyer records, orders, entitlements, AccessHub requests, DeliveryProof tests or ProofMetrics.
