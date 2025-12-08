require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

// Load Models
require("./models/Resource");
require("./models/Booking");
const PORT = process.env.PORT || 4002;

sequelize.sync().then(() => {
    console.log("Resource DB synced successfully (Resources + Bookings)");

    app.listen(PORT, () => {
        console.log(`Resource Service running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database sync error:", err);
});