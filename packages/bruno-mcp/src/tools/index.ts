import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListCollections } from './list-collections';
import { registerListRequests } from './list-requests';
import { registerReadRequest } from './read-request';
import { registerListEnvironments } from './list-environments';
import { registerGetEnvironment } from './get-environment';
import { registerRunRequest } from './run-request';
import { registerRunFolder } from './run-folder';
import { registerRunCollection } from './run-collection';
import { registerSendHttp } from './send-http';
import { registerImportCollection } from './import-collection';

export function registerTools(server: McpServer) {
  registerListCollections(server);
  registerListRequests(server);
  registerReadRequest(server);
  registerListEnvironments(server);
  registerGetEnvironment(server);
  registerRunRequest(server);
  registerRunFolder(server);
  registerRunCollection(server);
  registerSendHttp(server);
  registerImportCollection(server);
}
