import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import {
  assertSafeToMigrate,
  getRedactedDatabaseUrlInfo,
} from "../lib/live/databaseSafety.ts";

async function main() {
  const info = getRedactedDatabaseUrlInfo();

  console.log("FolioFrame database foundation verification");
  console.log(`DATABASE_URL status: ${info.present ? "present" : "missing"}`);
  console.log(`Connection summary: ${info.safeSummary}`);

  if (!info.present) {
    console.log("Verification skipped: DATABASE_URL is not configured.");
    console.log("Static fallback remains active.");
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? "",
    }),
    log: ["warn", "error"],
  });

  try {
    assertSafeToMigrate();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connection: ok");
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Database URL or connection verification failed.",
    );
    process.exitCode = 1;
    await prisma.$disconnect();
    return;
  }

  try {
    const [userCount, workspaceCount, productCount, productTierCount, auditLogCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.workspace.count(),
        prisma.product.count(),
        prisma.productTier.count(),
        prisma.auditLog.count(),
      ]);

    const seededWorkspace = await prisma.workspace.findUnique({
      where: {
        slug: "demo-folioframe-workspace",
      },
    });

    console.log(`Users: ${userCount}`);
    console.log(`Workspaces: ${workspaceCount}`);
    console.log(`Products: ${productCount}`);
    console.log(`Product tiers: ${productTierCount}`);
    console.log(`Audit logs: ${auditLogCount}`);
    console.log(`Seeded workspace found: ${seededWorkspace ? "yes" : "no"}`);

    if (!seededWorkspace) {
      console.error("Verification failed: fictional demo workspace seed was not found.");
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(
      error instanceof Error
        ? `Verification failed: ${error.message}`
        : "Verification failed while reading database counts.",
    );
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
