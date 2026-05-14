# FolioFrame Live Build Roadmap

Status: planning only. This roadmap does not implement packages, schemas, credentials, auth, webhooks, email sending or live integrations.

## Phase 1: Database/Auth Foundation

Goal: establish a protected live application foundation without touching checkout or email integrations.

Step 9B status: foundation implemented. Prisma, Prisma Client and Clerk packages are installed; the initial schema, server-only database helper, Clerk-aware middleware, auth helpers, workspace role helpers, `.env.example` and setup docs now exist. No migration has been run and no live database/auth credentials are committed.

Recommended work:

- Install Prisma, Prisma client and Clerk packages.
- Add a Prisma schema for foundational records.
- Add a local development database connection through documented environment variables.
- Add a server-only Prisma client helper.
- Add Clerk provider, middleware and protected portal route handling.
- Create initial workspace membership checks.
- Add development-only seed data for one workspace if needed.
- Keep public routes static and accessible.

Exit criteria:

- Lint, typecheck and build pass.
- Protected portal routes require a signed-in user.
- Workspace access is checked server-side.
- No live checkout, webhook or email provider is connected.

## Phase 2: Workspace and Module Persistence

Goal: move core portal concepts from static demo data toward workspace-scoped persisted records.

Recommended work:

- Add workspace, client, product and product tier management records.
- Add read-only workspace dashboard backed by database records.
- Add owner actions, handover items and module status records.
- Keep demo notices for any non-live module area.
- Add audit logging for workspace/member changes.

Exit criteria:

- Portal views can read persisted workspace records.
- Static demo data remains clearly separated from live workspace records.
- Workspace isolation checks are covered in route utilities.

## Phase 3: EntitlementFrame Live

Goal: create the first live access lifecycle model before external event ingestion.

Recommended work:

- Add buyer, order, entitlement and entitlement event records.
- Add manual entitlement creation and state changes for approved operators.
- Add access lifecycle state definitions.
- Add owner-approved exception route states.
- Add audit logging for entitlement changes.

Exit criteria:

- Operators can inspect mapped entitlement rules.
- Entitlement state changes create `EntitlementEvent` and `AuditLog` records.
- No automatic Stripe webhook updates yet.

## Phase 4: Stripe Webhook Ingestion

Goal: safely ingest payment events only after entitlement persistence exists.

Recommended work:

- Add Stripe package.
- Add webhook route handler.
- Verify Stripe signatures.
- Store `WebhookEvent` records before processing.
- Add idempotency by external event id.
- Map approved events into `Order`, `Entitlement` and `EntitlementEvent` records.
- Add failed-event review states.

Exit criteria:

- Test webhook events can be processed in development/staging.
- Duplicate webhook events do not duplicate orders or entitlements.
- Failed events are visible for review.

## Phase 5: AccessHub Live Forms

Goal: turn AccessHub from static preview into live buyer support/recovery intake.

Recommended work:

- Add workspace-scoped AccessHub request form route.
- Add validation and rate limiting.
- Store submitted requests in `AccessHubRequest`.
- Match requests to buyers only when rules allow.
- Route unresolved requests to `AccessDeskIssue`.
- Add owner-approved resolution workflows.

Exit criteria:

- Requests are persisted with clear status.
- Private access is never resent automatically without approved rules.
- Operators can review and resolve requests.

## Phase 6: Email Sending

Goal: add controlled transactional/system email sending.

Recommended work:

- Add Resend package.
- Add approved message templates.
- Add delivery email records.
- Send transactional messages only from server-side approved actions.
- Store provider message ids and send statuses.
- Add failure handling and owner review states.

Exit criteria:

- Transactional email can be sent in staging.
- Send attempts are recorded.
- Failed sends are visible for follow-up.

## Phase 7: DeliveryProof and ProofMetrics

Goal: persist QA and reporting records from real workspace activity.

Recommended work:

- Add DeliveryProof test records.
- Add evidence fields and sanitized proof notes.
- Add ProofMetrics snapshots derived from operational records.
- Add owner action register updates from QA outcomes.
- Add handover packet generation from database-backed sections.

Exit criteria:

- DeliveryProof records support pass/fail evidence and review notes.
- ProofMetrics reports are generated from stored operational data.
- Handover records reflect current workspace state.

## Phase 8: Deployment and Security Hardening

Goal: prepare a production-ready live service-led SaaS deployment.

Recommended work:

- Configure Vercel environments.
- Configure managed Postgres production database.
- Add Sentry.
- Add security headers and route rate limits.
- Add backup/export/deletion operational procedures.
- Review workspace isolation.
- Review logs for sensitive data exposure.
- Complete privacy/legal review.
- Run production DeliveryProof test on the real route before launch.

Exit criteria:

- Production build passes.
- Environment variables are configured outside the repository.
- Security, privacy and legal launch checks are complete.
- Owner approves launch readiness.
