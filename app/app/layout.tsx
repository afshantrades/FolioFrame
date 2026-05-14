import { PortalShell } from "@/components/PortalShell";
import { isClerkConfigured } from "@/lib/auth/config";

export default function InternalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalShell>
      {!isClerkConfigured() ? (
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
