import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/content/folioframeModules";
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

  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-slate-blue-grey">
            {moduleInfo.category} module
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-deep-navy sm:text-6xl">
            {moduleInfo.websiteHeadline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-blue-grey">
            {moduleInfo.websiteBody}
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
              {moduleInfo.problemSolved}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailList title="What is included" items={moduleInfo.included} />
            <DetailList title="Deliverables" items={moduleInfo.deliverables} />
            <DetailList title="Portal widgets" items={moduleInfo.portalWidgets} />
            <DetailList title="QA checks" items={moduleInfo.qaChecks} />
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
        </div>
      </section>
    </MarketingPage>
  );
}
