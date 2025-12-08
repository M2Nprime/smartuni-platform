const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3000; // The port the client interacts with

// 1. Route requests starting with /auth to the Auth Service (4001)
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_URL || "http://localhost:4001",
    changeOrigin: true, // Needed for virtual hosted sites
  })
);

// 2. Route requests starting with /resources to the Resource Service (4002)
app.use(
  "/resources",
  createProxyMiddleware({
    target: process.env.RESOURCE_URL || "http://localhost:4002",
    changeOrigin: true,
  })
);

// Gateway Health Check / Root Route
app.get("/", (req, res) => {
  res.send("API Gateway is Running on Port 3000 🚀");
});

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});