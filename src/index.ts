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



// tool to add 2 numbers
server.registerTool(
  "add",
  {
    description: "Adds two numbers together.",
    inputSchema: z.object({
      a: z.number().describe("The first number."),
      b: z.number().describe("The second number."),
    }),
    outputSchema: z.object({
      result: z.number().describe("The sum of the two numbers."),
    }),
  },
  async (input) => {
    const result = input.a + input.b;
    return {
      content: [{ type: "text", text: `The result of adding ${input.a} and ${input.b} is ${result}.` }],
      structuredContent: { result },
    };
  }
);  

// Start the server using standard input/output for communication.
const transport = new StdioServerTransport();
await server.connect(transport);  



