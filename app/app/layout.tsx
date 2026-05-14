import { PortalShell } from "@/components/PortalShell";

export default function InternalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
