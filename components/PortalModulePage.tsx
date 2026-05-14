import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/content/folioframeModules";
import { SectionHeader } from "./SectionHeader";

type PortalModulePageProps = {
  slug: string;
};

function Panel({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="rounded-lg border border-mist-blue bg-soft-white p-5">
      <h2 className="text-lg font-semibold text-deep-navy">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </article>
  );
}

export function PortalModulePage({ slug }: PortalModulePageProps) {
  const moduleInfo = getModuleBySlug(slug);

  if (!moduleInfo) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Static module workspace"
        title={`${moduleInfo.name} workspace`}
        body={`${moduleInfo.shortDescription} This internal view uses sample content only and is intended for owner review.`}
      />
      <section className="rounded-lg border border-champagne-line bg-warm-ivory p-6">
        <h2 className="text-xl font-semibold text-deep-navy">Problem solved</h2>
        <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
          {moduleInfo.problemSolved}
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <Panel title="Portal widgets" items={moduleInfo.portalWidgets} />
        <Panel title="QA checks" items={moduleInfo.qaChecks} />
        <Panel title="Deliverables" items={moduleInfo.deliverables} />
        <Panel title="Boundaries" items={moduleInfo.boundaries} />
      </section>
    </div>
  );
}
