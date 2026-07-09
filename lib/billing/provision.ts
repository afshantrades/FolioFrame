// lib/billing/provision.ts – FolioFrame SaaS Live
// Auto-provision Workspace on Stripe checkout – July 2026
import "server-only";
import { prisma } from "@/lib/db";
import type { SubscriptionPlan } from "@prisma/client";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function planToWorkspacePlan(plan: SubscriptionPlan | string): "STATIC_DEMO" | "SERVICE" | "PRO" | "PREMIUM" {
  const p = String(plan).toUpperCase();
  if (p === "SIGNATURE") return "PREMIUM";
  if (p === "PRO") return "PRO";
  if (p === "FOLIOFIX") return "SERVICE";
  return "PRO";
}

export async function ensureWorkspaceForClerkUser(opts: {
  clerkUserId: string;
  email?: string | null;
  name?: string | null;
  plan?: SubscriptionPlan | string;
  stripeCustomerId?: string;
}) {
  const { clerkUserId, email, name, plan = "PRO", stripeCustomerId } = opts;

  // 1. ensure User
  let user = await prisma.user.findUnique({ where: { clerkUserId } });
  if (!user && email) {
    // try by email
    user = await prisma.user.findUnique({ where: { email } }).catch(() => null);
    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { clerkUserId, name: name ?? user.name, status: "ACTIVE" },
      });
    }
  }
  if (!user) {
    if (!email) throw new Error("Cannot provision workspace – missing email for Clerk user " + clerkUserId);
    user = await prisma.user.create({
      data: {
        clerkUserId,
        email,
        name: name ?? null,
        status: "ACTIVE",
      },
    });
  }

  // 2. find existing workspace membership
  const existingMembership = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
    include: { workspace: true },
    orderBy: { createdAt: "asc" },
  });

  if (existingMembership?.workspace) {
    // upgrade plan if needed
    const targetPlan = planToWorkspacePlan(plan);
    if (existingMembership.workspace.plan !== targetPlan) {
      await prisma.workspace.update({
        where: { id: existingMembership.workspace.id },
        data: { plan: targetPlan, status: "ACTIVE" },
      });
    }
    return { user, workspace: existingMembership.workspace, created: false };
  }

  // 3. create workspace
  const baseName = name ? `${name.split(" ")[0]}'s Agency` : "My Organization";
  let slug = slugify(baseName) || `org-${user.id.slice(0, 8)}`;
  // ensure unique slug
  let trySlug = slug;
  let i = 1;
  while (await prisma.workspace.findUnique({ where: { slug: trySlug } })) {
    trySlug = `${slug}-${i++}`;
    if (i > 20) { trySlug = `org-${Date.now().toString(36)}`; break; }
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: baseName,
      slug: trySlug,
      status: "ACTIVE",
      plan: planToWorkspacePlan(plan),
    },
  });

  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: user.id,
      role: "OWNER",
      status: "ACTIVE",
      joinedAt: new Date(),
    },
  });

  await prisma.auditLog.create({
    data: {
      workspaceId: workspace.id,
      actorUserId: user.id,
      action: "workspace.auto_provisioned",
      entityType: "Workspace",
      entityId: workspace.id,
      metadata: { source: "stripe_webhook", plan, stripeCustomerId: stripeCustomerId ?? null, clerkUserId },
    },
  }).catch(() => {});

  return { user, workspace, created: true };
}

// Called from Stripe webhook after subscription upsert
export async function provisionWorkspaceForSubscription(sub: {
  clerkUserId?: string | null;
  stripeCustomerId: string;
  plan: SubscriptionPlan | string;
}) {
  if (!sub.clerkUserId) return null;
  try {
    // try to get email from User table
    const existingUser = await prisma.user.findUnique({ where: { clerkUserId: sub.clerkUserId } });
    return await ensureWorkspaceForClerkUser({
      clerkUserId: sub.clerkUserId,
      email: existingUser?.email ?? null,
      name: existingUser?.name ?? null,
      plan: sub.plan,
      stripeCustomerId: sub.stripeCustomerId,
    });
  } catch (e) {
    console.error("[FolioFrame provision] failed", e);
    return null;
  }
}
