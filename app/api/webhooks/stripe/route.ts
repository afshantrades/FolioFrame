import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/billing/stripe";
import { prisma } from "@/lib/db";
import type Stripe from "stripe";
import { provisionWorkspaceForSubscription } from "@/lib/billing/provision";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mapStripeStatus(s: Stripe.Subscription.Status) {
  const map: Record<string, "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "UNPAID" | "INCOMPLETE"> = {
    trialing: "TRIALING",
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    unpaid: "UNPAID",
    incomplete: "INCOMPLETE",
    incomplete_expired: "CANCELED",
    paused: "PAST_DUE",
  };
  return map[s] ?? "INCOMPLETE";
}

function mapPlan(priceId?: string | null, fallback = "PRO") {
  const p = process.env;
  if (priceId === p.NEXT_PUBLIC_STRIPE_PRICE_STARTER || priceId === p.STRIPE_PRICE_FOLIOFIX) return "FOLIOFIX" as const;
  if (priceId === p.NEXT_PUBLIC_STRIPE_PRICE_SIGNATURE || priceId === p.STRIPE_PRICE_SIGNATURE) return "SIGNATURE" as const;
  return (fallback.toUpperCase() as "PRO" | "FOLIOFIX" | "SIGNATURE") || "PRO";
}

export async function POST(req: NextRequest) {
  const sig = headers().get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return new NextResponse("Stripe webhook not configured", { status: 503 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkUserId = (session.client_reference_id as string) || (session.metadata?.clerk_user_id as string);
        const subscriptionId = session.subscription as string | null;

        if (subscriptionId && clerkUserId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = sub.items.data[0]?.price.id ?? null;
          const plan = mapPlan(priceId, (session.metadata?.plan as string) ?? "PRO");
          const stripeCustomerId = (session.customer as string) ?? (sub.customer as string);

          // find FolioFrame user
          const ffUser = await prisma.user.findUnique({ where: { clerkUserId } }).catch(() => null);

          const saved = await prisma.subscription.upsert({
            where: { stripeSubscriptionId: subscriptionId },
            create: {
              clerkUserId,
              userId: ffUser?.id ?? null,
              stripeCustomerId,
              stripeSubscriptionId: subscriptionId,
              priceId,
              status: mapStripeStatus(sub.status),
              plan,
              pilot: session.metadata?.pilot === "true",
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
            update: {
              status: mapStripeStatus(sub.status),
              priceId,
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              plan,
              clerkUserId,
            },
          });

          // Auto-provision Workspace – core SaaS Live value
          await provisionWorkspaceForSubscription({
            clerkUserId,
            stripeCustomerId: saved?.stripeCustomerId ?? stripeCustomerId,
            plan,
          }).catch(() => {});
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.subscription.update({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: mapStripeStatus(sub.status),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          },
        }).catch(() => null);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.error("[FolioFrame Stripe webhook]", e);
    return new NextResponse("handler error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
