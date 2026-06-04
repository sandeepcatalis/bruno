"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerListCollections = registerListCollections;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
function registerListCollections(server) {
    server.registerTool('list_collections', {
        description: 'List Bruno API collections in the workspace directory',
        inputSchema: {
            workspacePath: zod_1.z.string().optional().describe('Path to workspace directory (defaults to BRUNO_WORKSPACE env or cwd)')
        }
    }, async ({ workspacePath }) => {
        const workspace = workspacePath || (0, collection_loader_1.resolveWorkspace)();
        const collections = (0, collection_loader_1.discoverCollections)(workspace);
        if (collections.length === 0) {
            return {
                content: [{
                        type: 'text',
                        text: `No collections found in: ${workspace}`
                    }]
            };
        }
        const text = collections.map(c => `${c.name}\n  Path: ${c.path}\n  Format: ${c.format}\n  Requests: ${c.requestCount}`).join('\n\n');
        return {
            content: [{
                    type: 'text',
                    text: `Found ${collections.length} collection(s):\n\n${text}`
                }]
        };
    });
}
//# sourceMappingURL=list-collections.js.map