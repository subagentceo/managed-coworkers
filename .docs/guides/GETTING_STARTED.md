# Getting Started with Managed Coworkers SDK

Quick setup guide to get running in 5 minutes.

## Prerequisites

- Node.js 18+
- npm 8+
- ~500MB disk space

## Installation

### Option 1: Automated Setup (Recommended)

```bash
./install.sh
```

This script will:
- Verify Node.js and npm
- Install all dependencies
- Build TypeScript
- Display key packages
- Prepare for testing

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Ready to use
npm test
```

---

## First Steps

### 1. Initialize Client

```typescript
import { ManagedAgentsClient } from './dist/index.js';

const client = new ManagedAgentsClient({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

await client.initialize();
```

### 2. Create Session

```typescript
import { SessionManager } from './dist/index.js';

const sessionManager = new SessionManager(client);
const session = await sessionManager.createSession('agent_001', 'user_123');
```

### 3. Send Message

```typescript
const response = await sessionManager.sendMessage(
  session.id,
  'Hello, agent!'
);

console.log(response.content);
```

---

## Run Tests

```bash
# All tests
npm test

# Specific iteration
npm test -- iteration.01

# With coverage
npm test:coverage

# Interactive UI
npm run test:ui
```

---

## Next Steps

- **For Examples**: See [examples/](../../examples/)
- **For API Reference**: See [.docs/api/](..)
- **For Replay Testing**: See [REPLAY_TESTING.md](./REPLAY_TESTING.md)
- **For Architecture**: See [.docs/architecture/](../architecture/)

---

**Time to First Test**: ~2 minutes  
**Time to First App**: ~30 minutes
