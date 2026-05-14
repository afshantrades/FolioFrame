import { notFound } from "next/navigation";
import {
  accessExceptionMetrics,
  accessHubRequestPreviews,
  accessHubRequests,
  accessStateDefinitions,
  agencyClients,
  buyerIssueCategories,
  carePlanRoutes,
  deliveryProofMetrics,
  entitlementRecords,
  evidencePacket,
  fallbackRouteTracker,
  faqHelpStructure,
  getPortalDemoDataForModule,
  handoverTemplatePack,
  inboxGuardChecks,
  launchReadinessChecklist,
  launchRoomIssues,
  manualReviewQueue,
  migrationCutoverChecklist,
  migrationItems,
  migrationRollbackNotes,
  ownerActions,
  productTierMatrix,
  proofMetrics,
  reportingCadence,
  rehearsalScenarios,
  resendSnippets,
  senderIdentityChecklist,
  supportFooterStatus,
  supportThemes,
  verifiedDeliveryChecks,
  verifiedDeliveryStatuses,
} from "@/content/folioframeDemoData";
import { getModuleBySlug } from "@/content/folioframeHelpers";
import type { FolioFrameModule, ModuleSlug } from "@/content/folioframeModules";
import {
  ModuleWorkspaceLayout,
  OwnerActionList,
  PortalMetricCard,
  PortalSection,
  PortalStatusBadge,
  PortalTable,
  type PortalTableColumn,
} from "./PortalComponents";

type PortalModulePageProps = {
  slug: string;
};

const moduleBoundaries: Partial<Record<ModuleSlug, string>> = {
  entitlementframe:
    "EntitlementFrame maps entitlement rules, sample access scenarios and owner-approved exception routes. It does not change production access in this static MVP.",
  inboxguard:
    "InboxGuard provides delivery safeguards and recovery workflows; it does not guarantee inbox placement.",
  accesshub:
    "AccessHub routes support and recovery requests; it does not automatically verify identity or resend private access without owner-approved rules.",
  launchroom:
    "LaunchRoom documents readiness and triage; it does not simulate live monitoring in this static MVP.",
  migrationframe:
    "MigrationFrame maps and documents migration readiness; production movement requires separate approval.",
  proofmetrics:
    "ProofMetrics provides operational reporting; it does not guarantee revenue or conversion improvement.",
  agencyframe:
    "AgencyFrame provides a repeatable delivery model; each client implementation still needs approved scope.",
  "verified-delivery-standard":
    "Verified Delivery is not legal certification, platform certification, deliverability guarantee or revenue guarantee.",
};

function statusTone(status: string) {
  if (status.includes("Blocked") || status.includes("High")) {
    return "blocked" as const;
  }

  if (status.includes("Ready") || status.includes("Mapped") || status.includes("Documented")) {
    return "ready" as const;
  }

  if (status.includes("review") || status.includes("approval") || status.includes("Pending")) {
    return "review" as const;
  }

  return "neutral" as const;
}

function ListPanel({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: readonly string[];
  tone?: "default" | "warm";
}) {
  return (
    <PortalSection title={title} tone={tone}>
      <ul className="space-y-3 text-sm leading-6 text-slate-blue-grey">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-mist-blue px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </PortalSection>
  );
}

