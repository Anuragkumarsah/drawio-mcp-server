export type Config = {
  wsPort: number;
};

export function loadConfig(): Config {
  // Check CLI args first: --port=XXXX
  const portArg = process.argv.find((a) => a.startsWith("--port="));
  if (portArg) {
    const parsed = parseInt(portArg.split("=")[1], 10);
    if (!isNaN(parsed)) return { wsPort: parsed };
  }

  // Then environment variable
  const envPort = process.env.DRAWIO_MCP_PORT;
  if (envPort) {
    const parsed = parseInt(envPort, 10);
    if (!isNaN(parsed)) return { wsPort: parsed };
  }

  // Default
  return { wsPort: 3333 };
}
