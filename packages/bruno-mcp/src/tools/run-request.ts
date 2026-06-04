import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getCollectionFormat, resolveWorkspace } from '../utils/collection-loader';
import { buildCliArgs, executeRun } from '../utils/cli-runner';

const schema = {
  path: z.string().describe('Path to a .bru file to run (relative to collection root or absolute)'),
  collectionPath: z.string().optional().describe('Path to collection root (if path is relative)'),
  environment: z.string().optional().describe('Environment name to use'),
  envVars: z.record(z.string()).optional().describe('Environment variable overrides as key-value pairs'),
  tags: z.string().optional().describe('Comma-separated tags to include'),
  excludeTags: z.string().optional().describe('Comma-separated tags to exclude'),
  sandbox: z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
  bail: z.boolean().optional().describe('Stop on first failure'),
  insecure: z.boolean().optional().describe('Skip SSL verification')
};

export function registerRunRequest(server: McpServer) {
  server.tool(
    'run_request',
    'Execute a Bruno request file (.bru) using the Bruno CLI. Returns status, headers, body, and test results.',
    schema,
    async (params: any) => {
      const { path: reqPath, collectionPath, environment, envVars, tags, excludeTags, sandbox, bail, insecure } = params;
      const workspace = collectionPath || resolveWorkspace();

      const format = getCollectionFormat(workspace);
      if (!format) {
        return {
          content: [{ type: 'text' as const, text: `Error: "${workspace}" is not a Bruno collection root (no bruno.json or opencollection.yml found)` }],
          isError: true
        };
      }

      const args = buildCliArgs(reqPath, { environment, envVars, tags, excludeTags, sandbox, bail, insecure });
      return executeRun(args, workspace);
    }
  );
}
