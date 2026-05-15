import "server-only";

import {
  assertSafeToMigrate,
  getRedactedDatabaseUrlInfo,
  isProbablyProductionDatabaseUrl,
} from "@/lib/live/databaseSafety";
import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import {
  createDatabaseVerificationSummaryFallback,
  type DatabaseVerificationSummary,
} from "@/lib/live/databaseVerificationSummary";

async function getPrisma() {
  const { prisma } = await import("@/lib/db");
  return prisma;
}

export async function verifyDatabaseConnection() {
  if (!isDatabaseConfigured()) {
    return {
      canConnect: false,
      warnings: ["DATABASE_URL is not configured; connection verification skipped."],
    };
  }

  if (isProbablyProductionDatabaseUrl()) {
    const info = getRedactedDatabaseUrlInfo();

    return {
      canConnect: false,
      warnings: [
        `Database verification blocked for a production-like URL (${info.safeSummary}).`,
      ],
    };
  }

  try {
    assertSafeToMigrate();
    const prisma = await getPrisma();
    await prisma.$queryRaw`SELECT 1`;

    return {
      canConnect: true,
      warnings: [] as string[],
    };
  } catch (error) {
    return {
      canConnect: false,
      warnings: [
        error instanceof Error
          ? error.message
          : "Database connection verification failed.",
      ],
    };
  }
}

export async function verifySeededWorkspace() {
  if (!isDatabaseConfigured() || isProbablyProductionDatabaseUrl()) {
    return {
      seededWorkspaceFound: false,
      warnings: ["Seeded workspace verification skipped."],
    };
  }

  try {
    const prisma = await getPrisma();
    const workspace = await prisma.workspace.findUnique({
      where: {
        slug: "demo-folioframe-workspace",
      },
      include: {
        products: {
          include: {
            tiers: true,
          },
        },
        auditLogs: true,
      },
    });

    return {
      seededWorkspaceFound: Boolean(workspace),
      warnings: workspace ? [] : ["Fictional demo workspace seed was not found."],
    };
  } catch (error) {
    return {
      seededWorkspaceFound: false,
      warnings: [
        error instanceof Error
          ? error.message
          : "Seeded workspace verification failed.",
      ],
    };
  }
}

export async function getDatabaseVerificationSummary(): Promise<DatabaseVerificationSummary> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return createDatabaseVerificationSummaryFallback([
      "Database verification skipped during production build; runtime verification remains available.",
    ]);
  }

  if (!isDatabaseConfigured()) {
    return createDatabaseVerificationSummaryFallback();
  }

  if (isProbablyProductionDatabaseUrl()) {
    const info = getRedactedDatabaseUrlInfo();

    return createDatabaseVerificationSummaryFallback([
      `Database verification blocked for a production-like URL (${info.safeSummary}).`,
    ]);
  }

  const connection = await verifyDatabaseConnection();

  if (!connection.canConnect) {
    return {
      ...createDatabaseVerificationSummaryFallback(connection.warnings),
      databaseConfigured: true,
    };
  }

  try {
    const prisma = await getPrisma();
    const [
      workspaceCount,
      productCount,
      productTierCount,
      auditLogCount,
      seededWorkspace,
    ] = await Promise.all([
      prisma.workspace.count(),
      prisma.product.count(),
      prisma.productTier.count(),
      prisma.auditLog.count(),
      prisma.workspace.findUnique({
        where: {
          slug: "demo-folioframe-workspace",
        },
      }),
    ]);

    const warnings = [
      ...connection.warnings,
      seededWorkspace ? "" : "Fictional demo workspace seed was not found.",
    ].filter(Boolean);

    return {
      databaseConfigured: true,
      canConnect: true,
      migrationLikelyApplied: true,
      seededWorkspaceFound: Boolean(seededWorkspace),
      workspaceCount,
      productCount,
      productTierCount,
      auditLogCount,
      warnings,
    };
  } catch (error) {
    return {
      databaseConfigured: true,
      canConnect: true,
      migrationLikelyApplied: false,
      seededWorkspaceFound: false,
      workspaceCount: 0,
      productCount: 0,
      productTierCount: 0,
      auditLogCount: 0,
      warnings: [
        error instanceof Error
          ? error.message
          : "Database tables could not be verified.",
      ],
    };
  }
}
