import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import type { AuthStatusSummary } from "@/lib/auth/authMode";

type AuthRoutePanelProps = {
  title: string;
  body: string;
  authStatus: AuthStatusSummary;
  children?: React.ReactNode;
};

export function AuthRoutePanel({
  title,
  body,
  authStatus,
  children,
}: AuthRoutePanelProps) {
  return (
    <main className="min-h-screen bg-warm-ivory px-4 py-8 text-deep-navy sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="FolioFrame home" className="inline-flex">
            <BrandLockup />
          </Link>
          <Link
            href="/app/live-foundation"
            className="rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
          >
            Live foundation
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)]">
          <div className="rounded-lg border border-mist-blue bg-soft-white p-6 sm:p-8">
            <p className="text-sm font-semibold text-slate-blue-grey">
              FolioFrame auth foundation
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-blue-grey">
              {body}
            </p>
            <div className="mt-6 rounded-lg border border-champagne-line bg-warm-ivory p-4 text-sm leading-6">
              <p className="font-semibold">
                Auth mode: {authStatus.mode === "clerk" ? "Clerk" : "disabled-dev"}
              </p>
              <p className="mt-1 text-slate-blue-grey">{authStatus.publicMessage}</p>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-blue-grey">
              Stripe, Resend, webhooks, backend public form handling and production
              credentials remain disconnected.
            </p>
          </div>

          <div className="rounded-lg border border-mist-blue bg-soft-white p-5 sm:p-6">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export function AuthSetupInstructions({ routeLabel }: { routeLabel: string }) {
  const steps = [
    "Create a Clerk development application.",
    "Add local Clerk values to the ignored .env.local file.",
    "Restart the local Next.js dev server.",
    `Reopen ${routeLabel} to confirm the Clerk screen renders.`,
    "Do not commit .env.local or any production credentials.",
  ];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-blue-grey">
        Setup required
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-deep-navy">
        Clerk is not configured locally
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
        This page is intentionally a setup notice until usable Clerk development
        keys are present. Placeholder values do not activate auth.
      </p>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-blue-grey">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
