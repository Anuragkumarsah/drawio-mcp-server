import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { createTool } from "../tool-builder.js";
import { Context } from "../types.js";
import { ModifySubgraphInput } from "../schemas.js";
import { z } from "zod";

type Input = z.infer<typeof ModifySubgraphInput>;

export function modifySubgraphTool(context: Context) {
  return createTool<Input>(context, "modify_subgraph", (reply) => {
    const content: CallToolResult["content"] = [
      {
        type: "text",
        text: JSON.stringify({
          success: reply.success,
          error: reply.error || undefined,
        }),
      },
    ];

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
