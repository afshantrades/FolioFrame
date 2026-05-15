import "server-only";

import type { Workspace, WorkspaceMember, WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import {
  getOrCreateCurrentUserRecord,
  type CurrentUserRecordResult,
} from "./currentUser.ts";

type MembershipWithWorkspace = WorkspaceMember & {
  workspace: Workspace;
};

export type CurrentWorkspaceContext =
  | {
      status:
        | "auth-disabled"
        | "unauthenticated"
        | "database-unavailable"
        | "user-required"
        | "workspace-required";
      userResult: CurrentUserRecordResult;
      user: null;
      workspace: null;
      membership: null;
      role: null;
      reason: string;
      publicMessage: string;
    }
  | {
      status: "ready";
      userResult: Extract<CurrentUserRecordResult, { status: "ready" }>;
      user: Extract<CurrentUserRecordResult, { status: "ready" }>["user"];
      workspace: Workspace;
      membership: MembershipWithWorkspace;
      role: WorkspaceRole;
      reason: string;
      publicMessage: string;
    };

export async function getCurrentWorkspaceContext(
  workspaceSlug?: string,
): Promise<CurrentWorkspaceContext> {
  const userResult = await getOrCreateCurrentUserRecord();

  if (userResult.status === "auth-disabled") {
    return {
      status: "auth-disabled",
      userResult,
      user: null,
      workspace: null,
      membership: null,
      role: null,
      reason: userResult.reason,
      publicMessage: userResult.publicMessage,
    };
  }

  if (userResult.status === "unauthenticated") {
    return {
      status: "unauthenticated",
      userResult,
      user: null,
      workspace: null,
      membership: null,
      role: null,
      reason: userResult.reason,
      publicMessage: userResult.publicMessage,
    };
  }

  if (!isDatabaseConfigured() || userResult.status === "database-unavailable") {
    return {
      status: "database-unavailable",
      userResult,
      user: null,
      workspace: null,
      membership: null,
      role: null,
      reason: userResult.reason,
      publicMessage: userResult.publicMessage,
    };
  }

  if (userResult.status !== "ready") {
    return {
      status: "user-required",
      userResult,
      user: null,
      workspace: null,
      membership: null,
      role: null,
      reason: userResult.reason,
      publicMessage: userResult.publicMessage,
    };
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: userResult.user.id,
      status: "ACTIVE",
      workspace: workspaceSlug
        ? {
            slug: workspaceSlug,
          }
        : undefined,
    },
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!membership) {
    return {
      status: "workspace-required",
      userResult,
      user: null,
      workspace: null,
      membership: null,
      role: null,
      reason: "Signed-in FolioFrame user has no active workspace membership.",
      publicMessage:
        "Create or assign a WorkspaceMember record before showing workspace data.",
    };
  }

  return {
    status: "ready",
    userResult,
    user: userResult.user,
    workspace: membership.workspace,
    membership,
    role: membership.role,
    reason: "Active workspace membership found.",
    publicMessage: "Workspace context is ready.",
  };
}

export async function requireWorkspaceContext(workspaceSlug?: string) {
  const context = await getCurrentWorkspaceContext(workspaceSlug);

  if (context.status !== "ready") {
    throw new Error(context.publicMessage);
  }

  return context;
}

export async function requireWorkspaceRole(
  allowedRoles: WorkspaceRole[],
  workspaceSlug?: string,
) {
  const context = await requireWorkspaceContext(workspaceSlug);

  if (!allowedRoles.includes(context.role)) {
    throw new Error("The current FolioFrame user does not have the required workspace role.");
  }

  return context;
}
