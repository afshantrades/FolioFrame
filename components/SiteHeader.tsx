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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FolioFrame home">
          <BrandLockup />
        </Link>
        <nav className="flex w-full flex-wrap items-center gap-2 text-sm font-medium text-deep-navy sm:w-auto">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 hover:bg-mist-blue sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="rounded-md border border-champagne-line px-2 py-2 text-deep-navy hover:bg-warm-ivory sm:px-3"
          >
            Static portal
          </Link>
          <Link
            href="/apply"
            className="rounded-md bg-deep-navy px-3 py-2 text-soft-white hover:bg-slate-blue-grey sm:px-4"
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
