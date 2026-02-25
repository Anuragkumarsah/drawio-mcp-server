import { EventEmitter } from "node:events";

export const BUS_REQUEST = "BUS_REQUEST"; // server → extension
export const BUS_REPLY = "BUS_REPLY";     // extension → server

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
