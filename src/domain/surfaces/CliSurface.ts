import { Surface } from "./Surface.js";
import { SurfaceKind } from "../enums.js";

/** The `claude` command-line interface. cli-reference.md, interactive-mode.md. */
export class CliSurface extends Surface {
  constructor(args: { id: string; createdAt: Date; name?: string }) {
    super({ ...args, surfaceKind: SurfaceKind.Cli });
  }
  public override get kind(): string { return "cli_surface"; }
}
