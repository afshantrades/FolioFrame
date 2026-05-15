import Link from "next/link";
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
  const isAuthRequired = snapshot.source === "auth-required";
  const isWorkspaceRequired = snapshot.source === "workspace-required";
  const authState = authConfigured ?? isDatabaseBacked;
  const databaseState = databaseConfigured ?? isDatabaseBacked;
  const title = isDatabaseBacked
    ? "Database-backed workspace data active"
    : isAuthRequired
      ? "Clerk sign-in required"
      : isWorkspaceRequired
        ? "Workspace membership required"
        : "Static demo fallback active";
  const body = isDatabaseBacked
    ? "Workspace, product, tier and audit records are being read from the configured database."
    : isAuthRequired
      ? "Clerk auth is configured, but no signed-in user session is available for this request."
      : isWorkspaceRequired
        ? "The signed-in user needs an active FolioFrame workspace membership before workspace records can be shown."
        : "FolioFrame is using static demo records because live auth/database configuration is not ready or could not be loaded.";

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
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-slate-blue-grey">{body}</p>
          <p className="mt-1 text-slate-blue-grey">{snapshot.guidance}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
          <span className="rounded-md border border-deep-navy px-2 py-1">
            Auth: {authState ? "configured" : "not configured"}
          </span>
          <span className="rounded-md border border-deep-navy px-2 py-1">
            Database: {databaseState ? "configured" : "not configured"}
          </span>
          <span className="rounded-md border border-deep-navy px-2 py-1">
            Source: {snapshot.source}
          </span>
        </div>
      </div>

      {isAuthRequired ? (
        <Link
          href="/sign-in"
          className="mt-4 inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
        >
          Sign in
        </Link>
      ) : null}

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
