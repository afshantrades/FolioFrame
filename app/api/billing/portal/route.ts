import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/billing/stripe";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "auth" }, { status: 401 });

  const sub = await prisma.subscription.findFirst({
    where: { clerkUserId: userId },
    orderBy: { createdAt: "desc" },
  });

  if (!sub?.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer yet – subscribe first at /pricing/live" }, { status: 404 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://folioframe.vercel.app"}/app/premium-dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
