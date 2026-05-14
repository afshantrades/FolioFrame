import Link from "next/link";
import {
  buyerJourneySteps,
  dashboardMetrics,
  majorWorkspaceLinks,
  moduleStatusOverview,
  ownerActions,
  proofMetrics,
  readinessSnapshot,
  verifiedDeliveryChecks,
} from "@/content/folioframeDemoData";
import {
  OwnerActionList,
  PortalMetricCard,
  PortalSection,
  PortalStatusBadge,
  StaticDemoNotice,
} from "./PortalComponents";
import { SectionHeader } from "./SectionHeader";

type PortalDashboardProps = {
  variant?: "overview" | "premium";
};

function statusTone(status: string) {
  if (status.includes("Mapped") || status.includes("Documented")) {
    return "ready" as const;
  }

  if (status.includes("Needed") || status.includes("review")) {
    return "review" as const;
  }

  return "neutral" as const;
}

export function PortalDashboard({ variant = "overview" }: PortalDashboardProps) {
  if (variant === "premium") {
    return <PremiumDashboard />;
  }

  return <OverviewDashboard />;
}

function OverviewDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Internal static portal"
        title="FolioFrame command centre"
        body="A static owner-review workspace for Signature Launch Premium. It organizes module status, readiness notes, owner actions and links to the main workspaces without connecting to live systems."
      />

      <StaticDemoNotice>
        This overview uses demo-only records. It does not show real buyers, billing,
        platform events, support tickets or monitoring activity.
      </StaticDemoNotice>

      <PortalSection
        eyebrow="Package"
        title="Signature Launch Premium summary"
        body="The premium static workspace brings FolioFix, DeliveryProof, AccessGuard, AccessDesk, RevenueFrame, AccessSafe, EntitlementFrame, InboxGuard, AccessHub, ProofMetrics and the FolioFrame Verified Delivery Standard into one owner-review view."
        tone="warm"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <PortalMetricCard
            label="Primary package"
            value="Signature Launch Premium"
            trend="Static MVP"
            note="Demo content for a higher-tier checkout-to-customer system build."
          />
          <PortalMetricCard
            label="Next recommended action"
            value="Approve entitlement rules"
            trend="Owner queue"
            note="Confirm premium bundle logic before launch rehearsal and handover."
          />
          <PortalMetricCard
            label="Static boundary"
            value="No live data"
            trend="Demo only"
            note="All records are sample records for layout and content review."
          />
        </div>
      </PortalSection>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <PortalSection
          eyebrow="Module status"
          title="Workspace overview"
          body="A concise view of the modules most relevant to the premium implementation."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {moduleStatusOverview.map((item) => (
              <Link
                key={item.module}
                href={item.workspace}
                className="rounded-lg border border-mist-blue bg-soft-white p-4 hover:border-pastel-blue hover:bg-mist-blue"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-deep-navy">
                    {item.module}
                  </h3>
                  <PortalStatusBadge tone={statusTone(item.status)}>
                    {item.status}
                  </PortalStatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                  {item.note}
                </p>
              </Link>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Owner actions"
          title="Approval queue"
          body="Owner decisions that should be resolved before production implementation."
        >
          <OwnerActionList actions={ownerActions} />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <PortalSection
          eyebrow="Readiness snapshot"
          title="Current review state"
          body="Static readiness notes for the handoff between checkout, access, delivery, support and reporting."
        >
          <div className="grid gap-3">
            {readinessSnapshot.map((item) => (
              <article
                key={item.area}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-6 text-deep-navy">
                    {item.area}
                  </h3>
                  <PortalStatusBadge tone={statusTone(item.status)}>
                    {item.status}
                  </PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Major workspaces"
          title="Jump into the review areas"
          body="The static portal is organized around owner review, not live operations."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {majorWorkspaceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-mist-blue bg-soft-white p-4 hover:border-pastel-blue hover:bg-mist-blue"
              >
                <span className="text-sm font-semibold text-deep-navy">
                  {item.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-blue-grey">
                  {item.detail}
                </span>
              </Link>
            ))}
          </div>
        </PortalSection>
      </section>
    </div>
  );
}

function PremiumDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Premium dashboard"
        title="Signature Launch Premium review"
        body="A static dashboard for reviewing readiness score, mapped systems, QA checks, owner actions, recovery routes, buyer journey and ProofMetrics summary."
      />

      <StaticDemoNotice>
        Dashboard records are demo examples only. No live checkout, email,
        automation, platform or customer data is connected.
      </StaticDemoNotice>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardMetrics.map((item) => (
          <PortalMetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <PortalSection
          eyebrow="Buyer journey preview"
          title="Payment through reporting"
          body="Each sample stage has an owner, status and static review label."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {buyerJourneySteps.slice(0, 6).map((stage) => (
              <article
                key={stage.stage}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {stage.stage}
                  </h3>
                  <PortalStatusBadge tone={statusTone(stage.status)}>
                    {stage.status}
                  </PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {stage.detail}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-deep-navy">
                  {stage.demoLabel}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Owner action queue"
          title="Needs owner decisions"
          body="These sample tasks keep the dashboard honest about what remains owner-led."
        >
          <OwnerActionList actions={ownerActions} />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Verified delivery status"
          title="Readiness evidence"
          body="The standard is shown as an operational checklist and owner review artifact."
        >
          <div className="grid gap-3">
            {verifiedDeliveryChecks.map((item) => (
              <article
                key={item.check}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {item.check}
                  </h3>
                  <PortalStatusBadge tone={statusTone(item.status)}>
                    {item.status}
                  </PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.evidence}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="ProofMetrics"
          title="Operational reporting summary"
          body="A static reporting baseline for delivery proof, access exceptions, support recovery and handover."
        >
          <div className="grid gap-3">
            {proofMetrics.map((item) => (
              <article
                key={item.metric}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {item.metric}
                  </h3>
                  <PortalStatusBadge>{item.value}</PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.basis}
                </p>
                <p className="mt-2 text-sm font-semibold text-deep-navy">
                  Review action: {item.reviewAction}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>
      </section>
    </div>
  );
}
