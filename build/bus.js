import { BUS_REQUEST, BUS_REPLY } from "./types.js";
/**
 * Creates a Bus backed by an EventEmitter.
 *
 * - `send()` emits on BUS_REQUEST — the WebSocket bridge picks these up
 *   and forwards them to all connected extension clients.
 * - `onReply()` listens on BUS_REPLY and filters incoming messages
 *   by their `__event` field matching the expected reply channel name.
 */
export function createBus(emitter) {
    return {
        send(request) {
            emitter.emit(BUS_REQUEST, request);
        },
        onReply(eventName, listener) {
            const handler = (data) => {
                if (data?.__event === eventName) {
                    // Remove this specific listener after it fires (one-shot)
                    emitter.removeListener(BUS_REPLY, handler);
                    listener(data);
                }
            };
            emitter.on(BUS_REPLY, handler);
        },
    };
}
//# sourceMappingURL=bus.js.map