"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "./BrandLockup";
import { StaticDemoNotice } from "./PortalComponents";

const portalLinks = [
  {
    group: "Command centre",
    links: [
      { label: "Overview", href: "/app" },
      { label: "Premium dashboard", href: "/app/premium-dashboard" },
      { label: "Buyer journey", href: "/app/buyer-journey" },
      { label: "Product matrix", href: "/app/product-matrix" },
      { label: "Handover", href: "/app/handover" },
      { label: "Implementation Docs", href: "/app/implementation-docs" },
      { label: "Live Foundation", href: "/app/live-foundation" },
      { label: "Workspace Setup", href: "/app/workspace-setup" },
    ],
  },
  {
    group: "Core workspaces",
    links: [
      { label: "FolioFix", href: "/app/foliofix" },
      { label: "DeliveryProof", href: "/app/deliveryproof" },
      { label: "AccessGuard", href: "/app/accessguard" },
      { label: "AccessDesk", href: "/app/accessdesk" },
      { label: "RevenueFrame", href: "/app/revenueframe" },
      { label: "AccessSafe", href: "/app/accesssafe" },
    ],
  },
  {
    group: "Advanced workspaces",
    links: [
      { label: "EntitlementFrame", href: "/app/entitlementframe" },
      { label: "InboxGuard", href: "/app/inboxguard" },
      { label: "AccessHub", href: "/app/accesshub" },
      { label: "LaunchRoom", href: "/app/launchroom" },
      { label: "MigrationFrame", href: "/app/migrationframe" },
      { label: "ProofMetrics", href: "/app/proofmetrics" },
      { label: "AgencyFrame", href: "/app/agencyframe" },
      { label: "Verified delivery", href: "/app/verified-delivery" },
    ],
  },
];

type PortalShellAuthSummary = {
  mode: "disabled-dev" | "clerk";
  configured: boolean;
  publicMessage: string;
};

export function PortalShell({
  children,
  authSummary,
}: {
  children: React.ReactNode;
  authSummary?: PortalShellAuthSummary;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authModeLabel =
    authSummary?.mode === "clerk" ? "Auth mode: Clerk" : "Auth mode: disabled-dev";

  return (
    <div className="min-h-screen overflow-x-hidden bg-soft-white text-ink-navy lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="max-w-full overflow-x-hidden border-b border-mist bg-warm-ivory px-4 py-4 sm:px-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:py-5">
        <div className="flex max-w-full flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <Link href="/" aria-label="FolioFrame home" className="inline-flex min-w-0">
              <BrandLockup compact />
            </Link>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="portal-mobile-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex shrink-0 rounded-md border border-champagne-line bg-soft-white px-3 py-2 text-sm font-semibold text-ink-navy shadow-sm lg:hidden"
            >
              {isMenuOpen ? "Close menu" : "Menu"}
            </button>
          </div>
          <StaticDemoNotice compact tone="quiet">
            {authSummary?.configured
              ? "Clerk auth foundation is active. Billing, platform connections, customer automation and live monitoring remain disconnected."
              : "Static/demo only. No real auth, billing, customer data, platform connections or live monitoring are active."}
          </StaticDemoNotice>
          <div className="rounded-md border border-mist bg-soft-white/80 p-2.5 text-xs leading-5 text-ink-navy">
            <p className="font-semibold">{authModeLabel}</p>
            <p className="mt-1 text-graphite">
              {authSummary?.publicMessage ??
                "Auth status is reported without exposing environment values."}
            </p>
          </div>
        </div>

        <nav
          id="portal-mobile-navigation"
          className={`${isMenuOpen ? "block" : "hidden"} mt-5 space-y-4 lg:block`}
          aria-label="Portal navigation"
        >
          {portalLinks.map((group) => (
            <div key={group.group}>
              <p className="px-1 text-xs font-semibold uppercase tracking-wide text-graphite">
                {group.group}
              </p>
              <div className="mt-2 grid min-w-0 grid-cols-1 gap-1.5 sm:grid-cols-3 lg:grid-cols-1">
                {group.links.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/app" && pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`min-w-0 overflow-hidden rounded-md border px-2 py-2 text-[13px] font-semibold leading-5 transition sm:px-3 sm:text-sm ${
                        isActive
                          ? "border-ink-navy bg-ink-navy text-soft-white shadow-sm"
                          : "border-transparent text-ink-navy hover:border-folio-blue hover:bg-mist"
                      }`}
                    >
                      <span className="block whitespace-normal break-all sm:break-words">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 sm:py-7 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <StaticDemoNotice compact tone="quiet">
            {authSummary?.configured
              ? "Clerk auth foundation may protect internal routes. No live billing, platform integrations, customer automation, support ticketing or monitoring is active."
              : "No real auth, billing, platform connections, customer records, live support tickets or live monitoring are active."}
          </StaticDemoNotice>
        </div>
        {children}
      </main>
    </div>
  );
}
