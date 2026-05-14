import { MarketingPage } from "./MarketingPage";
import { SectionHeader } from "./SectionHeader";

type InfoSection = {
  title: string;
  body: string;
};

type PublicInfoPageProps = {
  eyebrow: string;
  title: string;
  body: string;
  sections: readonly InfoSection[];
};

export function PublicInfoPage({
  eyebrow,
  title,
  body,
  sections,
}: PublicInfoPageProps) {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-lg border border-mist-blue bg-soft-white p-6"
            >
              <h2 className="text-xl font-semibold text-deep-navy">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-blue-grey">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MarketingPage>
  );
}
