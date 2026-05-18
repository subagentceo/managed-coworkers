# Installation Guide

Complete step-by-step installation and configuration.

## System Requirements

| Requirement | Version |
|------------|---------|
| Node.js | 18.x or higher |
| npm | 8.x or higher |
| Git | 2.30+ |
| Disk Space | 500MB+ |

---

## Installation Methods

### Method 1: Automated (Recommended)

The `install.sh` script handles everything:

```bash
./install.sh
```

**What it does:**
1. Checks Node.js version (18+)
2. Checks npm version (8+)
3. Installs npm dependencies
4. Runs TypeScript build
5. Displays installation summary
6. Ready to test

**Time**: ~2-3 minutes

### Method 2: Manual Installation

```bash
# Step 1: Install dependencies
npm install

# Step 2: Build TypeScript
npm run build

# Step 3: Verify installation
npm test
```

**Time**: ~3-5 minutes

---

## Dependency Installation

### Core Dependencies
- `@anthropic-ai/sdk` - Claude API client
- `typescript` - TypeScript compiler
- `vitest` - Test framework

### Replay Dependencies (Polly.js)
- `@pollyjs/core` - HTTP recording/replay
- `@pollyjs/adapter-node-http` - Node.js adapter
- `@pollyjs/persister-fs` - File persistence

### Dev Dependencies
- `@types/node` - Node.js types
- `@typescript-eslint/*` - Linting
- `@vitest/coverage-v8` - Coverage reporting
- `@vitest/ui` - Test UI

### Install Specific Packages

```bash
# Core only
npm install --no-save-dev

# Dev tools
npm install --save-dev

# Replay libraries (included by default)
npm install @pollyjs/core @pollyjs/adapter-node-http @pollyjs/persister-fs
```

---

## Verification

After installation, verify everything works:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# List installed packages
npm list --depth=0

# Run a quick test
npm test -- iteration.01 --run
```

---

## Troubleshooting

### Node.js Version Error
```
Error: Node.js version < 18 required
```
**Solution**: Install Node.js 18 or higher
```bash
# Using nvm
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### npm Install Fails
```
npm ERR! code ERESOLVE
```
**Solution**: Try legacy dependencies
```bash
npm install --legacy-peer-deps
```

### Port Already in Use
```
Error: Port 3000 already in use
```
**Solution**: Use different port or kill existing process
```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Build Errors
```
error TS2307: Cannot find module
```
**Solution**: Rebuild TypeScript
```bash
npm run clean
npm run build
```

---

## Development Setup

### IDE Configuration

**VS Code** - Install extensions:
- ESLint
- Prettier
- TypeScript Vue Plugin

**WebStorm** - Enable:
- TypeScript support
- ESLint integration
- Prettier formatting

### Git Configuration

```bash
# Set up git hooks
git config core.hooksPath .git/hooks

# Configure commit signing (optional)
git config commit.gpgsign true
```

---

## Environment Variables

### Development
```bash
# Optional - only needed for recording new cassettes
export ANTHROPIC_API_KEY=sk-...
```

### Testing
```bash
# For CI/CD, cassettes are used (no API key needed)
# No environment variables required
```

### Production
See [.docs/guides/EXAMPLES.md](./EXAMPLES.md) for production setup.

---

## Next Steps

1. **Quick Start**: See [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Run Tests**: `npm test`
3. **Try Examples**: See [examples/](../../examples/)
4. **Read Docs**: See [.docs/INDEX.md](../INDEX.md)

---

**Last Updated**: 2024-05-18
