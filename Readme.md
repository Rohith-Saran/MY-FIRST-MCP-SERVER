# My First MCP Server

A beginner-friendly Model Context Protocol (MCP) server implementation showcasing how to build and deploy MCP tools using TypeScript and Node.js.

## About This Project

This is a learning project that demonstrates the fundamentals of creating an MCP server with multiple tools. It implements three example tools to showcase different capabilities: text manipulation, arithmetic operations, and external API integration.

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that enables seamless communication between AI applications and data sources/tools. MCP servers expose capabilities (tools) that AI models can discover and use to interact with external systems and APIs.

## Available Tools

### 1. **echo**
Echoes the input message back to the user. A simple demonstration tool.

**Input:**
- `message` (string): The message to echo back

**Output:**
- `echoedMessage` (string): The echoed message prefixed with "You said: "

### 2. **add**
Adds two numbers together and returns the sum.

**Input:**
- `a` (number): The first number
- `b` (number): The second number

**Output:**
- `result` (number): The sum of the two numbers

### 3. **getGithubRepoInfo**
Fetches information about a GitHub repository using the GitHub API.

**Input:**
- `username` (string): The GitHub username
- `repoName` (string): The name of the repository

**Output:**
- `fullName` (string): The full name of the repository
- `description` (string): The repository description
- `stars` (number): The number of GitHub stars

## Prerequisites

- Node.js 18+ 
- npm or yarn
- TypeScript knowledge (basic)

## Installation

1. Clone or navigate to the project directory:
```bash
cd MY-FIRST-MCP-SERVER
```

2. Install dependencies:
```bash
npm install
```

## Building

To compile TypeScript to JavaScript:

```bash
npm run build
```

This generates JavaScript files in the `build/` directory.

## Running the Server

To start the MCP server:

```bash
npm start
```

The server will start and listen for incoming MCP connections via standard input/output.

```

## Technologies Used

- **TypeScript**: For type-safe server implementation
- **Node.js**: Runtime environment
- **@modelcontextprotocol/sdk**: MCP server SDK
- **Zod**: Schema validation for tool inputs/outputs

## How It Works

1. The server creates an MCP server instance with a name and version
2. Multiple tools are registered, each with:
   - A unique name
   - A description
   - Input schema (validated with Zod)
   - Output schema (validated with Zod)
   - An async handler function
3. The server connects via stdio transport and awaits client connections

## Testing

You can test the MCP server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

This will open an interactive interface to test your tools.

## License

ISC

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK GitHub Repository](https://github.com/modelcontextprotocol/python-sdk)
- [Zod Documentation](https://zod.dev/)

