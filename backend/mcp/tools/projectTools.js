const server = require("../server");
const { z } = require("zod");

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

// Tool: Get project status
server.tool(
  "getProjectStatus",
  "Get project status by ID",
  {
    projectId: z.number().describe("ID of the project"),
    userId: z.number().describe("ID of the user making the request"),
    token: z.string().describe("Authentication token")
  },
  async ({ projectId, userId, token }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId.toString(),
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return {
          content: [{ type: "text", text: `Project not found.` }]
        };
      }

      const project = await response.json();

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

server.tool("getallprojects", "Get all projects", { 
  token: z.string().describe("Authentication token")
}, async ({ token }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const projects = await response.json();

    return {
      content: [
        {
          type: "text",
          text: projects.map(p => `
            Project: ${p.title}
            Status: ${p.status}
            Start Date: ${p.startDate}
            End Date: ${p.endDate}
            Deadline: ${p.deadline}
            client: ${p.client.firstName} ${p.client.lastName}
            manager: ${p.manager.firstName} ${p.manager.lastName}
            `).join("\n")
        }
      ]
    };
  } catch (err) {
    return { content: [{ type: "text", text: err.message }] };
  }
});

// Start MCP server

