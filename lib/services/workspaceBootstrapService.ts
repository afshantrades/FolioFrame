import "server-only";

import type { Prisma, User, Workspace, WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentWorkspaceContext } from "@/lib/auth/currentWorkspace";
import { getOrCreateCurrentUserRecord } from "@/lib/auth/currentUser";
import { isDatabaseConfigured } from "@/lib/live/isDatabaseConfigured";
import {
  getWorkspaceBootstrapEligibility,
  type WorkspaceBootstrapContextStatus,
} from "./workspaceBootstrapEligibility";

type WorkspaceBootstrapResult =
  | {
      status:
        | "auth-disabled"
        | "unauthenticated"
        | "database-unavailable"
        | "user-required"
        | "workspace-required"
        | "already-has-workspace";
      ok: false;
      message: string;
      workspace?: Workspace;
    }
  | {
      status: "created" | "ready";
      ok: true;
      message: string;
      workspace: Workspace;
    };

type CreateWorkspaceInput = {
  name?: string;
  slug?: string;
  includeDemoStructure?: boolean;
};

const defaultOwnerActions = [
  {
    action: "Approve demo entitlement rules",
    module: "EntitlementFrame",
    priority: "High",
    dueState: "Before production wiring",
  },
  {
    action: "Confirm support recovery language",
    module: "AccessHub",
    priority: "Medium",
    dueState: "Before live support routing",
  },
  {
    action: "Review DeliveryProof evidence packet",
    module: "DeliveryProof",
    priority: "Medium",
    dueState: "Before client handover",
  },
];

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return slug || "folioframe-workspace";
}

function workspaceSlugForUser(user: User, providedSlug?: string) {
  if (providedSlug) {
    return slugify(providedSlug);
  }

  const emailPrefix = user.email.split("@")[0] ?? "owner";
  return `${slugify(emailPrefix)}-folioframe-workspace`;
}

export async function createWorkspaceAuditEntry({
  workspaceId,
  actorUserId,
  action,
  entityType,
  entityId,
  metadata,
}: {
  workspaceId?: string;
  actorUserId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return prisma.auditLog.create({
    data: {
      workspaceId,
      actorUserId,
      action,
      entityType,
      entityId,
      metadata,
    },
  });
}

export async function createDefaultWorkspaceProducts(workspaceId: string) {
  const client = await prisma.client.upsert({
    where: {
      id: `${workspaceId}_demo_client`,
    },
    update: {
      name: "Demo Workspace Client",
      status: "ACTIVE",
      primaryContactName: "Demo Owner",
      primaryContactEmail: "demo-owner@example.com",
      notes: "Fictional client record created by workspace onboarding.",
    },
    create: {
      id: `${workspaceId}_demo_client`,
      workspaceId,
      name: "Demo Workspace Client",
      status: "ACTIVE",
      primaryContactName: "Demo Owner",
      primaryContactEmail: "demo-owner@example.com",
      notes: "Fictional client record created by workspace onboarding.",
    },
  });

  const signatureProduct = await prisma.product.upsert({
    where: {
      workspaceId_slug: {
        workspaceId,
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
      workspaceId,
      clientId: client.id,
      name: "Signature Launch Demo",
      slug: "signature-launch-demo",
      status: "ACTIVE",
      supportRoute: "Demo AccessHub route",
    },
  });

  const libraryProduct = await prisma.product.upsert({
    where: {
      workspaceId_slug: {
        workspaceId,
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
      workspaceId,
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
          productId: signatureProduct.id,
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
        productId: signatureProduct.id,
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
          productId: libraryProduct.id,
          name: "Standard",
        },
      },
      update: {
        workspaceId,
        accessRule: "Mapped standard member access rule",
        deliveryPath: "Demo welcome email and portal access path",
        reviewState: "OWNER_ACTION",
        sortOrder: 1,
      },
      create: {
        workspaceId,
        productId: libraryProduct.id,
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
          productId: libraryProduct.id,
          name: "VIP",
        },
      },
      update: {
        workspaceId,
        accessRule: "Mapped VIP access rule with manual review fallback",
        deliveryPath: "Demo welcome email, portal path and support handoff",
        reviewState: "NOT_REVIEWED",
        sortOrder: 2,
      },
      create: {
        workspaceId,
        productId: libraryProduct.id,
        name: "VIP",
        accessRule: "Mapped VIP access rule with manual review fallback",
        deliveryPath: "Demo welcome email, portal path and support handoff",
        reviewState: "NOT_REVIEWED",
        sortOrder: 2,
      },
    }),
  ]);

  return {
    client,
    products: [signatureProduct, libraryProduct],
  };
}

