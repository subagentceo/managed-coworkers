import { Surface } from "./Surface.js";
import { SurfaceKind } from "../enums.js";

/** JetBrains IDE surface. glossary.md "Surface". */
export class JetBrainsSurface extends Surface {
  constructor(args: { id: string; createdAt: Date; name?: string }) {
    super({ ...args, surfaceKind: SurfaceKind.JetBrains });
  }
  public override get kind(): string { return "jetbrains_surface"; }
}
