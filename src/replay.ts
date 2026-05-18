/**
 * Cost Tracking and Replay Infrastructure
 * 
 * Tracks costs, manages deterministic replay with event recording
 */

import * as crypto from 'crypto';

export interface CostEntry {
  id: string;
  category: 'api_call' | 'mcp_invocation' | 'file_operation' | 'resource';
  amount: number;
  timestamp: number;
  metadata: Record<string, unknown>;
}

export interface ReplayEvent {
  sequence: number;
  type: string;
  timestamp: number;
  clockTick: number;
  data: Record<string, unknown>;
  hash: string;
}

export interface ExecutionRecord {
  id: string;
  startTime: number;
  endTime?: number;
  events: ReplayEvent[];
  totalCost: number;
  costs: CostEntry[];
  checksum: string;
  status: 'running' | 'completed' | 'failed';
}

/**
 * CostTracker - Manages cost tracking and billing
 */
export class CostTracker {
  private costs: Map<string, CostEntry[]> = new Map();
  private totalCost = 0;

  /**
   * Record a cost
   */
  recordCost(category: CostEntry['category'], amount: number, metadata?: Record<string, unknown>): CostEntry {
    const entry: CostEntry = {
      id: `cost_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      category,
      amount,
      timestamp: Date.now(),
      metadata: metadata || {},
    };

    if (!this.costs.has(category)) {
      this.costs.set(category, []);
    }

    this.costs.get(category)!.push(entry);
    this.totalCost += amount;

    return entry;
  }

  /**
   * Get total cost
   */
  getTotalCost(): number {
    return this.totalCost;
  }

  /**
   * Get cost by category
   */
  getCostByCategory(category: CostEntry['category']): number {
    return this.costs.get(category)?.reduce((sum, c) => sum + c.amount, 0) || 0;
  }

  /**
   * Get all costs
   */
  getAllCosts(): CostEntry[] {
    const all: CostEntry[] = [];
    this.costs.forEach(entries => all.push(...entries));
    return all;
  }

  /**
   * Get cost breakdown
   */
  getCostBreakdown(): Map<string, number> {
    const breakdown = new Map<string, number>();
    this.costs.forEach((entries, category) => {
      breakdown.set(category, entries.reduce((sum, c) => sum + c.amount, 0));
    });
    return breakdown;
  }
}

/**
 * DeterministicClock - Provides deterministic time for replay
 */
export class DeterministicClock {
  private currentTime = 0;

  tick(): number {
    return this.currentTime++;
  }

  reset(): void {
    this.currentTime = 0;
  }

  advanceTo(time: number): void {
    this.currentTime = time;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }
}

/**
 * ReplayRecorder - Records execution for deterministic replay
 */
export class ReplayRecorder {
  private records: Map<string, ExecutionRecord> = new Map();
  private clock: DeterministicClock = new DeterministicClock();
  private costTracker: CostTracker = new CostTracker();

  /**
   * Start recording execution
   */
  startExecution(executionId: string): ExecutionRecord {
    const record: ExecutionRecord = {
      id: executionId,
      startTime: Date.now(),
      events: [],
      totalCost: 0,
      costs: [],
      checksum: '',
      status: 'running',
    };

    this.records.set(executionId, record);
    this.clock.reset();
    return record;
  }

  /**
   * Record an event
   */
  recordEvent(executionId: string, type: string, data: Record<string, unknown>): ReplayEvent {
    const record = this.records.get(executionId);
    if (!record) throw new Error(`Execution not found: ${executionId}`);

    const event: ReplayEvent = {
      sequence: record.events.length,
      type,
      timestamp: Date.now(),
      clockTick: this.clock.tick(),
      data,
      hash: '',
    };

    event.hash = crypto.createHash('sha256').update(JSON.stringify(event)).digest('hex');
    record.events.push(event);

    return event;
  }

  /**
   * Record cost
   */
  recordCost(executionId: string, category: CostEntry['category'], amount: number, metadata?: Record<string, unknown>): void {
    const record = this.records.get(executionId);
    if (!record) throw new Error(`Execution not found: ${executionId}`);

    const costEntry = this.costTracker.recordCost(category, amount, metadata);
    record.costs.push(costEntry);
    record.totalCost = this.costTracker.getTotalCost();
  }

  /**
   * Complete execution
   */
  completeExecution(executionId: string, status: 'completed' | 'failed' = 'completed'): ExecutionRecord {
    const record = this.records.get(executionId);
    if (!record) throw new Error(`Execution not found: ${executionId}`);

    record.endTime = Date.now();
    record.status = status;
    record.checksum = crypto.createHash('sha256').update(JSON.stringify(record.events)).digest('hex');

    return record;
  }

  /**
   * Get execution record
   */
  getRecord(executionId: string): ExecutionRecord | undefined {
    return this.records.get(executionId);
  }

  /**
   * Replay execution
   */
  async replayExecution(executionId: string): Promise<ExecutionRecord> {
    const original = this.records.get(executionId);
    if (!original) throw new Error(`Execution not found: ${executionId}`);

    this.clock.reset();

    const replayed: ExecutionRecord = {
      id: `${executionId}_replay`,
      startTime: Date.now(),
      events: [],
      totalCost: original.totalCost,
      costs: [...original.costs],
      checksum: '',
      status: 'running',
    };

    // Replay events with deterministic clock
    for (const event of original.events) {
      const newEvent: ReplayEvent = {
        ...event,
        clockTick: this.clock.tick(),
        timestamp: Date.now(),
      };

      newEvent.hash = crypto.createHash('sha256').update(JSON.stringify(newEvent)).digest('hex');
      replayed.events.push(newEvent);
    }

    replayed.endTime = Date.now();
    replayed.status = 'completed';
    replayed.checksum = crypto.createHash('sha256').update(JSON.stringify(replayed.events)).digest('hex');

    this.records.set(replayed.id, replayed);
    return replayed;
  }

  /**
   * Detect divergence between original and replayed
   */
  detectDivergence(originalId: string, replayedId: string): number {
    const original = this.records.get(originalId);
    const replayed = this.records.get(replayedId);

    if (!original || !replayed) return -1;

    for (let i = 0; i < Math.min(original.events.length, replayed.events.length); i++) {
      if (original.events[i].type !== replayed.events[i].type || 
          JSON.stringify(original.events[i].data) !== JSON.stringify(replayed.events[i].data)) {
        return i;
      }
    }

    return -1; // No divergence
  }

  /**
   * Get cost tracker
   */
  getCostTracker(): CostTracker {
    return this.costTracker;
  }
}

export default ReplayRecorder;
