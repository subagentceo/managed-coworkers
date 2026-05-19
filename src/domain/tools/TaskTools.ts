import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Task model used by TaskCreate / TaskGet / TaskList / TaskUpdate. Grounded in hooks.md TaskCreated / TaskCompleted. */
export interface Task {
  readonly task_id: string;
  readonly task_subject: string;
  readonly task_description?: string;
  readonly status: "pending" | "in_progress" | "completed";
}

/** Source: tools-reference.md TaskCreate. */
export abstract class TaskCreateTool extends Tool<{ subject: string; description?: string }, Task> {
  protected constructor() { super({ name: ToolName.TaskCreate, requiresPermission: false }); }
}

export abstract class TaskGetTool extends Tool<{ task_id: string }, Task> {
  protected constructor() { super({ name: ToolName.TaskGet, requiresPermission: false }); }
}

export abstract class TaskListTool extends Tool<void, ReadonlyArray<Task>> {
  protected constructor() { super({ name: ToolName.TaskList, requiresPermission: false }); }
}

export abstract class TaskUpdateTool extends Tool<Partial<Task> & { task_id: string }, Task> {
  protected constructor() { super({ name: ToolName.TaskUpdate, requiresPermission: false }); }
}

export abstract class TaskStopTool extends Tool<{ task_id: string }, void> {
  protected constructor() { super({ name: ToolName.TaskStop, requiresPermission: false }); }
}
