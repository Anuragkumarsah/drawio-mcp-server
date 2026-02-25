import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { createTool } from "../tool-builder.js";
import { Context } from "../types.js";
import { GetDiagramStateInput } from "../schemas.js";
import { z } from "zod";

type Input = z.infer<typeof GetDiagramStateInput>;

export function getDiagramStateTool(context: Context) {
  return createTool<Input>(context, "get_diagram_state", (reply) => {
    const content: CallToolResult["content"] = [
      {
        type: "text",
        text: JSON.stringify({
          success: reply.success,
          nodes: reply.nodes || [],
          edges: reply.edges || [],
          error: reply.error || undefined,
        }),
      },
    ];

    return { content };
  });
}
