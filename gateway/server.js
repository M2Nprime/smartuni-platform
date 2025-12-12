const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy Configuration: Auth Service
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_URL || "http://localhost:4001",
    changeOrigin: true,
  })
);

// Proxy Configuration: Resource Service
app.use(
  "/resources",
  createProxyMiddleware({
    target: process.env.RESOURCE_URL || "http://localhost:4002",
    changeOrigin: true,
  })
);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("API Gateway is running 🚀");
});

// Start the Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});