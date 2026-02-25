import { createTool } from "../tool-builder.js";
export function modifySubgraphTool(context) {
    return createTool(context, "modify_subgraph", (reply) => {
        const content = [
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
//# sourceMappingURL=modify_subgraph.js.map