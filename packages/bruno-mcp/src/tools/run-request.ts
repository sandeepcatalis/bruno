import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { spawn } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { getCollectionFormat, resolveWorkspace } from '../utils/collection-loader';

const MAX_BODY_SIZE = 100 * 1024; // 100KB

export function registerRunRequest(server: McpServer) {
  server.tool(
    'run_request',
    'Execute a Bruno request file (.bru) or folder using the Bruno CLI. Returns status, headers, body, and test results.',
    {
      path: z.string().describe('Path to a .bru file or folder to run (relative to collection root or absolute)'),
      collectionPath: z.string().optional().describe('Path to collection root (if path is relative)'),
      environment: z.string().optional().describe('Environment name to use'),
      envVars: z.record(z.string()).optional().describe('Environment variable overrides as key-value pairs'),
      recursive: z.boolean().optional().describe('Run subfolders recursively (default: false)'),
      tags: z.string().optional().describe('Comma-separated tags to include'),
      excludeTags: z.string().optional().describe('Comma-separated tags to exclude'),
      sandbox: z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
      bail: z.boolean().optional().describe('Stop on first failure'),
      insecure: z.boolean().optional().describe('Skip SSL verification')
    },
    async ({ path: reqPath, collectionPath, environment, envVars, recursive, tags, excludeTags, sandbox, bail, insecure }) => {
      const workspace = collectionPath || resolveWorkspace();

      // Verify it's a collection
      const format = getCollectionFormat(workspace);
      if (!format) {
        return {
          content: [{ type: 'text' as const, text: `Error: "${workspace}" is not a Bruno collection root (no bruno.json or opencollection.yml found)` }],
          isError: true
        };
      }

      // Build CLI args
      const args = buildCliArgs(reqPath, { environment, envVars, recursive, tags, excludeTags, sandbox, bail, insecure });

      // Always output JSON for structured results
      const tmpOutput = path.join(workspace, `.mcp-run-${Date.now()}.json`);
      args.push('--output', tmpOutput, '--format', 'json');

      try {
        const { stdout, stderr, exitCode } = await runCli(args, workspace);
        let results: any = null;

        if (fs.existsSync(tmpOutput)) {
          try {
            const raw = fs.readFileSync(tmpOutput, 'utf8');
            results = JSON.parse(raw);
          } catch { /* ignore parse errors */ }
          fs.unlinkSync(tmpOutput);
        }

        if (results) {
          const formatted = formatResults(results);
          return { content: [{ type: 'text' as const, text: formatted }] };
        }

        // Fallback to stdout/stderr
        const output = [stdout, stderr].filter(Boolean).join('\n');
        const truncated = output.length > MAX_BODY_SIZE ? output.slice(0, MAX_BODY_SIZE) + '\n... [truncated]' : output;
        return {
          content: [{ type: 'text' as const, text: truncated || `Run completed with exit code ${exitCode}` }],
          isError: exitCode !== 0
        };
      } catch (err: any) {
        // Clean up temp file
        if (fs.existsSync(tmpOutput)) fs.unlinkSync(tmpOutput);
        return {
          content: [{ type: 'text' as const, text: `Error executing request: ${err.message}` }],
          isError: true
        };
      }
    }
  );
}

function runCli(args: string[], cwd: string): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    // Find the bru CLI - try local workspace node_modules first, then global
    const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
    const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';

    const proc = spawn(bruBin, args, {
      cwd,
      env: { ...process.env },
      timeout: 120_000 // 2 minute timeout
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => { stdout += data.toString(); });
    proc.stderr?.on('data', (data) => { stderr += data.toString(); });

    proc.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code ?? 1 });
    });

    proc.on('error', (err) => {
      reject(new Error(`Failed to run CLI: ${err.message}`));
    });
  });
}

interface CliOptions {
  environment?: string;
  envVars?: Record<string, string>;
  recursive?: boolean;
  tags?: string;
  excludeTags?: string;
  sandbox?: string;
  bail?: boolean;
  insecure?: boolean;
}

function buildCliArgs(reqPath: string, opts: CliOptions): string[] {
  const args = ['run', reqPath];

  if (opts.environment) args.push('--env', opts.environment);
  if (opts.recursive) args.push('-r');
  if (opts.tags) args.push('--tags', opts.tags);
  if (opts.excludeTags) args.push('--exclude-tags', opts.excludeTags);
  if (opts.sandbox) args.push('--sandbox', opts.sandbox);
  if (opts.bail) args.push('--bail');
  if (opts.insecure) args.push('--insecure');

  if (opts.envVars) {
    for (const [key, value] of Object.entries(opts.envVars)) {
      args.push('--env-var', `${key}=${String(value)}`);
    }
  }

  return args;
}

function formatResultEntry(result: any): string[] {
  const req = result.request || {};
  const res = result.response || {};
  const tests = result.testResults || [];
  const assertions = result.assertionResults || [];
  const lines: string[] = [];

  lines.push(
    `--- ${req.method || 'REQUEST'} ${req.url || ''} ---`,
    `Status: ${res.status || 'N/A'} ${res.statusText || ''}`,
    `Time: ${result.runtime || res.responseTime || 'N/A'}ms`
  );

  if (tests.length > 0) {
    lines.push('Tests:');
    for (const t of tests) {
      const icon = t.status === 'pass' ? '✓' : '✗';
      lines.push(`  ${icon} ${t.description || t.lhsExpr || 'test'}`);
      if (t.status !== 'pass' && t.error) lines.push(`    Error: ${t.error}`);
    }
  }

  if (assertions.length > 0) {
    lines.push('Assertions:');
    for (const a of assertions) {
      const icon = a.status === 'pass' ? '✓' : '✗';
      lines.push(`  ${icon} ${a.lhsExpr || a.description || 'assertion'} ${a.rhsExpr || ''}`);
      if (a.status !== 'pass' && a.error) lines.push(`    Error: ${a.error}`);
    }
  }

  const rawBody = res.data || res.body;
  if (rawBody) {
    const body = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody, null, 2);
    const truncBody = body.length > MAX_BODY_SIZE ? body.slice(0, MAX_BODY_SIZE) + '\n... [truncated]' : body;
    lines.push(`Response Body:\n${truncBody}`);
  }

  return lines;
}

function formatResults(results: any): string {
  if (!results || !Array.isArray(results)) {
    return JSON.stringify(results, null, 2).slice(0, MAX_BODY_SIZE);
  }

  const lines: string[] = [];
  for (const result of results) {
    lines.push(...formatResultEntry(result), '');
  }
  return lines.join('\n');
}
