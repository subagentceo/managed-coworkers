import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Executes a Skill within the main conversation.
 *
 * Source: tools-reference.md Skill tool, glossary.md "Skill". Permission rules
 * use the Skill(name *) format.
 */
export abstract class SkillTool extends Tool<{ name: string; args?: string }, string> {
  protected constructor() { super({ name: ToolName.Skill, requiresPermission: true }); }
}
