# MulmoChat Plugin

A plugin for [MulmoChat](https://github.com/receptron/MulmoChat) - a multi-modal voice chat application with OpenAI's GPT-4 Realtime API.

## What this plugin does

Displays and summarizes uploaded PDF documents.

## Installation

```bash
yarn add @mulmochat-plugin/summarize-pdf
```

## Usage

```typescript
import Plugin from "@mulmochat-plugin/summarize-pdf";
import "@mulmochat-plugin/summarize-pdf/style.css";

// Add to pluginList
const pluginList = [
  // ... other plugins
  Plugin,
];
```

## Development

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:5173/)
yarn dev

# Build
yarn build

# Type check
yarn typecheck

# Lint
yarn lint
```

## License

MIT
