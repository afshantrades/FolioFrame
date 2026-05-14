import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function PrivacyPage() {
  return (
    <PublicInfoPage
      eyebrow="Privacy"
      title="Privacy notice placeholder"
      body="This static MVP does not collect submissions, customer data, payment details or credentials."
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
          body: "Before production use, the owner should review privacy wording, data handling and platform configuration with qualified support.",
        },
      ]}
    />
  );
}
