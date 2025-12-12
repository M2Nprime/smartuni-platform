const { Sequelize } = require("sequelize");
const path = require("path");

// Initialize SQLite Database
const sequelize = new Sequelize({
  dialect: "sqlite",
  // Use environment variable if available, otherwise use default path
  storage: process.env.DB_PATH || path.join(__dirname, "../../database.sqlite"),
  logging: false, // Disable console logging
});

module.exports = sequelize;