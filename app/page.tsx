import Link from "next/link";
import { FAQBlock } from "@/components/FAQBlock";
import { MarketingPage } from "@/components/MarketingPage";
import { ModuleCard } from "@/components/ModuleCard";
import { OfferCard } from "@/components/OfferCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectionHeader } from "@/components/SectionHeader";
import {
  advancedModules,
  coreModules,
  standardModules,
} from "@/content/folioframeModules";
import { folioframeOffers } from "@/content/folioframeOffers";

const outcomes = [
  "Payment to access mapped",
  "Delivery safeguards documented",
  "Support recovery route defined",
  "Owner-approved handover",
];

const previewOfferNames = [
  "FolioFrame Pro System",
  "Signature Launch Premium",
  "AccessGuard + ProofMetrics retainer",
];

export default function HomePage() {
  const advancedAndStandard = [...advancedModules, ...standardModules];
  const previewOffers = folioframeOffers.filter((offer) =>
    previewOfferNames.includes(offer.name),
  );

  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-blue-grey">
              Premium buyer-access reliability system
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-deep-navy sm:text-6xl">
              Checkout-to-customer systems that are mapped, tested and documented.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-blue-grey">
              FolioFrame builds the operational layer behind digital product
              delivery: payment, access, onboarding, support, follow-up, migration,
              reporting and verified delivery proof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-md bg-deep-navy px-5 py-3 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
              >
                Apply for review
              </Link>
              <Link
                href="/signature-launch-system"
                className="rounded-md border border-champagne-line bg-soft-white px-5 py-3 text-sm font-semibold text-deep-navy hover:bg-mist-blue"
              >
                View Signature Launch
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-champagne-line bg-soft-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-slate-blue-grey">
              System map preview
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Checkout confirmation",
                "Access lifecycle rules",
                "Delivery proof packet",
                "Support recovery route",
                "Operational reporting",
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
              Static preview only. No real auth, billing, platform connections or
              customer data are active.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-mist-blue bg-soft-white px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome) => (
            <div
              key={outcome}
              className="rounded-md bg-mist-blue px-4 py-3 text-sm font-semibold text-deep-navy"
            >
              {outcome}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="The problem"
            title="Digital product delivery often breaks between checkout and customer success."
            body="Buyers may pay in one system, receive access in another, rely on email for next steps and contact support when a link, rule or handover note is unclear."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Access rules live in team memory.",
              "Delivery messages are hard to inspect.",
              "Support lacks a practical recovery route.",
              "Launch readiness is reviewed too late.",
            ].map((item) => (
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
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A premium launch system for sellers who need more than a checkout page.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-mist-blue">
              Signature Launch Premium combines core modules, advanced modules,
              launch readiness, delivery proof, access lifecycle rules and handover
              documentation into one owner-reviewable system.
            </p>
          </div>
          <div className="rounded-lg border border-pastel-blue bg-soft-white p-6 text-deep-navy">
            <p className="text-sm font-semibold text-slate-blue-grey">
              Premium scope
            </p>
            <p className="mt-3 text-3xl font-semibold">£9,997</p>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              Static MVP preview. Production integrations, credentials and customer
              data are out of scope for this scaffold.
            </p>
            <Link
              href="/signature-launch-system"
              className="mt-5 inline-flex rounded-md bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
            >
              Review the offer
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core modules"
            title="The foundation for buyer-access reliability."
            body="These modules cover the practical checkout-to-customer system: audit, access rules, delivery proof, support, reporting, handover and product tracks."
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
            title="For complex launches, migrations, agencies and operational reporting."
            body="Advanced modules extend the system into entitlement design, message fallback routes, launch readiness, migration planning, metrics and delivery standards."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advancedAndStandard.map((module) => (
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
            body="Pricing is presented as static offer copy for review. No payment processing is active."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {previewOffers.map((offer) => (
              <OfferCard key={offer.name} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers about the static MVP."
            body="The first scaffold is intentionally honest about what exists and what is not connected."
          />
          <div className="mt-8">
            <FAQBlock />
          </div>
        </div>
      </section>

      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Safe scope boundary"
            title="Operational wording, not impossible promises."
            body="FolioFrame uses language like mapped, tested, documented, owner-approved, delivery safeguards, practical recovery route and operational reporting."
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
        <div className="mx-auto rounded-lg border border-champagne-line bg-deep-navy p-8 text-soft-white">
          <p className="text-sm font-semibold text-pastel-blue">Apply CTA</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold">
            Ready to review a checkout-to-customer system before it carries buyers?
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-mist-blue">
            Start with a static application preview. No form submission or customer
            data capture is active in this MVP.
          </p>
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
