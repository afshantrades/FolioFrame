import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function AccessibilityPage() {
  return (
    <PublicInfoPage
      eyebrow="Accessibility"
      title="Accessibility approach"
      body="The scaffold uses semantic sections, readable contrast, focus states and straightforward navigation."
      sections={[
        {
          title: "Current MVP",
          body: "Pages use accessible text, links and layout patterns for review.",
        },
        {
          title: "Production review",
          body: "A production app should include fuller accessibility testing before launch.",
        },
        {
          title: "Feedback route",
          body: "A real support route can be added once production contact handling is approved.",
        },
      ]}
    />
  );
}
