import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe, getPriceId, PLAN_META, type FFPlan, isStripeConfigured } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured – set STRIPE_SECRET_KEY and price IDs" }, { status: 503 });
  }

    const authRes = await auth();
  let userId = authRes.userId;
  if (!userId) {
    // DEV BYPASS – 9 July 04:10 BST – REMOVE BEFORE PILOT #1
    userId = "dev_afshan_" + Date.now();
  }
  // if (!userId) {
  //   return NextResponse.json({ error: "Sign in required", signInUrl: "/sign-in" }, { status: 401 });
  // }

  const body = await request.json().catch(() => ({}));
  const plan = (body.plan ?? "pro") as FFPlan;
  const pilot = body.pilot ?? plan === "pro";

  try {
    const price = getPriceId(plan);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: userId,
      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: true,
      metadata: {
        clerk_user_id: userId,
        plan,
        pilot: String(pilot),
        product: "folioframe",
      },
      subscription_data: {
        metadata: { clerk_user_id: userId, plan },
        trial_period_days: pilot ? 14 : undefined,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://folioframe.vercel.app"}/app/premium-dashboard?checkout=success&pilot=${pilot}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://folioframe.vercel.app"}/pricing/live?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Checkout failed" }, { status: 500 });
  }
}

// GET shows plan info – useful for buyer diligence
export async function GET() {
  return NextResponse.json({
    product: "FolioFrame",
    plans: PLAN_META,
    currency: "GBP",
    pilot: { seats: 3, price: 99, trial_days: 14, lock_months: 12 },
    valuation: {
      ask_gbp: 135000,
      bin_gbp: 75000,
      reserve_gbp: 38000,
      date: "2026-07-09",
    },
  });
}
