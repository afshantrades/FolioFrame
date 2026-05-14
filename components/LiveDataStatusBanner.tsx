import type { PortalWorkspaceSnapshot } from "@/lib/live/portalDataAdapter";

type LiveDataStatusBannerProps = {
  snapshot: PortalWorkspaceSnapshot;
  authConfigured?: boolean;
  databaseConfigured?: boolean;
};

export function LiveDataStatusBanner({
  snapshot,
  authConfigured,
  databaseConfigured,
}: LiveDataStatusBannerProps) {
  const isDatabaseBacked = snapshot.source === "database";
  const authState = authConfigured ?? isDatabaseBacked;
  const databaseState = databaseConfigured ?? isDatabaseBacked;

  return (
    <div
      className={`rounded-lg border p-4 text-sm leading-6 ${
        isDatabaseBacked
          ? "border-pastel-blue bg-mist-blue text-deep-navy"
          : "border-champagne-line bg-warm-ivory text-deep-navy"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold">
            {isDatabaseBacked
              ? "Database-backed workspace data active"
              : "Static demo fallback active"}
          </p>
          <p className="mt-1 text-slate-blue-grey">
            {isDatabaseBacked
              ? "Workspace, product, tier and audit records are being read from the configured database."
              : "FolioFrame is using static demo records because live auth/database configuration is not ready or could not be loaded."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
          <span className="rounded-md border border-deep-navy px-2 py-1">
            Auth: {authState ? "configured" : "not configured"}
          </span>
          <span className="rounded-md border border-deep-navy px-2 py-1">
            Database: {databaseState ? "configured" : "not configured"}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-deep-navy">
        Production integrations not connected
      </p>
      <p className="mt-1 text-slate-blue-grey">
        Stripe, Resend, webhooks, public form handling and production credentials
        remain disconnected.
      </p>

      {snapshot.warnings.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-blue-grey">
          {snapshot.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
