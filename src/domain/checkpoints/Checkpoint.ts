/**
 * Session checkpoint — placeholder until canonical bundle file lands.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/checkpointing.md
 * @todo OCDM-followup: replace with full bundle implementation
 */
import { Entity } from "../core/Entity.js";
import { CheckpointId } from "../core/Identifier.js";

export class Checkpoint extends Entity {
  public override readonly id: CheckpointId;
  constructor(id: CheckpointId, createdAt: Date, name?: string) {
    super(id, createdAt, name);
    this.id = id;
  }
  public get kind(): string { return "checkpoint"; }
}
