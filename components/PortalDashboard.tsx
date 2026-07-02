import Link from "next/link";
import { BrandAssetImage } from "@/components/BrandAssetImage";
import { LiveDataStatusBanner } from "@/components/LiveDataStatusBanner";
import { routeBrandAssets } from "@/content/folioframeBrandAssets";
import {
  majorWorkspaceLinks,
  moduleStatusOverview,
  proofMetrics,
  readinessSnapshot,
  verifiedDeliveryChecks,
} from "@/content/folioframeDemoData";
import type { PortalWorkspaceSnapshot } from "@/lib/live/portalDataAdapter";
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
  snapshot: PortalWorkspaceSnapshot;
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

export function PortalDashboard({ variant = "overview", snapshot }: PortalDashboardProps) {
  if (variant === "premium") {
    return <PremiumDashboard snapshot={snapshot} />;
  }

  return <OverviewDashboard snapshot={snapshot} />;
}

function OverviewDashboard({ snapshot }: { snapshot: PortalWorkspaceSnapshot }) {
  const isDatabaseBacked = snapshot.source === "database";
  const needsAuthSetup =
    snapshot.source === "auth-required" || snapshot.source === "workspace-required";

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={isDatabaseBacked ? "Internal live foundation" : "Internal static portal"}
        title="FolioFrame command centre"
        body={
          isDatabaseBacked
            ? "A workspace-aware foundation view for FolioFrame records. Some module sections still use static fallback content until later persistence phases."
            : "A static owner-review workspace for Signature Launch Premium. It organizes module status, readiness notes, owner actions and links to the main workspaces without connecting to live systems."
        }
      />

      <LiveDataStatusBanner snapshot={snapshot} />

      <PortalSection
        eyebrow="Approved brand surface"
        title="Workspace review materials"
        body="The portal overview uses approved source-locked FolioFrame assets. Production integrations remain disconnected until a later implementation scope."
      >
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <BrandAssetImage
            asset={routeBrandAssets.portal.visual}
            loading="eager"
            className="rounded-lg border border-mist bg-soft-white p-3 shadow-soft"
            imageClassName="rounded-md"
          />
          <BrandAssetImage
            asset={routeBrandAssets.portal.motif}
            decorative
            loading="eager"
            className="rounded-lg border border-mist bg-warm-ivory p-3 shadow-soft"
            imageClassName="mx-auto max-h-44 object-contain"
          />
        </div>
      </PortalSection>

      {needsAuthSetup ? (
        <PortalSection
          eyebrow="Workspace access"
          title={
            snapshot.source === "auth-required"
              ? "Sign in to continue"
              : "Assign this user to a workspace"
          }
          body={snapshot.guidance}
          tone="warm"
        >
          {snapshot.source === "auth-required" ? (
            <Link
              href="/sign-in"
              className="inline-flex rounded-md border border-ink-navy px-4 py-2 text-sm font-semibold text-ink-navy hover:bg-ink-navy hover:text-soft-white"
            >
              Open sign-in
            </Link>
          ) : (
            <div className="space-y-4">
              <p className="text-sm leading-6 text-slate-blue-grey">
                Add an active WorkspaceMember record for the signed-in FolioFrame user,
                or use the guided workspace setup route to create a fictional local
                development workspace.
              </p>
              <Link
                href="/app/workspace-setup"
                className="inline-flex rounded-md border border-ink-navy px-4 py-2 text-sm font-semibold text-ink-navy hover:bg-ink-navy hover:text-soft-white"
              >
                Open workspace setup
              </Link>
            </div>
          )}
        </PortalSection>
      ) : null}

      {isDatabaseBacked && snapshot.workspace ? (
        <PortalSection
          eyebrow="Database workspace"
          title={snapshot.workspace.name}
          body={`Workspace slug: ${snapshot.workspace.slug}. Plan: ${snapshot.workspace.plan}. Status: ${snapshot.workspace.status}.`}
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <PortalMetricCard
              label="Products"
              value={String(snapshot.products.length)}
              trend="Database"
              note="Workspace-scoped product records loaded through the portal data adapter."
            />
            <PortalMetricCard
              label="Product tiers"
              value={String(snapshot.productTiers.length)}
              trend="Database"
              note="Workspace-scoped access rule records."
            />
            <PortalMetricCard
              label="Audit logs"
              value={String(snapshot.auditLogs.length)}
              trend="Database"
              note="Recent workspace audit records."
            />
            <PortalMetricCard
              label="Role"
              value={snapshot.membership?.role ?? "unknown"}
              trend="Membership"
              note="Server-verified role for the signed-in workspace member."
            />
            <PortalMetricCard
              label="Membership"
              value={snapshot.membership?.status ?? "unknown"}
              trend="Access"
              note="Workspace data loads only for active memberships."
            />
          </div>
        </PortalSection>
      ) : (
        <StaticDemoNotice>
          This overview uses demo-only records. It does not show real buyers,
          billing, platform events, support tickets or monitoring activity.
        </StaticDemoNotice>
      )}

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
            value={isDatabaseBacked ? "Hybrid view" : "No live data"}
            trend={isDatabaseBacked ? "Database + fallback" : "Demo only"}
            note={
              isDatabaseBacked
                ? "Workspace records are database-backed while module content remains staged for future persistence."
                : "All records are sample records for layout and content review."
            }
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
              className="rounded-lg border border-mist bg-soft-white p-4 hover:border-folio-blue hover:bg-mist"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink-navy">
                    {item.module}
                  </h3>
                  <PortalStatusBadge tone={statusTone(item.status)}>
                    {item.status}
                  </PortalStatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-graphite">
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
          <OwnerActionList actions={snapshot.ownerActions} />
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

function PremiumDashboard({ snapshot }: { snapshot: PortalWorkspaceSnapshot }) {
  const isDatabaseBacked = snapshot.source === "database";
  const needsAuthSetup =
    snapshot.source === "auth-required" || snapshot.source === "workspace-required";

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Premium dashboard"
        title="Signature Launch Premium review"
        body={
          isDatabaseBacked
            ? "A hybrid dashboard using database-backed workspace records plus static fallback module content while the live portal is being migrated safely."
            : "A static dashboard for reviewing readiness score, mapped systems, QA checks, owner actions, recovery routes, buyer journey and ProofMetrics summary."
        }
      />

      <LiveDataStatusBanner snapshot={snapshot} />

      {needsAuthSetup ? (
        <PortalSection
          eyebrow="Workspace access"
          title={
            snapshot.source === "auth-required"
              ? "Sign in to load dashboard data"
              : "Workspace membership required"
          }
          body={snapshot.guidance}
          tone="warm"
        >
          {snapshot.source === "auth-required" ? (
            <Link
              href="/sign-in"
              className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
            >
              Open sign-in
            </Link>
          ) : (
            <Link
              href="/app/workspace-setup"
              className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
            >
              Open workspace setup
            </Link>
          )}
        </PortalSection>
      ) : null}

      {!isDatabaseBacked ? (
        <StaticDemoNotice>
          Dashboard records are demo examples only. No live checkout, email,
          automation, platform or customer data is connected.
        </StaticDemoNotice>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {snapshot.dashboardMetrics.map((item) => (
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
            {snapshot.buyerJourneySteps.slice(0, 6).map((stage) => (
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
          <OwnerActionList actions={snapshot.ownerActions} />
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
