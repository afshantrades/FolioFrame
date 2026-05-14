import {
  accessGuardRecommendations,
  accessLifecycleMatrix,
  buyerJourneySteps,
  deliveryProofSummary,
  handoverItems,
  handoverPacketSections,
  inboxGuardChecks,
  ownerActions,
  productTierMatrix,
  proofMetrics,
  systemMapItems,
} from "@/content/folioframeDemoData";
import {
  OwnerActionList,
  PortalSection,
  PortalStatusBadge,
  PortalTable,
  StaticDemoNotice,
  type PortalTableColumn,
} from "./PortalComponents";
import { SectionHeader } from "./SectionHeader";

const staticPages = {
  "buyer-journey": {
    eyebrow: "Journey map",
    title: "Buyer journey review",
    body: "A static checkout-to-customer path from payment through entitlement, access, delivery, onboarding, support, follow-up, proof and reporting.",
  },
  "product-matrix": {
    eyebrow: "Product tracks",
    title: "Product matrix",
    body: "A sample matrix for product-level access rules, delivery paths, support routes and review states.",
  },
  handover: {
    eyebrow: "Handover",
    title: "Handover packet",
    body: "A static owner-review packet for system maps, lifecycle rules, delivery proof, support SOPs, owner actions and reporting baseline.",
  },
} as const;

type PortalStaticPageProps = {
  pageKey: keyof typeof staticPages;
};

const productMatrixColumns = [
  {
    header: "Product",
    render: (row) => (
      <span className="font-semibold text-deep-navy">{row.product}</span>
    ),
  },
  {
    header: "Tier",
    render: (row) => row.tier,
  },
  {
    header: "Access rule",
    render: (row) => row.accessRule,
  },
  {
    header: "Delivery path",
    render: (row) => row.deliveryPath,
  },
  {
    header: "Support route",
    render: (row) => row.supportRoute,
  },
  {
    header: "Review state",
    render: (row) => (
      <PortalStatusBadge>{row.reviewState}</PortalStatusBadge>
    ),
  },
] satisfies readonly PortalTableColumn<(typeof productTierMatrix)[number]>[];

export function PortalStaticPage({ pageKey }: PortalStaticPageProps) {
  const page = staticPages[pageKey];

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <StaticDemoNotice>
        This workspace is a static preview only. It uses sample content and does
        not connect to buyer accounts, payment systems, support tools or live
        reporting.
      </StaticDemoNotice>
      {pageKey === "buyer-journey" ? <BuyerJourneyWorkspace /> : null}
      {pageKey === "product-matrix" ? <ProductMatrixWorkspace /> : null}
      {pageKey === "handover" ? <HandoverWorkspace /> : null}
    </div>
  );
}

