import { createTool } from "../tool-builder.js";
export function exportDiagramTool(context) {
    return createTool(context, "export_diagram", (reply) => {
        const content = [];
        if (!reply.success) {
            content.push({
                type: "text",
                text: JSON.stringify({ success: false, error: reply.error }),
            });
            return { content };
        }
        // svg_image format → return as base64 image content
        if (reply.svg_base64) {
            content.push({
                type: "text",
                text: JSON.stringify({ success: true, format: "svg_image" }),
            });
            content.push({
                type: "image",
                data: reply.svg_base64,
                mimeType: "image/svg+xml",
            });
        }
        // svg_text format → return raw SVG as text content
        if (reply.svg_text) {
            content.push({
                type: "text",
                text: reply.svg_text,
            });
        }
        return { content };
    });
}
//# sourceMappingURL=export_diagram.js.map