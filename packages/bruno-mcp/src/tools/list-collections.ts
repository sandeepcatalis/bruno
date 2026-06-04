import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { discoverCollections, resolveWorkspace } from '../utils/collection-loader';

export function registerListCollections(server: McpServer) {
  server.tool(
    'list_collections',
    'List Bruno API collections in the workspace directory',
    {
      workspacePath: z.string().optional().describe('Path to workspace directory (defaults to BRUNO_WORKSPACE env or cwd)')
    },
    async ({ workspacePath }) => {
      const workspace = workspacePath || resolveWorkspace();
      const collections = discoverCollections(workspace);

      if (collections.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `No collections found in: ${workspace}`
          }]
        };
      }

      const text = collections.map(c =>
        `${c.name}\n  Path: ${c.path}\n  Format: ${c.format}\n  Requests: ${c.requestCount}`
      ).join('\n\n');

      return {
        content: [{
          type: 'text' as const,
          text: `Found ${collections.length} collection(s):\n\n${text}`
        }]
      };
    }
  );
}
