"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerListRequests = registerListRequests;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
function registerListRequests(server) {
    server.tool('list_requests', 'List API requests in a Bruno collection or folder', {
        collectionPath: zod_1.z.string().describe('Path to the collection root directory'),
        folder: zod_1.z.string().optional().describe('Subfolder within the collection to list'),
        recursive: zod_1.z.boolean().optional().describe('Recursively list requests in subfolders (default: true)')
    }, async ({ collectionPath, folder, recursive }) => {
        const resolvedPath = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const requests = (0, collection_loader_1.listRequests)(resolvedPath, folder, recursive ?? true);
        if (requests.length === 0) {
            return { content: [{ type: 'text', text: `No requests found in: ${resolvedPath}${folder ? '/' + folder : ''}` }] };
        }
        const text = requests.map(r => {
            const parts = [`${r.method || '???'} ${r.name}`];
            if (r.url) parts.push(`  URL: ${r.url}`);
            parts.push(`  File: ${r.relativePath}`);
            if (r.tags?.length) parts.push(`  Tags: ${r.tags.join(', ')}`);
            return parts.join('\n');
        }).join('\n\n');
        return { content: [{ type: 'text', text: `Found ${requests.length} request(s):\n\n${text}` }] };
    });
}
