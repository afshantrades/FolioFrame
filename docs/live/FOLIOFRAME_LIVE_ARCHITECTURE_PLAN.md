# FolioFrame Live Architecture Plan

Status: planning only. No live integrations, credentials, database schema, auth provider, checkout, webhook endpoint, email sending or backend form handling has been implemented in this step.

## Current Project Audit

FolioFrame is currently a static Next.js App Router project using TypeScript, Tailwind CSS and reusable React components.

Current framework:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- ESLint

Current route shape:

- Public marketing and information routes are stored under `app/*/page.tsx`.
- Internal static portal routes are stored under `app/app/*/page.tsx`.
- Implementation document previews use `app/app/implementation-docs/[slug]/page.tsx` with static generation.
- There are no API route handlers in the current app.

Current content structure:

- `content/folioframeModules.ts`
- `content/folioframeOffers.ts`
- `content/folioframeDemoData.ts`
- `content/folioframeHelpers.ts`
- `content/folioframeImplementationDocs.ts`
- `content/folioframeImplementationHelpers.ts`

Current package scripts:

- `npm run dev`: starts Next.js development server.
- `npm run lint`: runs ESLint.
- `npm run typecheck`: runs TypeScript with `--noEmit`.
- `npm run build`: runs the production Next.js build.
- `npm test`: runs Node's built-in test runner.

Current backend/auth/database status:

- No Prisma package is installed.
- No Prisma schema exists.
- No database client exists.
- No API routes exist.
- No auth provider is installed.
- No middleware exists.
- No `.env` files are present.
- No live Stripe, Resend, webhook, customer data or production integration code exists.

## Recommended Stack

Recommended live stack:

- Next.js App Router
- TypeScript
- Prisma
- Postgres
- Clerk for auth
- Stripe Checkout and Stripe webhooks later
- Resend for transactional/system emails later
- Vercel for deployment later
- Sentry for error monitoring later

## Why This Stack

Next.js App Router keeps the existing project direction and supports server components, route handlers, static pages and server-side data access in one framework.

TypeScript is already in place and should remain the default for database models, route handlers, validation and shared UI types.

Prisma plus Postgres gives FolioFrame a durable relational foundation for workspaces, product tiers, buyers, orders, entitlements, support requests, QA records and reporting. The FolioFrame domain is relationship-heavy, so a relational database is a better first fit than document-only storage.

Clerk is the recommended auth provider for the first live product phase. It provides production-grade authentication, sessions, invitations, organization-oriented primitives and optional MFA without requiring FolioFrame to build sensitive auth flows from scratch. FolioFrame should still store its own internal `User`, `Workspace` and `WorkspaceMember` records so workspace roles, module access and audit behavior remain controlled by the application.

Stripe should be introduced after database/auth foundation is stable. Checkout and webhook ingestion should write to `Order`, `EntitlementEvent`, `WebhookEvent` and `AuditLog` records only after signature verification and idempotency checks are in place.

Resend should be introduced after buyer and entitlement data models are stable. It should send transactional/system messages from approved templates only, with delivery events logged where useful.

Vercel is a natural deployment fit for Next.js and supports environment variable management, preview deployments and production deployments. Production database hosting can be Vercel Postgres, Neon, Supabase Postgres or another managed Postgres provider.

Sentry should be added during hardening so production route errors, webhook failures and background processing issues are visible.

## Auth Approach

Recommended provider: Clerk.

Recommended pattern:

- Clerk owns identity, sign-in, sessions, invitations and account security.
- FolioFrame stores internal user records keyed by `clerkUserId`.
- FolioFrame stores workspace membership, role and access rules in its own database.
- Server-side routes check both the Clerk session and FolioFrame workspace membership.
- Admin-only and owner-only actions require explicit role checks.

Recommended roles:

- `owner`: full workspace administration.
- `admin`: operational workspace management.
- `operator`: delivery, support and QA workflows.
- `viewer`: read-only reporting and handover access.

Auth boundaries:

