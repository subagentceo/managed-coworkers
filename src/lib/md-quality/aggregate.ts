/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Aggregator (MD6).
 *
 * Sums the 5 axis results, clamps the composite to [0, 100], and
 * surfaces the top-5 violations sorted by points_lost desc.
 *
 * Pure function — no I/O. Same input → same output (deterministic).
 */

import type { AxisId, AxisResult, GradeResult, Violation } from "./types.js";

const AXIS_IDS: AxisId[] = ["A", "B", "C", "D", "E"];

export function aggregate(axes: AxisResult[]): GradeResult {
  const byAxis: Partial<Record<AxisId, AxisResult>> = {};
  for (const r of axes) byAxis[r.axis] = r;

  // Defensive: ensure every axis is present even if a caller skipped one.
  for (const id of AXIS_IDS) {
    if (!byAxis[id]) {
      byAxis[id] = { axis: id, max: 0, points_lost: 0, violations: [] };
    }
  }

  const breakdown: Record<AxisId, number> = {
    A: byAxis.A!.points_lost,
    B: byAxis.B!.points_lost,
    C: byAxis.C!.points_lost,
    D: byAxis.D!.points_lost,
    E: byAxis.E!.points_lost,
  };

  const total_lost = breakdown.A + breakdown.B + breakdown.C + breakdown.D + breakdown.E;
  const score = Math.max(0, Math.min(100, 100 - total_lost));

  const all: Violation[] = axes.flatMap((a) => a.violations);
  all.sort((a, b) => b.points_lost - a.points_lost);
  const top_violations = all.slice(0, 5);

  return {
    score,
    breakdown,
    axes: byAxis as Record<AxisId, AxisResult>,
    top_violations,
  };
}
