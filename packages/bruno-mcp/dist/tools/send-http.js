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
exports.registerSendHttp = registerSendHttp;
const zod_1 = require("zod");
const http = __importStar(require("node:http"));
const https = __importStar(require("node:https"));
const node_url_1 = require("node:url");
const MAX_BODY_SIZE = 100 * 1024;
const schema = {
    url: zod_1.z.string().describe('The request URL (must include scheme)'),
    method: zod_1.z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']).optional().describe('HTTP method (default: GET)'),
    headers: zod_1.z.record(zod_1.z.string()).optional().describe('Request headers as key-value pairs'),
    body: zod_1.z.string().optional().describe('Request body (string). For JSON, pass the serialized JSON string.'),
    timeout: zod_1.z.number().optional().describe('Request timeout in milliseconds (default: 30000)')
};
function registerSendHttp(server) {
    server.registerTool('send_http_request', {
        description: 'Send an ad-hoc HTTP request (no .bru file needed). Returns status, headers, and body.',
        inputSchema: schema
    }, async (params) => {
        const { url, method, headers, body, timeout } = params;
        try {
            const result = await makeRequest(url, method || 'GET', headers || {}, body, timeout || 30000);
            return {
                content: [{
                        type: 'text',
                        text: result
                    }],
                isError: false
            };
        }
        catch (err) {
            return {
                content: [{
                        type: 'text',
                        text: `HTTP Error: ${err.message}`
                    }],
                isError: true
            };
        }
    });
}
function makeRequest(url, method, headers, body, timeout = 30000) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new node_url_1.URL(url);
        const isHttps = parsedUrl.protocol === 'https:';
        const lib = isHttps ? https : http;
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method,
            headers: { ...headers },
            timeout
        };
        if (body && !options.headers['content-length']) {
            options.headers['content-length'] = Buffer.byteLength(body).toString();
        }
        const req = lib.request(options, (res) => {
            const chunks = [];
            let totalSize = 0;
            res.on('data', (chunk) => {
                totalSize += chunk.length;
                if (totalSize <= MAX_BODY_SIZE) {
                    chunks.push(chunk);
                }
            });
            res.on('end', () => {
                const responseBody = Buffer.concat(chunks).toString('utf8');
                const truncated = totalSize > MAX_BODY_SIZE;
                const lines = [];
                lines.push(`${res.statusCode} ${res.statusMessage}`);
                lines.push('', 'Headers:', ...Object.entries(res.headers || {}).map(([key, value]) => `  ${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`), '', 'Body:', responseBody);
                if (truncated) {
                    lines.push(`\n... [truncated, total size: ${totalSize} bytes]`);
                }
                resolve(lines.join('\n'));
            });
        });
        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error(`Request timed out after ${timeout}ms`));
        });
        if (body) {
            req.write(body);
        }
        req.end();
    });
}
//# sourceMappingURL=send-http.js.map