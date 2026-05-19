import { Surface } from "./Surface.js";
import { SurfaceKind } from "../enums.js";

/** VS Code IDE surface. glossary.md "Surface". */
export class VsCodeSurface extends Surface {
  constructor(args: { id: string; createdAt: Date; name?: string }) {
    super({ ...args, surfaceKind: SurfaceKind.VsCode });
  }
  public override get kind(): string { return "vscode_surface"; }
}
