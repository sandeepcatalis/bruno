"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_BODY_SIZE = void 0;
exports.buildCliArgs = buildCliArgs;
exports.runCli = runCli;
exports.formatResultEntry = formatResultEntry;
exports.formatResults = formatResults;
exports.executeRun = executeRun;
const child_process_1 = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const MAX_BODY_SIZE = 100 * 1024;
exports.MAX_BODY_SIZE = MAX_BODY_SIZE;
function buildCliArgs(reqPath, opts) {
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
function runCli(args, cwd) {
    return new Promise((resolve, reject) => {
        const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
        const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';
        const proc = (0, child_process_1.spawn)(bruBin, args, {
            cwd,
            env: { ...process.env },
            timeout: 120000
        });
        let stdout = '';
        let stderr = '';
        proc.stdout?.on('data', (data) => { stdout += data.toString(); });
        proc.stderr?.on('data', (data) => { stderr += data.toString(); });
        proc.on('close', (code) => { resolve({ stdout, stderr, exitCode: code ?? 1 }); });
        proc.on('error', (err) => { reject(new Error(`Failed to run CLI: ${err.message}`)); });
    });
}
function formatResultEntry(result) {
    const req = result.request || {};
    const res = result.response || {};
    const tests = result.testResults || [];
    const assertions = result.assertionResults || [];
    const lines = [];
    lines.push(`--- ${req.method || 'REQUEST'} ${req.url || ''} ---`, `Status: ${res.status || 'N/A'} ${res.statusText || ''}`, `Time: ${result.runtime || res.responseTime || 'N/A'}ms`);
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
function formatResults(results) {
    if (!results || !Array.isArray(results)) {
        return JSON.stringify(results, null, 2).slice(0, MAX_BODY_SIZE);
    }
    const lines = [];
    for (const result of results) {
        lines.push(...formatResultEntry(result), '');
    }
    return lines.join('\n');
}
async function executeRun(args, workspace) {
    const tmpOutput = path.join(workspace, `.mcp-run-${Date.now()}.json`);
    args.push('--output', tmpOutput, '--format', 'json');
    try {
        const { stdout, stderr, exitCode } = await runCli(args, workspace);
        let results = null;
        if (fs.existsSync(tmpOutput)) {
            try {
                const raw = fs.readFileSync(tmpOutput, 'utf8');
                results = JSON.parse(raw);
            }
            catch { }
            fs.unlinkSync(tmpOutput);
        }
        if (results) {
            const formatted = formatResults(results);
            return { content: [{ type: 'text', text: formatted }] };
        }
        const output = [stdout, stderr].filter(Boolean).join('\n');
        const truncated = output.length > MAX_BODY_SIZE ? output.slice(0, MAX_BODY_SIZE) + '\n... [truncated]' : output;
        return {
            content: [{ type: 'text', text: truncated || `Run completed with exit code ${exitCode}` }],
            isError: exitCode !== 0
        };
    }
    catch (err) {
        if (fs.existsSync(tmpOutput)) fs.unlinkSync(tmpOutput);
        return {
            content: [{ type: 'text', text: `Error executing request: ${err.message}` }],
            isError: true
        };
    }
}
