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

// Return Github Repo Info based on username and repo name
server.registerTool(
  "getGithubRepoInfo",
  {
    description: "Fetches information about a GitHub repository.",
    inputSchema: z.object({
      username: z.string().describe("The GitHub username."),
      repoName: z.string().describe("The name of the GitHub repository."),
    }),
    outputSchema: z.object({
      fullName: z.string().describe("The full name of the repository."),
      description: z.string().describe("The description of the repository."),
      stars: z.number().describe("The number of stars the repository has."),
    }),
  },
  async (input) => {
    const response = await fetch(`https://api.github.com/repos/${input.username}/${input.repoName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repository info: ${response.statusText}`);
    }
    const repoInfo = await response.json();
    return {
      content: [
        { type: "text", text      : `Repository: ${repoInfo.full_name}` },
        { type: "text", text      : `Description: ${repoInfo.description}` },
        { type: "text", text      : `Stars: ${repoInfo.stargazers_count}` },
      ],
      structuredContent: {
        fullName    : repoInfo.full_name,
        description : repoInfo.description,
        stars       : repoInfo.stargazers_count,
      },
    };
  }
);  

// Start the server using standard input/output for communication.
const transport = new StdioServerTransport();
await server.connect(transport);  



