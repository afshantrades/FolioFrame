import type { ModuleSlug } from "./folioframeModules";

export const staticDemoNotice =
  "Static/demo only. No real auth, billing, customer data, platform connections or live monitoring are active.";

export const dashboardMetrics = [
  {
    label: "Readiness score",
    value: "78%",
    trend: "Owner review",
    note: "Static sample score across access lifecycle, delivery proof, support recovery and handover readiness.",
  },
  {
    label: "Mapped systems",
    value: "8",
    trend: "Static sample",
    note: "Payment, entitlement, access, delivery, onboarding, support, follow-up and reporting paths.",
  },
  {
    label: "QA checks",
    value: "64",
    trend: "Review ready",
    note: "Sample checks across mapped rules, message paths, recovery routes and evidence packets.",
  },
  {
    label: "Owner actions",
    value: "14",
    trend: "Needs review",
    note: "Demo approval points for rules, messages, handover, launch readiness and reporting.",
  },
  {
    label: "Recovery routes",
    value: "7",
    trend: "Documented",
    note: "Practical support paths for sample access, delivery and wrong-email exceptions.",
  },
  {
    label: "ProofMetrics baseline",
    value: "4",
    trend: "Demo metrics",
    note: "Operational reporting examples for proof completeness, exceptions, support themes and handover.",
  },
] as const;

export const readinessSnapshot = [
  {
    area: "Entitlement and access lifecycle",
    status: "Owner review",
    detail: "Mapped entitlement rules and tested sample access scenarios need final owner approval.",
  },
  {
    area: "Delivery and onboarding",
    status: "Documented",
    detail: "DeliveryProof packet and InboxGuard message inventory are prepared as sample content.",
  },
  {
    area: "Support and recovery",
    status: "Recovery route ready",
    detail: "AccessDesk and AccessHub paths are documented for lost access and wrong-email requests.",
  },
  {
    area: "Reporting and handover",
    status: "Monitoring recommended",
    detail: "ProofMetrics cadence and handover packet sections are ready for owner review.",
  },
] as const;

export const moduleStatusOverview = [
  {
    module: "FolioFix",
    status: "Mapped",
    workspace: "/app/foliofix",
    note: "Repair queue and system review findings are represented with static sample actions.",
  },
  {
    module: "DeliveryProof",
    status: "Documented",
    workspace: "/app/deliveryproof",
    note: "Evidence packet fields and support proof notes are ready for owner review.",
  },
  {
    module: "AccessGuard",
    status: "Owner review",
    workspace: "/app/accessguard",
    note: "Access lifecycle rules are mapped and need production owner approval.",
  },
  {
    module: "EntitlementFrame",
    status: "Owner approval needed",
    workspace: "/app/entitlementframe",
    note: "Tier, bundle and exception rules are organized for approval.",
  },
  {
    module: "InboxGuard",
    status: "Copy review",
    workspace: "/app/inboxguard",
    note: "Delivery message inventory and fallback support copy are prepared.",
  },
  {
    module: "ProofMetrics",
    status: "Reporting recommended",
    workspace: "/app/proofmetrics",
    note: "Baseline reporting examples and owner action register are static only.",
  },
] as const;

export const majorWorkspaceLinks = [
  {
    label: "Premium dashboard",
    href: "/app/premium-dashboard",
    detail: "Readiness score, owner queue, buyer journey and ProofMetrics summary.",
  },
  {
    label: "Buyer journey",
    href: "/app/buyer-journey",
    detail: "Payment through reporting mapped as a static checkout-to-customer path.",
  },
  {
    label: "Product matrix",
    href: "/app/product-matrix",
    detail: "Product tiers, access rules, delivery paths and support routes.",
  },
  {
    label: "Verified delivery",
    href: "/app/verified-delivery",
    detail: "Readiness checklist, evidence packet and owner approval record.",
  },
  {
    label: "Handover",
    href: "/app/handover",
    detail: "System map, lifecycle matrix, SOP sections and owner action list.",
  },
] as const;

