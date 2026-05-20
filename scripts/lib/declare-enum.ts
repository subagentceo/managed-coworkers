// scripts/lib/declare-enum.ts
//
// First working skill body for the data-engineering managed-coworker
// (ODEP3). Implements the `declare-enums` skill at
//   packages/knowledge-work-plugins/data-engineering/skills/declare-enums/SKILL.md
// as a deterministic TypeScript-emitter:
//   buildEnumModule("AnalyticsConnector", ["cf-analytics-engine", "ga4"])
// returns the contents of a file like:
//   export const ANALYTICS_CONNECTORS = [...] as const;
//   export type AnalyticsConnector = (typeof ANALYTICS_CONNECTORS)[number];
//
// Pure function with no I/O; the CLI wrapper at scripts/declare-enum.ts
// handles file writes. Token-efficient (~80 LOC) and fully unit-tested.
//
// Refs: ODEP3.

/** Convert "AnalyticsConnector" → "ANALYTICS_CONNECTORS". */
export function constantNameOf(typeName: string): string {
  // Insert _ before each uppercase that follows a lowercase, then uppercase
  // and pluralize. Trailing 'Y' → 'IES'; otherwise append 'S'.
  const snake = typeName
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();
  if (snake.endsWith("Y")) return snake.slice(0, -1) + "IES";
  if (/[SXZ]$|CH$|SH$/.test(snake)) return snake + "ES";
  return snake + "S";
}

/** Validate a type name is a valid TypeScript identifier in PascalCase. */
export function isValidTypeName(name: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(name);
}

/** Validate an option is a kebab-case or snake_case string literal. */
export function isValidOption(opt: string): boolean {
  return /^[a-z][a-z0-9]*([-_][a-z0-9]+)*$/.test(opt);
}

export interface BuildEnumModuleArgs {
  /** PascalCase type name, e.g. "AnalyticsConnector". */
  typeName: string;
  /** String literals the enum admits, e.g. ["cf-analytics-engine", "ga4"]. */
  options: string[];
  /** Optional outcome ID for the file header comment. */
  outcomeId?: string;
  /** Optional one-line description. */
  description?: string;
}

/**
 * Build the TypeScript source for an `as const` enum module + its
 * derived string-union type. Matches the chassis's existing pattern
 * (see CoworkerName in src/domain/coworkers/CoworkerSession.ts for the
 * mid-sized example, and `userConfig` connector categories in
 * packages/knowledge-work-plugins/*\/.claude-plugin/plugin.json for the
 * upstream picks that motivate these enums).
 *
 * Throws on invalid input — callers should `try/catch` and surface
 * the error to the operator.
 */
export function buildEnumModule(args: BuildEnumModuleArgs): string {
  const { typeName, options, outcomeId, description } = args;

  if (!isValidTypeName(typeName)) {
    throw new Error(
      `Invalid typeName "${typeName}": must be PascalCase (^[A-Z][A-Za-z0-9]*$).`,
    );
  }
  if (options.length === 0) {
    throw new Error(`Options array is empty; enum needs at least one member.`);
  }
  const dups = options.filter((o, i) => options.indexOf(o) !== i);
  if (dups.length > 0) {
    throw new Error(`Duplicate options: ${[...new Set(dups)].join(", ")}`);
  }
  for (const opt of options) {
    if (!isValidOption(opt)) {
      throw new Error(
        `Invalid option "${opt}": must be kebab- or snake-case ([a-z][a-z0-9]*([-_][a-z0-9]+)*).`,
      );
    }
  }

  const constantName = constantNameOf(typeName);
  const header = description
    ? `/**\n * ${description}${outcomeId ? `\n *\n * Refs: ${outcomeId}.` : ""}\n */\n`
    : outcomeId
      ? `/** Refs: ${outcomeId}. */\n`
      : "";
  const literals = options.map((o) => `  "${o}",`).join("\n");

  return (
    header +
    `export const ${constantName} = [\n${literals}\n] as const;\n\n` +
    `export type ${typeName} = (typeof ${constantName})[number];\n`
  );
}
