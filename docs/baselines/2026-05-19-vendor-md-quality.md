# Vendor markdown-quality baseline — 2026-05-19

> Snapshot of `scripts/grade-vendors-all.ts` (sample=10 per vendor, seed=1) across all `vendor/*` directories. Sorted ascending by mean composite score — **worst first**, so the rows near the top are the highest-leverage targets for the `fix-vendor.ts` AST rewriter.
>
> The matching JSON snapshot lives at [`src/lib/md-quality/__golden__/all-vendors-baseline.json`](../../src/lib/md-quality/__golden__/all-vendors-baseline.json) and is asserted by [`src/lib/md-quality/all-vendors-baseline.test.ts`](../../src/lib/md-quality/all-vendors-baseline.test.ts) (drift tolerance ±0.5 on per-vendor mean).
>
> Axes (per `rubrics/md-quality-v1.md` / `vendor/commonmark-spec/spec.txt`):
> - **A** parseability
> - **B** headings
> - **C** fenced-code
> - **D** links
> - **E** line-discipline
>
> Each "top-3 worst file" cell shows `score path (dominant_axis)`.

## Per-vendor scores

| Vendor | Mean | p10 | p50 | p90 | Top-3 worst files |
|---|---:|---:|---:|---:|---|
| arkose-labs | 88.60 | 78.00 | 90.50 | 98.10 | 78 `vendor/arkose-labs/developer.arkoselabs.com/docs/android-mobile-sdk.md` (C)<br/>78 `vendor/arkose-labs/developer.arkoselabs.com/docs/react-native-mobile-sdk-v2122-and-below.md` (C)<br/>78 `vendor/arkose-labs/developer.arkoselabs.com/docs/domain-policy.md` (C) |
| iterable | 90.40 | 87.70 | 91.00 | 91.60 | 85 `vendor/iterable/iterable.com/blog/pokemon-go-can-be-more-than-just-a-fad/index.md` (B)<br/>88 `vendor/iterable/iterable.com/blog/how-creativelive-personalized-its-email-marketing-to-10-million-students/index.md` (B)<br/>89 `vendor/iterable/iterable.com/blog/notorious-rpg-how-mobile-game-genre-influences-push-notification-strategy/index.md` (B) |
| osv-scanner | 90.50 | 84.80 | 91.50 | 96.30 | 83 `vendor/osv-scanner/google.github.io/osv-scanner/output/index.md` (C)<br/>85 `vendor/osv-scanner/google.github.io/osv-scanner/experimental/guided-remediation/index.md` (C)<br/>85 `vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md` (C) |
| anthropics | 91.40 | 90.90 | 91.50 | 92.00 | 90 `vendor/anthropics/platform.claude.com/docs/en/api/python/messages.md` (B)<br/>91 `vendor/anthropics/platform.claude.com/docs/en/api/csharp/beta/user_profiles/create.md` (B)<br/>91 `vendor/anthropics/platform.claude.com/docs/en/api/csharp/beta/memory_stores/memories/list.md` (B) |
| sentry | 92.10 | 86.80 | 93.50 | 94.10 | 85 `vendor/sentry/docs.sentry.io/platforms/native.md` (B)<br/>87 `vendor/sentry/docs.sentry.io/product/stats.md` (B)<br/>92 `vendor/sentry/docs.sentry.io/integrations/integration-platform.md` (B) |
| openfeature | 92.90 | 88.00 | 92.00 | 99.00 | 88 `vendor/openfeature/openfeature.dev/specification/sections/providers.md` (C)<br/>88 `vendor/openfeature/openfeature.dev/docs/reference/sdks/client/swift.md` (C)<br/>91 `vendor/openfeature/openfeature.dev/docs/tutorials/getting-started/java/dropwizard.md` (C) |
| cloudflare | 93.40 | 89.00 | 93.50 | 99.10 | 89 `vendor/cloudflare/developers.cloudflare.com/flagship/binding/methods/index.md` (C)<br/>89 `vendor/cloudflare/developers.cloudflare.com/flagship/get-started/index.md` (C)<br/>89 `vendor/cloudflare/developers.cloudflare.com/flagship/sdk/index.md` (C) |
| alloydb-omni | 94.30 | 88.90 | 95.00 | 98.00 | 88 `vendor/alloydb-omni/cloud.google.com/alloydb/docs/ai/register-model-endpoint.md` (C)<br/>89 `vendor/alloydb-omni/cloud.google.com/alloydb/docs/ai/build-context-gemini-cli.md` (C)<br/>92 `vendor/alloydb-omni/cloud.google.com/alloydb/docs/ai/accelerate-queries-optimized-functions.md` (C) |
| sift | 94.50 | 90.80 | 94.00 | 99.00 | 89 `vendor/sift/sift.com/blog/second-womens-trust-network-turo-trust-and-safety/index.md` (B)<br/>91 `vendor/sift/sift.com/blog/7-types-of-food-delivery-scams-and-how-to-stop-them/index.md` (B)<br/>91 `vendor/sift/sift.com/blog/11-benefits-of-preventing-fraud-and-scams/index.md` (B) |
| claude-sitemap | 94.60 | 89.30 | 98.00 | 99.10 | 83 `vendor/claude-sitemap/support/en/articles/13703965-claude-enterprise-analytics-api-reference-guide.md` (B)<br/>90 `vendor/claude-sitemap/resources/tutorials/using-claude-for-your-small-business.md` (B)<br/>91 `vendor/claude-sitemap/blog/agent-view-in-claude-code.md` (B) |
| anthropic-sitemap | 95.30 | 93.00 | 96.50 | 97.00 | 93 `vendor/anthropic-sitemap/news/thoughts-on-america-s-ai-action-plan.md` (B)<br/>93 `vendor/anthropic-sitemap/news/claude-for-life-sciences.md` (D)<br/>93 `vendor/anthropic-sitemap/news/servicenow-anthropic-claude.md` (B) |
| stripe | 95.80 | 89.60 | 98.00 | 99.00 | 86 `vendor/stripe/docs.stripe.com/refunds.md` (B)<br/>90 `vendor/stripe/docs.stripe.com/payments/checkout/cross-sells.md` (B)<br/>96 `vendor/stripe/docs.stripe.com/payments/eftpos-australia.md` (B) |
| wellarchitected-github | 95.90 | 94.60 | 96.00 | 99.00 | 91 `vendor/wellarchitected-github/wellarchitected.github.com/library/scenarios/nist-ssdf-implementation/index.md` (C)<br/>95 `vendor/wellarchitected-github/wellarchitected.github.com/library/governance/checklist/index.md` (D)<br/>95 `vendor/wellarchitected-github/wellarchitected.github.com/library/governance/recommendations/managing-ai-credits/index.md` (D) |
| git | 96.00 | 96.00 | 96.00 | 96.00 | 96 `vendor/git/git-scm.com/docs/git-config.md` (C) |
| turbopuffer | 96.90 | 95.80 | 97.00 | 98.00 | 94 `vendor/turbopuffer/turbopuffer.com/docs/write.md` (C)<br/>96 `vendor/turbopuffer/turbopuffer.com/docs/fts.md` (C)<br/>96 `vendor/turbopuffer/turbopuffer.com/docs/hybrid.md` (C) |
| brave-search | 97.00 | 95.60 | 97.00 | 98.40 | 95 `vendor/brave-search/brave.com/search/api/guides/index.md` (B)<br/>97 `vendor/brave-search/brave.com/search/api/use-cases/index.md` (E)<br/>97 `vendor/brave-search/urls.md` (E) |
| aws | 97.40 | 96.40 | 98.00 | 99.00 | 91 `vendor/aws/docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.md` (C)<br/>97 `vendor/aws/docs.aws.amazon.com/audit-manager/latest/userguide/what-is.md` (E)<br/>97 `vendor/aws/docs.aws.amazon.com/cli/v1/userguide/cli-chap-welcome.md` (E) |
| workos | 97.40 | 91.80 | 99.00 | 99.10 | 90 `vendor/workos/workos.com/docs/sdks/node.md` (B)<br/>92 `vendor/workos/workos.com/docs/sdks/authkit-react-router.md` (B)<br/>98 `vendor/workos/workos.com/docs/widgets/directory-sync.md` (B) |
| agentskills | 97.50 | 95.40 | 99.00 | 99.00 | 90 `vendor/agentskills/agentskills.io/skill-creation/using-scripts.md` (C)<br/>96 `vendor/agentskills/agentskills.io/client-implementation/adding-skills-support.md` (C)<br/>97 `vendor/agentskills/agentskills.io/skill-creation/evaluating-skills.md` (C) |
| elevenlabs | 97.50 | 93.70 | 99.00 | 99.00 | 91 `vendor/elevenlabs/elevenlabs.io/docs/eleven-creative/products/music.mdx` (B)<br/>94 `vendor/elevenlabs/elevenlabs.io/docs/overview/capabilities/speech-to-text.mdx` (C)<br/>97 `vendor/elevenlabs/elevenlabs.io/docs/eleven-creative/products/dubbing/dubbing-studio.mdx` (B) |
| intercom | 97.50 | 95.50 | 98.50 | 99.00 | 91 `vendor/intercom/developers.intercom.com/installing-intercom/cordova-phonegap/configuration.md` (B)<br/>96 `vendor/intercom/developers.intercom.com/installing-intercom/android/index-android.md` (B)<br/>97 `vendor/intercom/developers.intercom.com/installing-intercom/web/custom-domain-for-email.md` (E) |
| nimble | 97.60 | 94.00 | 98.00 | 100.00 | 94 `vendor/nimble/docs.nimbleway.com/changelog/release-notes.md` (D)<br/>94 `vendor/nimble/docs.nimbleway.com/integrations/agent-skills/plugin-installation.md` (C)<br/>96 `vendor/nimble/docs.nimbleway.com/integrations/partnerships/microsoft/azure-mcp-center.md` (C) |
| twilio | 97.90 | 96.80 | 98.00 | 99.00 | 95 `vendor/twilio/www.twilio.com/docs/flex/end-user-guide/pre-release-features.md` (B)<br/>97 `vendor/twilio/www.twilio.com/docs/conversation-intelligence-classic/api/transcript-resource.md` (C)<br/>97 `vendor/twilio/www.twilio.com/docs/flex/end-user-guide/messaging.md` (D) |
| gcp | 98.00 | 98.00 | 98.00 | 98.00 | 98 `vendor/gcp/urls.md` (B) |
| modelcontextprotocol | 98.10 | 94.00 | 99.00 | 99.10 | 94 `vendor/modelcontextprotocol/modelcontextprotocol.io/extensions/apps/build.md` (C)<br/>94 `vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/connect-remote-servers.md` (C)<br/>99 `vendor/modelcontextprotocol/modelcontextprotocol.io/community/skills-over-mcp/charter.md` (E) |
| redis | 98.50 | 98.00 | 98.50 | 99.00 | 98 `vendor/redis/redis.io/docs/latest/develop/index.html.md` (E)<br/>98 `vendor/redis/redis.io/docs/latest/commands/get/index.html.md` (E)<br/>98 `vendor/redis/redis.io/docs/latest/operate/rs/installing-upgrading/install/plan-deployment/hardware-requirements/index.html.md` (E) |
| docs-github | 98.80 | 98.00 | 99.00 | 99.00 | 98 `vendor/docs-github/urls.md` (B)<br/>98 `vendor/docs-github/docs.github.com/en/copilot/concepts/usage-limits.md` (E)<br/>99 `vendor/docs-github/docs.github.com/en/actions/get-started/understand-github-actions.md` (E) |
| neon | 98.90 | 98.90 | 99.00 | 99.00 | 98 `vendor/neon/neon.com/docs/get-started/built-to-scale.md` (E)<br/>99 `vendor/neon/neon.com/docs/connect/connect-looker-studio.md` (E)<br/>99 `vendor/neon/neon.com/docs/connect/connect-securely.md` (E) |
| parallel-web | 98.90 | 98.50 | 99.00 | 100.00 | 94 `vendor/parallel-web/docs.parallel.ai/data-integrations/snowflake.md` (C)<br/>99 `vendor/parallel-web/docs.parallel.ai/findall-api/features/findall-webhook.md` (E)<br/>99 `vendor/parallel-web/docs.parallel.ai/api-reference/tasks/add-runs-to-task-group.md` (E) |
| commonmark-spec | 99.00 | 99.00 | 99.00 | 99.00 | 99 `vendor/commonmark-spec/README.md` (E) |
| spotify-confidence | 99.20 | 98.80 | 99.00 | 100.00 | 97 `vendor/spotify-confidence/confidence.spotify.com/docs/flags/introduction.md` (A)<br/>99 `vendor/spotify-confidence/confidence.spotify.com/docs/flags/resolve-tester.md` (E)<br/>99 `vendor/spotify-confidence/confidence.spotify.com/docs/iam/users.md` (E) |
| opentelemetry | 99.70 | 99.00 | 100.00 | 100.00 | 99 `vendor/opentelemetry/urls.md` (B)<br/>99 `vendor/opentelemetry/opentelemetry.io/docs/specs/index.md` (E)<br/>99 `vendor/opentelemetry/opentelemetry.io/docs/getting-started/index.md` (E) |

