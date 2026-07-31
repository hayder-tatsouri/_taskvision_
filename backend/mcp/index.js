const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const server = require("./server");



require("./tools/projectTools");
require("./tools/userTools");
require("./tools/loginTools");

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Project MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal MCP error:", err);
  process.exit(1);
});