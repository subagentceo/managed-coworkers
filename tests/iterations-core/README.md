# Core Feature Tests (Iterations 1-10)

264 comprehensive tests covering core Managed Agents features.

## Test Organization

| Iteration | Focus | Tests | Feature |
|-----------|-------|-------|---------|
| 1 | Client Initialization | 32 | Client setup & configuration |
| 2 | Session Lifecycle | 32 | Session management & streaming |
| 3 | MCP Connectors | 24 | MCP server integration |
| 4 | Replay Infrastructure | 28 | Recording & replay |
| 5 | Agent Orchestration | 32 | Multi-agent coordination |
| 6 | Multi-Agent Coordination | 28 | Inter-agent communication |
| 7 | Todo Integration | 36 | Task management |
| 8 | Workflow Engine | 36 | DAG execution |
| 9 | Production Integration | 36 | Real API usage |
| 10 | Platform Integration | 36 | 12-department ecosystem |

**Total**: 264 tests | **Pass Rate**: 100% target

## Running Tests

```bash
# All core tests
npm test -- iterations-core

# Specific iteration
npm test -- iteration.01
npm test -- iteration.07
npm test -- iteration.10

# With coverage
npm test:coverage
```

## Test Structure

Each iteration includes:
- Outcome definitions
- Multiple test suites (5-8 per iteration)
- State verification
- Result tracking
- Full rubric scoring

## Documentation

Each test file includes:
- Test purpose at top
- References to official documentation
- Detailed comments
- Result reporting

---

See [.docs/api/TESTS.md](.../..) for complete coverage details.
