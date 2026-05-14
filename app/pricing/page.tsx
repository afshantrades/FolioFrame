import { MarketingPage } from "@/components/MarketingPage";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { folioframeOffers } from "@/content/folioframeOffers";

export default function PricingPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pricing"
            title="FolioFrame offer structure"
            body="Pricing is static/demo copy for the MVP scaffold. No payment processing, contract workflow or billing connection is active."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {folioframeOffers.map((offer) => (
            <OfferCard key={offer.name} offer={offer} />
          ))}
        </div>
      </section>
    </MarketingPage>
  );
}
