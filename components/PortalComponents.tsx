import Link from "next/link";
import type { ReactNode } from "react";
import type { FolioFrameModule } from "@/content/folioframeModules";
import { staticDemoNotice } from "@/content/folioframeDemoData";

type StatusTone = "neutral" | "ready" | "review" | "warning" | "blocked";

const statusToneClasses: Record<StatusTone, string> = {
  neutral: "border-mist-blue bg-mist-blue text-deep-navy",
  ready: "border-pastel-blue bg-mist-blue text-deep-navy",
  review: "border-champagne-line bg-warm-ivory text-deep-navy",
  warning: "border-champagne-line bg-soft-white text-deep-navy",
  blocked: "border-deep-navy bg-deep-navy text-soft-white",
};

export function PortalStatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-md border px-3 py-1 text-xs font-semibold leading-5 ${statusToneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function StaticDemoNotice({
  compact = false,
  children,
}: {
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`min-w-0 max-w-full overflow-hidden rounded-lg border border-pastel-blue bg-mist-blue text-deep-navy ${
        compact ? "p-3 text-xs leading-5" : "p-4 text-sm leading-6"
      }`}
    >
      <p className="font-semibold">Static/demo portal only</p>
      <p className={compact ? "mt-1 text-slate-blue-grey" : "mt-2 text-slate-blue-grey"}>
        {children ?? staticDemoNotice}
      </p>
    </div>
  );
}

export function PortalMetricCard({
  label,
  value,
  trend,
  note,
}: {
  label: string;
  value: string;
  trend?: string;
  note?: string;
}) {
  return (
    <article className="min-w-0 rounded-lg border border-mist-blue bg-soft-white p-5">
      <p className="text-sm font-semibold text-slate-blue-grey">{label}</p>
      <p className="mt-2 break-words text-2xl font-semibold text-deep-navy sm:text-3xl">
        {value}
      </p>
      {trend ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-deep-navy">
          {trend}
        </p>
      ) : null}
      {note ? (
        <p className="mt-3 text-sm leading-6 text-slate-blue-grey">{note}</p>
      ) : null}
    </article>
  );
}

export function PortalSection({
  eyebrow,
  title,
  body,
  children,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  tone?: "default" | "warm" | "plain";
}) {
  const toneClass =
    tone === "warm"
      ? "border-champagne-line bg-warm-ivory"
      : tone === "plain"
        ? "border-transparent bg-transparent p-0"
        : "border-mist-blue bg-soft-white";

  return (
    <section className={`min-w-0 rounded-lg border p-5 sm:p-6 ${toneClass}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-slate-blue-grey">{eyebrow}</p>
      ) : null}
      <div className="max-w-3xl">
        <h2 className="mt-2 break-words text-xl font-semibold leading-tight text-deep-navy sm:text-3xl">
          {title}
        </h2>
        {body ? (
          <p className="mt-3 break-words text-sm leading-6 text-slate-blue-grey sm:text-base sm:leading-7">
            {body}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}

export type PortalTableColumn<T> = {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export function PortalTable<T>({
  columns,
  rows,
  rowKey,
}: {
  columns: readonly PortalTableColumn<T>[];
  rows: readonly T[];
  rowKey: (row: T, index: number) => string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-mist-blue bg-soft-white">
      <table className="min-w-[760px] w-full border-collapse text-left text-sm">
        <thead className="bg-mist-blue text-xs font-semibold uppercase tracking-wide text-deep-navy">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className={`px-4 py-3 ${column.className ?? ""}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-mist-blue text-slate-blue-grey">
          {rows.map((row, index) => (
            <tr key={rowKey(row, index)} className="align-top">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`px-4 py-4 leading-6 ${column.className ?? ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function OwnerActionList({
  actions,
}: {
  actions: readonly {
    action: string;
    module: string;
    priority: string;
    dueState: string;
  }[];
}) {
  return (
    <div className="grid gap-3">
      {actions.map((item) => (
        <article
          key={`${item.module}-${item.action}`}
          className="rounded-lg border border-mist-blue bg-soft-white p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="max-w-xl text-sm font-semibold leading-6 text-deep-navy">
              {item.action}
            </h3>
            <PortalStatusBadge tone={item.priority === "High" ? "warning" : "review"}>
              {item.priority}
            </PortalStatusBadge>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-blue-grey">
            {item.module} · {item.dueState}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ModuleWorkspaceLayout({
  moduleInfo,
  boundary,
  children,
}: {
  moduleInfo: FolioFrameModule;
  boundary: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <PortalSection
          eyebrow="Static module workspace"
          title={moduleInfo.portalHeadline}
          body={`${moduleInfo.portalBody} This owner-review workspace uses sample content only.`}
        >
          <div className="flex flex-wrap gap-3">
            <PortalStatusBadge tone="ready">{moduleInfo.category}</PortalStatusBadge>
            <PortalStatusBadge tone="review">Owner review</PortalStatusBadge>
            <Link
              href={moduleInfo.publicPath}
              className="inline-flex rounded-md border border-deep-navy px-4 py-2 text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-soft-white"
            >
              Public module page
            </Link>
          </div>
        </PortalSection>
        <PortalSection
          eyebrow="Boundary"
          title="Static scope"
          body={boundary}
          tone="warm"
        />
      </div>
      {children}
    </div>
  );
}