- Do not store passwords in FolioFrame.
- Do not trust client-provided workspace ids without server-side membership checks.
- Keep auth provider ids separate from internal database ids.
- Log sensitive administrative actions to `AuditLog`.

## Database Approach

Recommended database: Postgres managed by a production provider.

Recommended ORM: Prisma.

Initial database priorities:

- Workspaces and workspace members.
- Clients and products.
- Product tiers and access rules.
- Buyers and orders.
- Entitlements and entitlement events.
- Delivery routes and delivery emails.
- AccessHub requests and AccessDesk issues.
- DeliveryProof tests and ProofMetrics.
- Owner actions, handover records and audit logs.
- Integration connection metadata and webhook event storage.

Database implementation rules:

- Use Prisma migrations for schema changes.
- Use generated Prisma types in server-only modules.
- Avoid importing the database client into client components.
- Add indexes for workspace-scoped queries and external event ids.
- Use soft deletion or archival fields for sensitive operational records where appropriate.
- Treat buyer data as private customer data.

## Webhook Approach

Webhooks should be introduced after database/auth foundation and entitlement persistence exist.

Webhook requirements:

- Verify provider signatures before processing.
- Store raw event metadata safely in `WebhookEvent`.
- Use idempotency keys or provider event ids to prevent duplicate processing.
- Process events inside database transactions where possible.
- Record downstream changes in `EntitlementEvent` and `AuditLog`.
- Mark failed events for review instead of silently dropping them.
- Never trust webhook payloads without verification and workspace mapping.

Initial Stripe events later:

- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_failed`
- `refund.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Email Approach

Recommended email provider later: Resend.

Email requirements:

- Use approved templates only.
- Send transactional/system messages only after workspace and entitlement rules are in place.
- Store template ids, message intent and send status in `DeliveryEmail`.
- Never include private access material unless owner-approved rules allow it.
- Keep unsubscribe and marketing-email behavior outside this first transactional scope unless separately approved.

## Deployment Approach

Recommended deployment target later: Vercel.

Recommended deployment sequence:

1. Keep static production build passing.
2. Add database/auth foundation locally with placeholder env documentation only.
3. Add preview deployment environment variables in the host dashboard.
4. Run database migrations against a non-production database first.
5. Add protected routes and workspace checks.
6. Add staging webhook endpoints before production endpoints.
7. Add production monitoring and error reporting.
8. Run a security and privacy review before accepting real buyer data.

## Security Considerations

Core security boundaries:

- No credentials in the repository.
- No `.env` files committed.
- Workspace isolation enforced server-side.
- Role-based access checks on every protected operation.
- Webhook signature verification before event processing.
- Audit logging for sensitive access, entitlement and integration actions.
- Least-privilege API keys for integrations.
- Private buyer data minimized, protected and exportable.
- Production legal/privacy review required before launch.

## Staged Implementation Plan

Stage 1: Database/auth foundation

- Install Prisma, database client and Clerk packages.
- Add Prisma schema and initial migrations.
- Add server-only database client.
- Add Clerk provider and middleware.
- Add user/workspace/member seed or development setup.

Stage 2: Workspace persistence

- Convert static portal demo data into workspace-scoped database records.
- Keep public pages static.
- Add protected internal route guard.

Stage 3: EntitlementFrame live foundation

- Persist products, tiers, buyers, orders, entitlements and events.
- Add manual entitlement event creation before webhooks.

Stage 4: Stripe ingestion

- Add signed webhook route handlers.
- Add event idempotency and audit logging.
- Map checkout events into orders and entitlement events.

Stage 5: AccessHub live forms

- Add workspace-scoped support request intake.
- Add owner-approved routing and review states.

Stage 6: Email sending

- Add Resend transactional emails.
- Store send records and approved message templates.

Stage 7: DeliveryProof and ProofMetrics

- Persist QA tests, evidence notes, owner actions and metric snapshots.

Stage 8: Deployment and hardening

- Add production environment setup, Sentry, rate limits, security headers and privacy/legal review.

