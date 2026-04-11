import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-first-mcp-server",
  version: "1.0.0",
});
// The MCP SDK auto-detects capabilities when you add tools. 


// This is a simple example tool that echoes the input message back to the user. You can define more complex tools with different input and output schemas as needed.
server.registerTool(
  "echo",
  {
    description: "Echoes the input back to the user.",
    inputSchema: z.object({
      message: z.string().describe("The message to echo back."),
    }),
    outputSchema: z.object({
      echoedMessage: z.string().describe("The echoed message."),
    }),
  },
  async (input) => {
    const echoedMessage = `You said: ${input.message}`;
    return {
      content: [{ type: "text", text: echoedMessage }],
      structuredContent: { echoedMessage },
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);  

