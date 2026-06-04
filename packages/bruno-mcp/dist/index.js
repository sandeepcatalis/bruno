"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const tools_1 = require("./tools");
async function main() {
    const server = new mcp_js_1.McpServer({
        name: 'bruno',
        version: '0.1.0'
    });
    (0, tools_1.registerTools)(server);
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch((err) => {
    console.error('Bruno MCP server failed to start:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map