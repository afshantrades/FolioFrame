import Link from "next/link";
import { getOfferModules } from "@/content/folioframeHelpers";
import type { FolioFrameOffer } from "@/content/folioframeOffers";

type OfferCardProps = {
  offer: FolioFrameOffer;
  compact?: boolean;
};

function OfferList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-normal text-deep-navy">
        {title}
      </p>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-blue-grey">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

export function OfferCard({ offer, compact = false }: OfferCardProps) {
  const includedModuleNames = getOfferModules(offer.slug).map(
    (moduleInfo) => moduleInfo.name,
  );

  return (
    <article
      className={
        offer.featured
          ? "rounded-lg border border-champagne-line bg-warm-ivory p-6 shadow-soft"
          : "rounded-lg border border-mist-blue bg-soft-white p-6"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-deep-navy">{offer.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
            {offer.outcome}
          </p>
        </div>
        <p className="rounded-md border border-champagne-line bg-soft-white px-3 py-2 text-sm font-semibold text-deep-navy">
          {offer.priceRange}
        </p>
      </div>
      <p className="mt-5 text-sm font-semibold text-deep-navy">{offer.bestFor}</p>
      {compact ? (
        <OfferList title="Deliverables" items={offer.deliverables.slice(0, 4)} />
      ) : (
        <div className="mt-5 grid gap-5">
          <OfferList title="Included modules" items={includedModuleNames} />
          <OfferList title="Deliverables" items={offer.deliverables} />
          <OfferList title="Not included" items={offer.notIncluded} />
          <OfferList
            title="Owner responsibilities"
            items={offer.ownerResponsibilities}
          />
        </div>
      )}
      <p className="mt-4 text-sm leading-6 text-slate-blue-grey">
        Timeline: {offer.timeline}
      </p>
      {!compact ? (
        <p className="mt-4 text-sm leading-6 text-slate-blue-grey">
          {offer.safeScopeBoundary}
        </p>
      ) : null}
      <div className="mt-6">
        <Link
          href={offer.path}
          className="inline-flex rounded-md bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
        >
          {offer.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
