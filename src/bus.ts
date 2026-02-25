import { EventEmitter } from "node:events";
import { Bus, BUS_REQUEST, BUS_REPLY } from "./types.js";

/**
 * Creates a Bus backed by an EventEmitter.
 *
 * - `send()` emits on BUS_REQUEST — the WebSocket bridge picks these up
 *   and forwards them to all connected extension clients.
 * - `onReply()` listens on BUS_REPLY and filters incoming messages
 *   by their `__event` field matching the expected reply channel name.
 */
export function createBus(emitter: EventEmitter): Bus {
  return {
    send<T>(request: T): void {
      emitter.emit(BUS_REQUEST, request);
    },

    onReply<T>(eventName: string, listener: (reply: T) => void): void {
      const handler = (data: any) => {
        if (data?.__event === eventName) {
          // Remove this specific listener after it fires (one-shot)
          emitter.removeListener(BUS_REPLY, handler);
          listener(data as T);
        }
      };
      emitter.on(BUS_REPLY, handler);
    },
  };
}
