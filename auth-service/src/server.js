require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

// Import Models
require("./models/User");

const PORT = process.env.PORT || 4001;

async function start() {
  try {
    // Sync Database
    await sequelize.sync();
    console.log("Database synced successfully");

    // Start Server
    app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start Auth Service:", err);
    process.exit(1); // Exit process with failure code (Fail Fast)
  }
}

start();