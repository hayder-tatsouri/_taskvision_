const server = require("../server");
const { z } = require("zod");

server.tool(
  "login",
  "Login and get JWT",
  {
    email: z.string().email(),
    password: z.string()
  },
  async ({ email, password }) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    return {
      content: [{ type: "text", text: await res.text() }]
    };
  }
);
