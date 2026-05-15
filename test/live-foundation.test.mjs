import assert from "node:assert/strict";
import test from "node:test";

import { getAuthMode } from "../lib/auth/authMode.ts";
import { isAuthConfigured } from "../lib/auth/isAuthConfigured.ts";
import {
  assertSafeToMigrate,
  getRedactedDatabaseUrlInfo,
  isProbablyProductionDatabaseUrl,
} from "../lib/live/databaseSafety.ts";
import { createDatabaseVerificationSummaryFallback } from "../lib/live/databaseVerificationSummary.ts";
import { getDevOwnerEmail } from "../lib/live/devOwnerEmail.ts";
import { isDatabaseConfigured } from "../lib/live/isDatabaseConfigured.ts";
import { getPortalWorkspaceSnapshot } from "../lib/live/portalDataAdapter.ts";
import { getWorkspaceBootstrapEligibility } from "../lib/services/workspaceBootstrapEligibility.ts";

function withEnv(values, callback) {
  const originals = new Map();

  function restore() {
    for (const [key, value] of originals.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }

  for (const key of Object.keys(values)) {
    originals.set(key, process.env[key]);

    if (values[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = values[key];
    }
  }

  try {
    const result = callback();

    if (result && typeof result.then === "function") {
      return result.finally(restore);
    }

    restore();
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}

test("isDatabaseConfigured rejects missing and placeholder values", () => {
  withEnv({ DATABASE_URL: undefined }, () => {
    assert.equal(isDatabaseConfigured(), false);
  });

  withEnv(
    { DATABASE_URL: "postgresql://user:password@localhost:5432/folioframe_dev" },
    () => {
      assert.equal(isDatabaseConfigured(), false);
    },
  );
});

test("isDatabaseConfigured accepts plausible Postgres URLs", () => {
  withEnv(
    { DATABASE_URL: "postgresql://folioframe:local-secret@localhost:5432/folioframe_dev" },
    () => {
      assert.equal(isDatabaseConfigured(), true);
    },
  );
});

test("isAuthConfigured rejects missing and placeholder Clerk keys", () => {
  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined,
      CLERK_SECRET_KEY: undefined,
    },
    () => {
      assert.equal(isAuthConfigured(), false);
    },
  );

  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_placeholder",
      CLERK_SECRET_KEY: "sk_test_placeholder",
    },
    () => {
      assert.equal(isAuthConfigured(), false);
    },
  );
});

test("isAuthConfigured accepts plausible Clerk development keys", () => {
  withEnv(
    {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_localDevelopmentKey",
      CLERK_SECRET_KEY: "sk_test_localDevelopmentKey",
    },
    () => {
      assert.equal(isAuthConfigured(), true);
    },
  );
});

test("getAuthMode reports disabled-dev for placeholder Clerk values", () => {
  const status = getAuthMode({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_placeholder",
    CLERK_SECRET_KEY: "sk_test_placeholder",
  });

  assert.equal(status.configured, false);
  assert.equal(status.clerkConfigured, false);
  assert.equal(status.mode, "disabled-dev");
  assert.equal(status.publicMessage.includes("Auth is not configured"), true);
});

test("getAuthMode reports clerk for configured-looking values", () => {
  const status = getAuthMode({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_localDevelopmentKey",
    CLERK_SECRET_KEY: "sk_test_localDevelopmentKey",
  });

  assert.equal(status.configured, true);
  assert.equal(status.clerkConfigured, true);
  assert.equal(status.mode, "clerk");
});

test("portal data adapter returns static fallback without auth/database config", async () => {
  await withEnv(
    {
      DATABASE_URL: undefined,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined,
      CLERK_SECRET_KEY: undefined,
    },
    async () => {
      const snapshot = await getPortalWorkspaceSnapshot();

      assert.equal(snapshot.source, "static-demo");
      assert.equal(snapshot.isLiveReady, false);
      assert.ok(snapshot.products.length > 0);
      assert.ok(snapshot.productTiers.length > 0);
      assert.ok(snapshot.dashboardMetrics.length > 0);
      assert.ok(snapshot.warnings.some((warning) => warning.includes("fallback")));
    },
  );
});

test("portal data adapter returns auth-required when Clerk is configured without session", async () => {
  await withEnv(
    {
      DATABASE_URL: "postgresql://folioframe:local-secret@localhost:5432/folioframe_dev",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_localDevelopmentKey",
      CLERK_SECRET_KEY: "sk_test_localDevelopmentKey",
    },
    async () => {
      const snapshot = await getPortalWorkspaceSnapshot({
        workspaceContext: {
          status: "unauthenticated",
          publicMessage: "Sign in with Clerk to open a FolioFrame workspace.",
          reason: "No signed-in Clerk session was found.",
          workspace: null,
          membership: null,
        },
      });

      assert.equal(snapshot.source, "auth-required");
      assert.equal(snapshot.signInHref, "/sign-in");
      assert.equal(snapshot.products.length, 0);
      assert.equal(snapshot.workspaceContextStatus, "unauthenticated");
    },
  );
});

