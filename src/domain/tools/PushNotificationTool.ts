import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Sends a desktop notification, and a phone push when Remote Control is connected.
 *
 * Source: tools-reference.md "PushNotification". Push delivery runs through
 * Anthropic-hosted infrastructure and is not accessible from Bedrock, Vertex, or Foundry.
 */
export abstract class PushNotificationTool extends Tool<{ title: string; message: string }, void> {
  protected constructor() { super({ name: ToolName.PushNotification, requiresPermission: false }); }
}
