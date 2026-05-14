export type FolioFrameOffer = {
  name: string;
  price: string;
  summary: string;
  bestFor: string;
  includes: readonly string[];
  scopeNotes: readonly string[];
  path: string;
  featured?: boolean;
};

export const folioframeOffers = [
  {
    name: "FolioFix Audit",
    price: "£497-£997",
    summary:
      "A focused audit for sellers who need to understand where access, delivery and support handoffs are weak.",
    bestFor: "Existing digital products with a manageable repair list.",
    includes: [
      "Checkout-to-customer map",
      "Delivery and access review",
      "Support recovery notes",
      "Prioritized repair plan",
    ],
    scopeNotes: [
      "Static documentation and recommendations",
      "No real platform changes inside this scaffold",
      "Owner approval needed before implementation",
    ],
    path: "/foliofix",
  },
  {
    name: "FolioFrame Pro System",
    price: "£1,997-£2,997",
    summary:
      "A documented access reliability system for one product library or focused offer suite.",
    bestFor: "Sellers ready to organize delivery proof, access rules and support paths.",
    includes: [
      "Core module setup",
      "Product Tracks matrix",
      "AccessDesk support workflow",
      "Handover documentation",
    ],
    scopeNotes: [
      "Static/demo content only in this MVP",
      "No real auth, billing or buyer data",
      "Monitoring recommended after production setup",
    ],
    path: "/pricing",
    featured: true,
  },
  {
    name: "Signature Launch System",
    price: "£7,500",
    summary:
      "A launch-focused build for checkout-to-customer delivery, onboarding, support and follow-up.",
    bestFor: "Premium launches that need a calm operational system before launch week.",
    includes: [
      "Launch readiness mapping",
      "Core modules",
      "Deliverable packet",
      "Launch review timeline",
    ],
    scopeNotes: [
      "No fake live monitoring",
      "No guaranteed sales or delivery outcome",
      "Owner-approved scope required",
    ],
    path: "/signature-launch-system",
  },
  {
    name: "Signature Launch Premium",
    price: "£9,997",
    summary:
      "An expanded launch system with advanced access, messaging, reporting and handover structure.",
    bestFor: "Sellers with complex offers, cohorts, teams or higher support risk.",
    includes: [
      "Core and advanced modules",
      "LaunchRoom readiness plan",
      "ProofMetrics report structure",
      "AccessHub portal model",
    ],
    scopeNotes: [
      "Static dashboard demonstration",
      "No real platform connections",
      "Monitoring recommended after launch",
    ],
    path: "/signature-launch-system",
    featured: true,
  },
  {
    name: "Signature Launch + LaunchRoom",
    price: "£11,500-£14,500",
    summary:
      "A premium launch system with rehearsal planning, triage routes and launch room documentation.",
    bestFor: "Launches with multiple offers, stakeholders or operational dependencies.",
    includes: [
      "LaunchRoom readiness room",
      "Scenario rehearsal checklist",
      "Issue triage route",
      "Owner approval log",
    ],
    scopeNotes: [
      "Launch monitoring is planned, not faked",
      "No platform automation runs in this scaffold",
      "No outcome promise is made",
    ],
    path: "/launchroom",
  },
  {
    name: "MigrationFrame add-on",
    price: "£1,500-£5,000",
    summary:
      "A migration planning layer for moving offers, buyer access and delivery paths between systems.",
    bestFor: "Platform moves, product library rebuilds and access continuity reviews.",
    includes: [
      "Migration inventory",
      "Access continuity map",
      "Buyer communication notes",
      "Post-move review plan",
    ],
    scopeNotes: [
      "No production migration in this MVP",
      "No customer data import",
      "Owner approval required for cutover",
    ],
    path: "/migrationframe",
  },
  {
    name: "AgencyFrame",
    price: "£12,500-£25,000+",
    summary:
      "A delivery standard and operating model for agencies implementing buyer access systems for clients.",
    bestFor: "Agencies that need repeatable modules, documentation and QA standards.",
    includes: [
      "Agency operating manual",
      "Client workspace model",
      "Reusable module templates",
      "Reporting template pack",
    ],
    scopeNotes: [
      "No production client data",
      "No legal framework included",
      "No platform partnership claim",
    ],
    path: "/agencyframe",
  },
  {
    name: "AccessGuard + ProofMetrics retainer",
    price: "£1,497/month",
    summary:
      "A monthly operational review model for access lifecycle rules, delivery proof and reporting actions.",
    bestFor: "Sellers who want ongoing review discipline after the system is documented.",
    includes: [
      "Access lifecycle review",
      "ProofMetrics report review",
      "Exception action register",
      "Documentation updates",
    ],
    scopeNotes: [
      "Monitoring recommended",
      "No delivery outcome promise",
      "No real data in this static scaffold",
    ],
    path: "/proofmetrics",
  },
] as const satisfies readonly FolioFrameOffer[];
