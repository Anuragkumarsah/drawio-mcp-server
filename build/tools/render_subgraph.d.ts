import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Context } from "../types.js";
export declare function renderSubgraphTool(context: Context): (args: {
    nodes: {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[];
    edges: {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }[];
    layout: "hierarchical" | "organic" | "circle" | "tree" | "none";
    clear_first: boolean;
    return_svg: boolean;
}) => Promise<CallToolResult>;
//# sourceMappingURL=render_subgraph.d.ts.map