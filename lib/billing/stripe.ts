// lib/billing/stripe.ts – FolioFrame SaaS Live – July 2026
import "server-only";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
  console.warn("STRIPE_SECRET_KEY missing – billing disabled in production");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
      typescript: true,
    })
  : ({} as Stripe);

export const FF_PRICES = {
  foliofix: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER ?? process.env.STRIPE_PRICE_FOLIOFIX ?? "",
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO ?? process.env.STRIPE_PRICE_PRO ?? "",
  signature: process.env.NEXT_PUBLIC_STRIPE_PRICE_SIGNATURE ?? process.env.STRIPE_PRICE_SIGNATURE ?? "",
} as const;

export type FFPlan = keyof typeof FF_PRICES;

export const PLAN_META = {
  foliofix: { name: "FolioFix", price: 29, gbp: 2900, description: "Service system starter – 1 workspace", tier: "FOLIOFIX" as const },
  pro: { name: "Pro Launch", price: 99, gbp: 9900, description: "Agencies – 3 workspaces, RevenueFrame + DeliveryProof", tier: "PRO" as const },
  signature: { name: "Signature Launch", price: 249, gbp: 24900, description: "Full OS – unlimited, white-label, priority", tier: "SIGNATURE" as const },
} as const;

export function getPriceId(plan: FFPlan): string {
  const id = FF_PRICES[plan];
  if (!id) throw new Error(`Stripe price ID missing for ${plan}. Set NEXT_PUBLIC_STRIPE_PRICE_${plan.toUpperCase()}`);
  return id;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && FF_PRICES.pro);
}
