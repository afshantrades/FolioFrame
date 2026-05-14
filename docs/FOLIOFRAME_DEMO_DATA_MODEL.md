# FolioFrame Demo Data Model

This document describes the expanded static/demo data model added in Step 2.

The source of truth is `content/folioframeDemoData.ts`.

## Static Boundary

All demo records are fictional and structural. They do not contain real customer names, real emails, real payment records, real platform records, production credentials, or live monitoring data.

## Data Sets

### `dashboardMetrics`

Top-level static portal metrics used to show mapped systems, QA checks, owner actions, and recovery routes.

Fields:

- `label`
- `value`
- `trend`
- `note`

### `buyerJourneySteps`

Static buyer journey steps from payment confirmation through entitlement, access, delivery, support, follow-up, and reporting.

Fields:

- `stage`
- `status`
- `owner`
- `detail`

### `productTierMatrix`

Demo product and tier rows for comparing access rules, delivery paths, support routes, and review states.

Fields:

- `product`
- `tier`
- `accessRule`
- `deliveryPath`
- `supportRoute`
- `reviewState`

### `entitlementRecords`

Sample entitlement records for EntitlementFrame and AccessGuard review.

Fields:

- `id`
- `offer`
- `tier`
- `entitlement`
- `trigger`
- `exceptionPath`
- `ownerApproval`

### `inboxGuardChecks`

Static message checks for access instructions, portal welcome copy, and support resend snippets.

Fields:

- `message`
- `channel`
- `check`
- `status`

### `accessHubRequests`

Demo internal portal requests for access exceptions, proof review, and handover documents.

Fields:

- `requestId`
- `type`
- `module`
- `priority`
- `owner`
- `status`

### `launchRoomIssues`

Static launch readiness issues and triage routes.

Fields:

- `issue`
- `severity`
- `route`
- `owner`
- `status`

### `migrationItems`

Demo migration planning items for product, asset, and support continuity.

Fields:

- `item`
- `sourceState`
- `destinationState`
- `continuityCheck`
- `ownerApproval`

### `proofMetrics`

Static operational reporting metrics for delivery proof, access exceptions, support readiness, and handover.

Fields:

- `metric`
- `value`
- `basis`
- `reviewAction`

### `agencyClients`

Fictional agency workspace rows for demonstrating AgencyFrame.

Fields:

- `clientLabel`
- `scope`
- `workspaceStatus`
- `qaStandard`
- `nextAction`

### `verifiedDeliveryChecks`

Static readiness criteria for the FolioFrame Verified Delivery Standard.

Fields:

- `check`
- `status`
- `evidence`

### `handoverItems`

Static handover checklist entries.

Fields:

- `item`
- `owner`
- `status`

### `ownerActions`

Static owner action records used across the portal.

Fields:

- `action`
- `module`
- `priority`
- `dueState`

## Module Data Mapping

`getPortalDemoDataForModule` maps module slugs to the most relevant static data set. This gives internal module pages a safe preview count without rendering real platform data.
