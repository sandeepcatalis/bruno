"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRunCollection = registerRunCollection;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
const cli_runner_1 = require("../utils/cli-runner");
function registerRunCollection(server) {
    server.tool('run_collection', 'Run all requests in an entire Bruno collection. Returns full execution report with test results.', {
        collectionPath: zod_1.z.string().optional().describe('Path to collection root (defaults to BRUNO_WORKSPACE or cwd)'),
        environment: zod_1.z.string().optional().describe('Environment name to use'),
        envVars: zod_1.z.record(zod_1.z.string()).optional().describe('Environment variable overrides'),
        tags: zod_1.z.string().optional().describe('Comma-separated tags to include'),
        excludeTags: zod_1.z.string().optional().describe('Comma-separated tags to exclude'),
        sandbox: zod_1.z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
        bail: zod_1.z.boolean().optional().describe('Stop on first failure'),
        insecure: zod_1.z.boolean().optional().describe('Skip SSL verification'),
        delay: zod_1.z.number().optional().describe('Delay between requests in milliseconds')
    }, async ({ collectionPath, environment, envVars, tags, excludeTags, sandbox, bail, insecure, delay }) => {
        const workspace = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const format = (0, collection_loader_1.getCollectionFormat)(workspace);
        if (!format) {
            return { content: [{ type: 'text', text: `Error: "${workspace}" is not a Bruno collection root` }], isError: true };
        }
        const args = (0, cli_runner_1.buildCliArgs)('.', {
            environment, envVars, recursive: true, tags, excludeTags, sandbox, bail, insecure, delay
        });
        return (0, cli_runner_1.executeRun)(args, workspace);
    });
}
