import { MarketingPage } from "@/components/MarketingPage";
import { ModuleCard } from "@/components/ModuleCard";
import { SectionHeader } from "@/components/SectionHeader";
import {
  addOnModules,
  advancedModules,
  agencyModules,
  coreModules,
} from "@/content/folioframeModules";

export default function ModulesPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Modules"
            title="The FolioFrame module library"
            body="Each module documents a specific part of the checkout-to-customer system: payment handoff, entitlement, access, delivery, onboarding, support recovery, migration, reporting and delivery proof."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Core" title="Core modules" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreModules.map((module) => (
              <ModuleCard key={module.slug} module={module} detailed />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Advanced"
            title="Advanced modules"
            body="For complex tiers, buyer messages, portal structure, operational reporting and verified delivery readiness."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advancedModules.map((module) => (
              <ModuleCard key={module.slug} module={module} detailed />
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Add-ons"
            title="Launch and migration add-ons"
            body="For launch rehearsal, issue triage, migration inventory and access continuity planning."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {addOnModules.map((module) => (
              <ModuleCard key={module.slug} module={module} detailed />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-warm-ivory px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Agency"
            title="Agency module"
            body="For studios, consultants and agencies packaging repeatable buyer-access reliability delivery."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {agencyModules.map((module) => (
              <ModuleCard key={module.slug} module={module} detailed />
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
