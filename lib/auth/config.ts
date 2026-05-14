const placeholderMarkers = ["placeholder", "your_", "example"];

function hasUsableValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();
  return !placeholderMarkers.some((marker) => normalized.includes(marker));
}

export function isClerkConfigured() {
  return (
    hasUsableValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    hasUsableValue(process.env.CLERK_SECRET_KEY)
  );
}

export function getAuthFoundationStatus() {
  return {
    clerkConfigured: isClerkConfigured(),
    publishableKeyPresent: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    secretKeyPresent: Boolean(process.env.CLERK_SECRET_KEY),
  };
}
