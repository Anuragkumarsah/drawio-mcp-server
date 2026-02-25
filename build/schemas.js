import { z } from "zod";
// === Shared primitives ===
export const NodeSchema = z.object({
    id: z.string().describe("Unique identifier for this node"),
    label: z.string().describe("Display text for the node"),
    style: z.string().optional()
        .describe("draw.io style string OR a shape library name (e.g. 'mxgraph.aws4.lambda')"),
    parent: z.string().optional()
        .describe("Parent node ID — used for grouping/containers"),
    data: z.record(z.string()).optional()
        .describe("Custom key-value attributes to set on the cell"),
});
export const EdgeSchema = z.object({
    id: z.string().optional().describe("Optional edge ID (auto-generated if omitted)"),
    source: z.string().describe("Source node ID"),
    target: z.string().describe("Target node ID"),
    label: z.string().optional().describe("Edge label text"),
    style: z.string().optional().describe("draw.io edge style string"),
});
export const LayoutEnum = z.enum([
    "hierarchical", // mxHierarchicalLayout — DAGs, trees, top-down
    "organic", // mxFastOrganicLayout — force-directed
    "circle", // mxCircleLayout
    "tree", // mxCompactTreeLayout
    "none", // No auto-layout, extension skips positioning
]).describe("Layout algorithm the extension should apply");
// === Tool schemas ===
export const RenderSubgraphInput = z.object({
    nodes: z.array(NodeSchema).min(1)
        .describe("Nodes to create on the canvas"),
    edges: z.array(EdgeSchema).default([])
        .describe("Edges connecting nodes by their IDs"),
    layout: LayoutEnum.default("hierarchical"),
    clear_first: z.boolean().default(false)
        .describe("If true, clear the entire canvas before rendering"),
    return_svg: z.boolean().default(true)
        .describe("If true, return the diagram as SVG after rendering"),
});
export const ExportDiagramInput = z.object({
    format: z.enum(["svg_image", "svg_text"]).default("svg_image")
        .describe("'svg_image' = base64 image for vision LLMs, 'svg_text' = raw SVG XML as text"),
    page_index: z.number().default(0)
        .describe("Which diagram page to export (0-based)"),
});
export const ModifySubgraphInput = z.object({
    add_nodes: z.array(NodeSchema).default([]),
    remove_node_ids: z.array(z.string()).default([]),
    add_edges: z.array(EdgeSchema).default([]),
    remove_edge_ids: z.array(z.string()).default([]),
    update_nodes: z.array(NodeSchema.partial().required({ id: true })).default([]).describe("Partial updates — only the specified fields change"),
    relayout: LayoutEnum.optional()
        .describe("Re-run a layout algorithm after modifications"),
    return_svg: z.boolean().default(true),
});
export const GetDiagramStateInput = z.object({
    page_index: z.number().default(0),
});
//# sourceMappingURL=schemas.js.map