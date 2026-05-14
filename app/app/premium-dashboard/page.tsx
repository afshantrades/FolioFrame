import { PortalDashboard } from "@/components/PortalDashboard";
import { getPortalWorkspaceSnapshot } from "@/lib/live/portalDataAdapter";

export default async function PremiumDashboardPage() {
  const snapshot = await getPortalWorkspaceSnapshot();

  return <PortalDashboard variant="premium" snapshot={snapshot} />;
}
