# FolioFrame Production Integration Blueprint

Status: planning blueprint only. Static MVP status for every path: not live.

This blueprint describes the production architecture a client implementation could use after scope approval, tool access approval, security review and owner sign-off. It does not add live integrations or credentials to the FolioFrame static MVP.

## Operating Principles

- Treat payment, entitlement, access, delivery, support and reporting as separate reviewable routes.
- Keep owner approval visible for access-sensitive actions.
- Store only the fields required for the approved workflow.
- Capture delivery proof and exception evidence without exposing private buyer data unnecessarily.
- Record failures in a review queue before retrying buyer-facing actions.
- Keep every third-party tool connection behind an approved production implementation step.

## Stripe Payment Trigger Route

Purpose: Convert a completed checkout into a mapped entitlement and delivery path.

Input event: Stripe checkout completion or successful payment event.

Required fields:

- event id
- payment id
- customer id
- buyer email
- product or price id
- product name
- amount
- currency
- checkout timestamp
- metadata for product tier or offer slug

Destination tool: EntitlementFrame, buyer tracker, email platform and DeliveryProof packet.

Actions:

- Validate the event signature in the production app.
- Match the product or price id to the product/tier matrix.
- Create or update the entitlement state.
- Add delivery proof record with event id and timestamp.
- Trigger approved delivery and onboarding email route.
- Add ProofMetrics baseline entry for the purchase path.

Failure handling:

- If signature validation fails, stop processing and add an internal issue.
- If product mapping is missing, route to AccessDesk with no buyer-facing automation.
- If email action fails, log fallback route for InboxGuard review.

Owner review:

- Approve product id to tier mapping before production use.
- Approve refund-sensitive and subscription-sensitive access rules.

QA check:

- Send a test checkout event and confirm entitlement, tracker, email action and proof packet are created with sample data.

Static MVP status: not live.

## Gumroad or Lemon Squeezy Alternative Route

Purpose: Support sellers who use a lightweight checkout tool instead of Stripe.

Input event: Approved sale webhook or order export row.

Required fields:

- transaction id
- buyer email
- buyer name if approved for use
- product id or variant id
- product name
- amount
- currency
- purchase timestamp
- refund or dispute status when available

Destination tool: EntitlementFrame, buyer tracker, InboxGuard and DeliveryProof.

Actions:

- Normalize sale data into the FolioFrame buyer access format.
- Match product and variant to tier rules.
- Create entitlement state and delivery proof entry.
- Trigger the approved email route if the order is eligible.
- Flag missing variants for owner review.

Failure handling:

- If the payload is missing product or buyer email, create AccessDesk issue.
- If the route depends on export files, mark the sync as manual review.
- If refund status is unclear, pause access changes until owner approval.

Owner review:

- Approve product/variant mapping and refund handling before use.

QA check:

- Test with one sale, one variant sale and one refund-sensitive sample.

Static MVP status: not live.

## Make or Zapier Automation Route

Purpose: Coordinate approved actions between checkout, tracker, email, support and reporting tools.

Input event: Webhook from checkout, AccessHub form, manual owner action or scheduled review.

Required fields:

- source event id
- route name
- buyer email when required
- product or module slug
- action requested
- timestamp
- owner approval state

Destination tool: Make or Zapier scenario, EntitlementFrame, tracker, email platform and AccessDesk.

Actions:

- Receive the approved event.
- Check required fields.
- Route to the correct scenario or zap.
- Update entitlement, delivery proof or support tracker.
- Record success or failure in ProofMetrics.

Failure handling:

- Send incomplete payloads to AccessDesk internal issue route.
- Do not retry private access actions without owner-approved retry rules.
- Capture route error, timestamp and impacted module.

Owner review:

- Approve scenario naming, retry behavior, private data handling and escalation rules.

QA check:

- Run a dry route with sample payloads for success, missing field and tool timeout cases.

Static MVP status: not live.

## MailerLite or ConvertKit Email Route

Purpose: Send approved access, onboarding, fallback and follow-up messages after entitlement decisions.

Input event: Eligible entitlement state, checkout event or manual owner-approved support action.

Required fields:

- buyer email
- product or segment id
- entitlement state
- message route
- fallback support route
- delivery proof record id

Destination tool: MailerLite or ConvertKit.

Actions:

- Add buyer to the approved group, tag or sequence.
- Send access instructions or onboarding message.
- Store message route and timestamp in DeliveryProof.
- Add fallback support wording from InboxGuard.

Failure handling:

- If email API call fails, add InboxGuard issue and AccessHub fallback route.
- If buyer email is missing or changed, pause action for owner-approved review.

Owner review:

- Approve sender identity, access wording, support footer and sequence membership.

QA check:

- Test access message, onboarding message, resend snippet and fallback route with demo recipient data.

Static MVP status: not live.

## Google Drive or Dropbox File Delivery Route

Purpose: Deliver files or folders through an approved access route with documented fallback handling.

Input event: Eligible purchase, entitlement update or manual owner-approved support action.

Required fields:

- buyer email
- product or folder id
- entitlement state
- delivery asset label
- access expiry or review rule if relevant

Destination tool: Google Drive, Dropbox, buyer tracker and DeliveryProof.

Actions:

- Match product tier to folder or file delivery asset.
- Share approved asset or send approved access instructions.
- Record delivery path and owner approval state.
- Add broken link fallback to AccessHub.

Failure handling:

