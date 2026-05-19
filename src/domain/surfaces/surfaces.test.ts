/**
 * Surfaces test (OCDM5).
 *
 * Asserts each Surface subclass returns the correct SurfaceKind value:
 *   CliSurface       -> SurfaceKind.Cli
 *   VsCodeSurface    -> SurfaceKind.VsCode
 *   JetBrainsSurface -> SurfaceKind.JetBrains
 *   DesktopSurface   -> SurfaceKind.Desktop
 *   ClaudeAiSurface  -> SurfaceKind.ClaudeAi
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 */
import { strict as assert } from "node:assert";
import { SurfaceKind } from "./../enums.js";
import { CliSurface } from "./CliSurface.js";
import { VsCodeSurface } from "./VsCodeSurface.js";
import { JetBrainsSurface } from "./JetBrainsSurface.js";
import { DesktopSurface } from "./DesktopSurface.js";
import { ClaudeAiSurface } from "./ClaudeAiSurface.js";

const now = new Date("2026-05-18T00:00:00Z");

const cli = new CliSurface({ id: "cli-1", createdAt: now });
assert.equal(cli.surfaceKind, SurfaceKind.Cli, "CliSurface should report SurfaceKind.Cli");
assert.equal(cli.kind, "cli_surface");

const vsc = new VsCodeSurface({ id: "vsc-1", createdAt: now });
assert.equal(vsc.surfaceKind, SurfaceKind.VsCode, "VsCodeSurface should report SurfaceKind.VsCode");
assert.equal(vsc.kind, "vscode_surface");

const jb = new JetBrainsSurface({ id: "jb-1", createdAt: now });
assert.equal(jb.surfaceKind, SurfaceKind.JetBrains, "JetBrainsSurface should report SurfaceKind.JetBrains");
assert.equal(jb.kind, "jetbrains_surface");

const dsk = new DesktopSurface({ id: "dsk-1", createdAt: now });
assert.equal(dsk.surfaceKind, SurfaceKind.Desktop, "DesktopSurface should report SurfaceKind.Desktop");
assert.equal(dsk.kind, "desktop_surface");

const cai = new ClaudeAiSurface({ id: "cai-1", createdAt: now });
assert.equal(cai.surfaceKind, SurfaceKind.ClaudeAi, "ClaudeAiSurface should report SurfaceKind.ClaudeAi");
assert.equal(cai.kind, "claude_ai_surface");

// Identity / Entity properties propagate.
assert.equal(cli.id, "cli-1");
assert.equal(cli.createdAt.toISOString(), now.toISOString());

console.log("OCDM5 surfaces.test.ts: ok (5/5 subclasses map to correct SurfaceKind)");
