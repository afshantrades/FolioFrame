import Link from "next/link";
import type { FolioFrameOffer } from "@/content/folioframeOffers";

type OfferCardProps = {
  offer: FolioFrameOffer;
};

export function OfferCard({ offer }: OfferCardProps) {
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
            {offer.summary}
          </p>
        </div>
        <p className="rounded-md border border-champagne-line bg-soft-white px-3 py-2 text-sm font-semibold text-deep-navy">
          {offer.price}
        </p>
      </div>
      <p className="mt-5 text-sm font-semibold text-deep-navy">{offer.bestFor}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
        {offer.includes.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href={offer.path}
          className="inline-flex rounded-md bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
        >
          Review scope
        </Link>
      </div>
    </article>
  );
}
