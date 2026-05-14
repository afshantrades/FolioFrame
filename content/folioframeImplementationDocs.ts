export type ImplementationDocCategory =
  | "blueprint"
  | "sop"
  | "runbook"
  | "template"
  | "qa"
  | "security";

export type FolioFrameImplementationDoc = {
  slug: string;
  title: string;
  category: ImplementationDocCategory;
  summary: string;
  bestFor: string;
  staticStatus: string;
  relatedModule: string;
  keySections: readonly string[];
  safetyBoundary: string;
  filePath: string;
};

export const implementationDocCategoryLabels: Record<
  ImplementationDocCategory,
  string
> = {
  blueprint: "Blueprint",
  sop: "SOP",
  runbook: "Runbook",
  template: "Template",
  qa: "QA",
  security: "Security",
};

export const implementationDocCategoryOrder: readonly ImplementationDocCategory[] = [
  "blueprint",
  "security",
  "sop",
  "template",
  "qa",
  "runbook",
] as const;

export const folioframeImplementationDocs = [
  {
    slug: "production-integration-blueprint",
    title: "Production Integration Blueprint",
    category: "blueprint",
    summary:
      "A production architecture planning map for payment, entitlement, email, delivery, support and reporting routes.",
    bestFor:
      "Implementation scoping before any approved production connection is built.",
    staticStatus: "Planning blueprint only. Static MVP status: not live.",
    relatedModule: "EntitlementFrame",
    keySections: [
      "Stripe payment trigger route",
      "Alternative checkout route",
      "Make or Zapier automation route",
      "Email platform route",
      "File, video and buyer tracker routes",
      "AccessHub, AccessDesk, EntitlementFrame and ProofMetrics routes",
    ],
    safetyBoundary:
      "No third-party tools are connected from this static portal. Owner approval and secure credential handling are required before production implementation.",
    filePath: "docs/implementation/FOLIOFRAME_PRODUCTION_INTEGRATION_BLUEPRINT.md",
  },
  {
    slug: "environment-variables-template",
    title: "Environment Variables Template",
    category: "security",
    summary:
      "A placeholder-only environment variable checklist for future approved production setup.",
    bestFor:
      "Planning secure deployment inputs without storing real credentials in docs or source control.",
    staticStatus: "Placeholder template only. Static MVP status: not live.",
    relatedModule: "AccessSafe",
    keySections: [
      "NEXT_PUBLIC_APP_URL placeholder",
      "Stripe placeholder variables",
      "Email platform placeholder variables",
      "Automation webhook placeholder variables",
      "Buyer tracker placeholder variables",
      "Support, video and file delivery placeholder variables",
    ],
    safetyBoundary:
      "Use placeholders only. Real keys, secrets, tokens and folder ids must live only in an approved deployment environment or secret manager.",
    filePath: "docs/implementation/FOLIOFRAME_ENVIRONMENT_VARIABLES_TEMPLATE.md",
  },
  {
    slug: "webhook-event-map",
    title: "Webhook Event Map",
    category: "blueprint",
    summary:
      "A static event matrix for checkout, payment, refund, subscription, support and owner-action events.",
    bestFor:
      "Mapping event payloads to entitlement states, email actions, tracker updates and QA scenarios.",
    staticStatus: "Webhook planning map only. Static MVP status: not live.",
    relatedModule: "DeliveryProof",
    keySections: [
      "Checkout completion events",
      "Payment success and failure events",
      "Refund and subscription events",
      "Alternative checkout sale events",
      "Email delivery failure",
      "AccessHub request",
      "Manual owner action",
    ],
    safetyBoundary:
      "No webhook endpoint is active in the static MVP. Every production event route requires approval, signing checks and QA before use.",
    filePath: "docs/implementation/FOLIOFRAME_WEBHOOK_EVENT_MAP.md",
  },
  {
    slug: "client-onboarding-sop",
    title: "Client Onboarding SOP",
    category: "sop",
    summary:
      "A client intake and setup SOP for gathering tool access, product inventory, migration needs and owner approvals.",
    bestFor:
      "Starting a premium FolioFrame service engagement with clear inputs and approval checkpoints.",
    staticStatus: "Service delivery SOP only. Static MVP status: not live.",
    relatedModule: "FolioFix",
    keySections: [
      "Client intake form",
      "Required tool access",
      "Product and tier inventory",
      "Current issues",
      "Migration needs",
      "Support inbox and email platform",
      "Access lifecycle decisions",
      "Approval checkpoints",
    ],
    safetyBoundary:
      "Tool access should be requested only after scope approval through the client's approved process.",
    filePath: "docs/implementation/FOLIOFRAME_CLIENT_ONBOARDING_SOP.md",
  },
  {
    slug: "deliverypack-handover-template",
    title: "DeliveryPack Handover Template",
    category: "template",
    summary:
      "A handover packet template for system maps, checkout links, product rules, proof results and owner actions.",
    bestFor:
      "Client handover at the end of a documented implementation or launch readiness project.",
    staticStatus: "Handover template only. Static MVP status: not live.",
    relatedModule: "AccessSafe",
    keySections: [
      "System map",
      "Checkout links",
      "Product and tier matrix",
      "EntitlementFrame rules",
      "InboxGuard summary",
      "AccessDesk SOP",
      "ProofMetrics baseline",
      "Verified Delivery status",
      "Owner action list",
    ],
    safetyBoundary:
      "The template is a documentation artifact. Known limitations and owner actions must remain visible before production implementation.",
    filePath: "docs/implementation/FOLIOFRAME_DELIVERYPACK_HANDOVER_TEMPLATE.md",
  },
  {
    slug: "deliveryproof-test-plan",
    title: "DeliveryProof Test Plan",
    category: "qa",
    summary:
      "A QA scenario matrix for purchase, payment, refund, access, support, delivery email and reporting tests.",
    bestFor:
      "Testing delivery evidence and access recovery paths before handover or launch.",
    staticStatus: "QA plan only. Static MVP status: not live.",
    relatedModule: "DeliveryProof",
    keySections: [
      "Successful purchase",
      "Failed payment",
      "Duplicate purchase",
      "Wrong email",
      "Refund and cancellation manual review",
      "Upgrade and downgrade",
      "Lost access and broken link",
      "Support handoff",
      "ProofMetrics baseline",
    ],
    safetyBoundary:
      "Use sample or staging records for QA. Real buyer data should not be used in this static portal.",
    filePath: "docs/implementation/FOLIOFRAME_DELIVERYPROOF_TEST_PLAN.md",
  },
  {
    slug: "accessguard-monthly-retainer-sop",
    title: "AccessGuard Monthly Retainer SOP",
    category: "sop",
    summary:
      "A monthly care workflow for link checks, route review, support themes, exceptions and reporting.",
    bestFor:
      "Recurring service delivery after an approved production setup is in place.",
    staticStatus: "Monthly service SOP only. Static MVP status: not live.",
    relatedModule: "AccessGuard",
    keySections: [
      "Link checks",
      "Automation route review",
      "AccessHub request review",
      "Support issue themes",
      "EntitlementFrame exceptions",
      "ProofMetrics report",
      "Owner action review",
      "Recheck triggers",
    ],
    safetyBoundary:
      "This SOP describes review operations. It does not add live monitoring or live integrations to the static MVP.",
    filePath:
      "docs/implementation/FOLIOFRAME_ACCESSGUARD_MONTHLY_RETAINER_SOP.md",
  },
  {
    slug: "launchroom-runbook",
    title: "LaunchRoom Runbook",
    category: "runbook",
    summary:
      "A launch readiness and triage runbook covering pre-launch, launch day and post-launch review windows.",
    bestFor:
      "Launch support scopes where checkout, access, delivery, support and owner decisions need coordinated review.",
    staticStatus: "Launch runbook only. Static MVP status: not live.",
    relatedModule: "LaunchRoom",
    keySections: [
      "14 days before launch",
      "7 days before launch",
      "48 hours before launch",
      "Launch day",
      "48 hours after launch",
      "Issue log template",
      "Severity labels",
      "Escalation rules",
      "Post-launch debrief",
    ],
    safetyBoundary:
      "LaunchRoom documents readiness and triage. It does not simulate live monitoring in this static MVP.",
    filePath: "docs/implementation/FOLIOFRAME_LAUNCHROOM_RUNBOOK.md",
  },
  {
    slug: "migrationframe-runbook",
    title: "MigrationFrame Runbook",
    category: "runbook",
    summary:
      "A migration planning runbook for old-system inventory, risk classification, cutover and rollback planning.",
    bestFor:
      "Projects moving product access, delivery assets, email routes or support paths between systems.",
    staticStatus: "Migration runbook only. Static MVP status: not live.",
    relatedModule: "MigrationFrame",
    keySections: [
      "Old system inventory",
      "Risk classification",
      "Legacy buyer access plan",
      "Email sequence migration",
      "Old link retirement",
      "Data export and import notes",
      "Cutover plan",
      "Rollback plan",
      "Post-migration DeliveryProof test",
    ],
    safetyBoundary:
      "Production movement requires separate approval. Real exports should not be stored in this documentation folder.",
    filePath: "docs/implementation/FOLIOFRAME_MIGRATIONFRAME_RUNBOOK.md",
  },
  {
    slug: "agencyframe-playbook",
    title: "AgencyFrame Playbook",
    category: "runbook",
    summary:
      "An agency delivery playbook for client workspace models, white-label process, resource matrix and care plans.",
    bestFor:
      "Agencies packaging FolioFrame as a repeatable implementation and handover service.",
    staticStatus: "Agency playbook only. Static MVP status: not live.",
    relatedModule: "AgencyFrame",
    keySections: [
      "Agency use case",
      "Client workspace model",
      "White-label delivery process",
      "Client resource matrix",
      "Handover templates",
      "AccessHub per client",
      "ProofMetrics per client",
      "Monthly agency care plan",
      "Pricing notes",
    ],
    safetyBoundary:
      "Each client implementation still needs approved scope, separate credentials handling and owner approval.",
    filePath: "docs/implementation/FOLIOFRAME_AGENCYFRAME_PLAYBOOK.md",
  },
] as const satisfies readonly FolioFrameImplementationDoc[];

export type ImplementationDocSlug =
  (typeof folioframeImplementationDocs)[number]["slug"];
