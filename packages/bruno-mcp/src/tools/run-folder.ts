import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getCollectionFormat, resolveWorkspace } from '../utils/collection-loader';
import { buildCliArgs, executeRun } from '../utils/cli-runner';

const schema = {
  folder: z.string().describe('Folder path relative to collection root'),
  collectionPath: z.string().optional().describe('Path to collection root'),
  environment: z.string().optional().describe('Environment name to use'),
  envVars: z.record(z.string()).optional().describe('Environment variable overrides'),
  recursive: z.boolean().optional().describe('Run subfolders recursively (default: true)'),
  tags: z.string().optional().describe('Comma-separated tags to include'),
  excludeTags: z.string().optional().describe('Comma-separated tags to exclude'),
  sandbox: z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
  bail: z.boolean().optional().describe('Stop on first failure'),
  insecure: z.boolean().optional().describe('Skip SSL verification'),
  delay: z.number().optional().describe('Delay between requests in milliseconds')
};

export function registerRunFolder(server: McpServer) {
  server.tool(
    'run_folder',
    'Run all requests in a folder within a Bruno collection. Returns per-request results and summary.',
    schema,
    async (params: any) => {
      const { folder, collectionPath, environment, envVars, recursive, tags, excludeTags, sandbox, bail, insecure, delay } = params;
      const workspace = collectionPath || resolveWorkspace();

      const format = getCollectionFormat(workspace);
      if (!format) {
        return {
          content: [{ type: 'text' as const, text: `Error: "${workspace}" is not a Bruno collection root` }],
          isError: true
        };
      }

      const args = buildCliArgs(folder, {
        environment, envVars, recursive: recursive ?? true, tags, excludeTags, sandbox, bail, insecure, delay
      });

      return executeRun(args, workspace);
    }
  );
}
