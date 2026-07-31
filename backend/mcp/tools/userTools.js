const server = require("../server");
const { z } = require("zod");

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

// Tool: Get user info by ID
server.tool(
    "getUserProjects",
    "Get projects for a user by ID",
    {
      token: z.string().describe("Authentication token")
    },
    async ({ token }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/getUserProjects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user projects: ${response.statusText}`);
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
              `).join("\n")
            }
          ]
        };
      } catch (err) {
        return { content: [{ type: "text", text: err.message }] };
      }
    }
);
server.tool(
    "getAllUsers",
    "Get a list of all users",
    {
      token: z.string().describe("Authentication token")
    },
    async ({ token }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const users = await response.json();

        return {
          content: [
            {
              type: "text",
              text: users.map(u => `
                User ID: ${u.id}
                Name: ${u.firstName} ${u.lastName}
                Email: ${u.email}
                Role: ${u.role}
              `).join("\n")
            }
          ]
        };
      } catch (err) {
        return { content: [{ type: "text", text: err.message }] };
      }
    }
);

server.tool(
    "createAccount",
    "Create a new user account",
    { 
      firstName: z.string().describe("First name of the user"),
      lastName: z.string().describe("Last name of the user"),
      email: z.string().email().describe("Email of the user"),
      password: z.string().min(6).describe("Password for the account"),
      role: z.enum(['client', 'Project Manager', 'admin']).describe("Role of the user"),
      token: z.string().describe("Authentication token")
    },
    async ({ firstName, lastName, email, password, role, token }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/createAccount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ firstName, lastName, email, password, role })
        });

        if (!response.ok) {
          throw new Error(`Failed to create account: ${response.statusText}`);
        }

        const newUser = await response.json();

        return {
          content: [
            {
              type: "text",
              text: `User account created successfully:\nName: ${newUser.firstName} ${newUser.lastName}\nEmail: ${newUser.email}\nRole: ${newUser.role}`
            }
          ]
        };
      } catch (err) {
        return { content: [{ type: "text", text: err.message }] };
      }
    }
);
/* Tool: Send project notification email */
server.tool(
  "sendEmailNotification",
  "Send an email notification to a specific user",
  {
    userId: z.number().describe("ID of the user to notify"),
    subject: z.string().describe("Email subject"),
    message: z.string().describe("Email message content"),
    token: z.string().describe("Authentication token")
  },
  async ({ userId, subject, message, token }) => {
    try {
      // Get user details
      const userResponse = await fetch(`${API_BASE_URL}/user/getUser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        return {
          content: [{
            type: "text",
            text: `Error: User with ID ${userId} not found`
          }]
        };
      }

      const user = await userResponse.json();
      
      // Send email
      const emailResponse = await fetch(`${API_BASE_URL}/user/sendNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          subject: subject,
          message: message
        })
      });

      if (emailResponse.ok) {
        return {
          content: [{
            type: "text",
            text: `✅ Email sent successfully to ${user.firstName} ${user.lastName} (${user.email})`
          }]
        };
      } else {
        const errorData = await emailResponse.json(); // Get the actual error message
  console.error("Email error:", errorData);
  return {
    content: [{
      type: "text",
      text: `❌ Failed to send email: ${JSON.stringify(errorData)}`
    }]
  };
      }

    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);
