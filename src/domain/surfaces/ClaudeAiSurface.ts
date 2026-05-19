import { Surface } from "./Surface.js";
import { SurfaceKind } from "../enums.js";

/** claude.ai web surface, including Claude Code on the web. glossary.md "Surface". */
export class ClaudeAiSurface extends Surface {
  constructor(args: { id: string; createdAt: Date; name?: string }) {
    super({ ...args, surfaceKind: SurfaceKind.ClaudeAi });
  }
  public override get kind(): string { return "claude_ai_surface"; }
}
