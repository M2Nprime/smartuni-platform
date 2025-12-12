const express = require("express");

// Import Routes
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();

// Middleware Configuration
app.use(express.json()); // Parse incoming JSON requests

// Route Registration
app.use("/", resourceRoutes); // Mount resource routes

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Resource Service is running" });
});

module.exports = app;