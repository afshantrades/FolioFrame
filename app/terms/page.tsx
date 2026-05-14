import { PublicInfoPage } from "@/components/PublicInfoPage";

export default function TermsPage() {
  return (
    <PublicInfoPage
      eyebrow="Terms"
      title="Terms starter page"
      body="This page is a static content placeholder and is not a production agreement. Formal legal review is required before launch."
      sections={[
        {
          title: "Scope",
          body: "FolioFrame is presented as an operational system for mapping, testing and documenting checkout-to-customer delivery paths, access lifecycle rules, recovery routes and reporting needs.",
        },
        {
          title: "Static MVP",
          body: "No user account, billing, platform automation or customer record is created by this scaffold.",
        },
        {
          title: "Production owner review",
          body: "Production terms should be reviewed and approved before any real service workflow, payment flow, form handling or client delivery process is used.",
        },
      ]}
    />
  );
}
