import { MarketingPage } from "@/components/MarketingPage";
import { ModuleCard } from "@/components/ModuleCard";
import { SectionHeader } from "@/components/SectionHeader";
import {
  advancedModules,
  coreModules,
  standardModules,
} from "@/content/folioframeModules";

export default function ModulesPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Modules"
            title="The FolioFrame module library"
            body="Each module includes a problem definition, deliverables, portal widgets, QA checks, scope boundaries and public page copy."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Core" title="Core modules" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreModules.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist-blue px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Advanced" title="Advanced modules and standard" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...advancedModules, ...standardModules].map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
