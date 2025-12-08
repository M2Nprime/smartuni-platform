require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

// مدل‌ها
require("./models/User");

const PORT = process.env.PORT || 4001;

async function start() {
    try {
        await sequelize.sync();
        console.log("Database synced");

        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start Auth Service:", err);
    }
}

start();
