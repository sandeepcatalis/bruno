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
exports.registerReadRequest = registerReadRequest;
const zod_1 = require("zod");
const path = __importStar(require("node:path"));
const collection_loader_1 = require("../utils/collection-loader");
function registerReadRequest(server) {
    server.registerTool('read_request', {
        description: 'Read and return the full contents of a .bru request file',
        inputSchema: {
            filePath: zod_1.z.string().describe('Absolute or relative path to the .bru/.yml request file'),
            collectionPath: zod_1.z.string().optional().describe('Collection root (used to resolve relative paths)')
        }
    }, async ({ filePath, collectionPath }) => {
        const base = collectionPath || (0, collection_loader_1.resolveWorkspace)();
        const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(base, filePath);
        const content = (0, collection_loader_1.readRequestFile)(resolved);
        if (!content) {
            return {
                content: [{
                        type: 'text',
                        text: `Error: Could not read file: ${resolved}`
                    }],
                isError: true
            };
        }
        return {
            content: [{
                    type: 'text',
                    text: content
                }]
        };
    });
}
//# sourceMappingURL=read-request.js.map