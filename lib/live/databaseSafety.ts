export type RedactedDatabaseUrlInfo = {
  present: boolean;
  provider?: string;
  host?: string;
  port?: string;
  database?: string;
  safeSummary: string;
  isLocalHost: boolean;
  hasNonProductionMarker: boolean;
  hasProductionMarker: boolean;
  hasPlaceholderValue: boolean;
  parseError?: string;
};

const placeholderMarkers = [
  "placeholder",
  "example",
  "user:password",
  "johndoe",
  "randompassword",
  "mydb",
];

const localHosts = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "0.0.0.0",
  "host.docker.internal",
  "db",
  "database",
  "postgres",
  "postgresql",
]);

const nonProductionMarkers = [
  "dev",
  "development",
  "local",
  "test",
  "testing",
  "staging",
  "stage",
  "preview",
  "sandbox",
];

const productionMarkers = ["prod", "production", "live"];

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function includesMarker(value: string, markers: readonly string[]) {
  const tokens = tokenize(value);

  return markers.some((marker) => tokens.includes(marker));
}

function redactHost(hostname: string, isLocalHost: boolean) {
  return isLocalHost ? hostname : "redacted-host";
}

function redactDatabaseName(database: string, isSafeToShow: boolean) {
  if (!database) {
    return undefined;
  }

  return isSafeToShow ? database : "redacted-database";
}

export function getRedactedDatabaseUrlInfo(
  databaseUrl = process.env.DATABASE_URL,
): RedactedDatabaseUrlInfo {
  if (!databaseUrl) {
    return {
      present: false,
      safeSummary: "DATABASE_URL not present",
      isLocalHost: false,
      hasNonProductionMarker: false,
      hasProductionMarker: false,
      hasPlaceholderValue: false,
    };
  }

  const hasPlaceholderValue = placeholderMarkers.some((marker) =>
    databaseUrl.toLowerCase().includes(marker.toLowerCase()),
  );

  try {
    const parsed = new URL(databaseUrl);
    const provider = parsed.protocol.replace(":", "");
    const hostname = parsed.hostname.toLowerCase();
    const rawDatabase = decodeURIComponent(parsed.pathname.replace(/^\//, ""));
    const database = rawDatabase.split("?")[0];
    const searchableParts = [provider, hostname, database, parsed.username].join(" ");
    const isLocalHost =
      localHosts.has(hostname) ||
      hostname.endsWith(".local") ||
      hostname.startsWith("127.");
    const hasNonProductionMarker = includesMarker(
      searchableParts,
      nonProductionMarkers,
    );
    const hasProductionMarker = includesMarker(searchableParts, productionMarkers);
    const safeDatabase = redactDatabaseName(
      database,
      isLocalHost || hasNonProductionMarker,
    );

    return {
      present: true,
      provider,
      host: redactHost(hostname, isLocalHost),
      port: parsed.port || undefined,
      database: safeDatabase,
      safeSummary: [
        `provider=${provider}`,
        `host=${redactHost(hostname, isLocalHost)}`,
        parsed.port ? `port=${parsed.port}` : "",
        safeDatabase ? `database=${safeDatabase}` : "",
      ]
        .filter(Boolean)
        .join(" "),
      isLocalHost,
      hasNonProductionMarker,
      hasProductionMarker,
      hasPlaceholderValue,
    };
  } catch (error) {
    return {
      present: true,
      safeSummary: "DATABASE_URL present but could not be parsed",
      isLocalHost: false,
      hasNonProductionMarker: false,
      hasProductionMarker: false,
      hasPlaceholderValue,
      parseError: error instanceof Error ? error.message : "Unknown parse error",
    };
  }
}

export function isProbablyProductionDatabaseUrl(
  databaseUrl = process.env.DATABASE_URL,
) {
  const info = getRedactedDatabaseUrlInfo(databaseUrl);

  if (!info.present) {
    return false;
  }

  if (info.parseError || info.hasPlaceholderValue) {
    return true;
  }

  if (info.provider !== "postgresql" && info.provider !== "postgres") {
    return true;
  }

  if (info.hasProductionMarker) {
    return true;
  }

  if (info.isLocalHost) {
    return false;
  }

  if (info.hasNonProductionMarker) {
    return false;
  }

  return true;
}

export function assertSafeToMigrate(databaseUrl = process.env.DATABASE_URL) {
  const info = getRedactedDatabaseUrlInfo(databaseUrl);

  if (!info.present) {
    throw new Error("DATABASE_URL is missing; migration verification is skipped.");
  }

  if (isProbablyProductionDatabaseUrl(databaseUrl)) {
    throw new Error(
      `Refusing to run migration or seed against a production-like database URL (${info.safeSummary}).`,
    );
  }

  return info;
}
