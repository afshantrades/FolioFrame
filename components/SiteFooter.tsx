import Link from "next/link";
import { BrandLockup } from "./BrandLockup";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-mist-blue bg-deep-navy text-soft-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <BrandLockup tone="reversed" />
          <p className="mt-4 max-w-xl text-sm leading-6 text-mist-blue">
            FolioFrame uses the approved source-locked logo and applied brand
            assets. Live checkout, email, webhook and customer-data integrations
            remain separate production work.
          </p>
        </div>
        <nav className="flex flex-wrap items-start gap-3 text-sm text-mist-blue md:justify-end">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-soft-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
