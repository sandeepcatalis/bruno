import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getCollectionFormat, resolveWorkspace } from '../utils/collection-loader';
import { buildCliArgs, executeRun } from '../utils/cli-runner';

const schema = {
  collectionPath: z.string().optional().describe('Path to collection root (defaults to BRUNO_WORKSPACE or cwd)'),
  environment: z.string().optional().describe('Environment name to use'),
  envVars: z.record(z.string()).optional().describe('Environment variable overrides'),
  tags: z.string().optional().describe('Comma-separated tags to include'),
  excludeTags: z.string().optional().describe('Comma-separated tags to exclude'),
  sandbox: z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
  bail: z.boolean().optional().describe('Stop on first failure'),
  insecure: z.boolean().optional().describe('Skip SSL verification'),
  delay: z.number().optional().describe('Delay between requests in milliseconds')
};

export function registerRunCollection(server: McpServer) {
  server.tool(
    'run_collection',
    'Run all requests in an entire Bruno collection. Returns full execution report with test results.',
    schema,
    async (params: any) => {
      const { collectionPath, environment, envVars, tags, excludeTags, sandbox, bail, insecure, delay } = params;
      const workspace = collectionPath || resolveWorkspace();

      const format = getCollectionFormat(workspace);
      if (!format) {
        return {
          content: [{ type: 'text' as const, text: `Error: "${workspace}" is not a Bruno collection root` }],
          isError: true
        };
      }

      // Run from collection root with recursive flag to get everything
      const args = buildCliArgs('.', {
        environment, envVars, recursive: true, tags, excludeTags, sandbox, bail, insecure, delay
      });

      return executeRun(args, workspace);
    }
  );
}
