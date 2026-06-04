import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listRequests, resolveWorkspace } from '../utils/collection-loader';

export function registerListRequests(server: McpServer) {
  server.tool(
    'list_requests',
    'List API requests in a Bruno collection or folder',
    {
      collectionPath: z.string().describe('Path to the collection root directory'),
      folder: z.string().optional().describe('Subfolder within the collection to list'),
      recursive: z.boolean().optional().describe('Recursively list requests in subfolders (default: true)')
    },
    async ({ collectionPath, folder, recursive }) => {
      const resolvedPath = collectionPath || resolveWorkspace();
      const requests = listRequests(resolvedPath, folder, recursive ?? true);

      if (requests.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `No requests found in: ${resolvedPath}${folder ? '/' + folder : ''}`
          }]
        };
      }

      const text = requests.map(r => {
        const parts = [`${r.method || '???'} ${r.name}`];
        if (r.url) parts.push(`  URL: ${r.url}`);
        parts.push(`  File: ${r.relativePath}`);
        if (r.tags?.length) parts.push(`  Tags: ${r.tags.join(', ')}`);
        return parts.join('\n');
      }).join('\n\n');

      return {
        content: [{
          type: 'text' as const,
          text: `Found ${requests.length} request(s):\n\n${text}`
        }]
      };
    }
  );
}
