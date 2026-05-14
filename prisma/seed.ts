import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const databasePlaceholderMarkers = [
  "placeholder",
  "example",
  "user:password",
  "johndoe",
  "randompassword",
  "mydb",
];

function isSeedDatabaseConfigured() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return false;
  }

  const normalized = databaseUrl.toLowerCase();

  if (
    databasePlaceholderMarkers.some((marker) =>
      normalized.includes(marker.toLowerCase()),
    )
  ) {
    return false;
  }

  return normalized.startsWith("postgresql://") || normalized.startsWith("postgres://");
}

async function main() {
  if (!isSeedDatabaseConfigured()) {
    console.log(
      "Seed skipped: DATABASE_URL is missing or still uses placeholder values.",
    );
    return;
  }

  const owner = await prisma.user.upsert({
    where: { email: "demo-owner@example.com" },
    update: {
      clerkUserId: "demo_clerk_user_placeholder",
      name: "Demo Owner",
      status: "ACTIVE",
    },
    create: {
      id: "demo_user_owner",
      clerkUserId: "demo_clerk_user_placeholder",
      email: "demo-owner@example.com",
      name: "Demo Owner",
      status: "ACTIVE",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo-folioframe-workspace" },
    update: {
      name: "Demo FolioFrame Workspace",
      status: "ACTIVE",
      plan: "PREMIUM",
    },
    create: {
      id: "demo_workspace_folioframe",
      name: "Demo FolioFrame Workspace",
      slug: "demo-folioframe-workspace",
      status: "ACTIVE",
      plan: "PREMIUM",
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: owner.id,
      },
    },
    update: {
      role: "OWNER",
      status: "ACTIVE",
      joinedAt: new Date("2026-01-01T09:00:00.000Z"),
    },
    create: {
      id: "demo_workspace_member_owner",
      workspaceId: workspace.id,
      userId: owner.id,
      role: "OWNER",
      status: "ACTIVE",
      joinedAt: new Date("2026-01-01T09:00:00.000Z"),
    },
  });

  const client = await prisma.client.upsert({
    where: { id: "demo_client_studio" },
    update: {
      workspaceId: workspace.id,
      name: "Demo Digital Studio",
      status: "ACTIVE",
      primaryContactName: "Demo Client Lead",
      primaryContactEmail: "demo-client@example.com",
      notes: "Fictional demo client for local FolioFrame development only.",
    },
    create: {
      id: "demo_client_studio",
      workspaceId: workspace.id,
      name: "Demo Digital Studio",
      status: "ACTIVE",
      primaryContactName: "Demo Client Lead",
      primaryContactEmail: "demo-client@example.com",
      notes: "Fictional demo client for local FolioFrame development only.",
    },
  });

  const launchProduct = await prisma.product.upsert({
    where: {
      workspaceId_slug: {
        workspaceId: workspace.id,
        slug: "signature-launch-demo",
      },
    },
    update: {
      clientId: client.id,
      name: "Signature Launch Demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessHub route",
    },
    create: {
      id: "demo_product_signature_launch",
      workspaceId: workspace.id,
      clientId: client.id,
      name: "Signature Launch Demo",
      slug: "signature-launch-demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessHub route",
    },
  });

  const membershipProduct = await prisma.product.upsert({
    where: {
      workspaceId_slug: {
        workspaceId: workspace.id,
        slug: "membership-library-demo",
      },
    },
    update: {
      clientId: client.id,
      name: "Membership Library Demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessDesk route",
    },
    create: {
      id: "demo_product_membership_library",
      workspaceId: workspace.id,
      clientId: client.id,
      name: "Membership Library Demo",
      slug: "membership-library-demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessDesk route",
    },
  });

  await Promise.all([
    prisma.productTier.upsert({
      where: {
        productId_name: {
          productId: launchProduct.id,
          name: "Premium",
        },
      },
      update: {
        workspaceId: workspace.id,
        accessRule: "Owner-approved premium access lifecycle rule",
        deliveryPath: "Mapped delivery route with documented fallback",
        reviewState: "READY",
        sortOrder: 1,
      },
      create: {
        id: "demo_tier_launch_premium",
        workspaceId: workspace.id,
        productId: launchProduct.id,
        name: "Premium",
        accessRule: "Owner-approved premium access lifecycle rule",
        deliveryPath: "Mapped delivery route with documented fallback",
        reviewState: "READY",
        sortOrder: 1,
      },
    }),
    prisma.productTier.upsert({
      where: {
        productId_name: {
          productId: membershipProduct.id,
          name: "Standard",
        },
      },
      update: {
        workspaceId: workspace.id,
        accessRule: "Mapped standard member access rule",
        deliveryPath: "Demo welcome email and portal access path",
        reviewState: "OWNER_ACTION",
        sortOrder: 1,
      },
      create: {
        id: "demo_tier_membership_standard",
        workspaceId: workspace.id,
        productId: membershipProduct.id,
        name: "Standard",
        accessRule: "Mapped standard member access rule",
        deliveryPath: "Demo welcome email and portal access path",
        reviewState: "OWNER_ACTION",
        sortOrder: 1,
      },
    }),
    prisma.productTier.upsert({
      where: {
        productId_name: {
          productId: membershipProduct.id,
          name: "VIP",
        },
      },
      update: {
        workspaceId: workspace.id,
        accessRule: "Mapped VIP member access rule with manual review fallback",
        deliveryPath: "Demo welcome email, portal path and support handoff",
        reviewState: "NOT_REVIEWED",
        sortOrder: 2,
      },
      create: {
        id: "demo_tier_membership_vip",
        workspaceId: workspace.id,
        productId: membershipProduct.id,
        name: "VIP",
        accessRule: "Mapped VIP member access rule with manual review fallback",
        deliveryPath: "Demo welcome email, portal path and support handoff",
        reviewState: "NOT_REVIEWED",
        sortOrder: 2,
      },
    }),
  ]);

  await Promise.all([
    prisma.auditLog.upsert({
      where: { id: "demo_audit_workspace_seeded" },
      update: {
        workspaceId: workspace.id,
        actorUserId: owner.id,
        action: "demo.workspace.seeded",
        entityType: "Workspace",
        entityId: workspace.id,
        metadata: { source: "prisma/seed.ts", demoOnly: true },
      },
      create: {
        id: "demo_audit_workspace_seeded",
        workspaceId: workspace.id,
        actorUserId: owner.id,
        action: "demo.workspace.seeded",
        entityType: "Workspace",
        entityId: workspace.id,
        metadata: { source: "prisma/seed.ts", demoOnly: true },
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "demo_audit_products_seeded" },
      update: {
        workspaceId: workspace.id,
        actorUserId: owner.id,
        action: "demo.products.seeded",
        entityType: "Product",
        metadata: { productCount: 2, tierCount: 3, demoOnly: true },
      },
      create: {
        id: "demo_audit_products_seeded",
        workspaceId: workspace.id,
        actorUserId: owner.id,
        action: "demo.products.seeded",
        entityType: "Product",
        metadata: { productCount: 2, tierCount: 3, demoOnly: true },
      },
    }),
  ]);

  console.log("FolioFrame demo workspace seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
