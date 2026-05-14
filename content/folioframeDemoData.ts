import type { ModuleSlug } from "./folioframeModules";

export const staticDemoNotice =
  "Static/demo only. No real auth, billing, customer data, platform connections or live monitoring are active.";

export const dashboardMetrics = [
  {
    label: "Mapped systems",
    value: "8",
    trend: "Static sample",
    note: "Demo product, access, and delivery paths prepared for owner review.",
  },
  {
    label: "QA checks",
    value: "64",
    trend: "Review ready",
    note: "Sample checklist items across access, delivery, support, and reporting.",
  },
  {
    label: "Owner actions",
    value: "14",
    trend: "Needs review",
    note: "Demo approval points for rules, messages, handover, and launch readiness.",
  },
  {
    label: "Recovery routes",
    value: "7",
    trend: "Documented",
    note: "Practical support paths for sample access and delivery exceptions.",
  },
] as const;

export const buyerJourneySteps = [
  {
    stage: "Payment confirmation",
    status: "Mapped",
    owner: "Operations owner",
    detail:
      "Demo checkout confirmation is linked to product selection and static delivery rules.",
  },
  {
    stage: "Entitlement decision",
    status: "Owner review",
    owner: "Product owner",
    detail:
      "Sample tier, bundle, cohort, and exception logic is ready for approval.",
  },
  {
    stage: "Access setup",
    status: "Tested sample",
    owner: "Platform owner",
    detail:
      "Static scenarios check new purchase, upgrade, refund-sensitive, and manual exception paths.",
  },
  {
    stage: "Delivery and onboarding",
    status: "Documented",
    owner: "Customer success owner",
    detail:
      "Demo message path covers access instructions, onboarding prompts, and fallback routes.",
  },
  {
    stage: "Support recovery",
    status: "Recovery route",
    owner: "Support lead",
    detail:
      "AccessDesk categories and escalation notes are prepared as sample content.",
  },
  {
    stage: "Follow-up and reporting",
    status: "Recommended",
    owner: "Reporting owner",
    detail:
      "ProofMetrics review cadence and owner action register are documented as operational guidance.",
  },
] as const;

export const productTierMatrix = [
  {
    product: "Signature course",
    tier: "Core access",
    accessRule: "Course portal, onboarding sequence, and support fallback route",
    deliveryPath: "Checkout confirmation, access message, portal welcome",
    supportRoute: "AccessDesk intake with owner escalation",
    reviewState: "Owner review needed",
  },
  {
    product: "Template library",
    tier: "Library entitlement",
    accessRule: "Library access with bonus template pack and upgrade note",
    deliveryPath: "Portal access and DeliveryProof evidence packet",
    supportRoute: "Support resend path and proof packet lookup",
    reviewState: "Mapped",
  },
  {
    product: "Cohort add-on",
    tier: "Time-bound cohort",
    accessRule: "Cohort space, replay archive, and expiry review",
    deliveryPath: "AccessGuard rule plus InboxGuard reminder sequence",
    supportRoute: "Manual exception route for late access questions",
    reviewState: "Sample QA ready",
  },
  {
    product: "Premium bundle",
    tier: "Bundle access",
    accessRule: "Course, library, cohort add-on, and private support entitlement",
    deliveryPath: "Bundle message path with AccessHub handover notes",
    supportRoute: "Escalation to operations owner for bundle mismatch",
    reviewState: "Entitlement review needed",
  },
] as const;

export const entitlementRecords = [
  {
    id: "ENT-DEMO-001",
    offer: "Signature course",
    tier: "Core access",
    entitlement: "Course portal plus onboarding sequence",
    trigger: "Checkout confirmation",
    exceptionPath: "Manual access check if portal invite is not visible",
    ownerApproval: "Pending product owner review",
  },
  {
    id: "ENT-DEMO-002",
    offer: "Template library",
    tier: "Library entitlement",
    entitlement: "Template vault plus update notes",
    trigger: "Product tag applied by approved production workflow",
    exceptionPath: "Support resend route with DeliveryProof packet",
    ownerApproval: "Approved as demo rule",
  },
  {
    id: "ENT-DEMO-003",
    offer: "Premium bundle",
    tier: "Bundle access",
    entitlement: "Course, library, cohort add-on, and private support route",
    trigger: "Bundle checkout path",
    exceptionPath: "Operations owner reviews bundle mismatch",
    ownerApproval: "Needs owner approval",
  },
] as const;

export const inboxGuardChecks = [
  {
    message: "Access instructions",
    channel: "Demo email copy",
    check: "Subject, access link language, and fallback support route reviewed",
    status: "Mapped",
  },
  {
    message: "Portal welcome",
    channel: "Static portal copy",
    check: "Onboarding steps and expected next action are documented",
    status: "Owner copy review",
  },
  {
    message: "Support resend",
    channel: "Support snippet",
    check: "Resend policy avoids platform outcome promises",
    status: "Ready for approval",
  },
] as const;

export const accessHubRequests = [
  {
    requestId: "REQ-DEMO-101",
    type: "Access exception",
    module: "AccessGuard",
    priority: "Medium",
    owner: "Operations owner",
    status: "Needs rule approval",
  },
  {
    requestId: "REQ-DEMO-102",
    type: "Delivery proof review",
    module: "DeliveryProof",
    priority: "Low",
    owner: "Support lead",
    status: "Mapped",
  },
  {
    requestId: "REQ-DEMO-103",
    type: "Handover document",
    module: "AccessSafe",
    priority: "Medium",
    owner: "Product owner",
    status: "Owner review",
  },
] as const;

