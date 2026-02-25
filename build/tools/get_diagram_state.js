import { createTool } from "../tool-builder.js";
export function getDiagramStateTool(context) {
    return createTool(context, "get_diagram_state", (reply) => {
        const content = [
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
//# sourceMappingURL=get_diagram_state.js.map