export async function createDefaultOwnerActions(
  workspaceId: string,
  actorUserId?: string,
) {
  return Promise.all(
    defaultOwnerActions.map((ownerAction, index) =>
      createWorkspaceAuditEntry({
        workspaceId,
        actorUserId,
        action: "owner_action.created",
        entityType: "OwnerAction",
        entityId: `${workspaceId}_owner_action_${index + 1}`,
        metadata: {
          ...ownerAction,
          demoOnly: true,
        },
      }),
    ),
  );
}

export async function createWorkspaceForCurrentUser(
  input: CreateWorkspaceInput = {},
): Promise<WorkspaceBootstrapResult> {
  if (!isDatabaseConfigured()) {
    return {
      status: "database-unavailable",
      ok: false,
      message: "Database is not configured; workspace setup cannot run.",
    };
  }

  const context = await getCurrentWorkspaceContext();
  const eligibility = getWorkspaceBootstrapEligibility(
    context.status as WorkspaceBootstrapContextStatus,
  );

  if (!eligibility.canCreate) {
    if (context.status === "ready") {
      return {
        status: "already-has-workspace",
        ok: false,
        message: eligibility.reason,
        workspace: context.workspace,
      };
    }

    return {
      status: context.status,
      ok: false,
      message: eligibility.reason,
    };
  }

  const userResult = await getOrCreateCurrentUserRecord();

  if (userResult.status !== "ready") {
    return {
      status: "user-required",
      ok: false,
      message: userResult.publicMessage,
    };
  }

  const slug = workspaceSlugForUser(userResult.user, input.slug);

  const workspace = await prisma.workspace.create({
    data: {
      name: input.name ?? "FolioFrame Demo Workspace",
      slug,
      status: "ACTIVE",
      plan: "PREMIUM",
      members: {
        create: {
          userId: userResult.user.id,
          role: "OWNER" satisfies WorkspaceRole,
          status: "ACTIVE",
          joinedAt: new Date(),
        },
      },
    },
  });

  if (input.includeDemoStructure ?? true) {
    await createDefaultWorkspaceProducts(workspace.id);
    await createDefaultOwnerActions(workspace.id, userResult.user.id);
  }

  await createWorkspaceAuditEntry({
    workspaceId: workspace.id,
    actorUserId: userResult.user.id,
    action: "workspace.created",
    entityType: "Workspace",
    entityId: workspace.id,
    metadata: {
      source: "workspace-onboarding",
      demoOnly: true,
    },
  });

  return {
    status: "created",
    ok: true,
    message: "Fictional FolioFrame demo workspace created.",
    workspace,
  };
}

export async function createDemoWorkspaceForCurrentUser() {
  return createWorkspaceForCurrentUser({
    name: "FolioFrame Demo Workspace",
    includeDemoStructure: true,
  });
}

export async function ensureWorkspaceForCurrentUser(): Promise<WorkspaceBootstrapResult> {
  const context = await getCurrentWorkspaceContext();

  if (context.status === "ready") {
    return {
      status: "ready",
      ok: true,
      message: "Existing workspace membership found.",
      workspace: context.workspace,
    };
  }

  return createDemoWorkspaceForCurrentUser();
}
