import { PortalDashboard } from "@/components/PortalDashboard";
import { getPortalWorkspaceSnapshot } from "@/lib/live/portalDataAdapter";

export default async function InternalAppHomePage() {
  const snapshot = await getPortalWorkspaceSnapshot();

  return <PortalDashboard variant="overview" snapshot={snapshot} />;
}
