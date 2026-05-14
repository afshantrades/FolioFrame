import { ImplementationDocDetailPage } from "@/components/ImplementationDocDetailPage";
import { folioframeImplementationDocs } from "@/content/folioframeImplementationDocs";

type ImplementationDocRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return folioframeImplementationDocs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function ImplementationDocRoute({
  params,
}: ImplementationDocRouteProps) {
  const { slug } = await params;

  return <ImplementationDocDetailPage slug={slug} />;
}
