import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools';

async function main() {
  const server = new McpServer({
    name: 'bruno',
    version: '0.1.0'
  });

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Bruno MCP server failed to start:', err);
  process.exit(1);
});
