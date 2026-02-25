const REPLY_TIMEOUT_MS = 30_000; // 30 seconds
/**
 * Generic factory for creating MCP tool handlers that communicate
 * with the draw.io extension via the event bus.
 *
 * 1. Generates a unique request ID
 * 2. Sends the request through the bus
 * 3. Waits for a matching reply (filtered by `__event` = `eventName.requestId`)
 * 4. Transforms the extension reply into a CallToolResult
 */
export function createTool(context, eventName, buildResult) {
    return async (args) => {
        const requestId = context.generateId();
        const replyChannel = `${eventName}.${requestId}`;
        // Send request to extension via bus
        context.bus.send({ __event: eventName, __request_id: requestId, ...args });
        context.log.debug(`[tool] Sent ${eventName} (id: ${requestId})`);
        // Wait for reply with timeout
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                context.log.error(`[tool] Timeout waiting for reply on ${replyChannel}`);
                resolve({
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: false,
                                error: `Timeout: no reply from draw.io extension within ${REPLY_TIMEOUT_MS / 1000}s. Is the extension connected?`,
                            }),
                        },
                    ],
                });
            }, REPLY_TIMEOUT_MS);
            context.bus.onReply(replyChannel, (reply) => {
                clearTimeout(timeout);
                context.log.debug(`[tool] Received reply for ${replyChannel}`);
                resolve(buildResult(reply));
            });
        });
    };
}
//# sourceMappingURL=tool-builder.js.map