import { PermissionRule } from "./PermissionRule.js";
import { PermissionMode, PermissionVerdict, SettingsLayer } from "../enums.js";

/**
 * The merged permission configuration for a Session.
 *
 * Source: glossary.md "Permission mode" + "Permission rule" + "Settings layers".
 * Holds the active mode plus the ordered allow / ask / deny rule lists drawn
 * from the layered settings hierarchy.
 */
export abstract class PermissionPolicy {
  public readonly mode: PermissionMode;
  public readonly allow: ReadonlyArray<PermissionRule>;
  public readonly ask: ReadonlyArray<PermissionRule>;
  public readonly deny: ReadonlyArray<PermissionRule>;
  public readonly additionalDirectories: ReadonlyArray<string>;
  public readonly sourceLayers: ReadonlyArray<SettingsLayer>;

  protected constructor(args: {
    mode: PermissionMode;
    allow?: ReadonlyArray<PermissionRule>;
    ask?: ReadonlyArray<PermissionRule>;
    deny?: ReadonlyArray<PermissionRule>;
    additionalDirectories?: ReadonlyArray<string>;
    sourceLayers?: ReadonlyArray<SettingsLayer>;
  }) {
    this.mode = args.mode;
    this.allow = args.allow ?? [];
    this.ask = args.ask ?? [];
    this.deny = args.deny ?? [];
    this.additionalDirectories = args.additionalDirectories ?? [];
    this.sourceLayers = args.sourceLayers ?? [];
  }

  /** Evaluate a candidate tool call. Returns the first matching verdict per the deny -> ask -> allow ordering. */
  public abstract evaluate(toolName: string, specifier: string): PermissionVerdict;
}
