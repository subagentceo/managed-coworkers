import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** AskUserQuestion input. hooks.md PreToolUse.AskUserQuestion. */
export interface AskUserQuestionInput {
  readonly questions: ReadonlyArray<{
    readonly question: string;
    readonly header: string;
    readonly options: ReadonlyArray<{ readonly label: string }>;
    readonly multiSelect: boolean;
  }>;
  readonly answers?: Record<string, string>;
}

/**
 * Asks one to four multiple-choice questions to gather requirements.
 *
 * Source: tools-reference.md AskUserQuestion, hooks.md AskUserQuestion schema.
 */
export abstract class AskUserQuestionTool extends Tool<AskUserQuestionInput, Record<string, string>> {
  protected constructor() { super({ name: ToolName.AskUserQuestion, requiresPermission: false }); }
}
