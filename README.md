# Managed Coworkers SDK

Complete TypeScript implementation of Claude Managed Agents with comprehensive test coverage (10 iterations, 264 tests).

## Overview

The Managed Coworkers SDK is a production-grade TypeScript implementation that provides:

- **Client Management**: Initialize and configure Claude Managed Agents clients
- **Session Lifecycle**: Create, manage, and archive agent sessions with streaming support
- **MCP Integration**: Integrate Model Context Protocol servers and tools
- **Agent Orchestration**: Manage multiple agents, task decomposition, and coordination
- **Workflow Engine**: Execute workflows as directed acyclic graphs (DAGs)
- **Todo Management**: Track tasks with atomic transactions and checkpoints
- **Cost Tracking**: Monitor API costs and resource usage per department
- **Deterministic Replay**: Record and replay execution with full audit trails
- **Platform Integration**: Manage 12-department ecosystem with cross-team collaboration

## Architecture

```
managed-coworkers/
├── src/
│   ├── client.ts            # Client initialization and configuration
│   ├── sessions.ts          # Session management with streaming
│   ├── mcp.ts               # MCP connector integration
│   ├── orchestrator.ts      # Agent orchestration and task decomposition
│   ├── workflow.ts          # Workflow engine with DAG validation
│   ├── todos.ts             # Todo management with atomicity
│   ├── replay.ts            # Cost tracking and deterministic replay
│   ├── platform.ts          # 12-department ecosystem
│   └── index.ts             # Main exports
├── tests/
│   ├── iteration.01.managed-agents-client.test.ts
│   ├── iteration.02.session-lifecycle.test.ts
│   ├── iteration.03.mcp-connectors.test.ts
│   ├── iteration.04.replay-infrastructure.test.ts
│   ├── iteration.05.agent-orchestration.test.ts
│   ├── iteration.06.multi-agent-coordination.test.ts
│   ├── iteration.07.todo-integration.test.ts
│   ├── iteration.08.workflow-engine.test.ts
│   ├── iteration.09.production-integration.test.ts
│   └── iteration.10.platform-integration.test.ts
├── package.json
└── tsconfig.json
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

Outputs compiled JavaScript to `dist/` directory.

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test:coverage

# Watch mode
npm test:watch
```

## Usage Examples

### Initialize Client

```typescript
import { ManagedAgentsClient } from './src/client';

const client = new ManagedAgentsClient({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

await client.initialize();
```

### Create Session and Send Messages

```typescript
import { SessionManager } from './src/sessions';

const sessionManager = new SessionManager(client);
const session = await sessionManager.createSession('agent_001', 'user_123');

const response = await sessionManager.sendMessage(session.id, 'Hello, agent!');
console.log(response.content);
```

### Use MCP Tools

```typescript
import { MCPConnector } from './src/mcp';

const mcp = new MCPConnector();

// Register an MCP server
mcp.registerServer({
  id: 'github',
  name: 'GitHub MCP',
  type: 'remote',
  tools: [
    {
      name: 'create_issue',
      description: 'Create a GitHub issue',
      inputSchema: { owner: 'string', repo: 'string', title: 'string' },
    },
  ],
});

// Get available tools
const tools = mcp.getAvailableTools();
```

### Orchestrate Multiple Agents

```typescript
import { AgentOrchestrator } from './src/orchestrator';

const orchestrator = new AgentOrchestrator(client, sessionManager);

orchestrator.registerAgent({
  id: 'agent_eng',
  name: 'Engineering Agent',
  department: 'engineering',
  capabilities: ['code_review', 'testing', 'documentation'],
});

const task = {
  id: 'task_001',
  name: 'Code Review',
  description: 'Review pull request changes',
  status: 'pending' as const,
  subtasks: [],
  cost: 0.05,
};

const decomposed = await orchestrator.decomposeTask(task);
await orchestrator.assignTask('agent_eng', task);
const result = await orchestrator.executeTask('agent_eng', task);
```

### Execute Workflows

```typescript
import { WorkflowEngine } from './src/workflow';

const engine = new WorkflowEngine();

const dag = {
  nodes: new Map([
    ['n1', { id: 'n1', name: 'Start', type: 'task' as const, inputs: [], outputs: [] }],
    ['n2', { id: 'n2', name: 'Process', type: 'task' as const, inputs: [], outputs: [] }],
  ]),
  edges: [{ from: 'n1', to: 'n2' }],
  startNode: 'n1',
  endNode: 'n2',
};

// Validate DAG
const validation = engine.validateDAG(dag);

// Create and execute
const execution = engine.createExecution('wf_001', dag);
const result = await engine.executeNode(execution.id, 'n1', {});
```

### Track Todos

```typescript
import { TodoManager } from './src/todos';

const todoManager = new TodoManager();

const todo = todoManager.createTodo(
  'Review PR #123',
  'Review the changes in pull request 123',
  { priority: 'high' }
);

todoManager.updateStatus(todo.id, 'in-progress');

const checkpoint = todoManager.createCheckpoint();
// ... do work ...
todoManager.updateStatus(todo.id, 'completed');
```

### Track Costs and Replay

