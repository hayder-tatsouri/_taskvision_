const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");

const server = new McpServer({
  name: "project-management",
  version: "1.0.0",
});



module.exports = server;