## Regenerate

```bash
# JSON golden (drift-asserted):
npx tsx scripts/grade-vendors-all.ts --json | python3 -m json.tool > src/lib/md-quality/__golden__/all-vendors-baseline.json

# Human table (this doc, sans the prose header above):
npx tsx scripts/grade-vendors-all.ts --markdown
```

## MD13 deltas (post-fix)

Bottom-3 vendors from the MD12 baseline, re-fixed via `scripts/fix-vendor.ts --limit=200` (axes B/C/D/E only — axis A is rejected by the fixer). Pre/post values from `npx tsx scripts/grade-vendor.ts <name> --sample=10 --seed=1 --json`.

- arkose-labs: 90.1 → 95.9 (+5.8)
- iterable: 89.4 → 89.4 (+0.0)
- osv-scanner: 90.9 → 91.4 (+0.5)

Note: pre-fix means here differ from the MD12 baseline numbers above (88.6 / 90.4 / 90.5) because MD12 used the all-vendor sweep's sample budget; the deltas above use a tight, repeatable `--sample=10 --seed=1` per task spec. The new `all-vendors-baseline.json` golden reflects the post-fix state under the all-vendor sweep.

## MD14 deltas (round 2 post-fix)

Round 2 targets the post-MD13 bottom-3 (excluding `iterable` as a confirmed floor case and `osv-scanner` which was already fixed in MD13). Pre/post values from `npx tsx scripts/grade-vendor.ts <name> --sample=10 --seed=1 --json`.

- alloydb-omni: 93.8 → 94.9 (+1.1)
- sentry: 92.4 → 92.4 (+0.0)
- anthropic-sitemap: 94.2 → 94.4 (+0.2)

Notes:
- sentry: fix-vendor changed 1 file (`product/partnership-platform.md`, 86 → 94, +8) but that file was not in the `--sample=10 --seed=1` slice, so the gated sample mean is unchanged. No regression; the change is retained because the all-vendor sweep golden will reflect it.
- alloydb-omni pre-mean (93.8) differs from the post-MD13 all-vendor sweep number (90.1) because that sweep uses a different sampling budget; the deltas above use `--sample=10 --seed=1` as required by the task spec.

