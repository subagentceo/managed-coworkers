/**
 * Session Management
 * 
 * Manages agent sessions, conversations, and session lifecycle
 */

import { ManagedAgentsClient } from './client';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SessionState {
  id: string;
  agentId: string;
  userId?: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'paused' | 'completed' | 'error';
  metadata: Record<string, unknown>;
}

export interface SessionEvent {
  type: 'message_sent' | 'message_received' | 'tool_called' | 'error' | 'session_ended';
  timestamp: number;
  data: Record<string, unknown>;
}

/**
 * SessionManager - Handles session creation, state, and lifecycle
 */
export class SessionManager {
  private client: ManagedAgentsClient;
  private sessions: Map<string, SessionState> = new Map();
  private events: Map<string, SessionEvent[]> = new Map();

  constructor(client: ManagedAgentsClient) {
    this.client = client;
  }

  /**
   * Create a new session
   */
  async createSession(agentId: string, userId?: string, metadata?: Record<string, unknown>): Promise<SessionState> {
    const session = await this.client.createSession({ agentId, userId, metadata });

    const state: SessionState = {
      id: session.id,
      agentId: session.agentId,
      userId,
      messages: [],
      createdAt: session.createdAt,
      updatedAt: session.createdAt,
      status: 'active',
      metadata: metadata || {},
    };

    this.sessions.set(session.id, state);
    this.events.set(session.id, []);

    return state;
  }

  /**
   * Send a message to a session
   */
  async sendMessage(sessionId: string, message: string): Promise<Message> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    // Record user message
    const userMessage: Message = { role: 'user', content: message };
    session.messages.push(userMessage);

    // Get response from agent
    const response = await this.client.sendMessage(sessionId, message);
    session.messages.push(response);

    // Update session state
    session.updatedAt = Date.now();
    this.events.get(sessionId)?.push({
      type: 'message_sent',
      timestamp: Date.now(),
      data: { message },
    });

    return response;
  }

  /**
   * Stream a message response
   */
  async *streamMessage(sessionId: string, message: string) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    const userMessage: Message = { role: 'user', content: message };
    session.messages.push(userMessage);

    let fullResponse = '';
    for await (const chunk of this.client.streamMessage(sessionId, message)) {
      fullResponse += chunk;
      yield chunk;
    }

    session.messages.push({ role: 'assistant', content: fullResponse });
    session.updatedAt = Date.now();
  }

  /**
   * Get session state
   */
  getSession(sessionId: string): SessionState | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all sessions
   */
  getAllSessions(): SessionState[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Get session events
   */
  getSessionEvents(sessionId: string): SessionEvent[] {
    return this.events.get(sessionId) || [];
  }

  /**
   * Archive a session
   */
  archiveSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.status = 'completed';
    session.updatedAt = Date.now();
    return true;
  }

  /**
   * Delete a session
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId) && this.events.delete(sessionId);
  }

  /**
   * Get conversation history
   */
  getConversationHistory(sessionId: string): Message[] {
    const session = this.sessions.get(sessionId);
    return session?.messages || [];
  }
}

export default SessionManager;
