import {
  buyerJourneySteps,
  handoverItems,
  productTierMatrix,
} from "@/content/folioframeDemoData";
import { SectionHeader } from "./SectionHeader";

const staticPages = {
  "buyer-journey": {
    eyebrow: "Journey map",
    title: "Buyer journey review",
    body: "A static path from checkout through access, delivery, support and follow-up.",
  },
  "product-matrix": {
    eyebrow: "Product tracks",
    title: "Product matrix",
    body: "A sample matrix for product-level access rules, delivery paths and review states.",
  },
  handover: {
    eyebrow: "Handover",
    title: "Handover packet",
    body: "A static checklist of documents an owner would review before production setup.",
  },
} as const;

type PortalStaticPageProps = {
  pageKey: keyof typeof staticPages;
};

export function PortalStaticPage({ pageKey }: PortalStaticPageProps) {
  const page = staticPages[pageKey];

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={page.eyebrow} title={page.title} body={page.body} />
      {pageKey === "buyer-journey" ? (
        <section className="grid gap-4">
          {buyerJourneySteps.map((stage) => (
            <article
              key={stage.stage}
              className="rounded-lg border border-mist-blue bg-soft-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-deep-navy">{stage.stage}</h2>
                <span className="rounded-md bg-mist-blue px-3 py-1 text-xs font-semibold text-deep-navy">
                  {stage.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                {stage.detail}
              </p>
              <p className="mt-3 text-sm font-semibold text-deep-navy">
                Owner: {stage.owner}
              </p>
            </article>
          ))}
        </section>
      ) : null}
      {pageKey === "product-matrix" ? (
        <section className="grid gap-4">
          {productTierMatrix.map((row) => (
            <article
              key={`${row.product}-${row.tier}`}
              className="rounded-lg border border-mist-blue bg-soft-white p-5"
            >
              <h2 className="text-lg font-semibold text-deep-navy">
                {row.product} - {row.tier}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                {row.accessRule}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                {row.deliveryPath}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                {row.supportRoute}
              </p>
              <p className="mt-3 text-sm font-semibold text-deep-navy">
                {row.reviewState}
              </p>
            </article>
          ))}
        </section>
      ) : null}
      {pageKey === "handover" ? (
        <section className="grid gap-3 md:grid-cols-2">
          {handoverItems.map((item) => (
            <div
              key={item.item}
              className="rounded-lg border border-mist-blue bg-soft-white p-5 text-sm font-medium text-deep-navy"
            >
              {item.item}
              <span className="mt-2 block font-normal text-slate-blue-grey">
                Owner: {item.owner}. Status: {item.status}.
              </span>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
