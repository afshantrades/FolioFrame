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
            title="FolioFrame pricing for mapped, tested and documented delivery systems."
            body="Choose the scope that matches the complexity of your products, tiers, launch timing, migration needs and owner-review requirements. No payment processing is active in this scaffold."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {folioframeOffers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>
      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-pastel-blue bg-soft-white p-6">
          <h2 className="text-2xl font-semibold text-deep-navy">
            Static pricing boundary
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
            These offers describe reviewable operating materials, owner-approved
            documentation and implementation planning. Production integrations,
            live customer data, billing workflows and monitoring decisions require a
            separate approved implementation scope.
          </p>
        </div>
      </section>
    </MarketingPage>
  );
}
