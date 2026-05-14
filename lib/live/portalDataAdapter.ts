import {
  buyerJourneySteps,
  dashboardMetrics,
  ownerActions,
  productTierMatrix,
} from "../../content/folioframeDemoData.ts";
import { isAuthConfigured } from "../auth/isAuthConfigured.ts";
import { isDatabaseConfigured } from "./isDatabaseConfigured.ts";

type PortalDataSource = "static-demo" | "database";

export type PortalWorkspaceSnapshot = {
  source: PortalDataSource;
  isLiveReady: boolean;
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
  buyerJourneySteps: typeof buyerJourneySteps;
  ownerActions: typeof ownerActions;
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
  return {
    source: "static-demo",
    isLiveReady: false,
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

export async function getPortalWorkspaceSnapshot(): Promise<PortalWorkspaceSnapshot> {
  const databaseReady = isDatabaseConfigured();
  const authReady = isAuthConfigured();

  if (!databaseReady || !authReady) {
    return createStaticPortalWorkspaceSnapshot([
      !authReady ? "Auth is not configured; static demo fallback is active." : "",
      !databaseReady ? "Database is not configured; static demo fallback is active." : "",
    ].filter(Boolean));
  }

  try {
    const [
      { getWorkspaceForCurrentUser },
      { listProductsForWorkspace, listProductTiersForWorkspace },
      { listAuditLogsForWorkspace },
    ] = await Promise.all([
      import("../services/workspaceService"),
      import("../services/productService"),
      import("../services/auditLogService"),
    ]);

    const workspace = await getWorkspaceForCurrentUser();

    if (!workspace) {
      return createStaticPortalWorkspaceSnapshot([
        "Database and auth appear configured, but no workspace was available for the current user.",
      ]);
    }

    const [products, productTiers, auditLogs] = await Promise.all([
      listProductsForWorkspace(workspace.id),
      listProductTiersForWorkspace(workspace.id),
      listAuditLogsForWorkspace(workspace.id),
    ]);

    return {
      source: "database",
      isLiveReady: true,
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
        "Buyer journey and owner action records still use static demo content until later workspace modules are migrated.",
      ],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";

    return createStaticPortalWorkspaceSnapshot([
      `Database-backed workspace data could not be loaded; static demo fallback is active. ${message}`,
    ]);
  }
}
