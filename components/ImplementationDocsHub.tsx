import Link from "next/link";
import {
  folioframeImplementationDocs,
  implementationDocCategoryLabels,
  implementationDocCategoryOrder,
} from "@/content/folioframeImplementationDocs";
import {
  PortalSection,
  PortalStatusBadge,
  StaticDemoNotice,
} from "./PortalComponents";
import { SectionHeader } from "./SectionHeader";

export function ImplementationDocsHub() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Implementation resources"
        title="FolioFrame implementation docs"
        body="A static resource hub for blueprints, SOPs, runbooks, templates and QA plans used in premium FolioFrame service delivery."
      />

      <StaticDemoNotice>
        These resources are planning, SOP, runbook and handover documentation
        only. No payment, automation, email, file delivery, video, tracker or
        support tool is connected from this static portal.
      </StaticDemoNotice>

      <PortalSection
        eyebrow="Boundary"
        title="Planning only"
        body="Owner approval, secure credential handling and separate production implementation are required before any route in these docs can be connected."
        tone="warm"
      >
        <div className="flex flex-wrap gap-2">
          <PortalStatusBadge>Not live</PortalStatusBadge>
          <PortalStatusBadge>Documentation only</PortalStatusBadge>
          <PortalStatusBadge>Owner approval required</PortalStatusBadge>
        </div>
      </PortalSection>

      <div className="space-y-5">
        {implementationDocCategoryOrder.map((category) => {
          const docs = folioframeImplementationDocs.filter(
            (doc) => doc.category === category,
          );

          if (docs.length === 0) {
            return null;
          }

          return (
            <PortalSection
              key={category}
              eyebrow="Category"
              title={implementationDocCategoryLabels[category]}
              body="Static previews link to the planning document metadata and safety boundary."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/app/implementation-docs/${doc.slug}`}
                    className="rounded-lg border border-mist-blue bg-soft-white p-5 hover:border-pastel-blue hover:bg-mist-blue"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="max-w-[16rem] text-lg font-semibold leading-6 text-deep-navy">
                        {doc.title}
                      </h3>
                      <PortalStatusBadge>
                        {implementationDocCategoryLabels[doc.category]}
                      </PortalStatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                      {doc.summary}
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm leading-6">
                      <div>
                        <dt className="font-semibold text-deep-navy">
                          Related module
                        </dt>
                        <dd className="text-slate-blue-grey">{doc.relatedModule}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-deep-navy">
                          Best use case
                        </dt>
                        <dd className="text-slate-blue-grey">{doc.bestFor}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-deep-navy">
                          Safety boundary
                        </dt>
                        <dd className="text-slate-blue-grey">
                          {doc.safetyBoundary}
                        </dd>
                      </div>
                    </dl>
                    <span className="mt-5 inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy">
                      Open static preview
                    </span>
                  </Link>
                ))}
              </div>
            </PortalSection>
          );
        })}
      </div>
    </div>
  );
}
