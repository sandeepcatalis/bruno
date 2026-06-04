"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRunRequest = registerRunRequest;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
const cli_runner_1 = require("../utils/cli-runner");
function registerRunRequest(server) {
    server.tool('run_request', 'Execute a Bruno request file (.bru) using the Bruno CLI. Returns status, headers, body, and test results.', {
        path: zod_1.z.string().describe('Path to a .bru file to run (relative to collection root or absolute)'),
        collectionPath: zod_1.z.string().optional().describe('Path to collection root (if path is relative)'),
        environment: zod_1.z.string().optional().describe('Environment name to use'),
        envVars: zod_1.z.record(zod_1.z.string()).optional().describe('Environment variable overrides as key-value pairs'),
        tags: zod_1.z.string().optional().describe('Comma-separated tags to include'),
        excludeTags: zod_1.z.string().optional().describe('Comma-separated tags to exclude'),
        sandbox: zod_1.z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
        bail: zod_1.z.boolean().optional().describe('Stop on first failure'),
        insecure: zod_1.z.boolean().optional().describe('Skip SSL verification')
    }, async ({ path: reqPath, collectionPath, environment, envVars, tags, excludeTags, sandbox, bail, insecure }) => {
        const workspace = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const format = (0, collection_loader_1.getCollectionFormat)(workspace);
        if (!format) {
            return { content: [{ type: 'text', text: `Error: "${workspace}" is not a Bruno collection root (no bruno.json or opencollection.yml found)` }], isError: true };
        }
        const args = (0, cli_runner_1.buildCliArgs)(reqPath, { environment, envVars, tags, excludeTags, sandbox, bail, insecure });
        return (0, cli_runner_1.executeRun)(args, workspace);
    });
}
