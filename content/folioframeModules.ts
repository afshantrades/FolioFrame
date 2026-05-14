export type FolioFrameModuleCategory = "core" | "advanced" | "add-on" | "agency";

export type FolioFrameModule = {
  slug: string;
  name: string;
  category: FolioFrameModuleCategory;
  shortDescription: string;
  longDescription: string;
  problemSolved: string;
  idealFor: readonly string[];
  whatIsIncluded: readonly string[];
  deliverables: readonly string[];
  portalWidgets: readonly string[];
  qaChecks: readonly string[];
  ownerActions: readonly string[];
  boundaries: readonly string[];
  safeClaims: readonly string[];
  publicHeadline: string;
  publicBody: string;
  portalHeadline: string;
  portalBody: string;
  pricingNotes: string;
  relatedModules: readonly string[];
  publicPath: string;
  portalPath: string;
};

export const folioframeModules = [
  {
    slug: "foliofix",
    name: "FolioFix",
    category: "core",
    shortDescription:
      "A structured diagnostic for finding buyer access and delivery weak points.",
    longDescription:
      "FolioFix is the entry audit for a checkout-to-customer system. It maps the current buyer journey, identifies access and delivery gaps, documents owner decisions, and turns scattered observations into a prioritized repair plan.",
    problemSolved:
      "Digital product sellers can have payment confirmation, product access, onboarding, support, and follow-up split across several tools. FolioFix shows where the system is unclear before a buyer depends on it.",
    idealFor: [
      "Existing offers with recurring buyer access questions",
      "Sellers preparing to improve a product library before launch",
      "Owners who need a practical repair backlog before investing in a full system",
      "Teams that need an outside view of handoff and recovery steps",
    ],
    whatIsIncluded: [
      "Checkout-to-customer journey review",
      "Payment confirmation and access handoff map",
      "Delivery message and onboarding path review",
      "Support recovery route inspection",
      "Access lifecycle and exception notes",
      "Priority repair backlog with owner approval points",
    ],
    deliverables: [
      "Annotated buyer journey map",
      "Access and delivery risk register",
      "Prioritized repair plan",
      "Support recovery checklist",
      "Owner-approved next-step summary",
    ],
    portalWidgets: [
      "Flow map status",
      "Repair priority queue",
      "Access issue categories",
      "Owner approval tracker",
      "Handover notes panel",
    ],
    qaChecks: [
      "Payment confirmation path is mapped",
      "Access handoff is tested with static scenarios",
      "Delivery message path is documented",
      "Support recovery route is visible",
      "Owner review notes are captured",
    ],
    ownerActions: [
      "Provide current checkout, product, delivery, and support flow details",
      "Approve the priority order for repair work",
      "Confirm platform owners for any production changes",
      "Review the documented buyer-facing support route",
    ],
    boundaries: [
      "No production platform changes happen during the static audit",
      "No live payment, email, or automation connection is included",
      "The audit documents operational risks without replacing specialist advice",
    ],
    safeClaims: [
      "Mapped checkout-to-customer journey",
      "Tested sample buyer scenarios",
      "Documented repair priorities",
      "Owner-approved recovery route",
    ],
    publicHeadline: "Find the weak points before buyers do.",
    publicBody:
      "FolioFix gives sellers a mapped, tested, and documented view of the handoff between payment, access, delivery, onboarding, support, and follow-up.",
    portalHeadline: "FolioFix repair queue",
    portalBody:
      "A static workspace for reviewing flow-map gaps, repair priorities, support notes, and owner approvals.",
    pricingNotes:
      "Typically sold as the FolioFix Audit at £497-£997, with a clear path into a deeper FolioFrame build.",
    relatedModules: ["accessguard", "deliveryproof", "accessdesk", "product-tracks"],
    publicPath: "/foliofix",
    portalPath: "/app/foliofix",
  },
  {
    slug: "deliveryproof",
    name: "DeliveryProof",
    category: "core",
    shortDescription:
      "A practical evidence trail for buyer delivery events, messages, and handoff steps.",
    longDescription:
      "DeliveryProof structures the operational proof around what a buyer should receive after checkout. It defines which events, messages, access actions, and support notes should be documented so the seller has a clear evidence packet for review.",
    problemSolved:
      "Sellers often know that a product was intended to be delivered, but the evidence trail can be scattered across payment tools, email messages, product platforms, and support conversations.",
    idealFor: [
      "Digital products where delivery proof matters for support",
      "Owners who need a support-ready evidence packet",
      "Teams that want consistent records for delivery exceptions",
      "Launches where access and delivery messages need review before launch week",
    ],
    whatIsIncluded: [
      "Delivery event checklist",
      "Buyer message inventory",
      "Portal and email handoff notes",
      "Support-ready proof packet model",
      "Exception documentation workflow",
      "Owner-approved evidence policy",
    ],
    deliverables: [
      "Delivery proof map",
      "Evidence packet template",
      "Buyer message inventory",
      "Support response snippets",
      "Exception note structure",
    ],
    portalWidgets: [
      "Delivery evidence log",
      "Message sample library",
      "Support proof packet",
      "Exception notes",
      "Owner review status",
    ],
    qaChecks: [
      "Delivery events are named and documented",
      "Sample buyer journey is reviewed",
      "Evidence fields are easy to export",
      "Support team notes stay consistent",
      "Fallback route is visible for unresolved delivery questions",
    ],
    ownerActions: [
      "Approve which delivery events should be documented",
      "Confirm support wording for proof requests",
      "Review the evidence packet before production use",
      "Name the owner for exception review",
    ],
    boundaries: [
      "DeliveryProof documents operational evidence and does not replace payment processor records",
      "The static scaffold does not connect to production tools",
      "Delivery wording avoids outcome promises that a single system cannot own",
    ],
    safeClaims: [
      "Documented delivery evidence packet",
      "Support-ready proof notes",
      "Mapped message and portal handoffs",
      "Practical recovery route for exceptions",
    ],
    publicHeadline: "Document delivery without overpromising what a system can prove.",
    publicBody:
      "DeliveryProof creates a clean operational record for delivery events, buyer messages, access steps, support notes, and owner-approved evidence rules.",
    portalHeadline: "DeliveryProof evidence workspace",
    portalBody:
      "A static portal view for reviewing delivery events, message samples, proof packets, and exception notes.",
    pricingNotes:
      "Included in FolioFrame Pro, Signature Launch, premium launch scopes, and the AccessGuard + ProofMetrics retainer.",
    relatedModules: ["accessguard", "inboxguard", "proofmetrics", "accessdesk"],
    publicPath: "/deliveryproof",
    portalPath: "/app/deliveryproof",
  },
  {
    slug: "accessguard",
    name: "AccessGuard",
    category: "core",
    shortDescription:
      "Access lifecycle rules for products, buyers, bundles, upgrades, refunds, and exceptions.",
    longDescription:
      "AccessGuard turns informal product access decisions into documented lifecycle rules. It defines how access should be granted, updated, reviewed, recovered, and handed over across offers and product tiers.",
    problemSolved:
      "Manual access setup, upgrades, refunds, bundle changes, and exceptions can create inconsistent buyer experiences when the rules are not written down.",
    idealFor: [
      "Product libraries with multiple tiers or bundles",
      "Sellers who handle upgrades, refunds, or cohort access",
      "Teams that need a clear manual override route",
      "Offers where access support has become repetitive",
    ],
    whatIsIncluded: [
      "Access lifecycle matrix",
      "Product entitlement rule notes",
      "Upgrade, downgrade, and refund pathway review",
      "Manual exception workflow",
      "Access owner register",
      "Owner-approved lifecycle policy",
    ],
    deliverables: [
      "Access rule matrix",
      "Exception response guide",
      "Manual override checklist",
      "Lifecycle scenario tests",
      "Owner approval record",
    ],
    portalWidgets: [
      "Access rule viewer",
      "Exception queue",
      "Product entitlement summary",
      "Lifecycle scenario checklist",
      "Review notes",
    ],
    qaChecks: [
      "New purchase access scenario is tested",
      "Upgrade and downgrade paths are documented",
      "Refund-sensitive access path is reviewed",
      "Manual override route is clear",
      "Access owner is named by role",
    ],
    ownerActions: [
      "Approve access rules for each product tier",
      "Confirm refund and revoke handling expectations",
      "Assign an owner for manual access exceptions",
      "Review support notes for access-sensitive cases",
    ],
    boundaries: [
      "No production access changes happen in this static scaffold",
      "No absolute security promise is made",
      "Platform permissions remain the owner's responsibility",
    ],
    safeClaims: [
      "Access lifecycle rules documented",
      "Sample scenarios tested",
      "Owner-approved exception route",
      "Practical access recovery path",
    ],
    publicHeadline: "Turn buyer access into a documented operating system.",
    publicBody:
      "AccessGuard maps product access rules, exception routes, lifecycle decisions, and owner approvals so delivery is easier to run and review.",
    portalHeadline: "AccessGuard lifecycle workspace",
    portalBody:
      "A static portal view for reviewing access rules, lifecycle scenarios, exceptions, and owner approvals.",
    pricingNotes:
      "Included in FolioFrame Pro and launch systems; paired with ProofMetrics for monthly review retainers.",
    relatedModules: ["entitlementframe", "accesssafe", "accessdesk", "proofmetrics"],
    publicPath: "/accessguard",
    portalPath: "/app/accessguard",
  },
  {
    slug: "accessdesk",
    name: "AccessDesk",
    category: "core",
    shortDescription:
      "A support desk workflow for buyer access questions, delivery exceptions, and recovery steps.",
    longDescription:
      "AccessDesk gives support teams a documented route for handling access requests. It defines intake categories, lookup steps, response snippets, escalation rules, and resolution notes without storing real customer data in the static scaffold.",
    problemSolved:
      "Access support can become scattered across inboxes, platform notes, and team memory, which makes buyer recovery slower and harder to hand over.",
    idealFor: [
      "Sellers receiving recurring access requests",
      "Teams that need consistent support language",
      "Offers with refund-sensitive or upgrade-sensitive access cases",
      "Owners preparing support handover before launch",
    ],
    whatIsIncluded: [
      "Support intake categories",
      "Buyer lookup checklist",
      "Response snippet library",
      "Escalation route",
      "Resolution note model",
      "Handover-ready support playbook",
    ],
    deliverables: [
      "Access support playbook",
      "Issue category map",
      "Resolution note templates",
      "Escalation guide",
      "Support handover checklist",
    ],
    portalWidgets: [
      "Support intake board",
      "Resolution tracker",
      "Snippet library",
      "Escalation notes",
      "Owner review flags",
    ],
    qaChecks: [
      "Common access issues have response paths",
      "Escalation owner is documented",
      "Refund-sensitive cases are flagged",
      "Resolution notes are consistent",
      "No real customer data is used in demo records",
    ],
    ownerActions: [
      "Approve support categories",
      "Review and edit buyer-facing snippets",
      "Name escalation owners",
      "Confirm what support should document after resolution",
    ],
    boundaries: [
      "No real customer data is stored",
      "No platform support relationship is implied",
      "Support notes are operational guidance, not specialist advice",
    ],
    safeClaims: [
      "Documented support intake route",
      "Practical recovery path for access questions",
      "Owner-approved support snippets",
      "Mapped escalation steps",
    ],
    publicHeadline: "Give access support a clear recovery route.",
    publicBody:
      "AccessDesk turns buyer access questions into a documented support workflow with intake categories, response snippets, escalation notes, and resolution records.",
    portalHeadline: "AccessDesk support workspace",
    portalBody:
      "A static portal view for reviewing support categories, sample resolution notes, snippets, and owner approvals.",
    pricingNotes:
      "Included in Pro, Signature Launch, premium launch, and agency scopes where support handover is required.",
    relatedModules: ["accessguard", "deliveryproof", "inboxguard", "accesssafe"],
    publicPath: "/accessdesk",
    portalPath: "/app/accessdesk",
  },
  {
    slug: "revenueframe",
    name: "RevenueFrame",
    category: "core",
    shortDescription:
      "Operational reporting for the buyer journey after checkout, focused on delivery readiness and review actions.",
    longDescription:
      "RevenueFrame defines the operational reporting layer behind a digital product system. It frames access, delivery, exceptions, support load, owner approvals, and follow-up actions without presenting metrics as financial promises.",
    problemSolved:
      "Sellers may see sales totals while still lacking a useful view of delivery readiness, access exceptions, support pressure, and unresolved handover work.",
    idealFor: [
      "Owners who need practical delivery and access reporting",
      "Sellers with multiple products or launch phases",
      "Teams preparing monthly operational reviews",
      "Retainer clients who need recurring review structure",
    ],
    whatIsIncluded: [
      "Operational metric definitions",
      "Buyer journey review points",
      "Exception reporting categories",
      "Follow-up action register",
      "Monthly review agenda",
      "Owner decision log",
    ],
    deliverables: [
      "Reporting framework",
      "Metric glossary",
      "Static dashboard plan",
      "Review meeting template",
      "Operational action register",
    ],
    portalWidgets: [
      "Operational snapshot",
      "Exception trend notes",
      "Delivery readiness indicators",
      "Review actions",
      "Owner decision log",
    ],
    qaChecks: [
      "Metrics are defined in plain language",
      "Data source ownership is documented",
      "Review cadence is recommended",
      "Actions have owner roles",
      "Copy avoids financial outcome promises",
    ],
    ownerActions: [
      "Approve metric definitions",
      "Confirm review cadence",
      "Assign owners for unresolved actions",
      "Review operational reporting language before production use",
    ],
    boundaries: [
      "Does not forecast or promise financial outcomes",
      "Static scaffold uses sample data only",
      "No live financial connection is included",
    ],
    safeClaims: [
      "Operational reporting framework",
      "Documented review cadence",
      "Owner-approved metric definitions",
      "Mapped exception categories",
    ],
    publicHeadline: "See the delivery operation behind the sale.",
    publicBody:
      "RevenueFrame gives owners practical reporting language for access, delivery, exceptions, support, and follow-up without pretending the dashboard creates outcomes by itself.",
    portalHeadline: "RevenueFrame reporting workspace",
    portalBody:
      "A static portal view for reviewing operational metrics, action registers, exception categories, and owner decisions.",
    pricingNotes:
      "Included in larger systems when reporting is needed; pairs naturally with ProofMetrics for ongoing operational review.",
    relatedModules: ["proofmetrics", "deliveryproof", "accessguard", "accessdesk"],
    publicPath: "/revenueframe",
    portalPath: "/app/revenueframe",
  },
  {
    slug: "accesssafe",
    name: "AccessSafe",
    category: "core",
    shortDescription:
      "A safer handover model for access ownership, documentation, review cadence, and recovery.",
    longDescription:
      "AccessSafe documents who owns access decisions, where recovery steps live, how sensitive changes are approved, and what should be reviewed after launch or handover.",
    problemSolved:
      "Teams can lose track of who owns access decisions, recovery steps, sensitive changes, and documentation updates once the system moves from build to operation.",
    idealFor: [
      "Founders handing access operations to a team",
      "Product libraries with several platform owners",
      "Launches with sensitive access rules",
      "Agencies handing a system back to a client",
    ],
    whatIsIncluded: [
      "Access owner register",
      "Recovery checklist",
      "Sensitive-change approval notes",
      "Documentation handover plan",
      "Review cadence recommendation",
      "Owner-approved handover packet",
    ],
    deliverables: [
      "Owner register",
      "Recovery route document",
      "Access handover packet",
      "Sensitive-change checklist",
      "Review cadence notes",
    ],
    portalWidgets: [
      "Owner register",
      "Recovery route viewer",
      "Documentation checklist",
      "Review reminders",
      "Sensitive-change approval notes",
    ],
    qaChecks: [
      "Access owners are named by role",
      "Recovery route is documented",
      "Sensitive changes require owner approval",
      "Review recommendations are visible",
      "Handover packet is ready for owner review",
    ],
    ownerActions: [
      "Name access owners by role",
      "Approve sensitive-change rules",
      "Review recovery route before handover",
      "Set the first post-launch review point",
    ],
    boundaries: [
      "Does not present itself as complete security coverage",
      "Does not replace platform permission reviews",
      "No production credentials are requested in the static scaffold",
    ],
    safeClaims: [
      "Documented access ownership",
      "Owner-approved recovery route",
      "Mapped review cadence",
      "Handover-ready documentation",
    ],
    publicHeadline: "Keep access ownership visible.",
    publicBody:
      "AccessSafe documents the people, rules, recovery routes, and review cadence behind buyer access so operational handover is less fragile.",
    portalHeadline: "AccessSafe handover workspace",
    portalBody:
      "A static portal view for access owners, recovery routes, documentation status, and review recommendations.",
    pricingNotes:
      "Included when handover, team operation, or ongoing review is part of the scope.",
    relatedModules: ["accessguard", "accessdesk", "accesshub", "agencyframe"],
    publicPath: "/accesssafe",
    portalPath: "/app/accesssafe",
  },
  {
    slug: "product-tracks",
    name: "Product Tracks",
    category: "core",
    shortDescription:
      "A product-by-product matrix of delivery steps, access rules, support paths, and review status.",
    longDescription:
      "Product Tracks organizes every offer, library, cohort, bundle, and add-on into a reviewable matrix so the buyer journey can be inspected product by product.",
    problemSolved:
      "Different products often use different delivery logic, access rules, messages, and support expectations, which makes launch checks and handover harder.",
    idealFor: [
      "Sellers with multiple products or tiers",
      "Bundles that combine several access paths",
      "Product libraries that need owner review",
      "Teams preparing migration or launch readiness work",
    ],
    whatIsIncluded: [
      "Product inventory",
      "Access rule by product",
      "Delivery path by product",
      "Support route by product",
      "Review status labels",
      "Owner approval summary",
    ],
    deliverables: [
      "Product matrix",
      "Track-level QA checklist",
      "Support routing notes",
      "Product handover summary",
      "Owner approval map",
    ],
    portalWidgets: [
      "Product matrix",
      "Track readiness labels",
      "Support route map",
      "Documentation status",
      "Owner approval summary",
    ],
    qaChecks: [
      "Each product has a delivery path",
      "Each product has an access rule",
      "Each product has a support route",
      "Owner has reviewed launch readiness",
      "Bundle and add-on differences are visible",
    ],
    ownerActions: [
      "Confirm the product inventory",
      "Approve access and delivery notes by product",
      "Identify products that need deeper entitlement mapping",
      "Review support routing before launch or handover",
    ],
    boundaries: [
      "Static scaffold does not connect to product platforms",
      "No automated provisioning is active",
      "No buyer data is stored",
    ],
    safeClaims: [
      "Documented product matrix",
      "Mapped product-level access rules",
      "Owner-reviewed support routes",
      "Track-level QA checklist",
    ],
    publicHeadline: "Map every product track before it reaches buyers.",
    publicBody:
      "Product Tracks organizes delivery, access, and support paths for each offer so owners can review the system product by product.",
    portalHeadline: "Product Tracks matrix",
    portalBody:
      "A static portal view for comparing product tiers, access rules, delivery paths, and review states.",
    pricingNotes:
      "Usually included in Pro, launch, premium launch, migration, and agency scopes.",
    relatedModules: ["entitlementframe", "accessguard", "migrationframe", "accesshub"],
    publicPath: "/modules#product-tracks",
    portalPath: "/app/product-matrix",
  },
  {
    slug: "entitlementframe",
    name: "EntitlementFrame",
    category: "advanced",
    shortDescription:
      "A detailed entitlement model for bundles, tiers, cohorts, upgrades, and exceptions.",
    longDescription:
      "EntitlementFrame expands access rules into a structured entitlement model. It shows which buyers should receive which assets, spaces, messages, support routes, bonuses, and follow-up steps based on offer, tier, cohort, or exception state.",
    problemSolved:
      "Advanced product libraries need clearer rules for who should receive which assets, portals, bonuses, community spaces, onboarding paths, and support routes.",
    idealFor: [
      "Premium offers with bundles or tiers",
      "Cohort products with time-bound access",
      "Sellers with upgrade and downgrade logic",
      "Teams preparing migration or launch readiness reviews",
    ],
    whatIsIncluded: [
      "Entitlement model",
      "Bundle and tier mapping",
      "Cohort access notes",
      "Upgrade and downgrade handling",
      "Manual exception notes",
      "Owner approval checkpoints",
    ],
    deliverables: [
      "Entitlement matrix",
      "Tier rule documentation",
      "Exception policy",
      "QA test scenarios",
      "Owner-approved entitlement summary",
    ],
    portalWidgets: [
      "Entitlement matrix",
      "Tier rule viewer",
      "Exception notes",
      "Approval checklist",
      "Cohort access summary",
    ],
    qaChecks: [
      "Bundle access paths are mapped",
      "Tier differences are documented",
      "Cohort access timing is reviewed",
      "Exception cases have review steps",
      "Owner-approved rules are captured",
    ],
    ownerActions: [
      "Approve entitlement rules by offer and tier",
      "Confirm upgrade and downgrade expectations",
      "Identify exceptions requiring manual review",
      "Review entitlement copy before implementation",
    ],
    boundaries: [
      "No real provisioning is performed",
      "No platform permissions are changed",
      "Access-issue risk is reduced through documentation, not erased",
    ],
    safeClaims: [
      "Mapped entitlement rules",
      "Tested sample access scenarios",
      "Owner-approved exception route",
      "Documented access lifecycle rules",
    ],
    publicHeadline: "Make complex access rules inspectable.",
    publicBody:
      "EntitlementFrame documents product tiers, bundles, cohorts, and exceptions so advanced access logic can be reviewed before launch.",
    portalHeadline: "EntitlementFrame rule matrix",
    portalBody:
      "A static portal view for reviewing entitlement records, tier differences, exception states, and owner approvals.",
    pricingNotes:
      "Included in premium launch and agency scopes; added to Pro when the product library has tier or bundle complexity.",
    relatedModules: ["accessguard", "product-tracks", "migrationframe", "accesshub"],
    publicPath: "/entitlementframe",
    portalPath: "/app/entitlementframe",
  },
  {
    slug: "inboxguard",
    name: "InboxGuard",
    category: "advanced",
    shortDescription:
      "Delivery message checks and fallback routes for buyer communication after checkout.",
    longDescription:
      "InboxGuard reviews the operational message path after purchase. It maps email, portal, support, and fallback communication so access instructions can be reviewed and recovered if a buyer misses a message.",
    problemSolved:
      "Important access messages can be hard to trace when email tools, platform notices, portal prompts, and support replies are split apart.",
    idealFor: [
      "Launches where access instructions are time-sensitive",
      "Sellers with multiple delivery messages",
      "Teams that need support resend policies",
      "Offers with onboarding steps after checkout",
    ],
    whatIsIncluded: [
      "Message inventory",
      "Access email and portal prompt review",
      "Fallback route notes",
      "Support resend policy",
      "Buyer-facing copy review",
      "Monitoring recommendation notes",
    ],
    deliverables: [
      "Message map",
      "Fallback checklist",
      "Support resend snippets",
      "Owner-approved copy notes",
      "Message QA checklist",
    ],
    portalWidgets: [
      "Message inventory",
      "Fallback route tracker",
      "Snippet library",
      "QA notes",
      "Owner copy approval",
    ],
    qaChecks: [
      "Access messages are mapped",
      "Fallback route is documented",
      "Support resend path is visible",
      "Buyer-facing copy is owner-reviewed",
      "Inbox-placement promises are avoided",
    ],
    ownerActions: [
      "Approve buyer-facing access message copy",
      "Confirm resend and fallback support policy",
      "Review which messages should be monitored after launch",
      "Name the owner for message updates",
    ],
    boundaries: [
      "InboxGuard does not promise inbox placement outcomes",
      "No email provider is connected in this scaffold",
      "Monitoring is recommended, not simulated as live",
    ],
    safeClaims: [
      "Mapped buyer message path",
      "Documented fallback route",
      "Owner-approved support resend snippets",
      "Monitoring recommended after launch",
    ],
    publicHeadline: "Plan the message path buyers need after checkout.",
    publicBody:
      "InboxGuard reviews delivery messages, fallback routes, and support resend steps so access communication is easier to inspect.",
    portalHeadline: "InboxGuard message workspace",
    portalBody:
      "A static portal view for message checks, fallback routes, resend snippets, and owner copy approvals.",
    pricingNotes:
      "Included in premium launch scopes and useful as an add-on when buyer communication has several steps.",
    relatedModules: ["deliveryproof", "accessdesk", "launchroom", "proofmetrics"],
    publicPath: "/inboxguard",
    portalPath: "/app/inboxguard",
  },
  {
    slug: "accesshub",
    name: "AccessHub",
    category: "advanced",
    shortDescription:
      "A central static portal model for access documentation, module workspaces, and handover.",
    longDescription:
      "AccessHub is the internal portal concept for FolioFrame. It organizes module workspaces, route maps, delivery proof, support notes, product matrices, review status, and handover packets in one owner-reviewable place.",
    problemSolved:
      "Owners need one place to review access rules, delivery paths, support routes, documentation status, and handover readiness without treating the static MVP as a live system.",
    idealFor: [
      "Premium builds with several FolioFrame modules",
      "Teams preparing owner handover",
      "Agencies needing a repeatable client workspace",
      "Launches requiring a central review dashboard",
    ],
    whatIsIncluded: [
      "Portal information architecture",
      "Module workspace plan",
      "Dashboard metric definitions",
      "Handover packet model",
      "Review status labels",
      "Static demo-only portal notes",
    ],
    deliverables: [
      "Portal map",
      "Workspace templates",
      "Static dashboard copy",
      "Handover structure",
      "Review status model",
    ],
    portalWidgets: [
      "Workspace index",
      "Review status board",
      "Handover documents",
      "Module shortcuts",
      "Owner action list",
    ],
    qaChecks: [
      "Portal labels are clear",
      "Static demo status is visible",
      "No real auth is implied",
      "No customer data appears in demo records",
      "Owner review points are present",
    ],
    ownerActions: [
      "Approve portal workspace labels",
      "Confirm which documents belong in handover",
      "Review demo-only disclaimers",
      "Identify production data and auth decisions for a later phase",
    ],
    boundaries: [
      "No real authentication is included",
      "No real customer data is stored",
      "Static portal is for demonstration only",
    ],
    safeClaims: [
      "Central review workspace",
      "Static demo-only portal model",
      "Documented handover structure",
      "Owner-approved module status labels",
    ],
    publicHeadline: "Bring the delivery operation into one reviewable portal.",
    publicBody:
      "AccessHub gives owners a central static workspace model for reviewing access rules, delivery proof, support paths, product tracks, reporting, and handover readiness.",
    portalHeadline: "AccessHub workspace index",
    portalBody:
      "A static portal view for navigating module workspaces, demo data, owner actions, and handover packets.",
    pricingNotes:
      "Included in premium launch and agency scopes; useful for any system that needs an internal owner-review portal.",
    relatedModules: ["accesssafe", "proofmetrics", "agencyframe", "launchroom"],
    publicPath: "/accesshub",
    portalPath: "/app/accesshub",
  },
  {
    slug: "launchroom",
    name: "LaunchRoom",
    category: "add-on",
    shortDescription:
      "A launch readiness room for rehearsals, issue triage, monitoring recommendations, and approvals.",
    longDescription:
      "LaunchRoom organizes launch readiness into a calm operational workspace. It defines rehearsal scenarios, launch-week checks, issue categories, escalation routes, monitoring recommendations, and owner approvals.",
    problemSolved:
      "Launches can rely on memory when the checkout-to-customer system needs a documented review sequence before buyers arrive.",
    idealFor: [
      "Premium launches with several stakeholders",
      "Launches with multiple offers or checkout paths",
      "Teams that need rehearsal scenarios before opening cart",
      "Owners who want issue triage documented in advance",
    ],
    whatIsIncluded: [
      "Launch readiness checklist",
      "Checkout and access rehearsal scenarios",
      "Issue triage route",
      "Monitoring recommendation notes",
      "Owner approval log",
      "Launch handover summary",
    ],
    deliverables: [
      "Launch room plan",
      "Rehearsal checklist",
      "Issue triage notes",
      "Launch handover summary",
      "Owner approval record",
    ],
    portalWidgets: [
      "Readiness checklist",
      "Rehearsal scenarios",
      "Issue triage board",
      "Approval notes",
      "Monitoring recommendation panel",
    ],
    qaChecks: [
      "Checkout scenario is rehearsed",
      "Access scenario is reviewed",
      "Support route is documented",
      "Monitoring is recommended without being presented as live",
      "Owner approval is recorded before launch",
    ],
    ownerActions: [
      "Approve readiness criteria",
      "Join or review rehearsal outcomes",
      "Name escalation owners for launch week",
      "Confirm which monitoring recommendations will be implemented later",
    ],
    boundaries: [
      "No fake live monitoring is included",
      "No platform operations are automated",
      "No launch outcome promise is made",
    ],
    safeClaims: [
      "Launch readiness mapped",
      "Sample scenarios tested",
      "Owner-approved triage route",
      "Monitoring recommended after launch",
    ],
    publicHeadline: "Rehearse the buyer journey before launch pressure arrives.",
    publicBody:
      "LaunchRoom organizes launch readiness, sample scenarios, issue triage notes, monitoring recommendations, and owner approvals for a calmer checkout-to-customer rollout.",
    portalHeadline: "LaunchRoom readiness workspace",
    portalBody:
      "A static portal view for launch scenarios, readiness checks, triage issues, and owner approval notes.",
    pricingNotes:
      "Sold as part of Signature Launch + LaunchRoom at £11,500-£14,500 or included in selected premium scopes.",
    relatedModules: ["inboxguard", "deliveryproof", "proofmetrics", "accesshub"],
    publicPath: "/launchroom",
    portalPath: "/app/launchroom",
  },
  {
    slug: "migrationframe",
    name: "MigrationFrame",
    category: "add-on",
    shortDescription:
      "A migration planning system for moving offers, access rules, delivery paths, and buyer communication.",
    longDescription:
      "MigrationFrame maps what needs to move when a seller changes platforms, rebuilds a product library, or restructures an offer. It focuses on access continuity, delivery messages, buyer communication, support routes, and post-move review.",
    problemSolved:
      "Platform moves can disrupt access rules, delivery messages, product structures, support expectations, and handover records when the migration is not documented.",
    idealFor: [
      "Platform moves",
      "Product library rebuilds",
      "Offer restructuring projects",
      "Teams preparing buyer communication for a system change",
    ],
    whatIsIncluded: [
      "Migration inventory",
      "Access continuity map",
      "Product and entitlement review",
      "Buyer communication plan",
      "Cutover review checklist",
      "Post-move review agenda",
    ],
    deliverables: [
      "Migration plan",
      "Continuity checklist",
      "Buyer message notes",
      "Cutover owner approvals",
      "Post-move review agenda",
    ],
    portalWidgets: [
      "Migration inventory",
      "Continuity checklist",
      "Communication plan",
      "Cutover approval notes",
      "Post-move review notes",
    ],
    qaChecks: [
      "Products are inventoried",
      "Access continuity is documented",
      "Buyer messages are reviewed",
      "Owner approval is required before cutover",
      "Post-move review actions are listed",
    ],
    ownerActions: [
      "Confirm migration inventory",
      "Approve access continuity decisions",
      "Review buyer communication notes",
      "Approve cutover readiness before production movement",
    ],
    boundaries: [
      "No real platform migration runs inside this scaffold",
      "No legal certification claim is made",
      "No production data is imported",
    ],
    safeClaims: [
      "Mapped migration inventory",
      "Documented continuity checklist",
      "Owner-approved cutover notes",
      "Post-move monitoring recommended",
    ],
    publicHeadline: "Move the system with the buyer journey intact.",
    publicBody:
      "MigrationFrame maps access, delivery, messaging, support, and reporting considerations before a platform or product library move.",
    portalHeadline: "MigrationFrame continuity workspace",
    portalBody:
      "A static portal view for migration items, continuity decisions, communication notes, and post-move review actions.",
    pricingNotes:
      "Sold as an add-on at £1,500-£5,000 depending on product count, migration complexity, and review depth.",
    relatedModules: ["entitlementframe", "product-tracks", "inboxguard", "accesssafe"],
    publicPath: "/migrationframe",
    portalPath: "/app/migrationframe",
  },
  {
    slug: "proofmetrics",
    name: "ProofMetrics",
    category: "advanced",
    shortDescription:
      "Operational reporting for delivery proof, access exceptions, support themes, and owner actions.",
    longDescription:
      "ProofMetrics structures the recurring review layer for a FolioFrame system. It defines operational metrics, delivery proof signals, access exception categories, support themes, owner actions, and review cadence.",
    problemSolved:
      "Delivery and access work needs useful review signals without pretending every metric is a performance promise.",
    idealFor: [
      "Sellers reviewing system health after launch",
      "Retainer clients who need monthly operational reporting",
      "Teams tracking access exceptions and support themes",
      "Owners who need clear action registers",
    ],
    whatIsIncluded: [
      "Metric definition library",
      "Delivery proof indicators",
      "Exception category model",
      "Support theme review",
      "Review report structure",
      "Action register",
    ],
    deliverables: [
      "Metric glossary",
      "Static report template",
      "Exception review board",
      "Support theme summary",
      "Action register",
    ],
    portalWidgets: [
      "Metric cards",
      "Exception notes",
      "Support theme board",
      "Review actions",
      "Reporting cadence",
    ],
    qaChecks: [
      "Metrics are operational and plain-language",
      "Sample data is labelled clearly",
      "Review actions have owners",
      "Monitoring recommendations are documented",
      "Copy avoids revenue or delivery outcome promises",
    ],
    ownerActions: [
      "Approve metric definitions",
      "Review monthly action register",
      "Assign owners to exception patterns",
      "Confirm which monitoring recommendations move into production",
    ],
    boundaries: [
      "No live analytics are connected",
      "No revenue or delivery outcome promise is made",
      "No customer data is included",
    ],
    safeClaims: [
      "Operational reporting framework",
      "Mapped exception categories",
      "Owner-approved action register",
      "Monitoring recommended after launch",
    ],
    publicHeadline: "Review delivery operations with practical metrics.",
    publicBody:
      "ProofMetrics structures operational reporting around delivery proof, access exceptions, support themes, and owner-approved actions.",
    portalHeadline: "ProofMetrics review workspace",
    portalBody:
      "A static portal view for operational metrics, exception patterns, support themes, and owner action registers.",
    pricingNotes:
      "Included in premium scopes and paired with AccessGuard in the £1,497/month review retainer.",
    relatedModules: ["revenueframe", "deliveryproof", "accessguard", "launchroom"],
    publicPath: "/proofmetrics",
    portalPath: "/app/proofmetrics",
  },
  {
    slug: "agencyframe",
    name: "AgencyFrame",
    category: "agency",
    shortDescription:
      "A multi-client operating model for agencies building buyer access and delivery systems.",
    longDescription:
      "AgencyFrame packages FolioFrame methods into a repeatable agency delivery model. It defines module templates, client workspace standards, QA checklists, reporting language, and handover practices across multiple client systems.",
    problemSolved:
      "Agencies need repeatable delivery standards, handover templates, QA language, and reporting structure across client systems without mixing real client data into demo spaces.",
    idealFor: [
      "Agencies implementing digital product delivery systems",
      "Teams needing repeatable QA standards",
      "Consultants packaging access reliability delivery",
      "Multi-client operators who need handover consistency",
    ],
    whatIsIncluded: [
      "Client delivery framework",
      "Reusable module templates",
      "Client workspace model",
      "Handover standards",
      "QA standard checklist",
      "Review cadence model",
    ],
    deliverables: [
      "Agency operating manual",
      "Client portal map",
      "QA standard checklist",
      "Reporting template pack",
      "Handover template pack",
    ],
    portalWidgets: [
      "Client workspace index",
      "Template library",
      "QA standard board",
      "Handover tracker",
      "Review cadence panel",
    ],
    qaChecks: [
      "Client system boundaries are stated",
      "Static templates avoid real customer data",
      "Owner approval route is documented",
      "Scope limits are visible",
      "Platform relationship language is careful",
    ],
    ownerActions: [
      "Approve agency delivery standards",
      "Confirm client workspace labels",
      "Review template language before client use",
      "Assign QA ownership for each implementation",
    ],
    boundaries: [
      "No agency-client legal framework is provided",
      "No platform relationship status is implied",
      "No production client data is stored",
    ],
    safeClaims: [
      "Repeatable agency delivery framework",
      "Documented QA standards",
      "Static client workspace model",
      "Owner-approved handover templates",
    ],
    publicHeadline: "Standardize access reliability delivery across client systems.",
    publicBody:
      "AgencyFrame packages FolioFrame methods into a static operating model for agencies that build checkout-to-customer systems.",
    portalHeadline: "AgencyFrame client workspace model",
    portalBody:
      "A static portal view for sample agency clients, template libraries, QA standards, and handover trackers.",
    pricingNotes:
      "Sold as a larger implementation at £12,500-£25,000+ depending on client count, template depth, and delivery standards required.",
    relatedModules: ["accesshub", "accesssafe", "proofmetrics", "product-tracks"],
    publicPath: "/agencyframe",
    portalPath: "/app/agencyframe",
  },
  {
    slug: "verified-delivery-standard",
    name: "FolioFrame Verified Delivery Standard",
    category: "advanced",
    shortDescription:
      "A documented operational standard for mapped, tested, and owner-approved delivery systems.",
    longDescription:
      "The FolioFrame Verified Delivery Standard defines the review criteria for a checkout-to-customer system. It covers payment confirmation, entitlement and access lifecycle rules, delivery proof, onboarding, support recovery, follow-up, migration readiness, monitoring recommendations, reporting, and owner approval.",
    problemSolved:
      "Owners need a clear operational standard for what has been reviewed before a buyer journey is considered ready for production implementation.",
    idealFor: [
      "Premium launches needing a readiness standard",
      "Product libraries requiring handover discipline",
      "Agencies packaging client delivery quality",
      "Sellers preparing ongoing operational review",
    ],
    whatIsIncluded: [
      "Standard criteria",
      "Evidence expectations",
      "QA review checkpoints",
      "Owner approval notes",
      "Monitoring recommendation criteria",
      "Handover readiness checks",
    ],
    deliverables: [
      "Verified delivery checklist",
      "Evidence packet structure",
      "QA review summary",
      "Owner approval record",
      "Operational readiness notes",
    ],
    portalWidgets: [
      "Standard checklist",
      "Evidence packet",
      "QA review notes",
      "Approval record",
      "Readiness status labels",
    ],
    qaChecks: [
      "Checkout-to-customer map is complete",
      "Delivery safeguards are documented",
      "Recovery route is practical",
      "Monitoring recommendations are stated",
      "Owner approval is recorded",
    ],
    ownerActions: [
      "Review standard criteria",
      "Approve evidence expectations",
      "Confirm readiness status before production use",
      "Assign owner for ongoing review cadence",
    ],
    boundaries: [
      "The standard is operational, not a legal certification",
      "No delivery outcome promise is made",
      "Monitoring remains recommended after launch",
    ],
    safeClaims: [
      "Mapped checkout-to-customer standard",
      "Documented delivery safeguards",
      "Owner-approved readiness criteria",
      "Operational reporting and review route",
    ],
    publicHeadline: "A delivery standard built around practical proof.",
    publicBody:
      "The FolioFrame Verified Delivery Standard defines how checkout, entitlement, access, delivery, support, reporting, and handover should be mapped, tested, documented, and owner-approved.",
    portalHeadline: "Verified Delivery Standard checklist",
    portalBody:
      "A static portal view for readiness criteria, evidence expectations, QA notes, and owner approvals.",
    pricingNotes:
      "Included as a standard and handover layer in premium launch, retainer, and agency scopes.",
    relatedModules: ["deliveryproof", "accessguard", "proofmetrics", "accesssafe"],
    publicPath: "/verified-delivery-standard",
    portalPath: "/app/verified-delivery",
  },
] as const satisfies readonly FolioFrameModule[];

export type ModuleSlug = (typeof folioframeModules)[number]["slug"];

export const coreModules = folioframeModules.filter(
  (moduleInfo) => moduleInfo.category === "core",
);

export const advancedModules = folioframeModules.filter(
  (moduleInfo) => moduleInfo.category === "advanced",
);

export const addOnModules = folioframeModules.filter(
  (moduleInfo) => moduleInfo.category === "add-on",
);

export const agencyModules = folioframeModules.filter(
  (moduleInfo) => moduleInfo.category === "agency",
);

export const standardModules = folioframeModules.filter(
  (moduleInfo) => moduleInfo.slug === "verified-delivery-standard",
);