function BuyerJourneyWorkspace() {
  return (
    <PortalSection
      eyebrow="Path"
      title="Payment to reporting"
      body="Every stage shows a status, owner, detail and demo label so the route is easy to review on desktop and mobile."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {buyerJourneySteps.map((stage) => (
          <article
            key={stage.stage}
            className="rounded-lg border border-mist-blue bg-soft-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-deep-navy">{stage.stage}</h2>
              <PortalStatusBadge>{stage.status}</PortalStatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              {stage.detail}
            </p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div>
                <dt className="font-semibold text-deep-navy">Owner</dt>
                <dd className="text-slate-blue-grey">{stage.owner}</dd>
              </div>
              <div>
                <dt className="font-semibold text-deep-navy">Demo label</dt>
                <dd className="text-slate-blue-grey">{stage.demoLabel}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </PortalSection>
  );
}

function ProductMatrixWorkspace() {
  return (
    <div className="space-y-5">
      <PortalSection
        eyebrow="Desktop table"
        title="Product, tier and access rules"
        body="The table scrolls horizontally on narrow screens, with stacked review cards below for easier mobile scanning."
      >
        <PortalTable
          columns={productMatrixColumns}
          rows={productTierMatrix}
          rowKey={(row) => `${row.product}-${row.tier}`}
        />
      </PortalSection>

      <div className="md:hidden">
        <PortalSection
          eyebrow="Mobile review"
          title="Stacked product cards"
          body="The same sample data is repeated as cards so the matrix remains readable at small widths."
        >
          <div className="grid gap-4">
          {productTierMatrix.map((row) => (
            <article
              key={`${row.product}-${row.tier}-card`}
              className="rounded-lg border border-mist-blue bg-soft-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-deep-navy">
                  {row.product}
                </h2>
                <PortalStatusBadge>{row.reviewState}</PortalStatusBadge>
              </div>
              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-deep-navy">Tier</dt>
                  <dd className="text-slate-blue-grey">{row.tier}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-deep-navy">Access rule</dt>
                  <dd className="text-slate-blue-grey">{row.accessRule}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-deep-navy">Delivery path</dt>
                  <dd className="text-slate-blue-grey">{row.deliveryPath}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-deep-navy">Support route</dt>
                  <dd className="text-slate-blue-grey">{row.supportRoute}</dd>
                </div>
              </dl>
            </article>
          ))}
          </div>
        </PortalSection>
      </div>
    </div>
  );
}

function HandoverWorkspace() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="System map"
          title="Checkout-to-customer map"
          body="Static artifacts for the main operational areas."
        >
          <div className="grid gap-3">
            {systemMapItems.map((item) => (
              <article
                key={item.area}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {item.area}
                  </h3>
                  <PortalStatusBadge>{item.status}</PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.artifact}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Access lifecycle"
          title="Lifecycle matrix"
          body="Owner-review rules for access lifecycle and exception handling."
        >
          <div className="grid gap-3">
            {accessLifecycleMatrix.map((item) => (
              <article
                key={item.lifecycle}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <h3 className="text-sm font-semibold text-deep-navy">
                  {item.lifecycle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.rule}
                </p>
                <p className="mt-2 text-sm font-semibold text-deep-navy">
                  {item.review}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="DeliveryProof"
          title="Report summary"
          body="Sample report sections to include in the handover packet."
        >
          <ul className="grid gap-3 text-sm leading-6 text-slate-blue-grey">
            {deliveryProofSummary.map((item) => (
              <li key={item} className="rounded-lg bg-mist-blue px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </PortalSection>

        <PortalSection
          eyebrow="InboxGuard"
          title="Checklist"
          body="Delivery message and fallback copy status for owner review."
        >
          <div className="grid gap-3">
            {inboxGuardChecks.map((item) => (
              <article
                key={item.message}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {item.message}
                  </h3>
                  <PortalStatusBadge>{item.status}</PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.check}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <PortalSection
          eyebrow="AccessHub SOP"
          title="Support and recovery packet"
          body="Handover items for support intake, escalation and documented owner decisions."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {handoverItems.map((item) => (
              <article
                key={item.item}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <h3 className="text-sm font-semibold text-deep-navy">{item.item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  Owner: {item.owner}
                </p>
                <PortalStatusBadge>{item.status}</PortalStatusBadge>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Owner actions"
          title="Action register"
          body="Open decisions to close before production use."
        >
          <OwnerActionList actions={ownerActions} />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="ProofMetrics"
          title="Baseline"
          body="Static metrics for delivery proof, access exception review and handover readiness."
        >
          <div className="grid gap-3">
            {proofMetrics.map((item) => (
              <article
                key={item.metric}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <h3 className="text-sm font-semibold text-deep-navy">
                  {item.metric}: {item.value}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.reviewAction}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="AccessGuard"
          title="Recommendations and packet sections"
          body="Access lifecycle recommendations plus the sections expected in the final handover packet."
        >
          <div className="grid gap-5">
            <ul className="grid gap-3 text-sm leading-6 text-slate-blue-grey">
              {accessGuardRecommendations.map((item) => (
                <li key={item} className="rounded-lg bg-mist-blue px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {handoverPacketSections.map((item) => (
                <PortalStatusBadge key={item}>{item}</PortalStatusBadge>
              ))}
            </div>
          </div>
        </PortalSection>
      </section>
    </div>
  );
}
