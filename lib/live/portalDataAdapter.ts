import {
  buyerJourneySteps,
  dashboardMetrics,
  ownerActions,
  productTierMatrix,
} from "../../content/folioframeDemoData.ts";
import { getAuthMode } from "../auth/authMode.ts";
import { isDatabaseConfigured } from "./isDatabaseConfigured.ts";

type PortalDataSource =
  | "static-demo"
  | "auth-required"
  | "workspace-required"
  | "database";

type AdapterWorkspaceContext =
  | {
      status:
        | "auth-disabled"
        | "unauthenticated"
        | "database-unavailable"
        | "user-required"
        | "workspace-required";
      publicMessage: string;
      reason: string;
      workspace: null;
      membership: null;
    }
  | {
      status: "ready";
      publicMessage: string;
      reason: string;
      workspace: {
        id: string;
        name: string;
        slug: string;
        plan: string;
        status: string;
      };
      membership: {
        role: string;
        status: string;
      };
    };

type PortalWorkspaceSnapshotOptions = {
  workspaceContext?: AdapterWorkspaceContext;
};

export type PortalWorkspaceSnapshot = {
  source: PortalDataSource;
  isLiveReady: boolean;
  authMode: "disabled-dev" | "clerk";
  authConfigured: boolean;
  databaseConfigured: boolean;
  workspaceContextStatus:
    | "auth-disabled"
    | "unauthenticated"
    | "database-unavailable"
    | "user-required"
    | "workspace-required"
    | "ready"
    | "static-demo";
  guidance: string;
  signInHref?: string;
  workspace?: {
    id: string;
    name: string;
    slug: string;
    plan: string;
    status: string;
  };
  products: {
    id: string;
    name: string;
    slug: string;
    status: string;
    clientName?: string;
    tierCount: number;
  }[];
  productTiers: {
    id: string;
    productId: string;
    productName: string;
    name: string;
    accessRule: string;
    deliveryPath?: string;
    reviewState: string;
    sortOrder: number;
  }[];
  auditLogs: {
    id: string;
    action: string;
    entityType: string;
    entityId?: string;
    actorEmail?: string;
    createdAt: string;
  }[];
  dashboardMetrics: {
    label: string;
    value: string;
    trend?: string;
    note?: string;
  }[];
  buyerJourneySteps: readonly (typeof buyerJourneySteps)[number][];
  ownerActions: readonly (typeof ownerActions)[number][];
  warnings: string[];
};

function createStaticProducts() {
  const productNames = Array.from(new Set(productTierMatrix.map((item) => item.product)));

  return productNames.map((product, index) => ({
    id: `static-product-${index + 1}`,
    name: product,
    slug: product.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    status: "STATIC_DEMO",
    clientName: "Static demo workspace",
    tierCount: productTierMatrix.filter((item) => item.product === product).length,
  }));
}

function createStaticProductTiers() {
  return productTierMatrix.map((tier, index) => ({
    id: `static-tier-${index + 1}`,
    productId: `static-product-${index + 1}`,
    productName: tier.product,
    name: tier.tier,
    accessRule: tier.accessRule,
    deliveryPath: tier.deliveryPath,
    reviewState: tier.reviewState,
    sortOrder: index + 1,
  }));
}

export function createStaticPortalWorkspaceSnapshot(
  warnings: string[] = [],
): PortalWorkspaceSnapshot {
  const authMode = getAuthMode();
  const databaseConfigured = isDatabaseConfigured();

  return {
    source: "static-demo",
    isLiveReady: false,
    authMode: authMode.mode,
    authConfigured: authMode.configured,
    databaseConfigured,
    workspaceContextStatus: authMode.configured ? "database-unavailable" : "auth-disabled",
    guidance: authMode.configured
      ? "Database-backed workspace data is not available, so the portal is showing static demo data."
      : "Auth is not configured; portal is showing static demo data.",
    workspace: {
      id: "static-demo-workspace",
      name: "Static Demo Workspace",
      slug: "static-demo-workspace",
      plan: "STATIC_DEMO",
      status: "DEMO_ONLY",
    },
    products: createStaticProducts(),
    productTiers: createStaticProductTiers(),
    auditLogs: [],
    dashboardMetrics: [...dashboardMetrics],
    buyerJourneySteps,
    ownerActions,
    warnings,
  };
}

function createAccessRequiredSnapshot({
  source,
  contextStatus,
  guidance,
  warnings,
}: {
  source: "auth-required" | "workspace-required";
  contextStatus: "unauthenticated" | "workspace-required" | "user-required";
  guidance: string;
  warnings: string[];
}): PortalWorkspaceSnapshot {
  const authMode = getAuthMode();

  return {
    source,
    isLiveReady: false,
    authMode: authMode.mode,
    authConfigured: authMode.configured,
    databaseConfigured: isDatabaseConfigured(),
    workspaceContextStatus: contextStatus,
    guidance,
    signInHref: source === "auth-required" ? "/sign-in" : undefined,
    products: [],
    productTiers: [],
    auditLogs: [],
    dashboardMetrics: [],
    buyerJourneySteps: [],
    ownerActions: [],
    warnings,
  };
}

