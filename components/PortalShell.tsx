import Link from "next/link";
import { BrandLockup } from "./BrandLockup";
import { staticDemoNotice } from "@/content/folioframeDemoData";

const portalLinks = [
  { label: "Overview", href: "/app" },
  { label: "Premium dashboard", href: "/app/premium-dashboard" },
  { label: "Buyer journey", href: "/app/buyer-journey" },
  { label: "Product matrix", href: "/app/product-matrix" },
  { label: "DeliveryProof", href: "/app/deliveryproof" },
  { label: "AccessGuard", href: "/app/accessguard" },
  { label: "AccessDesk", href: "/app/accessdesk" },
  { label: "RevenueFrame", href: "/app/revenueframe" },
  { label: "AccessSafe", href: "/app/accesssafe" },
  { label: "FolioFix", href: "/app/foliofix" },
  { label: "EntitlementFrame", href: "/app/entitlementframe" },
  { label: "InboxGuard", href: "/app/inboxguard" },
  { label: "AccessHub", href: "/app/accesshub" },
  { label: "LaunchRoom", href: "/app/launchroom" },
  { label: "MigrationFrame", href: "/app/migrationframe" },
  { label: "ProofMetrics", href: "/app/proofmetrics" },
  { label: "AgencyFrame", href: "/app/agencyframe" },
  { label: "Verified delivery", href: "/app/verified-delivery" },
  { label: "Handover", href: "/app/handover" },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soft-white text-deep-navy lg:grid lg:grid-cols-[290px_1fr]">
      <aside className="border-b border-mist-blue bg-warm-ivory p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link href="/" aria-label="FolioFrame home">
          <BrandLockup />
        </Link>
        <div className="mt-6 rounded-lg border border-champagne-line bg-soft-white p-4 text-sm leading-6 text-slate-blue-grey">
          {staticDemoNotice}
        </div>
        <nav className="mt-6 grid gap-1 text-sm font-medium">
          {portalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-deep-navy hover:bg-mist-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-5 sm:p-8">
        <div className="mb-6 rounded-lg border border-pastel-blue bg-mist-blue p-4 text-sm font-medium text-deep-navy">
          Static/demo portal only. No real auth, billing, platform connections,
          customer data or live monitoring are active.
        </div>
        {children}
      </main>
    </div>
  );
}
