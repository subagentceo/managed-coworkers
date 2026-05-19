import { Entity } from "../core/Entity.js";
import { Agent } from "./Agent.js";

/**
 * Multiple independent Claude Code sessions coordinated by a team lead, with a
 * shared task list and peer-to-peer messaging.
 *
 * Source: glossary.md "Agent teams". Experimental; must be enabled by setting
 * CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1. Differs from Subagent in that each
 * teammate has its own context window and the user can interact with any of them.
 */
export class AgentTeam extends Entity {
  public readonly teamName: string;
  public readonly teammates: ReadonlyArray<Agent>;
  public readonly leadTeammateName?: string;

  constructor(args: {
    id: string;
    teamName: string;
    teammates: ReadonlyArray<Agent>;
    leadTeammateName?: string;
    createdAt: Date;
  }) {
    super(args.id, args.createdAt, args.teamName);
    this.teamName = args.teamName;
    this.teammates = args.teammates;
    this.leadTeammateName = args.leadTeammateName;
  }

  public get kind(): string { return "agent_team"; }
}
