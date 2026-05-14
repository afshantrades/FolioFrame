import Link from "next/link";
import { BrandLockup } from "./BrandLockup";

const primaryNav = [
  { label: "Modules", href: "/modules" },
  { label: "Signature Launch", href: "/signature-launch-system" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-mist-blue bg-soft-white/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FolioFrame home">
          <BrandLockup />
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-deep-navy">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 hover:bg-mist-blue"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="rounded-md border border-champagne-line px-3 py-2 text-deep-navy hover:bg-warm-ivory"
          >
            Static portal
          </Link>
          <Link
            href="/apply"
            className="rounded-md bg-deep-navy px-4 py-2 text-soft-white hover:bg-slate-blue-grey"
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
