import { EventEmitter } from "node:events";
import { Bus } from "./types.js";
/**
 * Creates a Bus backed by an EventEmitter.
 *
 * - `send()` emits on BUS_REQUEST — the WebSocket bridge picks these up
 *   and forwards them to all connected extension clients.
 * - `onReply()` listens on BUS_REPLY and filters incoming messages
 *   by their `__event` field matching the expected reply channel name.
 */
export declare function createBus(emitter: EventEmitter): Bus;
//# sourceMappingURL=bus.d.ts.map