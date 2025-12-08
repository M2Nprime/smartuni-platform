const { Sequelize } = require("sequelize");

// اتصال به SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./auth.db",   // دیتابیس در فایل auth.db ساخته می‌شود
    logging: false
});

module.exports = sequelize;
