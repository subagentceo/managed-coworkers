# Architecture & Topological Organization

Docker Well-Architected Code Principles applied to Managed Coworkers SDK.

## 🏗️ Principles

### 1. Separation of Concerns
- **src/** - Core SDK implementation only
- **tests/** - Test suites organized by purpose
- **.docs/** - All documentation centralized
- **examples/** - Usage patterns and samples
- **scripts/** - Utility and automation scripts

### 2. Modular Organization
- Each module is self-contained
- Clear interfaces between modules
- Minimal cross-module dependencies
- Hierarchical arrangement by functionality

### 3. Clear Topological Order

```
Foundation Layer (Core Types)
├── src/index.ts                 # Main exports
└── src/client.ts                # Base client

Infrastructure Layer
├── src/sessions.ts              # Session management
├── src/replay.ts                # Recording & replay
└── src/mcp.ts                   # MCP integration

Feature Layer
├── src/files.ts                 # File operations
├── src/vaults.ts                # Authentication
├── src/environments.ts          # Cloud setup
├── src/outcomes.ts              # Outcome tracking
├── src/skills.ts                # Agent skills
├── src/memory.ts                # Memory stores
├── src/webhooks.ts              # Event delivery
└── src/permissions.ts           # Access control

Business Logic Layer
├── src/todos.ts                 # Todo management
├── src/orchestrator.ts          # Agent orchestration
├── src/workflow.ts              # Workflow execution
└── src/dreams.ts                # Long-running sessions

Platform Layer
└── src/platform.ts              # 12-department ecosystem
```

### 4. Test Organization by Category

**Iterations 1-10**: Core Features
```
tests/iterations-core/
├── iteration.01.managed-agents-client.test.ts
├── iteration.02.session-lifecycle.test.ts
├── iteration.03.mcp-connectors.test.ts
├── iteration.04.replay-infrastructure.test.ts
├── iteration.05.agent-orchestration.test.ts
├── iteration.06.multi-agent-coordination.test.ts
├── iteration.07.todo-integration.test.ts
├── iteration.08.workflow-engine.test.ts
├── iteration.09.production-integration.test.ts
└── iteration.10.platform-integration.test.ts
```

**Iterations 11-14**: New Features
```
tests/iterations-features/
├── iteration.11.file-operations-vaults.test.ts
├── iteration.12.environments-outcomes.test.ts
├── iteration.13.skills-dreams-permissions.test.ts
└── iteration.14.webhooks-memory-replay.test.ts
```

### 5. Documentation Hierarchy

```
.docs/
├── INDEX.md                     # Navigation hub
├── architecture/
│   ├── ARCHITECTURE.md          # System design
│   └── TOPOLOGY.md              # This file
├── guides/
│   ├── GETTING_STARTED.md       # First steps
│   ├── INSTALLATION.md          # Setup guide
│   ├── REPLAY_TESTING.md        # Replay patterns
│   └── EXAMPLES.md              # Code samples
├── api/
│   ├── API_REFERENCE.md         # Module docs
│   ├── FEATURES.md              # Feature matrix
│   ├── MODULES.md               # Module index
│   └── TESTS.md                 # Test coverage
├── changelog/
│   └── CHANGELOG.md             # Version history
└── CONTRIBUTING.md              # Contribution guidelines
```

### 6. Examples by Complexity

```
examples/
├── basic/
│   ├── 01-client-initialization.ts
│   ├── 02-session-management.ts
│   ├── 03-message-sending.ts
│   └── 04-file-operations.ts
├── advanced/
│   ├── multi-agent-orchestration.ts
│   ├── workflow-execution.ts
│   ├── permission-policies.ts
│   └── replay-testing.ts
└── replay/
    ├── recording-cassettes.ts
    ├── replaying-cassettes.ts
    └── ci-cd-patterns.ts
```

---

## 📊 Dependency Graph

```
Platform Layer
    ↑
    ├─ Business Logic Layer
    │   ├─ Feature Layer
    │   │   ├─ Infrastructure Layer
    │   │   │   ├─ Foundation Layer
    │   │   │   └─ Core Types
```

### Layer Dependencies

**Foundation**
- No dependencies on other modules
- Exports core types and client

**Infrastructure**
- Depends: Foundation
- Provides: Session management, MCP integration, replay

**Features**
- Depends: Infrastructure
- Provides: File operations, auth, environments, etc.

**Business Logic**
- Depends: Infrastructure + Features
- Provides: Todo management, orchestration, workflows

**Platform**
- Depends: All lower layers
- Provides: Multi-department ecosystem

---

## 🎯 Benefits of This Organization

### For Users
- Easy to find documentation
- Clear examples by complexity
- Logical module organization
- Quick access to getting started

### For Developers
- Clear separation of concerns
- Minimal cross-dependencies
- Easy to extend modules
- Topological ordering prevents circular deps

### For Maintainers
- Centralized documentation
- Organized test structure
- Grouped examples by use case
- Clear version history

### For Contributors
- Known where to add code
- Clear guidelines and structure
- Examples for patterns
- Organized test suites

---

## 📁 Root Files (Minimal)

```
managed-coworkers/
├── README.md                    # Overview & quick start
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── install.sh                   # Setup script
└── .gitignore
```

**Rationale**: Root is clean and minimal. All detailed information lives in `.docs/`.

---

## 🔄 File Organization Rules

### Add to src/
- Core SDK modules only
- Business logic and features
- Type definitions

### Add to tests/
- Test files by iteration
- Test fixtures and mocks
- Test configuration

### Add to examples/
- Working code samples
- Usage patterns
- Integration examples

### Add to .docs/
- All documentation
- Architecture decisions
- API reference
- Guides and tutorials

### Add to scripts/
- Automation scripts
- Build utilities
- Deployment helpers

---

## ✅ Well-Architected Checklist

- [x] Clear separation of concerns
- [x] Modular organization
- [x] Topological ordering
- [x] Centralized documentation
- [x] Minimal root directory
- [x] Organized test structure
- [x] Grouped examples
- [x] Dependency hierarchy
- [x] Clear navigation
- [x] Scalable structure

---

## 📖 Further Reading

- [Architecture Overview](./ARCHITECTURE.md)
- [Getting Started](./../guides/GETTING_STARTED.md)
- [Contributing](./../CONTRIBUTING.md)

---

**Organization Pattern**: Docker Well-Architected Code  
**Last Updated**: 2024-05-18
