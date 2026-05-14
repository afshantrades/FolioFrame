export const defaultFaqs = [
  {
    question: "Does FolioFrame process payments?",
    answer:
      "No. This scaffold uses static/demo content only and does not connect to payment systems.",
  },
  {
    question: "Does FolioFrame include real customer data?",
    answer:
      "No. Demo views use sample content so the structure can be reviewed without production data.",
  },
  {
    question: "Does FolioFrame promise a specific platform result?",
    answer:
      "No. The language stays focused on mapped, tested, documented and owner-approved delivery safeguards.",
  },
  {
    question: "Is the portal a real authenticated app?",
    answer:
      "No. The internal portal routes are static previews with clear demo-only labels.",
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
