export const staticDemoNotice =
  "Static/demo only. No real auth, billing, customer data, platform connections or live monitoring are active.";

export const portalKpis = [
  {
    label: "Mapped systems",
    value: "8",
    note: "Sample product and access paths for review.",
  },
  {
    label: "QA checks",
    value: "42",
    note: "Demo checklist items, not production test results.",
  },
  {
    label: "Owner approvals",
    value: "6",
    note: "Sample approval states for handover planning.",
  },
  {
    label: "Recovery routes",
    value: "5",
    note: "Practical support paths documented for review.",
  },
] as const;

export const buyerJourneyStages = [
  {
    stage: "Checkout",
    status: "Mapped",
    detail: "Payment confirmation and product selection are documented as sample steps.",
  },
  {
    stage: "Access",
    status: "Tested sample",
    detail: "Access lifecycle rules are reviewed with static scenarios.",
  },
  {
    stage: "Delivery",
    status: "Documented",
    detail: "Delivery messages and fallback routes are listed for owner review.",
  },
  {
    stage: "Support",
    status: "Recovery route",
    detail: "AccessDesk categories and escalation notes are ready as sample content.",
  },
  {
    stage: "Follow-up",
    status: "Recommended",
    detail: "Follow-up and reporting cadence are documented as operational guidance.",
  },
] as const;

export const productMatrixRows = [
  {
    product: "Signature course",
    accessRule: "Core portal plus onboarding sequence",
    deliveryPath: "Checkout email, portal welcome, support fallback",
    reviewState: "Owner review needed",
  },
  {
    product: "Template library",
    accessRule: "Library entitlement with upgrade notes",
    deliveryPath: "Portal access and DeliveryProof evidence packet",
    reviewState: "Mapped",
  },
  {
    product: "Cohort add-on",
    accessRule: "Time-bound cohort space and replay archive",
    deliveryPath: "AccessGuard rule plus AccessDesk escalation",
    reviewState: "Sample QA ready",
  },
] as const;

export const demoRisks = [
  {
    title: "Bundle entitlement drift",
    owner: "Operations owner",
    action: "Review EntitlementFrame rules before launch approval.",
  },
  {
    title: "Unclear resend policy",
    owner: "Support lead",
    action: "Approve InboxGuard fallback route and support snippets.",
  },
  {
    title: "Migration cutover ambiguity",
    owner: "Product owner",
    action: "Confirm MigrationFrame continuity checklist.",
  },
] as const;

export const handoverItems = [
  "Checkout-to-customer map",
  "Access lifecycle rules",
  "Delivery proof packet",
  "Support recovery route",
  "Reporting cadence notes",
  "Owner approval record",
] as const;
