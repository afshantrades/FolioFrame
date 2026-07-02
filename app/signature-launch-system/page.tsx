import type { Metadata } from "next";
import Link from "next/link";
import { BrandAssetImage } from "@/components/BrandAssetImage";
import { FAQBlock } from "@/components/FAQBlock";
import { MarketingPage } from "@/components/MarketingPage";
import { ModuleCard } from "@/components/ModuleCard";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { routeBrandAssets } from "@/content/folioframeBrandAssets";
import { getOfferBySlug, getOfferModules } from "@/content/folioframeHelpers";
import {
  addOnModules,
  advancedModules,
  coreModules,
} from "@/content/folioframeModules";
import { folioframeOffers } from "@/content/folioframeOffers";

export const metadata: Metadata = {
  title: "Signature Launch Premium",
  description:
    "Review FolioFrame Signature Launch Premium for mapped, tested and documented checkout-to-customer delivery, access, support and handover systems.",
  alternates: {
    canonical: "/signature-launch",
  },
};

const forList = [
  "Premium digital product launches with multiple access paths",
  "Sellers with tiers, bundles, cohorts or upgrade logic",
  "Teams that need support recovery routes before launch week",
  "Owners who want delivery proof, reporting and handover documentation reviewed before production implementation",
];

const notForList = [
  "Teams looking for payment processing inside this static scaffold",
  "Projects asking for platform outcome promises",
  "Launches without an owner available to approve access and delivery decisions",
  "Teams that need specialist legal, tax or security certification work",
];

const timeline = [
  {
    title: "Week 1",
    body: "Map payment, entitlement, access, delivery, onboarding, support and follow-up paths.",
  },
  {
    title: "Week 2",
    body: "Document core module rules, delivery safeguards, support routes and product tracks.",
  },
  {
    title: "Week 3",
    body: "Review advanced entitlement, message fallback, portal structure and ProofMetrics reporting.",
  },
  {
    title: "Final review",
    body: "Complete owner approvals, readiness notes, scope boundaries and handover packet.",
  },
];

