/**
 * Dreams - Long-Running Agent Sessions
 * 
 * Support for continuous, long-running agent processes
 */

export interface Dream {
  id: string;
  name: string;
  agentId: string;
  description: string;
  status: 'created' | 'running' | 'paused' | 'stopped' | 'error';
  startedAt: number;
  stoppedAt?: number;
  pausedAt?: number;
  resumedAt?: number;
  iterations: number;
  maxIterations?: number;
}

export interface DreamCheckpoint {
  id: string;
  dreamId: string;
  iteration: number;
  timestamp: number;
  state: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface DreamGoal {
  id: string;
  dreamId: string;
  description: string;
  status: 'pending' | 'achieved' | 'abandoned';
  completedAt?: number;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * DreamManager - Manages long-running agent dreams
 */
export class DreamManager {
  private dreams: Map<string, Dream> = new Map();
  private checkpoints: Map<string, DreamCheckpoint[]> = new Map();
  private goals: Map<string, DreamGoal[]> = new Map();

  /**
   * Create dream
   */
  createDream(dream: Omit<Dream, 'id' | 'startedAt' | 'iterations'>): Dream {
    const dreamWithMeta: Dream = {
      id: `dream_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...dream,
      startedAt: Date.now(),
      iterations: 0,
    };

    this.dreams.set(dreamWithMeta.id, dreamWithMeta);
    this.checkpoints.set(dreamWithMeta.id, []);
    this.goals.set(dreamWithMeta.id, []);

    return dreamWithMeta;
  }

  /**
   * Start dream
   */
  startDream(dreamId: string): boolean {
    const dream = this.dreams.get(dreamId);
    if (!dream) return false;

    dream.status = 'running';
    return true;
  }

  /**
   * Pause dream
   */
  pauseDream(dreamId: string): boolean {
    const dream = this.dreams.get(dreamId);
    if (!dream || dream.status !== 'running') return false;

    dream.status = 'paused';
    dream.pausedAt = Date.now();
    return true;
  }

  /**
   * Resume dream
   */
  resumeDream(dreamId: string): boolean {
    const dream = this.dreams.get(dreamId);
    if (!dream || dream.status !== 'paused') return false;

    dream.status = 'running';
    dream.resumedAt = Date.now();
    return true;
  }

  /**
   * Stop dream
   */
  stopDream(dreamId: string): boolean {
    const dream = this.dreams.get(dreamId);
    if (!dream) return false;

    dream.status = 'stopped';
    dream.stoppedAt = Date.now();
    return true;
  }

  /**
   * Record iteration
   */
  recordIteration(dreamId: string): boolean {
    const dream = this.dreams.get(dreamId);
    if (!dream) return false;

    dream.iterations++;

    if (dream.maxIterations && dream.iterations >= dream.maxIterations) {
      this.stopDream(dreamId);
    }

    return true;
  }

  /**
   * Create checkpoint
   */
  createCheckpoint(dreamId: string, state: Record<string, unknown>, metadata?: Record<string, unknown>): DreamCheckpoint {
    const dream = this.dreams.get(dreamId);
    if (!dream) throw new Error(`Dream not found: ${dreamId}`);

    const checkpoint: DreamCheckpoint = {
      id: `ckpt_${dreamId}_${Date.now()}`,
      dreamId,
      iteration: dream.iterations,
      timestamp: Date.now(),
      state,
      metadata: metadata || {},
    };

    const dreamCheckpoints = this.checkpoints.get(dreamId) || [];
    dreamCheckpoints.push(checkpoint);
    this.checkpoints.set(dreamId, dreamCheckpoints);

    return checkpoint;
  }

  /**
   * Get checkpoints
   */
  getCheckpoints(dreamId: string): DreamCheckpoint[] {
    return this.checkpoints.get(dreamId) || [];
  }

  /**
   * Restore from checkpoint
   */
  restoreFromCheckpoint(dreamId: string, checkpointId: string): DreamCheckpoint | undefined {
    const checkpoints = this.checkpoints.get(dreamId) || [];
    return checkpoints.find(c => c.id === checkpointId);
  }

  /**
   * Add goal to dream
   */
  addGoal(dreamId: string, description: string): DreamGoal {
    const goal: DreamGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      dreamId,
      description,
      status: 'pending',
    };

    const dreamGoals = this.goals.get(dreamId) || [];
    dreamGoals.push(goal);
    this.goals.set(dreamId, dreamGoals);

    return goal;
  }

  /**
   * Mark goal as achieved
   */
  achieveGoal(dreamId: string, goalId: string): boolean {
    const dreamGoals = this.goals.get(dreamId);
    if (!dreamGoals) return false;

    const goal = dreamGoals.find(g => g.id === goalId);
    if (!goal) return false;

    goal.status = 'achieved';
    goal.completedAt = Date.now();
    return true;
  }

  /**
   * Get dream
   */
  getDream(dreamId: string): Dream | undefined {
    return this.dreams.get(dreamId);
  }

  /**
   * List all dreams
   */
  listDreams(): Dream[] {
    return Array.from(this.dreams.values());
  }

  /**
   * Get agent dreams
   */
  getAgentDreams(agentId: string): Dream[] {
    return Array.from(this.dreams.values()).filter(d => d.agentId === agentId);
  }

  /**
   * Get running dreams
   */
  getRunningDreams(): Dream[] {
    return Array.from(this.dreams.values()).filter(d => d.status === 'running');
  }

  /**
   * Get dream duration
   */
  getDreamDuration(dreamId: string): number | undefined {
    const dream = this.dreams.get(dreamId);
    if (!dream) return undefined;

    const endTime = dream.stoppedAt || Date.now();
    return endTime - dream.startedAt;
  }

  /**
   * Get goals for dream
   */
  getDreamGoals(dreamId: string): DreamGoal[] {
    return this.goals.get(dreamId) || [];
  }

  /**
   * Calculate goal achievement rate
   */
  calculateGoalAchievementRate(dreamId: string): number {
    const goals = this.getDreamGoals(dreamId);
    if (goals.length === 0) return 0;

    const achieved = goals.filter(g => g.status === 'achieved').length;
    return achieved / goals.length;
  }
}

export default DreamManager;
