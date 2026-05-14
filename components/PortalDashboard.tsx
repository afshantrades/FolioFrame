import {
  buyerJourneySteps,
  dashboardMetrics,
  launchRoomIssues,
  handoverItems,
  productTierMatrix,
} from "@/content/folioframeDemoData";
import { SectionHeader } from "./SectionHeader";

export function PortalDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Internal static portal"
        title="FolioFrame premium dashboard"
        body="A static owner-review workspace showing how delivery proof, access rules, support paths and reporting could be organized."
      />
      <section className="grid gap-4 md:grid-cols-4">
        {dashboardMetrics.map((item) => (
          <article
            key={item.label}
            className="rounded-lg border border-mist-blue bg-soft-white p-5"
          >
            <p className="text-sm font-semibold text-slate-blue-grey">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-deep-navy">{item.value}</p>
            <p className="mt-1 text-xs font-semibold text-deep-navy">{item.trend}</p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">{item.note}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
          <h2 className="text-xl font-semibold text-deep-navy">Buyer journey</h2>
          <div className="mt-5 grid gap-3">
            {buyerJourneySteps.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-md border border-mist-blue bg-soft-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-deep-navy">{stage.stage}</h3>
                  <span className="rounded-md bg-mist-blue px-3 py-1 text-xs font-semibold text-deep-navy">
                    {stage.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {stage.detail}
                </p>
                <p className="mt-2 text-xs font-semibold text-deep-navy">
                  Owner: {stage.owner}
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-champagne-line bg-warm-ivory p-6">
          <h2 className="text-xl font-semibold text-deep-navy">Launch review issues</h2>
          <div className="mt-5 grid gap-3">
            {launchRoomIssues.map((issue) => (
              <div key={issue.issue} className="rounded-md bg-soft-white p-4">
                <h3 className="font-semibold text-deep-navy">{issue.issue}</h3>
                <p className="mt-2 text-sm text-slate-blue-grey">
                  Owner: {issue.owner}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {issue.route}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
          <h2 className="text-xl font-semibold text-deep-navy">Product matrix</h2>
          <div className="mt-5 grid gap-3">
            {productTierMatrix.map((row) => (
              <div key={row.product} className="rounded-md border border-mist-blue p-4">
                <h3 className="font-semibold text-deep-navy">
                  {row.product} - {row.tier}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
                  {row.accessRule}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-blue-grey">
                  {row.deliveryPath}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-blue-grey">
                  {row.supportRoute}
                </p>
                <p className="mt-2 text-sm font-semibold text-deep-navy">
                  {row.reviewState}
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
          <h2 className="text-xl font-semibold text-deep-navy">Handover packet</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-blue-grey">
            {handoverItems.map((item) => (
              <li key={item.item} className="rounded-md bg-mist-blue px-4 py-3">
                <span className="font-semibold text-deep-navy">{item.item}</span>
                <span className="block">Owner: {item.owner}</span>
                <span className="block">Status: {item.status}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
