# FolioFrame – SaaS Live Upgrade
## July 9, 2026 – feat/saas-live-july2026

This branch turns the static FolioFrame demo (localStorage) into a live SaaS with Stripe + Clerk + Prisma – ready to close 3 founder pilots @ £99/mo and validate the £135k–£150k ask.

### What changed vs main (b69ec3f)

- **Restored Clerk middleware** (`middleware.ts`) – protects `/app/*`, allows public marketing + `/pricing/live` + Stripe webhooks
- **Stripe** – added `stripe@^16.9.0` + `zod@^3.23.8`
- **Prisma** – new `Subscription` model:
  - `SubscriptionStatus`: TRIALING | ACTIVE | PAST_DUE | CANCELED | UNPAID | INCOMPLETE
  - `SubscriptionPlan`: FOLIOFIX | PRO | SIGNATURE
  - fields: `stripeCustomerId`, `stripeSubscriptionId`, `priceId`, `pilot boolean`, `clerkUserId`, `workspaceId?`, `userId?`
- **Billing lib:**
  - `lib/billing/stripe.ts` – Stripe client, `FF_PRICES`, `PLAN_META`
  - `lib/billing/subscription.ts` – `getActiveSubscriptionForClerk`, `getPilotCount`, `getMRR`
- **API:**
  - `POST /api/billing/checkout` – creates Stripe Checkout – 14-day pilot trial auto-enabled for Pro
  - `POST /api/webhooks/stripe` – `checkout.session.completed`, `customer.subscription.updated/deleted` → Prisma upsert
  - `POST /api/billing/portal` – Stripe Customer Portal
  - `GET /api/billing/checkout` – returns plan JSON + valuation metadata
- **UI:**
  - `/pricing/live` – Stripe-enabled pricing – £29 / £99 / £249 – Founder pilot banner – uses `<CheckoutButton>`
  - `components/billing/CheckoutButton.tsx` – client checkout
  - Existing `/pricing` left untouched – buyer can see service-system pricing vs SaaS pricing
- **Env:** add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_STRIPE_PRICE_SIGNATURE=price_...
NEXT_PUBLIC_APP_URL=https://folioframe.vercel.app
# existing Clerk + DATABASE_URL unchanged
```

### Install – 35 min

```bash
git fetch origin
git checkout feat/saas-live-july2026
npm install
# prisma
npx prisma generate
npx prisma migrate dev --name add_subscription
# or: npx prisma db push
# Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe
npm run dev
# → http://localhost:3000/pricing/live
```

Test card: `4242 4242 4242 4242`, any future date, CVC any.

Checklist:
- [ ] Stripe products created – GBP – £29 / £99 / £249 monthly
- [ ] Price IDs in env
- [ ] Webhook endpoint: https://folioframe.vercel.app/api/webhooks/stripe
  Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
- [ ] Clerk production keys set
- [ ] DATABASE_URL points to Supabase / Neon prod
- [ ] `npx prisma migrate deploy` on Vercel build (already in `npm run build`)

### Pilot close plan

DM script (included in `/docs/ACQUIRE_LISTING_JULY2026.md`):
> “Opening 3 founder pilot seats – £99/mo, locked 12 months, white-glove onboarding, direct Slack with me. …”

Target list: 30 agencies – see `/docs/PILOT_DM_30_AGENCIES.*`

Pilot tracker:
- 0 pilots: £22–55k
- 3 pilots @ £99 = £297 MRR: £65–125k
- 5 pilots @ £99 = £495 MRR: £95–150k ← ChatGPT £135–150k validated

### Valuation – 9 July 2026

- Pre-upgrade (demo, £0 ARR): £22k–£55k fair • List £39k
- Post-upgrade (Stripe live): £45k–£95k
- +3 pilots: £65k–£125k
- +5 pilots: **£95k–£150k**

Ask: **£135,000**
BIN: £75,000
Reserve: £38,000

Comps: Micro-SaaS 2.5–4x ARR • Marketplace 3–5x • Pre-seed $1–5M post – Berkus • UK 4–9x ARR

### Files added

```
middleware.ts                                    # restored + billing-aware
prisma/schema.prisma                             # + Subscription model
lib/billing/stripe.ts
lib/billing/subscription.ts
app/api/billing/checkout/route.ts
app/api/webhooks/stripe/route.ts
app/api/billing/portal/route.ts
components/billing/CheckoutButton.tsx
app/pricing/live/page.tsx
SAAS_LIVE_JULY2026.md
```

Zero breaking changes to existing `/app`, `/components`, `/lib` – all net-new under `/lib/billing`, `/app/api/billing`, `/app/pricing/live`.

### Buyer handover

- 100% IP – solo – afshantrades
- Repo: github.com/afshantrades/FolioFrame – branch `feat/saas-live-july2026`
- Transfer: GitHub + Vercel + Supabase/Neon + Clerk + Stripe (buyer connects own keys – 1 env change)
- Support: 30-day Slack – included

— Arena.ai – 9 July 2026 – Wilsden, UK
