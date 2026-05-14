import "server-only";

import type { WorkspacePlan, WorkspaceRole } from "@prisma/client";

import { getCurrentUserRecord } from "@/lib/auth/currentUser";
import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import { prisma } from "@/lib/db";

type CreateWorkspaceInput = {
  name: string;
  slug: string;
  plan?: WorkspacePlan;
};

export async function getWorkspaceBySlug(slug: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return prisma.workspace.findUnique({
    where: { slug },
    include: {
      members: true,
      clients: true,
      products: {
        include: {
          tiers: true,
        },
      },
    },
  });
}

export async function listWorkspacesForUser(userId: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
          status: "ACTIVE",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getWorkspaceForCurrentUser(slug?: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const user = await getCurrentUserRecord();

  if (!user) {
    return null;
  }

  if (slug) {
    return prisma.workspace.findFirst({
      where: {
        slug,
        members: {
          some: {
            userId: user.id,
            status: "ACTIVE",
          },
        },
      },
    });
  }

  return prisma.workspace.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
          status: "ACTIVE",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createWorkspaceForUser(
  userId: string,
  input: CreateWorkspaceInput,
) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return prisma.workspace.create({
    data: {
      name: input.name,
      slug: input.slug,
      plan: input.plan ?? "SERVICE",
      members: {
        create: {
          userId,
          role: "OWNER",
          status: "ACTIVE",
          joinedAt: new Date(),
        },
      },
      auditLogs: {
        create: {
          actorUserId: userId,
          action: "workspace.created",
          entityType: "Workspace",
        },
      },
    },
  });
}

export async function getWorkspaceMembers(workspaceId: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: true,
      invitedBy: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function ensureWorkspaceAccess(
  workspaceId: string,
  userId: string,
  allowedRoles?: WorkspaceRole[],
) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    include: {
      workspace: true,
      user: true,
    },
  });

  if (!membership || membership.status !== "ACTIVE") {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(membership.role)) {
    return null;
  }

  return membership;
}
