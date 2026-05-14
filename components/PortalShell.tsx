"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-x-hidden bg-soft-white text-deep-navy lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="border-b border-mist-blue bg-warm-ivory px-4 py-5 sm:px-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="FolioFrame home" className="inline-flex">
            <BrandLockup />
          </Link>
          <StaticDemoNotice compact />
        </div>

        <nav className="mt-6 space-y-5" aria-label="Portal navigation">
          {portalLinks.map((group) => (
            <div key={group.group}>
              <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-blue-grey">
                {group.group}
              </p>
              <div className="mt-2 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {group.links.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/app" && pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`min-w-0 overflow-hidden rounded-md border px-2 py-2 text-[13px] font-semibold leading-5 transition sm:px-3 sm:text-sm ${
                        isActive
                          ? "border-deep-navy bg-deep-navy text-soft-white shadow-sm"
                          : "border-transparent text-deep-navy hover:border-pastel-blue hover:bg-mist-blue"
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
      <main className="min-w-0 overflow-x-hidden px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <StaticDemoNotice compact>
            No real auth, billing, platform connections, customer records, live
            support tickets or live monitoring are active.
          </StaticDemoNotice>
        </div>
        {children}
      </main>
    </div>
  );
}
