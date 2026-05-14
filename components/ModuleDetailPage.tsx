import { notFound } from "next/navigation";
import Link from "next/link";
import { getModuleBySlug, getRelatedModules } from "@/content/folioframeHelpers";
import { MarketingPage } from "./MarketingPage";
import { SectionHeader } from "./SectionHeader";

type ModuleDetailPageProps = {
  slug: string;
};

function DetailList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
      <h3 className="text-lg font-semibold text-deep-navy">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </article>
  );
}

export function ModuleDetailPage({ slug }: ModuleDetailPageProps) {
  const moduleInfo = getModuleBySlug(slug);

  if (!moduleInfo) {
    notFound();
  }

  const relatedModules = getRelatedModules(moduleInfo.slug);
  const categoryLabel =
    moduleInfo.category === "add-on" ? "Add-on" : moduleInfo.category;

  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-slate-blue-grey">
            {categoryLabel} module
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-deep-navy sm:text-6xl">
            {moduleInfo.publicHeadline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-blue-grey">
            {moduleInfo.publicBody}
          </p>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-champagne-line bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              {moduleInfo.name}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-blue-grey">
              {moduleInfo.longDescription}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-blue-grey">
              {moduleInfo.problemSolved}
            </p>
            <p className="mt-4 text-sm font-semibold text-deep-navy">
              {moduleInfo.pricingNotes}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailList title="Ideal for" items={moduleInfo.idealFor} />
            <DetailList title="What is included" items={moduleInfo.whatIsIncluded} />
            <DetailList title="Deliverables" items={moduleInfo.deliverables} />
            <DetailList title="Portal widgets" items={moduleInfo.portalWidgets} />
            <DetailList title="QA checks" items={moduleInfo.qaChecks} />
            <DetailList title="Owner actions" items={moduleInfo.ownerActions} />
            <DetailList title="Safe claims" items={moduleInfo.safeClaims} />
          </div>
        </div>
      </section>
      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Scope boundaries"
            title="Clear limits keep the system honest."
            body="FolioFrame language is intentionally operational. It documents safeguards and recovery routes without promising outcomes the tooling cannot own."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {moduleInfo.boundaries.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-pastel-blue bg-soft-white p-5 text-sm leading-6 text-slate-blue-grey"
              >
                {item}
              </div>
            ))}
          </div>
          {relatedModules.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedModules.map((relatedModule) => (
                <Link
                  key={relatedModule.slug}
                  href={relatedModule.publicPath}
                  className="rounded-lg border border-pastel-blue bg-soft-white p-5"
                >
                  <h3 className="text-base font-semibold text-deep-navy">
                    {relatedModule.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                    {relatedModule.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto rounded-lg border border-champagne-line bg-deep-navy p-8 text-soft-white">
          <p className="text-sm font-semibold text-pastel-blue">Next step</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold">
            Review where {moduleInfo.name} fits in your checkout-to-customer system.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-mist-blue">
            Use the static application preview to describe your product structure,
            current tools, access rules, launch needs, and handover questions.
          </p>
          <Link
            href="/apply"
            className="mt-6 inline-flex max-w-full rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
          >
            Open application preview
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
