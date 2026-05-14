import "server-only";

import type { Prisma } from "@prisma/client";

import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import { prisma } from "@/lib/db";

type CreateAuditLogInput = {
  workspaceId?: string;
  actorUserId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
};

export async function createAuditLog(input: CreateAuditLogInput) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return prisma.auditLog.create({
    data: {
      workspaceId: input.workspaceId,
      actorUserId: input.actorUserId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata,
    },
  });
}

export async function listAuditLogsForWorkspace(workspaceId: string) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return prisma.auditLog.findMany({
    where: { workspaceId },
    include: {
      actorUser: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });
}
