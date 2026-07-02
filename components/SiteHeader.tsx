import Link from "next/link";
import { BrandLockup } from "./BrandLockup";

const primaryNav = [
  { label: "Modules", href: "/modules" },
  { label: "Signature Launch", href: "/signature-launch" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-mist bg-soft-white/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FolioFrame home">
          <BrandLockup />
        </Link>
        <nav className="grid w-full min-w-0 basis-full grid-cols-1 gap-2 text-sm font-medium text-ink-navy sm:flex sm:w-auto sm:basis-auto sm:flex-wrap sm:items-center">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-w-0 rounded-md px-2 py-2 text-center hover:bg-mist sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="min-w-0 rounded-md border border-champagne-line px-2 py-2 text-center text-ink-navy hover:bg-warm-ivory sm:px-3"
          >
            Static portal
          </Link>
          <Link
            href="/apply"
            className="min-w-0 rounded-md bg-ink-navy px-3 py-2 text-center text-soft-white hover:bg-graphite sm:px-4"
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
