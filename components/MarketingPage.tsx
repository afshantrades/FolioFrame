import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function MarketingPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soft-white">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
