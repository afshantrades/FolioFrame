import "server-only";

import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import { prisma } from "@/lib/db";

export async function listProductsForWorkspace(workspaceId: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return prisma.product.findMany({
    where: { workspaceId },
    include: {
      client: true,
      tiers: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function listProductTiersForWorkspace(workspaceId: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return prisma.productTier.findMany({
    where: { workspaceId },
    include: {
      product: true,
    },
    orderBy: [{ product: { name: "asc" } }, { sortOrder: "asc" }],
  });
}

export async function getProductWithTiers(workspaceId: string, productSlug: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return prisma.product.findUnique({
    where: {
      workspaceId_slug: {
        workspaceId,
        slug: productSlug,
      },
    },
    include: {
      client: true,
      tiers: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export async function createDemoProductStructure(workspaceId: string, clientId?: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const signatureSystem = await prisma.product.upsert({
    where: {
      workspaceId_slug: {
        workspaceId,
        slug: "signature-launch-demo",
      },
    },
    update: {
      name: "Signature Launch Demo",
      status: "ACTIVE",
      clientId,
      supportRoute: "Demo AccessHub route",
    },
    create: {
      workspaceId,
      clientId,
      name: "Signature Launch Demo",
      slug: "signature-launch-demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessHub route",
    },
  });

  await prisma.productTier.upsert({
    where: {
      productId_name: {
        productId: signatureSystem.id,
        name: "Premium",
      },
    },
    update: {
      workspaceId,
      accessRule: "Owner-approved premium access lifecycle rule",
      deliveryPath: "Mapped delivery route with documented fallback",
      reviewState: "READY",
      sortOrder: 1,
    },
    create: {
      workspaceId,
      productId: signatureSystem.id,
      name: "Premium",
      accessRule: "Owner-approved premium access lifecycle rule",
      deliveryPath: "Mapped delivery route with documented fallback",
      reviewState: "READY",
      sortOrder: 1,
    },
  });

  return listProductsForWorkspace(workspaceId);
}
