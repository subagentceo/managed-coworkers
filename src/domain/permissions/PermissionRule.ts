import { Entity } from "../core/Entity.js";
import { PermissionVerdict, ToolName } from "../enums.js";

/**
 * A settings entry that allows, asks about, or denies a tool invocation based
 * on the tool name and argument pattern.
 *
 * Source: glossary.md "Permission rule", tools-reference.md "Configure tools
 * with permission rules and hooks". Rules are evaluated deny -> ask -> allow,
 * first match wins, layered on top of the broader PermissionMode.
 */
export class PermissionRule extends Entity {
  /** Bare tool name (e.g., ToolName.Bash, ToolName.WebSearch). */
  public readonly toolName: ToolName | string;

  /** Optional specifier inside the parens, e.g., "git *" for Bash(git *). */
  public readonly specifier?: string;

  /** Verdict this rule expresses if it matches. PermissionVerdict.Defer is not valid here. */
  public readonly verdict: Exclude<PermissionVerdict, PermissionVerdict.Defer>;

  constructor(args: {
    id: string;
    toolName: ToolName | string;
    specifier?: string;
    verdict: Exclude<PermissionVerdict, PermissionVerdict.Defer>;
    createdAt?: Date;
  }) {
    super(args.id, args.createdAt ?? new Date());
    this.toolName = args.toolName;
    this.specifier = args.specifier;
    this.verdict = args.verdict;
  }

  public get kind(): string { return "permission_rule"; }

  /** Canonical string form, e.g., "Bash(git *)" or "WebSearch". */
  public toRuleString(): string {
    return this.specifier ? this.toolName + "(" + this.specifier + ")" : String(this.toolName);
  }
}
