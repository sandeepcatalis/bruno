import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListCollections } from './list-collections';
import { registerListRequests } from './list-requests';
import { registerReadRequest } from './read-request';
import { registerListEnvironments } from './list-environments';
import { registerGetEnvironment } from './get-environment';
import { registerRunRequest } from './run-request';
import { registerSendHttp } from './send-http';

export function registerTools(server: McpServer) {
  registerListCollections(server);
  registerListRequests(server);
  registerReadRequest(server);
  registerListEnvironments(server);
  registerGetEnvironment(server);
  registerRunRequest(server);
  registerSendHttp(server);
}
