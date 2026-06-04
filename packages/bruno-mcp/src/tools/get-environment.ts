import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listEnvironments, resolveWorkspace } from '../utils/collection-loader';

export function registerGetEnvironment(server: McpServer) {
  server.tool(
    'get_environment',
    'Get variables for a specific environment in a Bruno collection (secrets are masked)',
    {
      collectionPath: z.string().describe('Path to the collection root directory'),
      envName: z.string().describe('Name of the environment to read')
    },
    async ({ collectionPath, envName }) => {
      const resolved = collectionPath || resolveWorkspace();
      const environments = listEnvironments(resolved);
      const env = environments.find(e => e.name === envName);

      if (!env) {
        const available = environments.map(e => e.name).join(', ') || 'none';
        return {
          content: [{
            type: 'text' as const,
            text: `Environment "${envName}" not found. Available: ${available}`
          }],
          isError: true
        };
      }

      const text = env.variables.map(v => {
        const prefix = v.enabled ? '  ' : '  ~';
        const suffix = v.secret ? ' [secret]' : '';
        return `${prefix}${v.name}: ${v.value}${suffix}`;
      }).join('\n');

      return {
        content: [{
          type: 'text' as const,
          text: `Environment: ${env.name}\nVariables:\n${text}`
        }]
      };
    }
  );
}
