import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Context } from "../types.js";
export declare function modifySubgraphTool(context: Context): (args: {
    return_svg: boolean;
    add_nodes: {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[];
    remove_node_ids: string[];
    add_edges: {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }[];
    remove_edge_ids: string[];
    update_nodes: {
        id: string;
        label?: string | undefined;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[];
    relayout?: "hierarchical" | "organic" | "circle" | "tree" | "none" | undefined;
}) => Promise<CallToolResult>;
//# sourceMappingURL=modify_subgraph.d.ts.map