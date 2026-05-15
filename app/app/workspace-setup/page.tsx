import Link from "next/link";

import {
  PortalMetricCard,
  PortalSection,
  PortalStatusBadge,
  StaticDemoNotice,
} from "@/components/PortalComponents";
import { getAuthStatusSummary } from "@/lib/auth/config";
import { getCurrentWorkspaceContext } from "@/lib/auth/currentWorkspace";
import { getDatabaseFoundationStatus } from "@/lib/live/isDatabaseConfigured";
import { createDemoWorkspaceAction } from "./actions";

function statusCopy(status: string) {
  if (status === "auth-disabled") {
    return {
      title: "Auth is disabled for local development",
      body: "Clerk keys are missing or placeholder values, so FolioFrame keeps the portal available as a static/demo preview. Configure Clerk locally before creating a workspace.",
    };
  }

  if (status === "unauthenticated") {
    return {
      title: "Sign in before workspace setup",
      body: "Clerk auth is configured, but this request does not include a signed-in user session.",
    };
  }

  if (status === "database-unavailable") {
    return {
      title: "Database setup is required",
      body: "Workspace onboarding needs the local Postgres database and Prisma schema before it can create records.",
    };
  }

  if (status === "workspace-required") {
    return {
      title: "Create a fictional demo workspace",
      body: "This creates a FolioFrame workspace, OWNER membership, fictional demo client, demo products, demo tiers and audit entries for local development only.",
    };
  }

  if (status === "ready") {
    return {
      title: "Workspace membership found",
      body: "This signed-in user already has an active FolioFrame workspace membership.",
    };
  }

  return {
    title: "Workspace setup needs owner attention",
    body: "Resolve the current auth, user or database state before creating a workspace.",
  };
}

export default async function WorkspaceSetupPage() {
  const authStatus = getAuthStatusSummary();
  const databaseStatus = getDatabaseFoundationStatus();
  const context = await getCurrentWorkspaceContext();
  const copy = statusCopy(context.status);

  return (
    <div className="space-y-8">
      <PortalSection
        eyebrow="Workspace onboarding"
        title={copy.title}
        body={copy.body}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PortalMetricCard
            label="Auth mode"
            value={authStatus.mode}
            trend={authStatus.configured ? "Clerk" : "Static fallback"}
            note={authStatus.publicMessage}
          />
          <PortalMetricCard
            label="Database configured"
            value={databaseStatus.databaseConfigured ? "yes" : "no"}
            trend="Local foundation"
            note="The route only reports booleans and never displays connection values."
          />
          <PortalMetricCard
            label="Workspace context"
            value={context.status}
            trend="Server checked"
            note="Workspace data is only shown after server-side membership checks pass."
          />
          <PortalMetricCard
            label="Setup route"
            value="available"
            trend="No integrations"
            note="Stripe, Resend, webhooks and public form handling remain disconnected."
          />
        </div>
      </PortalSection>

      {context.status === "auth-disabled" ? (
        <PortalSection
          eyebrow="Local setup"
          title="Static demo mode remains active"
          body="Use the Clerk development setup guide before testing real sign-in and workspace ownership. The guide lives in docs/live/FOLIOFRAME_CLERK_DEV_SETUP.md."
          tone="warm"
        >
          <StaticDemoNotice>
            No real auth, billing, customer records, platform integrations or live
            monitoring are active while Clerk is not configured.
          </StaticDemoNotice>
        </PortalSection>
      ) : null}

      {context.status === "unauthenticated" ? (
        <PortalSection
          eyebrow="Clerk session"
          title="Sign in to continue"
          body="Workspace setup needs a signed-in Clerk user so FolioFrame can create or locate the matching internal User record."
          tone="warm"
        >
          <Link
            href="/sign-in"
            className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
          >
            Open sign-in
          </Link>
        </PortalSection>
      ) : null}

      {context.status === "workspace-required" ? (
        <PortalSection
          eyebrow="Create demo workspace"
          title="Bootstrap a local owner workspace"
          body="This action creates fictional development records only: workspace, OWNER membership, demo client, demo products, demo tiers, owner action audit entries and setup audit logs."
          tone="warm"
        >
          <form action={createDemoWorkspaceAction}>
            <button
              type="submit"
              className="rounded-md border border-deep-navy bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-soft-white hover:text-deep-navy"
            >
              Create demo workspace
            </button>
          </form>
          <p className="mt-4 text-sm leading-6 text-slate-blue-grey">
            This does not create buyers, orders, payment records, Stripe data,
            email data or webhook events.
          </p>
        </PortalSection>
      ) : null}

      {context.status === "ready" ? (
        <PortalSection
          eyebrow="Workspace summary"
          title={context.workspace.name}
          body={`Workspace slug: ${context.workspace.slug}. Role: ${context.role}. Membership status: ${context.membership.status}.`}
        >
          <div className="flex flex-wrap gap-3">
            <PortalStatusBadge tone="ready">{context.role}</PortalStatusBadge>
            <PortalStatusBadge tone="ready">{context.membership.status}</PortalStatusBadge>
            <Link
              href="/app/premium-dashboard"
              className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
            >
              Open premium dashboard
            </Link>
          </div>
        </PortalSection>
      ) : null}

      {context.status === "database-unavailable" || context.status === "user-required" ? (
        <PortalSection
          eyebrow="Setup blocked"
          title="Resolve setup requirements"
          body={context.publicMessage}
          tone="warm"
        />
      ) : null}
    </div>
  );
}
