export const defaultFaqs = [
  {
    question: "Do you guarantee revenue?",
    answer:
      "No. FolioFrame documents the checkout-to-customer operation behind an offer; it does not promise financial outcomes.",
  },
  {
    question: "Do you guarantee email inbox placement?",
    answer:
      "No. InboxGuard maps buyer messages, fallback routes and support resend paths, but inbox placement is controlled by factors outside this static scaffold.",
  },
  {
    question: "Do you replace my course platform?",
    answer:
      "No. FolioFrame sits around your product and delivery tools as an operational mapping, documentation and review layer.",
  },
  {
    question: "Can you migrate my existing setup?",
    answer:
      "MigrationFrame can map products, access continuity, buyer communication and post-move review needs. Production migration work requires an approved implementation scope.",
  },
  {
    question: "Can you support launch week?",
    answer:
      "LaunchRoom can document readiness checks, rehearsal scenarios, issue triage and monitoring recommendations. It is not presented as fake live monitoring.",
  },
  {
    question: "Can buyers recover lost access?",
    answer:
      "FolioFrame documents practical recovery routes through AccessGuard, AccessDesk and DeliveryProof so support teams have a clearer path to review.",
  },
  {
    question: "Can agencies use this?",
    answer:
      "Yes. AgencyFrame packages FolioFrame methods into repeatable static workspace, QA, reporting and handover templates for client systems.",
  },
  {
    question: "Is this a live SaaS platform yet?",
    answer:
      "No. The internal portal routes are static previews with clear demo-only labels.",
  },
  {
    question: "What does static/demo mean?",
    answer:
      "It means the pages use sample content only. There is no real auth, billing, customer data, platform connection, email provider connection or live monitoring.",
  },
];

type FAQBlockProps = {
  faqs?: readonly {
    question: string;
    answer: string;
  }[];
};

export function FAQBlock({ faqs = defaultFaqs }: FAQBlockProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {faqs.map((item) => (
        <article
          key={item.question}
          className="rounded-lg border border-mist-blue bg-soft-white p-6"
        >
          <h3 className="text-lg font-semibold text-deep-navy">{item.question}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-blue-grey">{item.answer}</p>
        </article>
      ))}
    </div>
  );
}
