/**
 * Agent Orchestrator
 * 
 * Manages multiple agents, task decomposition, and inter-agent coordination
 */

import { ManagedAgentsClient, AgentConfig } from './client';
import { SessionManager, SessionState } from './sessions';

export interface AgentProfile {
  id: string;
  name: string;
  department: string;
  capabilities: string[];
  costCenter?: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedAgent?: string;
  subtasks: Task[];
  result?: unknown;
  cost: number;
}

export interface DecomposedTask {
  originalTaskId: string;
  subtasks: Task[];
  executionPlan: string[];
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * AgentOrchestrator - Manages agent lifecycle and task decomposition
 */
export class AgentOrchestrator {
  private client: ManagedAgentsClient;
  private sessionManager: SessionManager;
  private agents: Map<string, AgentProfile> = new Map();
  private tasks: Map<string, Task> = new Map();
  private taskCosts: Map<string, number> = new Map();

  constructor(client: ManagedAgentsClient, sessionManager: SessionManager) {
    this.client = client;
    this.sessionManager = sessionManager;
  }

  /**
   * Register an agent profile
   */
  registerAgent(profile: AgentProfile): void {
    this.agents.set(profile.id, profile);
  }

  /**
   * Get all registered agents
   */
  getAgents(): AgentProfile[] {
    return Array.from(this.agents.values());
  }

  /**
   * Decompose a task into subtasks
   */
  async decomposeTask(task: Task): Promise<DecomposedTask> {
    const subtasks: Task[] = [];

    // Simulate task decomposition
    const subtaskCount = Math.ceil(Math.random() * 3) + 1;
    for (let i = 0; i < subtaskCount; i++) {
      subtasks.push({
        id: `subtask_${task.id}_${i}`,
        name: `${task.name} - Part ${i + 1}`,
        description: `Subtask of ${task.name}`,
        status: 'pending',
        subtasks: [],
        cost: task.cost / subtaskCount,
      });
    }

    const executionPlan = subtasks.map(st => st.id);

    return {
      originalTaskId: task.id,
      subtasks,
      executionPlan,
    };
  }

  /**
   * Assign task to agent
   */
  async assignTask(agentId: string, task: Task): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    task.assignedAgent = agentId;
    task.status = 'in-progress';

    this.tasks.set(task.id, task);
    this.taskCosts.set(task.id, task.cost);

    return true;
  }

  /**
   * Execute task with agent
   */
  async executeTask(agentId: string, task: Task): Promise<Task> {
    const session = await this.sessionManager.createSession(agentId);

    try {
      const response = await this.sessionManager.sendMessage(session.id, task.description);

      task.result = response.content;
      task.status = 'completed';
    } catch (error) {
      task.status = 'failed';
    }

    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Get task by ID
   */
  getTask(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  /**
   * Get all tasks
   */
  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Get tasks by status
   */
  getTasksByStatus(status: Task['status']): Task[] {
    return Array.from(this.tasks.values()).filter(t => t.status === status);
  }

  /**
   * Calculate total cost for task
   */
  calculateTaskCost(taskId: string): number {
    return this.taskCosts.get(taskId) || 0;
  }

  /**
   * Get cost tracking by agent
   */
  getCostByAgent(): Map<string, number> {
    const costMap = new Map<string, number>();

    this.tasks.forEach(task => {
      if (task.assignedAgent) {
        const current = costMap.get(task.assignedAgent) || 0;
        costMap.set(task.assignedAgent, current + task.cost);
      }
    });

    return costMap;
  }
}

export default AgentOrchestrator;