```typescript
import { ReplayRecorder, CostTracker } from './src/replay';

const recorder = new ReplayRecorder();

const execution = recorder.startExecution('exec_001');
recorder.recordEvent('exec_001', 'api_call', { model: 'claude-3-5-sonnet', tokens: 100 });
recorder.recordCost('exec_001', 'api_call', 0.005);

const completed = recorder.completeExecution('exec_001', 'completed');

// Replay execution
const replayed = await recorder.replayExecution('exec_001');

// Detect divergence
const divergencePoint = recorder.detectDivergence('exec_001', replayed.id);
```

### Manage Platform

```typescript
import { PlatformIntegration } from './src/platform';

const platform = new PlatformIntegration();

const depts = platform.getDepartments();
console.log(`Platform has ${depts.length} departments`);

// Check budget status
const budgetStatus = platform.getBudgetStatus();
budgetStatus.forEach((status, deptId) => {
  console.log(`${deptId}: ${status.percentage.toFixed(1)}% of budget used`);
});

// Record security incident
platform.recordIncident({
  type: 'policy_violation',
  severity: 'high',
  department: 'dept_eng',
  description: 'Unauthorized data access attempt',
  timestamp: Date.now(),
  resolved: false,
});
```

## Test Coverage

### Iteration Breakdown

| Iteration | Focus | Tests | Weight |
|-----------|-------|-------|--------|
| 1 | Client Initialization | 32 | 20% |
| 2 | Session Lifecycle | 32 | 18% |
| 3 | MCP Connectors | 24 | - |
| 4 | Replay Infrastructure | 28 | - |
| 5 | Agent Orchestration | 32 | 20% |
| 6 | Multi-Agent Coordination | 28 | 18% |
| 7 | Todo Integration | 36 | 16% |
| 8 | Workflow Engine | 36 | 18% |
| 9 | Production Integration | 36 | 16% |
| 10 | Platform Integration | 36 | 12% |

**Total**: 264 tests with comprehensive coverage

### Key Features Tested

- ✅ SDK client initialization with @anthropic-ai/sdk
- ✅ Session lifecycle (create, stream, archive, delete)
- ✅ MCP server discovery and tool execution
- ✅ Deterministic replay infrastructure
- ✅ Agent orchestration and task decomposition
- ✅ Multi-agent coordination and handoffs
- ✅ Todo management with atomic transactions
- ✅ Workflow DAG validation and execution
- ✅ Real API calls to Claude with cost tracking
- ✅ 12-department ecosystem with cross-team collaboration

## Key Concepts

### Deterministic Replay

The SDK supports deterministic replay of execution sequences for testing and debugging:

```typescript
// Record execution
const execution = recorder.startExecution('exec_001');
recorder.recordEvent('exec_001', 'api_call', { ... });
recorder.recordCost('exec_001', 'api_call', 0.005);
recorder.completeExecution('exec_001');

// Replay with identical results
const replayed = await recorder.replayExecution('exec_001');

// Verify consistency
const divergence = recorder.detectDivergence('exec_001', replayed.id);
```

### Workflow DAG Execution

Execute workflows as directed acyclic graphs with validation:

```typescript
// Validate DAG for cycles and connectivity
const validation = engine.validateDAG(dag);

// Execute with state management
const execution = engine.createExecution('wf_001', dag);
await engine.executeNode(execution.id, 'node_1', inputs);

// Create checkpoints for pause/resume
const checkpoint = engine.createCheckpoint(execution.id, 'node_1');
engine.pauseExecution(execution.id);
engine.resumeExecution(execution.id, checkpoint.id);
```

### Atomic Todo Transactions

Manage todos with transaction semantics:

```typescript
todoManager.beginTransaction();
try {
  todoManager.updateStatus(todo1.id, 'completed');
  todoManager.updateStatus(todo2.id, 'in-progress');
  todoManager.commitTransaction();
} catch (error) {
  todoManager.rollbackTransaction();
}
```

### Multi-Department Platform

Manage 12-department ecosystem with cross-team collaboration:

```typescript
const depts = platform.getDepartments(); // All 12 departments

// Check data sharing permissions
const canShare = platform.canShareData(sourceDept, targetDept, 'CONFIDENTIAL');

// Track metrics by department
const metrics = platform.getMetrics('dept_eng');

// Monitor security incidents
platform.recordIncident({...});
const incidents = platform.getIncidentsByDepartment('dept_eng');
```

## Configuration

Set environment variables:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

## Production Considerations

- All SDK methods are async-safe
- Full TypeScript type coverage
- Comprehensive error handling
- Deterministic clock for testing
- Cost tracking at function level
- Audit trail support via replay
- Cross-team permission validation

## API Documentation

Full API documentation available in `src/` module exports:

```typescript
export {
  ManagedAgentsClient,
  SessionManager,
  MCPConnector,
  AgentOrchestrator,
  WorkflowEngine,
  TodoManager,
  CostTracker,
  DeterministicClock,
  ReplayRecorder,
  PlatformIntegration,
}
```

## License

MIT

## Contributing

Contributions welcome. Please submit PRs to the subagentceo/managed-coworkers repository.

---

**Repository**: https://github.com/subagentceo/managed-coworkers  
**Latest Commit**: `365a298` - Full TypeScript implementation with 10 test iterations
