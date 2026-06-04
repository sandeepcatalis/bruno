import { spawn } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';

export const MAX_BODY_SIZE = 100 * 1024; // 100KB

export interface CliOptions {
  environment?: string;
  envVars?: Record<string, string>;
  recursive?: boolean;
  tags?: string;
  excludeTags?: string;
  sandbox?: string;
  bail?: boolean;
  insecure?: boolean;
  delay?: number;
}

export function buildCliArgs(reqPath: string, opts: CliOptions): string[] {
  const args = ['run', reqPath];

  if (opts.environment) args.push('--env', opts.environment);
  if (opts.recursive) args.push('-r');
  if (opts.tags) args.push('--tags', opts.tags);
  if (opts.excludeTags) args.push('--exclude-tags', opts.excludeTags);
  if (opts.sandbox) args.push('--sandbox', opts.sandbox);
  if (opts.bail) args.push('--bail');
  if (opts.insecure) args.push('--insecure');
  if (opts.delay != null) args.push('--delay', String(opts.delay));

  if (opts.envVars) {
    for (const [key, value] of Object.entries(opts.envVars)) {
      args.push('--env-var', `${key}=${String(value)}`);
    }
  }

  return args;
}

export function runCli(args: string[], cwd: string): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
    const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';

    const proc = spawn(bruBin, args, {
      cwd,
      env: { ...process.env },
      timeout: 120_000
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

export function formatResultEntry(result: any): string[] {
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

export function formatResults(results: any): string {
  if (!results || !Array.isArray(results)) {
    return JSON.stringify(results, null, 2).slice(0, MAX_BODY_SIZE);
  }

  const lines: string[] = [];
  for (const result of results) {
    lines.push(...formatResultEntry(result), '');
  }
  return lines.join('\n');
}

export async function executeRun(
  args: string[],
  workspace: string
): Promise<{ content: Array<{ type: 'text'; text: string }>; isError?: boolean }> {
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

    const output = [stdout, stderr].filter(Boolean).join('\n');
    const truncated = output.length > MAX_BODY_SIZE ? output.slice(0, MAX_BODY_SIZE) + '\n... [truncated]' : output;
    return {
      content: [{ type: 'text' as const, text: truncated || `Run completed with exit code ${exitCode}` }],
      isError: exitCode !== 0
    };
  } catch (err: any) {
    if (fs.existsSync(tmpOutput)) fs.unlinkSync(tmpOutput);
    return {
      content: [{ type: 'text' as const, text: `Error executing request: ${err.message}` }],
      isError: true
    };
  }
}
