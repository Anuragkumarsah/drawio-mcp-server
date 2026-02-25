export declare const BUS_REQUEST = "BUS_REQUEST";
export declare const BUS_REPLY = "BUS_REPLY";
export type Bus = {
    send: <T>(request: T) => void;
    onReply: <T>(eventName: string, listener: (reply: T) => void) => void;
};
export type Logger = {
    debug: (msg: string, ...data: unknown[]) => void;
    error: (msg: string, ...data: unknown[]) => void;
};
export type Context = {
    bus: Bus;
    generateId: () => string;
    log: Logger;
};
//# sourceMappingURL=types.d.ts.map