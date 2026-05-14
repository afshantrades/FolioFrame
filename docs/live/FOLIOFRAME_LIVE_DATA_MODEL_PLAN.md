# FolioFrame Live Data Model Plan

Status: planning only. This document proposes the live data model but does not create a Prisma schema, migration or database connection.

## Modeling Principles

- Every operational record should be scoped to a workspace where possible.
- Auth identity and FolioFrame membership should remain separate.
- Buyer records should contain only the data needed for access reliability workflows.
- External provider ids should be stored for reconciliation and idempotency.
- Sensitive operational changes should create audit log entries.
- Static demo records should not be copied into production as if they are real customer data.

## Proposed Entities

| Entity | Purpose | Key fields | Relationships | Privacy/security notes |
| --- | --- | --- | --- | --- |
| `User` | Represents a person who can access FolioFrame. | `id`, `clerkUserId`, `email`, `name`, `status`, `createdAt`, `updatedAt` | Has many `WorkspaceMember` records; creates `AuditLog`, `OwnerAction` and review records. | Do not store passwords. Use provider id for auth lookup. Treat email as personal data. |
| `Workspace` | Represents a client or operating environment in FolioFrame. | `id`, `name`, `slug`, `status`, `plan`, `createdAt`, `updatedAt` | Has many members, clients, products, buyers, requests, tests, metrics and integration connections. | All workspace data must be isolated server-side. Workspace ids from the client must be verified against membership. |
| `WorkspaceMember` | Connects users to workspaces with roles. | `id`, `workspaceId`, `userId`, `role`, `invitedById`, `joinedAt`, `status` | Belongs to `Workspace` and `User`. | Role checks should happen on every protected workspace action. |
| `Client` | Represents an end client when FolioFrame is used by an agency or service operator. | `id`, `workspaceId`, `name`, `status`, `primaryContactName`, `primaryContactEmail`, `notes` | Belongs to `Workspace`; has many products, buyers and handover items. | Contact data is private. Agency workspaces must prevent client data crossover. |
| `Product` | Represents a digital product, course, membership or offer. | `id`, `workspaceId`, `clientId`, `name`, `slug`, `status`, `checkoutUrl`, `supportRoute`, `createdAt` | Belongs to `Workspace` and optional `Client`; has many tiers, delivery routes, orders and tests. | Checkout URLs and support routes may expose operational details; restrict edit access. |
| `ProductTier` | Represents a purchasable access level or path. | `id`, `workspaceId`, `productId`, `name`, `externalPriceId`, `accessRule`, `deliveryPath`, `reviewState`, `sortOrder` | Belongs to `Product`; maps to orders and entitlements. | External price ids should be provider references only, not secret keys. |
| `Buyer` | Represents a buyer or recipient requiring access reliability tracking. | `id`, `workspaceId`, `clientId`, `email`, `name`, `externalCustomerId`, `status`, `createdAt` | Has many orders, entitlements, AccessHub requests and DeliveryProof tests. | Buyer email is personal data. Minimize fields and support deletion/export. |
| `Order` | Represents a checkout or payment event mapped to a buyer and product tier. | `id`, `workspaceId`, `buyerId`, `productId`, `productTierId`, `provider`, `externalOrderId`, `amount`, `currency`, `status`, `purchasedAt` | Belongs to `Buyer`, `Product`, `ProductTier`; may create entitlement events. | Store provider ids for reconciliation. Do not store card data. |
| `Entitlement` | Represents the current access state for a buyer and product/tier. | `id`, `workspaceId`, `buyerId`, `productId`, `productTierId`, `state`, `source`, `startsAt`, `endsAt`, `reviewState` | Belongs to buyer/product/tier; has many entitlement events. | Entitlement changes are sensitive and should be audited. |
| `EntitlementEvent` | Records each change or exception in the access lifecycle. | `id`, `workspaceId`, `entitlementId`, `eventType`, `source`, `reason`, `metadata`, `createdById`, `createdAt` | Belongs to `Entitlement`; may link to `Order`, `WebhookEvent` or `AccessHubRequest`. | Preserve event history for recovery. Avoid storing unnecessary private payload data. |
| `DeliveryRoute` | Defines how access or assets are delivered for a product/tier. | `id`, `workspaceId`, `productId`, `productTierId`, `routeType`, `destination`, `fallbackRoute`, `ownerApproved`, `status` | Belongs to product/tier; used by DeliveryProof and DeliveryEmail. | Destination values may reveal private asset locations; restrict visibility. |
| `DeliveryEmail` | Tracks transactional/system email templates and sends. | `id`, `workspaceId`, `buyerId`, `deliveryRouteId`, `templateName`, `providerMessageId`, `status`, `sentAt`, `failureReason` | Belongs to workspace, optional buyer and route. | Do not store secret tokens. Keep message body storage minimal unless required for proof. |
| `AccessHubRequest` | Captures buyer support/recovery requests. | `id`, `workspaceId`, `buyerId`, `requestType`, `submittedEmail`, `status`, `priority`, `summary`, `resolution`, `createdAt` | Belongs to workspace and optional buyer; may create AccessDesk issues or entitlement events. | Requests may contain personal data. Add rate limits and review before sending private access. |
| `AccessDeskIssue` | Internal operational issue raised from support, QA or owner review. | `id`, `workspaceId`, `accessHubRequestId`, `title`, `severity`, `status`, `ownerId`, `dueAt`, `resolutionNotes` | Belongs to workspace; can link to AccessHub request, product, buyer or test. | Issue notes may contain sensitive operational details. Role-restrict access. |
| `DeliveryProofTest` | Records checkout-to-customer QA scenarios and evidence. | `id`, `workspaceId`, `productId`, `productTierId`, `scenario`, `status`, `testedById`, `evidenceUrl`, `notes`, `testedAt` | Belongs to workspace, product and tier; may link to route, email or entitlement. | Evidence can contain private data. Store sanitized proof or protected links. |
| `ProofMetric` | Stores operational reporting snapshots. | `id`, `workspaceId`, `metricType`, `label`, `value`, `periodStart`, `periodEnd`, `source`, `notes` | Belongs to workspace; may summarize requests, tests, exceptions or delivery records. | Metrics should avoid exposing unnecessary buyer-level personal data. |
| `OwnerAction` | Tracks actions that require owner approval or follow-up. | `id`, `workspaceId`, `title`, `description`, `status`, `priority`, `assignedToId`, `dueAt`, `completedAt` | Belongs to workspace; may link to modules, tests, handover items or issues. | Approval records should identify who approved and when. |
| `HandoverItem` | Stores handover packet sections and completion state. | `id`, `workspaceId`, `title`, `section`, `status`, `summary`, `resourceUrl`, `ownerApproved`, `updatedAt` | Belongs to workspace; may link to tests, metrics or implementation docs. | Handover resources may reveal system architecture; restrict to authorized workspace members. |
| `AuditLog` | Records sensitive actions and system events. | `id`, `workspaceId`, `actorUserId`, `action`, `entityType`, `entityId`, `ipAddress`, `userAgent`, `metadata`, `createdAt` | Belongs to workspace and optional user. | Tamper-resistant logging is important. Avoid storing full secrets or excessive payloads. |
| `IntegrationConnection` | Stores metadata for configured external tools. | `id`, `workspaceId`, `provider`, `status`, `externalAccountId`, `scopes`, `configuredById`, `lastCheckedAt` | Belongs to workspace; used by webhooks and automation routing. | Store encrypted secrets outside normal plaintext fields. Restrict provider scopes. |
| `WebhookEvent` | Stores incoming webhook processing records. | `id`, `workspaceId`, `provider`, `externalEventId`, `eventType`, `status`, `receivedAt`, `processedAt`, `errorMessage`, `payloadHash` | Belongs to workspace; may link to orders and entitlement events. | Verify signatures before processing. Store minimal payload data or sanitized metadata. |

## Suggested Relationship Notes

- `Workspace` is the top-level tenant boundary.
- `User` gains access through `WorkspaceMember`, not by direct workspace ownership alone.
- `Client` is optional for direct service clients but important for agency use cases.
- `ProductTier` should carry mapped access rules, while `Entitlement` records the current buyer state.
- `EntitlementEvent` should preserve the history behind every access state change.
- `WebhookEvent` should be processed idempotently before creating or updating `Order` and `Entitlement` records.
- `AccessHubRequest` should not automatically send private access. It should route through approved rules and review states.
- `ProofMetric` should be derived from operational records where possible rather than manually invented.

## Initial Prisma Implementation Order

1. `User`, `Workspace`, `WorkspaceMember`
2. `Client`, `Product`, `ProductTier`
3. `Buyer`, `Order`, `Entitlement`, `EntitlementEvent`
4. `DeliveryRoute`, `DeliveryEmail`
5. `AccessHubRequest`, `AccessDeskIssue`
6. `DeliveryProofTest`, `ProofMetric`, `OwnerAction`, `HandoverItem`
7. `IntegrationConnection`, `WebhookEvent`, `AuditLog`

