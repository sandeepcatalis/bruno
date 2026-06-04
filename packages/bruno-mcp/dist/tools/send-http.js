"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSendHttp = registerSendHttp;
const zod_1 = require("zod");
const http = require("node:http");
const https = require("node:https");
const url_1 = require("node:url");
const MAX_BODY_SIZE = 100 * 1024;
function registerSendHttp(server) {
    server.tool('send_http_request', 'Send an ad-hoc HTTP request (no .bru file needed). Returns status, headers, and body.', {
        url: zod_1.z.string().describe('The request URL (must include scheme)'),
        method: zod_1.z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']).optional().describe('HTTP method (default: GET)'),
        headers: zod_1.z.record(zod_1.z.string()).optional().describe('Request headers as key-value pairs'),
        body: zod_1.z.string().optional().describe('Request body (string). For JSON, pass the serialized JSON string.'),
        timeout: zod_1.z.number().optional().describe('Request timeout in milliseconds (default: 30000)')
    }, async ({ url, method, headers, body, timeout }) => {
        try {
            const result = await makeRequest(url, method || 'GET', headers || {}, body, timeout || 30000);
            return { content: [{ type: 'text', text: result }], isError: false };
        }
        catch (err) {
            return { content: [{ type: 'text', text: `HTTP Error: ${err.message}` }], isError: true };
        }
    });
}
function makeRequest(url, method, headers, body, timeout = 30000) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new url_1.URL(url);
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
