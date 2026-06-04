import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as path from 'node:path';
import { readRequestFile, resolveWorkspace } from '../utils/collection-loader';

export function registerReadRequest(server: McpServer) {
  server.tool(
    'read_request',
    'Read and return the full contents of a .bru request file',
    {
      filePath: z.string().describe('Absolute or relative path to the .bru/.yml request file'),
      collectionPath: z.string().optional().describe('Collection root (used to resolve relative paths)')
    },
    async ({ filePath, collectionPath }) => {
      const base = collectionPath || resolveWorkspace();
      const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(base, filePath);
      const content = readRequestFile(resolved);

      if (!content) {
        return {
          content: [{
            type: 'text' as const,
            text: `Error: Could not read file: ${resolved}`
          }],
          isError: true
        };
      }

      return {
        content: [{
          type: 'text' as const,
          text: content
        }]
      };
    }
  );
}