async function resolveWorkspaceContext(
  options: PortalWorkspaceSnapshotOptions,
): Promise<AdapterWorkspaceContext> {
  if (options.workspaceContext) {
    return options.workspaceContext;
  }

  const { getCurrentWorkspaceContext } = await import("../auth/currentWorkspace");

  return getCurrentWorkspaceContext();
}

export async function getPortalWorkspaceSnapshot(
  options: PortalWorkspaceSnapshotOptions = {},
): Promise<PortalWorkspaceSnapshot> {
  const databaseReady = isDatabaseConfigured();
  const authMode = getAuthMode();

  if (!authMode.configured) {
    return createStaticPortalWorkspaceSnapshot([
      "Auth is not configured; portal is showing static demo data.",
      !databaseReady ? "Database is not configured; static demo fallback is active." : "",
    ].filter(Boolean));
  }

  try {
    const workspaceContext = await resolveWorkspaceContext(options);

    if (workspaceContext.status === "unauthenticated") {
      return createAccessRequiredSnapshot({
        source: "auth-required",
        contextStatus: "unauthenticated",
        guidance: "Sign in with Clerk to load a FolioFrame workspace.",
        warnings: ["Auth is configured, but no signed-in Clerk session was found."],
      });
    }

    if (
      workspaceContext.status === "workspace-required" ||
      workspaceContext.status === "user-required"
    ) {
      return createAccessRequiredSnapshot({
        source: "workspace-required",
        contextStatus: workspaceContext.status,
        guidance:
          "A signed-in user needs an active FolioFrame WorkspaceMember record before workspace data can be shown.",
        warnings: [workspaceContext.publicMessage],
      });
    }

    if (!databaseReady || workspaceContext.status === "database-unavailable") {
      return createStaticPortalWorkspaceSnapshot([
        workspaceContext.publicMessage,
        "Database-backed workspace data is not available; static demo fallback is active.",
      ]);
    }

    if (workspaceContext.status !== "ready") {
      return createStaticPortalWorkspaceSnapshot([
        workspaceContext.publicMessage,
        "Workspace context is not ready; static demo fallback is active.",
      ]);
    }

    const [
      { listProductsForWorkspace, listProductTiersForWorkspace },
      { listAuditLogsForWorkspace },
    ] = await Promise.all([
      import("../services/productService"),
      import("../services/auditLogService"),
    ]);

    const workspace = workspaceContext.workspace;

    const [products, productTiers, auditLogs] = await Promise.all([
      listProductsForWorkspace(workspace.id),
      listProductTiersForWorkspace(workspace.id),
      listAuditLogsForWorkspace(workspace.id),
    ]);

    return {
      source: "database",
      isLiveReady: true,
      authMode: authMode.mode,
      authConfigured: authMode.configured,
      databaseConfigured: true,
      workspaceContextStatus: "ready",
      guidance:
        "Workspace, product, tier and audit records are loaded from the authenticated workspace.",
      workspace: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        plan: workspace.plan,
        status: workspace.status,
      },
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        status: product.status,
        clientName: product.client?.name,
        tierCount: product.tiers.length,
      })),
      productTiers: productTiers.map((tier) => ({
        id: tier.id,
        productId: tier.productId,
        productName: tier.product.name,
        name: tier.name,
        accessRule: tier.accessRule,
        deliveryPath: tier.deliveryPath ?? undefined,
        reviewState: tier.reviewState,
        sortOrder: tier.sortOrder,
      })),
      auditLogs: auditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        entityType: log.entityType,
        entityId: log.entityId ?? undefined,
        actorEmail: log.actorUser?.email,
        createdAt: log.createdAt.toISOString(),
      })),
      dashboardMetrics: [
        {
          label: "Workspace",
          value: workspace.name,
          trend: "Database",
          note: "Loaded from the current authenticated workspace record.",
        },
        {
          label: "Products",
          value: String(products.length),
          trend: "Database",
          note: "Workspace-scoped product records.",
        },
        {
          label: "Product tiers",
          value: String(productTiers.length),
          trend: "Database",
          note: "Workspace-scoped tier and access rule records.",
        },
        {
          label: "Audit logs",
          value: String(auditLogs.length),
          trend: "Database",
          note: "Most recent workspace audit records.",
        },
      ],
      buyerJourneySteps,
      ownerActions,
      warnings: [
        products.length === 0 ? "No products were found for this workspace." : "",
        productTiers.length === 0 ? "No product tiers were found for this workspace." : "",
        "Buyer journey and owner action records still use static demo content until later workspace modules are migrated.",
      ].filter(Boolean),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";

    return createStaticPortalWorkspaceSnapshot([
      `Database-backed workspace data could not be loaded; static demo fallback is active. ${message}`,
    ]);
  }
}
