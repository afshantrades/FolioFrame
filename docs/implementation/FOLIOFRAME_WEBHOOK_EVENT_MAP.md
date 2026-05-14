# FolioFrame Webhook Event Map

Status: planning map only. No webhook endpoint is active in the static MVP.

## Event Matrix

| Event | Trigger source | Required payload fields | Expected automation action | EntitlementFrame state | Email action | Tracker update | Owner action if needed | QA scenario |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `checkout.session.completed` | Stripe checkout | event id, session id, customer id, buyer email, price id, product metadata, amount, currency, timestamp | Create entitlement, delivery proof record and buyer tracker row | Active when mapping is approved | Send approved access and onboarding route | Create or update buyer record | Review if product mapping is missing | Complete test checkout and confirm access path |
| `payment_intent.succeeded` | Stripe payment | event id, payment intent id, customer id, buyer email, amount, currency, product metadata | Confirm payment evidence and reconcile with checkout record | Active or reconcile pending | No duplicate email unless checkout route is missing | Add payment proof note | Review duplicate or unmatched payment | Send payment success without checkout session |
| `payment_failed` | Stripe payment or checkout tool | event id, customer id, buyer email, amount, failure reason, timestamp | Record failed payment and avoid access grant | Not active | Send approved failed-payment support copy if in scope | Add failed payment note | Review repeated failures or unclear state | Simulate failed payment event |
| `refund.created` | Stripe or checkout tool | event id, transaction id, buyer email, product id, refund amount, reason, timestamp | Pause access action until lifecycle rule is checked | Pending manual review or closed per approved rule | Send only approved refund-sensitive message | Add refund review note | Approve access handling | Test refund-sensitive route |
| `customer.subscription.deleted` | Stripe subscription | event id, customer id, buyer email, subscription id, product id, ended timestamp | Evaluate cancellation lifecycle rule | Closed or pending manual review | Send approved cancellation access note if in scope | Update subscription access state | Review if cancellation rule is missing | Simulate subscription end |
| `customer.subscription.updated` | Stripe subscription | event id, customer id, buyer email, subscription id, status, product id, timestamp | Evaluate plan change, payment status or access state | Active, paused or pending review | Send approved update note when eligible | Update subscription and tier fields | Review tier mismatch | Simulate upgrade, pause and renewal states |
| Gumroad sale | Gumroad or export import | transaction id, buyer email, product id, variant id, amount, currency, timestamp | Normalize sale into FolioFrame access format | Active when product/variant mapping is approved | Send approved access route if eligible | Create buyer record | Review missing variant mapping | Import sample sale and variant sale |
| Email delivery failure | Email platform | message id, buyer email, route name, error type, timestamp | Add InboxGuard fallback item and support route | No entitlement change | Use approved fallback or resend route after review | Mark email route issue | Review private access resend if needed | Simulate bounced or failed access email |
| AccessHub request | Support form or inbox label | request id, buyer email, issue category, product, message, timestamp | Route to support SOP and AccessDesk if needed | Pending manual review for private access changes | Send support acknowledgement if approved | Create support request row | Approve wrong-email or private access action | Submit lost access and wrong-email samples |
| Manual owner action | Owner action register | action id, module, owner, decision, timestamp, related record | Update route state and unblock approved next action | Updated per decision | Send only approved message route | Close or update owner action | None if decision is complete | Mark entitlement rule approved and rerun sample route |

## QA Notes

- Test success, missing field, duplicate event and retry cases.
- Confirm no buyer-facing access action runs when owner approval is required.
- Confirm every event has a DeliveryProof or AccessDesk record where relevant.
- Keep production webhook signing, logs and access permissions in the approved implementation scope.
