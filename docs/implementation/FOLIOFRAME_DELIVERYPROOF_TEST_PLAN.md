# FolioFrame DeliveryProof Test Plan

Status: QA plan for approved implementation work. Static MVP status: not live.

Use this plan with sample or staging records before production activation.

## Scenario Matrix

| Scenario | Precondition | Test steps | Expected result | Evidence to capture | Pass/fail status |
| --- | --- | --- | --- | --- | --- |
| Successful purchase | Product/tier mapping is approved | Complete sample checkout, confirm entitlement, check delivery route, review tracker | Buyer access state is active and delivery proof record is created | Event id, entitlement row, message route, tracker update | Pending |
| Failed payment | Test checkout can simulate payment failure | Trigger failed payment, confirm no access grant, review support copy | Access is not granted and failed payment note is recorded | Failed payment event, tracker note | Pending |
| Duplicate purchase | Existing buyer record exists | Send second purchase for same product and buyer reference | Duplicate is routed to review or safely reconciled per approved rule | Original record, duplicate event, owner review item | Pending |
| Wrong email | Buyer requests access at a different email | Submit wrong-email AccessHub request | Private access change pauses for owner-approved review | Request id, proof note, owner action | Pending |
| Refund manual review | Refund-sensitive lifecycle rule exists | Trigger refund event | Entitlement state moves to pending review or approved closed state | Refund event, lifecycle state, owner decision | Pending |
| Cancellation manual review | Subscription cancellation rule exists | Trigger cancellation event | Access state follows approved cancellation route | Subscription event, access state, email action state | Pending |
| Upgrade | Upgrade mapping is approved | Trigger upgrade event or checkout path | Product tier updates and old/new access states are documented | Upgrade event, entitlement update, tracker row | Pending |
| Downgrade | Downgrade rule is approved | Trigger downgrade event | Access state changes only through approved rule | Downgrade event, owner approval, tracker row | Pending |
| Lost access | Buyer has active mapped entitlement | Submit lost access request | AccessHub routes request to approved recovery path | Request id, entitlement lookup, response snippet | Pending |
| Broken link | Delivery asset has test broken link | Open or test delivery link | Broken link issue is created and fallback route is visible | Link check, AccessDesk issue, owner action | Pending |
| Delivery email review | Approved test recipient exists | Send access message through approved test route | Message uses approved sender, support footer and fallback copy | Message preview, delivery route, owner copy approval | Pending |
| AccessHub request | AccessHub form is available in staging | Submit sample request with required fields | Support request record is created with category and owner | Request id, category, owner, status | Pending |
| Support handoff | AccessDesk issue route is configured | Convert AccessHub request to internal issue | Internal issue includes severity, owner and closure criteria | Issue id, severity, owner, source request | Pending |
| ProofMetrics baseline | Tracker has sample events | Run baseline report | Operational report shows proof, exceptions, support themes and owner actions | Report export, metric definitions, review actions | Pending |

## Evidence Rules

- Capture timestamps, source ids and owner decisions.
- Do not use real buyer records during initial QA.
- Mark unresolved scenarios as owner actions.
- Re-run failed scenarios after the route is repaired.

## Completion Criteria

- All required scenarios are passed or assigned to an owner action.
- DeliveryProof packet is reviewed by the implementation owner.
- Access-sensitive exceptions have an approved handling rule.
- Handover packet includes known limitations and next review date.
