import type { Metadata } from "next";
import { PortalShell } from "@/components/PortalShell";
import { getAuthStatusSummary } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "Static portal demo",
  description:
    "A static FolioFrame portal/demo surface for reviewing buyer-access reliability workspaces. No live billing, customer data, support ticketing or production integrations are active.",
  alternates: {
    canonical: "/app",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSummary = getAuthStatusSummary();

  return (
    <PortalShell authSummary={authSummary}>
      {!authSummary.configured ? (
        <div className="mb-6 rounded-md border border-champagne-line bg-warm-ivory px-4 py-3 text-sm leading-6 text-deep-navy">
          Auth foundation note: Clerk environment variables are not configured,
          so this static portal remains viewable for local development. When
          Clerk keys are configured, middleware is prepared to protect internal
          /app routes.
        </div>
      ) : null}
      {children}
    </PortalShell>
  );
}
