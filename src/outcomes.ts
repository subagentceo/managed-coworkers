/**
 * Agent Outcomes
 * 
 * Define and track outcomes for agent behavior
 */

export interface Outcome {
  id: string;
  name: string;
  description: string;
  successCriteria: string[];
  weight: number; // 0-1, used for composite scoring
  measurable: boolean;
  evaluationType: 'binary' | 'score' | 'threshold';
}

export interface OutcomeResult {
  outcomeId: string;
  agentId: string;
  sessionId: string;
  achieved: boolean;
  score: number; // 0-1
  evidence: Record<string, unknown>;
  timestamp: number;
  evaluatedBy: string; // human or 'auto'
}

export interface CompositeScore {
  agentId: string;
  sessionId: string;
  outcomes: Outcome[];
  results: OutcomeResult[];
  compositeScore: number; // weighted average
  gradeLevel: string; // A, B, C, D, F
  timestamp: number;
}

/**
 * OutcomeManager - Defines and tracks agent outcomes
 */
export class OutcomeManager {
  private outcomes: Map<string, Outcome> = new Map();
  private results: Map<string, OutcomeResult> = new Map();
  private agentOutcomes: Map<string, string[]> = new Map(); // agentId -> outcomeIds

  /**
   * Define outcome
   */
  defineOutcome(outcome: Omit<Outcome, 'id'>): Outcome {
    const outcomeWithId: Outcome = {
      id: `outcome_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...outcome,
    };

    this.outcomes.set(outcomeWithId.id, outcomeWithId);
    return outcomeWithId;
  }

  /**
   * Assign outcome to agent
   */
  assignOutcomeToAgent(agentId: string, outcomeId: string): boolean {
    if (!this.outcomes.has(outcomeId)) return false;

    if (!this.agentOutcomes.has(agentId)) {
      this.agentOutcomes.set(agentId, []);
    }

    const outcomeIds = this.agentOutcomes.get(agentId)!;
    if (!outcomeIds.includes(outcomeId)) {
      outcomeIds.push(outcomeId);
    }

    return true;
  }

  /**
   * Record outcome result
   */
  recordResult(result: Omit<OutcomeResult, 'id' | 'timestamp'>): OutcomeResult {
    const resultWithMeta: OutcomeResult = {
      ...result,
      timestamp: Date.now(),
    };

    const resultId = `result_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    this.results.set(resultId, resultWithMeta);

    return resultWithMeta;
  }

  /**
   * Get outcomes for agent
   */
  getAgentOutcomes(agentId: string): Outcome[] {
    const outcomeIds = this.agentOutcomes.get(agentId) || [];
    return outcomeIds
      .map(id => this.outcomes.get(id))
      .filter((o): o is Outcome => !!o);
  }

  /**
   * Calculate composite score
   */
  calculateCompositeScore(agentId: string, sessionId: string): CompositeScore {
    const agentOutcomes = this.getAgentOutcomes(agentId);
    const sessionResults = Array.from(this.results.values()).filter(
      r => r.agentId === agentId && r.sessionId === sessionId
    );

    let totalWeight = 0;
    let weightedScore = 0;

    agentOutcomes.forEach(outcome => {
      const result = sessionResults.find(r => r.outcomeId === outcome.id);
      const score = result?.score || 0;

      weightedScore += outcome.weight * score;
      totalWeight += outcome.weight;
    });

    const compositeScore = totalWeight > 0 ? weightedScore / totalWeight : 0;
    const gradeLevel = this.scoreToGrade(compositeScore);

    return {
      agentId,
      sessionId,
      outcomes: agentOutcomes,
      results: sessionResults,
      compositeScore,
      gradeLevel,
      timestamp: Date.now(),
    };
  }

  /**
   * Convert score to letter grade
   */
  private scoreToGrade(score: number): string {
    if (score >= 0.95) return 'A';
    if (score >= 0.85) return 'B';
    if (score >= 0.75) return 'C';
    if (score >= 0.65) return 'D';
    return 'F';
  }

  /**
   * Get outcome by ID
   */
  getOutcome(outcomeId: string): Outcome | undefined {
    return this.outcomes.get(outcomeId);
  }

  /**
   * List all outcomes
   */
  listOutcomes(): Outcome[] {
    return Array.from(this.outcomes.values());
  }

  /**
   * Get results for outcome
   */
  getOutcomeResults(outcomeId: string): OutcomeResult[] {
    return Array.from(this.results.values()).filter(r => r.outcomeId === outcomeId);
  }

  /**
   * Delete outcome
   */
  deleteOutcome(outcomeId: string): boolean {
    this.agentOutcomes.forEach((outcomeIds, agentId) => {
      const index = outcomeIds.indexOf(outcomeId);
      if (index >= 0) {
        outcomeIds.splice(index, 1);
      }
    });

    return this.outcomes.delete(outcomeId);
  }
}

export default OutcomeManager;
