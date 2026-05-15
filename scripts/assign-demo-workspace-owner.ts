import { config as loadEnv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { assertSafeToMigrate, getRedactedDatabaseUrlInfo } from "../lib/live/databaseSafety.ts";
import { getDevOwnerEmail } from "../lib/live/devOwnerEmail.ts";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const ownerEmail = getDevOwnerEmail();

  console.log("FolioFrame demo workspace owner assignment");

  if (!ownerEmail) {
    console.log(
      "Skipped: set DEV_OWNER_EMAIL or a non-placeholder ADMIN_EMAIL in ignored local env after signing in with Clerk.",
    );
    return;
  }

  const databaseInfo = getRedactedDatabaseUrlInfo();
  console.log(`DATABASE_URL status: ${databaseInfo.present ? "present" : "missing"}`);
  console.log(`Connection summary: ${databaseInfo.safeSummary}`);

  try {
    assertSafeToMigrate();
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Database URL safety check failed.",
    );
    process.exitCode = 1;
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? "",
    }),
    log: ["warn", "error"],
  });

  try {
    const [user, workspace] = await Promise.all([
      prisma.user.findUnique({
        where: {
          email: ownerEmail,
        },
      }),
      prisma.workspace.findUnique({
        where: {
          slug: "demo-folioframe-workspace",
        },
      }),
    ]);

    if (!user) {
      console.log(
        "Skipped: no FolioFrame User exists for DEV_OWNER_EMAIL yet. Sign in locally with Clerk first.",
      );
      return;
    }

    if (!workspace) {
      console.log("Skipped: demo FolioFrame workspace was not found. Run the seed first.");
      return;
    }

    await prisma.workspaceMember.upsert({
      where: {
        workspaceId_userId: {
          workspaceId: workspace.id,
          userId: user.id,
        },
      },
      update: {
        role: "OWNER",
        status: "ACTIVE",
        joinedAt: new Date(),
      },
      create: {
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
        action: "workspace.demo_owner_assigned",
        entityType: "WorkspaceMember",
        entityId: workspace.id,
        metadata: {
          source: "scripts/assign-demo-workspace-owner.ts",
          demoOnly: true,
        },
      },
    });

    console.log("Assigned local development owner to the demo workspace.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
