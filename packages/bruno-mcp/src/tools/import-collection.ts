import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { spawn } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { resolveWorkspace } from '../utils/collection-loader';

export function registerImportCollection(server: McpServer) {
  server.tool(
    'import_collection',
    'Import an API collection from OpenAPI or WSDL into Bruno format. Creates .bru files on disk.',
    {
      source: z.string().describe('Path to source file or URL (OpenAPI spec or WSDL)'),
      type: z.enum(['openapi', 'wsdl']).describe('Import format type'),
      outputPath: z.string().optional().describe('Output directory for the imported collection'),
      collectionName: z.string().optional().describe('Name for the imported collection'),
      collectionFormat: z.enum(['bru', 'opencollection']).optional().describe('Output format (default: opencollection)'),
      groupBy: z.enum(['tags', 'path']).optional().describe('Group requests by OpenAPI tags or URL path (default: tags)'),
      insecure: z.boolean().optional().describe('Skip SSL verification when fetching from URLs')
    },
    async ({ source, type, outputPath, collectionName, collectionFormat, groupBy, insecure }) => {
      const workspace = resolveWorkspace();
      const output = outputPath || path.join(workspace, collectionName || 'imported-collection');

      const args = ['import', type, '--source', source];

      args.push('--output', output);
      if (collectionName) args.push('--collection-name', collectionName);
      if (collectionFormat) args.push('--collection-format', collectionFormat);
      if (groupBy) args.push('--group-by', groupBy);
      if (insecure) args.push('--insecure');

      try {
        const { stdout, stderr, exitCode } = await runImportCli(args, workspace);

        if (exitCode !== 0) {
          const errMsg = stderr || stdout || `Import failed with exit code ${exitCode}`;
          return {
            content: [{ type: 'text' as const, text: `Import failed:\n${errMsg}` }],
            isError: true
          };
        }

        // Count resulting files
        const requestCount = countFiles(output);
        const resultText = [
          `Collection imported successfully!`,
          `  Output: ${output}`,
          `  Format: ${collectionFormat || 'opencollection'}`,
          `  Requests: ${requestCount}`,
          stdout ? `\n${stdout}` : ''
        ].filter(Boolean).join('\n');

        return { content: [{ type: 'text' as const, text: resultText }] };
      } catch (err: any) {
        return {
          content: [{ type: 'text' as const, text: `Error running import: ${err.message}` }],
          isError: true
        };
      }
    }
  );
}

function runImportCli(args: string[], cwd: string): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
    const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';

    const proc = spawn(bruBin, args, {
      cwd,
      env: { ...process.env },
      timeout: 60_000
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data: Buffer) => { stdout += data.toString(); });
    proc.stderr?.on('data', (data: Buffer) => { stderr += data.toString(); });

    proc.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code ?? 1 });
    });

    proc.on('error', (err) => {
      reject(new Error(`Failed to run CLI: ${err.message}`));
    });
  });
}

function countFiles(dirPath: string): number {
  if (!fs.existsSync(dirPath)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dirPath, entry.name));
    } else if (entry.name.endsWith('.bru') || entry.name.endsWith('.yml')) {
      // Don't count config files
      if (entry.name !== 'collection.bru' && entry.name !== 'folder.bru' && entry.name !== 'opencollection.yml' && entry.name !== 'folder.yml') {
        count++;
      }
    }
  }
  return count;
}
