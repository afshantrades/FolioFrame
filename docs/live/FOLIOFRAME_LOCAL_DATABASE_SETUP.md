# FolioFrame Local Database Setup

Status: local development guide only. No database migration was run in Step 9C.

## Before You Start

FolioFrame now has a Prisma/Postgres foundation, but it does not require a database for static builds. Only configure a local database when you are ready to test persisted workspace records.

Still not connected:

- Stripe
- Resend
- Webhooks
- Public application form handling
- Production credentials

## 1. Create A Local Postgres Database

Use your preferred local Postgres setup. Example database name:

```bash
createdb folioframe_dev
```

If you use a GUI or managed local Postgres app, create an empty database named `folioframe_dev`.

## 2. Create A Local Environment File

Create a local `.env` from `.env.example` and replace placeholder values with development-only values.

Do not commit `.env`.

Required for local database work:

```bash
DATABASE_URL="postgresql://local_user:local_password@localhost:5432/folioframe_dev"
```

Optional for local auth testing:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_development_key"
CLERK_SECRET_KEY="sk_test_your_development_key"
```

## 3. Generate Prisma Client

```bash
npm run prisma:generate
```

## 4. Run The Initial Migration

Only run this after `DATABASE_URL` points to a local/development database:

```bash
npx prisma migrate dev --name init_database_auth_foundation
```

Do not point this command at a production database during local development.

## 5. Run The Demo Seed

The seed creates fictional data only:

- `demo-owner@example.com`
- Demo FolioFrame workspace
- Demo Digital Studio client
- Two demo products
- Three demo product tiers
- Demo audit logs

Run:

```bash
npm run db:seed
```

The seed script skips itself when `DATABASE_URL` is missing or still uses placeholder values.

## 6. Reset The Development Database

For local development only:

```bash
npx prisma migrate reset
```

This can delete local development data. Do not run it against production.

## Safety Reminders

- Do not commit `.env`.
- Do not add real customer data to development seed files.
- Do not add Stripe, email, webhook or production integration credentials yet.
- Keep workspace isolation checks server-side.
- Run DeliveryProof only after real production routes are separately approved.

