/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Shared types for the md-quality grading library (MD1+).
 *
 * Each axis exports `score(tree, src): AxisResult`. The aggregator
 * sums points_lost across axes, clamps to [0, 100], and surfaces the
 * top 5 violations sorted by points_lost.
 */

export type AxisId = "A" | "B" | "C" | "D" | "E";

export interface Violation {
  /** Which rubric axis this violation rolls up to. */
  axis: AxisId;
  /** Sub-rule label, e.g. "A1", "B2". Matches rubrics/md-quality-v1.md tables. */
  rule: string;
  /** 1-based line in the source. 0 means "file-level". */
  line: number;
  /** Human-readable message — surfaces in MCP tool output. */
  msg: string;
  /** How many points this violation lost (0..max for the rule). */
  points_lost: number;
}

export interface AxisResult {
  axis: AxisId;
  /** Max points the axis can lose (= weight in the rubric). */
  max: number;
  /** Points lost on this file (0..max). */
  points_lost: number;
  /** All violations seen on this axis. */
  violations: Violation[];
}

export interface GradeResult {
  /** 0..100 composite score. */
  score: number;
  /** Per-axis points_lost. */
  breakdown: Record<AxisId, number>;
  /** Per-axis full results (for callers who want the violation lists). */
  axes: Record<AxisId, AxisResult>;
  /** Top 5 violations across all axes, sorted desc by points_lost. */
  top_violations: Violation[];
}
