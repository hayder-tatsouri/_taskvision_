const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");
const projectService = require("../services/projectService.js");

const server = new McpServer({
  name: "project-management",
  version: "1.0.0",
});

// Tool: Get project status
server.tool(
  "getProjectStatus",
  "Get project status by ID",
  {
    projectId: z.number().describe("ID of the project"),
    userId: z.number().describe("ID of the user making the request")
  },
  async ({ projectId, userId }) => {
    try {
      const project = await projectService.getProject(projectId, userId);

      if (!project) {
        return {
          content: [{ type: "text", text: `Project not found.` }]
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `
Project: ${project.title}
Status: ${project.status}
Start Date: ${project.startDate}
End Date: ${project.endDate}
Deadline: ${project.deadline}
            `
          }
        ]
      };
    } catch (err) {
      return { content: [{ type: "text", text: err.message }] };
    }
  }
);


// Start MCP server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Project MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal MCP error:", err);
  process.exit(1);
});
