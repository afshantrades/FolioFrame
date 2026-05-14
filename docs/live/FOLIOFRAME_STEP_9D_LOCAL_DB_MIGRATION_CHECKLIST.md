# FolioFrame Step 9D Local DB Migration Checklist

Status: local development checklist only. Do not commit local environment files.

1. Install and start local Postgres.
2. Create a local database:

```bash
createdb folioframe_dev
```

3. Copy `.env.example` to a local `.env` file.
4. Add a local development `DATABASE_URL` to `.env` only.
5. Confirm `.env` is not staged and is ignored by git.
6. Run Prisma generate:

```bash
npm run prisma:generate
```

7. Run the initial migration against the local development database:

```bash
npx prisma migrate dev --name init_database_auth_foundation
```

8. Run the fictional demo seed:

```bash
npm run db:seed
```

9. Start the local app:

```bash
npm run dev
```

10. Check `/app/live-foundation`.
11. Confirm portal data source and warnings.
12. Keep Stripe, Resend, webhooks and production credentials disconnected.

Reminder: never commit `.env`.

