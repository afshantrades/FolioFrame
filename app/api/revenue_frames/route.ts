import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateCurrentUserRecord } from "@/lib/auth/currentUser";
import { z } from "zod";

const RevenueFrameInput = z.object({
  name: z.string().min(2).max(120),
  offer_price: z.number().int().min(0).nullable().optional(),
  currency: z.string().default("GBP"),
  positioning: z.string().max(2000).nullable().optional(),
  funnel_stage: z.enum(["foliofix", "pro", "signature"]).optional().default("pro"),
  close_rate: z.number().min(0).max(100).nullable().optional(),
  workspaceId: z.string().optional(),
});

export async function GET() {
  const userRes = await getOrCreateCurrentUserRecord();
  if (userRes.status !== "ready") {
    return NextResponse.json({ error: userRes.publicMessage }, { status: 401 });
  }
  // find first workspace
  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: userRes.user.id },
    include: { workspace: true },
  });
  if (!membership) return NextResponse.json({ items: [] });
  // RevenueFrame data lives in Product + ProductTier today – expose via Product for now
  // For SaaS Live pilot we map RevenueFrame -> Product
  const products = await prisma.product.findMany({
    where: { workspaceId: membership.workspaceId },
    orderBy: { updatedAt: "desc" },
    take: 50,
    include: { tiers: true },
  });
  return NextResponse.json({ items: products, workspace: membership.workspace });
}

export async function POST(req: Request) {
  const userRes = await getOrCreateCurrentUserRecord();
  if (userRes.status !== "ready") {
    return NextResponse.json({ error: userRes.publicMessage }, { status: 401 });
  }
  const json = await req.json();
  const parsed = RevenueFrameInput.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // resolve workspace
  let workspaceId = data.workspaceId;
  if (!workspaceId) {
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId: userRes.user.id },
      orderBy: { createdAt: "asc" },
    });
    if (!membership) {
      return NextResponse.json({ error: "No workspace – complete onboarding first" }, { status: 400 });
    }
    workspaceId = membership.workspaceId;
  }

  // Create Product as RevenueFrame backing store – matches existing FolioFrame schema
  const slugBase = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "revenue-frame";
  let slug = slugBase;
  let i = 1;
  while (await prisma.product.findUnique({ where: { workspaceId_slug: { workspaceId, slug } } }).catch(() => null)) {
    slug = `${slugBase}-${i++}`;
    if (i > 30) { slug = `${slugBase}-${Date.now().toString(36)}`; break; }
  }

  const product = await prisma.product.create({
    data: {
      workspaceId,
      name: data.name,
      slug,
      status: "ACTIVE",
      // checkoutUrl left null – Stripe Product link can be added later
    },
  });

  // Create initial tier representing the offer price / funnel stage
  if (data.offer_price || data.positioning) {
    await prisma.productTier.create({
      data: {
        workspaceId,
        productId: product.id,
        name: data.funnel_stage ?? "pro",
        accessRule: data.positioning ?? "FolioFrame pilot – RevenueFrame",
        deliveryPath: "foliofix -> signature_launch",
        reviewState: "READY",
        sortOrder: 0,
        externalPriceId: null,
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      workspaceId,
      actorUserId: userRes.user.id,
      action: "revenue_frame.created",
      entityType: "Product",
      entityId: product.id,
      metadata: { name: data.name, offer_price: data.offer_price, funnel_stage: data.funnel_stage, source: "saas_live_api" },
    },
  }).catch(() => {});

  return NextResponse.json({ ok: true, product }, { status: 201 });
}
