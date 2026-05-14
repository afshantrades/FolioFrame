import Link from "next/link";
import { notFound } from "next/navigation";
import {
  implementationDocCategoryLabels,
  type FolioFrameImplementationDoc,
} from "@/content/folioframeImplementationDocs";
import { getImplementationDocBySlug } from "@/content/folioframeImplementationHelpers";
import {
  PortalSection,
  PortalStatusBadge,
  StaticDemoNotice,
} from "./PortalComponents";
import { SectionHeader } from "./SectionHeader";

type ImplementationDocDetailPageProps = {
  slug: string;
};

const placeholderEnvironmentVariables = [
  'NEXT_PUBLIC_APP_URL="https://example.com"',
  'STRIPE_SECRET_KEY="sk_test_placeholder_replace_in_secure_env"',
  'STRIPE_WEBHOOK_SECRET="whsec_placeholder_replace_in_secure_env"',
  'MAILERLITE_API_KEY="placeholder_mailerlite_api_key"',
  'CONVERTKIT_API_KEY="placeholder_convertkit_api_key"',
  'MAKE_WEBHOOK_URL="https://hook.example.com/placeholder"',
  'ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/placeholder"',
  'AIRTABLE_API_KEY="placeholder_airtable_api_key"',
  'AIRTABLE_BASE_ID="app_placeholder"',
  'SUPPORT_EMAIL="support@example.com"',
  'ACCESSHUB_FORM_ENDPOINT="https://example.com/accesshub-placeholder"',
  'VIMEO_ACCESS_TOKEN="placeholder_vimeo_access_token"',
  'GOOGLE_DRIVE_FOLDER_ID="placeholder_google_drive_folder_id"',
] as const;

export function ImplementationDocDetailPage({
  slug,
}: ImplementationDocDetailPageProps) {
  const doc = getImplementationDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return <ImplementationDocPreview doc={doc} />;
}

function ImplementationDocPreview({
  doc,
}: {
  doc: FolioFrameImplementationDoc;
}) {
  const isEnvironmentTemplate = doc.slug === "environment-variables-template";

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Implementation resource"
        title={doc.title}
        body={doc.summary}
      />

      <StaticDemoNotice>
        This is a structured static preview of a planning document. It is not a
        live setup screen, and no third-party service is connected from this
        portal.
      </StaticDemoNotice>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PortalSection
          eyebrow="Status"
          title={implementationDocCategoryLabels[doc.category]}
          body={doc.staticStatus}
          tone="warm"
        >
          <div className="flex flex-wrap gap-2">
            <PortalStatusBadge>Not live</PortalStatusBadge>
            <PortalStatusBadge>Planning only</PortalStatusBadge>
            <PortalStatusBadge>Owner approval required</PortalStatusBadge>
          </div>
        </PortalSection>

        <PortalSection
          eyebrow="Related module"
          title={doc.relatedModule}
          body={doc.bestFor}
        />
      </section>

      <PortalSection
        eyebrow="Key sections"
        title="Static preview"
        body="The full markdown file remains in the repository. This portal view summarizes the document so teams can find the right resource quickly."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {doc.keySections.map((section) => (
            <article
              key={section}
              className="rounded-lg border border-mist-blue bg-soft-white p-4"
            >
              <h3 className="text-sm font-semibold leading-6 text-deep-navy">
                {section}
              </h3>
            </article>
          ))}
        </div>
      </PortalSection>

      {isEnvironmentTemplate ? (
        <PortalSection
          eyebrow="Placeholder variables"
          title="No real secrets"
          body="The environment template preview shows placeholder values only. Real credentials belong in an approved deployment environment or secret manager, never in this static portal."
          tone="warm"
        >
          <pre className="overflow-x-auto rounded-lg border border-mist-blue bg-deep-navy p-4 text-xs leading-6 text-soft-white">
            <code>{placeholderEnvironmentVariables.join("\n")}</code>
          </pre>
        </PortalSection>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <PortalSection
          eyebrow="Safety boundary"
          title="Use with approval"
          body={doc.safetyBoundary}
        />
        <PortalSection
          eyebrow="Repository file"
          title="Markdown source"
          body={doc.filePath}
        >
          <Link
            href="/app/implementation-docs"
            className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
          >
            Back to implementation docs
          </Link>
        </PortalSection>
      </section>
    </div>
  );
}
