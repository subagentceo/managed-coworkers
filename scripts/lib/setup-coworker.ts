/**
 * Pure functions for scripts/setup-coworker.ts.
 *
 * Reads operator connector choices, maps them to Docker Compose profiles,
 * and produces the active-connectors.json + docker compose command string.
 *
 * No I/O — the CLI wrapper handles file writes and exec.
 *
 * Refs: OPMP2.
 */

// ---------------------------------------------------------------------------
// Connector registry
// ---------------------------------------------------------------------------

/** Every connector the operator can pick for any vertical. */
export const CONNECTOR_PROFILES = {
  "cf-analytics": "cf-analytics",
  "ga4": "ga4",
  "gsc": "gsc",
  "slack": "slack",
  "discord": "discord",
  "linear": "linear",
  "atlassian": "atlassian",
  "github-projects": "github-projects",
  "intercom": "intercom",
  "github-issues": "github-issues",
} as const satisfies Record<string, string>;

export type ConnectorName = keyof typeof CONNECTOR_PROFILES;

/** Connector categories matching plugin.json userConfig keys. */
export const CONNECTOR_CATEGORIES: Record<string, ConnectorName[]> = {
  analytics: ["cf-analytics", "ga4"],
  search_console: ["gsc"],
  chat: ["slack", "discord"],
  project_tracker: ["linear", "atlassian", "github-projects"],
  feedback: ["intercom", "github-issues"],
};

export const ALL_CONNECTORS: ConnectorName[] = Object.keys(CONNECTOR_PROFILES) as ConnectorName[];

// ---------------------------------------------------------------------------
// Parsing + validation
// ---------------------------------------------------------------------------

/** Parse "cf-analytics,gsc" → ["cf-analytics", "gsc"] */
export function parseConnectorList(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Returns the subset of connectors that are not in the known registry. */
export function unknownConnectors(connectors: readonly string[]): string[] {
  return connectors.filter((c) => !(c in CONNECTOR_PROFILES));
}

/** Maps a connector name → Docker Compose profile name. */
export function connectorToProfile(connector: ConnectorName): string {
  return CONNECTOR_PROFILES[connector];
}

// ---------------------------------------------------------------------------
// Active-connectors JSON
// ---------------------------------------------------------------------------

export interface ActiveConnectors {
  vertical: string;
  generatedAt: string;
  connectors: ConnectorName[];
  profiles: string[];
}

export function buildActiveConnectors(
  vertical: string,
  connectors: ConnectorName[],
): ActiveConnectors {
  const profiles = connectors.map((c) => connectorToProfile(c));
  return {
    vertical,
    generatedAt: new Date().toISOString(),
    connectors,
    profiles,
  };
}

// ---------------------------------------------------------------------------
// Docker Compose command builder
// ---------------------------------------------------------------------------

/**
 * Returns the `docker compose` command that activates the given profiles.
 * Uses the mcp-toolkit compose file for connector services.
 */
export function buildComposeCommand(
  profiles: readonly string[],
  composeFile = ".docker/mcp-toolkit/compose.yaml",
): string {
  if (profiles.length === 0) return "";
  const profileFlags = profiles.map((p) => `--profile ${p}`).join(" ");
  return `docker compose -f ${composeFile} ${profileFlags} up -d`;
}

/**
 * Summarises which connectors are active per category.
 * Used for the console printout in the CLI.
 */
export function summarizeByCategory(connectors: readonly ConnectorName[]): Record<string, string[]> {
  const active = new Set(connectors);
  const result: Record<string, string[]> = {};
  for (const [cat, names] of Object.entries(CONNECTOR_CATEGORIES)) {
    const matched = names.filter((n) => active.has(n));
    if (matched.length > 0) result[cat] = matched;
  }
  return result;
}
