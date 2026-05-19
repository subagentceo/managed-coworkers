import { Turn } from "./Turn.js";

/**
 * The cycle Claude works through for every task: gather context, take action,
 * verify results, and repeat until done.
 *
 * Source: glossary.md "Agentic loop". A session is many Turns; the loop is what
 * happens inside one turn. Extension points (hooks, skills, MCP) plug into
 * specific phases of this loop.
 */
export abstract class AgenticLoop {
  public abstract readonly turn: Turn;

  /** Gather context for the next action. */
  public abstract gatherContext(): Promise<void>;

  /** Decide and execute the next tool call, if any. */
  public abstract takeAction(): Promise<void>;

  /** Inspect the tool result and decide whether to continue. */
  public abstract verifyResults(): Promise<boolean>;
}
