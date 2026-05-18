# Feature Tests (Iterations 11-14)

48 comprehensive tests for new Managed Agents features with citations and Polly.js replay.

## Test Organization

| Iteration | Focus | Tests | Features |
|-----------|-------|-------|----------|
| 11 | Files & Vaults | 12 | File operations, vault authentication |
| 12 | Environments & Outcomes | 12 | Cloud setup, agent outcomes |
| 13 | Skills, Dreams, Permissions | 18 | Skills, long-running sessions, RBAC |
| 14 | Webhooks, Memory, Replay | 18 | Webhooks, memory stores, **Polly.js replay** |

**Total**: 48 tests | **Pass Rate**: 100% target

## Key Feature: No API Keys

Iteration 14 demonstrates **Polly.js HTTP replay without API keys**:
- Record once (with credentials)
- Replay many times (no credentials)
- CI/CD safe (cassettes in git)
- Fast (disk-based cassettes)

## Running Tests

```bash
# All feature tests
npm test -- iterations-features

# Specific iteration
npm test -- iteration.11  # Files & Vaults
npm test -- iteration.12  # Environments & Outcomes
npm test -- iteration.13  # Skills, Dreams, Permissions
npm test -- iteration.14  # Webhooks, Memory, Replay (NO API KEYS)

# With coverage
npm test:coverage
```

## Test Structure

Each iteration includes:
- Official documentation citations
- Comprehensive test suites
- State verification
- Outcome tracking
- Result reporting

## Citations Included

All tests link to official documentation:
- https://platform.claude.com/docs/managed-agents/files.md
- https://platform.claude.com/docs/managed-agents/vaults.md
- https://platform.claude.com/docs/managed-agents/environments.md
- https://platform.claude.com/docs/managed-agents/define-outcomes.md
- https://platform.claude.com/docs/managed-agents/skills.md
- https://platform.claude.com/docs/managed-agents/dreams.md
- https://platform.claude.com/docs/managed-agents/permission-policies.md
- https://platform.claude.com/docs/managed-agents/webhooks.md
- https://platform.claude.com/docs/managed-agents/memory.md
- https://github.com/netflix/pollyjs (Replay)

---

See [.docs/guides/REPLAY_TESTING.md](../../guides/REPLAY_TESTING.md) for replay patterns.
