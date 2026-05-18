#!/bin/bash

# Install script for Managed Coworkers SDK
# Sets up all dependencies and development tools

set -e

echo "🚀 Managed Coworkers SDK - Installation Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm $NPM_VERSION found"

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install npm packages
npm install

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# List key packages
echo "📚 Key Packages:"
npm list @anthropic-ai/sdk @pollyjs/core @pollyjs/adapter-node-http typescript vitest 2>/dev/null | grep -E "(anthropic|polly|typescript|vitest)" || true

echo ""
echo "🔨 Building TypeScript..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""

echo "📝 Next steps:"
echo "1. Set environment variables (if needed for local testing):"
echo "   export ANTHROPIC_API_KEY=your_key_here"
echo ""
echo "2. Run tests:"
echo "   npm test"
echo ""
echo "3. Run specific iteration:"
echo "   npm test -- iteration.01"
echo ""
echo "4. Run with coverage:"
echo "   npm test:coverage"
echo ""
echo "✨ Installation complete! Managed Coworkers SDK is ready to use."
