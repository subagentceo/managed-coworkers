/**
 * Abstract base for every persistent domain object in the Claude Code model.
 *
 * Source: code.claude.com/docs/en/glossary.md.
 * Anything that has a stable identity (Session, Turn, Tool, Plugin, Skill,
 * Subagent, MemoryArtifact, Checkpoint, Worktree, Routine, etc.) extends this.
 */
export abstract class Entity {
  /** Stable identifier (UUID, slug, or path-derived id). Immutable. */
  public readonly id: string;

  /** Human-readable display name. Optional because some entities (Turn) are anonymous. */
  public readonly name?: string;

  /** Wall-clock creation time. */
  public readonly createdAt: Date;

  protected constructor(id: string, createdAt: Date, name?: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
  }

  /** Discriminator implemented by each concrete subclass. */
  public abstract get kind(): string;
}
