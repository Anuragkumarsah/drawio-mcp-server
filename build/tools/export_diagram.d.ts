import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Context } from "../types.js";
export declare function exportDiagramTool(context: Context): (args: {
    format: "svg_image" | "svg_text";
    page_index: number;
}) => Promise<CallToolResult>;
//# sourceMappingURL=export_diagram.d.ts.map