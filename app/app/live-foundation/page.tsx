import { LiveDataStatusBanner } from "@/components/LiveDataStatusBanner";
import { PortalSection, PortalStatusBadge } from "@/components/PortalComponents";
import { getAuthConfigurationStatus } from "@/lib/auth/isAuthConfigured";
import { getDatabaseFoundationStatus } from "@/lib/live/isDatabaseConfigured";
import { getPortalWorkspaceSnapshot } from "@/lib/live/portalDataAdapter";

const foundationItems = [
  {
    label: "Prisma schema",
    value: "present",
    detail: "Initial workspace, member, client, product, tier and audit models exist.",
  },
  {
    label: "Workspace service layer",
    value: "present",
    detail: "Server-only workspace services are prepared with database availability checks.",
  },
  {
    label: "Product service layer",
    value: "present",
    detail: "Server-only product and tier services are prepared for workspace-scoped reads.",
  },
  {
    label: "Audit log service",
    value: "present",
    detail: "Server-only audit log create/list utilities are prepared.",
  },
  {
    label: "Seed script",
    value: "present",
    detail: "Fictional demo workspace seed is available and guarded against placeholder DATABASE_URL values.",
  },
  {
    label: "Stripe",
    value: "not connected",
    detail: "Checkout and webhook phases remain blocked until a later approved step.",
  },
  {
    label: "Resend",
    value: "not connected",
    detail: "Transactional email sending remains blocked until a later approved step.",
  },
  {
    label: "Webhooks",
    value: "not connected",
    detail: "No live event ingestion routes exist yet.",
  },
  {
    label: "Static fallback",
    value: "enabled",
    detail: "Build and portal preview remain usable without production credentials.",
  },
];

function yesNo(value: boolean) {
  return value ? "yes" : "no";
}

export default async function LiveFoundationPage() {
  const authStatus = getAuthConfigurationStatus();
  const databaseStatus = getDatabaseFoundationStatus();
  const snapshot = await getPortalWorkspaceSnapshot();

  return (
    <div className="space-y-8">
      <PortalSection
        eyebrow="Live product foundation"
        title="Database and auth readiness"
        body="This page reports safe configuration booleans only. It does not display secrets, connect Stripe, send email, ingest webhooks or require a live database during build."
      >
        <LiveDataStatusBanner
          snapshot={snapshot}
          authConfigured={authStatus.authConfigured}
          databaseConfigured={databaseStatus.databaseConfigured}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-lg border border-mist-blue bg-soft-white p-4">
            <p className="text-sm font-semibold text-slate-blue-grey">Auth configured</p>
            <p className="mt-2 text-2xl font-semibold text-deep-navy">
              {yesNo(authStatus.authConfigured)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              Clerk keys are checked for presence and placeholder values.
            </p>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-4">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Database configured
            </p>
            <p className="mt-2 text-2xl font-semibold text-deep-navy">
              {yesNo(databaseStatus.databaseConfigured)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              DATABASE_URL is checked without attempting a connection.
            </p>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-4">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Portal data source
            </p>
            <p className="mt-2 break-words text-2xl font-semibold text-deep-navy">
              {snapshot.source}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              Adapter chooses static fallback or database-backed records safely.
            </p>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-4">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Public routes
            </p>
            <p className="mt-2 text-2xl font-semibold text-deep-navy">public</p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              Marketing pages remain outside auth middleware.
            </p>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-4">
            <p className="text-sm font-semibold text-slate-blue-grey">Portal routes</p>
            <p className="mt-2 text-2xl font-semibold text-deep-navy">prepared</p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              /app routes are ready for Clerk protection when auth is configured.
            </p>
          </article>
        </div>
      </PortalSection>

      <PortalSection
        eyebrow="Foundation status"
        title="What exists now"
        body="These items describe the live persistence foundation only. They do not mean FolioFrame is processing real buyers, payments, emails or support requests."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {foundationItems.map((item) => (
            <article
              key={item.label}
              className="rounded-lg border border-mist-blue bg-soft-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-base font-semibold leading-6 text-deep-navy">
                  {item.label}
                </h2>
                <PortalStatusBadge
                  tone={item.value === "not connected" ? "review" : "ready"}
                >
                  {item.value}
                </PortalStatusBadge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </PortalSection>

      <PortalSection
        eyebrow="Next setup step"
        title="Configure local persistence, then protect workspace routes"
        body="Next, configure local Postgres and run the Prisma migration, configure a Clerk development app, run the fictional seed script, then wire protected workspace route selection. Stripe, Resend and webhooks should remain disconnected until later approved phases."
        tone="warm"
      />
    </div>
  );
}
