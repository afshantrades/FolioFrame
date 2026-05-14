# FolioFrame MigrationFrame Runbook

Status: migration planning runbook. Production movement requires separate approval.

## Purpose

MigrationFrame maps the move from an old system to a new delivery structure while keeping buyer access continuity, support recovery and delivery proof visible.

## Old System Inventory

Capture:

- current checkout links
- current product ids
- current product platform
- current email platform
- current automation routes
- current file folders
- current video libraries
- current support inbox
- current buyer tracker
- current access rules

## Risk Classification

Classify each item:

- Low: documentation or label change only.
- Medium: buyer access route changes but rollback is clear.
- High: checkout, entitlement, delivery or support route could be blocked without owner action.
- Blocked: required asset, tool access or owner decision is missing.

## Legacy Buyer Access Plan

Document:

- who keeps old access
- who receives new access
- how upgrades are handled
- how cancellations are handled
- how refunds are handled
- how support validates old buyer access
- when old routes can be retired

## Email Sequence Migration

Review:

- access instruction email
- onboarding sequence
- follow-up sequence
- resend snippets
- support footer
- launch announcements
- migration notice

Output:

- approved sequence inventory
- owner copy review
- test recipient result

## Old Link Retirement

Document:

- old checkout links
- old product links
- old download links
- old video links
- old support links
- redirect or retirement decision
- owner approval state

## Data Export and Import Notes

Record:

- export source
- export owner
- fields included
- fields excluded
- import destination
- test import result
- privacy or retention review owner
- rollback copy

Do not store real exports in this documentation folder.

## Cutover Plan

Steps:

1. Freeze product/tier matrix.
2. Approve EntitlementFrame rules.
3. Approve delivery assets.
4. Approve InboxGuard copy.
5. Confirm AccessHub recovery route.
6. Run DeliveryProof test plan.
7. Move approved routes in production scope.
8. Monitor support themes after cutover.
9. Update handover packet.

## Rollback Plan

Prepare:

- previous access route
- previous delivery link
- support message for temporary fallback
- owner approval for rollback
- tracker note
- post-rollback test

Rollback is a controlled owner-approved action, not an automatic assumption.

## Post-Migration DeliveryProof Test

Run:

- successful purchase
- lost access
- wrong email
- broken link
- support handoff
- ProofMetrics baseline

Output:

- migration proof packet
- open owner actions
- next recheck date

## Static MVP Status

Not live. This runbook is documentation for approved migration work.
