import type { ModuleSlug } from "./folioframeModules";

export type FolioFrameOffer = {
  slug: string;
  name: string;
  priceRange: string;
  bestFor: string;
  outcome: string;
  includedModules: readonly ModuleSlug[];
  deliverables: readonly string[];
  timeline: string;
  notIncluded: readonly string[];
  ownerResponsibilities: readonly string[];
  upsellPath: string;
  safeScopeBoundary: string;
  ctaLabel: string;
  path: string;
  featured?: boolean;
};

export const folioframeOffers = [
  {
    slug: "foliofix-audit",
    name: "FolioFix Audit",
    priceRange: "£497-£997",
    bestFor:
      "Existing digital product sellers who need a focused audit before committing to a full access reliability build.",
    outcome:
      "A mapped checkout-to-customer journey, documented risk register, and owner-approved repair backlog.",
    includedModules: ["foliofix", "deliveryproof", "accessguard", "accessdesk"],
    deliverables: [
      "Annotated buyer journey map",
      "Access and delivery risk register",
      "Priority repair recommendations",
      "Support recovery route notes",
      "Owner-approved next-step summary",
    ],
    timeline: "Typically 3-7 working days after source material is provided.",
    notIncluded: [
      "Production platform changes",
      "Real payment, email, or automation connections",
      "Migration execution",
      "Ongoing monitoring",
    ],
    ownerResponsibilities: [
      "Provide current checkout, delivery, access, and support flow notes",
      "Confirm product list and owner contacts",
      "Review and approve the repair backlog",
    ],
    upsellPath:
      "Move into FolioFrame Pro System when the audit reveals a clear repair and documentation build.",
    safeScopeBoundary:
      "FolioFix documents operational gaps and repair priorities; it does not present itself as a production implementation.",
    ctaLabel: "Start with FolioFix",
    path: "/foliofix",
  },
  {
    slug: "folioframe-pro-system",
    name: "FolioFrame Pro System",
    priceRange: "£1,997-£2,997",
    bestFor:
      "Sellers with one product library or a focused offer suite that needs documented access, delivery, support, and handover structure.",
    outcome:
      "A practical buyer-access reliability system covering product tracks, access lifecycle rules, delivery proof, support recovery, and handover notes.",
    includedModules: [
      "foliofix",
      "deliveryproof",
      "accessguard",
      "accessdesk",
      "revenueframe",
      "accesssafe",
      "product-tracks",
    ],
    deliverables: [
      "Product Tracks matrix",
      "Access lifecycle rule set",
      "DeliveryProof evidence packet",
      "AccessDesk support workflow",
      "AccessSafe handover packet",
      "Operational reporting outline",
    ],
    timeline: "Typically 1-2 weeks depending on product count and owner review speed.",
    notIncluded: [
      "Real authentication",
      "Payment processing setup",
      "Email provider implementation",
      "Automation platform implementation",
      "Live customer data migration",
    ],
    ownerResponsibilities: [
      "Confirm product inventory and access rules",
      "Review buyer-facing messages",
      "Approve support and handover language",
      "Name the owner for production platform decisions",
    ],
    upsellPath:
      "Upgrade to Signature Launch System when the system needs launch readiness, advanced modules, or a wider buyer journey review.",
    safeScopeBoundary:
      "The Pro System creates mapped, tested, documented, and owner-approved operating materials using static/demo content in this scaffold.",
    ctaLabel: "Review Pro scope",
    path: "/pricing",
    featured: true,
  },
  {
    slug: "signature-launch-system",
    name: "Signature Launch System",
    priceRange: "£7,500",
    bestFor:
      "Premium launches that need checkout-to-customer readiness across payment, access, delivery, onboarding, support, follow-up, and reporting.",
    outcome:
      "A launch-ready operational system with mapped buyer journeys, documented delivery safeguards, owner-approved access rules, and practical recovery routes.",
    includedModules: [
      "foliofix",
      "deliveryproof",
      "accessguard",
      "accessdesk",
      "revenueframe",
      "accesssafe",
      "product-tracks",
      "inboxguard",
      "proofmetrics",
      "verified-delivery-standard",
    ],
    deliverables: [
      "Checkout-to-customer launch map",
      "Core module documentation",
      "Buyer message and fallback route review",
      "ProofMetrics reporting structure",
      "Verified Delivery Standard checklist",
      "Owner-approved launch handover packet",
    ],
    timeline: "Typically 2-4 weeks, with owner review points built into the schedule.",
    notIncluded: [
      "Fake live monitoring",
      "Production credentials",
      "Real payment processor activity",
      "Legal certification work",
      "Platform partnership claims",
    ],
    ownerResponsibilities: [
      "Provide launch offer details and current tool stack",
      "Approve access and delivery rules",
      "Review buyer-facing messages",
      "Attend or review launch readiness checkpoints",
    ],
    upsellPath:
      "Upgrade to Signature Launch Premium for EntitlementFrame, AccessHub, LaunchRoom, or more complex launch operations.",
    safeScopeBoundary:
      "Launch readiness is mapped, tested with sample scenarios, documented, and owner-approved; monitoring remains recommended for production operation.",
    ctaLabel: "Plan the launch system",
    path: "/signature-launch-system",
  },
  {
    slug: "signature-launch-premium",
    name: "Signature Launch Premium",
    priceRange: "£9,997",
    bestFor:
      "Sellers with complex offers, multiple tiers, cohorts, bundles, or team handover needs before a premium launch.",
    outcome:
      "A fuller checkout-to-customer operating system with advanced entitlement mapping, static portal structure, delivery proof, reporting, and handover readiness.",
    includedModules: [
      "foliofix",
      "deliveryproof",
      "accessguard",
      "accessdesk",
      "revenueframe",
      "accesssafe",
      "product-tracks",
      "entitlementframe",
      "inboxguard",
      "accesshub",
      "proofmetrics",
      "verified-delivery-standard",
    ],
    deliverables: [
      "Advanced entitlement matrix",
      "AccessHub static portal model",
      "DeliveryProof evidence packet",
      "AccessDesk recovery workflow",
      "ProofMetrics review framework",
      "Verified Delivery Standard handover packet",
    ],
    timeline: "Typically 3-5 weeks depending on complexity, review speed, and module depth.",
    notIncluded: [
      "Live buyer data",
      "Real auth implementation",
      "Production integration buildout",
      "Ongoing retainer review",
      "New custom brand artwork creation",
    ],
    ownerResponsibilities: [
      "Approve entitlement and access lifecycle rules",
      "Confirm product tiers and offer boundaries",
      "Review portal labels and handover documents",
      "Assign owners for production implementation decisions",
    ],
    upsellPath:
      "Add LaunchRoom for launch-week rehearsal or MigrationFrame when a platform move is part of the project.",
    safeScopeBoundary:
      "Premium scope stays operational: mapped, tested, documented, owner-approved, and explicit about static/demo boundaries.",
    ctaLabel: "Review premium launch",
    path: "/signature-launch",
    featured: true,
  },
  {
    slug: "signature-launch-plus-launchroom",
    name: "Signature Launch + LaunchRoom",
    priceRange: "£11,500-£14,500",
    bestFor:
      "Launches with multiple stakeholders, launch-week pressure, several access paths, or a need for rehearsal and issue triage.",
    outcome:
      "A premium launch system with readiness scenarios, issue triage, monitoring recommendations, owner approval notes, and a static launch room.",
    includedModules: [
      "deliveryproof",
      "accessguard",
      "accessdesk",
      "entitlementframe",
      "inboxguard",
      "accesshub",
      "launchroom",
      "proofmetrics",
      "verified-delivery-standard",
    ],
    deliverables: [
      "LaunchRoom readiness plan",
      "Scenario rehearsal checklist",
      "Issue triage board",
      "Monitoring recommendation notes",
      "Owner approval log",
      "Launch handover summary",
    ],
    timeline: "Typically 4-6 weeks, including rehearsal and owner review checkpoints.",
    notIncluded: [
      "Live monitoring simulation",
      "Real customer support queue",
      "Automated platform operations",
      "Production incident response service",
    ],
    ownerResponsibilities: [
      "Approve launch readiness criteria",
      "Confirm escalation owners",
      "Review rehearsal results",
      "Approve the handover packet before launch",
    ],
    upsellPath:
      "Add retainer review when the owner wants recurring AccessGuard and ProofMetrics review after launch.",
    safeScopeBoundary:
      "LaunchRoom documents readiness and triage; it does not simulate live monitoring or promise launch outcomes.",
    ctaLabel: "Add LaunchRoom",
    path: "/launchroom",
  },
  {
    slug: "migrationframe-add-on",
    name: "MigrationFrame add-on",
    priceRange: "£1,500-£5,000",
    bestFor:
      "Sellers moving platforms, rebuilding product libraries, restructuring offers, or needing access continuity planning.",
    outcome:
      "A documented migration inventory, continuity checklist, buyer communication notes, and post-move review plan.",
    includedModules: [
      "migrationframe",
      "product-tracks",
      "entitlementframe",
      "inboxguard",
      "accesssafe",
    ],
    deliverables: [
      "Migration inventory",
      "Access continuity map",
      "Buyer communication plan",
      "Cutover readiness checklist",
      "Post-move review agenda",
    ],
    timeline: "Typically 1-4 weeks depending on product count and migration complexity.",
    notIncluded: [
      "Production data import",
      "Live platform migration execution",
      "Credential handling inside the static scaffold",
      "Specialist legal or tax review",
    ],
    ownerResponsibilities: [
      "Confirm source and destination system details",
      "Approve continuity decisions",
      "Review buyer communication language",
      "Approve cutover readiness before production movement",
    ],
    upsellPath:
      "Pair with Signature Launch Premium when the migration supports a major launch or product relaunch.",
    safeScopeBoundary:
      "MigrationFrame maps and documents migration readiness; production migration remains a separately approved implementation step.",
    ctaLabel: "Map a migration",
    path: "/migrationframe",
  },
  {
    slug: "agencyframe",
    name: "AgencyFrame",
    priceRange: "£12,500-£25,000+",
    bestFor:
      "Agencies, studios, or consultants who want a repeatable access reliability delivery model for client systems.",
    outcome:
      "A multi-client operating model with module templates, static client workspace structure, QA standards, reporting language, and handover templates.",
    includedModules: [
      "agencyframe",
      "accesshub",
      "accesssafe",
      "product-tracks",
      "deliveryproof",
      "accessguard",
      "proofmetrics",
      "verified-delivery-standard",
    ],
    deliverables: [
      "Agency operating manual",
      "Client workspace model",
      "Reusable module templates",
      "QA standard checklist",
      "Reporting template pack",
      "Handover template pack",
    ],
    timeline: "Typically 4-8 weeks depending on agency process maturity and template depth.",
    notIncluded: [
      "Production client data",
      "Client legal framework",
      "Platform relationship claims",
      "Done-for-you client implementation beyond approved scope",
    ],
    ownerResponsibilities: [
      "Approve agency delivery standards",
      "Confirm template naming and client workspace structure",
      "Review client-facing scope language",
      "Assign QA and handover ownership",
    ],
    upsellPath:
      "Add implementation support or retainer review when the agency wants help applying the system to selected client projects.",
    safeScopeBoundary:
      "AgencyFrame defines operational standards and templates; each client implementation still needs owner-approved scope and production review.",
    ctaLabel: "Build agency standards",
    path: "/agencyframe",
  },
  {
    slug: "accessguard-proofmetrics-retainer",
    name: "AccessGuard + ProofMetrics retainer",
    priceRange: "£1,497/month",
    bestFor:
      "Sellers who want recurring operational review after their access, delivery, and reporting system has been documented.",
    outcome:
      "A monthly review rhythm for access lifecycle rules, delivery proof, exception patterns, reporting actions, and documentation updates.",
    includedModules: [
      "accessguard",
      "deliveryproof",
      "accessdesk",
      "proofmetrics",
      "revenueframe",
      "verified-delivery-standard",
    ],
    deliverables: [
      "Monthly access lifecycle review",
      "ProofMetrics report review",
      "Exception action register",
      "Documentation update notes",
      "Owner decision summary",
    ],
    timeline: "Monthly review cycle after initial setup or system documentation is complete.",
    notIncluded: [
      "Live monitoring service",
      "Customer support staffing",
      "Production credentials",
      "Real-time incident management",
    ],
    ownerResponsibilities: [
      "Review monthly findings",
      "Approve documentation updates",
      "Assign owners to action items",
      "Confirm production monitoring choices outside the static scaffold",
    ],
    upsellPath:
      "Use the retainer after Pro, Signature Launch, or MigrationFrame work when ongoing operational reporting is needed.",
    safeScopeBoundary:
      "The retainer provides operational reporting and review recommendations; it does not act as a live monitoring or support replacement.",
    ctaLabel: "Review retainer scope",
    path: "/proofmetrics",
  },
] as const satisfies readonly FolioFrameOffer[];

export type OfferSlug = (typeof folioframeOffers)[number]["slug"];