export default function SignatureLaunchSystemPage() {
  const premiumOffer = getOfferBySlug("signature-launch-premium");
  const premiumModules = getOfferModules("signature-launch-premium");
  const launchRoom = addOnModules.find((module) => module.slug === "launchroom");
  const migrationFrame = addOnModules.find(
    (module) => module.slug === "migrationframe",
  );
  const pricing = folioframeOffers.filter((offer) =>
    [
      "Signature Launch System",
      "Signature Launch Premium",
      "Signature Launch + LaunchRoom",
    ].includes(offer.name),
  );

  return (
    <MarketingPage>
      <section className="bg-ink-navy px-5 py-20 text-soft-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-folio-blue">
              Signature Launch System
            </p>
            <h1 className="mt-4 max-w-full break-words text-xl font-semibold leading-tight [overflow-wrap:anywhere] sm:max-w-5xl sm:text-6xl">
              <span className="block">A premium checkout-to-customer system</span>
              <span className="block">for high-stakes digital product launches.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-mist">
              Signature Launch Premium maps, tests and documents payment,
              entitlement, access, delivery, onboarding, support, follow-up,
              reporting and verified delivery proof before production implementation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex w-full max-w-full justify-center rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-ink-navy hover:bg-mist sm:w-auto"
              >
                Apply for Signature Launch Premium
              </Link>
              <Link
                href="/pricing"
                className="inline-flex w-full max-w-full justify-center rounded-md border border-folio-blue px-5 py-3 text-sm font-semibold text-soft-white hover:bg-graphite sm:w-auto"
              >
                Compare pricing
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-folio-blue/70 bg-soft-white/10 p-4">
            <BrandAssetImage
              asset={routeBrandAssets.signatureLaunch.visual}
              loading="eager"
              className="rounded-md border border-folio-blue/50 bg-soft-white p-2"
              imageClassName="rounded-md"
            />
            <BrandAssetImage
              asset={routeBrandAssets.signatureLaunch.motif}
              decorative
              loading="eager"
              className="mt-4 rounded-md border border-folio-blue/40 bg-ink-navy p-3"
              imageClassName="mx-auto max-h-32 object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              Who it is for
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
              {forList.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              Who it is not for
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
              {notForList.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {premiumOffer ? (
        <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="What is included"
              title="Signature Launch Premium is built from the full higher-tier module set."
              body={premiumOffer.outcome}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {premiumModules.map((module) => (
                <Link
                  key={module.slug}
                  href={module.publicPath}
              className="rounded-lg border border-champagne-line bg-soft-white p-5"
                >
                  <h3 className="text-base font-semibold text-ink-navy">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">
                    {module.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {premiumOffer ? (
        <section className="px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Deliverables"
              title="The launch handover is made from reviewable artifacts."
              body="Each deliverable is designed to help the owner approve operational rules, safeguards and handover decisions."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {premiumOffer.deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-mist-blue bg-soft-white p-5 text-sm font-medium text-deep-navy"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-mist px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Timeline"
            title="A measured sequence from map to owner approval."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {timeline.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-folio-blue bg-soft-white p-5"
              >
                <h3 className="text-lg font-semibold text-ink-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-graphite">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core modules"
            title="Foundation modules for launch reliability."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreModules.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Advanced modules"
            title="The premium layer for entitlement, messages, proof and reporting."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advancedModules.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {launchRoom ? (
            <article className="rounded-lg border border-folio-blue bg-soft-white p-6">
              <h2 className="text-2xl font-semibold text-ink-navy">
                LaunchRoom add-on
              </h2>
              <p className="mt-3 text-sm leading-6 text-graphite">
                {launchRoom.longDescription}
              </p>
              <Link
                href="/launchroom"
                className="mt-5 inline-flex rounded-md bg-ink-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-graphite"
              >
                Review LaunchRoom
              </Link>
            </article>
          ) : null}
          {migrationFrame ? (
            <article className="rounded-lg border border-folio-blue bg-soft-white p-6">
              <h2 className="text-2xl font-semibold text-ink-navy">
                MigrationFrame add-on
              </h2>
              <p className="mt-3 text-sm leading-6 text-graphite">
                {migrationFrame.longDescription}
              </p>
              <Link
                href="/migrationframe"
                className="mt-5 inline-flex rounded-md bg-ink-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-graphite"
              >
                Review MigrationFrame
              </Link>
            </article>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pricing"
            title="Launch system options."
            body="Pricing copy is static. No payment collection or contract workflow is active."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pricing.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} compact />
            ))}
          </div>
        </div>
      </section>

      {premiumOffer ? (
        <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Owner responsibilities"
              title="The system needs owner-approved decisions."
              body="FolioFrame can document the operational system, but the owner still approves product rules, buyer-facing messages, handover boundaries and production choices."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {premiumOffer.ownerResponsibilities.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-champagne-line bg-soft-white p-5 text-sm leading-6 text-slate-blue-grey"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Safe scope boundary"
            title="Launch readiness without impossible promises."
            body="Signature Launch Premium stays focused on mapped, tested, documented and owner-approved operating materials, with monitoring recommended after production setup."
          />
          <div className="rounded-lg border border-pastel-blue bg-soft-white p-6">
            <ul className="space-y-2 text-sm leading-6 text-slate-blue-grey">
              <li>- No production credentials in the static scaffold</li>
              <li>- No live customer or platform data</li>
              <li>- No fake live monitoring</li>
              <li>- No outcome promises or platform relationship claims</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="FAQ" title="Launch scope questions." />
          <div className="mt-8">
            <FAQBlock />
          </div>
        </div>
      </section>

      <section className="bg-deep-navy px-5 py-16 text-soft-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-pastel-blue">Application CTA</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight">
            Apply with a launch that needs mapped access, delivery and support.
          </h2>
              <Link
                href="/apply"
                className="mt-6 inline-flex max-w-full rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
              >
                Open static application preview
              </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