test("portal data adapter returns workspace-required when membership is missing", async () => {
  await withEnv(
    {
      DATABASE_URL: "postgresql://folioframe:local-secret@localhost:5432/folioframe_dev",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_localDevelopmentKey",
      CLERK_SECRET_KEY: "sk_test_localDevelopmentKey",
    },
    async () => {
      const snapshot = await getPortalWorkspaceSnapshot({
        workspaceContext: {
          status: "workspace-required",
          publicMessage: "Create or assign a WorkspaceMember record.",
          reason: "Signed-in user has no active workspace membership.",
          workspace: null,
          membership: null,
        },
      });

      assert.equal(snapshot.source, "workspace-required");
      assert.equal(snapshot.products.length, 0);
      assert.equal(snapshot.workspaceContextStatus, "workspace-required");
      assert.equal(snapshot.warnings.length > 0, true);
    },
  );
});

test("workspace bootstrap eligibility allows only missing workspace state", () => {
  assert.deepEqual(getWorkspaceBootstrapEligibility("workspace-required"), {
    canCreate: true,
    reason: "Signed-in user has no active workspace membership yet.",
  });

  assert.equal(getWorkspaceBootstrapEligibility("ready").canCreate, false);
  assert.match(
    getWorkspaceBootstrapEligibility("ready").reason,
    /Duplicate workspace creation is blocked/,
  );
  assert.equal(getWorkspaceBootstrapEligibility("auth-disabled").canCreate, false);
  assert.equal(getWorkspaceBootstrapEligibility("unauthenticated").canCreate, false);
});

test("demo owner assignment guard rejects missing and placeholder emails", () => {
  assert.equal(getDevOwnerEmail({}), null);
  assert.equal(getDevOwnerEmail({ ADMIN_EMAIL: "admin@example.com" }), null);
  assert.equal(getDevOwnerEmail({ DEV_OWNER_EMAIL: "owner-placeholder@test.test" }), null);
  assert.equal(getDevOwnerEmail({ DEV_OWNER_EMAIL: "OWNER@LocalDev.test" }), null);
  assert.equal(getDevOwnerEmail({ DEV_OWNER_EMAIL: "owner@local.dev" }), "owner@local.dev");
});

test("getRedactedDatabaseUrlInfo never exposes credentials", () => {
  const info = getRedactedDatabaseUrlInfo(
    "postgresql://folioframe:super-secret@localhost:5432/folioframe_dev",
  );

  assert.equal(info.present, true);
  assert.equal(info.provider, "postgresql");
  assert.equal(info.host, "localhost");
  assert.equal(info.database, "folioframe_dev");
  assert.equal(info.safeSummary.includes("super-secret"), false);
  assert.equal(info.safeSummary.includes("folioframe:"), false);
});

test("isProbablyProductionDatabaseUrl blocks remote unmarked and production URLs", () => {
  assert.equal(
    isProbablyProductionDatabaseUrl(
      "postgresql://user:pass@db.example.com:5432/folioframe",
    ),
    true,
  );
  assert.equal(
    isProbablyProductionDatabaseUrl(
      "postgresql://user:pass@db.example.com:5432/folioframe_prod",
    ),
    true,
  );
  assert.equal(
    isProbablyProductionDatabaseUrl(
      "postgresql://user:pass@staging-db.internal:5432/folioframe_staging",
    ),
    false,
  );
  assert.equal(
    isProbablyProductionDatabaseUrl(
      "postgresql://user:pass@localhost:5432/folioframe_dev",
    ),
    false,
  );
});

test("assertSafeToMigrate allows local dev and rejects production-like URLs", () => {
  assert.doesNotThrow(() =>
    assertSafeToMigrate(
      "postgresql://user:pass@localhost:5432/folioframe_dev",
    ),
  );
  assert.throws(() =>
    assertSafeToMigrate(
      "postgresql://user:pass@db.example.com:5432/folioframe_prod",
    ),
  );
});

test("database safety allows the local Docker development URL", () => {
  const localDockerUrl =
    "postgresql://folioframe_dev:folioframe_dev_password@localhost:5432/folioframe_dev";
  const info = getRedactedDatabaseUrlInfo(localDockerUrl);

  assert.equal(info.host, "localhost");
  assert.equal(info.database, "folioframe_dev");
  assert.equal(info.safeSummary.includes("folioframe_dev_password"), false);
  assert.equal(isProbablyProductionDatabaseUrl(localDockerUrl), false);
  assert.doesNotThrow(() => assertSafeToMigrate(localDockerUrl));
});

test("database verification fallback summary is safe without DATABASE_URL", () => {
  const summary = createDatabaseVerificationSummaryFallback();

  assert.equal(summary.databaseConfigured, false);
  assert.equal(summary.canConnect, false);
  assert.equal(summary.migrationLikelyApplied, false);
  assert.equal(summary.seededWorkspaceFound, false);
  assert.equal(summary.workspaceCount, 0);
  assert.ok(summary.warnings.some((warning) => warning.includes("skipped")));
});
