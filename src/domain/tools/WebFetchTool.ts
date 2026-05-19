import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** WebFetch input. tools-reference.md WebFetch tool behavior. */
export interface WebFetchToolInput {
  readonly url: string;
  readonly prompt: string;
}

/**
 * Fetches a URL, converts HTML to Markdown, and runs an extraction prompt against
 * the content with a small fast model.
 *
 * Source: tools-reference.md "WebFetch tool behavior". Lossy by design; results
 * are cached for 15 minutes; HTTP is auto-upgraded to HTTPS.
 */
export abstract class WebFetchTool extends Tool<WebFetchToolInput, string> {
  protected constructor() { super({ name: ToolName.WebFetch, requiresPermission: true }); }
}
