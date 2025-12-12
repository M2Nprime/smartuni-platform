const { Sequelize } = require("sequelize");

// Initialize SQLite Database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH || "./auth.db", // Storage file location
  logging: false, // Disable console logging for cleaner output
});

module.exports = sequelize;