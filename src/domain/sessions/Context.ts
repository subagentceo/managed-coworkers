/**
 * Working memory for a Session.
 *
 * Source: glossary.md "Context window". Holds conversation history, file
 * contents, command outputs, CLAUDE.md, auto memory, loaded skills, and system
 * instructions. Run /context to see what is using space.
 */
export class Context {
  public readonly maxTokens: number;
  public readonly usedTokens: number;
  public readonly autoCompactThreshold: number;

  constructor(args: {
    maxTokens: number;
    usedTokens: number;
    autoCompactThreshold: number;
  }) {
    this.maxTokens = args.maxTokens;
    this.usedTokens = args.usedTokens;
    this.autoCompactThreshold = args.autoCompactThreshold;
  }

  public get usedPercentage(): number {
    return this.maxTokens > 0 ? this.usedTokens / this.maxTokens : 0;
  }
}
