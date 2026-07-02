import type { Metadata } from "next";
import { BrandAssetImage } from "@/components/BrandAssetImage";
import { MarketingPage } from "@/components/MarketingPage";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { routeBrandAssets } from "@/content/folioframeBrandAssets";
import { folioframeOffers } from "@/content/folioframeOffers";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Review FolioFrame pricing for FolioFix Audit, Signature Launch Premium, LaunchRoom, MigrationFrame, AgencyFrame and AccessGuard retainers.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const recommendedOffer = folioframeOffers.find(
    (offer) => offer.slug === "signature-launch-premium",
  );
  const supportingOffers = folioframeOffers.filter(
    (offer) => offer.slug !== "signature-launch-premium",
  );

  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeader
            eyebrow="Pricing"
            title="FolioFrame pricing for mapped, tested and documented delivery systems."
            body="Choose the scope that matches the complexity of your products, tiers, launch timing, migration needs and owner-review requirements. No payment processing is active in this scaffold."
          />
          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr] lg:grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]">
            <BrandAssetImage
              asset={routeBrandAssets.pricing.visual}
              loading="eager"
              className="rounded-lg border border-champagne-line bg-soft-white p-3 shadow-soft"
              imageClassName="rounded-md"
            />
            <BrandAssetImage
              asset={routeBrandAssets.pricing.motif}
              decorative
              loading="eager"
              className="rounded-lg border border-champagne-line bg-soft-white p-3 shadow-soft"
              imageClassName="mx-auto max-h-44 object-contain"
            />
          </div>
        </div>
      </section>
      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {recommendedOffer ? (
            <div className="mb-6 sm:mb-8">
              <OfferCard offer={recommendedOffer} emphasis="recommended" />
            </div>
          ) : null}
          <SectionHeader
            eyebrow="Other ways to start"
            title="Choose the right entry point for the system you need."
            body="The premium launch scope is highlighted above. Smaller audits, add-ons and retainers remain available when the project needs a narrower path."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {supportingOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-folio-blue bg-soft-white p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-ink-navy">
            Static pricing boundary
          </h2>
          <p className="mt-3 text-sm leading-6 text-graphite">
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
