import Link from "next/link";
import type { FolioFrameModule } from "@/content/folioframeModules";

type ModuleCardProps = {
  module: FolioFrameModule;
  detailed?: boolean;
};

export function ModuleCard({ module, detailed = false }: ModuleCardProps) {
  const categoryLabel = module.category === "add-on" ? "Add-on" : module.category;

  return (
    <Link
      href={module.publicPath}
      className="group rounded-lg border border-mist-blue bg-soft-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-pastel-blue"
    >
      <p className="text-sm font-semibold capitalize text-slate-blue-grey">
        {categoryLabel}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-deep-navy">{module.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
        {module.shortDescription}
      </p>
      {detailed ? (
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-deep-navy">
              Problem solved
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              {module.problemSolved}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-deep-navy">
              Safe claim
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
              {module.safeClaims[0]}
            </p>
          </div>
        </div>
      ) : null}
      <div className="mt-5 text-sm font-semibold text-deep-navy group-hover:text-slate-blue-grey">
        View module
      </div>
    </Link>
  );
}
