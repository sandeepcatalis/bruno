"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerListEnvironments = registerListEnvironments;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
function registerListEnvironments(server) {
    server.tool('list_environments', 'List available environments for a Bruno collection', {
        collectionPath: zod_1.z.string().describe('Path to the collection root directory')
    }, async ({ collectionPath }) => {
        const resolved = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const environments = (0, collection_loader_1.listEnvironments)(resolved);
        if (environments.length === 0) {
            return { content: [{ type: 'text', text: `No environments found in: ${resolved}/environments/` }] };
        }
        const text = environments.map(env => {
            const varCount = env.variables.length;
            return `${env.name} (${varCount} variable${varCount === 1 ? '' : 's'})`;
        }).join('\n');
        return { content: [{ type: 'text', text: `Environments:\n${text}` }] };
    });
}
