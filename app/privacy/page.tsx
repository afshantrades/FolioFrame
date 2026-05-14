import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function PrivacyPage() {
  return (
    <PublicInfoPage
      eyebrow="Privacy"
      title="Privacy starter notice"
      body="This static MVP does not collect submissions, customer data, payment details or credentials. Formal legal review is required before launch."
      sections={[
        {
          title: "Static content",
          body: "All visible portal records are sample content. They exist to demonstrate structure only.",
        },
        {
          title: "No platform connections",
          body: "The scaffold does not connect to payment, email, automation, analytics or support tools.",
        },
        {
          title: "Production review needed",
          body: "Before production use, the owner should review privacy wording, data handling, retention, platform configuration and consent flows with qualified support.",
        },
        {
          title: "No sensitive details",
          body: "The static application preview should not be used for production credentials, private customer records or sensitive platform details.",
        },
      ]}
    />
  );
}
