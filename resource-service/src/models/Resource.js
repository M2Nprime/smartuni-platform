const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Resource = sequelize.define("Resource", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadedBy: {
        type: DataTypes.INTEGER, // User ID from Auth Service
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, // E.g., pdf, video, ppt
        allowNull: false
    },
    // --- New Fields for Booking System ---
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20 // Default class capacity
    },
    bookedCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Initially 0 bookings
    }
});

module.exports = Resource;