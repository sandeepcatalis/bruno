"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRunFolder = registerRunFolder;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
const cli_runner_1 = require("../utils/cli-runner");
const schema = {
    folder: zod_1.z.string().describe('Folder path relative to collection root'),
    collectionPath: zod_1.z.string().optional().describe('Path to collection root'),
    environment: zod_1.z.string().optional().describe('Environment name to use'),
    envVars: zod_1.z.record(zod_1.z.string()).optional().describe('Environment variable overrides'),
    recursive: zod_1.z.boolean().optional().describe('Run subfolders recursively (default: true)'),
    tags: zod_1.z.string().optional().describe('Comma-separated tags to include'),
    excludeTags: zod_1.z.string().optional().describe('Comma-separated tags to exclude'),
    sandbox: zod_1.z.enum(['safe', 'developer']).optional().describe('JavaScript sandbox mode (default: safe)'),
    bail: zod_1.z.boolean().optional().describe('Stop on first failure'),
    insecure: zod_1.z.boolean().optional().describe('Skip SSL verification'),
    delay: zod_1.z.number().optional().describe('Delay between requests in milliseconds')
};
function registerRunFolder(server) {
    server.registerTool('run_folder', {
        description: 'Run all requests in a folder within a Bruno collection. Returns per-request results and summary.',
        inputSchema: schema
    }, async (params) => {
        const { folder, collectionPath, environment, envVars, recursive, tags, excludeTags, sandbox, bail, insecure, delay } = params;
        const workspace = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const format = (0, collection_loader_1.getCollectionFormat)(workspace);
        if (!format) {
            return {
                content: [{ type: 'text', text: `Error: "${workspace}" is not a Bruno collection root` }],
                isError: true
            };
        }
        const args = (0, cli_runner_1.buildCliArgs)(folder, {
            environment, envVars, recursive: recursive ?? true, tags, excludeTags, sandbox, bail, insecure, delay
        });
        return (0, cli_runner_1.executeRun)(args, workspace);
    });
}
//# sourceMappingURL=run-folder.js.map