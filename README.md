# Draw.io MCP Server v2

A Node.js MCP (Model Context Protocol) server that enables AI/LLM agents to create, modify, and export draw.io diagrams programmatically. It communicates with a companion Chrome extension via WebSocket to manipulate diagrams on the draw.io canvas in real-time.

## How It Works

```
LLM ──(MCP/stdio)──► MCP Server ──(WebSocket :3333)──► Chrome Extension ──► draw.io Canvas
```

The server exposes 4 tools via the MCP protocol. When an LLM calls a tool, the server sends the command over WebSocket to the Chrome extension, which executes it on the draw.io canvas and returns the result (including SVG screenshots).

## Available Tools

| Tool | Description |
|---|---|
| `render_subgraph` | Create nodes and edges on the canvas with auto-layout. Optionally returns an SVG screenshot. |
| `export_diagram` | Export the current diagram as SVG (base64 image or raw XML text). |
| `modify_subgraph` | Incrementally add/remove/update nodes and edges on an existing diagram. |
| `get_diagram_state` | Retrieve all nodes and edges from the current diagram as structured JSON. |

### Layout Algorithms

The `render_subgraph` and `modify_subgraph` tools support these layout algorithms:

- **`hierarchical`** — Best for DAGs, flowcharts, top-down diagrams (default)
- **`organic`** — Force-directed layout for general graphs
- **`circle`** — Arranges nodes in a circle
- **`tree`** — Compact tree layout
- **`none`** — No auto-layout (manual positioning)

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- The [drawio-mcp-extension-v2](../drawio-mcp-extension-v2/) Chrome extension must be installed and connected

## Setup & Installation

### 1. Install Dependencies

```bash
cd drawio-mcp-server-v2
npm install
```

### 2. Build the Project

```bash
npm run build
```

This compiles TypeScript from `src/` to JavaScript in `build/`.

### 3. Configure Your MCP Client

Add the server to your MCP client's configuration. Below are examples for popular clients:

#### Antigravity / VSCode MCP Config

Add to your `mcp_config.json`:

```json
{
  "mcpServers": {
    "drawio": {
      "command": "node",
      "args": ["d:/NewProjects/Draw IO MCP Server/drawio-mcp-server-v2/build/index.js"]
    }
  }
}
```

#### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "drawio": {
      "command": "node",
      "args": ["/absolute/path/to/drawio-mcp-server-v2/build/index.js"]
    }
  }
}
```

#### With Custom Port

To use a port other than the default `3333`:

```json
{
  "mcpServers": {
    "drawio": {
      "command": "node",
      "args": ["/path/to/build/index.js", "--port=4444"]
    }
  }
}
```

Or set the environment variable:

```json
{
  "mcpServers": {
    "drawio": {
      "command": "node",
      "args": ["/path/to/build/index.js"],
      "env": {
        "DRAWIO_MCP_PORT": "4444"
      }
    }
  }
}
```

### 4. Start Using

1. Make sure the Chrome extension is installed and connected (see the extension README)
2. Open [app.diagrams.net](https://app.diagrams.net) in Chrome
3. Start your MCP client — the server will start automatically
4. Ask your AI to create diagrams!

## Development

### Watch Mode

```bash
npm run dev
```

Recompiles on file changes.

### Inspect with MCP Inspector

```bash
npm run inspect
```

Opens the MCP Inspector for debugging tool calls interactively.

### Run Directly

```bash
npm start
```

## Port Configuration

The WebSocket port is resolved in this order:

1. **CLI argument**: `--port=XXXX`
2. **Environment variable**: `DRAWIO_MCP_PORT`
3. **Default**: `3333`

> **Important:** The Chrome extension must be configured to use the same port (default: 3333).

## Project Structure

```
src/
├── index.ts              # Entry point — MCP server + WebSocket setup
├── config.ts             # Port configuration
├── bus.ts                # EventEmitter-based message bus
├── types.ts              # TypeScript interfaces
├── schemas.ts            # Zod input validation schemas
├── tool-builder.ts       # Generic request/reply tool factory
└── tools/
    ├── render_subgraph.ts
    ├── export_diagram.ts
    ├── modify_subgraph.ts
    └── get_diagram_state.ts
```

## Troubleshooting

| Issue | Solution |
|---|---|
| `Timeout: no reply from draw.io extension within 30s` | Ensure the Chrome extension is installed, connected, and a draw.io tab is open |
| WebSocket connection refused | Check that the port matches between server and extension (default: 3333) |
| Build errors | Run `npm install` to ensure all dependencies are installed |
| Tools not appearing in MCP client | Restart your MCP client after configuration changes |
