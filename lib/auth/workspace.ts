import "server-only";

import type { WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUserRecord } from "./currentUser";

export async function getWorkspaceMembership(workspaceId: string) {
  const user = await getCurrentUserRecord();

  if (!user) {
    return null;
  }

  return prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: user.id,
      },
    },
    include: {
      workspace: true,
      user: true,
    },
  });
}

export async function requireWorkspaceRole(
  workspaceId: string,
  allowedRoles: WorkspaceRole[],
) {
  const membership = await getWorkspaceMembership(workspaceId);

  if (!membership || membership.status !== "ACTIVE") {
    throw new Error("Active FolioFrame workspace membership is required.");
  }

  if (!allowedRoles.includes(membership.role)) {
    throw new Error("The current FolioFrame user does not have the required workspace role.");
  }

  return membership;
}