- If folder id is missing, pause delivery and create AccessDesk issue.
- If link cannot be generated, use owner-approved fallback instructions.

Owner review:

- Approve folder structure, sharing model, access expiry and support instructions.

QA check:

- Test valid link, broken link, missing folder and wrong-email recovery scenarios.

Static MVP status: not live.

## Vimeo or Video Access Route

Purpose: Map protected video access into the buyer access lifecycle.

Input event: Eligible entitlement state or owner-approved product tier update.

Required fields:

- buyer email or approved viewer id
- video id or collection id
- product tier
- access state
- support fallback route

Destination tool: Vimeo, product platform, AccessHub and DeliveryProof.

Actions:

- Match buyer entitlement to approved video access route.
- Record video access asset in product/tier matrix.
- Add access instructions to delivery message.
- Add support fallback for unavailable or restricted video.

Failure handling:

- If video asset is missing, mark route blocked by missing asset.
- If access cannot be assigned, create AccessDesk issue for owner review.

Owner review:

- Approve video asset list, access rule and fallback wording.

QA check:

- Test eligible access, missing asset, restricted video and support recovery path.

Static MVP status: not live.

## Airtable, Notion or Sheets Buyer Tracker Route

Purpose: Maintain a reviewable operational tracker for buyer access, proof and owner actions.

Input event: Checkout event, entitlement change, support request, proof update or owner action.

Required fields:

- record id
- buyer email or approved reference
- product/tier
- entitlement state
- delivery proof state
- support state
- owner action state
- timestamp

Destination tool: Airtable, Notion or Sheets.

Actions:

- Create or update buyer access row.
- Link to proof packet and support route.
- Update owner action state.
- Add reporting fields for ProofMetrics.

Failure handling:

- If tracker write fails, add AccessDesk issue with source event id.
- If duplicate record appears, route to manual review.

Owner review:

- Approve tracker fields, retention expectations and access permissions.

QA check:

- Test create, update, duplicate and missing required field scenarios.

Static MVP status: not live.

## AccessHub Support Request Route

Purpose: Collect buyer support requests and route them into documented recovery paths.

Input event: Support form submission or approved support inbox label.

Required fields:

- request id
- buyer email
- product
- issue category
- message
- proof reference if available
- timestamp

Destination tool: AccessHub tracker, AccessDesk internal issue route and owner action queue.

Actions:

- Categorize request as lost access, wrong email, broken link, proof question or product mismatch.
- Match request to recovery SOP.
- Flag private access changes for owner-approved rules.
- Update ProofMetrics support themes.

Failure handling:

- If required fields are missing, request additional buyer information using approved copy.
- If identity or entitlement cannot be confirmed, pause private access action.

Owner review:

- Approve support categories, escalation rules and private access handling.

QA check:

- Test lost access, wrong-email, broken-link and product mismatch requests.

Static MVP status: not live.

## AccessDesk Internal Issue Route

Purpose: Turn integration failures and review needs into internal issues.

Input event: Failed automation, missing mapping, owner action, support escalation or QA failure.

Required fields:

- issue id
- source route
- severity
- affected product or module
- description
- owner
- due state

Destination tool: Internal tracker, owner action register and ProofMetrics.

Actions:

- Create internal issue with severity label.
- Assign owner role.
- Link to source event and module.
- Track status through review and resolution.

Failure handling:

- If issue creation fails, log to fallback tracker and notify implementation owner.

Owner review:

- Approve severity labels, escalation route and closure criteria.

QA check:

- Trigger sample missing mapping and failed email actions and confirm internal issues appear.

Static MVP status: not live.

## EntitlementFrame Access Lifecycle Route

Purpose: Control access states across purchase, upgrade, downgrade, refund, cancellation and manual review.

Input event: Checkout, subscription update, refund, cancellation, support request or owner action.

Required fields:

- buyer reference
- product/tier
- event type
- current entitlement state
- requested entitlement state
- owner approval state
- timestamp

Destination tool: EntitlementFrame, AccessGuard, buyer tracker and AccessHub.

Actions:

- Evaluate event against access lifecycle rules.
- Set access state as active, pending review, paused or closed.
- Trigger approved email or support route when eligible.
- Log owner action if rules are missing.

Failure handling:

- If lifecycle rule is missing, pause automated action and create owner review item.
- If refund or cancellation path is unclear, route to manual review.

Owner review:

- Approve lifecycle states, refund-sensitive handling and manual exception routes.

QA check:

- Test purchase, upgrade, downgrade, refund, cancellation and wrong-email scenarios.

Static MVP status: not live.

## ProofMetrics Reporting Route

Purpose: Provide operational reporting on delivery proof, access exceptions, support themes and owner actions.

Input event: Completed delivery proof record, support request, access exception, internal issue or owner action update.

Required fields:

- metric id
- source module
- event category
- status
- review action
- reporting period
- owner

Destination tool: ProofMetrics dashboard, monthly summary and owner action register.

Actions:

- Update delivery proof completeness.
- Count access exceptions and support themes.
- Track open owner actions.
- Produce monthly review summary.

Failure handling:

- If reporting fields are missing, mark record incomplete and add owner action.
- If tracker cannot update, create AccessDesk internal issue.

Owner review:

- Approve reporting cadence, metric definitions and monthly summary format.

QA check:

- Test baseline report, exception count, support theme update and owner action carry-forward.

Static MVP status: not live.
