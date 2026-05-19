import { Entity } from "../core/Entity.js";
import { SurfaceKind } from "../enums.js";

/**
 * Any place a user accesses Claude Code.
 *
 * Source: glossary.md "Surface". All surfaces share the same engine, so CLAUDE.md,
 * settings, and skills work the same way across them. Slack and the Chrome
 * extension are *integrations* (Integration subclasses) that connect to a
 * surface rather than surfaces themselves.
 */
export abstract class Surface extends Entity {
  public readonly surfaceKind: SurfaceKind;

  protected constructor(args: { id: string; surfaceKind: SurfaceKind; name?: string; createdAt: Date }) {
    super(args.id, args.createdAt, args.name);
    this.surfaceKind = args.surfaceKind;
  }

  public get kind(): string { return "surface"; }
}
