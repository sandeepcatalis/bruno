"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImportCollection = registerImportCollection;
const zod_1 = require("zod");
const child_process_1 = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const collection_loader_1 = require("../utils/collection-loader");
function registerImportCollection(server) {
    server.tool('import_collection', 'Import an API collection from OpenAPI or WSDL into Bruno format. Creates .bru files on disk.', {
        source: zod_1.z.string().describe('Path to source file or URL (OpenAPI spec or WSDL)'),
        type: zod_1.z.enum(['openapi', 'wsdl']).describe('Import format type'),
        outputPath: zod_1.z.string().optional().describe('Output directory for the imported collection'),
        collectionName: zod_1.z.string().optional().describe('Name for the imported collection'),
        collectionFormat: zod_1.z.enum(['bru', 'opencollection']).optional().describe('Output format (default: opencollection)'),
        groupBy: zod_1.z.enum(['tags', 'path']).optional().describe('Group requests by OpenAPI tags or URL path (default: tags)'),
        insecure: zod_1.z.boolean().optional().describe('Skip SSL verification when fetching from URLs')
    }, async ({ source, type, outputPath, collectionName, collectionFormat, groupBy, insecure }) => {
        const workspace = (0, collection_loader_1.resolveWorkspace)();
        const output = outputPath || path.join(workspace, collectionName || 'imported-collection');
        const args = ['import', type, '--source', source, '--output', output];
        if (collectionName) args.push('--collection-name', collectionName);
        if (collectionFormat) args.push('--collection-format', collectionFormat);
        if (groupBy) args.push('--group-by', groupBy);
        if (insecure) args.push('--insecure');
        try {
            const { stdout, stderr, exitCode } = await runImportCli(args, workspace);
            if (exitCode !== 0) {
                const errMsg = stderr || stdout || `Import failed with exit code ${exitCode}`;
                return { content: [{ type: 'text', text: `Import failed:\n${errMsg}` }], isError: true };
            }
            const requestCount = countFiles(output);
            const resultText = [
                `Collection imported successfully!`,
                `  Output: ${output}`,
                `  Format: ${collectionFormat || 'opencollection'}`,
                `  Requests: ${requestCount}`,
                stdout ? `\n${stdout}` : ''
            ].filter(Boolean).join('\n');
            return { content: [{ type: 'text', text: resultText }] };
        }
        catch (err) {
            return { content: [{ type: 'text', text: `Error running import: ${err.message}` }], isError: true };
        }
    });
}
function runImportCli(args, cwd) {
    return new Promise((resolve, reject) => {
        const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
        const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';
        const proc = (0, child_process_1.spawn)(bruBin, args, { cwd, env: { ...process.env }, timeout: 60000 });
        let stdout = '';
        let stderr = '';
        proc.stdout?.on('data', (data) => { stdout += data.toString(); });
        proc.stderr?.on('data', (data) => { stderr += data.toString(); });
        proc.on('close', (code) => { resolve({ stdout, stderr, exitCode: code ?? 1 }); });
        proc.on('error', (err) => { reject(new Error(`Failed to run CLI: ${err.message}`)); });
    });
}
function countFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;
    let count = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            count += countFiles(path.join(dirPath, entry.name));
        }
        else if (entry.name.endsWith('.bru') || entry.name.endsWith('.yml')) {
            if (entry.name !== 'collection.bru' && entry.name !== 'folder.bru' && entry.name !== 'opencollection.yml' && entry.name !== 'folder.yml') {
                count++;
            }
        }
    }
    return count;
}
