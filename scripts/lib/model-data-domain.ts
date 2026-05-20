// scripts/lib/model-data-domain.ts
//
// Second working skill body for the data-engineering managed-coworker.
// Implements `model-data-domain` from
//   packages/knowledge-work-plugins/data-engineering/skills/model-data-domain/SKILL.md
// as a deterministic TypeScript-emitter:
//
//   buildDomainEntity({
//     entityName: "Site",
//     fields: [
//       { name: "id",       type: "SiteId",          column: "id"        },
//       { name: "hostname", type: "string",          column: "hostname"  },
//       { name: "niche",    type: "string",          column: "niche"     },
//     ],
//     outcomeId: "ODEP4",
//   })
//
// returns a TS source string that extends the chassis's Entity base
// class (src/domain/core/Entity.ts) with branded ID + readonly fields,
// matching the CoworkerSession pattern from ODEP2.
//
// Pure function with no I/O; the CLI wrapper at scripts/model-data-domain.ts
// handles file writes. Token-efficient (~140 LOC), fully unit-tested.
//
// Refs: ODEP4.

/** Validate a PascalCase entity / type name. */
export function isValidPascalCase(name: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(name);
}

/** Validate a camelCase field name. */
export function isValidFieldName(name: string): boolean {
  return /^[a-z][A-Za-z0-9]*$/.test(name);
}

/** Validate a snake_case column name. */
export function isValidColumnName(name: string): boolean {
  return /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(name);
}

export interface DomainField {
  /** camelCase field name on the TS class, e.g. "hostname". */
  name: string;
  /** TypeScript type, e.g. "string", "Date", "SiteId" (branded ID). */
  type: string;
  /** snake_case column name in the underlying table, e.g. "hostname". */
  column: string;
  /** Optional default value; if absent, the field is required in the constructor args. */
  defaultExpr?: string;
}

export interface BuildDomainEntityArgs {
  /** PascalCase entity name, e.g. "Site". */
  entityName: string;
  /** Fields. The first MUST be `id`. */
  fields: DomainField[];
  /** Optional outcome ID for the file header comment. */
  outcomeId?: string;
  /** Optional one-line description. */
  description?: string;
}

/**
 * Emit a domain entity TypeScript module matching the chassis's
 * Entity-base pattern. Throws on invalid input.
 */
export function buildDomainEntity(args: BuildDomainEntityArgs): string {
  const { entityName, fields, outcomeId, description } = args;

  if (!isValidPascalCase(entityName)) {
    throw new Error(`Invalid entityName "${entityName}": must be PascalCase.`);
  }
  if (fields.length === 0) {
    throw new Error(`fields[] is empty; entity needs at least the id field.`);
  }
  if (fields[0].name !== "id" || fields[0].column !== "id") {
    throw new Error(`first field must be { name: "id", column: "id" }; got ${JSON.stringify(fields[0])}`);
  }

  const seenNames = new Set<string>();
  const seenColumns = new Set<string>();
  for (const f of fields) {
    if (!isValidFieldName(f.name)) {
      throw new Error(`Invalid field name "${f.name}": must be camelCase.`);
    }
    if (!isValidColumnName(f.column)) {
      throw new Error(`Invalid column name "${f.column}": must be snake_case.`);
    }
    if (seenNames.has(f.name)) {
      throw new Error(`Duplicate field name: "${f.name}".`);
    }
    if (seenColumns.has(f.column)) {
      throw new Error(`Duplicate column name: "${f.column}".`);
    }
    seenNames.add(f.name);
    seenColumns.add(f.column);
  }

  const header =
    `/**\n * ${description ?? `${entityName} domain entity.`}\n` +
    ` *\n * Persisted columns documented inline on each readonly field.\n` +
    (outcomeId ? ` *\n * Refs: ${outcomeId}.\n` : "") +
    ` */`;

  const idType = fields[0].type;
  // If the id field uses a branded ID type (anything other than `string`),
  // emit the brand declaration so callers can refer to it.
  const brandDecl =
    idType === "string"
      ? ""
      : `\n/** Branded identifier for ${entityName}. */\nexport type ${idType} = string & { __brand: "${idType}" };\n`;

  const constructorParams = fields
    .map((f) => {
      const optional = f.defaultExpr ? "?" : "";
      const t = f.name === "id" ? idType : f.type;
      return `    ${f.name}${optional}: ${t};`;
    })
    .join("\n");

  const fieldDecls = fields
    .map((f) => {
      const t = f.name === "id" ? idType : f.type;
      // id is handled by Entity base; skip duplicate declaration
      if (f.name === "id") return "";
      return `  /** Maps to \`${f.column}\`. */\n  public readonly ${f.name}: ${t};`;
    })
    .filter((s) => s.length > 0)
    .join("\n\n");

  const fieldAssigns = fields
    .map((f) => {
      if (f.name === "id") return "";
      if (f.defaultExpr) {
        return `    this.${f.name} = args.${f.name} ?? ${f.defaultExpr};`;
      }
      return `    this.${f.name} = args.${f.name};`;
    })
    .filter((s) => s.length > 0)
    .join("\n");

  const columnsArray = fields.map((f) => `  "${f.column}",`).join("\n");

  return (
    `${header}\n\n` +
    `import { Entity } from "../core/Entity.js";\n` +
    brandDecl +
    `\nexport class ${entityName} extends Entity {\n` +
    `${fieldDecls}\n\n` +
    `  constructor(args: {\n${constructorParams}\n  }) {\n` +
    `    super(args.id, new Date());\n` +
    `${fieldAssigns}\n` +
    `  }\n\n` +
    `  public get kind(): string {\n` +
    `    return "${entityName}";\n` +
    `  }\n` +
    `}\n\n` +
    `/** Column names in the corresponding SQL table, in table-order. */\n` +
    `export const ${entityName.toUpperCase()}_COLUMNS = [\n${columnsArray}\n] as const;\n`
  );
}
