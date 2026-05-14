import Link from "next/link";
import { MarketingPage } from "@/components/MarketingPage";
import { SectionHeader } from "@/components/SectionHeader";

const applicationQuestions = [
  "What product or launch needs review?",
  "Which checkout, access and delivery tools are involved?",
  "Where do buyers most often need support?",
  "Which owner needs to approve access rules and handover notes?",
];

export default function ApplyPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Apply"
            title="Static application preview"
            body="This page shows the intended application shape without collecting submissions, customer data or credentials."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {applicationQuestions.map((question) => (
            <div
              key={question}
              className="rounded-lg border border-mist-blue bg-soft-white p-5"
            >
              <p className="text-sm font-semibold text-deep-navy">{question}</p>
              <div className="mt-4 min-h-24 rounded-md border border-dashed border-pastel-blue bg-mist-blue p-4 text-sm text-slate-blue-grey">
                Static placeholder. No answer is saved.
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-champagne-line bg-warm-ivory p-6">
            <p className="text-sm leading-6 text-slate-blue-grey">
              Submission is intentionally disabled in this scaffold. Use this page to
              review content and structure only.
            </p>
            <Link
              href="/pricing"
              className="mt-5 inline-flex rounded-md bg-deep-navy px-4 py-2 text-sm font-semibold text-soft-white hover:bg-slate-blue-grey"
            >
              Review pricing
            </Link>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
