const express = require("express");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware Configuration
app.use(cors());             // Enable Cross-Origin Resource Sharing
app.use(express.json());     // Parse incoming JSON requests

// Route Registration
app.use("/", authRoutes);    // Mount auth routes

module.exports = app;