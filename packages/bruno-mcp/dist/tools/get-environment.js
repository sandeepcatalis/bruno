"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGetEnvironment = registerGetEnvironment;
const zod_1 = require("zod");
const collection_loader_1 = require("../utils/collection-loader");
function registerGetEnvironment(server) {
    server.registerTool('get_environment', {
        description: 'Get variables for a specific environment in a Bruno collection (secrets are masked)',
        inputSchema: {
            collectionPath: zod_1.z.string().describe('Path to the collection root directory'),
            envName: zod_1.z.string().describe('Name of the environment to read')
        }
    }, async ({ collectionPath, envName }) => {
        const resolved = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const environments = (0, collection_loader_1.listEnvironments)(resolved);
        const env = environments.find(e => e.name === envName);
        if (!env) {
            const available = environments.map(e => e.name).join(', ') || 'none';
            return {
                content: [{
                        type: 'text',
                        text: `Environment "${envName}" not found. Available: ${available}`
                    }],
                isError: true
            };
        }
        const text = env.variables.map(v => {
            const prefix = v.enabled ? '  ' : '  ~';
            const suffix = v.secret ? ' [secret]' : '';
            return `${prefix}${v.name}: ${v.value}${suffix}`;
        }).join('\n');
        return {
            content: [{
                    type: 'text',
                    text: `Environment: ${env.name}\nVariables:\n${text}`
                }]
        };
    });
}
//# sourceMappingURL=get-environment.js.map