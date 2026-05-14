import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function AccessibilityPage() {
  return (
    <PublicInfoPage
      eyebrow="Accessibility"
      title="Accessibility approach"
      body="The scaffold uses semantic sections, readable contrast, focus states and straightforward navigation. A fuller accessibility review is required before launch."
      sections={[
        {
          title: "Current MVP",
          body: "Pages use accessible text, links, labels, focus states and responsive layout patterns for review.",
        },
        {
          title: "Production review",
          body: "A production app should include fuller accessibility testing across target devices, browsers and assistive technology before launch.",
        },
        {
          title: "Feedback route",
          body: "A real support route can be added once production contact handling is approved.",
        },
      ]}
    />
  );
}
