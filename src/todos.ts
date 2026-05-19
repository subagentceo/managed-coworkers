/**
 * Todo Management
 * 
 * Manages todos created from task decomposition with status tracking
 */

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dependencies: string[];
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  metadata: Record<string, unknown>;
}

export interface TodoCheckpoint {
  id: string;
  todos: TodoItem[];
  timestamp: number;
  hash: string;
}

export interface TodoTransaction {
  id: string;
  status: 'begin' | 'commit' | 'rollback';
  affectedTodos: string[];
  timestamp: number;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * TodoManager - Manages todo creation, tracking, and atomicity
 */
export class TodoManager {
  private todos: Map<string, TodoItem> = new Map();
  private checkpoints: Map<string, TodoCheckpoint> = new Map();
  private transactions: TodoTransaction[] = [];
  private currentTransaction?: TodoTransaction;

  /**
   * Create a new todo
   */
  createTodo(title: string, description: string, metadata?: Record<string, unknown>): TodoItem {
    const todo: TodoItem = {
      id: `todo_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      title,
      description,
      status: 'pending',
      dependencies: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      metadata: metadata || {},
    };

    this.todos.set(todo.id, todo);
    return todo;
  }

  /**
   * Add dependency between todos
   */
  addDependency(todoId: string, dependsOnId: string): boolean {
    const todo = this.todos.get(todoId);
    const dependency = this.todos.get(dependsOnId);

    if (!todo || !dependency) return false;

    if (!todo.dependencies.includes(dependsOnId)) {
      todo.dependencies.push(dependsOnId);
    }

    return true;
  }

  /**
   * Detect cycles in dependencies
   */
  detectDependencyCycles(): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (todoId: string, path: string[]): string[] | null => {
      if (recursionStack.has(todoId)) {
        return path;
      }
      if (visited.has(todoId)) {
        return null;
      }

      visited.add(todoId);
      recursionStack.add(todoId);
      path.push(todoId);

      const todo = this.todos.get(todoId);
      if (todo) {
        for (const depId of todo.dependencies) {
          const cycle = hasCycle(depId, [...path]);
          if (cycle) return cycle;
        }
      }

      recursionStack.delete(todoId);
      return null;
    };

    for (const todoId of this.todos.keys()) {
      visited.clear();
      recursionStack.clear();
      const cycle = hasCycle(todoId, []);
      if (cycle) cycles.push(cycle);
    }

    return cycles;
  }

  /**
   * Update todo status
   */
  updateStatus(todoId: string, status: TodoItem['status']): boolean {
    const todo = this.todos.get(todoId);
    if (!todo) return false;

    todo.status = status;
    todo.updatedAt = Date.now();

    if (status === 'completed') {
      todo.completedAt = Date.now();
    }

    return true;
  }

  /**
   * Begin atomic transaction
   */
  beginTransaction(): TodoTransaction {
    const transaction: TodoTransaction = {
      id: `txn_${Date.now()}`,
      status: 'begin',
      affectedTodos: [],
      timestamp: Date.now(),
    };

    this.currentTransaction = transaction;
    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Commit transaction
   */
  commitTransaction(): boolean {
    if (!this.currentTransaction) return false;

    this.currentTransaction.status = 'commit';
    this.currentTransaction = undefined;
    return true;
  }

  /**
   * Rollback transaction
   */
  rollbackTransaction(): boolean {
    if (!this.currentTransaction) return false;

    this.currentTransaction.status = 'rollback';
    this.currentTransaction = undefined;
    return true;
  }

  /**
   * Create checkpoint
   */
  createCheckpoint(): TodoCheckpoint {
    const checkpoint: TodoCheckpoint = {
      id: `ckpt_${Date.now()}`,
      todos: Array.from(this.todos.values()),
      timestamp: Date.now(),
      hash: '',
    };

    checkpoint.hash = this.calculateHash(checkpoint.todos);
    this.checkpoints.set(checkpoint.id, checkpoint);

    return checkpoint;
  }

  /**
   * Restore from checkpoint
   */
  restoreFromCheckpoint(checkpointId: string): boolean {
    const checkpoint = this.checkpoints.get(checkpointId);
    if (!checkpoint) return false;

    this.todos.clear();
    checkpoint.todos.forEach(todo => {
      this.todos.set(todo.id, { ...todo });
    });

    return true;
  }

  /**
   * Get todo by ID
   */
  getTodo(todoId: string): TodoItem | undefined {
    return this.todos.get(todoId);
  }

  /**
   * Get all todos
   */
  getAllTodos(): TodoItem[] {
    return Array.from(this.todos.values());
  }

  /**
   * Get todos by status
   */
  getTodosByStatus(status: TodoItem['status']): TodoItem[] {
    return Array.from(this.todos.values()).filter(t => t.status === status);
  }

  /**
   * Calculate hash of todos
   */
  private calculateHash(todos: TodoItem[]): string {
    const crypto = require('crypto');
    const content = JSON.stringify(todos);
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}

export default TodoManager;
