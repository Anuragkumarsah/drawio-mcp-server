import { z } from "zod";
export declare const NodeSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    style: z.ZodOptional<z.ZodString>;
    parent: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    label: string;
    style?: string | undefined;
    parent?: string | undefined;
    data?: Record<string, string> | undefined;
}, {
    id: string;
    label: string;
    style?: string | undefined;
    parent?: string | undefined;
    data?: Record<string, string> | undefined;
}>;
export declare const EdgeSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    source: z.ZodString;
    target: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    source: string;
    target: string;
    id?: string | undefined;
    label?: string | undefined;
    style?: string | undefined;
}, {
    source: string;
    target: string;
    id?: string | undefined;
    label?: string | undefined;
    style?: string | undefined;
}>;
export declare const LayoutEnum: z.ZodEnum<["hierarchical", "organic", "circle", "tree", "none"]>;
export declare const RenderSubgraphInput: z.ZodObject<{
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        style: z.ZodOptional<z.ZodString>;
        parent: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }, {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }>, "many">;
    edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        source: z.ZodString;
        target: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }, {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }>, "many">>;
    layout: z.ZodDefault<z.ZodEnum<["hierarchical", "organic", "circle", "tree", "none"]>>;
    clear_first: z.ZodDefault<z.ZodBoolean>;
    return_svg: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
}, {
    nodes: {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[];
    edges?: {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }[] | undefined;
    layout?: "hierarchical" | "organic" | "circle" | "tree" | "none" | undefined;
    clear_first?: boolean | undefined;
    return_svg?: boolean | undefined;
}>;
export declare const ExportDiagramInput: z.ZodObject<{
    format: z.ZodDefault<z.ZodEnum<["svg_image", "svg_text"]>>;
    page_index: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    format: "svg_image" | "svg_text";
    page_index: number;
}, {
    format?: "svg_image" | "svg_text" | undefined;
    page_index?: number | undefined;
}>;
export declare const ModifySubgraphInput: z.ZodObject<{
    add_nodes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        style: z.ZodOptional<z.ZodString>;
        parent: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }, {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }>, "many">>;
    remove_node_ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    add_edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        source: z.ZodString;
        target: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }, {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }>, "many">>;
    remove_edge_ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    update_nodes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        parent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        data: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label?: string | undefined;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }, {
        id: string;
        label?: string | undefined;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }>, "many">>;
    relayout: z.ZodOptional<z.ZodEnum<["hierarchical", "organic", "circle", "tree", "none"]>>;
    return_svg: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
}, {
    return_svg?: boolean | undefined;
    add_nodes?: {
        id: string;
        label: string;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[] | undefined;
    remove_node_ids?: string[] | undefined;
    add_edges?: {
        source: string;
        target: string;
        id?: string | undefined;
        label?: string | undefined;
        style?: string | undefined;
    }[] | undefined;
    remove_edge_ids?: string[] | undefined;
    update_nodes?: {
        id: string;
        label?: string | undefined;
        style?: string | undefined;
        parent?: string | undefined;
        data?: Record<string, string> | undefined;
    }[] | undefined;
    relayout?: "hierarchical" | "organic" | "circle" | "tree" | "none" | undefined;
}>;
export declare const GetDiagramStateInput: z.ZodObject<{
    page_index: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page_index: number;
}, {
    page_index?: number | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map