/**
 * Managed Agents Client
 * 
 * Core client initialization and configuration for Claude Managed Agents
 */

import Anthropic from '@anthropic-ai/sdk';

export interface ClientConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
}

export interface AgentConfig {
  name: string;
  description: string;
  model: string;
  instructions?: string;
  tools?: ToolDefinition[];
  maxTokens?: number;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface SessionConfig {
  agentId: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * ManagedAgentsClient - Main client for interacting with Claude Managed Agents
 */
export class ManagedAgentsClient {
  private anthropicClient: Anthropic;
  private config: ClientConfig;

  constructor(config: ClientConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
      ...config,
    };

    this.anthropicClient = new Anthropic({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      timeout: this.config.timeout || 30000,
      maxRetries: this.config.maxRetries || 3,
    });
  }

  /**
   * Initialize client with API key validation
   */
  async initialize(): Promise<void> {
    if (!this.config.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required');
    }
  }

  /**
   * Create a new agent
   */
  async createAgent(config: AgentConfig): Promise<{ id: string; agent: AgentConfig }> {
    return {
      id: `agent_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      agent: config,
    };
  }

  /**
   * Create a new session for an agent
   */
  async createSession(sessionConfig: SessionConfig): Promise<{ id: string; agentId: string; createdAt: number }> {
    return {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      agentId: sessionConfig.agentId,
      createdAt: Date.now(),
    };
  }

  /**
   * Send a message to an agent session
   */
  async sendMessage(sessionId: string, message: string): Promise<{ role: string; content: string }> {
    const response = await this.anthropicClient.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    return {
      role: 'assistant',
      content: textContent.text,
    };
  }

  /**
   * Stream a message response
   */
  async *streamMessage(sessionId: string, message: string) {
    const stream = await this.anthropicClient.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        yield chunk.delta.text;
      }
    }
  }

  /**
   * Get the underlying Anthropic client
   */
  getAnthropicClient(): Anthropic {
    return this.anthropicClient;
  }
}

export default ManagedAgentsClient;
