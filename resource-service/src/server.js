require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

// Import Models to initialize associations
require("./models/Resource");
require("./models/Booking");

const PORT = process.env.PORT || 4002;

async function start() {
  try {
    // Sync Database
    // Note: In production, use migrations instead of sync()
    await sequelize.sync();
    console.log("Resource Database synced successfully");

    // Start Server
    app.listen(PORT, () => {
      console.log(`Resource Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start Resource Service:", err);
    process.exit(1); // Exit process with failure code (Fail Fast)
  }
}

start();