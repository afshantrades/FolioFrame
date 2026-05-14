import { FAQBlock } from "@/components/FAQBlock";
import { MarketingPage } from "@/components/MarketingPage";
import { SectionHeader } from "@/components/SectionHeader";

export default function FAQPage() {
  return (
    <MarketingPage>
      <section className="bg-warm-ivory px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="FAQ"
            title="FolioFrame questions"
            body="Clear answers about scope, static demo status and operational wording."
          />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FAQBlock />
        </div>
      </section>
    </MarketingPage>
  );
}
