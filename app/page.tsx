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

const outcomeStrip = [
  "Payment",
  "Entitlement",
  "Access",
  "Delivery",
  "Onboarding",
  "Support",
  "Follow-up",
  "Proof",
  "Reporting",
];

const problemPoints = [
  "Payment confirmation and product access are often owned by different tools.",
  "Entitlement rules live in team memory instead of a reviewable matrix.",
  "Delivery messages and fallback routes are hard to inspect before launch.",
  "Support teams need a practical recovery route when access questions arrive.",
];

const previewOfferNames = [
  "FolioFix Audit",
  "Signature Launch Premium",
  "AccessGuard + ProofMetrics retainer",
];

export default function HomePage() {
  const advancedAndSpecialist = [
    ...advancedModules,
    ...addOnModules,
    ...agencyModules,
  ];
  const previewOffers = folioframeOffers.filter((offer) =>
    previewOfferNames.includes(offer.name),
  );

  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-blue-grey">
              Premium buyer-access reliability system
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight text-deep-navy sm:text-6xl">
              Checkout-to-customer systems that are mapped, tested and documented.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-blue-grey">
              FolioFrame builds the operational layer behind digital product
              delivery: payment, access, onboarding, support, follow-up, migration,
              reporting and verified delivery proof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex max-w-full rounded-md bg-deep-navy px-5 py-3 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
              >
                Apply for Signature Launch Premium
              </Link>
              <Link
                href="/foliofix"
                className="inline-flex max-w-full rounded-md border border-champagne-line bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
              >
                Book FolioFix Audit
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-champagne-line bg-soft-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Owner-review system map
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Entitlement and access lifecycle rules",
                "DeliveryProof evidence packet",
                "AccessDesk recovery route",
                "ProofMetrics operational reporting",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-mist-blue bg-soft-white p-4 text-sm font-medium text-deep-navy"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-blue-grey">
              Static preview only. No real auth, billing, platform connections,
              customer data or live monitoring are active.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-mist-blue bg-soft-white px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-3 lg:grid-cols-9">
          {outcomeStrip.map((item, index) => (
            <div
              key={item}
              className="rounded-md bg-mist-blue px-3 py-3 text-sm font-semibold text-deep-navy"
            >
              <span className="mr-2 text-xs text-slate-blue-grey">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="The problem"
            title="Digital product delivery gets risky when the buyer journey is invisible."
            body="A buyer can pay in one tool, receive access in another, depend on email for instructions and need support when one step is unclear. FolioFrame makes the operational path reviewable before pressure arrives."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {problemPoints.map((item) => (
              <article
                key={item}
                className="rounded-lg border border-mist-blue bg-soft-white p-5"
              >
                <p className="text-sm leading-6 text-slate-blue-grey">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep-navy px-5 py-16 text-soft-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold text-pastel-blue">
              Signature Launch Premium
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              A higher-tier launch system for complex products, tiers and handover.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-mist-blue">
              Signature Launch Premium combines FolioFix, DeliveryProof,
              AccessGuard, AccessDesk, RevenueFrame, AccessSafe,
              EntitlementFrame, InboxGuard, AccessHub, ProofMetrics and the
              FolioFrame Verified Delivery Standard.
            </p>
          </div>
          <div className="rounded-lg border border-pastel-blue bg-soft-white p-6 text-deep-navy">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Premium scope
            </p>
            <p className="mt-3 text-3xl font-semibold">£9,997</p>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              For sellers who need entitlement rules, delivery safeguards, recovery
              paths, operational reporting and handover documentation reviewed
              before production implementation.
            </p>
            <Link
              href="/signature-launch-system"
              className="mt-5 inline-flex max-w-full rounded-md bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
            >
              Review Signature Launch
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core modules"
            title="The foundation for buyer-access reliability."
            body="Core modules cover audit, delivery proof, access lifecycle rules, support recovery, reporting, access ownership and product tracks."
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
            title="Entitlements, messages, launch readiness, migration and proof."
            body="Advanced modules deepen the system for bundles, tiers, buyer communication, static portal review, launch rehearsals, migration planning and operational reporting."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advancedAndSpecialist.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Process"
            title="A calm build sequence for operational clarity."
            body="FolioFrame focuses on practical system definition before production implementation decisions are made."
          />
          <div className="mt-8">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pricing preview"
            title="Choose the level of operational structure your launch needs."
            body="Pricing is static offer copy for review. No payment processing is active in this scaffold."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {previewOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Safe scope boundary"
            title="Operational documentation, not impossible promises."
            body="FolioFrame uses language like mapped, tested, documented, owner-approved, delivery safeguards, practical recovery route, access lifecycle rules and operational reporting."
          />
          <div className="rounded-lg border border-pastel-blue bg-soft-white p-6">
            <h3 className="text-xl font-semibold text-deep-navy">
              Out of scope for this scaffold
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-blue-grey">
              <li>- No real authentication</li>
              <li>- No payment, email or automation platform connections</li>
              <li>- No customer data</li>
              <li>- No fake live monitoring</li>
              <li>- No final logo or generated brand mark</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers about scope and static/demo status."
          />
          <div className="mt-8">
            <FAQBlock />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto rounded-lg border border-champagne-line bg-deep-navy p-8 text-soft-white">
          <p className="text-sm font-semibold text-pastel-blue">Apply CTA</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight">
            Ready to review a checkout-to-customer system before it carries buyers?
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-mist-blue">
            Use the static application preview to describe your products, tool
            stack, tier paths, launch timing, support volume and migration needs.
          </p>
          <Link
            href="/apply"
            className="mt-6 inline-flex max-w-full rounded-md bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
          >
            Apply for Signature Launch Premium
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
