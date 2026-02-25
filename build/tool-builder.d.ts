import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Context } from "./types.js";
/**
 * Generic factory for creating MCP tool handlers that communicate
 * with the draw.io extension via the event bus.
 *
 * 1. Generates a unique request ID
 * 2. Sends the request through the bus
 * 3. Waits for a matching reply (filtered by `__event` = `eventName.requestId`)
 * 4. Transforms the extension reply into a CallToolResult
 */
export declare function createTool<TInput>(context: Context, eventName: string, buildResult: (extensionReply: any) => CallToolResult): (args: TInput) => Promise<CallToolResult>;
//# sourceMappingURL=tool-builder.d.ts.map