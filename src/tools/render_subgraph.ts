import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { createTool } from "../tool-builder.js";
import { Context } from "../types.js";
import { RenderSubgraphInput } from "../schemas.js";
import { z } from "zod";

type Input = z.infer<typeof RenderSubgraphInput>;

export function renderSubgraphTool(context: Context) {
  return createTool<Input>(context, "render_subgraph", (reply) => {
    const content: CallToolResult["content"] = [
      {
        type: "text",
        text: JSON.stringify({
          success: reply.success,
          node_count: reply.node_count,
          edge_count: reply.edge_count,
        }),
      },
    ];

    // Add SVG image if the extension returned it
    if (reply.svg_base64) {
      content.push({
        type: "image",
        data: reply.svg_base64,
        mimeType: "image/svg+xml",
      });
    }

    return { content };
  });
}
