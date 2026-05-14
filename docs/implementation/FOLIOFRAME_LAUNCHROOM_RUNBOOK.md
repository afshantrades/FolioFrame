# FolioFrame LaunchRoom Runbook

Status: launch readiness and triage runbook. It does not simulate live monitoring in the static MVP.

## Purpose

LaunchRoom gives the implementation team and client owner a clear timeline for checkout-to-customer readiness, launch-day issue triage and post-launch review.

## 14 Days Before Launch

Actions:

- confirm product/tier matrix
- confirm checkout links
- confirm entitlement rules
- confirm delivery assets
- confirm access messages
- confirm AccessHub support route
- confirm AccessDesk issue categories
- confirm owner approval checkpoints
- schedule DeliveryProof test plan

Owner responsibilities:

- approve product access rules
- approve refund and cancellation handling
- provide missing assets
- identify launch owner and escalation owner

Output:

- launch readiness checklist
- open owner action list
- missing asset list

## 7 Days Before Launch

Actions:

- run successful purchase scenario
- run failed payment scenario
- test access message route
- test lost access route
- test wrong-email request route
- verify support snippets
- review ProofMetrics baseline fields

Owner responsibilities:

- review test evidence
- approve support copy
- approve launch triage roles

Output:

- DeliveryProof test evidence
- triage board draft
- owner approvals

## 48 Hours Before Launch

Actions:

- recheck checkout links
- recheck delivery links
- recheck video or file access
- confirm support inbox coverage
- confirm AccessHub route
- confirm owner availability
- freeze nonessential route changes

Owner responsibilities:

- approve launch readiness state
- confirm escalation contact
- approve any last-minute known limitation note

Output:

- 48-hour readiness note
- known limitations list
- launch day escalation sheet

## Launch Day

Actions:

- monitor approved operational checkpoints manually or through scoped production tools
- log issues in LaunchRoom issue log
- route support questions through AccessHub
- escalate private access changes through approved rules
- capture DeliveryProof evidence for test and early buyer routes

Owner responsibilities:

- make access-sensitive decisions
- approve any emergency support copy changes
- confirm whether a launch issue blocks sales, delivery or support

Output:

- issue log
- owner decision log
- support theme notes

## 48 Hours After Launch

Actions:

- review AccessHub requests
- review delivery proof records
- review support issue themes
- review failed or paused automation notes
- update ProofMetrics baseline
- schedule owner debrief

Owner responsibilities:

- close urgent access decisions
- approve follow-up support copy
- approve any route repair work

Output:

- post-launch ProofMetrics snapshot
- open issue list
- debrief agenda

## Issue Log Template

| Issue id | Time | Severity | Route | Description | Owner | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LR-001 | Placeholder | Medium | AccessHub | Placeholder issue | Support owner | Open | Review route |

## Severity Labels

- Critical: checkout, access or delivery route is blocked for a mapped buyer path.
- High: buyer-facing route works only through manual support.
- Medium: support or reporting route needs owner review.
- Low: documentation, copy or reporting improvement.

## Escalation Rules

- Private access changes require owner-approved rules.
- Payment-sensitive issues route to checkout owner.
- Product/tier mismatches route to product owner.
- Support copy changes route to support owner.
- Missing assets route to implementation owner and product owner.

## Post-Launch Debrief

Review:

- what worked
- support questions
- access exceptions
- delivery proof gaps
- open owner actions
- recommended care route
- next review date

## Static MVP Status

Not live. This runbook documents launch operations for an approved service implementation.
