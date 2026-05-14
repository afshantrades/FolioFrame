# FolioFrame Live Security Boundaries

Status: planning only. These boundaries must be implemented before FolioFrame processes real buyer, checkout, access or support data.

## Credentials

- No credentials belong in the repository.
- No `.env` files should be committed.
- Use deployment environment variables or a secret manager for live values.
- Rotate exposed credentials immediately.
- Keep provider scopes as narrow as possible.

## Webhook Signature Verification

- Every webhook route must verify the provider signature before processing.
- Unverified events must not change orders, entitlements or buyer records.
- Store provider event ids and process idempotently.
- Keep failed webhook events available for review.
- Avoid storing full raw payloads unless there is a specific approved operational need.

## Audit Logging

Audit logs should be created for:

- Workspace membership changes.
- Role changes.
- Integration connection changes.
- Entitlement state changes.
- Owner approvals.
- AccessHub request resolutions.
- DeliveryProof status changes.
- Webhook processing failures.

Audit logs should never contain full secret values.

## Workspace Isolation

- Every workspace-scoped query must include workspace authorization.
- Client-supplied workspace ids must not be trusted without session and membership checks.
- Agency client records must not leak between clients.
- Public routes must not expose workspace data.
- Internal portal routes must be protected once auth is implemented.

## Role-Based Access

Recommended first roles:

- `owner`: full workspace and billing administration.
- `admin`: operational management.
- `operator`: support, QA and access workflow handling.
- `viewer`: read-only reporting and handover access.

Sensitive actions should require `owner` or `admin` roles unless a narrower permission model is implemented later.

## Least-Privilege Integrations

- Stripe keys should be server-side only.
- Webhook secrets should be used only by webhook handlers.
- Email provider keys should be restricted where the provider allows.
- File delivery integrations should avoid broad account-wide access where possible.
- Provider connection metadata can be stored in the database, but secrets should be encrypted or stored by a managed secret system.

## Buyer Data Protection

- Buyer records should store only the data needed for access reliability workflows.
- Avoid storing card data, passwords or unnecessary private notes.
- Support request forms should validate and limit submitted content.
- Buyer export and deletion workflows are required before production launch.
- Sensitive evidence should be sanitized or protected.

## Data Export and Deletion Requirement

Before launch, FolioFrame needs documented and implemented procedures for:

- Exporting workspace data.
- Exporting buyer data on request.
- Deleting or anonymizing buyer records where required.
- Retaining audit logs according to the approved privacy policy.
- Handling account closure.

## Legal and Privacy Review

Formal legal/privacy review is required before FolioFrame accepts real buyer data, live checkout events, support requests or production credentials.

Review areas:

- Privacy policy.
- Terms.
- Data processing roles.
- Buyer support request handling.
- Data retention.
- Data export/deletion process.
- Transactional email behavior.
- Production integration scopes.

