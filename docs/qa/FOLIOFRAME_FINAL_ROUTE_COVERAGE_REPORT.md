# FolioFrame Final Route Coverage Report

Final QA route smoke check: all listed routes returned HTTP 200 on the current local build.

## Public Routes

| Route | Exists | Type | Static/demo boundary | Notes |
| --- | --- | --- | --- | --- |
| `/` | Yes | Public | Public static service website | Homepage for FolioFrame positioning, modules, pricing preview and apply CTA |
| `/signature-launch-system` | Yes | Public | Public static service website | Higher-tier offer page |
| `/pricing` | Yes | Public | Public static service website | Static pricing copy; no payment processing |
| `/modules` | Yes | Public | Public static service website | Module library, including Product Tracks coverage |
| `/deliveryproof` | Yes | Public | Public static service website | Module page |
| `/accessguard` | Yes | Public | Public static service website | Module page |
| `/accessdesk` | Yes | Public | Public static service website | Module page |
| `/revenueframe` | Yes | Public | Public static service website | Module page |
| `/accesssafe` | Yes | Public | Public static service website | Module page |
| `/foliofix` | Yes | Public | Public static service website | Module page |
| `/entitlementframe` | Yes | Public | Public static service website | Module page |
| `/inboxguard` | Yes | Public | Public static service website | Module page |
| `/accesshub` | Yes | Public | Public static service website | Module page |
| `/launchroom` | Yes | Public | Public static service website | Module page |
| `/migrationframe` | Yes | Public | Public static service website | Module page |
| `/proofmetrics` | Yes | Public | Public static service website | Module page |
| `/agencyframe` | Yes | Public | Public static service website | Module page |
| `/verified-delivery-standard` | Yes | Public | Public static service website | Verified Delivery Standard page |
| `/apply` | Yes | Public | Static form preview only | No backend form handling; submission disabled |
| `/faq` | Yes | Public | Public static service website | Safety and scope FAQs included |
| `/privacy` | Yes | Public | Static starter legal page | Formal legal review required before launch |
| `/terms` | Yes | Public | Static starter legal page | Formal legal review required before launch |
| `/refund-policy` | Yes | Public | Static starter legal page | No order or refund processing |
| `/accessibility` | Yes | Public | Static starter support page | Accessibility starter notes |

## Internal Portal Routes

| Route | Exists | Type | Static/demo boundary | Notes |
| --- | --- | --- | --- | --- |
| `/app` | Yes | Internal | Static/demo portal only | Command centre overview |
| `/app/premium-dashboard` | Yes | Internal | Static/demo portal only | Signature Launch Premium dashboard |
| `/app/buyer-journey` | Yes | Internal | Static/demo portal only | Buyer journey map |
| `/app/product-matrix` | Yes | Internal | Static/demo portal only | Product and tier matrix |
| `/app/deliveryproof` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/accessguard` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/accessdesk` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/revenueframe` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/accesssafe` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/foliofix` | Yes | Internal | Static/demo portal only | Module workspace |
| `/app/entitlementframe` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/inboxguard` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/accesshub` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/launchroom` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/migrationframe` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/proofmetrics` | Yes | Internal | Static/demo portal only | Advanced module workspace |
| `/app/agencyframe` | Yes | Internal | Static/demo portal only | Agency workspace |
| `/app/verified-delivery` | Yes | Internal | Static/demo portal only | Verified Delivery workspace |
| `/app/handover` | Yes | Internal | Static/demo portal only | Handover workspace with implementation doc links |
| `/app/implementation-docs` | Yes | Internal | Static documentation hub only | Planning, SOP, runbook, template, QA and security resource hub |

## Implementation Docs Detail Routes

| Route | Exists | Type | Static/demo boundary | Notes |
| --- | --- | --- | --- | --- |
| `/app/implementation-docs/production-integration-blueprint` | Yes | Internal | Planning only; not live | Production route blueprint preview |
| `/app/implementation-docs/environment-variables-template` | Yes | Internal | Placeholder-only; not live | Environment variable placeholders only |
| `/app/implementation-docs/webhook-event-map` | Yes | Internal | Planning only; not live | Webhook event map preview |
| `/app/implementation-docs/client-onboarding-sop` | Yes | Internal | SOP only; not live | Client onboarding SOP preview |
| `/app/implementation-docs/deliverypack-handover-template` | Yes | Internal | Template only; not live | Handover template preview |
| `/app/implementation-docs/deliveryproof-test-plan` | Yes | Internal | QA plan only; not live | DeliveryProof QA plan preview |
| `/app/implementation-docs/accessguard-monthly-retainer-sop` | Yes | Internal | SOP only; not live | Monthly retainer SOP preview |
| `/app/implementation-docs/launchroom-runbook` | Yes | Internal | Runbook only; not live | LaunchRoom runbook preview |
| `/app/implementation-docs/migrationframe-runbook` | Yes | Internal | Runbook only; not live | MigrationFrame runbook preview |
| `/app/implementation-docs/agencyframe-playbook` | Yes | Internal | Runbook only; not live | AgencyFrame playbook preview |

## Result

Route coverage is complete for the current static FolioFrame build.
