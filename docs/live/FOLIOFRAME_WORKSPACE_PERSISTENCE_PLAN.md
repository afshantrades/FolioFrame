# FolioFrame Workspace Persistence Plan

Status: Step 9D foundation implemented. This is still a safe hybrid of static demo fallback and prepared database-backed workspace reads.

## Current Status

FolioFrame now has:

- Prisma/Postgres schema foundation.
- Clerk-aware auth foundation.
- Database/auth availability helpers.
- Workspace, product and audit log service utilities.
- Fictional demo workspace seed script.
- Portal data adapter.
- `/app/live-foundation` status page.

The app still builds without real auth or database environment variables.

## Portal Data Adapter

`lib/live/portalDataAdapter.ts` exports `getPortalWorkspaceSnapshot()`.

The adapter:

- Checks whether auth and database configuration look usable.
- Returns static demo content when auth or database is missing.
- Dynamically imports server-only database services only when auth and database are configured.
- Attempts to load workspace, product, product tier and audit log records.
- Falls back to static demo content if database loading fails.
- Returns a normalized snapshot for portal components.
- Never exposes secret values.

## What Is Still Fallback

The following remain static/demo fallback content:

- Buyer journey steps.
- Owner action queue.
- Most module-specific portal workspaces.
- DeliveryProof records.
- ProofMetrics records.
- AccessHub request records.
- Entitlement records.

This is intentional. Step 9D prepares the adapter pattern without rewriting every portal route.

## Gradual Replacement Plan

1. Configure local Postgres and run the initial migration.
2. Configure Clerk development app.
3. Run the fictional demo seed.
4. Confirm `/app/live-foundation` reports database/auth readiness.
5. Replace `/app/product-matrix` with database-backed products and tiers.
6. Replace `/app` and `/app/premium-dashboard` static module summaries with workspace records.
7. Add live EntitlementFrame models in a later approved phase.
8. Add AccessHub, DeliveryProof and ProofMetrics persistence in later phases.

## Next Production Steps

- Create local development database.
- Run Prisma migration locally.
- Run demo seed locally.
- Wire protected workspace route selection.
- Add workspace switcher after membership records are verified.
- Add module persistence one route at a time.

## Security Notes

- No `.env` file should be committed.
- Do not expose secret values in UI.
- Database-backed route reads must be workspace-scoped.
- Client-provided workspace IDs must be checked server-side against membership.
- Static fallback should remain obvious until live records fully replace demo records.
- Stripe, Resend and webhooks remain disconnected until later approved phases.

