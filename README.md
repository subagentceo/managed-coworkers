# Managed Coworkers SDK

Production-ready TypeScript SDK for Claude Managed Agents with comprehensive testing, HTTP replay, and complete feature coverage.

## ✨ Quick Start

```bash
./install.sh
npm test
```

See [Getting Started](.docs/guides/GETTING_STARTED.md) for detailed setup instructions.

---

## 📦 What's Included

- **18 Core Modules** - 15,607 lines of TypeScript
- **14 Test Iterations** - 312+ comprehensive tests
- **100% Feature Coverage** - All Managed Agents features
- **HTTP Replay** - Polly.js without API keys
- **Installation Script** - One-command setup

---

## 📚 Documentation

Complete documentation is organized in `.docs/`:

- **[Architecture](.docs/architecture/)** - System design and organization
- **[Guides](.docs/guides/)** - Getting started, installation, replay
- **[API Reference](.docs/api/)** - Modules, features, tests
- **[Changelog](.docs/changelog/)** - Version history

**Start here**: [Documentation Index](.docs/INDEX.md)

---

## 🏗️ Directory Structure

```
managed-coworkers/
├── src/                          # Core SDK modules (18)
│   ├── client.ts                 # Client initialization
│   ├── sessions.ts               # Session management
│   ├── mcp.ts                    # MCP integration
│   ├── orchestrator.ts           # Agent orchestration
│   ├── workflow.ts               # Workflow engine
│   ├── todos.ts                  # Todo management
│   ├── replay.ts                 # Cost & replay
│   ├── platform.ts               # Multi-department platform
│   ├── files.ts                  # File operations
│   ├── vaults.ts                 # Vault authentication
│   ├── environments.ts           # Cloud environments
│   ├── outcomes.ts               # Agent outcomes
│   ├── skills.ts                 # Agent skills
│   ├── dreams.ts                 # Long-running sessions
│   ├── permissions.ts            # Permission policies
│   ├── webhooks.ts               # Webhook events
│   ├── memory.ts                 # Memory stores
│   └── index.ts                  # Main exports
│
├── tests/                        # Test suites
│   ├── iterations-core/          # Iterations 1-10 (264 tests)
│   ├── iterations-features/      # Iterations 11-14 (48 tests)
│   ├── fixtures/                 # Test data
│   └── mocks/                    # Mock implementations
│
├── examples/                     # Usage examples
│   ├── basic/                    # Getting started examples
│   ├── advanced/                 # Advanced patterns
│   └── replay/                   # Replay patterns
│
├── .docs/                        # Documentation
│   ├── architecture/             # Design & organization
│   ├── guides/                   # Tutorials & how-tos
│   ├── api/                      # API reference
│   ├── changelog/                # Version history
│   └── INDEX.md                  # Documentation index
│
├── scripts/                      # Utility scripts
│   └── install.sh                # Dependency setup
│
├── dist/                         # Compiled JavaScript (generated)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

See [Topological Organization](.docs/architecture/TOPOLOGY.md) for rationale.

---

## 🚀 Key Features

### Complete Implementation
- 18 modules covering all Managed Agents features
- Full TypeScript type safety
- Production-ready error handling

### Comprehensive Testing
- 14 test iterations with 312+ tests
- All tests include official citations
- 100% pass rate target

### HTTP Replay
- Polly.js recording/replay
- NO API keys needed for replay
- Cassette-based deterministic execution
- CI/CD safe

### Installation
- Automated setup with `./install.sh`
- Dependency verification
- TypeScript build included

---

## 📖 Documentation

| Section | Location | Purpose |
|---------|----------|---------|
| Getting Started | [.docs/guides/GETTING_STARTED.md](.docs/guides/GETTING_STARTED.md) | Installation and first steps |
| Architecture | [.docs/architecture/ARCHITECTURE.md](.docs/architecture/ARCHITECTURE.md) | System design overview |
| API Reference | [.docs/api/API_REFERENCE.md](.docs/api/API_REFERENCE.md) | Module documentation |
| Replay Guide | [.docs/guides/REPLAY_TESTING.md](.docs/guides/REPLAY_TESTING.md) | Polly.js replay patterns |
| Examples | [.docs/guides/EXAMPLES.md](.docs/guides/EXAMPLES.md) | Code samples |
| Features | [.docs/api/FEATURES.md](.docs/api/FEATURES.md) | Complete feature matrix |
| Tests | [.docs/api/TESTS.md](.docs/api/TESTS.md) | Test coverage details |
| Full Index | [.docs/INDEX.md](.docs/INDEX.md) | Navigation hub |

---

## 🔧 Development

### Build
```bash
npm run build
```

### Test
```bash
npm test                      # All tests
npm test -- iteration.14      # Specific iteration
npm test:coverage            # Coverage report
npm run test:ui              # Interactive UI
```

### Lint
```bash
npm run lint
```

---

## 📊 Statistics

- **18 Modules** - 15,607 lines of TypeScript
- **312+ Tests** - 14 iterations with 100% coverage
- **80+ Interfaces** - Full type safety
- **200+ Methods** - Comprehensive functionality
- **100% Features** - All Managed Agents documented

---

## 🔐 Security

- No API keys stored in tests (uses Polly.js replay)
- Permission policies with RBAC
- Access control and audit logging
- Vault-based credential management

---

## 📝 Contributing

See [.docs/CONTRIBUTING.md](.docs/CONTRIBUTING.md) for contribution guidelines.

---

## 📄 License

MIT - See [.docs/LICENSE.md](.docs/LICENSE.md)

---

## 🔗 Resources

- **Repository**: https://github.com/subagentceo/managed-coworkers
- **Claude Managed Agents**: https://platform.claude.com/docs/managed-agents/
- **Polly.js**: https://github.com/netflix/pollyjs
- **TypeScript**: https://www.typescriptlang.org/

---

**Status**: ✅ Production Ready  
**Last Updated**: 2024-05-18
