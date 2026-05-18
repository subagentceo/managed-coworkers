# Changelog

All notable changes to this project are tracked here. This file is maintained
automatically by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

## [0.1.1](https://github.com/subagentceo/managed-coworkers/compare/knowledge-engineering-v0.1.0...knowledge-engineering-v0.1.1) (2026-05-18)


### Chores

* **ci:** canonicalize claude-* workflows + trim auto-rebase (ORM5) ([#9](https://github.com/subagentceo/managed-coworkers/issues/9)) ([55eff86](https://github.com/subagentceo/managed-coworkers/commit/55eff862cfc4fd758a51de6c8d54079c9e7dafa0))
* **ci:** canonicalize release-please.yml + strip Neon from cf-preview (ORM4) ([#7](https://github.com/subagentceo/managed-coworkers/issues/7)) ([58be3a7](https://github.com/subagentceo/managed-coworkers/commit/58be3a73f79352a02ef3df4f514717600dab4129))
* **ci:** remove dead CodeQL + Dependabot + Neon surfaces (ORM1) ([#3](https://github.com/subagentceo/managed-coworkers/issues/3)) ([f79d98c](https://github.com/subagentceo/managed-coworkers/commit/f79d98c3b221fbc83afc067bdb09d99f6ffdadff))
* **ci:** remove verify.yml — chain references deleted files (ORM3) ([#6](https://github.com/subagentceo/managed-coworkers/issues/6)) ([b64da4a](https://github.com/subagentceo/managed-coworkers/commit/b64da4af27dc49ec0a57c1b536b81dbacab281a7))
* remove plugins/ directory and dependent CI surfaces (ORM2) ([#5](https://github.com/subagentceo/managed-coworkers/issues/5)) ([d8c3a0f](https://github.com/subagentceo/managed-coworkers/commit/d8c3a0fa3680f39aa2e8c145b078336ed23b4fb9))

## [0.1.0] - 2026-05-09

### Features

- Four-lane knowledge bridge MCP server on MCP SDK v2
  (`src/mcp/bridge-server.ts`) with one lane module per source:
  - `anthropic.com/engineering` (`engineering_index`, `engineering_fetch`,
    `engineering_search`)
  - `claude.com/blog` (`blog_index`, `blog_fetch`, `blog_search`)
  - `support.claude.com` (`support_collections`, `support_collection`,
    `support_article`)
  - `llms.txt` namespaces (`llms_namespaces`, `llms_fetch`, `llms_grep`)
- Claude Agent SDK orchestrator (`src/agent/run.ts`) with one sub-agent per
  bridge; each sub-agent's tool surface is restricted to its lane.
- OAuth-only auth gate (`src/oauth/token.ts`): refuses to run if
  `ANTHROPIC_API_KEY` is set or no OAuth token is provided.
- Seed prompts in `seeds/prompts/` for the orchestrator and four bridge
  sub-agents.
- Mintlify documentation site (`docs/`) with one page per bridge plus
  reference pages for the MCP server, orchestrator, and OAuth contract.
- Session artifact (`docs/session-artifact.md`): how the original ten
  tool-family decomposition was rotated into four content-source bridges.

### Chores

- `release-please` configured for automated CHANGELOG + version bumps.
