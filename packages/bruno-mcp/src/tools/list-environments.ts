import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listEnvironments, resolveWorkspace } from '../utils/collection-loader';

export function registerListEnvironments(server: McpServer) {
  (server as any).registerTool(
    'list_environments',
    {
      description: 'List available environments for a Bruno collection',
      inputSchema: {
        collectionPath: z.string().describe('Path to the collection root directory')
      }
    },
    async ({ collectionPath }: any) => {
      const resolved = collectionPath || resolveWorkspace();
      const environments = listEnvironments(resolved);

      if (environments.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `No environments found in: ${resolved}/environments/`
          }]
        };
      }

      const text = environments.map(env => {
        const varCount = env.variables.length;
        return `${env.name} (${varCount} variable${varCount !== 1 ? 's' : ''})`;
      }).join('\n');

      return {
        content: [{
          type: 'text' as const,
          text: `Environments:\n${text}`
        }]
      };
    }
  );
}
