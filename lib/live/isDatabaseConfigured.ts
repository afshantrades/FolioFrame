const databasePlaceholderMarkers = [
  "placeholder",
  "example",
  "user:password",
  "johndoe",
  "randompassword",
  "mydb",
];

export function isDatabaseConfigured() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return false;
  }

  const normalized = databaseUrl.toLowerCase();

  if (
    databasePlaceholderMarkers.some((marker) =>
      normalized.includes(marker.toLowerCase()),
    )
  ) {
    return false;
  }

  return normalized.startsWith("postgresql://") || normalized.startsWith("postgres://");
}

export function getDatabaseFoundationStatus() {
  return {
    databaseConfigured: isDatabaseConfigured(),
    databaseUrlPresent: Boolean(process.env.DATABASE_URL),
  };
}
