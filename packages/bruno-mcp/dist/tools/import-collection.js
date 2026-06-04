"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImportCollection = registerImportCollection;
const zod_1 = require("zod");
const node_child_process_1 = require("node:child_process");
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const collection_loader_1 = require("../utils/collection-loader");
const schema = {
    source: zod_1.z.string().describe('Path to source file or URL (OpenAPI spec or WSDL)'),
    type: zod_1.z.enum(['openapi', 'wsdl']).describe('Import format type'),
    outputPath: zod_1.z.string().optional().describe('Output directory for the imported collection'),
    collectionName: zod_1.z.string().optional().describe('Name for the imported collection'),
    collectionFormat: zod_1.z.enum(['bru', 'opencollection']).optional().describe('Output format (default: opencollection)'),
    groupBy: zod_1.z.enum(['tags', 'path']).optional().describe('Group requests by OpenAPI tags or URL path (default: tags)'),
    insecure: zod_1.z.boolean().optional().describe('Skip SSL verification when fetching from URLs')
};
function registerImportCollection(server) {
    server.registerTool('import_collection', {
        description: 'Import an API collection from OpenAPI or WSDL into Bruno format. Creates .bru files on disk.',
        inputSchema: schema
    }, async (params) => {
        const { source, type, outputPath, collectionName, collectionFormat, groupBy, insecure } = params;
        const workspace = (0, collection_loader_1.resolveWorkspace)();
        const output = outputPath || path.join(workspace, collectionName || 'imported-collection');
        const args = ['import', type, '--source', source];
        args.push('--output', output);
        if (collectionName)
            args.push('--collection-name', collectionName);
        if (collectionFormat)
            args.push('--collection-format', collectionFormat);
        if (groupBy)
            args.push('--group-by', groupBy);
        if (insecure)
            args.push('--insecure');
        try {
            const { stdout, stderr, exitCode } = await runImportCli(args, workspace);
            if (exitCode !== 0) {
                const errMsg = stderr || stdout || `Import failed with exit code ${exitCode}`;
                return {
                    content: [{ type: 'text', text: `Import failed:\n${errMsg}` }],
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
            return { content: [{ type: 'text', text: resultText }] };
        }
        catch (err) {
            return {
                content: [{ type: 'text', text: `Error running import: ${err.message}` }],
                isError: true
            };
        }
    });
}
function runImportCli(args, cwd) {
    return new Promise((resolve, reject) => {
        const localBru = path.join(cwd, '..', '..', 'node_modules', '.bin', 'daffy');
        const bruBin = fs.existsSync(localBru) ? localBru : 'daffy';
        const proc = (0, node_child_process_1.spawn)(bruBin, args, {
            cwd,
            env: { ...process.env },
            timeout: 60_000
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
function countFiles(dirPath) {
    if (!fs.existsSync(dirPath))
        return 0;
    let count = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            count += countFiles(path.join(dirPath, entry.name));
        }
        else if (entry.name.endsWith('.bru') || entry.name.endsWith('.yml')) {
            // Don't count config files
            if (entry.name !== 'collection.bru' && entry.name !== 'folder.bru' && entry.name !== 'opencollection.yml' && entry.name !== 'folder.yml') {
                count++;
            }
        }
    }
    return count;
}
//# sourceMappingURL=import-collection.js.map