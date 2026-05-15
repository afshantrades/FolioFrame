# FolioFrame Local Postgres Verification

Status: local Postgres is running and the first database/auth foundation migration has been applied to the local development database.

## Docker Availability

- Docker CLI: available.
- Docker Compose CLI: available (`v5.1.3`).
- Docker daemon: running through Docker Desktop when checked with elevated local Docker access.

The first non-elevated Docker check was blocked by socket permissions, but the elevated daemon check succeeded and reported Docker Desktop as the running server.

## Local Environment

- `.env.local` was created from `.env.local.example`.
- `.env.local` contains local development placeholder values only.
- `.env.local` is ignored by Git through the existing `.env.*` ignore rule.
- No `.env` file was created.
- No production credentials were added.

## Local Postgres Start Status

Local Postgres was started with:

```bash
npm run db:dev:up
```

Container status:

```text
folioframe-postgres Up (healthy) 0.0.0.0:5432->5432/tcp
```

This database is local development only and must not be treated as production configuration.

## Migration Status

Migration was run with:

```bash
npm run db:migrate
```

Result:

```text
Applying migration `20260515001704_init_database_auth_foundation`
Your database is now in sync with your schema.
```

Created migration:

```text
prisma/migrations/20260515001704_init_database_auth_foundation/migration.sql
```

## Prisma Generate Status

Prisma Client generation completed with:

```bash
npm run prisma:generate
```

Result:

```text
Generated Prisma Client (v7.8.0)
```

## Seed Status

Seed was run with:

```bash
npm run db:seed
```

Result:

```text
FolioFrame demo workspace seed completed.
```

The seed data is fictional only:

- `demo-owner@example.com`
- Demo FolioFrame workspace
- Demo client
- Demo products and tiers
- Demo audit logs

No real buyer, customer, payment, support or platform data was added.

## db:verify Result

Verification was run with:

```bash
npm run db:verify
```

Result:

```text
DATABASE_URL status: present
Connection summary: provider=postgresql host=localhost port=5432 database=folioframe_dev
Connection: ok
Users: 1
Workspaces: 1
Products: 2
Product tiers: 3
Audit logs: 2
Seeded workspace found: yes
```

## Current Counts

| Metric | Count |
| --- | ---: |
| Users | 1 |
| Workspaces | 1 |
| Products | 2 |
| Product tiers | 3 |
| Audit logs | 2 |

## /app/live-foundation Status

The local Next.js dev server rendered `/app/live-foundation` successfully.

Confirmed on the page:

- Database configured: yes
- Can connect: yes
- Seeded workspace found: yes
- Migration likely applied: yes
- Workspaces: 1
- Products: 2
- Product tiers: 3
- Audit logs: 2
- Stripe: not connected
- Resend: not connected
- Webhooks: not connected

Portal data source still displays `static-demo` because Clerk keys remain placeholder values. This is expected for this step: database-backed records are verified, while auth-protected workspace routing remains a later phase.

Screenshot:

```text
docs/qa/screenshots/live-foundation-step-9g/app-live-foundation-database-connected.png
```

## Remaining Blocked

- Clerk development app configuration with real local development keys.
- Protected workspace route wiring.
- Stripe checkout and webhook ingestion.
- Resend transactional email sending.
- Public form/backend handling.
- Production credential handling.
- Legal/privacy review before live product launch.

Do not commit `.env`, `.env.local` or real credentials.
