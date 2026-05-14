const processSteps = [
  {
    title: "Map",
    body: "Document checkout, access, delivery, onboarding, support and follow-up paths.",
  },
  {
    title: "Test",
    body: "Run sample buyer scenarios and review access lifecycle rules before launch.",
  },
  {
    title: "Document",
    body: "Create handover packets, proof notes, support snippets and reporting language.",
  },
  {
    title: "Approve",
    body: "Capture owner-approved decisions, boundaries and monitoring recommendations.",
  },
];

export function ProcessTimeline() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {processSteps.map((step, index) => (
        <article
          key={step.title}
          className="rounded-lg border border-mist-blue bg-soft-white p-5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-mist-blue text-sm font-semibold text-deep-navy">
            {index + 1}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-deep-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-blue-grey">{step.body}</p>
        </article>
      ))}
    </div>
  );
}
