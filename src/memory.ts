/**
 * Memory Stores
 * 
 * Persistent memory for agents across sessions
 */

export interface MemoryEntry {
  id: string;
  agentId: string;
  key: string;
  value: unknown;
  type: 'short_term' | 'long_term' | 'episodic';
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  metadata: Record<string, unknown>;
}

export interface MemoryStore {
  id: string;
  agentId: string;
  type: 'in_memory' | 'redis' | 'postgres' | 'vector';
  entries: MemoryEntry[];
  maxSize: number;
  isActive: boolean;
}

export interface MemoryQuery {
  agentId: string;
  type?: MemoryEntry['type'];
  key?: string;
  limit?: number;
}

export interface MemorySummary {
  agentId: string;
  totalEntries: number;
  shortTermCount: number;
  longTermCount: number;
  episodicCount: number;
  totalSize: number;
}

/**
 * MemoryManager - Manages agent memory stores
 */
export class MemoryManager {
  private stores: Map<string, MemoryStore> = new Map();
  private memories: Map<string, MemoryEntry[]> = new Map(); // agentId -> entries

  /**
   * Create memory store
   */
  createMemoryStore(agentId: string, type: MemoryStore['type'], maxSize: number = 1000000): MemoryStore {
    const store: MemoryStore = {
      id: `store_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      agentId,
      type,
      entries: [],
      maxSize,
      isActive: true,
    };

    this.stores.set(store.id, store);
    if (!this.memories.has(agentId)) {
      this.memories.set(agentId, []);
    }

    return store;
  }

  /**
   * Store memory
   */
  store(agentId: string, key: string, value: unknown, type: MemoryEntry['type'] = 'short_term', metadata?: Record<string, unknown>): MemoryEntry {
    let entries = this.memories.get(agentId);
    if (!entries) {
      entries = [];
      this.memories.set(agentId, entries);
    }

    // Check if key already exists and update
    const existing = entries.find(e => e.key === key);
    if (existing) {
      existing.value = value;
      existing.updatedAt = Date.now();
      existing.type = type;
      return existing;
    }

    // Create new entry
    const entry: MemoryEntry = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      agentId,
      key,
      value,
      type,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      metadata: metadata || {},
    };

    entries.push(entry);

    // Set expiration for short-term memory (24 hours)
    if (type === 'short_term') {
      entry.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    }

    return entry;
  }

  /**
   * Retrieve memory
   */
  retrieve(agentId: string, key: string): unknown | undefined {
    const entries = this.memories.get(agentId);
    if (!entries) return undefined;

    const entry = entries.find(e => e.key === key);
    if (!entry) return undefined;

    // Check expiration
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      // Remove expired entry
      const index = entries.indexOf(entry);
      if (index >= 0) entries.splice(index, 1);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Query memory
   */
  query(query: MemoryQuery): MemoryEntry[] {
    const entries = this.memories.get(query.agentId) || [];

    let results = entries;

    if (query.type) {
      results = results.filter(e => e.type === query.type);
    }

    if (query.key) {
      results = results.filter(e => e.key.includes(query.key!));
    }

    // Remove expired entries
    results = results.filter(e => {
      if (e.expiresAt && Date.now() > e.expiresAt) return false;
      return true;
    });

    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  /**
   * Delete memory entry
   */
  delete(agentId: string, key: string): boolean {
    const entries = this.memories.get(agentId);
    if (!entries) return false;

    const index = entries.findIndex(e => e.key === key);
    if (index >= 0) {
      entries.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Clear all memory for agent
   */
  clear(agentId: string): void {
    this.memories.set(agentId, []);
  }

  /**
   * Get memory summary
   */
  getSummary(agentId: string): MemorySummary {
    const entries = this.memories.get(agentId) || [];

    let totalSize = 0;
    entries.forEach(e => {
      totalSize += JSON.stringify(e.value).length;
    });

    return {
      agentId,
      totalEntries: entries.length,
      shortTermCount: entries.filter(e => e.type === 'short_term').length,
      longTermCount: entries.filter(e => e.type === 'long_term').length,
      episodicCount: entries.filter(e => e.type === 'episodic').length,
      totalSize,
    };
  }

  /**
   * Store episodic memory (conversation history)
   */
  storeEpisode(agentId: string, episodeData: Record<string, unknown>): MemoryEntry {
    const episodeKey = `episode_${Date.now()}`;
    return this.store(agentId, episodeKey, episodeData, 'episodic', {
      timestamp: Date.now(),
      type: 'conversation',
    });
  }

  /**
   * Retrieve recent episodes
   */
  getRecentEpisodes(agentId: string, count: number = 10): MemoryEntry[] {
    return this.query({
      agentId,
      type: 'episodic',
      limit: count,
    });
  }

  /**
   * Store long-term learning
   */
  storeLearning(agentId: string, topic: string, knowledge: unknown): MemoryEntry {
    return this.store(agentId, `learning_${topic}`, knowledge, 'long_term', {
      topic,
      learnedAt: Date.now(),
    });
  }

  /**
   * Get store
   */
  getStore(storeId: string): MemoryStore | undefined {
    return this.stores.get(storeId);
  }

  /**
   * List agent stores
   */
  getAgentStores(agentId: string): MemoryStore[] {
    return Array.from(this.stores.values()).filter(s => s.agentId === agentId);
  }

  /**
   * Cleanup expired entries
   */
  cleanupExpired(agentId?: string): number {
    const now = Date.now();
    let cleaned = 0;

    if (agentId) {
      const entries = this.memories.get(agentId);
      if (entries) {
        const before = entries.length;
        const filtered = entries.filter(e => !e.expiresAt || e.expiresAt > now);
        this.memories.set(agentId, filtered);
        cleaned = before - filtered.length;
      }
    } else {
      this.memories.forEach((entries, id) => {
        const before = entries.length;
        const filtered = entries.filter(e => !e.expiresAt || e.expiresAt > now);
        this.memories.set(id, filtered);
        cleaned += before - filtered.length;
      });
    }

    return cleaned;
  }
}

export default MemoryManager;
