const express = require("express");
const app = express();

app.use(express.json());

// Routes
const resourceRoutes = require("./routes/resourceRoutes");
app.use("/", resourceRoutes);

// Base route
app.get("/", (req, res) => {
    res.json({ message: "Resource Service is running" });
});

module.exports = app;
