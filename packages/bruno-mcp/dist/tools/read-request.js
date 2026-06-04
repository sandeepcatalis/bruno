"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReadRequest = registerReadRequest;
const zod_1 = require("zod");
const path = require("node:path");
const collection_loader_1 = require("../utils/collection-loader");
function registerReadRequest(server) {
    server.tool('read_request', 'Read and return the full contents of a .bru request file', {
        filePath: zod_1.z.string().describe('Absolute or relative path to the .bru/.yml request file'),
        collectionPath: zod_1.z.string().optional().describe('Collection root (used to resolve relative paths)')
    }, async ({ filePath, collectionPath }) => {
        const base = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(base, filePath);
        const content = (0, collection_loader_1.readRequestFile)(resolved);
        if (!content) {
            return { content: [{ type: 'text', text: `Error: Could not read file: ${resolved}` }], isError: true };
        }
        return { content: [{ type: 'text', text: content }] };
    });
}
