// lib/billing/subscription.ts
import "server-only";
import { prisma } from "@/lib/db";

export async function getActiveSubscriptionForClerk(clerkUserId: string) {
  return prisma.subscription.findFirst({
    where: {
      clerkUserId,
      status: { in: ["TRIALING", "ACTIVE"] },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPilotCount() {
  return prisma.subscription.count({
    where: { pilot: true, status: { in: ["TRIALING", "ACTIVE"] } },
  });
}

export async function getMRR() {
  // Simple – sum by plan
  const subs = await prisma.subscription.findMany({
    where: { status: { in: ["TRIALING", "ACTIVE"] } },
    select: { plan: true },
  });
  const map = { FOLIOFIX: 29, PRO: 99, SIGNATURE: 249 } as const;
  return subs.reduce((sum, s) => sum + (map[s.plan as keyof typeof map] || 0), 0);
}
