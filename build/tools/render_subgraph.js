import { createTool } from "../tool-builder.js";
export function renderSubgraphTool(context) {
    return createTool(context, "render_subgraph", (reply) => {
        const content = [
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
//# sourceMappingURL=render_subgraph.js.map