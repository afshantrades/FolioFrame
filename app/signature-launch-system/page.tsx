import Link from "next/link";
import { FAQBlock } from "@/components/FAQBlock";
import { MarketingPage } from "@/components/MarketingPage";
import { ModuleCard } from "@/components/ModuleCard";
import { OfferCard } from "@/components/OfferCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectionHeader } from "@/components/SectionHeader";
import {
  addOnModules,
  advancedModules,
  agencyModules,
  coreModules,
} from "@/content/folioframeModules";
import { folioframeOffers } from "@/content/folioframeOffers";

const included = [
  "Checkout-to-customer system map",
  "Core FolioFrame modules",
  "Advanced access and reporting modules",
  "Delivery proof packet",
  "Launch readiness checklist",
  "AccessHub static portal model",
  "Owner-approved handover documentation",
];

const deliverables = [
  "Buyer journey map",
  "Product access matrix",
  "Support recovery route",
  "LaunchRoom readiness plan",
  "ProofMetrics reporting structure",
  "Verified delivery checklist",
];

export default function SignatureLaunchSystemPage() {
  const pricing = folioframeOffers.filter((offer) =>
    [
      "Signature Launch System",
      "Signature Launch Premium",
      "Signature Launch + LaunchRoom",
    ].includes(offer.name),
  );

  return (
    <MarketingPage>
      <section className="bg-deep-navy px-5 py-20 text-soft-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-pastel-blue">
            Signature Launch System
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold sm:text-6xl">
            A premium delivery system for digital product launches.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-mist-blue">
            FolioFrame maps, tests and documents the path from checkout to customer
            access so launch owners can review delivery, onboarding, support,
            follow-up, reporting and handover before production use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
            >
              Apply for launch review
            </Link>
            <Link
              href="/app/premium-dashboard"
              className="rounded-md border border-pastel-blue px-5 py-3 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
            >
              View static dashboard
            </Link>
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
              <li>- Sellers launching premium digital products</li>
              <li>- Owners with multiple access rules or product tiers</li>
              <li>- Teams that need support recovery routes before launch</li>
              <li>- Operators who want documented delivery safeguards</li>
            </ul>
          </article>
          <article className="rounded-lg border border-mist-blue bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              Who it is not for
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
              <li>- Teams looking for real payment processing inside this MVP</li>
              <li>- Sellers asking for impossible platform guarantees</li>
              <li>- Projects without owner approval for system decisions</li>
              <li>- Teams that need legal, tax or security certification advice</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What is included"
            title="A complete operating frame for launch delivery."
            body="The system is designed around practical review artifacts: maps, checklists, documentation, support routes and owner-approved decisions."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {included.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-champagne-line bg-soft-white p-5 text-sm font-medium text-deep-navy"
              >
                {item}
              </div>
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

      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Advanced modules"
            title="Additional structure for complex launches."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...advancedModules, ...addOnModules, ...agencyModules].map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Deliverables"
            title="The handover is built from reviewable artifacts."
            body="Each deliverable is designed to help the owner understand the system and approve the operational boundaries."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
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

      <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Timeline"
            title="A measured sequence from map to owner approval."
          />
          <div className="mt-8">
            <ProcessTimeline />
          </div>
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
              <OfferCard key={offer.name} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-pastel-blue bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              LaunchRoom add-on
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              Adds rehearsal planning, readiness checklists, issue triage and owner
              approval notes for launch week review.
            </p>
          </article>
          <article className="rounded-lg border border-pastel-blue bg-soft-white p-6">
            <h2 className="text-2xl font-semibold text-deep-navy">
              MigrationFrame add-on
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              Adds migration inventory, access continuity planning, buyer
              communication notes and post-move review structure.
            </p>
          </article>
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
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold">
            Apply with a launch that needs mapped access, delivery and support.
          </h2>
          <Link
            href="/apply"
            className="mt-6 inline-flex rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
          >
            Open application preview
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
