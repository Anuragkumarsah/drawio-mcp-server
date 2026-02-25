#!/usr/bin/env node

import { EventEmitter } from "node:events";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { WebSocketServer, WebSocket } from "ws";
import { nanoid } from "nanoid";

import { loadConfig } from "./config.js";
import { createBus } from "./bus.js";
import { BUS_REQUEST, BUS_REPLY, Context, Logger } from "./types.js";
import {
  RenderSubgraphInput,
  ExportDiagramInput,
  ModifySubgraphInput,
  GetDiagramStateInput,
} from "./schemas.js";
import { renderSubgraphTool } from "./tools/render_subgraph.js";
import { exportDiagramTool } from "./tools/export_diagram.js";
import { modifySubgraphTool } from "./tools/modify_subgraph.js";
import { getDiagramStateTool } from "./tools/get_diagram_state.js";

// ── Logger ───────────────────────────────────────────────────────────
const log: Logger = {
  debug: (msg, ...data) => console.error(`[DEBUG] ${msg}`, ...data),
  error: (msg, ...data) => console.error(`[ERROR] ${msg}`, ...data),
};

// ── Config ───────────────────────────────────────────────────────────
const config = loadConfig();

// ── Event Bus ────────────────────────────────────────────────────────
const emitter = new EventEmitter();
const bus = createBus(emitter);

// ── Context for tools ────────────────────────────────────────────────
const context: Context = {
  bus,
  generateId: () => nanoid(12),
  log,
};

// ── WebSocket Server (bridge to Chrome extension) ────────────────────
const wss = new WebSocketServer({ port: config.wsPort });
const clients = new Set<WebSocket>();

wss.on("listening", () => {
  log.debug(`WebSocket server listening on ws://localhost:${config.wsPort}`);
});

wss.on("connection", (ws) => {
  clients.add(ws);
  log.debug(`Extension connected (total: ${clients.size})`);

  ws.on("message", (raw) => {
    try {
      const data = JSON.parse(raw.toString());

      // Ignore heartbeats
      if (data.__event === "__ping") return;

      // Forward extension replies to the bus
      emitter.emit(BUS_REPLY, data);
    } catch (err) {
      log.error("Failed to parse WebSocket message", err);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    log.debug(`Extension disconnected (total: ${clients.size})`);
  });

  ws.on("error", (err) => {
    log.error("WebSocket client error", err);
    clients.delete(ws);
  });
});

// Forward bus requests to all connected WebSocket clients
emitter.on(BUS_REQUEST, (request) => {
  const payload = JSON.stringify(request);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
});

// ── MCP Server ───────────────────────────────────────────────────────
const server = new McpServer({
  name: "drawio-mcp-server-v2",
  version: "2.0.0",
});

server.tool(
  "render_subgraph",
  "Render a complete subgraph on the draw.io canvas with auto-sizing and auto-layout. " +
    "Provide nodes and edges; the extension creates shapes, connects them, applies a layout algorithm, " +
    "and optionally returns the result as an SVG image for visual verification.",
  RenderSubgraphInput.shape,
  renderSubgraphTool(context)
);

server.tool(
  "export_diagram",
  "Export the current draw.io diagram as SVG. " +
    "Use 'svg_image' format to get a base64-encoded image that vision LLMs can render, " +
    "or 'svg_text' to get the raw SVG XML as text for programmatic analysis.",
  ExportDiagramInput.shape,
  exportDiagramTool(context)
);

server.tool(
  "modify_subgraph",
  "Make incremental changes to the existing diagram: add nodes, remove nodes, " +
    "add edges, remove edges, or update existing node labels/styles. " +
    "Optionally re-run a layout algorithm after changes and return the updated SVG.",
  ModifySubgraphInput.shape,
  modifySubgraphTool(context)
);

server.tool(
  "get_diagram_state",
  "Retrieve the current state of the draw.io diagram as a JSON object " +
    "listing all nodes (with id, label, style, geometry) and edges (with id, source, target, label, style).",
  GetDiagramStateInput.shape,
  getDiagramStateTool(context)
);

// ── Start ────────────────────────────────────────────────────────────
async function main() {
  log.debug("Starting draw.io MCP server v2...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.debug("MCP server connected via stdio transport");
}

main().catch((err) => {
  log.error("Fatal error", err);
  process.exit(1);
});