export const buyerJourneySteps = [
  {
    stage: "Payment",
    status: "Mapped",
    owner: "Operations owner",
    detail: "Demo checkout confirmation is linked to product selection and static delivery rules.",
    demoLabel: "Static payment path",
  },
  {
    stage: "Entitlement",
    status: "Owner review",
    owner: "Product owner",
    detail: "Sample tier, bundle, cohort and exception logic is ready for owner approval.",
    demoLabel: "Mapped entitlement rules",
  },
  {
    stage: "Access",
    status: "Tested sample",
    owner: "Platform owner",
    detail: "Static scenarios check new purchase, upgrade, refund-sensitive and manual exception paths.",
    demoLabel: "Tested sample access scenarios",
  },
  {
    stage: "Delivery",
    status: "Documented",
    owner: "Customer success owner",
    detail: "DeliveryProof evidence fields and delivery message paths are represented as sample records.",
    demoLabel: "Delivery safeguards",
  },
  {
    stage: "Onboarding",
    status: "Documented",
    owner: "Customer success owner",
    detail: "Portal welcome copy, first-step guidance and expected buyer next action are mapped.",
    demoLabel: "Static onboarding path",
  },
  {
    stage: "Support",
    status: "Recovery route",
    owner: "Support lead",
    detail: "AccessDesk categories, AccessHub intake and escalation notes are prepared as sample content.",
    demoLabel: "Practical recovery route",
  },
  {
    stage: "Follow-up",
    status: "Recommended",
    owner: "Lifecycle owner",
    detail: "Follow-up reminders and owner review prompts are documented without live messaging.",
    demoLabel: "Monitoring recommended",
  },
  {
    stage: "Proof",
    status: "Evidence packet",
    owner: "Support lead",
    detail: "Delivery proof notes, access exception records and owner approvals form the sample evidence packet.",
    demoLabel: "Verified delivery review",
  },
  {
    stage: "Reporting",
    status: "Operational reporting",
    owner: "Reporting owner",
    detail: "ProofMetrics review cadence and owner action register are documented as operational guidance.",
    demoLabel: "Static reporting view",
  },
] as const;

export const productTierMatrix = [
  {
    product: "Signature course",
    tier: "Core access",
    accessRule: "Course portal, onboarding sequence and support fallback route",
    deliveryPath: "Checkout confirmation, access message and portal welcome",
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
    accessRule: "Cohort space, replay archive and expiry review",
    deliveryPath: "AccessGuard rule plus InboxGuard reminder sequence",
    supportRoute: "Manual exception route for late access questions",
    reviewState: "Sample QA ready",
  },
  {
    product: "Premium bundle",
    tier: "Bundle access",
    accessRule: "Course, library, cohort add-on and private support entitlement",
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
    entitlement: "Template library plus update notes",
    trigger: "Product tag applied by approved production workflow",
    exceptionPath: "Support resend route with DeliveryProof packet",
    ownerApproval: "Approved as demo rule",
  },
  {
    id: "ENT-DEMO-003",
    offer: "Premium bundle",
    tier: "Bundle access",
    entitlement: "Course, library, cohort add-on and private support route",
    trigger: "Bundle checkout path",
    exceptionPath: "Operations owner reviews bundle mismatch",
    ownerApproval: "Needs owner approval",
  },
  {
    id: "ENT-DEMO-004",
    offer: "Cohort add-on",
    tier: "Time-bound access",
    entitlement: "Cohort room plus replay archive until owner-approved close date",
    trigger: "Cohort add-on purchase path",
    exceptionPath: "Manual review for late purchase or access extension request",
    ownerApproval: "Pending launch owner",
  },
] as const;

export const accessStateDefinitions = [
  {
    state: "Active",
    definition: "Buyer should have access to the mapped product tier and delivery path.",
  },
  {
    state: "Pending manual review",
    definition: "Access needs owner-approved exception handling before a private link or invite is resent.",
  },
  {
    state: "Time-bound",
    definition: "Access is linked to a cohort window, replay period or owner-approved access date.",
  },
  {
    state: "Paused for owner decision",
    definition: "Production handling should wait for the product owner to confirm the access rule.",
  },
] as const;

export const manualReviewQueue = [
  {
    item: "Bundle mismatch",
    trigger: "Buyer purchased a bundle but one product tier is unclear",
    owner: "Product owner",
    route: "Check EntitlementFrame rule, confirm tier and update AccessHub note",
  },
  {
    item: "Wrong email request",
    trigger: "Buyer asks for access to be moved to a different email address",
    owner: "Support lead",
    route: "Use owner-approved identity and delivery proof steps before production action",
  },
  {
    item: "Cohort expiry question",
    trigger: "Buyer requests access after the mapped cohort window",
    owner: "Launch owner",
    route: "Review time-bound access rule and document owner decision",
  },
] as const;

