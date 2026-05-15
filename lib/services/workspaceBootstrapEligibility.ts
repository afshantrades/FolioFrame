export type WorkspaceBootstrapContextStatus =
  | "auth-disabled"
  | "unauthenticated"
  | "database-unavailable"
  | "user-required"
  | "workspace-required"
  | "ready";

export type WorkspaceBootstrapEligibility = {
  canCreate: boolean;
  reason: string;
};

export function getWorkspaceBootstrapEligibility(
  status: WorkspaceBootstrapContextStatus,
): WorkspaceBootstrapEligibility {
  if (status === "workspace-required") {
    return {
      canCreate: true,
      reason: "Signed-in user has no active workspace membership yet.",
    };
  }

  if (status === "ready") {
    return {
      canCreate: false,
      reason: "Duplicate workspace creation is blocked because a workspace already exists.",
    };
  }

  if (status === "auth-disabled") {
    return {
      canCreate: false,
      reason: "Clerk auth is not configured.",
    };
  }

  if (status === "unauthenticated") {
    return {
      canCreate: false,
      reason: "A signed-in Clerk user is required.",
    };
  }

  if (status === "database-unavailable") {
    return {
      canCreate: false,
      reason: "The database is not configured.",
    };
  }

  return {
    canCreate: false,
    reason: "A FolioFrame user record is required before workspace creation.",
  };
}