export const launchRoomIssues = [
  {
    issue: "Bundle entitlement mismatch",
    severity: "High",
    route: "Review EntitlementFrame record and confirm bundle rule",
    owner: "Product owner",
    status: "Open demo issue",
  },
  {
    issue: "Access message fallback unclear",
    severity: "Medium",
    route: "Approve InboxGuard fallback wording",
    owner: "Support lead",
    status: "Copy review",
  },
  {
    issue: "Reporting action owner missing",
    severity: "Low",
    route: "Assign owner in ProofMetrics action register",
    owner: "Operations owner",
    status: "Needs assignment",
  },
] as const;

export const migrationItems = [
  {
    item: "Course portal modules",
    sourceState: "Current product library",
    destinationState: "New portal structure",
    continuityCheck: "Access continuity map and buyer message review",
    ownerApproval: "Pending",
  },
  {
    item: "Template library assets",
    sourceState: "Existing library folders",
    destinationState: "Static inventory for production review",
    continuityCheck: "Product Tracks matrix and DeliveryProof note",
    ownerApproval: "Mapped",
  },
  {
    item: "Support snippets",
    sourceState: "Support team notes",
    destinationState: "AccessDesk snippet library",
    continuityCheck: "Support recovery route approval",
    ownerApproval: "Needs support lead",
  },
] as const;

export const proofMetrics = [
  {
    metric: "Delivery proof completeness",
    value: "82%",
    basis: "Demo evidence packet fields completed",
    reviewAction: "Confirm missing owner approval records",
  },
  {
    metric: "Access exception review",
    value: "5 sample items",
    basis: "Static exception categories across tiers and bundles",
    reviewAction: "Approve manual review route",
  },
  {
    metric: "Support recovery readiness",
    value: "7 routes",
    basis: "AccessDesk categories with escalation notes",
    reviewAction: "Review support snippets",
  },
  {
    metric: "Handover readiness",
    value: "70%",
    basis: "Demo handover checklist completion",
    reviewAction: "Complete owner decision summary",
  },
] as const;

export const agencyClients = [
  {
    clientLabel: "Demo client A",
    scope: "Product library access review",
    workspaceStatus: "Template assigned",
    qaStandard: "Core module checklist",
    nextAction: "Approve client workspace labels",
  },
  {
    clientLabel: "Demo client B",
    scope: "Premium launch readiness",
    workspaceStatus: "LaunchRoom sample active",
    qaStandard: "Verified Delivery Standard",
    nextAction: "Review launch issue triage",
  },
  {
    clientLabel: "Demo client C",
    scope: "Migration planning",
    workspaceStatus: "MigrationFrame draft",
    qaStandard: "Continuity checklist",
    nextAction: "Confirm migration inventory",
  },
] as const;

export const verifiedDeliveryChecks = [
  {
    check: "Checkout-to-customer map",
    status: "Mapped",
    evidence: "Buyer journey steps and Product Tracks matrix",
  },
  {
    check: "Access lifecycle rules",
    status: "Owner review",
    evidence: "AccessGuard and EntitlementFrame records",
  },
  {
    check: "Delivery safeguards",
    status: "Documented",
    evidence: "DeliveryProof packet and InboxGuard fallback notes",
  },
  {
    check: "Support recovery route",
    status: "Ready for approval",
    evidence: "AccessDesk categories and escalation notes",
  },
  {
    check: "Operational reporting",
    status: "Recommended",
    evidence: "ProofMetrics review actions",
  },
] as const;

export const handoverItems = [
  {
    item: "Checkout-to-customer map",
    owner: "Operations owner",
    status: "Mapped",
  },
  {
    item: "Access lifecycle rules",
    owner: "Product owner",
    status: "Owner review",
  },
  {
    item: "Delivery proof packet",
    owner: "Support lead",
    status: "Documented",
  },
  {
    item: "Support recovery route",
    owner: "Support lead",
    status: "Ready for approval",
  },
  {
    item: "Reporting cadence notes",
    owner: "Reporting owner",
    status: "Recommended",
  },
  {
    item: "Owner approval record",
    owner: "Founder",
    status: "Needs final review",
  },
] as const;

export const ownerActions = [
  {
    action: "Approve entitlement rules for premium bundle",
    module: "EntitlementFrame",
    priority: "High",
    dueState: "Before launch rehearsal",
  },
  {
    action: "Confirm fallback support copy",
    module: "InboxGuard",
    priority: "Medium",
    dueState: "Before message QA",
  },
  {
    action: "Assign reporting action owners",
    module: "ProofMetrics",
    priority: "Medium",
    dueState: "Before handover",
  },
  {
    action: "Approve static portal handover packet",
    module: "AccessHub",
    priority: "High",
    dueState: "Before production implementation",
  },
] as const;

export function getPortalDemoDataForModule(slug: ModuleSlug) {
  const moduleData: Partial<Record<ModuleSlug, readonly unknown[]>> = {
    foliofix: ownerActions,
    deliveryproof: verifiedDeliveryChecks,
    accessguard: entitlementRecords,
    accessdesk: accessHubRequests,
    revenueframe: proofMetrics,
    accesssafe: handoverItems,
    "product-tracks": productTierMatrix,
    entitlementframe: entitlementRecords,
    inboxguard: inboxGuardChecks,
    accesshub: accessHubRequests,
    launchroom: launchRoomIssues,
    migrationframe: migrationItems,
    proofmetrics: proofMetrics,
    agencyframe: agencyClients,
    "verified-delivery-standard": verifiedDeliveryChecks,
  };

  return moduleData[slug] ?? ownerActions;
}