export const inboxGuardChecks = [
  {
    message: "Access instructions",
    channel: "Demo email copy",
    check: "Subject, access link language and fallback support route reviewed",
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
  {
    message: "Launch access reminder",
    channel: "Demo follow-up copy",
    check: "Fallback route and support footer are visible without implying live sending",
    status: "Monitoring recommended",
  },
] as const;

export const senderIdentityChecklist = [
  {
    item: "From name",
    status: "Owner copy review",
    detail: "Confirm the human-readable sender label buyers should recognize.",
  },
  {
    item: "Reply route",
    status: "Mapped",
    detail: "Point buyers to the documented AccessHub support path.",
  },
  {
    item: "Support footer",
    status: "Ready for approval",
    detail: "Include practical recovery wording and avoid platform outcome promises.",
  },
] as const;

export const fallbackRouteTracker = [
  {
    route: "Access message not found",
    supportPath: "AccessHub lost access intake",
    owner: "Support lead",
    status: "Mapped",
  },
  {
    route: "Wrong email used at checkout",
    supportPath: "Manual review with owner-approved exception rule",
    owner: "Operations owner",
    status: "Needs production policy",
  },
  {
    route: "Delivery proof request",
    supportPath: "DeliveryProof packet review",
    owner: "Support lead",
    status: "Documented",
  },
] as const;

export const resendSnippets = [
  {
    title: "Access link resend",
    copy: "We can check the mapped access record and resend the approved access instructions when the owner-approved rules are met.",
  },
  {
    title: "Wrong email route",
    copy: "We can review the checkout details and move through the documented recovery route before any private access is resent.",
  },
  {
    title: "Proof packet note",
    copy: "We can review the delivery proof packet and confirm the documented next step for this access request.",
  },
] as const;

export const supportFooterStatus = [
  {
    footer: "Primary access help link",
    status: "Mapped",
    note: "Routes to static AccessHub help structure in this MVP.",
  },
  {
    footer: "Reply-to support path",
    status: "Owner review",
    note: "Needs owner decision before production message setup.",
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
  {
    requestId: "REQ-DEMO-104",
    type: "Wrong email request",
    module: "AccessHub",
    priority: "High",
    owner: "Support lead",
    status: "Unresolved demo item",
  },
] as const;

export const buyerIssueCategories = [
  {
    category: "Lost access",
    route: "Check mapped entitlement, DeliveryProof note and support resend rule",
  },
  {
    category: "Wrong email",
    route: "Use owner-approved exception route before private access is changed",
  },
  {
    category: "Bundle mismatch",
    route: "Compare product matrix tier with EntitlementFrame record",
  },
  {
    category: "Delivery proof question",
    route: "Review evidence packet and document next support step",
  },
] as const;

export const accessHubRequestPreviews = [
  {
    title: "Lost access request preview",
    fields: "Product, checkout reference, expected tier, support note and owner-approved resend rule",
    status: "Static preview",
  },
  {
    title: "Wrong email request preview",
    fields: "Original checkout email, requested access email, proof packet note and manual review owner",
    status: "Needs owner rule",
  },
] as const;

export const faqHelpStructure = [
  "How to find access instructions",
  "How to request a mapped support review",
  "What information support needs for wrong-email requests",
  "How delivery proof is reviewed",
  "When an owner approval may be required",
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

export const launchReadinessChecklist = [
  {
    item: "Checkout path rehearsal",
    status: "Mapped",
    owner: "Operations owner",
  },
  {
    item: "Entitlement exception review",
    status: "Owner review",
    owner: "Product owner",
  },
  {
    item: "InboxGuard copy approval",
    status: "Copy review",
    owner: "Support lead",
  },
  {
    item: "AccessHub support route",
    status: "Documented",
    owner: "Support lead",
  },
] as const;

export const rehearsalScenarios = [
  {
    scenario: "New buyer purchases core product",
    expectedResult: "Payment, entitlement, access, delivery and onboarding path are visible in sample data",
  },
  {
    scenario: "Buyer purchases premium bundle",
    expectedResult: "Bundle access rule and manual exception route are ready for owner approval",
  },
  {
    scenario: "Buyer cannot find access instructions",
    expectedResult: "InboxGuard fallback and AccessHub lost access path are documented",
  },
] as const;

export const migrationItems = [
  {
    item: "Course portal modules",
    sourceState: "Current product library",
    destinationState: "New portal structure",
    continuityCheck: "Access continuity map and buyer message review",
    riskLevel: "Medium",
    ownerApproval: "Pending",
  },
  {
    item: "Template library assets",
    sourceState: "Existing library folders",
    destinationState: "Static inventory for production review",
    continuityCheck: "Product Tracks matrix and DeliveryProof note",
    riskLevel: "Low",
    ownerApproval: "Mapped",
  },
  {
    item: "Support snippets",
    sourceState: "Support team notes",
    destinationState: "AccessDesk snippet library",
    continuityCheck: "Support recovery route approval",
    riskLevel: "Medium",
    ownerApproval: "Needs support lead",
  },
] as const;

export const migrationCutoverChecklist = [
  "Freeze owner-approved inventory before production movement",
  "Confirm destination structure and buyer-facing access notes",
  "Prepare support copy for expected access questions",
  "Review rollback note before any production action",
] as const;

export const migrationRollbackNotes = [
  {
    item: "Course portal modules",
    note: "Keep current access path available until owner approves destination review.",
  },
  {
    item: "Support snippets",
    note: "Retain previous support notes until AccessHub handoff is approved.",
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

export const deliveryProofMetrics = [
  {
    metric: "Evidence packet fields",
    value: "11 of 14",
    note: "Static packet fields completed for owner review.",
  },
  {
    metric: "Delivery message records",
    value: "4",
    note: "InboxGuard message inventory linked to proof review.",
  },
] as const;

export const accessExceptionMetrics = [
  {
    metric: "Manual review items",
    value: "3",
    note: "Bundle mismatch, wrong-email and cohort expiry examples.",
  },
  {
    metric: "Owner-approved routes",
    value: "2",
    note: "Demo routes approved or ready for final owner decision.",
  },
] as const;

export const supportThemes = [
  {
    theme: "Lost access",
    pattern: "Buyers need a clear path to request a resend under approved rules.",
  },
  {
    theme: "Wrong email",
    pattern: "Manual review route should be visible before private access changes.",
  },
  {
    theme: "Bundle clarity",
    pattern: "Product tier matrix should match entitlement records before launch.",
  },
] as const;

export const reportingCadence = [
  "Review ProofMetrics baseline before handover",
  "Refresh owner action register after launch rehearsal",
  "Schedule monitoring review when production systems are connected",
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

export const handoverTemplatePack = [
  "Client scope summary",
  "Module checklist",
  "Owner action register",
  "Delivery proof packet",
  "Care plan recommendation",
] as const;

export const carePlanRoutes = [
  {
    route: "AccessGuard + ProofMetrics retainer",
    useCase: "Monthly access lifecycle and operational reporting review",
  },
  {
    route: "LaunchRoom support window",
    useCase: "Launch-week readiness and triage documentation",
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

export const verifiedDeliveryStatuses = [
  "Verified Delivery Ready",
  "Verified With Owner Actions",
  "Monitoring Recommended",
  "Blocked By Missing Assets",
  "Recheck Required",
] as const;

export const evidencePacket = [
  {
    section: "System map",
    status: "Mapped",
    note: "Payment, access, delivery and support path are represented with sample records.",
  },
  {
    section: "Owner approval record",
    status: "Owner review",
    note: "Final production owner approval remains pending in this static MVP.",
  },
  {
    section: "ProofMetrics baseline",
    status: "Recommended",
    note: "Operational reporting cadence is suggested for production follow-up.",
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

export const systemMapItems = [
  {
    area: "Payment",
    artifact: "Checkout path note",
    status: "Mapped",
  },
  {
    area: "Entitlement",
    artifact: "Product and tier rule matrix",
    status: "Owner review",
  },
  {
    area: "Delivery",
    artifact: "DeliveryProof packet",
    status: "Documented",
  },
  {
    area: "Support",
    artifact: "AccessHub SOP",
    status: "Ready for approval",
  },
] as const;

export const accessLifecycleMatrix = [
  {
    lifecycle: "New purchase",
    rule: "Grant mapped product tier and send owner-approved access instructions",
    review: "Tested sample scenario",
  },
  {
    lifecycle: "Upgrade or bundle",
    rule: "Compare purchase path with entitlement record before access changes",
    review: "Owner approval needed",
  },
  {
    lifecycle: "Wrong email request",
    rule: "Use manual review route before moving private access",
    review: "Support owner review",
  },
] as const;

export const deliveryProofSummary = [
  "Delivery event checklist prepared",
  "Buyer message inventory mapped",
  "Support proof packet model documented",
  "Exception documentation route ready for owner review",
] as const;

export const accessGuardRecommendations = [
  "Approve premium bundle entitlement rule",
  "Confirm refund-sensitive access handling before production setup",
  "Name owner for manual exception decisions",
] as const;

export const handoverPacketSections = [
  "System map",
  "Access lifecycle matrix",
  "DeliveryProof report summary",
  "InboxGuard checklist",
  "AccessHub SOP",
  "Owner action list",
  "ProofMetrics baseline",
  "AccessGuard recommendation",
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
