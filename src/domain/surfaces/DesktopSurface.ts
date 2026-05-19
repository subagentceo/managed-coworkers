import { Surface } from "./Surface.js";
import { SurfaceKind } from "../enums.js";

/** Claude Code Desktop app surface. glossary.md "Surface"; commands.md /desktop. */
export class DesktopSurface extends Surface {
  constructor(args: { id: string; createdAt: Date; name?: string }) {
    super({ ...args, surfaceKind: SurfaceKind.Desktop });
  }
  public override get kind(): string { return "desktop_surface"; }
}
