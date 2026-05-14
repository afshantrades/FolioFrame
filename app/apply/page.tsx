import Link from "next/link";
import { MarketingPage } from "@/components/MarketingPage";
import { SectionHeader } from "@/components/SectionHeader";

type ApplicationField = {
  label: string;
  helper: string;
  type: "text" | "email" | "select";
  options?: readonly string[];
};

const fields: readonly ApplicationField[] = [
  {
    label: "Product type",
    helper: "Course, template library, membership, cohort, bundle or other digital product.",
    type: "text",
  },
  {
    label: "Current tools",
    helper: "Checkout, product platform, email tool, support desk and automation tools.",
    type: "text",
  },
  {
    label: "Number of products or tier paths",
    helper: "Include bundles, cohorts, upgrade paths and add-ons if relevant.",
    type: "text",
  },
  {
    label: "Launch date",
    helper: "Use an approximate date if the schedule is still moving.",
    type: "text",
  },
  {
    label: "Is migration needed?",
    helper: "Tell us whether a platform move or product library rebuild is part of the scope.",
    type: "select",
    options: ["Not sure yet", "No", "Yes"],
  },
  {
    label: "Is LaunchRoom needed?",
    helper: "Useful when launch-week rehearsal, issue triage or readiness review is needed.",
    type: "select",
    options: ["Not sure yet", "No", "Yes"],
  },
  {
    label: "Current support issue volume",
    helper: "Estimate access questions, delivery issues or support pressure.",
    type: "select",
    options: ["Low", "Medium", "High", "Unknown"],
  },
  {
    label: "Budget range",
    helper: "Select the closest fit for planning.",
    type: "select",
    options: [
      "£497-£997",
      "£1,997-£2,997",
      "£7,500",
      "£9,997+",
      "£12,500+",
    ],
  },
  {
    label: "Name",
    helper: "Static preview field. Nothing is submitted.",
    type: "text",
  },
  {
    label: "Email",
    helper: "Static preview field. Nothing is submitted.",
    type: "email",
  },
];

export default function ApplyPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Apply"
            title="Static application preview"
            body="Use this page to review the intended application flow for FolioFrame. Form handling is not implemented yet, so nothing is submitted or saved."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <form className="mx-auto grid max-w-5xl gap-5">
          <div className="rounded-lg border border-champagne-line bg-warm-ivory p-6">
            <h2 className="text-xl font-semibold text-deep-navy">
              Static/demo only
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
              This application is a content preview until form handling is
              implemented. Do not enter production credentials, private customer
              records or sensitive platform details.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.label}
                className="rounded-lg border border-mist-blue bg-soft-white p-5"
              >
                <span className="text-sm font-semibold text-deep-navy">
                  {field.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-blue-grey">
                  {field.helper}
                </span>
                {field.type === "select" ? (
                  <select className="mt-4 w-full rounded-md border border-mist-blue bg-soft-white px-3 py-3 text-sm text-deep-navy">
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="mt-4 w-full rounded-md border border-mist-blue bg-soft-white px-3 py-3 text-sm text-deep-navy"
                    placeholder="Static preview field"
                  />
                )}
              </label>
            ))}
          </div>
          <label className="rounded-lg border border-mist-blue bg-soft-white p-5">
            <span className="text-sm font-semibold text-deep-navy">Notes</span>
            <span className="mt-2 block text-sm leading-6 text-slate-blue-grey">
              Share access issues, delivery questions, launch timing, migration
              needs or owner approval constraints.
            </span>
            <textarea
              className="mt-4 min-h-36 w-full rounded-md border border-mist-blue bg-soft-white px-3 py-3 text-sm text-deep-navy"
              placeholder="Static preview field"
            />
          </label>
          <div className="rounded-lg border border-champagne-line bg-deep-navy p-6 text-soft-white">
            <p className="text-sm leading-6 text-mist-blue">
              Submission is intentionally disabled in this scaffold. Review the
              questions, then use pricing or module pages to refine the public scope.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-md bg-soft-white px-4 py-2 text-sm font-semibold text-deep-navy"
              >
                Static preview only
              </button>
              <Link
                href="/pricing"
                className="rounded-md border border-pastel-blue px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
              >
                Review pricing
              </Link>
            </div>
          </div>
        </form>
      </section>
    </MarketingPage>
  );
}
