/**
 * Workflow Engine
 * 
 * Executes workflows as directed acyclic graphs (DAGs) with state management
 */

import * as crypto from 'crypto';

export interface WorkflowNode {
  id: string;
  name: string;
  type: 'task' | 'decision' | 'parallel' | 'sequential';
  inputs: string[];
  outputs: string[];
  retryPolicy?: { maxRetries: number; backoffMs: number };
}

export interface WorkflowEdge {
  from: string;
  to: string;
  condition?: string;
}

export interface WorkflowDAG {
  nodes: Map<string, WorkflowNode>;
  edges: WorkflowEdge[];
  startNode: string;
  endNode: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  nodeStates: Map<string, NodeState>;
  checkpoints: WorkflowCheckpoint[];
  events: WorkflowEvent[];
}

export interface NodeState {
  nodeId: string;
  inputs: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  startTime?: number;
  endTime?: number;
}

export interface WorkflowCheckpoint {
  id: string;
  nodeId: string;
  timestamp: number;
  state: Record<string, unknown>;
}

export interface WorkflowEvent {
  sequence: number;
  type: 'node_start' | 'node_complete' | 'node_failed' | 'checkpoint';
  timestamp: number;
  nodeId?: string;
  data?: Record<string, unknown>;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * WorkflowEngine - Executes workflows with DAG validation and state management
 */
export class WorkflowEngine {
  private executions: Map<string, WorkflowExecution> = new Map();
  private cache: Map<string, { result: unknown; hash: string; timestamp: number }> = new Map();

  /**
   * Validate workflow DAG
   */
  validateDAG(dag: WorkflowDAG): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check start and end nodes exist
    if (!dag.nodes.has(dag.startNode)) {
      errors.push(`Start node not found: ${dag.startNode}`);
    }
    if (!dag.nodes.has(dag.endNode)) {
      errors.push(`End node not found: ${dag.endNode}`);
    }

    // Check edge consistency
    dag.edges.forEach(edge => {
      if (!dag.nodes.has(edge.from)) {
        errors.push(`Edge from non-existent node: ${edge.from}`);
      }
      if (!dag.nodes.has(edge.to)) {
        errors.push(`Edge to non-existent node: ${edge.to}`);
      }
    });

    // Check for cycles
    if (this.hasCycle(dag)) {
      errors.push('Workflow contains a cycle');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Detect cycles in DAG using DFS
   */
  private hasCycle(dag: WorkflowDAG): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const visit = (nodeId: string): boolean => {
      if (recursionStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      recursionStack.add(nodeId);

      const edges = dag.edges.filter(e => e.from === nodeId);
      for (const edge of edges) {
        if (visit(edge.to)) return true;
      }

      recursionStack.delete(nodeId);
      return false;
    };

    for (const nodeId of dag.nodes.keys()) {
      if (!visited.has(nodeId) && visit(nodeId)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Create workflow execution
   */
  createExecution(workflowId: string, dag: WorkflowDAG): WorkflowExecution {
    const executionId = `exec_${workflowId}_${Date.now()}`;

    const nodeStates = new Map<string, NodeState>();
    dag.nodes.forEach((node, nodeId) => {
      nodeStates.set(nodeId, {
        nodeId,
        inputs: {},
        status: 'pending',
      });
    });

    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      status: 'running',
      nodeStates,
      checkpoints: [],
      events: [],
    };

    this.executions.set(executionId, execution);
    return execution;
  }

  /**
   * Execute a node
   */
  async executeNode(executionId: string, nodeId: string, inputs: Record<string, unknown>): Promise<Record<string, unknown>> {
    const execution = this.executions.get(executionId);
    if (!execution) throw new Error(`Execution not found: ${executionId}`);

    const nodeState = execution.nodeStates.get(nodeId);
    if (!nodeState) throw new Error(`Node not found: ${nodeId}`);

    // Check cache
    const inputHash = crypto.createHash('sha256').update(JSON.stringify(inputs)).digest('hex');
    const cached = this.cache.get(`${nodeId}_${inputHash}`);
    if (cached && (Date.now() - cached.timestamp) < 60000) {
      return cached.result as Record<string, unknown>;
    }

    nodeState.status = 'executing';
    nodeState.inputs = inputs;
    nodeState.startTime = Date.now();

    // Simulate node execution
    const outputs: Record<string, unknown> = {
      nodeId,
      timestamp: Date.now(),
      data: { processed: true, input_count: Object.keys(inputs).length },
    };

    nodeState.outputs = outputs;
    nodeState.status = 'completed';
    nodeState.endTime = Date.now();

    // Cache result
    this.cache.set(`${nodeId}_${inputHash}`, {
      result: outputs,
      hash: inputHash,
      timestamp: Date.now(),
    });

    execution.events.push({
      sequence: execution.events.length,
      type: 'node_complete',
      timestamp: Date.now(),
      nodeId,
      data: outputs,
    });

    return outputs;
  }

  /**
   * Create workflow checkpoint
   */
  createCheckpoint(executionId: string, nodeId: string): WorkflowCheckpoint {
    const execution = this.executions.get(executionId);
    if (!execution) throw new Error(`Execution not found: ${executionId}`);

    const nodeState = execution.nodeStates.get(nodeId);
    if (!nodeState) throw new Error(`Node not found: ${nodeId}`);

    const checkpoint: WorkflowCheckpoint = {
      id: `ckpt_${executionId}_${nodeId}`,
      nodeId,
      timestamp: Date.now(),
      state: {
        inputs: nodeState.inputs,
        outputs: nodeState.outputs,
        status: nodeState.status,
      },
    };

    execution.checkpoints.push(checkpoint);
    execution.events.push({
      sequence: execution.events.length,
      type: 'checkpoint',
      timestamp: Date.now(),
      nodeId,
      data: { checkpointId: checkpoint.id },
    });

    return checkpoint;
  }

  /**
   * Pause execution
   */
  pauseExecution(executionId: string): boolean {
    const execution = this.executions.get(executionId);
    if (!execution) return false;

    execution.status = 'paused';
    return true;
  }

  /**
   * Resume execution from checkpoint
   */
  resumeExecution(executionId: string, checkpointId: string): boolean {
    const execution = this.executions.get(executionId);
    if (!execution) return false;

    const checkpoint = execution.checkpoints.find(c => c.id === checkpointId);
    if (!checkpoint) return false;

    execution.status = 'running';
    return true;
  }

  /**
   * Get execution state
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * Topological sort of DAG
   */
  topologicalSort(dag: WorkflowDAG): string[] {
    const visited = new Set<string>();
    const stack: string[] = [];

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      dag.edges.filter(e => e.from === nodeId).forEach(e => visit(e.to));
      stack.push(nodeId);
    };

    dag.nodes.forEach((_, nodeId) => visit(nodeId));
    return stack;
  }
}

export default WorkflowEngine;
