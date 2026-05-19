/**
 * Automation test (OCDM6).
 *
 * Asserts the AutomationKind discriminator round-trips through each concrete
 * Automation subclass:
 *   Loop      -> AutomationKind.Loop      (kind = "loop")
 *   CronTask  -> AutomationKind.CronTask  (kind = "cron_task")
 *   Routine   -> AutomationKind.Routine   (kind = "routine")
 *
 * Loop covers commands.md /loop (in-session repeat). CronTask covers the
 * CronCreate tool. Routine covers cloud-hosted routines per routines.md.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/commands.md
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 */
import { strict as assert } from "node:assert";
import { AutomationKind, RoutineTriggerKind } from "./../enums.js";
import { RoutineId } from "./../core/Identifier.js";
import { Automation } from "./Automation.js";
import { Loop } from "./Loop.js";
import { CronTask } from "./CronTask.js";
import { Routine, RoutineTrigger } from "./Routine.js";

// Concrete fixtures — Automation/Loop/CronTask/Routine are abstract, so each
// test fixture provides a no-op run() to make them instantiable.

class TestLoop extends Loop {
  public async run(): Promise<void> { /* no-op */ }
}

class TestCronTask extends CronTask {
  public async run(): Promise<void> { /* no-op */ }
}

class TestRoutine extends Routine {
  public async run(): Promise<void> { /* no-op */ }
}

const now = new Date("2026-05-18T00:00:00Z");

// Loop: in-session repeating prompt (commands.md /loop).
const loop = new TestLoop({
  id: "loop-1",
  prompt: "check the deploy",
  interval: "5m",
  enabled: true,
  createdAt: now,
});
assert.ok(loop instanceof Automation, "Loop is an Automation");
assert.equal(loop.automationKind, AutomationKind.Loop, "Loop reports AutomationKind.Loop");
assert.equal(loop.kind, "loop", "Loop overrides kind to 'loop'");
assert.equal(loop.interval, "5m");
assert.equal(loop.prompt, "check the deploy");
assert.equal(loop.enabled, true);
assert.equal(loop.id, "loop-1");
assert.equal(loop.createdAt.toISOString(), now.toISOString());

// Loop can self-pace (no interval).
const selfPaced = new TestLoop({
  id: "loop-2",
  prompt: "babysit prs",
  enabled: true,
  createdAt: now,
});
assert.equal(selfPaced.interval, undefined, "Self-paced loop has no interval");
assert.equal(selfPaced.automationKind, AutomationKind.Loop);

// CronTask: session-scoped scheduled prompt (CronCreate tool).
const cron = new TestCronTask({
  id: "cron-1",
  prompt: "summarize daily",
  schedule: "0 9 * * *",
  enabled: true,
  createdAt: now,
});
assert.ok(cron instanceof Automation, "CronTask is an Automation");
assert.equal(cron.automationKind, AutomationKind.CronTask, "CronTask reports AutomationKind.CronTask");
assert.equal(cron.kind, "cron_task", "CronTask overrides kind to 'cron_task'");
assert.equal(cron.schedule, "0 9 * * *");
assert.equal(cron.prompt, "summarize daily");

// Routine: cloud-hosted, multi-trigger (routines.md).
const trigger: RoutineTrigger = {
  kind: RoutineTriggerKind.Schedule,
  schedule: "every Monday 09:00",
};
const routine = new TestRoutine({
  id: "routine-1" as RoutineId,
  prompt: "review the vendor mirror",
  enabled: true,
  createdAt: now,
  repositories: ["subagentceo/managed-coworkers"],
  environment: "default",
  triggers: [trigger],
});
assert.ok(routine instanceof Automation, "Routine is an Automation");
assert.equal(routine.automationKind, AutomationKind.Routine, "Routine reports AutomationKind.Routine");
assert.equal(routine.kind, "routine", "Routine overrides kind to 'routine'");
assert.equal(routine.repositories.length, 1);
assert.equal(routine.repositories[0], "subagentceo/managed-coworkers");
assert.equal(routine.environment, "default");
assert.equal(routine.connectors.length, 0, "connectors defaults to empty array");
assert.equal(routine.triggers.length, 1);
assert.equal(routine.triggers[0].kind, RoutineTriggerKind.Schedule);
assert.equal(routine.allowUnrestrictedBranchPushes, false, "default is false");

// Discriminator round-trip: a function that switches on automationKind can
// recover the concrete subclass from a base Automation reference.
function classify(a: Automation): string {
  switch (a.automationKind) {
    case AutomationKind.Loop: return "loop";
    case AutomationKind.CronTask: return "cron";
    case AutomationKind.Routine: return "routine";
  }
}
assert.equal(classify(loop), "loop");
assert.equal(classify(cron), "cron");
assert.equal(classify(routine), "routine");

console.log("OCDM6 automation.test.ts: ok (3/3 subclasses map to correct AutomationKind)");
