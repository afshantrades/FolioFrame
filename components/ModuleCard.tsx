import Link from "next/link";
import type { FolioFrameModule } from "@/content/folioframeModules";

type ModuleCardProps = {
  module: FolioFrameModule;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      href={module.publicPath}
      className="group rounded-lg border border-mist-blue bg-soft-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-pastel-blue"
    >
      <p className="text-sm font-semibold text-slate-blue-grey">{module.category}</p>
      <h3 className="mt-3 text-xl font-semibold text-deep-navy">{module.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
        {module.shortDescription}
      </p>
      <div className="mt-5 text-sm font-semibold text-deep-navy group-hover:text-slate-blue-grey">
        View module
      </div>
    </Link>
  );
}
