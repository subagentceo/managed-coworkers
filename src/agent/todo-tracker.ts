// src/agent/todo-tracker.ts
//
// Watches the Agent SDK message stream and renders a unified progress view
// from Task* tool events (TaskCreate, TaskUpdate).
//
// Per code.claude.com/docs/en/agent-sdk/migrate-task-tools.md, as of
// TypeScript Agent SDK 0.3.142 / Claude Code v2.1.142, sessions emit
// the structured Task tools in both headless and interactive surfaces.
// TodoWrite is the legacy surface; this tracker no longer listens for it.
// To replay old session logs that still emit TodoWrite, use the legacy
// tracker at todo-tracker-legacy.ts (snapshot of the pre-migration code).
//
// Source pattern: code.claude.com/docs/en/agent-sdk/todo-tracking.md
// (always fetched as the .md variant, never the bare HTML page)

import { query } from "@anthropic-ai/claude-agent-sdk";

import { coerceColor, colorize, type Color } from "../lib/ansi-color.js";
import { getOpenFeatureClient } from "../lib/openfeature.js";

type Status = "pending" | "in_progress" | "completed";

interface Todo {
  id?: string;
  content: string;
  activeForm: string;
  status: Status;
}

const ICON: Record<Status, string> = {
  completed: "[x]",
  in_progress: "[~]",
  pending: "[ ]",
};

export class TodoTracker {
  private todos = new Map<string, Todo>();
  private order: string[] = [];
  private cachedColor: Color | null = null;

  /**
   * Phase 13.B+ (O6). Resolve the `color-code` flag (one of 8) via
   * OpenFeature. Cached per TodoTracker instance — render() may fire
   * many times during a single session and we don't want to evaluate
   * on every redraw. The cached value reflects the flag at first
   * render; subsequent flag changes require a new TodoTracker.
   */
  private async resolveColor(): Promise<Color> {
    if (this.cachedColor !== null) return this.cachedColor;
    const client = getOpenFeatureClient();
    const raw = await client.getStringValue("color-code", "cyan");
    this.cachedColor = coerceColor(raw);
    return this.cachedColor;
  }

  async display(): Promise<void> {
    if (this.todos.size === 0) return;
    const list = this.order.map((k) => this.todos.get(k)!).filter(Boolean);
    const completed = list.filter((t) => t.status === "completed").length;
    const inProgress = list.filter((t) => t.status === "in_progress").length;

    const color = await this.resolveColor();
    const isTty = process.stdout.isTTY === true;

    process.stdout.write(`\nProgress: ${completed}/${list.length} completed\n`);
    process.stdout.write(`Currently working on: ${inProgress} task(s)\n\n`);
    list.forEach((t, i) => {
      const text = t.status === "in_progress" ? t.activeForm : t.content;
      const icon = colorize(color, ICON[t.status], isTty);
      process.stdout.write(`${i + 1}. ${icon} ${text}\n`);
    });
  }

  /** Insert/update a single task (TaskCreate / TaskUpdate semantics). */
  private upsert(id: string, patch: Partial<Todo>): void {
    const existing = this.todos.get(id);
    if (existing) {
      this.todos.set(id, { ...existing, ...patch });
    } else {
      const next: Todo = {
        id,
        content: patch.content ?? "(no content)",
        activeForm: patch.activeForm ?? patch.content ?? "(no activeForm)",
        status: patch.status ?? "pending",
      };
      this.todos.set(id, next);
      this.order.push(id);
    }
  }

  async track(prompt: string, maxTurns = 20): Promise<void> {
    for await (const message of query({ prompt, options: { maxTurns } })) {
      if (message.type !== "assistant") continue;
      for (const block of message.message.content) {
        if (block.type !== "tool_use") continue;

        switch (block.name) {
          case "TaskCreate": {
            const t = block.input as Todo & { id: string };
            this.upsert(t.id, t);
            await this.display();
            break;
          }
          case "TaskUpdate": {
            const t = block.input as { id: string; status?: Status; content?: string };
            this.upsert(t.id, t);
            await this.display();
            break;
          }
          default:
            // ignore other tools
            break;
        }
      }
    }
  }
}

// CLI entry: `tsx src/agent/todo-tracker.ts "your prompt"`
if (import.meta.url === `file://${process.argv[1]}`) {
  const prompt = process.argv.slice(2).join(" ") || "Plan and execute a 3-step task with todos.";
  await new TodoTracker().track(prompt);
}
