export type FolioFrameModule = {
  slug: string;
  name: string;
  category: "Core" | "Advanced" | "Standard";
  shortDescription: string;
  problemSolved: string;
  included: readonly string[];
  deliverables: readonly string[];
  portalWidgets: readonly string[];
  qaChecks: readonly string[];
  boundaries: readonly string[];
  websiteHeadline: string;
  websiteBody: string;
  publicPath: string;
  portalPath: string;
};

export const folioframeModules = [
  {
    slug: "foliofix",
    name: "FolioFix",
    category: "Core",
    shortDescription: "A structured audit and repair plan for buyer access gaps.",
    problemSolved:
      "Digital product sellers often have disconnected checkout, access, email and support steps that are difficult to inspect.",
    included: [
      "Checkout-to-customer flow map",
      "Access failure review",
      "Delivery message review",
      "Recovery route recommendations",
    ],
    deliverables: [
      "Annotated flow map",
      "Risk register",
      "Owner-approved repair backlog",
      "Priority implementation notes",
    ],
    portalWidgets: [
      "Flow map status",
      "Repair queue",
      "QA checklist",
      "Owner approval tracker",
    ],
    qaChecks: [
      "Payment confirmation path is documented",
      "Access email path is tested with sample scenarios",
      "Support escalation route is visible",
      "Owner review notes are captured",
    ],
    boundaries: [
      "No real payment processing is run inside this static scaffold",
      "No legal or security certification is implied",
      "Platform changes remain owner-approved",
    ],
    websiteHeadline: "Find the weak points before buyers do.",
    websiteBody:
      "FolioFix gives sellers a mapped, tested and documented view of the handoff between checkout, access, delivery and support.",
    publicPath: "/foliofix",
    portalPath: "/app/foliofix",
  },
  {
    slug: "deliveryproof",
    name: "DeliveryProof",
    category: "Core",
    shortDescription: "A practical evidence trail for what buyers were sent and when.",
    problemSolved:
      "Sellers need a clear record of delivery steps without overstating what any platform can prove alone.",
    included: [
      "Delivery event checklist",
      "Email and portal handoff notes",
      "Support-ready evidence summary",
      "Handover documentation",
    ],
    deliverables: [
      "Delivery proof map",
      "Buyer message inventory",
      "Support response snippets",
      "Owner-approved evidence policy",
    ],
    portalWidgets: [
      "Delivery evidence log",
      "Message sample library",
      "Support proof packet",
      "Exception notes",
    ],
    qaChecks: [
      "Delivery steps are documented",
      "Sample buyer journey is reviewed",
      "Evidence fields are easy to export",
      "Support team notes stay consistent",
    ],
    boundaries: [
      "Avoids deliverability promises",
      "Does not replace payment processor records",
      "Does not provide legal advice",
    ],
    websiteHeadline: "Document delivery without making promises a system cannot keep.",
    websiteBody:
      "DeliveryProof creates a clean operational record for delivery events, buyer messages, access steps and support-ready evidence.",
    publicPath: "/deliveryproof",
    portalPath: "/app/deliveryproof",
  },
  {
    slug: "accessguard",
    name: "AccessGuard",
    category: "Core",
    shortDescription: "Access lifecycle rules for products, buyers and exceptions.",
    problemSolved:
      "Manual access setup, upgrades, refunds and exceptions can create inconsistent buyer experiences.",
    included: [
      "Access rule matrix",
      "Exception handling path",
      "Refund and revoke notes",
      "Owner-approved lifecycle policy",
    ],
    deliverables: [
      "Access lifecycle matrix",
      "Role and entitlement notes",
      "Exception response guide",
      "QA scenario checklist",
    ],
    portalWidgets: [
      "Access rule viewer",
      "Exception queue",
      "Product entitlement summary",
      "Review notes",
    ],
    qaChecks: [
      "New purchase access scenario is tested",
      "Upgrade and downgrade routes are documented",
      "Refund path is reviewed",
      "Manual override route is clear",
    ],
    boundaries: [
      "No production access changes happen in this static app",
      "No absolute security promise is made",
      "Owner remains responsible for platform permissions",
    ],
    websiteHeadline: "Turn buyer access into a documented operating system.",
    websiteBody:
      "AccessGuard maps product access rules, exception routes and owner-approved lifecycle decisions so the delivery system is easier to run.",
    publicPath: "/accessguard",
    portalPath: "/app/accessguard",
  },
  {
    slug: "accessdesk",
    name: "AccessDesk",
    category: "Core",
    shortDescription: "A support desk workflow for access questions and delivery exceptions.",
    problemSolved:
      "Access support can become scattered across inboxes, platform notes and team memory.",
    included: [
      "Support intake categories",
      "Buyer lookup checklist",
      "Response snippet library",
      "Escalation route",
    ],
    deliverables: [
      "Support playbook",
      "Issue category map",
      "Resolution note templates",
      "Escalation guide",
    ],
    portalWidgets: [
      "Support intake board",
      "Resolution tracker",
      "Snippet library",
      "Escalation notes",
    ],
    qaChecks: [
      "Common access issues have response paths",
      "Escalation owner is documented",
      "Refund-sensitive cases are flagged",
      "Resolution notes are consistent",
    ],
    boundaries: [
      "No real customer data is stored",
      "No platform support partnership is implied",
      "No legal advice is provided",
    ],
    websiteHeadline: "Give access support a clear recovery route.",
    websiteBody:
      "AccessDesk turns buyer access questions into a documented support workflow with intake categories, response snippets and escalation notes.",
    publicPath: "/accessdesk",
    portalPath: "/app/accessdesk",
  },
  {
    slug: "revenueframe",
    name: "RevenueFrame",
    category: "Core",
    shortDescription: "Operational reporting for the buyer journey after checkout.",
    problemSolved:
      "Sellers can see sales but still lack a useful view of delivery readiness, access exceptions and support pressure.",
    included: [
      "Operational metric definitions",
      "Buyer journey review points",
      "Exception reporting outline",
      "Monthly review agenda",
    ],
    deliverables: [
      "Reporting framework",
      "Metric glossary",
      "Static dashboard plan",
      "Review meeting template",
    ],
    portalWidgets: [
      "Operational snapshot",
      "Exception trend notes",
      "Delivery readiness indicators",
      "Review actions",
    ],
    qaChecks: [
      "Metrics are defined in plain language",
      "No revenue guarantee is implied",
      "Data source ownership is documented",
      "Review cadence is recommended",
    ],
    boundaries: [
      "Does not forecast or guarantee revenue",
      "Static scaffold uses sample data only",
      "No live financial connection is included",
    ],
    websiteHeadline: "See the delivery operation behind the sale.",
    websiteBody:
      "RevenueFrame gives owners practical reporting language for access, delivery, exceptions and follow-up without pretending the dashboard creates revenue by itself.",
    publicPath: "/revenueframe",
    portalPath: "/app/revenueframe",
  },
  {
    slug: "accesssafe",
    name: "AccessSafe",
    category: "Core",
    shortDescription: "A safer handover model for access, documentation and recovery.",
    problemSolved:
      "Teams can lose track of who owns access decisions, recovery steps and documentation updates.",
    included: [
      "Access owner register",
      "Recovery checklist",
      "Documentation handover notes",
      "Review cadence",
    ],
    deliverables: [
      "Owner register",
      "Recovery route document",
      "Access handover packet",
      "Review checklist",
    ],
    portalWidgets: [
      "Owner register",
      "Recovery route viewer",
      "Documentation checklist",
      "Review reminders",
    ],
    qaChecks: [
      "Access owners are named by role",
      "Recovery route is documented",
      "Sensitive changes require owner approval",
      "Review recommendations are visible",
    ],
    boundaries: [
      "Does not claim full security coverage",
      "Does not replace platform permission reviews",
      "No production credentials are requested",
    ],
    websiteHeadline: "Keep access ownership visible.",
    websiteBody:
      "AccessSafe documents the people, rules and recovery routes behind buyer access so operational handover is less fragile.",
    publicPath: "/accesssafe",
    portalPath: "/app/accesssafe",
  },
  {
    slug: "product-tracks",
    name: "Product Tracks",
    category: "Core",
    shortDescription: "A product-by-product map of delivery steps, access rules and support paths.",
    problemSolved:
      "Different products often use different delivery logic, which makes launch checks and support handover harder.",
    included: [
      "Product access matrix",
      "Delivery path notes",
      "Support route by product",
      "Handover readiness labels",
    ],
    deliverables: [
      "Product matrix",
      "Track-level QA checklist",
      "Support routing notes",
      "Owner approval summary",
    ],
    portalWidgets: [
      "Product matrix",
      "Track readiness labels",
      "Support route map",
      "Documentation status",
    ],
    qaChecks: [
      "Each product has a delivery path",
      "Each product has an access rule",
      "Support route is documented",
      "Owner has reviewed launch readiness",
    ],
    boundaries: [
      "Static scaffold does not connect to product platforms",
      "No automated provisioning is active",
      "No buyer data is stored",
    ],
    websiteHeadline: "Map every product track before it reaches buyers.",
    websiteBody:
      "Product Tracks organizes the delivery, access and support path for each offer so owners can review the system product by product.",
    publicPath: "/modules#product-tracks",
    portalPath: "/app/product-matrix",
  },
  {
    slug: "entitlementframe",
    name: "EntitlementFrame",
    category: "Advanced",
    shortDescription: "A detailed entitlement model for bundles, tiers, cohorts and exceptions.",
    problemSolved:
      "Advanced product libraries need clearer rules for who should receive which assets, spaces and follow-up sequences.",
    included: [
      "Entitlement model",
      "Bundle and tier mapping",
      "Manual exception notes",
      "Owner approval checkpoints",
    ],
    deliverables: [
      "Entitlement matrix",
      "Tier rule documentation",
      "Exception policy",
      "QA test scenarios",
    ],
    portalWidgets: [
      "Entitlement matrix",
      "Tier rule viewer",
      "Exception notes",
      "Approval checklist",
    ],
    qaChecks: [
      "Bundle access paths are mapped",
      "Tier differences are documented",
      "Exception cases have review steps",
      "Owner-approved rules are captured",
    ],
    boundaries: [
      "No real provisioning is performed",
      "No platform permissions are changed",
      "Avoids absolute access-issue promises",
    ],
    websiteHeadline: "Make complex access rules inspectable.",
    websiteBody:
      "EntitlementFrame documents product tiers, bundles, cohorts and exceptions so advanced access logic can be reviewed before launch.",
    publicPath: "/entitlementframe",
    portalPath: "/app/entitlementframe",
  },
  {
    slug: "inboxguard",
    name: "InboxGuard",
    category: "Advanced",
    shortDescription: "Delivery message checks and fallback routes for buyer communication.",
    problemSolved:
      "Important access messages can be hard to trace when email tools, platform notices and support replies are split apart.",
    included: [
      "Message inventory",
      "Fallback route notes",
      "Support resend policy",
      "Buyer-facing copy review",
    ],
    deliverables: [
      "Message map",
      "Fallback checklist",
      "Support resend snippets",
      "Owner-approved copy notes",
    ],
    portalWidgets: [
      "Message inventory",
      "Fallback route tracker",
      "Snippet library",
      "QA notes",
    ],
    qaChecks: [
      "Access messages are mapped",
      "Fallback route is documented",
      "Support resend path is visible",
      "No inbox placement promise is made",
    ],
    boundaries: [
      "Avoids inbox-placement promises",
      "Does not connect to email providers in this scaffold",
      "Monitoring is recommended, not simulated as live",
    ],
    websiteHeadline: "Plan the message path buyers need after checkout.",
    websiteBody:
      "InboxGuard reviews delivery messages, fallback routes and support resend steps so access communication is easier to inspect.",
    publicPath: "/inboxguard",
    portalPath: "/app/inboxguard",
  },
  {
    slug: "accesshub",
    name: "AccessHub",
    category: "Advanced",
    shortDescription: "A central static portal model for access documentation and handover.",
    problemSolved:
      "Owners need one place to review access rules, delivery paths, support routes and documentation status.",
    included: [
      "Portal information architecture",
      "Module workspace plan",
      "Handover packet model",
      "Review status labels",
    ],
    deliverables: [
      "Portal map",
      "Workspace templates",
      "Handover structure",
      "Static dashboard copy",
    ],
    portalWidgets: [
      "Workspace index",
      "Review status board",
      "Handover documents",
      "Module shortcuts",
    ],
    qaChecks: [
      "Portal labels are clear",
      "Static demo status is visible",
      "No real auth is implied",
      "Owner review points are present",
    ],
    boundaries: [
      "No real authentication is included",
      "No real customer data is stored",
      "Static portal is for demonstration only",
    ],
    websiteHeadline: "Bring the delivery operation into one reviewable portal.",
    websiteBody:
      "AccessHub gives owners a central static workspace model for reviewing access rules, delivery proof, support paths and handover readiness.",
    publicPath: "/accesshub",
    portalPath: "/app/accesshub",
  },
  {
    slug: "launchroom",
    name: "LaunchRoom",
    category: "Advanced",
    shortDescription: "A launch readiness room for rehearsals, checklists and owner approvals.",
    problemSolved:
      "Launches can rely on memory when the checkout-to-customer system needs a calm review sequence.",
    included: [
      "Launch readiness checklist",
      "Rehearsal scenario plan",
      "Issue triage route",
      "Owner approval log",
    ],
    deliverables: [
      "Launch room plan",
      "Rehearsal checklist",
      "Issue triage notes",
      "Launch handover summary",
    ],
    portalWidgets: [
      "Readiness checklist",
      "Rehearsal scenarios",
      "Issue triage board",
      "Approval notes",
    ],
    qaChecks: [
      "Checkout scenario is rehearsed",
      "Access scenario is reviewed",
      "Support route is documented",
      "Launch monitoring is recommended without being presented as live",
    ],
    boundaries: [
      "No fake live monitoring is included",
      "No platform operations are automated",
      "No outcome guarantee is implied",
    ],
    websiteHeadline: "Rehearse the buyer journey before launch pressure arrives.",
    websiteBody:
      "LaunchRoom organizes launch readiness, sample scenarios, triage notes and owner approvals for a calmer checkout-to-customer rollout.",
    publicPath: "/launchroom",
    portalPath: "/app/launchroom",
  },
  {
    slug: "migrationframe",
    name: "MigrationFrame",
    category: "Advanced",
    shortDescription: "A migration planning system for moving offers, buyers and delivery paths.",
    problemSolved:
      "Platform moves can disrupt access rules, delivery messages, product structures and support expectations.",
    included: [
      "Migration inventory",
      "Access continuity map",
      "Buyer communication plan",
      "Cutover review checklist",
    ],
    deliverables: [
      "Migration plan",
      "Continuity checklist",
      "Buyer message notes",
      "Post-move review agenda",
    ],
    portalWidgets: [
      "Migration inventory",
      "Continuity checklist",
      "Communication plan",
      "Post-move review notes",
    ],
    qaChecks: [
      "Products are inventoried",
      "Access continuity is documented",
      "Buyer messages are reviewed",
      "Owner approval is required before cutover",
    ],
    boundaries: [
      "No real platform migration runs inside this scaffold",
      "No legal certification claim is made",
      "No production data is imported",
    ],
    websiteHeadline: "Move the system with the buyer journey intact.",
    websiteBody:
      "MigrationFrame maps access, delivery, messaging and support considerations before a platform or product library move.",
    publicPath: "/migrationframe",
    portalPath: "/app/migrationframe",
  },
  {
    slug: "proofmetrics",
    name: "ProofMetrics",
    category: "Advanced",
    shortDescription: "Operational reporting for delivery proof, access exceptions and support trends.",
    problemSolved:
      "Delivery and access work needs useful review signals without pretending every metric is a performance guarantee.",
    included: [
      "Metric definition library",
      "Exception category model",
      "Review report structure",
      "Action register",
    ],
    deliverables: [
      "Metric glossary",
      "Static report template",
      "Exception review board",
      "Action register",
    ],
    portalWidgets: [
      "Metric cards",
      "Exception notes",
      "Review actions",
      "Reporting cadence",
    ],
    qaChecks: [
      "Metrics are operational, not guarantee-based",
      "Sample data is labelled clearly",
      "Review actions have owners",
      "Monitoring recommendations are documented",
    ],
    boundaries: [
      "No live analytics are connected",
      "No revenue or delivery guarantee is made",
      "No customer data is included",
    ],
    websiteHeadline: "Review delivery operations with practical metrics.",
    websiteBody:
      "ProofMetrics structures operational reporting around delivery proof, access exceptions, support themes and owner-approved actions.",
    publicPath: "/proofmetrics",
    portalPath: "/app/proofmetrics",
  },
  {
    slug: "agencyframe",
    name: "AgencyFrame",
    category: "Advanced",
    shortDescription: "A multi-client operating model for agencies building buyer access systems.",
    problemSolved:
      "Agencies need repeatable delivery standards, handover templates and reporting language across client systems.",
    included: [
      "Client delivery framework",
      "Reusable module templates",
      "Handover standards",
      "Review cadence model",
    ],
    deliverables: [
      "Agency operating manual",
      "Client portal map",
      "QA standard checklist",
      "Reporting template pack",
    ],
    portalWidgets: [
      "Client workspace index",
      "Template library",
      "QA standard board",
      "Handover tracker",
    ],
    qaChecks: [
      "Client system boundaries are stated",
      "Static templates avoid real customer data",
      "Owner approval route is documented",
      "Scope limits are visible",
    ],
    boundaries: [
      "No agency-client legal framework is provided",
      "No platform partnership status is implied",
      "No production client data is stored",
    ],
    websiteHeadline: "Standardize access reliability delivery across client systems.",
    websiteBody:
      "AgencyFrame packages FolioFrame methods into a static operating model for agencies that build checkout-to-customer systems.",
    publicPath: "/agencyframe",
    portalPath: "/app/agencyframe",
  },
  {
    slug: "verified-delivery-standard",
    name: "FolioFrame Verified Delivery Standard",
    category: "Standard",
    shortDescription: "A documented standard for mapped, tested and owner-approved delivery systems.",
    problemSolved:
      "Owners need a clear standard for what has been reviewed before a buyer journey is considered ready.",
    included: [
      "Standard criteria",
      "Evidence expectations",
      "QA review checkpoints",
      "Owner approval notes",
    ],
    deliverables: [
      "Verified delivery checklist",
      "Evidence packet structure",
      "QA review summary",
      "Owner approval record",
    ],
    portalWidgets: [
      "Standard checklist",
      "Evidence packet",
      "QA review notes",
      "Approval record",
    ],
    qaChecks: [
      "Checkout-to-customer map is complete",
      "Delivery safeguards are documented",
      "Recovery route is practical",
      "Owner approval is recorded",
    ],
    boundaries: [
      "Standard is operational, not a legal certification",
      "No delivery outcome promise is made",
      "Monitoring remains recommended after launch",
    ],
    websiteHeadline: "A delivery standard built around practical proof.",
    websiteBody:
      "The FolioFrame Verified Delivery Standard defines how checkout, access, delivery, support and reporting should be mapped, tested and documented.",
    publicPath: "/verified-delivery-standard",
    portalPath: "/app/verified-delivery",
  },
] as const satisfies readonly FolioFrameModule[];

export type ModuleSlug = (typeof folioframeModules)[number]["slug"];

export const coreModules = folioframeModules.filter(
  (module) => module.category === "Core",
);

export const advancedModules = folioframeModules.filter(
  (module) => module.category === "Advanced",
);

export const standardModules = folioframeModules.filter(
  (module) => module.category === "Standard",
);

export function getModuleBySlug(slug: string) {
  return folioframeModules.find((module) => module.slug === slug);
}
