import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function TermsPage() {
  return (
    <PublicInfoPage
      eyebrow="Terms"
      title="Terms placeholder"
      body="This page is a static content placeholder and is not a production agreement."
      sections={[
        {
          title: "Scope",
          body: "FolioFrame is presented as an operational system for mapping, testing and documenting checkout-to-customer delivery.",
        },
        {
          title: "Static MVP",
          body: "No user account, billing, platform automation or customer record is created by this scaffold.",
        },
        {
          title: "Production owner review",
          body: "Production terms should be reviewed and approved before any real service workflow is used.",
        },
      ]}
    />
  );
}
