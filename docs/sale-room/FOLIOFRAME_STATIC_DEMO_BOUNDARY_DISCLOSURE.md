# FolioFrame Static/Demo Boundary Disclosure

## Disclosure

FolioFrame is currently a buyer-ready static service website and static portal/demo surface.

It is not a live SaaS, production fulfilment platform, payment processor, support desk, monitoring system or customer database.

## What Works Today

- Public website pages render.
- Static pricing and offer content renders.
- Static module pages render.
- Static `/app` portal/demo pages render.
- Approved FolioFrame assets render.
- Structured content and demo data are present.
- Deployment metadata, sitemap, robots and manifest are present.
- Prisma, Clerk and Postgres foundations exist for future live work.

## What Is Not Live

- No live auth is required for the static demo.
- No live billing is active.
- No live checkout is connected.
- No production webhooks are active.
- No live email sending is active.
- No live customer records are stored or displayed.
- No live support tickets are handled.
- No live monitoring is active.
- No backend public application form handling is active.

## Demo Data

Any internal portal records are fictional/static demo records. They should not be interpreted as customer records, support tickets, revenue data, platform events or operational monitoring.

## Implementation Docs

Implementation docs are planning, SOP, runbook, QA and handover materials. They do not mean that third-party integrations are connected.

## Buyer Guidance

A buyer can deploy FolioFrame as a static service-brand demo and use it in sales conversations. To operate FolioFrame as a live SaaS or automated fulfilment product, the buyer must complete a separate implementation phase covering:

- Production auth
- Secure credential management
- Database deployment
- Workspace authorization
- Checkout/webhook integrations
- Email provider integration
- Support workflow design
- Monitoring decisions
- Legal and privacy review

## Safe Statement

FolioFrame is ready to review, present and deploy as a static service website and static portal/demo. It is not ready to operate as live automated fulfilment software.
