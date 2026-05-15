import { SignUp } from "@clerk/nextjs";
import { AuthRoutePanel, AuthSetupInstructions } from "@/components/AuthRoutePanel";
import { getAuthMode } from "@/lib/auth/config";

export default function SignUpPage() {
  const authStatus = getAuthMode();

  return (
    <AuthRoutePanel
      title="Create a FolioFrame access account"
      body="Use this route for Clerk-backed development sign-up once the owner has configured a Clerk development application."
      authStatus={authStatus}
    >
      {authStatus.configured ? (
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      ) : (
        <AuthSetupInstructions routeLabel="/sign-up" />
      )}
    </AuthRoutePanel>
  );
}
