# FolioFrame Database/Auth Foundation

Status: foundation implemented, not connected to a live production database.

## Added In Step 9B

- Prisma package.
- Prisma Client package.
- Clerk package.
- Initial Prisma schema at `prisma/schema.prisma`.
- Prisma config at `prisma.config.ts`.
- Server-only Prisma helper at `lib/db.ts`.
- Clerk-aware app layout and middleware.
- Server-side auth and workspace membership helpers.
- `.env.example` with placeholder values only.

The Prisma schema declares a PostgreSQL datasource. `DATABASE_URL` is read through `prisma.config.ts`, matching the Prisma 7 configuration style.

## Initial Models

The initial schema includes:

- `User`
- `Workspace`
- `WorkspaceMember`
- `Client`
- `Product`
- `ProductTier`
- `AuditLog`

The schema intentionally does not include orders, Stripe events, webhooks, delivery emails, AccessHub requests, DeliveryProof tests or ProofMetrics records yet. Those belong to later approved phases.

## Current Runtime Boundary

The static public website remains public. The internal `/app` routes are prepared for Clerk protection but remain locally viewable when Clerk credentials are not configured. This keeps the build safe in environments without production credentials.

## Database Boundary

No migration was run in Step 9B. Before applying migrations, choose and configure a development Postgres database outside the repository.

Planned migration command after approval and database setup:

```bash
npx prisma migrate dev --name init_database_auth_foundation
```

## Security Boundary

- No `.env` file was created.
- No real credentials were committed.
- `AuditLog` exists for future sensitive action records.
- Role-based workspace helpers are prepared.
- Public routes do not expose workspace data.
