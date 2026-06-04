import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

const MAX_BODY_SIZE = 100 * 1024;

const schema = {
  url: z.string().describe('The request URL (must include scheme)'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']).optional().describe('HTTP method (default: GET)'),
  headers: z.record(z.string()).optional().describe('Request headers as key-value pairs'),
  body: z.string().optional().describe('Request body (string). For JSON, pass the serialized JSON string.'),
  timeout: z.number().optional().describe('Request timeout in milliseconds (default: 30000)')
};

export function registerSendHttp(server: McpServer) {
  server.tool(
    'send_http_request',
    'Send an ad-hoc HTTP request (no .bru file needed). Returns status, headers, and body.',
    schema,
    async (params: any) => {
      const { url, method, headers, body, timeout } = params;
      try {
        const result = await makeRequest(url, method || 'GET', headers || {}, body, timeout || 30000);
        return {
          content: [{
            type: 'text' as const,
            text: result
          }],
          isError: false
        };
      } catch (err: any) {
        return {
          content: [{
            type: 'text' as const,
            text: `HTTP Error: ${err.message}`
          }],
          isError: true
        };
      }
    }
  );
}

function makeRequest(url: string, method: string, headers: Record<string, string>, body?: string, timeout = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options: http.RequestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method,
      headers: { ...headers },
      timeout
    };

    if (body && !options.headers!['content-length']) {
      options.headers!['content-length'] = Buffer.byteLength(body).toString();
    }

    const req = lib.request(options, (res) => {
      const chunks: Buffer[] = [];
      let totalSize = 0;

      res.on('data', (chunk: Buffer) => {
        totalSize += chunk.length;
        if (totalSize <= MAX_BODY_SIZE) {
          chunks.push(chunk);
        }
      });

      res.on('end', () => {
        const responseBody = Buffer.concat(chunks).toString('utf8');
        const truncated = totalSize > MAX_BODY_SIZE;

        const lines: string[] = [];
        lines.push(`${res.statusCode} ${res.statusMessage}`);
        lines.push(
          '',
          'Headers:',
          ...Object.entries(res.headers || {}).map(([key, value]) =>
            `  ${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`
          ),
          '',
          'Body:',
          responseBody
        );
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
