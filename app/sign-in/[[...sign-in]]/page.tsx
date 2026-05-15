import { SignIn } from "@clerk/nextjs";
import { AuthRoutePanel, AuthSetupInstructions } from "@/components/AuthRoutePanel";
import { getAuthMode } from "@/lib/auth/config";

export default function SignInPage() {
  const authStatus = getAuthMode();

  return (
    <AuthRoutePanel
      title="Sign in to FolioFrame"
      body="Use this route for Clerk-backed workspace access once local development keys are configured."
      authStatus={authStatus}
    >
      {authStatus.configured ? (
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      ) : (
        <AuthSetupInstructions routeLabel="/sign-in" />
      )}
    </AuthRoutePanel>
  );
}
