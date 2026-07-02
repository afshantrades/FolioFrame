import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function MarketingPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-soft-white text-ink-navy">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
