import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function RefundPolicyPage() {
  return (
    <PublicInfoPage
      eyebrow="Refund policy"
      title="Refund policy placeholder"
      body="This static page outlines where refund policy copy would live. It does not process orders or refunds."
      sections={[
        {
          title: "No checkout in this scaffold",
          body: "The MVP does not collect payment or trigger refund workflows.",
        },
        {
          title: "Access lifecycle notes",
          body: "Production refund handling should be connected to documented access lifecycle rules and owner-approved support paths.",
        },
        {
          title: "Review before production",
          body: "Refund wording should be reviewed before any live offer is sold.",
        },
      ]}
    />
  );
}