function DefinitionGrid({
  items,
}: {
  items: readonly { title: string; body: string; status?: string }[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-lg border border-mist-blue bg-soft-white p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-sm font-semibold leading-6 text-deep-navy">
              {item.title}
            </h3>
            {item.status ? (
              <PortalStatusBadge tone={statusTone(item.status)}>
                {item.status}
              </PortalStatusBadge>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-blue-grey">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

const entitlementColumns = [
  {
    header: "Record",
    render: (row) => (
      <span className="font-semibold text-deep-navy">{row.id}</span>
    ),
  },
  { header: "Offer", render: (row) => row.offer },
  { header: "Tier", render: (row) => row.tier },
  { header: "Entitlement", render: (row) => row.entitlement },
  { header: "Trigger event", render: (row) => row.trigger },
  { header: "Exception path", render: (row) => row.exceptionPath },
  {
    header: "Owner approval",
    render: (row) => (
      <PortalStatusBadge tone={statusTone(row.ownerApproval)}>
        {row.ownerApproval}
      </PortalStatusBadge>
    ),
  },
] satisfies readonly PortalTableColumn<(typeof entitlementRecords)[number]>[];

const migrationColumns = [
  {
    header: "Inventory item",
    render: (row) => (
      <span className="font-semibold text-deep-navy">{row.item}</span>
    ),
  },
  { header: "Source state", render: (row) => row.sourceState },
  { header: "Destination state", render: (row) => row.destinationState },
  { header: "Continuity check", render: (row) => row.continuityCheck },
  {
    header: "Risk level",
    render: (row) => <PortalStatusBadge>{row.riskLevel}</PortalStatusBadge>,
  },
  {
    header: "Owner approval",
    render: (row) => (
      <PortalStatusBadge tone={statusTone(row.ownerApproval)}>
        {row.ownerApproval}
      </PortalStatusBadge>
    ),
  },
] satisfies readonly PortalTableColumn<(typeof migrationItems)[number]>[];

export function PortalModulePage({ slug }: PortalModulePageProps) {
  const moduleInfo = getModuleBySlug(slug);

  if (!moduleInfo) {
    notFound();
  }

  switch (moduleInfo.slug) {
    case "entitlementframe":
      return <EntitlementFrameWorkspace moduleInfo={moduleInfo} />;
    case "inboxguard":
      return <InboxGuardWorkspace moduleInfo={moduleInfo} />;
    case "accesshub":
      return <AccessHubWorkspace moduleInfo={moduleInfo} />;
    case "launchroom":
      return <LaunchRoomWorkspace moduleInfo={moduleInfo} />;
    case "migrationframe":
      return <MigrationFrameWorkspace moduleInfo={moduleInfo} />;
    case "proofmetrics":
      return <ProofMetricsWorkspace moduleInfo={moduleInfo} />;
    case "agencyframe":
      return <AgencyFrameWorkspace moduleInfo={moduleInfo} />;
    case "verified-delivery-standard":
      return <VerifiedDeliveryWorkspace moduleInfo={moduleInfo} />;
    default:
      return <GenericModuleWorkspace moduleInfo={moduleInfo} />;
  }
}

function GenericModuleWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  const demoRecords = getPortalDemoDataForModule(moduleInfo.slug as ModuleSlug);

  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={
        moduleBoundaries[moduleInfo.slug as ModuleSlug] ??
        "This static workspace is for owner review. No production platform, payment, email, support or monitoring tools are connected."
      }
    >
      <PortalSection
        eyebrow="Problem solved"
        title={moduleInfo.name}
        body={moduleInfo.problemSolved}
        tone="warm"
      />
      <section className="grid gap-4 md:grid-cols-2">
        <ListPanel title="Portal widgets" items={moduleInfo.portalWidgets} />
        <ListPanel title="QA checks" items={moduleInfo.qaChecks} />
        <ListPanel title="Deliverables" items={moduleInfo.deliverables} />
        <ListPanel title="Owner actions" items={moduleInfo.ownerActions} />
        <ListPanel title="Safe claims" items={moduleInfo.safeClaims} />
        <ListPanel title="Boundaries" items={moduleInfo.boundaries} tone="warm" />
      </section>
      <PortalSection
        eyebrow="Demo data preview"
        title={`${demoRecords.length} sample records`}
        body="Static sample records are available for this module. No real customer, platform, payment or email data is included."
      />
    </ModuleWorkspaceLayout>
  );
}

function EntitlementFrameWorkspace({
  moduleInfo,
}: {
  moduleInfo: FolioFrameModule;
}) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.entitlementframe ?? ""}
    >
      <PortalSection
        eyebrow="Entitlement matrix"
        title="Mapped entitlement rules"
        body="Product tiers, access rules, delivery paths and support routes are organized before production approval."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {productTierMatrix.map((row) => (
            <article
              key={`${row.product}-${row.tier}`}
              className="rounded-lg border border-mist-blue bg-soft-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-deep-navy">
                  {row.product}
                </h3>
                <PortalStatusBadge>{row.reviewState}</PortalStatusBadge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                {row.tier}: {row.accessRule}
              </p>
            </article>
          ))}
        </div>
      </PortalSection>

      <PortalSection
        eyebrow="Definitions"
        title="Access state definitions"
        body="Documented access lifecycle rules keep production decisions separate from this static preview."
      >
        <DefinitionGrid
          items={accessStateDefinitions.map((item) => ({
            title: item.state,
            body: item.definition,
          }))}
        />
      </PortalSection>

      <PortalSection
        eyebrow="Sample records"
        title="Entitlement records and trigger events"
        body="Tested sample access scenarios show trigger events, exception paths and owner approval status."
      >
        <PortalTable
          columns={entitlementColumns}
          rows={entitlementRecords}
          rowKey={(row) => row.id}
        />
      </PortalSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Manual review"
          title="Owner-approved exception route"
          body="Items that should not be handled without a documented owner decision."
        >
          <DefinitionGrid
            items={manualReviewQueue.map((item) => ({
              title: item.item,
              body: `${item.trigger}. ${item.route}`,
              status: item.owner,
            }))}
          />
        </PortalSection>
        <ListPanel
          title="QA checklist"
          items={moduleInfo.qaChecks}
          tone="warm"
        />
      </section>
    </ModuleWorkspaceLayout>
  );
}

function InboxGuardWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.inboxguard ?? ""}
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Sender identity"
          title="Checklist"
          body="Static review notes for sender labels, reply routes and support footer clarity."
        >
          <DefinitionGrid
            items={senderIdentityChecklist.map((item) => ({
              title: item.item,
              body: item.detail,
              status: item.status,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Delivery messages"
          title="Message inventory"
          body="Sample delivery and onboarding messages for owner copy approval."
        >
          <DefinitionGrid
            items={inboxGuardChecks.map((item) => ({
              title: `${item.message} · ${item.channel}`,
              body: item.check,
              status: item.status,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Fallback route tracker"
          title="Recovery paths"
          body="Delivery safeguards and practical recovery routes are documented for support review."
        >
          <DefinitionGrid
            items={fallbackRouteTracker.map((item) => ({
              title: item.route,
              body: `${item.supportPath}. Owner: ${item.owner}.`,
              status: item.status,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Resend snippets"
          title="Owner copy approval"
          body="Support snippets remain sample copy until the owner approves production wording."
        >
          <DefinitionGrid
            items={resendSnippets.map((item) => ({
              title: item.title,
              body: item.copy,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Support footer"
          title="Status"
          body="Static footer routes clarify how buyers can request help."
        >
          <DefinitionGrid
            items={supportFooterStatus.map((item) => ({
              title: item.footer,
              body: item.note,
              status: item.status,
            }))}
          />
        </PortalSection>
        <ListPanel title="QA notes" items={moduleInfo.qaChecks} tone="warm" />
      </section>
    </ModuleWorkspaceLayout>
  );
}

function AccessHubWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  const unresolvedRequests = accessHubRequests.filter((item) =>
    item.status.includes("Unresolved") || item.status.includes("Needs"),
  );

  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.accesshub ?? ""}
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Buyer issue categories"
          title="Recovery intake structure"
          body="Issue categories route support requests into the correct sample recovery path."
        >
          <DefinitionGrid
            items={buyerIssueCategories.map((item) => ({
              title: item.category,
              body: item.route,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Request previews"
          title="Lost access and wrong email"
          body="Static previews show which fields support should gather before production action."
        >
          <DefinitionGrid
            items={accessHubRequestPreviews.map((item) => ({
              title: item.title,
              body: item.fields,
              status: item.status,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <PortalSection
          eyebrow="Support tracker"
          title="Request queue"
          body="Demo support requests show module handoff, priority, owner and status."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {accessHubRequests.map((item) => (
              <article
                key={item.requestId}
                className="rounded-lg border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-deep-navy">
                    {item.requestId}
                  </h3>
                  <PortalStatusBadge tone={statusTone(item.priority)}>
                    {item.priority}
                  </PortalStatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {item.type} · {item.module}
                </p>
                <p className="mt-2 text-sm font-semibold text-deep-navy">
                  {item.owner}: {item.status}
                </p>
              </article>
            ))}
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Unresolved queue"
          title="Needs owner review"
          body="These sample items require an approved rule before any private access action."
        >
          <DefinitionGrid
            items={unresolvedRequests.map((item) => ({
              title: item.type,
              body: `${item.requestId} · ${item.module} · Owner: ${item.owner}.`,
              status: item.status,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="AccessDesk handoff"
          title="Support SOP route"
          body="AccessHub gathers the request, AccessDesk structures response handling, and owner-approved rules control private access changes."
        />
        <ListPanel
          title="FAQ and help page structure"
          items={faqHelpStructure}
          tone="warm"
        />
      </section>
    </ModuleWorkspaceLayout>
  );
}

function LaunchRoomWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.launchroom ?? ""}
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalMetricCard
          label="Launch window status"
          value="Rehearsal mode"
          trend="Static sample"
          note="No live monitoring is simulated in this MVP."
        />
        <PortalMetricCard
          label="Readiness checks"
          value="4"
          trend="Owner review"
          note="Checklist items are prepared for launch owner review."
        />
        <PortalMetricCard
          label="Triage issues"
          value="3"
          trend="Demo board"
          note="Sample severity labels show how issues could be organized."
        />
        <PortalMetricCard
          label="Monitoring note"
          value="Recommended"
          trend="Production stage"
          note="Monitoring should be planned separately for connected systems."
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Readiness checklist"
          title="Owner approval notes"
          body="Static launch checks before any production implementation."
        >
          <DefinitionGrid
            items={launchReadinessChecklist.map((item) => ({
              title: item.item,
              body: `Owner: ${item.owner}.`,
              status: item.status,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Rehearsal scenarios"
          title="Sample paths"
          body="Scenario rehearsal uses static data and expected results only."
        >
          <DefinitionGrid
            items={rehearsalScenarios.map((item) => ({
              title: item.scenario,
              body: item.expectedResult,
            }))}
          />
        </PortalSection>
      </section>

      <PortalSection
        eyebrow="Issue triage board"
        title="Severity labels"
        body="Launch issues are shown as a static triage board with owner routing."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {launchRoomIssues.map((issue) => (
            <article
              key={issue.issue}
              className="rounded-lg border border-mist-blue bg-soft-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-deep-navy">
                  {issue.issue}
                </h3>
                <PortalStatusBadge tone={statusTone(issue.severity)}>
                  {issue.severity}
                </PortalStatusBadge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                {issue.route}
              </p>
              <p className="mt-2 text-sm font-semibold text-deep-navy">
                {issue.owner}: {issue.status}
              </p>
            </article>
          ))}
        </div>
      </PortalSection>
    </ModuleWorkspaceLayout>
  );
}

function MigrationFrameWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.migrationframe ?? ""}
    >
      <PortalSection
        eyebrow="Migration inventory"
        title="Source, destination and continuity checks"
        body="MigrationFrame keeps source state, destination state, continuity check, risk level and owner approval visible before production movement."
      >
        <PortalTable
          columns={migrationColumns}
          rows={migrationItems}
          rowKey={(row) => row.item}
        />
      </PortalSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <ListPanel
          title="Cutover checklist"
          items={migrationCutoverChecklist}
        />
        <PortalSection
          eyebrow="Rollback note"
          title="Continuity guardrails"
          body="Rollback notes keep the current buyer access path visible until a production move is approved."
          tone="warm"
        >
          <DefinitionGrid
            items={migrationRollbackNotes.map((item) => ({
              title: item.item,
              body: item.note,
            }))}
          />
        </PortalSection>
      </section>
    </ModuleWorkspaceLayout>
  );
}

function ProofMetricsWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.proofmetrics ?? ""}
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {proofMetrics.map((item) => (
          <PortalMetricCard
            key={item.metric}
            label={item.metric}
            value={item.value}
            trend="Static metric"
            note={item.basis}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Delivery proof metrics"
          title="Evidence packet review"
          body="Static measures for evidence packet completeness and message record visibility."
        >
          <DefinitionGrid
            items={deliveryProofMetrics.map((item) => ({
              title: `${item.metric}: ${item.value}`,
              body: item.note,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Access exception metrics"
          title="Exception review"
          body="Sample access exception metrics for owner review."
        >
          <DefinitionGrid
            items={accessExceptionMetrics.map((item) => ({
              title: `${item.metric}: ${item.value}`,
              body: item.note,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Support themes"
          title="Recurring review areas"
          body="Static support themes that can guide future operational reporting."
        >
          <DefinitionGrid
            items={supportThemes.map((item) => ({
              title: item.theme,
              body: item.pattern,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Review actions"
          title="Reporting cadence"
          body="Cadence notes stay advisory until production systems are connected."
          tone="warm"
        >
          <div className="space-y-5">
            <ul className="grid gap-3 text-sm leading-6 text-slate-blue-grey">
              {reportingCadence.map((item) => (
                <li key={item} className="rounded-lg bg-soft-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
            <OwnerActionList actions={ownerActions} />
          </div>
        </PortalSection>
      </section>
    </ModuleWorkspaceLayout>
  );
}

function AgencyFrameWorkspace({ moduleInfo }: { moduleInfo: FolioFrameModule }) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries.agencyframe ?? ""}
    >
      <PortalSection
        eyebrow="Agency client workspace index"
        title="Client delivery overview"
        body="Static agency records show client scope, workspace status, QA standard and next action."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {agencyClients.map((client) => (
            <article
              key={client.clientLabel}
              className="rounded-lg border border-mist-blue bg-soft-white p-4"
            >
              <h3 className="text-sm font-semibold text-deep-navy">
                {client.clientLabel}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                {client.scope}
              </p>
              <PortalStatusBadge>{client.workspaceStatus}</PortalStatusBadge>
              <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                QA standard: {client.qaStandard}
              </p>
              <p className="mt-2 text-sm font-semibold text-deep-navy">
                {client.nextAction}
              </p>
            </article>
          ))}
        </div>
      </PortalSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <ListPanel
          title="Handover template pack"
          items={handoverTemplatePack}
        />
        <PortalSection
          eyebrow="Care plan route"
          title="Post-build options"
          body="Repeatable care plan routes remain scope-dependent for each client."
          tone="warm"
        >
          <DefinitionGrid
            items={carePlanRoutes.map((item) => ({
              title: item.route,
              body: item.useCase,
            }))}
          />
        </PortalSection>
      </section>
    </ModuleWorkspaceLayout>
  );
}

function VerifiedDeliveryWorkspace({
  moduleInfo,
}: {
  moduleInfo: FolioFrameModule;
}) {
  return (
    <ModuleWorkspaceLayout
      moduleInfo={moduleInfo}
      boundary={moduleBoundaries["verified-delivery-standard"] ?? ""}
    >
      <PortalSection
        eyebrow="Status labels"
        title="Verified delivery readiness states"
        body="The standard uses operational status labels for owner review and handover."
      >
        <div className="flex flex-wrap gap-2">
          {verifiedDeliveryStatuses.map((status) => (
            <PortalStatusBadge key={status} tone={statusTone(status)}>
              {status}
            </PortalStatusBadge>
          ))}
        </div>
      </PortalSection>

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Checklist"
          title="Readiness criteria"
          body="Checklist items organize mapped, tested, documented and owner-approved delivery proof work."
        >
          <DefinitionGrid
            items={verifiedDeliveryChecks.map((item) => ({
              title: item.check,
              body: item.evidence,
              status: item.status,
            }))}
          />
        </PortalSection>
        <PortalSection
          eyebrow="Evidence packet"
          title="Proof materials"
          body="Sample evidence sections for system map, owner approval and reporting baseline."
        >
          <DefinitionGrid
            items={evidencePacket.map((item) => ({
              title: item.section,
              body: item.note,
              status: item.status,
            }))}
          />
        </PortalSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ListPanel
          title="QA review summary"
          items={moduleInfo.qaChecks}
          tone="warm"
        />
        <PortalSection
          eyebrow="Owner approval record"
          title="Static approval state"
          body="Owner approval remains a documented review step before production use. This static MVP does not certify platforms or financial outcomes."
        >
          <OwnerActionList actions={ownerActions} />
        </PortalSection>
      </section>
    </ModuleWorkspaceLayout>
  );
}
