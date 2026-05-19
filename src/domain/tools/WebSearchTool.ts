import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

export interface WebSearchToolInput {
  readonly query: string;
  readonly allowed_domains?: ReadonlyArray<string>;
  readonly blocked_domains?: ReadonlyArray<string>;
}

export interface WebSearchResult {
  readonly title: string;
  readonly url: string;
}

/**
 * Runs a query against Anthropic's web search backend and returns titles and URLs.
 *
 * Source: tools-reference.md "WebSearch tool behavior". May issue up to eight
 * backend searches per call. Permission rules take no specifier.
 */
export abstract class WebSearchTool extends Tool<WebSearchToolInput, ReadonlyArray<WebSearchResult>> {
  protected constructor() { super({ name: ToolName.WebSearch, requiresPermission: true }); }
}
